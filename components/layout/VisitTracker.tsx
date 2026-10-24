"use client";

import { useEffect } from "react";
import { trackFirstVisit } from "@/lib/analytics";

export function VisitTracker() {
  useEffect(() => {
    trackFirstVisit();
  }, []);

  return null;
}
