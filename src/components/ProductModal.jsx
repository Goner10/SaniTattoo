import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import WhatsAppButton from "./WhatsAppButton.jsx";
import { formatPrice } from "../utils/formatPrice.js";
import { productWhatsAppUrl } from "../utils/whatsapp.js";

export default function ProductModal({ product, onClose }) {
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
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [product, onClose]);

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
                  className="mt-1 font-display text-xl text-brand-black sm:text-2xl"
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
              <div className="aspect-video w-full bg-brand-bg sm:aspect-[4/3]">
                <img
                  src={product.image}
                  alt={product.alt}
                  className="h-full w-full object-contain"
                />
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
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
