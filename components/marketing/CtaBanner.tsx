import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/marketing/Reveal";

export function CtaBanner() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950 px-8 py-14 text-center sm:px-16">
          <div className="pointer-events-none absolute -top-16 right-0 h-64 w-64 rounded-full bg-gold-400/20 blur-3xl" />
          <h2 className="font-display text-3xl text-white sm:text-4xl">
            Ready to be seen?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-primary-100/75">
            Book online in minutes and receive an instant invoice — our team
            will confirm payment and your visit shortly after.
          </p>
          <LinkButton href="/account/book" size="lg" variant="secondary" className="mt-7">
            Book an Appointment <ArrowRight size={18} />
          </LinkButton>
        </div>
      </Reveal>
    </section>
  );
}
