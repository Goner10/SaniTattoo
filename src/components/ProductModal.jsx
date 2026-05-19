import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import WhatsAppButton from "./WhatsAppButton.jsx";
import { formatPrice } from "../utils/formatPrice.js";
import { productWhatsAppUrl } from "../utils/whatsapp.js";

export default function ProductModal({ product, onClose }) {
  const [selectedImage, setSelectedImage] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!product) return;
    const urls = product.gallery;
    queueMicrotask(() => {
      setLightboxOpen(false);
      if (Array.isArray(urls) && urls.length > 1) {
        setSelectedImage(urls[0]);
      } else {
        setSelectedImage(product.image);
      }
    });
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (lightboxOpen) {
        setLightboxOpen(false);
      } else {
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [product, onClose, lightboxOpen]);

  const useGallery =
    product &&
    Array.isArray(product.gallery) &&
    product.gallery.length > 1;

  const mainSrc = useGallery ? selectedImage || product.image : product?.image;

  const mainImageAlt = useGallery
    ? `${product?.alt} — vista seleccionada`
    : product?.alt;

  return (
    <AnimatePresence>
      {product ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-modal-title"
          className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-brand-black/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-white"
            aria-label="Cerrar modal"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-t-xl border border-brand-border bg-brand-white shadow-lg sm:rounded-xl"
          >
            <div className="flex items-start justify-between gap-3 border-b border-brand-border p-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-brand-muted">
                  {product.categoryLabel}
                </p>
                <h2
                  id="product-modal-title"
                  className="mt-1 font-heading text-xl text-brand-black sm:text-2xl"
                >
                  {product.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-transparent p-2 text-brand-black hover:bg-brand-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
                aria-label="Cerrar"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">
              <div className="w-full shrink-0 overflow-hidden bg-[#f1f1f1] ring-1 ring-inset ring-black/[0.04]">
                <div className="aspect-[4/3] w-full lg:aspect-auto lg:h-[320px] lg:max-h-[320px] xl:h-[340px] xl:max-h-[340px] 2xl:h-[420px] 2xl:max-h-[420px]">
                  <button
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    className="group relative flex h-full min-h-0 w-full cursor-zoom-in items-center justify-center p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red sm:p-6 lg:p-5 xl:p-6 2xl:p-8"
                    aria-label="Ampliar imagen del producto"
                  >
                    <img
                      src={mainSrc}
                      alt={mainImageAlt}
                      className="max-h-full w-full max-w-full object-contain"
                      draggable={false}
                    />
                    <span
                      className="pointer-events-none absolute inset-x-0 bottom-3 mx-auto w-fit rounded-md bg-brand-black/70 px-3 py-1.5 text-xs font-medium text-brand-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:bottom-4 lg:bottom-5"
                      aria-hidden
                    >
                      Ampliar imagen
                    </span>
                  </button>
                </div>
                {useGallery ? (
                  <div
                    className="flex max-w-full gap-2 overflow-x-auto border-t border-brand-border/60 bg-brand-white/95 px-3 py-3 sm:gap-3 sm:px-4 sm:py-3.5"
                    role="tablist"
                    aria-label="Miniaturas de la galería"
                  >
                    {product.gallery.map((src, i) => (
                      <button
                        key={src}
                        type="button"
                        role="tab"
                        aria-selected={selectedImage === src}
                        aria-label={`Mostrar imagen ${i + 1}`}
                        onClick={() => setSelectedImage(src)}
                        className={[
                          "relative shrink-0 overflow-hidden rounded-lg border-2 bg-[#f1f1f1] p-1.5 transition-[border-color,box-shadow] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red sm:p-2",
                          selectedImage === src
                            ? "border-brand-red shadow-sm ring-1 ring-brand-red/20"
                            : "border-transparent hover:border-brand-border",
                        ].join(" ")}
                      >
                        <span className="block h-14 w-14 sm:h-16 sm:w-16">
                          <img
                            src={src}
                            alt=""
                            className="h-full w-full object-contain"
                            loading="lazy"
                            draggable={false}
                          />
                        </span>
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="space-y-4 p-4 sm:p-6">
                <p className="text-sm leading-relaxed text-brand-black">
                  {product.description}
                </p>
                {product.variants?.length ? (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">
                      Formatos
                    </p>
                    <ul className="mt-2 space-y-2">
                      {product.variants.map((v) => (
                        <li
                          key={v.label}
                          className="flex items-center justify-between rounded-md border border-brand-border px-3 py-2 text-sm"
                        >
                          <span>{v.label}</span>
                          <span className="font-medium">
                            {formatPrice(v.price, product.currency)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-sm font-medium text-brand-black">
                    {formatPrice(product.price, product.currency)}
                    <span className="ml-1 font-normal text-brand-muted">
                      / {product.unit}
                    </span>
                  </p>
                )}
                {product.tags?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-brand-border bg-brand-bg px-2.5 py-0.5 text-xs text-brand-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="border-t border-brand-border p-4 sm:p-6">
              <WhatsAppButton
                href={productWhatsAppUrl(product.name)}
                className="w-full"
              >
                Consultar por WhatsApp
              </WhatsAppButton>
            </div>
          </motion.div>
          <AnimatePresence>
            {lightboxOpen ? (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label="Vista ampliada de la imagen"
                className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <button
                  type="button"
                  className="absolute inset-0 bg-black/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-white"
                  aria-label="Cerrar vista ampliada"
                  onClick={() => setLightboxOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="relative z-10 flex max-h-[90vh] max-w-[90vw] flex-col overflow-hidden rounded-xl bg-[#f3f3f3] shadow-2xl ring-1 ring-black/5"
                >
                  <button
                    type="button"
                    onClick={() => setLightboxOpen(false)}
                    className="absolute right-2 top-2 z-10 rounded-md border border-brand-border bg-brand-white p-3 text-brand-black shadow-sm transition-colors hover:bg-brand-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red sm:right-3 sm:top-3"
                    aria-label="Cerrar vista ampliada"
                  >
                    <X className="size-5" aria-hidden />
                  </button>
                  <div className="flex min-h-0 items-center justify-center p-4 pt-14 sm:p-6 sm:pt-16 md:p-8 md:pt-[4.5rem]">
                    <img
                      src={mainSrc}
                      alt={
                        useGallery
                          ? `${product.alt} — vista ampliada`
                          : product.alt
                      }
                      className="max-h-[70vh] max-w-full cursor-zoom-out object-contain sm:max-h-[75vh] md:max-h-[85vh]"
                      draggable={false}
                    />
                  </div>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
