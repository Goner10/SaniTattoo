import { AtSign, Mail, MapPin, Phone } from "lucide-react";
import WhatsAppButton from "../components/WhatsAppButton.jsx";
import { buildWhatsAppUrl, WHATSAPP_PHONE } from "../utils/whatsapp.js";

const INSTAGRAM_URL = "https://www.instagram.com/sanitattoosupply/";
const PHONE_DISPLAY = "+34 686 332 011";
const EMAIL = "hola@sanitattoo.com";
const ADDRESS = "Calle Islas Canarias 1, Paterna, Valencia 46988";

export default function Contact() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <header className="max-w-2xl">
        <h1 className="font-display text-3xl tracking-tight text-brand-black sm:text-4xl">
          Contacto
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-brand-muted sm:text-base">
          Canal preferido: WhatsApp para pedidos y consultas rápidas. También
          puedes usar Instagram, teléfono o correo.
        </p>
      </header>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-brand-border bg-brand-white p-6 sm:p-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-muted">
            WhatsApp
          </h2>
          <p className="mt-2 text-sm text-brand-black">
             {WHATSAPP_PHONE}
          </p>
          <div className="mt-6">
            <WhatsAppButton href={buildWhatsAppUrl()}>
              Abrir WhatsApp
            </WhatsAppButton>
          </div>
        </div>

        <ul className="space-y-4 rounded-xl border border-brand-border bg-brand-white p-6 sm:p-8">
          <li className="flex gap-3">
            <AtSign
              className="mt-0.5 size-5 shrink-0 text-brand-muted"
              aria-hidden
            />
            <div>
              <p className="text-sm font-semibold text-brand-black">Instagram</p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-sm text-brand-red underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red rounded-sm"
              >
                @sanitattoosupply
              </a>
            </div>
          </li>
          <li className="flex gap-3">
            <Phone className="mt-0.5 size-5 shrink-0 text-brand-muted" aria-hidden />
            <div>
              <p className="text-sm font-semibold text-brand-black">Teléfono</p>
              <a
                href="tel:+34686332011"
                className="mt-1 inline-block text-sm text-brand-black hover:text-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red rounded-sm"
              >
                {PHONE_DISPLAY}
              </a>
            </div>
          </li>
          <li className="flex gap-3">
            <Mail className="mt-0.5 size-5 shrink-0 text-brand-muted" aria-hidden />
            <div>
              <p className="text-sm font-semibold text-brand-black">Email</p>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-1 inline-block text-sm text-brand-black hover:text-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red rounded-sm"
              >
                {EMAIL}
              </a>
            </div>
          </li>
          <li className="flex gap-3">
            <MapPin className="mt-0.5 size-5 shrink-0 text-brand-muted" aria-hidden />
            <div>
              <p className="text-sm font-semibold text-brand-black">Dirección</p>
              <p className="mt-1 text-sm text-brand-muted">{ADDRESS}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
