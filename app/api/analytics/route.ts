import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth-server";
import { getAcquisitionBreakdown, recordEvent } from "@/lib/repositories/analyticsRepository";
import type { AcquisitionSource } from "@/lib/models/types";

export async function GET() {
  const session = await getSessionUser();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const breakdown = await getAcquisitionBreakdown();
  return NextResponse.json({ breakdown });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { source, referrer, path } = body as {
    source?: AcquisitionSource;
    referrer?: string;
    path?: string;
  };
  if (!source) return NextResponse.json({ error: "Source is required." }, { status: 400 });

  await recordEvent({ source, referrer: referrer ?? "(none)", path: path ?? "/" });
  return NextResponse.json({ ok: true }, { status: 201 });
}
