# Design Review Checklist - Visione Sostenibile

Data: 12 febbraio 2026  
Riferimento stilistico: https://www.truegreenecolandscaping.com/  
Approccio: evolutivo (ispirazione), non redesign totale.

## 1. Obiettivo della revisione

Rendere il sito piu leggibile, commerciale e coerente nei pattern UI (menu, cards, CTA, gerarchia sezioni), mantenendo l'identita attuale di Visione Sostenibile:
- palette moss/terracotta/cream
- tono editoriale/naturale
- posizionamento biodinamico a impatto zero

## 2. Guardrail (da non rompere)

- Non cambiare il linguaggio visuale base (no switch a look corporate freddo).
- Non sostituire la palette principale; ottimizzare solo contrasti e gerarchie.
- Non introdurre pattern diversi pagina per pagina: un unico sistema.
- Non basare la leggibilita su hover (mobile-first).

## 3. Backlog globale (Must / Should / Could)

### Must
- [ ] Definire un unico `header pattern` (trasparente su hero + bianco sticky leggibile).
- [ ] Rendere la CTA header persistente e coerente (stesso testo/azione in tutte le pagine).
- [ ] Standardizzare i bottoni (`primary`, `secondary`, `outline`) con stati hover/focus/disabled uniformi.
- [ ] Standardizzare card servizi/progetti/reviews: titolo, descrizione breve, CTA chiara, altezza coerente.
- [ ] Uniformare spaziatura verticale sezioni (scala unica: es. 24/32/48/72/96).
- [ ] Uniformare struttura hero per tutte le pagine interne (eyebrow, H1, intro, CTA opzionale).

### Should
- [ ] Ridurre decorazioni ridondanti (blob, linee, overlay) dove competono con il testo.
- [ ] Rendere i numeri trust (anni, progetti, aree coperte) un componente ricorrente.
- [ ] Uniformare i microcopy CTA in stile outcome-oriented.
- [ ] Introdurre una griglia layout piu prevedibile per sezioni informative (split 40/60 o 50/50).

### Could
- [ ] Aggiungere una variante card "compact" per mobile.
- [ ] Introdurre un pattern "case study highlight" in homepage.
- [ ] Piccoli miglioramenti motion (piu sobri, meno simultanei).

## 4. Checklist per pagina

## Home (`/`)
### Must
- [ ] Hero: semplificare a 1 messaggio principale + 2 CTA con priorita netta.
- [ ] Sezione filosofia: riallineare i pillar al framework brand (4 elementi biodinamici).
- [ ] Sezione servizi: card piu informative e scansione immediata (titolo + benefit + azione).
- [ ] Inserire blocco proof/trust sopra la CTA finale (metriche o recensioni sintetiche).

### Should
- [ ] Ridurre testo lungo nella prima meta pagina.
- [ ] Migliorare alternanza sfondi per ritmo visivo (chiaro/scuro/chiaro).

## Servizi (`/servizi`)
### Must
- [ ] Hero con value proposition orientata al cliente (risultato pratico, non solo stile).
- [ ] Cards: uniformare altezza media, lunghezza descrizione (max 2-3 righe), CTA consistente.
- [ ] Evidenziare percorso "01 ascolto - 02 progetto - 03 realizzazione" con leggibilita immediata.

### Should
- [ ] Inserire filtri o cluster visuali (progettazione/realizzazione/manutenzione) se utile alla scansione.

## Progetti (`/progetti`)
### Must
- [ ] Card progetto: titolo + localita + tipologia + CTA, gerarchia piu netta.
- [ ] Barra filtri sticky: semplificare density visiva e stati attivo/non attivo.
- [ ] Hero progetti piu asciutta, orientata a "proof".

### Should
- [ ] Inserire un "progetto in evidenza" con struttura case-study.

## Chi siamo (`/chi-siamo`)
### Must
- [ ] Ridurre effetto "pagina manifesto" e aumentare segnali di affidabilita (team, metodo, certificazioni reali).
- [ ] Sezione valori: passare da descrizione astratta a beneficio concreto per il cliente.

### Should
- [ ] Inserire timeline snella (anni/competenze/tappe).

## Qualita (`/qualita`)
### Must
- [ ] Sostituire placeholder con certificazioni reali e verificabili.
- [ ] Strutturare la pagina in 3 blocchi: certificazioni, standard operativi, garanzie cliente.
- [ ] CTA finale orientata a conversione (sopralluogo/preventivo).

### Should
- [ ] Inserire badge documentali scaricabili (PDF) con metadata essenziali.

## Contatti (`/contatti`)
### Must
- [ ] Hero piu breve e action-driven.
- [ ] Form multi-step: ridurre attrito (placeholder chiari, progress indicator leggibile).
- [ ] Contatti diretti sempre visibili vicino al form (telefono/email/area copertura).

### Should
- [ ] Aggiungere FAQ sintetiche (3-5) per obiezioni frequenti.

## Blog (`/blog`)
### Must
- [ ] Hero e card piu funzionali (meno editoriale decorativo, piu leggibilita contenuto).
- [ ] Uniformare card metadata (data, tempo lettura, categoria) su tutte le varianti.

### Should
- [ ] Inserire blocco "articoli piu utili" (evergreen) per conversione soft.

## 5. Componenti trasversali da aggiornare

### Header / Navbar
- [ ] Contrasto link sempre AA su qualsiasi sfondo.
- [ ] Riduzione animazioni non funzionali.
- [ ] CTA header con copy unificato (es. "Richiedi preventivo").

### Cards
- [ ] Standardizzare radius, bordo, shadow, padding interno.
- [ ] Definire limite testo e comportamento overflow.
- [ ] CTA card sempre nella stessa posizione visiva.

### CTA band / Footer
- [ ] CTA finale con messaggio orientato outcome + azione unica primaria.
- [ ] Footer: pulizia IA link (solo link esistenti), contatti prioritari, trust secondario.

## 6. Criteri di accettazione (Definition of Done)

- [ ] Ogni pagina ha hero leggibile in meno di 5 secondi (messaggio + azione).
- [ ] Ogni sezione principale presenta almeno una CTA o next-step chiaro.
- [ ] Componenti `Button`, `Card`, `Navbar` usano varianti coerenti in tutte le route.
- [ ] Nessun link a route inesistenti nel footer/menu.
- [ ] Verifica responsive completa: 375px, 768px, 1024px, 1440px.
- [ ] Verifica accessibilita base: contrasto, focus keyboard, ordine heading.

## 7. Ordine di esecuzione consigliato

1. Header + bottoni + card system (fondazione)
2. Home + Servizi (impatto conversione)
3. Progetti + Contatti (proof + lead capture)
4. Chi siamo + Qualita + Blog (allineamento brand e trust)
5. QA responsive/accessibilita e rifiniture motion

## 8. Note operative

- Le modifiche devono essere incrementalmente rilasciabili.
- Evitare branch di redesign totale; preferire PR tematiche per area.
- Ogni modifica visuale deve mantenere coerenza con il tono attuale del brand.
