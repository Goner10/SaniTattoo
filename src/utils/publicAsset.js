/**
 * Resuelve rutas de archivos en `public/` (p. ej. `images/logos/foo.png`).
 * @param {string} path
 */
export function publicAssetUrl(path) {
  if (!path) return "";
  const clean = path.startsWith("/") ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${clean}`;
}

/**
 * Rutas por breakpoint para assets en `public/`. Si falta una variante, usa fallback en cascada.
 * @typedef {{ mobile?: string, tablet?: string, desktop?: string }} ResponsiveImageSources
 */

/**
 * @param {ResponsiveImageSources | undefined} sources
 * @param {string} fallback
 * @returns {{ mobile: string, tablet: string, desktop: string }}
 */
export function resolveResponsiveSources(sources, fallback) {
  return {
    mobile: sources?.mobile ?? fallback,
    tablet: sources?.tablet ?? sources?.desktop ?? sources?.mobile ?? fallback,
    desktop: sources?.desktop ?? sources?.tablet ?? sources?.mobile ?? fallback,
  };
}

/** Clases Tailwind para mostrar una sola variante por breakpoint (< md | md–lg | lg+). */
export const responsiveImageVisibility = {
  mobile: "md:hidden",
  tablet: "hidden md:block lg:hidden",
  desktop: "hidden lg:block",
};
