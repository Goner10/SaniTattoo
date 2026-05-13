import { motion } from "framer-motion";
import WhatsAppButton from "./WhatsAppButton.jsx";
import { formatPrice, getDisplayPrice } from "../utils/formatPrice.js";
import { productWhatsAppUrl } from "../utils/whatsapp.js";

/**
 * @param {{
 *   product: import("../data/products.js").products[number]
 *   onOpenDetail?: (p: import("../data/products.js").products[number]) => void
 *   cardMotion?: "default" | "carousel"
 * }} props
 */
export default function ProductCard({ product, onOpenDetail, cardMotion = "default" }) {
  const displayPrice = getDisplayPrice(product);
  const hasVariants = Boolean(product.variants?.length);
  const isCarousel = cardMotion === "carousel";

  const body = (
    <>
      <div
        className={`aspect-square w-full bg-brand-bg ${isCarousel ? "select-none" : ""}`}
      >
        <img
          src={product.image}
          alt={product.alt}
          loading="lazy"
          draggable={isCarousel ? false : undefined}
          onDragStart={isCarousel ? (e) => e.preventDefault() : undefined}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-brand-muted">
          {product.categoryLabel}
        </p>
        <h3 className="text-base font-semibold text-brand-black">{product.name}</h3>
        <p className="line-clamp-2 text-sm text-brand-muted">{product.shortDescription}</p>
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
        layout: true,
        initial: { opacity: 0, y: 10 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-40px" },
        whileHover: { scale: 1.015 },
        transition: { duration: 0.28 },
      };

  return (
    <motion.article
      {...motionArticleProps}
      className="flex h-full flex-col overflow-hidden rounded-lg border border-brand-border bg-brand-white shadow-sm"
    >
      {onOpenDetail ? (
        <button
          type="button"
          onClick={() => onOpenDetail(product)}
          className="group block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
          aria-label={`Ver detalles de ${product.name}`}
        >
          {body}
        </button>
      ) : (
        <div className="group block w-full">{body}</div>
      )}
      <div className="mt-auto border-t border-brand-border p-4 pt-0">
        <WhatsAppButton
          href={productWhatsAppUrl(product.name)}
          className="w-full"
          variant="outline"
        >
          WhatsApp
        </WhatsAppButton>
      </div>
    </motion.article>
  );
}
