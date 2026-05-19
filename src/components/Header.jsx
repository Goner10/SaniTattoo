import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { scrollToTop } from "./ScrollToTop.jsx";
import WhatsAppButton from "./WhatsAppButton.jsx";

const SCROLL_TOP_THRESHOLD_PX = 10;

const navLinkClass = ({ isActive }) =>
  [
    "rounded-md px-3 py-2 font-sans text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red",
    isActive
      ? "bg-brand-black text-brand-white"
      : "text-brand-black hover:bg-brand-bg",
  ].join(" ");

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  const showPromoBar = isAtTop;

  useEffect(() => {
    const update = () => {
      setIsAtTop(window.scrollY <= SCROLL_TOP_THRESHOLD_PX);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const handleNavClick = () => {
    setOpen(false);
    scrollToTop();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-brand-border bg-brand-white/95 backdrop-blur">
      <div
        className={[
          "overflow-hidden bg-[#C1121F] transition-[max-height,opacity] duration-300 ease-in-out motion-reduce:transition-none",
          showPromoBar
            ? "max-h-[2.125rem] border-b border-white/10 opacity-100 sm:max-h-9"
            : "pointer-events-none max-h-0 border-b border-transparent opacity-0",
        ].join(" ")}
        aria-hidden={!showPromoBar}
      >
        <p className="mx-auto max-w-full px-3 py-1 text-center font-sans text-[clamp(0.625rem,2.6vw,0.8125rem)] font-semibold leading-snug tracking-[0.04em] text-white sm:py-1.5 sm:text-xs sm:tracking-[0.06em]">
          Envío gratis en pedidos superiores a 100€
        </p>
      </div>
      <div
        className={[
          "mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 transition-[padding] duration-300 ease-in-out sm:gap-4 sm:px-6",
          isAtTop ? "py-4 sm:py-5" : "py-3.5 sm:py-4",
        ].join(" ")}
      >
        <NavLink
          to="/"
          className="flex min-w-0 shrink items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
          onClick={handleNavClick}
        >
          <img
            src="/images/logos/logo-blanco.png"
            alt="SANITATTOO"
            className={[
              "w-auto object-contain transition-[height,max-height] duration-300 ease-in-out",
              isAtTop
                ? "h-12 max-h-14 sm:h-14 sm:max-h-16 md:h-16 md:max-h-[4.5rem]"
                : "h-10 max-h-12 sm:h-12 md:h-14",
            ].join(" ")}
            width={200}
            height={56}
          />
        </NavLink>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Principal"
        >
          <NavLink to="/catalogo" className={navLinkClass} onClick={scrollToTop}>
            Catálogo
          </NavLink>
          <NavLink to="/ofertas" className={navLinkClass} onClick={scrollToTop}>
            Ofertas
          </NavLink>
          <NavLink
            to="/merchandising"
            className={navLinkClass}
            onClick={scrollToTop}
          >
            Camisetas
          </NavLink>
          <NavLink to="/contacto" className={navLinkClass} onClick={scrollToTop}>
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
              onClick={handleNavClick}
            >
              Catálogo
            </NavLink>
            <NavLink
              to="/ofertas"
              className={navLinkClass}
              onClick={handleNavClick}
            >
              Ofertas
            </NavLink>
            <NavLink
              to="/merchandising"
              className={navLinkClass}
              onClick={handleNavClick}
            >
              Merchandising
            </NavLink>
            <NavLink
              to="/contacto"
              className={navLinkClass}
              onClick={handleNavClick}
            >
              Contacto
            </NavLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}
