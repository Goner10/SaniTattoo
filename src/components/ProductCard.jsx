import { motion } from "framer-motion";
import WhatsAppButton from "./WhatsAppButton.jsx";
import { formatPrice, getDisplayPrice } from "../utils/formatPrice.js";
import { productWhatsAppUrl } from "../utils/whatsapp.js";
import { catalogCtaPrimary } from "../utils/catalogCta.js";
import { publicAssetUrl } from "../utils/publicAsset.js";

/**
 * @param {{
 *   product: import("../data/products.js").products[number]
 *   onOpenDetail?: (p: import("../data/products.js").products[number]) => void
 *   cardMotion?: "default" | "carousel"
 *   openOnCardClick?: boolean
 *   showWhatsAppButton?: boolean
 * }} props
 */
export default function ProductCard({
  product,
  onOpenDetail,
  cardMotion = "default",
  openOnCardClick = true,
  showWhatsAppButton = true,
}) {
  const displayPrice = getDisplayPrice(product);
  const hasVariants = Boolean(product.variants?.length);
  const isCarousel = cardMotion === "carousel";

  const body = (
    <>
      <div
        className={`relative aspect-square w-full shrink-0 overflow-hidden rounded-t-lg bg-[#f1f1f1] ring-1 ring-inset ring-black/[0.04] ${isCarousel ? "select-none" : ""}`}
      >
        {product.badge ? (
          <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-brand-red px-2.5 py-1 font-sans text-[0.625rem] font-bold uppercase tracking-[0.06em] text-brand-white shadow-[0_2px_8px_rgba(5,5,5,0.18)] sm:left-3 sm:top-3 sm:px-3 sm:py-1 sm:text-xs">
            {product.badge}
          </span>
        ) : null}
        <div className="flex h-full min-h-0 w-full items-center justify-center p-3 sm:p-4 md:p-5">
          <img
            src={publicAssetUrl(product.image)}
            alt={product.alt}
            loading="lazy"
            draggable={isCarousel ? false : undefined}
            onDragStart={isCarousel ? (e) => e.preventDefault() : undefined}
            className={`max-h-full w-full max-w-full object-contain ${isCarousel ? "select-none" : ""}`}
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-brand-muted">
          {product.categoryLabel}
        </p>
        <h3 className="text-base font-semibold text-brand-black">{product.name}</h3>
        <p className="line-clamp-2 text-sm font-normal text-brand-muted">
          {product.shortDescription}
        </p>
        <p className="mt-auto text-sm font-medium text-brand-black">
          {hasVariants && displayPrice !== null ? (
            <>Desde {formatPrice(displayPrice, product.currency)}</>
          ) : (
            formatPrice(displayPrice, product.currency)
          )}
          <span className="ml-1 font-normal text-brand-muted">/ {product.unit}</span>
        </p>
      </div>
    </>
  );

  const motionArticleProps = isCarousel
    ? {
        initial: { opacity: 1, y: 0 },
        whileHover: { scale: 1.02 },
        transition: { type: "spring", stiffness: 400, damping: 28 },
      }
    : {
        initial: { opacity: 1, y: 0 },
        whileHover: { scale: 1.015 },
        transition: { duration: 0.28 },
      };

  const useDetailButton = Boolean(onOpenDetail && !openOnCardClick);

  return (
    <motion.article
      {...motionArticleProps}
      className={`flex h-full flex-col overflow-hidden rounded-lg border border-brand-border bg-brand-white shadow-sm${onOpenDetail && openOnCardClick ? " cursor-pointer" : ""}`}
    >
      {onOpenDetail && openOnCardClick ? (
        <button
          type="button"
          onClick={() => onOpenDetail(product)}
          className="group block w-full cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
          aria-label={`Ver detalles de ${product.name}`}
        >
          {body}
        </button>
      ) : (
        <div className="group block w-full">{body}</div>
      )}
      {useDetailButton ? (
        <div
          className={`border-t border-brand-border px-4 pb-3 pt-0${showWhatsAppButton ? "" : " mt-auto"}`}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetail?.(product);
            }}
            onPointerDown={(e) => e.stopPropagation()}
            className={`${catalogCtaPrimary} w-full justify-center`}
            aria-label={`Ver detalle de ${product.name}`}
          >
            Ver detalle
          </button>
        </div>
      ) : null}
      {showWhatsAppButton ? (
        <div
          className="mt-auto border-t border-brand-border p-4 pt-0"
          onPointerDown={onOpenDetail ? (e) => e.stopPropagation() : undefined}
        >
          <WhatsAppButton
            href={productWhatsAppUrl(product.name)}
            className="w-full"
            variant="outline"
          >
            WhatsApp
          </WhatsAppButton>
        </div>
      ) : null}
    </motion.article>
  );
}
