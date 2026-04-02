'use client';

import { useEffect, useRef } from 'react';
import {
  Application,
  Graphics,
  Text,
  Container,
  TextStyle,
  Rectangle,
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
const AREA_HEIGHT = 360;
const COL_GAP = 80;
const ROW_GAP = 50;
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
      { name: 'Persistent Memory', popularity: 9, description: 'Memory that persists across different agent sessions, enabling long-term knowledge retention.', alternatives: 'Vector DB (semantic), File-based (key-value), Context injection', category: 'Storage' },
      { name: 'Session Memory', popularity: 10, description: 'Current conversational context memory, maintaining the flow of interaction within a session.', alternatives: 'Context window, Summary compression, Sliding window', category: 'Runtime' },
      { name: 'Vector Database', popularity: 8, description: 'Database for semantic search on embeddings, powering RAG (Retrieval Augmented Generation).', alternatives: 'ChromaDB, Pinecone, Weaviate, Qdrant, Milvus, FAISS', category: 'Storage' },
      { name: 'Context Window\nManagement', popularity: 10, description: 'Managing the token limit of the model to fit all relevant information.', alternatives: 'Truncation, Summarization, Chunking, Hierarchical context', category: 'Runtime' },
      { name: 'Token Budget', popularity: 7, description: 'Dynamic allocation of tokens across system prompt, user input, and tool output.', alternatives: 'Fixed budget, Priority-based, Adaptive', category: 'Optimization' },
    ],
  },
  {
    name: 'Tools & Actions',
    color: '#10B981',
    bg: '#D1FAE5',
    border: '#6EE7B7',
    concepts: [
      { name: 'Code Execution\nSandbox', popularity: 9, description: 'Execute code in isolated environments (Python, Node, etc.) for safe testing.', alternatives: 'E2B, Modal, Docker sandbox, Jupyter kernel', category: 'Execution' },
      { name: 'Terminal/Shell\nAccess', popularity: 10, description: 'Direct access to the system shell for running arbitrary commands.', alternatives: 'Direct shell, PTY mode, SSH, Docker exec', category: 'System' },
      { name: 'File I/O', popularity: 10, description: 'Read, write, and search files in the project directory.', alternatives: 'read/write/search/patch tools', category: 'System' },
      { name: 'Web Search', popularity: 9, description: 'Search the internet for up-to-date information and documentation.', alternatives: 'Tavily, SerpAPI, Brave Search, Bing API, Firecrawl', category: 'Information' },
      { name: 'Browser\nAutomation', popularity: 8, description: 'Control a browser to interact with websites, fill forms, and extract data.', alternatives: 'Playwright, Puppeteer, Browserbase, Selenium', category: 'Interaction' },
      { name: 'MCP', popularity: 9, description: 'Model Context Protocol \u2014 standard protocol for connecting external tools to the agent.', alternatives: 'Function calling, REST APIs, gRPC', category: 'Integration' },
      { name: 'API Client', popularity: 8, description: 'HTTP calls to external APIs for integrating third-party services.', alternatives: 'fetch, axios, openapi clients, SDK wrappers', category: 'Integration' },
    ],
  },
  {
    name: 'Prompt Engineering',
    color: '#8B5CF6',
    bg: '#EDE9FE',
    border: '#C4B5FD',
    concepts: [
      { name: 'System Prompt', popularity: 10, description: "Base instructions that define the agent's personality, role, and behavior.", alternatives: 'Static system prompt, Dynamic assembly, Prompt templates', category: 'Core' },
      { name: 'Few-Shot\nExamples', popularity: 8, description: "Input/output examples to guide the model's response format and style.", alternatives: 'In-context learning, Dynamic few-shot, Retrieved examples', category: 'Technique' },
      { name: 'Chain-of-Thought', popularity: 9, description: 'Guide the model to reason step by step for complex problems.', alternatives: 'CoT prompting, Tree-of-Thought, Step-by-step, ReAct', category: 'Technique' },
      { name: 'Structured\nOutput', popularity: 9, description: 'Force the model to produce output in a specific format (JSON, XML, etc.).', alternatives: 'JSON mode, Function calling, Outlines, Guidance', category: 'Technique' },
      { name: 'Prompt Caching', popularity: 7, description: 'Cache static parts of the prompt to reduce cost and latency.', alternatives: 'Anthropic prompt caching, Semantic caching, KV cache', category: 'Optimization' },
      { name: 'Context\nCompression', popularity: 7, description: "Compress context to fit within the model's context window.", alternatives: 'Summarization, Token merging, Key info extraction', category: 'Optimization' },
    ],
  },
  {
    name: 'Orchestration',
    color: '#F97316',
    bg: '#FFEDD5',
    border: '#FDBA74',
    concepts: [
      { name: 'Agent Loop', popularity: 10, description: 'The think \u2192 act \u2192 observe cycle that is the foundation of every agent.', alternatives: 'ReAct, Plan-and-Execute, Function calling loop', category: 'Core' },
      { name: 'Multi-Agent', popularity: 8, description: 'Multiple agents collaborating or competing to complete a task.', alternatives: 'CrewAI, AutoGen, LangGraph, Swarm', category: 'Pattern' },
      { name: 'Task Planning', popularity: 8, description: 'Decompose a goal into executable sub-tasks with dependencies.', alternatives: 'Plan-and-Execute, Hierarchical planning, Reflexion', category: 'Strategy' },
      { name: 'Tool Routing', popularity: 8, description: 'Select the right tool based on the current context and task.', alternatives: 'LLM-based routing, Rule-based, Semantic matching', category: 'Strategy' },
      { name: 'Subagent\nDelegation', popularity: 7, description: 'Delegate sub-tasks to isolated secondary agents for parallel work.', alternatives: 'Claude Code, Codex CLI, OpenCode, Subprocess', category: 'Pattern' },
      { name: 'Cron/Scheduling', popularity: 6, description: 'Execute agent tasks on a scheduled basis (periodic or cron-based).', alternatives: 'APScheduler, Cron expressions, Event-driven', category: 'Automation' },
    ],
  },
  {
    name: 'Inference & Models',
    color: '#EF4444',
    bg: '#FEE2E2',
    border: '#FCA5A5',
    concepts: [
      { name: 'LLM Providers', popularity: 10, description: 'Providers of large language models (OpenAI, Anthropic, Google, etc.).', alternatives: 'OpenRouter, Together AI, Fireworks, Groq, DeepInfra', category: 'Infrastructure' },
      { name: 'Model Selection', popularity: 9, description: 'Choose the right model for each task based on cost, quality, and speed.', alternatives: 'Smart routing, Cost optimization, Quality/performance tradeoff', category: 'Strategy' },
      { name: 'Context Length', popularity: 8, description: "The model's context window size, ranging from 4k to 1M+ tokens.", alternatives: 'Extended context, Sliding window, Hierarchical memory', category: 'Constraint' },
      { name: 'Quantization', popularity: 7, description: 'Reduce model size for local deployment (GGUF, GPTQ, AWQ formats).', alternatives: 'GGUF/llama.cpp, vLLM, bitsandbytes, EXL2', category: 'Optimization' },
      { name: 'Streaming', popularity: 9, description: 'Real-time token-by-token output for responsive user experience.', alternatives: 'SSE, WebSocket, Server-Sent Events', category: 'UX' },
      { name: 'Embeddings', popularity: 8, description: 'Vector representations of text for semantic search and similarity.', alternatives: 'OpenAI ada-002, Cohere, BGE, Nomic, Jina', category: 'Representation' },
      { name: 'Reasoning\nModels', popularity: 9, description: 'Models with extended reasoning capabilities (o1, o3, DeepSeek-R1).', alternatives: 'OpenAI o1/o3, DeepSeek-R1, QwQ, Claude thinking', category: 'Architecture' },
    ],
  },
  {
    name: 'Skills & Plugins',
    color: '#14B8A6',
    bg: '#CCFBF1',
    border: '#5EEAD4',
    concepts: [
      { name: 'Skill System', popularity: 7, description: 'System of reusable skills/capabilities that extend agent functionality.', alternatives: 'Plugin architecture, Reusable prompts, Workflow templates', category: 'Architecture' },
      { name: 'Custom Tool\nCreation', popularity: 8, description: 'Allow users or agents to create new tools and integrate them.', alternatives: 'MCP servers, Function definitions, Script wrappers', category: 'Extensibility' },
      { name: 'Workflow\nAutomation', popularity: 7, description: 'Predefined chains of actions for recurring automated tasks.', alternatives: 'n8n, Zapier, Custom pipelines, DAG-based', category: 'Automation' },
      { name: 'PRD Generation', popularity: 6, description: 'Generate requirements documents from textual specifications.', alternatives: 'AI-assisted specs, Template-based, Manual + AI review', category: 'Planning' },
    ],
  },
  {
    name: 'Observability',
    color: '#EAB308',
    bg: '#FEF9C3',
    border: '#FACC15',
    concepts: [
      { name: 'Logging &\nTracing', popularity: 8, description: 'Track agent actions for debugging, auditing, and optimization.', alternatives: 'LangSmith, LangFuse, Weave, Phoenix, Custom logging', category: 'Monitoring' },
      { name: 'Cost Tracking', popularity: 8, description: 'Monitor token usage and costs per session or task.', alternatives: 'Usage dashboards, Token counting, Provider billing APIs', category: 'Monitoring' },
      { name: 'Evaluation &\nBenchmarks', popularity: 7, description: 'Evaluate agent performance on specific tasks and metrics.', alternatives: 'LM Eval Harness, Custom evals, A/B testing, Human eval', category: 'Quality' },
      { name: 'Debugging\nTools', popularity: 7, description: 'Inspect and debug agent behavior with replay and trace viewers.', alternatives: 'Replay tools, Inspector UI, Trace viewers', category: 'Debug' },
      { name: 'Safety &\nGuardrails', popularity: 7, description: 'Mechanisms to prevent undesired or harmful behavior.', alternatives: 'Input/output filtering, Permission systems, Approval flows', category: 'Safety' },
    ],
  },
  {
    name: 'Infrastructure',
    color: '#6366F1',
    bg: '#E0E7FF',
    border: '#A5B4FC',
    concepts: [
      { name: 'Docker &\nContainers', popularity: 9, description: 'Isolated environments for code execution and deployment.', alternatives: 'Docker, Podman, Containerd, Kubernetes', category: 'Runtime' },
      { name: 'GPU Cloud', popularity: 7, description: 'Cloud platforms with GPU access for training and inference.', alternatives: 'Modal, RunPod, Lambda Labs, Vast.ai, AWS, GCP', category: 'Compute' },
      { name: 'Serverless', popularity: 6, description: 'Serverless execution for lightweight agent functions.', alternatives: 'AWS Lambda, Cloudflare Workers, Vercel Edge, Netlify Functions', category: 'Runtime' },
      { name: 'CI/CD', popularity: 8, description: 'Automated pipelines for testing, building, and deploying.', alternatives: 'GitHub Actions, GitLab CI, CircleCI, ArgoCD', category: 'Automation' },
      { name: 'Git Integration', popularity: 9, description: 'The agent works directly in the git repository.', alternatives: 'gh CLI, git commands, PR automation, Code review bots', category: 'Workflow' },
      { name: 'Environment\nManagement', popularity: 7, description: 'Manage different development environments (local, remote, sandbox).', alternatives: 'Devcontainers, SSH remotes, Daytona, E2B, Modal', category: 'Runtime' },
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

  const items = concepts.map((c, i) => ({
    concept: c,
    radius: getRadius(c.popularity),
    index: i,
  }));

  const totalArea = items.reduce((s, it) => s + Math.PI * it.radius * it.radius, 0);
  const packingDensity = 0.55;
  const neededW = Math.sqrt(totalArea / packingDensity) * 1.1;
  const neededH = Math.sqrt((totalArea / packingDensity) * (availH / availW)) * 1.1;

  const fitW = Math.min(neededW, availW);
  const fitH = Math.min(neededH, availH);

  const offX = ax + padX + (availW - fitW) / 2;
  const offY = ay + headerH + padY + (availH - fitH) / 2;

  const cols = Math.ceil(Math.sqrt(n * (fitW / fitH)));
  const rows = Math.ceil(n / cols);
  const cellW = fitW / cols;
  const cellH = fitH / rows;

  return items.map((it, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const isLastCol = col === cols - 1;
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
  app: Application,
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

  return mm;
}

export default function Whiteboard() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let destroyed = false;
    let cleanup: (() => void) | null = null;

    (async () => {
      await document.fonts.load('600 12px "Inter"').catch(() => {});
      await document.fonts.load('700 12px "Inter"').catch(() => {});

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
      world.x = Math.max(20, (window.innerWidth - totalW) / 2);
      world.y = Math.max(20, (window.innerHeight - totalH) / 2);

      app.stage.addChild(world);

      const worldBounds = { x: 0, y: 0, w: totalW, h: totalH };

      // Dynamic grid
      const grid = new Graphics();
      grid.eventMode = 'none';
      world.addChildAt(grid, 0);
      redrawGrid(grid, world, window.innerWidth, window.innerHeight);

      // Macroareas & Bubbles
      const bubbleStates: BubbleState[] = [];

      for (let i = 0; i < MACROAREAS.length; i++) {
        const area = MACROAREAS[i];
        const pos = getAreaPosition(i);

        const areaContainer = new Container();
        areaContainer.x = pos.x;
        areaContainer.y = pos.y;

        // Shadow
        const shadow = new Graphics();
        shadow.roundRect(3, 4, AREA_WIDTH, AREA_HEIGHT, 12);
        shadow.fill({ color: '#000000', alpha: 0.04 });
        shadow.eventMode = 'none';
        areaContainer.addChild(shadow);

        // Background
        const bgGfx = new Graphics();
        bgGfx.roundRect(0, 0, AREA_WIDTH, AREA_HEIGHT, 12);
        bgGfx.fill({ color: area.bg, alpha: 0.55 });
        bgGfx.stroke({ color: area.border, width: 1.5 });
        bgGfx.eventMode = 'none';
        areaContainer.addChild(bgGfx);

        // Label
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

        // Bubbles
        const bubbles = layoutBubbles(area.concepts, pos.x, pos.y);

        for (const { concept, x, y, radius } of bubbles) {
          const bx = x - pos.x;
          const by = y - pos.y;

          const bubbleContainer = new Container();
          bubbleContainer.x = bx;
          bubbleContainer.y = by;
          bubbleContainer.eventMode = 'static';
          bubbleContainer.cursor = 'pointer';

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

          const fontSize = Math.max(8, Math.round(radius * 0.22));
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
            state.targetScale = 1.08;
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

      // Smooth animation ticker
      let needsGridRedraw = false;
      app.ticker.add(() => {
        let anyChanged = false;
        for (const s of bubbleStates) {
          if (Math.abs(s.currentScale - s.targetScale) > 0.001) {
            s.currentScale += (s.targetScale - s.currentScale) * 0.18;
            s.container.scale.set(s.currentScale);
            anyChanged = true;
          }
        }
        if (needsGridRedraw) {
          redrawGrid(grid, world, app.renderer.width / (window.devicePixelRatio || 1), app.renderer.height / (window.devicePixelRatio || 1));
          needsGridRedraw = false;
        }
        if (minimapViewport) {
          updateMinimapViewport();
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

      // Minimap
      let minimapViewport: Graphics | null = null;
      let updateMinimapViewport: () => void = () => {};

      const minimap = createMinimap(worldBounds, window.innerWidth, window.innerHeight, world, app);
      minimapViewport = minimap.children[minimap.children.length - 1] as Graphics;

      updateMinimapViewport = () => {
        minimapViewport?.clear();
        const mmW = 180;
        const mmH = 110;
        const scaleX = mmW / worldBounds.w;
        const scaleY = mmH / worldBounds.h;
        const scale = Math.min(scaleX, scaleY) * 0.9;
        const offsetX = (mmW - worldBounds.w * scale) / 2;
        const offsetY = (mmH - worldBounds.h * scale) / 2;

        const sw = window.innerWidth;
        const sh = window.innerHeight;
        const vx = (-world.x / world.scale.x - worldBounds.x) * scale + offsetX;
        const vy = (-world.y / world.scale.y - worldBounds.y) * scale + offsetY;
        const vw = (sw / world.scale.x) * scale;
        const vh = (sh / world.scale.y) * scale;
        minimapViewport!.rect(vx, vy, vw, vh);
        minimapViewport!.fill({ color: '#3b82f6', alpha: 0.08 });
        minimapViewport!.stroke({ color: '#3b82f6', width: 1, alpha: 0.5 });
      };

      app.stage.addChild(minimap);

      // Detail panel
      let panel: Container | null = null;
      let panelAlpha = 0;
      let panelAnimating = false;

      function closePanel() {
        if (!panel) return;
        app.stage.removeChild(panel);
        panel.destroy({ children: true });
        panel = null;
        panelAlpha = 0;
        panelAnimating = false;
      }

      function openPanel(data: { concept: ConceptData; macroarea: MacroareaConfig }) {
        closePanel();
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

        // Top accent bar
        const accentBar = new Graphics();
        accentBar.roundRect(px, py, pw, 5, 16);
        accentBar.fill({ color: data.macroarea.color, alpha: 0.8 });
        accentBar.eventMode = 'none';
        root.addChild(accentBar);

        // Close btn
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

        // Title
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

        // Macroarea badge
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

        // Description
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

        // Popularity
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

        // Category
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

        // Alternatives
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
        panelAlpha = 0;
        panelAnimating = true;
        app.stage.addChild(root);
      }

      for (const s of bubbleStates) {
        s.container.on('pointerdown', (e) => {
          e.stopPropagation();
          openPanel({ concept: s.concept, macroarea: s.macroarea });
        });
      }

      // Panel fade-in ticker
      const panelFadeFn = () => {
        if (!panelAnimating || !panel) return;
        panelAlpha += 0.08;
        if (panelAlpha >= 1) {
          panelAlpha = 1;
          panelAnimating = false;
        }
        panel.alpha = panelAlpha;
      };
      app.ticker.add(panelFadeFn);

      // ESC to close
      const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closePanel(); };
      window.addEventListener('keydown', onKey);

      // Resize
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
      };
      window.addEventListener('resize', onResize);

      cleanup = () => {
        window.removeEventListener('keydown', onKey);
        window.removeEventListener('resize', onResize);
        app.ticker.remove(panelFadeFn);
        closePanel();
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
