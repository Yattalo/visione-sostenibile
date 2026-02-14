import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, User, ArrowRight, ListChecks } from "lucide-react";
import { blogPosts, getBlogPost, getRelatedPosts } from "../../lib/blog";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { SlideUp, FadeIn } from "../../components/animations";

type TemplateVariant = 1 | 2 | 3;

type FaqItem = {
  question: string;
  answer: string;
};

const SITE_URL = "https://www.visionesostenibile.it";

// ═══════════════════════════════════════════════════════════
// NANO BANANA PROMPT (cover 1.1):
// Giardino autunnale italiano, foglie rosse/arancio/gialle,
// prato con muschio, piante aromatiche, luce mattutina dorata,
// stile foto editoriale italiana, palette: terra, ruggine, oro
// ═══════════════════════════════════════════════════════════
// NANO BANANA PROMPT (cover 2.1):
// Giardino contemporaneo minimal, linee geometriche, pietra grigia,
// piante strutturate verdi scuro, illuminazione LED calda,
// stile architettura del paesaggio italiana
// ═══════════════════════════════════════════════════════════
// NANO BANANA PROMPT (cover 3.1):
// Terreno in pendio terrazzato con piante verdi striscianti,
// muretti in pietra naturale, luce laterale,
// stile giardino mediterraneo italiano
// ═══════════════════════════════════════════════════════════
const coverImages: Record<string, string> = {
  "come-mantenere-giardino-autunno": "/images/blog/autunno-cover.png",
  "tendenze-giardini-2024": "/images/blog/tendenze-cover.png",
  "piante-pendio": "/images/blog/pendio-cover.png",
};

// ═══════════════════════════════════════════════════════════
// NANO BANANA PROMPT (thumb 1.2):
// Thumbnail giardino autunnale, foglie colorate su prato,
// formato quadrato, luce calda, palette autunno
// ═══════════════════════════════════════════════════════════
// NANO BANANA PROMPT (thumb 2.2):
// Thumbnail giardino moderno, piante geometriche, pietra,
// formato quadrato, toni verdi e grigi
// ═══════════════════════════════════════════════════════════
// NANO BANANA PROMPT (thumb 3.2):
// Thumbnail pendio verde terrazzato, piante coprisuolo,
// formato quadrato, toni verdi e terra
// ═══════════════════════════════════════════════════════════
const thumbImages: Record<string, string> = {
  "come-mantenere-giardino-autunno": "/images/blog/autunno-cover.png",
  "tendenze-giardini-2024": "/images/blog/tendenze-cover.png",
  "piante-pendio": "/images/blog/pendio-cover.png",
};

// ═══════════════════════════════════════════════════════════
// NANO BANANA PROMPT (infografica 1.2):
// Calendario visivo autunno-inverno per giardinaggio,
// 4 mesi in colonne (SET-OTT-NOV-DIC), icone piante/attrezzi,
// colori caldi terracotta e verde muschio, design italiano minimal
// ═══════════════════════════════════════════════════════════
// NANO BANANA PROMPT (infografica 2.2):
// 5 cerchi colorati collegati, icone per ogni tendenza
// (foglia-basso costo, ape-biodiversita, casa-soggiorno esterno,
// chip-tecnologia, pennello-colori), palette moss green e terracotta
// ═══════════════════════════════════════════════════════════
// NANO BANANA PROMPT (infografica 3.2):
// Schema infografico pendio sezione laterale, radici profonde
// evidenziate, frecce erosione bloccata, 8 piante con icona
// e funzione, palette verde muschio e terra
// ═══════════════════════════════════════════════════════════
const infographicImages: Record<string, string> = {
  "come-mantenere-giardino-autunno": "/images/blog/autunno-calendario.png",
  "tendenze-giardini-2024": "/images/blog/tendenze-infografica.png",
  "piante-pendio": "/images/blog/pendio-infografica.png",
};

