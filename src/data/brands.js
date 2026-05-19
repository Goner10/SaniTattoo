/** @typedef {{ id: string, name: string, logo: string | null, banner: string | null, description: string }} Brand */

/** @type {Brand[]} */
export const brands = [
  {
    id: "aloetattoo",
    name: "Aloe Tattoo",
    logo: "images/brands/aloe-tattoo.jfif",
    banner: "images/brands/aloe_tattoo.JPG",
    description:
      "Productos especializados para preparación, limpieza y cuidado del tatuaje.",
  },
  {
    id: "biotatum",
    name: "BioTaTum Professional",
    logo: null,
    banner: "images/brands/biotatum-banner.png",
    description: "Línea profesional de productos para el cuidado del tatuaje.",
  },
  {
    id: "ghost-tattoo",
    name: "Ghost Tattoo",
    logo: "images/brands/ghost-logo.png",
    banner: "images/brands/ghost.jpg",
    description: "Consumibles profesionales para estudios de tatuaje.",
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
