# Guides & Educational Content — Iteration 1 (2026-04-02)

---

## Foundational Guides

### Building Effective Agents (Anthropic)
- **url**: https://www.anthropic.com/research/building-effective-agents
- **source**: Anthropic Engineering (Erik Schluntz, Barry Zhang), Dec 2024
- **description**: Defines the spectrum from workflows (predefined code paths) to autonomous agents (LLM-directed). Covers 5 workflow patterns: prompt chaining, routing, parallelization, orchestrator-workers, and evaluator-optimizer. Emphasizes simplicity, transparency, and thorough tool documentation (ACI).
- **relevance**: Foundational taxonomy for the whiteboard. The workflow-vs-agent distinction and the 5 patterns directly inform glossary definitions.

### A Practical Guide to Building Agents (OpenAI)
- **url**: https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/
- **source**: OpenAI Business
- **description**: Covers agent design foundations (model + tools + instructions), when to build agents vs. deterministic systems, orchestration patterns (single-agent, manager/decentralized multi-agent), guardrails (relevance, safety, PII, moderation), and human intervention triggers.
- **relevance**: Key complementary perspective to Anthropic's guide. Manager vs. decentralized patterns and guardrails taxonomy essential for glossary.

### Function Calling (OpenAI Platform Docs)
- **url**: https://platform.openai.com/docs/guides/function-calling
- **source**: OpenAI Platform Documentation
- **description**: Comprehensive guide to defining functions via JSON schemas, handling tool calls, namespaces for tool organization, and best practices for function naming, parameter descriptions, and keeping tool count under 20.
- **relevance**: Defines the core mechanism behind how agents interact with tools. The namespace concept and tool search are emerging patterns.

### Effective Harnesses for Long-Running Agents (Anthropic)
- **url**: https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
- **source**: Anthropic Engineering, Nov 2025
- **description**: Explores challenges agents face working across many context windows. Draws parallels to how human engineers manage large, complex projects for creating effective harnesses.
- **relevance**: Addresses the practical challenge of context window limits and agent persistence.

---

## Coding Agent Guides

### Coding Agents 101: The Art of Actually Getting Things Done (Devin/Cognition)
- **url**: https://devin.ai/agents101
- **source**: Cognition (Devin team), June 2025
- **description**: Product-agnostic guide covering prompting basics (defensive prompting, provide test access), workflow integration (delegating, checkpoints, self-verify), automation (shortcuts, code review), customization (MCPs, knowledge bases), limitations, and security.
- **relevance**: Extremely practical. "Defensive prompting" and checkpoint-based delegation are key glossary entries.

### How to Build an AI Coding Agent with Python and Gemini (freeCodeCamp)
- **url**: https://www.freecodecamp.org/news/build-an-ai-coding-agent-with-python-and-gemini/
- **source**: Lane Wagner / freeCodeCamp, Oct 2025
- **description**: Hands-on tutorial building a Claude Code-like agent from scratch. Covers agent function design (file listing, reading, writing, sandboxed execution), function declarations/schema, system prompts, and the agent loop.
- **relevance**: Shows the minimum viable agent architecture. Sandboxed working directory pattern and tool call loop are core concepts.

### Agentic Coding Principles & Practices
- **url**: https://agentic-coding.github.io
- **source**: Benedict Lee / community OSS, 2025
- **description**: Defines 6 principles (developer accountability, understand and verify, security, code quality, human-led design, recognize limitations) and 28 practices across preparation, prompting, review, quality, and workflow.
- **relevance**: The "vibe coding" vs. "agentic coding" distinction is an important conceptual entry.

### Coding for the Future Agentic World (Addy Osmani)
- **url**: https://addyo.substack.com/p/coding-for-the-future-agentic-world
- **source**: Addy Osmani (Google Chrome team), July 2025
- **description**: Comprehensive landscape mapping: CLI agents, multi-agent orchestration, async background coders, AI-assisted testing/CI, integrated AI-first dev environments, and project orchestration tools.
- **relevance**: Definitive landscape mapping. The categorization taxonomy (CLI, orchestrator, async, integrated) is essential.

---

## Framework Selection & Comparison

### The Complete Guide to Choosing an AI Agent Framework in 2025 (Langflow)
- **url**: https://www.langflow.org/blog/the-complete-guide-to-choosing-an-ai-agent-framework-in-2025
- **source**: Langflow / Tejas Kumar, Oct 2025
- **description**: Technical comparison of Langflow, n8n, OpenAI AgentKit, LangChain+LangGraph, CrewAI, and AutoGPT across 10 factors: DX, orchestration model, multi-agent, tooling, memory, evals, observability, deployment, cost, and community.
- **relevance**: The 10-factor evaluation framework and comparison matrix directly useful for "tool selection" glossary section.

---

## Enterprise & Governance

