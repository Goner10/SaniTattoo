import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid.jsx";
import ProductModal from "../components/ProductModal.jsx";
import { brands, getBrandById } from "../data/brands.js";
import { categories } from "../data/categories.js";
import { getCatalogProducts } from "../data/products.js";

const PAGE_SIZE = 12;

const loadMoreButtonClass =
  "rounded-lg border-2 border-[#C1121F] bg-[#C1121F] px-8 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white hover:text-[#C1121F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C1121F]";

const filterBtnBase =
  "w-full rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red";

const filterBtnActive =
  "border-brand-red bg-brand-red text-brand-white hover:bg-brand-red-dark";

const filterBtnIdle =
  "border-brand-border bg-brand-white text-brand-black hover:border-brand-red/35 hover:bg-brand-bg";

function CatalogBrandBanner({ brandId }) {
  const brand = getBrandById(brandId);
  if (!brand || brandId === "all") return null;

  if (brand.banner) {
    return (
      <div className="mb-8 overflow-hidden rounded-2xl border border-brand-border bg-brand-white shadow-[0_6px_28px_rgba(5,5,5,0.06)]">
        <div className="relative aspect-[21/7] min-h-[140px] w-full sm:aspect-[21/6] sm:min-h-[160px] 2xl:aspect-auto 2xl:h-[300px] 2xl:max-h-[300px]">
          <img
            src={brand.banner}
            alt=""
            className="h-full w-full object-cover object-center 2xl:object-[center_35%]"
            loading="lazy"
            decoding="async"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-brand-black/95 via-brand-black/60 to-brand-black/35 lg:from-brand-black/75 lg:via-brand-black/25 lg:to-transparent"
            aria-hidden
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-black/90 via-brand-black/50 to-transparent p-5 pb-6 sm:p-6 lg:bg-none lg:from-transparent lg:via-transparent lg:to-transparent">
            <p className="font-heading text-lg font-semibold text-brand-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] sm:text-xl lg:drop-shadow-none">
              {brand.name}
            </p>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] lg:text-white/90 lg:drop-shadow-none">
              {brand.description}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 rounded-2xl border border-brand-border bg-brand-white p-5 shadow-[0_6px_28px_rgba(5,5,5,0.06)] sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        {brand.logo ? (
          <div className="flex h-16 w-32 shrink-0 items-center justify-center rounded-xl border border-brand-border bg-[#f3f3f3] p-3 sm:h-20 sm:w-36">
            <img
              src={brand.logo}
              alt=""
              className="max-h-full max-w-full object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>
        ) : null}
        <div className="min-w-0">
          <p className="font-heading text-lg font-semibold text-brand-black sm:text-xl">
            {brand.name}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-brand-muted">
            {brand.description}
          </p>
        </div>
      </div>
    </div>
  );
}

