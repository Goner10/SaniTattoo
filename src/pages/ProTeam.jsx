import { motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import ArtistProfile from "../components/ArtistProfile.jsx";
import { artists } from "../data/artists.js";

const PAGE_TITLE = "Sanitattoo — Pro Team";

const pageContainer =
  "mx-auto w-full max-w-6xl min-w-0 px-4 sm:px-6 2xl:max-w-[1500px] 2xl:px-8";

function pageDescription(list) {
  const formatter = new Intl.ListFormat("es", {
    style: "long",
    type: "conjunction",
  });
  if (!list.length) return "Artistas patrocinados por Sanitattoo.";
  const profiles = list.map((artist) => {
    const specialties = artist.specialties.join(" y ").toLowerCase();
    return `${artist.name} (${specialties}, ${artist.studio})`;
  });
  return `Artistas patrocinados por Sanitattoo: ${formatter.format(profiles)}.`;
}

function revealProps(reduceMotion) {
  if (reduceMotion) return {};
  return {
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.45, ease: "easeOut" },
  };
}

export default function ProTeam() {
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion =
    prefersReducedMotion ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const description = pageDescription(artists);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = PAGE_TITLE;

    const existing = document.querySelector('meta[name="description"]');
    const meta = existing ?? document.createElement("meta");
    const created = !existing;
    if (created) {
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    const previousDescription = created ? null : meta.getAttribute("content");
    meta.setAttribute("content", description);

    return () => {
      document.title = previousTitle;
      if (created) {
        meta.remove();
      } else if (previousDescription == null) {
        meta.removeAttribute("content");
      } else {
        meta.setAttribute("content", previousDescription);
      }
    };
  }, [description]);

  return (
    <div className="min-h-full bg-[#101010] text-brand-white">
      <motion.header
        {...revealProps(reduceMotion)}
        className="relative overflow-hidden"
      >
        <div className={pageContainer}>
          <div className="relative z-10 flex flex-col gap-6 py-12 sm:py-14 lg:flex-row lg:items-end lg:justify-between lg:py-16">
            <div className="relative min-w-0">
              <p
                aria-hidden
                className="pointer-events-none absolute -left-1 top-6 font-heading text-[4.75rem] leading-none text-transparent select-none [-webkit-text-stroke:1px_rgb(255_255_255_/_0.22)] sm:top-4 sm:text-[7.5rem] lg:text-[9rem]"
              >
                Team
              </p>
              <div className="relative">
                <p className="flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-white/70">
                  <span className="h-px w-8 bg-brand-red" aria-hidden />
                  Sanitattoo
                </p>
                <h1 className="font-heading mt-4 text-5xl leading-[0.9] text-white sm:text-7xl lg:text-8xl">
                  Pro Team
                </h1>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/80 sm:text-base lg:max-w-md lg:pb-2">
              Artistas patrocinados por Sanitattoo. Cada perfil reúne retrato,
              especialidades, estudio y una selección de trabajos.
            </p>
          </div>
        </div>
      </motion.header>

      {artists.map((artist, index) => (
        <motion.div key={artist.id} {...revealProps(reduceMotion)}>
          <ArtistProfile
            artist={artist}
            reverse={index % 2 === 1}
            priority={index === 0}
          />
        </motion.div>
      ))}

      <div className={pageContainer} aria-hidden>
        <div className="relative h-px bg-white/20">
          <span className="absolute inset-y-0 left-0 w-16 bg-brand-red" />
        </div>
      </div>
    </div>
  );
}
