# Workspace 3 — Research & Content Discovery

## Stato
- **Iterazione**: 0
- **Ultimo aggiornamento**: (auto)
- **Stato**: pending

## Obiettivo
Ricercare su internet nuovi progetti, strumenti, concetti e pattern dell'ecosistema agentico AI per il codice. Arricchire la whiteboard con contenuti rilevanti e aggiornati.

## Workflow
1. Leggi le richieste di ricerca in `resources/research-requests.md`
2. Se vuote, genera le tue basandoti su:
   - Cosa manca nelle macroaree attuali?
   - Quali nuovi framework/tool sono usciti recentemente?
   - Quali pattern emergono nella community?
3. Cerca su internet (usa il terminale con curl a motori di ricerca, o leggi blog/docs)
4. Raccogli risultati e aggiornali

## Fonti di Ricerca
- GitHub trending (AI/agent repositories)
- Documentazione ufficiale dei framework (LangChain, CrewAI, AutoGen, etc.)
- Blog: Anthropic, OpenAI, Google DeepMind
- Reddit: r/LocalLLaMA, r/ChatGPTCoding, r/ArtificialIntelligence
- ArXiv papers su agent systems
- Awesome-lists su GitHub (awesome-langchain, awesome-agents, etc.)

## Output
Salva i risultati in `resources/findings.md` con formato:
```markdown
## [Nome Framework/Strumento/Pattern]
- **macroarea**: Quale macroarea della whiteboard
- **url**: Link ufficiale
- **description**: Cosa fa, in 2-3 frasi
- **popularity**: Stima 1-10
- **alternatives**: Cosa sostituisce o con cosa compete
- **notes**: Note particolari, limitazioni, punti di forza
- **why_include**: Perché merita di stare sulla whiteboard
```

## Ricerche Strutturali da Fare (ogni iterazione)
1. C'è qualche nuovo framework agentic uscito nelle ultime 2 settimane?
2. Quali tool di memory/state stanno guadagnando adozione?
3. Nuovi pattern di orchestration (multi-agent, hierarchical, etc.)
4. Quali miglioramenti nelle capacità dei modelli LLM per coding?
5. Nuovi standard o protocolli (MCP, ACP, etc.)

## Guide Contestuali
Oltre agli strumenti, cerca anche:
- Guide/tutorial su come progettare l'ambiente di un agente AI
- Best practices per tool selection
- Comparison chart tra framework agentici
- Check-list per setup di un coding agent completo

Salva le guide trovate in `resources/guides.md`.

## Comandi Dopo Ogni Iterazione
1. Aggiorna questo file con lo stato attuale
2. Salva findings in `resources/findings.md`
3. Se hai nuove richieste di ricerca, aggiungile in `resources/research-requests.md`
4. Aggiorna il file concetti per il workspace 1 se hai nuovi dati significativi
