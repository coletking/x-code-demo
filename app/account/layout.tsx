"use client";

import { CalendarPlus, LayoutGrid } from "lucide-react";
import { PortalShell, type PortalNavItem } from "@/components/layout/PortalShell";

const navItems: PortalNavItem[] = [
  { href: "/account", label: "My Orders", icon: LayoutGrid, exact: true },
  { href: "/account/book", label: "Book Appointment", icon: CalendarPlus },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalShell navItems={navItems} badge="Patient Portal">
      {children}
    </PortalShell>
  );
}
