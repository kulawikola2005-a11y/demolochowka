import BookingWidget from "../../components/BookingWidget";

export default function RezerwacjaPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Rezerwacja</h1>
      <p className="mt-2 text-gray-600">
        Wybierz termin, podaj dane i wyślij zapytanie.
      </p>

      <div className="mt-6">
        <BookingWidget />
      </div>
    </main>
  );
}
