"use client";

import { CalendarRange, LayoutDashboard, MessageSquare, Users } from "lucide-react";
import { PortalShell, type PortalNavItem } from "@/components/layout/PortalShell";

const navItems: PortalNavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/orders", label: "Orders", icon: CalendarRange },
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
