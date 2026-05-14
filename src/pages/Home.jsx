import { motion } from "framer-motion";
import { BadgeCheck, MessageCircle, Search } from "lucide-react";
import { Link } from "react-router-dom";
import FeaturedCarousel from "../components/FeaturedCarousel.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import WhatsAppButton from "../components/WhatsAppButton.jsx";
import { getActiveProducts } from "../data/products.js";
import { generalWhatsAppUrl } from "../utils/whatsapp.js";
import { catalogCtaPrimary } from "../utils/catalogCta.js";

const easeOut = [0.22, 1, 0.36, 1];

const sectionReveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-72px", amount: 0.2 },
  transition: { duration: 0.5, ease: easeOut },
};

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
  const active = getActiveProducts();
  const featured = active.filter((p) => p.featured);
  const merchandisingPreview = active
    .filter((p) => p.category === "merchandising")
    .sort((a, b) => Number(b.merchandisingFeatured) - Number(a.merchandisingFeatured))
    .slice(0, 3);

  return (
    <>
      <section className="overflow-x-hidden border-b border-brand-border bg-brand-bg">
        <div className="mx-auto grid max-w-6xl min-w-0 gap-8 px-4 py-12 sm:grid-cols-2 sm:items-center sm:gap-10 sm:px-6 sm:py-16 lg:gap-14 lg:py-20">
          <motion.div
            className="min-w-0"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: easeOut }}
          >
            <span className="font-heading inline-flex items-center gap-2 rounded-full border border-brand-red/30 bg-brand-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-red shadow-sm sm:text-xs sm:tracking-[0.18em]">
              Sanitattoo
            </span>
            <h1 className="font-heading mt-4 text-3xl font-semibold leading-[1.08] tracking-tight text-brand-black sm:mt-5 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.06]">
              Higiene y consumibles para tu estudio
            </h1>
            <span
              className="mt-4 block h-1 w-14 rounded-full bg-brand-red sm:mt-5"
              aria-hidden
            />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-brand-muted sm:mt-5 sm:text-base">
              Catálogo curado de material sanitario, aftercare y merchandising.
              Diseñado para flujo de trabajo real en tatuaje.
            </p>
            <div className="mt-8 flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link to="/catalogo" className={catalogCtaPrimary}>
                Ver catálogo
              </Link>
              <WhatsAppButton href={generalWhatsAppUrl()} variant="solid">
                WhatsApp
              </WhatsAppButton>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: easeOut }}
            className="relative min-w-0"
          >
            <div className="rounded-2xl border border-brand-border/90 bg-gradient-to-br from-brand-white via-brand-bg to-brand-white p-3 shadow-[0_20px_50px_rgba(5,5,5,0.08)] ring-1 ring-black/[0.04] sm:p-4">
              <div className="relative overflow-hidden rounded-xl bg-brand-bg">
                <div
                  className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-brand-black/[0.06] via-transparent to-brand-red/[0.06]"
                  aria-hidden
                />
                <img
                  src="/images/placeholders/hero.jpg"
                  alt="Producto destacado Green Soap Cleansing Foam"
                  className="aspect-[4/3] w-full object-cover sm:aspect-[5/4]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <motion.section
        className="overflow-x-hidden border-b border-brand-border bg-brand-white"
        {...sectionReveal}
      >
        <div className="mx-auto max-w-6xl min-w-0 px-4 py-12 sm:px-6 sm:py-16">
          <SectionHeader
            eyebrow="Selección estudio"
            accent
            title="Productos destacados"
            subtitle="Selección de referencias que recomendamos para el día a día del estudio."
            ctaLabel="Ver catálogo completo"
            ctaTo="/catalogo"
            ctaTone="accent"
          />
          <div className="rounded-2xl border border-brand-border/80 bg-gradient-to-b from-brand-bg/60 to-brand-white p-2 shadow-[0_10px_40px_rgba(5,5,5,0.05)] sm:p-3">
            <FeaturedCarousel
              key={featured.map((p) => p.id).join("|")}
              products={featured}
            />
          </div>
        </div>
      </motion.section>

      <motion.section
        className="relative overflow-x-hidden border-y border-brand-red-dark/30 bg-gradient-to-br from-brand-red via-brand-red to-brand-red-dark text-white"
        {...sectionReveal}
        transition={{ ...sectionReveal.transition, delay: 0.05 }}
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
                <motion.li
                  key={item.step}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, ease: easeOut }}
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
                      <span className="font-display text-4xl leading-none text-white/25 transition-colors duration-300 group-hover:text-white/35 sm:text-5xl">
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
                </motion.li>
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
            />
          </div>
        </div>
      </motion.section>

      <motion.section
        className="overflow-x-hidden border-t border-brand-border bg-gradient-to-b from-brand-bg via-brand-bg to-brand-white"
        {...sectionReveal}
      >
        <div className="mx-auto max-w-6xl min-w-0 px-4 py-12 sm:px-6 sm:py-16">
          <div className="relative rounded-2xl border border-brand-border bg-brand-white/90 p-5 shadow-sm ring-1 ring-brand-red/10 sm:p-7 lg:p-8">
            <div className="absolute left-5 top-0 h-1 w-16 -translate-y-px rounded-b-full bg-brand-red sm:left-7 lg:left-8" />
            <SectionHeader
              eyebrow="Marca"
              accent
              title="Merchandising"
              subtitle="Textil y piezas de marca. Vista previa de hasta 3 referencias; el catálogo completo está en su sección."
              ctaLabel="Ir a merchandising"
              ctaTo="/merchandising"
              ctaTone="accent"
            />
            <div className="mt-2">
              <ProductGrid products={merchandisingPreview} />
            </div>
            <div className="mt-8 flex justify-center border-t border-brand-border/70 pt-8 sm:justify-end">
              <Link
                to="/merchandising"
                className={`${catalogCtaPrimary} w-full justify-center sm:w-auto`}
              >
                Ver merchandising completo
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