// ═══════════════════════════════════════════════════════════
// NANO BANANA PROMPT (schema 1.3):
// Tabella illustrata piante sensibili al freddo, 6 piante con
// icona + metodo protezione (telo/pacciame/vaso), sfondo crema,
// linee verde muschio
// ═══════════════════════════════════════════════════════════
// NANO BANANA PROMPT (foto 1.4):
// Close-up mani che applicano pacciamatura, foglie secche,
// terra umida, stile fotografico rustico italiano
// ═══════════════════════════════════════════════════════════
// NANO BANANA PROMPT (foto 2.3):
// Sistema irrigazione a goccia con sensore umidita, giardino
// moderno sullo sfondo, luce naturale, stile tech lifestyle
// ═══════════════════════════════════════════════════════════
// NANO BANANA PROMPT (foto 2.4):
// Angolo giardino con divano outdoor, fire pit, luci calde,
// piante in vaso, atmosfera serale cozy, design italiano
// ═══════════════════════════════════════════════════════════
// NANO BANANA PROMPT (schema 3.3):
// Tutorial visivo 4 step installazione geotessile, sezioni
// progressive con frecce, colori terracotta e verde, design
// italiano chiaro
// ═══════════════════════════════════════════════════════════
// NANO BANANA PROMPT (foto 3.4):
// Pendio soleggiato con lavanda in fiore, vista dall'alto,
// colori viola e verde argenteo, stile fotografico aereo
// ═══════════════════════════════════════════════════════════
const schemaImages: Record<string, string> = {
  "come-mantenere-giardino-autunno": "/images/blog/autunno-protezione-piante.png",
  "tendenze-giardini-2024": "/images/blog/tendenze-irrigazione-smart.png",
  "piante-pendio": "/images/blog/pendio-geotessile.png",
};

const quickAnswers: Record<string, string> = {
  "come-mantenere-giardino-autunno":
    "Per mantenere il giardino in autunno conviene pulire foglie e residui, proteggere le piante sensibili dal freddo, ridurre ma non azzerare l'irrigazione e concimare con prodotti ricchi di potassio. In questa fase prepari le radici all'inverno e migliori la ripresa vegetativa primaverile.",
  "tendenze-giardini-2024":
    "Le tendenze giardino 2024 puntano su bassa manutenzione, biodiversita e tecnologia smart: piante resistenti, irrigazione automatizzata, aree living esterne e illuminazione efficiente. L'obiettivo e avere spazi belli, funzionali e sostenibili con minori consumi nel tempo.",
  "piante-pendio":
    "Le migliori piante per terreni in pendio sono quelle con radici robuste, buona tolleranza alla siccita e funzione antierosione. In pratica: lavanda, rosmarino, coprisuolo come vinca e timo strisciante, piu una posa corretta con geotessili e irrigazione a goccia.",
};

const articleSteps: Record<string, string[]> = {
  "come-mantenere-giardino-autunno": [
    "Pulisci il giardino: rimuovi foglie secche, fiori appassiti e rami danneggiati.",
    "Esegui le potature leggere su perenni e arbusti sfioriti (taglia a 10-15 cm).",
    "Proteggi le piante sensibili al freddo con TNT, pacciamatura e isolamento vasi.",
    "Pianta bulbi primaverili e arbusti a foglia caduca nel terreno ancora caldo.",
    "Concima con prodotto a lento rilascio ricco di potassio (rapporto es. 5-5-15).",
    "Prepara l'impianto di irrigazione per l'inverno: svuota i tubi e chiudi le valvole.",
    "Composta le foglie raccolte e pianifica i lavori primaverili.",
  ],
  "tendenze-giardini-2024": [
    "Analizza il tuo giardino attuale: consumi idrici, ore di manutenzione, biodiversita presente.",
    "Sostituisci gradualmente le piante esotiche con specie autoctone resistenti alla siccita.",
    "Integra almeno 3 elementi per la biodiversita: hotel insetti, mangiatoie, piante nettarifere.",
    "Progetta un'area living esterna con funzione definita (relax, cucina o lavoro).",
    "Installa irrigazione smart con sensori di umidita e programmazione meteo.",
    "Scegli una palette cromatica di massimo 3 colori e pianifica fioriture scalari.",
  ],
  "piante-pendio": [
    "Misura inclinazione ed esposizione del pendio (bussola e clinometro o app).",
    "Analizza il tipo di suolo: argilloso, sabbioso o misto.",
    "Stendi geotessile dall'alto verso il basso, fissandolo con picchetti ogni 50 cm.",
    "Scegli le specie in base all'esposizione: aromatiche al sole, felci e edera all'ombra.",
    "Pianta densamente a quinconce (6-9 coprisuolo/mq, 3-4 arbusti/mq) partendo dal basso.",
    "Installa irrigazione a goccia seguendo le curve di livello del pendio.",
    "Mantieni irrigazione frequente il primo anno (2-3 volte/settimana in estate).",
    "Dal secondo anno riduci gli interventi: potature e controllo geotessile.",
  ],
};

