import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export default function HistoriaPage() {
  return (
    <main className="bg-stone-50 min-h-screen pt-28">
      <SiteHeader />

      <section className="container-page section-pad">
        <div className="card-soft p-7 md:p-10">
          <h1 className="section-title">Nasza historia</h1>

          <div className="mt-6 space-y-5 text-neutral-800/90 leading-relaxed">
            <p>
              Domek „Lochówka” powstał jeszcze przed II wojną światową. Przez lata widział wiele: zmieniające się pory,
              ludzi, mody i zwyczaje Krynicy. Od tamtego czasu jest w naszej rodzinie i właśnie dlatego ma dla nas
              szczególną wartość - to nie tylko miejsce na mapie, ale dom z pamięcią i ciągłością.
            </p>
            <p>
              Położony wysoko, wśród natury i z dala od zgiełku, daje dokładnie to, czego dziś szuka się najczęściej:
              ciszę, przestrzeń i prawdziwy oddech. To miejsce, w którym poranki smakują inaczej, a wieczory przychodzą
              spokojniej - w rytmie gór.
            </p>
            <p>
              Kiedy przyszło do odnowienia, wiedzieliśmy jedno: chcemy przywrócić mu komfort, ale nie odebrać charakteru.
              Remont był „z szacunkiem” - odświeżyliśmy to, co wymagało uwagi oraz dopracowaliśmy wygodę i wyposażenie.
              Lecz to wciąż jest dom, który wiele przeżył - i właśnie dlatego ma w sobie spokój, który czuć od progu.
            </p>
            <p>
              W Krynicy historia jest częścią codzienności. W naszej rodzinie istnieje też opowieść, że kilka razy
              zatrzymał się tu na noc Nikifor - malarz prymitywista, którego twórczość na stałe wpisała się w ducha tego
              miejsca. Traktujemy to jak piękną część lokalnego przekazu i ukłon w stronę dawnej Krynicy.
            </p>
            <p>
              Dziś dom jest gotowy na nowe wspomnienia - Wasze: spokojne poranki, górskie wędrówki, zimowe wyjazdy i
              wieczory, w których naprawdę można zwolnić.
            </p>
          </div>

          <div className="mt-8">
            <Link href="/" className="btn-primary inline-flex">
              Wróć na stronę główną
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
