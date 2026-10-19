import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { publicAssetUrl } from "../utils/publicAsset.js";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

let openViewerCount = 0;

/**
 * Visor a pantalla completa para los trabajos de un artista.
 * @param {{
 *   artistName: string
 *   works: { src: string, alt: string, width: number, height: number }[]
 *   index: number
 *   opener: HTMLElement | null
 *   onClose: () => void
 *   onStep: (delta: number) => void
 * }} props
 */
export default function WorkViewer({
  artistName,
  works,
  index,
  opener,
  onClose,
  onStep,
}) {
  const titleId = useId();
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const workCount = works.length;

  useEffect(() => {
    const dialog = dialogRef.current;
    const root = document.getElementById("root");
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    openViewerCount += 1;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    root?.setAttribute("inert", "");
    root?.setAttribute("aria-hidden", "true");
    closeRef.current?.focus();

    const getFocusable = () => {
      if (!dialog) return [];
      return [...dialog.querySelectorAll(FOCUSABLE)].filter(
        (el) => el instanceof HTMLElement,
      );
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        if (workCount > 1) {
          onStep(event.key === "ArrowRight" ? 1 : -1);
        }
        return;
      }

      if (event.key !== "Tab" || !dialog) return;

      const items = getFocusable();
      if (!items.length) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      const inside = active instanceof Node && dialog.contains(active);

      if (!inside) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
        return;
      }

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      openViewerCount = Math.max(0, openViewerCount - 1);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      root?.removeAttribute("inert");
      root?.removeAttribute("aria-hidden");
      if (opener) {
        requestAnimationFrame(() => {
          if (openViewerCount > 0) return;
          if (document.contains(opener)) opener.focus();
        });
      }
    };
  }, [onClose, onStep, opener, workCount]);

  const work = works[index];
  if (!work) return null;

  const canStep = works.length > 1;

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-[70] flex flex-col bg-brand-black text-brand-white"
    >
      <div className="flex items-start justify-between gap-4 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6">
        <div className="min-w-0 pt-2">
          <p
            id={titleId}
            className="font-heading text-base leading-tight text-white sm:text-lg"
          >
            Trabajos de {artistName}
          </p>
          <p className="sr-only" aria-live="polite">
            {`Imagen ${index + 1} de ${works.length}. ${work.alt}`}
          </p>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md bg-brand-white px-3 py-2 text-sm font-medium text-brand-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
        >
          <X className="size-4" aria-hidden />
          Cerrar
        </button>
      </div>

      <div
        className="flex min-h-0 flex-1 px-4 py-4 sm:px-8"
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <div className="relative min-h-0 min-w-0 flex-1">
          <img
            src={publicAssetUrl(work.src)}
            alt={work.alt}
            width={work.width}
            height={work.height}
            draggable={false}
            className="absolute inset-0 h-full w-full object-contain"
          />
        </div>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 pt-1 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6">
        {canStep ? (
          <button
            type="button"
            onClick={() => onStep(-1)}
            className="inline-flex min-h-11 w-fit items-center gap-2 justify-self-start rounded-md border border-white/30 px-3 py-2 text-sm font-medium text-white transition-colors hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red motion-reduce:transition-none sm:px-4"
          >
            <ChevronLeft className="size-4" aria-hidden />
            Anterior
          </button>
        ) : (
          <span />
        )}
        <p className="text-center text-sm tabular-nums text-white/80">
          {index + 1} / {works.length}
        </p>
        {canStep ? (
          <button
            type="button"
            onClick={() => onStep(1)}
            className="inline-flex min-h-11 w-fit items-center gap-2 justify-self-end rounded-md border border-white/30 px-3 py-2 text-sm font-medium text-white transition-colors hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red motion-reduce:transition-none sm:px-4"
          >
            Siguiente
            <ChevronRight className="size-4" aria-hidden />
          </button>
        ) : (
          <span />
        )}
      </div>
    </div>,
    document.body,
  );
}