const articleFaqs: Record<string, FaqItem[]> = {
  "come-mantenere-giardino-autunno": [
    {
      question: "Quali lavori fare in giardino in autunno?",
      answer:
        "I lavori principali sono pulizia del verde, potature leggere, protezione dal freddo e concimazione autunnale. Sono attivita utili per limitare danni invernali e favorire una buona ripartenza in primavera.",
    },
    {
      question: "Quanto irrigare il giardino in autunno?",
      answer:
        "L'irrigazione va ridotta rispetto all'estate ma non interrotta del tutto. Frequenza e quantita dipendono da piogge, tipo di suolo e specie presenti, con preferenza per irrigazioni meno frequenti ma profonde, circa una volta ogni 10-15 giorni.",
    },
    {
      question: "Che concime usare prima dell'inverno?",
      answer:
        "In genere conviene un concime a rilascio lento con potassio, utile a rinforzare le radici. Si evitano formulazioni troppo azotate che stimolano una crescita tardiva poco adatta ai mesi freddi. Un rapporto NPK orientativo e 5-5-15.",
    },
    {
      question: "Quando piantare i bulbi primaverili?",
      answer:
        "Il periodo ideale per piantare bulbi come tulipani, narcisi e giacinti e tra ottobre e novembre, quando il terreno e ancora lavorabile ma le temperature sono scese stabilmente sotto i 15 gradi. In Italia centrale, fine ottobre e il momento perfetto.",
    },
    {
      question: "Come proteggere le piante in vaso dal gelo?",
      answer:
        "Avvolgi i vasi con tessuto isolante o pluriball, posizionali vicino a un muro esposto a sud che accumula calore durante il giorno, e solleva i vasi da terra con piedini per evitare il contatto con superfici gelate. Riduci le innaffiature ma non sospenderle.",
    },
  ],
  "tendenze-giardini-2024": [
    {
      question: "Qual e la tendenza principale per i giardini nel 2024?",
      answer:
        "La tendenza principale e la riduzione della manutenzione con approccio sostenibile: piante resistenti, automazione dell'irrigazione e scelte progettuali che riducono consumi di acqua e tempo. Un giardino a bassa manutenzione ben progettato richiede solo 2-3 ore al mese.",
    },
    {
      question: "Come rendere il giardino piu sostenibile?",
      answer:
        "Si parte da specie adatte al clima locale, irrigazione intelligente con sensori di umidita, suolo protetto con pacciamatura e integrazione di habitat utili alla biodiversita. Questo migliora equilibrio ecologico e riduce i costi di gestione fino al 60%.",
    },
    {
      question: "Tecnologia e giardinaggio possono convivere?",
      answer:
        "Si. Sensori di umidita, centraline smart e illuminazione controllata permettono gestione piu efficiente del verde, mantenendo qualita estetica e riducendo sprechi energetici e idrici. Il ritorno sull'investimento medio e di 2-3 anni.",
    },
    {
      question: "Quanto si risparmia con l'irrigazione smart?",
      answer:
        "Un sistema di irrigazione smart con sensori di umidita e collegamento alle previsioni meteo riduce i consumi idrici del 40-60% rispetto a un impianto tradizionale a timer. Su un giardino di 200 mq, questo puo significare un risparmio di 30.000-40.000 litri d'acqua all'anno.",
    },
    {
      question: "Come creare un'area living esterna funzionale?",
      answer:
        "Definisci una funzione principale (cucina, relax o lavoro), scegli materiali resistenti come legno termottrattato e tessuti outdoor anti-UV, prevedi illuminazione scenografica a LED e prese elettriche. Un fire pit estende l'uso dello spazio da marzo a novembre.",
    },
  ],
  "piante-pendio": [
    {
      question: "Come evitare l'erosione in un terreno in pendenza?",
      answer:
        "Per limitare erosione servono radici stabilizzanti, copertura vegetale continua e gestione corretta dell'acqua. Spesso si combinano coprisuolo, arbusti e sistemi di drenaggio o geotessili. La chiave e piantare densamente: 6-9 piante per metro quadro.",
    },
    {
      question: "Quali piante usare in pendio soleggiato?",
      answer:
        "In pendio soleggiato funzionano bene aromatiche e specie rustiche come lavanda, rosmarino prostrato, salvia, ginestra e cisto. I coprisuolo come timo strisciante e santolina completano la copertura. Tutte queste specie tollerano siccita e terreni poveri.",
    },
    {
      question: "E utile l'irrigazione a goccia in pendenza?",
      answer:
        "Si, e spesso la scelta migliore. L'irrigazione a goccia distribuisce acqua in modo progressivo e controllato, riducendo ruscellamento superficiale e consumi idrici del 60-70%. Le linee vanno installate orizzontalmente, seguendo le curve di livello del pendio.",
    },
    {
      question: "Come installare i geotessili su un pendio?",
      answer:
        "Stendi il geotessile dall'alto verso il basso, fissalo con picchetti a U ogni 50 cm lungo i bordi e ogni metro al centro. Sovrapponi i teli di almeno 15 cm. Taglia aperture a croce dove pianterai e ricopri con 3-5 cm di pacciamatura dopo la piantumazione.",
    },
    {
      question: "Quanto tempo serve prima che un pendio diventi autosufficiente?",
      answer:
        "Il primo anno e critico e richiede irrigazione frequente e diserbo manuale ogni 2-3 settimane. Dal secondo anno gli interventi si dimezzano. Dal terzo anno un pendio ben piantato diventa quasi autosufficiente, richiedendo solo potature di contenimento 1-2 volte l'anno.",
    },
  ],
};

