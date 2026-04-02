# PRD — Iterazione 3

## Obiettivo
Raffinare la whiteboard per rappresentare il glossario come una macchina agentica: macroaree, harness, memoria, contesto, tools, skills, navigazione tra riferimenti, observability e discovery.

## Changes
- [x] Setup PixiJS Application con griglia quadrettata
- [x] Rendering macroaree con sfondo pastello
- [x] Rendering bolle dentro macroaree con dimensione uniforme, emoji riconoscibili e peso progetto codificato separatamente
- [x] Inserire/raffinare i concetti harness, context navigation e reference retrieval nella tassonomia
- [x] Zoom & pan interattivi
- [x] Hover effect sulle bolle
- [x] Click per mostrare dettagli (panel)
- [x] Search realtime che filtra nome, descrizione, categoria e alternative
- [x] Aggiornamento tassonomia con harness/runtime scaffold, reference navigation, repo map, OTel GenAI, replay/grading e protocolli UI
- [x] Cache dei metadati derivati delle bubble (search index, display label, refs) per search e interazioni piu fluide
- [x] Stato selezione persistente della bubble aperta per feedback visivo piu chiaro senza aggiungere clutter
- [x] Raffinamento visuale dell'attuale iterazione: header macroarea piu leggibili, bubble equal-size piu bilanciate, emoji piu riconoscibili e project weight piu chiaro
- [x] Miglioramento feedback interaction: tooltip e selezione restano leggibili su viewport piccole senza introdurre overlay HTML
- [x] Conservato il vincolo full-canvas PixiJS v8 vanilla con font Inter e layout responsive
- [x] Allineamento finale al dataset `concepts.md`: `Context Graph`, `Durable Execution`, `Session Replay` e `Trace Grading` visibili, per un totale di 101 subsection bubbles coerenti con la taxonomy corrente
- [x] Signal chip e visual cues tenuti discreti ma leggibili per harness, context, reference navigation, replay-aware e eval-aware workflows

## Dettagli Tecnici
Vedi `context.md` per le specifiche complete.

## Vincoli Attuali
- Tutto il rendering resta in PixiJS v8 vanilla
- Nessun overlay HTML per i contenuti della board
- Bolle equal-size: il peso vive in ring/badge/alpha, non nel diametro
- Le bubble devono rimanere leggibili anche quando il dataset si densifica
- La search deve cercare anche alternative e categoria, non solo nome/descrizione
- Il canvas deve restare responsive con zoom-to-fit iniziale
- Le bubble cliccate devono restare enfatizzate finche il panel e aperto, anche mentre la search filtra, ma senza cambiare dimensione base
- Il peso progetto deve restare codificato in modo discreto ma immediatamente interpretabile (ring + badge + panel)
- Le macroaree devono rimanere pastello e distinte, ma senza competere con la leggibilita delle bubble
- Le emoji devono restare riconoscibili anche su bubble compatte e ad alto DPR
- Context graph, reference navigation, durable execution, session replay e trace grading devono avere segnali visivi distintivi ma non invasivi

## Criticita
- Performance con molte bolle: usare Container per culling e redraw minimo della griglia
- Font Inter deve essere caricato prima del rendering PixiJS
- Gestione responsive del canvas su resize
- Caching dei metadati derivati per evitare work ripetuto durante search, hover e open panel
