# Setup Convex + Next.js (Feb 2026)

## 🚀 Quick Start (Metodo Consigliato)

Il modo più veloce per iniziare:

```bash
# Crea progetto con template Convex ufficiale
npm create convex@latest my-app

# Oppure con Next.js esistente
npx create-next-app@latest my-app
cd my-app
npm install convex
```

## 📁 Struttura del Progetto

```
my-app/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout con ConvexProvider
│   ├── page.tsx             # Homepage
│   └── ConvexClientProvider.tsx  # Client wrapper
├── convex/                   # Backend Convex (auto-generato)
│   ├── _generated/          # API types (auto-generato)
│   ├── schema.ts            # Database schema
│   └── *.ts                 # Query/Mutation/Action
├── .env.local               # Variabili ambiente
└── convex.json              # Config deployment
```

## ⚙️ Setup Passo-Passo

### 1. Installazione

```bash
cd my-app
npm install convex
```

### 2. Inizializza Convex

```bash
npx convex dev
```

Questo comando:
- Ti fa login con GitHub
- Crea un progetto Convex
- Genera `convex/` folder
- Crea `.env.local` con `NEXT_PUBLIC_CONVEX_URL`
- Avvia il dev server in watch mode

### 3. Schema Database (convex/schema.ts)

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
    userId: v.optional(v.string()),
  }).index("by_user", ["userId"]),
  
  // Aggiungi qui le tue tabelle
});
```

### 4. Query/Mutation (convex/tasks.ts)

```typescript
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Query - leggere dati
export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});

// Mutation - modificare dati
export const create = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert("tasks", {
      text: args.text,
      isCompleted: false,
    });
  },
});
```

### 5. Provider Client (app/ConvexClientProvider.tsx)

```typescript
"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
```

### 6. Layout (app/layout.tsx)

```typescript
import type { Metadata } from "next";
import { ConvexClientProvider } from "./ConvexClientProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Convex App",
  description: "Built with Convex + Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
```

### 7. Usa nei Componenti (app/page.tsx)

```typescript
"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export default function Home() {
  const tasks = useQuery(api.tasks.get);
  const createTask = useMutation(api.tasks.create);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Le mie Task</h1>
      {tasks?.map((task) => (
        <div key={task._id} className="p-2 border rounded mb-2">
          {task.text}
        </div>
      ))}
      <button 
        onClick={() => createTask({ text: "Nuova task" })}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Aggiungi Task
      </button>
    </main>
  );
}
```

## 🔧 Comandi Utili

```bash
# Sviluppo
npm run dev          # Next.js dev server
npx convex dev       # Convex dev (in altro terminale)

# Database
npx convex import --table tasks data.jsonl
npx convex export

# Deploy
npx convex deploy    # Deploy backend
npm run build        # Build Next.js

# Dashboard
npx convex dashboard # Apri dashboard Convex
```

## 📚 Documentazione Ufficiale

- [Convex + Next.js Quickstart](https://docs.convex.dev/quickstart/nextjs)
- [Convex Templates](https://www.convex.dev/templates)
- [Convex Auth](https://docs.convex.dev/auth)

---

**Incolla qui il codice Mermaid del tuo diagramma e ti aiuto a mappare le entità su Convex!**
