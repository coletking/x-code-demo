import type { AcquisitionSource } from "@/lib/models/types";

const FIRST_TOUCH_COOKIE = "luxe_first_touch";

function classifySource(referrer: string, utmSource: string | null): AcquisitionSource {
  if (utmSource) {
    const normalized = utmSource.toLowerCase();
    if (normalized.includes("google")) return "Google";
    if (["facebook", "instagram", "tiktok", "twitter", "x"].some((s) => normalized.includes(s)))
      return "Social";
    return "Referral";
  }
  if (!referrer) return "Direct";
  try {
    const host = new URL(referrer).hostname.toLowerCase();
    if (host.includes("google")) return "Google";
    if (["facebook", "instagram", "tiktok", "twitter", "x.com"].some((s) => host.includes(s)))
      return "Social";
    return "Referral";
  } catch {
    return "Other";
  }
}

function hasFirstTouchCookie(): boolean {
  return document.cookie
    .split(";")
    .some((part) => part.trim().startsWith(`${FIRST_TOUCH_COOKIE}=`));
}

function setFirstTouchCookie(source: AcquisitionSource): void {
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `${FIRST_TOUCH_COOKIE}=${source}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function trackFirstVisit(): void {
  if (typeof window === "undefined") return;
  if (hasFirstTouchCookie()) return;

  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source");
  const referrer = document.referrer;
  const source = classifySource(referrer, utmSource);

  setFirstTouchCookie(source);
  fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source,
      referrer: referrer || "(none)",
      path: window.location.pathname,
    }),
  }).catch(() => {});
}
