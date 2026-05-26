import { AtSign, Mail, MapPin, Phone } from "lucide-react";
import WhatsAppButton from "../components/WhatsAppButton.jsx";
import {
  buildWhatsAppUrl,
  PHONE_TEL_HREF,
  WHATSAPP_PHONE,
} from "../utils/whatsapp.js";

const INSTAGRAM_URL = "https://www.instagram.com/sanitattoosupply/";
const EMAIL = "Sanitattoo22@gmail.com";
const ADDRESS = "Calle Islas Canarias 1, Paterna, Valencia 46988";

const MAPS_EMBED_URL =
  "https://www.google.com/maps?q=Calle%20Islas%20Canarias%201%2C%20Paterna%2C%20Valencia%2046988&output=embed";

const cardBase =
  "rounded-2xl border border-brand-border bg-brand-white shadow-[0_8px_32px_rgba(5,5,5,0.05)]";

const cardClass = `${cardBase} p-6 sm:p-8`;

const cardClassCompact = `${cardBase} p-5 sm:p-6`;

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-bg via-brand-bg to-brand-white">
      <div className="mx-auto max-w-6xl min-w-0 px-4 py-12 sm:px-6 sm:py-14 2xl:max-w-[1500px] 2xl:px-8">
        <header className="max-w-3xl">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.22em] text-brand-red">
            Estudio
          </p>
          <h1 className="font-heading mt-3 text-3xl font-bold tracking-tight text-brand-black sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
            ¿Hablamos?
          </h1>
          <span
            className="mt-4 block h-1 w-14 rounded-full bg-brand-red"
            aria-hidden
          />
          <p className="mt-4 text-sm font-normal leading-relaxed text-brand-muted sm:text-base">
          WhatsApp para pedidos rápidos. El resto de canales, para lo que necesites.
          </p>
        </header>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-8">
          <div className={`${cardClassCompact} self-start`}>
            <p className="font-heading text-xs font-bold uppercase tracking-[0.18em] text-brand-red">
              WhatsApp
            </p>
            <p className="mt-2 font-heading text-lg font-bold text-brand-black">
              {WHATSAPP_PHONE}
            </p>
            <div className="mt-5">
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
                  href={PHONE_TEL_HREF}
                  className="mt-1 inline-block text-sm font-medium text-brand-black hover:text-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
                >
                  {WHATSAPP_PHONE}
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
           
          </ul>
        </div>

        <section
          className={`mt-12 ${cardClass}`}
          aria-labelledby="contact-about-heading"
        >
          <div className="grid min-w-0 gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-10">
            <div className="min-w-0">
              <h2
                id="contact-about-heading"
                className="font-heading text-xl font-bold tracking-tight text-brand-black sm:text-2xl"
              >
                Quiénes somos
              </h2>
              <span
                className="mt-3 block h-1 w-12 rounded-full bg-brand-red"
                aria-hidden
              />
              <p className="mt-5 text-sm font-normal leading-relaxed text-brand-muted sm:text-base">
                SanitattooSupply es un distribuidor especializado en material
                profesional para tattoo y piercing con base en Valencia.
              </p>
              <p className="mt-4 text-sm font-normal leading-relaxed text-brand-muted sm:text-base">
                Trabajamos con marcas reconocidas del sector, ofreciendo calidad,
                confianza y una imagen inspirada en la cultura tattoo.
              </p>
              <p className="mt-6 flex items-start gap-2 text-sm text-brand-muted">
                <MapPin
                  className="mt-0.5 size-4 shrink-0 text-brand-red"
                  aria-hidden
                />
                <span>{ADDRESS}</span>
              </p>
            </div>

            <div className="flex min-w-0 flex-col lg:min-h-[18rem]">
              <p className="font-heading mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-red lg:sr-only">
                Ubicación
              </p>
              <div className="overflow-hidden rounded-xl border border-brand-border shadow-[0_4px_20px_rgba(5,5,5,0.04)] lg:flex-1">
                <iframe
                  title="Ubicación de SanitattooSupply en Paterna, Valencia"
                  src={MAPS_EMBED_URL}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-56 min-h-56 w-full border-0 sm:h-64 lg:h-full lg:min-h-72"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