const templateLabels: Record<TemplateVariant, string> = {
  1: "Template Editoriale",
  2: "Template Guida Rapida",
  3: "Template Checklist",
};

function resolveTemplate(
  value: string | string[] | undefined,
  fallbackIndex: number
): TemplateVariant {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number(raw);
  if (parsed === 1 || parsed === 2 || parsed === 3) {
    return parsed;
  }

  const normalizedIndex = fallbackIndex >= 0 ? fallbackIndex : 0;
  return ((normalizedIndex % 3) + 1) as TemplateVariant;
}

function renderArticleContent(content: string) {
  return content
    .trim()
    .split("\n\n")
    .map((paragraph, index) => {
      const line = paragraph.trim();

      if (line.startsWith("## ")) {
        return (
          <h2
            key={`h2-${index}`}
            className="font-display text-2xl lg:text-3xl font-normal text-charcoal-800 mt-12 mb-5"
          >
            {line.replace("## ", "")}
          </h2>
        );
      }

      if (line.startsWith("### ")) {
        return (
          <h3
            key={`h3-${index}`}
            className="font-display text-xl lg:text-2xl font-normal text-charcoal-800 mt-8 mb-4"
          >
            {line.replace("### ", "")}
          </h3>
        );
      }

      if (line.startsWith("- ")) {
        return (
          <ul key={`ul-${index}`} className="my-6 space-y-3 pl-0 list-none">
            {line.split("\n").map((item, i) => (
              <li key={`li-${i}`} className="flex items-start gap-3 text-charcoal-600">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta-400 mt-2.5 shrink-0" />
                <span>{item.replace("- ", "")}</span>
              </li>
            ))}
          </ul>
        );
      }

      if (/^\d+\.\s/.test(line)) {
        return (
          <ol key={`ol-${index}`} className="my-6 space-y-3 pl-0 list-none">
            {line.split("\n").map((item, i) => (
              <li key={`oli-${i}`} className="flex items-start gap-3 text-charcoal-600">
                <span className="font-sans text-sm font-medium text-terracotta-500 mt-0.5 shrink-0 w-5">
                  {i + 1}.
                </span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: item
                      .replace(/^\d+\.\s*/, "")
                      .replace(
                        /\*\*(.*?)\*\*/g,
                        '<strong class="font-semibold text-charcoal-800">$1</strong>'
                      ),
                  }}
                />
              </li>
            ))}
          </ol>
        );
      }

      return (
        <p key={`p-${index}`} className="mb-6 text-charcoal-600 leading-relaxed">
          {line}
        </p>
      );
    });
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | Blog Visione Sostenibile`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ template?: string | string[] }>;
}) {
  const { slug } = await params;
  const query = await searchParams;

  const post = getBlogPost(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(slug);
  const postIndex = blogPosts.findIndex((item) => item.slug === slug);
  const template = resolveTemplate(query.template, postIndex);

  const quickAnswer = quickAnswers[slug] ?? post.excerpt;
  const steps = articleSteps[slug] ?? [
    "Analizza il contesto del giardino.",
    "Definisci obiettivi e priorita.",
    "Scegli specie e materiali coerenti.",
    "Pianifica manutenzione e verifiche periodiche.",
  ];
  const faqs = articleFaqs[slug] ?? [
    {
      question: "Come scegliere il prossimo intervento in giardino?",
      answer:
        "Conviene partire dallo stato attuale del verde, dagli obiettivi estetici e dal tempo disponibile per la manutenzione. Una pianificazione semplice e progressiva rende il risultato piu stabile nel tempo.",
    },
  ];

  const articleUrl = `${SITE_URL}/blog/${post.slug}`;
  const articleImage =
    coverImages[post.slug] ??
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200";

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    image: articleImage,
    mainEntityOfPage: articleUrl,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="relative overflow-hidden bg-moss-900 pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url('${articleImage}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-moss-900/95 via-moss-800/85 to-charcoal-900/90" />
        </div>

        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-terracotta-500/15 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-moss-500/20 rounded-full blur-3xl animate-drift" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-cream-300 hover:text-terracotta-300 transition-colors duration-300 mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              <span className="font-sans text-sm tracking-wide">Torna al Blog</span>
            </Link>
          </FadeIn>

          <SlideUp>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge variant="primary" size="sm">
                {post.category}
              </Badge>
              <Badge className="bg-white/10 backdrop-blur-sm border border-white/20 text-cream-100">
                {templateLabels[template]}
              </Badge>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-cream-50 mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-cream-300/80">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.publishedAt).toLocaleDateString("it-IT", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime} di lettura
              </span>
            </div>
          </SlideUp>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 lg:px-8 py-10 lg:py-12">
        <div className="bg-white border border-cream-200 rounded-2xl p-6 lg:p-8">
          <div className="flex items-center gap-2 mb-4">
            <ListChecks className="w-5 h-5 text-terracotta-600" />
            <h2 className="font-display text-2xl text-charcoal-800">Risposta rapida</h2>
          </div>
          <p className="font-body text-charcoal-700 leading-relaxed text-lg">{quickAnswer}</p>
        </div>
      </section>

      {template === 1 && (
        <>
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-deep">
              <Image
                src={articleImage}
                alt={post.title}
                fill
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

          <article className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
            <div className="font-body text-lg text-charcoal-700">{renderArticleContent(post.content)}</div>
          </article>
        </>
      )}

      {template === 2 && (
        <section className="max-w-6xl mx-auto px-6 lg:px-8 py-14 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            <article className="lg:col-span-2 bg-white rounded-2xl border border-cream-200 p-7 lg:p-10">
              <h2 className="font-display text-3xl text-charcoal-800 mb-6">Guida pratica</h2>
              <div className="font-body text-lg text-charcoal-700">{renderArticleContent(post.content)}</div>
            </article>

            <aside className="space-y-6">
              <div className="bg-cream-100 rounded-2xl p-6">
                <h3 className="font-display text-xl text-charcoal-800 mb-4">Passi chiave</h3>
                <ol className="space-y-3">
                  {steps.map((step, index) => (
                    <li key={step} className="flex gap-3 text-charcoal-700">
                      <span className="text-terracotta-600 font-semibold">{index + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="bg-moss-900 rounded-2xl p-6 text-cream-100">
                <h3 className="font-display text-xl mb-3">Da vedere</h3>
                <p className="text-cream-200/90 mb-4">Video dimostrativo del metodo operativo.</p>
                <video controls className="w-full rounded-xl" preload="metadata">
                  <source src="/videos/nature-garden-flowers.mp4" type="video/mp4" />
                </video>
              </div>
            </aside>
          </div>
        </section>
      )}

      {template === 3 && (
        <section className="max-w-5xl mx-auto px-6 lg:px-8 py-14 lg:py-16 space-y-8">
          <div className="bg-white border border-cream-200 rounded-2xl p-6 lg:p-8">
            <h2 className="font-display text-3xl text-charcoal-800 mb-5">Checklist operativa</h2>
            <ol className="space-y-4">
              {steps.map((step, index) => (
                <li key={step} className="flex items-start gap-3 text-charcoal-700 text-lg">
                  <span className="mt-0.5 font-semibold text-terracotta-600">{index + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-cream-100 rounded-2xl p-6 lg:p-8">
            <h3 className="font-display text-2xl text-charcoal-800 mb-4">Approfondimento</h3>
            <div className="font-body text-lg text-charcoal-700">{renderArticleContent(post.content)}</div>
          </div>

          <div className="bg-charcoal-900 rounded-2xl p-6 lg:p-8 text-cream-100">
            <h3 className="font-display text-2xl mb-4">Video esplicativo</h3>
            <video controls className="w-full rounded-xl" preload="metadata">
              <source src="/videos/garden-bloom-timelapse.mp4" type="video/mp4" />
            </video>
          </div>
        </section>
      )}

      <section className="max-w-5xl mx-auto px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-2xl border border-cream-200 p-6 lg:p-8">
          <h2 className="font-display text-3xl text-charcoal-800 mb-6">FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-xl border border-cream-200 p-4 open:bg-cream-50">
                <summary className="cursor-pointer list-none font-display text-lg text-charcoal-800">
                  {faq.question}
                </summary>
                <p className="mt-3 text-charcoal-600 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className="border-t border-cream-200 bg-cream-50">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
            <SlideUp>
              <h2 className="font-display text-3xl lg:text-4xl font-light text-charcoal-800 mb-12">
                Articoli <span className="italic text-moss-700">Correlati</span>
              </h2>
            </SlideUp>

            <SlideUp delay={0.15}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group block"
                  >
                    <Card variant="elevated" hover className="h-full overflow-hidden p-0">
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={
                            thumbImages[relatedPost.slug] ??
                            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600"
                          }
                          alt={relatedPost.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/20 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <Badge variant="earth" size="sm">
                            {relatedPost.category}
                          </Badge>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <h3 className="font-display text-xl font-light text-charcoal-800 mb-2 group-hover:text-moss-700 transition-colors duration-300 leading-snug">
                          {relatedPost.title}
                        </h3>
                        <p className="font-body text-sm text-charcoal-500 line-clamp-2 mb-4">
                          {relatedPost.excerpt}
                        </p>
                        <span className="inline-flex items-center gap-1.5 font-sans text-xs font-medium text-terracotta-600 group-hover:text-terracotta-700 transition-colors">
                          Leggi
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </SlideUp>
          </div>
        </section>
      )}
    </div>
  );
}
