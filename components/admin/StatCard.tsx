import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function StatCard({
  icon: Icon,
  label,
  value,
  tone = "primary",
  href,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  tone?: "primary" | "gold";
  href?: string;
}) {
  const content = (
    <Card
      className={`p-5 ${href ? "transition-all hover:-translate-y-0.5 hover:shadow-md" : ""}`}
    >
      <div className="flex items-start justify-between">
        <span
          className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${
            tone === "primary" ? "bg-primary-50 text-primary-700" : "bg-gold-50 text-gold-600"
          }`}
        >
          <Icon size={18} />
        </span>
        {href && <ArrowRight size={14} className="mt-1 text-primary-900/30" />}
      </div>
      <p className="mt-3 font-display text-2xl text-primary-950">{value}</p>
      <p className="mt-0.5 text-xs text-primary-900/55">{label}</p>
    </Card>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}
