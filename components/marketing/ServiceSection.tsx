import {
  Activity,
  HeartPulse,
  Microscope,
  ShieldPlus,
  Stethoscope,
  Syringe,
  Sparkles,
  Droplets,
  Dna,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Service } from "@/lib/models/types";
import { formatCurrency } from "@/lib/utils/date";
import { Reveal } from "@/components/marketing/Reveal";
import { ServiceVisual } from "@/components/marketing/ServiceVisual";
import { LinkButton } from "@/components/ui/Button";

export const iconMap: Record<string, LucideIcon> = {
  "svc-general-consult": Stethoscope,
  "svc-womens-health": HeartPulse,
  "svc-diagnostics": Microscope,
  "svc-vaccination": ShieldPlus,
  "svc-chronic-care": Activity,
  "svc-laser-hair": Sparkles,
  "svc-pigmentation": Droplets,
  "svc-microneedling": Dna,
  "svc-botox-filler": Syringe,
};

export function ServiceSection({
  eyebrow,
  title,
  description,
  services,
  tone = "medical",
}: {
  eyebrow: string;
  title: string;
  description: string;
  services: Service[];
  tone?: "medical" | "aesthetic";
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <Reveal className="max-w-2xl">
        <p
          className={`text-sm font-semibold tracking-wide uppercase ${
            tone === "medical" ? "text-primary-600" : "text-gold-600"
          }`}
        >
          {eyebrow}
        </p>
        <h2 className="mt-3 font-display text-3xl text-primary-950 sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-primary-900/70">{description}</p>
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => {
          const Icon = iconMap[service.id] ?? Stethoscope;
          return (
            <Reveal key={service.id} delay={i * 0.06}>
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-primary-900/8 bg-white shadow-[0_2px_10px_-6px_rgba(15,33,31,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_30px_-12px_rgba(15,33,31,0.25)]">
                <ServiceVisual
                  category={service.category}
                  icon={Icon}
                  seed={service.id}
                  alt={service.name}
                  rounded={false}
                  className="transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg text-primary-950">
                    {service.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-primary-900/65">
                    {service.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="font-semibold text-primary-800">
                      {formatCurrency(service.price)}
                    </span>
                    <span className="text-primary-900/50">
                      {service.durationMinutes} mins
                    </span>
                  </div>
                  <LinkButton
                    href={`/account/book?service=${service.id}`}
                    size="sm"
                    variant={tone === "medical" ? "primary" : "secondary"}
                    className="mt-5 w-full"
                  >
                    Book Now <ArrowRight size={14} />
                  </LinkButton>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
