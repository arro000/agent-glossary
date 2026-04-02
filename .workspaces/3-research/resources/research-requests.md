# Research Requests

## Priorità Alta
1. ~~Quali sono i principali framework agentici per coding nel 2025?~~ ✅ DONE
2. ~~MCP (Model Context Protocol) — stato attuale e adozione~~ ✅ DONE
3. ~~ACP (Agent Communication Protocol) — cos'è e come si differenzia da MCP~~ ✅ DONE (ACP merged into A2A)

## Priorità Media
4. ~~Nuovi pattern di multi-agent orchestration~~ ✅ DONE
5. ~~Strumenti di observability per agenti AI (LangSmith, LangFuse, Weave)~~ ✅ DONE
6. ~~Ambienti sandbox per code execution (E2B, Modal, Daytona)~~ ✅ DONE
7. ~~Sistemi di memory per agenti (MemGPT/Letta, Zep, etc.)~~ ✅ DONE

## Esplorazione
8. ~~Guide su come progettare l'ambiente di un coding agent~~ ✅ DONE
9. ~~Best practices per tool selection in agent systems~~ ✅ DONE
10. ~~Trends emergenti nell'ecosistema agentico~~ ✅ DONE

## Iterazione 2 — Completate ✅

### Priorità Alta
1. ~~Google ADK (Agent Development Kit)~~ ✅ DONE — 18.7k stars, reference A2A implementation, 4 SDKs, ADK 2.0 alpha
2. ~~Mastra~~ ✅ DONE — 22.6k stars, TS-first, YC W25, native Next.js, built-in MCP/eval/memory
3. ~~Pydantic AI~~ ✅ DONE — 16k stars, type-safe, FastA2A, 15+ providers, strong Google partnership
4. ~~Strands Agents SDK (Amazon)~~ ✅ DONE — 5.5k stars, Apache 2.0, steering hooks, Bedrock-native

### Priorità Media
5. ~~Claude Agent SDK~~ ✅ DONE — Claude Code engine as library, subagents, MCP, multi-cloud (Bedrock, Vertex, Azure)
6. ~~Deep Research Agents~~ ✅ DONE — Pattern documented + 5 implementations (OpenAI, Gemini, GPT Researcher, STORM, Tongyi)
7. ~~Agent Framework per automazione business~~ ✅ DONE — 6 platforms analyzed (n8n 182k, Dify 136k, Langflow 147k, Flowise 51k, Zapier, Make)
8. ~~MCP Apps~~ ✅ DONE — SEP-1865 Final, spec 2026-01-26, adopted by Claude/ChatGPT/VS Code Copilot

### Esplorazione
9. ~~Agentic RAG~~ ✅ DONE — 5 sub-patterns (Self-RAG, CRAG, Adaptive, RAT, General Agentic) with papers
10. ~~MCP Server showcase~~ ✅ DONE — 6,300+ servers, top 8 catalogued (Context7 51k, Chrome DevTools 32.9k, GitHub 28.5k, Playwright 30.1k)
11. ~~LOCOMO Benchmark~~ ✅ DONE — ACL 2024, 343+ citations, scores: Mem0 66.9%, Full-context 72.9%, OpenAI 52.9%
12. ~~Agenzie open-source per task specifici~~ ✅ DONE — CopilotKit 29.9k, Agent-Reach 14.5k, SGLang 25.3k, AgentOps 5.4k, OpenSandbox 9.7k

## Iterazione 3 — Nuove Richieste

### Priorità Alta
1. **AG-UI Protocol** (CopilotKit) — Cos'è? Come si confronta con MCP/A2A? Adozione
2. **Semantic Kernel** (Microsoft) — Framework enterprise Microsoft per agenti, stato e caratteristiche
3. **CrewAI Flows vs Crews** — Sistema event-driven di CrewAI, come si differenzia dai Crew
4. **Vercel AI SDK** — Uso per agenti, confronto con Mastra per TS ecosystem

### Priorità Media
5. **MCP Inspector / Debug Tools** — Strumenti per debug e sviluppo di server MCP
6. **Agent Banking / FinTech Agents** — Agenti specifici per settore finanziario
7. **Real-time Voice Agents** — SDK e framework per agenti vocali (LiveKit, Daily, Retell, Vapi)
8. **Embedded / Edge Agents** — Agenti on-device (Ollama, llama.cpp, Apple MLX, Gemini Nano)

