import { CheckCircle2 } from "lucide-react";
import { insuranceProviders } from "@/lib/data/insuranceProviders";
import { Reveal } from "@/components/marketing/Reveal";
import { LinkButton } from "@/components/ui/Button";

export function InsuranceTeaser() {
  return (
    <section className="bg-primary-900">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="text-sm font-semibold tracking-wide text-gold-300 uppercase">
              Insurance &amp; HMO
            </p>
            <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
              We work with your health plan.
            </h2>
            <p className="mt-4 max-w-md text-primary-100/75">
              The Luxe Medical Clinic partners with leading HMOs across
              Nigeria so medical visits, diagnostics, and chronic care are
              covered — not just aesthetics.
            </p>
            <LinkButton href="/insurance" variant="secondary" className="mt-6">
              View accepted plans
            </LinkButton>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {insuranceProviders.map((provider) => (
                <div
                  key={provider.id}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                >
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-gold-300" />
                  <div>
                    <p className="text-sm font-medium text-white">{provider.name}</p>
                    <p className="mt-0.5 text-xs text-primary-100/60">
                      {provider.plans.join(" · ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
