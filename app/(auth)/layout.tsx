import Link from "next/link";
import { Stethoscope } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-primary-50/60 px-5 py-16">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-800 text-gold-300">
            <Stethoscope size={18} strokeWidth={2.2} />
          </span>
          <span className="font-display text-lg tracking-tight text-primary-950">
            The Luxe <span className="text-gold-600">Medical Clinic</span>
          </span>
        </Link>
        {children}
      </div>
    </main>
  );
}
