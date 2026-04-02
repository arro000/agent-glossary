#!/usr/bin/env bash
#
# agent-glossary loop controller
# Gestisce il ciclo: Implementation → Improvements → Research → repeat
#
# Uso:
#   ./loop.sh start [--max N]    Avvia il loop (N iterazioni max, default infinite)
#   ./loop.sh stop               Ferma il loop in esecuzione
#   ./loop.sh status             Mostra stato attuale
#   ./loop.sh run [1|2|3]        Esegue solo un singolo workspace
#   ./loop.sh log                Mostra log dell'ultima esecuzione
#

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
WORKSPACES_DIR="$PROJECT_DIR/.workspaces"
LOG_DIR="$PROJECT_DIR/.workspaces/logs"
PID_FILE="$WORKSPACES_DIR/loop.pid"
STATE_FILE="$WORKSPACES_DIR/loop.state"
LOG_FILE="$LOG_DIR/loop.log"

# Colori
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'
BOLD='\033[1m'

mkdir -p "$LOG_DIR"

# ── Helpers ──────────────────────────────────────────────

log() {
  local ts
  ts=$(date '+%Y-%m-%d %H:%M:%S')
  echo -e "${CYAN}[$ts]${NC} $*" | tee -a "$LOG_FILE"
}

log_success() {
  local ts
  ts=$(date '+%Y-%m-%d %H:%M:%S')
  echo -e "${GREEN}[$ts] ✓${NC} $*" | tee -a "$LOG_FILE"
}

log_warn() {
  local ts
  ts=$(date '+%Y-%m-%d %H:%M:%S')
  echo -e "${YELLOW}[$ts] ⚠${NC} $*" | tee -a "$LOG_FILE"
}

log_error() {
  local ts
  ts=$(date '+%Y-%m-%d %H:%M:%S')
  echo -e "${RED}[$ts] ✗${NC} $*" | tee -a "$LOG_FILE"
}

header() {
  echo ""
  echo -e "${BOLD}${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo -e "${BOLD}${BLUE}  $*${NC}"
  echo -e "${BOLD}${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo ""
}

write_state() {
  echo "$1" > "$STATE_FILE"
}

read_state() {
  if [[ -f "$STATE_FILE" ]]; then
    cat "$STATE_FILE"
  else
    echo "idle"
  fi
}

# ── Workspace Config ─────────────────────────────────────

declare -A WS_NAMES=(
  [1]="Implementation"
  [2]="Improvements & PRD"
  [3]="Research & Content"
)

declare -A WS_DIRS=(
  [1]="$WORKSPACES_DIR/1-implementation"
  [2]="$WORKSPACES_DIR/2-improvements"
  [3]="$WORKSPACES_DIR/3-research"
)

# ── Prompts per Workspace ────────────────────────────────

get_prompt_for_workspace() {
  local ws="$1"
  local iteration="$2"
  local ws_dir="${WS_DIRS[$ws]}"
  local context_file="$ws_dir/context.md"

  case $ws in
    1)
      cat <<PROMPT
You are implementing the Agent Glossary Whiteboard app.

Read the full context from .workspaces/1-implementation/context.md for specifications.
Read .workspaces/1-implementation/resources/concepts.md for bubble data.
Read .workspaces/1-implementation/resources/pixijs-reference.md for PixiJS v8 API reference.

This is iteration $iteration. Check if there's a PRD in .workspaces/2-improvements/resources/prd.md — if it exists, implement the changes described there.

Key rules:
- PixiJS v8 vanilla (NOT @pixi/react) — mount canvas via useRef/useEffect
- All rendering in PixiJS, no HTML overlay for content
- Font: Inter (loaded via CSS import)
- Grid background, pastel macroareas, proportional bubbles
- Zoom (scroll) and pan (drag) on the whiteboard
- Hover glow + click detail panel on bubbles
- Make it work and look good. Commit when done.

After implementing, update .workspaces/1-implementation/context.md with current state.
PROMPT
      ;;
    2)
      cat <<PROMPT
You are IMPROVING and IMPLEMENTING the Agent Glossary Whiteboard app.

Read the current code in src/ to understand what's implemented.
Read .workspaces/1-implementation/context.md for full specifications.
Read .workspaces/1-implementation/resources/concepts.md for bubble data.
Read .workspaces/1-implementation/resources/pixijs-reference.md for PixiJS v8 API.
Read .workspaces/3-research/resources/findings.md for new discoveries.

