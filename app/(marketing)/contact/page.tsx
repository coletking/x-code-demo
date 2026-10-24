import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/marketing/ContactForm";
import { Reveal } from "@/components/marketing/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with The Luxe Medical Clinic.",
};

const details = [
  { icon: MapPin, label: "12 Admiralty Way, Lekki Phase 1, Lagos" },
  { icon: Phone, label: "+234 800 LUXE MED" },
  { icon: Mail, label: "hello@theluxemedicalclinic.com" },
  { icon: Clock, label: "Mon–Sat, 9:00 AM – 6:00 PM" },
];

export default function ContactPage() {
  return (
    <>
      <div className="bg-primary-950 py-16 text-center">
        <p className="text-sm font-semibold tracking-wide text-gold-300 uppercase">
          Get in touch
        </p>
        <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
          Contact Us
        </h1>
      </div>

      <section className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <h2 className="font-display text-2xl text-primary-950">
              We&rsquo;d love to hear from you
            </h2>
            <p className="mt-3 text-primary-900/65">
              Reach out for general inquiries, insurance questions, or to
              speak with our care team before booking.
            </p>
            <ul className="mt-6 space-y-3">
              {details.map((d) => (
                <li key={d.label} className="flex items-center gap-3 text-sm text-primary-900/75">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                    <d.icon size={16} />
                  </span>
                  {d.label}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-3">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