### Esplorazione
9. **Agent Simulation / Wario-type frameworks** — Simulazione di comportamenti umani con agenti
10. **Data-Centric Agent Evaluation** — Framework di valutazione oltre LOCOMO (SWE-bench, Aider polyglot, etc.)
11. **OpenTelemetry for Agents** — Standard telemetry per l'ecosistema agentico
12. **Anthropic Computer Use API** — Stato avanzato, use cases, confronto con UI automation tradizionale

## Iterazione 4 - Da esplorare
13. **PixiJS v8 text rendering per emoji/icon** — Migliori pratiche per mantenere emoji leggibili e crisp a dimensioni piccole
14. **Visual encoding per nodi a dimensione fissa** — Pattern per rappresentare peso/importanza senza cambiare il diametro delle bolle

## Iterazione 5 — Nuove Richieste

### Priorità Alta
1. **A2UI / Google Generative UI** — specifica, adozione e differenze reali rispetto ad AG-UI
2. **Realtime Voice Stack** — LiveKit vs Vapi vs Daily vs Retell, con focus su SDK, telephony, testing e deployment
3. **OpenTelemetry GenAI conventions** — standard di tracing per agenti e librerie di instrumentation rilevanti

### Priorità Media
4. **Edge runtimes per agenti** — Ollama vs llama.cpp vs MLX-LM vs LM Studio, con focus su Apple Silicon e CPU-only
5. **Benchmark family for long-horizon agents** — SWE-Lancer, Terminal-Bench 2, BrowseComp, WebArena-Verified, TAU-bench
6. **Vertical agent frameworks** — altri esempi concreti per finance/healthcare/support oltre FinRobot e Vapi

### Esplorazione
7. **Anthropic computer use safety** — reference implementations, sandboxing, prompt-injection mitigations, browser automation
8. **Agent simulation stacks** — Sotopia, Generative Agents, GPTeam, WarAgent, e altri ambienti sociali/synthetic

## Iterazione 6 — Nuove Richieste

### Priorità Alta
1. **Google Generative UI / A2UI** — adozione reale, esempi ufficiali, differenze pratiche rispetto a AG-UI e AI SDK UI
2. **Voice platform decision guide** — confronto operativo Daily vs Retell vs LiveKit vs Vapi (telephony, testing, deployment, pricing, SDK)

### Priorità Media
3. **OpenTelemetry GenAI adoption** — SDK che emettono già le semantic conventions GenAI e compatibilità cross-backend
4. **BrowseComp ecosystem** — implementazioni open-source, harness di valutazione, e agenti browsing che lo usano come target

### Esplorazione
5. **Terminal-Bench 3.0** — stato del benchmark in sviluppo e task design pattern
6. **SWE-Lancer follow-up** — manager vs implementation tasks, dataset split, e framework di valutazione comparabile

## Iterazione 7 — Nuove Richieste

### Priorità Alta
1. **Agent Registry / Discovery** — NANDA, ERC-8004, Virtuals, A2A Agent Cards: quali directory, registry e capability cards sono davvero adottati?
2. **Awesome MCP Servers landscape** — quali server e categorie dominano, e quali aggregatori/registries sono i più utili per il researcher stage?

### Priorità Media
3. **Claude Code vs Copilot customization ecosystems** — confrontare skills, hooks, slash commands, plugins, linting e quality patterns tra awesome-claude-code, awesome-copilot e awesome-agent-skills.
4. **Voice agent example repos** — mappare starter/template utili da LiveKit, Vapi, Daily, Pipecat e raccolte di esempi.

### Esplorazione
5. **Vertical agent directories** — finance, security, research e DevOps collections da promuovere come beads.
6. **Repo quality signals** — come valutare freschezza, struttura, metadati machine-readable e utilità pratica delle curated lists.

## Iterazione 8 — Da esplorare
7. **PixiJS v8 emoji rendering** — pratiche migliori per mantenere emoji/icon leggibili e crisp dentro Text su canvas ad alto DPI

## Iterazione 9 — Nuove Richieste

### Priorità Alta
1. **Browser automation ecosystem** — Browser Use, Stagehand, Playwright MCP, Firecrawl, operator-style frameworks: quali sono davvero usabili per researcher/browsing agents?
2. **Voice agent evaluation stack** — test, simulation, and eval tooling per LiveKit, Vapi, Daily, Retell; quali repos e harness sono più utili?

