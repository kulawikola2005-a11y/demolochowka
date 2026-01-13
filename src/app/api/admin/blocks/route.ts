import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

function overlaps(aStart: string, aEnd: string, bStart: string, bEnd: string) {
  return aStart < bEnd && aEnd > bStart;
}

const createSchema = z.object({
  checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  reason: z.string().optional(),
});

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("blocks")
    .select("id,check_in,check_out,reason,created_at")
    .order("check_in", { ascending: true });

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, blocks: data ?? [] });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = createSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Niepoprawne dane." }, { status: 400 });
  }

  const { checkIn, checkOut, reason } = parsed.data;

  // konflikt z rezerwacjami i blokadami
  const { data: bookings } = await supabaseAdmin
    .from("bookings")
    .select("check_in,check_out,status")
    .neq("status", "cancelled");

  const { data: blocks } = await supabaseAdmin
    .from("blocks")
    .select("check_in,check_out");

  const conflictBooking = (bookings ?? []).some((r) =>
    overlaps(checkIn, checkOut, r.check_in, r.check_out)
  );
  const conflictBlock = (blocks ?? []).some((r) =>
    overlaps(checkIn, checkOut, r.check_in, r.check_out)
  );

  if (conflictBooking || conflictBlock) {
    return NextResponse.json({ ok: false, message: "Konflikt terminu." }, { status: 409 });
  }

  const { error } = await supabaseAdmin.from("blocks").insert([
    { check_in: checkIn, check_out: checkOut, reason: reason || null },
  ]);

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
