import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid.jsx";
import ProductModal from "../components/ProductModal.jsx";
import { brands, getBrandById } from "../data/brands.js";
import { categories } from "../data/categories.js";
import { getCatalogProducts } from "../data/products.js";
import { publicAssetUrl } from "../utils/publicAsset.js";

const PAGE_SIZE = 12;

const loadMoreButtonClass =
  "rounded-lg border-2 border-[#C1121F] bg-[#C1121F] px-8 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white hover:text-[#C1121F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C1121F]";

const filterBtnBase =
  "w-full rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red";

const filterBtnActive =
  "border-brand-red bg-brand-red text-brand-white hover:bg-brand-red-dark";

const filterBtnIdle =
  "border-brand-border bg-brand-white text-brand-black hover:border-brand-red/35 hover:bg-brand-bg";

const lineChipBase =
  "shrink-0 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red";

/**
 * @param {{
 *   brandName: string
 *   lineId: string
 *   onLineChange: (lineId: string) => void
 *   needleLines: { id: string; label: string }[]
 * }} props
 */
function CatalogNeedleLineFilter({
  brandName,
  lineId,
  onLineChange,
  needleLines,
}) {
  const options = [{ id: "all", label: "Todas" }, ...needleLines];

  return (
    <div className="mb-6">
      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-brand-muted">
        Línea
      </p>
      <div
        className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:thin]"
        role="group"
        aria-label={
          brandName
            ? `Filtrar por línea ${brandName}`
            : "Filtrar por línea de aguja"
        }
      >
        {options.map((line) => (
          <button
            key={line.id}
            type="button"
            onClick={() => onLineChange(line.id)}
            className={[
              lineChipBase,
              lineId === line.id ? filterBtnActive : filterBtnIdle,
            ].join(" ")}
            aria-pressed={lineId === line.id}
          >
            {line.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function CatalogBrandBanner({ brandId }) {
  const brand = getBrandById(brandId);
  if (!brand || brandId === "all") return null;

  if (brand.banner) {
    return (
      <div className="mb-8 overflow-hidden rounded-2xl border border-brand-border bg-brand-white shadow-[0_6px_28px_rgba(5,5,5,0.06)]">
        <div className="relative aspect-[21/7] min-h-[172px] w-full sm:aspect-[21/6] sm:min-h-[160px] md:aspect-[21/6] md:min-h-[220px] lg:aspect-[21/5] lg:min-h-[296px] xl:aspect-[21/4.5] xl:min-h-[332px] 2xl:aspect-auto 2xl:h-[500px] 2xl:max-h-[500px]">
          <img
            src={publicAssetUrl(brand.banner)}
            alt=""
            className="h-full w-full object-cover object-center 2xl:object-[center_35%]"
            loading="lazy"
            decoding="async"
          />
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
              src={publicAssetUrl(brand.logo)}
              alt=""
              className="max-h-full max-w-full object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>
        ) : null}
        <div className="min-w-0">
          <p className="font-heading text-lg font-bold text-brand-black sm:text-xl">
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

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const [brandId, setBrandId] = useState("all");
  const [lineId, setLineId] = useState("all");
  const [selected, setSelected] = useState(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const resultsTopRef = useRef(null);

  const scrollToResults = () => {
    requestAnimationFrame(() => {
      resultsTopRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const catalogProducts = useMemo(() => getCatalogProducts(), []);

  const brandsInCatalog = useMemo(() => {
    const idsWithProducts = new Set(catalogProducts.map((p) => p.brand));
    return brands.filter(
      (b) =>
        b.id !== "sanitattoo" &&
        (idsWithProducts.has(b.id) || Boolean(b.banner)),
    );
  }, [catalogProducts]);

  const catalogBrandIds = useMemo(
    () => new Set(brandsInCatalog.map((b) => b.id)),
    [brandsInCatalog],
  );

  const selectedBrand = useMemo(
    () => (brandId === "all" ? null : getBrandById(brandId)),
    [brandId],
  );

  const selectedBrandNeedleLines = selectedBrand?.needleLines ?? [];
  const hasNeedleLines = selectedBrandNeedleLines.length > 0;

  const syncCatalogSearchParams = (nextBrand, nextLine, needleLines = []) => {
    const params = new URLSearchParams(searchParams);
    if (nextBrand !== "all") params.set("brand", nextBrand);
    else params.delete("brand");

    const validLineIds = new Set(needleLines.map((line) => line.id));
    if (
      nextBrand !== "all" &&
      nextLine !== "all" &&
      validLineIds.has(nextLine)
    ) {
      params.set("line", nextLine);
    } else {
      params.delete("line");
    }
    setSearchParams(params, { replace: true });
  };

  const applyBrand = (nextBrand) => {
    const brand = nextBrand === "all" ? null : getBrandById(nextBrand);
    const validLineIds = new Set((brand?.needleLines ?? []).map((line) => line.id));
    const nextLine =
      nextBrand !== "all" && lineId !== "all" && validLineIds.has(lineId)
        ? lineId
        : "all";

    setBrandId(nextBrand);
    setLineId(nextLine);
    syncCatalogSearchParams(nextBrand, nextLine, brand?.needleLines ?? []);
    setMobileFiltersOpen(false);
    scrollToResults();
  };

  const applyCategory = (nextCategory) => {
    setCategoryId(nextCategory);
    setMobileFiltersOpen(false);
    scrollToResults();
  };

  const applyLine = (nextLine) => {
    setLineId(nextLine);
    syncCatalogSearchParams(brandId, nextLine, selectedBrandNeedleLines);
    scrollToResults();
  };

  useEffect(() => {
    const brandParam = searchParams.get("brand");
    const resolvedBrand =
      brandParam && catalogBrandIds.has(brandParam) ? brandParam : "all";
    setBrandId(resolvedBrand);

    const brand = resolvedBrand === "all" ? null : getBrandById(resolvedBrand);
    const validLineIds = new Set((brand?.needleLines ?? []).map((line) => line.id));
    const lineParam = searchParams.get("line");

    if (lineParam && validLineIds.has(lineParam)) {
      setLineId(lineParam);
    } else {
      setLineId("all");
    }
  }, [searchParams, catalogBrandIds]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, categoryId, brandId, lineId]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return catalogProducts.filter((p) => {
      if (categoryId !== "all" && p.category !== categoryId) return false;
      if (brandId !== "all" && p.brand !== brandId) return false;
      if (
        hasNeedleLines &&
        lineId !== "all" &&
        p.needleLine !== lineId
      ) {
        return false;
      }
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
  }, [catalogProducts, query, categoryId, brandId, lineId, hasNeedleLines]);

  const hasFilters =
    categoryId !== "all" ||
    brandId !== "all" ||
    query.trim() !== "" ||
    (hasNeedleLines && lineId !== "all");

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (categoryId !== "all") count += 1;
    if (brandId !== "all") count += 1;
    if (hasNeedleLines && lineId !== "all") count += 1;
    if (query.trim() !== "") count += 1;
    return count;
  }, [categoryId, brandId, hasNeedleLines, lineId, query]);

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
    setLineId("all");
    setSearchParams({}, { replace: true });
    setMobileFiltersOpen(false);
    scrollToResults();
  };

  const sidebarFilters = (
    <aside className="min-w-0 space-y-6">
      <label className="block w-full min-w-0">
        <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-brand-muted">
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
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-brand-muted">
          Categoría
        </p>
        <div className="space-y-1.5" role="group" aria-label="Filtrar por categoría">
          <button
            type="button"
            onClick={() => applyCategory("all")}
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
              onClick={() => applyCategory(c.id)}
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
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-brand-muted">
          Marca
        </p>
        <div className="space-y-1.5" role="group" aria-label="Filtrar por marca">
          <button
            type="button"
            onClick={() => applyBrand("all")}
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
              onClick={() => applyBrand(b.id)}
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
          <p className="font-heading text-xs font-bold uppercase tracking-[0.22em] text-brand-red">
            Catálogo
          </p>
          <h1 className="font-heading mt-3 text-3xl font-bold tracking-tight text-brand-black sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
            Catálogo
          </h1>
          <span
            className="mt-4 block h-1 w-14 rounded-full bg-brand-red"
            aria-hidden
          />
          <p className="mt-4 text-sm font-normal leading-relaxed text-brand-muted sm:text-base">
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
            <div ref={resultsTopRef} className="scroll-mt-28">
              <p
                className="mb-6 text-sm font-semibold text-brand-black"
                role="status"
                aria-live="polite"
              >
                {rangeLabel}
              </p>
            </div>

            {brandId !== "all" ? (
              <CatalogBrandBanner brandId={brandId} />
            ) : null}

            {hasNeedleLines ? (
              <CatalogNeedleLineFilter
                brandName={selectedBrand?.name ?? ""}
                lineId={lineId}
                onLineChange={applyLine}
                needleLines={selectedBrandNeedleLines}
              />
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
