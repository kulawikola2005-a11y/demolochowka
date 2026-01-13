import { Resend } from "resend";

export const resend =
  process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export function getMailFrom() {
  return process.env.BOOKING_FROM || "rezerwacje@example.com";
}

export function getNotifyTo() {
  return process.env.BOOKING_NOTIFY_TO || "";
}
