import { Link } from "react-router-dom";
import { PHONE_TEL_HREF, WHATSAPP_PHONE_DISPLAY } from "../utils/whatsapp.js";

const legalLinkClass =
  "font-medium text-brand-red underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red";

const sectionTitleClass =
  "font-heading text-lg font-bold tracking-tight text-brand-black sm:text-xl";

const placeholderClass = "text-brand-black/80";

export default function LegalNotice() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-bg via-brand-bg to-brand-white">
      <div className="mx-auto max-w-6xl min-w-0 px-4 py-12 sm:px-6 sm:py-14 2xl:max-w-[1500px] 2xl:px-8">
        <header className="max-w-3xl">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.22em] text-brand-red">
            Legal
          </p>
          <h1 className="font-heading mt-3 text-3xl font-bold tracking-tight text-brand-black sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
            Aviso legal
          </h1>
          <span
            className="mt-4 block h-1 w-14 rounded-full bg-brand-red"
            aria-hidden
          />
        </header>

        <article className="mt-10 max-w-3xl space-y-10 text-sm font-normal leading-relaxed text-brand-muted sm:text-base">
          <section className="space-y-4">
            <h2 className={sectionTitleClass}>1. Datos identificativos</h2>
            <p>
              En cumplimiento de la normativa aplicable sobre servicios de la sociedad de la
              información, se informa de que el presente sitio web pertenece a:
            </p>
            <address className="not-italic space-y-2">
              <p>
                <strong className="text-brand-black">Titular:</strong> Exclusivas Pascual y
                Furió SA
              </p>
              <p>
                <strong className="text-brand-black">Nombre comercial:</strong> SanitattooSupply
              </p>
              <p>
                <strong className="text-brand-black">CIF:</strong> A46097770
              </p>
              <p>
                <strong className="text-brand-black">Domicilio fiscal:</strong> Calle Islas
                Canarias 1, Paterna, Valencia 46988
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
            </address>
          </section>

          <section className="space-y-4">
            <h2 className={sectionTitleClass}>2. Objeto del sitio web</h2>
            <p>
              El sitio web de <strong className="text-brand-black">SanitattooSupply</strong> tiene
              como finalidad presentar un catálogo informativo de material profesional para tattoo
              &amp; piercing, así como facilitar el contacto con clientes interesados en solicitar
              información o realizar pedidos.
            </p>
            <p>
              La web no dispone actualmente de carrito de compra, checkout, pasarela de pago,
              registro de usuario ni venta online directa.
            </p>
            <p>
              Los pedidos, consultas comerciales y solicitudes de información se gestionan
              directamente a través de WhatsApp, teléfono, email o Instagram.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className={sectionTitleClass}>3. Condiciones de uso</h2>
            <p>
              El acceso y uso de este sitio web atribuye la condición de usuario e implica la
              aceptación del presente aviso legal.
            </p>
            <p>
              El usuario se compromete a utilizar la web de forma correcta, lícita y respetuosa, sin
              realizar actuaciones que puedan dañar, inutilizar, sobrecargar o deteriorar el sitio
              web, sus contenidos o su funcionamiento.
            </p>
            <p>
              Queda prohibido el uso de la web con fines ilícitos, fraudulentos o que puedan
              perjudicar los derechos e intereses de SanitattooSupply o de terceros.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className={sectionTitleClass}>4. Propiedad intelectual e industrial</h2>
            <p>
              Los contenidos de este sitio web, incluyendo textos, imágenes, logotipos, diseño,
              estructura, elementos gráficos, código y demás materiales, pertenecen a SanitattooSupply
              o a sus respectivos titulares, salvo indicación contraria.
            </p>
            <p>
              No se permite la reproducción, distribución, comunicación pública, transformación o uso
              comercial de dichos contenidos sin autorización previa y expresa de su titular.
            </p>
            <p>
              Las marcas, nombres comerciales o logotipos de terceros que puedan aparecer en la web
              pertenecen a sus respectivos propietarios.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className={sectionTitleClass}>5. Responsabilidad sobre contenidos</h2>
            <p>
              SanitattooSupply trabaja para mantener la información publicada actualizada y correcta.
              No obstante, los contenidos del sitio web tienen carácter informativo y pueden estar
              sujetos a cambios, disponibilidad de producto, modificación de precios, variaciones de
              formato o actualizaciones comerciales.
            </p>
            <p>
              SanitattooSupply no garantiza la ausencia de errores puntuales en los contenidos,
              aunque adoptará las medidas razonables para corregirlos cuando tenga conocimiento de
              ellos.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className={sectionTitleClass}>6. Enlaces externos</h2>
            <p>
              Este sitio web puede incluir enlaces a servicios o plataformas externas, como
              WhatsApp, Instagram o Google Maps.
            </p>
            <p>
              SanitattooSupply no se responsabiliza del contenido, funcionamiento, políticas,
              condiciones de uso o prácticas de privacidad de dichos servicios externos, que se rigen
              por sus propias condiciones.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className={sectionTitleClass}>7. Protección de datos</h2>
            <p>
              El tratamiento de los datos personales que pueda producirse a través de los canales de
              contacto disponibles se regula en la{" "}
              <Link to="/politica-privacidad" className={legalLinkClass}>
                Política de privacidad
              </Link>{" "}
              de este sitio web.
            </p>
            <p>
              El usuario puede consultar dicha política para obtener más información sobre el
              responsable del tratamiento, finalidades, base jurídica, conservación de datos y
              derechos aplicables.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className={sectionTitleClass}>8. Legislación aplicable</h2>
            <p>El presente aviso legal se rige por la legislación española.</p>
            <p>
              Para cualquier controversia que pudiera derivarse del acceso o uso del sitio web, las
              partes se someterán a los juzgados y tribunales que correspondan conforme a la normativa
              aplicable.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className={sectionTitleClass}>9. Contacto</h2>
            <p>
              Para cualquier consulta relacionada con este aviso legal, el usuario puede contactar
              con SanitattooSupply a través de:
            </p>
            <address className="not-italic space-y-2">
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
              Última actualización: <span className={placeholderClass}>[26-05-2026]</span>
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
