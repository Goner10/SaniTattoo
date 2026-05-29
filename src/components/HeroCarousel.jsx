import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { catalogCtaPrimary } from "../utils/catalogCta.js";
import {
  publicAssetUrl,
  resolveResponsiveSources,
  responsiveImageVisibility,
} from "../utils/publicAsset.js";

const AUTOPLAY_MS = 5500;

const imageFillClass = "absolute inset-0 h-full w-full";

/**
 * @typedef {{
 *   id: string
 *   image: string
 *   images?: import("../utils/publicAsset.js").ResponsiveImageSources
 *   imageAlt: string
 *   imageClass?: string
 *   imageClassMobile?: string
 *   imageClassTablet?: string
 *   imageClassDesktop?: string
 *   variant: "brand" | "light"
 *   eyebrow: string
 *   title: string
 *   description: string
 *   ctaTo: string
 *   ctaLabel: string
 *   dotLabel: string
 *   fullContentOnDesktop?: boolean
 *   imageOnlyOnDesktop?: boolean
 *   imageLinkAriaLabel?: string
 * }} HeroSlide
 */

/** @type {HeroSlide[]} */
const SLIDES = [
  {
    id: "sanitattoo",
    image: "images/placeholders/hero-definitivo.png",
    images: {
      mobile: "images/placeholders/hero-definitivo.png",
      tablet: "images/placeholders/hero-definitivo.png",
      desktop: "images/placeholders/hero-definitivo.png",
    },
    imageAlt:
      "Cabecera Sanitattoo: higiene y consumibles para estudio de tatuaje",
    imageClass:
      "object-cover object-right xl:object-[right_45%] 2xl:object-[right_42%]",
    imageClassMobile: "object-cover object-center sm:object-right",
    imageClassTablet: "object-cover object-right",
    imageClassDesktop:
      "object-cover object-right xl:object-[right_45%] 2xl:object-[right_42%]",
    variant: "brand",
    eyebrow: "Sanitattoo",
    title: "EQUIPA TU ESTUDIO AL SIGUIENTE NIVEL",
    description:
      "Material sanitario, consumibles premium y aftercare profesional para tattoo & piercing.",
    ctaTo: "/catalogo",
    ctaLabel: "Ver catálogo",
    dotLabel: "Ir al slide principal SANITATTOO",
    fullContentOnDesktop: true,
  },
  {
    id:"shapu",
    image: "images/placeholders/shapu-hero.jpg",
    images: {
      mobile: "images/placeholders/shapu-hero.jpg",
      tablet: "images/placeholders/shapu-hero.jpg",
      desktop: "images/placeholders/shapu-hero.jpg",
    },
    imageAlt: "Banner Shapu: cuidado para piel tatuada",
    imageClass: "object-cover object-center",
    imageClassMobile: "object-cover object-center",
    imageClassTablet: "object-cover object-center",
    imageClassDesktop: "object-cover object-center",
    variant: "brand",
    eyebrow: "SHAPU",
    title: "Cuidado para piel tatuada",
    description: "",
    ctaTo: "/catalogo?brand=shapu",
    ctaLabel: "Ver productos Shapu",
    dotLabel: "Ir al slide Shapu",
    imageOnlyOnDesktop: true,
    imageLinkAriaLabel: "Ver productos Shapu",
    fullContentOnDesktop: true,
  },
  {
    id: "biotatum",
    image: "images/brands/hero-bio.png",
    images: {
      mobile: "images/brands/bio-tatum-movil.webp",
      tablet: "images/brands/bio-tatum-tablet.webp",
      desktop: "images/brands/hero-bio.png",
    },
    imageAlt: "Banner BioTaTum Professional: cuidado para piel tatuada",
    imageClass: "object-cover object-center 2xl:object-[center_35%]",
    imageClassMobile: "object-contain object-center bg-brand-black",
    imageClassTablet: "object-contain object-center bg-brand-black",
    imageClassDesktop: "object-cover object-center 2xl:object-[center_35%]",
    variant: "brand",
    eyebrow: "BIOTATUM PROFESSIONAL",
    title: "Cuidado profesional para piel tatuada",
    description: "",
    ctaTo: "/catalogo?brand=biotatum",
    ctaLabel: "Ver productos BioTaTum",
    dotLabel: "Ir al slide BioTaTum",
    imageOnlyOnDesktop: true,
    imageLinkAriaLabel: "Ver productos BioTaTum",
  },
  {
    id: "aloetattoo",
    image: "images/brands/aloe_tattoo.JPG",
    images: {
      mobile: "images/brands/aloe_tattoo.JPG",
      tablet: "images/brands/aloe_tattoo.JPG",
      desktop: "images/brands/aloe_tattoo.JPG",
    },
    imageAlt: "Banner Aloe Tattoo: aftercare y preparación profesional",
    imageClass: "object-cover object-center",
    imageClassMobile: "object-cover object-[center_40%]",
    imageClassTablet: "object-cover object-center",
    imageClassDesktop: "object-cover object-[center_32%]",
    variant: "brand",
    eyebrow: "ALOE TATTOO",
    title: "Aftercare y preparación profesional",
    description: "",
    ctaTo: "/catalogo?brand=aloetattoo",
    ctaLabel: "Ver productos Aloe Tattoo",
    dotLabel: "Ir al slide Aloe Tattoo",
    imageOnlyOnDesktop: true,
    imageLinkAriaLabel: "Ver productos Aloe Tattoo",
  },
 
];

