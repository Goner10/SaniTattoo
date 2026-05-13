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
 * Precio mostrable para tarjetas: si hay variantes, devuelve el mínimo.
 * @param {{ price: number | null, variants?: { price: number }[] }} product
 * @returns {number | null}
 */
export function getDisplayPrice(product) {
  const variantPrices = product.variants?.map((v) => v.price) ?? [];
  const candidates = [product.price, ...variantPrices].filter(
    (n) => typeof n === "number" && !Number.isNaN(n),
  );
  if (candidates.length === 0) return null;
  return Math.min(...candidates);
}
