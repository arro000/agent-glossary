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
  const cols = Math.ceil(Math.sqrt(n));
  const rows = Math.ceil(n / cols);
  const padX = 30;
  const padY = 16;
  const headerH = 38;
  const availW = AREA_WIDTH - padX * 2;
  const availH = AREA_HEIGHT - headerH - padY * 2;
  const cellW = availW / cols;
  const cellH = availH / rows;

  return concepts.map((c, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const r = getRadius(c.popularity);
    return {
      concept: c,
      x: ax + padX + cellW * col + cellW / 2,
      y: ay + headerH + padY + cellH * row + cellH / 2,
      radius: r,
    };
  });
}

export default function Whiteboard() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let destroyed = false;
    let cleanup: (() => void) | null = null;

    (async () => {
      await document.fonts.load('600 12px "Inter"').catch(() => {});

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

      // Grid
      const grid = new Graphics();
      const gMin = -2000;
      const gMax = 6000;
      for (let x = gMin; x <= gMax; x += GRID_SIZE) {
        grid.moveTo(x, gMin);
        grid.lineTo(x, gMax);
      }
      for (let y = gMin; y <= gMax; y += GRID_SIZE) {
        grid.moveTo(gMin, y);
        grid.lineTo(gMax, y);
      }
      grid.stroke({ color: GRID_COLOR, width: 0.5 });
      grid.eventMode = 'none';
      world.addChild(grid);

      // Macroareas & Bubbles
      const bubbleMap = new Map<Container, { concept: ConceptData; macroarea: MacroareaConfig }>();

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
          bubble.fill({ color: area.border, alpha: 0.5 });
          bubble.stroke({ color: area.color, width: 1.5, alpha: 0.6 });
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

          bubbleContainer.on('pointerover', () => {
            glow.clear();
            glow.circle(0, 0, radius + 12);
            glow.fill({ color: area.color, alpha: 0.1 });
            glow.circle(0, 0, radius + 6);
            glow.fill({ color: area.color, alpha: 0.18 });
            bubbleContainer.scale.set(1.06);
          });
          bubbleContainer.on('pointerout', () => {
            glow.clear();
            bubbleContainer.scale.set(1);
          });

          areaContainer.addChild(bubbleContainer);
          bubbleMap.set(bubbleContainer, { concept, macroarea: area });
        }

        world.addChild(areaContainer);
      }

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
      }, { passive: false });

      // Detail panel
      let panel: Container | null = null;

      function closePanel() {
        if (panel) {
          app.stage.removeChild(panel);
          panel.destroy({ children: true });
          panel = null;
        }
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

        let cy = py + pad;

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
        app.stage.addChild(root);
      }

      for (const [bc, data] of bubbleMap) {
        bc.on('pointerdown', (e) => {
          e.stopPropagation();
          openPanel(data);
        });
      }

      // ESC to close
      const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closePanel(); };
      window.addEventListener('keydown', onKey);

      // Resize
      const onResize = () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        app.stage.hitArea = new Rectangle(0, 0, window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', onResize);

      cleanup = () => {
        window.removeEventListener('keydown', onKey);
        window.removeEventListener('resize', onResize);
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
