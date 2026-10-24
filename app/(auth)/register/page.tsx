"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { TextField } from "@/components/ui/Field";
import { Button, LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/lib/hooks/AuthProvider";
import { useToast } from "@/components/ui/Toast";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const toast = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const result = await register(form);
      if (!result.ok) {
        const message = result.error ?? "Unable to create account.";
        setError(message);
        toast.error(message);
        return;
      }
      toast.success("Account created. Welcome to The Luxe Medical Clinic!");
      router.push("/account");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="p-7 sm:p-8">
      <h1 className="font-display text-2xl text-primary-950">Create your account</h1>
      <p className="mt-1 text-sm text-primary-900/60">
        Register to book appointments and track your visits.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <TextField
          label="Full name"
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />
        <TextField
          label="Email address"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        />
        <TextField
          label="Phone number"
          required
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
        />
        <TextField
          label="Password"
          type="password"
          required
          minLength={6}
          value={form.password}
          onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
        />

        {error && (
          <p className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            <AlertCircle size={16} className="shrink-0" />
            {error}
          </p>
        )}

        <Button type="submit" className="w-full" size="lg" loading={isSubmitting}>
          Create account
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-primary-900/60">
        Already have an account?{" "}
        <LinkButton href="/login" variant="ghost" size="sm" className="!px-1 !py-0 inline">
          Log in
        </LinkButton>
      </p>
    </Card>
  );
}
