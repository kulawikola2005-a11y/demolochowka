export const pricingConfig = {
  currency: "PLN",

  // Podstawy (ZMIENISZ POD SIEBIE)
  baseWeekday: 650, // niedz-czw (noc)
  baseWeekend: 850, // pt-sob (noc)
  cleaningFee: 250, // jednorazowo za pobyt

  // Goście / zwierzęta (opcjonalnie)
  baseGuests: 6,
  extraGuestPerNight: 80, // za osobę/noc powyżej baseGuests
  petFeePerStay: 150, // jednorazowo

  // Minimalna liczba nocy standardowo
  defaultMinNights: 2,

  /**
   * Specjalne okresy (sezonowość):
   * - nightly: stała cena za noc (nadpisuje weekend/weekday)
   * - multiplier: mnożnik ceny bazowej (np. 1.2)
   * - minNights: minimalna liczba nocy w tym okresie
   *
   * Zakres: from (włącznie) -> to (WYŁĄCZNIE) w formacie YYYY-MM-DD
   */
  specials: [
    // PRZYKŁADY — podmień daty/ceny
    { name: "Ferie zimowe", from: "2026-01-15", to: "2026-03-01", multiplier: 1.2, minNights: 3 },
    { name: "Majówka", from: "2026-04-30", to: "2026-05-05", nightly: 1100, minNights: 3 },
    { name: "Sylwester / Nowy Rok", from: "2026-12-28", to: "2027-01-03", nightly: 1400, minNights: 4 },
  ],
} as const;
