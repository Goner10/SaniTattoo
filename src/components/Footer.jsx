import { Link } from "react-router-dom";
import WhatsAppButton from "./WhatsAppButton.jsx";
import { generalWhatsAppUrl } from "../utils/whatsapp.js";

export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-black text-brand-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div>
          <p className="font-display text-lg tracking-wide">SANITATTOO</p>
          <p className="mt-2 max-w-sm text-sm text-white/70">
            Material sanitario, consumibles y merchandising para estudios de
            tatuaje. Calidad profesional y pedidos ágiles.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <p className="font-medium text-white">Enlaces</p>
          <Link
            to="/catalogo"
            className="text-white/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red rounded-sm"
          >
            Catálogo
          </Link>
          <Link
            to="/ofertas"
            className="text-white/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red rounded-sm"
          >
            Ofertas
          </Link>
          <Link
            to="/merchandising"
            className="text-white/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red rounded-sm"
          >
            Merchandising
          </Link>
          <Link
            to="/contacto"
            className="text-white/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red rounded-sm"
          >
            Contacto
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-white">Hablamos</p>
          <WhatsAppButton href={generalWhatsAppUrl()} variant="solid">
            Escribir por WhatsApp
          </WhatsAppButton>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Sanitattoo
      </div>
    </footer>
  );
}
