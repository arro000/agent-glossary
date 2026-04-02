# Agent Glossary — Concepts Database

## Memory & State
### Persistent Memory
- **popularity**: 9
- **description**: Memoria che sopravvive tra sessioni diverse dell'agente
- **alternatives**: Vector DB (semantic), File-based (key-value), Context injection
- **category**: Storage

### Session Memory
- **popularity**: 10
- **description**: Memoria del contesto conversazionale corrente
- **alternatives**: Context window, Summary compression, Sliding window
- **category**: Runtime

### Vector Database
- **popularity**: 8
- **description**: DB per ricerca semantica su embeddings (RAG)
- **alternatives**: ChromaDB, Pinecone, Weaviate, Qdrant, Milvus, FAISS
- **category**: Storage

### Context Window Management
- **popularity**: 10
- **description**: Gestione del limite di token del modello
- **alternatives**: Truncation, Summarization, Chunking, Hierarchical context
- **category**: Runtime

### Temporal Memory
- **popularity**: 7
- **description**: Memoria che traccia come i fatti cambiano nel tempo con finestre di validità e invalidazione automatica
- **alternatives**: Graphiti, Zep, knowledge graphs con validità temporale
- **category**: Storage

### Tiered Memory
- **popularity**: 7
- **description**: Architettura a livelli: core memory (sempre in contesto), recall memory (ricercabile), archive (long-term storage). L'agente gestisce autonomamente quale livello usare.
- **alternatives**: Letta (MemGPT), custom tiered systems
- **category**: Architecture

### Procedural Memory
- **popularity**: 6
- **description**: Memoria che memorizza workflow e conoscenze procedurali (come fare le cose) separate dai fatti semantici
- **alternatives**: Mem0 procedural memory, Letta skills, workflow templates
- **category**: Storage

### Token Budget
- **popularity**: 7
- **description**: Allocazione dinamica di token per system/user/tool output
- **alternatives**: Fixed budget, Priority-based, Adaptive
- **category**: Optimization

## Tools & Actions
### Code Execution Sandbox
- **popularity**: 9
- **description**: Esecuzione codice in ambiente isolato (Python, Node, etc.). Approcci: Firecracker microVM (E2B), Docker/containers (Daytona), WebAssembly (StackBlitz)
- **alternatives**: E2B, Daytona, Modal, Docker sandbox, Jupyter kernel, StackBlitz, Fly.io Machines
- **category**: Execution

### Terminal/Shell Access
- **popularity**: 10
- **description**: Accesso alla shell del sistema per comandi arbitrary
- **alternatives**: Direct shell, PTY mode, SSH, Docker exec
- **category**: System

### File I/O
- **popularity**: 10
- **description**: Lettura, scrittura, ricerca nei file del progetto
- **alternatives**: read/write/search/patch tools
- **category**: System

### Web Search
- **popularity**: 9
- **description**: Ricerca su internet per informazioni aggiornate
- **alternatives**: Tavily, SerpAPI, Brave Search, Bing API, Firecrawl
- **category**: Information

### Browser Automation
- **popularity**: 8
- **description**: Controllo di un browser per interagire con siti web
- **alternatives**: Playwright, Puppeteer, Browserbase, Selenium
- **category**: Interaction

### MCP (Model Context Protocol)
- **popularity**: 9
- **description**: Protocollo standard per collegare tool esterni all'agente. JSON-RPC 2.0, gestito dalla Linux Foundation. Supportato da Anthropic, OpenAI, Google, Microsoft, Amazon. 10 SDK ufficiali, 93+ server registrati.
- **alternatives**: REST APIs, gRPC, OpenAI function calling, A2A
- **category**: Integration

### A2A (Agent-to-Agent Protocol)
- **popularity**: 9
- **description**: Protocollo standard (Linux Foundation, Apache 2.0) per comunicazione tra agenti AI indipendenti. v1.0 Mar 2026. Agent Cards per discovery, Tasks con messaggi multi-turn. Complementare a MCP (A2A per agent-to-agent, MCP per agent-to-tool).
- **alternatives**: MCP (complementare), custom gRPC/REST, LangGraph inter-agent channels
- **category**: Integration

### API Client
- **popularity**: 8
- **description**: Chiamate HTTP a API esterne per integrare servizi
- **alternatives**: fetch, axios, openapi clients, SDK wrappers
- **category**: Integration

