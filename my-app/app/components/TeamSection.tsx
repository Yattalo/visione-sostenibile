"use client";

import Image from "next/image";
import { SlideUp, StaggerContainer, StaggerItem } from "./animations";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  { name: "Bogdan", role: "Tree climbing, abbattimenti e potature in quota", image: "/images/team/bogdan.jpg" },
  { name: "Daniele", role: "Dottore forestale specializzato in funghi agenti di carie", image: "/images/team/daniele.jpg" },
  { name: "Moreno", role: "Fitoiatra - Entomologo ETT certificato", image: "/images/team/moreno.jpg" },
  { name: "Besnik", role: "Allestimento giardini e impianti di irrigazione", image: "/images/team/besnik.jpg" },
  { name: "Michele", role: "Posa prato sintetico", image: "/images/team/michele.avif" },
  { name: "Nicolò", role: "Allestimento terrazzi, attici e relativi impianti", image: "/images/team/nicolo.jpg" },
  { name: "Agi", role: "Manutenzioni, potatura siepi, sfalcio erba", image: "/images/team/agi.jpg" },
  { name: "Flavio", role: "Installazione impianti antizanzare omologati", image: "/images/team/flavio.jpg" },
  { name: "Danilo", role: "Impianti per robot taglia erba e assistenza", image: "/images/team/danilo.jpg" },
  { name: "Francesca", role: "Arredamento floreale per esterni ed interni", image: "/images/team/francesca.jpg" },
  { name: "Paolo e Dario", role: "Impianti elettrici e illuminazioni per esterni", image: "/images/team/paolo-dario.jpg" },
  { name: "Roberto", role: "Impianti di irrigazione e posa prato", image: "/images/team/roberto.jpg" },
  { name: "Lleshi", role: "Posa cubetto, ciotolo in pietra", image: "/images/team/lleshi.jpg" },
  { name: "Claudio", role: "Lavorazione pietra arenaria di Langa", image: "/images/team/claudio.jpg" },
  { name: "Fabrizio", role: "Realizzazione giardini giapponesi", image: "/images/team/fabrizio.jpg" },
  { name: "Ercole", role: "Recinzioni, staccionate e palificazioni in legno", image: "/images/team/ercole.jpg" },
  { name: "Carlo", role: "Manutenzione giardini", image: "/images/team/carlo.jpg" },
];

export function TeamSection() {
  return (
    <section className="py-28 md:py-36 px-6 bg-paper-50">
      <div className="max-w-7xl mx-auto">
        <SlideUp>
          <div className="text-center mb-16">
            <span className="font-display italic text-leaf-600 text-lg">
              Il nostro team
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-forest-950 mt-4 leading-tight">
              Professionisti al tuo
              <span className="block italic text-leaf-700">servizio</span>
            </h2>
            <p className="mt-6 text-lg text-forest-800 max-w-2xl mx-auto">
              La nostra scelta è darvi un servizio chiavi in mano, collaborando con 
              un&apos;équipe multidisciplinare di professionisti, capaci di soddisfare 
              tutti i fabbisogni del vostro giardino.
            </p>
          </div>
        </SlideUp>

        <StaggerContainer delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {teamMembers.map((member, index) => (
              <StaggerItem key={member.name} delay={0.03}>
                <article
                  className="group relative overflow-hidden rounded-3xl border border-paper-300/60 bg-white
                              transition-all duration-500 hover:-translate-y-1.5 hover:border-leaf-500/50 hover:shadow-floating"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 via-forest-950/5 to-transparent" />
                    <div className="absolute inset-0 bg-leaf-600/0 mix-blend-multiply transition-colors duration-700 group-hover:bg-leaf-600/10" />
                  </div>

                  <div className="flex flex-col p-5 text-center">
                    <h3 className="font-display text-lg leading-tight text-forest-950 transition-colors duration-300 group-hover:text-leaf-600">
                      {member.name}
                    </h3>
                    <p className="mt-1 font-body text-xs leading-relaxed text-forest-800/70 line-clamp-2">
                      {member.role}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
