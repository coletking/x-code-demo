"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Stethoscope } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { useAuth } from "@/lib/hooks/AuthProvider";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/insurance", label: "Insurance" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { user, logout, isLoading } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-md shadow-[0_1px_0_0_rgba(15,33,31,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-800 text-gold-300">
            <Stethoscope size={18} strokeWidth={2.2} />
          </span>
          <span className="font-display text-lg tracking-tight text-primary-950">
            The Luxe <span className="text-gold-600">Medical Clinic</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative text-sm font-medium transition-colors ${
                  active ? "text-primary-800" : "text-primary-900/70 hover:text-primary-800"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-[1.5px] bg-gold-500 transition-all ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {!isLoading && user ? (
            <>
              <LinkButton
                href={user.role === "admin" ? "/admin" : "/account"}
                variant="ghost"
                size="sm"
              >
                {user.role === "admin" ? "Admin Dashboard" : "My Account"}
              </LinkButton>
              <button
                onClick={logout}
                className="text-sm font-medium text-primary-900/60 hover:text-primary-900"
              >
                Log out
              </button>
            </>
          ) : (
            <LinkButton href="/login" variant="ghost" size="sm">
              Log in
            </LinkButton>
          )}
          <LinkButton href="/account/book" size="sm">
            Book Appointment
          </LinkButton>
        </div>

        <button
          className="rounded-lg p-2 text-primary-900 lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-primary-900/10 bg-white lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-primary-900 hover:bg-primary-50"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 flex flex-col gap-2 border-t border-primary-900/10 pt-3">
                {!isLoading && user ? (
                  <>
                    <LinkButton href={user.role === "admin" ? "/admin" : "/account"} variant="outline">
                      {user.role === "admin" ? "Admin Dashboard" : "My Account"}
                    </LinkButton>
                    <button
                      onClick={logout}
                      className="rounded-xl px-3 py-2 text-sm font-medium text-primary-900/70 hover:bg-primary-50"
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <LinkButton href="/login" variant="outline">
                    Log in
                  </LinkButton>
                )}
                <LinkButton href="/account/book">Book Appointment</LinkButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
