/** Tope técnico por línea. No representa stock. */
export const MAX_LINE_QUANTITY = 99;

/** Tope técnico de líneas distintas en la lista. */
export const MAX_ORDER_LINES = 40;

/**
 * @param {{ productId: string, variantId?: string | null }} line
 * @returns {string}
 */
export function orderLineKey(line) {
  return `${line.productId}::${line.variantId ?? ""}`;
}

/**
 * @param {unknown} value
 * @returns {number | null}
 */
export function parseOrderQuantity(value) {
  if (typeof value === "number") {
    if (!Number.isInteger(value) || value < 1 || value > MAX_LINE_QUANTITY) return null;
    return value;
  }
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!/^\d+$/.test(trimmed)) return null;
  const parsed = Number(trimmed);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > MAX_LINE_QUANTITY) return null;
  return parsed;
}

/**
 * @param {import("../data/products.js").Product | null | undefined} product
 * @param {string | null | undefined} variantId
 * @param {unknown} quantity
 * @param {(product: import("../data/products.js").Product, variantId: string | null) => { id: string } | null} findVariant
 */
export function prepareOrderLine(product, variantId, quantity, findVariant) {
  if (!product?.active || !product.id) return { ok: false, reason: "unavailable" };
  const parsed = parseOrderQuantity(quantity);
  if (parsed == null) return { ok: false, reason: "quantity" };

  const hasVariants = Boolean(product.variants?.length);
  if (hasVariants) {
    if (!variantId) return { ok: false, reason: "variant" };
    const match = findVariant(product, variantId);
    if (!match) return { ok: false, reason: "variant" };
    return {
      ok: true,
      line: { productId: product.id, variantId: match.id, quantity: parsed },
    };
  }

  if (variantId) return { ok: false, reason: "variant" };
  return {
    ok: true,
    line: { productId: product.id, variantId: null, quantity: parsed },
  };
}

/**
 * Suma cantidades si ya existe la misma combinación producto + variante.
 * @param {{ productId: string, variantId: string | null, quantity: number }[]} lines
 * @param {{ productId: string, variantId: string | null, quantity: number }} input
 */
export function addOrderLine(lines, input) {
  const quantity = parseOrderQuantity(input.quantity);
  if (quantity == null) return { ok: false, reason: "quantity", lines };

  const nextLine = {
    productId: input.productId,
    variantId: input.variantId ?? null,
    quantity,
  };
  const key = orderLineKey(nextLine);
  const existing = lines.find((line) => orderLineKey(line) === key);

  if (existing) {
    const sum = existing.quantity + quantity;
    const cappedQuantity = Math.min(MAX_LINE_QUANTITY, sum);
    return {
      ok: true,
      capped: cappedQuantity < sum,
      lines: lines.map((line) =>
        orderLineKey(line) === key ? { ...line, quantity: cappedQuantity } : line,
      ),
    };
  }

  if (lines.length >= MAX_ORDER_LINES) {
    return { ok: false, reason: "lines", lines };
  }

  return {
    ok: true,
    capped: false,
    lines: [...lines, nextLine],
  };
}

/**
 * @param {{ productId: string, variantId: string | null, quantity: number }[]} lines
 * @param {string} key
 * @param {unknown} quantity
 */
export function setOrderLineQuantity(lines, key, quantity) {
  const parsed = parseOrderQuantity(quantity);
  if (parsed == null) return { ok: false, lines };
  if (!lines.some((line) => orderLineKey(line) === key)) return { ok: false, lines };
  return {
    ok: true,
    lines: lines.map((line) =>
      orderLineKey(line) === key ? { ...line, quantity: parsed } : line,
    ),
  };
}

/**
 * @param {{ productId: string, variantId: string | null, quantity: number }[]} lines
 * @param {string} key
 */
export function removeOrderLine(lines, key) {
  return lines.filter((line) => orderLineKey(line) !== key);
}
