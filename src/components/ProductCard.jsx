import { motion } from "framer-motion";
import PriceTag from "./PriceTag.jsx";
import { useCampaignState } from "../context/campaignState.js";
import { getProductPriceQuote, resolveCampaign } from "../utils/campaignPricing.js";
import { catalogCtaPrimary } from "../utils/catalogCta.js";
import { publicAssetUrl } from "../utils/publicAsset.js";

/**
 * @param {{
 *   product: import("../data/products.js").products[number]
 *   onOpenDetail?: (p: import("../data/products.js").products[number]) => void
 *   cardMotion?: "default" | "carousel"
 * }} props
 */
export default function ProductCard({ product, onOpenDetail, cardMotion = "default" }) {
  const { activeCampaigns } = useCampaignState();
  const quote = getProductPriceQuote(
    product,
    resolveCampaign(product, activeCampaigns),
  );
  const isCarousel = cardMotion === "carousel";

  function openDetail() {
    onOpenDetail?.(product);
  }

  const body = (
    <>
      <button
        type="button"
        onClick={openDetail}
        className={`relative block aspect-square w-full shrink-0 cursor-pointer overflow-hidden rounded-t-lg bg-[#f1f1f1] text-left ring-1 ring-inset ring-black/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red ${isCarousel ? "select-none" : ""}`}
        aria-label={`Ver detalle de ${product.name}`}
      >
        {product.badge ? (
          <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-brand-red px-2.5 py-1 font-sans text-[0.625rem] font-bold uppercase tracking-[0.06em] text-brand-white shadow-[0_2px_8px_rgba(5,5,5,0.18)] sm:left-3 sm:top-3 sm:px-3 sm:py-1 sm:text-xs">
            {product.badge}
          </span>
        ) : null}
        <div className="flex h-full min-h-0 w-full items-center justify-center p-3 sm:p-4 md:p-5">
          <img
            src={publicAssetUrl(product.imageSquare ?? product.image)}
            alt={product.alt}
            loading="lazy"
            draggable={false}
            onDragStart={(event) => event.preventDefault()}
            className={`max-h-full w-full max-w-full object-contain object-center ${isCarousel ? "select-none" : ""}`}
          />
        </div>
      </button>
      <div className="flex min-w-0 flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-brand-muted">
          {product.categoryLabel}
        </p>
        <h3 className="text-base font-semibold text-brand-black">
          <button
            type="button"
            onClick={openDetail}
            className="line-clamp-2 w-full break-words text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
          >
            {product.name}
          </button>
        </h3>
        <p className="line-clamp-2 text-sm font-normal text-brand-muted">
          {product.shortDescription}
        </p>
        <div className="mt-auto min-w-0">
          <PriceTag quote={quote} layout="card" />
        </div>
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

  return (
    <motion.article
      {...motionArticleProps}
      className="flex h-full flex-col overflow-hidden rounded-lg border border-brand-border bg-brand-white shadow-sm"
    >
      {body}
      <div className="mt-auto border-t border-brand-border px-4 pt-3 pb-4">
        <button
          type="button"
          onClick={openDetail}
          className={`${catalogCtaPrimary} w-full justify-center`}
          aria-label={`Ver detalle de ${product.name}`}
        >
          Ver detalle
        </button>
      </div>
    </motion.article>
  );
}
