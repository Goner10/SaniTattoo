import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import WhatsAppButton from "./WhatsAppButton.jsx";

const navLinkClass = ({ isActive }) =>
  [
    "rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red",
    isActive
      ? "bg-brand-black text-brand-white"
      : "text-brand-black hover:bg-brand-bg",
  ].join(" ");

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-brand-border bg-brand-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3.5 sm:gap-4 sm:px-6 sm:py-4">
        <NavLink
          to="/"
          className="flex min-w-0 shrink items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
          onClick={() => setOpen(false)}
        >
          <img
            src="/images/logos/logo.png"
            alt="SANITATTOO"
            className="h-10 w-auto max-h-12 object-contain sm:h-12 md:h-14"
            width={200}
            height={56}
          />
        </NavLink>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Principal"
        >
          <NavLink to="/catalogo" className={navLinkClass}>
            Catálogo
          </NavLink>
          <NavLink to="/ofertas" className={navLinkClass}>
            Ofertas
          </NavLink>
          <NavLink to="/merchandising" className={navLinkClass}>
            Merchandising
          </NavLink>
          <NavLink to="/contacto" className={navLinkClass}>
            Contacto
          </NavLink>
          <WhatsAppButton
            href="https://wa.me/34686332011"
            variant="whatsapp"
            className="ml-2"
          >
            WhatsApp
          </WhatsAppButton>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <WhatsAppButton
            href="https://wa.me/34686332011"
            variant="whatsapp"
            className="!px-3"
          >
            WhatsApp
          </WhatsAppButton>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-brand-border p-2 text-brand-black hover:bg-brand-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="size-5" aria-hidden />
            ) : (
              <Menu className="size-5" aria-hidden />
            )}
            <span className="sr-only">Menú</span>
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="border-t border-brand-border bg-brand-white px-4 py-3 md:hidden"
        >
          <div className="flex flex-col gap-1">
            <NavLink
              to="/catalogo"
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              Catálogo
            </NavLink>
            <NavLink
              to="/ofertas"
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              Ofertas
            </NavLink>
            <NavLink
              to="/merchandising"
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              Merchandising
            </NavLink>
            <NavLink
              to="/contacto"
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              Contacto
            </NavLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}
