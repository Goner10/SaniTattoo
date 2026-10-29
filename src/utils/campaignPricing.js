import { getDisplayPrice, getPriceWithVat } from "./formatPrice.js";

/** Tope de setTimeout en navegadores (2^31 − 1). */
export const MAX_TIMEOUT_MS = 2_147_483_647;

/**
 * Identificador estable de marca, el mismo campo `brand` del producto
 * y de `src/data/brands.js`. No se deduce del nombre.
 * @param {{ brand?: string } | null | undefined} product
 * @returns {string | null}
 */
export function getProductBrandId(product) {
  const id = product?.brand;
  return typeof id === "string" && id.trim() ? id.trim() : null;
}

/**
 * @param {number | null | undefined} price
 * @returns {price is number}
 */
function isValidPrice(price) {
  return typeof price === "number" && !Number.isNaN(price);
}

/**
 * @param {import("../data/campaigns.js").Campaign} campaign
 * @param {number} [now]
 */
export function isCampaignActive(campaign, now = Date.now()) {
  if (!campaign?.enabled) return false;

  if (campaign.startsAt) {
    const start = Date.parse(campaign.startsAt);
    if (Number.isNaN(start) || now < start) return false;
  }

  if (campaign.endsAt) {
    const end = Date.parse(campaign.endsAt);
    if (Number.isNaN(end) || now >= end) return false;
  }

  return true;
}

/**
 * @param {import("../data/campaigns.js").Campaign[]} campaignList
 * @param {number} [now]
 */
export function getActiveCampaigns(campaignList, now = Date.now()) {
  return campaignList.filter((campaign) => isCampaignActive(campaign, now));
}

/**
 * Siguiente inicio o fin futuro. Sirve para un único temporizador compartido.
 * @param {import("../data/campaigns.js").Campaign[]} campaignList
 * @param {number} [now]
 * @returns {number | null}
 */
export function getNextCampaignBoundary(campaignList, now = Date.now()) {
  let next = null;

  for (const campaign of campaignList) {
    if (!campaign?.enabled) continue;
    for (const iso of [campaign.startsAt, campaign.endsAt]) {
      if (!iso) continue;
      const time = Date.parse(iso);
      if (Number.isNaN(time) || time <= now) continue;
      if (next == null || time < next) next = time;
    }
  }

  return next;
}

/**
 * @param {number | null} boundary
 * @param {number} [now]
 * @returns {number | null}
 */
export function getCampaignRefreshDelay(boundary, now = Date.now()) {
  if (boundary == null) return null;
  return Math.min(Math.max(0, boundary - now), MAX_TIMEOUT_MS);
}

/**
 * @param {import("../data/campaigns.js").Campaign} campaign
 * @param {{ id?: string, brand?: string }} product
 */
export function campaignMatchesProduct(campaign, product) {
  const scope = campaign?.scope;
  if (!scope?.type) return false;
  if (scope.type === "all") return true;
  if (scope.type === "products") {
    return Array.isArray(scope.productIds) && scope.productIds.includes(product?.id);
  }
  if (scope.type === "brands") {
    const brandId = getProductBrandId(product);
    return Boolean(brandId) && Array.isArray(scope.brandIds) && scope.brandIds.includes(brandId);
  }
  return false;
}

/**
 * Mayor prioridad gana. Si empatan, gana el id más bajo. Solo una campaña.
 * El campo `offer` del producto no es un descuento y no se combina.
 * @param {import("../data/campaigns.js").Campaign} a
 * @param {import("../data/campaigns.js").Campaign} b
 */
function compareCampaignPriority(a, b) {
  const priorityA = a.priority ?? 0;
  const priorityB = b.priority ?? 0;
  if (priorityB !== priorityA) return priorityB - priorityA;
  return String(a.id).localeCompare(String(b.id));
}

/**
 * @param {{ id?: string, brand?: string }} product
 * @param {import("../data/campaigns.js").Campaign[]} activeCampaigns
 * @returns {import("../data/campaigns.js").Campaign | null}
 */
export function resolveCampaign(product, activeCampaigns) {
  const matches = activeCampaigns.filter((campaign) =>
    campaignMatchesProduct(campaign, product),
  );
  if (matches.length === 0) return null;
  return matches.slice().sort(compareCampaignPriority)[0];
}

/**
 * Campaña de la franja superior y del aviso de catálogo.
 * @param {import("../data/campaigns.js").Campaign[]} activeCampaigns
 */
