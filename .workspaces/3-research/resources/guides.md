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
