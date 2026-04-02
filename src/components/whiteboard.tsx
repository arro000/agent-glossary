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
const MIN_RADIUS = 24;
const MAX_RADIUS = 62;

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
      { name: 'Temporal\nMemory', popularity: 7, description: 'Memoria che traccia come i fatti cambiano nel tempo con finestre di validità', alternatives: 'Graphiti, Zep, knowledge graphs con validità temporale', category: 'Storage' },
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
      { name: 'MCP', popularity: 9, description: 'Model Context Protocol — protocollo standard per tool esterni (Linux Foundation)', alternatives: 'REST APIs, gRPC, OpenAI function calling, A2A', category: 'Integration' },
      { name: 'A2A', popularity: 9, description: 'Agent-to-Agent Protocol — comunicazione tra agenti AI indipendenti (Linux Foundation)', alternatives: 'MCP (complementare), custom gRPC/REST, LangGraph inter-agent channels', category: 'Integration' },
      { name: 'API Client', popularity: 8, description: 'Chiamate HTTP a API esterne per integrare servizi', alternatives: 'fetch, axios, openapi clients, SDK wrappers', category: 'Integration' },
    ],
  },
  {
    name: 'Prompt Engineering',
    color: '#8B5CF6',
    bg: '#EDE9FE',
    border: '#C4B5FD',
    concepts: [
      { name: 'System\nPrompt', popularity: 10, description: 'Istruzioni di base che definiscono personalità e comportamento dell\'agente', alternatives: 'Static system prompt, Dynamic assembly, Prompt templates', category: 'Core' },
      { name: 'Few-Shot\nExamples', popularity: 8, description: 'Esempi di input/output per guidare il modello', alternatives: 'In-context learning, Dynamic few-shot, Retrieved examples', category: 'Technique' },
      { name: 'Chain-of-\nThought', popularity: 9, description: 'Guidare il modello a ragionare passo per passo', alternatives: 'CoT prompting, Tree-of-Thought, Step-by-step, RepAct', category: 'Technique' },
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
      { name: 'Agent\nLoop', popularity: 10, description: 'Ciclo pensa→azione→osserva alla base di ogni agente', alternatives: 'RepAct, Plan-and-Execute, Function calling loop', category: 'Core' },
      { name: 'Prompt\nChaining', popularity: 10, description: 'Decomposizione sequenziale dove ogni chiamata LLM processa l\'output della precedente', alternatives: 'Sequential Workflow (AutoGen), Sequential Process (CrewAI), LangGraph chain', category: 'Workflow' },
      { name: 'Routing', popularity: 9, description: 'Classifica l\'input e lo dirige a un processo downstream specializzato', alternatives: 'Selector Group Chat (AutoGen), conditional branching (LangGraph), tool routing', category: 'Workflow' },
      { name: 'Parallel\nization', popularity: 8, description: 'Sectioning o Voting: scomporre in sotto-task paralleli o eseguire più volte', alternatives: 'Fan-out/fan-in (LangGraph), Concurrent Agents (AutoGen)', category: 'Workflow' },
      { name: 'Orchestrator\nWorkers', popularity: 9, description: 'LLM centrale decompongono task e delega a worker, poi sintetizza risultati', alternatives: 'Hierarchical Process (CrewAI), Magentic-One (AutoGen), LangGraph subgraphs', category: 'Workflow' },
      { name: 'Evaluator\nOptimizer', popularity: 8, description: 'Un LLM genera output mentre un altro valuta e fornisce feedback in un loop', alternatives: 'Multi-Agent Debate (AutoGen), Reflection pattern, code review agents', category: 'Workflow' },
      { name: 'Handoffs /\nSwarm', popularity: 9, description: 'Agenti trasferiscono controllo ad altri agenti tramite function returns', alternatives: 'AutoGen Swarm, LangGraph edge transitions, A2A task delegation', category: 'Coordination' },
      { name: 'GraphFlow /\nState Machine', popularity: 9, description: 'Agenti e tools come nodi in un grafo diretto con stato e routing condizionale', alternatives: 'Temporal workflows, Prefect DAGs, Step Functions', category: 'Orchestration' },
      { name: 'Multi-\nAgent', popularity: 8, description: 'Più agenti che collaborano o competono su un task', alternatives: 'CrewAI, AutoGen, LangGraph, Swarm', category: 'Pattern' },
      { name: 'Task\nPlanning', popularity: 8, description: 'Decomporre un obiettivo in sotto-task eseguibili', alternatives: 'Plan-and-Execute, Hierarchical planning, Reflexion', category: 'Strategy' },
      { name: 'Tool\nRouting', popularity: 8, description: 'Selezionare il tool giusto in base al contesto', alternatives: 'LLM-based routing, Rule-based, Semantic matching', category: 'Strategy' },
      { name: 'Subagent\nDelegation', popularity: 7, description: 'Delegare sotto-task a agenti secondari isolati', alternatives: 'Claude Code, Codex CLI, OpenCode, Subprocess', category: 'Pattern' },
      { name: 'HITL', popularity: 8, description: 'Pattern dove l\'agente richiede approvazione umana prima di azioni ad alto rischio', alternatives: 'OpenAI Agents SDK approval flow, HumanLayer, CAMEL Framework, Permit.io', category: 'Pattern' },
      { name: 'Async\nBackground', popularity: 7, description: 'Agenti che lavorano in cloud VM producendo risultati in modo asincrono', alternatives: 'Jules (Google), OpenAI Codex, Devin, GitHub Copilot Agent', category: 'Pattern' },
      { name: 'ACI', popularity: 7, description: 'Agent-Computer Interface — design dei tool per agenti come HCI per umani', alternatives: 'Function calling best practices, tool design guides', category: 'Methodology' },
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
      { name: 'Reasoning\nModels', popularity: 9, description: 'Modelli con capacità di ragionamento esteso (o1, o3, DeepSeek-R1)', alternatives: 'OpenAI o1/o3, DeepSeek-R1, QwQ, Claude thinking', category: 'Architecture' },
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
      { name: 'Observability\nPlatform', popularity: 9, description: 'Piattaforma completa per tracing, evaluation, prompt management e deployment', alternatives: 'Langfuse, LangSmith, Arize Phoenix, W&B Weave, Helicone', category: 'Monitoring' },
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
];

function getAreaPosition(index: number) {
  const col = index % 2;
  const row = Math.floor(index / 2);
  return { x: START_X + col * COL_STEP, y: START_Y + row * ROW_STEP };
}

function getRadius(popularity: number) {
  const t = (popularity - 6) / 4;
  return MIN_RADIUS + t * (MAX_RADIUS - MIN_RADIUS);
}

function layoutBubbles(concepts: ConceptData[], ax: number, ay: number) {
  const n = concepts.length;
  const padX = 30;
  const padY = 20;
  const headerH = 38;
  const availW = AREA_WIDTH - padX * 2;
  const availH = AREA_HEIGHT - headerH - padY * 2;

  let items = concepts.map((c) => ({
    concept: c,
    radius: getRadius(c.popularity),
  }));

  let cols: number;
  if (n <= 4) cols = n;
  else if (n <= 8) cols = Math.min(n, 5);
  else cols = 6;

  const rows = Math.ceil(n / cols);
  const cellW = availW / cols;
  const cellH = availH / rows;

  const maxDiameter = Math.max(...items.map((it) => it.radius * 2));
  const maxFit = Math.min(cellW, cellH) - 6;

  if (maxDiameter > maxFit && maxFit > 0) {
    const scale = maxFit / maxDiameter;
    items = items.map((it) => ({ ...it, radius: it.radius * scale }));
  }

  const offX = ax + padX;
  const offY = ay + headerH + padY;

  return items.map((it, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const isLastRow = row === rows - 1;
    const itemsInRow = isLastRow ? n - row * cols : cols;
    const rowOffsetX = isLastRow ? (cols - itemsInRow) * cellW / 2 : 0;

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
  bubble: Graphics;
  targetScale: number;
  currentScale: number;
  concept: ConceptData;
  macroarea: MacroareaConfig;
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

function createMinimap(
  worldBounds: { x: number; y: number; w: number; h: number },
  screenW: number,
  screenH: number,
  world: Container,
): Container {
  const mmW = 180;
  const mmH = 110;
  const mmPad = 12;
  const mmX = screenW - mmW - mmPad;
  const mmY = screenH - mmH - mmPad;

  const mm = new Container();
  mm.label = 'minimap';

  const bg = new Graphics();
  bg.roundRect(0, 0, mmW, mmH, 8);
  bg.fill({ color: '#ffffff', alpha: 0.85 });
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
    world.x = screenW / 2 - targetWX * world.scale.x;
    world.y = screenH / 2 - targetWY * world.scale.y;
  });

  (mm as unknown as Record<string, unknown>)._updateViewport = updateViewport;
  (mm as unknown as Record<string, unknown>)._scale = scale;
  (mm as unknown as Record<string, unknown>)._offsetX = offsetX;
  (mm as unknown as Record<string, unknown>)._offsetY = offsetY;

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

      const totalW = 2 * AREA_WIDTH + COL_GAP + START_X * 2;
      const totalH = 4 * AREA_HEIGHT + 3 * ROW_GAP + START_Y * 2;
      const worldBounds = { x: 0, y: 0, w: totalW, h: totalH };

      const fitScale = Math.min(1, Math.max(0.55, Math.min(
        (window.innerWidth - 40) / totalW,
        (window.innerHeight - 40) / totalH,
      )));

      world.scale.set(fitScale);
      world.x = Math.max(20, (window.innerWidth - totalW * fitScale) / 2);
      world.y = Math.max(20, (window.innerHeight - totalH * fitScale) / 2);

      app.stage.addChild(world);

      let needsGridRedraw = true;

      const grid = new Graphics();
      grid.eventMode = 'none';
      world.addChildAt(grid, 0);

      const bubbleStates: BubbleState[] = [];

      for (let i = 0; i < MACROAREAS.length; i++) {
        const area = MACROAREAS[i];
        const pos = getAreaPosition(i);

        const areaContainer = new Container();
        areaContainer.x = pos.x;
        areaContainer.y = pos.y;

        const shadow = new Graphics();
        shadow.roundRect(3, 4, AREA_WIDTH, AREA_HEIGHT, 12);
        shadow.fill({ color: '#000000', alpha: 0.04 });
        shadow.eventMode = 'none';
        areaContainer.addChild(shadow);

        const bgGfx = new Graphics();
        bgGfx.roundRect(0, 0, AREA_WIDTH, AREA_HEIGHT, 12);
        bgGfx.fill({ color: area.bg, alpha: 0.55 });
        bgGfx.stroke({ color: area.border, width: 1.5 });
        bgGfx.eventMode = 'none';
        areaContainer.addChild(bgGfx);

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
        label.x = 18;
        label.y = 10;
        areaContainer.addChild(label);

        const conceptCount = new Text({
          text: `${area.concepts.length} concepts`,
          style: new TextStyle({
            fontFamily: '"Inter", sans-serif',
            fontSize: 10,
            fill: area.color,
          }),
        });
        conceptCount.alpha = 0.6;
        conceptCount.x = 18;
        conceptCount.y = 30;
        areaContainer.addChild(conceptCount);

        const bubbles = layoutBubbles(area.concepts, pos.x, pos.y);

        for (const { concept, x, y, radius } of bubbles) {
          const bx = x - pos.x;
          const by = y - pos.y;

          const bubbleContainer = new Container();
          bubbleContainer.x = bx;
          bubbleContainer.y = by;
          bubbleContainer.eventMode = 'static';
          bubbleContainer.cursor = 'pointer';

          const hitR = radius + 4;
          bubbleContainer.hitArea = new Circle(hitR, hitR, hitR);

          const glow = new Graphics();
          glow.eventMode = 'none';
          bubbleContainer.addChild(glow);

          const bubble = new Graphics();
          bubble.circle(0, 0, radius);
          bubble.fill({ color: '#ffffff', alpha: 0.6 });
          bubble.circle(0, 0, radius);
          bubble.stroke({ color: area.color, width: 1.5, alpha: 0.5 });
          bubble.circle(0, 0, radius - 4);
          bubble.fill({ color: area.border, alpha: 0.15 });
          bubble.eventMode = 'none';
          bubbleContainer.addChild(bubble);

          const fontSize = Math.max(8, Math.round(radius * 0.24));
          const bText = new Text({
            text: concept.name,
            style: new TextStyle({
              fontFamily: '"Inter", sans-serif',
              fontSize,
              fontWeight: 'bold',
              fill: '#1f2937',
              align: 'center',
              wordWrap: true,
              wordWrapWidth: radius * 1.4,
              lineHeight: fontSize + 3,
            }),
          });
          bText.anchor.set(0.5);
          bubbleContainer.addChild(bText);

          const state: BubbleState = {
            container: bubbleContainer,
            glow,
            bubble,
            targetScale: 1,
            currentScale: 1,
            concept,
            macroarea: area,
          };

          bubbleContainer.on('pointerover', () => {
            state.targetScale = 1.06;
            glow.clear();
            glow.circle(0, 0, radius + 14);
            glow.fill({ color: area.color, alpha: 0.08 });
            glow.circle(0, 0, radius + 7);
            glow.fill({ color: area.color, alpha: 0.15 });
          });
          bubbleContainer.on('pointerout', () => {
            state.targetScale = 1;
            glow.clear();
          });

          areaContainer.addChild(bubbleContainer);
          bubbleStates.push(state);
        }

        world.addChild(areaContainer);
      }

      function zoomToCenter(newScale: number) {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const wx = (cx - world.x) / world.scale.x;
        const wy = (cy - world.y) / world.scale.y;
        const ns = Math.max(0.2, Math.min(3, newScale));
        world.scale.set(ns);
        world.x = cx - wx * ns;
        world.y = cy - wy * ns;
        needsGridRedraw = true;
      }

      function zoomToFit() {
        const s = Math.min(1, Math.max(0.55, Math.min(
          (window.innerWidth - 40) / totalW,
          (window.innerHeight - 40) / totalH,
        )));
        zoomToCenter(s);
      }

      let minimapViewport: Graphics | null = null;
      const minimap = createMinimap(worldBounds, window.innerWidth, window.innerHeight, world);
      minimapViewport = minimap.children[minimap.children.length - 1] as Graphics;
      app.stage.addChild(minimap);

      const zoomContainer = new Container();
      zoomContainer.x = 20;
      zoomContainer.y = window.innerHeight - 180;
      zoomContainer.label = 'zoom-controls';

      const zoomBg = new Graphics();
      zoomBg.roundRect(0, 0, 40, 136, 10);
      zoomBg.fill({ color: '#ffffff', alpha: 0.85 });
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
      zoomLabel.y = 58;
      zoomContainer.addChild(zoomLabel);

      const plusBtn = createZoomBtn('+', () => {
        zoomToCenter(world.scale.x * 1.25);
      });
      plusBtn.x = 0;
      plusBtn.y = 72;
      zoomContainer.addChild(plusBtn);

      const fitBtn = createZoomBtn('\u2922', () => {
        zoomToFit();
      });
      fitBtn.x = 0;
      fitBtn.y = 88;
      zoomContainer.addChild(fitBtn);

      app.stage.addChild(zoomContainer);

      app.ticker.add(() => {
        for (const s of bubbleStates) {
          if (Math.abs(s.currentScale - s.targetScale) > 0.001) {
            s.currentScale += (s.targetScale - s.currentScale) * 0.18;
            s.container.scale.set(s.currentScale);
          }
        }
        if (needsGridRedraw) {
          redrawGrid(grid, world, app.renderer.width / (window.devicePixelRatio || 1), app.renderer.height / (window.devicePixelRatio || 1));
          needsGridRedraw = false;
        }
        if (minimapViewport) {
          const mmData = minimap as unknown as Record<string, unknown>;
          const updateFn = mmData._updateViewport as () => void;
          if (updateFn) updateFn();
        }
        zoomLabel.text = `${Math.round(world.scale.x * 100)}%`;

        if (panelFadeDir !== 0 && panel) {
          panel!.alpha += panelFadeDir * 0.1;
          if (panelFadeDir === 1 && panel!.alpha >= 1) {
            panel!.alpha = 1;
            panelFadeDir = 0;
          } else if (panelFadeDir === -1 && panel!.alpha <= 0) {
            app.stage.removeChild(panel!);
            panel!.destroy({ children: true });
            panel = null;
            panelFadeDir = 0;
          }
        }
      });

      // Zoom & Pan
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
        dragSX = e.clientX;
        dragSY = e.clientY;
        worldSX = world.x;
        worldSY = world.y;
        app.stage.cursor = 'grabbing';
      });

      app.stage.on('pointermove', (e) => {
        if (!dragging) return;
        world.x = worldSX + (e.clientX - dragSX);
        world.y = worldSY + (e.clientY - dragSY);
        needsGridRedraw = true;
      });

      const endDrag = () => {
        dragging = false;
        app.stage.cursor = 'grab';
      };
      app.stage.on('pointerup', endDrag);
      app.stage.on('pointerupoutside', endDrag);

      app.canvas.addEventListener('wheel', (e: WheelEvent) => {
        e.preventDefault();
        const factor = e.deltaY > 0 ? 0.92 : 1.08;
        const ns = Math.max(0.2, Math.min(3, world.scale.x * factor));
        const mx = e.clientX;
        const my = e.clientY;
        const wx = (mx - world.x) / world.scale.x;
        const wy = (my - world.y) / world.scale.y;
        world.scale.set(ns);
        world.x = mx - wx * ns;
        world.y = my - wy * ns;
        needsGridRedraw = true;
      }, { passive: false });

      // Detail panel
      let panel: Container | null = null;
      let panelFadeDir: number = 0;

      function closePanel() {
        if (!panel || panelFadeDir === -1) return;
        panelFadeDir = -1;
      }

      function openPanel(data: { concept: ConceptData; macroarea: MacroareaConfig }) {
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

        const cardShadow = new Graphics();
        cardShadow.roundRect(px + 3, py + 6, pw, ph, 16);
        cardShadow.fill({ color: '#000000', alpha: 0.08 });
        cardShadow.eventMode = 'none';
        root.addChild(cardShadow);

        const cardBg = new Graphics();
        cardBg.roundRect(px, py, pw, ph, 16);
        cardBg.fill({ color: '#ffffff' });
        cardBg.stroke({ color: '#e5e7eb', width: 1 });
        cardBg.eventMode = 'none';
        root.addChild(cardBg);

        const accentBar = new Graphics();
        accentBar.roundRect(px, py, pw, 5, 16);
        accentBar.fill({ color: data.macroarea.color, alpha: 0.8 });
        accentBar.eventMode = 'none';
        root.addChild(accentBar);

        const closeBtn = new Container();
        closeBtn.x = px + pw - 38;
        closeBtn.y = py + 12;
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
        root.addChild(closeBtn);

        let cy = py + pad + 6;

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
        title.x = px + pad;
        title.y = cy;
        root.addChild(title);
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
        const badgeBg = new Graphics();
        badgeBg.roundRect(px + pad - 4, cy - 3, badgeTxt.width + 10, badgeTxt.height + 6, 5);
        badgeBg.fill({ color: data.macroarea.color, alpha: 0.1 });
        badgeBg.eventMode = 'none';
        root.addChild(badgeBg);
        badgeTxt.x = px + pad + 1;
        badgeTxt.y = cy;
        root.addChild(badgeTxt);
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
        desc.x = px + pad;
        desc.y = cy;
        root.addChild(desc);
        cy += desc.height + 12;

        const popLbl = new Text({
          text: 'POPULARITY',
          style: new TextStyle({
            fontFamily: '"Inter", sans-serif',
            fontSize: 10,
            fontWeight: 'bold',
            fill: '#9ca3af',
            letterSpacing: 1,
          }),
        });
        popLbl.x = px + pad;
        popLbl.y = cy;
        root.addChild(popLbl);

        const popVal = new Text({
          text: `${data.concept.popularity}/10`,
          style: new TextStyle({
            fontFamily: '"Inter", sans-serif',
            fontSize: 11,
            fontWeight: 'bold',
            fill: data.macroarea.color,
          }),
        });
        popVal.anchor.set(1, 0);
        popVal.x = px + pw - pad;
        popVal.y = cy;
        root.addChild(popVal);
        cy += 18;

        const barW = pw - pad * 2;
        const barH = 6;
        const barBgGfx = new Graphics();
        barBgGfx.roundRect(px + pad, cy, barW, barH, 3);
        barBgGfx.fill({ color: '#f3f4f6' });
        barBgGfx.eventMode = 'none';
        root.addChild(barBgGfx);

        const fillW = Math.max(barH, (data.concept.popularity / 10) * barW);
        const barFill = new Graphics();
        barFill.roundRect(px + pad, cy, fillW, barH, 3);
        barFill.fill({ color: data.macroarea.color, alpha: 0.65 });
        barFill.eventMode = 'none';
        root.addChild(barFill);
        cy += barH + 16;

        const catTxt = new Text({
          text: `Category: ${data.concept.category}`,
          style: new TextStyle({
            fontFamily: '"Inter", sans-serif',
            fontSize: 12,
            fill: '#6b7280',
          }),
        });
        catTxt.x = px + pad;
        catTxt.y = cy;
        root.addChild(catTxt);
        cy += 22;

        const altLbl = new Text({
          text: 'ALTERNATIVES',
          style: new TextStyle({
            fontFamily: '"Inter", sans-serif',
            fontSize: 10,
            fontWeight: 'bold',
            fill: '#9ca3af',
            letterSpacing: 1,
          }),
        });
        altLbl.x = px + pad;
        altLbl.y = cy;
        root.addChild(altLbl);
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
        altTxt.x = px + pad;
        altTxt.y = cy;
        root.addChild(altTxt);

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
        if (e.key === 'Escape') closePanel();
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
        minimap.x = window.innerWidth - 180 - 12;
        minimap.y = window.innerHeight - 110 - 12;
        zoomContainer.x = 20;
        zoomContainer.y = window.innerHeight - 180;
      };
      window.addEventListener('resize', onResize);

      cleanup = () => {
        window.removeEventListener('keydown', onKey);
        window.removeEventListener('resize', onResize);
        if (panel) {
          app.stage.removeChild(panel);
          panel.destroy({ children: true });
          panel = null;
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
