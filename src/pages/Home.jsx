import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import WhatsAppButton from "../components/WhatsAppButton.jsx";
import { getActiveProducts } from "../data/products.js";
import { generalWhatsAppUrl } from "../utils/whatsapp.js";

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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
              Sanitattoo
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight tracking-tight text-brand-black sm:text-5xl lg:text-6xl">
              Higiene y consumibles para tu estudio
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-brand-muted sm:text-base">
              Catálogo curado de material sanitario, aftercare y merchandising.
              Diseñado para flujo de trabajo real en tatuaje.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to="/catalogo"
                className="inline-flex items-center justify-center rounded-md bg-brand-black px-5 py-3 text-sm font-medium text-brand-white transition-colors hover:bg-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
              >
                Ver catálogo
              </Link>
              <WhatsAppButton href={generalWhatsAppUrl()}>
                WhatsApp
              </WhatsAppButton>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="relative overflow-hidden rounded-xl border border-brand-border bg-brand-white"
          >
            <img
              src="/images/productos/green-soap-cleansing-foam.png"
              alt="Producto destacado Green Soap Cleansing Foam"
              className="aspect-square w-full object-cover sm:aspect-[5/4]"
            />
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <SectionHeader
          title="Productos destacados"
          subtitle="Selección de referencias que recomendamos para el día a día del estudio."
          ctaLabel="Ver catálogo completo"
          ctaTo="/catalogo"
        />
        <ProductGrid products={featured} />
      </section>

      <section className="border-y border-brand-border bg-brand-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <SectionHeader
            title="Cómo hacer un pedido"
            subtitle="Sin complicaciones: revisas el catálogo y cerramos detalle por WhatsApp."
          />
          <ol className="grid gap-6 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Explora el catálogo",
                body: "Filtra por categoría o busca por nombre. Abre la ficha para ver descripción y formatos.",
              },
              {
                step: "2",
                title: "Escríbenos",
                body: "Usa el botón de WhatsApp en la ficha o en la cabecera. Indica producto y cantidades.",
              },
              {
                step: "3",
                title: "Confirmación",
                body: "Te respondemos con disponibilidad, opciones de envío o recogida y forma de pago.",
              },
            ].map((item) => (
              <li
                key={item.step}
                className="rounded-lg border border-brand-border bg-brand-bg p-5"
              >
                <span className="font-display text-2xl text-brand-red">{item.step}</span>
                <h3 className="mt-2 text-base font-semibold text-brand-black">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <SectionHeader
          title="Merchandising"
          subtitle="Textil y piezas de marca. Vista previa; el listado completo está en su sección."
          ctaLabel="Ir a merchandising"
          ctaTo="/merchandising"
        />
        <ProductGrid products={merchandisingPreview} />
      </section>
    </>
  );
}
