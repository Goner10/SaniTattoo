import { Link } from "react-router-dom";
import { artists } from "../data/artists.js";
import { publicAssetUrl } from "../utils/publicAsset.js";

const previewCtaClass =
  "mt-8 inline-flex items-center justify-center rounded-md border-2 border-brand-red bg-brand-red px-5 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-white hover:text-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none";

export default function ProTeamPreview() {
  return (
    <section
      aria-labelledby="home-proteam-title"
      className="overflow-x-hidden bg-[#101010] text-white"
    >
      <div className="mx-auto grid max-w-6xl min-w-0 items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(16rem,22rem)_minmax(0,1fr)] lg:gap-12 lg:py-20 xl:gap-16">
        <div className="min-w-0 max-w-xl">
          <p className="flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-white/70">
            <span className="h-px w-8 bg-brand-red" aria-hidden />
            Sanitattoo Supply
          </p>
          <h2
            id="home-proteam-title"
            className="font-heading mt-4 text-5xl leading-[0.9] text-white sm:text-6xl lg:text-7xl"
          >
            Pro Team
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80 sm:text-base">
            Conoce a los artistas que forman parte dee equipo SanitattooSupply.
          </p>
          <Link to="/pro-team" className={previewCtaClass}>
            Conoce al ProTeam
          </Link>
        </div>

        {artists.length ? (
          <ul className="grid min-w-0 grid-cols-2 gap-3 sm:gap-6">
            {artists.map((artist) => (
              <li key={artist.id} className="min-w-0">
                <Link
                  to={`/pro-team#${artist.id}`}
                  className="group block min-w-0 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-[#101010]">
                    <img
                      src={publicAssetUrl(artist.portrait)}
                      alt={artist.portraitAlt}
                      width={artist.portraitWidth}
                      height={artist.portraitHeight}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="h-full w-full object-cover object-top transition-transform duration-300 motion-safe:group-hover:scale-[1.03] motion-reduce:transition-none"
                    />
                  </div>
                  <p className="font-heading mt-3 text-sm leading-tight text-white sm:text-base lg:text-lg">
                    {artist.name}
                  </p>
                  {artist.specialties.length ? (
                    <p className="mt-1 text-[0.8125rem] leading-snug text-white/70 sm:text-sm">
                      {artist.specialties.join(" · ")}
                    </p>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
