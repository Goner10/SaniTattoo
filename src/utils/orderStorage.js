import { MAX_LINE_QUANTITY, MAX_ORDER_LINES, orderLineKey, parseOrderQuantity } from "./orderList.js";
import { findVariantIdentity } from "./variantIdentity.js";

export const ORDER_SCHEMA_VERSION = 1;
export const ORDER_STORAGE_KEY = "sanitattoo.order.v1";

/** Tamaño máximo del JSON guardado. Por encima se descarta. */
export const MAX_STORED_CHARS = 20_000;

/**
 * Solo identificadores y cantidad. Precios y nombres se resuelven del catálogo.
 * @param {{ productId: string, variantId: string | null, quantity: number }[]} lines
 */
export function serializeOrder(lines) {
  return JSON.stringify({
    version: ORDER_SCHEMA_VERSION,
    lines: lines.map((line) => ({
      productId: line.productId,
      variantId: line.variantId,
      quantity: line.quantity,
    })),
  });
}

/**
 * @param {Storage} storage
 * @returns {{ ok: true, raw: string | null } | { ok: false, raw: null }}
 */
export function readRawOrder(storage) {
  try {
    return { ok: true, raw: storage.getItem(ORDER_STORAGE_KEY) };
  } catch {
    return { ok: false, raw: null };
  }
}

/**
 * @param {Storage} storage
 * @param {{ productId: string, variantId: string | null, quantity: number }[]} lines
 */
export function writeRawOrder(storage, lines) {
  try {
    storage.setItem(ORDER_STORAGE_KEY, serializeOrder(lines));
    return true;
  } catch {
    return false;
  }
}

/**
 * @param {unknown} value
 * @returns {{ productId: string, variantId: string | null, quantity: number } | null}
 */
function readStoredLine(value) {
  if (!value || typeof value !== "object") return null;
  const item = /** @type {{ productId?: unknown, variantId?: unknown, quantity?: unknown }} */ (
    value
  );
  if (typeof item.productId !== "string" || !item.productId.trim()) return null;

  let variantId = null;
  if (!(item.variantId == null || item.variantId === "")) {
    if (typeof item.variantId === "string" && item.variantId.trim()) {
      variantId = item.variantId.trim();
    } else {
      return null;
    }
  }

  const quantity = parseOrderQuantity(item.quantity);
  if (quantity == null) return null;

  return { productId: item.productId.trim(), variantId, quantity };
}

/**
 * @param {string | null | undefined} raw
 * @param {import("../data/products.js").Product[]} catalog
 * @returns {{
 *   lines: { productId: string, variantId: string | null, quantity: number }[]
 *   notices: string[]
 * }}
 */
export function parseStoredOrder(raw, catalog) {
  if (raw == null || raw === "") return { lines: [], notices: [] };
  if (typeof raw !== "string" || raw.length > MAX_STORED_CHARS) {
    return {
      lines: [],
      notices: ["No se ha podido leer el pedido guardado en este dispositivo."],
    };
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return {
      lines: [],
      notices: ["No se ha podido leer el pedido guardado en este dispositivo."],
    };
  }

  if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.lines)) {
    return {
      lines: [],
      notices: ["No se ha podido leer el pedido guardado en este dispositivo."],
    };
  }

  if (typeof parsed.version !== "number") {
    return {
      lines: [],
      notices: ["No se ha podido leer el pedido guardado en este dispositivo."],
    };
  }

  const byId = new Map(catalog.map((product) => [product.id, product]));
  /** @type {Map<string, { productId: string, variantId: string | null, quantity: number }>} */
  const merged = new Map();
  const notices = [];
  let invalid = 0;
  let droppedForLimit = 0;
  let capped = false;

  for (const item of parsed.lines) {
    const line = readStoredLine(item);
    if (!line) {
      invalid += 1;
      continue;
    }

    const product = byId.get(line.productId);
    if (!product || product.active === false) {
      notices.push(
        product
          ? `${product.name} ya no está disponible y se ha quitado de tu pedido.`
          : "Una referencia guardada ya no está en el catálogo y se ha quitado de tu pedido.",
      );
      continue;
    }

    const hasVariants = Boolean(product.variants?.length);
    if (hasVariants) {
      if (!line.variantId || !findVariantIdentity(product, line.variantId)) {
        notices.push(
          `${product.name}: la variante guardada ya no está disponible y se ha quitado de tu pedido.`,
        );
        continue;
      }
    } else if (line.variantId) {
      notices.push(
        `${product.name}: la variante guardada ya no está disponible y se ha quitado de tu pedido.`,
      );
      continue;
    }

    const key = orderLineKey(line);
    const current = merged.get(key);
    if (!current) {
      if (merged.size >= MAX_ORDER_LINES) {
        droppedForLimit += 1;
        continue;
      }
      merged.set(key, line);
      continue;
    }

    const sum = current.quantity + line.quantity;
    const quantity = Math.min(MAX_LINE_QUANTITY, sum);
    if (quantity < sum) capped = true;
    merged.set(key, { ...current, quantity });
  }

  if (invalid > 0) {
    notices.push("Se han quitado líneas del pedido guardado que no se pudieron leer.");
  }
  if (droppedForLimit > 0) {
    notices.push("Se han quitado líneas que superaban el tamaño máximo de la lista.");
  }
  if (capped) {
    notices.push(`Se ha ajustado una cantidad al máximo de ${MAX_LINE_QUANTITY} por línea.`);
  }

  return { lines: [...merged.values()], notices };
}