### AI Agent Implementation Playbook (OneReach)
- **url**: https://onereach.ai/whitepapers/ai-agent-implementations-strategy-best-practices/
- **source**: OneReach.ai
- **description**: 5-phase strategy for enterprise AI agent implementation covering best practices for driving efficiency, automation, and ROI.
- **relevance**: Enterprise-focused implementation framework.

### WEF: AI Agents in Action — Foundations for Evaluation and Governance
- **url**: https://www.weforum.org/publications/ai-agents-in-action-foundations-for-evaluation-and-governance-2025/
- **source**: World Economic Forum, 2025
- **description**: Governance framework for AI agents covering evaluation criteria, risk assessment, and organizational readiness.
- **relevance**: Board-level governance considerations for AI agent deployment.

---

# Iteration 2 Guides (2026-04-02)

---

## Agent Framework Guides

### Google ADK Documentation
- **url**: https://google.github.io/adk-docs/
- **source**: Google
- **description**: Comprehensive docs for Google's Agent Development Kit — quickstarts, agents, tools, A2A, evaluation, deployment. Covers all four SDKs (Python, TypeScript, Go, Java).
- **relevance**: Reference implementation for A2A protocol. Essential for understanding how A2A works in practice.

### Pydantic AI Documentation
- **url**: https://ai.pydantic.dev/
- **source**: Pydantic team (Samuel Colvin)
- **description**: Docs for the type-safe Python agent framework. Covers agent creation, structured output, MCP, A2A (FastA2A), graph workflows, dependency injection, and model-agnostic setup.
- **relevance**: Best reference for type-safe agent patterns and Pydantic validation in agent systems.

### Strands Agents Documentation
- **url**: https://strandsagents.com
- **source**: Amazon/AWS
- **description**: Docs for Amazon's open-source agent SDK. Covers steering hooks, MCP, multi-agent patterns, Bedrock integration, conversation memory, and evaluation.
- **relevance**: Best reference for the "model-driven" agent philosophy and steering hooks guardrails pattern.

### Claude Agent SDK Overview
- **url**: https://docs.anthropic.com/en/docs/agent-sdk/overview
- **source**: Anthropic
- **description**: Official docs for Anthropic's programmatic agent SDK. Covers built-in tools, subagents, MCP integration, hooks, sessions, permissions, and multi-cloud deployment (Bedrock, Vertex, Azure).
- **relevance**: Shows how Claude Code's engine is exposed as a library. Subagents and hooks patterns are key glossary entries.

### Mastra Documentation
- **url**: https://mastra.ai
- **source**: Mastra AI (YC W25)
- **description**: Docs for TypeScript-first agent framework. Covers agents, workflows, RAG, memory, MCP, evals, and integration with Next.js/React.
- **relevance**: Best reference for TS/JS-native agent patterns. Memory system (observational, working, semantic recall) is distinctive.

---

## Agentic RAG

### Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection
- **url**: https://arxiv.org/abs/2310.11511
- **source**: Asai et al., Oct 2023
- **description**: Introduces reflection tokens for self-reflective retrieval and generation. Model decides when to retrieve, grades passage relevance, checks support, and evaluates usefulness — all at inference time.
- **relevance**: Foundational paper for agentic RAG. The reflection token concept is a key pattern.

### Corrective RAG (CRAG): Towards Robust Knowledge-Augmented Generation
- **url**: https://arxiv.org/abs/2401.15884
- **source**: Yan et al., Jan 2024
- **description**: Lightweight plug-and-play approach adding retrieval evaluator with corrective actions (web search fallback, query rewriting, knowledge refinement). No model retraining needed.
- **relevance**: Most practical agentic RAG pattern — composable with any existing RAG pipeline.

### Retrieval Augmented Thoughts Elicit Better Reasoning
- **url**: https://arxiv.org/abs/2403.05313
- **source**: Wang et al., Mar 2024
- **description**: Interleaves retrieval at each chain-of-thought step. Dramatically reduces hallucinations in multi-step reasoning (+42.8% task planning improvement).
- **relevance**: Novel pattern combining CoT with retrieval. Strong benchmark results across multiple domains.

---

## Deep Research

### OpenAI Deep Research Guide
- **url**: https://platform.openai.com/docs/guides/deep-research
- **source**: OpenAI Platform Documentation
- **description**: Official guide for using o3-deep-research and o4-mini-deep-research models. Covers the 3-step pipeline (clarification, prompt rewriting, deep research execution), web search, MCP servers, and file search.
- **relevance**: Best reference for the deep research agent architecture from a product perspective.

### STORM: Synthesis of Topic Outlines through Retrieval and Multi-perspective question asking
- **url**: https://github.com/stanford-oval/storm
- **source**: Stanford HAI, NAACL 2024
- **description**: Academic system for writing Wikipedia-like articles using perspective-guided question asking and simulated conversations. Co-STORM enables human-AI collaborative research with dynamic mind maps.
- **relevance**: Best academic reference for the multi-perspective research agent pattern.

