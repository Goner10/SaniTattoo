/** @typedef {{ id: string, name: string, description: string }} Category */

/** @type {Category[]} */
export const categories = [
  {
    id: "proteccion-higiene",
    name: "Protección e higiene",
    description: "Barreras, fundas y protección de zona de trabajo.",
  },
  {
    id: "desinfeccion-limpieza",
    name: "Desinfección y limpieza",
    description: "Productos para limpieza y desinfección del estudio.",
  },
  {
    id: "consumibles",
    name: "Consumibles",
    description: "Material de uso frecuente en sesión.",
  },
  {
    id: "mobiliario-camilla",
    name: "Mobiliario y camilla",
    description: "Mobiliario profesional para tatuadores.",
  },
  {
    id: "stencil-preparacion",
    name: "Stencil y preparación",
    description: "Stencil, transfer y preparación de piel.",
  },
  {
    id: "aftercare",
    name: "Aftercare",
    description: "Cuidados posteriores para una buena cicatrización.",
  },
  {
    id: "merchandising",
    name: "Merchandising",
    description: "Textil y productos de marca SANITATTOO.",
  },
];

export function getCategoryById(id) {
  return categories.find((c) => c.id === id) ?? null;
}
