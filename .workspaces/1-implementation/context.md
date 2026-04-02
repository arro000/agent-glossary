# Workspace 1 — Implementation

## Stato
- **Iterazione**: 1
- **Ultimo aggiornamento**: 2026-04-02
- **Stato**: complete

## Obiettivo
Implementare l'app "Agent Glossary Whiteboard" usando PixiJS v8 + Next.js.

## Stack Tecnico
- Next.js 16 (App Router, src/, TypeScript)
- PixiJS v8.17+ (ESM, @pixi/react NON usare — PixiJS vanilla con Application)
- Tailwind CSS v4
- Font: Inter (importato via CSS @fontsource)

## Visione dell'App
Una whiteboard quadrettata interattiva che mostra un glossario visuale dell'ecosistema degli agenti AI per il codice. Serve a progettisti/sviluppatori per avere a colpo d'occhio tutti gli strumenti, concetti e pattern disponibili, evitando di installare componenti sovrapposti.

## Layout
- **Sfondo**: Griglia quadrettata (tipo whiteboard/sheet), linee sottili grigio chiaro su bianco
- **Macroaree**: Grandi regioni rettangolari con bordo tratteggiato, etichetta in alto, sfondo pastello trasparente
- **Bolle concetti**: Cerchi/ellissi dentro ogni macroarea, dimensione proporzionale alla popolarità/importanza
- **Nessun collegamento**: Le bolle sono posizionate spazialmente, zero linee tra loro

## Macroaree (iniziali)
1. **Memory & State** — Persistent memory, session memory, vector DB, context window, token management
2. **Tools & Actions** — Code execution, terminal, file I/O, web search, browser, API calls, MCP
3. **Prompt Engineering** — System prompts, few-shot, chain-of-thought, structured output, prompt templates
4. **Orchestration** — Agent loops, multi-agent, planning, task decomposition, tool routing
5. **Inference & Models** — LLM providers, model selection, context length, quantization, streaming
6. **Skills & Plugins** — Skill systems, plugin architecture, reusable workflows, custom tools
7. **Observability** — Logging, tracing, cost tracking, eval, benchmarks, debugging
8. **Infrastructure** — Docker, GPU cloud, serverless, CI/CD, deployment, environments

## Dati
I concetti/strumenti per ogni macroarea stanno nel file `resources/concepts.md`.
Dopo ogni iterazione, aggiorna le dimensioni/popolarità delle bolle in base ai dati trovati.

## Dettagli Implementativi

### PixiJS Setup
- Usa PixiJS v8 vanilla (NON @pixi/react). Crea un canvas e mountalo via useRef/useEffect.
- Tutto il rendering è dentro PixiJS — zero HTML overlay per i contenuti.
- Testo con `PIXI.Text` usando font Inter (caricato via CSS, PixiJS lo rileva automaticamente).

### Griglia
- Linee grigio chiaro (#e5e5e5) su sfondo bianco (#fafafa)
- Spacing: 40px
- La griglia si estende oltre il viewport (per supportare zoom/pan)
- Estensione: -2000 a 6000px in entrambe le direzioni

### Macroaree
- Rettangoli 720x360px con bordo pastello e angoli arrotondati (12px)
- Etichetta in alto a sinistra con nome macroarea (font bold, colore tema)
- Sfondo semi-trasparente del colore della macroarea (alpha 0.55)
- Layout: griglia 2x4 (2 colonne, 4 righe) con gap 80px orizzontale, 50px verticale
- Ombra sottile per profondità

### Bolle
- Cerchi con raggio proporzionale alla popolarità (min 24px per pop 6, max 62px per pop 10)
- Colore pastello sfumato della macroarea genitore (bordo + fill)
- Testo centrato dentro (nome strumento/concetto, word wrap)
- Hover: glow a due livelli + scale 1.06x
- Click: apre detail panel

### Zoom & Pan
- Scroll wheel = zoom (centrato sul cursore, fattore 0.92/1.08)
- Drag = pan della whiteboard (solo su sfondo, non su bolle)
- Zoom range: 0.2x - 3x
- Cursor: grab/grabbing

### Dettagli Panel (PixiJS nativo)
Quando clicchi una bolla, appare un panel PixiJS (non HTML) con:
- Nome (titolo bold 18px)
- Badge macroarea con colore tema
- Descrizione (2-3 righe, word wrap)
- Barra popolarità (label + barra progressiva colorata)
- Categoria
- Alternatives (elenco strumenti simili)
- Pulsante chiudi (✕) + backdrop click + ESC
- Dimensione: 400x310px, centrato sullo schermo

## Iterazione 1 — Completata
Tutte le feature PRD implementate:
- [x] Setup PixiJS Application con griglia quadrettata
- [x] Rendering 8 macroaree con sfondo pastello
- [x] Rendering bolle dentro macroaree con dimensione proporzionale
- [x] Zoom & pan interattivi
- [x] Hover effect sulle bolle (glow + scale)
- [x] Click per mostrare dettagli (panel con nome, descrizione, macroarea, popolarità, categoria, alternative)
- [x] Build e lint passano senza errori

## File Principali
- `src/components/whiteboard.tsx` — Componente principale con tutta la logica PixiJS
- `src/app/page.tsx` — Pagina che renderizza il whiteboard
- `src/app/globals.css` — CSS globale con import Inter e reset

## Comandi Dopo Ogni Iterazione
1. Aggiorna questo file con lo stato attuale
2. Se incontri errori o limiti, segnalali in `resources/blockers.md`
3. Aggiorna i dati dei concetti se trovi nuovi strumenti/pattern
4. Commit con messaggio descrittivo
