import { useEffect, useMemo, useState } from "react";
import ProductGrid from "../components/ProductGrid.jsx";
import ProductModal from "../components/ProductModal.jsx";
import { categories } from "../data/categories.js";
import { getActiveProducts } from "../data/products.js";

const PAGE_SIZE = 12;

const loadMoreButtonClass =
  "rounded-lg border-2 border-[#C1121F] bg-[#C1121F] px-8 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white hover:text-[#C1121F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C1121F]";

const chipBase =
  "inline-flex items-center justify-center rounded-full px-3.5 py-2 text-xs font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red sm:text-sm";

const chipActive =
  "border-2 border-brand-red bg-brand-red text-brand-white hover:bg-white hover:text-brand-red";

const chipIdle =
  "border border-brand-border bg-brand-white text-brand-black hover:border-brand-red/35 hover:bg-brand-bg";

export default function Catalog() {
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const [selected, setSelected] = useState(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, categoryId]);

  const filtered = useMemo(() => {
    const list = getActiveProducts();
    const q = query.trim().toLowerCase();
    return list.filter((p) => {
      if (categoryId !== "all" && p.category !== categoryId) return false;
      if (!q) return true;
      const haystack = [
        p.name,
        p.shortDescription,
        p.description,
        ...(p.tags ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, categoryId]);

  const hasFilters = categoryId !== "all" || query.trim() !== "";
  const count = filtered.length;
  const shown = Math.min(visibleCount, count);
  const rangeLabel =
    count === 0
      ? "No hay productos que coincidan"
      : count === 1
        ? "Mostrando 1 de 1 producto"
        : `Mostrando ${shown} de ${count} productos`;
  const visibleProducts = filtered.slice(0, visibleCount);
  const showLoadMore = count >= PAGE_SIZE && visibleCount < count;

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-bg via-brand-bg to-brand-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <header className="max-w-3xl">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.22em] text-brand-red">
            Catálogo
          </p>
          <h1 className="font-heading mt-3 text-3xl font-semibold tracking-tight text-brand-black sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
            Catálogo
          </h1>
          <span
            className="mt-4 block h-1 w-14 rounded-full bg-brand-red"
            aria-hidden
          />
          <p className="mt-4 text-sm leading-relaxed text-brand-muted sm:text-base">
            Busca, filtra por categoría y abre la ficha para ver detalle. Cada
            producto incluye acceso directo a WhatsApp.
          </p>
        </header>

        <div className="mt-10 rounded-2xl border border-brand-border bg-brand-white p-5 shadow-[0_8px_32px_rgba(5,5,5,0.06)] sm:p-6 lg:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-8">
            <label className="block w-full min-w-0 lg:max-w-2xl lg:flex-1">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-brand-muted">
                Buscar
              </span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por nombre, descripción o etiquetas…"
                className="w-full rounded-lg border-2 border-brand-border bg-brand-bg/50 px-4 py-3.5 text-sm text-brand-black shadow-inner placeholder:text-brand-muted focus-visible:border-brand-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/20"
              />
            </label>
            <div className="flex flex-shrink-0 flex-wrap items-center justify-between gap-3 border-t border-brand-border/70 pt-5 lg:flex-col lg:items-stretch lg:border-t-0 lg:border-l lg:border-brand-border/70 lg:pl-8 lg:pt-0">
              <p
                className="text-sm font-semibold text-brand-black"
                role="status"
                aria-live="polite"
              >
                {rangeLabel}
              </p>
              {hasFilters ? (
                <button
                  type="button"
                  className="text-left text-sm font-semibold text-brand-red underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
                  onClick={() => {
                    setQuery("");
                    setCategoryId("all");
                  }}
                >
                  Limpiar filtros
                </button>
              ) : null}
            </div>
          </div>

          <div
            className="mt-8 flex flex-wrap gap-2 border-t border-brand-border/70 pt-6"
            role="group"
            aria-label="Filtrar por categoría"
          >
            <button
              type="button"
              onClick={() => setCategoryId("all")}
              className={[chipBase, categoryId === "all" ? chipActive : chipIdle].join(
                " ",
              )}
            >
              Todas
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategoryId(c.id)}
                className={[
                  chipBase,
                  categoryId === c.id ? chipActive : chipIdle,
                ].join(" ")}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <ProductGrid products={visibleProducts} onOpenDetail={setSelected} />
          {showLoadMore ? (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                className={loadMoreButtonClass}
                onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
              >
                Ver más productos
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