---

## MCP Ecosystem

### MCP Apps Specification
- **url**: https://modelcontextprotocol.io/extensions/apps/overview
- **source**: Anthropic / MCP Steering Committee
- **description**: Official spec for MCP Apps extension — interactive HTML UIs rendered inline in AI client conversations via sandboxed iframes and bidirectional JSON-RPC.
- **relevance**: Key extension to MCP. The `ui://` URI scheme and tool-to-UI linkage patterns are new primitives for the whiteboard.

### Awesome MCP Servers
- **url**: https://github.com/punkpeye/awesome-mcp-servers
- **source**: Community (punkpeye), 84k stars
- **description**: Curated list of 800+ MCP servers across all categories — file system, web, database, browser automation, cloud services, developer tools, and more.
- **relevance**: The definitive directory for discovering MCP servers. Essential for the "MCP ecosystem" whiteboard section.

### Microsoft MCP for Beginners
- **url**: https://github.com/microsoft/mcp-for-beginners
- **source**: Microsoft, 15.8k stars
- **description**: Official Microsoft open-source curriculum for MCP fundamentals with real-world, cross-language examples and tutorials.
- **relevance**: Best beginner-friendly MCP guide from a major vendor.

---

## Memory Evaluation

### LOCOMO: Long Conversational Memory Benchmark
- **url**: https://aclanthology.org/2024.acl-long.747/
- **source**: ACL 2024, 343+ citations
- **description**: Benchmark for evaluating long-term conversational memory. ~600 turns, 16K tokens, 32 sessions. Tests single-hop, temporal, multi-hop QA, summarization, and multi-modal generation.
- **relevance**: The de facto standard for memory system evaluation. Key scores and methodology needed for the memory whiteboard section.

---

## Iteration 3 Guides (2026-04-02)

### AG-UI Protocol
- **url**: https://ag-ui.com
- **source**: CopilotKit
- **description**: Official protocol page for the agent-user interaction layer. Explains shared state, tool-based GenUI, subgraphs, human-in-the-loop, and how AG-UI fits alongside MCP and A2A.
- **relevance**: Best primary source for understanding the frontend/runtime boundary of agentic applications.

### Semantic Kernel Agent Framework
- **url**: https://learn.microsoft.com/en-us/semantic-kernel/frameworks/agent/
- **source**: Microsoft Learn
- **description**: Intro/tutorial page for the SK Agent Framework. Covers what an agent is, why to use it, and which packages/modules to install across .NET, Python, and Java.
- **relevance**: Best official entry point for the Microsoft agent stack.

### CrewAI Flows
- **url**: https://docs.crewai.com/en/concepts/flows
- **source**: CrewAI docs
- **description**: Documentation for event-driven orchestration in CrewAI. Covers start/listen, persistence, routing, state management, and human feedback.
- **relevance**: Essential for understanding the practical split between Crews and Flows.

### Vercel AI SDK Agents Overview
- **url**: https://sdk.vercel.ai/docs/agents/overview
- **source**: Vercel AI SDK docs
- **description**: Official overview of the agent abstraction in the Vercel AI SDK. Introduces ToolLoopAgent and how context management and stopping conditions are handled.
- **relevance**: Cleanest entry point for TS-native agent building in the Vercel ecosystem.

### Vercel AI SDK Workflow Patterns
- **url**: https://sdk.vercel.ai/docs/agents/workflows
- **source**: Vercel AI SDK docs
- **description**: Documents sequential, routing, parallel, orchestrator-worker, and evaluator-optimizer patterns with code examples.
- **relevance**: Directly useful for comparing the AI SDK to graph-based frameworks.

### MCP Inspector
- **url**: https://modelcontextprotocol.io/docs/tools/inspector
- **source**: MCP docs
- **description**: Official interactive tool for testing and debugging MCP servers. It inspects tools, prompts, resources, and notifications, and can run local servers via npx.
- **relevance**: Essential developer tool for the MCP ecosystem.

### LiveKit Voice AI Quickstart
- **url**: https://docs.livekit.io/agents/start/voice-ai-quickstart/
- **source**: LiveKit docs
- **description**: Step-by-step quickstart for building a realtime voice assistant. Covers starter projects, STT-LLM-TTS vs realtime models, testing, deployment, and the agent server lifecycle.
- **relevance**: Best onboarding path for practical voice-agent engineering.

### Vapi Introduction
- **url**: https://docs.vapi.ai/quickstart/introduction.mdx
- **source**: Vapi docs
- **description**: Overview of the Vapi platform and its core primitives: Assistants and Squads. Also explains the STT-LLM-TTS stack, phone calls, web integrations, and test suites.
- **relevance**: Good primer on the productized voice-agent stack.

