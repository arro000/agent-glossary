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

---

# Business Automation Platforms with AI Agent Features

## n8n
- **macroarea**: Workflow Automation / AI Agent Builder
- **url**: https://n8n.io
- **github**: https://github.com/n8n-io/n8n (~182k stars)
- **description**: Fair-code workflow automation platform with the deepest AI agent integration of any general-purpose automation tool. Its "Advanced AI" module provides first-class agent nodes, LangChain-powered chains, memory systems, tool-calling, MCP client/server, guardrails, AI-powered data transformations, and a chat trigger for conversational workflows. Self-hostable or cloud, 400+ integrations.
- **popularity**: 10
- **alternatives**: Make.com, Zapier, Flowise, Dify, Langflow
- **why_include**: Most technically capable AI agent features in a general automation platform; open-source with massive community; MCP native; LangChain integration; self-hostable
- **agent_features**: AI Agent node (with tool-calling, memory, sub-agents), Conversational Agent, ReAct Agent, Tools Agent; LangChain integration (chains, memory, vector stores, document loaders); MCP Client and MCP Server Trigger nodes; AI Transform node; Chat Trigger node; Chat Model nodes (OpenAI, Anthropic, Google Gemini, Mistral, Perplexity); Vector Store nodes; Text Classifier node; Summarize node; Guardrails node; Evaluation and Evaluation Trigger nodes; 100+ AI/vector/embedding integrations; sub-workflow orchestration for multi-agent patterns
- **open_source**: yes (fair-code, Sustainable Use License)

## Zapier
- **macroarea**: Workflow Automation / AI Agent Platform
- **url**: https://zapier.com
- **description**: The largest business automation platform (3.4M+ companies) now positioning itself as an "AI Orchestration Platform." Offers Zapier Agents (autonomous AI teammates), AI Chatbots, and AI steps in traditional Zaps. Agents access 8,000+ app integrations, use company knowledge bases, and include a Chrome extension for web interaction. Fine-tuned models for research and task management.
- **popularity**: 10
- **alternatives**: Make.com, n8n, Activepieces
- **why_include**: Largest integration ecosystem (8,000+ apps); Zapier Agents is the most accessible autonomous agent product for non-technical users; Chrome extension enables web-based agent actions
- **agent_features**: Zapier Agents (build specialized autonomous agents with Copilot AI assistance, connect to business data, perform tasks across 8,000+ apps, monitor activity, chat interface); AI Chatbots (FAQ-trained customer-facing bots with knowledge base integration); AI Actions in Zaps (OpenAI, Anthropic, Google as workflow steps); Agent templates (lead enrichment, meeting prep, content creation, ticket handling, candidate ranking); Chrome extension for web browsing/action; scheduled autonomous execution
- **open_source**: no

## Make.com
- **macroarea**: Workflow Automation / AI Agent Builder
- **url**: https://www.make.com
- **description**: Visual automation platform (formerly Integromat) with growing AI capabilities. Offers AI-powered scenarios including text classification, summarization, translation, and image generation within automation workflows. Recently introduced AI Agents — autonomous assistants that can access knowledge bases and perform multi-step tasks. 1,800+ app integrations with a powerful visual scenario builder.
- **popularity**: 9
- **alternatives**: Zapier, n8n, Activepieces
- **why_include**: Strong visual builder; growing AI agent features; enterprise customer base; competitive with Zapier on integrations
- **agent_features**: Make AI Agents (autonomous agents with knowledge base access, multi-step task execution, and app integration); AI modules (OpenAI, Anthropic, Google) for text generation, classification, summarization within scenarios; Router/Routing patterns for AI-powered decision branching; HTTP tool calling; Data store for agent memory; Visual scenario builder for complex multi-step AI workflows
- **open_source**: no

## Dify
- **macroarea**: AI Agent Platform / Agentic Workflow Builder
- **url**: https://dify.ai
- **github**: https://github.com/langgenius/dify (~136k stars)
- **description**: Leading open-source agentic workflow platform focused specifically on building production-ready AI agents. Provides drag-and-drop workflow builder, RAG pipelines, native MCP integration, multi-agent orchestration, 200+ LLM support, and enterprise-grade infrastructure. Over 1M apps deployed, trusted by Volvo, Ricoh, and 100K+ teams. 800+ contributors.
- **popularity**: 10
- **alternatives**: Flowise, Langflow, n8n, Coze
- **why_include**: The most complete purpose-built AI agent development platform; strongest enterprise adoption among agent-specific tools; native MCP support; can publish workflows as MCP servers
- **agent_features**: Agentic workflow builder (drag-and-drop visual canvas); RAG pipelines with knowledge base management; Multi-agent orchestration; Native MCP integration (connect to external tools AND publish as MCP server); 200+ LLM model support (OpenAI, Claude, Gemini, Mistral, local models via Ollama); Agent strategies (ReAct, function calling); Tool integration and custom tool creation; Conversation-based agent interactions; Prompt management and versioning; Evaluation and testing framework; Observability and logging; Enterprise features (RBAC, SSO, audit logs)
- **open_source**: yes (Apache 2.0 with additional terms)

## Langflow
- **macroarea**: AI Agent Builder / Low-Code Platform
- **url**: https://langflow.org
- **github**: https://github.com/langflow-ai/langflow (~147k stars)
- **description**: Low-code AI builder for agentic and RAG applications. Visual state-flow canvas with Python under the hood — every visual component exports to Python code. Supports single agents and fleets of agents, MCP server deployment, API generation from flows, and 40+ integrations (Anthropic, OpenAI, Groq, Hugging Face, CrewAI, vector DBs). 23k Discord members, MIT licensed.
- **popularity**: 9
- **alternatives**: Flowise, Dify, n8n
- **why_include**: Highest GitHub stars in the visual agent builder category; Python-first with full code export; strong multi-agent fleet support; MCP server deployment; MIT license
- **agent_features**: Visual drag-and-drop agent builder; Agent fleet orchestration (run single or fleet of agents); Python code customization under every component; MCP server deployment from flows; Flow-as-API (deploy flows as REST endpoints); Chat interface for agent interaction; 40+ data source integrations; Vector database integrations; Multi-model support (Anthropic, OpenAI, Groq, Mistral, Ollama, NVIDIA); CrewAI integration for multi-agent patterns; Pre-built flow templates; Cloud and self-hosted deployment
- **open_source**: yes (MIT)

