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