const sectionHeightClass =
  "relative isolate min-h-[500px] w-full overflow-hidden border-b border-brand-border bg-brand-white sm:min-h-[460px] lg:min-h-[420px] lg:max-h-[min(560px,calc(100vh-120px))] xl:min-h-[440px] xl:max-h-[min(580px,calc(100vh-112px))] 2xl:max-h-none 2xl:min-h-[700px]";

const slidePanelHeightClass =
  "relative h-full min-h-[500px] w-full shrink-0 basis-full sm:min-h-[460px] lg:min-h-[420px] lg:max-h-[min(560px,calc(100vh-120px))] xl:min-h-[440px] xl:max-h-[min(580px,calc(100vh-112px))] 2xl:max-h-none 2xl:min-h-[700px]";

const contentShellClass =
  "relative z-10 mx-auto flex h-full min-h-[inherit] max-w-6xl min-w-0 items-center px-4 py-14 pb-28 sm:px-6 sm:py-14 sm:pb-14 lg:py-8 lg:pb-8 xl:py-8 xl:pb-8 2xl:mx-0 2xl:mr-auto 2xl:max-w-[1500px] 2xl:ml-[max(2rem,calc((100vw-1500px)/2+2rem))] 2xl:px-8 2xl:py-16 2xl:pb-16";

function slideContentCardClass(variant, slideId) {
  if (slideId === "biotatum") {
    return [
      "max-w-[90%] rounded-2xl border p-4 shadow-sm backdrop-blur-[5px] sm:max-w-lg sm:p-0 md:max-w-xl",
      "border-white/15 bg-brand-black/40 sm:border-transparent sm:bg-transparent sm:shadow-none sm:backdrop-blur-none",
    ].join(" ");
  }
  return [
    "max-w-xl rounded-2xl border p-5 shadow-sm backdrop-blur-[6px] sm:max-w-lg sm:p-0 md:max-w-xl",
    variant === "brand"
      ? "border-white/15 bg-brand-black/45 sm:border-transparent sm:bg-transparent sm:shadow-none sm:backdrop-blur-none"
      : "border-brand-border/60 bg-white/80 sm:border-transparent sm:bg-transparent sm:shadow-none sm:backdrop-blur-none",
  ].join(" ");
}