## Flowise
- **macroarea**: AI Agent Builder / Low-Code Platform
- **url**: https://flowiseai.com
- **github**: https://github.com/FlowiseAI/Flowise (~51k stars)
- **description**: Open-source visual AI agent builder built on LangChain. Offers Chatflow (single-agent chatbots with tool calling and RAG) and Agentflow (multi-agent workflow orchestration). Features human-in-the-loop, execution traces with OpenTelemetry support, API/SDK/embeddable chat widget. Now part of Workday. Used by AWS, Accenture, Deloitte, Publicis.
- **popularity**: 8
- **alternatives**: Langflow, Dify, n8n
- **why_include**: Purpose-built for LangChain ecosystem; strong enterprise customers; Workday acquisition validates the category; human-in-the-loop and observability features
- **agent_features**: Multi-agent workflow orchestration (Agentflow); Single-agent chat assistants with tool calling (Chatflow); RAG with knowledge retrieval from various data sources (PDF, TXT, CSV, DOC, HTML, etc.); Human-in-the-Loop (HITL) review workflows; Execution traces with Prometheus and OpenTelemetry support; API, TypeScript SDK, Python SDK, and embedded chat widget; 100+ LLM, embedding, and vector DB integrations; Document loaders for diverse file formats; On-prem and cloud deployment with horizontal scaling via message queues
- **open_source**: yes (Apache 2.0 with additional terms)

---

# Comparison Summary: Business Automation + AI Agent Platforms

| Platform | Type | Stars | Agent Depth | Integration Breadth | Open Source | Best For |
|----------|------|-------|-------------|---------------------|-------------|----------|
| **n8n** | General automation + AI | 182k | Deep (LangChain, MCP, multi-agent) | 400+ apps | Yes (fair-code) | Technical teams wanting full agent + automation combo |
| **Zapier** | General automation + AI | N/A | Moderate (Agents, Chatbots) | 8,000+ apps | No | Non-technical users, maximum app coverage |
| **Make.com** | General automation + AI | N/A | Moderate (AI Agents, modules) | 1,800+ apps | No | Visual builders wanting AI in automation flows |
| **Dify** | AI-first agent platform | 136k | Deepest (purpose-built) | Plugins + MCP | Yes | Teams focused exclusively on AI agent development |
| **Langflow** | AI-first agent builder | 147k | Deep (fleet, MCP, Python) | 40+ integrations | Yes (MIT) | Python developers wanting visual + code hybrid |
| **Flowise** | AI-first agent builder | 51k | Deep (LangChain, HITL, obs) | LangChain ecosystem | Yes | Teams invested in LangChain ecosystem |

---

# Iteration 2 — New Agent Frameworks & SDKs

## Google ADK (Agent Development Kit)
- **macroarea**: Orchestration / Agent Frameworks
- **url**: https://google.github.io/adk-docs/
- **github**: https://github.com/google/adk-python (~18.7k stars)
- **description**: Google's open-source, code-first framework for building, evaluating, and deploying AI agents. Optimized for Gemini but model-agnostic and deployment-agnostic, supporting single-tool agents to complex multi-agent systems. Native A2A protocol support (reference implementation), built-in evaluation UI, MCP tool integration, and multi-language SDKs (Python, TypeScript, Go, Java). ADK 2.0 alpha adds graph-based workflows and collaborative agents.
- **popularity**: 9
- **alternatives**: LangGraph, OpenAI Agents SDK, CrewAI, AutoGen, Semantic Kernel
- **why_include**: Google's flagship agent framework with first-party A2A integration, multi-language SDKs, deep Google Cloud deployment support (Vertex AI Agent Engine, Cloud Run, GKE), and one of the fastest-growing agent projects. ADK 2.0 positions it as a direct LangGraph competitor.

## Mastra
- **macroarea**: Orchestration / Agent Frameworks
- **url**: https://mastra.ai
- **github**: https://github.com/mastra-ai/mastra (22.6k stars)
- **description**: Open-source TypeScript-first AI agent framework from the team behind Gatsby. Provides agents, graph-based workflows, RAG, memory, MCP servers, evals, and observability — designed for building production AI apps that integrate natively with Next.js, React, Express, Hono, Astro, and SvelteKit. YC W25 backed with Mastra Cloud for deployment and tracing. Used by Replit, Sanity, Medusa, SoftBank, WorkOS.
- **popularity**: 8
- **alternatives**: LangGraph, Vercel AI SDK, LlamaIndex.TS, AutoGen, CrewAI
- **why_include**: Highest-starred TypeScript-native agent framework with complete production stack. Native Next.js integration, built-in MCP server authoring, live evals, and observational memory make it the top choice for full-stack JS/TS teams.

## Pydantic AI
- **macroarea**: Orchestration / Agent Frameworks
- **url**: https://ai.pydantic.dev/
- **github**: https://github.com/pydantic/pydantic-ai (~16k stars)
- **description**: Python agent framework by the Pydantic team (Samuel Colvin) bringing the "FastAPI feeling" to GenAI development. Fully type-safe with `Agent[DepsType, OutputType]` generics, model-agnostic (15+ providers), dependency injection, composable capabilities, native MCP and A2A support (built FastA2A). 16k stars in under 2 years.
- **popularity**: 8
- **alternatives**: LangGraph, CrewAI, Google ADK, Anthropic Agent SDK, AutoGen, Instructor
- **why_include**: The most Pythonic agent framework — Pydantic is already the validation layer under OpenAI SDK, Google ADK, Anthropic SDK, LangChain, and CrewAI. Built FastA2A (framework-agnostic A2A library). Strong partnership with Google.

## Strands Agents SDK
- **macroarea**: Orchestration / Agent Frameworks
- **url**: https://strandsagents.com
- **github**: https://github.com/strands-agents/sdk-python (5.5k stars)
- **description**: Open-source (Apache 2.0) agent SDK built by Amazon/AWS. Model-driven philosophy: the model handles orchestration while the developer focuses on tools and prompts. Unique "steering hooks" middleware for guardrails/approval gates. Native MCP, multi-agent patterns (Graph, Swarm, Workflow), A2A protocol, bidirectional streaming for voice, and deep Bedrock integration.
- **popularity**: 7
- **alternatives**: OpenAI Agents SDK, Claude Agent SDK, LangChain/LangGraph, CrewAI, Google ADK
- **why_include**: Only fully open-source (Apache 2.0) cloud-native agent SDK backed by a major cloud provider. Unique steering hooks achieve 100% task accuracy vs 82.5% for prompt-only. Natural choice for AWS shops.