## Prompt Engineering
### System Prompt
- **popularity**: 10
- **description**: Istruzioni di base che definiscono personalità e comportamento
- **alternatives**: Static system prompt, Dynamic assembly, Prompt templates
- **category**: Core

### Few-Shot Examples
- **popularity**: 8
- **description**: Esempi di input/output per guidare il modello
- **alternatives**: In-context learning, Dynamic few-shot, Retrieved examples
- **category**: Technique

### Chain-of-Thought
- **popularity**: 9
- **description**: Guidare il modello a ragionare passo per passo
- **alternatives**: CoT prompting, Tree-of-Thought, Step-by-step, ReAct
- **category**: Technique

### Structured Output
- **popularity**: 9
- **description**: Forzare il modello a produrre output in formato specifico (JSON, etc.)
- **alternatives**: JSON mode, Function calling, Outlines, Guidance
- **category**: Technique

### Prompt Caching
- **popularity**: 7
- **description**: Cachare parti statiche del prompt per ridurre costi/latenza
- **alternatives**: Anthropic prompt caching, Semantic caching, KV cache
- **category**: Optimization

### Context Compression
- **popularity**: 7
- **description**: Comprimere il contesto per rientrare nella finestra
- **alternatives**: Summarization, Token merging, Key info extraction
- **category**: Optimization

## Orchestration
### Agent Loop
- **popularity**: 10
- **description**: Ciclo pensa→azione→osserva alla base di ogni agente
- **alternatives**: ReAct, Plan-and-Execute, Function calling loop
- **category**: Core

### Prompt Chaining
- **popularity**: 10
- **description**: Decomposizione sequenziale dove ogni chiamata LLM processa l'output della precedente, con gates programmatici opzionali tra step
- **alternatives**: Sequential Workflow (AutoGen), Sequential Process (CrewAI), LangGraph chain
- **category**: Workflow

### Routing
- **popularity**: 9
- **description**: Classifica l'input e lo dirige a un processo downstream specializzato. Permette separazione delle preoccupazioni e prompt specializzati per categoria.
- **alternatives**: Selector Group Chat (AutoGen), conditional branching (LangGraph), tool routing
- **category**: Workflow

### Parallelization
- **popularity**: 8
- **description**: Due varianti: Sectioning (scomporre task in sotto-task paralleli indipendenti) e Voting (eseguire stesso task più volte per output diversi)
- **alternatives**: Fan-out/fan-in (LangGraph), Concurrent Agents (AutoGen)
- **category**: Workflow

### Orchestrator-Workers
- **popularity**: 9
- **description**: Un LLM centrale decoompongono dinamicamente task e delega a worker LLM, poi sintetizza risultati. Sotto-task determinati dinamicamente dall'orchestratore.
- **alternatives**: Hierarchical Process (CrewAI), Magentic-One (AutoGen), LangGraph subgraphs
- **category**: Workflow

### Evaluator-Optimizer
- **popularity**: 8
- **description**: Un LLM genera output mentre un altro valuta e fornisce feedback in un loop iterativo. Più efficace quando esistono criteri di valutazione chiari.
- **alternatives**: Multi-Agent Debate (AutoGen), Reflection pattern, code review agents
- **category**: Workflow

### Handoffs / Swarm Pattern
- **popularity**: 9
- **description**: Agenti trasferiscono controllo ad altri agenti tramite function returns. Coordinazione leggera dove ogni agente ha le proprie istruzioni e tools.
- **alternatives**: AutoGen Swarm, LangGraph edge transitions, A2A task delegation
- **category**: Coordination

### GraphFlow / State Machine
- **popularity**: 9
- **description**: Agenti e tools sono nodi in un grafo diretto. Stato mantenuto tra transizioni, archi condizionali abilitano routing dinamico. Supporta cicli, rami, subgraph e interrupt HITL.
- **alternatives**: Temporal workflows, Prefect DAGs, Step Functions
- **category**: Orchestration

### Multi-Agent
- **popularity**: 8
- **description**: Più agenti che collaborano o competono su un task
- **alternatives**: CrewAI, AutoGen, LangGraph, Swarm
- **category**: Pattern

### Task Planning
- **popularity**: 8
- **description**: Decomporre un obiettivo in sotto-task eseguibili
- **alternatives**: Plan-and-Execute, Hierarchical planning, Reflexion
- **category**: Strategy

### Tool Routing
- **popularity**: 8
- **description**: Selezionare il tool giusto in base al contesto
- **alternatives**: LLM-based routing, Rule-based, Semantic matching
- **category**: Strategy

