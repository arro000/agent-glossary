# Workspace 3 — Research & Content Discovery

## Stato
- **Iterazione**: 4
- **Ultimo aggiornamento**: 2026-04-02 18:30:00
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

## Risultati Iterazione 3

### Ricerca Completata
I topic nuovi della iterazione 3 sono stati coperti con focus su progetti concreti, SDK e benchmark:

**High Priority:**
- ✅ AG-UI Protocol: protocollo frontend agent-user, con CopilotKit come riferimento
- ✅ Semantic Kernel: framework Microsoft con agent framework multi-language
- ✅ CrewAI Flows: distinzione pratica tra Crews e Flows, con orchestration event-driven
- ✅ Vercel AI SDK: ToolLoopAgent e workflow patterns per TS-native agents

**Medium Priority:**
- ✅ MCP Inspector: tool ufficiale per debug MCP
- ✅ Voice agents: LiveKit Agents + Vapi come stack principali
- ✅ Embedded/Edge: Ollama, llama.cpp, MLX-LM

**Exploration:**
- ✅ Simulation: Sotopia e Generative Agents
- ✅ Evaluation: SWE-bench, Terminal-Bench, WebArena, TAU-bench, AgentBench
- ✅ Computer use / observability: Anthropic Computer Use, OpenLLMetry
- ✅ Verticals: FinRobot e FinGPT per finance

### Output Prodotti
- `resources/findings.md`: ampliato con nuovi tool/framework/benchmark concreti
- `resources/guides.md`: ampliato con guide ufficiali e quickstart rilevanti
- `research-requests.md`: aggiunta Iterazione 5 con nuove aree da approfondire

### Nuovi Concetti da Valutare
- AG-UI Protocol
- Semantic Kernel
- CrewAI Flows
- Vercel AI SDK
- OpenTelemetry for Agents
- LiveKit Agents / Vapi
- Edge runtimes: Ollama, llama.cpp, MLX-LM
- Data-centric evaluation: SWE-bench family, Terminal-Bench, WebArena, TAU-bench

### Insight Chiave
1. **UI layer is becoming a protocol**: AG-UI fills the user-facing gap between model/tool protocols and actual apps.
2. **TS agent stack is maturing**: Vercel AI SDK, AG-UI, and CopilotKit make the JS/TS path much more coherent.
3. **Voice agents are now a real platform category**: LiveKit and Vapi both go beyond demos into deployment/testing/telephony.
4. **Evaluation is fragmenting into task-specific families**: coding, terminal, web, tool-use, and social simulation now have distinct benchmarks.
5. **Local inference is a first-class path**: Ollama, llama.cpp, and MLX-LM are core infrastructure for edge/restricted environments.

## Awesome Agents Scan

### Repos Curati Trovati
- Shubhamsaboo/awesome-llm-apps — AI Agents, Starter AI Agents, Advanced AI Agents, Voice AI Agents, Multi-agent Teams
- hesreallyhim/awesome-claude-code — Agent Skills, Workflows & Knowledge Guides, Tooling, IDE Integrations, Usage Monitors
- VoltAgent/awesome-agent-skills — skills library enorme per diversi coding agent
- github/awesome-copilot — instructions, agents, skills e tools per Copilot
- Arindam200/awesome-ai-apps — Starter Agents, Voice Agents, Featured AI Apps
- enescingoz/awesome-n8n-templates — automation templates e workflow builders
- fr0gger/Awesome-GPT-Agents — cybersecurity GPT agents

### Beads Roadmap
Vedi `resources/beads-roadmap.md` per la suddivisione iterazione-per-iterazione.
Vedi `resources/awesome-agents-scan.md` per la mappa dei repo e delle sottosezioni da convertire in bead.

## Risultati Iterazione 4

### Ricerca Completata
La ricerca ha colmato i gap rimasti con focus su componenti concreti del runtime agentico:

**High Priority:**
- ✅ Generative UI: Vercel AI SDK UI come implementazione concreta del layer UI, affiancata da AG-UI
- ✅ Voice stack: Daily e Retell aggiunti al confronto con LiveKit e Vapi

**Medium Priority:**
- ✅ Telemetry: OpenTelemetry GenAI semantic conventions + OpenLIT come bridge operativo
- ✅ Benchmarks: BrowseComp e SWE-Lancer aggiunti alla famiglia di valutazione

### Output Prodotti
- `resources/findings.md`: nuovi finding per UI, telemetry, voice e benchmark families
- `resources/guides.md`: nuove guide ufficiali per GenAI semconv, OpenLIT, BrowseComp, SWE-Lancer, Terminal-Bench 2.0, Daily e Retell
- `research-requests.md`: aggiunta Iterazione 6 con i prossimi topic da approfondire
- `concepts.md` (workspace 1): aggiornati AG-UI, OpenTelemetry for Agents, Data-Centric Agent Evaluation; aggiunti Daily, Retell e GenAI semconv

### Insight Chiave
1. **Generative UI is a product layer, not a protocol**: AG-UI defines the protocol; Vercel AI SDK shows the React rendering model.
2. **OTel is getting a GenAI vocabulary**: the semantic conventions are now the portable telemetry base for agents.
3. **Voice platforms are splitting by product shape**: LiveKit = open runtime, Vapi = platform, Daily = media stack, Retell = phone-agent ops.
4. **Evaluation is moving toward economic realism**: BrowseComp measures search persistence; SWE-Lancer measures paid engineering work.

### Next Iteration
Vedi `resources/research-requests.md` per le richieste nuove dell'Iterazione 6.