## Claude Agent SDK
- **macroarea**: Orchestration / Agent Frameworks
- **url**: https://docs.anthropic.com/en/docs/agent-sdk/overview
- **description**: Anthropic's programmatic SDK giving developers the same tools, agent loop, and context management as Claude Code, but as an embeddable library. Built-in tools (file I/O, bash, web search, code editing), subagents, MCP integration, hooks lifecycle, sessions, and permissions. Multi-cloud (Anthropic API, AWS Bedrock, GCP Vertex AI, Azure).
- **popularity**: 9
- **alternatives**: OpenAI Agents SDK, LangGraph, Google ADK, CrewAI, AutoGen
- **why_include**: Only first-party Anthropic SDK for building production agents. Full Claude Code engine as a programmable library. Subagents, MCP, multi-cloud deployment.

---

# Deep Research Agents (Pattern)

## Deep Research Agents
- **macroarea**: Pattern / Research
- **url**: N/A — pattern/concept
- **description**: AI systems that autonomously conduct multi-step research — planning queries, browsing the web, reading hundreds of sources, synthesizing findings into comprehensive reports with citations, and self-critiquing. Differ from chat agents by operating over minutes-to-hours with iterative plan-search-synthesize-critique loops.
- **popularity**: 9
- **alternatives**: N/A (pattern with multiple implementations)
- **why_include**: One of the most commercially significant agent patterns of 2025. All major providers ship dedicated deep research products. Canonical example of agentic behavior.

### OpenAI Deep Research (o3-deep-research / o4-mini-deep-research)
- **url**: https://platform.openai.com/docs/guides/deep-research
- **description**: Specialized models via Responses API that synthesize hundreds of sources. Web search, MCP servers, file search, code interpreter.
- **popularity**: 10
- **open_source**: no

### Google Gemini Deep Research
- **url**: https://blog.google/technology/google-deepmind/gemini-deep-research/
- **description**: Plans research strategy, executes multi-step searches, synthesizes with citations. Available in Gemini API.
- **popularity**: 9
- **open_source**: no

### GPT Researcher
- **url**: https://github.com/assafelovic/gpt-researcher
- **description**: Open-source (26k+ stars). Planner + execution agents + publisher. Multi-agent, MCP, recursive exploration.
- **popularity**: 9
- **open_source**: yes

### STORM (Stanford)
- **url**: https://github.com/stanford-oval/storm
- **description**: Academic system that writes Wikipedia-like articles. Perspective-guided questions, Co-STORM for human-AI collaborative research.
- **popularity**: 8
- **open_source**: yes

### Tongyi DeepResearch (Alibaba)
- **url**: https://github.com/Alibaba-NLP/DeepResearch
- **description**: Open-source 30B-parameter agentic LLM for deep information-seeking. End-to-end RL. SOTA on BrowseComp, WebWalkerQA.
- **popularity**: 9
- **open_source**: yes

---

# MCP Extensions

## MCP Apps
- **macroarea**: Integration / Protocol Extension
- **url**: https://modelcontextprotocol.io/extensions/apps/overview
- **github**: https://github.com/modelcontextprotocol/ext-apps (2k stars)
- **description**: Official MCP extension (SEP-1865, spec version 2026-01-26, Final) enabling MCP servers to deliver interactive HTML UIs rendered inside AI client conversations via sandboxed iframes. Enables dashboards, 3D scenes, forms, charts, media viewers inline. Backed by Anthropic; adopted by Claude, ChatGPT, VS Code Copilot, Postman, Goose.
- **popularity**: 7
- **alternatives**: N/A (unique extension)
- **why_include**: Most significant capability expansion beyond text-only MCP. Enables rich visualizations and interactive tools inline in AI conversations.

---

# Agentic RAG Patterns

## Agentic RAG
- **macroarea**: Knowledge & Retrieval
- **url**: https://arxiv.org/abs/2310.11511
- **description**: Umbrella term for RAG patterns where an LLM agent actively decides when, how, and whether to retrieve — introducing decision loops, self-correction, and adaptive retrieval strategies. The current frontier of enterprise RAG, implemented in every major framework.
- **popularity**: 9
- **alternatives**: Traditional RAG
- **why_include**: RAG is the most widely deployed enterprise LLM pattern; agentic variants significantly reduce hallucinations. Essential knowledge for any agent builder.

### Self-RAG
- **description**: LM generates reflection tokens (`Retrieve`, `ISREL`, `ISSUP`, `ISUSE`) at inference time governing the entire RAG process end-to-end.
- **paper_url**: https://arxiv.org/abs/2310.11511

### Corrective RAG (CRAG)
- **description**: Plug-and-play retrieval evaluator triggers corrective actions (web search fallback, query rewriting) when retrieval quality is poor. No retraining needed.
- **paper_url**: https://arxiv.org/abs/2401.15884

### Adaptive RAG
- **description**: Routes questions to different retrieval strategies based on complexity: No Retrieval → Single-step → Multi-step iterative.

### Retrieval Augmented Thoughts (RAT)
- **description**: Interleaves retrieval at each chain-of-thought step, revising each thought with relevant info. +13.6% code gen, +42.8% task planning.
- **paper_url**: https://arxiv.org/abs/2403.05313

### General Agentic RAG
- **description**: LLM treats retrieval as a tool. Loops: think → retrieve → generate → evaluate → repeat. Most flexible but most expensive.

---

# MCP Server Showcase

**Overall Stats**: 6,300+ registered MCP servers across Smithery, awesome-mcp-servers, and official registry.

## Context7
- **macroarea**: Documentation / Coding
- **url**: https://github.com/upstash/context7
- **github_stars**: 51.4k
- **description**: Fetches up-to-date, version-specific library docs and code examples into coding agents. Eliminates hallucinated APIs.
- **category**: documentation, coding agents

## Playwright MCP
- **macroarea**: Browser Automation
- **url**: https://github.com/microsoft/playwright-mcp
- **github_stars**: 30.1k
- **description**: Microsoft's official browser automation MCP server via Playwright.
- **category**: browser automation, testing

## GitHub MCP Server
- **macroarea**: Developer Tools
- **url**: https://github.com/github/github-mcp-server
- **github_stars**: 28.5k
- **description**: GitHub's official MCP server for repos, issues, PRs, workflows, code search.
- **category**: version control, developer tools

