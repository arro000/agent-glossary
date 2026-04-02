# Workspace 2 — Improvements & Implementation

## Stato
- **Iterazione**: 4
- **Ultimo aggiornamento**: 2026-04-02 22:09:37
- **Stato**: completed

## Obiettivo
Analizzare l'implementazione corrente, identificare miglioramenti, e IMPLEMENTARLI direttamente sul codice. Le bolle devono restare uguali tra loro, con emoji/icon e peso dato dai progetti/referenze della sotto-sezione. Non scrivere solo PRD — cambia il codice.

## Iterazione 1 — Completata
- Setup iniziale PixiJS con griglia, macroaree, bolle, zoom/pan

## Iterazione 1 (Questa esecuzione) — Completata
- Bubble metadata derivati cache-ati per search, tooltip e panel (display label, refs, search index)
- Bubble cliccata mantenuta evidenziata finche il panel resta aperto, senza cambiare il diametro
- Search e apertura panel allineate alla stessa stringa indicizzata per ridurre work ripetuto
- PRD aggiornato con i nuovi vincoli e build di produzione verificata con successo (`npm run build`)

## Iterazione 2 — Completata
- **16 nuovi concetti aggiunti** (da 48 a 62 totali)
- **Adaptive bubble layout** per macroaree dense (Orchestration: 16 items, 6 colonne)
- **AREA_HEIGHT aumentato** da 360 a 460px
- **Panel fade-out** animazione su chiusura
- **Zoom controls** (+/−/fit) con indicatore zoom percentuale
- **Keyboard shortcuts** (+/-, 0, ESC)
- **Initial zoom-to-fit** al caricamento
- **Contatore concetti** per ogni macroarea

## Iterazione 3 — Completata

### Cosa ho fatto

#### 1. Smooth Animated Zoom & Pan
- Tutte le transizioni di zoom ora usano **lerp interpolation** (fattore 0.12 per zoom, 0.15 per pan)
- Scroll wheel zoom centered su cursore con animazione fluida
- Zoom buttons (+/−/fit) con transizione animata
- Keyboard zoom (+/-, 0) con transizione animata
- Snap immediato quando la differenza è sotto la soglia per evitare oscillazioni
- Drag pan rimane reattivo (assegnazione diretta, no lerp)

