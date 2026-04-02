'use client';

import { useEffect, useRef } from 'react';
import {
  Application,
  Graphics,
  Text,
  Container,
  TextStyle,
  Rectangle,
  Circle,
} from 'pixi.js';

interface ConceptData {
  name: string;
  popularity: number;
  description: string;
  alternatives: string;
  category: string;
}

interface MacroareaConfig {
  name: string;
  color: string;
  bg: string;
  border: string;
  concepts: ConceptData[];
}

const GRID_SIZE = 40;
const GRID_COLOR = '#e5e5e5';
const BG_COLOR = '#fafafa';
const AREA_WIDTH = 840;
const AREA_HEIGHT = 568;
const COL_GAP = 124;
const ROW_GAP = 92;
const START_X = 64;
const START_Y = 52;
const COL_STEP = AREA_WIDTH + COL_GAP;
const ROW_STEP = AREA_HEIGHT + ROW_GAP;
const BUBBLE_RADIUS = 44;
const PROJECT_WEIGHT_SEGMENTS = 10;
const ZOOM_LERP = 0.12;
const PAN_LERP = 0.15;
const EMOJI_FONT_FAMILY = '"Inter", "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
const MOBILE_BREAKPOINT = 768;

interface SignalInfo {
  key: 'harness' | 'eval' | 'replay' | 'context' | 'refnav' | 'repomap';
  label: string;
  color: string;
  helper: string;
}

const SIGNAL_LEGEND: SignalInfo[] = [
  { key: 'harness', label: 'HARNESS', color: '#0284c7', helper: 'runtime scaffold' },
  { key: 'context', label: 'CONTEXT', color: '#2563eb', helper: 'state window + graph' },
  { key: 'refnav', label: 'REF NAV', color: '#0f766e', helper: 'source traversal' },
  { key: 'repomap', label: 'REPO MAP', color: '#0f766e', helper: 'codebase navigation' },
  { key: 'replay', label: 'REPLAY', color: '#7c3aed', helper: 'durable trace loops' },
  { key: 'eval', label: 'EVAL', color: '#7c3aed', helper: 'regression harness' },
];

function isCompactViewport() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < MOBILE_BREAKPOINT || window.matchMedia('(pointer: coarse)').matches;
}

