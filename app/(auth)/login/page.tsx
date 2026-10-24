"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, Info } from "lucide-react";
import { TextField } from "@/components/ui/Field";
import { Button, LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/lib/hooks/AuthProvider";
import { useToast } from "@/components/ui/Toast";
import {
  DEMO_ADMIN_EMAIL,
  DEMO_ADMIN_PASSWORD,
  DEMO_PATIENT_EMAIL,
  DEMO_PATIENT_PASSWORD,
} from "@/lib/demoAccounts";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { login } = useAuth();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const result = await login(email, password);
      if (!result.ok) {
        const message = result.error ?? "Unable to log in.";
        setError(message);
        toast.error(message);
        return;
      }
      toast.success("Welcome back!");
      const redirect = params.get("redirect");
      if (redirect) {
        router.push(redirect);
        return;
      }
      const isAdmin = email.trim().toLowerCase() === DEMO_ADMIN_EMAIL;
      router.push(isAdmin ? "/admin" : "/account");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="p-7 sm:p-8">
      <h1 className="font-display text-2xl text-primary-950">Welcome back</h1>
      <p className="mt-1 text-sm text-primary-900/60">
        Log in to manage your appointments.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <TextField
          label="Email address"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            <AlertCircle size={16} className="shrink-0" />
            {error}
          </p>
        )}

        <Button type="submit" className="w-full" size="lg" loading={isSubmitting}>
          Log in
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-primary-900/60">
        No account yet?{" "}
        <LinkButton href="/register" variant="ghost" size="sm" className="!px-1 !py-0 inline">
          Register
        </LinkButton>
      </p>

      <div className="mt-6 rounded-xl bg-primary-50/80 p-4 text-xs text-primary-900/70">
        <p className="flex items-center gap-1.5 font-medium text-primary-900">
          <Info size={14} /> Demo accounts
        </p>
        <p className="mt-1.5">
          Admin — {DEMO_ADMIN_EMAIL} / {DEMO_ADMIN_PASSWORD}
        </p>
        <p>
          Patient — {DEMO_PATIENT_EMAIL} / {DEMO_PATIENT_PASSWORD}
        </p>
      </div>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
