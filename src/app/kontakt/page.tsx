export default function KontaktPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Kontakt</h1>
      <p className="mt-3 text-gray-700">
        Napisz do nas w sprawie rezerwacji lub pytań o pobyt.
      </p>

      <div className="mt-6 rounded-2xl border p-6 space-y-2">
        <p><b>Email:</b> twoj@email.pl</p>
        <p><b>Telefon:</b> +48 XXX XXX XXX</p>
        <p><b>Lokalizacja:</b> Krynica-Zdrój</p>
      </div>

      <p className="mt-6 text-sm text-gray-600">
        (Opcjonalnie: dodamy mapę i dojazd w kolejnym kroku.)
      </p>
    </main>
  );
}
