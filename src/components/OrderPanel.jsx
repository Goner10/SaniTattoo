import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, ShoppingBag, Trash2, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCampaignState } from "../context/campaignState.js";
import { useOrder } from "../context/orderState.js";
import { campaigns as campaignCatalog } from "../data/campaigns.js";
import { products } from "../data/products.js";
import { getActiveCampaigns } from "../utils/campaignPricing.js";
import { catalogCtaPrimary } from "../utils/catalogCta.js";
import { formatCents } from "../utils/formatPrice.js";
import { MAX_LINE_QUANTITY } from "../utils/orderList.js";
import { prepareOrderShare } from "../utils/orderMessage.js";
import { resolveOrderSummary } from "../utils/orderPricing.js";
import { publicAssetUrl } from "../utils/publicAsset.js";
import { useDialogBehavior } from "../utils/useDialogBehavior.js";
import { scrollToTop } from "./ScrollToTop.jsx";
import QuantityControl from "./QuantityControl.jsx";

const whatsappActionClass =
  "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#1DA851] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] motion-reduce:transition-none";

const quietButtonClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-brand-border bg-brand-white px-3 py-2 text-sm font-semibold text-brand-black transition-colors hover:border-brand-red hover:text-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red motion-reduce:transition-none";

function campaignKey(list) {
  return (list ?? []).map((campaign) => campaign.id).join("|");
}

export function OrderAddedToast() {
  const { toast, dismissToast, openPanel } = useOrder();

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(dismissToast, 4000);
    return () => window.clearTimeout(timer);
  }, [toast, dismissToast]);

  if (!toast) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[45] flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-auto flex w-full max-w-md items-center justify-between gap-3 rounded-lg border border-brand-border bg-brand-white px-4 py-3 text-sm text-brand-black"
      >
        <p>
          {toast.capped
            ? `Añadido al pedido. La cantidad máxima por línea es ${MAX_LINE_QUANTITY}.`
            : "Añadido al pedido"}
        </p>
        <button
          type="button"
          className="inline-flex min-h-11 shrink-0 items-center font-semibold text-brand-red underline decoration-brand-red/70 underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
          onClick={() => {
            dismissToast();
            openPanel();
          }}
        >
          Ver pedido
        </button>
      </div>
    </div>
  );
}