export function getAnnouncementCampaign(activeCampaigns) {
  if (!activeCampaigns?.length) return null;
  return activeCampaigns.slice().sort(compareCampaignPriority)[0];
}

/**
 * Misma campaña en todos los productos de la lista, o null.
 * @param {{ id?: string, brand?: string }[]} products
 * @param {import("../data/campaigns.js").Campaign[]} activeCampaigns
 */
export function resolveSharedCampaign(products, activeCampaigns) {
  if (!products?.length) return null;
  let shared = null;

  for (const product of products) {
    const campaign = resolveCampaign(product, activeCampaigns);
    if (!campaign) return null;
    if (!shared) shared = campaign;
    else if (shared.id !== campaign.id) return null;
  }

  return shared;
}

/**
 * Céntimos estables a partir de un importe ya redondeado a 2 decimales.
 * @param {number} price
 * @returns {number}
 */
function toCents(price) {
  const normalized = price.toFixed(2);
  const negative = normalized.startsWith("-");
  const [whole, frac] = normalized.replace("-", "").split(".");
  const cents = Number(whole) * 100 + Number(frac);
  return negative ? -cents : cents;
}

/**
 * Descuento en céntimos, redondeo half-up (igual criterio que el IVA).
 * @param {number} price
 * @param {number} percent
 * @returns {number}
 */
export function applyPercentDiscount(price, percent) {
  const cents = toCents(price);
  const discountedCents = Math.round((cents * (100 - percent)) / 100);
  return discountedCents / 100;
}

/**
 * @param {number} percent
 * @returns {string}
 */
export function formatDiscountLabel(percent) {
  return `−${percent} %`;
}

/**
 * @typedef {{
 *   hasPrice: boolean
 *   hasDiscount: boolean
 *   showFrom: boolean
 *   discountPercent: number
 *   base: number | null
 *   final: number | null
 *   baseWithVat: number | null
 *   finalWithVat: number | null
 *   currency: string
 *   unit: string
 *   priceIncludesVat: boolean
 *   campaign: import("../data/campaigns.js").Campaign | null
 * }} PriceQuote
 */

/**
 * @param {import("../data/products.js").Product} product
 * @param {import("../data/campaigns.js").Campaign | null} campaign
 * @param {{ variant?: { price?: number } | null }} [options]
 * @returns {PriceQuote}
 */
export function getProductPriceQuote(product, campaign, options = {}) {
  const priceIncludesVat = Boolean(product?.priceIncludesVat);
  const currency = product?.currency ?? "EUR";
  const unit = product?.unit ?? "";
  const percent =
    campaign && typeof campaign.discountPercent === "number" && campaign.discountPercent > 0
      ? campaign.discountPercent
      : 0;

  const variant = options.variant ?? null;
  const validVariantPrices = (product?.variants ?? [])
    .map((item) => item.price)
    .filter(isValidPrice);

  let base;
  let showFrom = false;

  if (variant) {
    base = isValidPrice(variant.price) ? variant.price : null;
  } else if (validVariantPrices.length > 0) {
    base = getDisplayPrice(product);
    showFrom = base != null;
  } else {
    base = isValidPrice(product?.price) ? product.price : null;
  }

  if (base == null) {
    return {
      hasPrice: false,
      hasDiscount: false,
      showFrom: false,
      discountPercent: 0,
      base: null,
      final: null,
      baseWithVat: null,
      finalWithVat: null,
      currency,
      unit,
      priceIncludesVat,
      campaign: null,
    };
  }

  const final = percent > 0 ? applyPercentDiscount(base, percent) : base;
  const hasDiscount = percent > 0 && final < base;

  return {
    hasPrice: true,
    hasDiscount,
    showFrom,
    discountPercent: hasDiscount ? percent : 0,
    base,
    final,
    baseWithVat: getPriceWithVat(base, { priceIncludesVat }),
    finalWithVat: getPriceWithVat(final, { priceIncludesVat }),
    currency,
    unit,
    priceIncludesVat,
    campaign: hasDiscount ? campaign : null,
  };
}

/**
 * Precio efectivo que vería una ordenación o un filtro: el importe mostrado
 * en tarjeta, ya descontado. Null si el producto no tiene precio.
 * @param {import("../data/products.js").Product} product
 * @param {import("../data/campaigns.js").Campaign | null} campaign
 * @returns {number | null}
 */
export function getEffectiveDisplayPrice(product, campaign) {
  const quote = getProductPriceQuote(product, campaign);
  return quote.hasPrice ? quote.final : null;
}
