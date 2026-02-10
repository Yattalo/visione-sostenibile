"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Leaf,
  Sprout,
  Trees,
  Shield,
  Star,
  Users,
  Award,
  Phone,
} from "lucide-react";
import { Button } from "./components/ui/Button";
import { Card, CardContent } from "./components/ui/Card";
import { Badge } from "./components/ui/Badge";
import {
  SlideUp,
  StaggerContainer,
  StaggerItem,
  TypingText,
  Glow,
} from "./components/animations";

const services = [
  {
    icon: Sprout,
    title: "Progettazione Giardini",
    description:
      "Creiamo spazi verdi unici, studiando ogni dettaglio per valorizzare il tuo ambiente.",
    slug: "progettazione-giardini",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: Trees,
    title: "Realizzazione",
    description:
      "Trasformiamo i progetti in realtà, curando ogni fase con materiali di qualità.",
    slug: "realizzazione",
    color: "from-earth-400 to-earth-600",
  },
  {
    icon: Leaf,
    title: "Manutenzione",
    description:
      "Manutenzione professionale per mantenere il tuo giardino sempre al massimo splendore.",
    slug: "manutenzione",
    color: "from-primary-400 to-primary-600",
  },
];

const stats = [
  { icon: Users, value: "500+", label: "Clienti Soddisfatti" },
  { icon: Trees, value: "15+", label: "Anni di Esperienza" },
  { icon: Award, value: "50+", label: "Progetti Realizzati" },
  { icon: Star, value: "4.9", label: "Rating Google" },
];

