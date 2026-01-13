type BookingMailData = {
  name: string;
  email: string;
  phone?: string | null;
  checkIn: string;   // YYYY-MM-DD
  checkOut: string;  // YYYY-MM-DD
  guests?: number | null;
  pets?: boolean | null;
  total?: number | null;
  currency?: string | null;
  notes?: string | null;
  status?: string | null;
};

export function guestNewBookingEmail(b: BookingMailData) {
  const subject = `Dziękujemy — otrzymaliśmy zgłoszenie rezerwacji (${b.checkIn} → ${b.checkOut})`;

  const html = `
  <div style="font-family:Arial,sans-serif;line-height:1.5">
    <h2>Hej ${escapeHtml(b.name)} 👋</h2>
    <p>Dziękujemy! Otrzymaliśmy Twoje zgłoszenie rezerwacji.</p>

    <h3>Szczegóły</h3>
    <ul>
      <li><b>Termin:</b> ${b.checkIn} → ${b.checkOut}</li>
      <li><b>Goście:</b> ${b.guests ?? "—"}</li>
      <li><b>Zwierzęta:</b> ${b.pets ? "Tak" : "Nie"}</li>
      ${b.total ? `<li><b>Szacunkowa kwota:</b> ${b.total} ${b.currency ?? "PLN"}</li>` : ""}
      <li><b>Status:</b> ${b.status ?? "pending"}</li>
    </ul>

    ${b.notes ? `<p><b>Wiadomość:</b><br/>${escapeHtml(b.notes)}</p>` : ""}

    <p>Odezwiemy się z potwierdzeniem dostępności (zwykle w ciągu 24h).</p>

    <p>Pozdrawiamy,<br/>Domek w Krynicy</p>
  </div>`;

  const text =
`Hej ${b.name}
Otrzymaliśmy zgłoszenie rezerwacji:
Termin: ${b.checkIn} -> ${b.checkOut}
Goście: ${b.guests ?? "-"}
Zwierzęta: ${b.pets ? "Tak" : "Nie"}
${b.total ? `Kwota: ${b.total} ${b.currency ?? "PLN"}` : ""}
Status: ${b.status ?? "pending"}

Pozdrawiamy,
Domek w Krynicy`;

  return { subject, html, text };
}

export function ownerNewBookingEmail(b: BookingMailData) {
  const subject = `NOWA rezerwacja (pending): ${b.checkIn} → ${b.checkOut} | ${b.name}`;

  const html = `
  <div style="font-family:Arial,sans-serif;line-height:1.5">
    <h2>Nowe zgłoszenie rezerwacji 🔔</h2>

    <ul>
      <li><b>Imię:</b> ${escapeHtml(b.name)}</li>
      <li><b>Email:</b> ${escapeHtml(b.email)}</li>
      ${b.phone ? `<li><b>Telefon:</b> ${escapeHtml(b.phone)}</li>` : ""}
      <li><b>Termin:</b> ${b.checkIn} → ${b.checkOut}</li>
      <li><b>Goście:</b> ${b.guests ?? "—"}</li>
      <li><b>Zwierzęta:</b> ${b.pets ? "Tak" : "Nie"}</li>
      ${b.total ? `<li><b>Kwota:</b> ${b.total} ${b.currency ?? "PLN"}</li>` : ""}
      <li><b>Status:</b> ${b.status ?? "pending"}</li>
    </ul>

    ${b.notes ? `<p><b>Wiadomość:</b><br/>${escapeHtml(b.notes)}</p>` : ""}

    <p>Wejdź do panelu admin: <b>/admin</b></p>
  </div>`;

  const text =
`Nowe zgłoszenie rezerwacji:
Imię: ${b.name}
Email: ${b.email}
Telefon: ${b.phone ?? "-"}
Termin: ${b.checkIn} -> ${b.checkOut}
Goście: ${b.guests ?? "-"}
Zwierzęta: ${b.pets ? "Tak" : "Nie"}
${b.total ? `Kwota: ${b.total} ${b.currency ?? "PLN"}` : ""}
Status: ${b.status ?? "pending"}

Panel admin: /admin`;

  return { subject, html, text };
}

export function guestStatusEmail(b: BookingMailData) {
  const status = b.status ?? "pending";
  const statusLabel =
    status === "confirmed" ? "POTWIERDZONA ✅" :
    status === "cancelled" ? "ANULOWANA ❌" : "W TRAKCIE";

  const subject = `Rezerwacja ${statusLabel}: ${b.checkIn} → ${b.checkOut}`;

  const html = `
  <div style="font-family:Arial,sans-serif;line-height:1.5">
    <h2>Hej ${escapeHtml(b.name)} 👋</h2>
    <p>Status Twojej rezerwacji: <b>${statusLabel}</b></p>

    <ul>
      <li><b>Termin:</b> ${b.checkIn} → ${b.checkOut}</li>
      <li><b>Goście:</b> ${b.guests ?? "—"}</li>
      <li><b>Zwierzęta:</b> ${b.pets ? "Tak" : "Nie"}</li>
      ${b.total ? `<li><b>Kwota:</b> ${b.total} ${b.currency ?? "PLN"}</li>` : ""}
    </ul>

    <p>Pozdrawiamy,<br/>Domek w Krynicy</p>
  </div>`;

  const text =
`Hej ${b.name}
Status rezerwacji: ${statusLabel}
Termin: ${b.checkIn} -> ${b.checkOut}
Pozdrawiamy, Domek w Krynicy`;

  return { subject, html, text };
}

function escapeHtml(s: string) {
  return s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
