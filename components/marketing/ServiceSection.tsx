import Link from "next/link";
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
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Service } from "@/lib/models/types";
import { formatCurrency } from "@/lib/utils/date";
import { Reveal } from "@/components/marketing/Reveal";

const iconMap: Record<string, LucideIcon> = {
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

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => {
          const Icon = iconMap[service.id] ?? Stethoscope;
          return (
            <Reveal key={service.id} delay={i * 0.06}>
              <Link
                href="/services"
                className="group relative block h-full overflow-hidden rounded-2xl border border-primary-900/8 bg-white p-6 shadow-[0_2px_10px_-6px_rgba(15,33,31,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_30px_-12px_rgba(15,33,31,0.25)]"
              >
                <div
                  className={`absolute -top-10 -right-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100 ${
                    tone === "medical" ? "bg-primary-400/30" : "bg-gold-400/30"
                  }`}
                />
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${
                    tone === "medical"
                      ? "bg-primary-50 text-primary-700"
                      : "bg-gold-50 text-gold-600"
                  }`}
                >
                  <Icon size={20} />
                </span>
                <h3 className="mt-4 font-display text-lg text-primary-950">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-900/65">
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
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
