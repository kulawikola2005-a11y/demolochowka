"use client";

import { useEffect, useState } from "react";

type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  check_in: string;
  check_out: string;
  guests: number | null;
  pets: boolean | null;
  total_price: number | null;
  currency: string | null;
  status: string;
  notes: string | null;
};

type Block = {
  id: string;
  check_in: string;
  check_out: string;
  reason: string | null;
};

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [msg, setMsg] = useState<string | null>(null);

  // blokady form
  const [bIn, setBIn] = useState("");
  const [bOut, setBOut] = useState("");
  const [reason, setReason] = useState("");

    async function refresh() {
    setMsg(null);
    try {
      const [brRes, blRes] = await Promise.all([
        fetch("/api/admin/bookings", { cache: "no-store" }),
        fetch("/api/admin/blocks", { cache: "no-store" }),
      ]);

      // jeśli middleware zwróci 401, przerzuć na login
      if (brRes.status === 401 || blRes.status === 401) {
        window.location.href = "/admin/login?next=%2Fadmin";
        return;
      }

      const br = await brRes.json().catch(() => null);
      const bl = await blRes.json().catch(() => null);

      if (br?.ok) setBookings(br.bookings ?? []);
      else setMsg(br?.error ?? "Błąd /api/admin/bookings");

      if (bl?.ok) setBlocks(bl.blocks ?? []);
      else setMsg(bl?.error ?? "Błąd /api/admin/blocks");
    } catch (e) {
      console.log(e);
      setMsg("Nie mogę pobrać danych admina (sprawdź /api/admin/*).");
    }
  }

  useEffect(() => { refresh(); }, []);

  async function setStatus(id: string, action: "confirm" | "cancel") {
    setMsg(null);
    const res = await fetch(`/api/admin/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    const data = await res.json();
    if (!data.ok) {
      setMsg("Nie udało się zmienić statusu.");
      return;
    }
    await refresh();
  }

  async function addBlock() {
    setMsg(null);
    const res = await fetch("/api/admin/blocks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checkIn: bIn, checkOut: bOut, reason }),
    });
    const data = await res.json();
    if (res.status === 409) {
      setMsg(data.message ?? "Konflikt terminu.");
      return;
    }
    if (!data.ok) {
      setMsg("Nie udało się dodać blokady.");
      return;
    }
    setBIn(""); setBOut(""); setReason("");
    await refresh();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Admin</h1>
        <button onClick={logout} className="rounded-xl border px-4 py-2 text-sm">
          Wyloguj
        </button>
      </div>

      {msg && <p className="mt-3 text-sm text-red-600">{msg}</p>}

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Rezerwacje</h2>
        <div className="mt-3 overflow-x-auto rounded-2xl border">
          <table className="min-w-[900px] w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3">Termin</th>
                <th className="text-left p-3">Klient</th>
                <th className="text-left p-3">Goście</th>
                <th className="text-left p-3">Cena</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id} className="border-t">
                  <td className="p-3">{b.check_in} → {b.check_out}</td>
                  <td className="p-3">
                    <div className="font-medium">{b.name}</div>
                    <div className="text-gray-600">{b.email}</div>
                  </td>
                  <td className="p-3">
                    {b.guests ?? "—"} {b.pets ? "🐾" : ""}
                  </td>
                  <td className="p-3">
                    {b.total_price ? `${b.total_price} ${b.currency ?? "PLN"}` : "—"}
                  </td>
                  <td className="p-3">
                    <span className="rounded-lg border px-2 py-1">
                      {b.status}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      className="btn-primary"
                      onClick={() => setStatus(b.id, "confirm")}
                      disabled={b.status === "confirmed"}
                    >
                      Potwierdź
                    </button>
                    <button
                      className="rounded-xl border px-3 py-2"
                      onClick={() => setStatus(b.id, "cancel")}
                      disabled={b.status === "cancelled"}
                    >
                      Anuluj
                    </button>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr><td className="p-3" colSpan={6}>Brak rezerwacji.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Blokady terminów</h2>

        <div className="mt-3 grid gap-3 md:grid-cols-4">
          <input className="rounded-xl border px-3 py-2" placeholder="checkIn YYYY-MM-DD" value={bIn} onChange={(e)=>setBIn(e.target.value)} />
          <input className="rounded-xl border px-3 py-2" placeholder="checkOut YYYY-MM-DD" value={bOut} onChange={(e)=>setBOut(e.target.value)} />
          <input className="rounded-xl border px-3 py-2" placeholder="Powód (opcjonalnie)" value={reason} onChange={(e)=>setReason(e.target.value)} />
          <button className="btn-primary" onClick={addBlock}>
            Dodaj blokadę
          </button>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {blocks.map(bl => (
            <div key={bl.id} className="rounded-2xl border p-4">
              <div className="font-medium">{bl.check_in} → {bl.check_out}</div>
              <div className="text-sm text-gray-600">{bl.reason ?? "—"}</div>
            </div>
          ))}
          {blocks.length === 0 && (
            <p className="text-sm text-gray-600">Brak blokad.</p>
          )}
        </div>
      </section>
    </main>
  );
}