### Vapi Banking Support Example
- **url**: https://docs.vapi.ai/assistants/examples/inbound-support.mdx
- **source**: Vapi docs
- **description**: Concrete finance/support tutorial that builds a banking support agent with tools, knowledge bases, phone numbers, and voice test suites.
- **relevance**: Useful vertical example for the FinTech agent section.

### Ollama Quickstart
- **url**: https://docs.ollama.com/quickstart
- **source**: Ollama docs
- **description**: Quickstart for launching local models, integrating with coding tools, and using the local API.
- **relevance**: Strong entry point for local/edge model usage in agent workflows.

### Anthropic Computer Use
- **url**: https://docs.anthropic.com/en/docs/build-with-claude/computer-use
- **source**: Anthropic docs
- **description**: Reference guide for the computer-use beta, including the agent loop, safety guidance, sandboxing requirements, and the official reference implementation.
- **relevance**: The canonical tutorial for desktop/browser automation with an LLM.

### OpenLLMetry
- **url**: https://www.traceloop.com/openllmetry
- **source**: Traceloop
- **description**: Shows how to instrument LLM apps with OpenTelemetry using a small SDK layer. Includes examples for Python and TypeScript plus supported observability backends.
- **relevance**: Best bridge between agent observability and the broader OTEL ecosystem.

### OpenTelemetry Semantic Conventions for Generative AI
- **url**: https://opentelemetry.io/docs/specs/semconv/gen-ai/
- **source**: OpenTelemetry
- **description**: Official spec landing page for GenAI spans, events, metrics, and agent spans. Documents the current development status and stability opt-in path.
- **relevance**: Canonical telemetry vocabulary for agent and model instrumentation.

### OpenLIT
- **url**: https://github.com/openlit/openlit
- **source**: OpenLIT
- **description**: OpenTelemetry-native AI observability stack with SDKs, dashboards, prompt management, and evaluations. The docs emphasize one-line instrumentation and broad framework/provider coverage.
- **relevance**: Concrete implementation of OTEL-first agent observability.

### AG-UI Dojo
- **url**: https://dojo.ag-ui.com/
- **source**: CopilotKit / AG-UI
- **description**: Official demo hub for AG-UI with framework-specific walkthroughs, previews, and implementation details. Useful for studying shared state, tool-based generative UI, and HITL flows.
- **relevance**: Best practical companion to the AG-UI protocol docs.

### LiveKit Agent Starter Projects
- **url**: https://github.com/livekit-examples/agent-starter-python
- **source**: LiveKit Examples
- **description**: Ready-to-run Python starter project for LiveKit Agents, including tests, deployment scaffolding, and an AGENTS.md optimized for coding agents. The Node starter mirrors the same setup for JS teams.
- **relevance**: Best concrete repo for starting a voice-agent implementation quickly.

### Anthropic Computer Use Reference Implementation
- **url**: https://github.com/anthropics/anthropic-quickstarts/tree/main/computer-use-demo
- **source**: Anthropic Quickstarts
- **description**: Docker-based reference implementation containing the virtual desktop, tool handlers, and agent loop for computer-use agents. It is the most practical starting point for studying safe desktop automation.
- **relevance**: Canonical reference for computer-use style automation.

---

## Evaluation and Benchmarks

### SWE-bench Leaderboards
- **url**: https://www.swebench.com/
- **source**: SWE-bench project
- **description**: Official benchmark and leaderboard hub for software-engineering agents. Covers SWE-bench, Verified, Lite, Multilingual, Multimodal, and related family projects.
- **relevance**: Important reference for current coding-agent evaluation practice.

### WebArena
- **url**: https://webarena.dev/
- **source**: WebArena project
- **description**: Official site for the realistic web-agent benchmark and its verified variants. Useful for browser navigation and computer-use evaluation.
- **relevance**: Best source for browser task-completion agent benchmarks.

### BrowseComp
- **url**: https://openai.com/index/browsecomp/
- **source**: OpenAI Research
- **description**: Benchmark for hard-to-find information retrieval on the public web. Focuses on persistence, strategic browsing, and easy-to-verify answers.
- **relevance**: Strong benchmark for deep-research and browsing agents.

### SWE-Lancer
- **url**: https://openai.com/index/swe-lancer/
- **source**: OpenAI Research
- **description**: Benchmark of real freelance software engineering tasks from Upwork, including both implementation and managerial decisions. Connects agent performance to monetary value.
- **relevance**: Important next-step benchmark beyond SWE-bench for evaluating real work allocation.

