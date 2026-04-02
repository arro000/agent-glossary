# Workspace 3 — Research & Content Discovery

## Stato
- **Iterazione**: 3
- **Ultimo aggiornamento**: 2026-04-02 15:30:03
- **Stato**: failed

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

## Risultati Iterazione 2

### Ricerca Completata
Tutti i 12 topic di ricerca sono stati coperti:

**High Priority (4/4):**
- ✅ Google ADK: 18.7k stars, reference A2A implementation, 4 SDKs (Python/TS/Go/Java), ADK 2.0 alpha con graph workflows
- ✅ Mastra: 22.6k stars, TS-first (team Gatsby), YC W25, native Next.js/React, built-in MCP/eval/memory/observability
- ✅ Pydantic AI: 16k stars, type-safe Python, 15+ provider, FastA2A, strong partnership con Google
- ✅ Strands Agents SDK: 5.5k stars, Apache 2.0, steering hooks, Bedrock-native, multi-agent (Graph/Swarm/Workflow)

**Medium Priority (4/4):**
- ✅ Claude Agent SDK: Claude Code engine as library, subagents, MCP, hooks, multi-cloud (Bedrock/Vertex/Azure)
- ✅ Deep Research Agents: Pattern + 5 implementations (OpenAI, Gemini, GPT Researcher 26k, STORM Stanford, Tongyi 30B)
- ✅ Business Automation: 6 piattaforme (n8n 182k, Langflow 147k, Dify 136k, Flowise 51k, Zapier, Make)
- ✅ MCP Apps: SEP-1865 Final, spec 2026-01-26, adopted by Claude/ChatGPT/VS Code Copilot/Postman/Goose

**Exploration (4/4):**
- ✅ Agentic RAG: 5 sub-patterns (Self-RAG, CRAG, Adaptive RAG, RAT, General Agentic) con papers
- ✅ MCP Server Showcase: 6,300+ server totali, top 8 documentati (Context7 51.4k, Chrome DevTools 32.9k, Playwright 30.1k, GitHub 28.5k, FastMCP 24.2k, Stagehand 21.8k, Figma 14.1k, AWS 8.7k)
- ✅ LOCOMO Benchmark: ACL 2024, 343+ citazioni, scores chiave (Mem0 66.9%, Full-context 72.9%, OpenAI 52.9%)
- ✅ Vertical Agents: CopilotKit 29.9k (frontend), Agent-Reach 14.5k (OSINT), SGLang 25.3k (serving), AgentOps 5.4k (obs), OpenSandbox 9.7k (K8s sandbox)

### Output Prodotti
- `resources/findings.md`: 800+ righe di findings strutturati (50+ entries totali)
- `resources/guides.md`: 23 guide educational con metadati
- `concepts.md` (workspace 1): 14 nuovi concetti aggiunti, 1 aggiornato

### Nuovi Concetti Aggiunti a concepts.md (Iterazione 2)
- **Knowledge & Retrieval** (nuova sezione): Agentic RAG, Deep Research Agent
- **Frameworks & SDKs** (nuova sezione): Google ADK, OpenAI Agents SDK, Mastra, Pydantic AI, Strands Agents SDK, Claude Agent SDK
- **Business Automation** (nuova sezione): Visual Agent Builder, Low-Code Agent Platform
- **Protocol Extensions** (nuova sezione): MCP Apps
- **Monitoring**: Observability Platform (aggiornato con AgentOps)

### Concetti Aggiornati
- Observability Platform: description aggiornata con AgentOps

### Insight Chiave dell'Ecosistema (Iterazione 2)

1. **Big Tech SDK convergence**: Tutti e 5 i big tech hanno ora il proprio framework: Google ADK, OpenAI Agents SDK, Strands (Amazon), Claude Agent SDK (Anthropic), Semantic Kernel (Microsoft). Differenziazione: ADK = A2A reference, Strands = steering hooks + Bedrock, Claude SDK = Claude Code engine, Pydantic AI = type safety, Mastra = TS-first
2. **TypeScript agent ecosystem matures**: Mastra (22.6k) + Pydantic AI (16k) + Claude Agent SDK mostrano che l'ecosistema TS sta crescendo rapidamente per competere con LangGraph-dominated Python
3. **Business automation → AI agents**: n8n (182k) e Dify (136k) dimostrano che la convergenza automazione-agenti è il trend B2B più forte. 6,300+ server MCP accelerano l'integrazione.
4. **MCP evolution**: MCP non è più solo tools — MCP Apps (SEP-1865 Final) porta UI interattive inline. Il protocollo sta diventando una piattaforma applicativa completa.
5. **Agentic RAG as frontier**: RAG è il pattern enterprise più diffuso; varianti agentiche (CRAG, Self-RAG, RAT) rappresentano il prossimo passo per ogni azienda con LLM in produzione.
6. **Deep Research pattern**: Tutti i big provider hanno shipping deep research. GPT Researcher (26k) è la reference open-source. Il pattern plan-search-synthesize-critique è il blueprint per agenti a lungo orizzonte.
7. **Security agents gap**: Non esistono agenti sicurezza open-source maturi comparabili a data analysis o DevOps. Area di opportunità.

## Prossima Iterazione (3)
Vedi `resources/research-requests.md` per 12 nuove richieste.
Focus su: AG-UI Protocol, Semantic Kernel, CrewAI Flows, Vercel AI SDK, Voice Agents, Edge Agents.

### Gap Rilevati da Coprire
- **AG-UI Protocol** (CopilotKit) — potenziale terzo protocollo standard dopo MCP e A2A
- **Semantic Kernel** — manca dal framework comparison (Microsoft)
- **Voice Agents** — categoria completamente non coperta
- **Edge/Embedded Agents** — trend crescente (Ollama 100k+ stars)
- **Agent Evaluation** — oltre LOCOMO servono SWE-bench, Aider polyglot, etc.
