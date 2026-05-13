import ProductGrid from "../components/ProductGrid.jsx";
import ProductModal from "../components/ProductModal.jsx";
import WhatsAppButton from "../components/WhatsAppButton.jsx";
import { getActiveProducts } from "../data/products.js";
import { generalWhatsAppUrl } from "../utils/whatsapp.js";
import { useState } from "react";

export default function Offers() {
  const [selected, setSelected] = useState(null);
  const offers = getActiveProducts().filter((p) => p.offer);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <header className="max-w-2xl">
        <h1 className="font-display text-3xl tracking-tight text-brand-black sm:text-4xl">
          Ofertas
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-brand-muted sm:text-base">
          Promociones y productos en oferta. Si no hay líneas activas, podemos
          avisarte por WhatsApp.
        </p>
      </header>

      <div className="mt-10">
        {offers.length ? (
          <ProductGrid products={offers} onOpenDetail={setSelected} />
        ) : (
          <div className="rounded-xl border border-dashed border-brand-border bg-brand-white px-6 py-14 text-center">
            <p className="font-display text-xl text-brand-black">
              Ahora mismo no hay ofertas publicadas
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm text-brand-muted">
              Escríbenos y te informamos de promociones vigentes o pedidos
              agrupados para tu estudio.
            </p>
            <div className="mt-8 flex justify-center">
              <WhatsAppButton href={generalWhatsAppUrl("Me interesan ofertas.")}>
                Consultar por WhatsApp
              </WhatsAppButton>
            </div>
          </div>
        )}
      </div>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
