import { Link } from "react-router-dom";
import WhatsAppButton from "./WhatsAppButton.jsx";
import { publicAssetUrl } from "../utils/publicAsset.js";
import { generalWhatsAppUrl } from "../utils/whatsapp.js";

const PORTFOLIO_URL = "https://goner10.github.io/Portfolio-personal/";
const INSTAGRAM_URL = "https://www.instagram.com/sanitattoosupply/";

const footerLinkClass =
  "text-white/85 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red rounded-sm";

const columnTitleClass =
  "font-heading text-xs font-semibold uppercase tracking-[0.2em] text-white/50";

/** Tablet vertical: coloca el bloque en la rejilla 2×2 (700px–lg). */
const tabletGridPlacement = {
  brand:
    "min-[700px]:max-lg:col-start-1 min-[700px]:max-lg:row-start-1",
  contact:
    "min-[700px]:max-lg:col-start-2 min-[700px]:max-lg:row-start-1 min-[700px]:max-lg:justify-self-end",
  nav:
    "min-[700px]:max-lg:col-start-1 min-[700px]:max-lg:row-start-2",
  info:
    "min-[700px]:max-lg:col-start-2 min-[700px]:max-lg:row-start-2",
};

function FooterLinkColumn({ title, ariaLabel, children, className = "" }) {
  return (
    <nav
      className={["flex min-w-0 flex-col gap-3", className].filter(Boolean).join(" ")}
      aria-label={ariaLabel}
    >
      <p className={columnTitleClass}>{title}</p>
      <div className="mt-1 flex flex-col gap-2.5 text-sm">{children}</div>
    </nav>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-black text-brand-white">
      <div className="mx-auto max-w-6xl min-w-0 px-4 py-12 sm:px-6 sm:py-14 2xl:max-w-[1500px] 2xl:px-8">
        <div
          className={[
            "grid grid-cols-1 gap-10",
            "min-[700px]:max-lg:grid-cols-2 min-[700px]:max-lg:gap-x-10 min-[700px]:max-lg:gap-y-8",
            "lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.75fr)_minmax(0,0.85fr)_minmax(0,1fr)] lg:items-start lg:gap-x-12 lg:gap-y-10 xl:gap-x-16 2xl:gap-x-20",
          ].join(" ")}
        >
          <div
            className={[
              "min-w-0",
              tabletGridPlacement.brand,
              "lg:col-auto lg:row-auto",
            ].join(" ")}
          >
            <Link
              to="/"
              className="inline-block rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
            >
              <img
                src={publicAssetUrl("images/logos/logo-nuevo-negro.PNG")}
                alt="SANITATTOO"
                className="h-20 w-auto opacity-95 min-[700px]:max-lg:h-24 sm:h-32"
                width={180}
                height={48}
              />
            </Link>
            <p className="font-heading mt-5 max-w-sm text-sm leading-relaxed text-white/75 sm:text-[0.9375rem]">
              Material sanitario, consumibles premium y aftercare profesional{" "}
              <br />
              para tattoo & piercing.
            </p>
          </div>

          <FooterLinkColumn
            title="Navegación"
            ariaLabel="Pie — navegación"
            className={[tabletGridPlacement.nav, "lg:col-auto lg:row-auto"].join(
              " ",
            )}
          >
            <Link to="/catalogo" className={footerLinkClass}>
              Catálogo
            </Link>
            <Link to="/ofertas" className={footerLinkClass}>
              Ofertas
            </Link>
            <Link to="/merchandising" className={footerLinkClass}>
              Camisetas
            </Link>
            <Link to="/contacto" className={footerLinkClass}>
              Contacto
            </Link>
          </FooterLinkColumn>

          <FooterLinkColumn
            title="Información"
            ariaLabel="Pie — información legal"
            className={[tabletGridPlacement.info, "lg:col-auto lg:row-auto"].join(
              " ",
            )}
          >
            <Link to="/aviso-legal" className={footerLinkClass}>
              Aviso legal
            </Link>
            <Link to="/politica-privacidad" className={footerLinkClass}>
              Política de privacidad
            </Link>
            <Link to="/politica-cookies" className={footerLinkClass}>
              Política de cookies
            </Link>
            <Link to="/terminos-condiciones" className={footerLinkClass}>
              Términos y condiciones
            </Link>
          </FooterLinkColumn>

          <div
            className={[
              "flex min-w-0 flex-col gap-6",
              tabletGridPlacement.contact,
              "min-[700px]:max-lg:items-end min-[700px]:max-lg:text-right",
              "lg:col-auto lg:row-auto lg:items-start lg:text-left",
            ].join(" ")}
          >
            <div className="flex w-full flex-col gap-3 min-[700px]:max-lg:items-end lg:w-auto">
              <p className={columnTitleClass}>Contacto</p>
              <WhatsAppButton
                href={generalWhatsAppUrl()}
                variant="solid"
                className="w-full max-w-xs min-[700px]:max-lg:w-fit min-[700px]:max-lg:px-8 lg:w-fit lg:max-w-[15.5rem]"
              >
                WhatsApp
              </WhatsAppButton>
            </div>

            <div className="flex items-center gap-3 min-[700px]:max-lg:justify-end">
              <p className="shrink-0 text-sm font-semibold uppercase tracking-[0.28em] text-brand-muted min-[700px]:max-lg:text-[0.95rem] lg:text-[1.05rem]">
                SÍGUENOS
              </p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram de Sanitattoo"
                className="inline-flex shrink-0 items-center rounded-sm ring-2 ring-transparent ring-offset-2 ring-offset-brand-black transition-[box-shadow,ring-color] hover:ring-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
              >
                <img
                  src={publicAssetUrl("icons/instagram.svg")}
                  alt=""
                  width={24}
                  height={24}
                  className="size-6 shrink-0"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </div>
          </div>
        </div>

        <div
          className={[
            "mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center",
            "min-[700px]:max-lg:flex-row min-[700px]:max-lg:items-center min-[700px]:max-lg:text-left",
            "sm:flex-row sm:items-start sm:text-left",
          ].join(" ")}
        >
          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} Sanitattoo
          </p>
          <p className="max-w-full text-xs leading-relaxed text-white/50 sm:text-right">
            <a
              href={PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block break-words rounded-sm text-white/70 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
            >
              Designed by Gonzalo A. Martí
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
