import { NextResponse } from "next/server";
import { z } from "zod";
import { resend, getMailFrom, getNotifyTo } from "@/lib/resendClient";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(5),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Niepoprawne dane." }, { status: 400 });
  }

  const notifyTo = getNotifyTo();
  if (!notifyTo) return NextResponse.json({ ok: false, error: "Brak BOOKING_NOTIFY_TO." }, { status: 500 });

  try {
    if (!resend) return NextResponse.json({ ok: true }); // w dev “udajemy”, żeby demo działało
    await resend.emails.send({
      from: getMailFrom(),
      to: notifyTo,
      subject: `Wiadomość z formularza: ${parsed.data.name}`,
      text: `Od: ${parsed.data.name} <${parsed.data.email}>\n\n${parsed.data.message}`,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Nie udało się wysłać." }, { status: 500 });
  }
}
