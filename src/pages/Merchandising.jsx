import { useState } from "react";
import ProductGrid from "../components/ProductGrid.jsx";
import ProductModal from "../components/ProductModal.jsx";
import WhatsAppButton from "../components/WhatsAppButton.jsx";
import { getMerchandisingProducts } from "../data/products.js";
import { buildWhatsAppUrl } from "../utils/whatsapp.js";
import { publicAssetUrl } from "../utils/publicAsset.js";

const MERCH_BANNER_IMAGE = "images/merchandising/camisetas-perchas.jpeg";

const merchandisingWhatsAppUrl = buildWhatsAppUrl(
  "Hola, me gustaría consultar tallas, colores y disponibilidad de camisetas SANITATTOO.",
);

function MerchPhotoOverlay() {
  return (
    <div className="absolute left-8 top-8 z-10 max-w-[calc(100%-4rem)]">
      <p className="font-heading text-[0.625rem] font-bold uppercase tracking-[0.24em] text-white/90 sm:text-xs">
        Camisetas Sanitattoo
      </p>
      <h2 className="font-heading mt-2 text-xl font-bold leading-snug tracking-tight text-white sm:mt-3 sm:text-2xl 2xl:text-[1.65rem]">
        Textil de marca para dentro y fuera del estudio
      </h2>
      <p className="mt-2 max-w-sm text-sm font-normal leading-relaxed text-white/90 sm:text-[0.9375rem]">
        Camisetas oficiales SANITATTOO. Consulta tallas, colores y
        disponibilidad por WhatsApp.
      </p>
    </div>
  );
}

export default function Merchandising() {
  const [selected, setSelected] = useState(null);
  const items = getMerchandisingProducts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-bg via-brand-bg to-brand-white">
      <div className="mx-auto max-w-6xl min-w-0 px-4 py-12 sm:px-6 sm:py-14">
        <header className="max-w-3xl">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.22em] text-brand-red">
            Marca & textil
          </p>
          <h1 className="font-heading mt-3 text-3xl font-bold tracking-tight text-brand-black sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
            Merchandising
          </h1>
          <span
            className="mt-4 block h-1 w-14 rounded-full bg-brand-red"
            aria-hidden
          />
          <p className="mt-4 text-sm font-normal leading-relaxed text-brand-muted sm:text-base">
            Textil y productos de marca SANITATTOO. Disponibilidad y tallas las
            confirmamos por mensaje.
          </p>
        </header>

        {/* Móvil, tablet, laptop y xl: banner ancho + grid debajo */}
        <div className="2xl:hidden">
          <section
            className="mt-8 sm:mt-10"
            aria-labelledby="merch-banner-heading"
          >
            <div className="overflow-hidden rounded-2xl bg-brand-black shadow-[0_10px_40px_rgba(5,5,5,0.08)] ring-1 ring-brand-black/10">
              <div className="relative h-[260px] sm:h-[320px] lg:h-[400px]">
                <img
                  src={publicAssetUrl(MERCH_BANNER_IMAGE)}
                  alt="Camisetas oficiales SANITATTOO en perchas: modelos negro y blanco"
                  className="absolute inset-0 h-full w-full object-cover object-[center_42%] sm:object-[center_45%]"
                  loading="eager"
                  decoding="async"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-black/55 via-brand-black/15 to-brand-black/10 md:bg-gradient-to-r md:from-brand-black/65 md:via-brand-black/20 md:to-transparent"
                  aria-hidden
                />

                <div className="absolute left-8 top-8 z-10 hidden max-w-[85%] md:block">
                  <p className="font-heading text-[0.625rem] font-bold uppercase tracking-[0.24em] text-white/90 sm:text-xs">
                    Camisetas Sanitattoo
                  </p>
                  <h2
                    id="merch-banner-heading"
                    className="font-heading mt-2 text-xl font-bold leading-snug tracking-tight text-white sm:mt-3 sm:text-2xl"
                  >
                    Textil de marca para dentro y fuera del estudio
                  </h2>
                </div>
              </div>

              <div className="border-t border-brand-border/80 bg-brand-white px-5 py-6 sm:px-6 md:hidden">
                <p className="font-heading text-[0.625rem] font-bold uppercase tracking-[0.24em] text-brand-red">
                  Camisetas Sanitattoo
                </p>
                <h2 className="font-heading mt-2 text-xl font-bold leading-snug tracking-tight text-brand-black">
                  Textil de marca para dentro y fuera del estudio
                </h2>
                <p className="mt-2 text-sm font-normal leading-relaxed text-brand-muted">
                  Camisetas oficiales SANITATTOO. Consulta tallas, colores y
                  disponibilidad por WhatsApp.
                </p>
               
              </div>
            </div>
          </section>

          <div className="mt-12">
            <ProductGrid products={items} onOpenDetail={setSelected} />
          </div>
        </div>

        {/* 2xl+: imagen vertical izquierda + grid de camisetas derecha */}
        <div
          className="mt-8 hidden min-w-0 2xl:grid 2xl:grid-cols-[420px_minmax(0,1fr)] 2xl:items-start 2xl:gap-10"
          aria-labelledby="merch-banner-heading"
        >
          <aside className="min-w-0 2xl:sticky 2xl:top-24">
            <div className="relative h-[600px] overflow-hidden rounded-2xl bg-brand-black shadow-[0_12px_40px_rgba(5,5,5,0.1)] ring-1 ring-brand-black/10 2xl:h-[680px]">
              <img
                src={publicAssetUrl(MERCH_BANNER_IMAGE)}
                alt="Camisetas oficiales SANITATTOO en perchas: modelos negro y blanco"
                className="absolute inset-0 h-full w-full object-cover object-[center_38%]"
                loading="lazy"
                decoding="async"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-black/70 via-brand-black/25 to-brand-black/10"
                aria-hidden
              />
              <MerchPhotoOverlay />
            </div>
          </aside>

          <div className="min-w-0">
            <h2 id="merch-banner-heading" className="sr-only">
              Textil de marca para dentro y fuera del estudio
            </h2>
            <ProductGrid
              products={items}
              onOpenDetail={setSelected}
              gridClassName="sm:grid-cols-2 lg:grid-cols-2"
            />
          </div>
        </div>
      </div>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
