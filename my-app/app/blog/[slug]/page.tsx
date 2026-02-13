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

const coverImages: Record<string, string> = {
  "come-mantenere-giardino-autunno":
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200",
  "tendenze-giardini-2024":
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200",
  "piante-pendio":
    "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200",
};

const thumbImages: Record<string, string> = {
  "come-mantenere-giardino-autunno":
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600",
  "tendenze-giardini-2024":
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
  "piante-pendio":
    "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600",
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
    "Rimuovi foglie secche e parti danneggiate.",
    "Proteggi le specie sensibili con teli traspiranti e pacciamatura.",
    "Programma una concimazione autunnale ricca di potassio.",
    "Pianifica piantumazioni stagionali e piccoli interventi di potatura.",
  ],
  "tendenze-giardini-2024": [
    "Scegli specie autoctone e resistenti.",
    "Integra elementi per biodiversita (insetti utili, uccelli, impollinatori).",
    "Progetta aree living esterne con funzioni precise.",
    "Automatizza irrigazione e illuminazione per ridurre sprechi.",
  ],
  "piante-pendio": [
    "Valuta esposizione solare e livello di pendenza.",
    "Installa stabilizzazione (geotessili o terrazzamenti leggeri).",
    "Usa mix di arbusti, coprisuolo e aromatiche antierosione.",
    "Attiva irrigazione mirata e manutenzione periodica iniziale.",
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
        "L'irrigazione va ridotta rispetto all'estate ma non interrotta del tutto. Frequenza e quantita dipendono da piogge, tipo di suolo e specie presenti, con preferenza per irrigazioni meno frequenti ma profonde.",
    },
    {
      question: "Che concime usare prima dell'inverno?",
      answer:
        "In genere conviene un concime a rilascio lento con potassio, utile a rinforzare le radici. Si evitano formulazioni troppo azotate che stimolano una crescita tardiva poco adatta ai mesi freddi.",
    },
  ],
  "tendenze-giardini-2024": [
    {
      question: "Qual e la tendenza principale per i giardini nel 2024?",
      answer:
        "La tendenza principale e la riduzione della manutenzione con approccio sostenibile: piante resistenti, automazione dell'irrigazione e scelte progettuali che riducono consumi di acqua e tempo.",
    },
    {
      question: "Come rendere il giardino piu sostenibile?",
      answer:
        "Si parte da specie adatte al clima locale, irrigazione intelligente, suolo protetto con pacciamatura e integrazione di habitat utili alla biodiversita. Questo migliora equilibrio ecologico e costi di gestione.",
    },
    {
      question: "Tecnologia e giardinaggio possono convivere?",
      answer:
        "Si. Sensori di umidita, centraline smart e illuminazione controllata permettono gestione piu efficiente del verde, mantenendo qualita estetica e riducendo sprechi energetici e idrici.",
    },
  ],
  "piante-pendio": [
    {
      question: "Come evitare l'erosione in un terreno in pendenza?",
      answer:
        "Per limitare erosione servono radici stabilizzanti, copertura vegetale continua e gestione corretta dell'acqua. Spesso si combinano coprisuolo, arbusti e sistemi di drenaggio o geotessili.",
    },
    {
      question: "Quali piante usare in pendio soleggiato?",
      answer:
        "In pendio soleggiato funzionano bene aromatiche e specie rustiche come lavanda, rosmarino, salvia e diversi coprisuolo mediterranei, selezionati in base al tipo di terreno.",
    },
    {
      question: "E utile l'irrigazione a goccia in pendenza?",
      answer:
        "Si, e spesso la scelta migliore. L'irrigazione a goccia distribuisce acqua in modo progressivo e controllato, riducendo ruscellamento superficiale e consumi idrici.",
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
