# Workspace 1 — Implementation

## Stato
- **Iterazione**: 2
- **Ultimo aggiornamento**: 2026-04-02
- **Stato**: completed

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
1. **Memory & State** — 8 concetti: Persistent Memory, Session Memory, Vector Database, Context Window Management, Temporal Memory, Tiered Memory, Procedural Memory, Token Budget
2. **Tools & Actions** — 8 concetti: Code Execution Sandbox, Terminal/Shell Access, File I/O, Web Search, Browser Automation, MCP, A2A, API Client
3. **Prompt Engineering** — 6 concetti: System Prompt, Few-Shot Examples, Chain-of-Thought, Structured Output, Prompt Caching, Context Compression
4. **Orchestration** — 16 concetti: Agent Loop, Prompt Chaining, Routing, Parallelization, Orchestrator-Workers, Evaluator-Optimizer, Handoffs/Swarm, GraphFlow/State Machine, Multi-Agent, Task Planning, Tool Routing, Subagent Delegation, HITL, Async Background, ACI, Cron/Scheduling
5. **Inference & Models** — 7 concetti: LLM Providers, Model Selection, Context Length, Quantization, Streaming, Embeddings, Reasoning Models
6. **Skills & Plugins** — 4 concetti: Skill System, Custom Tool Creation, Workflow Automation, PRD Generation
7. **Observability** — 7 concetti: Logging & Tracing, Observability Platform, Cost Tracking, Evaluation & Benchmarks, Debugging Tools, Safety & Guardrails, Agent Governance
8. **Infrastructure** — 6 concetti: Docker & Containers, GPU Cloud, Serverless, CI/CD, Git Integration, Environment Management

**Totale: 62 concetti** (era 48 nell'iterazione 1)

## Dati
I concetti/strumenti per ogni macroarea stanno nel file `resources/concepts.md`.
Tutti i concetti dal database sono ora rappresentati nella whiteboard.

## Dettagli Implementativi

### PixiJS Setup
- PixiJS v8 vanilla (NON @pixi/react). Canvas montato via useRef/useEffect.
- Tutto il rendering in PixiJS — zero HTML overlay.
- Testo con `PIXI.Text` usando font Inter (caricato via CSS, await document.fonts.ready).

### Griglia
- Linee grigio chiaro (#e5e5e5) su sfondo bianco (#fafafa)
- Spacing: 40px, dinamica con viewport culling
- Zoom/pan attivi

### Macroaree
- Rettangoli 720x460px (aumentato da 360) con bordo pastello e angoli arrotondati (12px)
- Etichetta macroarea + contatore concetti in alto a sinistra
- Sfondo semi-trasparente (alpha 0.55)
- Layout: griglia 2x4 con gap 80px orizzontale, 60px verticale
- Ombra sottile per profondità

### Bolle
- Cerchi con raggio proporzionale alla popolarità (min 24px per pop 6, max 62px per pop 10)
- **Adaptive scaling**: per macroaree dense (es. Orchestration con 16 items), le bolle vengono scalate per adattarsi allo spazio disponibile
- Layout automatico: 4-6 colonne a seconda del numero di concetti
- Colore pastello sfumato della macroarea genitore
- Hover: glow a due livelli + scale 1.06x (animazione smooth con lerp 0.18)
- Click: apre detail panel con fade-in

### Zoom & Pan
- Scroll wheel = zoom (centrato sul cursore, fattore 0.92/1.08)
- Drag = pan (solo su sfondo, non su bolle)
- Zoom range: 0.2x - 3x
- **Zoom buttons**: +/−/fit (angolo in basso a sinistra) con indicatore percentuale zoom
- **Keyboard shortcuts**: +/- zoom, 0 zoom-to-fit, ESC chiudi panel
- **Initial zoom-to-fit**: la whiteboard si adatta automaticamente al viewport al caricamento

### Dettagli Panel
- Fade-in su apertura, **fade-out su chiusura** (animazione alpha 0↔1)
- Nome, badge macroarea, descrizione, barra popolarità, categoria, alternative
- Chiusura: pulsante ✕, click backdrop, o tasto ESC
- Dimensione: 400x310px, centrato

### Minimap
- Angolo in basso a destra (180x110px)
- Click-to-navigate sulla minimap

## Iterazione 1 — Completata
- [x] Setup PixiJS Application con griglia quadrettata
- [x] Rendering 8 macroaree con sfondo pastello
- [x] Rendering bolle dentro macroaree con dimensione proporzionale
- [x] Zoom & pan interattivi
- [x] Hover effect sulle bolle (glow + scale)
- [x] Click per mostrare dettagli (panel con nome, descrizione, macroarea, popolarità, categoria, alternative)
- [x] Build e lint passano senza errori

## Iterazione 2 — Completata
- [x] **16 nuovi concetti** aggiunti da concepts.md (da 48 a 62 totali)
  - Memory & State: +Temporal Memory, +Tiered Memory, +Procedural Memory
  - Tools & Actions: +A2A
  - Orchestration: +Prompt Chaining, +Routing, +Parallelization, +Orchestrator-Workers, +Evaluator-Optimizer, +Handoffs/Swarm, +GraphFlow/State Machine, +HITL, +Async Background, +ACI
  - Observability: +Observability Platform, +Agent Governance
- [x] **AREA_HEIGHT aumentato** da 360 a 460px per accomodare più bolle
- [x] **Adaptive layout**: le bolle vengono scalate automaticamente per macroaree dense (6 colonne per Orchestration)
- [x] **Contatore concetti** per ogni macroarea (etichetta sotto il nome)
- [x] **Panel fade-out** animazione su chiusura (alpha 1→0)
- [x] **Zoom buttons** (+/−/fit) con indicatore percentuale zoom
- [x] **Keyboard shortcuts**: +/- zoom, 0 zoom-to-fit
- [x] **Initial zoom-to-fit** al caricamento
- [x] Build e lint passano senza errori/warnings

## File Principali
- `src/components/whiteboard.tsx` — Componente principale con tutta la logica PixiJS
- `src/app/page.tsx` — Pagina che renderizza il whiteboard
- `src/app/globals.css` — CSS globale con import Inter e reset

## Comandi Dopo Ogni Iterazione
1. Aggiorna questo file con lo stato attuale
2. Se incontri errori o limiti, segnalali in `resources/blockers.md`
3. Aggiorna i dati dei concetti se trovi nuovi strumenti/pattern
4. Commit con messaggio descrittivo
