export interface ProgettiPhoto {
  src: string;
  thumb: string;
  alt: string;
  caption: string;
  type: "hero" | "gallery" | "render";
  dimensions?: string;
}

export interface ProgettiProject {
  slug: string;
  title: string;
  location: string;
  region: string;
  area_mq: number | null;
  type: string;
  tags: string[];
  has_photos: boolean;
  has_renders: boolean;
  photo_count: number;
  render_count: number;
  hero_image: string | null;
  hero_alt: string;
  thumbnail: string | null;
  photos: ProgettiPhoto[];
  renders: ProgettiPhoto[];
  features: string[];
  description: string;
}

/** All progetti photo paths are relative to /progetti/ in the public folder */
const BASE = "/progetti";

function p(path: string | null): string | null {
  if (!path) return null;
  return `${BASE}/${path}`;
}

export const progettiProjects: ProgettiProject[] = [
  {
    slug: "baveno-lago-maggiore",
    title: "Baveno – Lago Maggiore",
    location: "Baveno, VB",
    region: "Piemonte",
    area_mq: 2800,
    type: "Realizzazione parco",
    tags: ["parco", "irrigazione", "robot-tagliaerba", "alto-fusto", "aiuole"],
    has_photos: true,
    has_renders: false,
    photo_count: 4,
    render_count: 0,
    hero_image: p("baveno-lago-maggiore/baveno-lago-maggiore_hero.jpg"),
    hero_alt: "Baveno – Lago Maggiore – Visione Sostenibile: vista d'insieme del progetto realizzato",
    thumbnail: p("baveno-lago-maggiore/baveno-lago-maggiore_hero_thumb.jpg"),
    photos: [
      {
        src: `${BASE}/baveno-lago-maggiore/baveno-lago-maggiore_hero.jpg`,
        thumb: `${BASE}/baveno-lago-maggiore/baveno-lago-maggiore_hero_thumb.jpg`,
        alt: "Baveno – Lago Maggiore – Visione Sostenibile: vista d'insieme del progetto realizzato",
        caption: "Panoramica del progetto Baveno – Lago Maggiore",
        type: "hero",
        dimensions: "1920x1080",
      },
      {
        src: `${BASE}/baveno-lago-maggiore/baveno-lago-maggiore_gallery-01.jpg`,
        thumb: `${BASE}/baveno-lago-maggiore/baveno-lago-maggiore_gallery-01_thumb.jpg`,
        alt: "Baveno – Lago Maggiore – Visione Sostenibile: faggio e liquidambar alto fusto 13,50 m",
        caption: "Faggio e liquidambar alto fusto 13,50 m",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/baveno-lago-maggiore/baveno-lago-maggiore_gallery-02.jpg`,
        thumb: `${BASE}/baveno-lago-maggiore/baveno-lago-maggiore_gallery-02_thumb.jpg`,
        alt: "Baveno – Lago Maggiore – Visione Sostenibile: impianto irrigazione automatizzato",
        caption: "Impianto irrigazione automatizzato",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/baveno-lago-maggiore/baveno-lago-maggiore_gallery-03.jpg`,
        thumb: `${BASE}/baveno-lago-maggiore/baveno-lago-maggiore_gallery-03_thumb.jpg`,
        alt: "Baveno – Lago Maggiore – Visione Sostenibile: 2 robot tagliaerba",
        caption: "2 robot tagliaerba",
        type: "gallery",
        dimensions: "1800x1200",
      },
    ],
    renders: [],
    features: [
      "Scotico e preparazione terreno",
      "Faggio e liquidambar alto fusto 13,50 m",
      "Impianto irrigazione automatizzato",
      "2 robot tagliaerba",
      "Aiuole di ortensie e azalee",
    ],
    description: "Realizzazione parco a Baveno sul Lago Maggiore, circa 2.800 mq. Intervento completo: scotico del vecchio prato, abbattimento cedro del Libano malato, messa a dimora di faggio e liquidambar alto fusto (13,50 m), impianto di irrigazione automatizzato con robottini tagliaerba, allestimento aiuole di ortensie e azalee, semina prato.",
  },
  {
    slug: "castagneto-po-marta",
    title: "Castagneto Po – Progetto Marta",
    location: "Castagneto Po, TO",
    region: "Piemonte",
    area_mq: 200,
    type: "Garden design",
    tags: ["garden-design", "bassa-manutenzione", "irrigazione-wifi", "robot-tagliaerba", "prato-macroterme"],
    has_photos: true,
    has_renders: false,
    photo_count: 6,
    render_count: 0,
    hero_image: p("castagneto-po-marta/castagneto-po-marta_hero.jpg"),
    hero_alt: "Castagneto Po – Progetto Marta – Visione Sostenibile: vista d'insieme del progetto realizzato",
    thumbnail: p("castagneto-po-marta/castagneto-po-marta_hero_thumb.jpg"),
    photos: [
      {
        src: `${BASE}/castagneto-po-marta/castagneto-po-marta_hero.jpg`,
        thumb: `${BASE}/castagneto-po-marta/castagneto-po-marta_hero_thumb.jpg`,
        alt: "Castagneto Po – Progetto Marta – Visione Sostenibile: vista d'insieme del progetto realizzato",
        caption: "Panoramica del progetto Marta a Castagneto Po",
        type: "hero",
        dimensions: "1920x1080",
      },
      {
        src: `${BASE}/castagneto-po-marta/castagneto-po-marta_gallery-01.jpg`,
        thumb: `${BASE}/castagneto-po-marta/castagneto-po-marta_gallery-01_thumb.jpg`,
        alt: "Castagneto Po – Progetto Marta – Visione Sostenibile: aiuola bassa manutenzione 200 mq",
        caption: "Aiuola bassa manutenzione 200 mq",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/castagneto-po-marta/castagneto-po-marta_gallery-02.jpg`,
        thumb: `${BASE}/castagneto-po-marta/castagneto-po-marta_gallery-02_thumb.jpg`,
        alt: "Castagneto Po – Progetto Marta – Visione Sostenibile: irrigazione wi-fi a basso consumo",
        caption: "Irrigazione Wi-Fi a basso consumo",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/castagneto-po-marta/castagneto-po-marta_gallery-03.jpg`,
        thumb: `${BASE}/castagneto-po-marta/castagneto-po-marta_gallery-03_thumb.jpg`,
        alt: "Castagneto Po – Progetto Marta – Visione Sostenibile: prato macroterme cynodon a rotoli",
        caption: "Prato macroterme Cynodon a rotoli",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/castagneto-po-marta/castagneto-po-marta_gallery-04.jpg`,
        thumb: `${BASE}/castagneto-po-marta/castagneto-po-marta_gallery-04_thumb.jpg`,
        alt: "Castagneto Po – Progetto Marta – Visione Sostenibile: robot tagliaerba con sensore visivo",
        caption: "Robot tagliaerba con sensore visivo",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/castagneto-po-marta/castagneto-po-marta_gallery-05.jpg`,
        thumb: `${BASE}/castagneto-po-marta/castagneto-po-marta_gallery-05_thumb.jpg`,
        alt: "Castagneto Po – Progetto Marta – Visione Sostenibile: dettaglio intervento",
        caption: "Dettaglio intervento",
        type: "gallery",
        dimensions: "1800x1200",
      },
    ],
    renders: [],
    features: [
      "Progetto di architetto paesaggista",
      "Aiuola bassa manutenzione 200 mq",
      "Irrigazione Wi-Fi a basso consumo",
      "Prato macroterme Cynodon a rotoli",
      "Robot tagliaerba con sensore visivo",
    ],
    description: "Progetto di architetto paesaggista per giardino a Castagneto Po. Allestimento aiuola a bassa manutenzione di 200 mq con cultivar di sempreverdi, tappezzanti, graminacee e perenni. Impianto di irrigazione Wi-Fi con irrigatori rotator a basso consumo idrico, sensore pioggia. Posa prato a rotoli di macroterme Cynodon, resistente e a bassa esigenza idrica. Robot tagliaerba di ultima generazione con sensore visivo senza fili e riconoscimento botanico.",
  },
  {
    slug: "veronica",
    title: "Veronica – Rifacimento Giardino",
    location: "Zona residenziale",
    region: "Piemonte",
    area_mq: null,
    type: "Rifacimento giardino",
    tags: ["rifacimento", "trifoglio", "camminamenti", "bassa-manutenzione", "irrigazione"],
    has_photos: true,
    has_renders: true,
    photo_count: 4,
    render_count: 3,
    hero_image: p("veronica/veronica_hero.jpg"),
    hero_alt: "Veronica – Rifacimento Giardino – Visione Sostenibile: vista d'insieme del progetto realizzato",
    thumbnail: p("veronica/veronica_hero_thumb.jpg"),
    photos: [
      {
        src: `${BASE}/veronica/veronica_hero.jpg`,
        thumb: `${BASE}/veronica/veronica_hero_thumb.jpg`,
        alt: "Veronica – Rifacimento Giardino – Visione Sostenibile: vista d'insieme del progetto realizzato",
        caption: "Panoramica del progetto Veronica – Rifacimento Giardino",
        type: "hero",
        dimensions: "1920x1080",
      },
      {
        src: `${BASE}/veronica/veronica_gallery-01.jpg`,
        thumb: `${BASE}/veronica/veronica_gallery-01_thumb.jpg`,
        alt: "Veronica – Rifacimento Giardino – Visione Sostenibile: prato di trifoglio a crescita bassa",
        caption: "Prato di trifoglio a crescita bassa",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/veronica/veronica_gallery-02.jpg`,
        thumb: `${BASE}/veronica/veronica_gallery-02_thumb.jpg`,
        alt: "Veronica – Rifacimento Giardino – Visione Sostenibile: camminamenti in traversine certificate",
        caption: "Camminamenti in traversine certificate",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/veronica/veronica_gallery-03.jpg`,
        thumb: `${BASE}/veronica/veronica_gallery-03_thumb.jpg`,
        alt: "Veronica – Rifacimento Giardino – Visione Sostenibile: acero japonico e camelie",
        caption: "Acero japonico e camelie",
        type: "gallery",
        dimensions: "1800x1200",
      },
    ],
    renders: [
      {
        src: `${BASE}/veronica/veronica_render-00.jpg`,
        thumb: `${BASE}/veronica/veronica_render-00.jpg`,
        alt: "Veronica – Rifacimento Giardino – render/progetto 1",
        caption: "Progetto e render 1",
        type: "render",
      },
      {
        src: `${BASE}/veronica/veronica_render-01.jpg`,
        thumb: `${BASE}/veronica/veronica_render-01.jpg`,
        alt: "Veronica – Rifacimento Giardino – render/progetto 2",
        caption: "Progetto e render 2",
        type: "render",
      },
      {
        src: `${BASE}/veronica/veronica_render-02.jpg`,
        thumb: `${BASE}/veronica/veronica_render-02.jpg`,
        alt: "Veronica – Rifacimento Giardino – render/progetto 3",
        caption: "Progetto e render 3",
        type: "render",
      },
    ],
    features: [
      "Progetto di architetto paesaggista",
      "Prato di trifoglio a crescita bassa",
      "Camminamenti in traversine certificate",
      "Acero japonico e camelie",
      "Irrigazione Bluetooth con sensore pioggia",
    ],
    description: "Rifacimento completo del giardino di un'abitazione residenziale, progetto di architetto paesaggista. Semina prato di trifoglio (resta sempre basso, non necessita taglio, fiorisce in primavera). Apporto di terra nuova ricca di sostanza organica e humus. Realizzazione camminamento con traversine certificate e ghiaie, aiuola con tappezzanti, sempreverdi, graminacee e perenni. Messa a dimora di acero japonico e camelie. Impianto irrigazione con centralina Bluetooth di ultima generazione.",
  },
  {
    slug: "maria-rosa-santhia",
    title: "Maria Rosa – Santhià",
    location: "Santhià, VC",
    region: "Piemonte",
    area_mq: 200,
    type: "Allestimento giardino",
    tags: ["prato-sintetico", "dry-garden", "bassa-manutenzione", "aiuole", "ghiaie"],
    has_photos: true,
    has_renders: false,
    photo_count: 3,
    render_count: 0,
    hero_image: p("maria-rosa-santhia/maria-rosa-santhia_hero.jpg"),
    hero_alt: "Maria Rosa – Santhià – Visione Sostenibile: vista d'insieme del progetto realizzato",
    thumbnail: p("maria-rosa-santhia/maria-rosa-santhia_hero_thumb.jpg"),
    photos: [
      {
        src: `${BASE}/maria-rosa-santhia/maria-rosa-santhia_hero.jpg`,
        thumb: `${BASE}/maria-rosa-santhia/maria-rosa-santhia_hero_thumb.jpg`,
        alt: "Maria Rosa – Santhià – Visione Sostenibile: vista d'insieme del progetto realizzato",
        caption: "Panoramica del progetto Maria Rosa a Santhià",
        type: "hero",
        dimensions: "1920x1080",
      },
      {
        src: `${BASE}/maria-rosa-santhia/maria-rosa-santhia_gallery-01.jpg`,
        thumb: `${BASE}/maria-rosa-santhia/maria-rosa-santhia_gallery-01_thumb.jpg`,
        alt: "Maria Rosa – Santhià – Visione Sostenibile: aiuole dry garden a bassa manutenzione",
        caption: "Aiuole dry garden a bassa manutenzione",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/maria-rosa-santhia/maria-rosa-santhia_gallery-02.jpg`,
        thumb: `${BASE}/maria-rosa-santhia/maria-rosa-santhia_gallery-02_thumb.jpg`,
        alt: "Maria Rosa – Santhià – Visione Sostenibile: lapillo vulcanico di copertura",
        caption: "Lapillo vulcanico di copertura",
        type: "gallery",
        dimensions: "1800x1200",
      },
    ],
    renders: [],
    features: [
      "Prato sintetico professionale 200 mq",
      "Aiuole dry garden a bassa manutenzione",
      "Lapillo vulcanico di copertura",
      "Zona BBQ con lastre in pietra",
      "Irrigazione ala gocciolante Bluetooth",
    ],
    description: "Allestimento giardino di villetta in zona residenziale a Santhià. Prato sintetico professionale con 8 anni di garanzia (200 mq) su fondo stabilizzato vibrato. Aiuole sinuose dry garden con perenni, sempreverdi e cespugli resistenti a siccità e malattie, copertura in lapillo vulcanico. Irrigazione con ala gocciolante e centralina Bluetooth. Zona BBQ con lastre in pietra e tappezzanti fiorite nelle fughe. Aiuola retro casa con ghiaie di diversi colori.",
  },
  {
    slug: "agriturismo-durando-portacomaro",
    title: "Agriturismo Durando – Portacomaro",
    location: "Portacomaro, AT",
    region: "Piemonte – Monferrato",
    area_mq: 1800,
    type: "Realizzazione parco completo",
    tags: ["agriturismo", "irrigazione-wifi", "anti-zanzare", "robot-gps", "solare", "piscina", "officinali"],
    has_photos: true,
    has_renders: false,
    photo_count: 7,
    render_count: 0,
    hero_image: p("agriturismo-durando-portacomaro/agriturismo-durando-portacomaro_hero.jpg"),
    hero_alt: "Agriturismo Durando – Portacomaro – Visione Sostenibile: vista d'insieme del progetto realizzato",
    thumbnail: p("agriturismo-durando-portacomaro/agriturismo-durando-portacomaro_hero_thumb.jpg"),
    photos: [
      {
        src: `${BASE}/agriturismo-durando-portacomaro/agriturismo-durando-portacomaro_hero.jpg`,
        thumb: `${BASE}/agriturismo-durando-portacomaro/agriturismo-durando-portacomaro_hero_thumb.jpg`,
        alt: "Agriturismo Durando – Portacomaro – Visione Sostenibile: vista d'insieme del progetto realizzato",
        caption: "Panoramica del progetto Agriturismo Durando – Portacomaro",
        type: "hero",
        dimensions: "1920x1080",
      },
      {
        src: `${BASE}/agriturismo-durando-portacomaro/agriturismo-durando-portacomaro_gallery-01.jpg`,
        thumb: `${BASE}/agriturismo-durando-portacomaro/agriturismo-durando-portacomaro_gallery-01_thumb.jpg`,
        alt: "Agriturismo Durando – Portacomaro – Visione Sostenibile: irrigazione wi-fi con stazione meteo",
        caption: "Irrigazione Wi-Fi con stazione meteo",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/agriturismo-durando-portacomaro/agriturismo-durando-portacomaro_gallery-02.jpg`,
        thumb: `${BASE}/agriturismo-durando-portacomaro/agriturismo-durando-portacomaro_gallery-02_thumb.jpg`,
        alt: "Agriturismo Durando – Portacomaro – Visione Sostenibile: impianto anti-zanzare perimetrale",
        caption: "Impianto anti-zanzare perimetrale",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/agriturismo-durando-portacomaro/agriturismo-durando-portacomaro_gallery-03.jpg`,
        thumb: `${BASE}/agriturismo-durando-portacomaro/agriturismo-durando-portacomaro_gallery-03_thumb.jpg`,
        alt: "Agriturismo Durando – Portacomaro – Visione Sostenibile: robot tagliaerba gps 3 ruote motrici",
        caption: "Robot tagliaerba GPS 3 ruote motrici",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/agriturismo-durando-portacomaro/agriturismo-durando-portacomaro_gallery-04.jpg`,
        thumb: `${BASE}/agriturismo-durando-portacomaro/agriturismo-durando-portacomaro_gallery-04_thumb.jpg`,
        alt: "Agriturismo Durando – Portacomaro – Visione Sostenibile: 45 essenze officinali a km/0",
        caption: "45 essenze officinali a km/0",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/agriturismo-durando-portacomaro/agriturismo-durando-portacomaro_gallery-05.jpg`,
        thumb: `${BASE}/agriturismo-durando-portacomaro/agriturismo-durando-portacomaro_gallery-05_thumb.jpg`,
        alt: "Agriturismo Durando – Portacomaro – Visione Sostenibile: illuminazione solare professionale",
        caption: "Illuminazione solare professionale",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/agriturismo-durando-portacomaro/agriturismo-durando-portacomaro_gallery-06.jpg`,
        thumb: `${BASE}/agriturismo-durando-portacomaro/agriturismo-durando-portacomaro_gallery-06_thumb.jpg`,
        alt: "Agriturismo Durando – Portacomaro – Visione Sostenibile: 3.000 cultivar messe a dimora",
        caption: "3.000 cultivar messe a dimora",
        type: "gallery",
        dimensions: "1800x1200",
      },
    ],
    renders: [],
    features: [
      "Parco completo 1.800 mq chiavi in mano",
      "Irrigazione Wi-Fi con stazione meteo",
      "Impianto anti-zanzare perimetrale",
      "Robot tagliaerba GPS 3 ruote motrici",
      "45 essenze officinali a km/0",
      "Illuminazione solare professionale",
      "3.000 cultivar messe a dimora",
    ],
    description: "Realizzazione completa chiavi in mano del parco dell'Agriturismo Terra D'Origine nel Monferrato, 1.800 mq. Impianto di irrigazione Wi-Fi con stazione meteorologica collegata, sensori pioggia e umidità, vasche raccolta acque piovane interrate. Impianto anti-zanzare professionale Wi-Fi su tutto il perimetro. Robot tagliaerba GPS a 3 ruote motrici con riconoscimento botanico. Illuminazione solare professionale. Circa 3.000 cultivar messe a dimora, inclusa aiuola di 250 mq con 45 essenze officinali raccoglibili a km/0. Zone relax con buddleja e spazi privacy per gli ospiti.",
  },
  {
    slug: "portacomaro-ruta",
    title: "Portacomaro – Ruta",
    location: "Portacomaro, AT",
    region: "Piemonte – Monferrato",
    area_mq: null,
    type: "Progetto giardino",
    tags: ["giardino", "monferrato"],
    has_photos: true,
    has_renders: true,
    photo_count: 5,
    render_count: 1,
    hero_image: p("portacomaro-ruta/portacomaro-ruta_hero.jpg"),
    hero_alt: "Portacomaro – Ruta – Visione Sostenibile: vista d'insieme del progetto realizzato",
    thumbnail: p("portacomaro-ruta/portacomaro-ruta_hero_thumb.jpg"),
    photos: [
      {
        src: `${BASE}/portacomaro-ruta/portacomaro-ruta_hero.jpg`,
        thumb: `${BASE}/portacomaro-ruta/portacomaro-ruta_hero_thumb.jpg`,
        alt: "Portacomaro – Ruta – Visione Sostenibile: vista d'insieme del progetto realizzato",
        caption: "Panoramica del progetto Portacomaro Ruta",
        type: "hero",
        dimensions: "1920x1080",
      },
      {
        src: `${BASE}/portacomaro-ruta/portacomaro-ruta_gallery-01.jpg`,
        thumb: `${BASE}/portacomaro-ruta/portacomaro-ruta_gallery-01_thumb.jpg`,
        alt: "Portacomaro – Ruta – Visione Sostenibile: area monferrato",
        caption: "Area Monferrato",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/portacomaro-ruta/portacomaro-ruta_gallery-02.jpg`,
        thumb: `${BASE}/portacomaro-ruta/portacomaro-ruta_gallery-02_thumb.jpg`,
        alt: "Portacomaro – Ruta – Visione Sostenibile: dettaglio 3 di 5",
        caption: "Dettaglio intervento",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/portacomaro-ruta/portacomaro-ruta_gallery-03.jpg`,
        thumb: `${BASE}/portacomaro-ruta/portacomaro-ruta_gallery-03_thumb.jpg`,
        alt: "Portacomaro – Ruta – Visione Sostenibile: dettaglio 4 di 5",
        caption: "Dettaglio intervento",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/portacomaro-ruta/portacomaro-ruta_gallery-04.jpg`,
        thumb: `${BASE}/portacomaro-ruta/portacomaro-ruta_gallery-04_thumb.jpg`,
        alt: "Portacomaro – Ruta – Visione Sostenibile: dettaglio 5 di 5",
        caption: "Dettaglio intervento",
        type: "gallery",
        dimensions: "1800x1200",
      },
    ],
    renders: [
      {
        src: `${BASE}/portacomaro-ruta/portacomaro-ruta_render-00.jpg`,
        thumb: `${BASE}/portacomaro-ruta/portacomaro-ruta_render-00.jpg`,
        alt: "Portacomaro – Ruta – render/progetto",
        caption: "Progetto e render",
        type: "render",
      },
    ],
    features: [
      "Progettazione giardino",
      "Area Monferrato",
    ],
    description: "Intervento di progettazione e realizzazione giardino a Portacomaro, area del Monferrato piemontese.",
  },
  {
    slug: "porto-val-travaglia",
    title: "Porto Val Travaglia",
    location: "Porto Valtravaglia, VA",
    region: "Lombardia – Lago Maggiore",
    area_mq: 1800,
    type: "Realizzazione parco",
    tags: ["parco", "pergola", "ortensie", "aiuola-rialzata", "lagestroemia", "illuminazione-solare"],
    has_photos: true,
    has_renders: false,
    photo_count: 14,
    render_count: 0,
    hero_image: p("porto-val-travaglia/porto-val-travaglia_hero.jpg"),
    hero_alt: "Porto Val Travaglia – Visione Sostenibile: vista d'insieme del progetto realizzato",
    thumbnail: p("porto-val-travaglia/porto-val-travaglia_hero_thumb.jpg"),
    photos: [
      {
        src: `${BASE}/porto-val-travaglia/porto-val-travaglia_hero.jpg`,
        thumb: `${BASE}/porto-val-travaglia/porto-val-travaglia_hero_thumb.jpg`,
        alt: "Porto Val Travaglia – Visione Sostenibile: vista d'insieme del progetto realizzato",
        caption: "Panoramica del progetto Porto Val Travaglia",
        type: "hero",
        dimensions: "1920x1080",
      },
      {
        src: `${BASE}/porto-val-travaglia/porto-val-travaglia_gallery-01.jpg`,
        thumb: `${BASE}/porto-val-travaglia/porto-val-travaglia_gallery-01_thumb.jpg`,
        alt: "Porto Val Travaglia – Visione Sostenibile: pergola 20 m con uva da tavola",
        caption: "Pergola 20 m con uva da tavola",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/porto-val-travaglia/porto-val-travaglia_gallery-02.jpg`,
        thumb: `${BASE}/porto-val-travaglia/porto-val-travaglia_gallery-02_thumb.jpg`,
        alt: "Porto Val Travaglia – Visione Sostenibile: ortensie paniculate vanille 50 m",
        caption: "Ortensie paniculate Vanille 50 m",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/porto-val-travaglia/porto-val-travaglia_gallery-03.jpg`,
        thumb: `${BASE}/porto-val-travaglia/porto-val-travaglia_gallery-03_thumb.jpg`,
        alt: "Porto Val Travaglia – Visione Sostenibile: aiuola rialzata 200 mq con lagestroemia",
        caption: "Aiuola rialzata 200 mq con lagestroemia",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/porto-val-travaglia/porto-val-travaglia_gallery-04.jpg`,
        thumb: `${BASE}/porto-val-travaglia/porto-val-travaglia_gallery-04_thumb.jpg`,
        alt: "Porto Val Travaglia – Visione Sostenibile: pietra di cave locali",
        caption: "Pietra di cave locali",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/porto-val-travaglia/porto-val-travaglia_gallery-05.jpg`,
        thumb: `${BASE}/porto-val-travaglia/porto-val-travaglia_gallery-05_thumb.jpg`,
        alt: "Porto Val Travaglia – Visione Sostenibile: illuminazione solare professionale",
        caption: "Illuminazione solare professionale",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/porto-val-travaglia/porto-val-travaglia_gallery-06.jpg`,
        thumb: `${BASE}/porto-val-travaglia/porto-val-travaglia_gallery-06_thumb.jpg`,
        alt: "Porto Val Travaglia – Visione Sostenibile: dettaglio 7 di 14",
        caption: "Dettaglio intervento",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/porto-val-travaglia/porto-val-travaglia_gallery-07.jpg`,
        thumb: `${BASE}/porto-val-travaglia/porto-val-travaglia_gallery-07_thumb.jpg`,
        alt: "Porto Val Travaglia – Visione Sostenibile: dettaglio 8 di 14",
        caption: "Dettaglio intervento",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/porto-val-travaglia/porto-val-travaglia_gallery-08.jpg`,
        thumb: `${BASE}/porto-val-travaglia/porto-val-travaglia_gallery-08_thumb.jpg`,
        alt: "Porto Val Travaglia – Visione Sostenibile: dettaglio 9 di 14",
        caption: "Dettaglio intervento",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/porto-val-travaglia/porto-val-travaglia_gallery-09.jpg`,
        thumb: `${BASE}/porto-val-travaglia/porto-val-travaglia_gallery-09_thumb.jpg`,
        alt: "Porto Val Travaglia – Visione Sostenibile: dettaglio 10 di 14",
        caption: "Dettaglio intervento",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/porto-val-travaglia/porto-val-travaglia_gallery-10.jpg`,
        thumb: `${BASE}/porto-val-travaglia/porto-val-travaglia_gallery-10_thumb.jpg`,
        alt: "Porto Val Travaglia – Visione Sostenibile: dettaglio 11 di 14",
        caption: "Dettaglio intervento",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/porto-val-travaglia/porto-val-travaglia_gallery-11.jpg`,
        thumb: `${BASE}/porto-val-travaglia/porto-val-travaglia_gallery-11_thumb.jpg`,
        alt: "Porto Val Travaglia – Visione Sostenibile: dettaglio 12 di 14",
        caption: "Dettaglio intervento",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/porto-val-travaglia/porto-val-travaglia_gallery-12.jpg`,
        thumb: `${BASE}/porto-val-travaglia/porto-val-travaglia_gallery-12_thumb.jpg`,
        alt: "Porto Val Travaglia – Visione Sostenibile: dettaglio 13 di 14",
        caption: "Dettaglio intervento",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/porto-val-travaglia/porto-val-travaglia_gallery-13.jpg`,
        thumb: `${BASE}/porto-val-travaglia/porto-val-travaglia_gallery-13_thumb.jpg`,
        alt: "Porto Val Travaglia – Visione Sostenibile: dettaglio 14 di 14",
        caption: "Dettaglio intervento",
        type: "gallery",
        dimensions: "1800x1200",
      },
    ],
    renders: [],
    features: [
      "Parco 1.800 mq con garden design",
      "Pergola 20 m con uva da tavola",
      "Ortensie paniculate Vanille 50 m",
      "Aiuola rialzata 200 mq con lagestroemia",
      "Pietra di cave locali",
      "Illuminazione solare professionale",
    ],
    description: "Realizzazione parco di 1.800 mq a Porto Valtravaglia con progetto di garden design. Pergola di 20 m con sezione centrale relax 5x5 m, rampicanti di uva da tavola. Aiuola perimetrale di 50 m con ortensie paniculate Vanille. Aiuola rialzata di 200 mq con graminacee, perenni, sempreverdi, azalee e lagestroemia a ceppaia. Camminamenti e lastre in pietra di cave locali. Vialetto d'ingresso con lavande. Illuminazione segnapasso a energia solare professionale.",
  },
  {
    slug: "cortemilia-silvio",
    title: "Cortemilia – Silvio",
    location: "Cortemilia, CN",
    region: "Piemonte – Langhe",
    area_mq: 350,
    type: "Prato sintetico e giardino roccioso",
    tags: ["prato-sintetico", "giardino-roccioso"],
    has_photos: false,
    has_renders: false,
    photo_count: 0,
    render_count: 0,
    hero_image: null,
    hero_alt: "",
    thumbnail: null,
    photos: [],
    renders: [],
    features: [
      "Prato sintetico professionale 350 mq",
      "Effetto roccioso con sassi naturali",
    ],
    description: "Fornitura e posa di prato sintetico professionale con 8 anni di garanzia, 350 mq, su fondo stabilizzato vibrato con telo anti-infestanti, colla bi-componente, sabbiatura e spazzolatura. Allestimento con sassi di diverse dimensioni per creare un effetto roccioso naturale nel contesto.",
  },
  {
    slug: "stefano-cortemilia",
    title: "Stefano – Cortemilia",
    location: "Cortemilia, CN",
    region: "Piemonte – Langhe",
    area_mq: null,
    type: "Allestimento giardino storico",
    tags: ["giardino-storico", "irrigazione-wifi", "ulivi-secolari", "siepe", "terrazzi"],
    has_photos: false,
    has_renders: false,
    photo_count: 0,
    render_count: 0,
    hero_image: null,
    hero_alt: "",
    thumbnail: null,
    photos: [],
    renders: [],
    features: [
      "Palazzina storica del '600",
      "Progetto di architetto paesaggista",
      "Ulivi secolari in terracotta",
      "Siepe sinuosa di leylandii",
      "Irrigazione Wi-Fi con gocciolatori terrazzi",
    ],
    description: "Allestimento giardino in palazzina storica risalente al '600 a Cortemilia, progetto di architetto paesaggista. Irrigazione Wi-Fi con sensore pioggia e gocciolatori singoli per fioriere terrazzi. Prato a rotoli, siepe sinuosa di leylandii con bordure in acciaio e lapillo vulcanico. Aiuola con ortensie, graminacee, perenni e sempreverdi. Vasi in terracotta con ulivi secolari, fioriere in ferro battuto con palme. Filare di carpini bianchi.",
  },
  {
    slug: "chieri-paola",
    title: "Chieri – Paola",
    location: "Chieri, TO",
    region: "Piemonte",
    area_mq: 450,
    type: "Allestimento giardino villa",
    tags: ["garden-design", "irrigazione-wifi", "robot-gps", "terrazzamenti", "ulivo-secolare"],
    has_photos: false,
    has_renders: false,
    photo_count: 0,
    render_count: 0,
    hero_image: null,
    hero_alt: "",
    thumbnail: null,
    photos: [],
    renders: [],
    features: [
      "Garden design 450 mq",
      "Irrigazione Wi-Fi a basso consumo",
      "Terrazzamenti con perenni e graminacee",
      "Ulivo secolare con verbena ibrida",
      "Robot GPS multi-zona",
    ],
    description: "Allestimento giardino di villa residenziale a Chieri, 450 mq, con progetto di garden design. Irrigazione Wi-Fi con irrigatori rotator a basso consumo. Aiuole su 2 terrazzamenti con perenni, graminacee, sempreverdi e cespugli, pacciamatura in cippato certificato anti-combustione. Fioriere con traversine certificate, aceri, ulivo secolare con tappezzanti di verbena ibrida. Robot GPS per taglio prati multi-zona con riconoscimento botanico e piatto flottante anti-urto.",
  },
  {
    slug: "castagneto-po-silvano",
    title: "Castagneto Po – Silvano",
    location: "Castagneto Po, TO",
    region: "Piemonte",
    area_mq: 350,
    type: "Garden design",
    tags: ["garden-design", "dry-garden", "irrigazione-wifi", "robot-tagliaerba", "pietra-naturale"],
    has_photos: false,
    has_renders: false,
    photo_count: 0,
    render_count: 0,
    hero_image: null,
    hero_alt: "",
    thumbnail: null,
    photos: [],
    renders: [],
    features: [
      "Dry garden su 2 lati",
      "Camminamenti in pietra naturale",
      "Irrigazione Wi-Fi a basso consumo",
      "Robot tagliaerba con sensore visivo",
    ],
    description: "Progetto di garden design a Castagneto Po. Irrigazione Wi-Fi con irrigatori rotator a basso consumo e ala gocciolante nelle aiuole. Aiuola dry garden sui 2 lati della casa con piante a bassa manutenzione, tappezzanti, sempreverdi, perenni e arbustive, camminamenti interni in lastre di pietra naturale. Semina prato 350 mq. Robot tagliaerba con sensore visivo senza fili e riconoscimento botanico.",
  },
];

/** Get all unique tags across all projects */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const project of progettiProjects) {
    for (const tag of project.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags).sort();
}

/** Get projects with photos (for the visual grid) */
export function getProjectsWithPhotos(): ProgettiProject[] {
  return progettiProjects.filter((p) => p.has_photos);
}

/** Get projects without photos (for the text list) */
export function getProjectsWithoutPhotos(): ProgettiProject[] {
  return progettiProjects.filter((p) => !p.has_photos);
}

/** Find a project by slug */
export function getProjectBySlug(slug: string): ProgettiProject | undefined {
  return progettiProjects.find((p) => p.slug === slug);
}

/** Format tag for display (kebab-case to Title Case) */
export function formatTag(tag: string): string {
  return tag
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
