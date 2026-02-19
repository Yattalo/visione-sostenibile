"use client";

import ProfileCard from "@/components/ProfileCard";
import { SlideUp, StaggerContainer, StaggerItem } from "./animations";

interface TeamMember {
  name: string;
  title: string;
  role: string;
  image: string;
  avatarFocus: string;
}

const teamMembers: TeamMember[] = [
  { name: "Bogdan", title: "Tree Climbing", role: "Tree climbing, abbattimenti e potature in quota", image: "/images/team/bogdan.jpg", avatarFocus: "50% 18%" },
  { name: "Daniele", title: "Dottore Forestale", role: "Dottore forestale specializzato in funghi agenti di carie", image: "/images/team/daniele.jpg", avatarFocus: "50% 20%" },
  { name: "Moreno", title: "Fitoiatra", role: "Fitoiatra - Entomologo ETT certificato", image: "/images/team/moreno.jpg", avatarFocus: "50% 20%" },
  { name: "Besnik", title: "Allestimento Verde", role: "Allestimento giardini e impianti di irrigazione", image: "/images/team/besnik.jpg", avatarFocus: "50% 18%" },
  { name: "Michele", title: "Posa Prato", role: "Posa prato sintetico", image: "/images/team/michele.avif", avatarFocus: "50% 12%" },
  { name: "Nicolò", title: "Terrazzi e Attici", role: "Allestimento terrazzi, attici e relativi impianti", image: "/images/team/nicolo.jpg", avatarFocus: "50% 18%" },
  { name: "Agi", title: "Manutenzione Verde", role: "Manutenzioni, potatura siepi, sfalcio erba", image: "/images/team/agi.jpg", avatarFocus: "50% 16%" },
  { name: "Flavio", title: "Antizanzare", role: "Installazione impianti antizanzare omologati", image: "/images/team/flavio.jpg", avatarFocus: "50% 16%" },
  { name: "Danilo", title: "Robot Tagliaerba", role: "Impianti per robot taglia erba e assistenza", image: "/images/team/danilo.jpg", avatarFocus: "50% 17%" },
  { name: "Francesca", title: "Floral Designer", role: "Arredamento floreale per esterni ed interni", image: "/images/team/francesca.jpg", avatarFocus: "50% 18%" },
  { name: "Paolo e Dario", title: "Illuminazione", role: "Impianti elettrici e illuminazioni per esterni", image: "/images/team/paolo-dario.jpg", avatarFocus: "50% 24%" },
  { name: "Roberto", title: "Irrigazione", role: "Impianti di irrigazione e posa prato", image: "/images/team/roberto.jpg", avatarFocus: "50% 17%" },
  { name: "Lleshi", title: "Pietra e Cubetti", role: "Posa cubetto, ciotolo in pietra", image: "/images/team/lleshi.jpg", avatarFocus: "50% 16%" },
  { name: "Claudio", title: "Pietra Arenaria", role: "Lavorazione pietra arenaria di Langa", image: "/images/team/claudio.jpg", avatarFocus: "50% 18%" },
  { name: "Fabrizio", title: "Giardini Giapponesi", role: "Realizzazione giardini giapponesi", image: "/images/team/fabrizio.jpg", avatarFocus: "50% 18%" },
  { name: "Ercole", title: "Recinzioni in Legno", role: "Recinzioni, staccionate e palificazioni in legno", image: "/images/team/ercole.jpg", avatarFocus: "50% 18%" },
  { name: "Carlo", title: "Manutenzione", role: "Manutenzione giardini", image: "/images/team/carlo.jpg", avatarFocus: "50% 17%" },
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
                    iconUrl="/images/brand/visione-logo.png"
                    behindGlowEnabled
                    behindGlowColor={index % 2 === 0 ? "hsla(133, 54%, 37%, 0.44)" : "hsla(43, 80%, 56%, 0.38)"}
                    innerGradient="linear-gradient(150deg, rgba(11, 30, 14, 0.3) 0%, rgba(34, 88, 44, 0.24) 58%, rgba(234, 184, 49, 0.18) 100%)"
                    avatarObjectPosition={member.avatarFocus}
                    className="mx-auto w-full"
                    cardHeight="23rem"
                    cardMaxHeight="27rem"
                  />
                  <p className="mt-4 px-2 text-center font-body text-sm leading-relaxed text-forest-800/75 min-h-[3.5rem]">
                    {member.role}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
