import { useCallback, useState } from "react";
import { publicAssetUrl } from "../utils/publicAsset.js";
import WorkViewer from "./WorkViewer.jsx";

const pageContainer =
  "mx-auto w-full max-w-6xl min-w-0 px-4 sm:px-6 2xl:max-w-[1500px] 2xl:px-8";

/**
 * @param {{
 *   artist: import("../data/artists.js").Artist
 *   reverse?: boolean
 *   priority?: boolean
 * }} props
 */
export default function ArtistProfile({ artist, reverse = false, priority = false }) {
  const [viewer, setViewer] = useState(null);
  const nameId = `${artist.id}-name`;

  const closeWork = useCallback(() => {
    setViewer(null);
  }, []);

  const stepWork = useCallback((delta) => {
    setViewer((current) => {
      if (!current) return current;
      const count = artist.works.length;
      if (count < 2) return current;
      return {
        ...current,
        index: (current.index + delta + count) % count,
      };
    });
  }, [artist.works.length]);

  const openWork = (index, opener) => {
    setViewer({ index, opener });
  };

  return (
    <article
      id={artist.id}
      aria-labelledby={nameId}
      className="border-t border-white/10 py-12 sm:py-16 lg:py-20"
    >
      <div className={pageContainer}>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,28rem)_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[minmax(0,32rem)_minmax(0,1fr)] xl:gap-20">
          <div className={reverse ? "lg:order-2" : undefined}>
            <div
              className={[
                "mx-auto flex w-full max-w-[28rem] items-stretch gap-3 xl:max-w-[32rem]",
                reverse ? "flex-row-reverse" : "",
              ].join(" ")}
            >
              <p
                aria-hidden
                className="font-heading shrink-0 self-center text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-white/60 [writing-mode:vertical-rl]"
              >
                Pro Team
              </p>
              <div className="flex h-[26rem] min-w-0 flex-1 items-end justify-center border-x border-t border-x-black/15 border-t-black/15 border-b-[3px] border-b-brand-red bg-[#b7b0a4] sm:h-[32rem] xl:h-[36rem]">
                <img
                  src={publicAssetUrl(artist.portrait)}
                  alt={artist.portraitAlt}
                  width={artist.portraitWidth}
                  height={artist.portraitHeight}
                  loading={priority ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={priority ? "high" : "auto"}
                  draggable={false}
                  className="max-h-full max-w-full object-contain object-bottom"
                />
              </div>
            </div>
          </div>

          <div className={reverse ? "lg:order-1" : undefined}>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-white/65">
              Pro Team
            </p>
            <p className="mt-2 font-heading text-6xl leading-none text-white sm:text-7xl">
              {artist.proTeamId}
            </p>
            <span className="mt-4 block h-px w-16 bg-brand-red" aria-hidden />
            <h2
              id={nameId}
              className="font-heading mt-5 text-4xl leading-[0.95] text-white sm:text-5xl"
            >
              {artist.name}
            </h2>

            <dl className="mt-8 max-w-xl space-y-5">
              <div>
                <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/65">
                  Especialidades
                </dt>
                <dd className="mt-1.5 text-base text-white sm:text-lg">
                  {artist.specialties.join(" · ")}
                </dd>
              </div>
              <div>
                <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/65">
                  Estudio
                </dt>
                <dd className="mt-1.5 text-base text-white sm:text-lg">
                  {artist.studio}
                </dd>
              </div>
            </dl>

            <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
              {artist.description}
            </p>

            <a
              href={artist.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-md border border-white/25 px-4 py-3 text-sm text-white transition-colors hover:border-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red motion-reduce:transition-none"
            >
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/70">
                Instagram
              </span>
              <span className="font-medium">{artist.instagram}</span>
              <span className="sr-only"> (se abre en una pestaña nueva)</span>
            </a>
          </div>
        </div>

        {artist.works.length ? (
          <div className="mt-12 lg:mt-16">
            <div className="flex items-baseline gap-4">
              <p className="font-heading text-sm tracking-[0.14em] text-white">
                {artist.proTeamId}
              </p>
              <h3 className="text-lg text-white sm:text-xl">
                Trabajos de {artist.name}
              </h3>
            </div>
            <ul className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-6">
              {artist.works.map((work, index) => (
                <li key={work.src}>
                  <button
                    type="button"
                    onClick={(event) => openWork(index, event.currentTarget)}
                    className="group block w-full scroll-mt-28 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
                  >
                    <span className="block border border-white/15 transition-colors group-hover:border-white/40 motion-reduce:transition-none">
                      <img
                        src={publicAssetUrl(work.src)}
                        alt={work.alt}
                        width={work.width}
                        height={work.height}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className="h-auto w-full"
                      />
                    </span>
                    <span className="mt-3 flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-white/75">
                      <span className="h-px w-6 bg-brand-red" aria-hidden />
                      Ver completa
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      {viewer ? (
        <WorkViewer
          artistName={artist.name}
          works={artist.works}
          index={viewer.index}
          opener={viewer.opener}
          onClose={closeWork}
          onStep={stepWork}
        />
      ) : null}
    </article>
  );
}
