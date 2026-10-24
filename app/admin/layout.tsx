"use client";

import { CalendarRange, LayoutDashboard, MessageSquare, ReceiptText, Users } from "lucide-react";
import { PortalShell, type PortalNavItem } from "@/components/layout/PortalShell";

const navItems: PortalNavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarRange },
  { href: "/admin/orders", label: "Orders", icon: ReceiptText },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/contacts", label: "Contacts", icon: MessageSquare },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalShell navItems={navItems} badge="Admin Dashboard">
      {children}
    </PortalShell>
  );
}
