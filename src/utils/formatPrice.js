/** IVA general aplicado al PVP mostrado en el modal. */
export const VAT_RATE = 0.21;

/**
 * @param {number | null | undefined} price Precio base sin IVA
 * @param {{ priceIncludesVat?: boolean }} [options]
 * @returns {number | null}
 */
export function getPriceWithVat(price, options = {}) {
  if (price == null) return null;
  if (options.priceIncludesVat) return price;
  return Math.round(price * (1 + VAT_RATE) * 100) / 100;
}

/**
 * @param {number | null | undefined} price
 * @param {string} [currency]
 * @returns {string}
 */
export function formatPrice(price, currency = "EUR") {
  if (price === null || price === undefined) {
    return "Consultar precio";
  }
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(price);
}

/**
 * Precio base mostrable. Con variantes válidas, el mínimo es solo el de
 * esas variantes (el “Desde”). Si no hay, usa el precio del producto.
 * @param {{ price?: number | null, variants?: { price?: number }[] }} product
 * @returns {number | null}
 */
export function getDisplayPrice(product) {
  const variantPrices = (product?.variants ?? [])
    .map((variant) => variant.price)
    .filter((price) => typeof price === "number" && !Number.isNaN(price));

  if (variantPrices.length > 0) return Math.min(...variantPrices);
  if (typeof product?.price === "number" && !Number.isNaN(product.price)) {
    return product.price;
  }
  return null;
}
