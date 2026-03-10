"use client";

import ProfileCard from "@/components/ProfileCard";
import { SlideUp, StaggerContainer, StaggerItem } from "./animations";

interface TeamMember {
  name: string;
  title: string;
  role: string;
  image: string;
  avatarFocus: string;
  competenze: string[];
  personalStatement?: string;
}

const teamMembers: TeamMember[] = [
  { name: "Andrea Giordano", title: "Fondatore", role: "Un unico referente che progetta, realizza e mantiene il tuo giardino: specialisti e partner coordinati, niente più caos.", image: "/images/chi-siamo/andrea.webp", avatarFocus: "50% 15%", competenze: ["Progettazione biodinamica", "Coordinamento équipe", "Consulenza verde"], personalStatement: "Il giardino è un sistema vivo: ogni intervento deve rispettarne l'equilibrio." },
  { name: "Bogdan", title: "Tree Climbing", role: "Tree climbing, abbattimenti e potature in quota", image: "/images/team/bogdan.webp", avatarFocus: "50% 18%", competenze: ["Tree climbing", "Abbattimenti", "Potature in quota"] },
  { name: "Daniele", title: "Dottore Forestale", role: "Dottore forestale specializzato in funghi agenti di carie", image: "/images/team/daniele.webp", avatarFocus: "50% 20%", competenze: ["Fitopatologia", "Funghi agenti di carie", "Diagnostica forestale"] },
  { name: "Moreno", title: "Fitoiatra", role: "Fitoiatra - Entomologo ETT certificato", image: "/images/team/moreno.webp", avatarFocus: "50% 20%", competenze: ["Fitoiatria", "Entomologia", "Certificazione ETT"] },
  { name: "Besnik", title: "Allestimento Verde", role: "Allestimento giardini e impianti di irrigazione", image: "/images/team/besnik.webp", avatarFocus: "50% 18%", competenze: ["Allestimento giardini", "Irrigazione", "Posa verde"] },
  { name: "Michele", title: "Posa Prato", role: "Posa prato sintetico", image: "/images/team/michele.avif", avatarFocus: "50% 12%", competenze: ["Prato sintetico", "Preparazione fondi", "Drenaggio"] },
  { name: "Nicolò", title: "Terrazzi e Attici", role: "Allestimento terrazzi, attici e relativi impianti", image: "/images/team/nicolo.webp", avatarFocus: "50% 18%", competenze: ["Terrazzi", "Attici", "Impiantistica"] },
  { name: "Agi", title: "Manutenzione Verde", role: "Manutenzioni, potatura siepi, sfalcio erba", image: "/images/team/agi.webp", avatarFocus: "50% 16%", competenze: ["Potatura siepi", "Sfalcio", "Manutenzione ordinaria"] },
  { name: "Flavio", title: "Antizanzare", role: "Installazione impianti antizanzare omologati", image: "/images/team/flavio.webp", avatarFocus: "50% 16%", competenze: ["Impianti antizanzare", "Nebulizzazione", "Disinfestazione"] },
  { name: "Danilo", title: "Robot Tagliaerba", role: "Impianti per robot taglia erba e assistenza", image: "/images/team/danilo.webp", avatarFocus: "50% 17%", competenze: ["Robot tagliaerba", "Automazione", "Assistenza tecnica"] },
  { name: "Francesca", title: "Floral Designer", role: "Arredamento floreale per esterni ed interni", image: "/images/team/francesca.webp", avatarFocus: "50% 18%", competenze: ["Floral design", "Allestimenti", "Composizioni stagionali"] },
  { name: "Paolo e Dario", title: "Illuminazione", role: "Impianti elettrici e illuminazioni per esterni", image: "/images/team/paolo-dario.webp", avatarFocus: "50% 24%", competenze: ["Illuminazione LED", "Impianti elettrici", "Scenografia luce"] },
  { name: "Roberto", title: "Irrigazione", role: "Impianti di irrigazione e posa prato", image: "/images/team/roberto.webp", avatarFocus: "50% 17%", competenze: ["Irrigazione smart", "Posa prato", "Sensori umidità"] },
  { name: "Lleshi", title: "Pietra e Cubetti", role: "Posa cubetto, ciotolo in pietra", image: "/images/team/lleshi.webp", avatarFocus: "50% 16%", competenze: ["Posa cubetti", "Ciotolato", "Pavimentazioni esterne"] },
  { name: "Claudio", title: "Pietra Arenaria", role: "Lavorazione pietra arenaria di Langa", image: "/images/team/claudio.webp", avatarFocus: "50% 18%", competenze: ["Pietra di Langa", "Lavorazione artigianale", "Muretti a secco"] },
  { name: "Fabrizio", title: "Giardini Giapponesi", role: "Realizzazione giardini giapponesi", image: "/images/team/fabrizio.webp", avatarFocus: "50% 18%", competenze: ["Giardini zen", "Stile giapponese", "Composizioni minerali"] },
  { name: "Ercole", title: "Recinzioni in Legno", role: "Recinzioni, staccionate e palificazioni in legno", image: "/images/team/ercole.webp", avatarFocus: "50% 18%", competenze: ["Recinzioni legno", "Staccionate", "Palificazioni"] },
  { name: "Carlo", title: "Manutenzione", role: "Manutenzione giardini", image: "/images/team/carlo.webp", avatarFocus: "50% 17%", competenze: ["Manutenzione programmata", "Cura stagionale", "Gestione verde"] },
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 lg:gap-12">
            {teamMembers.map((member, index) => (
              <StaggerItem key={member.name} delay={index * 0.03}>
                <article className="mx-auto w-full max-w-[20rem]">
                  <ProfileCard
                    name={member.name}
                    title={member.title}
                    avatarUrl={member.image}
                    enableTilt
                    enableMobileTilt={false}
                    iconUrl="/VS_logo_monogramma_colori.svg"
                    behindGlowEnabled
                    behindGlowColor={index % 2 === 0 ? "hsla(133, 54%, 37%, 0.44)" : "hsla(43, 80%, 56%, 0.38)"}
                    innerGradient="linear-gradient(150deg, rgba(11, 30, 14, 0.3) 0%, rgba(34, 88, 44, 0.24) 58%, rgba(234, 184, 49, 0.18) 100%)"
                    avatarObjectPosition={member.avatarFocus}
                    className="mx-auto w-full"
                    cardHeight="23rem"
                    cardMaxHeight="27rem"
                  />
                  <div className="mt-4 px-2 space-y-3">
                    <p className="text-center font-body text-sm leading-relaxed text-forest-800/75">
                      {member.role}
                    </p>
                    {member.competenze.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-1.5">
                        {member.competenze.map((comp) => (
                          <span
                            key={comp}
                            className="inline-block px-2.5 py-0.5 text-[0.65rem] font-sans uppercase tracking-wider text-leaf-700 bg-leaf-50 border border-leaf-200 rounded-full"
                          >
                            {comp}
                          </span>
                        ))}
                      </div>
                    )}
                    {member.personalStatement && (
                      <p className="text-center font-body text-xs italic text-forest-800/60 leading-relaxed">
                        &ldquo;{member.personalStatement}&rdquo;
                      </p>
                    )}
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
