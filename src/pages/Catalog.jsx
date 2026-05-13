import { useMemo, useState } from "react";
import ProductGrid from "../components/ProductGrid.jsx";
import ProductModal from "../components/ProductModal.jsx";
import { categories } from "../data/categories.js";
import { getActiveProducts } from "../data/products.js";

export default function Catalog() {
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const [selected, setSelected] = useState(null);

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

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <header className="max-w-2xl">
        <h1 className="font-display text-3xl tracking-tight text-brand-black sm:text-4xl">
          Catálogo
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-brand-muted sm:text-base">
          Busca, filtra por categoría y abre la ficha para ver detalle. Cada
          producto incluye acceso directo a WhatsApp.
        </p>
      </header>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="block w-full sm:max-w-xs">
          <span className="sr-only">Buscar</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar producto…"
            className="w-full rounded-md border border-brand-border bg-brand-white px-3 py-2.5 text-sm text-brand-black placeholder:text-brand-muted focus-visible:border-brand-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
          />
        </label>
      </div>

      <div
        className="mt-6 flex flex-wrap gap-2"
        role="group"
        aria-label="Filtrar por categoría"
      >
        <button
          type="button"
          onClick={() => setCategoryId("all")}
          className={[
            "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red sm:text-sm",
            categoryId === "all"
              ? "border-brand-black bg-brand-black text-brand-white"
              : "border-brand-border bg-brand-white text-brand-black hover:border-brand-muted",
          ].join(" ")}
        >
          Todas
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCategoryId(c.id)}
            className={[
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red sm:text-sm",
              categoryId === c.id
                ? "border-brand-black bg-brand-black text-brand-white"
                : "border-brand-border bg-brand-white text-brand-black hover:border-brand-muted",
            ].join(" ")}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="mt-10">
        <ProductGrid products={filtered} onOpenDetail={setSelected} />
      </div>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
