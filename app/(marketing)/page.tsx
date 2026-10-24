import { Hero } from "@/components/marketing/Hero";
import { TrustBar } from "@/components/marketing/TrustBar";
import { ServiceSection } from "@/components/marketing/ServiceSection";
import { InsuranceTeaser } from "@/components/marketing/InsuranceTeaser";
import { Testimonials } from "@/components/marketing/Testimonials";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { medicalServices, aestheticServices } from "@/lib/data/services";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServiceSection
        eyebrow="Primary & Specialist Care"
        title="Medical care comes first."
        description="Our resident physicians lead every visit — from routine consultations and diagnostics to ongoing chronic disease management."
        services={medicalServices}
        tone="medical"
      />
      <InsuranceTeaser />
      <ServiceSection
        eyebrow="Aesthetic Medicine"
        title="Complemented by advanced aesthetics."
        description="For patients who want more — physician-administered skin and aesthetic treatments, performed with the same clinical rigor."
        services={aestheticServices}
        tone="aesthetic"
      />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
