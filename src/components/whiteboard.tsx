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
const AREA_WIDTH = 720;
const AREA_HEIGHT = 460;
const COL_GAP = 80;
const ROW_GAP = 60;
const START_X = 80;
const START_Y = 60;
const COL_STEP = AREA_WIDTH + COL_GAP;
const ROW_STEP = AREA_HEIGHT + ROW_GAP;
const BUBBLE_RADIUS = 46;
const BUBBLE_FILL_ALPHA = 0.72;
const BUBBLE_TRACK_ALPHA = 0.16;
const BUBBLE_INNER_ALPHA = 0.06;
const PROJECT_WEIGHT_SEGMENTS = 10;
const ZOOM_LERP = 0.12;
const PAN_LERP = 0.15;
const EMOJI_FONT_FAMILY = '"Inter", "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';

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
      { name: 'MCP', popularity: 9, description: 'Model Context Protocol \u2014 protocollo standard per tool esterni (Linux Foundation)', alternatives: 'REST APIs, gRPC, OpenAI function calling, A2A', category: 'Integration' },
      { name: 'A2A', popularity: 9, description: 'Agent-to-Agent Protocol \u2014 comunicazione tra agenti AI indipendenti (Linux Foundation)', alternatives: 'MCP (complementare), custom gRPC/REST, LangGraph inter-agent channels', category: 'Integration' },
      { name: 'API Client', popularity: 8, description: 'Chiamate HTTP a API esterne per integrare servizi', alternatives: 'fetch, axios, openapi clients, SDK wrappers', category: 'Integration' },
    ],
  },
  {
    name: 'Prompt Engineering',
    color: '#8B5CF6',
    bg: '#EDE9FE',
    border: '#C4B5FD',
    concepts: [
      { name: 'System\nPrompt', popularity: 10, description: 'Istruzioni di base che definiscono personalit\u00e0 e comportamento dell\'agente', alternatives: 'Static system prompt, Dynamic assembly, Prompt templates', category: 'Core' },
      { name: 'Few-Shot\nExamples', popularity: 8, description: 'Esempi di input/output per guidare il modello', alternatives: 'In-context learning, Dynamic few-shot, Retrieved examples', category: 'Technique' },
      { name: 'Chain-of-\nThought', popularity: 9, description: 'Guidare il modello a ragionare passo per passo', alternatives: 'CoT prompting, Tree-of-Thought, Step-by-step, ReAct', category: 'Technique' },
      { name: 'Structured\nOutput', popularity: 9, description: 'Forzare il modello a produrre output in formato specifico (JSON, etc.)', alternatives: 'JSON mode, Function calling, Outlines, Guidance', category: 'Technique' },
      { name: 'Prompt\nCaching', popularity: 7, description: 'Cachare parti statiche del prompt per ridurre costi e latenza', alternatives: 'Anthropic prompt caching, Semantic caching, KV cache', category: 'Optimization' },
      { name: 'Context\nCompression', popularity: 7, description: 'Comprimere il contesto per rientrare nella finestra di token', alternatives: 'Summarization, Token merging, Key info extraction', category: 'Optimization' },
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
      { name: 'Debugging\nTools', popularity: 7, description: 'Tool per ispezionare e debuggare il comportamento dell\'agente', alternatives: 'Replay tools, Inspector UI, Trace viewers', category: 'Debug' },
      { name: 'Safety &\nGuardrails', popularity: 7, description: 'Meccanismi per prevenire comportamenti indesiderati', alternatives: 'Input/output filtering, Permission systems, Approval flows, Geordie AI', category: 'Safety' },
      { name: 'Agent\nGovernance', popularity: 6, description: 'Framework di governance per deployment sicuro di agenti AI in produzione', alternatives: 'WEF framework, Microsoft Power Platform governance, Collibra', category: 'Governance' },
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
    ],
  },
];

function getAreaPosition(index: number) {
  const col = index % 3;
  const row = Math.floor(index / 3);
  return { x: START_X + col * COL_STEP, y: START_Y + row * ROW_STEP };
}

