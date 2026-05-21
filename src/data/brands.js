/** @typedef {{ id: string, name: string, logo: string | null, banner: string | null, description: string }} Brand */

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
    id: "ghost-tattoo",
    name: "Ghost Wipes",
    logo: "images/brands/ghost-wipes.jpeg",
    banner: "images/brands/ghost.jpg",
    description: "Consumibles profesionales para estudios de tatuaje.",
  },
  {
    id: "effigerm",
    name: "Effigerm",
    logo: "images/brands/effigerm-destacado.png",
    banner: "images/brands/effigerm-destacado.png",
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
