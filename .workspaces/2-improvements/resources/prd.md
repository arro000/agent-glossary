# PRD — Iterazione 1

## Obiettivo
Costruire la whiteboard base con tutte le macroaree e bolle visibili.

## Changes
- [ ] Setup PixiJS Application con griglia quadrettata
- [ ] Rendering 8 macroaree con sfondo pastello
- [ ] Rendering bolle dentro macroaree con dimensione proporzionale
- [ ] Zoom & pan interattivi
- [ ] Hover effect sulle bolle
- [ ] Click per mostrare dettagli (tooltip o panel)

## Dettagli Tecnici
Vedi `context.md` per le specifiche complete.

## Criticità
- Performance con molte bolle: usare Container per culling
- Font Inter deve essere caricato prima del rendering PixiJS
- Gestione responsive del canvas su resize
