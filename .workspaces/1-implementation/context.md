# Workspace 1 — Implementation

## Stato
- **Iterazione**: 4
- **Ultimo aggiornamento**: 2026-04-02 15:50:05
- **Stato**: failed

## Obiettivo
Implementare l'app "Agent Glossary Whiteboard" usando PixiJS v8 + Next.js.

## Stack Tecnico
- Next.js 16 (App Router, src/, TypeScript)
- PixiJS v8.17+ (ESM, @pixi/react NON usare — PixiJS vanilla con Application)
- Tailwind CSS v4
- Font: Inter (importato via CSS @fontsource)

## Visione dell'App
Una whiteboard quadrettata interattiva che mostra un glossario visuale dell'ecosistema degli agenti AI per il codice. Le bolle rappresentano sotto-sezioni e progetti, non concetti isolati: devono avere tutte la stessa dimensione, essere riconoscibili con emoji/icon e mostrare a colpo d'occhio scopo, riferimenti e peso relativo dei progetti legati a quella sotto-sezione. Serve a progettisti/sviluppatori per evitare di installare componenti sovrapposti.

## Layout
- **Sfondo**: Griglia quadrettata (tipo whiteboard/sheet), linee sottili grigio chiaro su bianco
- **Macroaree**: Grandi regioni rettangolari con bordo tratteggiato, etichetta in alto, sfondo pastello trasparente
- **Bolle concetti**: Cerchi/ellissi dentro ogni macroarea, dimensione proporzionale alla popolarità/importanza
- **Nessun collegamento**: Le bolle sono posizionate spazialmente, zero linee tra loro

## Macroaree (12 totali, grid 3x4)
1. **Memory & State** — 8 concetti: Persistent Memory, Session Memory, Vector Database, Context Window Management, Temporal Memory, Tiered Memory, Procedural Memory, Token Budget
2. **Tools & Actions** — 8 concetti: Code Execution Sandbox, Terminal/Shell Access, File I/O, Web Search, Browser Automation, MCP, A2A, API Client
3. **Prompt Engineering** — 6 concetti: System Prompt, Few-Shot Examples, Chain-of-Thought, Structured Output, Prompt Caching, Context Compression
4. **Orchestration** — 16 concetti: Agent Loop, Prompt Chaining, Routing, Parallelization, Orchestrator-Workers, Evaluator-Optimizer, Handoffs/Swarm, GraphFlow/State Machine, Multi-Agent, Task Planning, Tool Routing, Subagent Delegation, HITL, Async Background, ACI, Cron/Scheduling
5. **Inference & Models** — 7 concetti: LLM Providers, Model Selection, Context Length, Quantization, Streaming, Embeddings, Reasoning Models
6. **Skills & Plugins** — 4 concetti: Skill System, Custom Tool Creation, Workflow Automation, PRD Generation
7. **Observability** — 7 concetti: Logging & Tracing, Observability Platform, Cost Tracking, Evaluation & Benchmarks, Debugging Tools, Safety & Guardrails, Agent Governance
8. **Infrastructure** — 6 concetti: Docker & Containers, GPU Cloud, Serverless, CI/CD, Git Integration, Environment Management
9. **Knowledge & Retrieval** — 2 concetti: Agentic RAG, Deep Research Agent
10. **Frameworks & SDKs** — 6 concetti: Google ADK, OpenAI Agents SDK, Mastra, Pydantic AI, Strands Agents SDK, Claude Agent SDK
11. **Business Automation** — 2 concetti: Visual Agent Builder, Low-Code Agent Platform
12. **Protocol Extensions** — 1 concetto: MCP Apps

**Totale: 67 concetti** (era 62 nell'iterazione 2)

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
- Rettangoli 720x460px con bordo pastelle e angoli arrotondati (12px)
- Etichetta macroarea + contatore concetti in alto a sinistra
- Sfondo semi-trasparente (alpha 0.55)
- Layout: griglia 3x4 con gap 80px orizzontale, 60px verticale
- Ombra sottile per profondità

### Bolle
- Cerchi con raggio proporzionale alla popolarità (min 24px per pop 6, max 62px per pop 10)
- **Adaptive scaling**: per macroaree dense (es. Orchestration con 16 items), le bolle vengono scalate per adattarsi allo spazio disponibile
- Layout automatico: 4-6 colonne a seconda del numero di concetti
- Colore pastelle sfumato della macroarea genitore
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

### Search Bar
- Barra di ricerca centrata in alto
- Filtra bolle e macroaree in tempo reale
- Contatore risultati visibili
- Hidden input HTML per supporto tastiera nativo

### Legend
- Pannello legenda con tutte le macroaree in alto a destra
- Colore + nome + conteggio concetti per area

### Minimap
- Angolo in basso a destra (180x110px)
- Click-to-navigate sulla minimap

## Iterazione 1 — Completata
- [x] Setup PixiJS Application con griglia quadrettata
- [x] Rendering 8 macroaree con sfondo pastelle
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

## Iterazione 3 — Completata
- [x] **4 nuove macroaree** aggiunte da concepts.md (da 8 a 12 totali)
  - Knowledge & Retrieval (2 concetti: Agentic RAG, Deep Research Agent)
  - Frameworks & SDKs (6 concetti: Google ADK, OpenAI Agents SDK, Mastra, Pydantic AI, Strands Agents SDK, Claude Agent SDK)
  - Business Automation (2 concetti: Visual Agent Builder, Low-Code Agent Platform)
  - Protocol Extensions (1 concetto: MCP Apps)
- [x] **Layout grid espanso** da 2x4 a 3x4 per accomodare 12 macroaree
- [x] **5 nuovi concetti** aggiunti (da 62 a 67 totali)
- [x] **Observability Platform** descrizione aggiornata con AgentOps
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