### Priorità Media
3. **Agent registry/discovery adoption** — A2A Agent Cards, NANDA, ERC-8004, Glama, MCP registries: quali directory e capability cards hanno adozione reale?
4. **Vertical finance/support agent stacks** — OpenBB, FinRobot, FinGPT, customer-support templates e altri example repos da promuovere come beads.

### Esplorazione
5. **Curated repo quality signals** — quali metadati, README patterns e machine-readable index fanno davvero la differenza nelle awesome-lists?

## Iterazione 10 — Da esplorare

### Priorità Alta
1. **PixiJS v8 text metrics per emoji + titoli brevi** — come centrare meglio emoji e label dentro nodi circolari senza perdere crispness su DPI alti?
2. **Fixed-size node encoding** — quali pattern visivi funzionano meglio per comunicare peso/importanza quando il diametro resta costante?

### Priorità Media
3. **Segmented ring legibility** — come rendere piu leggibile un ring a segmenti su sfondi pastello e in piccoli cerchi?

## Iterazione 11 — Nuove Richieste

### Priorità Alta
1. **Cloudflare Agents SDK ecosystem** — esempi concreti, project templates, and how it compares to Mastra/OpenAI Agents SDK for researcher-stage projects.
2. **Browser automation example hubs** — browser-use-examples, Stagehand, Playwright MCP, Steel Browser, Gobii: which repos are most runnable and best documented?

### Priorità Media
3. **MCP clients and devtools directories** — awesome-mcp-clients, awesome-mcp-devtools, Glama, and related registries: which ones help most for discovery and debugging?
4. **Voice agent starter repos** — LiveKit, Pipecat, Vapi, Daily, Retell, openai-agents-js: which example repos are strongest for the researcher stage?

### Esplorazione
5. **Curated repo quality signals** — which metadata, site search, llms.txt, and machine-readable indexes make an awesome-list actually useful?

## Iterazione 12 — Da esplorare

### Priorità Media
1. **PixiJS v8 emoji + label metrics on high-DPI canvases** — best practices for keeping mixed emoji/text bubbles crisp, centered, and readable at 2x/3x DPR.

## Iterazione 13 — Nuove Richieste

### Priorità Alta
1. **Browser automation stack decision guide** — Browser Use vs Stagehand vs Playwright MCP vs Steel Browser vs browser-use-examples, with emphasis on researcher-stage reproducibility.
2. **Voice agent starter and eval repos** — LiveKit, Pipecat, Vapi, Daily, and Retell example/starter repos that are most runnable and best documented.

### Priorità Media
3. **OpenTelemetry GenAI adoption map** — which frameworks already emit GenAI semconv natively, and where OpenLLMetry/OpenLIT still provide the cleanest bridge.
4. **Agent registry/discovery adoption** — A2A Agent Cards, NANDA, ERC-8004, Glama, and other capability-card / directory systems with real uptake.

### Esplorazione
5. **Long-horizon benchmark harnesses** — repo-level tooling around SWE-bench Verified, Terminal-Bench 2.0, WebArena-x, BrowseComp, and SWE-Lancer.

## Iterazione 14 — Nuove Richieste

### Priorità Alta
1. **Harness / runtime scaffolds** — what lives around the LLM: prompt assembly, pre/post hooks, tools, memory, traces, eval, state, and code-optimized outer loops like Meta-Harness.
2. **Reference navigation / context exploration** — patterns and tools for navigating prior references, citations, pinning, retrieval ranking, and trace-aware browsing instead of only context compression.

### Priorità Media
3. **Trace-driven debugging** — how successful harnesses keep execution traces searchable and use them to diagnose long-horizon failures.
4. **Outer-loop harness optimization** — papers and practical repos that mutate harness code, run evals, and search the Pareto frontier of accuracy vs token cost.

## Iterazione 15 — Nuove Richieste

### Priorità Alta
1. **Hook systems comparison** — Claude Code hooks vs OpenAI Agents SDK guardrails vs LangGraph middleware vs Mastra/Strands lifecycle hooks; which are actually expressive and shareable?
2. **Eval harness showdown** — promptfoo vs inspect_ai vs openai/evals vs LangSmith evals for agent and RAG regression testing.

