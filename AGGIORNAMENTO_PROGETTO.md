# Aggiornamento Progetto — Visione Sostenibile

**Data:** 12 febbraio 2026
**Progetto:** Sito web vetrina per Visione Sostenibile s.a.s.
**Titolare:** Andrea Giordano

---

## Cos'e stato fatto

### Il sito web e stato creato da zero

Partendo da una pagina completamente bianca, e stato costruito un sito web professionale per presentare l'attivita di Visione Sostenibile. Il sito e composto da diverse sezioni pensate per raccontare l'azienda, i servizi offerti e la filosofia che la guida.

### Le pagine del sito

Sono state realizzate le seguenti pagine:

- **Homepage** — La pagina principale con un video di sfondo, una presentazione dell'azienda, i servizi in evidenza e le recensioni dei clienti
- **Servizi** — L'elenco completo dei servizi offerti, con una pagina di dettaglio per ciascuno
- **Chi Siamo** — La storia dell'azienda, il team e la filosofia di lavoro
- **Contatti** — Un modulo di contatto guidato passo dopo passo, con mappa e informazioni di contatto
- **Blog** — Una sezione di articoli su giardinaggio sostenibile e biodinamica
- **Qualita** — Le certificazioni e gli standard di qualita dell'azienda
- **Privacy e Termini** — Le pagine legali obbligatorie

### L'aspetto visivo

E stato creato un design su misura con un'identita visiva coerente:

- **Colori**: palette ispirata alla natura con toni di verde (moss), beige caldo (crema), terracotta e grigio scuro
- **Caratteri tipografici**: Cormorant Garamond per i titoli (elegante e classico) e Quicksand per i testi di navigazione (moderno e leggibile)
- **Animazioni**: effetti di comparsa fluidi al passaggio durante lo scorrimento della pagina, transizioni morbide tra le pagine, carte dei servizi con effetto 3D al passaggio del mouse
- **Video di sfondo**: nella homepage e nella pagina servizi sono stati inseriti video naturalistici generati con intelligenza artificiale

### Il pannello di amministrazione

E stata costruita un'area riservata (pannello admin) che permette di gestire i contenuti del sito:

- Gestione servizi (aggiungi, modifica, elimina)
- Gestione contatti ricevuti dal modulo
- Gestione recensioni dei clienti
- Gestione articoli del blog
- Impostazioni generali del sito

### Il sistema di dati

E stato predisposto un database cloud (Convex) con tabelle per tutti i contenuti del sito: servizi, galleria foto, recensioni, contatti ricevuti, articoli del blog, pagine e impostazioni. Il modulo contatti e gia collegato al database e salva automaticamente le richieste ricevute.

### Il portfolio dei lavori

E stata creata una sezione portfolio con foto reali dei progetti completati dall'azienda, organizzati per localita:

- Baveno
- Castegneto Po
- Porto Val Travaglia
- Portacomaro (Agriturismo Durando)
- Maria Rosa (Santhia)
- Veronica

Per ogni progetto sono disponibili foto della galleria, immagini di copertina e, dove disponibili, render progettuali.

---

## Correzioni importanti effettuate

### Sostituzione dati inventati con dati reali

Durante lo sviluppo iniziale, il sito conteneva dati di esempio non corrispondenti alla realta (citta sbagliata, numeri di telefono inventati, certificazioni inesistenti, recensioni fittizie). E stato condotto un audit completo che ha identificato oltre 50 dati errati. Tutti sono stati corretti:

- **Sede**: da Roma a Torino
- **Forma societaria**: da S.r.l. a s.a.s.
- **Partita IVA**: inserita quella reale
- **Telefono e email**: inseriti i contatti reali
- **Area operativa**: da "Roma e provincia" a "Piemonte e Lombardia"
- **Servizi**: ridotti da 12 generici a 5 confermati dal cliente (giardini, orti, biodinamica, potature, manutenzione)
- **Recensioni**: rimosse le 5 recensioni inventate con nomi fittizi
- **Certificazioni**: rimosse le 6 certificazioni inventate
- **Blog**: sostituiti gli autori fittizi con Andrea Giordano
- **Social media**: collegati i profili reali (Facebook, Instagram, LinkedIn)
- **Messaggi chiave**: riscritti attorno ai concetti reali dell'azienda (impatto zero, sicurezza, bassa manutenzione)

### Preparazione per il deploy

Il sito e stato configurato per essere pubblicato online:

- Configurazione per Vercel (piattaforma di hosting, server in Italia - Milano)
- Configurazione del database cloud Convex
- Risoluzione di problemi tecnici di compatibilita per la pubblicazione
- Correzione degli errori segnalati dagli strumenti di controllo qualita del codice

---

## Stato attuale

### Cosa funziona

- Tutte le pagine pubbliche sono visibili e navigabili
- Il design e coerente su tutte le pagine
- Le animazioni e le transizioni funzionano
- Il modulo contatti salva le richieste nel database
- Il pannello admin mostra i dati dal database
- I video di sfondo nell'homepage e nella pagina servizi
- Il portfolio con le foto reali dei lavori

### Cosa resta da fare

| Area | Descrizione |
|------|-------------|
| **Payoff aziendale** | Manca uno slogan ufficiale — il cliente ha confermato di volerne uno, va definito insieme |
| **Logo** | Non e stato ancora creato o integrato un logo con i 4 elementi biodinamici |
| **Certificazioni reali** | I PDF delle certificazioni esistono ma vanno inseriti nella pagina Qualita |
| **Collegamento completo al database** | Le pagine servizi, blog e recensioni usano ancora dati fissi — vanno collegate al database |
| **Funzioni admin complete** | I bottoni per creare, modificare e cancellare contenuti dal pannello admin non sono ancora attivi |
| **Accesso protetto admin** | Il pannello di amministrazione non ha ancora un sistema di login |
| **Notifiche email** | Quando qualcuno compila il modulo contatti, non viene ancora inviata una notifica via email |
| **SEO** | I metadati per i motori di ricerca vanno completati |
| **Parole chiave del brand** | Le parole "Innovazione", "Affidabilita", "Solidita" richieste dal cliente non sono ancora presenti nei testi |

---

## Cronologia del lavoro

| Data | Attivita |
|------|----------|
| 9 febbraio 2026 | Creazione del progetto e configurazione iniziale |
| 10 febbraio 2026 | Costruzione completa del design, delle pagine, del pannello admin, del database e delle animazioni |
| 12 febbraio 2026 | Correzioni tecniche per la pubblicazione, miglioramenti al design (carte 3D, widget recensioni), ristrutturazione pagine |
| 12 febbraio 2026 | Audit completo dei dati: identificati e corretti 51+ dati errati o inventati |
| 12 febbraio 2026 | Sostituzione di tutti i dati falsi con quelli reali del cliente |
| 12 febbraio 2026 | Inserimento video di sfondo generati con AI nella homepage e pagina servizi |
| 12 febbraio 2026 | Creazione portfolio con foto reali dei lavori (6 progetti, foto ottimizzate) |
| 12 febbraio 2026 | Unificazione del repository e commit iniziale con tutto il lavoro svolto |

---

## Numeri del progetto

| Voce | Quantita |
|------|----------|
| Pagine pubbliche create | 10+ |
| Pagine admin create | 7 |
| Componenti visivi riutilizzabili | 15+ |
| Tabelle database | 7 |
| Dati fattuali corretti | 51+ |
| Progetti portfolio con foto reali | 6 |
| Giorni di sviluppo | 4 (9-12 febbraio 2026) |

---

*Documento generato il 12 febbraio 2026.*
