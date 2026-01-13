import { NextResponse } from "next/server";
import crypto from "crypto";

const attempts = new Map<string, { count: number; ts: number }>();

export async function POST(req: Request) {
  // Rate limit (na instancję) – zanim sparsymy body
  const ip = (req.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 min
  const max = 10;

  const rec = attempts.get(ip);
  if (rec && now - rec.ts < windowMs && rec.count >= max) {
    return NextResponse.json(
      { ok: false, error: "Za dużo prób. Spróbuj później." },
      { status: 429 }
    );
  }
  if (!rec || now - rec.ts >= windowMs) {
    attempts.set(ip, { count: 0, ts: now });
  }

  const body = await req.json().catch(() => null);
  const key = body?.key as string | undefined;

  const adminKey = process.env.ADMIN_KEY;
  if (!adminKey) {
    return NextResponse.json({ ok: false, error: "ADMIN_KEY not set" }, { status: 500 });
  }

  if (!key || key !== adminKey) {
    const cur = attempts.get(ip)!;
    attempts.set(ip, { count: cur.count + 1, ts: cur.ts });

    return NextResponse.json({ ok: false, error: "Zły klucz." }, { status: 401 });
  }

  const token = crypto.createHash("sha256").update(adminKey).digest("hex");

  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_auth", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return res;
}
