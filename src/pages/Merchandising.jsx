import { useState } from "react";
import ProductGrid from "../components/ProductGrid.jsx";
import ProductModal from "../components/ProductModal.jsx";
import { getActiveProducts } from "../data/products.js";

export default function Merchandising() {
  const [selected, setSelected] = useState(null);
  const items = getActiveProducts().filter((p) => p.category === "merchandising");

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-bg via-brand-bg to-brand-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <header className="max-w-3xl">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.22em] text-brand-red">
            Marca & textil
          </p>
          <h1 className="font-heading mt-3 text-3xl font-semibold tracking-tight text-brand-black sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
            Merchandising
          </h1>
          <span
            className="mt-4 block h-1 w-14 rounded-full bg-brand-red"
            aria-hidden
          />
          <p className="mt-4 text-sm leading-relaxed text-brand-muted sm:text-base">
            Textil y productos de marca SANITATTOO. Disponibilidad y tallas las
            confirmamos por mensaje.
          </p>
        </header>

        <div className="mt-12">
          <ProductGrid products={items} onOpenDetail={setSelected} />
        </div>
      </div>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
