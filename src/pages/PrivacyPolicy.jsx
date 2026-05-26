import { PHONE_TEL_HREF, WHATSAPP_PHONE_DISPLAY } from "../utils/whatsapp.js";

const legalLinkClass =
  "font-medium text-brand-red underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red";

const sectionTitleClass =
  "font-heading text-lg font-bold tracking-tight text-brand-black sm:text-xl";

const placeholderClass = "text-brand-black/80";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-bg via-brand-bg to-brand-white">
      <div className="mx-auto max-w-6xl min-w-0 px-4 py-12 sm:px-6 sm:py-14 2xl:max-w-[1500px] 2xl:px-8">
        <header className="max-w-3xl">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.22em] text-brand-red">
            Legal
          </p>
          <h1 className="font-heading mt-3 text-3xl font-bold tracking-tight text-brand-black sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
            Política de privacidad
          </h1>
          <span
            className="mt-4 block h-1 w-14 rounded-full bg-brand-red"
            aria-hidden
          />
        </header>

        <article className="mt-10 max-w-3xl space-y-10 text-sm font-normal leading-relaxed text-brand-muted sm:text-base">
          <section className="space-y-4">
            <h2 className={sectionTitleClass}>1. Responsable del tratamiento</h2>
            <p>
              En cumplimiento de la normativa vigente en materia de protección de datos personales,
              se informa al usuario de que los datos personales que pueda facilitar a través de los
              canales de contacto disponibles serán tratados por:
            </p>
            <address className="not-italic space-y-2">
              <p>
                <strong className="text-brand-black">Responsable:</strong> Exclusivas Pascual y
                Furió SA
              </p>
              <p>
                <strong className="text-brand-black">Nombre comercial:</strong> SanitattooSupply
              </p>
              <p>
                <strong className="text-brand-black">CIF:</strong> A46097770
              </p>
              <p>
                <strong className="text-brand-black">Domicilio:</strong> Calle Islas Canarias 1,
                Paterna, Valencia 46988
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
            <h2 className={sectionTitleClass}>2. Datos personales tratados</h2>
            <p>
              SanitattooSupply no dispone actualmente de formularios de contacto, registro de usuario,
              área privada, carrito de compra, checkout ni pasarela de pago en este sitio web.
            </p>
            <p>
              No obstante, cuando el usuario contacta voluntariamente a través de WhatsApp, teléfono,
              email o Instagram, podrán tratarse los datos personales que el propio usuario facilite
              durante la comunicación.
            </p>
            <p>Estos datos pueden incluir, entre otros:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Nombre y apellidos.</li>
              <li>Teléfono.</li>
              <li>Dirección de email.</li>
              <li>Dirección de entrega o recogida, si procede.</li>
              <li>Datos necesarios para gestionar consultas, pedidos o solicitudes comerciales.</li>
              <li>
                Cualquier otra información que el usuario facilite voluntariamente durante la
                comunicación.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className={sectionTitleClass}>3. Finalidades del tratamiento</h2>
            <p>
              Los datos personales facilitados por el usuario podrán ser tratados con las siguientes
              finalidades:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Atender consultas o solicitudes de información.</li>
              <li>Gestionar pedidos solicitados por el usuario.</li>
              <li>Confirmar disponibilidad de productos.</li>
              <li>Coordinar pagos, recogidas, entregas o envíos.</li>
              <li>Resolver incidencias relacionadas con pedidos, cambios o devoluciones.</li>
              <li>
                Mantener comunicaciones comerciales directamente relacionadas con la solicitud
                realizada por el usuario.
              </li>
              <li>
                Cumplir obligaciones legales, fiscales o administrativas cuando resulten aplicables.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className={sectionTitleClass}>4. Base jurídica del tratamiento</h2>
            <p>La base jurídica para el tratamiento de los datos personales será, según el caso:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                El consentimiento del usuario, cuando contacta voluntariamente con SanitattooSupply
                a través de los canales disponibles.
              </li>
              <li>
                La aplicación de medidas precontractuales o contractuales, cuando el tratamiento
                sea necesario para gestionar una solicitud, pedido, presupuesto, entrega o comunicación
                comercial.
              </li>
              <li>
                El cumplimiento de obligaciones legales, cuando sea necesario conservar determinada
                información por motivos fiscales, contables o administrativos.
              </li>
              <li>
                El interés legítimo de SanitattooSupply para atender comunicaciones, resolver
                incidencias y mantener la relación comercial iniciada por el usuario.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className={sectionTitleClass}>5. Conservación de los datos</h2>
            <p>
              Los datos personales se conservarán durante el tiempo necesario para atender la
              solicitud del usuario, gestionar el pedido o mantener la relación comercial
              correspondiente.
            </p>
            <p>
              Cuando existan obligaciones legales, fiscales, contables o administrativas, los datos
              podrán conservarse durante los plazos exigidos por la normativa aplicable.
            </p>
            <p>
              Una vez finalizados dichos plazos, los datos serán eliminados o bloqueados cuando
              corresponda.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className={sectionTitleClass}>6. Comunicación de datos a terceros</h2>
            <p>
              SanitattooSupply no venderá ni cederá los datos personales del usuario a terceros con
              fines comerciales.
            </p>
            <p>
              No obstante, los datos podrán comunicarse a terceros cuando sea necesario para gestionar
              correctamente una solicitud o pedido, por ejemplo:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Empresas de transporte o reparto, cuando sea necesario realizar una entrega.
              </li>
              <li>
                Entidades bancarias o proveedores de pago, cuando el usuario realice un pago mediante
                transferencia, Bizum u otro método acordado.
              </li>
              <li>
                Asesorías, gestorías o administraciones públicas, cuando exista obligación legal,
                fiscal o administrativa.
              </li>
              <li>
                Proveedores tecnológicos necesarios para la comunicación o funcionamiento de los
                servicios utilizados.
              </li>
            </ul>
            <p>
              La empresa de transporte utilizada habitualmente es{" "}
              <strong className="text-brand-black">Tipsa</strong>, sin perjuicio de que SanitattooSupply
              pueda utilizar otros medios de transporte o reparto cuando resulte necesario.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className={sectionTitleClass}>7. Servicios externos</h2>
            <p>
              La web puede incluir enlaces o funcionalidades de terceros, como WhatsApp, Instagram o
              Google Maps.
            </p>
            <p>
              Al utilizar dichos servicios, el usuario puede quedar sujeto a las condiciones,
              políticas de privacidad y cookies propias de cada plataforma.
            </p>
            <p>
              SanitattooSupply no controla las políticas ni el tratamiento de datos realizado
              directamente por dichas plataformas externas.
            </p>
            <p>
              En particular, la página de contacto puede mostrar un mapa embebido de Google Maps para
              facilitar la ubicación de la empresa.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className={sectionTitleClass}>8. Derechos del usuario</h2>
            <p>
              El usuario puede ejercer sus derechos de acceso, rectificación, supresión, oposición,
              limitación del tratamiento y portabilidad de sus datos, cuando resulten aplicables.
            </p>
            <p>
              Para ejercer estos derechos, el usuario puede contactar con SanitattooSupply a través del
              siguiente email:
            </p>
            <p>
              <a href="mailto:Sanitattoo22@gmail.com" className={legalLinkClass}>
                Sanitattoo22@gmail.com
              </a>
            </p>
            <p>
              La solicitud deberá indicar claramente el derecho que se desea ejercer y permitir la
              identificación del solicitante.
            </p>
            <p>
              Asimismo, el usuario tiene derecho a presentar una reclamación ante la autoridad de
              control competente si considera que el tratamiento de sus datos personales no se ajusta a
              la normativa aplicable.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className={sectionTitleClass}>9. Seguridad de los datos</h2>
            <p>
              SanitattooSupply adoptará las medidas técnicas y organizativas razonables para proteger
              los datos personales tratados y evitar su pérdida, uso indebido, acceso no autorizado,
              alteración o divulgación.
            </p>
            <p>
              No obstante, el usuario debe tener en cuenta que las comunicaciones realizadas a través
              de plataformas externas, como WhatsApp, Instagram o servicios de email, se rigen también
              por las condiciones de seguridad y privacidad de dichos proveedores.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className={sectionTitleClass}>10. Menores de edad</h2>
            <p>
              La web y los servicios de SanitattooSupply están dirigidos principalmente a profesionales
              y usuarios mayores de edad interesados en material profesional para tattoo &amp; piercing.
            </p>
            <p>
              SanitattooSupply no solicita de forma intencionada datos personales de menores de edad.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className={sectionTitleClass}>11. Cambios en la política de privacidad</h2>
            <p>
              SanitattooSupply podrá modificar esta política de privacidad para adaptarla a cambios
              legales, técnicos, comerciales o funcionales.
            </p>
            <p>La versión publicada en esta página será la vigente en cada momento.</p>
          </section>

          <section className="space-y-4">
            <h2 className={sectionTitleClass}>12. Contacto</h2>
            <p>
              Para cualquier consulta relacionada con esta política de privacidad o con el tratamiento
              de datos personales, el usuario puede contactar con:
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
