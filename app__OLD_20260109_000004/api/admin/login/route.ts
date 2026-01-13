import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const key = body?.key as string | undefined;

  const adminKey = process.env.ADMIN_KEY;
  if (!adminKey) {
    return NextResponse.json({ ok: false, error: "ADMIN_KEY not set" }, { status: 500 });
  }

  if (!key || key !== adminKey) {
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