### Priorità Media
3. **Reference-aware retrieval patterns** — repo maps, code graphs, Context7, Aider, Graphiti, Zep: how do they rank, pin, and navigate references?
4. **Trace replay / session replay tools** — AgentOps, Langfuse, LangSmith, Phoenix, OpenLIT: which UIs are most useful for debugging long-horizon agent failures?

### Esplorazione
5. **Prompt assembly and context injection** — CLAUDE.md, skills, prompt templates, dynamic context assembly, and prompt caching patterns across harnesses.

## Iterazione 16 — Nuove Richieste

### Priorità Alta
1. **LangGraph middleware / checkpointing** — how do middleware, durable execution, and state checkpoints combine into a reusable policy + replay layer?
2. **Trace replay comparison** — LangSmith vs Langfuse vs AgentOps vs Phoenix vs OpenLIT: which UIs and APIs are actually best for root-cause analysis?

### Priorità Media
3. **Reference-aware retrieval beyond repo maps** — Sourcegraph, code graphs, citation pinning, and retrieval ranking for docs/code context.
4. **OpenAI Agents SDK guardrail patterns** — what guardrails are reusable in real projects, and where do they break down?

### Esplorazione
5. **Outer-loop harness optimization** — Meta-Harness, prompt mutation, and eval-driven harness tuning for the Pareto frontier of quality vs cost.

## Iterazione 17 — Nuove Richieste

### Priorità Alta
1. **Coding agent landscape** — Cursor, Gemini CLI, Claude Code, Codex CLI, Cline, Copilot and Aider: which runtime/harness/navigation patterns are actually reusable in the glossary taxonomy?
2. **Searchable reference metadata** — what minimal metadata should be kept on every concept to make search, tooltip, and selection state fast without bloating the canvas model?

### Priorità Media
3. **Persistent selection feedback** — visual patterns for keeping a clicked node emphasized while a detail panel is open, without adding duplicate UI chrome.

## Iterazione 18 — Nuove Richieste

### Priorità Alta
1. **Durable execution / checkpointing** — LangGraph vs Temporal vs OpenAI Agents sessions: quali pattern rendono davvero riprendibile un workflow agente senza perdere stato?
2. **Session replay UX** — AgentOps, LangSmith, Langfuse, Phoenix, OpenLIT: quali UI aiutano di più nel root-cause analysis di failure lunghi?

### Priorità Media
3. **Reference ranking and pinning** — Sourcegraph code search, code graphs, citation pinning, and graph-backed retrieval: quali strumenti aiutano davvero a navigare riferimenti già visti?
4. **Eval harness data models** — promptfoo vs Inspect AI vs OpenAI Evals vs LangSmith: come cambiano dataset, scoring, e CI ergonomics quando il harness deve diventare shareable?

### Esplorazione
5. **Checkpoint-aware prompt injection** — come reinserire istruzioni e policy dopo compaction senza duplicare contesto o perdere vincoli?

## Iterazione 19 — Nuove Richieste

### Priorità Alta
1. **Temporal vs LangGraph checkpointing** — compare deterministic replay, resume semantics, and event-history models for long-running agent workflows.
2. **Sourcegraph code intelligence for agents** — code search, MCP, code graph ranking, and enterprise navigation patterns that outperform simple repo maps.

### Priorità Media
3. **Session replay data model comparison** — LangSmith, Langfuse, AgentOps, Phoenix, and OpenLIT: which schemas and UIs are best for root-cause analysis?
4. **Eval harness data model comparison** — promptfoo, Inspect AI, OpenAI Evals, LangSmith: dataset formats, scoring, and CI ergonomics for shareable eval loops.

### Esplorazione
5. **Prompt caching and context assembly** — how outer-loop harnesses combine dynamic prompt assembly, cached static blocks, and reference reinjection without drift.

## Iterazione 20 — Nuove Richieste

### Priorità Alta
1. **Hook / policy layer comparison** — Claude Code hooks, OpenAI Agents SDK guardrails, LangGraph middleware, Strands steering hooks, and Mastra lifecycle hooks: which ones are actually reusable and shareable?
2. **Context graph / reference navigation stack** — Context7, Sourcegraph, Aider repo maps, Graphiti, and Zep: how do retrieval, ranking, pinning, and provenance differ in practice?

### Priorità Media
3. **Eval harness interoperability** — promptfoo, Inspect AI, OpenAI Evals, and LangSmith: dataset formats, scoring models, CI ergonomics, and import/export paths.
4. **Trace replay UX** — AgentOps, Langfuse, Phoenix, and OpenLIT: which debugging views actually help root-cause long-horizon failures?