const MACROAREAS: MacroareaConfig[] = [
  {
    name: 'Memory & State',
    color: '#3B82F6',
    bg: '#DBEAFE',
    border: '#93C5FD',
    concepts: [
      { name: 'Persistent\nMemory', popularity: 9, description: 'Memoria che sopravvive tra sessioni diverse dell\'agente', alternatives: 'Vector DB (semantic), File-based (key-value), Context injection', category: 'Storage' },
      { name: 'Session\nMemory', popularity: 10, description: 'Memoria del contesto conversazionale corrente', alternatives: 'Context window, Summary compression, Sliding window', category: 'Runtime' },
      { name: 'Vector\nDatabase', popularity: 8, description: 'DB per ricerca semantica su embeddings (RAG)', alternatives: 'ChromaDB, Pinecone, Weaviate, Qdrant, Milvus, FAISS', category: 'Storage' },
      { name: 'Context Window\nManagement', popularity: 10, description: 'Gestione del limite di token del modello', alternatives: 'Truncation, Summarization, Chunking, Hierarchical context', category: 'Runtime' },
      { name: 'Temporal\nMemory', popularity: 7, description: 'Memoria che traccia come i fatti cambiano nel tempo con finestre di validit\u00e0', alternatives: 'Graphiti, Zep, knowledge graphs con validit\u00e0 temporale', category: 'Storage' },
      { name: 'Tiered\nMemory', popularity: 7, description: 'Architettura a livelli: core memory, recall memory, archive', alternatives: 'Letta (MemGPT), custom tiered systems', category: 'Architecture' },
      { name: 'Procedural\nMemory', popularity: 6, description: 'Memoria che memorizza workflow e conoscenze procedurali', alternatives: 'Mem0 procedural memory, Letta skills, workflow templates', category: 'Storage' },
      { name: 'Token\nBudget', popularity: 7, description: 'Allocazione dinamica di token per system/user/tool output', alternatives: 'Fixed budget, Priority-based, Adaptive', category: 'Optimization' },
    ],
  },
  {
    name: 'Tools & Actions',
    color: '#10B981',
    bg: '#D1FAE5',
    border: '#6EE7B7',
    concepts: [
      { name: 'Code Execution\nSandbox', popularity: 9, description: 'Esecuzione codice in ambiente isolato (Python, Node, etc.)', alternatives: 'E2B, Daytona, Modal, Docker sandbox, Jupyter kernel, StackBlitz, Fly.io Machines', category: 'Execution' },
      { name: 'Terminal/Shell\nAccess', popularity: 10, description: 'Accesso alla shell del sistema per comandi arbitrari', alternatives: 'Direct shell, PTY mode, SSH, Docker exec', category: 'System' },
      { name: 'File I/O', popularity: 10, description: 'Lettura, scrittura, ricerca nei file del progetto', alternatives: 'read/write/search/patch tools', category: 'System' },
      { name: 'Web Search', popularity: 9, description: 'Ricerca su internet per informazioni aggiornate', alternatives: 'Tavily, SerpAPI, Brave Search, Bing API, Firecrawl', category: 'Information' },
      { name: 'Browser\nAutomation', popularity: 8, description: 'Controllo di un browser per interagire con siti web', alternatives: 'Playwright, Puppeteer, Browserbase, Selenium', category: 'Interaction' },
      { name: 'Anthropic\nComputer Use', popularity: 8, description: 'Desktop automation via screenshot, mouse and keyboard control. Richiede sandboxing e attenzione a prompt injection.', alternatives: 'Playwright agents, Browser Use, operator-style flows', category: 'Interaction' },
      { name: 'MCP', popularity: 9, description: 'Model Context Protocol \u2014 protocollo standard per tool esterni (Linux Foundation)', alternatives: 'REST APIs, gRPC, OpenAI function calling, A2A', category: 'Integration' },
      { name: 'A2A', popularity: 9, description: 'Agent-to-Agent Protocol \u2014 comunicazione tra agenti AI indipendenti (Linux Foundation)', alternatives: 'MCP (complementare), custom gRPC/REST, LangGraph inter-agent channels', category: 'Integration' },
      { name: 'API Client', popularity: 8, description: 'Chiamate HTTP a API esterne per integrare servizi', alternatives: 'fetch, axios, openapi clients, SDK wrappers', category: 'Integration' },
      { name: 'LiveKit\nAgents', popularity: 9, description: 'Framework open-source per voice, video e multimodal agents realtime con runtime Python/Node, session management e telephony hooks.', alternatives: 'Vapi, Retell, Daily, OpenAI Realtime', category: 'Realtime' },
      { name: 'Vapi', popularity: 8, description: 'Platform per voice AI con primitives Assistants e Squads, integrazione telefonica, web, eval e workflow.', alternatives: 'LiveKit Agents, Retell, Daily, OpenAI Realtime', category: 'Realtime / Platform' },
      { name: 'Daily', popularity: 6, description: 'Stack Daily per voice/video AI con client SDK, Prebuilt UI, REST API e supporto SIP/telephony.', alternatives: 'LiveKit Agents, Vapi, Retell', category: 'Realtime' },
      { name: 'Retell', popularity: 7, description: 'Piattaforma per AI phone agents con build/test/deploy/monitor e simulation testing.', alternatives: 'Vapi, LiveKit Agents, Daily', category: 'Realtime / Platform' },
      { name: 'Pipecat', popularity: 8, description: 'Framework open-source per voice e multimodal conversational AI, supportato dalla community Pipecat e dal team Daily.', alternatives: 'LiveKit Agents, Vapi, Daily, Retell', category: 'Realtime' },
    ],
  },
  {
    name: 'Prompt Engineering',
    color: '#8B5CF6',
    bg: '#EDE9FE',
    border: '#C4B5FD',
    concepts: [
      { name: 'System\nPrompt', popularity: 10, description: 'Istruzioni di base che definiscono personalit\u00e0 e comportamento dell\'agente', alternatives: 'Static system prompt, Dynamic assembly, Prompt templates', category: 'Core' },
      { name: 'Prompt\nAssembly', popularity: 8, description: 'Composizione dinamica del messaggio finale al modello a partire da istruzioni, memoria, schema tool e slice di contesto', alternatives: 'instruction builder, prompt templates, context builder, static system prompt', category: 'Runtime' },
      { name: 'Hook\nSystem', popularity: 8, description: 'Strato event-driven che attiva comandi, prompt o agenti in punti specifici del lifecycle dell\'agente', alternatives: 'lifecycle middleware, event listeners, permission guards, prompt-based hooks', category: 'Runtime' },
      { name: 'Few-Shot\nExamples', popularity: 8, description: 'Esempi di input/output per guidare il modello', alternatives: 'In-context learning, Dynamic few-shot, Retrieved examples', category: 'Technique' },
      { name: 'Chain-of-\nThought', popularity: 9, description: 'Guidare il modello a ragionare passo per passo', alternatives: 'CoT prompting, Tree-of-Thought, Step-by-step, ReAct', category: 'Technique' },
      { name: 'Structured\nOutput', popularity: 9, description: 'Forzare il modello a produrre output in formato specifico (JSON, etc.)', alternatives: 'JSON mode, Function calling, Outlines, Guidance', category: 'Technique' },
      { name: 'Prompt\nCaching', popularity: 7, description: 'Cachare parti statiche del prompt per ridurre costi e latenza', alternatives: 'Anthropic prompt caching, Semantic caching, KV cache', category: 'Optimization' },
      { name: 'Context\nCompression', popularity: 7, description: 'Comprimere il contesto per rientrare nella finestra di token', alternatives: 'Summarization, Token merging, Key info extraction', category: 'Optimization' },
      { name: 'Eval\nHarness', popularity: 8, description: 'Runner strutturato per prompt, agenti e RAG con dataset, scoring, regression checks e integrazione CI', alternatives: 'promptfoo, Inspect AI, OpenAI Evals, custom CI evals', category: 'Quality' },
      { name: 'Harness /\nRuntime Scaffold', popularity: 9, description: 'Tutto lo strato attorno all\'LLM che prepara il prompt, gestisce hooks, tools, memory, traces, eval e state', alternatives: 'Claude Code harness, agent runtime, LLM OS, outer loop', category: 'Runtime' },
      { name: 'Durable\nExecution', popularity: 8, description: 'Esecuzione persistente che conserva stato e progressi tra interruzioni, retry e resume', alternatives: 'LangGraph durable execution, Temporal workflows, checkpointed state machines', category: 'Runtime' },
    ],
  },
  {
    name: 'Orchestration',
    color: '#F97316',
    bg: '#FFEDD5',
    border: '#FDBA74',
    concepts: [
      { name: 'Agent\nLoop', popularity: 10, description: 'Ciclo pensa\u2192azione\u2192osserva alla base di ogni agente', alternatives: 'ReAct, Plan-and-Execute, Function calling loop', category: 'Core' },
      { name: 'Prompt\nChaining', popularity: 10, description: 'Decomposizione sequenziale dove ogni chiamata LLM processa l\'output della precedente', alternatives: 'Sequential Workflow (AutoGen), Sequential Process (CrewAI), LangGraph chain', category: 'Workflow' },
      { name: 'Routing', popularity: 9, description: 'Classifica l\'input e lo dirige a un processo downstream specializzato', alternatives: 'Selector Group Chat (AutoGen), conditional branching (LangGraph), tool routing', category: 'Workflow' },
      { name: 'Parallel\nization', popularity: 8, description: 'Sectioning o Voting: scomporre in sotto-task paralleli o eseguire pi\u00f9 volte', alternatives: 'Fan-out/fan-in (LangGraph), Concurrent Agents (AutoGen)', category: 'Workflow' },
      { name: 'Orchestrator\nWorkers', popularity: 9, description: 'LLM centrale decompongono task e delega a worker, poi sintetizza risultati', alternatives: 'Hierarchical Process (CrewAI), Magentic-One (AutoGen), LangGraph subgraphs', category: 'Workflow' },
      { name: 'CrewAI\nFlows', popularity: 8, description: 'Layer event-driven di CrewAI per workflow stateful, branching, persistence e human feedback', alternatives: 'LangGraph, Vercel AI SDK workflows, AutoGen Core', category: 'Workflow' },
      { name: 'Evaluator\nOptimizer', popularity: 8, description: 'Un LLM genera output mentre un altro valuta e fornisce feedback in un loop', alternatives: 'Multi-Agent Debate (AutoGen), Reflection pattern, code review agents', category: 'Workflow' },
      { name: 'Handoffs /\nSwarm', popularity: 9, description: 'Agenti trasferiscono controllo ad altri agenti tramite function returns', alternatives: 'AutoGen Swarm, LangGraph edge transitions, A2A task delegation', category: 'Coordination' },
      { name: 'GraphFlow /\nState Machine', popularity: 9, description: 'Agenti e tools come nodi in un grafo diretto con stato e routing condizionale', alternatives: 'Temporal workflows, Prefect DAGs, Step Functions', category: 'Orchestration' },
      { name: 'Multi-\nAgent', popularity: 8, description: 'Pi\u00f9 agenti che collaborano o competono su un task', alternatives: 'CrewAI, AutoGen, LangGraph, Swarm', category: 'Pattern' },
      { name: 'Task\nPlanning', popularity: 8, description: 'Decomporre un obiettivo in sotto-task eseguibili', alternatives: 'Plan-and-Execute, Hierarchical planning, Reflexion', category: 'Strategy' },
      { name: 'Tool\nRouting', popularity: 8, description: 'Selezionare il tool giusto in base al contesto', alternatives: 'LLM-based routing, Rule-based, Semantic matching', category: 'Strategy' },
      { name: 'Subagent\nDelegation', popularity: 7, description: 'Delegare sotto-task a agenti secondari isolati', alternatives: 'Claude Code, Codex CLI, OpenCode, Subprocess', category: 'Pattern' },
      { name: 'HITL', popularity: 8, description: 'Pattern dove l\'agente richiede approvazione umana prima di azioni ad alto rischio', alternatives: 'OpenAI Agents SDK approval flow, HumanLayer, CAMEL Framework, Permit.io', category: 'Pattern' },
      { name: 'Async\nBackground', popularity: 7, description: 'Agenti che lavorano in cloud VM producendo risultati in modo asincrono', alternatives: 'Jules (Google), OpenAI Codex, Devin, GitHub Copilot Agent', category: 'Pattern' },
      { name: 'ACI', popularity: 7, description: 'Agent-Computer Interface \u2014 design dei tool per agenti come HCI per umani', alternatives: 'Function calling best practices, tool design guides', category: 'Methodology' },
      { name: 'Cron /\nScheduling', popularity: 6, description: 'Eseguire task agentici in modo programmato', alternatives: 'APScheduler, Cron expressions, Event-driven', category: 'Automation' },
    ],
  },
  {
    name: 'Inference & Models',
    color: '#EF4444',
    bg: '#FEE2E2',
    border: '#FCA5A5',
    concepts: [
      { name: 'LLM\nProviders', popularity: 10, description: 'Fornitori di modelli LLM (OpenAI, Anthropic, Google, etc.)', alternatives: 'OpenRouter, Together AI, Fireworks, Groq, DeepInfra', category: 'Infrastructure' },
      { name: 'Model\nSelection', popularity: 9, description: 'Scegliere il modello giusto per il task', alternatives: 'Smart routing, Cost optimization, Quality/performance tradeoff', category: 'Strategy' },
      { name: 'Context\nLength', popularity: 8, description: 'Finestra di contesto del modello (4k-1M+ tokens)', alternatives: 'Extended context, Sliding window, Hierarchical memory', category: 'Constraint' },
      { name: 'Quantization', popularity: 7, description: 'Ridurre dimensione del modello (GGUF, GPTQ, AWQ)', alternatives: 'GGUF/llama.cpp, vLLM, bitsandbytes, EXL2', category: 'Optimization' },
      { name: 'Streaming', popularity: 9, description: 'Output in tempo reale token per token', alternatives: 'SSE, WebSocket, Server-Sent Events', category: 'UX' },
      { name: 'Embeddings', popularity: 8, description: 'Rappresentazioni vettoriali del testo per ricerca semantica', alternatives: 'OpenAI ada-002, Cohere, BGE, Nomic, Jina', category: 'Representation' },
      { name: 'Reasoning\nModels', popularity: 9, description: 'Modelli con capacit\u00e0 di ragionamento esteso (o1, o3, DeepSeek-R1)', alternatives: 'OpenAI o1/o3, DeepSeek-R1, QwQ, Claude thinking', category: 'Architecture' },
    ],
  },
  {
    name: 'Skills & Plugins',
    color: '#14B8A6',
    bg: '#CCFBF1',
    border: '#5EEAD4',
    concepts: [
      { name: 'Skill\nSystem', popularity: 7, description: 'Sistema di skills/caratteristiche riutilizzabili per l\'agente', alternatives: 'Plugin architecture, Reusable prompts, Workflow templates', category: 'Architecture' },
      { name: 'Custom Tool\nCreation', popularity: 8, description: 'Permettere all\'utente o all\'agente di creare nuovi tool', alternatives: 'MCP servers, Function definitions, Script wrappers', category: 'Extensibility' },
      { name: 'Workflow\nAutomation', popularity: 7, description: 'Catene di azioni predefinite per task ricorrenti', alternatives: 'n8n, Zapier, Custom pipelines, DAG-based', category: 'Automation' },
      { name: 'PRD\nGeneration', popularity: 6, description: 'Generare documenti di requisiti da specifiche testuali', alternatives: 'AI-assisted specs, Template-based, Manual + AI review', category: 'Planning' },
    ],
  },
  {
    name: 'Observability',
    color: '#EAB308',
    bg: '#FEF9C3',
    border: '#FACC15',
    concepts: [
      { name: 'Logging &\nTracing', popularity: 8, description: 'Tracciare le azioni dell\'agente per debug e audit', alternatives: 'LangSmith, Langfuse, Weave, Phoenix, OpenLLMetry, Custom logging', category: 'Monitoring' },
      { name: 'Observability\nPlatform', popularity: 9, description: 'Piattaforma completa per tracing, evaluation, prompt management e deployment. Leader: Langfuse. Pi\u00f9 feature-complete: LangSmith. Nuovi: AgentOps.', alternatives: 'Langfuse, LangSmith, Arize Phoenix, W&B Weave, Helicone, AgentOps', category: 'Monitoring' },
      { name: 'Cost\nTracking', popularity: 8, description: 'Monitorare token usage e costi per sessione/task', alternatives: 'Usage dashboards, Token counting, Provider billing APIs', category: 'Monitoring' },
      { name: 'Evaluation &\nBenchmarks', popularity: 7, description: 'Valutare le performance dell\'agente su task specifici', alternatives: 'LM Eval Harness, Custom evals, A/B testing, Human eval', category: 'Quality' },
      { name: 'Data-Centric\nAgent Evaluation', popularity: 8, description: 'Benchmark-first evaluation basata su task reali e non solo metriche astratte. Include SWE-bench, Terminal-Bench 2.0, WebArena, TAU-bench, BrowseComp e SWE-Lancer.', alternatives: 'LOCOMO, custom evals, human eval', category: 'Quality' },
      { name: 'Debugging\nTools', popularity: 7, description: 'Tool per ispezionare e debuggare il comportamento dell\'agente', alternatives: 'Replay tools, Inspector UI, Trace viewers', category: 'Debug' },
      { name: 'Trace\nReplay', popularity: 8, description: 'Replay di sessioni e tool call per ricostruire failure long-horizon e confrontare run diverse', alternatives: 'AgentOps replay, LangSmith replay, Langfuse session replay, custom transcript viewers', category: 'Debug' },
      { name: 'Session\nReplay', popularity: 8, description: 'Replay visivo di una sessione o run con trace, tool call e state transitions per root-cause analysis e debugging long-horizon', alternatives: 'trace playback, transcript viewer, LangSmith replay, Langfuse sessions, AgentOps replay', category: 'Debug' },
      { name: 'Trace\nGrading', popularity: 8, description: 'Valutazione strutturata di trace end-to-end con score o label per trasformare i failure di workflow in regressioni ripetibili', alternatives: 'trace evals, LangSmith evals, Langfuse experiments, promptfoo, Inspect AI', category: 'Quality' },
      { name: 'Safety &\nGuardrails', popularity: 7, description: 'Meccanismi per prevenire comportamenti indesiderati', alternatives: 'Input/output filtering, Permission systems, Approval flows, Geordie AI', category: 'Safety' },
      { name: 'Agent\nGovernance', popularity: 6, description: 'Framework di governance per deployment sicuro di agenti AI in produzione', alternatives: 'WEF framework, Microsoft Power Platform governance, Collibra', category: 'Governance' },
      { name: 'OpenTelemetry\nfor Agents', popularity: 8, description: 'Pattern di observability per agenti che mappa trace, span ed eventi su OpenTelemetry. Le semantic conventions GenAI sono il lessico standard.', alternatives: 'Langfuse, LangSmith, Arize Phoenix, W&B Weave, Helicone', category: 'Monitoring' },
      { name: 'OpenTelemetry\nGenAI Semantic Conventions', popularity: 8, description: 'Standard semantico OpenTelemetry per sistemi generativi: model spans, agent spans, events e metrics.', alternatives: 'OpenLLMetry, OpenLIT, vendor-specific tracing schemas', category: 'Monitoring' },
    ],
  },
  {
    name: 'Infrastructure',
    color: '#6366F1',
    bg: '#E0E7FF',
    border: '#A5B4FC',
    concepts: [
      { name: 'Docker &\nContainers', popularity: 9, description: 'Ambienti isolati per esecuzione e deployment', alternatives: 'Docker, Podman, Containerd, Kubernetes', category: 'Runtime' },
      { name: 'GPU Cloud', popularity: 7, description: 'Piattaforme cloud con GPU per training e inference', alternatives: 'Modal, RunPod, Lambda Labs, Vast.ai, AWS, GCP', category: 'Compute' },
      { name: 'Serverless', popularity: 6, description: 'Esecuzione senza gestione di server', alternatives: 'AWS Lambda, Cloudflare Workers, Vercel Edge, Netlify Functions', category: 'Runtime' },
      { name: 'Edge Runtime\nStack', popularity: 8, description: 'Stack di inference locale per agenti basato su Ollama, llama.cpp, MLX-LM e LM Studio.', alternatives: 'LM Studio, LocalAI, vLLM', category: 'Runtime' },
      { name: 'CI/CD', popularity: 8, description: 'Pipeline automatiche per test, build e deploy', alternatives: 'GitHub Actions, GitLab CI, CircleCI, ArgoCD', category: 'Automation' },
      { name: 'Git\nIntegration', popularity: 9, description: 'L\'agente lavora direttamente nel repo git', alternatives: 'gh CLI, git commands, PR automation, Code review bots', category: 'Workflow' },
      { name: 'Environment\nManagement', popularity: 7, description: 'Gestione di ambienti dev diversi (local, remote, sandbox)', alternatives: 'Devcontainers, SSH remotes, Daytona, E2B, Modal', category: 'Runtime' },
    ],
  },
  {
    name: 'Knowledge & Retrieval',
    color: '#06B6D4',
    bg: '#CFFAFE',
    border: '#67E8F9',
    concepts: [
      { name: 'Agentic\nRAG', popularity: 9, description: 'Pattern RAG dove l\'agente decide attivamente quando, come e se recuperare informazioni. Include Self-RAG, Corrective RAG, Adaptive RAG.', alternatives: 'Traditional RAG, LangChain agentic RAG, LlamaIndex agent workflows', category: 'Pattern' },
      { name: 'Deep Research\nAgent', popularity: 9, description: 'Agente che conduce ricerca multi-step: pianifica query, naviga il web, sintetizza report con citazioni e self-critica', alternatives: 'GPT Researcher, STORM, Tongyi DeepResearch, DeepSearcher', category: 'Pattern' },
      { name: 'Context\nGraph', popularity: 8, description: 'Grafo temporale di entità, relazioni, episodi e provenance che permette di recuperare contesto evolutivo invece di comprimere soltanto la chat history', alternatives: 'Graphiti, Zep, GraphRAG, temporal knowledge graph', category: 'Navigation' },
      { name: 'Reference\nNavigation', popularity: 8, description: 'Esplorazione dei riferimenti già visti: recupero semantico, pinning, citazioni, summary incrementali e navigazione tra fonti correlate invece della sola compressione del contesto', alternatives: 'retrieval browser, citation graph, memory browsing, semantic search UI', category: 'Navigation' },
      { name: 'Repo Map /\nCodebase Map', popularity: 8, description: 'Mappa strutturale del codebase per navigazione e editing su repository grandi, spesso derivata da tree-sitter o analisi statica per mostrare file e dipendenze rilevanti', alternatives: 'Aider repomap, semantic code graph, file tree summaries', category: 'Navigation' },
    ],
  },
  {
    name: 'Frameworks & SDKs',
    color: '#EC4899',
    bg: '#FCE7F3',
    border: '#F9A8D4',
    concepts: [
      { name: 'Google\nADK', popularity: 9, description: 'Framework open-source Google per agenti AI. Model-agnostic, SDK in Python/TypeScript/Go/Java. Reference per A2A.', alternatives: 'LangGraph, OpenAI Agents SDK, Mastra, Strands Agents, Pydantic AI, Claude Agent SDK', category: 'Framework' },
      { name: 'OpenAI Agents\nSDK', popularity: 10, description: 'Framework lightweight OpenAI per multi-agent workflows. Handoffs, guardrails, HITL, sessioni, tracing, voice agents.', alternatives: 'LangGraph, Google ADK, CrewAI, Claude Agent SDK, Strands Agents', category: 'Framework' },
      { name: 'Mastra', popularity: 8, description: 'Framework TypeScript-first per agenti AI. Workflow a grafi, RAG, memoria, MCP, eval, osservabilit\u00e0. Integrazione Next.js. YC W25.', alternatives: 'LangGraph, Vercel AI SDK, Pydantic AI, Google ADK', category: 'Framework' },
      { name: 'Pydantic\nAI', popularity: 8, description: 'Framework Python type-safe dal team Pydantic. Agent generici, validation automatica, 15+ provider, MCP e A2A nativi.', alternatives: 'LangGraph, Google ADK, Strands Agents, Claude Agent SDK', category: 'Framework' },
      { name: 'Strands\nAgents SDK', popularity: 7, description: 'SDK open-source Amazon/AWS. Model-driven: il modello orchestra, lo sviluppatore definisce tools e prompt. Nativo MCP, A2A, Bedrock.', alternatives: 'OpenAI Agents SDK, Claude Agent SDK, Google ADK', category: 'Framework' },
      { name: 'Claude Agent\nSDK', popularity: 9, description: 'SDK Anthropic che espone il motore di Claude Code come libreria. Tools built-in, subagenti, MCP, hooks, sessioni, permessi.', alternatives: 'OpenAI Agents SDK, Google ADK, Pydantic AI', category: 'Framework' },
      { name: 'Cloudflare\nAgents SDK', popularity: 6, description: 'SDK Cloudflare per agenti distribuiti sulla rete globale Cloudflare, orientato a progetti runnable e composabili.', alternatives: 'Mastra, OpenAI Agents SDK, LangGraph, Cloudflare Workers', category: 'Framework' },
      { name: 'Semantic\nKernel', popularity: 9, description: 'SDK Microsoft per costruire agenti e orchestration multi-linguaggio. L\'Agent Framework aggiunge pattern agentici e collaborazione tra agenti.', alternatives: 'LangGraph, OpenAI Agents SDK, CrewAI, Google ADK', category: 'Framework' },
      { name: 'Vercel AI\nSDK', popularity: 9, description: 'Toolkit TypeScript-first per buildare app e agenti su React, Next.js, Vue, Svelte e Node.js. Il loop agentico passa da ToolLoopAgent e workflow espliciti.', alternatives: 'Mastra, LangGraph JS, OpenAI Agents SDK, Semantic Kernel', category: 'Framework' },
    ],
  },
  {
    name: 'Business Automation',
    color: '#84CC16',
    bg: '#ECFCCB',
    border: '#BEF264',
    concepts: [
      { name: 'Visual Agent\nBuilder', popularity: 8, description: 'Piattaforma no-code/low-code per workflow multi-agente con canvas visuale. Deployment come API, MCP server o chatbot.', alternatives: 'Dify, Langflow, Flowise, n8n, Coze', category: 'Platform' },
      { name: 'Low-Code Agent\nPlatform', popularity: 8, description: 'Piattaforma automazione con AI agent integrate. Bridge tra automazione business tradizionale e agenti AI.', alternatives: 'n8n, Zapier, Make.com, Activepieces', category: 'Platform' },
    ],
  },
  {
    name: 'Protocol Extensions',
    color: '#64748B',
    bg: '#F1F5F9',
    border: '#CBD5E1',
    concepts: [
      { name: 'MCP\nApps', popularity: 7, description: 'Estensione ufficiale MCP (SEP-1865) che permette ai server di fornire UI HTML interattive renderizzate inline nelle conversazioni AI', alternatives: 'N/A (estensione unica)', category: 'Integration' },
      { name: 'Agent Registry\n/ Discovery', popularity: 6, description: 'Livello di scoperta per agenti, skill e capability tramite registry e capability cards condivise', alternatives: 'A2A Agent Cards, MCP registries, Glama directories, custom catalogs', category: 'Integration' },
      { name: 'AG-UI\nProtocol', popularity: 7, description: 'Protocollo per la comunicazione bidirezionale tra agenti e applicazioni user-facing. Copre shared state, generative UI, subgraphs e human-in-the-loop.', alternatives: 'MCP Apps, A2UI, Vercel AI SDK Generative UI, custom websocket/event channels', category: 'Integration' },
      { name: 'A2UI', popularity: 7, description: 'Specifica declarativa di Generative UI originata da Google. Usa payload streaming JSONL-friendly per descrivere widget e layout renderizzabili dal frontend.', alternatives: 'AG-UI, MCP Apps, Vercel AI SDK Generative User Interfaces, Open-JSON-UI', category: 'Integration' },
    ],
  },
];

