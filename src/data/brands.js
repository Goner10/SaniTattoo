/**
 * @typedef {{ mobile?: string, tablet?: string, desktop?: string }} BrandBannerSources
 * @typedef {{
 *   id: string
 *   name: string
 *   logo: string | null
 *   banner: string | null
 *   banners?: BrandBannerSources | null
 *   description: string
 *   needleLines?: { id: string; label: string }[]
 * }} Brand */

/** @type {Brand[]} */
export const brands = [
  {
    id: "aloetattoo",
    name: "Aloe Tattoo",
    logo: "images/brands/aloe-tattoo.jfif",
    banner: "images/brands/aloe_tattoo.JPG",
    description:
      "",
  },
  {
    id: "biotatum",
    name: "BioTaTum Professional",
    logo: null,
    banner: "images/brands/biotatum-banner.png",
    description: "Línea profesional de productos para el cuidado del tatuaje.",
  },
  {
    id:"hornet",
    name: "Hornet",
    logo: "images/brands/",
    banner: "images/brands/hornet-hero.jpg",
    description: "Cuidados del tatuaje de la marca Hornet.",
  },
  {
    id:"proton",
    name: "Proton",
    logo: "images/brands/",
    banner: "images/brands/proton-banner.png",
    description: "Cuidados del tatuaje de la marca Proton.",
  },
  {
    id: "ghost-tattoo",
    name: "Ghost Wipes",
    logo: "images/brands/ghost-wipes.jpeg",
    banner: "images/brands/ghost.jpg",
    description: "Consumibles profesionales para estudios de tatuaje.",
  },
  {
    id: "tsunami",
    name: "Tsunami",
    logo: "images/brands/tsunami.png",
    banner: "images/brands/tsunami-banner.jpeg",
    description: "Agujas de la marca Tsunami.",
    needleLines: [
      { id: "rl", label: "RL" },
      { id: "rs", label: "RS" },
      { id: "m", label: "Magnum M" },
      { id: "cm", label: "Magnum Curva CM" },
    ],
  },
  {
    id: "shapu",
    name: "Shapu",
    logo: "images/brands/shapu-logo.png",
    banner: "images/brands/shapu.png",
    description: "Agujas de la marca Shapu.",
    needleLines: [
      { id: "rl", label: "RL" },
      { id: "rs", label: "RS" },
      { id: "m", label: "Magnum M" },
      { id: "rm", label: "Magnum Curva RM" },
    ],
  },
  {
    id: "real-stencil-printer",
    name: "Real Stencil Printer",
    logo: "images/brands/real-stencil-logo.png",
    banner: "images/brands/real-stencil-banner.jpg",
    description: "Impresión de stencils para tatuajes.",
  },
  {
    id: "effigerm",
    name: "Effigerm",
    logo: "images/brands/effigerm-destacado.png",
    banner: "images/brands/effigerm-definitivo3.jpeg",
    description: "Limpieza y descontaminación para prevención de infecciones.",
  },
  {
    id: "sanitattoo",
    name: "SANITATTOO",
    logo: "images/logos/logo_nuevo.png",
    banner: null,
    description: "Productos y merchandising de la marca SANITATTOO.",
  },
  {
    id: "generico",
    name: "Material profesional",
    logo: null,
    banner: null,
    description:
      "Material seleccionado para el trabajo diario en estudios de tatuaje.",
  },
];

export function getBrandById(id) {
  return brands.find((b) => b.id === id) ?? null;
}
