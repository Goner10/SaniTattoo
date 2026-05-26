import { PHONE_TEL_HREF, WHATSAPP_PHONE_DISPLAY } from "../utils/whatsapp.js";

const BROWSER_COOKIE_LINKS = [
  {
    label: "Google Chrome",
    href: "https://support.google.com/chrome/answer/95647",
  },
  {
    label: "Mozilla Firefox",
    href: "https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias",
  },
  {
    label: "Safari",
    href: "https://support.apple.com/es-es/guide/safari/sfri11471/mac",
  },
  {
    label: "Microsoft Edge",
    href: "https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09",
  },
];

const legalLinkClass =
  "font-medium text-brand-red underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red";

const sectionTitleClass =
  "font-heading text-lg font-bold tracking-tight text-brand-black sm:text-xl";

export default function CookiesPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-bg via-brand-bg to-brand-white">
      <div className="mx-auto max-w-6xl min-w-0 px-4 py-12 sm:px-6 sm:py-14 2xl:max-w-[1500px] 2xl:px-8">
        <header className="max-w-3xl">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.22em] text-brand-red">
            Legal
          </p>
          <h1 className="font-heading mt-3 text-3xl font-bold tracking-tight text-brand-black sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
            Política de cookies
          </h1>
          <span
            className="mt-4 block h-1 w-14 rounded-full bg-brand-red"
            aria-hidden
          />
        </header>

        <article className="mt-10 max-w-3xl space-y-10 text-sm font-normal leading-relaxed text-brand-muted sm:text-base">
          <section className="space-y-4">
            <h2 className={sectionTitleClass}>1. Uso de cookies</h2>
            <p>
              El sitio web de <strong className="text-brand-black">SanitattooSupply</strong>{" "}
              no utiliza actualmente cookies propias con fines analíticos, publicitarios o de
              seguimiento.
            </p>
            <p>
              La web funciona como un catálogo informativo de material profesional para tattoo
              &amp; piercing. No dispone de carrito, checkout, pasarela de pago, área privada de
              usuario ni formularios de contacto.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className={sectionTitleClass}>2. Servicios de terceros</h2>
            <p>
              Este sitio incluye funcionalidades y enlaces a servicios externos que pueden utilizar
              cookies o tecnologías similares conforme a sus propias políticas.
            </p>
            <p>
              En concreto, la página de contacto incorpora un mapa de{" "}
              <strong className="text-brand-black">Google Maps</strong> mediante contenido
              embebido. Al cargar dicho mapa, Google puede tratar información técnica del
              dispositivo, dirección IP, navegador, ubicación aproximada y otros datos relacionados
              con la interacción del usuario con el servicio.
            </p>
            <p>Además, la web puede incluir enlaces externos a:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>WhatsApp, para consultas y gestión de pedidos.</li>
              <li>Instagram, para consultar el perfil social de la marca.</li>
              <li>Google Maps, para consultar la ubicación de la empresa.</li>
            </ul>
            <p>
              SanitattooSupply no controla las cookies ni tecnologías utilizadas por dichos
              terceros.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className={sectionTitleClass}>3. Gestión de cookies</h2>
            <p>
              El usuario puede configurar, bloquear o eliminar las cookies desde las opciones de su
              navegador.
            </p>
            <p>
              A continuación se indican enlaces orientativos a la configuración de cookies en los
              navegadores más habituales:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              {BROWSER_COOKIE_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={legalLinkClass}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className={sectionTitleClass}>4. Cambios en la política de cookies</h2>
            <p>
              SanitattooSupply podrá actualizar esta política de cookies si en el futuro incorpora
              nuevas funcionalidades, herramientas de análisis, contenidos embebidos, formularios,
              sistemas de medición o servicios de terceros que impliquen el uso de cookies.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className={sectionTitleClass}>5. Información de contacto</h2>
            <p>
              Para cualquier duda relacionada con esta política de cookies, puedes contactar con:
            </p>
            <address className="not-italic space-y-2 text-brand-muted">
              <p>
                <strong className="text-brand-black">Titular:</strong>{" "}
                <span className="text-brand-black/80">Exclusivas Pascual y Furió SA</span>
              </p>
              <p>
                <strong className="text-brand-black">Email:</strong>{" "}
                <a href="mailto:Sanitattoo22@gmail.com" className={legalLinkClass}>
                  Sanitattoo22@gmail.com
                </a>
              </p>
              <p>
                <strong className="text-brand-black">Teléfono:</strong>{" "}
                <a href={PHONE_TEL_HREF} className={legalLinkClass}>
                  {WHATSAPP_PHONE_DISPLAY}
                </a>
              </p>
              <p>
                <strong className="text-brand-black">Dirección:</strong> Calle Islas Canarias 1,
                Paterna, Valencia 46988
              </p>
            </address>
            <p className="pt-2 text-sm text-brand-muted">
              Última actualización:{" "}
              <span className="text-brand-black/80">[25-05-2026]</span>
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