function getAreaPosition(index: number) {
  const col = index % 3;
  const row = Math.floor(index / 3);
  return { x: START_X + col * COL_STEP, y: START_Y + row * ROW_STEP };
}

function getBubbleEmoji(areaName: string, category: string, conceptName: string): string {
  const conceptKey = conceptName.replace(/\n/g, ' ').toLowerCase();
  if (conceptKey.includes('harness / runtime scaffold')) return '🧱';
  if (conceptKey.includes('eval harness')) return '🧪';
  if (conceptKey.includes('durable execution')) return '🔁';
  if (conceptKey.includes('session replay')) return '🎬';
  if (conceptKey.includes('trace grading')) return '🏷️';
  if (conceptKey.includes('context window')) return '🪟';
  if (conceptKey.includes('context graph')) return '🕸️';
  if (conceptKey.includes('reference navigation')) return '🔎';
  if (conceptKey.includes('repo map') || conceptKey.includes('codebase map')) return '🗺️';
  if (conceptKey.includes('trace replay')) return '🎞️';

  const key = `${areaName} ${category}`.toLowerCase();
  if (key.includes('memory')) return '🧠';
  if (key.includes('tool') || key.includes('action')) return '🛠️';
  if (key.includes('voice') || key.includes('realtime') || key.includes('livekit') || key.includes('vapi') || key.includes('daily') || key.includes('retell') || key.includes('pipecat')) return '🎙️';
  if (key.includes('prompt')) return '✍️';
  if (key.includes('orchestr') || key.includes('workflow') || key.includes('routing')) return '🧭';
  if (key.includes('model') || key.includes('inference') || key.includes('llm')) return '🤖';
  if (key.includes('skill') || key.includes('plugin')) return '🧩';
  if (key.includes('observ') || key.includes('debug') || key.includes('trace')) return '👀';
  if (key.includes('infrastruct') || key.includes('container') || key.includes('cloud')) return '🏗️';
  if (key.includes('retriev') || key.includes('rag') || key.includes('knowledge')) return '📚';
  if (key.includes('framework')) return '⚙️';
  if (key.includes('automation')) return '🚀';
  if (key.includes('quality') || key.includes('eval')) return '🧪';
  if (key.includes('runtime') || key.includes('edge')) return '⚡';
  if (key.includes('protocol')) return '🔌';
  return '•';
}

function getMacroareaEmoji(areaName: string): string {
  const key = areaName.toLowerCase();
  if (key.includes('memory')) return '🧠';
  if (key.includes('tools') || key.includes('actions')) return '🛠️';
  if (key.includes('realtime') || key.includes('voice')) return '🎙️';
  if (key.includes('prompt')) return '✍️';
  if (key.includes('orchestr')) return '🧭';
  if (key.includes('inference') || key.includes('models')) return '🤖';
  if (key.includes('skills') || key.includes('plugins')) return '🧩';
  if (key.includes('observability')) return '👀';
  if (key.includes('infrastructure')) return '🏗️';
  if (key.includes('knowledge') || key.includes('retrieval')) return '📚';
  if (key.includes('frameworks')) return '⚙️';
  if (key.includes('business')) return '🚀';
  if (key.includes('protocol')) return '🔌';
  return '•';
}

function buildSearchHaystack(concept: ConceptData, areaName: string) {
  return [concept.name, concept.description, concept.alternatives, concept.category, areaName].join(' ').toLowerCase();
}

function getReferenceCount(alternatives: string): number {
  const cleaned = alternatives.trim();
  if (!cleaned || cleaned.toLowerCase() === 'n/a') return 1;
  return cleaned
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .length;
}

function getBubbleColumns(count: number): number {
  if (count <= 3) return count;
  if (count <= 8) return 4;
  if (count <= 12) return 5;
  if (count <= 16) return 6;
  return 7;
}

function getConceptSignal(conceptName: string): SignalInfo | null {
  const key = conceptName.replace(/\n/g, ' ').toLowerCase();
  if (key.includes('harness / runtime scaffold')) return SIGNAL_LEGEND[0];
  if (key.includes('eval harness')) return SIGNAL_LEGEND[5];
  if (key.includes('durable execution')) return SIGNAL_LEGEND[4];
  if (key.includes('session replay')) return SIGNAL_LEGEND[4];
  if (key.includes('trace grading')) return SIGNAL_LEGEND[5];
  if (key.includes('context window')) return SIGNAL_LEGEND[1];
  if (key.includes('context graph')) return SIGNAL_LEGEND[1];
  if (key.includes('reference navigation')) return SIGNAL_LEGEND[2];
  if (key.includes('repo map') || key.includes('codebase map')) return SIGNAL_LEGEND[3];
  return null;
}

function getBubbleReferenceScore(concept: ConceptData): number {
  return getReferenceCount(concept.alternatives);
}

function getBubbleFontSize(name: string, radius: number): number {
  const len = name.replace(/\n/g, ' ').length;
  if (len <= 12) return Math.min(12, Math.max(9.5, radius * 0.235));
  if (len <= 18) return Math.min(10.5, Math.max(8.75, radius * 0.2));
  return Math.min(9.5, Math.max(8.25, radius * 0.18));
}

function getBubbleLabel(name: string): string {
  return name.replace(/\n/g, ' ');
}

function getProjectWeightStyle(referenceCount: number) {
  const capped = Math.max(1, Math.min(10, referenceCount));
  const filledSegments = Math.max(1, Math.round((capped / 10) * PROJECT_WEIGHT_SEGMENTS));
  return {
    filledSegments,
    totalSegments: PROJECT_WEIGHT_SEGMENTS,
    emphasis: 0.28 + (capped / 10) * 0.44,
  };
}

function getBubbleTypography(name: string, radius: number): BubbleTypography {
  const len = getBubbleLabel(name).length;

  if (len <= 12) {
    return {
      emojiSize: 28,
      emojiY: -radius * 0.38,
      titleFontSize: getBubbleFontSize(name, radius),
      titleY: radius * 0.13,
      titleWrapWidth: radius * 1.42,
      badgeY: radius * 0.57,
    };
  }

  if (len <= 20) {
    return {
      emojiSize: 26,
      emojiY: -radius * 0.37,
      titleFontSize: getBubbleFontSize(name, radius),
      titleY: radius * 0.1,
      titleWrapWidth: radius * 1.36,
      badgeY: radius * 0.57,
    };
  }

  return {
    emojiSize: 24,
    emojiY: -radius * 0.35,
    titleFontSize: getBubbleFontSize(name, radius),
    titleY: radius * 0.08,
    titleWrapWidth: radius * 1.28,
    badgeY: radius * 0.58,
  };
}

function drawProjectWeightRing(
  graphics: Graphics,
  radius: number,
  color: string,
  referenceCount: number,
) {
  const { filledSegments, totalSegments, emphasis } = getProjectWeightStyle(referenceCount);
  const ringRadius = radius + 9;
  const ringWidth = 3.6;
  const segmentSpan = (Math.PI * 2) / totalSegments;
  const gap = segmentSpan * 0.24;
  const segmentArc = segmentSpan - gap;

  graphics.clear();
  graphics.moveTo(ringRadius, 0);
  graphics.arc(0, 0, ringRadius, 0, Math.PI * 2);
  graphics.stroke({ color: '#ffffff', width: ringWidth + 1.8, alpha: 0.18, cap: 'round' });

  for (let i = 0; i < totalSegments; i++) {
    const start = -Math.PI / 2 + i * segmentSpan + gap / 2;
    const end = start + segmentArc;
    graphics.moveTo(Math.cos(start) * ringRadius, Math.sin(start) * ringRadius);
    graphics.arc(0, 0, ringRadius, start, end);
    graphics.stroke({
      color,
      width: i < filledSegments ? ringWidth + (i === filledSegments - 1 ? 0.45 : 0.12) : ringWidth - 0.5,
      alpha: i < filledSegments ? 0.5 + emphasis * 0.5 : 0.1,
      cap: 'round',
    });
  }
}

