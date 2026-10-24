import { Award, HeartHandshake, ShieldCheck, Users } from "lucide-react";
import { Reveal } from "@/components/marketing/Reveal";

const stats = [
  { icon: Users, label: "Patients cared for", value: "8,400+" },
  { icon: Award, label: "Years of combined physician experience", value: "35+" },
  { icon: ShieldCheck, label: "HMO & insurance partners", value: "5" },
  { icon: HeartHandshake, label: "Patient satisfaction", value: "97%" },
];

export function TrustBar() {
  return (
    <section className="border-y border-primary-900/8 bg-primary-50/60">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-10 sm:grid-cols-4 lg:px-8">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.06} className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <stat.icon className="text-gold-600" size={22} />
            <p className="mt-2 font-display text-2xl text-primary-950">{stat.value}</p>
            <p className="mt-1 text-xs text-primary-900/60">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