/**
 * Clases de encaje por breakpoint sin mezclar object-cover y object-contain.
 * @param {HeroSlide} slide
 * @param {"mobile" | "tablet" | "desktop"} variant
 */
function heroSlideImageClassName(slide, variant) {
  const visibility = responsiveImageVisibility[variant];
  let fit;

  if (variant === "mobile") {
    fit =
      slide.imageClassMobile ??
      (slide.id === "biotatum"
        ? "object-contain object-center bg-brand-black"
        : (slide.imageClass ?? "object-cover object-center"));
  } else if (variant === "tablet") {
    fit =
      slide.imageClassTablet ??
      (slide.id === "biotatum"
        ? "object-contain object-center bg-brand-black"
        : (slide.imageClass ?? "object-cover object-center"));
  } else {
    fit = slide.imageClassDesktop ?? slide.imageClass ?? "object-cover object-center";
  }

  return [imageFillClass, fit, visibility].join(" ");
}

/** Evita ratio 16:9 forzado en assets verticales (p. ej. BioTaTum móvil). */
function heroSlideImgProps(slide, variant, eagerImage) {
  const base = {
    alt: slide.imageAlt,
    loading: eagerImage ? "eager" : "lazy",
    decoding: "async",
    draggable: false,
  };

  if (slide.id === "biotatum" && variant !== "desktop") {
    return base;
  }

  return { ...base, width: 1920, height: 1080 };
}

/**
 * @param {{ slide: HeroSlide, eagerImage?: boolean }} props
 */
function HeroSlideImage({ slide, eagerImage }) {
  const sources = resolveResponsiveSources(slide.images, slide.image);
  const useResponsive = Boolean(slide.images);

  if (!useResponsive) {
    return (
      <img
        {...heroSlideImgProps(slide, "desktop", eagerImage)}
        src={publicAssetUrl(slide.image)}
        className={[imageFillClass, slide.imageClass ?? ""].join(" ")}
      />
    );
  }

  return (
    <>
      <img
        {...heroSlideImgProps(slide, "mobile", eagerImage)}
        src={publicAssetUrl(sources.mobile)}
        className={heroSlideImageClassName(slide, "mobile")}
      />
      <img
        {...heroSlideImgProps(slide, "tablet", eagerImage)}
        src={publicAssetUrl(sources.tablet)}
        className={heroSlideImageClassName(slide, "tablet")}
      />
      <img
        {...heroSlideImgProps(slide, "desktop", eagerImage)}
        src={publicAssetUrl(sources.desktop)}
        className={heroSlideImageClassName(slide, "desktop")}
      />
    </>
  );
}

/**
 * @param {{ slide: HeroSlide, eagerImage?: boolean }} props
 */