function layoutBubbles(concepts: ConceptData[], ax: number, ay: number) {
  const n = concepts.length;
  const padX = 50;
  const padY = 42;
  const headerH = 80;
  const availW = AREA_WIDTH - padX * 2;
  const availH = AREA_HEIGHT - headerH - padY * 2;

  const cols = getBubbleColumns(n);

  const rows = Math.ceil(n / cols);
  const cellW = availW / cols;
  const cellH = availH / rows;
  const centerCol = (cols - 1) / 2;
  const centerRow = (rows - 1) / 2;

  const slots = [] as Array<{
    col: number;
    row: number;
    x: number;
    y: number;
    distance: number;
  }>;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      slots.push({
        col,
        row,
        x: ax + padX + cellW * col + cellW / 2,
        y: ay + headerH + padY + cellH * row + cellH / 2,
        distance: Math.hypot(col - centerCol, row - centerRow),
      });
    }
  }

  const orderedSlots = [...slots].sort((a, b) => a.distance - b.distance || a.row - b.row || a.col - b.col);
  const orderedConcepts = [...concepts]
    .map((concept, index) => ({
      concept,
      index,
      score: getBubbleReferenceScore(concept),
      name: getBubbleLabel(concept.name),
    }))
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name) || a.index - b.index);

  // Bubbles remain equal-size; weight only affects placement and styling.

  return orderedConcepts.map((item, i) => {
    const slot = orderedSlots[i];
    const push = Math.min(12, Math.max(0, item.score - 3)) * 0.82;
    const dx = centerCol - slot.col;
    const dy = centerRow - slot.row;
    const len = Math.hypot(dx, dy) || 1;
    return {
      concept: item.concept,
      x: slot.x + (dx / len) * push,
      y: slot.y + (dy / len) * push,
      radius: BUBBLE_RADIUS,
    };
  });
}

interface BubbleState {
  container: Container;
  glow: Graphics;
  weightRing: Graphics;
  bubble: Graphics;
  targetScale: number;
  currentScale: number;
  baseAlpha: number;
  concept: ConceptData;
  macroarea: MacroareaConfig;
  areaIndex: number;
  referenceCount: number;
  searchIndex: string;
  displayLabel: string;
  emoji: string;
  signal: SignalInfo | null;
  introIndex: number;
  searchHighlight: boolean;
  selected: boolean;
}

interface BubbleTypography {
  emojiSize: number;
  emojiY: number;
  titleFontSize: number;
  titleY: number;
  titleWrapWidth: number;
  badgeY: number;
}

function redrawGrid(
  grid: Graphics,
  world: Container,
  screenW: number,
  screenH: number,
) {
  grid.clear();
  const s = world.scale.x;
  const wx = world.x;
  const wy = world.y;

  const minX = (-wx / s) - GRID_SIZE * 2;
  const maxX = ((screenW - wx) / s) + GRID_SIZE * 2;
  const minY = (-wy / s) - GRID_SIZE * 2;
  const maxY = ((screenH - wy) / s) + GRID_SIZE * 2;

  const startX = Math.floor(minX / GRID_SIZE) * GRID_SIZE;
  const startY = Math.floor(minY / GRID_SIZE) * GRID_SIZE;

  for (let x = startX; x <= maxX; x += GRID_SIZE) {
    grid.moveTo(x, minY);
    grid.lineTo(x, maxY);
  }
  for (let y = startY; y <= maxY; y += GRID_SIZE) {
    grid.moveTo(minX, y);
    grid.lineTo(maxX, y);
  }
  grid.stroke({ color: GRID_COLOR, width: 0.5 / s });
}

function drawDashedRoundedRect(
  graphics: Graphics,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  dashLength: number,
  gapLength: number,
) {
  const top = width - radius * 2;
  const right = height - radius * 2;
  const bottom = top;
  const left = right;
  const quarterArc = (Math.PI * radius) / 2;
  const perimeter = top + right + bottom + left + quarterArc * 4;
  const step = dashLength + gapLength;
  const segments = Math.max(1, Math.floor(perimeter / step));

  const pointAt = (distance: number) => {
    let d = ((distance % perimeter) + perimeter) % perimeter;
    const x0 = x;
    const y0 = y;

    if (d <= top) return { x: x0 + radius + d, y: y0 };
    d -= top;

    if (d <= quarterArc) {
      const t = d / quarterArc;
      const a = -Math.PI / 2 + t * (Math.PI / 2);
      return {
        x: x0 + width - radius + Math.cos(a) * radius,
        y: y0 + radius + Math.sin(a) * radius,
      };
    }
    d -= quarterArc;

    if (d <= right) return { x: x0 + width, y: y0 + radius + d };
    d -= right;

    if (d <= quarterArc) {
      const t = d / quarterArc;
      const a = t * (Math.PI / 2);
      return {
        x: x0 + width - radius + Math.cos(a) * radius,
        y: y0 + height - radius + Math.sin(a) * radius,
      };
    }
    d -= quarterArc;

    if (d <= bottom) return { x: x0 + width - radius - d, y: y0 + height };
    d -= bottom;

    if (d <= quarterArc) {
      const t = d / quarterArc;
      const a = Math.PI / 2 + t * (Math.PI / 2);
      return {
        x: x0 + radius + Math.cos(a) * radius,
        y: y0 + height - radius + Math.sin(a) * radius,
      };
    }
    d -= quarterArc;

    if (d <= left) return { x: x0, y: y0 + height - radius - d };
    d -= left;

    const t = Math.min(1, d / quarterArc);
    const a = Math.PI + t * (Math.PI / 2);
    return {
      x: x0 + radius + Math.cos(a) * radius,
      y: y0 + radius + Math.sin(a) * radius,
    };
  };

  for (let i = 0; i < segments; i++) {
    const start = i * step;
    const end = Math.min(start + dashLength, perimeter);
    const p1 = pointAt(start);
    const p2 = pointAt(end);
    graphics.moveTo(p1.x, p1.y);
    graphics.lineTo(p2.x, p2.y);
  }
}

function createMinimap(
  worldBounds: { x: number; y: number; w: number; h: number },
  screenW: number,
  screenH: number,
  world: Container,
  onNavigate: (targetWX: number, targetWY: number) => void,
  compact = false,
): Container {
  const mmW = compact ? 156 : 180;
  const mmH = compact ? 92 : (screenH > 300 ? 110 : 70);
  const mmPad = compact ? 10 : 12;
  const mmX = screenW - mmW - mmPad;
  const mmY = screenH - mmH - mmPad;

  const mm = new Container();
  mm.label = 'minimap';
  mm.visible = !compact;

  const bg = new Graphics();
  bg.roundRect(0, 0, mmW, mmH, 8);
  bg.fill({ color: '#ffffff', alpha: 0.88 });
  bg.stroke({ color: '#d1d5db', width: 1 });
  bg.eventMode = 'none';
  mm.addChild(bg);

  const scaleX = mmW / worldBounds.w;
  const scaleY = mmH / worldBounds.h;
  const scale = Math.min(scaleX, scaleY) * 0.9;
  const offsetX = (mmW - worldBounds.w * scale) / 2;
  const offsetY = (mmH - worldBounds.h * scale) / 2;

  for (let i = 0; i < MACROAREAS.length; i++) {
    const area = MACROAREAS[i];
    const pos = getAreaPosition(i);
    const r = new Graphics();
    r.roundRect(
      offsetX + pos.x * scale,
      offsetY + pos.y * scale,
      AREA_WIDTH * scale,
      AREA_HEIGHT * scale,
      2,
    );
    r.fill({ color: area.bg, alpha: 0.8 });
    r.eventMode = 'none';
    mm.addChild(r);
  }

  const viewportRect = new Graphics();
  viewportRect.eventMode = 'none';
  mm.addChild(viewportRect);

  function updateViewport() {
    viewportRect.clear();
    const vx = (-world.x / world.scale.x - worldBounds.x) * scale + offsetX;
    const vy = (-world.y / world.scale.y - worldBounds.y) * scale + offsetY;
    const vw = (screenW / world.scale.x) * scale;
    const vh = (screenH / world.scale.y) * scale;
    viewportRect.rect(vx, vy, vw, vh);
    viewportRect.fill({ color: '#3b82f6', alpha: 0.08 });
    viewportRect.stroke({ color: '#3b82f6', width: 1, alpha: 0.5 });
  }

  mm.x = mmX;
  mm.y = mmY;
  mm.eventMode = 'static';
  mm.cursor = 'pointer';

  mm.on('pointerdown', (e) => {
    const localX = e.globalX - mmX;
    const localY = e.globalY - mmY;
    const targetWX = (localX - offsetX) / scale + worldBounds.x;
    const targetWY = (localY - offsetY) / scale + worldBounds.y;
    onNavigate(targetWX, targetWY);
  });

  (mm as unknown as Record<string, unknown>)._updateViewport = updateViewport;

  return mm;
}

function createZoomBtn(label: string, onClick: () => void): Container {
  const btn = new Container();
  btn.eventMode = 'static';
  btn.cursor = 'pointer';

  const bg = new Graphics();
  bg.roundRect(0, 0, 40, 40, 10);
  bg.fill({ color: '#ffffff', alpha: 0.92 });
  bg.stroke({ color: '#d1d5db', width: 1 });
  bg.eventMode = 'none';
  btn.addChild(bg);

  const txt = new Text({
    text: label,
    style: new TextStyle({
      fontFamily: '"Inter", sans-serif',
      fontSize: 22,
      fontWeight: 'bold',
      fill: '#374151',
    }),
  });
  txt.anchor.set(0.5);
  txt.x = 20;
  txt.y = 20;
  btn.addChild(txt);

  btn.on('pointerover', () => {
    bg.clear();
    bg.roundRect(0, 0, 40, 40, 10);
    bg.fill({ color: '#f3f4f6', alpha: 0.95 });
    bg.stroke({ color: '#9ca3af', width: 1 });
  });
  btn.on('pointerout', () => {
    bg.clear();
    bg.roundRect(0, 0, 40, 40, 10);
    bg.fill({ color: '#ffffff', alpha: 0.92 });
    bg.stroke({ color: '#d1d5db', width: 1 });
  });
  btn.on('pointerdown', (e) => {
    e.stopPropagation();
    onClick();
  });

  return btn;
}

function drawMagnifyingGlass(g: Graphics, cx: number, cy: number, size: number) {
  const r = size * 0.42;
  const handleLen = size * 0.35;
  const angle = Math.PI / 4;
  g.circle(cx, cy, r);
  g.stroke({ color: '#9ca3af', width: 1.5, cap: 'round' });
  g.moveTo(cx + r * 0.7 * Math.cos(angle), cy + r * 0.7 * Math.sin(angle));
  g.lineTo(cx + r * 0.7 * Math.cos(angle) + handleLen * Math.cos(angle), cy + r * 0.7 * Math.sin(angle) + handleLen * Math.sin(angle));
  g.stroke({ color: '#9ca3af', width: 1.8, cap: 'round' });
}

function createSearchBar(screenW: number, compact = false): {
  container: Container;
  bg: Graphics;
  textDisplay: Text;
  placeholder: Text;
  clearBtn: Container;
  matchLabel: Text;
  iconGfx: Graphics;
  width: number;
  height: number;
  radius: number;
} {
  const w = compact ? Math.min(Math.max(screenW - 24, 280), 360) : 300;
  const h = compact ? 46 : 38;
  const radius = 12;
  const pad = compact ? 14 : 12;

  const container = new Container();
  container.eventMode = 'static';
  container.cursor = 'text';

  const shadow = new Graphics();
  shadow.roundRect(2, 3, w, h, 12);
  shadow.fill({ color: '#000000', alpha: 0.06 });
  shadow.eventMode = 'none';
  container.addChild(shadow);

  const bg = new Graphics();
  bg.roundRect(0, 0, w, h, radius);
  bg.fill({ color: '#ffffff', alpha: 0.95 });
  bg.stroke({ color: '#d1d5db', width: 1 });
  bg.eventMode = 'none';
  container.addChild(bg);

  const iconGfx = new Graphics();
  drawMagnifyingGlass(iconGfx, pad + 8, h / 2, 16);
  iconGfx.eventMode = 'none';
  container.addChild(iconGfx);

  const placeholder = new Text({
    text: 'Search concepts...',
    style: new TextStyle({
      fontFamily: '"Inter", sans-serif',
      fontSize: 13,
      fill: '#9ca3af',
    }),
  });
  placeholder.x = pad + 24;
  placeholder.y = (h - placeholder.height) / 2;
  container.addChild(placeholder);

  const textDisplay = new Text({
    text: '',
    style: new TextStyle({
      fontFamily: '"Inter", sans-serif',
      fontSize: 13,
      fill: '#1f2937',
    }),
  });
  textDisplay.x = pad + 24;
  textDisplay.y = (h - textDisplay.height) / 2;
  container.addChild(textDisplay);

  const clearBtn = new Container();
  clearBtn.visible = false;
  clearBtn.eventMode = 'static';
  clearBtn.cursor = 'pointer';
  const clearBg = new Graphics();
  clearBg.circle(0, 0, 10);
  clearBg.fill({ color: '#e5e7eb' });
  clearBg.eventMode = 'none';
  clearBtn.addChild(clearBg);
  const clearX = new Text({
    text: '\u00D7',
    style: new TextStyle({ fontFamily: '"Inter", sans-serif', fontSize: 13, fontWeight: 'bold', fill: '#6b7280' }),
  });
  clearX.anchor.set(0.5);
  clearBtn.addChild(clearX);
  clearBtn.x = w - pad - 10;
  clearBtn.y = h / 2;
  container.addChild(clearBtn);

  clearBtn.on('pointerover', () => {
    clearBg.clear();
    clearBg.circle(0, 0, 10);
    clearBg.fill({ color: '#d1d5db' });
  });
  clearBtn.on('pointerout', () => {
    clearBg.clear();
    clearBg.circle(0, 0, 10);
    clearBg.fill({ color: '#e5e7eb' });
  });
  clearBtn.on('pointerdown', (e) => {
    e.stopPropagation();
  });

  const matchLabel = new Text({
    text: '',
    style: new TextStyle({
      fontFamily: '"Inter", sans-serif',
      fontSize: 11,
      fontWeight: 'bold',
      fill: '#6b7280',
    }),
  });
  matchLabel.x = w + 10;
  matchLabel.y = (h - matchLabel.height) / 2;
  matchLabel.visible = false;
  container.addChild(matchLabel);

  return { container, bg, textDisplay, placeholder, clearBtn, matchLabel, iconGfx, width: w, height: h, radius };
}

