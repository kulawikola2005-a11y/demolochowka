import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { resend, getMailFrom } from "@/lib/resendClient";
import { guestStatusEmail } from "@/lib/emailTemplates";

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  const body = await req.json().catch(() => null);
  const action = body?.action as "confirm" | "cancel" | undefined;

  if (!action) {
    return NextResponse.json({ ok: false, error: "Brak action." }, { status: 400 });
  }

  const newStatus = action === "confirm" ? "confirmed" : "cancelled";

  // pobierz rezerwację (do maila)
  const { data: existing, error: eErr } = await supabaseAdmin
    .from("bookings")
    .select("id,name,email,check_in,check_out,guests,pets,total_price,currency,notes,status")
    .eq("id", id)
    .single();

  if (eErr) return NextResponse.json({ ok: false, error: eErr.message }, { status: 500 });

  const { error: uErr } = await supabaseAdmin
    .from("bookings")
    .update({ status: newStatus })
    .eq("id", id);

  if (uErr) return NextResponse.json({ ok: false, error: uErr.message }, { status: 500 });

  // mail do klienta o zmianie statusu
  try {
    if (resend) {
      const from = getMailFrom();
      const mail = guestStatusEmail({
        name: existing.name,
        email: existing.email,
        checkIn: existing.check_in,
        checkOut: existing.check_out,
        guests: existing.guests,
        pets: existing.pets,
        total: existing.total_price,
        currency: existing.currency,
        status: newStatus,
      });
      await resend.emails.send({
        from,
        to: existing.email,
        subject: mail.subject,
        html: mail.html,
        text: mail.text,
      });
    }
  } catch (err) {
    console.log("Status email failed:", err);
  }

  return NextResponse.json({ ok: true, status: newStatus });
}
