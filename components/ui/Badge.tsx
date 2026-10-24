import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function Badge({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap",
        className
      )}
    >
      {children}
    </span>
  );
}
