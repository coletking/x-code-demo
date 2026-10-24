import type { Metadata } from "next";
import { ServiceSection } from "@/components/marketing/ServiceSection";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { medicalServices, aestheticServices } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Primary care, diagnostics, chronic disease management, and advanced aesthetic treatments at The Luxe Medical Clinic.",
};

export default function ServicesPage() {
  return (
    <>
      <div className="bg-primary-950 py-16 text-center">
        <p className="text-sm font-semibold tracking-wide text-gold-300 uppercase">
          What we treat
        </p>
        <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
          Services
        </h1>
        <p className="mx-auto mt-4 max-w-xl px-5 text-primary-100/75">
          Medical care is the foundation of everything we do — aesthetic
          treatments are offered alongside it, physician-supervised.
        </p>
      </div>
      <ServiceSection
        eyebrow="Medical"
        title="Primary & specialist care"
        description="Consultations, screening, diagnostics, immunization, and chronic disease management — led by resident physicians."
        services={medicalServices}
        tone="medical"
      />
      <ServiceSection
        eyebrow="Aesthetic"
        title="Advanced aesthetic medicine"
        description="Skin and aesthetic treatments performed with full clinical oversight."
        services={aestheticServices}
        tone="aesthetic"
      />
      <CtaBanner />
    </>
  );
}
