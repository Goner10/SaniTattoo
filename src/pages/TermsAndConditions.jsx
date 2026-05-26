import { PHONE_TEL_HREF, WHATSAPP_PHONE_DISPLAY } from "../utils/whatsapp.js";

const legalLinkClass =
  "font-medium text-brand-red underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red";

const sectionTitleClass =
  "font-heading text-lg font-bold tracking-tight text-brand-black sm:text-xl";

const placeholderClass = "text-brand-black/80";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-bg via-brand-bg to-brand-white">
      <div className="mx-auto max-w-6xl min-w-0 px-4 py-12 sm:px-6 sm:py-14 2xl:max-w-[1500px] 2xl:px-8">
        <header className="max-w-3xl">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.22em] text-brand-red">
            Legal
          </p>
          <h1 className="font-heading mt-3 text-3xl font-bold tracking-tight text-brand-black sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
            Términos y condiciones
          </h1>
          <span
            className="mt-4 block h-1 w-14 rounded-full bg-brand-red"
            aria-hidden
          />
        </header>

        <article className="mt-10 max-w-3xl space-y-10 text-sm font-normal leading-relaxed text-brand-muted sm:text-base">
          <section className="space-y-4">
            <h2 className={sectionTitleClass}>1. Información general</h2>
            <p>
              El presente sitio web pertenece a{" "}
              <strong className="text-brand-black">SanitattooSupply</strong>, marca dedicada a la
              distribución de material profesional para tattoo &amp; piercing.
            </p>
            <address className="not-italic space-y-2">
              <p>
                <strong className="text-brand-black">Titular:</strong>{" "}
                <span className={placeholderClass}>[NOMBRE LEGAL DEL TITULAR]</span>
              </p>
              <p>
                <strong className="text-brand-black">NIF/CIF:</strong>{" "}
                <span className={placeholderClass}>[NIF/CIF]</span>
              </p>
              <p>
                <strong className="text-brand-black">Dirección:</strong> Calle Islas Canarias 1,
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
            <p>
              El sitio web funciona actualmente como un catálogo informativo de productos. No
              dispone de carrito de compra, checkout, pasarela de pago, registro de usuario ni venta
              online directa.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className={sectionTitleClass}>2. Objeto de la web</h2>
            <p>
              La finalidad de esta web es mostrar productos, marcas y referencias disponibles o
              comercializadas por SanitattooSupply, así como facilitar el contacto con clientes
              interesados en realizar pedidos o solicitar información.
            </p>
            <p>
              Los pedidos, consultas comerciales y confirmaciones de disponibilidad se gestionan
              directamente a través de WhatsApp, teléfono, email o Instagram.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className={sectionTitleClass}>3. Catálogo y disponibilidad de productos</h2>
            <p>
              Los productos mostrados en la web tienen carácter informativo y pueden estar sujetos a
              cambios de disponibilidad, precio, formato, imagen, descripción o condiciones
              comerciales.
            </p>
            <p>
              La disponibilidad final de cada producto será confirmada directamente por
              SanitattooSupply antes de cerrar el pedido.
            </p>
            <p>
              SanitattooSupply se reserva el derecho a modificar, actualizar o retirar productos del
              catálogo sin previo aviso.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className={sectionTitleClass}>4. Precios</h2>
            <p>
              Los precios mostrados o comunicados por SanitattooSupply{" "}
              <strong className="text-brand-black">no incluyen IVA</strong>, salvo que se indique
              expresamente lo contrario.
            </p>
            <p>
              El importe final del pedido, incluyendo impuestos, gastos de envío si proceden y
              cualquier otra condición aplicable, será confirmado antes de cerrar la compra.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className={sectionTitleClass}>5. Realización de pedidos</h2>
            <p>
              Actualmente, los pedidos se gestionan de forma directa mediante contacto con
              SanitattooSupply.
            </p>
            <p>Los principales canales de pedido son:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>WhatsApp</li>
              <li>Teléfono</li>
              <li>Email</li>
              <li>Instagram</li>
            </ul>
            <p>
              El pedido no se considerará confirmado hasta que SanitattooSupply haya validado la
              disponibilidad de los productos, el importe final y las condiciones de entrega o
              recogida.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className={sectionTitleClass}>6. Formas de pago</h2>
            <p>Los métodos de pago aceptados actualmente son:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Transferencia bancaria</li>
              <li>Bizum</li>
              <li>Efectivo</li>
            </ul>
            <p>
              SanitattooSupply podrá solicitar justificante de pago antes de preparar o entregar el
              pedido.
            </p>
            <p>
              Los datos concretos para realizar el pago serán facilitados directamente al cliente
              durante la gestión del pedido.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className={sectionTitleClass}>7. Recogida y entrega</h2>
            <p>
              Los pedidos podrán recogerse en la dirección indicada por SanitattooSupply:
            </p>
            <p className="font-medium text-brand-black">
              Calle Islas Canarias 1, Paterna, Valencia 46988
            </p>
            <p>
              También se ofrece reparto a domicilio según zona y condiciones acordadas con el
              cliente.
            </p>
            <p>
              En Valencia, el reparto será gratuito, salvo que se indique expresamente lo contrario.
            </p>
            <p>
              Para pedidos fuera de Valencia, el envío será gratuito a partir de{" "}
              <strong className="text-brand-black">90 €</strong>. Para pedidos inferiores a dicho
              importe, los gastos de envío serán confirmados antes de cerrar el pedido.
            </p>
            <p>
              <strong className="text-brand-black">Empresa de transporte:</strong>{" "}
              <span className={placeholderClass}>[EMPRESA DE TRANSPORTE PENDIENTE]</span>
            </p>
            <p>
              <strong className="text-brand-black">Plazo estimado de entrega:</strong>{" "}
              <span className={placeholderClass}>[PLAZO DE ENTREGA PENDIENTE]</span>
            </p>
            <p>
              Los plazos de entrega pueden variar según disponibilidad, zona de reparto, agencia de
              transporte o circunstancias ajenas a SanitattooSupply.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className={sectionTitleClass}>8. Cambios, devoluciones y productos de higiene</h2>
            <p>
              Debido a la naturaleza de algunos productos comercializados, especialmente material
              sanitario, consumibles, productos de higiene, aftercare o artículos precintados, no se
              aceptarán devoluciones de productos abiertos, usados, manipulados o desprecintados
              cuando no sean aptos para su devolución por razones de protección de la salud o
              higiene.
            </p>
            <p>Podrán aceptarse cambios o devoluciones en los siguientes casos:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Producto defectuoso.</li>
              <li>Producto dañado durante el transporte.</li>
              <li>Error en la preparación del pedido.</li>
              <li>Producto recibido distinto al solicitado.</li>
            </ul>
            <p>
              En estos casos, el cliente deberá contactar con SanitattooSupply lo antes posible a
              través de los canales disponibles, aportando información del pedido e imágenes del
              producto si fuera necesario.
            </p>
            <p>
              Las condiciones concretas de devolución, plazos y gastos asociados quedan pendientes
              de confirmación:
            </p>
            <p>
              <strong className="text-brand-black">Plazo de devolución:</strong>{" "}
              <span className={placeholderClass}>[PLAZO DE DEVOLUCIÓN PENDIENTE]</span>
            </p>
            <p>
              <strong className="text-brand-black">Condiciones específicas:</strong>{" "}
              <span className={placeholderClass}>[CONDICIONES DE DEVOLUCIÓN PENDIENTES]</span>
            </p>
          </section>

          <section className="space-y-4">
            <h2 className={sectionTitleClass}>9. Uso profesional de los productos</h2>
            <p>
              Los productos ofrecidos por SanitattooSupply están orientados principalmente a
              profesionales del sector tattoo &amp; piercing.
            </p>
            <p>
              El cliente es responsable de utilizar cada producto conforme a sus instrucciones,
              finalidad, normativa aplicable y buenas prácticas profesionales.
            </p>
            <p>
              SanitattooSupply no se hace responsable de un uso incorrecto, inadecuado o distinto al
              recomendado por el fabricante.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className={sectionTitleClass}>10. Imágenes y descripciones</h2>
            <p>
              Las imágenes de producto mostradas en la web tienen finalidad orientativa. Puede haber
              pequeñas variaciones en envases, formatos, colores, diseños o presentación del producto
              respecto a la imagen mostrada.
            </p>
            <p>
              Las descripciones se ofrecen con fines informativos y podrán ser actualizadas para
              mejorar la claridad o precisión del catálogo.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className={sectionTitleClass}>11. Propiedad intelectual</h2>
            <p>
              Los contenidos de esta web, incluyendo textos, imágenes, diseño, logotipos, estructura,
              elementos gráficos y código, pertenecen a SanitattooSupply o a sus respectivos
              titulares, salvo indicación contraria.
            </p>
            <p>
              No se permite la reproducción, distribución, modificación o uso comercial de dichos
              contenidos sin autorización previa.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className={sectionTitleClass}>12. Enlaces externos</h2>
            <p>
              La web puede incluir enlaces a servicios externos como WhatsApp, Instagram o Google
              Maps.
            </p>
            <p>
              SanitattooSupply no se hace responsable del contenido, funcionamiento, políticas o
              prácticas de privacidad de dichos servicios externos.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className={sectionTitleClass}>13. Modificación de las condiciones</h2>
            <p>
              SanitattooSupply podrá modificar estos términos y condiciones cuando sea necesario para
              adaptarlos a cambios comerciales, técnicos, legales o funcionales de la web.
            </p>
            <p>La versión publicada en esta página será la aplicable en cada momento.</p>
          </section>

          <section className="space-y-4">
            <h2 className={sectionTitleClass}>14. Legislación aplicable</h2>
            <p>Estas condiciones se rigen por la legislación española.</p>
            <p>
              Para cualquier conflicto o controversia, las partes se someterán a los juzgados y
              tribunales que correspondan conforme a la normativa aplicable.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className={sectionTitleClass}>15. Contacto</h2>
            <p>
              Para cualquier duda relacionada con estos términos y condiciones, puedes contactar con
              SanitattooSupply a través de:
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
              Última actualización: <span className={placeholderClass}>[FECHA]</span>
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
