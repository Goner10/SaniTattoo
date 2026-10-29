/**
 * Campañas comerciales. Los precios del catálogo no se modifican aquí:
 * el descuento se calcula al mostrar y al preparar el pedido.
 *
 * Para activar o apagar una campaña, cambia `enabled`.
 * `startsAt` y `endsAt` son opcionales e ISO 8601 con zona explícita.
 * El fin es exclusivo: en ese instante la campaña ya no aplica.
 * Si varias campañas coinciden, gana la de mayor `priority` (no se acumulan).
 * El texto debe describir el alcance real (`all`, `brands` o `products`).
 *
 * @typedef {"all" | "products" | "brands"} CampaignScopeType
 * @typedef {{
 *   type: CampaignScopeType
 *   productIds?: string[]
 *   brandIds?: string[]
 * }} CampaignScope
 * @typedef {{
 *   barHeadline: string
 *   barDeadline: string
 *   barCtaLabel: string
 *   barCtaTo: string
 *   catalogEyebrow: string
 *   catalogTitle: string
 *   catalogDeadline: string
 *   featuredEyebrow: string
 *   featuredTitle: string
 *   featuredSubtitle: string
 *   featuredCtaLabel: string
 *   featuredCtaTo: string
 * }} CampaignCopy
 * @typedef {{
 *   id: string
 *   name: string
 *   enabled: boolean
 *   startsAt?: string
 *   endsAt?: string
 *   discountPercent: number
 *   priority: number
 *   scope: CampaignScope
 *   copy: CampaignCopy
 * }} Campaign
 */

/** @type {Campaign[]} */
export const campaigns = [
  {
    id: "halloween-2026",
    name: "Halloween",
    enabled: true,
    endsAt: "2026-11-01T00:00:00+01:00",
    discountPercent: 20,
    priority: 10,
    scope: { type: "all" },
    copy: {
      barHeadline: "HALLOWEEN  -20 % EN TODA LA WEB",
      barDeadline: "Hasta el 31/10",
      
      catalogEyebrow: "Especial Halloween",
      catalogTitle: "−20 % en toda la web",
      catalogDeadline: "Hasta el sábado 31 de octubre",
      featuredEyebrow: "Especial Halloween",
      featuredTitle: "Precios de miedo...",
      featuredSubtitle:
        "Aprovecha el 20 % de descuento en toda la web hasta el sábado 31 de octubre.",
      featuredCtaLabel: "Ver catálogo con descuento",
      featuredCtaTo: "/catalogo",
    },
  },
];

/*
Ejemplos para más adelante. No están activos: hay que añadirlos al array.

Campaña global:
{
  id: "rebajas-2027",
  name: "Rebajas",
  enabled: false,
  endsAt: "2027-01-15T00:00:00+01:00",
  discountPercent: 15,
  priority: 10,
  scope: { type: "all" },
  copy: {
    barHeadline: "REBAJAS · −15 % EN TODA LA WEB",
    barDeadline: "Hasta el 14/01",
    barCtaLabel: "Ver catálogo",
    barCtaTo: "/catalogo",
    catalogEyebrow: "Rebajas",
    catalogTitle: "−15 % en toda la web",
    catalogDeadline: "Hasta el 14 de enero",
    featuredEyebrow: "Rebajas",
    featuredTitle: "Destacados con −15 %",
    featuredSubtitle: "El 15 % de descuento también aplica a esta selección.",
    featuredCtaLabel: "Ver catálogo con descuento",
    featuredCtaTo: "/catalogo",
  },
}

Campaña por marca (identificador de src/data/brands.js):
{
  id: "proton-2027",
  name: "Proton",
  enabled: false,
  discountPercent: 10,
  priority: 20,
  scope: { type: "brands", brandIds: ["proton"] },
  copy: {
    barHeadline: "PROTON · −10 % EN LA MARCA",
    barDeadline: "Por tiempo limitado",
    barCtaLabel: "Ver Proton",
    barCtaTo: "/catalogo?brand=proton",
    catalogEyebrow: "Especial Proton",
    catalogTitle: "−10 % en Proton",
    catalogDeadline: "En los productos de la marca",
    featuredEyebrow: "Especial Proton",
    featuredTitle: "Destacados Proton",
    featuredSubtitle: "10 % de descuento en los productos Proton de esta selección.",
    featuredCtaLabel: "Ver Proton",
    featuredCtaTo: "/catalogo?brand=proton",
  },
}

Campaña por productos (id de src/data/products.js):
{
  id: "gel-stencil-2027",
  name: "Gel stencil",
  enabled: false,
  discountPercent: 15,
  priority: 30,
  scope: { type: "products", productIds: ["gel-stencil-premium"] },
  copy: {
    barHeadline: "GEL STENCIL · −15 % EN PRODUCTOS SELECCIONADOS",
    barDeadline: "Por tiempo limitado",
    barCtaLabel: "Ver catálogo",
    barCtaTo: "/catalogo",
    catalogEyebrow: "Selección",
    catalogTitle: "−15 % en productos seleccionados",
    catalogDeadline: "Solo en las referencias incluidas",
    featuredEyebrow: "Selección",
    featuredTitle: "Destacados con descuento",
    featuredSubtitle: "El descuento aplica solo a los productos incluidos en la campaña.",
    featuredCtaLabel: "Ver catálogo",
    featuredCtaTo: "/catalogo",
  },
}
*/
