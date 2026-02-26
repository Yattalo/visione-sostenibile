"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, User, ArrowRight, ListChecks, Loader2 } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { SlideUp, FadeIn } from "../components/animations";
import { getBlogPost as staticGetBlogPost, getRelatedPosts as staticGetRelatedPosts } from "../lib/blog";

type TemplateVariant = 1 | 2 | 3;

type FaqItem = {
  question: string;
  answer: string;
};

const SITE_URL = "https://www.visionesostenibile.it";

const quickAnswers: Record<string, string> = {
  "come-mantenere-giardino-autunno":
    "Per mantenere il giardino in autunno conviene pulire foglie e residui, proteggere le piante sensibili dal freddo, ridurre ma non azzerare l'irrigazione e concimare con prodotti ricchi di potassio. In questa fase prepari le radici all'inverno e migliori la ripresa vegetativa primaverile.",
  "tendenze-giardini-2026":
    "Le tendenze giardino 2026 puntano su bassa manutenzione, biodiversità e tecnologia smart: piante resistenti, irrigazione automatizzata, aree living esterne e illuminazione efficiente. L'obiettivo è avere spazi belli, funzionali e sostenibili con minori consumi nel tempo.",
  "piante-pendio":
    "Le migliori piante per terreni in pendio sono quelle con radici robuste, buona tolleranza alla siccità e funzione antierosione. In pratica: lavanda, rosmarino, coprisuolo come vinca e timo strisciante, più una posa corretta con geotessili e irrigazione a goccia.",
  "checkup-sostenibile-aree-verdi-aziendali":
    "Il Check-up Sostenibile è un sopralluogo tecnico di 60-90 minuti che analizza suolo, acqua, esposizione e criticità delle aree verdi aziendali o condominiali. Include tre priorità immediate, tre errori da evitare, un micro-piano in tre step e una stima di investimento per fase.",
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
  "tendenze-giardini-2026": [
    "Analizza il tuo giardino attuale: consumi idrici, ore di manutenzione, biodiversità presente.",
    "Sostituisci gradualmente le piante esotiche con specie autoctone resistenti alla siccità.",
    "Integra almeno 3 elementi per la biodiversità: hotel insetti, mangiatoie, piante nettarifere.",
    "Progetta un'area living esterna con funzione definita (relax, cucina o lavoro).",
    "Installa irrigazione smart con sensori di umidità e programmazione meteo.",
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
  "checkup-sostenibile-aree-verdi-aziendali": [
    "Prenotate un sopralluogo tecnico dal sito o contattate direttamente Visione Sostenibile.",
    "Andrea analizza suolo, esposizione, microclima, acqua e impianti esistenti in 60-90 minuti.",
    "Ricevete 3 priorità immediate e 3 errori da evitare, con motivazioni chiare.",
    "Ottenete un micro-piano in 3 step: basi, verde e manutenzione programmata.",
    "Valutate la stima di investimento per fase e decidete tempi e budget.",
    "Se proseguite, si costruisce un piano di gestione su misura con regia unica.",
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
  "tendenze-giardini-2026": [
    {
      question: "Qual è la tendenza principale per i giardini nel 2026?",
      answer:
        "La tendenza principale è la riduzione della manutenzione con approccio sostenibile: piante resistenti, automazione dell'irrigazione e scelte progettuali che riducono consumi di acqua e tempo. Un giardino a bassa manutenzione ben progettato richiede solo 2-3 ore al mese.",
    },
    {
      question: "Come rendere il giardino più sostenibile?",
      answer:
        "Si parte da specie adatte al clima locale, irrigazione intelligente con sensori di umidità, suolo protetto con pacciamatura e integrazione di habitat utili alla biodiversità. Questo migliora equilibrio ecologico e riduce i costi di gestione fino al 60%.",
    },
    {
      question: "Tecnologia e giardinaggio possono convivere?",
      answer:
        "Sì. Sensori di umidità, centraline smart e illuminazione controllata permettono gestione più efficiente del verde, mantenendo qualità estetica e riducendo sprechi energetici e idrici. Il ritorno sull'investimento medio è di 2-3 anni.",
    },
    {
      question: "Quanto si risparmia con l'irrigazione smart?",
      answer:
        "Un sistema di irrigazione smart con sensori di umidità e collegamento alle previsioni meteo riduce i consumi idrici del 40-60% rispetto a un impianto tradizionale a timer. Su un giardino di 200 mq, questo può significare un risparmio di 30.000-40.000 litri d'acqua all'anno.",
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
  "checkup-sostenibile-aree-verdi-aziendali": [
    {
      question: "Cos'è il Check-up Sostenibile di Visione Sostenibile?",
      answer:
        "È un sopralluogo tecnico di 60-90 minuti che analizza suolo, acqua, esposizione, impianti e criticità delle aree verdi aziendali o condominiali. L'obiettivo è fornire una diagnosi operativa con priorità, errori da evitare e un piano d'azione a fasi.",
    },
    {
      question: "A chi è rivolto il Check-up Sostenibile?",
      answer:
        "È pensato per amministratori di condominio, facility manager aziendali, strutture ricettive e sedi rappresentative — ovvero contesti dove immagine, sicurezza e continuità del verde contano.",
    },
    {
      question: "Quanto costa il Check-up Sostenibile?",
      answer:
        "Il costo dipende dalla superficie e complessità dell'area verde. Al termine del sopralluogo ricevete una stima di investimento suddivisa per fasi, così potete pianificare tempi e budget in modo trasparente.",
    },
    {
      question: "In quali zone opera Visione Sostenibile?",
      answer:
        "Visione Sostenibile è operativa in Piemonte e Trentino Alto-Adige. La copertura si sta ampliando in Lombardia: Milano, hinterland e province su richiesta.",
    },
    {
      question: "Cosa succede dopo il Check-up?",
      answer:
        "Se volete proseguire, costruiamo insieme un piano di gestione su misura con regia unica: dalla progettazione alla manutenzione programmata, con un solo referente e competenze verticali attivate solo quando servono.",
    },
  ],
};

const templateLabels: Record<TemplateVariant, string> = {
  1: "Template Editoriale",
  2: "Template Guida Rapida",
  3: "Template Checklist",
};

function resolveCoverImage(coverImage?: string, fallback?: string): string {
  if (coverImage && coverImage.trim().length > 0) {
    return coverImage;
  }
  return fallback ?? "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200";
}

const serviceLinksByPostSlug: Record<
  string,
  { href: string; label: string; summary: string }
> = {
  "come-mantenere-giardino-autunno": {
    href: "/servizi/manutenzioni",
    label: "Manutenzione Giardini",
    summary:
      "Per applicare il piano stagionale in modo continuativo, scopri il nostro servizio di manutenzione programmata.",
  },
  "tendenze-giardini-2026": {
    href: "/servizi/progettazione-giardini",
    label: "Progettazione Giardini",
    summary:
      "Vuoi tradurre i trend 2026 in un progetto concreto? Parti da una progettazione su misura con metodo biodinamico.",
  },
  "piante-pendio": {
    href: "/servizi/rigenerazione-terreni",
    label: "Rigenerazione Terreni",
    summary:
      "Per stabilizzare pendii e migliorare il suolo nel tempo, approfondisci il servizio di rigenerazione terreni.",
  },
  "checkup-sostenibile-aree-verdi-aziendali": {
    href: "/contatti",
    label: "Prenota il Check-up",
    summary:
      "Vuoi una diagnosi operativa per le tue aree verdi? Richiedi il Check-up Sostenibile: rispondiamo entro 48 ore.",
  },
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

function processMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
}

function renderArticleContent(content: string) {
  const combined = content
    .trim()
    .replace(/### Il dato\n\n/g, "### Il dato|||");

  const blocks = combined.split("\n\n");
  const processed: React.ReactNode[] = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i].trim();
    const nextBlock = blocks[i + 1]?.trim();

    if (block.startsWith("### Il dato")) {
      const headingText = block.replace("### Il dato|||", "").replace("### Il dato", "");
      const fullText = nextBlock && !nextBlock.startsWith("##") && !nextBlock.startsWith("###")
        ? `${headingText} ${nextBlock}`
        : headingText;
      
      processed.push(
        <blockquote
          key={`blockquote-${i}`}
          className="my-8 border-l-4 border-leaf-600 bg-leaf-50 rounded-r-lg p-5 pl-6"
        >
          <p className="font-display text-lg text-leaf-800 italic mb-2">
            Il dato
          </p>
          <p 
            className="text-forest-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: processMarkdown(fullText) }}
          />
        </blockquote>
      );
      
      if (fullText === headingText && nextBlock && !nextBlock.startsWith("##") && !nextBlock.startsWith("###")) {
        i += 2;
      } else {
        i += 1;
      }
      continue;
    }

    if (block.startsWith("## ")) {
      processed.push(
        <h2
          key={`h2-${i}`}
          className="font-display text-3xl lg:text-4xl font-bold text-forest-900 mt-12 mb-6 tracking-tight"
        >
          {block.replace("## ", "")}
        </h2>
      );
      i += 1;
      continue;
    }

    if (block.startsWith("### ")) {
      processed.push(
        <h3
          key={`h3-${i}`}
          className="font-display text-xl lg:text-2xl font-semibold text-leaf-700 mt-8 mb-4"
        >
          {block.replace("### ", "")}
        </h3>
      );
      i += 1;
      continue;
    }

    if (block.startsWith("- ")) {
      processed.push(
        <ul key={`ul-${i}`} className="my-6 space-y-3 pl-0 list-none">
          {block.split("\n").map((item, j) => (
            <li key={`li-${j}`} className="flex items-start gap-3 text-forest-800">
              <span className="w-1.5 h-1.5 rounded-full bg-leaf-400 mt-2.5 shrink-0" />
              <span
                dangerouslySetInnerHTML={{
                  __html: processMarkdown(item.replace("- ", "")),
                }}
              />
            </li>
          ))}
        </ul>
      );
      i += 1;
      continue;
    }

    if (/^\d+\.\s/.test(block)) {
      processed.push(
        <ol key={`ol-${i}`} className="my-6 space-y-3 pl-0 list-none">
          {block.split("\n").map((item, j) => (
            <li key={`oli-${j}`} className="flex items-start gap-3 text-forest-800">
              <span className="font-sans text-sm font-medium text-leaf-500 mt-0.5 shrink-0 w-5">
                {j + 1}.
              </span>
              <span
                dangerouslySetInnerHTML={{
                  __html: processMarkdown(item.replace(/^\d+\.\s*/, "")),
                }}
              />
            </li>
          ))}
        </ol>
      );
      i += 1;
      continue;
    }

    if (block) {
      processed.push(
        <p
          key={`p-${i}`}
          className="mb-6 text-forest-800 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: processMarkdown(block),
          }}
        />
      );
    }
    i += 1;
  }

  return processed;
}

export function BlogPostClient({
  slug,
  template,
}: {
  slug: string;
  template?: string | string[];
}) {
  const hasConvexConfig = Boolean(
    process.env.NEXT_PUBLIC_CONVEX_URL &&
      !process.env.NEXT_PUBLIC_CONVEX_URL.includes("placeholder")
  );
  const convexPost = useQuery(
    api.blog.getBySlug,
    hasConvexConfig ? { slug } : "skip"
  );
  const post = hasConvexConfig ? convexPost ?? null : staticGetBlogPost(slug);
  const convexRelated = useQuery(
    api.blog.getRelated,
    hasConvexConfig && post ? { slug, category: post.category } : "skip"
  );
  const galleryAssets = useQuery(api.gallery.getAll, hasConvexConfig ? {} : "skip");
  const relatedPosts = hasConvexConfig
    ? convexRelated ?? []
    : staticGetRelatedPosts(slug);

  if (hasConvexConfig && convexPost === undefined) {
    return (
      <div className="min-h-screen bg-paper-50 flex items-center justify-center">
        <div className="inline-flex items-center gap-2 text-forest-800/70">
          <Loader2 className="w-5 h-5 animate-spin" />
          Caricamento articolo dal CMS...
        </div>
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  const postIndex = 0;
  const resolvedTemplate = resolveTemplate(template, postIndex);

  const quickAnswer = quickAnswers[slug] ?? post.excerpt;
  const relatedService = serviceLinksByPostSlug[slug];
  const videoAssets = (galleryAssets ?? []).filter(
    (asset) => (asset.mediaType ?? "image") === "video" && Boolean(asset.imageUrl)
  );
  const templateTwoVideoUrl =
    videoAssets[0]?.imageUrl ?? "/videos/nature-garden-flowers.mp4";
  const templateThreeVideoUrl =
    videoAssets[1]?.imageUrl ??
    videoAssets[0]?.imageUrl ??
    "/videos/garden-bloom-timelapse.mp4";
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
  const articleImage = resolveCoverImage(post.coverImage);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: new Date(post.publishedAt).toISOString(),
    author: {
      "@type": "Person",
      name: post.author,
    },
    image: articleImage,
    mainEntityOfPage: articleUrl,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: articleUrl,
      },
    ],
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

  const howToJsonLd = steps.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: post.title,
        description: post.excerpt,
        step: steps.map((stepText, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: `Step ${index + 1}`,
          text: stepText,
        })),
      }
    : null;

  return (
    <div className="min-h-screen bg-paper-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {howToJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />
      )}

      <section className="relative overflow-hidden bg-forest-950 pt-24 pb-12 lg:pt-32 lg:pb-16">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url('${articleImage}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-forest-950/95 via-forest-900/85 to-forest-950/90" />
        </div>

        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-sun-400/15 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-leaf-500/20 rounded-full blur-3xl animate-drift" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-paper-400 hover:text-leaf-400 transition-colors duration-300 mb-8 group"
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
              <Badge className="bg-white/10 backdrop-blur-sm border border-white/20 text-paper-100">
                {templateLabels[resolvedTemplate]}
              </Badge>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-paper-50 mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-paper-400/80">
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
        <div className="bg-white border border-paper-300 rounded-2xl p-6 lg:p-8">
          <div className="flex items-center gap-2 mb-4">
            <ListChecks className="w-5 h-5 text-leaf-600" />
            <h2 className="font-display text-2xl text-forest-950">Risposta rapida</h2>
          </div>
          <p className="font-body text-forest-900 leading-relaxed text-lg">{quickAnswer}</p>
        </div>
      </section>

      {resolvedTemplate === 1 && (
        <>
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-deep">
              <Image
                src={articleImage}
                alt={post.title}
                width={1200}
                height={514}
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

          <article className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
            <div className="font-body text-lg text-forest-900">{renderArticleContent(post.content)}</div>
          </article>
        </>
      )}

      {resolvedTemplate === 2 && (
        <section className="max-w-6xl mx-auto px-6 lg:px-8 py-14 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            <article className="lg:col-span-2 bg-white rounded-2xl border border-paper-300 p-7 lg:p-10">
              <h2 className="font-display text-3xl text-forest-950 mb-6">Guida pratica</h2>
              <div className="font-body text-lg text-forest-900">{renderArticleContent(post.content)}</div>
            </article>

            <aside className="space-y-6">
              <div className="bg-paper-100 rounded-2xl p-6">
                <h3 className="font-display text-xl text-forest-950 mb-4">Passi chiave</h3>
                <ol className="space-y-3">
                  {steps.map((step, index) => (
                    <li key={step} className="flex gap-3 text-forest-900">
                      <span className="text-leaf-600 font-semibold">{index + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="bg-forest-950 rounded-2xl p-6 text-paper-100">
                <h3 className="font-display text-xl mb-3">Da vedere</h3>
                <p className="text-paper-300/90 mb-4">Video dimostrativo del metodo operativo.</p>
                <video controls className="w-full rounded-xl" preload="metadata">
                  <source src={templateTwoVideoUrl} type="video/mp4" />
                </video>
              </div>
            </aside>
          </div>
        </section>
      )}

      {resolvedTemplate === 3 && (
        <section className="max-w-5xl mx-auto px-6 lg:px-8 py-14 lg:py-16 space-y-8">
          <div className="bg-white border border-paper-300 rounded-2xl p-6 lg:p-8">
            <h2 className="font-display text-3xl text-forest-950 mb-5">Checklist operativa</h2>
            <ol className="space-y-4">
              {steps.map((step, index) => (
                <li key={step} className="flex items-start gap-3 text-forest-900 text-lg">
                  <span className="mt-0.5 font-semibold text-leaf-600">{index + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-paper-100 rounded-2xl p-6 lg:p-8">
            <h3 className="font-display text-2xl text-forest-950 mb-4">Approfondimento</h3>
            <div className="font-body text-lg text-forest-900">{renderArticleContent(post.content)}</div>
          </div>

          <div className="bg-forest-950 rounded-2xl p-6 lg:p-8 text-paper-100">
            <h3 className="font-display text-2xl mb-4">Video esplicativo</h3>
            <video controls className="w-full rounded-xl" preload="metadata">
              <source src={templateThreeVideoUrl} type="video/mp4" />
            </video>
          </div>
        </section>
      )}

      <section className="max-w-5xl mx-auto px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-2xl border border-paper-300 p-6 lg:p-8">
          <h2 className="font-display text-3xl text-forest-950 mb-6">FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-xl border border-paper-300 p-4 open:bg-paper-50">
                <summary className="cursor-pointer list-none font-display text-lg text-forest-950">
                  {faq.question}
                </summary>
                <p className="mt-3 text-forest-800 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {relatedService && (
        <section className="max-w-5xl mx-auto px-6 lg:px-8 pb-16">
          <div className="bg-paper-100 rounded-2xl border border-paper-300 p-6 lg:p-8">
            <h2 className="font-display text-3xl text-forest-950 mb-4">
              Approfondisci con un servizio dedicato
            </h2>
            <p className="text-forest-800 leading-relaxed mb-6">{relatedService.summary}</p>
            <Link
              href={relatedService.href}
              className="inline-flex items-center gap-2 text-leaf-700 font-sans text-sm uppercase tracking-wide hover:text-leaf-600 transition-colors"
            >
              Scopri {relatedService.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {relatedPosts && relatedPosts.length > 0 && (
        <section className="border-t border-paper-300 bg-paper-50">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
            <SlideUp>
              <h2 className="font-display text-3xl lg:text-4xl font-light text-forest-950 mb-12">
                Articoli <span className="italic text-leaf-700">Correlati</span>
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
                            resolveCoverImage(
                              relatedPost.coverImage,
                              "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600"
                            )
                          }
                          alt={relatedPost.title}
                          width={600}
                          height={338}
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/20 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <Badge variant="earth" size="sm">
                            {relatedPost.category}
                          </Badge>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <h3 className="font-display text-xl font-light text-forest-950 mb-2 group-hover:text-leaf-700 transition-colors duration-300 leading-snug">
                          {relatedPost.title}
                        </h3>
                        <p className="font-body text-sm text-forest-800/70 line-clamp-2 mb-4">
                          {relatedPost.excerpt}
                        </p>
                        <span className="inline-flex items-center gap-1.5 font-sans text-xs font-medium text-leaf-600 group-hover:text-leaf-700 transition-colors">
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
