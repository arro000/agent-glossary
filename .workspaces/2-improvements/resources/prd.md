# PRD — Iterazione 1

## Obiettivo
Raffinare la whiteboard per rappresentare il glossario come una macchina agentica: macroaree, harness, memoria, contesto, tools, skills e navigazione tra riferimenti.

## Changes
- [ ] Setup PixiJS Application con griglia quadrettata
- [ ] Rendering macroaree con sfondo pastello
- [ ] Rendering bolle dentro macroaree con dimensione proporzionale
- [ ] Inserire/raffinare i concetti harness, context navigation e reference retrieval nella tassonomia
- [ ] Zoom & pan interattivi
- [ ] Hover effect sulle bolle
- [ ] Click per mostrare dettagli (tooltip o panel)

## Dettagli Tecnici
Vedi `context.md` per le specifiche complete.

## Criticità
- Performance con molte bolle: usare Container per culling
- Font Inter deve essere caricato prima del rendering PixiJS
- Gestione responsive del canvas su resize
