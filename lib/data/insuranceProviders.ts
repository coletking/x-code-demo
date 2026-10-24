export interface InsuranceProvider {
  id: string;
  name: string;
  plans: string[];
  notes?: string;
}

export const insuranceProviders: InsuranceProvider[] = [
  {
    id: "ins-hygeia",
    name: "Hygeia HMO",
    plans: ["Silver", "Gold", "Platinum"],
    notes: "Direct billing available for consultations and diagnostics.",
  },
  {
    id: "ins-reliance",
    name: "Reliance HMO",
    plans: ["Classic", "Premium"],
    notes: "Pre-authorization required for aesthetic procedures.",
  },
  {
    id: "ins-avon",
    name: "AXA Mansard Health",
    plans: ["Essential", "Comprehensive"],
  },
  {
    id: "ins-leadway",
    name: "Leadway Health",
    plans: ["Standard", "Executive"],
  },
  {
    id: "ins-ahp",
    name: "Avon Healthcare",
    plans: ["Basic", "Family"],
    notes: "Covers routine screening and chronic disease management.",
  },
];