## Chrome DevTools MCP
- **macroarea**: Browser / Debugging
- **url**: https://github.com/ChromeDevTools/chrome-devtools-mcp
- **github_stars**: 32.9k
- **description**: Exposes Chrome DevTools Protocol to AI agents. Network, console, DOM, debugging.
- **category**: browser automation, debugging

## FastMCP
- **macroarea**: Developer Tools / Framework
- **url**: https://github.com/PrefectHQ/fastmcp
- **github_stars**: 24.2k
- **description**: The fast, Pythonic way to build MCP servers and clients. Automatic tool discovery from Python functions. By Prefect.
- **category**: developer tools, framework

## Stagehand (Browserbase)
- **macroarea**: Browser Automation
- **url**: https://github.com/browserbase/stagehand
- **github_stars**: 21.8k
- **description**: AI-native browser automation with visual, extract, and act primitives. Cloud browser automation for MCP clients.
- **category**: browser automation, web scraping

## Figma Context MCP
- **macroarea**: Design-to-Code
- **url**: https://github.com/GLips/Figma-Context-MCP
- **github_stars**: 14.1k
- **description**: Provides Figma layout, design tokens, and component info to AI coding agents.
- **category**: design, front-end development

## AWS MCP Servers
- **macroarea**: Cloud / Infrastructure
- **url**: https://github.com/awslabs/mcp
- **github_stars**: 8.7k
- **description**: Official MCP servers for AWS services — S3, Lambda, CloudFormation, and more.
- **category**: cloud platforms, infrastructure

---

# LOCOMO Benchmark

## LOCOMO (Long Conversational Memory)
- **macroarea**: Evaluation / Memory
- **url**: https://aclanthology.org/2024.acl-long.747/ (ACL 2024)
- **description**: Academic benchmark for evaluating very long-term conversational memory. ~600 turns, 16K tokens, up to 32 sessions. The go-to benchmark used by Mem0, Zep, LangChain. 343+ citations.
- **popularity**: 8
- **alternatives**: LongBench, MMLU, custom memory evals
- **why_include**: De facto standard for memory system evaluation. Key tradeoff: Mem0 66.9% at 91% lower latency and 90% token savings vs full-context 72.9%.

- **key_scores**: Mem0 base 66.9%, Mem0+Graph 68.4%, Full-context 72.9%, RAG ~61%, OpenAI Memory 52.9%
- **categories**: Single-hop QA, Temporal QA, Multi-hop QA, Open-domain QA, Event Summarization, Multi-modal Dialogue Generation

---

# Notable Open-Source Vertical Agents

## CopilotKit
- **macroarea**: Developer Tools / Frontend
- **url**: https://copilotkit.ai
- **github**: https://github.com/CopilotKit/CopilotKit (29.9k stars)
- **description**: Frontend stack for building AI copilots with generative UI. React components + AG-UI Protocol for agent-app communication.
- **popularity**: 9
- **category**: developer tools
- **why_include**: De facto standard for embedding agents in frontend apps. AG-UI Protocol is the HTTP-equivalent for agent-app communication.

## Agent-Reach
- **macroarea**: Research / Data Gathering
- **url**: https://github.com/Panniantong/Agent-Reach
- **github**: https://github.com/Panniantong/Agent-Reach (14.5k stars)
- **description**: AI agent access to the entire internet — reads Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu via CLI. Zero API fees, MCP-compatible.
- **popularity**: 8
- **category**: research, OSINT
- **why_include**: Unique research agent for social platform scraping. Invaluable for OSINT, market research.

## SGLang
- **macroarea**: Infrastructure / LLM Serving
- **url**: https://sglang.io
- **github**: https://github.com/sgl-project/sglang (25.3k stars)
- **description**: High-performance LLM serving framework. Powers trillions of tokens daily on 400K+ GPUs. RadixAttention, speculative decoding, multi-LoRA batching.
- **popularity**: 9
- **category**: devops, infrastructure
- **why_include**: Critical infrastructure powering production LLM deployments at xAI, NVIDIA, AMD.

## AgentOps
- **macroarea**: Observability / DevOps
- **url**: https://agentops.ai
- **github**: https://github.com/AgentOps-AI/agentops (5.4k stars)
- **description**: Observability for AI agents. Session replays, LLM cost tracking, multi-agent visualization. Integrates with CrewAI, AutoGen, LangChain, OpenAI Agents SDK.
- **popularity**: 7
- **category**: devops, monitoring
- **why_include**: The Datadog equivalent for AI agents. Session replay and multi-agent visualization distinctive.

## OpenSandbox (Alibaba)
- **macroarea**: Infrastructure / Security
- **url**: https://github.com/alibaba/OpenSandbox
- **github**: https://github.com/alibaba/OpenSandbox (9.7k stars)
- **description**: Secure sandbox runtime for AI agents built on Kubernetes. Isolated environments with security controls.
- **popularity**: 7
- **category**: devops, security
- **why_include**: Kubernetes-native agent sandbox from Alibaba. Addresses secure agent execution at scale.

---

# Iteration 3 - Protocols, Frameworks, Voice, Edge, Evaluation

## AG-UI Protocol
- **macroarea**: Integration / UI Protocol
- **url**: https://ag-ui.com
- **description**: Open protocol for bidirectional agent-user interaction. It standardizes shared state, tool-based generative UI, subgraphs, human-in-the-loop, and predictive updates at the app boundary.
- **popularity**: 7
- **alternatives**: MCP Apps, A2UI, custom websocket/event channels
- **why_include**: Defines the frontend/runtime layer that is missing from MCP and A2A.

## Semantic Kernel
- **macroarea**: Frameworks & SDKs
- **url**: https://learn.microsoft.com/en-us/semantic-kernel/
- **description**: Microsoft's multi-language SDK for building AI agents and agentic patterns. The Agent Framework extends the core kernel with agent orchestration, collaboration, and enterprise-oriented abstractions.
- **popularity**: 9
- **alternatives**: LangGraph, OpenAI Agents SDK, CrewAI, Google ADK
- **why_include**: Main Microsoft agent framework and the strongest enterprise reference in this ecosystem.

