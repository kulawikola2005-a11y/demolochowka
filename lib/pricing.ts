type PriceInput = {
  checkIn: string;   // YYYY-MM-DD
  checkOut: string;  // YYYY-MM-DD
  guests?: number;
  pets?: boolean;
};

type Season =
  | {
      type: "multiplier";
      name: string;
      from: string; // inclusive
      to: string;   // exclusive
      multiplier: number;
      minNights?: number;
    }
  | {
      type: "nightly";
      name: string;
      from: string; // inclusive
      to: string;   // exclusive
      nightly: number;
      minNights?: number;
    };

const CURRENCY = "PLN" as const;

// Bazowe stawki (zmień pod siebie)
const BASE_WEEKDAY = 900;
const BASE_WEEKEND = 1100;

// Dodatki
const CLEANING_FEE = 250;
const PET_FEE = 150;

// Sezony
const SEASONS: Season[] = [
  { type: "multiplier", name: "Ferie zimowe", from: "2026-01-15", to: "2026-03-01", multiplier: 1.2, minNights: 3 },
  { type: "nightly", name: "Majówka", from: "2026-04-30", to: "2026-05-05", nightly: 1100, minNights: 3 },
];

function isISODate(s: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(s);
}

function parseUTC(dateStr: string) {
  return new Date(`${dateStr}T00:00:00.000Z`);
}

function addDaysUTC(d: Date, days: number) {
  const x = new Date(d);
  x.setUTCDate(x.getUTCDate() + days);
  return x;
}

function diffNights(checkIn: string, checkOut: string) {
  const a = parseUTC(checkIn).getTime();
  const b = parseUTC(checkOut).getTime();
  return Math.round((b - a) / (1000 * 60 * 60 * 24));
}

function inRange(dateISO: string, from: string, to: string) {
  return dateISO >= from && dateISO < to;
}

function findSeason(dateISO: string): Season | undefined {
  return SEASONS.find((s) => inRange(dateISO, s.from, s.to));
}

export function calculatePrice(input: PriceInput) {
  const checkIn = input.checkIn;
  const checkOut = input.checkOut;
  const guests = input.guests ?? 2;
  const pets = input.pets ?? false;

  if (!isISODate(checkIn) || !isISODate(checkOut)) {
    return { ok: false as const, message: "Niepoprawny format daty (YYYY-MM-DD)." };
  }

  const nights = diffNights(checkIn, checkOut);
  if (nights <= 0) {
    return { ok: false as const, message: "checkOut musi być po checkIn." };
  }

  let minNightsRequired: number = 2;

  const lines: Array<{ date: string; rate: number; label: string }> = [];
  let nightsSum = 0;

  for (let i = 0; i < nights; i++) {
    const nightDate = addDaysUTC(parseUTC(checkIn), i);
    const dateISO = nightDate.toISOString().slice(0, 10);

    const dow = nightDate.getUTCDay(); // 0..6
    const isWeekend = dow === 5 || dow === 6; // pt/sob
    let rate = isWeekend ? BASE_WEEKEND : BASE_WEEKDAY;
    let label = isWeekend ? "Weekend" : "Tydzień";

    const sp = findSeason(dateISO);

    if (sp?.minNights) {
      minNightsRequired = Math.max(minNightsRequired, sp.minNights);
    }

    if (sp) {
      if (sp.type === "nightly") {
        rate = sp.nightly;
        label = sp.name;
      } else if (sp.type === "multiplier") {
        rate = Math.round(rate * sp.multiplier);
        label = sp.name;
      }
    }

    nightsSum += rate;
    lines.push({ date: dateISO, rate, label });
  }

  if (nights < minNightsRequired) {
    return {
      ok: false as const,
      message: `Minimalna liczba nocy dla wybranego terminu to ${minNightsRequired}.`,
    };
  }

  const petsFee = pets ? PET_FEE : 0;
  const total = nightsSum + CLEANING_FEE + petsFee;

  return {
    ok: true as const,
    currency: CURRENCY,
    guests,
    pets,
    nights,
    minNightsRequired,
    breakdown: {
      nights: nightsSum,
      cleaning: CLEANING_FEE,
      pets: petsFee,
      total,
      lines,
    },
  };
}
