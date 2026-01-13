import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (_client) return _client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    // ważne: nie wywalaj builda na imporcie; błąd ma się pojawić dopiero przy użyciu klienta
    throw new Error(
      "Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY"
    );
  }

  _client = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return _client;
}

// Dzięki Proxy obecny kod (supabaseAdmin.from(...)) działa bez zmian,
// a klient tworzy się dopiero gdy ktoś użyje supabaseAdmin.*
export const supabaseAdmin: SupabaseClient = new Proxy({} as any, {
  get(_target, prop) {
    const c: any = getClient();
    const v = c[prop];
    return typeof v === "function" ? v.bind(c) : v;
  },
});
