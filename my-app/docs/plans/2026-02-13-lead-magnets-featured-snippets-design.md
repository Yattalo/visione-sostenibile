# Lead Magnets & Featured Snippets — Design Document

**Data**: 2026-02-13
**Progetto**: Visione Sostenibile
**Stato**: Approvato

---

## Obiettivi

1. **Lead Magnets**: Sistema ibrido email nurturing + qualifica lead tramite quiz interattivo
2. **Featured Snippets**: Ottimizzazione sistematica delle pagine esistenti (servizi + blog) per massimizzare la probabilita di apparire nei featured snippet di Google

## Vincoli

- Email raccolte su Convex (no ESP esterno per ora)
- Solo pagine esistenti (no nuovi contenuti)
- CTA non invasivi — niente popup, exit-intent, sticky bar
- Stack: Next.js 16 + Convex + Tailwind v4 + Framer Motion

---

## 1. Quiz "Che Giardino Fa Per Te?"

### Flusso

6 domande -> Risultato personalizzato -> Email capture -> CTA servizio consigliato

### Domande

1. **Che spazio hai?** Terrazzo/Balcone | Giardino piccolo <100mq | Giardino medio 100-500mq | Grande spazio >500mq
2. **Che tipo di terreno?** Pianura | Collina/Pendio | Non so
3. **Cosa ti interessa di piu?** Relax e contemplazione | Orto e produzione | Gioco bambini/animali | Rappresentanza/estetica
4. **Quanto tempo vuoi dedicare alla manutenzione?** Zero (chiavi in mano) | Poco (guida iniziale) | Molto (voglio imparare)
5. **Hai preferenze sostenibili?** Si, zero chimici e priorita | Mi interessa ma non vincolante | Non particolarmente
6. **Qual e la tua urgenza?** Entro 1 mese | Entro 6 mesi | Sto solo esplorando

### 4 Profili Risultato

| Profilo | Servizi consigliati | Target |
|---|---|---|
| Il Giardino Contemplativo | Progettazione + Manutenzione | Relax, poco tempo, sostenibilita |
| L'Orto Sostenibile | Progettazione + Gestione Biodinamica | Produzione, interesse bio |
| Il Parco Familiare | Realizzazione Chiavi in Mano | Famiglie, zero tempo, spazi grandi |
| Il Verde Rappresentativo | Progettazione + Potatura Professionale | Estetica, rappresentanza |

### Componenti

| Componente | File | Descrizione |
|---|---|---|
| QuizGiardino | `app/components/QuizGiardino.tsx` | Quiz completo multi-step con Framer Motion |
| QuizCTA | `app/components/QuizCTA.tsx` | Banner CTA che linka al quiz |
| QuizMiniPreview | `app/components/QuizMiniPreview.tsx` | Prima domanda + CTA per homepage |
| LeadCaptureModal | `app/components/LeadCaptureModal.tsx` | Modale email post-quiz (Portal) |

### Database

Nuova tabella Convex `quizSubmissions`:
```
{
  answers: array of objects (questionId, answer)
  resultProfile: string
  email: optional string
  phone: optional string
  createdAt: number
  source: string (homepage | servizi | blog)
}
```

### Pagina dedicata

Route: `/quiz` — pagina standalone con quiz full-screen

---

## 2. Posizionamento CTA (4 touchpoint)

### Homepage (`app/page.tsx`)
- Nuova sezione dopo i servizi: "Scopri il Giardino Perfetto per Te"
- QuizMiniPreview embedded (prima domanda + CTA "Inizia il Quiz")
- Design: sfondo cream-gradient, stile organico coerente

### Servizi Template 1 (`app/servizi/[slug]/page.tsx`)
- Sidebar Quiz Banner: card con icona + "Non sai quale servizio scegliere? Fai il quiz"
- Apre modale quiz o linka a /quiz

### Blog mid-article (`app/blog/[slug]/page.tsx`)
- Dopo il 2 H2: card contestuale con CTA quiz
- Copy contestualizzata al tema dell'articolo

### Blog end-article
- Dopo le FAQ, prima dei related posts
- Sezione "Prossimo passo" con quiz + link servizio correlato

---

## 3. Featured Snippets Optimization

### A. Schema JSON-LD

| Schema | File | Stato |
|---|---|---|
| Organization | `app/layout.tsx` | Da aggiungere |
| LocalBusiness | `app/layout.tsx` | Da aggiungere |
| BreadcrumbList | Servizi + Blog detail | Da aggiungere |
| HowTo | Blog post con step | Da aggiungere |
| WebSite + SearchAction | `app/layout.tsx` | Da aggiungere |

### B. Heading Restructuring

Blog post — H2 generici -> H2 domanda:
- "Pulizia e Manutenzione" -> "Come fare la pulizia del giardino in autunno?"
- "Protezione dal Freddo" -> "Come proteggere le piante dal freddo invernale?"

Servizi — aggiungere H2 domanda prima della quick answer con risposta concisa (40-60 parole).

### C. Content Formatting

- Quick answer: 40-60 parole (sweet spot paragraph snippet)
- Liste: 5-8 elementi (Google preferisce liste complete)
- Tabella comparativa "Servizi a Confronto" nella pagina /servizi

### D. Template Audit Checklist

Per ogni pagina verificare:
- [ ] H1 unico e keyword-focused
- [ ] Quick answer <= 60 parole
- [ ] Almeno 1 H2 in formato domanda
- [ ] FAQ con schema FAQPage
- [ ] BreadcrumbList schema
- [ ] Liste con 5-8 items
- [ ] Meta description <= 160 char con keyword principale
- [ ] HowTo schema se contiene step

---

## Metriche di Successo

- **Quiz completion rate**: target > 60%
- **Email capture rate**: target > 25% di chi completa il quiz
- **Featured snippet coverage**: da 6.2/10 a 8+/10
- **Organic click-through rate**: +15% entro 3 mesi
