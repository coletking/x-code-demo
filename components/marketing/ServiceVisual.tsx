import type { LucideIcon } from "lucide-react";
import type { ServiceCategory } from "@/lib/models/types";
import { cn } from "@/lib/utils/cn";

const toneClasses: Record<ServiceCategory, { bg: string; blobA: string; blobB: string; icon: string; badge: string }> = {
  medical: {
    bg: "from-primary-800 via-primary-700 to-primary-900",
    blobA: "bg-primary-400/30",
    blobB: "bg-gold-300/15",
    icon: "text-primary-50",
    badge: "bg-white/10 text-primary-50 border-white/15",
  },
  aesthetic: {
    bg: "from-gold-700 via-gold-600 to-primary-900",
    blobA: "bg-gold-300/25",
    blobB: "bg-primary-300/15",
    icon: "text-gold-50",
    badge: "bg-white/10 text-gold-50 border-white/15",
  },
};

export function ServiceVisual({
  category,
  icon: Icon,
  size = "card",
  rounded = true,
  className,
}: {
  category: ServiceCategory;
  icon: LucideIcon;
  size?: "card" | "hero";
  rounded?: boolean;
  className?: string;
}) {
  const tone = toneClasses[category];

  return (
    <div
      className={cn(
        "relative isolate flex items-center justify-center overflow-hidden bg-gradient-to-br",
        rounded && "rounded-2xl",
        tone.bg,
        size === "hero" ? "aspect-[4/5] sm:aspect-[5/4]" : "aspect-[4/3]",
        className
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute animate-float-slow rounded-full blur-2xl",
          tone.blobA,
          size === "hero" ? "-top-10 -left-10 h-56 w-56" : "-top-6 -left-6 h-28 w-28"
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute animate-float-slower rounded-full blur-2xl",
          tone.blobB,
          size === "hero" ? "-bottom-12 -right-8 h-64 w-64" : "-bottom-8 -right-6 h-32 w-32"
        )}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(15,33,31,0.35)_100%)]" />

      <span
        className={cn(
          "absolute left-3 top-3 rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide backdrop-blur-sm",
          tone.badge
        )}
      >
        {category === "medical" ? "Medical" : "Aesthetic"}
      </span>

      <Icon
        strokeWidth={1.25}
        className={cn(tone.icon, "relative drop-shadow-sm", size === "hero" ? "h-24 w-24 sm:h-28 sm:w-28" : "h-14 w-14")}
      />
    </div>
  );
}
