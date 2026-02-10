"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Leaf,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
  Clock,
} from "lucide-react";
import { cn } from "../lib/utils";

const services = [
  { label: "Progettazione Giardini", href: "/servizi/progettazione-giardini" },
  { label: "Realizzazione", href: "/servizi/realizzazione" },
  { label: "Manutenzione", href: "/servizi/manutenzione" },
  { label: "Potature", href: "/servizi/potature" },
];

const company = [
  { label: "Chi Siamo", href: "/chi-siamo" },
  { label: "I Nostri Servizi", href: "/servizi" },
  { label: "Galleria", href: "/galleria" },
  { label: "Blog", href: "/blog" },
  { label: "Recensioni", href: "/recensioni" },
];

const info = [
  { label: "Contatti", href: "/contatti" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Termini e Condizioni", href: "/termini" },
];

export function Footer() {
  return (
    <footer className="bg-earth-900 text-earth-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="w-8 h-8 text-primary-500" />
              <span className="font-display text-xl font-bold text-white">
                Visione<span className="text-primary-500">Sostenibile</span>
              </span>
            </Link>
            <p className="text-earth-300 text-sm leading-relaxed">
              Trasformiamo i tuoi spazi verdi in opere d'arte naturali.
              Professionalità, passione e sostenibilità al servizio del
              verde.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: "#" },
                { icon: Facebook, href: "#" },
                { icon: Linkedin, href: "#" },
              ].map((social, index) => (
                <motion.a
                  key={social.icon.name}
                  href={social.href}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-earth-800 flex items-center justify-center hover:bg-primary-600 transition-colors"
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
            <h3 className="font-display text-lg font-bold text-white">
              Servizi
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-earth-300 hover:text-primary-400 transition-colors text-sm"
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
            <h3 className="font-display text-lg font-bold text-white">
              Azienda
            </h3>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-earth-300 hover:text-primary-400 transition-colors text-sm"
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
            <h3 className="font-display text-lg font-bold text-white">
              Contatti
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <span className="text-earth-300 text-sm">
                  Via del Verde, 123
                  <br />
                  00100 Roma (RM)
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <a
                  href="tel:+39061234567"
                  className="text-earth-300 hover:text-primary-400 transition-colors text-sm"
                >
                  +39 06 1234567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <a
                  href="mailto:info@visionesostenibile.it"
                  className="text-earth-300 hover:text-primary-400 transition-colors text-sm"
                >
                  info@visionesostenibile.it
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <span className="text-earth-300 text-sm">
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
          className="py-8 border-t border-earth-800"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-earth-400 text-sm">
              © {new Date().getFullYear()} Visione Sostenibile. Tutti i diritti
              riservati.
            </p>
            <div className="flex gap-6">
              {info.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-earth-400 hover:text-primary-400 transition-colors text-sm"
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
