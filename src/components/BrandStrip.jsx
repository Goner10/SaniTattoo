/**
 * Marcas / proveedores mostrados en la home.
 * Sustituir `logo: null` por rutas reales cuando existan los assets.
 */
export default function BrandStrip() {
  const brands = [
    {
      name: "Aloe Tattoo",
      logo: "/images/brands/aloe-tattoo.jfif",
      alt: "Logo Aloe Tattoo",
    },
    {
      name: "Ghost Tattoo",
      logo: "/images/brands/ghost-logo.png",
      alt: "Logo Ghost Tattoo",
    },
    {
      name: "Effigerm",
      logo: "/images/brands/Effigerm.webp",
      alt: "Logo Effigerm",
    },
    {
      name: "BioTaTum",
      logo: "images/brands/bioTatum.png",
      alt: "Logo BioTaTum",
    },
    {
      name: "Tattoo Supplies",
      logo: null,
      alt: "Logo Tattoo Supplies",
    },
  ];

  return (
    <section
      className="overflow-x-hidden border-b border-brand-border bg-brand-bg"
      aria-labelledby="brands-heading"
    >
      <div className="mx-auto max-w-6xl min-w-0 px-4 py-12 sm:px-6 sm:py-16">
        <div className="max-w-2xl">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.22em] text-brand-red">
            Marcas
          </p>
          <h2
            id="brands-heading"
            className="font-heading mt-3 text-2xl font-semibold tracking-tight text-brand-black sm:text-3xl"
          >
            Marcas y proveedores para estudios que no improvisan
          </h2>
          <span
            className="mt-4 block h-1 w-14 rounded-full bg-brand-red"
            aria-hidden
          />
          <p className="mt-4 text-sm leading-relaxed text-brand-muted sm:text-base">
            Seleccionamos productos de marcas especializadas en higiene,
            preparación, aftercare y consumibles para que cada estudio pueda
            trabajar con material fiable en el día a día.
          </p>
        </div>

        <ul className="mt-10 grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 lg:gap-5">
          {brands.map((brand) => (
            <li key={brand.name} className="min-w-0">
              <div
                className="group flex h-full min-h-[92px] flex-col items-center justify-center rounded-2xl border border-brand-border bg-brand-white px-3 py-4 shadow-[0_4px_20px_rgba(5,5,5,0.04)] transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-brand-red/35 hover:shadow-[0_8px_28px_rgba(5,5,5,0.07)] sm:min-h-[100px] sm:px-4 sm:py-5"
              >
                {brand.logo ? (
                  <img
                    src={brand.logo}
                    alt={brand.alt}
                    className="max-h-10 w-auto object-contain opacity-80 transition-opacity duration-200 group-hover:opacity-100 sm:max-h-11"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <span className="font-heading text-center text-[0.8125rem] font-semibold leading-snug tracking-tight text-brand-black/70 opacity-80 transition-[opacity,color] duration-200 group-hover:text-brand-black group-hover:opacity-100 sm:text-sm">
                    {brand.name}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