## CrewAI Flows
- **macroarea**: Orchestration / Workflow
- **url**: https://docs.crewai.com/en/concepts/flows
- **description**: Event-driven workflow layer in CrewAI for stateful orchestration, branching, persistence, and human feedback. It complements Crews by handling deterministic execution while Crews handle role-based collaboration.
- **popularity**: 8
- **alternatives**: LangGraph, Vercel AI SDK workflows, AutoGen Core
- **why_include**: The key CrewAI distinction is Crews vs Flows, and Flows is the missing orchestration primitive.

## Vercel AI SDK
- **macroarea**: Frameworks & SDKs
- **url**: https://ai-sdk.dev
- **description**: TypeScript toolkit for building AI apps and agents across React, Next.js, Vue, Svelte, and Node.js. The agent API centers on ToolLoopAgent plus explicit workflow patterns.
- **popularity**: 9
- **alternatives**: Mastra, LangGraph JS, OpenAI Agents SDK, Semantic Kernel
- **why_include**: The clearest TS-native path for agentic product teams.

## MCP Inspector
- **macroarea**: Debugging Tools
- **url**: https://modelcontextprotocol.io/docs/tools/inspector
- **description**: Official interactive tool for testing and debugging MCP servers. It inspects tools, prompts, resources, and notifications, and can run local servers via npx.
- **popularity**: 8
- **alternatives**: mcp-cli, custom server harnesses, IDE-integrated debug UIs
- **why_include**: Essential developer tool for the MCP ecosystem.

## LiveKit Agents
- **macroarea**: Realtime / Voice Agents
- **url**: https://docs.livekit.io/agents/
- **description**: Open-source framework for realtime voice, video, and multimodal agents. It includes Python and Node runtimes, session handling, turn detection, telephony hooks, and LiveKit Cloud deployment.
- **popularity**: 9
- **alternatives**: Vapi, Retell, Daily, OpenAI Realtime
- **why_include**: Strong open-source runtime for low-latency voice agents.

## Vapi
- **macroarea**: Voice Agents / Platform
- **url**: https://docs.vapi.ai/
- **description**: Developer platform for voice AI assistants with Assistants and Squads as the main primitives. It adds telephony, web integration, evals, workflows, and concrete support-call examples.
- **popularity**: 8
- **alternatives**: LiveKit Agents, Retell, Daily, OpenAI Realtime
- **why_include**: Best vertical voice-agent platform in this sweep.

## OpenTelemetry for Agents
- **macroarea**: Observability / Monitoring
- **url**: https://www.traceloop.com/openllmetry
- **description**: OpenLLMetry layers LLM/agent instrumentation on top of OpenTelemetry and exports traces to standard backends. It is the clearest bridge between agent traces and the broader observability ecosystem.
- **popularity**: 8
- **alternatives**: Phoenix, Langfuse, LangSmith, Weave
- **why_include**: Best concrete implementation of the OTEL-for-agents pattern.

## Anthropic Computer Use
- **macroarea**: Browser Automation / Computer Use
- **url**: https://docs.anthropic.com/en/docs/build-with-claude/computer-use
- **description**: Beta tool for desktop interaction using screenshots plus mouse and keyboard control. Anthropic provides a reference implementation and detailed guidance on sandboxing and prompt-injection risk.
- **popularity**: 8
- **alternatives**: Playwright agents, Browser Use, operator-style flows
- **why_include**: Canonical source for computer-use style agent automation.

## Ollama
- **macroarea**: Edge / Embedded Runtime
- **url**: https://ollama.com/
- **description**: Local model runtime and launcher for macOS, Windows, and Linux. It also acts as an integration hub for coding tools and apps that want local inference.
- **popularity**: 10
- **alternatives**: llama.cpp, MLX-LM, LM Studio, LocalAI
- **why_include**: The most visible local-model runtime for agent research and demos.

## llama.cpp
- **macroarea**: Edge / Embedded Runtime
- **url**: https://github.com/ggml-org/llama.cpp
- **description**: C/C++ inference runtime that powers a large chunk of the local LLM ecosystem. It is the foundational low-level stack behind many CPU-first and quantized deployments.
- **popularity**: 10
- **alternatives**: Ollama, MLX-LM, vLLM, TensorRT-LLM
- **why_include**: Core runtime for on-device and CPU-first agent deployments.

## MLX-LM
- **macroarea**: Edge / Embedded Runtime
- **url**: https://github.com/ml-explore/mlx-lm
- **description**: Apple-silicon-focused LLM runtime built on MLX. It is the cleanest path for local inference on Macs when native acceleration matters.
- **popularity**: 7
- **alternatives**: llama.cpp, Ollama, LM Studio
- **why_include**: Gives the whiteboard a concrete Apple-silicon edge path.

## SWE-bench
- **macroarea**: Evaluation / Benchmarks
- **url**: https://www.swebench.com/
- **description**: Benchmark suite for real GitHub issue resolution across software repositories. The family now spans Verified, Lite, Multilingual, Multimodal, and related leaderboards.
- **popularity**: 9
- **alternatives**: Terminal-Bench, AgentBench, WebArena, TAU-bench
- **why_include**: The most important software-engineering agent benchmark family right now.

## Terminal-Bench
- **macroarea**: Evaluation / Benchmarks
- **url**: https://www.tbench.ai/
- **description**: Benchmark for complex terminal tasks and long-horizon command-line execution. It targets the CLI-oriented agent category that is expanding fastest.
- **popularity**: 8
- **alternatives**: SWE-bench, AgentBench, WebArena
- **why_include**: Terminal competence is a core capability for coding agents.

## WebArena
- **macroarea**: Evaluation / Benchmarks
- **url**: https://webarena.dev/
- **description**: Realistic web environment benchmark for autonomous agents. It is widely used for browser navigation, task completion, and computer-use style workflows.
- **popularity**: 7
- **alternatives**: BrowserGym, Mind2Web, TAU-bench
- **why_include**: Canonical benchmark for browser automation agents.

## TAU-Bench
- **macroarea**: Evaluation / Benchmarks
- **url**: https://github.com/sierra-research/tau-bench
- **description**: Benchmark suite for agent behavior in realistic tool-use scenarios. Commonly referenced in discussions about reliable tool calling and business-process execution.
- **popularity**: 7
- **alternatives**: AgentBench, SWE-bench, WebArena
- **why_include**: Good complement to web/code benchmarks because it tests tool-using agents in operational tasks.

