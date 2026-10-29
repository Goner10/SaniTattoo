/**
 * Aviso compacto. El texto sale de la campaña y debe describir su alcance.
 * @param {{
 *   campaign: import("../data/campaigns.js").Campaign | null
 *   variant?: "catalog" | "compact"
 * }} props
 */
export default function CampaignNotice({ campaign, variant = "catalog" }) {
  if (!campaign) return null;

  const { catalogEyebrow, catalogTitle, catalogDeadline } = campaign.copy;

  if (variant === "compact") {
    return (
      <p className="mt-3 text-sm font-medium leading-relaxed text-brand-black">
        <span className="font-bold text-brand-red">{catalogEyebrow}.</span>{" "}
        {catalogTitle}. {catalogDeadline}.
      </p>
    );
  }

  return (
    <section
      aria-label={catalogEyebrow}
      className="mt-6 max-w-3xl rounded-xl border border-brand-red/30 bg-brand-white px-4 py-3.5 shadow-[0_4px_18px_rgba(5,5,5,0.04)] sm:px-5"
    >
      <p className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-brand-red">
        {catalogEyebrow}
      </p>
      <p className="mt-1.5 text-base font-semibold leading-snug text-brand-black sm:text-lg">
        {catalogTitle}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-brand-muted">{catalogDeadline}</p>
    </section>
  );
}