### Terminal-Bench 2.0
- **url**: https://www.tbench.ai/
- **source**: Terminal-Bench / Laude Institute
- **description**: Terminal benchmark with a latest 2.0 leaderboard and 89 high-quality tasks across software engineering, ML, security, and data science. Built for measuring terminal mastery in long-horizon agents.
- **relevance**: Best terminal-agent benchmark reference and a useful complement to SWE-bench.

### Daily AI Toolkit
- **url**: https://docs.daily.co/guides/products/ai-toolkit
- **source**: Daily
- **description**: Daily's AI toolkit docs for building audio/video AI workflows with client SDKs, prebuilt UI, and telephony support.
- **relevance**: Helpful for voice-agent infrastructure and media transport comparisons.

### Retell Introduction
- **url**: https://docs.retellai.com/
- **source**: Retell AI
- **description**: Platform overview for building, testing, deploying, and monitoring AI phone agents. Covers playground testing and simulation testing.
- **relevance**: Practical guide for phone-agent deployment and testing workflows.

### Sotopia Docs
- **url**: https://docs.sotopia.world/
- **source**: Sotopia Lab
- **description**: Official docs for a social learning environment for AI agents. Includes installation, examples, and a quick tutorial notebook.
- **relevance**: Good entry point for agent simulation and social intelligence research.

### Awesome Copilot Learning Hub
- **url**: https://awesome-copilot.github.com/learning-hub
- **source**: GitHub / awesome-copilot
- **description**: Curated learning area for Copilot customization, covering agents, skills, instructions, hooks, MCP servers, and workflow patterns. Useful as a practical entry point before mining the full repo.
- **relevance**: Best tutorial surface for the Copilot customization ecosystem.

### AWS Strands Course for Beginners
- **url**: https://www.youtube.com/playlist?list=PLMZM1DAlf0Lrc43ZtUXAwYu9DhnqxzRKZ
- **source**: Arindam200 / AWS Strands
- **description**: Eight-lesson hands-on course covering agent fundamentals, MCP integration, human-in-the-loop, multi-agent orchestration, observability, safety, and production patterns. It is a practical companion to the AWS Strands examples in `awesome-ai-apps`.
- **relevance**: Strong beginner-friendly guided path for the Strands ecosystem.

---

## Iteration 11 Guides (2026-04-02)

### Cloudflare Agents SDK Documentation
- **url**: https://developers.cloudflare.com/agents/
- **source**: Cloudflare
- **description**: Official documentation for the Cloudflare Agents SDK, including getting started material and project guidance for distributed agents on Cloudflare's network.
- **relevance**: Best primary source for the Cloudflare agent ecosystem.

### Awesome Agentic Patterns
- **url**: https://agentic-patterns.com
- **source**: nibzard / community
- **description**: Interactive pattern explorer, compare tool, decision explorer, and graph visualizations for agentic patterns.
- **relevance**: Best discovery surface for reusable agent architectures.

### Awesome Deep Research
- **url**: https://github.com/DavidZWZ/Awesome-Deep-Research
- **source**: DavidZWZ
- **description**: Curated map of deep research products, open-source implementations, papers, and benchmarks.
- **relevance**: Good entry point when mapping deep-research ecosystems.

### Awesome Voice Agents
- **url**: https://github.com/yzfly/awesome-voice-agents
- **source**: yzfly
- **description**: Curated voice-agent stack map covering frameworks, VAD, turn detection, STT, TTS, and learning resources.
- **relevance**: Useful primer for voice-agent researchers.

### Browser Use Examples
- **url**: https://github.com/browser-use/browser-use-examples
- **source**: browser-use
- **description**: Starter example collection for Browser Use in TypeScript and Python.
- **relevance**: Handy runnable repo for browser-agent onboarding.

---

## Iteration 12 Guides (2026-04-02)

### AG-UI and A2UI Explained
- **url**: https://copilotkit.ai/ag-ui-and-a2ui
- **source**: CopilotKit
- **description**: Explains the difference between AG-UI as the agent-user runtime protocol and A2UI as the declarative generative UI spec.
- **relevance**: Best primary source for the A2UI vs AG-UI distinction.

### AG-UI Generative UI Specs
- **url**: https://docs.ag-ui.com/concepts/generative-ui-specs
- **source**: AG-UI docs
- **description**: Official overview of A2UI, MCP-UI, and Open-JSON-UI as generative UI specs, plus AG-UI as the transport/runtime layer.
- **relevance**: Useful when mapping the UI/protocol layer of agent apps.

### Vercel AI SDK Generative User Interfaces
- **url**: https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces
- **source**: Vercel
- **description**: Concrete React/Next.js implementation pattern for rendering tool output as typed UI components.
- **relevance**: Best practical guide for the TS/React generative UI path.

### LiveKit Voice AI Quickstart
- **url**: https://docs.livekit.io/agents/start/voice-ai/
- **source**: LiveKit
- **description**: Full quickstart for building and deploying a voice assistant in less than 10 minutes, including starter projects, transport, testing, telephony, and deployment.
- **relevance**: Strongest onboarding guide for the open voice stack.