### Subagent Delegation
- **popularity**: 7
- **description**: Delegare sotto-task a agenti secondari isolati
- **alternatives**: Claude Code, Codex CLI, OpenCode, Subprocess
- **category**: Pattern

### Human-in-the-Loop (HITL)
- **popularity**: 8
- **description**: Pattern dove l'agente richiede approvazione umana prima di azioni ad alto rischio o quando supera soglie di errore. Standard per agenti in produzione.
- **alternatives**: OpenAI Agents SDK approval flow, HumanLayer, CAMEL Framework, Permit.io
- **category**: Pattern

### Async Background Agent
- **popularity**: 7
- **description**: Agenti che lavorano autonomamente in cloud VM producendo PR/risultati mentre gli sviluppatori fanno altro. Task assegnati e revisionati in modo asincrono.
- **alternatives**: Jules (Google), OpenAI Codex, Devin, GitHub Copilot Agent
- **category**: Pattern

### ACI (Agent-Computer Interface)
- **popularity**: 7
- **description**: Principio di design per cui il design dei tool per agenti merita lo stesso investimento dell'HCI per umani. Include poka-yoke, percorsi assoluti, e testing su come i modelli usano i tool.
- **alternatives**: Function calling best practices, tool design guides
- **category**: Methodology

### Cron/Scheduling
- **popularity**: 6
- **description**: Eseguire task agentici in modo programmato
- **alternatives**: APScheduler, Cron expressions, Event-driven
- **category**: Automation

## Inference & Models
### LLM Providers
- **popularity**: 10
- **description**: Fornitori di modelli LLM (OpenAI, Anthropic, Google, etc.)
- **alternatives**: OpenRouter, Together AI, Fireworks, Groq, DeepInfra
- **category**: Infrastructure

### Model Selection
- **popularity**: 9
- **description**: Scegliere il modello giusto per il task
- **alternatives**: Smart routing, Cost optimization, Quality/performance tradeoff
- **category**: Strategy

### Context Length
- **popularity**: 8
- **description**: Finestra di contesto del modello (4k-1M+ tokens)
- **alternatives**: Extended context, Sliding window, Hierarchical memory
- **category**: Constraint

### Quantization
- **popularity**: 7
- **description**: Ridurre dimensione del modello (GGUF, GPTQ, AWQ)
- **alternatives**: GGUF/llama.cpp, vLLM, bitsandbytes, EXL2
- **category**: Optimization

### Streaming
- **popularity**: 9
- **description**: Output in tempo reale token per token
- **alternatives**: SSE, WebSocket, Server-Sent Events
- **category**: UX

### Embeddings
- **popularity**: 8
- **description**: Rappresentazioni vettoriali del testo per ricerca semantica
- **alternatives**: OpenAI ada-002, Cohere, BGE, Nomic, Jina
- **category**: Representation

### Reasoning Models
- **popularity**: 9
- **description**: Modelli con capacità di ragionamento esteso (o1, o3, DeepSeek-R1)
- **alternatives**: OpenAI o1/o3, DeepSeek-R1, QwQ, Claude thinking
- **category**: Architecture

## Skills & Plugins
### Skill System
- **popularity**: 7
- **description**: Sistema di skills/caratteristiche riutilizzabili per l'agente
- **alternatives**: Plugin architecture, Reusable prompts, Workflow templates
- **category**: Architecture

### Custom Tool Creation
- **popularity**: 8
- **description**: Permettere all'utente o all'agente di creare nuovi tool
- **alternatives**: MCP servers, Function definitions, Script wrappers
- **category**: Extensibility

### Workflow Automation
- **popularity**: 7
- **description**: Catene di azioni predefinite per task ricorrenti
- **alternatives**: n8n, Zapier, Custom pipelines, DAG-based
- **category**: Automation

### PRD Generation
- **popularity**: 6
- **description**: Generare documenti di requisiti da specifiche testuali
- **alternatives**: AI-assisted specs, Template-based, Manual + AI review
- **category**: Planning

## Observability
### Logging & Tracing
- **popularity**: 8
- **description**: Tracciare le azioni dell'agente per debug e audit
- **alternatives**: LangSmith, Langfuse, Weave, Phoenix, OpenLLMetry, Custom logging
- **category**: Monitoring

### Observability Platform
- **popularity**: 9
- **description**: Piattaforma completa per tracing, evaluation, prompt management e deployment di agenti. Il leader open-source è Langfuse (24.2k stars), il più feature-complete è LangSmith.
- **alternatives**: Langfuse, LangSmith, Arize Phoenix, W&B Weave, Helicone
- **category**: Monitoring

