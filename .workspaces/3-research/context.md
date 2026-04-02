# Workspace 3 — Research & Content Discovery

## Stato
- **Iterazione**: 1 (completata)
- **Ultimo aggiornamento**: 2026-04-02
- **Stato**: completed

## Risultati Iterazione 1

### Ricerca Completata
Tutti i 10 topic di ricerca sono stati coperti:

**High Priority (3/3):**
- ✅ Framework agentici per coding: 12+ tool trovati (Cursor, Gemini CLI, Claude Code, Codex CLI, Cline, GitHub Copilot, Aider, Devin, Windsurf, Continue.dev, OpenCode)
- ✅ MCP: Protocollo completo analizzato (spec 2025-11-25, 10 SDK, 93+ server, 80+ client, Linux Foundation)
- ✅ ACP/A2A: ACP deprecato e mergiato in A2A (v1.0 Mar 2026, 23k stars, TSC con 8 aziende)

**Medium Priority (4/4):**
- ✅ Multi-agent patterns: 8+ pattern documentati (chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer, handoffs/swarm, graphflow, MoA)
- ✅ Observability: 6 tool analizzati (Langfuse, LangSmith, Arize Phoenix, W&B Weave, Helicone, OpenLLMetry)
- ✅ Sandboxes: 6 piattaforme (Daytona, E2B, Modal, Fly.io, StackBlitz, CodeSandbox)
- ✅ Memory systems: 4 sistemi principali (Mem0, Letta/MemGPT, Graphiti, Zep) + analysis comparativa LOCOMO

**Exploration (3/3):**
- ✅ Guide: 8 guide raccolte (Anthropic, OpenAI, Devin, freeCodeCamp, Addy Osmani, Langflow)
- ✅ Best practices: Framework 10-fattori per tool selection
- ✅ Trends: 10+ trend identificati (async agents, CLI as IDE, MCP+A2A stack, HITL, ACI, security, governance)

### Output Prodotti
- `resources/findings.md`: 250+ righe di findings strutturati (30+ entries)
- `resources/guides.md`: 10 guide educational con metadati
- `concepts.md` (workspace 1): 13 nuovi concetti aggiunti, 3 aggiornati

### Nuovi Concetti Aggiunti a concepts.md
- **Memory & State**: Temporal Memory, Tiered Memory, Procedural Memory
- **Integration**: A2A (Agent-to-Agent Protocol)
- **Orchestration**: Prompt Chaining, Routing, Parallelization, Orchestrator-Workers, Evaluator-Optimizer, Handoffs/Swarm, GraphFlow/State Machine
- **Pattern**: Human-in-the-Loop (HITL), Async Background Agent, ACI (Agent-Computer Interface)
- **Monitoring**: Observability Platform
- **Governance**: Agent Governance

### Concetti Aggiornati
- MCP: description aggiornata con dettagli spec, SDK, adozione
- Code Execution Sandbox: description aggiornata con approcci (Firecracker, Docker, WASM)
- Logging & Tracing: alternatives aggiornate (OpenLLMetry aggiunto)
- Safety & Guardrails: alternatives aggiornate (Geordie AI aggiunto)

### Insight Chiave dell'Ecosistema
1. **Convergenza standard**: MCP (agent-to-tool) + A2A (agent-to-agent) formano lo stack di interoperabilità completo
2. **CLI renaissance**: Il terminale è la nuova interfaccia primaria per coding agent (Gemini CLI 100k stars)
3. **Memory wars**: Mem0 (51.8k stars) vs Letta (21.9k) vs Zep+Graphiti (24.4k) — tre approcci diversi alla memoria
4. **Sandbox consolidation**: Daytona (71.1k stars, open-source) vs E2B (purpose-built) come leader
5. **Pattern canonici**: I 5 workflow patterns di Anthropic (chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer) sono il vocabolario fondamentale

## Prossima Iterazione (2)
Vedi `resources/research-requests.md` per 12 nuove richieste di ricerca.
Focus su: Google ADK, Mastra, Pydantic AI, Strands Agents, Claude Agent SDK, Agentic RAG.
