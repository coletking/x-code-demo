import type { Service } from "@/lib/models/types";

export const services: Service[] = [
  {
    id: "svc-general-consult",
    name: "General Medical Consultation",
    category: "medical",
    price: 25000,
    durationMinutes: 30,
    description:
      "A full consultation with one of our resident physicians covering any health concern, referral, or check-up.",
  },
  {
    id: "svc-womens-health",
    name: "Women's Health Screening",
    category: "medical",
    price: 45000,
    durationMinutes: 45,
    description:
      "Comprehensive screening including pelvic exam, breast exam, and reproductive health counselling.",
  },
  {
    id: "svc-diagnostics",
    name: "Diagnostic Lab Tests",
    category: "medical",
    price: 30000,
    durationMinutes: 20,
    description:
      "Full blood count, metabolic panel, and infection screening with same-week results.",
  },
  {
    id: "svc-vaccination",
    name: "Vaccination & Immunization",
    category: "medical",
    price: 15000,
    durationMinutes: 15,
    description:
      "Routine and travel vaccinations administered by licensed clinical staff.",
  },
  {
    id: "svc-chronic-care",
    name: "Chronic Disease Management",
    category: "medical",
    price: 35000,
    durationMinutes: 40,
    description:
      "Ongoing management for diabetes, hypertension, and other chronic conditions with a personalised care plan.",
  },
  {
    id: "svc-laser-hair",
    name: "Laser Hair Removal",
    category: "aesthetic",
    price: 40000,
    durationMinutes: 30,
    description:
      "Medical-grade laser hair reduction tailored to your skin type, performed by trained aestheticians.",
  },
  {
    id: "svc-pigmentation",
    name: "Pigmentation Treatment",
    category: "aesthetic",
    price: 50000,
    durationMinutes: 40,
    description:
      "Targeted treatment for dark spots, melasma, and uneven skin tone using clinically proven protocols.",
  },
  {
    id: "svc-microneedling",
    name: "Microneedling",
    category: "aesthetic",
    price: 60000,
    durationMinutes: 50,
    description:
      "Collagen-induction therapy to improve texture, fine lines, and acne scarring.",
  },
  {
    id: "svc-botox-filler",
    name: "Botox & Dermal Filler",
    category: "aesthetic",
    price: 85000,
    durationMinutes: 45,
    description:
      "Physician-administered injectables for a naturally refreshed appearance.",
  },
];

export const medicalServices = services.filter((s) => s.category === "medical");
export const aestheticServices = services.filter((s) => s.category === "aesthetic");

export function getServiceById(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}
