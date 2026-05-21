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

function FooterLinkColumn({ title, ariaLabel, children }) {
  return (
    <nav className="flex flex-col gap-3" aria-label={ariaLabel}>
      <p className={columnTitleClass}>{title}</p>
      <div className="mt-1 flex flex-col gap-2.5 text-sm">{children}</div>
    </nav>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-black text-brand-white">
      <div className="mx-auto max-w-6xl min-w-0 px-4 py-12 sm:px-6 sm:py-14 2xl:max-w-[1500px] 2xl:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.75fr)_minmax(0,0.85fr)_minmax(0,1fr)] lg:items-start lg:gap-x-12 lg:gap-y-10 xl:gap-x-16 2xl:gap-x-20">
          <div className="min-w-0 sm:col-span-2 lg:col-span-1">
            <Link
              to="/"
              className="inline-block rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
            >
              <img
                src={publicAssetUrl("images/logos/logo-nuevo-negro.PNG")}
                alt="SANITATTOO"
                className="h-11 w-auto opacity-95 sm:h-32"
                width={180}
                height={48}
              />
            </Link>
            <p className="font-heading mt-5 max-w-sm text-sm leading-relaxed text-white/75 sm:text-[0.9375rem]">
              Material sanitario y consumibles para estudios de tatuaje. Calidad
              profesional y pedidos ágiles.
            </p>
          </div>

          <FooterLinkColumn title="Navegación" ariaLabel="Pie — navegación">
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

          <FooterLinkColumn title="Información" ariaLabel="Pie — información legal">
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

          <div className="flex min-w-0 flex-col gap-6 sm:col-span-2 lg:col-span-1">
            <div className="flex flex-col gap-3">
              <p className={columnTitleClass}>Contacto</p>
              <WhatsAppButton
                href={generalWhatsAppUrl()}
                variant="solid"
                className="w-full sm:w-full lg:w-fit lg:max-w-[15.5rem]"
              >
                WhatsApp
              </WhatsAppButton>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <p className="shrink-0 text-[1.05rem] font-semibold uppercase tracking-[0.28em] text-brand-muted">
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

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center sm:flex-row sm:items-start sm:text-left">
          <p className="text-xs text-white/45">© {new Date().getFullYear()} Sanitattoo</p>
          <p className="max-w-full text-xs leading-relaxed text-white/50 sm:text-right">
            <a
              href={PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block break-words text-white/70 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red rounded-sm"
            >
              Designed by Gonzalo A. Martí
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