### Cost Tracking
- **popularity**: 8
- **description**: Monitorare token usage e costi per sessione/task
- **alternatives**: Usage dashboards, Token counting, Provider billing APIs
- **category**: Monitoring

### Evaluation & Benchmarks
- **popularity**: 7
- **description**: Valutare le performance dell'agente su task specifici
- **alternatives**: LM Eval Harness, Custom evals, A/B testing, Human eval
- **category**: Quality

### Debugging Tools
- **popularity**: 7
- **description**: Tool per ispezionare e debuggare il comportamento dell'agente
- **alternatives**: Replay tools, Inspector UI, Trace viewers
- **category**: Debug

### Safety & Guardrails
- **popularity**: 7
- **description**: Meccanismi per prevenire comportamenti indesiderati
- **alternatives**: Input/output filtering, Permission systems, Approval flows, Geordie AI
- **category**: Safety

### Agent Governance
- **popularity**: 6
- **description**: Framework di governance per il deployment sicuro e controllato di agenti AI in produzione. Copre valutazione, rischio, conformità e audit. 82% degli executive pianifica adozione entro 1-3 anni.
- **alternatives**: WEF framework, Microsoft Power Platform governance, Collibra
- **category**: Governance

## Infrastructure
### Docker & Containers
- **popularity**: 9
- **description**: Ambienti isolati per esecuzione e deployment
- **alternatives**: Docker, Podman, Containerd, Kubernetes
- **category**: Runtime

### GPU Cloud
- **popularity**: 7
- **description**: Piattaforme cloud con GPU per training/inference
- **alternatives**: Modal, RunPod, Lambda Labs, Vast.ai, AWS, GCP
- **category**: Compute

### Serverless
- **popularity**: 6
- **description**: Esecuzione senza gestione di server
- **alternatives**: AWS Lambda, Cloudflare Workers, Vercel Edge, Netlify Functions
- **category**: Runtime

### CI/CD
- **popularity**: 8
- **description**: Pipeline automatiche per test, build e deploy
- **alternatives**: GitHub Actions, GitLab CI, CircleCI, ArgoCD
- **category**: Automation

### Git Integration
- **popularity**: 9
- **description**: L'agente lavora direttamente nel repo git
- **alternatives**: gh CLI, git commands, PR automation, Code review bots
- **category**: Workflow

### Environment Management
- **popularity**: 7
- **description**: Gestione di ambienti dev diversi (local, remote, sandbox)
- **alternatives**: Devcontainers, SSH remotes, Daytona, E2B, Modal
- **category**: Runtime

## Knowledge & Retrieval

### Agentic RAG
- **popularity**: 9
- **description**: Pattern RAG dove l'agente decide attivamente quando, come e se recuperare informazioni. Include varianti: Self-RAG (reflection tokens), Corrective RAG (valutazione con fallback), Adaptive RAG (routing per complessità), Retrieval Augmented Thoughts (recupero per ogni step di ragionamento).
- **alternatives**: Traditional RAG, LangChain agentic RAG, LlamaIndex agent workflows
- **category**: Pattern

### Deep Research Agent
- **popularity**: 9
- **description**: Agente che conduce ricerca multi-step in autonomia: pianifica query, naviga il web, legge centinaia di fonti, sintetizza report con citazioni e self-critica. Opera su tempi lunghi (minuti-ore). Implementazioni: OpenAI Deep Research, Gemini Deep Research, GPT Researcher, STORM, Tongyi DeepResearch.
- **alternatives**: GPT Researcher, STORM, Tongyi DeepResearch, DeepSearcher
- **category**: Pattern

## Frameworks & SDKs

### Google ADK (Agent Development Kit)
- **popularity**: 9
- **description**: Framework open-source Google per agenti AI. Model-agnostic (ottimizzato per Gemini), SDK in Python/TypeScript/Go/Java. Reference implementation per A2A protocol. ADK 2.0 aggiunge workflow a grafi e agenti collaborativi.
- **alternatives**: LangGraph, OpenAI Agents SDK, Mastra, Strands Agents, Pydantic AI, Claude Agent SDK
- **category**: Framework