CRITICAL: You must WRITE CODE and CHANGE files in src/. Do not just analyze or write documentation.

Your job:
1. If nothing is implemented yet, implement it (follow specs in context.md)
2. If something is half-done, complete it
3. If something works, improve it (layout, interactivity, visuals, performance)
4. Update bubble data in .workspaces/1-implementation/resources/concepts.md if needed
5. Add research requests for topics you need more info on in .workspaces/3-research/resources/research-requests.md
6. Test with npm run build after significant changes
7. Commit your changes

This is iteration $iteration. Focus on writing real code and making the app work better.

Key rules:
- PixiJS v8 vanilla (NOT @pixi/react) — mount canvas via useRef/useEffect
- All rendering in PixiJS, no HTML overlay for content
- Font: Inter (loaded via CSS)
- Grid background, pastel macroareas, proportional bubbles
- Zoom (scroll) and pan (drag)
- Hover + click interactions on bubbles

After implementing, update .workspaces/2-improvements/context.md with current state.
PROMPT
      ;;
    3)
      cat <<PROMPT
You are researching the AI agent ecosystem to enrich the Agent Glossary Whiteboard.

Read .workspaces/3-research/resources/research-requests.md for what to research.
Read .workspaces/1-implementation/resources/concepts.md for what's already on the whiteboard.
Read .workspaces/3-research/resources/findings.md for previous findings.

Your job:
1. Research each topic using web search (curl, read URLs, etc.)
2. For each finding, save structured data in .workspaces/3-research/resources/findings.md
3. Collect guides/tutorials in .workspaces/3-research/resources/guides.md
4. Update concept data if you find new important tools/patterns
5. Add new research requests for next iteration

Format for findings:
## [Tool/Framework/Pattern Name]
- **macroarea**: Which whiteboard area
- **url**: Official link
- **description**: 2-3 sentences
- **popularity**: 1-10 estimate
- **alternatives**: Similar tools
- **why_include**: Why it deserves to be on the whiteboard

This is iteration $iteration. Focus on completeness and accuracy.

After researching, update .workspaces/3-research/context.md with current state.
PROMPT
      ;;
  esac
}

# ── Run Single Workspace ─────────────────────────────────

run_workspace() {
  local ws="$1"
  local iteration="$2"
  local ws_name="${WS_NAMES[$ws]}"
  local ws_dir="${WS_DIRS[$ws]}"

  header "WORKSPACE $ws: $ws_name (Iteration $iteration)"

  # Update iteration in context
  if [[ -f "$ws_dir/context.md" ]]; then
    sed -i "s/^\- \*\*Iterazione\*\*: .*/- **Iterazione**: $iteration/" "$ws_dir/context.md"
    sed -i "s/^\- \*\*Stato\*\*: .*/- **Stato**: in_progress/" "$ws_dir/context.md"
    sed -i "s/^\- \*\*Ultimo aggiornamento\*\*: .*/- **Ultimo aggiornamento**: $(date '+%Y-%m-%d %H:%M:%S')/" "$ws_dir/context.md"
  fi

  local prompt
  prompt=$(get_prompt_for_workspace "$ws" "$iteration")

  log "Launching OpenCode for workspace $ws_name..."

  # Run OpenCode
  if timeout 1200 opencode run "$prompt" \
    --model zai-coding-plan/glm-5-turbo \
    2>&1 | tee -a "$LOG_FILE"; then
    log_success "Workspace $ws_name completed successfully"

    # Update state to completed
    if [[ -f "$ws_dir/context.md" ]]; then
      sed -i "s/^\- \*\*Stato\*\*: .*/- **Stato**: completed/" "$ws_dir/context.md"
    fi

    # Auto-commit changes
    cd "$PROJECT_DIR"
    if git diff --quiet .workspaces/; then
      log "No workspace file changes to commit"
    else
      git add .workspaces/
      git commit -m "loop iter $iteration: workspace $ws ($ws_name) completed" 2>&1 | tail -1 | tee -a "$LOG_FILE"
      log_success "Workspace changes committed"
    fi

    return 0
  else
    local exit_code=$?
    log_error "Workspace $ws_name failed (exit code: $exit_code)"

    if [[ -f "$ws_dir/context.md" ]]; then
      sed -i "s/^\- \*\*Stato\*\*: .*/- **Stato**: failed/" "$ws_dir/context.md"
    fi

    return $exit_code
  fi
}

