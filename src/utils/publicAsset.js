/**
 * Resuelve rutas de archivos en `public/` (p. ej. `images/logos/foo.png`).
 * @param {string} path
 */
export function publicAssetUrl(path) {
  if (!path) return "";
  const clean = path.startsWith("/") ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${clean}`;
}