#### 2. Tooltip on Hover
- Floating tooltip scuro (#1f2937, alpha 0.92) che segue il cursore
- Mostra il nome del concetto (senza \n) su hover
- Si nasconde su pointerout e quando si apre il detail panel
- Bordi arrotondati (8px), posizionato intelligentemente per non uscire dal viewport
- Resettato automaticamente durante il drag

#### 3. Search Bar
- Barra di ricerca PixiJS-styled in alto al centro (300x38px)
- **Hidden HTML input** per catturare il testo (off-screen, opacity 0)
- Icona magnifying glass disegnata con Graphics
- Placeholder "Search concepts..." visibile quando vuoto
- Pulsante clear (×) per resettare la ricerca
- **Filtering**: bolle non-matching vengono dimmate (alpha 0.12), macroaree senza match dimmate (alpha 0.15)
- **Match counter**: mostra "N matches" accanto alla barra
- Ricerca su nome concetto + descrizione (case-insensitive)
- Focus state con border blu (#93c5fd)
- **ESC priority**: se la search è attiva con testo, ESC cancella la ricerca; altrimenti chiude il panel
- Bubbli filtrati non sono cliccabili nel detail panel

#### 4. Staggered Intro Animation
- **Macroarei**: fade-in sequenziale con 60ms delay tra aree (durata 500ms per area)
- **Bolle**: scale-in da 0.3x a 1x con 15ms stagger (durata 400ms per bolla)
- Entrambi alpha e scale animati con lerp nel ticker

#### 5. Visual Polish
- **Legend** (top-right): mostra tutte le 8 macroaree con colore, nome e contatore concetti
  - Background semi-trasparente con ombra sottile, bordi arrotondati
  - Header "MACROAREAS" con letter-spacing
  - Ogni entry: badge colore + nome + numero concetti
- **Search bar shadow**: ombra sottile sotto la barra di ricerca
- **Minimap shadow**: migliorata alpha del background (0.85 → 0.88)
- **Zoom controls shadow**: migliorata alpha del background (0.85 → 0.88)
- **Bubble white alpha**: leggermente aumentata (0.6 → 0.65) per migliorare leggibilità
- **Bubble inner fill**: ridotto (0.15 → 0.12) per look più pulito

### Iterazione 1 — Aggiornamento Visuale
- Le subsection bubbles restano **tutte della stessa dimensione** e usano ora un encoding più chiaro del peso progetto
- Aggiunto un **micro-meter a punti** e badge numerico per rendere il peso leggibile senza alterare il diametro
- Rafforzata la leggibilità degli emoji con un piccolo halo chiaro dietro l'icona
- Build di produzione verificata con successo dopo le modifiche

### Bug Fix
- Rimossa variabile `minimapViewport` non utilizzata (warning lint)
- Rimossa variabile `cleanName` non utilizzata nel tooltip move handler (warning lint)

### Cosa rimane da fare
- Drag bolle per riorganizzare (complesso)
- Responsive layout (mobile)
- Keyboard navigation tra bolle (Tab/Shift+Tab)
- Tooltip con descrizione breve + categoria
- Click macroarea nella legend per zoom-to-area
- Export/save layout
- Animazione panel apertura (slide + scale)

### Problemi incontrati
- Nessuno. Build e lint passano senza errori/warnings (0 errors, 0 warnings).

## Iterazione 4 — Completata
- Rework delle subsection bubbles con **dimensione fissa** e encoding del peso tramite **ring segmentato + badge refs**
- Emoji rese piu riconoscibili con halo piu ampio e text size aumentata
- Rimossa la vecchia barra a punti per ridurre il rumore visivo
- Build di produzione verificata con successo (`npm run build`)

## Iterazione 5 — Completata
- Le subsection bubbles ora mantengono una resa ancora piu uniforme: fill/stroke sono fissi, il peso progetto vive nel ring segmentato e nel badge refs
- Emoji piu leggibili grazie a halo piu ampio e dimensione aumentata
- Aggiornato il layout label interno per ridurre overlap visivo nelle bubble piu dense

## Iterazione 6 — Completata
- Shell delle subsection bubbles resa piu chiara e coerente con un title plate interno per migliorare la lettura a colpo d'occhio
- Emoji rinforzate con halo piu netto e font size adattiva per mantenere il riconoscimento anche in bubble dense
- Ring segmentato reso piu leggibile e badge refs centrato per ribadire il peso progetto senza cambiare il diametro
- Build di produzione verificata con successo (`npm run build`)

## Iterazione 7 — Completata
- Bubble layout aggiornato: i project-weight piu alti vengono piazzati piu vicino al centro dell'area, mantenendo tutte le bolle equal-size
- Badge refs reso piu esplicito (`N refs`) e ring segmentato piu contrastato per una lettura piu rapida del peso progetto
- Emoji e title plate rinforzati per mantenere riconoscibilita e leggibilita su canvas ad alta densita
- Verifica finale: `npm run build` completata con successo

## Iterazione 1 (Questa esecuzione) — Completata
- Sync del canvas con la tassonomia aggiornata: harness/runtime scaffold, reference navigation, repo map, protocol UI, OTel GenAI, edge runtime e voice/realtime cluster
- Search ampliata su nome, descrizione, categoria e alternative per coprire meglio reference retrieval e discovery
- PRD allineato con i vincoli attuali e build di produzione verificata con successo (`npm run build`)

## Iterazione 1 (Aggiornamento corrente) — Completata
- [x] PRD riallineato con i vincoli di rendering, interaction e leggibilita dell'iterazione
- [x] Macroarea header resi piu leggibili con badge/contatori piu chiari
- [x] Packing delle bubble densificate aggiornato per aprire meglio le macroaree piu piene
- [x] Bubble shell, emoji e project weight resi piu chiari senza cambiare il diametro
- [x] Build di produzione verificata con successo dopo i miglioramenti visivi (`npm run build`)

## Iterazione 2 (Questa esecuzione) — Completata
- [x] Allineati i dati del canvas al taxonomy source con `Context Graph` e `Durable Execution`
- [x] Aggiornato il PRD di workspace 2 alla nuova iterazione e ai vincoli su context/replay signals
- [x] Validato che il board resta full-canvas PixiJS v8 vanilla con bolle equal-size e project-weight separato
- [x] Verifica tecnica eseguita: `npm run build` completata con successo

## Iterazione 3 (Questa esecuzione) — Completata
- [x] Allineati i concept del canvas al taxonomy corrente aggiungendo `Session Replay` e `Trace Grading`
- [x] La bubble selezionata resta evidenziata anche mentre la search filtra gli altri nodi
- [x] PRD riallineato a iterazione 3 con focus su replay/eval signals e stato attuale della board

## Iterazione 4 (Questa esecuzione) — Completata
- [x] Signal legend ampliata con cue `INTEROP` e helper piu espliciti per harness/context/refnav/repomap/replay/eval
- [x] Tooltip hover aggiornato per mostrare anche il signal sintetico del nodo senza introdurre nuovi overlay
- [x] Signal matching reso piu robusto per harness, context, retrieval, repo map, replay, eval e protocol/discovery pattern
- [x] PRD workspace 2 riallineato alla nuova iterazione e stato corrente aggiornato a `completed`
