import type { SessionPayload } from "@/lib/models/types";

export const SESSION_COOKIE_NAME = "luxe_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

export function encodeSession(payload: SessionPayload): string {
  return JSON.stringify(payload);
}

// The Node (Route Handler) and Edge (middleware) cookie APIs don't percent-decode
// a stored value the same number of times, so a value written via one can arrive
// at the other still partially encoded. Unwrap defensively instead of assuming one layer.
export function decodeSession(raw: string | undefined | null): SessionPayload | null {
  if (!raw) return null;
  let candidate = raw;
  for (let i = 0; i < 3; i++) {
    try {
      return JSON.parse(candidate) as SessionPayload;
    } catch {
      try {
        const decoded = decodeURIComponent(candidate);
        if (decoded === candidate) return null;
        candidate = decoded;
      } catch {
        return null;
      }
    }
  }
  return null;
}
