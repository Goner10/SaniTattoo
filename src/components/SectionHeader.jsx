import { Link } from "react-router-dom";
import { catalogCtaCompact } from "../utils/catalogCta.js";

/**
 * @param {{
 *   title: string
 *   subtitle?: string
 *   ctaLabel?: string
 *   ctaTo?: string
 *   eyebrow?: string
 *   accent?: boolean
 *   ctaTone?: "default" | "accent"
 * }} props
 */
export default function SectionHeader({
  title,
  subtitle,
  ctaLabel,
  ctaTo,
  eyebrow,
  accent = false,
  ctaTone = "default",
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
      <div className="max-w-2xl min-w-0">
        {eyebrow ? (
          <p className="font-heading mb-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-red">
            {eyebrow}
          </p>
        ) : null}
        {accent ? (
          <span
            className="mb-3 block h-1 w-12 rounded-full bg-brand-red"
            aria-hidden
          />
        ) : null}
        <h2 className="font-heading text-2xl font-bold tracking-tight text-brand-black sm:text-3xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-2 text-sm font-normal leading-relaxed text-brand-muted sm:text-base">
            {subtitle}
          </p>
        ) : null}
      </div>
      {ctaLabel && ctaTo ? (
        <Link
          to={ctaTo}
          className={
            ctaTone === "accent"
              ? catalogCtaCompact
              : "inline-flex shrink-0 items-center justify-center rounded-md border border-brand-black bg-brand-black px-4 py-2.5 text-sm font-bold text-brand-white transition-colors hover:bg-brand-red hover:border-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
          }
        >
          {ctaLabel}
        </Link>
      ) : null}
    </div>
  );
}