### Daily AI Toolkit
- **url**: https://docs.daily.co/guides/products/ai-toolkit
- **source**: Daily
- **description**: Introduces Pipecat and the Daily Python SDK as the two main paths for real-time voice and video AI workflows.
- **relevance**: Best guide for understanding Daily as a media stack rather than a voice-agent framework.

### Vapi Introduction
- **url**: https://docs.vapi.ai/quickstart/introduction.mdx
- **source**: Vapi
- **description**: Quick intro to Assistants and Squads, with phone calls, web integration, and real-time voice agent primitives.
- **relevance**: Best entry point for the platformized voice-agent path.

### Retell Introduction
- **url**: https://docs.retellai.com/
- **source**: Retell AI
- **description**: Platform overview for building, testing, deploying, and monitoring AI phone agents, including simulation testing.
- **relevance**: Good reference for phone-agent ops and testing workflows.

### Pipecat Docs
- **url**: https://docs.pipecat.ai/
- **source**: Pipecat
- **description**: Documentation for the open-source voice and multimodal conversational AI framework.
- **relevance**: Useful open-source alternative for the realtime voice stack.

### OpenTelemetry GenAI Semantic Conventions
- **url**: https://opentelemetry.io/docs/specs/semconv/gen-ai/
- **source**: OpenTelemetry
- **description**: Canonical spec for GenAI spans, metrics, events, and agent spans, including stability opt-in notes.
- **relevance**: The standard vocabulary layer for telemetry across agent frameworks.

### OpenLLMetry
- **url**: https://www.traceloop.com/openllmetry
- **source**: Traceloop
- **description**: OpenTelemetry-based instrumentation layer with SDKs and broad backend support.
- **relevance**: Practical bridge from GenAI semconv to existing observability stacks.

### OpenLIT
- **url**: https://github.com/openlit/openlit
- **source**: OpenLIT
- **description**: OpenTelemetry-native AI engineering platform with SDKs, dashboards, evals, prompt management, and broad framework support.
- **relevance**: Good guide for a full OTEL-first AI engineering stack.

### Ollama Docs
- **url**: https://docs.ollama.com/
- **source**: Ollama
- **description**: Quickstart and API docs for local model runtime and tool integration.
- **relevance**: Best on-ramp for local inference in the edge runtime path.

### llama.cpp README
- **url**: https://github.com/ggml-org/llama.cpp
- **source**: ggml-org
- **description**: Canonical documentation for the C/C++ inference runtime, quantization, server mode, and hardware backends.
- **relevance**: Core reference for CPU-first and quantized deployment.

### MLX-LM README
- **url**: https://github.com/ml-explore/mlx-lm
- **source**: ml-explore
- **description**: Python package for generating and fine-tuning models on Apple silicon with MLX, including prompt caching and streaming generation.
- **relevance**: Best Apple-silicon edge path in the local runtime family.

### LM Studio Home
- **url**: https://lmstudio.ai/
- **source**: LM Studio
- **description**: Local AI app with SDKs, OpenAI-compatible API, and headless server mode.
- **relevance**: Useful if the runtime needs a GUI-first workflow plus headless deployment.

### SWE-bench Leaderboards
- **url**: https://www.swebench.com/
- **source**: SWE-bench
- **description**: Official leaderboard for the SWE-bench family, including Verified, Lite, Multilingual, and Multimodal tracks.
- **relevance**: Core guide for code-agent evaluation.

### Terminal-Bench 2.0
- **url**: https://www.tbench.ai/
- **source**: Terminal-Bench
- **description**: Official site for terminal-agent benchmarks, including the 2.0 leaderboard and task examples.
- **relevance**: Best source for long-horizon terminal evaluation.

### WebArena-x
- **url**: https://webarena.dev/
- **source**: WebArena-x
- **description**: Hub for the WebArena family of benchmarks.
- **relevance**: Best way to see the browser-agent benchmark family in one place.

### BrowseComp
- **url**: https://openai.com/index/browsecomp/
- **source**: OpenAI Research
- **description**: Benchmark for browsing agents focused on hard-to-find information and strategic search.
- **relevance**: Important for deep-research and browsing agent evaluation.

### SWE-Lancer
- **url**: https://openai.com/index/swe-lancer/
- **source**: OpenAI Research
- **description**: Benchmark of real freelance software engineering tasks, spanning implementation and managerial decisions.
- **relevance**: Good next-step benchmark beyond issue-fixing.

### Sotopia Docs
- **url**: https://docs.sotopia.world/
- **source**: Sotopia Lab
- **description**: Documentation for a social learning environment for AI agents.
- **relevance**: Best entry point for agent simulation work.

