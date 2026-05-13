/** @typedef {{ label: string, price: number, sku?: string }} ProductVariant */

/**
 * @typedef {{
 *   id: string
 *   sku: string
 *   name: string
 *   slug: string
 *   category: string
 *   categoryLabel: string
 *   price: number | null
 *   currency: string
 *   unit: string
 *   image: string
 *   alt: string
 *   shortDescription: string
 *   description: string
 *   tags: string[]
 *   featured: boolean
 *   offer: boolean
 *   active: boolean
 *   variants?: ProductVariant[]
 *   merchandisingFeatured?: boolean
 * }} Product
 */

/** @type {Product[]} */
export const products = [
  {
    id: "green-soap-cleansing-foam",
    sku: "SAN-GREEN-SOAP-FOAM-220",
    name: "Green Soap Cleaning Foam",
    slug: "green-soap-cleaning-foam",
    category: "aftercare",
    categoryLabel: "Aftercare",
    price: 8,
    currency: "EUR",
    unit: "220ml",
    image: "/images/productos/green-soap-cleansing-foam.png",
    alt: "Bote de espuma limpiadora Green Soap Cleansing Foam",
    shortDescription:
      "Espuma limpiadora suave para la piel durante y después del tatuaje.",
    description:
      "Espuma limpiadora formulada para uso profesional en estudio. Ayuda a retirar residuos de tinta y mantiene la zona cómoda durante el proceso y el aftercare.",
    tags: ["aftercare", "green soap", "limpieza", "espuma"],
    featured: true,
    offer: false,
    active: true,
  },
  {
    id: "green-soap-cleansing-foam",
    sku: "SAN-GREEN-SOAP-FOAM-220",
    name: "Green Soap Cleaning Foam",
    slug: "green-soap-cleaning-foam",
    category: "aftercare",
    categoryLabel: "Aftercare",
    price: 8,
    currency: "EUR",
    unit: "220ml",
    image: "/images/productos/green-soap-cleansing-foam.png",
    alt: "Bote de espuma limpiadora Green Soap Cleansing Foam",
    shortDescription:
      "Espuma limpiadora suave para la piel durante y después del tatuaje.",
    description:
      "Espuma limpiadora formulada para uso profesional en estudio. Ayuda a retirar residuos de tinta y mantiene la zona cómoda durante el proceso y el aftercare.",
    tags: ["aftercare", "green soap", "limpieza", "espuma"],
    featured: true,
    offer: false,
    active: true,
  },
  {
    id: "gel-stencil-premium",
    sku: "SAN-GEL-STENCIL-100",
    name: "Gel Stencil Premium",
    slug: "gel-stencil-premium",
    category: "stencil-preparacion",
    categoryLabel: "Stencil y preparación",
    price: 12,
    currency: "EUR",
    unit: "100ml",
    image: "/images/productos/gel-stencil-premium.png",
    alt: "Gel para stencil premium en formato bote",
    shortDescription:
      "Gel de transferencia para stencil con acabado nítido y fijación fiable.",
    description:
      "Gel premium para preparación de stencil. Pensado para uso en estudio con textura de trabajo cómoda y transferencias consistentes.",
    tags: ["stencil", "gel", "transfer", "preparación"],
    featured: true,
    offer: false,
    active: true,
    variants: [
      { label: "100ml", price: 12, sku: "SAN-GEL-STENCIL-100" },
      { label: "220ml", price: 18, sku: "SAN-GEL-STENCIL-220" },
    ],
  },
  {
    id: "gel-stencil-premium",
    sku: "SAN-GEL-STENCIL-100",
    name: "Gel Stencil Premium",
    slug: "gel-stencil-premium",
    category: "stencil-preparacion",
    categoryLabel: "Stencil y preparación",
    price: 12,
    currency: "EUR",
    unit: "100ml",
    image: "/images/productos/gel-stencil-premium.png",
    alt: "Gel para stencil premium en formato bote",
    shortDescription:
      "Gel de transferencia para stencil con acabado nítido y fijación fiable.",
    description:
      "Gel premium para preparación de stencil. Pensado para uso en estudio con textura de trabajo cómoda y transferencias consistentes.",
    tags: ["stencil", "gel", "transfer", "preparación"],
    featured: true,
    offer: false,
    active: true,
    variants: [
      { label: "100ml", price: 12, sku: "SAN-GEL-STENCIL-100" },
      { label: "220ml", price: 18, sku: "SAN-GEL-STENCIL-220" },
    ],
  },
  {
    id: "camiseta-sanitattoo",
    sku: "SAN-MERCH-CAMISETA",
    name: "Camiseta SANITATTOO",
    slug: "camiseta-sanitattoo",
    category: "merchandising",
    categoryLabel: "Merchandising",
    price: null,
    currency: "EUR",
    unit: "1 unidad",
    image: "/images/placeholders/product-placeholder.png",
    alt: "Camiseta de merchandising SANITATTOO",
    shortDescription: "Camiseta oficial de marca. Consulta tallas y stock por WhatsApp.",
    description:
      "Textil de merchandising SANITATTOO. Disponibilidad y tallas sujetas a stock; te informamos al momento por WhatsApp.",
    tags: ["merchandising", "camiseta", "textil"],
    featured: false,
    offer: false,
    active: true,
    merchandisingFeatured: true,
  },
];

export function getActiveProducts() {
  return products.filter((p) => p.active);
}