function createLegend(onAreaClick: (areaIndex: number) => void, compact = false): Container {
  const pad = 10;
  const itemH = 22;
  const w = 190;
  const maxVisibleItems = 8;
  const headerH = 30;
  const headerPad = pad * 2;
  const innerH = Math.min(MACROAREAS.length, maxVisibleItems) * itemH;
  const h = headerH + headerPad + innerH + 2;
  const isScrollable = MACROAREAS.length > maxVisibleItems;

  const container = new Container();
  container.eventMode = 'static';
  container.visible = !compact;
  let cleanupScroll: (() => void) | null = null;

  const shadow = new Graphics();
  shadow.roundRect(2, 3, w, h, 10);
  shadow.fill({ color: '#000000', alpha: 0.06 });
  shadow.eventMode = 'none';
  container.addChild(shadow);

  const bg = new Graphics();
  bg.roundRect(0, 0, w, h, 10);
  bg.fill({ color: '#ffffff', alpha: 0.88 });
  bg.stroke({ color: '#e5e7eb', width: 1 });
  bg.eventMode = 'none';
  container.addChild(bg);

  const header = new Text({
    text: 'MACROAREAS',
    style: new TextStyle({
      fontFamily: '"Inter", sans-serif',
      fontSize: 9,
      fontWeight: 'bold',
      fill: '#9ca3af',
      letterSpacing: 1.2,
    }),
  });
  header.x = pad;
  header.y = pad;
  header.eventMode = 'none';
  container.addChild(header);

  if (isScrollable) {
    const scrollHint = new Text({
      text: `${MACROAREAS.length} areas \u2193`,
      style: new TextStyle({
        fontFamily: '"Inter", sans-serif',
        fontSize: 9,
        fill: '#c0c0c0',
      }),
    });
    scrollHint.anchor.set(1, 0);
    scrollHint.x = w - pad;
    scrollHint.y = pad;
    scrollHint.eventMode = 'none';
    container.addChild(scrollHint);
  }

  const listContainer = new Container();
  listContainer.x = 0;
  listContainer.y = headerH + headerPad;
  container.addChild(listContainer);

  if (isScrollable) {
    const clipContainer = new Container();
    clipContainer.x = 0;
    clipContainer.y = headerH + headerPad;
    const clipBg = new Graphics();
    clipBg.rect(0, 0, w, innerH);
    clipBg.fill({ color: '#ffffff', alpha: 0 });
    clipContainer.addChild(clipBg);
    container.addChild(clipContainer);
    listContainer.parent?.removeChild(listContainer);
    clipContainer.addChild(listContainer);
    listContainer.y = 0;
    listContainer.mask = clipContainer;
  }

  let y = 0;
  for (let i = 0; i < MACROAREAS.length; i++) {
    const area = MACROAREAS[i];
    const row = new Container();
    row.eventMode = 'static';
    row.cursor = 'pointer';
    row.x = 0;
    row.y = y;

    const rowBg = new Graphics();
    rowBg.roundRect(2, 0, w - 4, itemH, 4);
    rowBg.fill({ color: '#000000', alpha: 0 });
    rowBg.eventMode = 'none';
    row.addChild(rowBg);

    const dot = new Graphics();
    dot.roundRect(pad, 4, 14, 14, 4);
    dot.fill({ color: area.color, alpha: 0.7 });
    dot.eventMode = 'none';
    row.addChild(dot);

    const txt = new Text({
      text: area.name,
      style: new TextStyle({
        fontFamily: '"Inter", sans-serif',
        fontSize: 11,
        fill: '#374151',
      }),
    });
    txt.x = pad + 20;
    txt.y = 5;
    txt.eventMode = 'none';
    row.addChild(txt);

    const count = new Text({
      text: `${area.concepts.length}`,
      style: new TextStyle({
        fontFamily: '"Inter", sans-serif',
        fontSize: 10,
        fill: '#9ca3af',
      }),
    });
    count.anchor.set(1, 0);
    count.x = w - pad;
    count.y = 5;
    count.eventMode = 'none';
    row.addChild(count);

    row.on('pointerover', () => {
      rowBg.clear();
      rowBg.roundRect(2, 0, w - 4, itemH, 4);
      rowBg.fill({ color: area.color, alpha: 0.08 });
    });
    row.on('pointerout', () => {
      rowBg.clear();
      rowBg.roundRect(2, 0, w - 4, itemH, 4);
      rowBg.fill({ color: '#000000', alpha: 0 });
    });
    row.on('pointerdown', (e) => {
      e.stopPropagation();
      onAreaClick(i);
    });

    listContainer.addChild(row);
    y += itemH;
  }

  if (isScrollable) {
    const maxY = y - innerH;
    let scrollY = 0;
    let isDragging = false;
    let lastWheelTime = 0;

    container.on('wheel', (e) => {
      e.stopPropagation();
      const now = Date.now();
      if (now - lastWheelTime < 20) return;
      lastWheelTime = now;
      scrollY = Math.max(-maxY, Math.min(0, scrollY - e.deltaY * 0.5));
      listContainer.y = headerH + headerPad + scrollY;
    });

    listContainer.eventMode = 'static';
    listContainer.on('pointerdown', (e) => {
      isDragging = true;
      e.stopPropagation();
    });

    const onMove = (e: PointerEvent) => {
      if (!isDragging) return;
      scrollY = Math.max(-maxY, Math.min(0, scrollY + e.movementY));
      listContainer.y = headerH + headerPad + scrollY;
    };
    const onUp = () => { isDragging = false; };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);

    cleanupScroll = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }

  (container as unknown as Record<string, unknown>)._cleanupScroll = () => cleanupScroll?.();

  return container;
}

function createSignalLegend(compact = false): Container {
  const container = new Container();
  container.visible = !compact;
  container.eventMode = 'none';

  const padX = 10;
  const padY = 8;
  const chipW = 98;
  const chipH = 20;
  const chipGap = 8;
  const headerH = 16;
  const items = SIGNAL_LEGEND.slice(0, 4);
  const w = padX * 2 + chipW * 2 + chipGap;
  const h = padY * 2 + headerH + chipH * 2 + chipGap;

  const bg = new Graphics();
  bg.roundRect(0, 0, w, h, 12);
  bg.fill({ color: '#ffffff', alpha: 0.9 });
  bg.stroke({ color: '#e5e7eb', width: 1 });
  bg.eventMode = 'none';
  container.addChild(bg);

  const title = new Text({
    text: 'SIGNAL CUES',
    style: new TextStyle({
      fontFamily: '"Inter", sans-serif',
      fontSize: 9,
      fontWeight: 'bold',
      fill: '#94a3b8',
      letterSpacing: 1,
    }),
  });
  title.x = padX;
  title.y = padY;
  title.eventMode = 'none';
  container.addChild(title);

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = padX + col * (chipW + chipGap);
    const y = padY + headerH + row * (chipH + chipGap);

    const chip = new Graphics();
    chip.roundRect(x, y, chipW, chipH, 10);
    chip.fill({ color: '#f8fafc', alpha: 0.98 });
    chip.stroke({ color: item.color, width: 1, alpha: 0.45 });
    chip.eventMode = 'none';
    container.addChild(chip);

    const label = new Text({
      text: item.label,
      style: new TextStyle({
        fontFamily: '"Inter", sans-serif',
        fontSize: 8,
        fontWeight: 'bold',
        fill: item.color,
        letterSpacing: 0.5,
      }),
    });
    label.x = x + 8;
    label.y = y + 3;
    label.eventMode = 'none';
    container.addChild(label);

    const helper = new Text({
      text: item.helper,
      style: new TextStyle({
        fontFamily: '"Inter", sans-serif',
        fontSize: 7,
        fill: '#64748b',
      }),
    });
    helper.x = x + 8;
    helper.y = y + 11;
    helper.eventMode = 'none';
    container.addChild(helper);
  }

  return container;
}

