"use client";

import { useEffect, useMemo, useState } from "react";

type QuoteOk = {
  ok: true;
  currency: string;
  nights: number;
  minNightsRequired: number;
  guests: number;
  pets: boolean;
  breakdown: {
    nightsTotal: number;
    cleaningFee: number;
    extraGuestTotal: number;
    petFee: number;
    total: number;
  };
};

export default function BookingWidget() {
  // dane kontaktowe
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  // daty (prosty input type=date)
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  // goście/pets + quote
  const [guests, setGuests] = useState(2);
  const [pets, setPets] = useState(false);
  const [quote, setQuote] = useState<QuoteOk | null>(null);

  const rangeOk = useMemo(() => {
    return !!checkIn && !!checkOut;
  }, [checkIn, checkOut]);

  // pobieraj wycenę przy zmianie dat/gości/pets
  useEffect(() => {
    (async () => {
      setQuote(null);
      setMsg(null);

      if (!rangeOk) return;

      const res = await fetch("/api/pricing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          checkIn,
          checkOut,
          guests,
          pets,
        }),
      });

      const data = await res.json().catch(() => null);
      if (data?.ok) setQuote(data as QuoteOk);
    })();
  }, [rangeOk, checkIn, checkOut, guests, pets]);

  async function submit() {
    setMsg(null);

    if (!name.trim() || name.trim().length < 2) {
      setMsg("Podaj imię (min 2 znaki).");
      return;
    }
    if (!email.includes("@")) {
      setMsg("Podaj poprawny email.");
      return;
    }
    if (!checkIn || !checkOut) {
      setMsg("Wybierz daty pobytu.");
      return;
    }

    if (quote?.ok && quote.minNightsRequired > quote.nights) {
      setMsg(`W tym okresie minimalnie: ${quote.minNightsRequired} nocy.`);
      return;
    }

    const payload = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      notes: notes.trim() || undefined,
      checkIn,
      checkOut,
      guests,
      pets,
    };

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => null);

    if (res.ok && data?.ok) {
      setMsg("✅ Zapytanie wysłane! Odezwę się z potwierdzeniem.");
    } else {
      setMsg(data?.message || data?.error || "Coś poszło nie tak. Spróbuj ponownie.");
    }
  }

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <div className="grid gap-4">
        <div>
          <h2 className="text-xl font-semibold">Sprawdź cenę i wyślij zapytanie</h2>
          <p className="mt-1 text-sm text-gray-600">
            Wybierz daty, liczbę gości i opcję zwierząt — pokażemy wycenę.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <label className="text-sm">
            Check-in
            <input
              type="date"
              className="mt-1 w-full rounded-xl border px-3 py-2"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </label>

          <label className="text-sm">
            Check-out
            <input
              type="date"
              className="mt-1 w-full rounded-xl border px-3 py-2"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </label>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <label className="text-sm">
            Liczba gości
            <input
              type="number"
              min={1}
              max={20}
              className="mt-1 w-full rounded-xl border px-3 py-2"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value || "1", 10))}
            />
          </label>

          <label className="text-sm flex items-center gap-2 mt-6 md:mt-0">
            <input
              type="checkbox"
              checked={pets}
              onChange={(e) => setPets(e.target.checked)}
            />
            Zwierzęta
          </label>
        </div>

        {quote?.ok && (
          <div className="rounded-2xl border p-4 text-sm">
            <div className="flex justify-between">
              <span>Nocy</span>
              <span>{quote.nights}</span>
            </div>
            <div className="flex justify-between">
              <span>Noclegi</span>
              <span>
                {quote.breakdown.nightsTotal} {quote.currency}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Sprzątanie</span>
              <span>
                {quote.breakdown.cleaningFee} {quote.currency}
              </span>
            </div>
            {quote.breakdown.extraGuestTotal > 0 && (
              <div className="flex justify-between">
                <span>Dodatkowi goście</span>
                <span>
                  {quote.breakdown.extraGuestTotal} {quote.currency}
                </span>
              </div>
            )}
            {quote.breakdown.petFee > 0 && (
              <div className="flex justify-between">
                <span>Zwierzęta</span>
                <span>
                  {quote.breakdown.petFee} {quote.currency}
                </span>
              </div>
            )}

            <div className="mt-3 flex justify-between font-semibold">
              <span>Razem</span>
              <span>
                {quote.breakdown.total} {quote.currency}
              </span>
            </div>

            {quote.minNightsRequired > quote.nights && (
              <p className="mt-2 text-red-600">
                W tym okresie minimalnie: {quote.minNightsRequired} nocy.
              </p>
            )}
          </div>
        )}

        <div className="grid gap-3 md:grid-cols-2">
          <label className="text-sm">
            Imię
            <input
              className="mt-1 w-full rounded-xl border px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Twoje imię"
            />
          </label>

          <label className="text-sm">
            Email
            <input
              className="mt-1 w-full rounded-xl border px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="twoj@email.com"
            />
          </label>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <label className="text-sm">
            Telefon (opcjonalnie)
            <input
              className="mt-1 w-full rounded-xl border px-3 py-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+48 ..."
            />
          </label>

          <label className="text-sm">
            Uwagi (opcjonalnie)
            <input
              className="mt-1 w-full rounded-xl border px-3 py-2"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="np. przyjazd późno wieczorem"
            />
          </label>
        </div>

        <button
          onClick={submit}
          className="btn-primary"
        >
          Wyślij rezerwację
        </button>

        {msg && <p className="text-sm text-gray-700">{msg}</p>}
      </div>
    </div>
  );
}
