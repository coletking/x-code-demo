import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-primary-900/5 bg-white shadow-[0_2px_10px_-4px_rgba(15,33,31,0.12)]",
        className
      )}
    >
      {children}
    </div>
  );
}
