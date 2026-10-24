"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { TextField, TextAreaField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { useContacts } from "@/lib/hooks/useContacts";
import { useToast } from "@/components/ui/Toast";

export function ContactForm() {
  const { addContact } = useContacts();
  const toast = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-primary-900/8 bg-primary-50/60 p-10 text-center">
        <CheckCircle2 size={36} className="text-primary-600" />
        <h3 className="mt-4 font-display text-xl text-primary-950">
          Message received
        </h3>
        <p className="mt-2 max-w-sm text-sm text-primary-900/65">
          Thank you, {form.name.split(" ")[0] || "there"}. Our team will get
          back to you shortly.
        </p>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addContact({ ...form, source: "contact-form" });
      toast.success("Message sent — we'll be in touch shortly.");
      setSubmitted(true);
    } catch {
      toast.error("Couldn't send your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="space-y-4 rounded-2xl border border-primary-900/8 bg-white p-6 shadow-[0_2px_10px_-6px_rgba(15,33,31,0.12)] sm:p-8"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Full name"
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />
        <TextField
          label="Phone number"
          required
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
        />
      </div>
      <TextField
        label="Email address"
        type="email"
        required
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
      />
      <TextAreaField
        label="How can we help?"
        required
        value={form.message}
        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
      />
      <Button type="submit" className="w-full" loading={isSubmitting}>
        Send message
      </Button>
    </form>
  );
}
