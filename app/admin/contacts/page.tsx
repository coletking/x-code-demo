"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useContacts } from "@/lib/hooks/useContacts";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PageLoader } from "@/components/ui/Spinner";
import { AddContactModal } from "@/components/admin/AddContactModal";

export default function AdminContactsPage() {
  const { contacts, isLoading, addContact, markResponded } = useContacts();
  const [createOpen, setCreateOpen] = useState(false);

  if (isLoading) return <PageLoader label="Loading contacts…" />;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-primary-950">Contacts</h1>
          <p className="mt-1 text-sm text-primary-900/60">
            Inquiries from the website contact form, plus anything logged manually.
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <Plus size={16} /> Add Contact
        </Button>
      </div>

      <div className="mt-5 space-y-3">
        {contacts.map((contact) => (
          <Card key={contact.id} className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-primary-950">{contact.name}</p>
                  <Badge
                    className={
                      contact.status === "new"
                        ? "bg-amber-100 text-amber-800 ring-1 ring-amber-300"
                        : "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-300"
                    }
                  >
                    {contact.status === "new" ? "New" : "Responded"}
                  </Badge>
                  <Badge className="bg-primary-50 text-primary-700 ring-1 ring-primary-200">
                    {contact.source === "contact-form" ? "Website form" : "Manual entry"}
                  </Badge>
                </div>
                <p className="mt-0.5 text-xs text-primary-900/50">
                  {contact.email} · {contact.phone} ·{" "}
                  {new Date(contact.createdAt).toLocaleString()}
                </p>
              </div>
              {contact.status === "new" && (
                <button
                  onClick={() => markResponded(contact.id)}
                  className="shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-medium text-primary-700 hover:bg-primary-50"
                >
                  Mark responded
                </button>
              )}
            </div>
            <p className="mt-3 text-sm text-primary-900/75">{contact.message}</p>
          </Card>
        ))}

        {contacts.length === 0 && (
          <Card className="p-10 text-center text-sm text-primary-900/50">
            No contact messages yet.
          </Card>
        )}
      </div>

      <AddContactModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={async (input) => {
          await addContact({ ...input, source: "manual" });
        }}
      />
    </div>
  );
}
