"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Leaf, Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Youtube, Clock } from "lucide-react";

const services = [
  { label: "Progettazione Giardini e Orti", href: "/servizi/progettazione-giardini-orti" },
  { label: "Realizzazione Chiavi in Mano", href: "/servizi/realizzazione-chiavi-in-mano" },
  { label: "Manutenzione Sostenibile", href: "/servizi/manutenzione-sostenibile" },
  { label: "Potatura Professionale", href: "/servizi/potatura-professionale" },
];

const company = [
  { label: "Chi Siamo", href: "/chi-siamo" },
  { label: "I Nostri Servizi", href: "/servizi" },
  { label: "Progetti", href: "/progetti" },
  { label: "Blog", href: "/blog" },
  { label: "Qualità", href: "/qualita" },
  { label: "Contatti", href: "/contatti" },
  { label: "Privacy", href: "/privacy" },
];

export function Footer() {
  return (
    <footer className="bg-forest-950 text-paper-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Link href="/" className="flex items-center gap-3">
              <Leaf className="w-8 h-8 text-leaf-500" />
              <span className="font-display text-2xl tracking-wide text-white">
                Visione<span className="italic text-leaf-400">Sostenibile</span>
              </span>
            </Link>
            <p className="font-body text-paper-400 text-sm leading-relaxed">
              Creiamo giardini che respirano, che raccontano storie, che
              abbracciano la natura e la celebrano.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: "https://www.instagram.com/visionesostenibile", key: "instagram" },
                { icon: Facebook, href: "https://www.facebook.com/visionesostenibilegiardinieortisostenibili", key: "facebook" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/andrea-giordano-16810626a", key: "linkedin" },
                { icon: Youtube, href: "https://www.youtube.com/@AndreaGiordano-vk8el", key: "youtube" },
              ].map((social) => (
                <motion.a
                  key={social.key}
                  href={social.href}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-forest-950 flex items-center justify-center hover:bg-sun-400 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <h3 className="font-display text-lg font-normal text-white">
              Servizi
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="font-body text-sm text-paper-400 hover:text-leaf-400 transition-colors"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="font-display text-lg font-normal text-white">
              Azienda
            </h3>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-body text-sm text-paper-400 hover:text-leaf-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="font-display text-lg font-normal text-white">
              Contatti
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-leaf-500 mt-0.5 flex-shrink-0" />
                <span className="font-body text-sm text-paper-400">
                  Via San Francesco D&apos;Assisi, 14
                  <br />
                  10122 Torino (TO)
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-leaf-500 flex-shrink-0" />
                <a
                  href="tel:+393714821825"
                  className="font-body text-sm text-paper-400 hover:text-leaf-400 transition-colors"
                >
                  +39 371 482 1825
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-leaf-500 flex-shrink-0" />
                <a
                  href="mailto:visionesostenibile96@gmail.com"
                  className="font-body text-sm text-paper-400 hover:text-leaf-400 transition-colors"
                >
                  visionesostenibile96@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-leaf-500 flex-shrink-0" />
                <span className="font-body text-sm text-paper-400">
                  Lun-Ven: 8:00-18:00
                  <br />
                  Sab: 8:00-13:00
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-8 border-t border-forest-950"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-sm text-paper-500">
              © {new Date().getFullYear()} Visione Sostenibile. Tutti i diritti
              riservati.
            </p>
            <div className="flex gap-6">
              {[
                { label: "Privacy", href: "/privacy" },
                { label: "Termini", href: "/termini" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-body text-sm text-paper-500 hover:text-leaf-400 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