## AgentBench
- **macroarea**: Evaluation / Benchmarks
- **url**: https://github.com/THUDM/AgentBench
- **description**: Comprehensive benchmark for evaluating LLMs as agents across multiple tasks and environments. It remains one of the more general-purpose benchmark references.
- **popularity**: 7
- **alternatives**: SWE-bench, WebArena, TAU-bench, Terminal-Bench
- **why_include**: Useful when the task is not narrowly coding-focused.

## Sotopia
- **macroarea**: Simulation / Social Agents
- **url**: https://docs.sotopia.world/
- **description**: Open-ended social learning environment for training and evaluating social agents. It emphasizes realistic social interaction, preset characters, and human-AI collaboration.
- **popularity**: 6
- **alternatives**: Generative Agents, GPTeam, WarAgent
- **why_include**: Good representative of the agent simulation subdomain.

## Generative Agents
- **macroarea**: Simulation / Social Agents
- **url**: https://github.com/joonspk-research/generative_agents
- **description**: Research code for "Generative Agents: Interactive Simulacra of Human Behavior." It remains the canonical reference for long-horizon simulated human behavior.
- **popularity**: 8
- **alternatives**: Sotopia, GPTeam, WarAgent
- **why_include**: The best-known baseline for human-like agent simulation.

## FinRobot
- **macroarea**: Vertical Agents / FinTech
- **url**: https://finrobot.ai/
- **description**: Open-source AI agent platform for financial analysis. It targets finance workflows rather than generic chat, making it a useful example of a vertical agent stack.
- **popularity**: 7
- **alternatives**: FinGPT, OpenBB, domain-specific analyst agents
- **why_include**: One of the few clearly agentic open-source finance projects with a dedicated platform framing.

## FinGPT
- **macroarea**: Vertical Agents / FinTech
- **url**: https://ai4finance.org/research/fingpt-open-source-finllm.html
- **description**: Open-source financial LLM project and research umbrella for finance-oriented models and workflows. It is not a pure agent framework, but it is a major upstream building block in fintech agent stacks.
- **popularity**: 8
- **alternatives**: FinRobot, OpenBB, domain-tuned finance models
- **why_include**: Finance agents often build on finance-specific language models and data pipelines.

---

# UI, Telemetry, Voice, and Benchmarks

## Vercel AI SDK Generative User Interfaces
- **macroarea**: Integration / UI Protocol
- **url**: https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces
- **description**: Vercel's concrete React/Next.js pattern for rendering tool results as UI components instead of plain text. The model calls tools, tool outputs flow into typed message parts, and the client renders those parts as interactive components.
- **popularity**: 8
- **alternatives**: AG-UI Protocol, MCP Apps, custom tool-state renderers
- **why_include**: Best concrete TS/React reference for the UI layer between model/tool protocols and a real app.

## OpenTelemetry GenAI Semantic Conventions
- **macroarea**: Observability / Monitoring
- **url**: https://opentelemetry.io/docs/specs/semconv/gen-ai/
- **description**: The OpenTelemetry semantic convention set for generative AI systems, including model spans, agent spans, events, and metrics. The page also documents the stability opt-in path for GenAI conventions and the current development status.
- **popularity**: 8
- **alternatives**: OpenLLMetry, OpenLIT, vendor-specific tracing schemas
- **why_include**: This is the vocabulary layer that makes agent telemetry portable across tools and backends.

## OpenLIT
- **macroarea**: Observability / Monitoring
- **url**: https://github.com/openlit/openlit
- **description**: OpenTelemetry-native observability stack for AI engineering. It provides SDKs, dashboards, prompt management, evaluations, and integrations across many LLM providers, frameworks, and vector stores.
- **popularity**: 7
- **alternatives**: OpenLLMetry, Langfuse, Arize Phoenix, W&B Weave
- **why_include**: Strong concrete bridge from OTEL conventions to an opinionated, usable agent observability stack.

## Daily AI Toolkit
- **macroarea**: Realtime / Voice Agents
- **url**: https://docs.daily.co/guides/products/ai-toolkit
- **description**: Daily's AI-focused call stack for building audio and video workflows. It sits on top of Daily's client SDKs, prebuilt UI, and telephony/SIP capabilities.
- **popularity**: 6
- **alternatives**: LiveKit Agents, Vapi, Retell
- **why_include**: Adds the video-call-native path to the real-time voice stack comparison.

## Retell
- **macroarea**: Realtime / Voice Agents
- **url**: https://docs.retellai.com/
- **description**: End-to-end platform for building, testing, deploying, and monitoring AI phone agents. It emphasizes inbound/outbound calling, simulation testing, and operational monitoring.
- **popularity**: 7
- **alternatives**: Vapi, LiveKit Agents, Daily
- **why_include**: Strong productized phone-agent stack with testing and monitoring built in.

## BrowseComp
- **macroarea**: Evaluation / Benchmarks
- **url**: https://openai.com/index/browsecomp/
- **description**: OpenAI's browsing benchmark with 1,266 hard-to-find information retrieval tasks. It measures persistence, strategic search, and multi-hop synthesis on the public web.
- **popularity**: 8
- **alternatives**: WebArena, TAU-bench, SimpleQA, Deep Research evals
- **why_include**: A clean benchmark for research-stage browsing agents and deep research systems.

## SWE-Lancer
- **macroarea**: Evaluation / Benchmarks
- **url**: https://openai.com/index/swe-lancer/
- **description**: OpenAI's benchmark of 1,400+ real freelance software engineering tasks, including implementation and managerial decisions. It ties model performance to monetary value and ships a public evaluation split.
- **popularity**: 8
- **alternatives**: SWE-bench, Terminal-Bench, AgentBench
- **why_include**: Raises the bar beyond bug fixing by testing real work allocation and value judgment.

---

# Iteration 7 - Curated Repositories & Discovery Layer

## Awesome MCP Servers
- **macroarea**: MCP Ecosystem / Curated Lists
- **url**: https://github.com/punkpeye/awesome-mcp-servers
- **description**: Large community-maintained directory of MCP servers, with category breakdowns, client references, and tutorial links. The repo plus the Glama-backed web directory make it one of the easiest starting points for finding production-ready MCP servers by use case.
- **popularity**: 10
- **alternatives**: awesome-mcp-clients, Glama MCP directory, official MCP registry
- **why_include**: Best discovery layer for the MCP ecosystem; ideal researcher-stage source for locating concrete servers quickly.

