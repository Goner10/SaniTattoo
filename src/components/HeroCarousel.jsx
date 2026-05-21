import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { catalogCtaPrimary } from "../utils/catalogCta.js";
import { publicAssetUrl } from "../utils/publicAsset.js";

const AUTOPLAY_MS = 5500;

const SLIDES = [
  {
    id: "sanitattoo",
    image: "images/placeholders/hero-definitivo.png",
    imageAlt:
      "Cabecera Sanitattoo: higiene y consumibles para estudio de tatuaje",
    imageClass:
      "object-cover object-right xl:object-[right_45%] 2xl:object-[right_42%]",
    variant: "brand",
    eyebrow: "Sanitattoo",
    title: "Material profesional para estudios de tatuaje",
    description:
      "Material sanitario, consumibles y aftercare seleccionados para mantener tu flujo de trabajo limpio, cómodo y preparado para cada sesión.",
    ctaTo: "/catalogo",
    ctaLabel: "Ver catálogo",
    dotLabel: "Ir al slide principal SANITATTOO",
    fullContentOnDesktop: true,
  },
  {
    id: "aloetattoo",
    image: "images/brands/aloe_tattoo.JPG",
    imageAlt: "Banner Aloe Tattoo: aftercare y preparación profesional",
    imageClass: "object-cover object-center",
    variant: "brand",
    eyebrow: "ALOE TATTOO",
    title: "Aftercare y preparación profesional",
    description:
      "",
    ctaTo: "/catalogo?brand=aloetattoo",
    ctaLabel: "Ver productos Aloe Tattoo",
    dotLabel: "Ir al slide Aloe Tattoo",
    imageOnlyOnDesktop: true,
    imageLinkAriaLabel: "Ver productos Aloe Tattoo",
  },
  {
    id: "biotatum",
    image: "images/brands/hero-bio.png",
    imageAlt: "Banner BioTaTum Professional: cuidado para piel tatuada",
    imageClass: "object-cover object-center 2xl:object-[center_35%]",
    variant: "brand",
    eyebrow: "BIOTATUM PROFESSIONAL",
    title: "Cuidado profesional para piel tatuada",
    description:
      "",
    ctaTo: "/catalogo?brand=biotatum",
    ctaLabel: "Ver productos BioTaTum",
    dotLabel: "Ir al slide BioTaTum",
    imageOnlyOnDesktop: true,
    imageLinkAriaLabel: "Ver productos BioTaTum",
  },
];

const sectionHeightClass =
  "relative isolate min-h-[500px] w-full overflow-hidden border-b border-brand-border bg-brand-white sm:min-h-[460px] lg:min-h-[420px] lg:max-h-[min(560px,calc(100vh-120px))] xl:min-h-[440px] xl:max-h-[min(580px,calc(100vh-112px))] 2xl:max-h-none 2xl:min-h-[700px]";

const slidePanelHeightClass =
  "relative h-full min-h-[500px] w-full shrink-0 basis-full sm:min-h-[460px] lg:min-h-[420px] lg:max-h-[min(560px,calc(100vh-120px))] xl:min-h-[440px] xl:max-h-[min(580px,calc(100vh-112px))] 2xl:max-h-none 2xl:min-h-[700px]";

const imageFillClass = "absolute inset-0 h-full w-full";

const contentShellClass =
  "relative z-10 mx-auto flex h-full min-h-[inherit] max-w-6xl min-w-0 items-center px-4 py-14 pb-28 sm:px-6 sm:py-14 sm:pb-14 lg:py-8 lg:pb-8 xl:py-8 xl:pb-8 2xl:mx-0 2xl:mr-auto 2xl:max-w-[1500px] 2xl:ml-[max(2rem,calc((100vw-1500px)/2+2rem))] 2xl:px-8 2xl:py-16 2xl:pb-16";

function slideContentCardClass(variant) {
  return [
    "max-w-xl rounded-2xl border p-5 shadow-sm backdrop-blur-[6px] sm:max-w-lg sm:p-0 md:max-w-xl",
    variant === "brand"
      ? "border-white/15 bg-brand-black/45 sm:border-transparent sm:bg-transparent sm:shadow-none sm:backdrop-blur-none"
      : "border-brand-border/60 bg-white/80 sm:border-transparent sm:bg-transparent sm:shadow-none sm:backdrop-blur-none",
  ].join(" ");
}

function HeroSlidePanel({ slide, eagerImage }) {
  const isBrand = slide.variant === "brand";
  const imageOnlyOnDesktop = Boolean(slide.imageOnlyOnDesktop);

  return (
    <div className={slidePanelHeightClass}>
      <img
        src={publicAssetUrl(slide.image)}
        alt={slide.imageAlt}
        className={[imageFillClass, slide.imageClass].join(" ")}
        width={1920}
        height={1080}
        loading={eagerImage ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
      />
      {imageOnlyOnDesktop ? (
        <Link
          to={slide.ctaTo}
          className="absolute inset-0 z-[1] hidden md:block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
          aria-label={slide.imageLinkAriaLabel ?? slide.ctaLabel}
        />
      ) : null}
      <div
        className={[contentShellClass, imageOnlyOnDesktop ? "md:hidden" : ""]
          .filter(Boolean)
          .join(" ")}
      >
        <div className={slideContentCardClass(slide.variant)}>
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
          <h2 className="font-heading mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-brand-white sm:mt-5 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.06]">
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
          <div className="mt-8 max-sm:mb-1 sm:mt-10">
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
            className="absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-brand-border/80 bg-brand-white/90 p-2.5 text-brand-black shadow-md transition-colors hover:border-brand-red/40 hover:bg-brand-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red sm:left-4 sm:flex"
            aria-label="Slide anterior"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => goTo((index + 1) % count)}
            className="absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-brand-border/80 bg-brand-white/90 p-2.5 text-brand-black shadow-md transition-colors hover:border-brand-red/40 hover:bg-brand-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red sm:right-4 sm:flex"
            aria-label="Slide siguiente"
          >
            <ChevronRight className="size-5" aria-hidden />
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
