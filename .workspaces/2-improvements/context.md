# Workspace 2 — Improvements & Implementation

## Stato
- **Iterazione**: 0
- **Ultimo aggiornamento**: (auto)
- **Stato**: pending

## Obiettivo
Analizzare l'implementazione corrente, identificare miglioramenti, e IMPLEMENTARLI direttamente sul codice. Non scrivere solo PRD — cambia il codice.

## Workflow
1. Leggi il codice attuale in `src/`
2. Leggi il contesto in `../1-implementation/context.md` e `../1-implementation/resources/concepts.md`
3. Leggi blockers in `../1-implementation/resources/blockers.md`
4. Leggi findings in `../3-research/resources/findings.md`
5. Analizza cosa manca, cosa è debole, cosa si può migliorare
6. **IMPLEMENTA le migliorie direttamente nel codice** — modifica file, crea nuovi componenti, aggiorna dati
7. Aggiorna i dati bolle in `../1-implementation/resources/concepts.md` se necessario
8. Se hai nuove richieste di ricerca, scrivile in `../3-research/resources/research-requests.md`

## Regole Critiche
- **Devi scrivere codice**, non solo documentazione
- Parti dal codice che esiste in `src/` e miglioralo
- Se WS1 ha lasciato il lavoro a metà, completalo
- Se non c'è nulla implementato, implementalo tu (leggi le specs in ../1-implementation/context.md)
- Testa con `npm run build` o `npm run dev` dopo le modifiche
- Commit quando hai fatto progressi significativi

## Aree di Miglioramento da Esplorare
- **Dati bolle**: Le dimensioni sono accurate? Servono più strumenti/concetti?
- **Layout**: Le macroaree sono ben disposte? Troppo affollate?
- **Interazione**: Hover/click è responsivo? Serve drag delle bolle?
- **Performance**: Con molte bolle il rendering è fluido?
- **UX**: Serve una legenda? Una mini-mappa? Filtro per macroarea?
- **Contenuti**: Le descrizioni sono accurate e utili?
- **Guide**: Aggiungere una sezione guida/appunti nell'app
- **Visual**: I colori pastello sono leggibili? Il font è giusto?

## Formato Note per Ogni Iterazione
Aggiungi le tue note in `resources/iteration-notes.md`:
```markdown
## Iterazione N
### Cosa ho fatto
- ...
### Cosa rimane da fare
- ...
### Problemi incontrati
- ...
```

## Comandi Dopo Ogni Iterazione
1. Aggiorna questo file con lo stato attuale
2. Salva note in `resources/iteration-notes.md`
3. Aggiorna dati bolle se necessario
4. Se hai nuovi requisiti per la ricerca, scrivili in `../3-research/resources/research-requests.md`