function OrderDialog() {
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef(null);
  const confirmRef = useRef(false);
  const {
    lines,
    notices,
    closePanel,
    setLineQuantity,
    removeLine,
    clearLines,
    dismissNotices,
  } = useOrder();
  const { activeCampaigns } = useCampaignState();
  const [pricingOverride, setPricingOverride] = useState(null);
  const [acceptedSnapshot, setAcceptedSnapshot] = useState(null);
  const [holdReview, setHoldReview] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const [shareHelp, setShareHelp] = useState(null);
  const [manualUrl, setManualUrl] = useState("");

  const campaignsForPrices =
    pricingOverride && campaignKey(pricingOverride) !== campaignKey(activeCampaigns)
      ? pricingOverride
      : activeCampaigns;
  const summary = useMemo(
    () => resolveOrderSummary(lines, products, campaignsForPrices),
    [lines, campaignsForPrices],
  );
  const snapshot = priceSnapshot(summary);

  if (acceptedSnapshot == null) {
    setAcceptedSnapshot(snapshot);
  } else if (!pricesChanged(acceptedSnapshot, summary) && acceptedSnapshot !== snapshot) {
    setAcceptedSnapshot(snapshot);
  }

  const reviewMessage =
    holdReview || pricesChanged(acceptedSnapshot, summary)
      ? "Los importes se han actualizado. Revísalos y pulsa otra vez para abrir WhatsApp."
      : "";

  useEffect(() => {
    confirmRef.current = confirmClear;
  });
  const requestClose = useCallback(() => {
    if (confirmRef.current) {
      setConfirmClear(false);
      return;
    }
    closePanel();
  }, [closePanel]);

  useDialogBehavior({ open: true, onEscape: requestClose, dialogRef });

  async function requestShare() {
    const freshCampaigns = getActiveCampaigns(campaignCatalog, Date.now());
    const fresh = resolveOrderSummary(lines, products, freshCampaigns);
    if (!fresh.lines.length) return;

    if (pricesChanged(acceptedSnapshot, fresh)) {
      if (campaignKey(freshCampaigns) !== campaignKey(campaignsForPrices)) {
        setPricingOverride(freshCampaigns);
      }
      setAcceptedSnapshot(priceSnapshot(fresh));
      setHoldReview(true);
      return;
    }

    setHoldReview(false);
    const share = prepareOrderShare(fresh);
    setShareHelp(null);
    setManualUrl("");

    if (share.mode === "link") {
      const opened = window.open(share.url, "_blank", "noopener,noreferrer");
      if (!opened) setManualUrl(share.url);
      return;
    }

    let copied = false;
    try {
      await navigator.clipboard.writeText(share.text);
      copied = true;
    } catch {
      /* el navegador no ha permitido copiar */
    }

    setShareHelp({ text: share.text, copied, failed: !copied });
    const opened = copied
      ? window.open(share.chatUrl, "_blank", "noopener,noreferrer")
      : null;
    if (!opened) setManualUrl(share.chatUrl);
  }

  const totalLabel =
    summary.unpricedCount > 0 ? "Subtotal conocido sin IVA" : "Total sin IVA";
  const totalValue =
    summary.knownTotalCents == null
      ? "Pendiente de valorar"
      : formatCents(summary.knownTotalCents, summary.currency);

  return (
    <motion.div
      className="fixed inset-0 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.2 }}
    >
      <button
        type="button"
        tabIndex={-1}
        className="absolute inset-0 bg-brand-black/50"
        aria-label="Cerrar Mi pedido"
        onClick={requestClose}
      />
      <motion.div
        ref={dialogRef}
        id="mi-pedido-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mi-pedido-titulo"
        className="relative z-10 ml-auto flex h-[100dvh] w-full max-w-full flex-col bg-brand-white pt-[env(safe-area-inset-top,0px)] sm:max-w-md sm:border-l sm:border-brand-border"
        initial={reduceMotion ? false : { x: 28 }}
        animate={{ x: 0 }}
        exit={reduceMotion ? { opacity: 1 } : { x: 28 }}
        transition={{ duration: reduceMotion ? 0 : 0.2 }}
      >
        <div className="flex items-center justify-between gap-3 border-b border-brand-border px-4 py-3">
          <h2
            id="mi-pedido-titulo"
            tabIndex={-1}
            data-autofocus
            className="font-heading text-xl text-brand-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
          >
            Mi pedido
          </h2>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-brand-black hover:bg-brand-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
            aria-label="Cerrar Mi pedido"
            onClick={requestClose}
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4">
          {summary.lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center px-4 py-16 text-center">
              <ShoppingBag className="size-10 text-brand-muted" aria-hidden />
              <p className="font-heading mt-4 text-xl text-brand-black">Tu pedido está vacío</p>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-brand-muted">
                Añade productos desde el catálogo para preparar una sola solicitud.
              </p>
              {notices.length ? <OrderNotices notices={notices} onDismiss={dismissNotices} /> : null}
              <Link
                to="/catalogo"
                className={`${catalogCtaPrimary} mt-6`}
                onClick={() => {
                  closePanel();
                  scrollToTop();
                }}
              >
                Ir al catálogo
              </Link>
            </div>
          ) : (
            <>
              {notices.length ? (
                <OrderNotices notices={notices} onDismiss={dismissNotices} />
              ) : null}
              <div className="mb-4">
                {confirmClear ? (
                  <div
                    role="group"
                    aria-label="Confirmar vaciar lista"
                    className="flex flex-wrap items-center gap-2 rounded-md border border-brand-border bg-brand-bg px-3 py-2"
                  >
                    <p className="text-sm text-brand-black">¿Vaciar la lista?</p>
                    <button
                      type="button"
                      className="inline-flex min-h-11 items-center rounded-md bg-brand-black px-3 text-sm font-semibold text-brand-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
                      onClick={() => {
                        clearLines();
                        setConfirmClear(false);
                      }}
                    >
                      Vaciar
                    </button>
                    <button
                      type="button"
                      className={quietButtonClass}
                      onClick={() => setConfirmClear(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className={quietButtonClass}
                    onClick={() => setConfirmClear(true)}
                  >
                    <Trash2 className="size-4" aria-hidden />
                    Vaciar lista
                  </button>
                )}
              </div>
              <ul className="space-y-4">
                {summary.lines.map((line) => {
                  const quantityLabel = line.variantLabel
                    ? `Cantidad de ${line.name}, ${line.variantLabel}`
                    : `Cantidad de ${line.name}`;
                  return (
                    <li
                      key={line.key}
                      className="border-b border-brand-border pb-4 last:border-b-0"
                    >
                      <div className="flex gap-3">
                        <img
                          src={publicAssetUrl(line.image)}
                          alt=""
                          width={64}
                          height={64}
                          className="h-16 w-16 shrink-0 rounded-md bg-[#f1f1f1] object-contain p-1"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="text-sm font-semibold leading-snug text-brand-black">
                                {line.name}
                              </p>
                              {line.variantLabel ? (
                                <p className="mt-0.5 text-sm text-brand-muted">{line.variantLabel}</p>
                              ) : null}
                            </div>
                            <button
                              type="button"
                              className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-md text-brand-black hover:bg-brand-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
                              aria-label={`Eliminar ${line.name}${line.variantLabel ? `, ${line.variantLabel}` : ""} del pedido`}
                              onClick={() => removeLine(line.key)}
                            >
                              <Trash2 className="size-4" aria-hidden />
                            </button>
                          </div>
                          <p className="mt-1 text-sm text-brand-black">
                            {line.unitNetCents == null ? (
                              "Consultar precio"
                            ) : (
                              <>
                                {formatCents(line.unitNetCents, line.currency)}{" "}
                                <span className="text-brand-muted">sin IVA</span>
                              </>
                            )}
                          </p>
                          <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
                            <QuantityControl
                              value={line.quantity}
                              label={quantityLabel}
                              onCommit={(quantity) => setLineQuantity(line.key, quantity)}
                            />
                            <p className="pb-1 text-sm text-brand-black">
                              <span className="text-brand-muted">Subtotal </span>
                              <span className="font-semibold">
                                {line.subtotalNetCents == null
                                  ? "Pendiente"
                                  : formatCents(line.subtotalNetCents, line.currency)}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>

        {summary.lines.length > 0 ? (
          <div className="border-t border-brand-border px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))]">
            {reviewMessage ? (
              <p
                role="status"
                className="mb-3 rounded-md border border-brand-border bg-brand-bg px-3 py-2 text-sm leading-relaxed text-brand-black"
              >
                {reviewMessage}
              </p>
            ) : null}
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-sm font-semibold text-brand-black">{totalLabel}</p>
              <p className="text-base font-semibold text-brand-black">{totalValue}</p>
            </div>
            {summary.unpricedCount > 0 ? (
              <p className="mt-1 text-sm text-brand-muted">
                {summary.unpricedCount === 1
                  ? "1 línea pendiente de valorar."
                  : `${summary.unpricedCount} líneas pendientes de valorar.`}
              </p>
            ) : null}
            <p className="mt-2 text-sm text-brand-muted">IVA y envío pendientes de confirmar</p>
            <p className="mt-1 text-sm leading-relaxed text-brand-muted">
              Te confirmamos disponibilidad e importe final por WhatsApp.
            </p>
            <button type="button" className={`${whatsappActionClass} mt-4`} onClick={requestShare}>
              <MessageCircle className="size-5" aria-hidden />
              Solicitar pedido por WhatsApp
            </button>
            <button
              type="button"
              className={`${quietButtonClass} mt-2 w-full`}
              onClick={closePanel}
            >
              Seguir viendo productos
            </button>
            {shareHelp ? (
              <div className="mt-3 space-y-2">
                <p className="text-sm leading-relaxed text-brand-black">
                  {shareHelp.copied
                    ? "El resumen es demasiado largo para el enlace. Está copiado: pégalo en el chat de WhatsApp."
                    : "El resumen es demasiado largo para el enlace. Selecciónalo, cópialo y pégalo en WhatsApp."}
                </p>
                {shareHelp.failed ? (
                  <textarea
                    readOnly
                    value={shareHelp.text}
                    aria-label="Resumen del pedido"
                    className="h-40 w-full resize-y rounded-md border border-brand-border p-3 text-sm text-brand-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
                    onFocus={(event) => event.currentTarget.select()}
                  />
                ) : null}
              </div>
            ) : null}
            {manualUrl ? (
              <a
                href={manualUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${quietButtonClass} mt-2 w-full`}
              >
                Abrir WhatsApp
              </a>
            ) : null}
          </div>
        ) : null}
      </motion.div>
    </motion.div>
  );
}

function OrderNotices({ notices, onDismiss }) {
  return (
    <div
      role="status"
      className="mb-4 rounded-md border border-brand-border bg-brand-bg px-3 py-3 text-sm text-brand-black"
    >
      <ul className="space-y-1">
        {notices.map((notice, index) => (
          <li key={`${notice}-${index}`}>{notice}</li>
        ))}
      </ul>
      <button
        type="button"
        className="mt-2 inline-flex min-h-11 items-center font-semibold underline decoration-brand-black/40 underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
        onClick={onDismiss}
      >
        Entendido
      </button>
    </div>
  );
}

function priceSnapshot(summary) {
  return summary.lines
    .map((line) => `${line.key}=${line.unitNetCents ?? "x"}`)
    .sort()
    .join("|");
}

function pricesChanged(previous, summary) {
  if (!previous) return false;
  const known = new Map(
    previous
      .split("|")
      .filter(Boolean)
      .map((part) => {
        const index = part.lastIndexOf("=");
        return [part.slice(0, index), part.slice(index + 1)];
      }),
  );
  return summary.lines.some((line) => {
    const cents = String(line.unitNetCents ?? "x");
    return known.has(line.key) && known.get(line.key) !== cents;
  });
}

export default function OrderPanel() {
  const { isOpen } = useOrder();

  return (
    <AnimatePresence>
      {isOpen ? <OrderDialog key="mi-pedido" /> : null}
    </AnimatePresence>
  );
}