# ── Loop ─────────────────────────────────────────────────

run_loop() {
  local max_iter="${1:-0}"  # 0 = infinite
  local iteration=1
  local start_ws="${2:-1}"

  # Create iteration log separator
  {
    echo ""
    echo "╔══════════════════════════════════════════════════════════╗"
    echo "║  AGENT GLOSSARY LOOP — Started $(date '+%Y-%m-%d %H:%M:%S')          ║"
    echo "║  Max iterations: $([ $max_iter -gt 0 ] && echo $max_iter || echo 'infinite')                         ║"
    echo "╚══════════════════════════════════════════════════════════╝"
    echo ""
  } | tee -a "$LOG_FILE"

  write_state "running"

  while true; do
    if [[ $max_iter -gt 0 && $iteration -gt $max_iter ]]; then
      log_success "Max iterations ($max_iter) reached. Loop complete."
      break
    fi

    header "ITERATION $iteration"

    # Run each workspace in sequence
    for ws in 1 2 3; do
      # Check if we're still supposed to be running
      if [[ "$(read_state)" == "stopping" ]]; then
        log_warn "Loop stopped by user request"
        write_state "stopped"
        exit 0
      fi

      if ! run_workspace "$ws" "$iteration"; then
        log_error "Workspace $ws failed. Continuing to next workspace..."
      fi
    done

    # Commit code changes if any
    cd "$PROJECT_DIR"
    if ! git diff --quiet src/; then
      git add src/
      git commit -m "loop iter $iteration: implementation changes" 2>&1 | tail -1 | tee -a "$LOG_FILE"
      log_success "Code changes committed"
    fi

    iteration=$((iteration + 1))
    log_success "Iteration $((iteration - 1)) complete. Starting iteration $iteration..."
    sleep 2
  done

  write_state "completed"
  header "LOOP COMPLETED — $((iteration - 1)) iterations total"
}

# ── Commands ─────────────────────────────────────────────

cmd_start() {
  local max_iter=0

  # Parse --max N flag
  if [[ "${1:-}" == "--max" && "${2:-}" =~ ^[0-9]+$ ]]; then
    max_iter="$2"
  elif [[ "${1:-}" =~ ^[0-9]+$ ]]; then
    max_iter="$1"
  fi

  if [[ -f "$PID_FILE" ]] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
    log_error "Loop is already running (PID: $(cat "$PID_FILE"))"
    echo "Run '$0 stop' first, or '$0 status' for details."
    exit 1
  fi

  # Clear old log
  > "$LOG_FILE"
  write_state "starting"

  log "Starting Agent Glossary loop..."
  log "Project: $PROJECT_DIR"
  log "Max iterations: $([ $max_iter -gt 0 ] && echo $max_iter || echo 'infinite')"
  log "Log: $LOG_FILE"
  log "Press Ctrl+C or run '$0 stop' to interrupt."

  # Run in background
  run_loop "$max_iter" &
  local pid=$!
  echo "$pid" > "$PID_FILE"
  write_state "running"

  log_success "Loop started (PID: $pid)"
  echo ""
  echo -e "  ${GREEN}● Loop running${NC} — PID: $pid"
  echo -e "  ${CYAN}  Logs:${NC} tail -f $LOG_FILE"
  echo -e "  ${YELLOW}  Stop:${NC} $0 stop"
  echo -e "  ${BLUE}  Status:${NC} $0 status"
  echo ""
}

cmd_stop() {
  if [[ ! -f "$PID_FILE" ]]; then
    log_warn "No loop running"
    exit 0
  fi

  local pid
  pid=$(cat "$PID_FILE")

  if ! kill -0 "$pid" 2>/dev/null; then
    log_warn "Process $pid not found (already stopped?)"
    rm -f "$PID_FILE"
    write_state "idle"
    exit 0
  fi

  log "Requesting graceful stop (waiting for current workspace to finish)..."
  write_state "stopping"

  # Wait up to 30 seconds for graceful shutdown (current opencode run finishes)
  local waited=0
  while kill -0 "$pid" 2>/dev/null && [[ $waited -lt 30 ]]; do
    sleep 1
    waited=$((waited + 1))
    echo -n "." >> /dev/stderr
  done
  echo "" >> /dev/stderr

  if kill -0 "$pid" 2>/dev/null; then
    log_warn "Graceful shutdown timed out. Force killing..."
    kill -9 "$pid" 2>/dev/null || true
  fi

  rm -f "$PID_FILE"
  write_state "stopped"
  log_success "Loop stopped"
}