export default function Whiteboard() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let destroyed = false;
    let cleanup: (() => void) | null = null;

    (async () => {
      await document.fonts.ready;

      const app = new Application();
      await app.init({
        width: window.innerWidth,
        height: window.innerHeight,
        background: BG_COLOR,
        antialias: true,
        resolution: Math.min(window.devicePixelRatio || 1, 2),
        autoDensity: true,
      });

      if (destroyed) { app.destroy(true); return; }

      const el = containerRef.current;
      if (!el) { app.destroy(true); return; }

      app.canvas.style.display = 'block';
      app.canvas.style.touchAction = 'none';
      el.appendChild(app.canvas);

      let compactMode = isCompactViewport();

      const world = new Container();

      const totalW = 3 * AREA_WIDTH + 2 * COL_GAP + START_X * 2;
      const totalH = 4 * AREA_HEIGHT + 3 * ROW_GAP + START_Y * 2;
      const worldBounds = { x: 0, y: 0, w: totalW, h: totalH };

      const fitScale = Math.min(1, Math.max(0.2, Math.min(
        (window.innerWidth - 40) / totalW,
        (window.innerHeight - 40) / totalH,
      )));

      world.scale.set(fitScale);
      world.x = Math.max(20, (window.innerWidth - totalW * fitScale) / 2);
      world.y = Math.max(20, (window.innerHeight - totalH * fitScale) / 2);

      let targetScale = fitScale;
      let targetPanX = world.x;
      let targetPanY = world.y;

      app.stage.addChild(world);

      let needsGridRedraw = true;

      const grid = new Graphics();
      grid.eventMode = 'none';
      world.addChildAt(grid, 0);

      const bubbleStates: BubbleState[] = [];
      const macroareaContainers: Container[] = [];
      const introStart = Date.now();
      let selectedBubble: BubbleState | null = null;

      for (let i = 0; i < MACROAREAS.length; i++) {
        const area = MACROAREAS[i];
        const pos = getAreaPosition(i);

        const areaContainer = new Container();
        areaContainer.x = pos.x;
        areaContainer.y = pos.y;
        areaContainer.alpha = 0;
        macroareaContainers.push(areaContainer);

        const shadow = new Graphics();
        shadow.roundRect(3, 4, AREA_WIDTH, AREA_HEIGHT, 12);
        shadow.fill({ color: '#000000', alpha: 0.04 });
        shadow.eventMode = 'none';
        areaContainer.addChild(shadow);

        const bgGfx = new Graphics();
        bgGfx.roundRect(0, 0, AREA_WIDTH, AREA_HEIGHT, 12);
        bgGfx.fill({ color: area.bg, alpha: 0.55 });
        bgGfx.eventMode = 'none';
        areaContainer.addChild(bgGfx);

        const borderGfx = new Graphics();
        drawDashedRoundedRect(borderGfx, 0, 0, AREA_WIDTH, AREA_HEIGHT, 12, 13, 9);
        borderGfx.stroke({ color: area.border, width: 1.6, alpha: 0.9 });
        borderGfx.eventMode = 'none';
        areaContainer.addChild(borderGfx);

        const areaEmoji = new Text({
          text: getMacroareaEmoji(area.name),
          style: new TextStyle({
            fontFamily: EMOJI_FONT_FAMILY,
            fontSize: 18,
            fontWeight: 'bold',
          }),
        });
        areaEmoji.x = 18;
        areaEmoji.y = 8;
        areaEmoji.eventMode = 'none';
        areaContainer.addChild(areaEmoji);

        const label = new Text({
          text: area.name,
          style: new TextStyle({
            fontFamily: '"Inter", sans-serif',
            fontSize: 15,
            fontWeight: 'bold',
            fill: area.color,
            letterSpacing: 0.5,
          }),
        });
        label.x = 42;
        label.y = 9;
        areaContainer.addChild(label);

        const conceptCount = new Text({
          text: `${area.concepts.length} subsections • refs drive ring weight`,
          style: new TextStyle({
            fontFamily: '"Inter", sans-serif',
            fontSize: 10,
            fill: area.color,
            fontWeight: 'bold',
          }),
        });
        conceptCount.alpha = 0.72;
        conceptCount.x = 42;
        conceptCount.y = 31;
        const conceptCountBg = new Graphics();
        conceptCountBg.roundRect(38, 28, conceptCount.width + 14, 18, 9);
        conceptCountBg.fill({ color: '#ffffff', alpha: 0.28 });
        conceptCountBg.stroke({ color: area.color, width: 1, alpha: 0.12 });
        conceptCountBg.eventMode = 'none';
        areaContainer.addChild(conceptCountBg);
        areaContainer.addChild(conceptCount);

        const bubbles = layoutBubbles(area.concepts, pos.x, pos.y);

        for (const { concept, x, y, radius } of bubbles) {
          const bx = x - pos.x;
          const by = y - pos.y;
          const referenceCount = getReferenceCount(concept.alternatives);
          const displayLabel = getBubbleLabel(concept.name);
          const emoji = getBubbleEmoji(area.name, concept.category, concept.name);
          const searchIndex = buildSearchHaystack(concept, area.name);

          const bubbleContainer = new Container();
          bubbleContainer.x = bx;
          bubbleContainer.y = by;
          bubbleContainer.eventMode = 'static';
          bubbleContainer.cursor = 'pointer';
          bubbleContainer.alpha = 0;

          const hitR = radius + 4;
          bubbleContainer.hitArea = new Circle(0, 0, hitR);

          const glow = new Graphics();
          glow.eventMode = 'none';
          bubbleContainer.addChild(glow);

          const weightRing = new Graphics();
          weightRing.eventMode = 'none';
          drawProjectWeightRing(weightRing, radius, area.color, referenceCount);
          weightRing.alpha = 0.92;
          bubbleContainer.addChild(weightRing);

          const bubble = new Graphics();
          bubble.circle(0, 0, radius);
          bubble.fill({ color: '#ffffff', alpha: 0.88 });
          bubble.circle(0, 0, radius);
          bubble.stroke({ color: area.color, width: 1.8, alpha: 0.68 });
          bubble.circle(0, 0, radius - 5);
          bubble.fill({ color: area.border, alpha: 0.11 });
          bubble.circle(0, 0, radius - 15);
          bubble.fill({ color: area.color, alpha: 0.06 });
          bubble.eventMode = 'none';
          bubbleContainer.addChild(bubble);

          const bubbleTypography = getBubbleTypography(concept.name, radius);
          const conceptSignal = getConceptSignal(concept.name);

          const titlePlate = new Graphics();
          titlePlate.roundRect(-radius * 0.72, radius * 0.005, radius * 1.44, radius * 0.58, 15);
          titlePlate.fill({ color: '#ffffff', alpha: 0.76 });
          titlePlate.stroke({ color: area.color, width: 1, alpha: 0.14 });
          titlePlate.eventMode = 'none';
          bubbleContainer.addChild(titlePlate);

          const emojiBack = new Graphics();
          emojiBack.circle(0, bubbleTypography.emojiY, 17.5);
          emojiBack.fill({ color: '#ffffff', alpha: 0.92 });
          emojiBack.stroke({ color: area.color, width: 1.1, alpha: 0.26 });
          emojiBack.eventMode = 'none';
          bubbleContainer.addChild(emojiBack);

          const emojiText = new Text({
            text: emoji,
            style: new TextStyle({
              fontFamily: EMOJI_FONT_FAMILY,
              fontSize: bubbleTypography.emojiSize,
              fontWeight: 'bold',
            }),
          });
          emojiText.anchor.set(0.5);
          emojiText.y = bubbleTypography.emojiY;
          bubbleContainer.addChild(emojiText);

          if (conceptSignal) {
            const signalText = new Text({
              text: conceptSignal.label,
              style: new TextStyle({
                fontFamily: '"Inter", sans-serif',
                fontSize: 7,
                fontWeight: 'bold',
                fill: conceptSignal.color,
                letterSpacing: 0.6,
              }),
            });
            signalText.anchor.set(0.5);

            const signalWidth = Math.max(44, signalText.width + 10);
            const signalBg = new Graphics();
            signalBg.roundRect(-signalWidth / 2, -6, signalWidth, 12, 6);
            signalBg.fill({ color: '#ffffff', alpha: 0.95 });
            signalBg.stroke({ color: conceptSignal.color, width: 1, alpha: 0.42 });
            signalBg.eventMode = 'none';

            const signalChip = new Container();
            signalChip.x = radius * 0.44;
            signalChip.y = -radius * 0.59;
            signalChip.eventMode = 'none';
            signalChip.addChild(signalBg);
            signalChip.addChild(signalText);
            bubbleContainer.addChild(signalChip);

            const signalRail = new Graphics();
            signalRail.roundRect(-radius * 0.34, radius * 0.36, radius * 0.68, 4, 2);
            signalRail.fill({ color: conceptSignal.color, alpha: 0.45 });
            signalRail.eventMode = 'none';
            bubbleContainer.addChild(signalRail);
          }

          const bText = new Text({
            text: displayLabel,
            style: new TextStyle({
              fontFamily: '"Inter", sans-serif',
              fontSize: bubbleTypography.titleFontSize,
              fontWeight: 'bold',
              fill: '#1f2937',
              align: 'center',
              wordWrap: true,
              wordWrapWidth: bubbleTypography.titleWrapWidth,
              lineHeight: bubbleTypography.titleFontSize + 2,
            }),
          });
          bText.anchor.set(0.5);
          bText.y = bubbleTypography.titleY;
          bubbleContainer.addChild(bText);

          const badge = new Container();
          badge.x = 0;
          badge.y = bubbleTypography.badgeY;
          const badgeTxt = new Text({
            text: `${referenceCount} refs`,
            style: new TextStyle({
              fontFamily: '"Inter", sans-serif',
              fontSize: 9,
              fontWeight: 'bold',
              fill: area.color,
            }),
          });
          badgeTxt.anchor.set(0.5);
          const badgeWidth = Math.max(34, badgeTxt.width + 14);
          const badgeBg = new Graphics();
          badgeBg.roundRect(-badgeWidth / 2, -8, badgeWidth, 16, 8);
          badgeBg.fill({ color: area.color, alpha: 0.16 + Math.min(0.14, referenceCount * 0.012) });
          badgeBg.stroke({ color: area.color, width: 1, alpha: 0.34 });
          badge.addChild(badgeBg);
          badge.addChild(badgeTxt);
          bubbleContainer.addChild(badge);

          const state: BubbleState = {
            container: bubbleContainer,
            glow,
            weightRing,
            bubble,
            targetScale: 1,
            currentScale: 0.3,
            baseAlpha: 1,
            concept,
            macroarea: area,
            areaIndex: i,
            referenceCount,
            searchIndex,
            displayLabel,
            emoji,
            signal: conceptSignal,
            introIndex: 0,
            searchHighlight: false,
            selected: false,
          };

          const refreshGlow = (mode: 'idle' | 'hover' | 'selected') => {
            glow.clear();
            if (mode === 'hover') {
              glow.circle(0, 0, radius + 14);
              glow.fill({ color: area.color, alpha: 0.08 });
              glow.circle(0, 0, radius + 7);
              glow.fill({ color: area.color, alpha: 0.15 });
              return;
            }
            if (mode === 'selected') {
              glow.circle(0, 0, radius + 15);
              glow.fill({ color: area.color, alpha: 0.07 });
              glow.circle(0, 0, radius + 8);
              glow.fill({ color: area.color, alpha: 0.12 });
            }
          };

          bubbleContainer.on('pointerover', (e) => {
            state.targetScale = 1.06;
            state.weightRing.alpha = 1;
            refreshGlow('hover');
            showTooltip(`${emoji} ${displayLabel}`, concept.category, referenceCount, e.globalX, e.globalY);
          });
          bubbleContainer.on('pointerout', () => {
            state.targetScale = 1;
            state.weightRing.alpha = 0.92;
            refreshGlow(state.selected ? 'selected' : 'idle');
            hideTooltip();
          });

          areaContainer.addChild(bubbleContainer);
          bubbleStates.push(state);
          state.introIndex = bubbleStates.length - 1;
        }

        world.addChild(areaContainer);
      }

      function zoomToCenter(newScale: number) {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const wx = (cx - world.x) / world.scale.x;
        const wy = (cy - world.y) / world.scale.y;
        const ns = Math.max(0.2, Math.min(3, newScale));
        targetScale = ns;
        targetPanX = cx - wx * ns;
        targetPanY = cy - wy * ns;
      }

      function zoomToPoint(newScale: number, mx: number, my: number) {
        const wx = (mx - world.x) / world.scale.x;
        const wy = (my - world.y) / world.scale.y;
        const ns = Math.max(0.2, Math.min(3, newScale));
        targetScale = ns;
        targetPanX = mx - wx * ns;
        targetPanY = my - wy * ns;
      }

      function zoomToFit() {
        const s = Math.min(1, Math.max(0.2, Math.min(
          (window.innerWidth - 40) / totalW,
          (window.innerHeight - 40) / totalH,
        )));
        const cx = (window.innerWidth - totalW * s) / 2;
        const cy = (window.innerHeight - totalH * s) / 2;
        targetScale = s;
        targetPanX = Math.max(20, cx);
        targetPanY = Math.max(20, cy);
      }

      const minimap = createMinimap(worldBounds, window.innerWidth, window.innerHeight, world, (targetWX: number, targetWY: number) => {
        targetPanX = window.innerWidth / 2 - targetWX * world.scale.x;
        targetPanY = window.innerHeight / 2 - targetWY * world.scale.y;
      }, compactMode);
      app.stage.addChild(minimap);

      const zoomContainer = new Container();
      zoomContainer.x = compactMode ? 12 : 20;
      zoomContainer.y = window.innerHeight - (compactMode ? 184 : 196);
      zoomContainer.label = 'zoom-controls';

      const zoomBg = new Graphics();
      zoomBg.roundRect(0, 0, 40, 152, 10);
      zoomBg.fill({ color: '#ffffff', alpha: 0.88 });
      zoomBg.stroke({ color: '#d1d5db', width: 1 });
      zoomBg.eventMode = 'none';
      zoomContainer.addChild(zoomBg);

      const minusBtn = createZoomBtn('\u2212', () => {
        zoomToCenter(world.scale.x / 1.25);
      });
      minusBtn.x = 0;
      minusBtn.y = 8;
      zoomContainer.addChild(minusBtn);

      const zoomLabel = new Text({
        text: `${Math.round(world.scale.x * 100)}%`,
        style: new TextStyle({
          fontFamily: '"Inter", sans-serif',
          fontSize: 11,
          fontWeight: 'bold',
          fill: '#6b7280',
          align: 'center',
        }),
      });
      zoomLabel.anchor.set(0.5);
      zoomLabel.x = 20;
      zoomLabel.y = 56;
      zoomContainer.addChild(zoomLabel);

      const plusBtn = createZoomBtn('+', () => {
        zoomToCenter(world.scale.x * 1.25);
      });
      plusBtn.x = 0;
      plusBtn.y = 64;
      zoomContainer.addChild(plusBtn);

      const fitBtn = createZoomBtn('\u2922', () => {
        zoomToFit();
      });
      fitBtn.x = 0;
      fitBtn.y = 104;
      zoomContainer.addChild(fitBtn);

      app.stage.addChild(zoomContainer);

      const searchBar = createSearchBar(window.innerWidth, compactMode);
      searchBar.container.x = Math.max(12, (window.innerWidth - searchBar.width) / 2);
      searchBar.container.y = compactMode ? 10 : 14;
      app.stage.addChild(searchBar.container);

      const signalLegend = createSignalLegend(compactMode);
      signalLegend.x = Math.max(12, (window.innerWidth - signalLegend.width) / 2);
      signalLegend.y = searchBar.container.y + searchBar.height + 8;
      app.stage.addChild(signalLegend);

      const legend = createLegend((areaIndex: number) => {
        const pos = getAreaPosition(areaIndex);
        const areaCX = pos.x + AREA_WIDTH / 2;
        const areaCY = pos.y + AREA_HEIGHT / 2;
        const s = Math.min(
          (window.innerWidth - 60) / (AREA_WIDTH + 80),
          (window.innerHeight - 60) / (AREA_HEIGHT + 80),
          1.8,
        );
        const ns = Math.max(0.2, Math.min(3, s));
        targetScale = ns;
        targetPanX = window.innerWidth / 2 - areaCX * ns;
        targetPanY = window.innerHeight / 2 - areaCY * ns;
      });
      legend.x = window.innerWidth - 190 - 14;
      legend.y = 14;
      app.stage.addChild(legend);
      const legendCleanup = (legend as unknown as Record<string, unknown>)._cleanupScroll as (() => void) | undefined;

      const tooltip = new Container();
      tooltip.visible = false;
      tooltip.label = 'tooltip';

      const tooltipBg = new Graphics();
      tooltipBg.eventMode = 'none';
      tooltip.addChild(tooltipBg);

      const tooltipText = new Text({
        text: '',
        style: new TextStyle({
          fontFamily: '"Inter", sans-serif',
          fontSize: 12,
          fontWeight: 'bold',
          fill: '#ffffff',
        }),
      });
      tooltip.addChild(tooltipText);

      const tooltipSub = new Text({
        text: '',
        style: new TextStyle({
          fontFamily: '"Inter", sans-serif',
          fontSize: 10,
          fill: '#d1d5db',
        }),
      });
      tooltip.addChild(tooltipSub);

      app.stage.addChild(tooltip);

      function showTooltip(name: string, category: string, referenceCount: number, x: number, y: number) {
        if (panel || compactMode) return;
        const cleanName = name.replace(/\n/g, ' ');
        tooltipText.text = cleanName;
        tooltipText.x = 10;
        tooltipText.y = 6;
        tooltipSub.text = `${category} · ${referenceCount} refs`;
        tooltipSub.x = 10;
        tooltipSub.y = 22;
        tooltipBg.clear();
        const tw = Math.max(tooltipText.width, tooltipSub.width) + 20;
        tooltipBg.roundRect(0, 0, tw, 38, 8);
        tooltipBg.fill({ color: '#1f2937', alpha: 0.92 });
        tooltip.x = Math.min(x + 15, window.innerWidth - tw - 10);
        tooltip.y = Math.max(y - 44, 5);
        tooltip.visible = true;
      }

      function hideTooltip() {
        tooltip.visible = false;
      }

      const hiddenInput = document.createElement('input');
      hiddenInput.type = 'text';
      hiddenInput.placeholder = '';
      hiddenInput.setAttribute('autocomplete', 'off');
      hiddenInput.setAttribute('autocorrect', 'off');
      hiddenInput.setAttribute('autocapitalize', 'off');
      hiddenInput.setAttribute('spellcheck', 'false');
      hiddenInput.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0;pointer-events:none;width:1px;height:1px;';
      document.body.appendChild(hiddenInput);

      let searchQuery = '';
      let searchActive = false;

      searchBar.container.on('pointerdown', (e) => {
        e.stopPropagation();
        hiddenInput.focus();
      });

      searchBar.clearBtn.on('pointerdown', (e) => {
        e.stopPropagation();
        hiddenInput.value = '';
        hiddenInput.dispatchEvent(new Event('input'));
        hiddenInput.focus();
      });

      hiddenInput.addEventListener('focus', () => {
        searchActive = true;
        searchBar.bg.clear();
        searchBar.bg.roundRect(0, 0, searchBar.width, searchBar.height, searchBar.radius);
        searchBar.bg.fill({ color: '#ffffff', alpha: 1 });
        searchBar.bg.stroke({ color: '#93c5fd', width: 1.5 });
      });

      hiddenInput.addEventListener('blur', () => {
        searchActive = false;
        searchBar.bg.clear();
        searchBar.bg.roundRect(0, 0, searchBar.width, searchBar.height, searchBar.radius);
        searchBar.bg.fill({ color: '#ffffff', alpha: 0.95 });
        searchBar.bg.stroke({ color: '#d1d5db', width: 1 });
      });

      hiddenInput.addEventListener('input', () => {
        searchQuery = hiddenInput.value;
        applySearch(searchQuery);
      });

      function applySearch(query: string) {
        const q = query.toLowerCase().trim();
        searchBar.textDisplay.text = query;
        searchBar.placeholder.visible = !query;
        searchBar.clearBtn.visible = query.length > 0;
        searchBar.matchLabel.visible = false;

        if (!q) {
          for (const s of bubbleStates) {
            s.baseAlpha = 1;
            s.searchHighlight = false;
          }
          for (const mc of macroareaContainers) {
            mc.alpha = 1;
          }
          return;
        }

        let matchCount = 0;
        const areaMatchFlags = new Array(MACROAREAS.length).fill(false);

        for (const s of bubbleStates) {
          const matched = s.searchIndex.includes(q);
          if (matched || s.selected) {
            s.baseAlpha = 1;
            s.searchHighlight = matched;
            if (matched) {
              matchCount++;
              areaMatchFlags[s.areaIndex] = true;
            } else {
              areaMatchFlags[s.areaIndex] = true;
            }
          } else {
            s.baseAlpha = 0.12;
            s.searchHighlight = false;
          }
        }

        for (let i = 0; i < macroareaContainers.length; i++) {
          macroareaContainers[i].alpha = areaMatchFlags[i] ? 1 : 0.15;
        }

        searchBar.matchLabel.text = `${matchCount} match${matchCount !== 1 ? 'es' : ''}`;
        searchBar.matchLabel.visible = true;
      }

      app.ticker.add(() => {
        const introElapsed = Date.now() - introStart;

        for (let mi = 0; mi < macroareaContainers.length; mi++) {
          const areaDelay = mi * 60;
          const t = Math.min(1, Math.max(0, (introElapsed - areaDelay) / 500));
          if (t < 1 && t > 0) {
            macroareaContainers[mi].alpha = t;
          }
        }

        const introDone = introElapsed > MACROAREAS.length * 60 + 500;

        for (const s of bubbleStates) {
          const bubbleDelay = s.introIndex * 15;
          let introT = 1;
          if (!introDone) {
            introT = Math.min(1, Math.max(0, (introElapsed - bubbleDelay) / 400));
          }

          if (s.selected && panel) {
            s.targetScale = Math.max(s.targetScale, 1.04);
          }

          if (Math.abs(s.currentScale - s.targetScale) > 0.001) {
            s.currentScale += (s.targetScale - s.currentScale) * 0.18;
          }
          s.container.scale.set(s.currentScale * introT);

          const targetAlpha = s.baseAlpha * introT;
          if (Math.abs(s.container.alpha - targetAlpha) > 0.01) {
            s.container.alpha += (targetAlpha - s.container.alpha) * 0.15;
          }

          if (s.searchHighlight && !panel) {
            s.glow.clear();
            s.glow.circle(0, 0, BUBBLE_RADIUS + 10);
            s.glow.fill({ color: '#fbbf24', alpha: 0.15 });
            s.glow.circle(0, 0, BUBBLE_RADIUS + 4);
            s.glow.fill({ color: '#fbbf24', alpha: 0.1 });
            s.weightRing.alpha = 1;
          } else if (s.selected && panel) {
            s.glow.clear();
            s.glow.circle(0, 0, BUBBLE_RADIUS + 12);
            s.glow.fill({ color: s.macroarea.color, alpha: 0.08 });
            s.glow.circle(0, 0, BUBBLE_RADIUS + 5);
            s.glow.fill({ color: s.macroarea.color, alpha: 0.14 });
            s.weightRing.alpha = 1;
          } else {
            s.weightRing.alpha += (0.92 - s.weightRing.alpha) * 0.18;
          }
        }

        if (introDone) {
          for (const s of bubbleStates) {
            if (s.baseAlpha >= 1) s.container.alpha = 1;
          }
        }

        if (!dragging) {
          const ds = Math.abs(world.scale.x - targetScale);
          const dx = Math.abs(world.x - targetPanX);
          const dy = Math.abs(world.y - targetPanY);

          if (ds > 0.0001 || dx > 0.1 || dy > 0.1) {
            world.scale.x += (targetScale - world.scale.x) * ZOOM_LERP;
            world.scale.y = world.scale.x;
            world.x += (targetPanX - world.x) * PAN_LERP;
            world.y += (targetPanY - world.y) * PAN_LERP;
            needsGridRedraw = true;
          } else if (ds > 0 || dx > 0 || dy > 0) {
            world.scale.set(targetScale);
            world.x = targetPanX;
            world.y = targetPanY;
          }
        }

        if (needsGridRedraw) {
          redrawGrid(grid, world, app.renderer.width / (window.devicePixelRatio || 1), app.renderer.height / (window.devicePixelRatio || 1));
          needsGridRedraw = false;
        }

        const mmData = minimap as unknown as Record<string, unknown>;
        const updateFn = mmData._updateViewport as () => void;
        if (updateFn) updateFn();

        zoomLabel.text = `${Math.round(world.scale.x * 100)}%`;

        if (panelFadeDir !== 0 && panel) {
          panel!.alpha += panelFadeDir * 0.1;
          if (panelFadeDir === 1) {
            if (panelCard) {
              const cs = panelCard.scale.x;
              if (cs < 0.98) {
                panelCard.scale.set(cs + (1 - cs) * 0.15);
              } else {
                panelCard.scale.set(1);
              }
            }
            if (panel!.alpha >= 1) {
              panel!.alpha = 1;
              if (panelCard) panelCard.scale.set(1);
              panelFadeDir = 0;
            }
          } else if (panelFadeDir === -1 && panel!.alpha <= 0) {
            app.stage.removeChild(panel!);
            panel!.destroy({ children: true });
            panel = null;
            panelCard = null;
            panelFadeDir = 0;
          }
        }
      });

      app.stage.eventMode = 'static';
      app.stage.hitArea = new Rectangle(0, 0, window.innerWidth, window.innerHeight);
      app.stage.cursor = 'grab';

      let dragging = false;
      let dragSX = 0;
      let dragSY = 0;
      let worldSX = 0;
      let worldSY = 0;

      app.stage.on('pointerdown', (e) => {
        if (e.target !== app.stage) return;
        if (compactMode || (e as unknown as { pointerType?: string }).pointerType === 'touch') return;
        dragging = true;
        targetPanX = world.x;
        targetPanY = world.y;
        dragSX = e.clientX;
        dragSY = e.clientY;
        worldSX = world.x;
        worldSY = world.y;
        app.stage.cursor = 'grabbing';
      });

      app.stage.on('pointermove', (e) => {
        if (tooltip.visible) {
          tooltipBg.clear();
          const tw = Math.max(tooltipText.width, tooltipSub.width) + 20;
          tooltipBg.roundRect(0, 0, tw, 38, 8);
          tooltipBg.fill({ color: '#1f2937', alpha: 0.92 });
          tooltip.x = Math.min(e.globalX + 15, window.innerWidth - tw - 10);
          tooltip.y = Math.max(e.globalY - 44, 5);
        }
        if (!dragging) return;
        world.x = worldSX + (e.clientX - dragSX);
        world.y = worldSY + (e.clientY - dragSY);
        targetPanX = world.x;
        targetPanY = world.y;
        needsGridRedraw = true;
      });

      const endDrag = () => {
        dragging = false;
        app.stage.cursor = 'grab';
      };
      app.stage.on('pointerup', endDrag);
      app.stage.on('pointerupoutside', endDrag);

      const onWheel = (e: WheelEvent) => {
        e.preventDefault();
        const factor = e.deltaY > 0 ? 0.92 : 1.08;
        zoomToPoint(world.scale.x * factor, e.clientX, e.clientY);
      };
      app.canvas.addEventListener('wheel', onWheel, { passive: false });

      const touchState = {
        mode: 'none' as 'none' | 'pan' | 'pinch',
        lastX: 0,
        lastY: 0,
        startDistance: 0,
        startScale: 1,
        midX: 0,
        midY: 0,
      };

      const getTouchDistance = (t1: Touch, t2: Touch) => Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const getTouchMid = (t1: Touch, t2: Touch) => ({
        x: (t1.clientX + t2.clientX) / 2,
        y: (t1.clientY + t2.clientY) / 2,
      });

      const onTouchStart = (e: TouchEvent) => {
        if (e.touches.length === 1) {
          const t = e.touches[0];
          touchState.mode = 'pan';
          touchState.lastX = t.clientX;
          touchState.lastY = t.clientY;
          dragging = true;
          dragSX = t.clientX;
          dragSY = t.clientY;
          worldSX = world.x;
          worldSY = world.y;
          hideTooltip();
        } else if (e.touches.length >= 2) {
          const [t1, t2] = [e.touches[0], e.touches[1]];
          touchState.mode = 'pinch';
          touchState.startDistance = getTouchDistance(t1, t2);
          touchState.startScale = world.scale.x;
          const mid = getTouchMid(t1, t2);
          touchState.midX = mid.x;
          touchState.midY = mid.y;
          dragging = false;
          hideTooltip();
        }
        e.preventDefault();
      };

      const onTouchMove = (e: TouchEvent) => {
        if (touchState.mode === 'pinch' && e.touches.length >= 2) {
          const [t1, t2] = [e.touches[0], e.touches[1]];
          const mid = getTouchMid(t1, t2);
          const dist = getTouchDistance(t1, t2);
          const scaleRatio = dist / Math.max(40, touchState.startDistance);
          const newScale = touchState.startScale * scaleRatio;
          const prevMidX = touchState.midX;
          const prevMidY = touchState.midY;
          zoomToPoint(newScale, mid.x, mid.y);
          targetPanX += mid.x - prevMidX;
          targetPanY += mid.y - prevMidY;
          touchState.midX = mid.x;
          touchState.midY = mid.y;
          needsGridRedraw = true;
          e.preventDefault();
          return;
        }

        if (touchState.mode === 'pan' && e.touches.length === 1) {
          const t = e.touches[0];
          const dx = t.clientX - touchState.lastX;
          const dy = t.clientY - touchState.lastY;
          touchState.lastX = t.clientX;
          touchState.lastY = t.clientY;
          world.x += dx;
          world.y += dy;
          targetPanX = world.x;
          targetPanY = world.y;
          dragging = true;
          needsGridRedraw = true;
          e.preventDefault();
        }
      };

      const onTouchEnd = () => {
        if (touchState.mode !== 'none') {
          touchState.mode = 'none';
          dragging = false;
          app.stage.cursor = 'grab';
        }
      };

      app.canvas.addEventListener('touchstart', onTouchStart, { passive: false });
      app.canvas.addEventListener('touchmove', onTouchMove, { passive: false });
      app.canvas.addEventListener('touchend', onTouchEnd);
      app.canvas.addEventListener('touchcancel', onTouchEnd);

      let panel: Container | null = null;
      let panelFadeDir: number = 0;
      let panelCard: Container | null = null;

      function closePanel() {
        if (!panel || panelFadeDir === -1) return;
        panelFadeDir = -1;
        hideTooltip();
        if (selectedBubble) {
          selectedBubble.selected = false;
          selectedBubble.targetScale = 1;
          selectedBubble = null;
        }
      }

      function openPanel(state: BubbleState) {
        const loweredQuery = searchQuery.toLowerCase().trim();
        if (state.searchIndex.includes(loweredQuery) || !loweredQuery) {
          // ok to open
        } else {
          return;
        }
        hideTooltip();
        if (selectedBubble && selectedBubble !== state) {
          selectedBubble.selected = false;
        }
        selectedBubble = state;
        state.selected = true;
        if (panel) {
          app.stage.removeChild(panel);
          panel.destroy({ children: true });
          panel = null;
        }
        panelFadeDir = 0;

        const sw = window.innerWidth;
        const sh = window.innerHeight;
        const isSheet = compactMode;
        const pw = isSheet ? Math.min(sw - 20, 460) : 400;
        const ph = isSheet ? Math.min(Math.round(sh * 0.8), 620) : 310;
        const pad = isSheet ? 18 : 22;
        const px = isSheet ? Math.max(10, (sw - pw) / 2) : Math.max(10, Math.min(sw - pw - 10, (sw - pw) / 2));
        const py = isSheet ? Math.max(10, sh - ph - 10) : Math.max(10, Math.min(sh - ph - 10, (sh - ph) / 2));

        const root = new Container();
        root.alpha = 0;

        const backdrop = new Graphics();
        backdrop.rect(0, 0, sw, sh);
        backdrop.fill({ color: '#000000', alpha: 0.15 });
        backdrop.eventMode = 'static';
        backdrop.on('pointerdown', closePanel);
        root.addChild(backdrop);

        const card = new Container();
        card.x = px;
        card.y = py;
        card.scale.set(0.92);
        panelCard = card;

        root.addChild(card);

        const cardShadow = new Graphics();
        cardShadow.roundRect(3, 6, pw, ph, isSheet ? 20 : 16);
        cardShadow.fill({ color: '#000000', alpha: 0.08 });
        cardShadow.eventMode = 'none';
        card.addChild(cardShadow);

        const cardBg = new Graphics();
        cardBg.roundRect(0, 0, pw, ph, isSheet ? 20 : 16);
        cardBg.fill({ color: '#ffffff' });
        cardBg.stroke({ color: '#e5e7eb', width: 1 });
        cardBg.eventMode = 'none';
        card.addChild(cardBg);

        const accentBar = new Graphics();
        accentBar.roundRect(0, 0, pw, 5, isSheet ? 20 : 16);
        accentBar.fill({ color: state.macroarea.color, alpha: 0.8 });
        accentBar.eventMode = 'none';
        card.addChild(accentBar);

        if (isSheet) {
          const dragHandle = new Graphics();
          dragHandle.roundRect(pw / 2 - 24, 10, 48, 5, 4);
          dragHandle.fill({ color: '#d1d5db' });
          dragHandle.eventMode = 'none';
          card.addChild(dragHandle);
        }

        const closeBtn = new Container();
        closeBtn.x = pw - 38;
        closeBtn.y = 12;
        closeBtn.eventMode = 'static';
        closeBtn.cursor = 'pointer';
        const closeCircle = new Graphics();
        closeCircle.circle(0, 0, 14);
        closeCircle.fill({ color: '#f3f4f6' });
        closeCircle.eventMode = 'none';
        closeBtn.addChild(closeCircle);
        const closeX = new Text({
          text: '\u2715',
          style: new TextStyle({ fontFamily: '"Inter", sans-serif', fontSize: 14, fill: '#6b7280' }),
        });
        closeX.anchor.set(0.5);
        closeBtn.addChild(closeX);
        closeBtn.on('pointerover', () => {
          closeCircle.clear();
          closeCircle.circle(0, 0, 14);
          closeCircle.fill({ color: '#e5e7eb' });
        });
        closeBtn.on('pointerout', () => {
          closeCircle.clear();
          closeCircle.circle(0, 0, 14);
          closeCircle.fill({ color: '#f3f4f6' });
        });
        closeBtn.on('pointerdown', (e) => {
          e.stopPropagation();
          closePanel();
        });
        card.addChild(closeBtn);

        let cy = pad + (isSheet ? 8 : 6);

        const title = new Text({
          text: state.displayLabel,
          style: new TextStyle({
            fontFamily: '"Inter", sans-serif',
            fontSize: isSheet ? 16 : 18,
            fontWeight: 'bold',
            fill: '#111827',
            wordWrap: true,
            wordWrapWidth: pw - pad * 2 - 36,
          }),
        });
        title.x = pad;
        title.y = cy;
        card.addChild(title);
        cy += 28;

        const badgeTxt = new Text({
          text: state.macroarea.name,
          style: new TextStyle({
            fontFamily: '"Inter", sans-serif',
            fontSize: 11,
            fontWeight: 'bold',
            fill: state.macroarea.color,
          }),
        });
        const badgeBgGfx = new Graphics();
        badgeBgGfx.roundRect(pad - 4, cy - 3, badgeTxt.width + 10, badgeTxt.height + 6, 5);
        badgeBgGfx.fill({ color: state.macroarea.color, alpha: 0.1 });
        badgeBgGfx.eventMode = 'none';
        card.addChild(badgeBgGfx);
        badgeTxt.x = pad + 1;
        badgeTxt.y = cy;
        card.addChild(badgeTxt);
        cy += 26;

        if (state.signal) {
          const signalBadge = new Graphics();
          signalBadge.roundRect(pad - 4, cy - 2, 180, 20, 10);
          signalBadge.fill({ color: '#f8fafc', alpha: 0.95 });
          signalBadge.stroke({ color: state.signal.color, width: 1, alpha: 0.4 });
          signalBadge.eventMode = 'none';
          card.addChild(signalBadge);

          const signalLabel = new Text({
            text: `${state.signal.label} • ${state.signal.helper}`,
            style: new TextStyle({
              fontFamily: '"Inter", sans-serif',
              fontSize: 10,
              fontWeight: 'bold',
              fill: state.signal.color,
            }),
          });
          signalLabel.x = pad + 4;
          signalLabel.y = cy + 2;
          card.addChild(signalLabel);
          cy += 26;
        }

        const desc = new Text({
          text: state.concept.description,
          style: new TextStyle({
            fontFamily: '"Inter", sans-serif',
            fontSize: isSheet ? 12 : 13,
            fill: '#4b5563',
            wordWrap: true,
            wordWrapWidth: pw - pad * 2,
            lineHeight: isSheet ? 18 : 20,
          }),
        });
        desc.x = pad;
        desc.y = cy;
        card.addChild(desc);
        cy += desc.height + 12;

        const popLbl = new Text({
          text: 'PROJECT WEIGHT',
          style: new TextStyle({
            fontFamily: '"Inter", sans-serif',
            fontSize: 10,
            fontWeight: 'bold',
            fill: '#9ca3af',
            letterSpacing: 1,
          }),
        });
        popLbl.x = pad;
        popLbl.y = cy;
        card.addChild(popLbl);

        const popVal = new Text({
          text: `${state.referenceCount} refs`,
          style: new TextStyle({
            fontFamily: '"Inter", sans-serif',
            fontSize: 11,
            fontWeight: 'bold',
            fill: state.macroarea.color,
          }),
        });
        popVal.anchor.set(1, 0);
        popVal.x = pw - pad;
        popVal.y = cy;
        card.addChild(popVal);
        cy += 18;

        const barW = pw - pad * 2;
        const barH = 6;
        const barBgGfx = new Graphics();
        barBgGfx.roundRect(pad, cy, barW, barH, 3);
        barBgGfx.fill({ color: '#f3f4f6' });
        barBgGfx.eventMode = 'none';
        card.addChild(barBgGfx);

        const referenceCount = state.referenceCount;
        const maxReferenceCount = 8;
        const fillW = Math.max(barH, (Math.min(referenceCount, maxReferenceCount) / maxReferenceCount) * barW);
        const barFill = new Graphics();
        barFill.roundRect(pad, cy, fillW, barH, 3);
        barFill.fill({ color: state.macroarea.color, alpha: 0.65 });
        barFill.eventMode = 'none';
        card.addChild(barFill);
        cy += barH + 16;

        const catTxt = new Text({
          text: `Category: ${state.concept.category}`,
          style: new TextStyle({
            fontFamily: '"Inter", sans-serif',
            fontSize: 12,
            fill: '#6b7280',
          }),
        });
        catTxt.x = pad;
        catTxt.y = cy;
        card.addChild(catTxt);
        cy += 22;

        const altLbl = new Text({
          text: 'PROJECT REFERENCES',
          style: new TextStyle({
            fontFamily: '"Inter", sans-serif',
            fontSize: 10,
            fontWeight: 'bold',
            fill: '#9ca3af',
            letterSpacing: 1,
          }),
        });
        altLbl.x = pad;
        altLbl.y = cy;
        card.addChild(altLbl);
        cy += 18;

        const altTxt = new Text({
          text: state.concept.alternatives,
          style: new TextStyle({
            fontFamily: '"Inter", sans-serif',
            fontSize: 12,
            fill: '#4b5563',
            wordWrap: true,
            wordWrapWidth: pw - pad * 2,
            lineHeight: 18,
          }),
        });
        altTxt.x = pad;
        altTxt.y = cy;
        card.addChild(altTxt);

        panel = root;
        panelFadeDir = 1;
        app.stage.addChild(root);
      }

      for (const s of bubbleStates) {
        s.container.on('pointerdown', (e) => {
          e.stopPropagation();
          openPanel(s);
        });
      }

      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          if (searchActive && searchQuery) {
            hiddenInput.value = '';
            hiddenInput.dispatchEvent(new Event('input'));
            return;
          }
          closePanel();
        }
        if (searchActive) return;
        if (e.key === '+' || e.key === '=') zoomToCenter(world.scale.x * 1.2);
        if (e.key === '-' || e.key === '_') zoomToCenter(world.scale.x / 1.2);
        if (e.key === '0') zoomToFit();
      };
      window.addEventListener('keydown', onKey);

      const onResize = () => {
        const nextCompactMode = isCompactViewport();
        if (nextCompactMode !== compactMode && panel) {
          closePanel();
        }
        compactMode = nextCompactMode;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        app.renderer.resize(window.innerWidth * dpr, window.innerHeight * dpr);
        app.canvas.width = window.innerWidth * dpr;
        app.canvas.height = window.innerHeight * dpr;
        app.canvas.style.width = `${window.innerWidth}px`;
        app.canvas.style.height = `${window.innerHeight}px`;
        app.stage.hitArea = new Rectangle(0, 0, window.innerWidth, window.innerHeight);
        needsGridRedraw = true;
        minimap.visible = !compactMode;
        minimap.x = window.innerWidth - minimap.width - (compactMode ? 10 : 12);
        minimap.y = window.innerHeight - minimap.height - (compactMode ? 10 : 12);
        zoomContainer.x = compactMode ? 12 : 20;
        zoomContainer.y = window.innerHeight - (compactMode ? 184 : 196);
        zoomContainer.scale.set(compactMode ? 0.94 : 1);
        const searchW = searchBar.container.width;
        searchBar.container.x = Math.max(12, (window.innerWidth - searchW) / 2);
        searchBar.container.y = compactMode ? 10 : 14;
        signalLegend.visible = !compactMode;
        signalLegend.x = Math.max(12, (window.innerWidth - signalLegend.width) / 2);
        signalLegend.y = searchBar.container.y + searchBar.height + 8;
        legend.visible = !compactMode;
        legend.x = window.innerWidth - 190 - 14;
        legend.y = 14;
      };
      window.addEventListener('resize', onResize);

      cleanup = () => {
        window.removeEventListener('keydown', onKey);
        window.removeEventListener('resize', onResize);
        legendCleanup?.();
        document.body.removeChild(hiddenInput);
        app.canvas.removeEventListener('wheel', onWheel);
        app.canvas.removeEventListener('touchstart', onTouchStart);
        app.canvas.removeEventListener('touchmove', onTouchMove);
        app.canvas.removeEventListener('touchend', onTouchEnd);
        app.canvas.removeEventListener('touchcancel', onTouchEnd);
        if (panel) {
          app.stage.removeChild(panel);
          panel.destroy({ children: true });
          panel = null;
          panelCard = null;
        }
        app.destroy(true);
      };
    })();

    return () => {
      destroyed = true;
      cleanup?.();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 overflow-hidden" />;
}