const reviews = [
  {
    author: "Marco B.",
    location: "Roma",
    rating: 5,
    text: "Professionisti veri. Hanno trasformato il mio giardino in un paradiso verde. Consigliatissimi!",
  },
  {
    author: "Laura M.",
    location: "Fiumicino",
    rating: 5,
    text: "Servizio impeccabile, team competente e molto attento alle esigenze del cliente.",
  },
  {
    author: "Giuseppe T.",
    location: "Roma",
    rating: 5,
    text: "Finalmente un'azienda che conosce davvero il verde. Risultato oltre le aspettative.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-earth-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900/40 via-earth-900 to-earth-950" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-earth-500 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Badge variant="earth" size="md" className="mb-6">
              <Leaf className="w-4 h-4 mr-2" />
              Verde Sostenibile
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Trasformiamo i Tuoi Spazi in{" "}
            <span className="text-gradient bg-gradient-to-r from-primary-400 via-primary-300 to-earth-400 bg-clip-text text-transparent">
              Opere d'Arte
            </span>{" "}
            Naturali
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg sm:text-xl text-earth-200 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Progettazione, realizzazione e manutenzione giardini con passione e
            professionalità. Creiamo il verde che hai sempre sognato.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/servizi">
              <Button size="lg" variant="primary">
                Scopri i Nostri Servizi
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contatti">
              <Button size="lg" variant="outline" className="border-earth-400 text-earth-100 hover:bg-earth-800">
                <Phone className="mr-2 w-5 h-5" />
                Richiedi Preventivo
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-sm mb-3">
                  <stat.icon className="w-7 h-7 text-primary-400" />
                </div>
                <p className="font-display text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-earth-300">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-earth-400 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-earth-400"
            />
          </div>
        </motion.div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-gradient-to-b from-earth-50 to-white dark:from-earth-950 dark:to-earth-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideUp>
            <div className="text-center mb-16">
              <Badge variant="primary" className="mb-4">
                I Nostri Servizi
              </Badge>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Servizi Professionali per il Tuo Verde
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Dalla progettazione alla manutenzione, offriamo soluzioni complete
                per valorizzare i tuoi spazi esterni.
              </p>
            </div>
          </SlideUp>

          <StaggerContainer delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <StaggerItem key={service.slug} delay={index * 0.1}>
                  <Link href={`/servizi/${service.slug}`}>
                    <Card
                      variant="elevated"
                      hover
                      className="h-full group relative overflow-hidden"
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                      />
                      <CardContent className="relative z-10">
                        <div
                          className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <service.icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary-600 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {service.description}
                        </p>
                        <span className="inline-flex items-center text-primary-600 font-medium group-hover:translate-x-2 transition-transform">
                          Scopri di più
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          <SlideUp delay={0.6}>
            <div className="text-center mt-12">
              <Link href="/servizi">
                <Button variant="outline" size="lg">
                  Vedi Tutti i Servizi
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </SlideUp>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-earth-900 text-earth-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <SlideUp>
              <Badge variant="primary" className="mb-4">
                Perché Scegliere Noi
              </Badge>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-6">
                Passione, Professionalità e Sostenibilità
              </h2>
              <p className="text-earth-300 text-lg leading-relaxed mb-8">
                Da oltre 15 anni trasformiamo giardini in spazi unici, combinando
                tecniche innovative e rispetto per l'ambiente. Ogni progetto è
                diverso, perché ogni cliente ha esigenze diverse.
              </p>
              <ul className="space-y-4">
                {[
                  "Team di professionisti certificati",
                  "Materiali biologici e sostenibili",
                  "Garanzia su tutti i lavori",
                  "Supporto post-lavorazione",
                ].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary-500" />
                    </div>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </SlideUp>

            <SlideUp delay={0.3}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-earth-500/20 rounded-3xl blur-3xl" />
                <div className="relative bg-earth-800/50 backdrop-blur-xl rounded-3xl p-8 border border-earth-700">
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { value: "15+", label: "Anni di esperienza" },
                      { value: "98%", label: "Clienti soddisfatti" },
                      { value: "100+", label: "Progetti completati" },
                      { value: "24/7", label: "Supporto disponibile" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="text-center p-4 rounded-2xl bg-earth-900/50"
                      >
                        <p className="font-display text-3xl font-bold text-primary-400">
                          {item.value}
                        </p>
                        <p className="text-sm text-earth-400 mt-1">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SlideUp>
          </div>
        </div>
      </section>

      {/* Reviews Preview */}
      <section className="py-24 bg-white dark:bg-earth-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideUp>
            <div className="text-center mb-16">
              <Badge variant="earth" className="mb-4">
                Recensioni
              </Badge>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Cosa Dicono i Nostri Clienti
              </h2>
              <div className="flex items-center justify-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="text-foreground font-medium ml-2">4.9/5</span>
              </div>
            </div>
          </SlideUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <SlideUp key={review.author} delay={index * 0.15}>
                <Card variant="outline" className="h-full">
                  <CardContent>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-foreground italic mb-6">
                      &ldquo;{review.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-earth-400 flex items-center justify-center text-white font-bold">
                        {review.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {review.author}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {review.location}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </SlideUp>
            ))}
          </div>

          <SlideUp delay={0.5}>
            <div className="text-center mt-12">
              <Link href="/recensioni">
                <Button variant="ghost">
                  Leggi tutte le recensioni
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </SlideUp>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary-600 to-primary-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SlideUp>
            <Leaf className="w-16 h-16 mx-auto mb-8 text-primary-200" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
              Pronto a Trasformare il Tuo Giardino?
            </h2>
            <p className="text-primary-100 text-lg mb-10 max-w-2xl mx-auto">
              Contattaci oggi per una consulenza gratuita e un preventivo
              personalizzato. Il tuo giardino dei sogni ti aspetta.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contatti">
                <Button
                  size="lg"
                  className="bg-white text-primary-700 hover:bg-primary-50"
                >
                  Richiedi Consulenza Gratuita
                </Button>
              </Link>
              <a href="tel:+39061234567">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Chiama Ora
                </Button>
              </a>
            </div>
          </SlideUp>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-earth-50 dark:bg-earth-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-60">
            {["Google", "TripAdvisor", " Houzz", "Ambiente", "Italia"].map(
              (brand) => (
                <span
                  key={brand}
                  className="font-display text-xl font-bold text-muted-foreground"
                >
                  {brand}
                </span>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
