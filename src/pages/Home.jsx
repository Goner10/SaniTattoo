import { BadgeCheck, MessageCircle, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import BrandStrip from "../components/BrandStrip.jsx";
import FeaturedCarousel from "../components/FeaturedCarousel.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import ProductModal from "../components/ProductModal.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import WhatsAppButton from "../components/WhatsAppButton.jsx";
import { getActiveProducts } from "../data/products.js";
import { generalWhatsAppUrl } from "../utils/whatsapp.js";
import { catalogCtaPrimary } from "../utils/catalogCta.js";

const orderSteps = [
  {
    step: "01",
    title: "Explora el catálogo",
    body: "Filtra por categoría o busca por nombre. Abre la ficha para ver descripción y formatos.",
    Icon: Search,
  },
  {
    step: "02",
    title: "Escríbenos",
    body: "Usa el botón de WhatsApp en la ficha o en la cabecera. Indica producto y cantidades.",
    Icon: MessageCircle,
  },
  {
    step: "03",
    title: "Confirmación",
    body: "Te respondemos con disponibilidad, opciones de envío o recogida y forma de pago.",
    Icon: BadgeCheck,
  },
];

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const active = getActiveProducts();
  const featured = active.filter((p) => p.featured);
  const merchandisingPreview = active
    .filter((p) => p.brand === "sanitattoo")
    .sort((a, b) => Number(b.merchandisingFeatured) - Number(a.merchandisingFeatured))
    .slice(0, 3);

  return (
    <>
      <section className="relative isolate min-h-[400px] w-full overflow-x-hidden border-b border-brand-border sm:min-h-[460px] lg:min-h-[420px] lg:max-h-[min(560px,calc(100vh-120px))] xl:min-h-[440px] xl:max-h-[min(580px,calc(100vh-112px))] 2xl:max-h-none 2xl:min-h-[700px]">
        <div className="pointer-events-none absolute inset-0 z-0">
          <img
            src="/images/placeholders/hero-sanitattoo-desktop.png"
            alt="Cabecera Sanitattoo: higiene y consumibles para estudio de tatuaje"
            className="h-full min-h-[400px] w-full object-cover object-right sm:min-h-[460px] lg:min-h-[420px] lg:max-h-[min(560px,calc(100vh-120px))] xl:min-h-[440px] xl:max-h-[min(580px,calc(100vh-112px))] 2xl:max-h-none 2xl:min-h-[700px] xl:object-[right_45%] 2xl:object-[right_42%]"
            width={1920}
            height={1080}
            loading="eager"
            decoding="async"
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-1 bg-gradient-to-r from-brand-white/95 from-0% via-brand-white/72 via-42% to-white/10 to-88% max-md:via-brand-white/78 lg:from-brand-white/55 lg:via-brand-white/28 lg:to-transparent"
          aria-hidden
        />
        <div className="relative z-10 mx-auto flex min-h-[400px] max-w-6xl min-w-0 items-center px-4 py-12 sm:min-h-[460px] sm:px-6 sm:py-14 lg:min-h-[420px] lg:max-h-[min(560px,calc(100vh-120px))] lg:py-8 xl:min-h-[440px] xl:max-h-[min(580px,calc(100vh-112px))] xl:py-8 2xl:max-h-none 2xl:min-h-[700px] 2xl:py-16">
          <div
            className="max-w-xl rounded-2xl border border-brand-border/60 bg-white/80 p-5 shadow-sm backdrop-blur-[6px] sm:max-w-lg sm:border-transparent sm:bg-transparent sm:p-0 sm:shadow-none sm:backdrop-blur-none md:max-w-xl"
          >
            <span className="font-heading inline-flex items-center gap-2 rounded-full border border-brand-red/30 bg-brand-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-red shadow-sm sm:text-xs sm:tracking-[0.18em]">
              Sanitattoo
            </span>
            <h1 className="font-heading mt-4 text-3xl font-semibold leading-[1.08] tracking-tight text-brand-black sm:mt-5 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.06]">
            Material profesional para estudios de tatuaje
            </h1>
            <span
              className="mt-4 block h-1 w-14 rounded-full bg-brand-red sm:mt-5"
              aria-hidden
            />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-brand-muted sm:mt-5 sm:text-base">
            Material sanitario, consumibles y aftercare seleccionados para mantener tu flujo de trabajo limpio, cómodo y preparado para cada sesión.
            </p>
            <div className="mt-8 sm:mt-10">
              <Link to="/catalogo" className={catalogCtaPrimary}>
                Ver catálogo
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        className="overflow-x-hidden border-b border-brand-border bg-brand-white"
      >
        <div className="mx-auto max-w-6xl min-w-0 px-4 py-12 sm:px-6 sm:py-16">
          <SectionHeader
            eyebrow="Más buscados"
            accent
            title="Productos destacados"
            subtitle="Referencias habituales en estudios de tatuaje por su utilidad, rendimiento y presencia en el día a día de cada sesión."
            ctaLabel="Ver catálogo completo"
            ctaTo="/catalogo"
            ctaTone="accent"
          />
          <div className="rounded-2xl border border-brand-border/80 bg-gradient-to-b from-brand-bg/60 to-brand-white p-2 shadow-[0_10px_40px_rgba(5,5,5,0.05)] sm:p-3">
            <FeaturedCarousel
              key={featured.map((p) => p.id).join("|")}
              products={featured}
              onOpenDetail={setSelectedProduct}
            />
          </div>
        </div>
      </section>

      <BrandStrip />

      <section
        className="relative overflow-x-hidden border-y border-brand-red-dark/30 bg-gradient-to-br from-brand-red via-brand-red to-brand-red-dark text-white"
      >
        <div
          className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-black/20 blur-3xl"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        <div className="relative mx-auto max-w-6xl min-w-0 px-4 py-12 sm:px-6 sm:py-16">
          <div className="mb-8 max-w-2xl sm:mb-10">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
              Proceso
            </p>
            <h2 className="font-heading mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
              Cómo hacer un pedido
            </h2>
            <span
              className="mt-4 block h-1 w-14 rounded-full bg-white"
              aria-hidden
            />
            <p className="mt-4 text-sm leading-relaxed text-white/85 sm:text-base">
              Sin complicaciones: revisas el catálogo y cerramos detalle por
              WhatsApp.
            </p>
          </div>

          <ol className="grid gap-4 sm:grid-cols-3 sm:gap-5 lg:gap-6">
            {orderSteps.map((item) => {
              const Icon = item.Icon;
              return (
                <li
                  key={item.step}
                  className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/[0.08] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-md transition-[transform,box-shadow,border-color,background-color] duration-300 ease-out will-change-transform hover:-translate-y-1 hover:border-white/35 hover:bg-white/[0.14] hover:shadow-[0_22px_56px_rgba(0,0,0,0.28)] sm:p-7"
                >
                  <div
                    className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 transition-opacity duration-300 group-hover:opacity-80"
                    aria-hidden
                  />
                  <div className="relative flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/35 bg-white/10 text-white shadow-inner transition-colors duration-300 group-hover:border-white/50 group-hover:bg-white/15">
                      <Icon className="size-5" aria-hidden />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="font-heading text-4xl leading-none text-white/25 transition-colors duration-300 group-hover:text-white/35 sm:text-5xl">
                        {item.step}
                      </span>
                      <h3 className="font-heading mt-2 text-base font-semibold tracking-tight text-white sm:text-lg">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/80">
                        {item.body}
                      </p>
                    </div>
                  </div>
                  <div
                    className="pointer-events-none absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden
                  />
                </li>
              );
            })}
          </ol>

          <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
            <Link to="/catalogo" className={catalogCtaPrimary}>
              Ir al catálogo
            </Link>
            <WhatsAppButton
              href={generalWhatsAppUrl()}
              variant="outline"
              className="border-white/70 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white"
            >
              WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </section>

      <section
        className="overflow-x-hidden border-t border-brand-border bg-gradient-to-b from-brand-bg via-brand-bg to-brand-white"
      >
        <div className="mx-auto max-w-6xl min-w-0 px-4 py-12 sm:px-6 sm:py-16">
          <div className="relative overflow-hidden rounded-2xl border border-brand-border bg-brand-white/90 p-5 pb-8 shadow-sm ring-1 ring-brand-red/10 sm:p-7 sm:pb-10 lg:p-8 lg:pb-20">
            <div className="absolute left-5 top-0 h-1 w-16 -translate-y-px rounded-b-full bg-brand-red sm:left-7 lg:left-8" />
            <div
              className="pointer-events-none absolute right-4 top-5 z-0 hidden lg:block xl:right-6 xl:top-6 2xl:right-8"
              aria-hidden
            >
              <img
                src="/images/logos/logo_nuevo.png"
                alt=""
                aria-hidden
                width={210}
                height={210}
                className="w-[150px] -rotate-3 opacity-[0.85] xl:w-[180px] xl:opacity-[0.85] 2xl:w-[210px] 2xl:opacity-[0.85]"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="relative z-10 lg:max-w-[calc(100%-10rem)] xl:max-w-[calc(100%-12rem)] 2xl:max-w-[calc(100%-14rem)]">
            <SectionHeader
              eyebrow="Marca"
              accent
              title="Merchandising"
              subtitle="Viste la marca dentro y fuera del estudio sin perder identidad.."
            />
            </div>
            <div className="relative z-10 mt-2 lg:max-w-[calc(100%-12rem)] xl:max-w-[calc(100%-14rem)]">
              <ProductGrid
                products={merchandisingPreview}
                onOpenDetail={setSelectedProduct}
              />
            </div>
            <div className="relative z-10 mt-8 flex justify-center sm:mt-10 lg:absolute lg:bottom-6 lg:right-6 lg:mt-0 lg:justify-end xl:bottom-8 xl:right-8">
              <Link to="/merchandising" className={catalogCtaPrimary}>
                Ir a merchandising
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}
