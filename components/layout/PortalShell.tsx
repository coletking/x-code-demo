"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { LogOut, Menu, Stethoscope, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useAuth } from "@/lib/hooks/AuthProvider";
import { cn } from "@/lib/utils/cn";

export interface PortalNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
}

export function PortalShell({
  navItems,
  badge,
  children,
}: {
  navItems: PortalNavItem[];
  badge: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  return (
    <div className="flex min-h-screen bg-primary-50/40">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-primary-900/8 bg-white lg:flex">
        <Link href="/" className="flex items-center gap-2.5 px-6 py-6">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-800 text-gold-300">
            <Stethoscope size={18} strokeWidth={2.2} />
          </span>
          <span className="font-display text-base leading-tight text-primary-950">
            The Luxe <span className="block text-xs font-sans font-medium text-gold-600">{badge}</span>
          </span>
        </Link>

        <nav className="flex-1 space-y-1 px-3">
          {navItems.map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary-800 text-white shadow-sm"
                    : "text-primary-900/70 hover:bg-primary-50"
                )}
              >
                <item.icon size={17} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-primary-900/8 p-4">
          {!isLoading && user && (
            <div className="mb-3 px-1">
              <p className="truncate text-sm font-medium text-primary-950">{user.name}</p>
              <p className="truncate text-xs text-primary-900/50">{user.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-primary-900/70 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut size={16} /> Log out
          </button>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-primary-900/8 bg-white px-5 py-4 lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-800 text-gold-300">
              <Stethoscope size={15} />
            </span>
            <span className="font-display text-sm text-primary-950">{badge}</span>
          </Link>
          <button onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </header>

        {mobileOpen && (
          <div className="border-b border-primary-900/8 bg-white px-4 py-3 lg:hidden">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium",
                      active ? "bg-primary-800 text-white" : "text-primary-900/70 hover:bg-primary-50"
                    )}
                  >
                    <item.icon size={17} />
                    {item.label}
                  </Link>
                );
              })}
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-primary-900/70 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut size={16} /> Log out
              </button>
            </nav>
          </div>
        )}

        <main className="flex-1 px-5 py-8 lg:px-10 lg:py-10">{children}</main>
      </div>
    </div>
  );
}
