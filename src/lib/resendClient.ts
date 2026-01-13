import { Resend } from "resend";

export const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export function getMailFrom() {
  // musi być zweryfikowany adres/domena w Resend
  return process.env.BOOKING_FROM || "Domek w Krynicy <onboarding@resend.dev>";
}

export function getNotifyTo() {
  // gdzie mają przychodzić powiadomienia
  return process.env.BOOKING_NOTIFY_TO || "";
}