## Awesome LLM Apps
- **macroarea**: Research / Curated Apps
- **url**: https://github.com/Shubhamsaboo/awesome-llm-apps
- **description**: High-density collection of practical LLM apps, with strong coverage of starter agents, advanced agents, voice agents, MCP-backed agents, memory tutorials, and RAG. It is especially useful as a pattern library because the repo is organized around runnable examples rather than abstract concepts.
- **popularity**: 10
- **alternatives**: awesome-ai-apps, awesome-copilot, awesome-claude-code
- **why_include**: One of the most useful research-stage repos for concrete agent examples across many stacks.

## Awesome Claude Code
- **macroarea**: Coding Agents / Claude Code Ecosystem
- **url**: https://github.com/hesreallyhim/awesome-claude-code
- **description**: Curated directory of Claude Code skills, hooks, slash commands, orchestrators, plugins, and usage monitors. The repo is valuable because it surfaces the customization layer around Claude Code rather than just the core CLI.
- **popularity**: 9
- **alternatives**: awesome-copilot, awesome-agent-skills, claude-code-docs mirrors
- **why_include**: Best entry point for the Claude Code ecosystem and its surrounding tooling.

## Awesome GitHub Copilot
- **macroarea**: Coding Agents / Copilot Ecosystem
- **url**: https://github.com/github/awesome-copilot
- **description**: GitHub-run marketplace for agents, instructions, skills, hooks, plugins, and workflows for Copilot. It also ships a searchable website and machine-readable `llms.txt`, which makes it unusually easy to mine for usable assets.
- **popularity**: 9
- **alternatives**: awesome-claude-code, awesome-agent-skills, Copilot extension galleries
- **why_include**: Strong vendor-backed source for Copilot customization patterns and reusable assets.

## Awesome Agent Skills
- **macroarea**: Skills / Agent Customization
- **url**: https://github.com/VoltAgent/awesome-agent-skills
- **description**: Large curated collection of official and community agent skills, spanning vendors like Anthropic, Google, Stripe, Cloudflare, Vercel, Sentry, and more. It is explicitly designed to work across multiple clients, which makes it useful for comparing portable skill packs.
- **popularity**: 8
- **alternatives**: awesome-claude-code, awesome-copilot, vendor-specific skill repos
- **why_include**: Best cross-vendor skills directory and a strong signal for reusable agent assets.

## Awesome AI Apps
- **macroarea**: Research / Practical Examples
- **url**: https://github.com/Arindam200/awesome-ai-apps
- **description**: Broad collection of practical AI app examples covering starter agents, voice, MCP, memory, RAG, and advanced workflows. The repo is especially useful because it bundles courses and concrete project directories rather than only listing external links.
- **popularity**: 8
- **alternatives**: awesome-llm-apps, awesome-n8n-templates, vertical agent repos
- **why_include**: Excellent source of runnable examples and stack-specific starter projects for researchers.

## Awesome n8n Templates
- **macroarea**: Business Automation / Workflow Templates
- **url**: https://github.com/enescingoz/awesome-n8n-templates
- **description**: Large template library for n8n with 280+ ready-to-import workflows across email, docs, social, devops, research, and AI use cases. The structure by integration and use case makes it a practical map for automation-heavy agent workflows.
- **popularity**: 8
- **alternatives**: n8n community templates, Dify workflow galleries, Flowise templates
- **why_include**: Best source for concrete automation patterns that can be adapted into agent systems.

## Awesome GPT Agents
- **macroarea**: Security / Curated GPT Directory
- **url**: https://github.com/fr0gger/Awesome-GPT-Agents
- **description**: Cybersecurity-focused directory of GPT agents covering offensive, defensive, OSINT, and compliance use cases. It is narrower than the general-purpose repos, but useful when you need a vertical-specific catalog.
- **popularity**: 6
- **alternatives**: OWASP LLM resources, security skill packs, vertical GPT directories
- **why_include**: Good example of a domain-specific agent directory and a source for security-oriented beads.

---

# Iteration 8 - Research-Stage Example Repos

## AG-UI Dojo
- **macroarea**: UI Protocol / Examples
- **url**: https://dojo.ag-ui.com/
- **description**: Official demo and walkthrough hub for AG-UI. It packages framework-specific examples, previews, and implementation notes so researchers can compare shared state, generative UI, and human-in-the-loop behavior across stacks.
- **popularity**: 6
- **alternatives**: CopilotKit docs demos, Vercel AI SDK generative UI examples, custom protocol demos
- **why_include**: Best hands-on surface for understanding how AG-UI behaves in real apps.

## LiveKit Agent Starter Projects
- **macroarea**: Realtime / Voice Starter Repos
- **url**: https://github.com/livekit-examples/agent-starter-python
- **description**: LiveKit's ready-to-run Python starter for voice agents, with tests, deployment scaffolding, and an AGENTS.md tuned for coding-agent workflows. The sibling Node starter follows the same structure for JS teams.
- **popularity**: 6
- **alternatives**: Vapi examples, Daily AI toolkit samples, Retell quickstarts
- **why_include**: Strong practical starting point for voice-agent researchers who want runnable code rather than platform marketing.

## Anthropic Computer Use Reference Implementation
- **macroarea**: Browser Automation / Reference Repo
- **url**: https://github.com/anthropics/anthropic-quickstarts/tree/main/computer-use-demo
- **description**: Docker-based reference implementation for Claude computer use. It includes the virtual desktop, tool handlers, and agent loop needed to reproduce desktop/browser automation safely.
- **popularity**: 7
- **alternatives**: Playwright agents, Browser Use, Stagehand, operator-style harnesses
- **why_include**: Best concrete implementation to study when researching computer-use agents.

## OpenLIT
- **macroarea**: Observability / Reference Stack
- **url**: https://github.com/openlit/openlit
- **description**: OpenTelemetry-native AI engineering platform with SDKs, dashboards, evaluations, prompt management, and many integrations. It bridges GenAI semantic conventions to a usable stack for tracing and governance.
- **popularity**: 7
- **alternatives**: OpenLLMetry, Langfuse, Arize Phoenix, W&B Weave
- **why_include**: Most complete open stack for turning GenAI telemetry into an operational workflow.

---

# Iteration 11 - Curated Repository Sweep

