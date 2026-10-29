import { getNetPrice, getProductPriceQuote, resolveCampaign, toCents } from "./campaignPricing.js";
import { findVariantIdentity } from "./variantIdentity.js";

/**
 * @param {import("../data/products.js").Product} product
 */
function netOptions(product) {
  return {
    priceIncludesVat: Boolean(product.priceIncludesVat),
    vatRate: typeof product.vatRate === "number" ? product.vatRate : undefined,
  };
}

/**
 * Resumen económico del pedido. Los importes salen del catálogo y de las
 * campañas vigentes: el descuento se aplica una vez en getProductPriceQuote
 * y el neto se obtiene después con getNetPrice.
 *
 * Unidad y subtotal viven en céntimos. El subtotal es el unitario neto
 * multiplicado por la cantidad; el total es la suma de subtotales.
 *
 * @param {{ productId: string, variantId: string | null, quantity: number }[]} lines
 * @param {import("../data/products.js").Product[]} catalog
 * @param {import("../data/campaigns.js").Campaign[]} activeCampaigns
 */
export function resolveOrderSummary(lines, catalog, activeCampaigns) {
  const byId = new Map(catalog.map((product) => [product.id, product]));
  const resolved = [];

  for (const line of lines) {
    const product = byId.get(line.productId);
    if (!product?.active) continue;

    const hasVariants = Boolean(product.variants?.length);
    const variant = hasVariants ? findVariantIdentity(product, line.variantId) : null;
    if (hasVariants && !variant) continue;
    if (!hasVariants && line.variantId) continue;

    const campaign = resolveCampaign(product, activeCampaigns);
    const quote = getProductPriceQuote(product, campaign, {
      variant: variant ?? undefined,
    });
    const unitNetCents = quote.hasPrice
      ? toCents(getNetPrice(quote.final, netOptions(product)))
      : null;
    const subtotalNetCents = unitNetCents == null ? null : unitNetCents * line.quantity;

    resolved.push({
      key: `${product.id}::${variant?.id ?? ""}`,
      productId: product.id,
      variantId: variant?.id ?? null,
      name: product.name,
      variantLabel: variant?.label ?? null,
      image: product.imageSquare || product.image,
      alt: product.alt,
      currency: product.currency || "EUR",
      quantity: line.quantity,
      unitNetCents,
      subtotalNetCents,
    });
  }

  const unpricedCount = resolved.filter((line) => line.unitNetCents == null).length;
  const knownTotalCents = resolved.reduce(
    (sum, line) => sum + (line.subtotalNetCents ?? 0),
    0,
  );

  return {
    lines: resolved,
    knownTotalCents: unpricedCount === resolved.length ? null : knownTotalCents,
    unpricedCount,
    currency: resolved.find((line) => line.currency)?.currency ?? "EUR",
    fingerprint: orderFingerprint(resolved, unpricedCount),
  };
}

/**
 * @param {{ productId: string, variantId: string | null, quantity: number, unitNetCents: number | null, subtotalNetCents: number | null }[]} lines
 * @param {number} unpricedCount
 */
export function orderFingerprint(lines, unpricedCount) {
  const knownTotalCents = lines.reduce((sum, line) => sum + (line.subtotalNetCents ?? 0), 0);
  const totalToken = unpricedCount === lines.length ? "pending" : String(knownTotalCents);
  const body = lines
    .map((line) =>
      [
        line.productId,
        line.variantId ?? "",
        line.quantity,
        line.unitNetCents ?? "x",
        line.subtotalNetCents ?? "x",
      ].join(":"),
    )
    .join("|");
  return `${body}#${totalToken}#${unpricedCount}`;
}
