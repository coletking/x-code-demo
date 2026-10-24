import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-primary-950 text-primary-100">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="font-display text-lg text-white">
              The Luxe <span className="text-gold-400">Medical Clinic</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-primary-200/80">
              Primary care, diagnostics, and advanced aesthetics — under one
              modern, physician-led roof.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Explore</p>
            <ul className="mt-3 space-y-2 text-sm text-primary-200/80">
              <li><Link href="/services" className="hover:text-gold-300">Services</Link></li>
              <li><Link href="/insurance" className="hover:text-gold-300">Insurance</Link></li>
              <li><Link href="/about" className="hover:text-gold-300">About the clinic</Link></li>
              <li><Link href="/account/book" className="hover:text-gold-300">Book an appointment</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Patients</p>
            <ul className="mt-3 space-y-2 text-sm text-primary-200/80">
              <li><Link href="/login" className="hover:text-gold-300">Patient login</Link></li>
              <li><Link href="/register" className="hover:text-gold-300">Create an account</Link></li>
              <li><Link href="/contact" className="hover:text-gold-300">Contact us</Link></li>
            </ul>
          </div>

          <div className="space-y-3 text-sm text-primary-200/80">
            <p className="text-sm font-semibold text-white">Visit us</p>
            <p className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold-400" />
              12 Admiralty Way, Lekki Phase 1, Lagos
            </p>
            <p className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-gold-400" />
              +234 800 LUXE MED
            </p>
            <p className="flex items-center gap-2">
              <Mail size={16} className="shrink-0 text-gold-400" />
              hello@theluxemedicalclinic.com
            </p>
            <p className="flex items-center gap-2">
              <Clock size={16} className="shrink-0 text-gold-400" />
              Mon–Sat, 9:00 AM – 6:00 PM
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-primary-300/70 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} The Luxe Medical Clinic. All rights reserved.</p>
          <p>Demo build — x-demo · for proposal review only.</p>
        </div>
      </div>
    </footer>
  );
}
