export interface PortfolioPhoto {
  src: string;
  thumb: string;
  alt: string;
  caption: string;
  type: "hero" | "gallery" | "render";
  dimensions?: string;
}

export interface PortfolioProject {
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
  photos: PortfolioPhoto[];
  renders: PortfolioPhoto[];
  features: string[];
  description: string;
}

/** All portfolio photo paths are relative to /portfolio/ in the public folder */
const BASE = "/portfolio";

function p(path: string | null): string | null {
  if (!path) return null;
  return `${BASE}/${path}`;
}

export const portfolioProjects: PortfolioProject[] = [
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
    hero_image: p("photos/baveno-lago-maggiore/baveno-lago-maggiore_hero.jpg"),
    hero_alt: "Baveno – Lago Maggiore – Visione Sostenibile: vista d'insieme del progetto realizzato",
    thumbnail: p("photos/baveno-lago-maggiore/baveno-lago-maggiore_hero_thumb.jpg"),
    photos: [
      {
        src: `${BASE}/photos/baveno-lago-maggiore/baveno-lago-maggiore_hero.jpg`,
        thumb: `${BASE}/photos/baveno-lago-maggiore/baveno-lago-maggiore_hero_thumb.jpg`,
        alt: "Baveno – Lago Maggiore – Visione Sostenibile: vista d'insieme del progetto realizzato",
        caption: "Panoramica del progetto Baveno – Lago Maggiore",
        type: "hero",
        dimensions: "1920x1080",
      },
      {
        src: `${BASE}/photos/baveno-lago-maggiore/baveno-lago-maggiore_gallery-01.jpg`,
        thumb: `${BASE}/photos/baveno-lago-maggiore/baveno-lago-maggiore_gallery-01_thumb.jpg`,
        alt: "Baveno – Lago Maggiore – Visione Sostenibile: faggio e liquidambar alto fusto 13,50 m",
        caption: "Faggio e liquidambar alto fusto 13,50 m",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/photos/baveno-lago-maggiore/baveno-lago-maggiore_gallery-02.jpg`,
        thumb: `${BASE}/photos/baveno-lago-maggiore/baveno-lago-maggiore_gallery-02_thumb.jpg`,
        alt: "Baveno – Lago Maggiore – Visione Sostenibile: impianto irrigazione automatizzato",
        caption: "Impianto irrigazione automatizzato",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/photos/baveno-lago-maggiore/baveno-lago-maggiore_gallery-03.jpg`,
        thumb: `${BASE}/photos/baveno-lago-maggiore/baveno-lago-maggiore_gallery-03_thumb.jpg`,
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
    hero_image: p("photos/castagneto-po-marta/castagneto-po-marta_hero.jpg"),
    hero_alt: "Castagneto Po – Progetto Marta – Visione Sostenibile: vista d'insieme del progetto realizzato",
    thumbnail: p("photos/castagneto-po-marta/castagneto-po-marta_hero_thumb.jpg"),
    photos: [
      {
        src: `${BASE}/photos/castagneto-po-marta/castagneto-po-marta_hero.jpg`,
        thumb: `${BASE}/photos/castagneto-po-marta/castagneto-po-marta_hero_thumb.jpg`,
        alt: "Castagneto Po – Progetto Marta – Visione Sostenibile: vista d'insieme del progetto realizzato",
        caption: "Panoramica del progetto Marta a Castagneto Po",
        type: "hero",
        dimensions: "1920x1080",
      },
      {
        src: `${BASE}/photos/castagneto-po-marta/castagneto-po-marta_gallery-01.jpg`,
        thumb: `${BASE}/photos/castagneto-po-marta/castagneto-po-marta_gallery-01_thumb.jpg`,
        alt: "Castagneto Po – Progetto Marta – Visione Sostenibile: aiuola bassa manutenzione 200 mq",
        caption: "Aiuola bassa manutenzione 200 mq",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/photos/castagneto-po-marta/castagneto-po-marta_gallery-02.jpg`,
        thumb: `${BASE}/photos/castagneto-po-marta/castagneto-po-marta_gallery-02_thumb.jpg`,
        alt: "Castagneto Po – Progetto Marta – Visione Sostenibile: irrigazione wi-fi a basso consumo",
        caption: "Irrigazione Wi-Fi a basso consumo",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/photos/castagneto-po-marta/castagneto-po-marta_gallery-03.jpg`,
        thumb: `${BASE}/photos/castagneto-po-marta/castagneto-po-marta_gallery-03_thumb.jpg`,
        alt: "Castagneto Po – Progetto Marta – Visione Sostenibile: robot tagliaerba autonomo",
        caption: "Robot tagliaerba autonomo",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/photos/castagneto-po-marta/castagneto-po-marta_gallery-04.jpg`,
        thumb: `${BASE}/photos/castagneto-po-marta/castagneto-po-marta_gallery-04_thumb.jpg`,
        alt: "Castagneto Po – Progetto Marta – Visione Sostenibile: dettaglio aiuole e bordure",
        caption: "Dettaglio aiuole e bordure",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/photos/castagneto-po-marta/castagneto-po-marta_gallery-05.jpg`,
        thumb: `${BASE}/photos/castagneto-po-marta/castagneto-po-marta_gallery-05_thumb.jpg`,
        alt: "Castagneto Po – Progetto Marta – Visione Sostenibile: risultato finale del giardino",
        caption: "Risultato finale del giardino",
        type: "gallery",
        dimensions: "1800x1200",
      },
    ],
    renders: [],
    features: [
      "Garden design personalizzato",
      "Prato macroterme a bassa manutenzione",
      "Irrigazione Wi-Fi smart",
      "Robot tagliaerba autonomo",
      "Giardino 200 mq ottimizzato",
    ],
    description: "Progetto di garden design per un giardino di 200 mq a Castagneto Po. Prato macroterme a bassissima manutenzione, irrigazione Wi-Fi con centralina smart e sensori pioggia, robot tagliaerba autonomo. Un giardino moderno e tecnologico che richiede minima cura manuale, perfetto per chi desidera un verde sempre impeccabile senza fatica.",
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
    hero_image: p("photos/veronica/veronica_hero.jpg"),
    hero_alt: "Veronica – Rifacimento Giardino – Visione Sostenibile: vista d'insieme del progetto realizzato",
    thumbnail: p("photos/veronica/veronica_hero_thumb.jpg"),
    photos: [
      {
        src: `${BASE}/photos/veronica/veronica_hero.jpg`,
        thumb: `${BASE}/photos/veronica/veronica_hero_thumb.jpg`,
        alt: "Veronica – Rifacimento Giardino – Visione Sostenibile: vista d'insieme del progetto realizzato",
        caption: "Panoramica del progetto Veronica – Rifacimento Giardino",
        type: "hero",
        dimensions: "1920x1080",
      },
      {
        src: `${BASE}/photos/veronica/veronica_gallery-01.jpg`,
        thumb: `${BASE}/photos/veronica/veronica_gallery-01_thumb.jpg`,
        alt: "Veronica – Rifacimento Giardino – Visione Sostenibile: prato di trifoglio a crescita bassa",
        caption: "Prato di trifoglio a crescita bassa",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/photos/veronica/veronica_gallery-02.jpg`,
        thumb: `${BASE}/photos/veronica/veronica_gallery-02_thumb.jpg`,
        alt: "Veronica – Rifacimento Giardino – Visione Sostenibile: camminamenti in traversine certificate",
        caption: "Camminamenti in traversine certificate",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/photos/veronica/veronica_gallery-03.jpg`,
        thumb: `${BASE}/photos/veronica/veronica_gallery-03_thumb.jpg`,
        alt: "Veronica – Rifacimento Giardino – Visione Sostenibile: acero japonico e camelie",
        caption: "Acero japonico e camelie",
        type: "gallery",
        dimensions: "1800x1200",
      },
    ],
    renders: [
      {
        src: `${BASE}/photos/veronica/veronica_render-00.jpg`,
        thumb: `${BASE}/photos/veronica/veronica_render-00.jpg`,
        alt: "Veronica – Rifacimento Giardino – render/progetto 1",
        caption: "Progetto e render 1",
        type: "render",
      },
      {
        src: `${BASE}/photos/veronica/veronica_render-01.jpg`,
        thumb: `${BASE}/photos/veronica/veronica_render-01.jpg`,
        alt: "Veronica – Rifacimento Giardino – render/progetto 2",
        caption: "Progetto e render 2",
        type: "render",
      },
      {
        src: `${BASE}/photos/veronica/veronica_render-02.jpg`,
        thumb: `${BASE}/photos/veronica/veronica_render-02.jpg`,
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
    hero_image: p("photos/maria-rosa-santhia/maria-rosa-santhia_hero.jpg"),
    hero_alt: "Maria Rosa – Santhià – Visione Sostenibile: vista d'insieme del progetto realizzato",
    thumbnail: p("photos/maria-rosa-santhia/maria-rosa-santhia_hero_thumb.jpg"),
    photos: [
      {
        src: `${BASE}/photos/maria-rosa-santhia/maria-rosa-santhia_hero.jpg`,
        thumb: `${BASE}/photos/maria-rosa-santhia/maria-rosa-santhia_hero_thumb.jpg`,
        alt: "Maria Rosa – Santhià – Visione Sostenibile: vista d'insieme del progetto realizzato",
        caption: "Panoramica del progetto Maria Rosa a Santhià",
        type: "hero",
        dimensions: "1920x1080",
      },
      {
        src: `${BASE}/photos/maria-rosa-santhia/maria-rosa-santhia_gallery-01.jpg`,
        thumb: `${BASE}/photos/maria-rosa-santhia/maria-rosa-santhia_gallery-01_thumb.jpg`,
        alt: "Maria Rosa – Santhià – Visione Sostenibile: prato sintetico e dry garden",
        caption: "Prato sintetico e dry garden",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/photos/maria-rosa-santhia/maria-rosa-santhia_gallery-02.jpg`,
        thumb: `${BASE}/photos/maria-rosa-santhia/maria-rosa-santhia_gallery-02_thumb.jpg`,
        alt: "Maria Rosa – Santhià – Visione Sostenibile: aiuole con ghiaie decorative",
        caption: "Aiuole con ghiaie decorative",
        type: "gallery",
        dimensions: "1800x1200",
      },
    ],
    renders: [],
    features: [
      "Prato sintetico professionale",
      "Dry garden a bassa manutenzione",
      "Aiuole con ghiaie decorative",
      "Giardino 200 mq ottimizzato",
    ],
    description: "Allestimento giardino di 200 mq a Santhià con prato sintetico professionale e concept dry garden. Aiuole con ghiaie decorative e piante resistenti alla siccità. Un progetto pensato per chi desidera un giardino sempre bello con manutenzione praticamente nulla, ideale per il clima piemontese.",
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
    hero_image: p("photos/agriturismo-durando-portacomaro/agriturismo-durando-portacomaro_hero.jpg"),
    hero_alt: "Agriturismo Durando – Portacomaro – Visione Sostenibile: vista d'insieme del progetto realizzato",
    thumbnail: p("photos/agriturismo-durando-portacomaro/agriturismo-durando-portacomaro_hero_thumb.jpg"),
    photos: [
      {
        src: `${BASE}/photos/agriturismo-durando-portacomaro/agriturismo-durando-portacomaro_hero.jpg`,
        thumb: `${BASE}/photos/agriturismo-durando-portacomaro/agriturismo-durando-portacomaro_hero_thumb.jpg`,
        alt: "Agriturismo Durando – Portacomaro – Visione Sostenibile: vista d'insieme del progetto realizzato",
        caption: "Panoramica del progetto Agriturismo Durando – Portacomaro",
        type: "hero",
        dimensions: "1920x1080",
      },
      {
        src: `${BASE}/photos/agriturismo-durando-portacomaro/agriturismo-durando-portacomaro_gallery-01.jpg`,
        thumb: `${BASE}/photos/agriturismo-durando-portacomaro/agriturismo-durando-portacomaro_gallery-01_thumb.jpg`,
        alt: "Agriturismo Durando – Portacomaro – Visione Sostenibile: irrigazione wi-fi con stazione meteo",
        caption: "Irrigazione Wi-Fi con stazione meteo",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/photos/agriturismo-durando-portacomaro/agriturismo-durando-portacomaro_gallery-02.jpg`,
        thumb: `${BASE}/photos/agriturismo-durando-portacomaro/agriturismo-durando-portacomaro_gallery-02_thumb.jpg`,
        alt: "Agriturismo Durando – Portacomaro – Visione Sostenibile: impianto anti-zanzare perimetrale",
        caption: "Impianto anti-zanzare perimetrale",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/photos/agriturismo-durando-portacomaro/agriturismo-durando-portacomaro_gallery-03.jpg`,
        thumb: `${BASE}/photos/agriturismo-durando-portacomaro/agriturismo-durando-portacomaro_gallery-03_thumb.jpg`,
        alt: "Agriturismo Durando – Portacomaro – Visione Sostenibile: robot tagliaerba gps 3 ruote motrici",
        caption: "Robot tagliaerba GPS 3 ruote motrici",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/photos/agriturismo-durando-portacomaro/agriturismo-durando-portacomaro_gallery-04.jpg`,
        thumb: `${BASE}/photos/agriturismo-durando-portacomaro/agriturismo-durando-portacomaro_gallery-04_thumb.jpg`,
        alt: "Agriturismo Durando – Portacomaro – Visione Sostenibile: 45 essenze officinali a km/0",
        caption: "45 essenze officinali a km/0",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/photos/agriturismo-durando-portacomaro/agriturismo-durando-portacomaro_gallery-05.jpg`,
        thumb: `${BASE}/photos/agriturismo-durando-portacomaro/agriturismo-durando-portacomaro_gallery-05_thumb.jpg`,
        alt: "Agriturismo Durando – Portacomaro – Visione Sostenibile: illuminazione solare professionale",
        caption: "Illuminazione solare professionale",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/photos/agriturismo-durando-portacomaro/agriturismo-durando-portacomaro_gallery-06.jpg`,
        thumb: `${BASE}/photos/agriturismo-durando-portacomaro/agriturismo-durando-portacomaro_gallery-06_thumb.jpg`,
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
    hero_image: p("photos/portacomaro-ruta/portacomaro-ruta_hero.jpg"),
    hero_alt: "Portacomaro – Ruta – Visione Sostenibile: vista d'insieme del progetto realizzato",
    thumbnail: p("photos/portacomaro-ruta/portacomaro-ruta_hero_thumb.jpg"),
    photos: [
      {
        src: `${BASE}/photos/portacomaro-ruta/portacomaro-ruta_hero.jpg`,
        thumb: `${BASE}/photos/portacomaro-ruta/portacomaro-ruta_hero_thumb.jpg`,
        alt: "Portacomaro – Ruta – Visione Sostenibile: vista d'insieme del progetto realizzato",
        caption: "Panoramica del progetto Portacomaro Ruta",
        type: "hero",
        dimensions: "1920x1080",
      },
      {
        src: `${BASE}/photos/portacomaro-ruta/portacomaro-ruta_gallery-01.jpg`,
        thumb: `${BASE}/photos/portacomaro-ruta/portacomaro-ruta_gallery-01_thumb.jpg`,
        alt: "Portacomaro – Ruta – Visione Sostenibile: giardino nel Monferrato",
        caption: "Giardino nel Monferrato",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/photos/portacomaro-ruta/portacomaro-ruta_gallery-02.jpg`,
        thumb: `${BASE}/photos/portacomaro-ruta/portacomaro-ruta_gallery-02_thumb.jpg`,
        alt: "Portacomaro – Ruta – Visione Sostenibile: dettaglio piantumazione",
        caption: "Dettaglio piantumazione",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/photos/portacomaro-ruta/portacomaro-ruta_gallery-03.jpg`,
        thumb: `${BASE}/photos/portacomaro-ruta/portacomaro-ruta_gallery-03_thumb.jpg`,
        alt: "Portacomaro – Ruta – Visione Sostenibile: area verde completata",
        caption: "Area verde completata",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/photos/portacomaro-ruta/portacomaro-ruta_gallery-04.jpg`,
        thumb: `${BASE}/photos/portacomaro-ruta/portacomaro-ruta_gallery-04_thumb.jpg`,
        alt: "Portacomaro – Ruta – Visione Sostenibile: vista d'insieme",
        caption: "Vista d'insieme",
        type: "gallery",
        dimensions: "1800x1200",
      },
    ],
    renders: [
      {
        src: `${BASE}/photos/portacomaro-ruta/portacomaro-ruta_render-00.jpg`,
        thumb: `${BASE}/photos/portacomaro-ruta/portacomaro-ruta_render-00.jpg`,
        alt: "Portacomaro – Ruta – render/progetto",
        caption: "Progetto e render",
        type: "render",
      },
    ],
    features: [
      "Progetto giardino nel Monferrato",
      "Piantumazione selezionata",
    ],
    description: "Progetto e realizzazione di un giardino nel cuore del Monferrato a Portacomaro. Un intervento che valorizza il contesto collinare piemontese con una piantumazione attenta e selezionata.",
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
    hero_image: p("photos/porto-val-travaglia/porto-val-travaglia_hero.jpg"),
    hero_alt: "Porto Val Travaglia – Visione Sostenibile: vista d'insieme del progetto realizzato",
    thumbnail: p("photos/porto-val-travaglia/porto-val-travaglia_hero_thumb.jpg"),
    photos: [
      {
        src: `${BASE}/photos/porto-val-travaglia/porto-val-travaglia_hero.jpg`,
        thumb: `${BASE}/photos/porto-val-travaglia/porto-val-travaglia_hero_thumb.jpg`,
        alt: "Porto Val Travaglia – Visione Sostenibile: vista d'insieme del progetto realizzato",
        caption: "Panoramica del progetto Porto Val Travaglia",
        type: "hero",
        dimensions: "1920x1080",
      },
      {
        src: `${BASE}/photos/porto-val-travaglia/porto-val-travaglia_gallery-01.jpg`,
        thumb: `${BASE}/photos/porto-val-travaglia/porto-val-travaglia_gallery-01_thumb.jpg`,
        alt: "Porto Val Travaglia – Visione Sostenibile: pergola e area relax",
        caption: "Pergola e area relax",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/photos/porto-val-travaglia/porto-val-travaglia_gallery-02.jpg`,
        thumb: `${BASE}/photos/porto-val-travaglia/porto-val-travaglia_gallery-02_thumb.jpg`,
        alt: "Porto Val Travaglia – Visione Sostenibile: ortensie e siepi",
        caption: "Ortensie e siepi",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/photos/porto-val-travaglia/porto-val-travaglia_gallery-03.jpg`,
        thumb: `${BASE}/photos/porto-val-travaglia/porto-val-travaglia_gallery-03_thumb.jpg`,
        alt: "Porto Val Travaglia – Visione Sostenibile: aiuola rialzata in pietra",
        caption: "Aiuola rialzata in pietra",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/photos/porto-val-travaglia/porto-val-travaglia_gallery-04.jpg`,
        thumb: `${BASE}/photos/porto-val-travaglia/porto-val-travaglia_gallery-04_thumb.jpg`,
        alt: "Porto Val Travaglia – Visione Sostenibile: lagerstroemia in fiore",
        caption: "Lagerstroemia in fiore",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/photos/porto-val-travaglia/porto-val-travaglia_gallery-05.jpg`,
        thumb: `${BASE}/photos/porto-val-travaglia/porto-val-travaglia_gallery-05_thumb.jpg`,
        alt: "Porto Val Travaglia – Visione Sostenibile: illuminazione solare nel parco",
        caption: "Illuminazione solare nel parco",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/photos/porto-val-travaglia/porto-val-travaglia_gallery-06.jpg`,
        thumb: `${BASE}/photos/porto-val-travaglia/porto-val-travaglia_gallery-06_thumb.jpg`,
        alt: "Porto Val Travaglia – Visione Sostenibile: dettaglio piantumazione",
        caption: "Dettaglio piantumazione",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/photos/porto-val-travaglia/porto-val-travaglia_gallery-07.jpg`,
        thumb: `${BASE}/photos/porto-val-travaglia/porto-val-travaglia_gallery-07_thumb.jpg`,
        alt: "Porto Val Travaglia – Visione Sostenibile: camminamento e bordure",
        caption: "Camminamento e bordure",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/photos/porto-val-travaglia/porto-val-travaglia_gallery-08.jpg`,
        thumb: `${BASE}/photos/porto-val-travaglia/porto-val-travaglia_gallery-08_thumb.jpg`,
        alt: "Porto Val Travaglia – Visione Sostenibile: area verde e prato",
        caption: "Area verde e prato",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/photos/porto-val-travaglia/porto-val-travaglia_gallery-09.jpg`,
        thumb: `${BASE}/photos/porto-val-travaglia/porto-val-travaglia_gallery-09_thumb.jpg`,
        alt: "Porto Val Travaglia – Visione Sostenibile: siepe perimetrale",
        caption: "Siepe perimetrale",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/photos/porto-val-travaglia/porto-val-travaglia_gallery-10.jpg`,
        thumb: `${BASE}/photos/porto-val-travaglia/porto-val-travaglia_gallery-10_thumb.jpg`,
        alt: "Porto Val Travaglia – Visione Sostenibile: dettaglio aiuole",
        caption: "Dettaglio aiuole",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/photos/porto-val-travaglia/porto-val-travaglia_gallery-11.jpg`,
        thumb: `${BASE}/photos/porto-val-travaglia/porto-val-travaglia_gallery-11_thumb.jpg`,
        alt: "Porto Val Travaglia – Visione Sostenibile: zona ombreggiata",
        caption: "Zona ombreggiata",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/photos/porto-val-travaglia/porto-val-travaglia_gallery-12.jpg`,
        thumb: `${BASE}/photos/porto-val-travaglia/porto-val-travaglia_gallery-12_thumb.jpg`,
        alt: "Porto Val Travaglia – Visione Sostenibile: panoramica laterale",
        caption: "Panoramica laterale",
        type: "gallery",
        dimensions: "1800x1200",
      },
      {
        src: `${BASE}/photos/porto-val-travaglia/porto-val-travaglia_gallery-13.jpg`,
        thumb: `${BASE}/photos/porto-val-travaglia/porto-val-travaglia_gallery-13_thumb.jpg`,
        alt: "Porto Val Travaglia – Visione Sostenibile: risultato finale",
        caption: "Risultato finale",
        type: "gallery",
        dimensions: "1800x1200",
      },
    ],
    renders: [],
    features: [
      "Parco 1.800 mq sul Lago Maggiore",
      "Pergola e area relax",
      "Ortensie e siepi perimetrali",
      "Aiuole rialzate in pietra locale",
      "Lagerstroemia ornamentale",
      "Illuminazione solare professionale",
    ],
    description: "Realizzazione completa di un parco di 1.800 mq a Porto Valtravaglia sulla sponda lombarda del Lago Maggiore. Pergola con area relax, siepi perimetrali di ortensie, aiuole rialzate in pietra locale, lagerstroemia ornamentali e illuminazione solare professionale. Un progetto che coniuga funzionalità e bellezza nel contesto unico del lago.",
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
      "Giardino storico nelle Langhe",
      "Irrigazione Wi-Fi smart",
      "Ulivi secolari messi a dimora",
      "Siepi e terrazzi curati",
    ],
    description: "Allestimento di un giardino storico nelle Langhe a Cortemilia. Messa a dimora di ulivi secolari, realizzazione di siepi perimetrali e cura dei terrazzi esistenti. Impianto di irrigazione Wi-Fi con centralina smart per gestione remota. Un progetto che rispetta il carattere storico del luogo integrandolo con tecnologie moderne.",
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
      "Garden design per villa 450 mq",
      "Irrigazione Wi-Fi smart",
      "Robot tagliaerba GPS",
      "Terrazzamenti in pietra",
      "Ulivo secolare ornamentale",
    ],
    description: "Allestimento completo del giardino di una villa a Chieri, 450 mq. Garden design con terrazzamenti in pietra naturale, messa a dimora di un ulivo secolare ornamentale, irrigazione Wi-Fi con sensori e robot tagliaerba GPS. Un giardino elegante e tecnologico alle porte di Torino.",
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
      "Garden design 350 mq",
      "Concept dry garden",
      "Irrigazione Wi-Fi smart",
      "Robot tagliaerba autonomo",
      "Camminamenti in pietra naturale",
    ],
    description: "Garden design per un giardino di 350 mq a Castagneto Po. Concept dry garden con piante resistenti alla siccità, camminamenti in pietra naturale, irrigazione Wi-Fi con centralina smart e robot tagliaerba autonomo. Un giardino contemporaneo a bassa manutenzione che combina estetica e sostenibilità.",
  },
];

/** Get all unique tags across all projects */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const project of portfolioProjects) {
    for (const tag of project.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags).sort();
}

/** Get projects with photos (for the visual grid) */
export function getProjectsWithPhotos(): PortfolioProject[] {
  return portfolioProjects.filter((p) => p.has_photos);
}

/** Get projects without photos (for the text list) */
export function getProjectsWithoutPhotos(): PortfolioProject[] {
  return portfolioProjects.filter((p) => !p.has_photos);
}

/** Find a project by slug */
export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return portfolioProjects.find((p) => p.slug === slug);
}

/** Format tag for display (kebab-case to Title Case) */
export function formatTag(tag: string): string {
  return tag
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
