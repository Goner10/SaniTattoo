import { useCallback, useId, useImperativeHandle, useRef, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { MAX_LINE_QUANTITY, parseOrderQuantity } from "../utils/orderList.js";

/**
 * @param {{
 *   ref?: import("react").Ref<{ commit: () => number | null, holdBlur: () => void }>
 *   value: number
 *   label: string
 *   onCommit: (quantity: number) => void
 *   showLegend?: boolean
 *   compact?: boolean
 *   className?: string
 * }} props
 */
export default function QuantityControl({
  ref,
  value,
  label,
  onCommit,
  showLegend = false,
  compact = false,
  className = "",
}) {
  const inputId = useId();
  const errorId = useId();
  const [draft, setDraft] = useState(null);
  const [error, setError] = useState("");
  const skipBlurRef = useRef(false);
  const shown = draft == null || draft === String(value) ? String(value) : draft;

  const applyDraft = useCallback(
    (raw, revertOnInvalid) => {
      if (raw.trim() === "") {
        if (revertOnInvalid) setDraft(null);
        setError("Indica una cantidad.");
        return null;
      }
      const parsed = parseOrderQuantity(raw);
      if (parsed == null) {
        if (revertOnInvalid) setDraft(null);
        setError("Usa un número entero, entre 1 y 99.");
        return null;
      }
      setError("");
      setDraft(null);
      if (parsed !== value) onCommit(parsed);
      return parsed;
    },
    [onCommit, value],
  );

  useImperativeHandle(
    ref,
    () => ({
      holdBlur() {
        skipBlurRef.current = true;
      },
      commit() {
        return applyDraft(shown, false);
      },
    }),
    [applyDraft, shown],
  );

  function step(delta) {
    const next = value + delta;
    if (next < 1 || next > MAX_LINE_QUANTITY) return;
    setError("");
    setDraft(String(next));
    onCommit(next);
  }

  return (
    <div className={className}>
      {showLegend ? (
        <label
          htmlFor={inputId}
          className={
            compact
              ? "text-xs font-semibold uppercase leading-4 tracking-wide text-brand-muted"
              : "text-xs font-semibold uppercase tracking-wide text-brand-muted"
          }
        >
          Cantidad
        </label>
      ) : (
        <label htmlFor={inputId} className="sr-only">
          Cantidad
        </label>
      )}
      <div
        role="group"
        aria-label={label}
        className={`flex items-center gap-1 ${showLegend ? "mt-1" : ""}`}
      >
        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-brand-border text-brand-black hover:bg-brand-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red disabled:cursor-not-allowed disabled:opacity-40"
          aria-label={`Restar una unidad de ${label}`}
          onClick={() => step(-1)}
          disabled={value <= 1}
        >
          <Minus className="size-4" aria-hidden />
        </button>
        <input
          id={inputId}
          inputMode="numeric"
          autoComplete="off"
          enterKeyHint="done"
          aria-label={label}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          value={shown}
          onChange={(event) => {
            const next = event.target.value;
            if (next !== "" && !/^\d{0,3}$/.test(next)) return;
            setDraft(next);
            if (error) setError("");
          }}
          onBlur={() => {
            const current = shown;
            window.setTimeout(() => {
              if (skipBlurRef.current) {
                skipBlurRef.current = false;
                return;
              }
              applyDraft(current, true);
            }, 0);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              event.currentTarget.blur();
            }
          }}
          className="h-11 w-14 rounded-md border border-brand-border bg-brand-white text-center text-base text-brand-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
        />
        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-brand-border text-brand-black hover:bg-brand-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red disabled:cursor-not-allowed disabled:opacity-40"
          aria-label={`Añadir una unidad a ${label}`}
          onClick={() => step(1)}
          disabled={value >= MAX_LINE_QUANTITY}
        >
          <Plus className="size-4" aria-hidden />
        </button>
      </div>
      {error ? (
        <p id={errorId} role="alert" className="mt-1 text-sm text-brand-red">
          {error}
        </p>
      ) : null}
    </div>
  );
}
