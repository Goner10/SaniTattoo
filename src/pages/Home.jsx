import { motion } from "framer-motion";
import { BadgeCheck, MessageCircle, Search } from "lucide-react";
import { Link } from "react-router-dom";
import FeaturedCarousel from "../components/FeaturedCarousel.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import WhatsAppButton from "../components/WhatsAppButton.jsx";
import { getActiveProducts } from "../data/products.js";
import { generalWhatsAppUrl } from "../utils/whatsapp.js";

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
      <section className="border-b border-brand-border bg-brand-bg">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 sm:items-center sm:gap-12 sm:px-6 sm:py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: easeOut }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-red/25 bg-brand-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-red shadow-sm">
              Sanitattoo
            </span>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight text-brand-black sm:text-5xl lg:text-6xl">
              Higiene y consumibles para tu estudio
            </h1>
            <span
              className="mt-4 block h-1 w-14 rounded-full bg-brand-red"
              aria-hidden
            />
            <p className="mt-5 max-w-md text-sm leading-relaxed text-brand-muted sm:text-base">
              Catálogo curado de material sanitario, aftercare y merchandising.
              Diseñado para flujo de trabajo real en tatuaje.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to="/catalogo"
                className="inline-flex items-center justify-center rounded-md border-2 border-brand-red bg-brand-black px-5 py-3 text-sm font-medium text-brand-white transition-colors hover:bg-brand-red hover:text-brand-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
              >
                Ver catálogo
              </Link>
              <WhatsAppButton
                href={generalWhatsAppUrl()}
                className="shadow-sm ring-1 ring-[#25D366]/30 ring-offset-2 ring-offset-brand-bg"
              >
                WhatsApp
              </WhatsAppButton>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: easeOut }}
            className="relative overflow-hidden rounded-xl border border-brand-border bg-brand-white shadow-[0_20px_50px_rgba(5,5,5,0.08)]"
          >
            <div
              className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-brand-red/10 via-transparent to-transparent"
              aria-hidden
            />
            <img
              src="/images/productos/green-soap-cleansing-foam.png"
              alt="Producto destacado Green Soap Cleansing Foam"
              className="aspect-square w-full object-cover sm:aspect-[5/4]"
            />
          </motion.div>
        </div>
      </section>

      <motion.section
        className="overflow-x-hidden border-b border-brand-border bg-brand-white"
        {...sectionReveal}
      >
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <SectionHeader
            eyebrow="Selección estudio"
            accent
            title="Productos destacados"
            subtitle="Selección de referencias que recomendamos para el día a día del estudio."
            ctaLabel="Ver catálogo completo"
            ctaTo="/catalogo"
            ctaTone="accent"
          />
          <FeaturedCarousel
            key={featured.map((p) => p.id).join("|")}
            products={featured}
          />
        </div>
      </motion.section>

      <motion.section
        className="relative overflow-hidden border-y border-brand-red-dark/30 bg-gradient-to-br from-brand-red via-brand-red to-brand-red-dark text-white"
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

        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
              Proceso
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-tight text-white sm:text-4xl">
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

          <ol className="grid gap-5 sm:grid-cols-3 sm:gap-6">
            {orderSteps.map((item) => {
              const Icon = item.Icon;
              return (
                <motion.li
                  key={item.step}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, ease: easeOut }}
                  className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/[0.08] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-md sm:p-7"
                >
                  <div
                    className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10"
                    aria-hidden
                  />
                  <div className="relative flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/35 bg-white/10 text-white shadow-inner">
                      <Icon className="size-5" aria-hidden />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="font-display text-4xl leading-none text-white/25 sm:text-5xl">
                        {item.step}
                      </span>
                      <h3 className="mt-2 text-lg font-semibold tracking-tight text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/80">
                        {item.body}
                      </p>
                    </div>
                  </div>
                  <div
                    className="pointer-events-none absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                    aria-hidden
                  />
                </motion.li>
              );
            })}
          </ol>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              to="/catalogo"
              className="inline-flex items-center justify-center rounded-md border-2 border-white bg-white px-5 py-2.5 text-sm font-semibold text-brand-red transition-colors hover:bg-transparent hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
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

      <motion.section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16" {...sectionReveal}>
        <SectionHeader
          eyebrow="Marca"
          accent
          title="Merchandising"
          subtitle="Textil y piezas de marca. Vista previa; el listado completo está en su sección."
          ctaLabel="Ir a merchandising"
          ctaTo="/merchandising"
          ctaTone="accent"
        />
        <ProductGrid products={merchandisingPreview} />
      </motion.section>
    </>
  );
}