### OpenAI Agents SDK
- **popularity**: 10
- **description**: Framework lightweight di OpenAI per multi-agent workflows. Supporta handoffs, guardrails, HITL, sessioni, tracing, voice agents. Provider-agnostic (100+ LLM). 20.5k stars.
- **alternatives**: LangGraph, Google ADK, CrewAI, Claude Agent SDK, Strands Agents
- **category**: Framework

### Mastra
- **popularity**: 8
- **description**: Framework TypeScript-first per agenti AI dal team Gatsby. Agenti, workflow a grafi, RAG, memoria, MCP, eval, osservabilità. Integrazione nativa Next.js/React. YC W25. 22.6k stars.
- **alternatives**: LangGraph, Vercel AI SDK, Pydantic AI, Google ADK
- **category**: Framework

### Pydantic AI
- **popularity**: 8
- **description**: Framework Python type-safe dal team Pydantic (Samuel Colvin). Agent generici `Agent[Deps, Output]`, validation automatica, 15+ provider, MCP e A2A nativi, FastA2A. 16k stars.
- **alternatives**: LangGraph, Google ADK, Strands Agents, Claude Agent SDK
- **category**: Framework

### Strands Agents SDK
- **popularity**: 7
- **description**: SDK open-source (Apache 2.0) di Amazon/AWS. Filosofia model-driven: il modello orchestra, lo sviluppatore definisce tools e prompt. Steering hooks per guardrails. Nativo MCP, A2A, Bedrock.
- **alternatives**: OpenAI Agents SDK, Claude Agent SDK, Google ADK
- **category**: Framework

### Claude Agent SDK
- **popularity**: 9
- **description**: SDK Anthropic che espone il motore di Claude Code come libreria. Tools built-in (file I/O, bash, web search), subagenti, MCP, hooks, sessioni, permessi. Multi-cloud (API, Bedrock, Vertex, Azure).
- **alternatives**: OpenAI Agents SDK, Google ADK, Pydantic AI
- **category**: Framework

### Cloudflare Agents SDK
- **popularity**: 6
- **description**: SDK Cloudflare per agenti distribuiti che girano sulla rete globale di Cloudflare. L'ecosistema tende a ruotare attorno a example repos e progetti runnable piu che a una sola app monolitica.
- **alternatives**: Mastra, OpenAI Agents SDK, LangGraph, Cloudflare Workers
- **category**: Framework

## Business Automation

### Visual Agent Builder
- **popularity**: 8
- **description**: Piattaforma no-code/low-code per costruire workflow multi-agente con canvas visuale. Supportano deployment come API, MCP server, o chatbot. Leader: Dify (136k stars), Langflow (147k), Flowise (51k).
- **alternatives**: Dify, Langflow, Flowise, n8n, Coze
- **category**: Platform

### Low-Code Agent Platform
- **popularity**: 8
- **description**: Piattaforma di automazione con funzionalità AI agent integrate. Bridge tra automazione business tradizionale e agenti AI. n8n (182k stars) è il più maturo. Zapier (8000+ app), Make.com (1800+ app) per utenti non-tecnici.
- **alternatives**: n8n, Zapier, Make.com, Activepieces
- **category**: Platform

## Protocol Extensions

### MCP Apps
- **popularity**: 7
- **description**: Estensione ufficiale MCP (SEP-1865, Final) che permette ai server MCP di fornire UI HTML interattive renderizzate inline nelle conversazioni AI tramite iframe sandboxed con schema URI `ui://`. Comunicazione bidirezionale JSON-RPC.
- **alternatives**: N/A (estensione unica)
- **category**: Integration

### Agent Registry / Discovery
- **popularity**: 6
- **description**: Livello di scoperta per agenti, skill e capability tramite registry, directory e capability cards. Serve a collegare ecosistemi multi-vendor con metadata condivisi; esempi: A2A Agent Cards, NANDA, Virtuals, ERC-8004 e curated lists come Awesome MCP Servers, Awesome Agents, Awesome Deep Research, Awesome Voice Agents.
- **alternatives**: A2A Agent Cards, MCP registries, Glama directories, custom catalogs, awesome-agent lists, llms.txt indexes
- **category**: Integration

## Observability (updated)

### Observability Platform
- **popularity**: 9
- **description**: Piattaforma completa per tracing, evaluation, prompt management e deployment di agenti. Leader open-source: Langfuse (24.2k stars). Più feature-complete: LangSmith. Nuovi entranti: AgentOps (session replay, multi-agent viz).
- **alternatives**: Langfuse, LangSmith, Arize Phoenix, W&B Weave, Helicone, AgentOps
- **category**: Monitoring

