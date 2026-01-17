import { site } from "@/data/site";

export default function MapSection() {
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
        <div className="w-full max-w-none px-3 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="section-title">Lokalizacja</h2>
            <p className="mt-2 text-muted">{site.addressLabel}</p>
          </div>

          <div className="mt-8 card-soft overflow-hidden w-full">
            <div className="relative w-full" style={{ height: 420 }}>
              <iframe
                title="Mapa"
                src={site.mapEmbedUrl}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
              />
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-muted">
            Dokładny adres podajemy po potwierdzeniu rezerwacji.
          </p>
        </div>
      </div>
    </section>
  );
}
