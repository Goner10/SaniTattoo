import { Link } from "react-router-dom";
import WhatsAppButton from "./WhatsAppButton.jsx";
import { generalWhatsAppUrl } from "../utils/whatsapp.js";

const PORTFOLIO_URL = "https://goner10.github.io/Portfolio-personal/";

export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-black text-brand-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Link
              to="/"
              className="inline-block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red rounded-sm"
            >
              <img
                src="/images/logos/Logo_Nuevo.PNG"
                alt="SANITATTOO"
                className="h-11 w-auto brightness-0 invert opacity-95 sm:h-12"
                width={180}
                height={48}
              />
            </Link>
            <p className="font-heading mt-5 max-w-sm text-sm leading-relaxed text-white/75 sm:text-[0.9375rem]">
              Material sanitario y consumibles para estudios de
              tatuaje. Calidad profesional y pedidos ágiles.
            </p>
          </div>

          <nav
            className="flex flex-col gap-3 sm:col-span-1 lg:col-span-3"
            aria-label="Pie — enlaces"
          >
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Navegación
            </p>
            <div className="mt-1 flex flex-col gap-2.5 text-sm">
              <Link
                to="/catalogo"
                className="text-white/85 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red rounded-sm"
              >
                Catálogo
              </Link>
              <Link
                to="/ofertas"
                className="text-white/85 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red rounded-sm"
              >
                Ofertas
              </Link>
              <Link
                to="/merchandising"
                className="text-white/85 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red rounded-sm"
              >
                Camisetas
              </Link>
              <Link
                to="/contacto"
                className="text-white/85 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red rounded-sm"
              >
                Contacto
              </Link>
            </div>
          </nav>

          <div className="flex flex-col gap-3 sm:col-span-1 lg:col-span-4">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Contacto
            </p>
            <WhatsAppButton href={generalWhatsAppUrl()} variant="solid">
              Escribir por WhatsApp
            </WhatsAppButton>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} Sanitattoo
          </p>
          <p className="text-xs text-white/50">
            <a
              href={PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red rounded-sm"
            >
              Designed by Gonzalo A. Martí
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
