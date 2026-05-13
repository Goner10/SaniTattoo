import { MessageCircle } from "lucide-react";

/**
 * @param {{
 *   href: string
 *   children: import("react").ReactNode
 *   variant?: "solid" | "outline" | "whatsapp"
 *   className?: string
 * }} props
 */
export default function WhatsAppButton({
  href,
  children,
  variant = "solid",
  className = "",
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

  const styles =
    variant === "whatsapp"
      ? "bg-[#25D366] text-white hover:bg-[#1DA851] focus-visible:outline-[#25D366]"
      : variant === "outline"
        ? "border border-brand-border bg-brand-white text-brand-black hover:border-brand-red hover:text-brand-red focus-visible:outline-brand-red"
        : "bg-brand-red text-brand-white hover:bg-brand-red-dark focus-visible:outline-brand-red";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles} ${className}`}
    >
      <MessageCircle className="size-4 shrink-0" aria-hidden />
      {children}
    </a>
  );
}
