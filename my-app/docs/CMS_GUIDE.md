# Guida CMS - Visione Sostenibile

## Accedere al CMS

1. Apri `http://localhost:3000/admin`
2. Login con le credenziali admin

## Dashboard

La dashboard mostra una panoramica del sito con statistiche rapide.

---

## Servizi

### Modificare un servizio
1. Vai su **Servizi** nel menu
2. Clicca sul servizio da modificare
3. Modifica i campi:
   - **Titolo**: nome del servizio
   - **Slug**: URL (es. `progettazione-giardini`)
   - **Descrizione breve**: testo per le card
   - **Immagine**: URL dell'immagine di copertina
   - **Galleria**: aggiungi immagini aggiuntive

### Aggiungere un nuovo servizio
1. Clicca **+ Aggiungi Servizio**
2. Compila tutti i campi
3. Clicca **Salva**

### Immagini servizi
Le immagini sono in: `/public/images/servizi/`
- `*-cover.png` = immagine principale (card)
- `*-thumb.png` = thumbnail
- `*-inline.png` = immagini interne

---

## Blog

### Modificare un articolo
1. Vai su **Blog**
2. Clicca sull'articolo
3. Modifica titolo, contenuto, immagine

### Pubblicare
- Toggle **Pubblicato** per mostrare/nascondere

---

## Gallery

### Aggiungere immagini
1. Vai su **Galleria**
2. Clicca **+ Carica**
3. Trascina o seleziona le immagini

---

## Contatti

Visualizza i messaggi ricevuti dal form contatti.

---

## Impostazioni

- Nome sito
- Email contatti
- Social links

---

## Note tecniche

- I dati sono salvati in **Convex** (database cloud)
- Le immagini caricate sono in **Vercel** (deployment)
- Per modifiche rapide, usa direttamente i file in `app/lib/`