### Generative Agents Repo
- **url**: https://github.com/joonspk-research/generative_agents
- **source**: Joon Sung Park research repo
- **description**: Research code for the canonical long-horizon social simulation paper.
- **relevance**: Baseline reference for human-like agent simulation.

---

## Iteration 14 Guides (2026-04-02)

### Claude Code Hooks Guide
- **url**: https://docs.anthropic.com/en/docs/claude-code/hooks-guide
- **source**: Anthropic
- **description**: Step-by-step guide to Notification, PostToolUse, PreToolUse, compaction reinjection, config auditing, and permission automation with hooks. Shows command, HTTP, prompt, and agent hook styles.
- **relevance**: Best practical entry point for the harness-policy layer around Claude Code.

### Claude Code Subagents
- **url**: https://docs.anthropic.com/en/docs/claude-code/subagents
- **source**: Anthropic
- **description**: Explains built-in and custom subagents, tool restrictions, memory scopes, hooks, and foreground/background execution. Includes patterns for isolation, parallel research, and chaining subagents.
- **relevance**: Core guide for context isolation and delegation.

### Aider Repo Map
- **url**: https://aider.chat/docs/repomap.html
- **source**: Aider
- **description**: Documents Aider's codebase map and how it uses structure to work in larger repositories.
- **relevance**: Best reference for codebase-map style navigation.

### Context7 Platform
- **url**: https://github.com/upstash/context7
- **source**: Upstash
- **description**: README for Context7's MCP server and CLI/skills flow. Shows how to fetch up-to-date library docs and use version-specific context.
- **relevance**: Best guide for reference-aware documentation retrieval.

### Promptfoo Getting Started
- **url**: https://www.promptfoo.dev/docs/getting-started/
- **source**: Promptfoo
- **description**: Quickstart for running evals, comparing models, and iterating locally with declarative configs.
- **relevance**: Best practical tutorial for eval harness iteration.

### Promptfoo Red Teaming
- **url**: https://www.promptfoo.dev/docs/red-team/
- **source**: Promptfoo
- **description**: Guide for vulnerability scanning and red teaming of prompts, agents, and RAG systems.
- **relevance**: Strong source for harness hardening workflows.

### Inspect AI README
- **url**: https://github.com/UKGovernmentBEIS/inspect_ai
- **source**: UK AI Security Institute
- **description**: Project README summarizing prompt engineering, tool usage, multi-turn dialogs, model-graded evals, and the prebuilt eval library.
- **relevance**: Good research-grade eval harness intro.

### OpenAI Evals README
- **url**: https://github.com/openai/evals
- **source**: OpenAI
- **description**: Explains the eval registry, custom evals, benchmark templates, and build/run workflow.
- **relevance**: Best reference for OpenAI-style benchmark iteration.

## Iteration 16 Guides (2026-04-02)

### OpenAI Agents SDK Guardrails
- **url**: https://openai.github.io/openai-agents-python/guardrails/
- **source**: OpenAI Agents SDK docs
- **description**: First-party guide to workflow boundaries, input/output/tool guardrails, execution modes, and tripwires.
- **relevance**: Best practical reference for the policy layer around agent execution.

### OpenAI Agents SDK Tracing
- **url**: https://openai.github.io/openai-agents-python/tracing/
- **source**: OpenAI Agents SDK docs
- **description**: Explains traces and spans, custom processors, sensitive data handling, and exporting traces to external backends.
- **relevance**: Best first-party telemetry guide for the OpenAI agent runtime.

### LangSmith Evaluation Quickstart
- **url**: https://docs.langchain.com/langsmith/evaluation-quickstart
- **source**: LangSmith docs
- **description**: Quickstart for programmatic evals, datasets, and regression testing inside LangSmith.
- **relevance**: Strongest closed-loop guide when tracing and evals live in the same product.

### Aider Repo Map
- **url**: https://aider.chat/docs/repomap.html
- **source**: Aider docs
- **description**: Shows how Aider builds and uses a repo map to navigate large codebases.
- **relevance**: Best practical guide for repo-map style context navigation.

## Iteration 18 Guides (2026-04-02)

### LangGraph Overview
- **url**: https://docs.langchain.com/oss/python/langgraph/overview
- **source**: LangChain
- **description**: Overview of LangGraph as a low-level runtime for stateful, long-running agents. Covers durable execution, human-in-the-loop, memory, and LangSmith debugging.
- **relevance**: Best primary source for durable agent execution and checkpoint-friendly workflow design.

### AgentOps README
- **url**: https://github.com/AgentOps-AI/agentops
- **source**: AgentOps
- **description**: Repository README for the agent observability and session replay platform. Shows replay graphs, cost tracking, and framework integrations in one place.
- **relevance**: Good practical reference for trace-driven debugging and session replay.

