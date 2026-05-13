/** Número en formato internacional sin símbolo + */
export const WHATSAPP_PHONE = "34686332011";

/**
 * @param {string} [message]
 * @returns {string}
 */
export function buildWhatsAppUrl(message = "") {
  const base = `https://wa.me/${WHATSAPP_PHONE}`;
  if (!message.trim()) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/**
 * @param {string} productName
 * @returns {string}
 */
export function productWhatsAppUrl(productName) {
  const text = `Hola, estoy interesado en este producto de Sanitattoo: ${productName}`;
  return buildWhatsAppUrl(text);
}

/**
 * @param {string} [context]
 * @returns {string}
 */
export function generalWhatsAppUrl(context = "") {
  const base =
    "Hola, me gustaría información sobre pedidos y catálogo de Sanitattoo.";
  return buildWhatsAppUrl(context.trim() ? `${base} ${context}` : base);
}
