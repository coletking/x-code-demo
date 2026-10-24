import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/hooks/AuthProvider";
import { VisitTracker } from "@/components/layout/VisitTracker";
import { ToastProvider } from "@/components/ui/Toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: {
    default: "The Luxe Medical Clinic — Primary Care & Aesthetics",
    template: "%s | The Luxe Medical Clinic",
  },
  description:
    "The Luxe Medical Clinic offers physician-led primary care, diagnostics, and advanced aesthetic medicine in Lagos. Book your appointment online.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <ToastProvider>
          <AuthProvider>
            <VisitTracker />
            {children}
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
