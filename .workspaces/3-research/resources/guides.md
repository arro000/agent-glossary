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
