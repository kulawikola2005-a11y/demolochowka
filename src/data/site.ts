export const site = {
  name: "Domek w Krynicy",
  location: "Krynica-Zdrój",
  welcome: "Witamy w",
  heroImage: "/gallery/01.jpg",

  aboutTitle: "O domu",
  aboutText:
    "Domek w Krynicy to komfortowy dom w spokojnej okolicy, stworzony do odpoczynku o każdej porze roku. Jasne wnętrza, wygodny układ i pełne wyposażenie sprawiają, że pobyt jest przyjemny zarówno na weekend, jak i na dłużej. To miejsce dla par, rodzin i małych grup — na górskie wędrówki, zimowe wyjazdy na narty albo po prostu spokojny reset z dala od miasta. Dbamy o standard, czystość i detale, a kontakt przed przyjazdem jest prosty i szybki. Rezerwacja zajmuje chwilę, a potwierdzenie terminu wysyłamy mailowo.",

  whatsapp: "+48 518 808 397",
  email: "twoj@email.pl",
  addressLabel: "Krynica-Zdrój (adres po potwierdzeniu)",

  mapEmbedUrl: "https://www.google.com/maps?q=Krynica-Zdr%C3%B3j&output=embed",

  // ✅ potrzebne dla GonnaAbout (quickFacts.map)
  quickFacts: [
    { k: "Miejsca", v: "6–8 osób" },
    { k: "Sypialnie", v: "3" },
    { k: "Łazienki", v: "2" },
    { k: "Parking", v: "na miejscu" },
  ],

  // ✅ potrzebne dla MosaicGallery (gallery.map)
  gallery: [
    "/gallery/01.jpg",
    "/gallery/02.jpg",
    "/gallery/03.jpg",
    "/gallery/04.jpg",
    "/gallery/05.jpg",
    "/gallery/06.jpg",
  ],

  // ✅ potrzebne dla StarReviews (reviews.map)
  reviews: [
    { name: "Adam", city: "Wrocław", text: "Klimat miejsca niesamowity, dom świetnie urządzony..." },
    { name: "Karolina", city: "Wrocław", text: "Petarda! Jestem totalnie zakochana..." },
    { name: "Piotr", city: "Wrocław", text: "Powrót obowiązkowy — wszystko dopięte..." },
  ],
};
