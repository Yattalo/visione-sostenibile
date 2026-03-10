"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram, Facebook, Linkedin, Youtube, Phone, Mail } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { COOKIE_PREFERENCES_OPEN_EVENT } from "./CookiePreferences";
import { siteConfig } from "../lib/site-config";
import { BLUR_DATA_URL } from "../lib/image-utils";

export function Footer() {
  const pathname = usePathname();

  // Hide public footer on admin routes
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="bg-forest-950 text-white py-20">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <Image
            src="/VS_logo_completo_bianco.svg"
            alt="Logo completo Visione Sostenibile — giardinaggio biodinamico a Torino"
            width={320}
            height={106}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="h-24 md:h-28 w-auto mx-auto"
            loading="lazy"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-white/50 text-xs max-w-md mx-auto mb-10 leading-relaxed font-light tracking-wide"
        >
          Creiamo atmosfere uniche per i vostri spazi esterni, unendo design,
          tecnologia e rispetto per la natura.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl text-sm tracking-wide transition-all hover:scale-105 active:scale-95"
          >
            <Phone className="w-4 h-4" />
            <span>Chiama Ora</span>
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl text-sm tracking-wide transition-all hover:scale-105 active:scale-95"
          >
            <Mail className="w-4 h-4" />
            <span>Scrivici</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-4"
        >
          {[
            { icon: Instagram, href: siteConfig.socialLinks.instagram, key: "instagram", label: "Seguici su Instagram" },
            { icon: Facebook, href: siteConfig.socialLinks.facebook, key: "facebook", label: "Seguici su Facebook" },
            { icon: Linkedin, href: siteConfig.socialLinks.linkedin, key: "linkedin", label: "Seguici su LinkedIn" },
            { icon: Youtube, href: siteConfig.socialLinks.youtube, key: "youtube", label: "Seguici su YouTube" },
          ].map((social) => (
            <a
              key={social.key}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <social.icon className="w-4 h-4" />
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.24 }}
          className="mt-10"
        >
          <nav aria-label="Link legali e accessibilità" className="flex flex-wrap justify-center gap-5 text-xs uppercase tracking-[0.16em] text-white/60">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/accessibilita" className="hover:text-white transition-colors">
              Accessibilita
            </Link>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event(COOKIE_PREFERENCES_OPEN_EVENT))}
              className="hover:text-white transition-colors"
            >
              Preferenze Cookie
            </button>
          </nav>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-[10px] text-white/30 uppercase tracking-widest font-medium border-t border-white/5 pt-8 mt-16"
        >
          © {new Date().getFullYear()} {siteConfig.companyName}. Tutti i diritti riservati.
        </motion.div>
      </div>
    </footer>
  );
}
