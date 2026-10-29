import { Menu, ShoppingBag, Truck, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { scrollToTop } from "./ScrollToTop.jsx";
import WhatsAppButton from "./WhatsAppButton.jsx";
import { useCampaignState } from "../context/campaignState.js";
import { useOrder } from "../context/orderState.js";
import { buildWhatsAppUrl } from "../utils/whatsapp.js";
import { publicAssetUrl } from "../utils/publicAsset.js";

const SHIPPING_BAR_TEXT = "Todo para tu estudio. Envío gratis desde 90€";
const SHIPPING_CONDITION_TEXT = "Envío gratis desde 90€";

const SCROLL_TOP_THRESHOLD_PX = 10;

const headerContainerClass =
  "mx-auto w-full max-w-6xl px-4 min-[700px]:px-4 sm:px-6 2xl:max-w-[1500px] 2xl:px-8";

const navLinkClass = ({ isActive }) =>
  [
    "header-font rounded-md px-3 py-2 text-[15px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red max-[900px]:px-2 max-[900px]:py-1.5 max-[900px]:text-[0.8125rem]",
    isActive
      ? "bg-brand-black text-brand-white"
      : "text-brand-black hover:bg-brand-bg",
  ].join(" ");

const headerWhatsAppClass =
  "header-font max-[899px]:!min-h-11 max-[899px]:!min-w-11 max-[899px]:!px-2.5 min-[900px]:text-[15px]";

function OrderBagButton() {
  const { totalUnits, isOpen, openPanel } = useOrder();
  const label =
    totalUnits > 0
      ? `Mi pedido, ${totalUnits} ${totalUnits === 1 ? "unidad" : "unidades"}`
      : "Mi pedido";

  return (
    <button
      id="mi-pedido-button"
      type="button"
      className="relative inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-brand-border text-brand-black hover:bg-brand-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
      aria-label={label}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-controls="mi-pedido-panel"
      onClick={openPanel}
    >
      <ShoppingBag className="size-5" aria-hidden />
      {totalUnits > 0 ? (
        <span
          aria-hidden
          className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-brand-red px-1 text-[0.6875rem] font-bold leading-none text-brand-white"
        >
          {totalUnits > 99 ? "99+" : totalUnits}
        </span>
      ) : null}
    </button>
  );
}

export default function Header() {
  const { announcement } = useCampaignState();
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
            ? announcement
              ? "max-h-36 border-b border-white/10 opacity-100 sm:max-h-24"
              : "max-h-[2.125rem] border-b border-white/10 opacity-100 sm:max-h-9"
            : "pointer-events-none max-h-0 border-b border-transparent opacity-0",
        ].join(" ")}
        role="region"
        aria-label={announcement ? announcement.name : "Envío"}
        aria-hidden={!showPromoBar}
        inert={showPromoBar ? undefined : true}
      >
        {announcement ? (
          <div
            className={[
              headerContainerClass,
              "flex flex-col items-center gap-1 py-2 text-center text-[0.8125rem] font-semibold leading-snug text-white sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-3 sm:gap-y-1 sm:py-1.5 sm:text-sm",
            ].join(" ")}
          >
            <p className="max-w-full font-header text-[0.8125rem] font-bold tracking-[0.04em] sm:text-sm">
              {announcement.copy.barHeadline}
            </p>
            <p className="flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-0.5 font-sans text-[0.8125rem] font-medium sm:text-sm">
              <span>{announcement.copy.barDeadline}</span>
              <Link
                to={announcement.copy.barCtaTo}
                onClick={scrollToTop}
                className="underline decoration-white/80 underline-offset-2 hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {announcement.copy.barCtaLabel}
              </Link>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <span>{SHIPPING_CONDITION_TEXT}</span>
                <Truck className="h-4 w-4 shrink-0" strokeWidth={2.2} aria-hidden="true" />
              </span>
            </p>
          </div>
        ) : (
          <p
            className={[
              headerContainerClass,
              "flex items-center justify-center gap-1 py-1 text-center font-header text-[clamp(0.625rem,2.6vw,0.8125rem)] font-bold leading-snug tracking-[0.06em] text-white sm:py-1.5 sm:text-xs",
            ].join(" ")}
          >
            <span>{SHIPPING_BAR_TEXT}</span>
            <Truck
              className="h-4 w-4 sm:h-5 sm:w-5"
              strokeWidth={2.2}
              aria-hidden="true"
            />
          </p>
        )}
      </div>
      <div
        className={[
          headerContainerClass,
          "flex items-center justify-between gap-3 transition-[padding] duration-300 ease-in-out sm:gap-4",
          isAtTop ? "py-4 sm:py-5" : "py-3.5 sm:py-4",
        ].join(" ")}
      >
        <NavLink
          to="/"
          className="flex min-w-0 shrink-0 items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
          onClick={handleNavClick}
        >
          <img
            src={publicAssetUrl("images/logos/logo-blanco.png")}
            alt="SANITATTOO"
            className={[
              "w-auto object-contain transition-[height,max-height] duration-300 ease-in-out",
              isAtTop
                ? "h-12 max-h-14 sm:h-14 sm:max-h-16 min-[700px]:h-14 min-[700px]:max-h-[4rem] md:h-16 md:max-h-[4.5rem]"
                : "h-10 max-h-12 sm:h-12 min-[700px]:h-12 md:h-14",
            ].join(" ")}
            width={200}
            height={56}
          />
        </NavLink>

        <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
          <nav
            className="hidden min-w-0 items-center gap-1 min-[700px]:flex max-[900px]:gap-0.5"
            aria-label="Principal"
          >
            <NavLink to="/" end className={navLinkClass} onClick={scrollToTop}>
              Inicio
            </NavLink>
            <NavLink to="/catalogo" className={navLinkClass} onClick={scrollToTop}>
              Catálogo
            </NavLink>
            <NavLink to="/pro-team" className={navLinkClass} onClick={scrollToTop}>
              Pro Team
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
          </nav>
          <OrderBagButton />
          <WhatsAppButton
            href={buildWhatsAppUrl()}
            variant="whatsapp"
            className={`shrink-0 ${headerWhatsAppClass}`}
          >
            <span className="sr-only min-[900px]:hidden">WhatsApp</span>
            <span className="hidden min-[900px]:inline">WhatsApp</span>
          </WhatsAppButton>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-brand-border text-brand-black hover:bg-brand-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red min-[700px]:hidden"
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
          className={[
            "border-t border-brand-border bg-brand-white py-3 min-[700px]:hidden",
            headerContainerClass,
          ].join(" ")}
        >
          <div className="flex flex-col gap-1">
            <NavLink
              to="/"
              end
              className={navLinkClass}
              onClick={handleNavClick}
            >
              Inicio
            </NavLink>
            <NavLink
              to="/catalogo"
              className={navLinkClass}
              onClick={handleNavClick}
            >
              Catálogo
            </NavLink>
            <NavLink
              to="/pro-team"
              className={navLinkClass}
              onClick={handleNavClick}
            >
              Pro Team
            </NavLink>
            <NavLink
              to="/merchandising"
              className={navLinkClass}
              onClick={handleNavClick}
            >
              Camisetas
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
