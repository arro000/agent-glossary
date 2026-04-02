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
