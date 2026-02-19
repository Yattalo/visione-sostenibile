"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram, Facebook, Linkedin, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-forest-950 text-white py-20">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Image
            src="/VS_logo_completo_bianco.svg"
            alt="Visione Sostenibile"
            width={144}
            height={48}
            className="h-12 w-auto mx-auto"
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
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-4"
        >
          {[
            { icon: Instagram, href: "https://www.instagram.com/visionesostenibile", key: "instagram" },
            { icon: Facebook, href: "https://www.facebook.com/visionesostenibilegiardinieortisostenibili", key: "facebook" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/andrea-giordano-16810626a", key: "linkedin" },
            { icon: Youtube, href: "https://www.youtube.com/@AndreaGiordano-vk8el", key: "youtube" },
          ].map((social) => (
            <a
              key={social.key}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded bg-white/5 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <social.icon className="w-4 h-4" />
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-[10px] text-white/30 uppercase tracking-widest font-medium border-t border-white/5 pt-8 mt-16"
        >
          © {new Date().getFullYear()} Visione Sostenibile. Tutti i diritti riservati.
        </motion.div>
      </div>
    </footer>
  );
}
