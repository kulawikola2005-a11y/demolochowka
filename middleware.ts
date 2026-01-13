import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

async function sha256Hex(text: string) {
  const enc = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, "0")).join("");
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // wyjątki: login
  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  const isProtected =
    pathname.startsWith("/admin") || pathname.startsWith("/api/admin");

  if (!isProtected) return NextResponse.next();

  const key = process.env.ADMIN_KEY;
  if (!key) {
    return NextResponse.json({ ok: false, error: "ADMIN_KEY not set" }, { status: 500 });
  }

  const expected = await sha256Hex(key);
  const cookie = req.cookies.get("admin_auth")?.value;

  if (cookie === expected) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
