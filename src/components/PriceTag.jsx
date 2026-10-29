import { formatPrice } from "../utils/formatPrice.js";
import { formatDiscountLabel } from "../utils/campaignPricing.js";

/**
 * @param {import("../utils/campaignPricing.js").PriceQuote} quote
 * @param {"stored" | "withVat"} amount
 */
function amounts(quote, amount) {
  if (amount === "withVat") {
    return { previous: quote.baseWithVat, current: quote.finalWithVat };
  }
  return { previous: quote.base, current: quote.final };
}

/**
 * @param {{ amount: number, currency: string, className: string, label?: string }} props
 */
function Money({ amount, currency, className, label }) {
  return (
    <span className={`whitespace-nowrap ${className}`}>
      {label ? <span className="sr-only">{label}</span> : null}
      {formatPrice(amount, currency)}
    </span>
  );
}

/**
 * @param {{ percent: number }} props
 */
function DiscountBadge({ percent }) {
  return (
    <span className="inline-flex items-center rounded-full bg-brand-red px-2 py-0.5 font-sans text-[0.6875rem] font-bold leading-none tracking-wide text-brand-white">
      {formatDiscountLabel(percent)}
    </span>
  );
}

/**
 * @param {import("../utils/campaignPricing.js").PriceQuote} quote
 * @param {boolean} showUnit
 * @param {string} taxLabel
 */
function taxLine(quote, showUnit, taxLabel) {
  const unit = showUnit && quote.unit ? quote.unit : "";
  return `${taxLabel}${unit ? ` · ${unit}` : ""}`;
}

/**
 * @param {{
 *   quote: import("../utils/campaignPricing.js").PriceQuote
 *   layout?: "card" | "modal" | "variant"
 *   showUnit?: boolean
 * }} props
 */
export default function PriceTag({ quote, layout = "card", showUnit = true }) {
  if (!quote?.hasPrice) {
    return (
      <p className="font-sans text-sm font-medium text-brand-black">
        {formatPrice(null, quote?.currency)}
      </p>
    );
  }

  if (layout === "variant") {
    const stored = amounts(quote, "stored");
    return (
      <span className="inline-flex max-w-full flex-wrap items-baseline justify-end gap-x-2 gap-y-0.5 font-sans">
        {quote.hasDiscount ? (
          <Money
            amount={stored.previous}
            currency={quote.currency}
            label="Precio anterior: "
            className="text-xs font-medium text-brand-muted line-through decoration-brand-muted/80"
          />
        ) : null}
        <Money
          amount={stored.current}
          currency={quote.currency}
          label={quote.hasDiscount ? "Precio con descuento: " : undefined}
          className="text-sm font-semibold text-brand-black"
        />
      </span>
    );
  }

  const cardShowsNetPrice = layout === "card" && !quote.priceIncludesVat;
  const primary = amounts(
    quote,
    cardShowsNetPrice || quote.priceIncludesVat ? "stored" : "withVat",
  );
  const taxLabel = cardShowsNetPrice ? "sin IVA" : "IVA incluido";
  const finalClass =
    layout === "modal"
      ? "font-sans text-2xl font-semibold leading-none text-brand-black"
      : "font-sans text-base font-semibold leading-none text-brand-black";
  const previousClass =
    "font-sans text-sm font-medium text-brand-muted line-through decoration-brand-muted/80";

  return (
    <div className={layout === "modal" ? "min-w-0 space-y-1.5" : "min-w-0 space-y-1"}>
      {quote.hasDiscount ? <DiscountBadge percent={quote.discountPercent} /> : null}
      <p className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
        {quote.showFrom ? (
          <span className="font-sans text-sm font-medium text-brand-muted">Desde</span>
        ) : null}
        <Money
          amount={primary.current}
          currency={quote.currency}
          label={quote.hasDiscount ? "Precio con descuento: " : undefined}
          className={finalClass}
        />
        {quote.hasDiscount ? (
          <Money
            amount={primary.previous}
            currency={quote.currency}
            label="Precio anterior: "
            className={previousClass}
          />
        ) : null}
      </p>
      <p className="font-sans text-sm leading-snug text-brand-muted">
        {taxLine(quote, showUnit, taxLabel)}
      </p>
      {layout === "modal" && !quote.priceIncludesVat ? (
        <p className="font-sans text-sm leading-snug text-brand-muted">
          <span className="whitespace-nowrap">
            {formatPrice(quote.final, quote.currency)}
          </span>
          {" sin IVA"}
        </p>
      ) : null}
    </div>
  );
}