const CATALOG_BRAND_QUERY_IDS = new Set([
  "aloetattoo",
  "biotatum",
  "ghost-tattoo",
  "generico",
]);

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const [brandId, setBrandId] = useState("all");
  const [selected, setSelected] = useState(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const catalogProducts = useMemo(() => getCatalogProducts(), []);

  const brandsInCatalog = useMemo(() => {
    const idsWithProducts = new Set(catalogProducts.map((p) => p.brand));
    return brands.filter(
      (b) =>
        b.id !== "sanitattoo" &&
        (idsWithProducts.has(b.id) || Boolean(b.banner)),
    );
  }, [catalogProducts]);

  useEffect(() => {
    const brandParam = searchParams.get("brand");
    if (brandParam && CATALOG_BRAND_QUERY_IDS.has(brandParam)) {
      setBrandId(brandParam);
    }
  }, [searchParams]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, categoryId, brandId]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return catalogProducts.filter((p) => {
      if (categoryId !== "all" && p.category !== categoryId) return false;
      if (brandId !== "all" && p.brand !== brandId) return false;
      if (!q) return true;
      const haystack = [
        p.name,
        p.shortDescription,
        p.description,
        ...(p.tags ?? []),
        getBrandById(p.brand)?.name ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [catalogProducts, query, categoryId, brandId]);

  const hasFilters =
    categoryId !== "all" || brandId !== "all" || query.trim() !== "";

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (categoryId !== "all") count += 1;
    if (brandId !== "all") count += 1;
    if (query.trim() !== "") count += 1;
    return count;
  }, [categoryId, brandId, query]);

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

  const clearFilters = () => {
    setQuery("");
    setCategoryId("all");
    setBrandId("all");
  };

  const sidebarFilters = (
    <aside className="min-w-0 space-y-6">
      <label className="block w-full min-w-0">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-brand-muted">
          Buscar
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nombre, descripción o etiquetas…"
          className="w-full rounded-lg border-2 border-brand-border bg-brand-bg/50 px-4 py-3 text-sm text-brand-black placeholder:text-brand-muted focus-visible:border-brand-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/20"
        />
      </label>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-muted">
          Categoría
        </p>
        <div className="space-y-1.5" role="group" aria-label="Filtrar por categoría">
          <button
            type="button"
            onClick={() => setCategoryId("all")}
            className={[
              filterBtnBase,
              categoryId === "all" ? filterBtnActive : filterBtnIdle,
            ].join(" ")}
          >
            Todas las categorías
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategoryId(c.id)}
              className={[
                filterBtnBase,
                categoryId === c.id ? filterBtnActive : filterBtnIdle,
              ].join(" ")}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-muted">
          Marca
        </p>
        <div className="space-y-1.5" role="group" aria-label="Filtrar por marca">
          <button
            type="button"
            onClick={() => setBrandId("all")}
            className={[
              filterBtnBase,
              brandId === "all" ? filterBtnActive : filterBtnIdle,
            ].join(" ")}
          >
            Todas las marcas
          </button>
          {brandsInCatalog.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setBrandId(b.id)}
              className={[
                filterBtnBase,
                brandId === b.id ? filterBtnActive : filterBtnIdle,
              ].join(" ")}
            >
              {b.name}
            </button>
          ))}
        </div>
      </div>

      {hasFilters ? (
        <button
          type="button"
          className="w-full rounded-lg border border-brand-border bg-brand-bg px-3 py-2.5 text-sm font-semibold text-brand-red transition-colors hover:border-brand-red/35 hover:bg-brand-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
          onClick={clearFilters}
        >
          Limpiar filtros
        </button>
      ) : null}
    </aside>
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-brand-bg via-brand-bg to-brand-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 2xl:max-w-[1500px]">
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
            Busca, filtra por categoría o marca y abre la ficha para ver
            detalle. Cada producto incluye acceso directo a WhatsApp.
          </p>
        </header>

        <div className="mt-8 lg:hidden">
          <button
            type="button"
            aria-expanded={mobileFiltersOpen}
            aria-controls="catalog-mobile-filters"
            onClick={() => setMobileFiltersOpen((open) => !open)}
            className="flex w-full items-center justify-between gap-3 rounded-xl border border-brand-border bg-brand-white px-4 py-3.5 text-sm font-semibold text-brand-black shadow-[0_4px_20px_rgba(5,5,5,0.05)] transition-colors hover:border-brand-red/30 hover:bg-brand-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
          >
            <span className="flex min-w-0 items-center gap-2.5">
              <SlidersHorizontal
                className="size-4 shrink-0 text-brand-red"
                aria-hidden
              />
              <span>
                {activeFilterCount > 0 ? "Filtros activos" : "Filtros"}
              </span>
              {activeFilterCount > 0 ? (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-red px-1.5 text-[0.6875rem] font-bold text-brand-white">
                  {activeFilterCount}
                </span>
              ) : null}
            </span>
            <ChevronDown
              className={[
                "size-5 shrink-0 text-brand-muted transition-transform duration-200",
                mobileFiltersOpen ? "rotate-180" : "",
              ].join(" ")}
              aria-hidden
            />
          </button>
          {mobileFiltersOpen ? (
            <div
              id="catalog-mobile-filters"
              className="mt-3 rounded-2xl border border-brand-border bg-brand-white p-5 shadow-[0_6px_28px_rgba(5,5,5,0.05)] sm:p-6"
            >
              {sidebarFilters}
            </div>
          ) : null}
        </div>

        <div className="mt-8 flex flex-col gap-8 lg:mt-10 lg:flex-row lg:items-start lg:gap-10 2xl:gap-8">
          <div className="hidden rounded-2xl border border-brand-border bg-brand-white p-5 shadow-[0_6px_28px_rgba(5,5,5,0.05)] sm:p-6 lg:block lg:sticky lg:top-28 lg:w-72 lg:shrink-0 xl:w-80">
            {sidebarFilters}
          </div>

          <div className="min-w-0 flex-1">
            <p
              className="mb-6 text-sm font-semibold text-brand-black"
              role="status"
              aria-live="polite"
            >
              {rangeLabel}
            </p>

            {brandId !== "all" ? (
              <CatalogBrandBanner brandId={brandId} />
            ) : null}

            <ProductGrid
              products={visibleProducts}
              onOpenDetail={setSelected}
              gridClassName="2xl:grid-cols-4 2xl:gap-4"
            />
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
      </div>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
