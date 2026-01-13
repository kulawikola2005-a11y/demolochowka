import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("bookings")
    .select("id,created_at,name,email,phone,check_in,check_out,guests,pets,total_price,currency,status,notes")
    .order("check_in", { ascending: true });

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, bookings: data ?? [] });
}
