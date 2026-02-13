import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Clock,
  Calendar,
  Check,
  Phone,
} from "lucide-react";
import {
  getPortfolioProject,
  getRelatedProjects,
  portfolioProjects,
} from "../../lib/portfolio";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { SlideUp, FadeIn } from "../../components/animations";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getPortfolioProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} | Portfolio Visione Sostenibile`,
    description: project.excerpt,
  };
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getPortfolioProject(slug);
  if (!project) notFound();

  const relatedProjects = getRelatedProjects(slug);

  return (
    <div className="min-h-screen bg-cream-50">
      {/* HEADER */}
      <section className="relative overflow-hidden bg-moss-900 pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15"
            style={{ backgroundImage: `url('${project.coverImage}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-moss-900/95 via-moss-800/85 to-charcoal-900/90" />
        </div>

        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-terracotta-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 -left-20 w-72 h-72 bg-moss-500/15 rounded-full blur-3xl animate-drift" />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-terracotta-400/20 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-sm mb-10 lg:mb-14"
            >
              <Link
                href="/"
                className="font-sans text-cream-400 hover:text-cream-200 transition-colors tracking-wide"
              >
                Home
              </Link>
              <span className="text-cream-600">/</span>
              <Link
                href="/portfolio"
                className="font-sans text-cream-400 hover:text-cream-200 transition-colors tracking-wide"
              >
                Portfolio
              </Link>
              <span className="text-cream-600">/</span>
              <span className="font-sans text-cream-200 tracking-wide">
                {project.title}
              </span>
            </nav>
          </FadeIn>

          <SlideUp>
            <Badge variant="primary" size="sm" className="mb-6">
              {project.category}
            </Badge>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-cream-50 mb-6 leading-tight max-w-4xl">
              {project.title}
            </h1>

            <p className="font-body text-xl text-cream-200/80 mb-10 leading-relaxed max-w-3xl">
              {project.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-cream-300/70 pt-8 border-t border-cream-100/10">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {project.location}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Durata: {project.duration}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(project.completedAt).toLocaleDateString("it-IT", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </SlideUp>
        </div>
      </section>

      {/* COVER IMAGE */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 -mt-1">
        <SlideUp delay={0.1}>
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-deep">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/10 to-transparent" />
          </div>
        </SlideUp>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Main content */}
          <article className="lg:col-span-2">
            <SlideUp delay={0.2}>
              <div className="font-body text-lg text-charcoal-700 leading-relaxed">
                {project.content.split("\n\n").map((paragraph, index) => {
                  if (paragraph.startsWith("## ")) {
                    return (
                      <h2
                        key={index}
                        className="font-display text-2xl lg:text-3xl font-normal text-charcoal-800 mt-14 mb-6 first:mt-0"
                      >
                        {paragraph.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith("### ")) {
                    return (
                      <h3
                        key={index}
                        className="font-display text-xl lg:text-2xl font-normal text-charcoal-800 mt-10 mb-4"
                      >
                        {paragraph.replace("### ", "")}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith("- ")) {
                    return (
                      <ul key={index} className="my-6 space-y-3 pl-0 list-none">
                        {paragraph.split("\n").map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-charcoal-600"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-terracotta-400 mt-2.5 shrink-0" />
                            <span>{item.replace("- ", "")}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={index} className="mb-6 text-charcoal-600">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </SlideUp>

            {/* Gallery */}
            {project.gallery.length > 0 && (
              <SlideUp delay={0.3}>
                <div className="mt-16">
                  <h2 className="font-display text-2xl lg:text-3xl text-charcoal-800 mb-8">
                    Galleria <span className="italic text-moss-700">Fotografica</span>
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {project.gallery.map((imageUrl, index) => (
                      <div
                        key={index}
                        className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-soft"
                      >
                        <Image
                          src={imageUrl}
                          alt={`${project.title} - Foto ${index + 1}`}
                          fill
                          sizes="(max-width: 1024px) 50vw, 33vw"
                          className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </SlideUp>
            )}
          </article>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              {/* Services used */}
              <SlideUp delay={0.25}>
                <div className="bg-cream-100 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-moss-600 to-moss-800 flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-display text-xl text-charcoal-800">
                      Servizi Utilizzati
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {project.services.map((service) => (
                      <li
                        key={service}
                        className="flex items-center gap-3 text-charcoal-600"
                      >
                        <span className="w-5 h-5 rounded-full bg-moss-700 flex items-center justify-center flex-shrink-0">
                          <Check
                            className="w-3 h-3 text-white"
                            strokeWidth={3}
                          />
                        </span>
                        <span className="font-body">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </SlideUp>

              {/* Project info */}
              <SlideUp delay={0.3}>
                <div className="bg-white rounded-2xl border border-cream-200 p-8 shadow-soft">
                  <h3 className="font-display text-xl text-charcoal-800 mb-6">
                    Dettagli Progetto
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-moss-100 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-moss-700" />
                      </div>
                      <div>
                        <p className="font-sans text-xs uppercase tracking-widest text-charcoal-400">
                          Localita
                        </p>
                        <p className="font-body text-charcoal-700">
                          {project.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-terracotta-50 flex items-center justify-center">
                        <Clock className="w-4 h-4 text-terracotta-600" />
                      </div>
                      <div>
                        <p className="font-sans text-xs uppercase tracking-widest text-charcoal-400">
                          Durata
                        </p>
                        <p className="font-body text-charcoal-700">
                          {project.duration}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cream-200 flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-charcoal-600" />
                      </div>
                      <div>
                        <p className="font-sans text-xs uppercase tracking-widest text-charcoal-400">
                          Completato
                        </p>
                        <p className="font-body text-charcoal-700">
                          {new Date(project.completedAt).toLocaleDateString(
                            "it-IT",
                            { month: "long", year: "numeric" }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SlideUp>

              {/* CTA */}
              <SlideUp delay={0.35}>
                <div className="bg-moss-900 rounded-2xl p-8 text-cream-50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-terracotta-500/10 rounded-full blur-2xl" />
                  <div className="relative z-10">
                    <span className="font-display italic text-terracotta-300 text-base">
                      Ti piace questo progetto?
                    </span>
                    <h3 className="font-display text-xl text-cream-50 mt-1 mb-3">
                      Realizziamo il Tuo
                    </h3>
                    <p className="font-body text-cream-200/80 text-sm leading-relaxed mb-6">
                      Contattaci per una consulenza gratuita e trasforma il tuo
                      spazio verde.
                    </p>
                    <Link href="/contatti" className="block mb-4">
                      <button className="w-full bg-terracotta-500 hover:bg-terracotta-600 text-white py-3 px-6 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                        Contattaci
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                    <a
                      href="tel:+393714821825"
                      className="flex items-center justify-center gap-2 text-cream-300 hover:text-cream-100 transition-colors text-sm"
                    >
                      <Phone className="w-4 h-4" />
                      +39 371 482 1825
                    </a>
                  </div>
                </div>
              </SlideUp>
            </div>
          </div>
        </div>
      </div>

      {/* RELATED PROJECTS */}
      {relatedProjects.length > 0 && (
        <section className="border-t border-cream-200 bg-cream-50">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
            <SlideUp>
              <h2 className="font-display text-3xl lg:text-4xl font-light text-charcoal-800 mb-12">
                Altri{" "}
                <span className="italic text-moss-700">Progetti</span>
              </h2>
            </SlideUp>

            <SlideUp delay={0.15}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedProjects.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/portfolio/${related.slug}`}
                    className="group block"
                  >
                    <Card
                      variant="elevated"
                      hover
                      className="h-full overflow-hidden p-0"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={related.coverImage}
                          alt={related.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/20 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <Badge variant="earth" size="sm">
                            {related.category}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-display text-xl font-light text-charcoal-800 mb-2 group-hover:text-moss-700 transition-colors duration-300 leading-snug">
                          {related.title}
                        </h3>
                        <p className="font-body text-sm text-charcoal-500 line-clamp-2 mb-4">
                          {related.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-charcoal-400 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            {related.location}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-charcoal-300 group-hover:text-terracotta-500 transition-all duration-300 group-hover:translate-x-1" />
                        </div>
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
