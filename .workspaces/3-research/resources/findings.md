# Research Findings — Iteration 1 (2026-04-02)

---

# Coding Agent Frameworks & Tools

## Cursor
- **macroarea**: IDE
- **url**: https://www.cursor.com
- **description**: VS Code fork and the most popular AI-native IDE. Features Composer 2 (multi-file agent), Tab (specialized autocomplete model), Cloud Agents (autonomous execution on remote machines), code review (BugBot), Slack integration, and a plugin marketplace. Trusted by half the Fortune 500. Supports models from OpenAI, Anthropic, Gemini, xAI, and Cursor's own.
- **popularity**: 10
- **alternatives**: Windsurf, GitHub Copilot, Cline
- **why_include**: Market-leading AI IDE; multi-surface strategy (IDE, Slack, GitHub, CLI, mobile agent); SOC 2 certified enterprise ready

## Gemini CLI
- **macroarea**: CLI
- **url**: https://github.com/google-gemini/gemini-cli
- **description**: Google's open-source terminal AI agent. Notable for its generous free tier (1,000 requests/day, 60 req/min), 1M token context window, built-in Google Search grounding, MCP support, and GitHub Actions integration. 100k GitHub stars — the most starred of all coding agent tools.
- **popularity**: 10
- **alternatives**: Claude Code, Codex CLI, Aider
- **why_include**: Most starred coding agent tool; free tier is unmatched; Google Search grounding; Gemini 3 model access

## Claude Code
- **macroarea**: CLI / IDE
- **url**: https://docs.anthropic.com/en/docs/claude-code
- **description**: Anthropic's agentic coding tool available as a terminal CLI, VS Code/JetBrains extension, desktop app, and web interface. Features sub-agent orchestration, MCP support, scheduled tasks, CI/CD integration (GitHub Actions, GitLab), and cross-session memory via CLAUDE.md files.
- **popularity**: 9
- **alternatives**: Codex CLI, Aider, Gemini CLI, Cursor
- **why_include**: First-mover in the "agentic CLI" category; deep Anthropic ecosystem integration; cross-surface portability

## Codex CLI (OpenAI)
- **macroarea**: CLI
- **url**: https://github.com/openai/codex
- **description**: OpenAI's open-source coding agent CLI, written in Rust. Runs locally with ChatGPT account or API key. Available as terminal CLI, VS Code/Cursor/Windsurf IDE extension, and desktop app. Also has a cloud-based web version. 72.5k GitHub stars.
- **popularity**: 9
- **alternatives**: Claude Code, Gemini CLI, Aider
- **why_include**: 72.5k stars (highest among CLI tools); OpenAI-backed; Rust-native for speed; multi-surface availability

## Cline
- **macroarea**: IDE Extension
- **url**: https://github.com/cline/cline
- **description**: Autonomous coding agent that runs as a VS Code extension. Creates/edits files, runs terminal commands, uses a headless browser, and extends itself via MCP tool creation. Human-in-the-loop approval for every action. Supports any API provider and local models. 59.8k stars, now enterprise-ready with SSO/audit trails.
- **popularity**: 9
- **alternatives**: Cursor, Claude Code, Continue
- **why_include**: Most popular open-source IDE agent; model-agnostic; pioneered the "ask it to create its own MCP tools" pattern

## GitHub Copilot
- **macroarea**: IDE / Platform
- **url**: https://github.com/features/copilot
- **description**: Microsoft's AI pair programmer, now including Copilot Chat, Copilot Workspace (agent mode), and Copilot Agents. The most widely-adopted AI coding tool with millions of users. Recently added multi-file editing, agentic coding, and GitHub Actions integration.
- **popularity**: 10
- **alternatives**: Cursor, Windsurf, Codeium
- **why_include**: The incumbent giant; deepest IDE integration; enterprise standard; Copilot Agents brings it into the agentic era