cmd_status() {
  echo ""
  echo -e "${BOLD}Agent Glossary Loop — Status${NC}"
  echo ""

  if [[ -f "$PID_FILE" ]] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
    echo -e "  ${GREEN}● Running${NC} — PID: $(cat "$PID_FILE")"
  else
    local state
    state=$(read_state)
    case "$state" in
      stopped|completed) echo -e "  ${YELLOW}○ Stopped${NC} (last state: $state)" ;;
      stopping) echo -e "  ${YELLOW}◐ Stopping${NC}" ;;
      *) echo -e "  ${RED}○ Idle${NC}" ;;
    esac
  fi

  echo ""

  # Show workspace states
  for ws in 1 2 3; do
    local ws_name="${WS_NAMES[$ws]}"
    local ws_dir="${WS_DIRS[$ws]}"
    local ws_state="unknown"
    local ws_iter="?"

    if [[ -f "$ws_dir/context.md" ]]; then
      ws_state=$(grep "^\- \*\*Stato\*\*:" "$ws_dir/context.md" | sed 's/.*: //' || echo "unknown")
      ws_iter=$(grep "^\- \*\*Iterazione\*\*:" "$ws_dir/context.md" | sed 's/.*: //' || echo "?")
    fi

    case "$ws_state" in
      completed) icon="${GREEN}✓${NC}" ;;
      in_progress) icon="${BLUE}◐${NC}" ;;
      failed) icon="${RED}✗${NC}" ;;
      *) icon="${NC}○${NC}" ;;
    esac

    echo -e "  $icon WS$ws: $ws_name — iter $ws_iter [$ws_state]"
  done

  echo ""

  # Show latest log lines
  if [[ -f "$LOG_FILE" ]] && [[ -s "$LOG_FILE" ]]; then
    echo -e "  ${CYAN}Latest log:${NC}"
    tail -5 "$LOG_FILE" | sed 's/^/    /'
  fi

  echo ""
}

cmd_log() {
  if [[ -f "$LOG_FILE" ]] && [[ -s "$LOG_FILE" ]]; then
    less "$LOG_FILE"
  else
    log_warn "No log file found"
  fi
}

cmd_run() {
  local ws="${1:-1}"
  if [[ ! -v WS_DIRS[$ws] ]]; then
    log_error "Invalid workspace: $ws (must be 1, 2, or 3)"
    exit 1
  fi

  # Get current iteration
  local iteration=1
  for w in 1 2 3; do
    local ws_dir="${WS_DIRS[$w]}"
    if [[ -f "$ws_dir/context.md" ]]; then
      local w_iter
      w_iter=$(grep "^\- \*\*Iterazione\*\*:" "$ws_dir/context.md" | sed 's/.*: //' || echo "0")
      if [[ "$w_iter" =~ ^[0-9]+$ ]] && [[ $w_iter -ge $iteration ]]; then
        iteration=$((w_iter + 1))
      fi
    fi
  done

  run_workspace "$ws" "$iteration"
}

# ── Main ─────────────────────────────────────────────────

case "${1:-help}" in
  start)
    cmd_start "${2:-}" "${3:-}"
    ;;
  stop)
    cmd_stop
    ;;
  status)
    cmd_status
    ;;
  log)
    cmd_log
    ;;
  run)
    cmd_run "${2:-1}"
    ;;
  help|--help|-h)
    echo ""
    echo -e "${BOLD}Agent Glossary Loop Controller${NC}"
    echo ""
    echo "Usage: $0 <command> [args]"
    echo ""
    echo "Commands:"
    echo "  start [--max N]   Start the loop (N iterations, default: infinite)"
    echo "  stop              Stop the running loop gracefully"
    echo "  status            Show current loop and workspace status"
    echo "  log               Open full log viewer"
    echo "  run [1|2|3]       Run a single workspace once"
    echo "  help              Show this help"
    echo ""
    ;;
  *)
    log_error "Unknown command: $1"
    echo "Run '$0 help' for usage."
    exit 1
    ;;
esac
