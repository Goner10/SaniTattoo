/** @typedef {{ id: string, name: string, description: string }} Category */

/** @type {Category[]} */
export const categories = [
  {
    id: "material-sanitario",
    name: "Material sanitario",
    description: "Consumibles y material diario para el trabajo en estudio.",
  },
  {
    id: "esterilizacion",
    name: "Esterilización",
    description:
      "Productos para limpieza, desinfección y gestión segura del material.",
  },
  {
    id: "cuidados-tatuaje",
    name: "Cuidados tatuaje",
    description:
      "Aftercare, preparación y productos especializados para la piel tatuada.",
  },
  {
    id: "agujas",
    name: "Agujas",
    description:
      "Agujas y accesorios para tatuaje.",
  },
];

export function getCategoryById(id) {
  return categories.find((c) => c.id === id) ?? null;
}
