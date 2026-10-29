import { formatCents } from "./formatPrice.js";
import { buildWhatsAppUrl } from "./whatsapp.js";

/**
 * Longitud máxima del enlace completo de wa.me.
 * Umbral conservador (1800) por debajo de los límites habituales de URL
 * en navegadores y en la app de WhatsApp (en torno a 2000). Si se supera,
 * no se recorta ningún producto: se copia el texto y se abre el chat vacío.
 */
export const WHATSAPP_ORDER_URL_MAX_LENGTH = 1800;

/**
 * @param {ReturnType<import("./orderPricing.js").resolveOrderSummary>} summary
 */
export function buildOrderMessage(summary) {
  const blocks = summary.lines.map((line) => {
    const variant = line.variantLabel ? ` — ${line.variantLabel}` : "";
    const title = `• ${line.quantity} × ${line.name}${variant}`;
    if (line.unitNetCents == null || line.subtotalNetCents == null) {
      return `${title}\n  Consultar precio`;
    }
    const unit = formatCents(line.unitNetCents, line.currency);
    const subtotal = formatCents(line.subtotalNetCents, line.currency);
    return `${title}\n  ${unit}/ud. · Subtotal: ${subtotal}`;
  });

  let totalLine;
  if (summary.lines.length === 0 || summary.unpricedCount === summary.lines.length) {
    totalLine = [
      "*Subtotal conocido sin IVA:* pendiente de valorar",
      `Líneas pendientes de valorar: ${summary.unpricedCount}`,
    ].join("\n");
  } else if (summary.unpricedCount > 0) {
    totalLine = [
      `*Subtotal conocido sin IVA: ${formatCents(summary.knownTotalCents ?? 0, summary.currency)}*`,
      `Líneas pendientes de valorar: ${summary.unpricedCount}`,
    ].join("\n");
  } else {
    totalLine = `*Total sin IVA: ${formatCents(summary.knownTotalCents ?? 0, summary.currency)}*`;
  }

  return [
    "Hola, me gustaría solicitar este pedido:",
    "",
    "*Precios sin IVA*",
    "",
    blocks.join("\n\n"),
    "",
    totalLine,
    "",
    "¿Podéis confirmarme disponibilidad, importe final y envío?",
  ].join("\n");
}

/**
 * @param {ReturnType<import("./orderPricing.js").resolveOrderSummary>} summary
 * @returns {{ mode: "link" | "copy", text: string, url: string, chatUrl: string }}
 */
export function prepareOrderShare(summary) {
  const text = buildOrderMessage(summary);
  const url = buildWhatsAppUrl(text);
  const chatUrl = buildWhatsAppUrl();
  if (url.length <= WHATSAPP_ORDER_URL_MAX_LENGTH) {
    return { mode: "link", text, url, chatUrl };
  }
  return { mode: "copy", text, url: chatUrl, chatUrl };
}
