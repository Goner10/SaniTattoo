import { Link } from "react-router-dom";

/**
 * @param {{
 *   title: string
 *   subtitle?: string
 *   ctaLabel?: string
 *   ctaTo?: string
 * }} props
 */
export default function SectionHeader({ title, subtitle, ctaLabel, ctaTo }) {
  return (
    <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <h2 className="font-display text-2xl tracking-tight text-brand-black sm:text-3xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-2 text-sm leading-relaxed text-brand-muted sm:text-base">
            {subtitle}
          </p>
        ) : null}
      </div>
      {ctaLabel && ctaTo ? (
        <Link
          to={ctaTo}
          className="inline-flex shrink-0 items-center justify-center rounded-md border border-brand-black bg-brand-black px-4 py-2.5 text-sm font-medium text-brand-white transition-colors hover:bg-brand-red hover:border-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
        >
          {ctaLabel}
        </Link>
      ) : null}
    </div>
  );
}
