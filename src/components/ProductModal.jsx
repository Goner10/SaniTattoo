import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import PriceTag from "./PriceTag.jsx";
import QuantityControl from "./QuantityControl.jsx";
import { useCampaignState } from "../context/campaignState.js";
import { useOrder } from "../context/orderState.js";
import { getProductPriceQuote, resolveCampaign } from "../utils/campaignPricing.js";
import { lockBodyScroll } from "../utils/bodyScrollLock.js";
import { MAX_LINE_QUANTITY } from "../utils/orderList.js";
import { publicAssetUrl } from "../utils/publicAsset.js";
import { getVariantChoiceCopy, listVariantIdentities } from "../utils/variantIdentity.js";

export default function ProductModal({ product, onClose }) {
  const { activeCampaigns } = useCampaignState();
  const { addProduct, openPanel } = useOrder();
  const quantityRef = useRef(null);
  const switchedRef = useRef(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedVariantLabel, setSelectedVariantLabel] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [variantError, setVariantError] = useState("");
  const [addedNotice, setAddedNotice] = useState(null);
  const [openingOrder, setOpeningOrder] = useState(false);

  useEffect(() => {
    if (!product) return;
    const urls = product.gallery;
    queueMicrotask(() => {
      setLightboxOpen(false);
      setSelectedVariantLabel(null);
      setQuantity(1);
      setVariantError("");
      setAddedNotice(null);
      setOpeningOrder(false);
      switchedRef.current = false;
      if (Array.isArray(urls) && urls.length > 1) {
        setSelectedImage(urls[0]);
      } else {
        setSelectedImage(product.image);
      }
    });
  }, [product]);

  useEffect(() => {
    if (!product) return undefined;
    return lockBodyScroll();
  }, [product]);

  useEffect(() => {
    if (!openingOrder || switchedRef.current) return;
    switchedRef.current = true;
    onClose();
    openPanel();
  }, [openingOrder, onClose, openPanel]);

  useEffect(() => {
    if (!product) return undefined;
    const onKey = (event) => {
      if (event.key !== "Escape") return;
      if (lightboxOpen) {
        setLightboxOpen(false);
      } else {
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [product, onClose, lightboxOpen]);

  const useGallery =
    product &&
    Array.isArray(product.gallery) &&
    product.gallery.length > 1;

  const mainSrc = useGallery ? selectedImage || product.image : product?.image;

  const mainImageAlt = useGallery
    ? `${product?.alt} — vista seleccionada`
    : product?.alt;

  const hasVariants = Boolean(product?.variants?.length);
  const identities = hasVariants ? listVariantIdentities(product) : [];
  const selectedVariant = identities.find((variant) => variant.label === selectedVariantLabel) ?? null;
  const choice = getVariantChoiceCopy(product?.variants);
  const campaign = product ? resolveCampaign(product, activeCampaigns) : null;
  const quote = product
    ? getProductPriceQuote(product, campaign, { variant: selectedVariant })
    : null;

  function addToOrder() {
    quantityRef.current?.holdBlur();
    const nextQuantity = quantityRef.current?.commit();
    if (nextQuantity == null) return;
    if (hasVariants && !selectedVariant) {
      setVariantError(choice.prompt);
      return;
    }
    const result = addProduct(product, {
      variantId: selectedVariant?.id ?? null,
      quantity: nextQuantity,
      feedback: "inline",
    });
    if (!result.ok) {
      if (result.reason === "variant") setVariantError(choice.prompt);
      if (result.reason === "lines") {
        setVariantError("La lista ha llegado al máximo de líneas.");
      }
      return;
    }
    setVariantError("");
    setAddedNotice({ capped: Boolean(result.capped) });
    setQuantity(1);
  }

  return (
    <AnimatePresence>
      {product ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-modal-title"
          className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-brand-black/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-white"
            aria-label="Cerrar modal"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: openingOrder ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: openingOrder ? 0 : 16 }}
            transition={{ duration: openingOrder ? 0 : 0.2 }}
            className="relative z-10 flex max-h-[calc(100dvh-0.75rem)] min-h-0 w-full max-w-lg flex-col overflow-hidden rounded-t-xl border border-brand-border bg-brand-white shadow-lg sm:max-h-[calc(100dvh-2rem)] sm:rounded-xl"
          >
            <div className="flex shrink-0 items-start justify-between gap-3 border-b border-brand-border p-4 [@media(max-height:760px)]:py-3">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium uppercase tracking-wide text-brand-muted">
                  {product.categoryLabel}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-2 gap-y-1.5">
                  <h2
                    id="product-modal-title"
                    className="font-heading text-xl font-bold text-brand-black sm:text-2xl"
                  >
                    {product.name}
                  </h2>
                  
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="shrink-0 rounded-md border border-transparent p-2 text-brand-black hover:bg-brand-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
                aria-label="Cerrar"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">
              <div className="relative w-full shrink-0 overflow-hidden bg-[#f1f1f1] ring-1 ring-inset ring-black/[0.04]">
                <div className="aspect-[4/3] w-full shrink-0 max-h-[min(40dvh,26.25rem)] [@media(max-height:720px)]:max-h-[min(30dvh,13rem)] xl:[@media(max-height:800px)]:!aspect-auto xl:[@media(max-height:800px)]:!h-[min(24rem,calc(100dvh-15.5rem))] xl:[@media(max-height:800px)]:!max-h-none xl:[@media(max-height:800px)]:!min-h-[min(24rem,calc(100dvh-15.5rem))]">
                  <button
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    className="group relative flex h-full min-h-0 w-full cursor-zoom-in items-center justify-center p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red sm:p-6 lg:p-5 xl:p-6 2xl:p-8 [@media(max-height:760px)]:p-3"
                    aria-label="Ampliar imagen del producto"
                  >
                    {product.badge ? (
                      <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-brand-red px-2.5 py-1 font-sans text-[0.625rem] font-bold uppercase tracking-[0.06em] text-brand-white shadow-[0_2px_8px_rgba(5,5,5,0.18)] sm:px-3 sm:py-1 sm:text-xs">
                        {product.badge}
                      </span>
                    ) : null}
                    <img
                      src={publicAssetUrl(mainSrc)}
                      alt={mainImageAlt}
                      className="h-full max-h-full w-full object-contain"
                      draggable={false}
                    />
                    <span
                      className="pointer-events-none absolute inset-x-0 bottom-3 mx-auto w-fit rounded-md bg-brand-black/70 px-3 py-1.5 text-xs font-medium text-brand-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:bottom-4 lg:bottom-5"
                      aria-hidden
                    >
                      Ampliar imagen
                    </span>
                  </button>
                </div>
                {useGallery ? (
                  <div
                    className="flex max-w-full gap-2 overflow-x-auto border-t border-brand-border/60 bg-brand-white/95 px-3 py-3 sm:gap-3 sm:px-4 sm:py-3.5"
                    role="tablist"
                    aria-label="Miniaturas de la galería"
                  >
                    {product.gallery.map((src, i) => (
                      <button
                        key={src}
                        type="button"
                        role="tab"
                        aria-selected={selectedImage === src}
                        aria-label={`Mostrar imagen ${i + 1}`}
                        onClick={() => setSelectedImage(src)}
                        className={[
                          "relative shrink-0 overflow-hidden rounded-lg border-2 bg-[#f1f1f1] p-1.5 transition-[border-color,box-shadow] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red sm:p-2",
                          selectedImage === src
                            ? "border-brand-red shadow-sm ring-1 ring-brand-red/20"
                            : "border-transparent hover:border-brand-border",
                        ].join(" ")}
                      >
                        <span className="block h-14 w-14 sm:h-16 sm:w-16">
                          <img
                            src={publicAssetUrl(src)}
                            alt=""
                            className="h-full w-full object-contain"
                            loading="lazy"
                            draggable={false}
                          />
                        </span>
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="space-y-4 p-4 sm:p-6">
                {Array.isArray(product.description) ? (
                  <div className="space-y-3 text-sm font-normal leading-relaxed text-brand-black">
                    {product.description.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <p className="whitespace-pre-line text-sm font-normal leading-relaxed text-brand-black">
                    {product.description}
                  </p>
                )}

                <PriceTag
                  quote={quote}
                  layout="modal"
                  showUnit={!hasVariants}
                />

                {hasVariants ? (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-brand-muted">
                      Formatos
                    </p>
                    <p className="mt-1 text-xs text-brand-muted">
                      {product.priceIncludesVat
                        ? "Los precios por talla incluyen IVA."
                        : "Los formatos se muestran en base sin IVA."}
                    </p>
                    <ul className="mt-2 space-y-2" role="list">
                      {identities.map((variant) => {
                        const isSelected = selectedVariantLabel === variant.label;
                        return (
                          <li key={variant.id}>
                            <button
                              type="button"
                              onClick={() => {
                                setVariantError("");
                                setSelectedVariantLabel((prev) =>
                                  prev === variant.label ? null : variant.label,
                                );
                              }}
                              aria-pressed={isSelected}
                              className={[
                                "flex min-h-11 w-full items-center justify-between gap-3 rounded-md border px-3 py-2.5 text-left text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red",
                                isSelected
                                  ? "border-brand-red bg-brand-red/5 ring-1 ring-brand-red/25"
                                  : "border-brand-border bg-brand-white hover:border-brand-red/35 hover:bg-brand-bg",
                              ].join(" ")}
                            >
                              <span className="min-w-0 break-words font-medium text-brand-black">
                                {variant.label}
                              </span>
                              <PriceTag
                                quote={getProductPriceQuote(product, campaign, {
                                  variant,
                                })}
                                layout="variant"
                              />
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : null}
                {product.tags?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-brand-border bg-brand-bg px-2.5 py-0.5 text-xs text-brand-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="shrink-0 border-t border-brand-border px-4 py-3 sm:px-6">
              <div aria-live="polite">
                {addedNotice ? (
                  <p className="mb-2 flex flex-wrap items-center justify-between gap-2 rounded-md border border-brand-border bg-brand-bg px-3 py-2 text-sm text-brand-black">
                    <span>
                      {addedNotice.capped
                        ? `Añadido al pedido. La cantidad máxima por línea es ${MAX_LINE_QUANTITY}.`
                        : "Añadido al pedido"}
                    </span>
                    <button
                      type="button"
                      className="inline-flex min-h-11 items-center font-semibold text-brand-red underline decoration-brand-red/70 underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
                      onClick={() => setOpeningOrder(true)}
                    >
                      Ver pedido
                    </button>
                  </p>
                ) : null}
              </div>
              {variantError ? (
                <p role="alert" className="mb-2 text-sm text-brand-red">
                  {variantError}
                </p>
              ) : null}
              <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:gap-4">
                <QuantityControl
                  ref={quantityRef}
                  value={quantity}
                  showLegend
                  compact
                  className="shrink-0"
                  label={
                    selectedVariant
                      ? `Cantidad de ${product.name}, ${selectedVariant.label}`
                      : `Cantidad de ${product.name}`
                  }
                  onCommit={setQuantity}
                />
                <button
                  type="button"
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border-2 border-brand-red bg-brand-red px-4 py-2.5 text-sm font-bold text-brand-white transition-colors duration-200 hover:bg-brand-white hover:text-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red motion-reduce:transition-none xl:mt-5 xl:min-w-0 xl:flex-1"
                  onPointerDown={() => quantityRef.current?.holdBlur()}
                  onClick={addToOrder}
                >
                  <ShoppingBag className="size-4" aria-hidden />
                  Añadir al pedido
                </button>
              </div>
            </div>
          </motion.div>
          <AnimatePresence>
            {lightboxOpen ? (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label="Vista ampliada de la imagen"
                className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <button
                  type="button"
                  className="absolute inset-0 bg-black/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-white"
                  aria-label="Cerrar vista ampliada"
                  onClick={() => setLightboxOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="relative z-10 flex max-h-[90vh] max-w-[90vw] flex-col overflow-hidden rounded-xl bg-[#f3f3f3] shadow-2xl ring-1 ring-black/5"
                >
                  <button
                    type="button"
                    onClick={() => setLightboxOpen(false)}
                    className="absolute right-2 top-2 z-10 rounded-md border border-brand-border bg-brand-white p-3 text-brand-black shadow-sm transition-colors hover:bg-brand-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red sm:right-3 sm:top-3"
                    aria-label="Cerrar vista ampliada"
                  >
                    <X className="size-5" aria-hidden />
                  </button>
                  <div className="flex min-h-0 items-center justify-center p-4 pt-14 sm:p-6 sm:pt-16 md:p-8 md:pt-[4.5rem]">
                    <img
                      src={publicAssetUrl(mainSrc)}
                      alt={
                        useGallery
                          ? `${product.alt} — vista ampliada`
                          : product.alt
                      }
                      className="max-h-[70vh] max-w-full cursor-zoom-out object-contain sm:max-h-[75vh] md:max-h-[85vh]"
                      draggable={false}
                    />
                  </div>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
