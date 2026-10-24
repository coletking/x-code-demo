import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
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

export function SelectBox({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <div className="relative">
      <select
        className={cn(fieldClasses, "appearance-none pr-9 cursor-pointer", className)}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        size={15}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-primary-900/40"
      />
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
      <SelectBox className={className} {...props}>
        {children}
      </SelectBox>
    </div>
  );
}
