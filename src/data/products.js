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
 *   gallery?: string[]
 * }} Product
 */

/** @type {Product[]} */
export const products = [
  {
    id: "green-soap-cleansing-foam",
    sku: "SAN-GREEN-SOAP-FOAM-220",
    name: "Green Soap Cleaning Foam",
    slug: "green-soap-cleansing-foam",
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
    id: "servilletas-ghost-tattoo",
    sku: "SAN-SERVILLETAS-GHOST-TATTOO-125",
    name: "Servilletas Ghost Tattoo",
    slug: "servilletas-ghost-tattoo",
    category: "consumibles",
    categoryLabel: "Consumibles",
    price: 7.5,
    currency: "EUR",
    unit: "125 unidades",
    image: "/images/productos/ghost.png",
    alt: "Paquete de servilletas absorbentes Ghost Tattoo para estudio",
    shortDescription:
      "Servilletas super absorbentes con sistema de envasado y corte.",
    description:
      "Súper absorbente",
    tags: ["consumibles", "servilletas", "ghost tattoo", "estudio"],
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
    id: "red-out-bioactive-calming-foam",
    sku: "SAN-RED-OUT-BIOACTIVE-FOAM-220",
    name: "Red Out bioactive calming foam",
    slug: "red-out-bioactive-calming-foam",
    category: "aftercare",
    categoryLabel: "Aftercare",
    price: 12,
    currency: "EUR",
    unit: "220ml",
    image: "/images/productos/red_out.png",
    alt: "Bote de espuma calmante bioactiva Red Out para la piel en estudio",
    shortDescription:
      "Espuma bioactiva calmante para la piel durante y después del tatuaje.",
    description:
      "Espuma calmante formulada para uso profesional en estudio. Ayuda a aportar sensación de confort a la piel durante el trabajo y en fases de aftercare.",
    tags: ["aftercare", "red out", "espuma", "calmante", "piel"],
    featured: true,
    offer: false,
    active: true,
  },
  {
    id: "camiseta-sanitattoo-blanca",
    sku: "SAN-MERCH-CAMISETA-BLANCA",
    name: "Camiseta blanca SANITATTOO",
    slug: "camiseta-sanitattoo-blanca",
    category: "merchandising",
    categoryLabel: "Merchandising",
    price: null,
    currency: "EUR",
    unit: "1 unidad",
    image: "/images/merchandising/camiseta-blanca-trasera.jpg",
    alt: "Camiseta de merchandising SANITATTOO",
    shortDescription: "Camiseta oficial de marca. Consulta tallas y stock por WhatsApp.",
    description:
      "Textil de merchandising SANITATTOO. Disponibilidad y tallas sujetas a stock; te informamos al momento por WhatsApp.",
    tags: ["merchandising", "camiseta", "textil"],
    featured: false,
    offer: false,
    active: true,
    merchandisingFeatured: true,
    gallery: [
      "/images/merchandising/camiseta-blanca-trasera.jpg",
      "/images/merchandising/pack-merchandising.jpg",
    ],
  },
  {
    id: "camiseta-sanitattoo-negra",
    sku: "SAN-MERCH-CAMISETA-NEGRA",
    name: "Camiseta negra SANITATTOO",
    slug: "camiseta-sanitattoo-negra",
    category: "merchandising",
    categoryLabel: "Merchandising",
    price: null,
    currency: "EUR",
    unit: "1 unidad",
    image: "/images/merchandising/camiseta-negra-frontal.jpg",
    alt: "Camiseta negra de merchandising SANITATTOO",
    shortDescription: "Camiseta oficial de marca. Consulta tallas y stock por WhatsApp.",
    description:
      "Textil de merchandising SANITATTOO. Disponibilidad y tallas sujetas a stock; te informamos al momento por WhatsApp.",
    tags: ["merchandising", "camiseta", "textil"],
    featured: false,
    offer: false,
    active: true,
    merchandisingFeatured: true,
    gallery: [
      "/images/merchandising/camiseta-negra-frontal.jpg",
      "/images/merchandising/pack-merchandising.jpg",
    ],
  },
  {
    id: "guantes-nitrilo-100",
    sku: "SAN-GUANTES-NITRILO-NEGRO-100",
    name: "Guantes de nitrilo",
    slug: "guantes-nitrilo-100",
    category: "proteccion-higiene",
    categoryLabel: "Protección e higiene",
    price: 3.5,
    currency: "EUR",
    unit: "100 unidades",
    image: "/images/placeholders/product-placeholder.png",
    alt: "Caja de guantes de nitrilo desechables para estudio de tatuaje",
    shortDescription:
      "Guantes desechables de nitrilo en caja de 100 unidades. Disponibles en varios colores.",
    description:
      "Guantes de nitrilo pensados para protección e higiene en sesión. Buen ajuste y tacto para trabajo preciso. Indica color al pedir por WhatsApp.",
    tags: ["protección", "higiene", "guantes", "nitrilo", "desechables"],
    featured: false,
    offer: false,
    active: true,
    variants: [
      { label: "Negro", price: 3.5, sku: "SAN-GUANTES-NITRILO-NEGRO-100" },
      { label: "Azul", price: 3.5, sku: "SAN-GUANTES-NITRILO-AZUL-100" },
      { label: "Violeta", price: 3.5, sku: "SAN-GUANTES-NITRILO-VIOLETA-100" },
    ],
  },
  {
    id: "guantes-latex-sin-polvo-100",
    sku: "SAN-GUANTES-LATEX-SP-100",
    name: "Guantes de látex sin polvo",
    slug: "guantes-latex-sin-polvo-100",
    category: "proteccion-higiene",
    categoryLabel: "Protección e higiene",
    price: 4.8,
    currency: "EUR",
    unit: "100 unidades",
    image: "/images/placeholders/product-placeholder.png",
    alt: "Caja de guantes de látex sin polvo para uso profesional",
    shortDescription:
      "Guantes de látex sin polvo en caja de 100 unidades para protección en estudio.",
    description:
      "Guantes de látex sin polvo para uso profesional. Ideales cuando buscas una alternativa al nitrilo manteniendo buena sensibilidad táctil.",
    tags: ["protección", "higiene", "guantes", "látex", "sin polvo"],
    featured: false,
    offer: false,
    active: true,
  },
  {
    id: "rasuradoras-doble-hoja-100",
    sku: "SAN-RASURADORAS-DOBLE-HOJA-100",
    name: "Rasuradoras doble hoja",
    slug: "rasuradoras-doble-hoja-100",
    category: "consumibles",
    categoryLabel: "Consumibles",
    price: 11,
    currency: "EUR",
    unit: "100 unidades",
    image: "/images/placeholders/product-placeholder.png",
    alt: "Paquete de rasuradoras de doble hoja desechables para estudio",
    shortDescription:
      "Rasuradoras de doble hoja en formato práctico para preparación de piel.",
    description:
      "Consumible de uso frecuente para preparar la zona antes del tatuaje. Presentación de 100 unidades.",
    tags: ["consumibles", "rasuradora", "preparación", "piel"],
    featured: false,
    offer: false,
    active: true,
  },
  {
    id: "depresores-madera-100",
    sku: "SAN-DEPRESORES-MADERA-100",
    name: "Depresores de madera",
    slug: "depresores-madera-100",
    category: "consumibles",
    categoryLabel: "Consumibles",
    price: 1,
    currency: "EUR",
    unit: "100 unidades",
    image: "/images/placeholders/product-placeholder.png",
    alt: "Depresores de lengua de madera embolsados para estudio",
    shortDescription:
      "Depresores de madera en bolsa de 100 unidades para aplicación y mezcla.",
    description:
      "Depresores de madera desechables, útiles para extender productos, mezclar o trabajar la zona con control. Formato de 100 unidades.",
    tags: ["consumibles", "depresores", "madera", "estudio"],
    featured: false,
    offer: false,
    active: true,
  },
  {
    id: "servilletas-absorbentes-30x30-100",
    sku: "SAN-SERVILLETAS-ABSORB-30X30-100",
    name: "Servilletas absorbentes 30x30",
    slug: "servilletas-absorbentes-30x30-100",
    category: "consumibles",
    categoryLabel: "Consumibles",
    price: 6.15,
    currency: "EUR",
    unit: "100 unidades",
    image: "/images/placeholders/product-placeholder.png",
    alt: "Servilletas absorbentes 30 por 30 centímetros en paquete",
    shortDescription:
      "Servilletas absorbentes 30x30 cm, paquete de 100 unidades.",
    description:
      "Servilletas de uso en sesión para absorber y trabajar con comodidad. Medidas 30x30 cm, presentación de 100 unidades.",
    tags: ["consumibles", "servilletas", "absorbente", "30x30"],
    featured: false,
    offer: false,
    active: true,
  },
  {
    id: "papel-camilla-polipropileno-precorte-1u",
    sku: "SAN-PAPEL-CAMILLA-PP-PRECORTE-N-1U",
    name: "Papel camilla polipropileno con precorte",
    slug: "papel-camilla-polipropileno-precorte-1u",
    category: "mobiliario-camilla",
    categoryLabel: "Mobiliario y camilla",
    price: 8,
    currency: "EUR",
    unit: "1 unidad",
    image: "/images/placeholders/product-placeholder.png",
    alt: "Rollo de papel camilla de polipropileno con precorte para camilla",
    shortDescription:
      "Papel camilla de polipropileno con precorte. Disponible en negro y rosa.",
    description:
      "Rollo de papel camilla de polipropileno con precorte para proteger la camilla y facilitar el cambio entre clientes. Elige color al pedir.",
    tags: ["mobiliario", "camilla", "papel camilla", "polipropileno", "precorte"],
    featured: false,
    offer: false,
    active: true,
    variants: [
      { label: "Negro", price: 8, sku: "SAN-PAPEL-CAMILLA-PP-PRECORTE-N-1U" },
      { label: "Rosa", price: 8.5, sku: "SAN-PAPEL-CAMILLA-PP-PRECORTE-ROSA-1U" },
    ],
  },
  {
    id: "papel-camilla-resistente-sin-precorte-1u",
    sku: "SAN-PAPEL-CAMILLA-RESIST-SIN-PRECORTE-1U",
    name: "Papel camilla resistente sin precorte",
    slug: "papel-camilla-resistente-sin-precorte-1u",
    category: "mobiliario-camilla",
    categoryLabel: "Mobiliario y camilla",
    price: 8.5,
    currency: "EUR",
    unit: "1 unidad",
    image: "/images/placeholders/product-placeholder.png",
    alt: "Rollo de papel camilla resistente sin precorte",
    shortDescription:
      "Papel camilla resistente sin precorte, formato de 1 unidad (rollo).",
    description:
      "Papel camilla de mayor resistencia sin precorte, pensado para sesiones largas y cambios puntuales. Formato de 1 unidad.",
    tags: ["mobiliario", "camilla", "papel camilla", "resistente"],
    featured: false,
    offer: false,
    active: true,
  },
  {
    id: "papel-camilla-bicapa-precorte-1u",
    sku: "SAN-PAPEL-CAMILLA-BICAPA-PRECORTE-1U",
    name: "Papel camilla bicapa con precorte",
    slug: "papel-camilla-bicapa-precorte-1u",
    category: "mobiliario-camilla",
    categoryLabel: "Mobiliario y camilla",
    price: 7.5,
    currency: "EUR",
    unit: "1 unidad",
    image: "/images/placeholders/product-placeholder.png",
    alt: "Rollo de papel camilla bicapa con precorte",
    shortDescription:
      "Papel camilla bicapa con precorte para protección cómoda de la camilla.",
    description:
      "Combinación bicapa con precorte para facilitar el desglose y mantener la camilla protegida de forma higiénica. Formato de 1 unidad.",
    tags: ["mobiliario", "camilla", "papel camilla", "bicapa", "precorte"],
    featured: false,
    offer: false,
    active: true,
  },
  {
    id: "film-transparente-rollo",
    sku: "SAN-FILM-TRANSPARENTE-30X300",
    name: "Film transparente",
    slug: "film-transparente-rollo",
    category: "consumibles",
    categoryLabel: "Consumibles",
    price: 8,
    currency: "EUR",
    unit: "1 unidad",
    image: "/images/placeholders/product-placeholder.png",
    alt: "Rollo de film transparente para cubrir y proteger la piel o material",
    shortDescription:
      "Film transparente en rollo. Elige medida entre 30x300 y 45x300.",
    description:
      "Film transparente para uso en estudio. Disponible en distintas medidas de rollo; selecciona la opción al consultar por WhatsApp.",
    tags: ["consumibles", "film", "transparente", "barrera"],
    featured: false,
    offer: false,
    active: true,
    variants: [
      { label: "30x300", price: 8, sku: "SAN-FILM-TRANSPARENTE-30X300" },
      { label: "45x300", price: 12, sku: "SAN-FILM-TRANSPARENTE-45X300" },
    ],
  },
  {
    id: "film-negro-50x120",
    sku: "SAN-FILM-NEGRO-50X120",
    name: "Film negro",
    slug: "film-negro-50x120",
    category: "consumibles",
    categoryLabel: "Consumibles",
    price: 9,
    currency: "EUR",
    unit: "50x120",
    image: "/images/placeholders/product-placeholder.png",
    alt: "Film negro para protección en estudio de tatuaje, formato 50x120",
    shortDescription:
      "Film negro en formato 50x120 para cubrir zona de trabajo o piel según uso.",
    description:
      "Film negro de uso profesional en estudio. Formato indicado 50x120; consulta detalles de presentación al pedir.",
    tags: ["consumibles", "film", "negro", "barrera"],
    featured: false,
    offer: false,
    active: true,
  },
];

export function getActiveProducts() {
  return products.filter((p) => p.active);
}
