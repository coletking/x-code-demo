"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function FloatingStatCard({
  icon: Icon,
  value,
  label,
  className,
  delay = 0,
}: {
  icon: LucideIcon;
  value: string;
  label: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "absolute z-10 flex items-center gap-3 rounded-2xl border border-primary-900/8 bg-white/95 px-4 py-3 shadow-[0_12px_30px_-10px_rgba(15,33,31,0.35)] backdrop-blur-sm",
        className
      )}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
        <Icon size={17} />
      </span>
      <div>
        <p className="font-display text-lg leading-none text-primary-950">{value}</p>
        <p className="mt-1 text-[11px] text-primary-900/55">{label}</p>
      </div>
    </motion.div>
  );
}

export function FloatingChecklist({
  items,
  className,
  delay = 0,
}: {
  items: string[];
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "absolute z-10 space-y-1.5 rounded-2xl border border-primary-900/8 bg-white/95 p-2.5 shadow-[0_12px_30px_-10px_rgba(15,33,31,0.35)] backdrop-blur-sm",
        className
      )}
    >
      {items.map((item) => (
        <div
          key={item}
          className="flex items-center gap-2 rounded-xl bg-primary-50/70 px-2.5 py-1.5 text-xs font-medium text-primary-900"
        >
          <CheckCircle2 size={14} className="shrink-0 text-primary-600" />
          {item}
        </div>
      ))}
    </motion.div>
  );
}

export function FloatingChip({
  icon: Icon,
  children,
  className,
}: {
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-white/50 bg-white/95 px-2.5 py-1.5 text-xs font-medium text-primary-900 shadow-[0_8px_20px_-8px_rgba(15,33,31,0.4)] backdrop-blur-sm",
        className
      )}
    >
      {Icon && <Icon size={13} className="text-primary-600" />}
      {children}
    </span>
  );
}
