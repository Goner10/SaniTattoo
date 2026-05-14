import { AtSign, Mail, MapPin, Phone } from "lucide-react";
import WhatsAppButton from "../components/WhatsAppButton.jsx";
import { buildWhatsAppUrl, WHATSAPP_PHONE } from "../utils/whatsapp.js";

const INSTAGRAM_URL = "https://www.instagram.com/sanitattoosupply/";
const PHONE_DISPLAY = "+34 686 332 011";
const EMAIL = "hola@sanitattoo.com";
const ADDRESS = "Calle Islas Canarias 1, Paterna, Valencia 46988";

const cardClass =
  "rounded-2xl border border-brand-border bg-brand-white p-6 shadow-[0_8px_32px_rgba(5,5,5,0.05)] sm:p-8";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-bg via-brand-bg to-brand-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <header className="max-w-3xl">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.22em] text-brand-red">
            Estudio
          </p>
          <h1 className="font-heading mt-3 text-3xl font-semibold tracking-tight text-brand-black sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
            Contacto
          </h1>
          <span
            className="mt-4 block h-1 w-14 rounded-full bg-brand-red"
            aria-hidden
          />
          <p className="mt-4 text-sm leading-relaxed text-brand-muted sm:text-base">
            Canal preferido: WhatsApp para pedidos y consultas rápidas. También
            puedes usar Instagram, teléfono o correo.
          </p>
        </header>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <div className={cardClass}>
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
              WhatsApp
            </p>
            <p className="mt-3 font-heading text-lg font-semibold text-brand-black">
              {WHATSAPP_PHONE}
            </p>
            <div className="mt-8">
              <WhatsAppButton href={buildWhatsAppUrl()} variant="whatsapp">
                Abrir WhatsApp
              </WhatsAppButton>
            </div>
          </div>

          <ul className={`${cardClass} space-y-6`}>
            <li className="flex gap-4 border-b border-brand-border/70 pb-6 last:border-0 last:pb-0">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand-border bg-brand-bg">
                <AtSign className="size-5 text-brand-red" aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="font-heading text-sm font-semibold text-brand-black">
                  Instagram
                </p>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm font-medium text-brand-red underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
                >
                  @sanitattoosupply
                </a>
              </div>
            </li>
            <li className="flex gap-4 border-b border-brand-border/70 pb-6 last:border-0 last:pb-0">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand-border bg-brand-bg">
                <Phone className="size-5 text-brand-red" aria-hidden />
              </div>
              <div>
                <p className="font-heading text-sm font-semibold text-brand-black">
                  Teléfono
                </p>
                <a
                  href="tel:+34686332011"
                  className="mt-1 inline-block text-sm font-medium text-brand-black hover:text-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
                >
                  {PHONE_DISPLAY}
                </a>
              </div>
            </li>
            <li className="flex gap-4 border-b border-brand-border/70 pb-6 last:border-0 last:pb-0">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand-border bg-brand-bg">
                <Mail className="size-5 text-brand-red" aria-hidden />
              </div>
              <div>
                <p className="font-heading text-sm font-semibold text-brand-black">
                  Email
                </p>
                <a
                  href={`mailto:${EMAIL}`}
                  className="mt-1 inline-block text-sm font-medium text-brand-black hover:text-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
                >
                  {EMAIL}
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand-border bg-brand-bg">
                <MapPin className="size-5 text-brand-red" aria-hidden />
              </div>
              <div>
                <p className="font-heading text-sm font-semibold text-brand-black">
                  Dirección
                </p>
                <p className="mt-1 text-sm leading-relaxed text-brand-muted">
                  {ADDRESS}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
