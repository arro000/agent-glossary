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

### Token Budget
- **popularity**: 7
- **description**: Allocazione dinamica di token per system/user/tool output
- **alternatives**: Fixed budget, Priority-based, Adaptive
- **category**: Optimization

## Tools & Actions
### Code Execution Sandbox
- **popularity**: 9
- **description**: Esecuzione codice in ambiente isolato (Python, Node, etc.)
- **alternatives**: E2B, Modal, Docker sandbox, Jupyter kernel
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
- **description**: Protocollo standard per collegare tool esterni all'agente
- **alternatives**: Function calling nativo, REST APIs, gRPC
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
- **alternatives**: LangSmith, LangFuse, Weave, Phoenix, Custom logging
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
- **alternatives**: Input/output filtering, Permission systems, Approval flows
- **category**: Safety

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
