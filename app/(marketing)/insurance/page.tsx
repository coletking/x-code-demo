import type { Metadata } from "next";
import { CheckCircle2, HelpCircle } from "lucide-react";
import { insuranceProviders } from "@/lib/data/insuranceProviders";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { Reveal } from "@/components/marketing/Reveal";

export const metadata: Metadata = {
  title: "Insurance",
  description:
    "The Luxe Medical Clinic accepts leading HMO and insurance plans across Nigeria for medical visits, diagnostics, and chronic care.",
};

const faqs = [
  {
    q: "Do you accept insurance for aesthetic treatments?",
    a: "Most HMO plans cover medical visits, diagnostics, and chronic care. Aesthetic treatments are typically out-of-pocket, though some plans offer partial coverage — our team will confirm this when you book.",
  },
  {
    q: "What do I need to bring on my visit?",
    a: "Your HMO ID card or policy number, a valid means of identification, and any prior medical records relevant to your visit.",
  },
  {
    q: "Is pre-authorization required?",
    a: "Some plans require pre-authorization for specific procedures. We handle this on your behalf once your appointment is confirmed.",
  },
];

export default function InsurancePage() {
  return (
    <>
      <div className="bg-primary-950 py-16 text-center">
        <p className="text-sm font-semibold tracking-wide text-gold-300 uppercase">
          Coverage
        </p>
        <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
          Insurance &amp; HMO
        </h1>
        <p className="mx-auto mt-4 max-w-xl px-5 text-primary-100/75">
          We partner with leading health plans so your medical care — not
          just aesthetics — is covered.
        </p>
      </div>

      <section className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2">
          {insuranceProviders.map((provider, i) => (
            <Reveal key={provider.id} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-primary-900/8 bg-white p-6 shadow-[0_2px_10px_-6px_rgba(15,33,31,0.12)]">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg text-primary-950">
                    {provider.name}
                  </h3>
                  <CheckCircle2 size={20} className="shrink-0 text-primary-600" />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {provider.plans.map((plan) => (
                    <span
                      key={plan}
                      className="rounded-full bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-700"
                    >
                      {plan}
                    </span>
                  ))}
                </div>
                {provider.notes && (
                  <p className="mt-3 text-sm text-primary-900/60">{provider.notes}</p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-primary-50/60 py-16">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <Reveal className="text-center">
            <p className="text-sm font-semibold tracking-wide text-primary-600 uppercase">
              Common questions
            </p>
            <h2 className="mt-3 font-display text-3xl text-primary-950">
              Insurance FAQs
            </h2>
          </Reveal>
          <div className="mt-8 space-y-4">
            {faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 0.08}>
                <div className="rounded-2xl border border-primary-900/8 bg-white p-5">
                  <p className="flex items-start gap-2.5 font-medium text-primary-950">
                    <HelpCircle size={18} className="mt-0.5 shrink-0 text-gold-600" />
                    {faq.q}
                  </p>
                  <p className="mt-2 pl-7 text-sm leading-relaxed text-primary-900/70">
                    {faq.a}
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
