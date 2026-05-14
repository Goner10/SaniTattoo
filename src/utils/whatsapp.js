export const WHATSAPP_PHONE_DISPLAY = "+34 686 332 011";
export const WHATSAPP_PHONE_DIGITS = "34686332011";

/** Mismo valor que WHATSAPP_PHONE_DISPLAY (imports existentes que muestran el número en UI). */
export const WHATSAPP_PHONE = WHATSAPP_PHONE_DISPLAY;

/**
 * @param {string} [message]
 * @returns {string}
 */
export function buildWhatsAppUrl(message = "") {
  const base = `https://wa.me/${WHATSAPP_PHONE_DIGITS}`;
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
