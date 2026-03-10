# Visione Sostenibile — Command Runner
# Run `just` or `just --list` to see all available recipes.

set dotenv-load
set shell := ["bash", "-euo", "pipefail", "-c"]

# Project root is my-app/
app := "my-app"

# ── Default ──────────────────────────────────────────────────

# List all available recipes
default:
    @just --list --unsorted

# ── Development ──────────────────────────────────────────────

# Start Next.js dev server + Convex dev concurrently
dev:
    cd {{app}} && (npx convex dev &) && pnpm dev

# Start Next.js dev server only
next-dev:
    cd {{app}} && pnpm dev

# Start Convex dev server (watch mode)
convex:
    cd {{app}} && npx convex dev

# ── Build & Quality ──────────────────────────────────────────

# Production build
build:
    cd {{app}} && pnpm build

# Run ESLint
lint:
    cd {{app}} && pnpm lint

# TypeScript type check (no emit)
typecheck:
    cd {{app}} && npx tsc --noEmit

# Start production server (after build)
start:
    cd {{app}} && pnpm start

# ── Convex Backend ───────────────────────────────────────────

# Deploy Convex to production
convex-deploy:
    cd {{app}} && npx convex deploy

# Open Convex web dashboard
convex-dashboard:
    cd {{app}} && npx convex dashboard

# Run any Convex function: just cx services:getAll '{}'
cx fn args='{}':
    cd {{app}} && npx convex run {{fn}} '{{args}}'

# Seed services data
seed-services:
    cd {{app}} && npx convex run services:seed '{}'

# List Convex env vars
convex-env:
    cd {{app}} && npx convex env list

# ── Task System (UCA Orchestration) ─────────────────────────

# Show task system stats
task-stats:
    cd {{app}} && npx convex run taskSystem/orchestrator:getStats '{}'

# Show kanban board
task-kanban:
    cd {{app}} && npx convex run taskSystem/orchestrator:getKanban '{}'

# List all tasks
task-list:
    cd {{app}} && npx convex run taskSystem/tasks:list '{}'

# Update task status: just task VS-10 in_progress
task id status agent="claude":
    cd {{app}} && npx convex run taskSystem/orchestrator:updateStatus '{"taskId":"{{id}}","newStatus":"{{status}}","agent":"{{agent}}"}'

# List tasks by agent: just task-my claude
task-my agent="claude":
    cd {{app}} && npx convex run taskSystem/orchestrator:getByAgent '{"agent":"{{agent}}"}'

# Check task dependencies
task-deps id:
    cd {{app}} && npx convex run taskSystem/tasks:checkDependencies '{"taskId":"{{id}}"}'

# Seed task definitions into Convex
seed:
    cd {{app}} && npx convex run taskSystem/orchestrator:seed '{}'

# ── Orchestrator Filters (tools/task-filter.py) ────────────

# Actionable tasks: todo, deps met, not human, sorted by priority
task-actionable:
    cd {{app}} && npx convex run taskSystem/tasks:list '{}' 2>/dev/null | python3 ../tools/task-filter.py actionable

# Task stats: done/total/percentage breakdown
task-stats-full:
    cd {{app}} && npx convex run taskSystem/tasks:list '{}' 2>/dev/null | python3 ../tools/task-filter.py stats

# In-progress tasks
task-wip:
    cd {{app}} && npx convex run taskSystem/tasks:list '{}' 2>/dev/null | python3 ../tools/task-filter.py inprogress

# Blocked tasks with unmet dependencies
task-blocked:
    cd {{app}} && npx convex run taskSystem/tasks:list '{}' 2>/dev/null | python3 ../tools/task-filter.py blocked

# Human-assigned pending tasks
task-human:
    cd {{app}} && npx convex run taskSystem/tasks:list '{}' 2>/dev/null | python3 ../tools/task-filter.py human

# Detail for a specific task (JSON): just task-detail VS-31
task-detail id:
    cd {{app}} && npx convex run taskSystem/tasks:list '{}' 2>/dev/null | python3 ../tools/task-filter.py detail {{id}}

