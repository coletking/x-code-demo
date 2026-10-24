import type { Metadata } from "next";
import { GraduationCap, HeartPulse, ShieldCheck, Sparkles } from "lucide-react";
import { Reveal } from "@/components/marketing/Reveal";
import { CtaBanner } from "@/components/marketing/CtaBanner";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Luxe Medical Clinic is a physician-led practice combining primary care, diagnostics, and advanced aesthetics in Lagos.",
};

const values = [
  {
    icon: HeartPulse,
    title: "Medicine first",
    body: "Every treatment plan starts with a licensed physician — aesthetics included.",
  },
  {
    icon: ShieldCheck,
    title: "Evidence-based care",
    body: "We follow clinical protocols, not trends, for every procedure we offer.",
  },
  {
    icon: Sparkles,
    title: "A refined experience",
    body: "Hospital-grade care, delivered in a calm, modern, and private setting.",
  },
  {
    icon: GraduationCap,
    title: "Experienced team",
    body: "Our physicians and clinicians bring decades of combined training and practice.",
  },
];

export default function AboutPage() {
  return (
    <>
      <div className="bg-primary-950 py-16 text-center">
        <p className="text-sm font-semibold tracking-wide text-gold-300 uppercase">
          Our story
        </p>
        <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
          About The Luxe Medical Clinic
        </h1>
      </div>

      <section className="mx-auto max-w-3xl px-5 py-16 text-center lg:px-8">
        <Reveal>
          <p className="text-lg leading-relaxed text-primary-900/75">
            The Luxe Medical Clinic was founded on a simple idea: that
            primary medical care and modern aesthetics don&rsquo;t have to
            live in separate worlds. Our physicians lead every visit, our
            diagnostics are fast and accurate, and our aesthetic treatments
            are delivered with the same clinical discipline as any other
            procedure — all within a calm, private, and genuinely luxurious
            environment.
          </p>
        </Reveal>
      </section>

      <section className="bg-primary-50/60 py-16">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.07}>
                <div className="h-full rounded-2xl border border-primary-900/8 bg-white p-6">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                    <v.icon size={20} />
                  </span>
                  <h3 className="mt-4 font-display text-lg text-primary-950">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-primary-900/65">
                    {v.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