## Cloudflare Awesome Agents
- **macroarea**: Cloudflare Agents SDK / Curated Lists
- **url**: https://github.com/cloudflare/awesome-agents
- **description**: Curated collection of runnable projects built with the Cloudflare Agents SDK. The repo points directly to example agents, setup instructions, and the Cloudflare agent docs, so it is a compact ecosystem map rather than a generic link dump.
- **popularity**: 6
- **alternatives**: awesome-llm-apps, kyrolabs/awesome-agents, awesome-agentic-patterns
- **why_include**: Good source for studying one SDK's project surface and how example repos are organized around it.

## Awesome Agents (Kyrolabs)
- **macroarea**: Research / Curated Lists
- **url**: https://github.com/kyrolabs/awesome-agents
- **description**: Broad awesome-list covering frameworks, testing and evaluation, software development, research, conversational agents, games, knowledge management, and automation. It works well as a landscape map because each section links to concrete repos and products.
- **popularity**: 8
- **alternatives**: cloudflare/awesome-agents, awesome-llm-apps, awesome-agentic-patterns
- **why_include**: Useful high-level survey repo when you need breadth before narrowing to a subsystem.

## Awesome Voice Agents
- **macroarea**: Voice / Curated Lists
- **url**: https://github.com/yzfly/awesome-voice-agents
- **description**: Curated list of voice AI agent frameworks, tools, resources, and best practices. It is organized by stack layers such as VAD, turn detection, STT, TTS, communities, and learning resources, which makes it useful for mapping the voice pipeline.
- **popularity**: 4
- **alternatives**: LiveKit docs, Pipecat resources, Vapi docs
- **why_include**: Compact index for the voice-agent substack and adjacent tutorials.

## Awesome Agentic Patterns
- **macroarea**: Orchestration / Pattern Catalog
- **url**: https://github.com/nibzard/awesome-agentic-patterns
- **description**: Curated catalogue of repeatable agentic AI patterns with a companion website, pattern explorer, compare tool, decision explorer, and graph visualization. It bridges the gap between high-level concepts and implementation-ready workflows.
- **popularity**: 8
- **alternatives**: Anthropic Building Effective Agents, LangGraph pattern docs, AutoGen design patterns
- **why_include**: Strong source for turning abstract agent ideas into concrete repeatable architectures.

## Awesome Deep Research
- **macroarea**: Research / Deep Research Directory
- **url**: https://github.com/DavidZWZ/Awesome-Deep-Research
- **description**: Resource hub for agentic deep research, split across products, open-source implementations, papers, and benchmarks. It is useful because it tracks both mainstream products and the open-source code that mirrors them.
- **popularity**: 7
- **alternatives**: GPT Researcher, STORM, Open Deep Search, DeepResearchAgent
- **why_include**: Strong one-stop map for deep-research systems and the benchmark ecosystem around them.

## Browser Use Examples
- **macroarea**: Browser Automation / Example Repos
- **url**: https://github.com/browser-use/browser-use-examples
- **description**: Example repo for Browser Use with TypeScript and Python starters. The examples cover a scraper, a browser agent integrated with Vercel AI SDK, a Discord bot, and a Slack bot, so it is immediately useful for researchers who need runnable code.
- **popularity**: 4
- **alternatives**: Browser Use docs, Playwright MCP examples, Stagehand examples
- **why_include**: Concrete starter surface for browser-agent experimentation and integrations.

---

# Iteration 12 - A2UI, voice, telemetry, edge, benchmarks

## A2UI
- **macroarea**: Integration / UI Protocol
- **url**: https://copilotkit.ai/ag-ui-and-a2ui
- **description**: Google-originated declarative generative UI spec for agent responses. It is JSONL-based and streaming, with a focus on platform-agnostic rendering rather than iframe-based app embedding.
- **popularity**: 7
- **alternatives**: AG-UI, MCP Apps, Vercel AI SDK Generative User Interfaces, Open-JSON-UI
- **why_include**: This is the clearest concrete example of the "generative UI spec" layer that sits beside AG-UI.

## Pipecat
- **macroarea**: Realtime / Voice Framework
- **url**: https://github.com/pipecat-ai/pipecat
- **description**: Open-source framework for voice and multimodal conversational AI, supported by the Pipecat community and Daily engineering. It is a practical open runtime for building real-time conversational pipelines.
- **popularity**: 8
- **alternatives**: LiveKit Agents, Vapi, Daily, Retell
- **why_include**: The missing open-source sibling in the voice stack comparison, and a useful Daily-adjacent runtime.

## LM Studio
- **macroarea**: Edge / Local Runtime
- **url**: https://lmstudio.ai/
- **description**: Local AI app and headless runtime for running models privately on your own hardware. It ships JS and Python SDKs, an OpenAI-compatible API, and a no-GUI deployment mode (`llmster`) for servers and CI.
- **popularity**: 7
- **alternatives**: Ollama, llama.cpp, MLX-LM
- **why_include**: Strong local-runtime option for researcher-stage demos and edge deployments, especially when a GUI plus headless server mode are both useful.

## SWE-bench Verified
- **macroarea**: Evaluation / Benchmarks
- **url**: https://www.swebench.com/
- **description**: Human-filtered subset of SWE-bench with 500 instances and a separate leaderboard track. It is the most commonly cited code-agent benchmark variant for apples-to-apples comparisons.
- **popularity**: 9
- **alternatives**: SWE-bench Lite, Terminal-Bench 2.0, BrowseComp, TAU-bench
- **why_include**: The benchmark track most teams reference when they say an agent can "solve SWE-bench".

## Terminal-Bench 2.0
- **macroarea**: Evaluation / Benchmarks
- **url**: https://www.tbench.ai/leaderboard/terminal-bench/2.0
- **description**: Current terminal-agent benchmark with 89 tasks spanning software engineering, ML, security, and data science. The benchmark is optimized for long-horizon CLI mastery rather than toy terminal commands.
- **popularity**: 8
- **alternatives**: Terminal-Bench 1.0, SWE-bench, AgentBench
- **why_include**: Best concrete benchmark for evaluating command-line agent competence today.

## WebArena-x
- **macroarea**: Evaluation / Benchmarks
- **url**: https://webarena.dev/
- **description**: Benchmark family hub for autonomous web agents, covering WebArena, WebArena-Infinity, VisualWebArena, and TheAgentCompany. It gives the family context behind the base web benchmark.
- **popularity**: 7
- **alternatives**: BrowserGym, Mind2Web, BrowseComp
- **why_include**: Useful when the research target is browser automation rather than generic web QA.
