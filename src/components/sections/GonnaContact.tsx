"use client";

import { useState } from "react";
import { site } from "@/data/site";

export default function GonnaContact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  async function send() {
    setMsg(null);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });
    const data = await res.json();
    if (!data.ok) return setMsg("Nie udało się wysłać. Spróbuj ponownie.");
    setName("");
    setEmail("");
    setMessage("");
    setMsg("Wysłane — odezwiemy się najszybciej jak to możliwe.");
  }

  const waDigits = site.whatsapp.replace(/\D/g, "");

  return (
    <section id="kontakt" className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="text-3xl font-semibold">Kontakt</h2>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="card-soft p-6">
          <p className="text-neutral-700">
            <b>Adres:</b> {site.addressLabel}
          </p>
          <p className="mt-2 text-neutral-700">
            <b>WhatsApp:</b>{" "}
            <a className="underline" href={`https://wa.me/${waDigits}`} target="_blank" rel="noreferrer">
              {site.whatsapp}
            </a>
          </p>
          <p className="mt-2 text-neutral-700">
            <b>Email:</b>{" "}
            <a className="underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>

          <div className="mt-6 rounded-2xl border p-4 text-sm text-neutral-600">
            Tip do demo: w opisie powiedz klientowi “domena podpinana po akceptacji”.
          </div>
        </div>

        <div className="card-soft p-6">
          <div className="grid gap-3">
            <input
              className="rounded-xl border px-3 py-2"
              placeholder="Imię"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="rounded-xl border px-3 py-2"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              className="rounded-xl border px-3 py-2 min-h-[120px]"
              placeholder="Treść wiadomości"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={send} className="btn-primary">
              Wyślij
            </button>
            {msg && <p className="text-sm text-neutral-700">{msg}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