## Iteration 3 Additions

### AG-UI Protocol
- **popularity**: 7
- **description**: Protocollo per la comunicazione bidirezionale tra agenti e applicazioni user-facing. Copre shared state, generative UI, subgraphs e human-in-the-loop.
- **alternatives**: MCP Apps, A2UI, Vercel AI SDK Generative UI, custom websocket/event channels
- **category**: Integration

### Semantic Kernel
- **popularity**: 9
- **description**: SDK Microsoft per costruire agenti e orchestration multi-linguaggio. Il Agent Framework aggiunge pattern agentici e collaborazione tra agenti.
- **alternatives**: LangGraph, OpenAI Agents SDK, CrewAI, Google ADK
- **category**: Framework

### CrewAI Flows
- **popularity**: 8
- **description**: Layer event-driven di CrewAI per workflow stateful, branching, persistence e human feedback. Completa le Crews con orchestrazione deterministica.
- **alternatives**: LangGraph, Vercel AI SDK workflows, AutoGen Core
- **category**: Workflow

### Vercel AI SDK
- **popularity**: 9
- **description**: Toolkit TypeScript-first per buildare app e agenti su React, Next.js, Vue, Svelte e Node.js. Il loop agentico passa da ToolLoopAgent e workflow espliciti.
- **alternatives**: Mastra, LangGraph JS, OpenAI Agents SDK, Semantic Kernel
- **category**: Framework

### LiveKit Agents
- **popularity**: 9
- **description**: Framework open-source per voice, video e multimodal agents realtime. Offre runtime Python/Node, session management, turn detection e telephony hooks.
- **alternatives**: Vapi, Retell, Daily, OpenAI Realtime
- **category**: Realtime

### Vapi
- **popularity**: 8
- **description**: Platform per voice AI con primitives Assistants e Squads, integrazione telefonica, web, eval e workflow. Forte nel support e nei calling flows verticali.
- **alternatives**: LiveKit Agents, Retell, Daily, OpenAI Realtime
- **category**: Realtime / Platform

### Daily
- **popularity**: 6
- **description**: Stack Daily per voice/video AI con client SDK, Prebuilt UI, REST API e supporto SIP/telephony. Utile quando l'agente vive dentro una call media-rich invece che in un solo canale audio.
- **alternatives**: LiveKit Agents, Vapi, Retell
- **category**: Realtime

### Retell
- **popularity**: 7
- **description**: Piattaforma per AI phone agents con build/test/deploy/monitor in un unico flusso. Include playground e simulation testing per validare conversazioni a scala.
- **alternatives**: Vapi, LiveKit Agents, Daily
- **category**: Realtime / Platform

### OpenTelemetry for Agents
- **popularity**: 8
- **description**: Pattern di observability per agenti che mappa trace, span ed eventi su OpenTelemetry. Le semantic conventions GenAI sono il lessico standard; OpenLLMetry e OpenLIT sono i bridge più concreti verso i backend standard.
- **alternatives**: Langfuse, LangSmith, Arize Phoenix, W&B Weave, Helicone
- **category**: Monitoring

### OpenTelemetry GenAI Semantic Conventions
- **popularity**: 8
- **description**: Standard semantico OpenTelemetry per sistemi generativi: model spans, agent spans, events e metrics. Serve a rendere portabili le tracce tra framework e backend diversi.
- **alternatives**: OpenLLMetry, OpenLIT, vendor-specific tracing schemas
- **category**: Monitoring

### Anthropic Computer Use
- **popularity**: 8
- **description**: Beta tool per desktop automation tramite screenshot, mouse e keyboard control. Richiede sandboxing e attenzione a prompt injection e azioni ad alto rischio.
- **alternatives**: Playwright agents, Browser Use, operator-style flows
- **category**: Interaction

### Edge Runtime Stack
- **popularity**: 8
- **description**: Stack di inference locale per agenti basato su Ollama, llama.cpp e MLX-LM. Utile quando servono CPU-only, on-device o Apple Silicon.
- **alternatives**: LM Studio, LocalAI, vLLM
- **category**: Runtime

### Data-Centric Agent Evaluation
- **popularity**: 8
- **description**: Benchmark-first evaluation per agenti basata su task reali e non su sole metriche astratte. Include SWE-bench, Terminal-Bench 2.0, WebArena, TAU-bench, BrowseComp e SWE-Lancer.
- **alternatives**: LOCOMO, custom evals, human eval
- **category**: Quality
