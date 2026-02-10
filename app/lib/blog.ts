export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "come-mantenere-giardino-autunno",
    title: "Come Mantenere il Giardino in Autunno: Guida Completa",
    excerpt:
      "Scopri tutti i consigli per preparare il tuo giardino all'autunno e proteggerlo durante i mesi più freddi.",
    content: `
L'autunno è una stagione cruciale per la cura del giardino. Con le temperature che iniziano a scendere e le giornate che si accorciano, è il momento giusto per preparare le piante al riposo invernale e assicurarsi che tornino rigogliose in primavera.

## Pulizia e Manutenzione

Il primo passo è una pulizia accurata del giardino:

- Rimuovi le foglie secche accumulate sui prati
- Potatura delle piante perenni
- Elimina i fiori appassiti
- Controlla e ripara gli attrezzi da giardinaggio

## Protezione dal Freddo

Per proteggere le piante più delicate:

- Utilizza teli traspiranti per coprire le piante sensibili
- Aggiungi pacciame alla base delle piante
- Sposta le piante in vaso in luoghi riparati
- Riduci l'innaffiatura ma non sospenderla completamente

## Piantumazione Autunnale

L'autunno è il momento ideale per piantare:

- Bulbi a fioritura primaverile (tulipani, narcisi, giacinti)
- Piante perenni
- Arbusti a foglia caduca
- Siepi

## Concimazione

Applica un concime a rilascio lento ricco di potassio per rafforzare le radici prima dell'inverno. Evita i concimi azotati che stimolerebbero una crescita troppo tardiva.

Con queste semplici operazioni, il tuo giardino sarà pronto ad affrontare l'inverno e tornerà più bello che mai con la primavera!
    `,
    coverImage: "/images/blog/autunno-giardino.jpg",
    category: "Manutenzione",
    author: "Team Visione Sostenibile",
    publishedAt: "2024-10-15",
    readTime: "5 min",
  },
  {
    slug: "tendenze-giardini-2024",
    title: "Tendenze Giardini 2024: Le Novità del Verde",
    excerpt:
      "Scopri le tendenze più hot per il 2024 nel mondo del giardinaggio e dell'architettura del paesaggio.",
    content: `
Il 2024 porta con sé nuove tendenze nel mondo del giardinaggio e del paesaggio. Ecco le direzioni che stanno emergendo:

## 1. Giardini a Bassa Manutenzione

La tendenza principale è verso spazi verdi che richiedano meno interventi. Si privilegiano:

- Piante autoctone e resistenti alla siccità
- Sistemi di irrigazione automatizzati
- Prati artificiali di alta qualità
- Pietra naturale al posto del prato

## 2. Biodiversità

Aumenta l'attenzione verso giardini che favoriscano la biodiversità:

- Hotels per insetti
- Mangiatoie per uccelli
- Piante nettarifere per farfalle
- Stagni naturali per anfibi

## 3. Spazi Living Esterni

Il giardino diventa una vera stanza all'aperto:

- Cucine da esterni attrezzate
- Aree relax con fire pit
- Schermi cinematografici da giardino
- Illuminazione scenografica

## 4. Tecnologia Verde

La tecnologia si integra con il verde:

- App per la gestione del giardino
- Sensori di umidità del suolo
- Robot tagliaerba intelligenti
- Sistemi di illuminazione smart

## 5. Colori audaci

Via libera ai colori vivaci nelle fioriture e negli elementi decorativi.
    `,
    coverImage: "/images/blog/tendenze-2024.jpg",
    category: "Tendenze",
    author: "Marco Verde",
    publishedAt: "2024-09-20",
    readTime: "4 min",
  },
  {
    slug: "piante-pendio",
    title: "Le Migliori Piante per Terreni in Pendio",
    excerpt:
      "Hai un terreno in pendio? Scopri quali piante scegliere per valorizzarlo e prevenire l'erosione.",
    content: `
I terreni in pendio rappresentano una sfida particolare nel giardinaggio, ma anche un'opportunità unica per creare paesaggi spettacolari.

## Perché Scegliere Piante Adeguate

Le piante sui pendii devono:

- Avere apparati radicali profondi
- Essere resistenti alla siccità
- Adattarsi a condizioni di terreno povere
- Prevenire l'erosione

## Piante Consigliate

### Per pendii soleggiati
- Lavanda
- Rosmarino
- Salvia
- Cactus e succulente

### Per pendii ombreggiati
- Felci
- Hostas
- Begonie
- Viole del pensiero

### Coprisuolo
- Vinca
- Pachysandra
- Timo strisciante
- Ajuga

## Consigli di Installazione

1. **Impianto a terrazze**: Crea livelli per facilitare la manutenzione
2. **Geotessili**: Utilizzali per stabilizzare il terreno
3. **Distanza corretto**: Pianta densamente per coprire rapidamente
4. **Irrigazione**: Installa sistemi a goccia per un'idratazione uniforme

Con le piante giuste, anche il pendio più impegnativo può diventare un giardino mozzafiato!
    `,
    coverImage: "/images/blog/piante-pendio.jpg",
    category: "Progettazione",
    author: "Laura Fiori",
    publishedAt: "2024-08-10",
    readTime: "6 min",
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string): BlogPost[] {
  return blogPosts.filter((post) => post.slug !== currentSlug).slice(0, 2);
}
