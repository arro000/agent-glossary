# PRD — Iterazione 1

## Obiettivo
Raffinare la whiteboard per rappresentare il glossario come una macchina agentica: macroaree, harness, memoria, contesto, tools, skills, navigazione tra riferimenti e osservability.

## Changes
- [x] Setup PixiJS Application con griglia quadrettata
- [x] Rendering macroaree con sfondo pastello
- [x] Rendering bolle dentro macroaree con dimensione uniforme, emoji riconoscibili e peso progetto codificato separatamente
- [x] Inserire/raffinare i concetti harness, context navigation e reference retrieval nella tassonomia
- [x] Zoom & pan interattivi
- [x] Hover effect sulle bolle
- [x] Click per mostrare dettagli (panel)
- [x] Search realtime che filtra nome, descrizione, categoria e alternative
- [x] Aggiornamento tassonomia con harness/runtime scaffold, reference navigation, repo map, OTel GenAI e protocolli UI

## Dettagli Tecnici
Vedi `context.md` per le specifiche complete.

## Vincoli Attuali
- Tutto il rendering resta in PixiJS v8 vanilla
- Nessun overlay HTML per i contenuti della board
- Bolle equal-size: il peso vive in ring/badge/alpha, non nel diametro
- Le bubble devono rimanere leggibili anche quando il dataset si densifica
- La search deve cercare anche alternative e categoria, non solo nome/descrizione
- Il canvas deve restare responsive con zoom-to-fit iniziale

## Criticità
- Performance con molte bolle: usare Container per culling e redraw minimo della griglia
- Font Inter deve essere caricato prima del rendering PixiJS
- Gestione responsive del canvas su resize
