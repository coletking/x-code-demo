import { Star } from "lucide-react";
import { Reveal } from "@/components/marketing/Reveal";

const testimonials = [
  {
    name: "Funmi A.",
    role: "Chronic care patient",
    quote:
      "I came in for diabetes management and stayed because the care felt genuinely personal. The doctors actually listen.",
  },
  {
    name: "Richard O.",
    role: "General consultation",
    quote:
      "Booked online in two minutes, got a same-week slot, and the clinic itself feels more like a boutique hotel than a hospital.",
  },
  {
    name: "Ngozi K.",
    role: "Women's health screening",
    quote:
      "Thorough, respectful, and fast results. I also had a microneedling session after — one clinic for everything.",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <Reveal className="mx-auto max-w-xl text-center">
        <p className="text-sm font-semibold tracking-wide text-primary-600 uppercase">
          Patient stories
        </p>
        <h2 className="mt-3 font-display text-3xl text-primary-950 sm:text-4xl">
          Trusted by patients across Lagos.
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.08}>
            <div className="h-full rounded-2xl border border-primary-900/8 bg-white p-6 shadow-[0_2px_10px_-6px_rgba(15,33,31,0.12)]">
              <div className="flex gap-0.5 text-gold-500">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-primary-900/75">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="mt-4 text-sm font-medium text-primary-950">{t.name}</p>
              <p className="text-xs text-primary-900/50">{t.role}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
