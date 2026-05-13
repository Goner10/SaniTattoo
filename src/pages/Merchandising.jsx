import { useState } from "react";
import ProductGrid from "../components/ProductGrid.jsx";
import ProductModal from "../components/ProductModal.jsx";
import { getActiveProducts } from "../data/products.js";

export default function Merchandising() {
  const [selected, setSelected] = useState(null);
  const items = getActiveProducts().filter((p) => p.category === "merchandising");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <header className="max-w-2xl">
        <h1 className="font-display text-3xl tracking-tight text-brand-black sm:text-4xl">
          Merchandising
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-brand-muted sm:text-base">
          Textil y productos de marca SANITATTOO. Disponibilidad y tallas las
          confirmamos por mensaje.
        </p>
      </header>

      <div className="mt-10">
        <ProductGrid products={items} onOpenDetail={setSelected} />
      </div>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