function HeroSlidePanel({ slide, eagerImage }) {
  const isBrand = slide.variant === "brand";
  const imageOnlyOnDesktop = Boolean(slide.imageOnlyOnDesktop);
  const isBiotatum = slide.id === "biotatum";

  return (
    <div
      className={[
        slidePanelHeightClass,
        isBiotatum ? "max-lg:bg-brand-black" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <HeroSlideImage slide={slide} eagerImage={eagerImage} />
      {imageOnlyOnDesktop ? (
        <Link
          to={slide.ctaTo}
          className="absolute inset-0 z-[1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
          aria-label={slide.imageLinkAriaLabel ?? slide.ctaLabel}
        />
      ) : null}
      <div
        className={[
          contentShellClass,
          imageOnlyOnDesktop ? "hidden" : "",
          isBiotatum ? "max-md:py-10 max-md:pb-24" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className={slideContentCardClass(slide.variant, slide.id)}>
          <span
            className={[
              "font-heading inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm sm:text-xs sm:tracking-[0.18em]",
              isBrand
                ? "border-white/25 bg-white/10 text-brand-white"
                : "border-brand-red/30 bg-brand-white text-brand-red",
            ].join(" ")}
          >
            {slide.eyebrow}
          </span>
          <h2
            className={[
              "font-heading font-extrabold leading-[1.08] tracking-tight text-brand-white",
              isBiotatum
                ? "mt-3 max-md:text-2xl sm:mt-5 sm:text-4xl"
                : "mt-4 text-3xl sm:mt-5 sm:text-4xl",
              "lg:text-[2.75rem] lg:leading-[1.06]",
            ].join(" ")}
          >
            {slide.title}
          </h2>
          <span
            className={[
              "mt-4 block h-1 w-14 rounded-full sm:mt-5",
              isBrand ? "bg-brand-red" : "bg-brand-red",
            ].join(" ")}
            aria-hidden
          />
          {slide.description ? (
            <p
              className={[
                "mt-4 max-w-md text-sm font-normal leading-relaxed sm:mt-5 sm:text-base",
                isBrand ? "text-white/90" : "text-brand-muted",
              ].join(" ")}
            >
              {slide.description}
            </p>
          ) : null}
          <div
            className={
              isBiotatum ? "mt-6 max-sm:mb-1 sm:mt-10" : "mt-8 max-sm:mb-1 sm:mt-10"
            }
          >
            <Link to={slide.ctaTo} className={catalogCtaPrimary}>
              {slide.ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroCarousel() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const count = SLIDES.length;

  const goTo = useCallback((next) => {
    setIndex((i) => {
      if (typeof next === "number") {
        return ((next % count) + count) % count;
      }
      return (i + 1) % count;
    });
  }, [count]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + count) % count);
  }, [count]);

  useEffect(() => {
    if (reduceMotion || paused) return undefined;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, reduceMotion, count]);

  const trackTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.65, ease: [0.32, 0.72, 0, 1] };

  return (
    <section
      className={sectionHeightClass}
      aria-roledescription="carrusel"
      aria-label="Destacados SANITATTOO"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
    >
      <div className="absolute inset-0 overflow-hidden bg-brand-white">
        <motion.div
          className="flex h-full will-change-transform"
          animate={{ x: `-${index * 100}%` }}
          transition={trackTransition}
          aria-live="polite"
        >
          {SLIDES.map((s, i) => (
            <HeroSlidePanel key={s.id} slide={s} eagerImage={i === 0} />
          ))}
        </motion.div>
      </div>

      {count > 1 ? (
        <>
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-2 top-1/2 z-20 flex -translate-y-1/2 rounded-full border border-white/20 bg-black/35 p-2 text-white opacity-70 shadow-sm backdrop-blur-sm transition-colors hover:bg-black/50 hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red sm:left-4 sm:border-brand-border/80 sm:bg-brand-white/90 sm:p-2.5 sm:text-brand-black sm:opacity-100 sm:shadow-md sm:hover:border-brand-red/40 sm:hover:bg-brand-white"
            aria-label="Slide anterior"
          >
            <ChevronLeft className="size-4 sm:size-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => goTo((index + 1) % count)}
            className="absolute right-2 top-1/2 z-20 flex -translate-y-1/2 rounded-full border border-white/20 bg-black/35 p-2 text-white opacity-70 shadow-sm backdrop-blur-sm transition-colors hover:bg-black/50 hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red sm:right-4 sm:border-brand-border/80 sm:bg-brand-white/90 sm:p-2.5 sm:text-brand-black sm:opacity-100 sm:shadow-md sm:hover:border-brand-red/40 sm:hover:bg-brand-white"
            aria-label="Slide siguiente"
          >
            <ChevronRight className="size-4 sm:size-5" aria-hidden />
          </button>

          <div
            className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:bottom-6"
            role="tablist"
            aria-label="Slides del hero"
          >
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={s.dotLabel}
                onClick={() => goTo(i)}
                className={[
                  "h-2.5 rounded-full transition-[width,background-color] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-white",
                  i === index
                    ? "w-8 bg-brand-red"
                    : "w-2.5 bg-brand-white/70 hover:bg-brand-white",
                ].join(" ")}
              />
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
