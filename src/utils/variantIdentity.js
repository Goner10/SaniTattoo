const SIZE_LABEL = /^(?:talla\s+)?(?:xxs|xs|s|m|l|xl|xxl|xxxl|[2-5]xl|\d{2})$/i;
const FORMAT_LABEL =
  /(?:\d+(?:[.,]\d+)?\s*(?:ml|cl|mm|cm|ud|unidades)\b|\d+\s*x\s*\d+)/i;

/**
 * Slug estable a partir de la etiqueta visible. No usa la posición en el array.
 * @param {string} label
 * @returns {string}
 */
export function slugifyVariantLabel(label) {
  return String(label ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Identidad de cada variante del producto.
 * Prioriza `variant.id`. Si no existe, usa el slug de `label`.
 * El SKU no sirve como identidad: hay formatos distintos con el mismo SKU.
 * @param {{ variants?: { id?: string, label: string, sku?: string, price?: number }[] } | null | undefined} product
 * @returns {Array<{ id: string, label: string, sku?: string, price?: number }>}
 */
export function listVariantIdentities(product) {
  const used = new Set();

  return (product?.variants ?? []).map((variant) => {
    const explicit = typeof variant?.id === "string" ? variant.id.trim() : "";
    let id = explicit || slugifyVariantLabel(variant?.label);
    if (!id) id = "variante";

    if (used.has(id)) {
      const skuSlug = slugifyVariantLabel(variant?.sku || "");
      const withSku = skuSlug ? `${id}--${skuSlug}` : "";
      id = withSku && !used.has(withSku) ? withSku : id;
      let n = 2;
      while (used.has(id)) {
        id = `${explicit || slugifyVariantLabel(variant?.label) || "variante"}--${n}`;
        n += 1;
      }
    }

    used.add(id);
    return { ...variant, id };
  });
}

/**
 * @param {{ variants?: { id?: string, label: string }[] } | null | undefined} product
 * @param {string | null | undefined} variantId
 */
export function findVariantIdentity(product, variantId) {
  if (!variantId) return null;
  return listVariantIdentities(product).find((variant) => variant.id === variantId) ?? null;
}

/**
 * Texto del botón de tarjeta según las etiquetas reales.
 * @param {{ label: string }[] | undefined} variants
 * @returns {"Elegir talla" | "Elegir formato" | "Elegir opción"}
 */
export function getVariantActionLabel(variants) {
  if (!variants?.length) return "Elegir opción";
  const labels = variants.map((variant) => String(variant.label ?? "").trim());
  if (labels.every((label) => SIZE_LABEL.test(label))) return "Elegir talla";
  if (labels.every((label) => FORMAT_LABEL.test(label))) return "Elegir formato";
  return "Elegir opción";
}

/**
 * @param {{ label: string }[] | undefined} variants
 * @returns {{ action: string, prompt: string }}
 */
export function getVariantChoiceCopy(variants) {
  const action = getVariantActionLabel(variants);
  if (action === "Elegir talla") {
    return { action, prompt: "Elige una talla para añadirla al pedido." };
  }
  if (action === "Elegir formato") {
    return { action, prompt: "Elige un formato para añadirlo al pedido." };
  }
  return { action, prompt: "Elige una opción para añadirla al pedido." };
}