## Aider
- **macroarea**: CLI
- **url**: https://github.com/paul-gauthier/aider
- **description**: Open-source AI pair programming tool that runs in the terminal. Maps entire codebases using tree-sitter, supports 100+ languages, integrates with git (auto-commits), and works with nearly any LLM (cloud and local). 5.7M+ pip installs, 42.7k GitHub stars.
- **popularity**: 8
- **alternatives**: Claude Code, Codex CLI, Gemini CLI
- **why_include**: The OG terminal coding agent; model-agnostic with best-in-class LLM support; pioneering repo-map architecture; free and open-source

## Devin (Cognition)
- **macroarea**: Platform
- **url**: https://devin.ai
- **description**: Fully autonomous AI software engineer from Cognition that operates as a cloud-based agent. Handles PR review, data engineering, code migrations, issue triage, and scheduled chores. Features multi-repo support, team scaling, and integrations with GitHub, Linear, Slack, Datadog. Can be fine-tuned for specific tasks.
- **popularity**: 8
- **alternatives**: Cursor Cloud Agents, GitHub Copilot Workspace
- **why_include**: The original "AI software engineer"; fully autonomous cloud agent; strongest enterprise case studies; fine-tuning capability

## Windsurf (Codeium/Cognition)
- **macroarea**: IDE
- **url**: https://codeium.com/windsurf
- **description**: The first "agentic IDE" (VS Code fork by Codeium, now owned by Cognition). Features Cascade (collaborative AI chat with full codebase awareness), Tab (autocomplete), live previews, MCP support, and linter integration. Claims 1M+ active users, 70M+ lines of AI-written code daily.
- **popularity**: 7
- **alternatives**: Cursor, GitHub Copilot, Cline
- **why_include**: Coined the "agentic IDE" term; strong enterprise penetration; acquired by Cognition (Devin's parent)

## Continue.dev
- **macroarea**: Platform (AI Quality Control)
- **url**: https://continue.dev
- **description**: Originally a popular open-source AI code assistant VS Code extension, Continue has pivoted to "Continuous AI" — a platform for AI-powered quality control on every pull request. Source-controlled AI checks written as markdown in your repo, run as native GitHub status checks with suggested fixes.
- **popularity**: 6
- **alternatives**: GitHub Copilot, CodeRabbit, LinearB
- **why_include**: Notable pivot from IDE assistant to PR quality control; represents the emerging "AI code review" category

---

# Orchestration Frameworks

## LangGraph
- **macroarea**: Orchestration
- **url**: https://github.com/langchain-ai/langgraph
- **description**: Low-level orchestration framework for building stateful, long-running agents as graphs. Inspired by Pregel/Apache Beam, it provides durable execution, human-in-the-loop interrupts, memory management, and production deployment. 28.2k stars, actively maintained with LangSmith integration.
- **popularity**: 10
- **alternatives**: OpenAI Agents SDK, AutoGen, CrewAI, Temporal
- **why_include**: The dominant graph-based orchestration framework. Its state machine approach to agent workflows is the most flexible low-level abstraction.

## OpenAI Agents SDK
- **macroarea**: Orchestration
- **url**: https://github.com/openai/openai-agents-python
- **description**: OpenAI's production-ready evolution of Swarm. Lightweight framework for multi-agent workflows supporting agents, tools, guardrails, handoffs, human-in-the-loop, sessions, tracing, and real-time voice agents. Provider-agnostic, supporting 100+ LLMs. 20.5k stars.
- **popularity**: 10
- **alternatives**: LangGraph, AutoGen, CrewAI, Claude Agent SDK
- **why_include**: OpenAI's official production SDK replacing Swarm; first-class voice agent support; built-in tracing UI

## CrewAI
- **macroarea**: Orchestration
- **url**: https://github.com/crewAIInc/crewAI
- **description**: Standalone Python framework for orchestrating multi-agent AI systems where autonomous agents collaborate through role-based tasks. Dual architecture: Crews (autonomous agent teams) and Flows (event-driven workflows). 47.8k stars, 100k+ certified developers.
- **popularity**: 7
- **alternatives**: AutoGen, LangGraph, ChatDev
- **why_include**: The role-playing agent metaphor (agents with specific roles, goals, backstories collaborating like a team) is a distinct approach

## AutoGen (Microsoft)
- **macroarea**: Orchestration
- **url**: https://github.com/microsoft/autogen
- **description**: Microsoft's multi-agent framework with layered architecture: Core (event-driven), AgentChat (high-level API), Studio (no-code GUI), and Extensions (MCP, Docker executors). Most comprehensive catalog of multi-agent design patterns: group chat, swarm, selector, debate, reflection, code execution.
- **popularity**: 8
- **alternatives**: LangGraph, CrewAI, OpenAI Agents SDK
- **why_include**: Most comprehensive catalog of multi-agent design patterns; 56.6k stars; Microsoft-backed

## OpenAI Swarm (Legacy)
- **macroarea**: Orchestration / Pattern Reference
- **url**: https://github.com/openai/swarm
- **description**: Educational framework exploring lightweight multi-agent orchestration through two primitives: Agents and handoffs. 21.3k stars but explicitly replaced by the Agents SDK. The handoff pattern has become a widely adopted orchestration idiom across the ecosystem.
- **popularity**: 7
- **alternatives**: OpenAI Agents SDK (successor), AutoGen Swarm, CrewAI Crews
- **why_include**: Despite being deprecated, the Swarm pattern (agents + handoffs) is one of the most referenced multi-agent coordination patterns

---

# Protocols & Standards

## MCP (Model Context Protocol)
- **macroarea**: Integration / Protocol
- **url**: https://modelcontextprotocol.io
- **description**: An open standard (Linux Foundation) providing a universal "USB-C port for AI" — a standardized JSON-RPC 2.0 protocol connecting LLM applications to external data sources, tools, and workflows via MCP servers. Every major AI vendor supports it (Anthropic, OpenAI, Google, Microsoft, Amazon). 10 official SDKs, 93+ registered servers, 80+ listed clients.
- **popularity**: 9
- **alternatives**: REST APIs, gRPC, OpenAI function calling, A2A
- **why_include**: The de facto standard for connecting AI models to external systems. The connector layer the entire agent ecosystem converges on.
- **notes**: Spec version 2025-11-25; Transport: stdio + Streamable HTTP; Core primitives: tools, resources, prompts, sampling, elicitation, roots, logging; Inspired by LSP; 45.3k org followers on GitHub

## A2A (Agent-to-Agent Protocol)
- **macroarea**: Integration / Protocol
- **url**: https://a2a-protocol.org
- **description**: Open protocol (Apache 2.0, Linux Foundation) enabling communication between independent AI agents. Created by Google, now governed by TSC with AWS, Cisco, Google, IBM, Microsoft, Salesforce, SAP, ServiceNow. v1.0 released March 2026. Agents discover each other via Agent Cards, communicate via stateful Tasks with multi-turn messages. Complementary to MCP — A2A for agent-to-agent, MCP for agent-to-tool.
- **popularity**: 9
- **alternatives**: MCP (complementary), custom gRPC/REST, LangGraph inter-agent
- **why_include**: The leading standard for multi-agent interoperability, backed by virtually every major tech company. Defines the "network layer" for agent ecosystems.
- **notes**: 23k GitHub stars; 170+ partners; SDKs in Python, Go, JS, Java, .NET; Framework integrations: LangGraph, CrewAI, AutoGen, Pydantic AI, etc.

## ACP (Agent Communication Protocol) — DEPRECATED
- **macroarea**: Integration / Protocol (Historical)
- **url**: https://github.com/i-am-bee/acp
- **description**: Created by IBM Research in March 2025. Enabled agents to send/receive rich multimodal messages with stateful sessions. Donated to Linux Foundation alongside BeeAI. Officially merged into A2A in August 2025. Repo now archived.
- **popularity**: 5
- **alternatives**: A2A (its successor), MCP
- **why_include**: Important historical context. The first serious inter-agent protocol; its merger into A2A is a key consolidation event.

---

# Observability Tools

## Langfuse
- **macroarea**: Observability
- **url**: https://langfuse.com
- **description**: Open-source LLM engineering platform for collaborative development, monitoring, evaluation, and debugging of AI applications. Provides tracing, prompt management with versioning, evaluations (LLM-as-judge), datasets, playground, and comprehensive API. Self-hostable or managed cloud. 24.2k GitHub stars, MIT licensed.
- **popularity**: 10
- **alternatives**: LangSmith, Arize Phoenix, W&B Weave, Helicone
- **why_include**: Clear open-source leader; widest integration ecosystem (25+ frameworks); self-hostable; generous free cloud tier

## Arize Phoenix
- **macroarea**: Observability
- **url**: https://phoenix.arize.com
- **description**: Open-source AI observability platform built entirely on OpenTelemetry. Provides tracing, evaluations, datasets, experiments, prompt playground, and dataset clustering. 9.1k stars, 2.5M+ monthly downloads. Fully self-hostable with free tier.
- **popularity**: 9
- **alternatives**: Langfuse, LangSmith, W&B Weave
- **why_include**: Strongest OpenTelemetry foundation; includes MCP server; language/vendor agnostic

## LangSmith
- **macroarea**: Observability
- **url**: https://smith.langchain.com
- **description**: Framework-agnostic platform for building, debugging, and deploying AI agents. Provides tracing, evaluation, prompt management, deployment (Agent Servers), and a visual Studio. Native integration with LangChain/LangGraph. Proprietary with managed cloud.
- **popularity**: 9
- **alternatives**: Langfuse, Arize Phoenix, W&B Weave
- **why_include**: Most feature-complete platform combining observability, evaluation, prompt engineering, deployment, and visual agent builder

## W&B Weave
- **macroarea**: Observability
- **url**: https://wandb.ai/weave
- **description**: Toolkit for developing Generative AI applications by Weights & Biases. Logging and debugging of LLM traces, rigorous evaluations, and organization across the LLM workflow. Leverages the established W&B platform. Open source (Apache-2.0), 1.1k stars.
- **popularity**: 7
- **alternatives**: LangSmith, Langfuse, Arize Phoenix
- **why_include**: Brings W&B's proven ML experiment tracking pedigree to LLM observability; strong for teams invested in W&B ecosystem

## Helicone
- **macroarea**: Observability
- **url**: https://helicone.ai
- **description**: AI gateway and LLM observability platform for routing, debugging, and analyzing AI applications. Provides request caching, rate limiting, automatic fallbacks, prompt management, and a query language (HQL). Now part of Mintlify. Open-source core with 5.2k stars.
- **popularity**: 7
- **alternatives**: LangSmith, Langfuse, W&B Weave
- **why_include**: Unique focus on the AI gateway layer (caching, rate limiting, fallbacks); best for teams needing gateway/proxy features alongside observability

## OpenLLMetry
- **macroarea**: Observability
- **url**: https://github.com/traceloop/openllmetry
- **description**: Open-source extensions on top of OpenTelemetry providing complete LLM application observability. Instruments LLM providers, vector DBs, and frameworks, routing telemetry to any existing observability backend (Datadog, Honeycomb, Grafana, etc.). 7k stars.
- **popularity**: 7
- **alternatives**: Arize Phoenix, Langfuse, LangSmith
- **why_include**: Key differentiator: feeds standard OTEL data to your existing observability stack (25+ backends); no vendor lock-in

---

# Sandbox / Code Execution Environments

## Daytona
- **macroarea**: Execution / Infrastructure
- **url**: https://daytona.io
- **description**: Open-source (AGPL-3.0) secure infrastructure for running AI-generated code. Sub-90ms sandbox creation with separated/isolated runtime. Supports OCI/Docker images, built-in LSP, Git integration, and computer use (Linux, macOS, Windows). 71.1k GitHub stars — highest in category.
- **popularity**: 9
- **alternatives**: E2B, Modal, CodeSandbox SDK
- **why_include**: Fastest-growing open-source sandbox; only fully open-source option; unique computer use feature; unlimited sandbox persistence

## E2B (English2Bits)
- **macroarea**: Execution / Infrastructure
- **url**: https://e2b.dev
- **description**: Cloud-native sandbox platform purpose-built for AI agents. Uses Firecracker microVMs for fully isolated environments with sub-200ms cold starts. SDKs for Python and TypeScript. 11.5k GitHub stars, 500M+ sandboxes started. Used by Perplexity, Hugging Face, Groq.
- **popularity**: 9
- **alternatives**: Daytona, Modal, Fly.io Machines
- **why_include**: Category-defining product for AI code execution; purpose-built for LLM agents; Firecracker isolation is enterprise-grade

## Modal
- **macroarea**: Execution / Infrastructure
- **url**: https://modal.com
- **description**: Serverless AI infrastructure platform for running inference, training, batch processing, and sandboxes. Python-first with decorator-based API, sub-second cold starts, elastic GPU scaling. SOC2 + HIPAA compliant.
- **popularity**: 8
- **alternatives**: Replicate, RunPod, E2B, Fly.io
- **why_include**: Best-in-class developer experience for AI/ML workloads; elastic GPU scaling from 0; spans inference, training, sandboxes, and batch

## Fly.io Machines
- **macroarea**: Execution / Infrastructure
- **url**: https://fly.io/machines
- **description**: Lightweight, fast-booting virtual machines powered by Firecracker microVMs. Deploy any containerized application globally with sub-second start/stop, built-in private networking, autoscaling, and per-second billing.
- **popularity**: 7
- **alternatives**: Railway, Render, Google Cloud Run, E2B
- **why_include**: General-purpose VM platform that doubles as a sandbox; Firecracker provides strong isolation; battle-tested infrastructure

## StackBlitz WebContainers
- **macroarea**: Execution / Developer Experience
- **url**: https://stackblitz.com
- **description**: WebAssembly-based micro OS that boots full Node.js environments in milliseconds, entirely within the browser. All compute runs client-side — zero server costs, zero network latency, works offline. Powers Bolt.new for AI-assisted app creation.
- **popularity**: 7
- **alternatives**: CodeSandbox/Sandpack, E2B
- **why_include**: Fundamentally different approach: browser-native execution via WebAssembly; impossible security model; millisecond boot

---

# Memory Systems

## Mem0
- **macroarea**: Memory & State
- **url**: https://mem0.ai
- **description**: Universal, self-improving AI memory layer that extracts discrete facts from conversations, deduplicates and consolidates them, and retrieves only what's relevant. Achieves 26% higher accuracy than OpenAI Memory on LOCOMO while using 90% fewer tokens. 51.8k GitHub stars — highest of any memory system. YC S24.
- **popularity**: 10
- **alternatives**: Zep, Letta, LangChain Memory
- **why_include**: Most popular and most integrated memory system (21 framework integrations, 19 vector stores); LOCOMO benchmark leader among standalone memory tools

## Letta (formerly MemGPT)
- **macroarea**: Memory & State
- **url**: https://letta.com
- **description**: Platform for building stateful AI agents with advanced memory. Uses tiered memory architecture — core memory (always in-context), recall memory (searchable archival), and archive memory (long-term storage). The agent autonomously decides when to search, update, or append memory. 21.9k GitHub stars.
- **popularity**: 9
- **alternatives**: Mem0, Zep, LangChain Memory
- **why_include**: The OG agent memory system that introduced "virtual memory for LLMs"; self-editing memory blocks and agentic memory management remain distinctive

## Graphiti (by Zep)
- **macroarea**: Memory & State / Knowledge Graphs
- **url**: https://github.com/getzep/graphiti
- **description**: Open-source temporal context graph engine. Unlike static knowledge graphs, tracks how facts change over time with validity windows, maintains provenance, and supports both prescribed and learned ontologies. 24.4k GitHub stars, Apache 2.0.
- **popularity**: 8
- **alternatives**: Microsoft GraphRAG, Neo4j GDS, Mem0 graph mode
- **why_include**: Most popular open-source temporal knowledge graph for agents; real-time incremental updates with explicit bi-temporal tracking

## Zep
- **macroarea**: Memory & State / Context Engineering
- **url**: https://www.getzep.com
- **description**: End-to-end context engineering platform that builds a temporal knowledge graph from conversations, business data, and app events — tracking how facts change over time with automatic invalidation of stale facts. Delivers token-efficient context blocks with sub-200ms retrieval. Leads LOCOMO benchmark at 80.32%.
- **popularity**: 7
- **alternatives**: Mem0, Letta, LangChain Memory
- **why_include**: Unique temporal fact tracking; "context engineering" framing is more accurate for production agents; enterprise customers include Swiggy, AWS

---

# Multi-Agent Design Patterns

## Prompt Chaining
- **macroarea**: Workflow Pattern
- **url**: https://www.anthropic.com/research/building-effective-agents
- **description**: Sequential decomposition where each LLM call processes the output of the previous one, with optional programmatic gates between steps. Trades latency for accuracy.
- **popularity**: 10
- **alternatives**: Sequential Workflow (AutoGen), Sequential Process (CrewAI)
- **why_include**: The simplest and most widely used multi-step pattern. Foundation for all more complex orchestrations.

## Routing
- **macroarea**: Workflow Pattern
- **url**: https://www.anthropic.com/research/building-effective-agents
- **description**: Classifies input and directs to a specialized downstream process. Enables separation of concerns and specialized prompts per category. Can route to cheaper models for simple queries.
- **popularity**: 9
- **alternatives**: Selector Group Chat (AutoGen), conditional branching (LangGraph)
- **why_include**: Essential pattern for cost optimization and quality. Used in virtually every production agent system.

## Parallelization
- **macroarea**: Workflow Pattern
- **url**: https://www.anthropic.com/research/building-effective-agents
- **description**: Two variants: Sectioning (break task into independent parallel subtasks) and Voting (run same task multiple times for diverse outputs). Critical for latency optimization and robustness.
- **popularity**: 8
- **alternatives**: Concurrent Agents (AutoGen), fan-out/fan-in (LangGraph)
- **why_include**: Critical for latency optimization and robustness. The voting pattern is key for reliability.

## Orchestrator-Workers
- **macroarea**: Workflow Pattern
- **url**: https://www.anthropic.com/research/building-effective-agents
- **description**: A central LLM dynamically decomposes tasks and delegates to worker LLMs, then synthesizes results. Unlike parallelization, subtasks are determined dynamically by the orchestrator.
- **popularity**: 9
- **alternatives**: Hierarchical Process (CrewAI), Magentic-One (AutoGen)
- **why_include**: The core pattern for complex, unpredictable tasks. Used by coding agents (Claude Code, Codex) and research systems.

## Evaluator-Optimizer
- **macroarea**: Workflow Pattern
- **url**: https://www.anthropic.com/research/building-effective-agents
- **description**: One LLM generates output while another evaluates and provides feedback in an iterative loop. Most effective when clear evaluation criteria exist.
- **popularity**: 8
- **alternatives**: Multi-Agent Debate (AutoGen), Reflection pattern
- **why_include**: Essential for quality-critical tasks (code review, content generation). The feedback loop pattern is fundamental.

## Handoffs / Swarm Pattern
- **macroarea**: Coordination Pattern
- **url**: https://github.com/openai/swarm
- **description**: Agents transfer control to other agents via function returns. Lightweight coordination where each agent has its own instructions and tools. Now implemented in OpenAI Agents SDK, AutoGen, and referenced across frameworks.
- **popularity**: 9
- **alternatives**: AutoGen Swarm, LangGraph edge transitions, A2A task delegation
- **why_include**: The most lightweight multi-agent coordination pattern; widely adopted across frameworks.

## GraphFlow / State Machine Orchestration
- **macroarea**: Orchestration Pattern
- **url**: https://github.com/langchain-ai/langgraph
- **description**: Agents and tools are nodes in a directed graph. State maintained across transitions, conditional edges enable dynamic routing. Supports cycles, branches, subgraphs, and human-in-the-loop interrupts.
- **popularity**: 9
- **alternatives**: Temporal workflows, Prefect DAGs, Step Functions
- **why_include**: The most general-purpose orchestration pattern. Any multi-agent pattern can be expressed as a graph.

## Mixture of Agents (MoA)
- **macroarea**: Coordination Pattern
- **url**: https://microsoft.github.io/autogen/stable/user-guide/core-user-guide/design-patterns/mixture-of-agents.html
- **description**: Layers of agents where each layer aggregates responses from the previous layer. Proposer agents generate diverse outputs, aggregator synthesizes them. Inspired by mixture-of-experts in ML.
- **popularity**: 6
- **alternatives**: Voting (parallelization), Multi-Agent Debate
- **why_include**: Novel pattern for combining diverse model capabilities; useful when mixing specialized models.

---

# Emerging Trends

## Async Background Coding Agents
- **description**: Agents like Google's Jules and OpenAI's Codex work autonomously in cloud VMs, producing PRs while developers focus on other work. Tasks are assigned and reviewed asynchronously.
- **impact**: High
- **relevant_tools**: Jules (Google), OpenAI Codex, GitHub Copilot Agent, Devin

## CLI as the New IDE
- **description**: The terminal is experiencing a resurgence as the primary interface for AI coding agents. Claude Code, Gemini CLI, and OpenCode provide AI engineering capabilities directly in the shell.
- **impact**: High
- **relevant_tools**: Claude Code, Gemini CLI, OpenCode, Warp, Amp

## Agent Interoperability Stack (MCP + A2A)
- **description**: The convergence of MCP (agent-to-tool) and A2A (agent-to-agent) into a complete interoperability layer. Agents built with different frameworks can now discover, communicate, and collaborate.
- **impact**: High
- **relevant_tools**: MCP, A2A, all major frameworks

## Human-in-the-Loop (HITL) as Standard Practice
- **description**: HITL frameworks becoming essential for production agents. Key triggers: exceeding failure thresholds and high-risk actions. Frameworks include KnowNo, HULA, HumanLayer, and OpenAI Agents SDK approval flow.
- **impact**: High
- **relevant_tools**: OpenAI Agents SDK, HumanLayer, CAMEL Framework, Permit.io

## Agent-Computer Interface (ACI) Design
- **description**: Anthropic's principle that tool design for agents deserves the same investment as HCI for humans. Includes poka-yoke for tools, absolute filepaths, and testing how models use tools.
- **impact**: High
- **relevant_tools**: All agent frameworks and tool systems

## Agentic AI Security
- **description**: Agentic AI security is the fastest-growing cybersecurity category. Sandboxes are the #1 attack vector in 2025. Best practices include working directory scoping, Docker containment, network isolation, and readonly API keys.
- **impact**: High
- **relevant_tools**: Geordie AI, Docker, E2B, Firecracker, E2B, Daytona

## Agent Governance
- **description**: 82% of executives plan to adopt agents within 1-3 years, but governance frameworks are still maturing. WEF published evaluation foundations. arXiv published "AI Agent Governance: A Field Guide."
- **impact**: Medium
- **relevant_tools**: WEF framework, Microsoft Power Platform governance, Collibra

## Visual Agent Builders
- **description**: No-code/low-code visual canvases (OpenAI Agent Builder, AutoGen Studio, Rivet) for constructing multi-agent workflows with node-based editors.
- **impact**: Medium
- **relevant_tools**: OpenAI Agent Builder, AutoGen Studio, Rivet, n8n
