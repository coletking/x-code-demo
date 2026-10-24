"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { useUsers } from "@/lib/hooks/useUsers";
import { useAllOrders } from "@/lib/hooks/useOrders";
import type { PublicUser } from "@/lib/hooks/useUsers";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PageLoader } from "@/components/ui/Spinner";
import { UserStatusBadge } from "@/components/shared/StatusBadge";
import { CreateUserModal } from "@/components/admin/CreateUserModal";
import { UserDetailModal } from "@/components/admin/UserDetailModal";

export default function AdminUsersPage() {
  const { users, isLoading, setStatus, addUser } = useUsers();
  const { orders } = useAllOrders();
  const [search, setSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<PublicUser | null>(null);

  if (isLoading) return <PageLoader label="Loading users…" />;

  const filtered = users.filter((u) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
  });

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-primary-950">Users</h1>
          <p className="mt-1 text-sm text-primary-900/60">
            All registered patients and admins.
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <Plus size={16} /> Create User
        </Button>
      </div>

      <div className="relative mt-6 max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-900/40" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email…"
          className="w-full rounded-xl border border-primary-900/10 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
        />
      </div>

      <Card className="mt-5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead>
              <tr className="border-b border-primary-900/8 text-xs text-primary-900/50">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Role</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Joined</th>
                <th className="px-5 py-3 font-medium" />
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-900/6">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-primary-50/50">
                  <td className="px-5 py-3">
                    <p className="font-medium text-primary-950">{u.name}</p>
                    <p className="text-xs text-primary-900/50">{u.email}</p>
                  </td>
                  <td className="px-5 py-3 capitalize text-primary-900/70">{u.role}</td>
                  <td className="px-5 py-3">
                    <UserStatusBadge status={u.status} />
                  </td>
                  <td className="px-5 py-3 text-primary-900/60">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3 text-right">
                    {u.role === "patient" && (
                      <button
                        onClick={() => setSelectedUser(u)}
                        className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-primary-700 hover:bg-primary-50"
                      >
                        Manage
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-sm text-primary-900/50">
                    No users match this search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <CreateUserModal open={createOpen} onClose={() => setCreateOpen(false)} onCreate={addUser} />

      <UserDetailModal
        user={selectedUser}
        orders={orders.filter((o) => o.userId === selectedUser?.id)}
        onClose={() => setSelectedUser(null)}
        onSetStatus={async (id, status) => {
          await setStatus(id, status);
          setSelectedUser((prev) => (prev && prev.id === id ? { ...prev, status } : prev));
        }}
      />
    </div>
  );
}