### OpenLIT README
- **url**: https://github.com/openlit/openlit
- **source**: OpenLIT
- **description**: Repository README for the OpenTelemetry-native AI engineering platform. Covers observability, evaluations, rule engine, prompt management, and the supported integrations surface.
- **relevance**: Best open-stack reference for OTEL-first harness observability.

### Graphiti README
- **url**: https://github.com/getzep/graphiti
- **source**: Zep
- **description**: README for the temporal context graph engine used for evolving agent memory. Highlights hybrid retrieval, provenance, and the MCP server surface.
- **relevance**: Strong guide for reference-aware retrieval beyond flat summaries.

## Iteration 19 Guides (2026-04-02)

### Temporal Workflow
- **url**: https://docs.temporal.io/workflows
- **source**: Temporal
- **description**: Official workflow docs covering deterministic definitions, event history, replay, schedules, and resilience.
- **relevance**: Best primary reference for durable execution and checkpointed agent runtimes.

### Sourcegraph Code Search
- **url**: https://sourcegraph.com/code-search
- **source**: Sourcegraph
- **description**: Product page for searching and understanding large codebases with filters, operators, and cross-repo search.
- **relevance**: Best guide for enterprise code-search-driven context navigation.

### Sourcegraph MCP
- **url**: https://sourcegraph.com/mcp
- **source**: Sourcegraph
- **description**: MCP surface for exposing Sourcegraph code intelligence to agents.
- **relevance**: Useful reference for agent-facing code intelligence and code-graph context injection.

## Iteration 23 Guides (2026-04-02)

### Effective Harnesses for Long-Running Agents
- **url**: https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
- **source**: Anthropic
- **description**: Explains the initializer-agent + coding-agent setup, feature lists, progress files, init scripts, and git handoff pattern for work that spans many context windows.
- **relevance**: Best practical source for long-horizon harness bootstrap design.

### OpenAI Agents SDK Sessions
- **url**: https://openai.github.io/openai-agents-python/sessions/
- **source**: OpenAI Agents SDK docs
- **description**: Covers session-backed memory, persistence backends, compaction sessions, encrypted sessions, and resume semantics.
- **relevance**: Best first-party reference for session state in the OpenAI harness.

---

## Harness / Retrieval Additions

### LangGraph Persistence
- **url**: https://docs.langchain.com/oss/python/langgraph/persistence
- **source**: LangChain / LangGraph
- **description**: Official guide to checkpointed state, threads, replay, time travel, and the store layer for cross-thread memory.
- **relevance**: Best reference for durable execution and resumable agent workflows.

### OpenAI Trace Grading
- **url**: https://platform.openai.com/docs/guides/trace-grading
- **source**: OpenAI Platform
- **description**: Shows how to score workflow traces and turn debugging findings into repeatable evals.
- **relevance**: Best first-party guide for a trace-to-eval feedback loop.

### OpenAI Agents SDK Sessions
- **url**: https://openai.github.io/openai-agents-python/sessions/
- **source**: OpenAI Agents SDK docs
- **description**: Covers session-backed conversation history, compaction, persistence backends, and encrypted sessions.
- **relevance**: Strong practical reference for harness state that survives across turns.

### OpenAI Retrieval
- **url**: https://platform.openai.com/docs/guides/retrieval
- **source**: OpenAI Platform
- **description**: Explains vector stores, semantic search, query rewriting, metadata filters, ranking, and citations.
- **relevance**: Best OpenAI-native guide for reference-aware retrieval.

### OpenAI File Search
- **url**: https://platform.openai.com/docs/guides/tools-file-search
- **source**: OpenAI Platform
- **description**: Shows how to use the hosted file_search tool with vector stores inside Responses.
- **relevance**: Best practical guide for managed retrieval inside the model loop.

### OpenAI Compaction
- **url**: https://platform.openai.com/docs/guides/compaction
- **source**: OpenAI Platform
- **description**: Explains server-side and standalone compaction for long-running Responses workflows, including `previous_response_id` chaining and opaque compaction items.
- **relevance**: Best first-party guide for shrinking context without manually summarizing everything yourself.

### Mastra Server Middleware
- **url**: https://mastra.ai/docs/server/middleware
- **source**: Mastra
- **description**: Docs for request middleware that can authenticate, inject request-scoped context, short-circuit requests, and alter header behavior around agent routes.
- **relevance**: Strong practical reference for server-level harness policy in a TS-native stack.

### LangSmith Custom Middleware
- **url**: https://docs.langchain.com/langsmith/custom-middleware.md
- **source**: LangChain / LangSmith
- **description**: Guide for adding custom middleware to LangSmith/LangGraph deployments using a Starlette/FastAPI app. Useful for auth, logging, and response mutation around agent servers.
- **relevance**: Best first-party reference for Python deployment middleware around LangSmith-backed agent servers.
