import { site } from "@/data/site";

export default function MapSection() {
  const label = site.location ?? "Krynica-Zdrój (adres po potwierdzeniu)";
  const q = encodeURIComponent(label);

  return (
    <section id="mapa" className="full-bleed">
      <div
        className="w-full py-10 md:py-14"
        style={{
          background:
            "radial-gradient(900px 500px at 20% 0%, rgba(47,71,55,.12), transparent 60%), rgba(47,71,55,.06)",
          borderTop: "1px solid rgba(47,71,55,.25)",
          borderBottom: "1px solid rgba(47,71,55,.25)",
        }}
      >
        {/* nagłówek zostaje w kontenerze */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="section-title">Lokalizacja</h2>
            <p className="mt-2 text-muted">{label}</p>
          </div>
        </div>

        {/* MAPA edge-to-edge */}
        <div className="mt-8 w-full px-0">
          <div className="card-soft overflow-hidden w-full !rounded-none sm:!rounded-3xl">
            <div className="relative w-full h-[60vh] min-h-[520px] max-h-[780px]">
              <iframe
                title="Mapa"
                src={`https://www.google.com/maps?q=${q}&output=embed`}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
              />
            </div>
          </div>
        </div>

        {/* stopka w kontenerze */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="mt-4 text-center text-xs text-muted">
            Dokładny adres podajemy po potwierdzeniu rezerwacji.
          </p>
        </div>
      </div>
    </section>
  );
}
