import { publicAssetUrl } from "../utils/publicAsset.js";

const LOGO_BASE_CLASS =
  "h-auto w-auto object-contain opacity-80 transition-opacity duration-200 hover:opacity-100";

/** Presencia visual por marca (object-contain; sin deformar). */
const BRAND_LOGO_SIZE_CLASS = {
  "aloe-tattoo":
    "max-h-11 max-w-[9.25rem] sm:max-h-14 sm:max-w-[11rem] md:max-h-16 md:max-w-[12.5rem]",
  effigerm:
    "max-h-[4.25rem] max-w-[11rem] sm:max-h-[5.25rem] sm:max-w-[12.5rem] md:max-h-[6rem] md:max-w-[13.5rem]",
  biotatum:
    "max-h-12 max-w-[15rem] sm:max-h-[5.75rem] sm:max-w-[18rem] md:max-h-[6.25rem] md:max-w-[22rem]",
  ghost:
    "max-h-12 max-w-[12rem] sm:max-h-[4.75rem] sm:max-w-[14.5rem] md:max-h-[5.25rem] md:max-w-[16rem]",
  tsunami:
    "max-h-14 max-w-[11rem] sm:max-h-[4.5rem] sm:max-w-[12.75rem] md:max-h-[5rem] md:max-w-[15.5rem]",
    hornet:
    "max-h-11 max-w-[9.25rem] sm:max-h-14 sm:max-w-[11rem] md:max-h-16 md:max-w-[12.5rem]",
    shapu:
    "max-h-11 max-w-[9.25rem] sm:max-h-14 sm:max-w-[11rem] md:max-h-16 md:max-w-[12.5rem]",
    "real-stencil-printer":
    "max-h-9 max-w-[7.25rem] sm:max-h-12 sm:max-w-[9rem] md:max-h-14 md:max-w-[10.5rem]",
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

function brandItemClass(id) {
  return [
    "flex min-w-[42%] shrink-0 items-center justify-center sm:min-w-0 md:min-w-0",
    id === "tsunami" ? "mr-2 sm:mr-3" : "",
  ]
    .filter(Boolean)
    .join(" ");
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
          className="mt-10 flex min-w-0 flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-x-5 sm:gap-y-5 md:mt-12 md:justify-start lg:gap-x-5"
          aria-label="Marcas asociadas"
        >
          {BRAND_LOGOS.map((brand) => (
            <li
              key={brand.id}
              className={brandItemClass(brand.id)}
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
