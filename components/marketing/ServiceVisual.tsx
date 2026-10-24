import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import type { ServiceCategory } from "@/lib/models/types";
import { cn } from "@/lib/utils/cn";

const toneClasses: Record<ServiceCategory, { wash: string; icon: string; badge: string }> = {
  medical: {
    wash: "from-primary-950/55 via-primary-950/0 to-primary-950/10",
    icon: "text-primary-800",
    badge: "bg-white/90 text-primary-800 border-white/40",
  },
  aesthetic: {
    wash: "from-gold-900/50 via-primary-950/0 to-gold-900/10",
    icon: "text-gold-700",
    badge: "bg-white/90 text-gold-700 border-white/40",
  },
};

const sizeClasses: Record<"card" | "hero" | "tall", string> = {
  card: "aspect-[4/3]",
  tall: "aspect-[3/4]",
  hero: "aspect-[4/5] sm:aspect-[5/4]",
};

export function ServiceVisual({
  category,
  icon: Icon,
  seed,
  alt,
  size = "card",
  rounded = true,
  className,
}: {
  category: ServiceCategory;
  icon: LucideIcon;
  seed: string;
  alt: string;
  size?: "card" | "hero" | "tall";
  rounded?: boolean;
  className?: string;
}) {
  const tone = toneClasses[category];
  const width = size === "hero" ? 800 : 480;
  const height = size === "hero" ? 960 : size === "tall" ? 640 : 360;

  return (
    <div
      className={cn(
        "relative isolate flex items-end overflow-hidden bg-primary-100",
        rounded && "rounded-2xl",
        sizeClasses[size],
        className
      )}
    >
      <Image
        src={`https://picsum.photos/seed/${seed}/${width}/${height}`}
        alt={alt}
        fill
        sizes={size === "hero" ? "(min-width: 1024px) 480px, 90vw" : "(min-width: 1024px) 360px, 90vw"}
        className="object-cover"
      />
      <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-t", tone.wash)} />

      <span
        className={cn(
          "absolute left-3 top-3 rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide shadow-sm backdrop-blur-sm",
          tone.badge
        )}
      >
        {category === "medical" ? "Medical" : "Aesthetic"}
      </span>

      <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/90 shadow-sm backdrop-blur-sm">
        <Icon size={16} className={tone.icon} strokeWidth={2} />
      </span>
    </div>
  );
}