# ── Scripts (package.json) ───────────────────────────────────

# Generate images via HF Inference API
generate-images:
    cd {{app}} && pnpm run generate-images

# Generate blog cover images via AI
generate-blog-images:
    cd {{app}} && pnpm run generate-blog-images

# Import media assets to Convex storage
import-media-assets:
    cd {{app}} && pnpm run import-media-assets

# Backfill blog covers from gallery storage
backfill-blog-covers:
    cd {{app}} && pnpm run backfill-blog-covers

# ── GWS Integration (Google Workspace CLI) ───────────────────
# Requires: gws v0.8.0+ installed, auth configured
# Auth: gws auth login | Status: gws auth status

# GWS auth status
gws-status:
    gws auth status

# List recent Drive files
gws-drive count='10':
    gws drive files list --params '{"pageSize": {{count}}, "orderBy": "modifiedTime desc", "fields": "files(id,name,mimeType,modifiedTime,size)"}' --format table

# Search Drive files
gws-drive-search query:
    gws drive files list --params '{"q": "name contains '\''{{query}}'\''", "pageSize": 20, "fields": "files(id,name,mimeType,modifiedTime)"}' --format table

# Today's calendar events
gws-cal-today:
    #!/usr/bin/env bash
    START=$(date -u +"%Y-%m-%dT00:00:00Z")
    END=$(date -u -v+1d +"%Y-%m-%dT00:00:00Z")
    gws calendar events list --params "{\"calendarId\": \"primary\", \"timeMin\": \"$START\", \"timeMax\": \"$END\", \"singleEvents\": true, \"orderBy\": \"startTime\", \"fields\": \"items(summary,start,end,location)\"}" --format table

# This week's calendar events
gws-cal-week:
    #!/usr/bin/env bash
    START=$(date -u +"%Y-%m-%dT00:00:00Z")
    END=$(date -u -v+7d +"%Y-%m-%dT00:00:00Z")
    gws calendar events list --params "{\"calendarId\": \"primary\", \"timeMin\": \"$START\", \"timeMax\": \"$END\", \"singleEvents\": true, \"orderBy\": \"startTime\", \"fields\": \"items(summary,start,end,location)\"}" --format table

# Search Gmail
gws-gmail query count='10':
    gws gmail users messages list --params '{"userId": "me", "q": "{{query}}", "maxResults": {{count}}}'

# Count unread emails
gws-unread:
    gws gmail users labels get --params '{"userId": "me", "id": "INBOX"}' | python3 -c "import sys,json; d=json.load(sys.stdin); print(f\"Unread: {d.get('messagesUnread',0)} | Total: {d.get('messagesTotal',0)}\")"

# Read a Google Sheet: just gws-sheet SPREADSHEET_ID Sheet1!A1:D10
gws-sheet id range='Sheet1':
    gws sheets spreadsheets.values get --params '{"spreadsheetId": "{{id}}", "range": "{{range}}"}' --format table

# GWS API schema discovery
gws-schema method:
    gws schema {{method}}

# ── Deploy ───────────────────────────────────────────────────

# Deploy frontend to Vercel (production)
deploy-vercel:
    cd {{app}} && vercel --prod

# Full deploy: Convex backend + Vercel frontend
deploy-all: convex-deploy deploy-vercel

# ── Cleanup & Utilities ──────────────────────────────────────

# Clean .next build cache
clean:
    cd {{app}} && rm -rf .next node_modules/.cache
    @echo "Cleaned .next and node_modules/.cache"

# Install dependencies
install:
    cd {{app}} && pnpm install

# Show project structure (2 levels)
tree:
    tree -L 2 -I 'node_modules|.next|.convex' {{app}}

# Count lines of code (TS/TSX only)
loc:
    find {{app}}/app {{app}}/convex -name '*.ts' -o -name '*.tsx' | xargs wc -l | tail -1
