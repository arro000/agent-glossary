# Workspace 1 — Implementation

## Stato
- **Iterazione**: 3
- **Ultimo aggiornamento**: 2026-04-02 18:01:17
- **Stato**: completed

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
- Rettangoli 720x460px con bordo tratteggiato pastello e angoli arrotondati (12px)
- Etichetta macroarea + contatore concetti in alto a sinistra
- Sfondo semi-trasparente (alpha 0.55)
- Layout: griglia 3x4 con gap 80px orizzontale, 60px verticale
- Ombra sottile per profondità

### Bolle
- Cerchi equal-size (raggio fisso) in tutte le macroaree
- Layout automatico: 4-6 colonne a seconda del numero di concetti
- Colore pastelle sfumato della macroarea genitore
- Ogni bolla mostra emoji/icona + titolo subsection
- Peso visuale basato sul numero di riferimenti/progetti (`alternatives`), non sulla dimensione della bolla
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

## Iterazione 1 (Current Workspace Pass) — Completata
- [x] Verificate specifiche e PRD di `.workspaces/2-improvements/resources/prd.md`
- [x] Confermato rendering PixiJS v8 vanilla con canvas montato via `useRef/useEffect`
- [x] Bolle sottosezione mantenute a dimensione uniforme in ogni macroarea
- [x] Peso bolla aggiornato: ora usa il numero di riferimenti/progetti (`alternatives`) invece della popularity
- [x] Badge bolla e barra "PROJECT WEIGHT" nel panel mostrano il conteggio riferimenti
- [x] Hover glow, click panel, zoom (wheel) e pan (drag) verificati nel flusso esistente

## Iterazione 1 (Questa esecuzione) — Completata
- [x] Requisiti chiave confermati: PixiJS v8 vanilla, rendering full-canvas, font Inter, bolle equal-size
- [x] Confermata leggibilita bolle con emoji/icona + titolo in ogni subsection
- [x] Confermato peso delle bolle basato su numero di riferimenti/progetti (`alternatives`)
- [x] Corretto hit area delle bolle per interazioni pointer precise (`Circle(0, 0, radius)`)
- [x] Migliorato layout controlli zoom evitando overlap tra pulsanti (+, -, fit)

## Iterazione 1 (Aggiornamento finale) — Completata
- [x] Adaptive bubble packing aggiornato per mantenere griglia piu bilanciata tra le macroaree
- [x] Emoji delle bolle rese piu riconoscibili con font fallback dedicato e halo leggero
- [x] Project weight reso piu leggibile con meter a punti, badge refs e tooltip arricchito
- [x] Cleanup della legend scrollabile collegato al teardown dell'app
- [x] Verifica finale: `npm run build` completata con successo dopo gli ultimi miglioramenti

## Iterazione 2 (Questa esecuzione) — Completata
- [x] Verificato PRD in `.workspaces/2-improvements/resources/prd.md` (baseline iteration)
- [x] Migliorato visual macroaree con bordo tratteggiato in PixiJS (coerente con whiteboard style)
- [x] Aggiunte emoji anche alle intestazioni macroarea per orientamento piu rapido
- [x] Confermati vincoli chiave: bolle equal-size, peso da riferimenti, hover glow, panel click, zoom wheel, pan drag
- [x] Build produzione eseguita con successo
- [x] `npm run lint` ancora bloccato da errori preesistenti in file generati `.netlify/**` (fuori scope app)

## Iterazione 1 (Richiesta utente corrente) — Completata
- [x] Letto il contesto richiesto: `context.md`, `resources/concepts.md`, `resources/pixijs-reference.md`
- [x] Trovato PRD in `.workspaces/2-improvements/resources/prd.md` e verificata la coerenza con i vincoli richiesti
- [x] Confermato stato implementazione whiteboard PixiJS v8 vanilla con rendering full-canvas (no overlay HTML per contenuti)
- [x] Confermati requisiti UI principali: bolle equal-size con emoji+titolo, hover glow, click panel dettagli, zoom wheel e pan drag
- [x] Verifica tecnica eseguita: `npm run build` OK
- [x] Verifica lint eseguita: errori presenti solo in artefatti generati `.netlify/**` (fuori scope funzionale)

## Iterazione 2 (Richiesta utente corrente) — Completata
- [x] Verificato PRD in `.workspaces/2-improvements/resources/prd.md` (presente, baseline iteration)
- [x] Migliorata responsivita zoom-to-fit: scala minima ridotta a `0.2` per rendere navigabile la board anche su viewport piccoli
- [x] Corretto filtro apertura panel: ora rispetta la ricerca su **nome o descrizione** (coerente con il filtro realtime)
- [x] Corretto repositioning minimap su resize usando dimensioni reali del container (`minimap.width/height`)
- [x] Aggiunto cleanup del listener wheel del canvas in teardown per evitare leak su remount

## Iterazione 3 (Richiesta utente corrente) — Completata
- [x] Letti i file richiesti: `context.md`, `resources/concepts.md`, `resources/pixijs-reference.md`
- [x] Verificato PRD presente in `.workspaces/2-improvements/resources/prd.md` e confermato che i requisiti baseline sono gia implementati
- [x] Confermato allineamento ai key rules: PixiJS v8 vanilla via `useRef/useEffect`, rendering full-canvas, font Inter, bolle equal-size con emoji+titolo, peso da `alternatives`, zoom/pan, hover glow e click panel
- [x] Verifica esecuzione: `npm run build` completata con successo
- [x] Verifica lint eseguita: errori residui confinati agli artefatti generati `.netlify/**` (fuori scope della whiteboard)

## Iterazione 4 — Completata
- [x] Rework delle subsection bubbles: fill/stroke uniformi, peso progetto reso dal ring segmentato e dal badge refs
- [x] Emoji rese piu leggibili con halo piu ampio e font size aumentata
- [x] Label interne delle bubbles regolate per ridurre overlap e mantenere riconoscibilita a colpo d'occhio

## File Principali
- `src/components/whiteboard.tsx` — Componente principale con tutta la logica PixiJS
- `src/app/page.tsx` — Pagina che renderizza il whiteboard
- `src/app/globals.css` — CSS globale con import Inter e reset

## Comandi Dopo Ogni Iterazione
1. Aggiorna questo file con lo stato attuale
2. Se incontri errori o limiti, segnalali in `resources/blockers.md`
3. Aggiorna i dati dei concetti se trovi nuovi strumenti/pattern
4. Commit con messaggio descrittivo