function getBubbleEmoji(areaName: string, category: string): string {
  const key = `${areaName} ${category}`.toLowerCase();
  if (key.includes('memory')) return '🧠';
  if (key.includes('tool') || key.includes('action')) return '🛠️';
  if (key.includes('prompt')) return '✍️';
  if (key.includes('orchestr') || key.includes('workflow') || key.includes('routing')) return '🧭';
  if (key.includes('model') || key.includes('inference') || key.includes('llm')) return '🤖';
  if (key.includes('skill') || key.includes('plugin')) return '🧩';
  if (key.includes('observ') || key.includes('debug') || key.includes('trace')) return '👀';
  if (key.includes('infrastruct') || key.includes('container') || key.includes('cloud')) return '🏗️';
  if (key.includes('retriev') || key.includes('rag') || key.includes('knowledge')) return '📚';
  if (key.includes('framework')) return '⚙️';
  if (key.includes('automation')) return '🚀';
  if (key.includes('protocol')) return '🔌';
  return '•';
}

function getMacroareaEmoji(areaName: string): string {
  const key = areaName.toLowerCase();
  if (key.includes('memory')) return '🧠';
  if (key.includes('tools') || key.includes('actions')) return '🛠️';
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
  if (count <= 6) return 3;
  if (count <= 10) return 4;
  return Math.min(6, Math.max(4, Math.ceil(Math.sqrt(count * 1.2))));
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

function drawProjectWeightRing(
  graphics: Graphics,
  radius: number,
  color: string,
  referenceCount: number,
) {
  const { filledSegments, totalSegments, emphasis } = getProjectWeightStyle(referenceCount);
  const ringRadius = radius + 9;
  const ringWidth = 3.2;
  const segmentSpan = (Math.PI * 2) / totalSegments;
  const gap = segmentSpan * 0.28;
  const segmentArc = segmentSpan - gap;

  graphics.clear();
  graphics.moveTo(ringRadius, 0);
  graphics.arc(0, 0, ringRadius, 0, Math.PI * 2);
  graphics.stroke({ color: '#ffffff', width: ringWidth + 1.5, alpha: BUBBLE_TRACK_ALPHA, cap: 'round' });

  for (let i = 0; i < totalSegments; i++) {
    const start = -Math.PI / 2 + i * segmentSpan + gap / 2;
    const end = start + segmentArc;
    graphics.moveTo(Math.cos(start) * ringRadius, Math.sin(start) * ringRadius);
    graphics.arc(0, 0, ringRadius, start, end);
    graphics.stroke({
      color,
      width: i < filledSegments ? ringWidth + (i === filledSegments - 1 ? 0.2 : 0) : ringWidth - 0.4,
      alpha: i < filledSegments ? 0.34 + emphasis : 0.08,
      cap: 'round',
    });
  }
}

function layoutBubbles(concepts: ConceptData[], ax: number, ay: number) {
  const n = concepts.length;
  const padX = 30;
  const padY = 20;
  const headerH = 38;
  const availW = AREA_WIDTH - padX * 2;
  const availH = AREA_HEIGHT - headerH - padY * 2;

  const items = concepts.map((c) => ({
    concept: c,
    radius: BUBBLE_RADIUS,
  }));
  const cols = getBubbleColumns(n);

  const rows = Math.ceil(n / cols);
  const cellW = availW / cols;
  const cellH = availH / rows;

  // Bubbles are intentionally equal-size; only the grid layout adapts.

  const offX = ax + padX;
  const offY = ay + headerH + padY;

  return items.map((it, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const itemsInRow = row === rows - 1 ? n - row * cols : cols;
    const rowOffsetX = itemsInRow < cols ? ((cols - itemsInRow) * cellW) / 2 : 0;

    return {
      concept: it.concept,
      x: offX + rowOffsetX + cellW * col + cellW / 2,
      y: offY + cellH * row + cellH / 2,
      radius: it.radius,
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
  introIndex: number;
  searchHighlight: boolean;
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
  _screenH: number,
  world: Container,
  onNavigate: (targetWX: number, targetWY: number) => void,
): Container {
  const mmW = 180;
  const mmH = _screenH > 300 ? 110 : 70;
  const mmPad = 12;
  const mmX = screenW - mmW - mmPad;
  const mmY = _screenH - mmH - mmPad;

  const mm = new Container();
  mm.label = 'minimap';

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
    const vh = (_screenH / world.scale.y) * scale;
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

function createSearchBar(): {
  container: Container;
  bg: Graphics;
  textDisplay: Text;
  placeholder: Text;
  clearBtn: Container;
  matchLabel: Text;
  iconGfx: Graphics;
} {
  const w = 300;
  const h = 38;
  const pad = 12;

  const container = new Container();
  container.eventMode = 'static';
  container.cursor = 'text';

  const shadow = new Graphics();
  shadow.roundRect(2, 3, w, h, 12);
  shadow.fill({ color: '#000000', alpha: 0.06 });
  shadow.eventMode = 'none';
  container.addChild(shadow);

  const bg = new Graphics();
  bg.roundRect(0, 0, w, h, 12);
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

  return { container, bg, textDisplay, placeholder, clearBtn, matchLabel, iconGfx };
}

function createLegend(onAreaClick: (areaIndex: number) => void): Container {
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
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
      });

      if (destroyed) { app.destroy(true); return; }

      const el = containerRef.current;
      if (!el) { app.destroy(true); return; }

      app.canvas.style.display = 'block';
      app.canvas.style.touchAction = 'none';
      el.appendChild(app.canvas);

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
            fontFamily: '"Inter", sans-serif',
            fontSize: 15,
          }),
        });
        areaEmoji.x = 18;
        areaEmoji.y = 9;
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
        label.y = 10;
        areaContainer.addChild(label);

        const conceptCount = new Text({
          text: `${area.concepts.length} subsections`,
          style: new TextStyle({
            fontFamily: '"Inter", sans-serif',
            fontSize: 10,
            fill: area.color,
          }),
        });
        conceptCount.alpha = 0.6;
        conceptCount.x = 42;
        conceptCount.y = 30;
        areaContainer.addChild(conceptCount);

        const bubbles = layoutBubbles(area.concepts, pos.x, pos.y);

        for (const { concept, x, y, radius } of bubbles) {
          const bx = x - pos.x;
          const by = y - pos.y;
          const referenceCount = getReferenceCount(concept.alternatives);

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
          bubble.fill({ color: '#ffffff', alpha: BUBBLE_FILL_ALPHA });
          bubble.circle(0, 0, radius);
          bubble.stroke({ color: area.color, width: 1.5, alpha: 0.54 });
          bubble.circle(0, 0, radius - 5);
          bubble.fill({ color: area.border, alpha: BUBBLE_INNER_ALPHA });
          bubble.eventMode = 'none';
          bubbleContainer.addChild(bubble);

          const emoji = getBubbleEmoji(area.name, concept.category);
          const emojiBack = new Graphics();
          emojiBack.circle(0, -radius * 0.36, 15.5);
          emojiBack.fill({ color: '#ffffff', alpha: 0.78 });
          emojiBack.stroke({ color: area.color, width: 1, alpha: 0.18 });
          emojiBack.eventMode = 'none';
          bubbleContainer.addChild(emojiBack);

          const emojiText = new Text({
            text: emoji,
            style: new TextStyle({
              fontFamily: EMOJI_FONT_FAMILY,
              fontSize: 24,
              fontWeight: 'bold',
            }),
          });
          emojiText.anchor.set(0.5);
          emojiText.y = -radius * 0.36;
          bubbleContainer.addChild(emojiText);

          const fontSize = getBubbleFontSize(concept.name, radius);
          const bText = new Text({
            text: getBubbleLabel(concept.name),
            style: new TextStyle({
              fontFamily: '"Inter", sans-serif',
              fontSize,
              fontWeight: 'bold',
              fill: '#1f2937',
              align: 'center',
              wordWrap: true,
              wordWrapWidth: radius * 1.45,
              lineHeight: fontSize + 2,
            }),
          });
          bText.anchor.set(0.5);
          bText.y = radius * 0.11;
          bubbleContainer.addChild(bText);

          const badge = new Container();
          badge.x = radius * 0.5;
          badge.y = radius * 0.5;
          const badgeBg = new Graphics();
          badgeBg.roundRect(-13, -8, 26, 16, 8);
          badgeBg.fill({ color: area.color, alpha: 0.16 });
          badgeBg.stroke({ color: area.color, width: 1, alpha: 0.36 });
          badge.addChild(badgeBg);
          const badgeTxt = new Text({
            text: `${referenceCount}`,
            style: new TextStyle({
              fontFamily: '"Inter", sans-serif',
              fontSize: 9,
              fontWeight: 'bold',
              fill: area.color,
            }),
          });
          badgeTxt.anchor.set(0.5);
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
            introIndex: 0,
            searchHighlight: false,
          };

          bubbleContainer.on('pointerover', (e) => {
            state.targetScale = 1.06;
            state.weightRing.alpha = 1;
            glow.clear();
            glow.circle(0, 0, radius + 14);
            glow.fill({ color: area.color, alpha: 0.08 });
            glow.circle(0, 0, radius + 7);
            glow.fill({ color: area.color, alpha: 0.15 });
            showTooltip(`${emoji} ${concept.name}`, concept.category, referenceCount, e.globalX, e.globalY);
          });
          bubbleContainer.on('pointerout', () => {
            state.targetScale = 1;
            state.weightRing.alpha = 0.92;
            glow.clear();
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
      });
      app.stage.addChild(minimap);

      const zoomContainer = new Container();
      zoomContainer.x = 20;
      zoomContainer.y = window.innerHeight - 196;
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

      const searchBar = createSearchBar();
      searchBar.container.x = (window.innerWidth - 300) / 2;
      searchBar.container.y = 14;
      app.stage.addChild(searchBar.container);

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
        if (panel) return;
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
        searchBar.bg.roundRect(0, 0, 300, 38, 12);
        searchBar.bg.fill({ color: '#ffffff', alpha: 1 });
        searchBar.bg.stroke({ color: '#93c5fd', width: 1.5 });
      });

      hiddenInput.addEventListener('blur', () => {
        searchActive = false;
        searchBar.bg.clear();
        searchBar.bg.roundRect(0, 0, 300, 38, 12);
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
          const name = s.concept.name.replace(/\n/g, ' ').toLowerCase();
          const desc = s.concept.description.toLowerCase();
          const matched = name.includes(q) || desc.includes(q);
          if (matched) {
            s.baseAlpha = 1;
            s.searchHighlight = true;
            matchCount++;
            const areaIdx = MACROAREAS.indexOf(s.macroarea);
            if (areaIdx >= 0) areaMatchFlags[areaIdx] = true;
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

      let panel: Container | null = null;
      let panelFadeDir: number = 0;
      let panelCard: Container | null = null;

      function closePanel() {
        if (!panel || panelFadeDir === -1) return;
        panelFadeDir = -1;
        hideTooltip();
      }

      function openPanel(data: { concept: ConceptData; macroarea: MacroareaConfig }) {
        const loweredQuery = searchQuery.toLowerCase().trim();
        const loweredName = data.concept.name.replace(/\n/g, ' ').toLowerCase();
        const loweredDesc = data.concept.description.toLowerCase();
        if (loweredName.includes(loweredQuery) || loweredDesc.includes(loweredQuery) || !loweredQuery) {
          // ok to open
        } else {
          return;
        }
        hideTooltip();
        if (panel) {
          app.stage.removeChild(panel);
          panel.destroy({ children: true });
          panel = null;
        }
        panelFadeDir = 0;

        const pw = 400;
        const ph = 310;
        const pad = 22;
        const sw = window.innerWidth;
        const sh = window.innerHeight;
        const px = Math.max(10, Math.min(sw - pw - 10, (sw - pw) / 2));
        const py = Math.max(10, Math.min(sh - ph - 10, (sh - ph) / 2));

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
        cardShadow.roundRect(3, 6, pw, ph, 16);
        cardShadow.fill({ color: '#000000', alpha: 0.08 });
        cardShadow.eventMode = 'none';
        card.addChild(cardShadow);

        const cardBg = new Graphics();
        cardBg.roundRect(0, 0, pw, ph, 16);
        cardBg.fill({ color: '#ffffff' });
        cardBg.stroke({ color: '#e5e7eb', width: 1 });
        cardBg.eventMode = 'none';
        card.addChild(cardBg);

        const accentBar = new Graphics();
        accentBar.roundRect(0, 0, pw, 5, 16);
        accentBar.fill({ color: data.macroarea.color, alpha: 0.8 });
        accentBar.eventMode = 'none';
        card.addChild(accentBar);

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

        let cy = pad + 6;

        const title = new Text({
          text: data.concept.name.replace(/\n/g, ' '),
          style: new TextStyle({
            fontFamily: '"Inter", sans-serif',
            fontSize: 18,
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
          text: data.macroarea.name,
          style: new TextStyle({
            fontFamily: '"Inter", sans-serif',
            fontSize: 11,
            fontWeight: 'bold',
            fill: data.macroarea.color,
          }),
        });
        const badgeBgGfx = new Graphics();
        badgeBgGfx.roundRect(pad - 4, cy - 3, badgeTxt.width + 10, badgeTxt.height + 6, 5);
        badgeBgGfx.fill({ color: data.macroarea.color, alpha: 0.1 });
        badgeBgGfx.eventMode = 'none';
        card.addChild(badgeBgGfx);
        badgeTxt.x = pad + 1;
        badgeTxt.y = cy;
        card.addChild(badgeTxt);
        cy += 26;

        const desc = new Text({
          text: data.concept.description,
          style: new TextStyle({
            fontFamily: '"Inter", sans-serif',
            fontSize: 13,
            fill: '#4b5563',
            wordWrap: true,
            wordWrapWidth: pw - pad * 2,
            lineHeight: 20,
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
          text: `${getReferenceCount(data.concept.alternatives)} refs`,
          style: new TextStyle({
            fontFamily: '"Inter", sans-serif',
            fontSize: 11,
            fontWeight: 'bold',
            fill: data.macroarea.color,
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

        const referenceCount = getReferenceCount(data.concept.alternatives);
        const maxReferenceCount = 8;
        const fillW = Math.max(barH, (Math.min(referenceCount, maxReferenceCount) / maxReferenceCount) * barW);
        const barFill = new Graphics();
        barFill.roundRect(pad, cy, fillW, barH, 3);
        barFill.fill({ color: data.macroarea.color, alpha: 0.65 });
        barFill.eventMode = 'none';
        card.addChild(barFill);
        cy += barH + 16;

        const catTxt = new Text({
          text: `Category: ${data.concept.category}`,
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
          text: data.concept.alternatives,
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
          openPanel({ concept: s.concept, macroarea: s.macroarea });
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
        const dpr = window.devicePixelRatio || 1;
        app.renderer.resize(window.innerWidth * dpr, window.innerHeight * dpr);
        app.canvas.width = window.innerWidth * dpr;
        app.canvas.height = window.innerHeight * dpr;
        app.canvas.style.width = `${window.innerWidth}px`;
        app.canvas.style.height = `${window.innerHeight}px`;
        app.stage.hitArea = new Rectangle(0, 0, window.innerWidth, window.innerHeight);
        needsGridRedraw = true;
        minimap.x = window.innerWidth - minimap.width - 12;
        minimap.y = window.innerHeight - minimap.height - 12;
        zoomContainer.x = 20;
        zoomContainer.y = window.innerHeight - 196;
        searchBar.container.x = (window.innerWidth - 300) / 2;
        searchBar.container.y = 14;
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

  return <div ref={containerRef} className="w-full h-screen overflow-hidden" />;
}
