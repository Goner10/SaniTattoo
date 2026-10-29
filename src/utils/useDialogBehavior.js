import { useEffect, useRef } from "react";
import { lockBodyScroll } from "./bodyScrollLock.js";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

/**
 * @param {ParentNode} container
 */
function focusableItems(container) {
  return [...container.querySelectorAll(FOCUSABLE)].filter(
    (element) => element instanceof HTMLElement && element.tabIndex !== -1,
  );
}

/**
 * Foco inicial, ciclo de tabulador, Escape y bloqueo de scroll.
 * @param {{
 *   open: boolean
 *   onEscape: () => void
 *   dialogRef: import("react").RefObject<HTMLElement | null>
 * }} options
 */
export function useDialogBehavior({ open, onEscape, dialogRef }) {
  const onEscapeRef = useRef(onEscape);

  useEffect(() => {
    onEscapeRef.current = onEscape;
  });

  useEffect(() => {
    if (!open) return undefined;

    const previous = document.activeElement;
    const unlock = lockBodyScroll();
    const node = dialogRef.current;
    const initial = node?.querySelector("[data-autofocus]");
    if (initial instanceof HTMLElement) initial.focus();

    const onKey = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        onEscapeRef.current();
        return;
      }
      if (event.key !== "Tab" || !node) return;
      const items = focusableItems(node);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !node.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("keydown", onKey, true);
      unlock();
      if (
        previous instanceof HTMLElement &&
        previous !== document.body &&
        document.contains(previous)
      ) {
        previous.focus();
      } else {
        document.getElementById("mi-pedido-button")?.focus();
      }
    };
  }, [open, dialogRef]);
}
