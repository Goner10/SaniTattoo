import { useState } from "react";
import { Link } from "react-router-dom";
import ProductGrid from "../components/ProductGrid.jsx";
import ProductModal from "../components/ProductModal.jsx";
import WhatsAppButton from "../components/WhatsAppButton.jsx";
import { getActiveProducts } from "../data/products.js";
import { generalWhatsAppUrl } from "../utils/whatsapp.js";
import { catalogCtaPrimary } from "../utils/catalogCta.js";

export default function Offers() {
  const [selected, setSelected] = useState(null);
  const offers = getActiveProducts().filter((p) => p.offer);

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-bg via-brand-bg to-brand-white">
      <div className="mx-auto max-w-6xl min-w-0 px-4 py-12 sm:px-6 sm:py-14 2xl:max-w-[1500px] 2xl:px-8">
        <header className="max-w-3xl">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.22em] text-brand-red">
            Promociones
          </p>
          <h1 className="font-heading mt-3 text-3xl font-bold tracking-tight text-brand-black sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
            Ofertas exclusivas
          </h1>
          <span
            className="mt-4 block h-1 w-14 rounded-full bg-brand-red"
            aria-hidden
          />
          <p className="mt-4 text-sm font-normal leading-relaxed text-brand-muted sm:text-base">
            Accede a promociones especiales, packs y descuentos seleccionados para estudios y artistas.
          </p>
        </header>

        <div className="mt-12">
          {offers.length ? (
            <ProductGrid products={offers} onOpenDetail={setSelected} />
          ) : (
            <div className="rounded-2xl border border-brand-border bg-brand-white px-6 py-14 text-center shadow-[0_8px_32px_rgba(5,5,5,0.05)] sm:px-10 sm:py-16">
              <p className="font-heading text-xl font-bold text-brand-black sm:text-2xl">
                Actualmente no hay promociones activas
              </p>
              <p className="mx-auto mt-4 max-w-md text-sm font-normal leading-relaxed text-brand-muted sm:text-base">
                Contacta con nosotros para rrecibir información sobre próximas ofertas y condiciones especiales para estudios.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
                <WhatsAppButton href={generalWhatsAppUrl("Me interesan ofertas.")}>
                  Consultar por WhatsApp
                </WhatsAppButton>
                <Link to="/catalogo" className={catalogCtaPrimary}>
                  Ver catálogo
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
