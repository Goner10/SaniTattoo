import { publicAssetUrl } from "../utils/publicAsset.js";

const LOGO_BASE_CLASS =
  "h-auto w-auto max-w-full object-contain opacity-80 transition-opacity duration-200 hover:opacity-100";

/** Presencia visual por marca (object-contain; sin deformar). */
const BRAND_LOGO_SIZE_CLASS = {
  "aloe-tattoo":
    "max-h-10 max-w-[8.5rem] sm:max-h-12 sm:max-w-[10rem] md:max-h-[3.25rem] md:max-w-[10.5rem] lg:max-h-14 lg:max-w-[10rem]",

  effigerm:
    "max-h-18 max-w-[9rem] sm:max-h-12 sm:max-w-[10.5rem] md:max-h-[5.25rem] md:max-w-[11rem] lg:max-h-[4.25rem] lg:max-w-[13.5rem] xl:max-h-[6.5rem] xl:max-w-[14rem]",

  biotatum:
    "max-h-14 max-w-[10rem] sm:max-h-11 sm:max-w-[13rem] md:max-h-20 md:max-w-[13rem] lg:max-h-[3.85rem] lg:max-w-[15.5rem] xl:max-h-[5.5rem] xl:max-w-[16.25rem]",

  ghost:
    "max-h-14 max-w-[8.5rem] sm:max-h-11 sm:max-w-[10.5rem] md:max-h-20 md:max-w-[11rem] lg:max-h-[3.85rem] lg:max-w-[13.5rem] xl:max-h-[5.1rem] xl:max-w-[14rem]",

  tsunami:
    "max-h-18 max-w-[8.5rem] sm:max-h-[3.25rem] sm:max-w-[10rem] md:max-h-[6.25rem] md:max-w-[10.5rem] lg:max-h-[4.1rem] lg:max-w-[13rem] xl:max-h-[7.5rem] xl:max-w-[13.75rem]",

  hornet:
    "max-h-12 max-w-[8rem] sm:max-h-12 sm:max-w-[9rem] md:max-h-13 md:max-w-[11.25rem] lg:max-h-11 lg:max-w-[8.75rem] xl:max-h-[4rem] xl:max-w-[10.75rem]",

  shapu:
    "max-h-18 max-w-[8rem] sm:max-h-12 sm:max-w-[9.5rem] md:max-h-[6.5rem] md:max-w-[10rem] lg:max-h-[4.15rem] lg:max-w-[14rem] xl:max-h-[6rem] xl:max-w-[18.5rem]",

  "real-stencil-printer":
    "max-h-10 max-w-[8.5rem] sm:max-h-12 sm:max-w-[10rem] md:max-h-12 md:max-w-[9.75rem] lg:max-h-11 lg:max-w-[9rem]",
};

/** Logos destacado home — rutas en public/images/brands (sin tocar brands.js). */
const BRAND_LOGOS = [
  {
    id: "effigerm",
    alt: "Effigerm",
    src: "images/brands/effigerm-destacado.png",
  },
  {
    id: "aloe-tattoo",
    alt: "Aloe Tattoo",
    src: "images/brands/aloe-tattoo-destacado.png",
  },
  {
    id: "biotatum",
    alt: "BioTaTum",
    src: "images/brands/biotatum-destacado.png",
  },
  {
    id: "ghost",
    alt: "Ghost Tattoo",
    src: "images/brands/ghost-destacado.png",
  },
  {
    id: "tsunami",
    alt: "Tsunami",
    src: "images/brands/tsunami.png",
  },
  {
    id: "hornet",
    alt: "Hornet",
    src: "images/brands/hornet-brand.PNG",
  },
  {
    id: "shapu",
    alt: "Shapu",
    src: "images/brands/shapu-logo.png",
  },
  {
    id: "real-stencil-printer",
    alt: "Real Stencil Printer",
    src: "images/brands/real-stencil-logo-.png",
  },
];

function brandLogoClass(id) {
  return [LOGO_BASE_CLASS, BRAND_LOGO_SIZE_CLASS[id] ?? ""].join(" ");
}

export default function BrandStrip() {
  return (
    <section
      className="overflow-x-hidden border-b border-brand-border bg-brand-white"
      aria-labelledby="brands-heading"
    >
      <div className="mx-auto max-w-6xl min-w-0 px-4 py-12 sm:px-6 sm:py-16">
        <div className="max-w-2xl">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.22em] text-brand-red">
            Marcas
          </p>
          <h2
            id="brands-heading"
            className="font-heading mt-3 text-2xl font-bold tracking-tight text-brand-black sm:text-3xl"
          >
            Marcas y proveedores para estudios que no improvisan
          </h2>
          <span
            className="mt-4 block h-1 w-14 rounded-full bg-brand-red"
            aria-hidden
          />
          <p className="mt-4 text-sm font-normal leading-relaxed text-brand-muted sm:text-base">
            Seleccionamos marcas reconocidas para ofrecer material fiable, profesional y preparado para el trabajo diario del estudio.
          </p>
        </div>

        <ul
          className="mt-10 grid max-w-5xl grid-cols-2 items-center gap-x-8 gap-y-7 sm:gap-x-10 sm:gap-y-8 md:mt-12 md:grid-cols-4 md:gap-x-10 md:gap-y-10 lg:max-w-6xl lg:gap-x-12"
          aria-label="Marcas asociadas"
        >
          {BRAND_LOGOS.map((brand) => (
            <li
              key={brand.id}
              className="flex h-16 items-center justify-center sm:h-20 md:h-24 lg:h-26 xl:h-30"
            >
              <img
                src={publicAssetUrl(brand.src)}
                alt={brand.alt}
                width={160}
                height={56}
                className={brandLogoClass(brand.id)}
                loading="lazy"
                decoding="async"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
