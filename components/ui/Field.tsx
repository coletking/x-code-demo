import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

const fieldClasses =
  "w-full rounded-xl border border-primary-900/10 bg-white px-4 py-2.5 text-sm text-primary-950 placeholder:text-primary-900/40 shadow-sm transition focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20";

function Label({ children }: { children: ReactNode }) {
  return (
    <label className="mb-1.5 block text-sm font-medium text-primary-900">
      {children}
    </label>
  );
}

export function TextField({
  label,
  className,
  ...props
}: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <Label>{label}</Label>
      <input className={cn(fieldClasses, className)} {...props} />
    </div>
  );
}

export function TextAreaField({
  label,
  className,
  ...props
}: { label: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <Label>{label}</Label>
      <textarea className={cn(fieldClasses, "min-h-28 resize-none", className)} {...props} />
    </div>
  );
}

export function SelectField({
  label,
  className,
  children,
  ...props
}: { label: string; children: ReactNode } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <Label>{label}</Label>
      <select className={cn(fieldClasses, "appearance-none", className)} {...props}>
        {children}
      </select>
    </div>
  );
}