### Esplorazione
5. **Prompt assembly and caching** — how harnesses combine static system blocks, dynamic instructions, and cached context without drift or duplication.

## Iterazione 21 — Nuove Richieste

### Priorità Alta
1. **Trace replay comparison** — LangSmith, Langfuse, AgentOps, Phoenix, OpenLIT, and OpenAI Trace Grading: which trace UIs and APIs are actually best for root-cause analysis?
2. **Reference-aware retrieval ranking** — Context7, OpenAI Retrieval/File Search, Sourcegraph Code Search, Aider repo maps, Graphiti, and Zep: how do ranking, pinning, provenance, and citations differ in practice?
3. **Harness policy layers** — OpenAI Agents SDK guardrails, LangGraph persistence/middleware, Claude Code hooks, Strands steering hooks, and session APIs: which are most reusable as a policy + replay layer?

### Priorità Media
4. **Session memory backends** — compare OpenAI Agents SDK sessions, LangGraph stores, OpenAI Conversations, Redis, SQLAlchemy, and Dapr for resumable multi-turn workflows.
5. **Code intelligence surfaces** — compare Sourcegraph MCP, repo maps, search contexts, and symbol/diff search as agent navigation layers.

### Esplorazione
6. **Trace-to-eval flywheels** — how trace grading, eval datasets, and CI regression loops connect into a shareable harness workflow.

## Iterazione 22 — Da esplorare

### Priorità Media
1. **PixiJS v8 emoji/text crispness** — best practices per label brevi misti a emoji su canvas ad alto DPR, soprattutto dentro bubble fixed-size.
2. **Replay vs grading iconography** — quale encoding visivo distingue meglio session replay, trace replay e trace grading senza aumentare clutter nelle bubble compatte?

## Iterazione 23 — Nuove Richieste

### Priorità Alta
1. **Session bootstrap artifacts** — quali file/minimal artifacts rendono davvero riprendibile un agente a lungo orizzonte? Confronta init scripts, progress logs, feature manifests, git checkpoints, e session handoff notes.
2. **Prompt assembly pipelines** — come combinano concretamente CLAUDE.md, skills, repo maps, retrieval, e cached context i harness più usabili?

### Priorità Media
3. **Trace-to-eval flywheels** — come trace grading, session replay e dataset extraction si collegano in cicli di regression testing pratici?
4. **Reference ranking policies** — come Context7, Sourcegraph, Aider repo maps, Graphiti, Zep e OpenAI File Search ordinano, pinzano e citano fonti?

## Iterazione 24 — Da esplorare

### Priorità Media
1. **PixiJS v8 compact signal chips** — best practices per mantenere leggibili label brevi, helper text e emoji su chip molto piccoli a 2x/3x DPR.
2. **Interop/discovery iconography** — quale encoding visivo distingue meglio registry, discovery, protocol UI e code-intelligence cues senza aggiungere clutter?

## Iterazione 25 — Nuove Richieste

### Priorità Alta
1. **Compaction primitives** — OpenAI Responses compaction vs LangGraph checkpointing vs OpenAI Agents SDK sessions: quali mantengono davvero stato utile tra turni e quali sono solo summary wrappers?
2. **Server-side policy surfaces** — Mastra server middleware, LangSmith custom middleware, Claude Code hooks, OpenAI Agents SDK guardrails, Strands steering hooks: quali sono riusabili e shareable nel practice?

### Priorità Media
3. **Trace-to-eval pipelines** — OpenAI Trace Grading, LangSmith evaluations, Langfuse experiments, promptfoo, Inspect AI: quali coppie trace replay + regression loop funzionano davvero bene?
4. **Reference-aware retrieval ranking** — Context7, Sourcegraph, Aider repo map, Graphiti, Zep, OpenAI File Search: come cambiano ranking, provenance e pinning in uso reale?

## Iterazione 26 — Nuove Richieste

### Priorità Alta
1. **Sourcegraph code intelligence UX** — quali segnali visivi e metadati minimi rendono chiari code search, dependency-aware navigation e MCP surface in una board fixed-size?

### Priorità Media
2. **Compaction + policy middleware ergonomics** — come OpenAI Responses compaction, Mastra middleware e LangSmith middleware vanno esposti in una tassonomia harness senza aggiungere clutter?
