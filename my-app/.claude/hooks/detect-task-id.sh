#!/bin/bash
set -e
# ============================================================
# Task ID Detector - extracts task IDs from user prompts
# ============================================================

TASK_PATTERN="[CGX][0-9]{1,3}"

# Read JSON input from stdin
INPUT=$(cat /dev/stdin)

# Extract prompt from JSON
PROMPT=$(echo "$INPUT" | jq -r '.prompt // empty' 2>/dev/null) || exit 0

if [ -z "$PROMPT" ]; then
  exit 0
fi

# Extract task IDs matching pattern
TASK_IDS=$(echo "$PROMPT" | grep -oE "$TASK_PATTERN" | sort -u) || exit 0

if [ -z "$TASK_IDS" ]; then
  exit 0
fi

# For each task ID, get current status from Convex
CONTEXT=""
for TASK_ID in $TASK_IDS; do
  STATUS=$(npx convex run taskSystem/tasks:get '{"taskId":"'"$TASK_ID"'"}' 2>/dev/null | jq -r '.status // "not_found"' 2>/dev/null) || true
  if [ "$STATUS" != "not_found" ] && [ -n "$STATUS" ]; then
    CONTEXT="$CONTEXT $TASK_ID=$STATUS"
  fi
done

if [ -n "$CONTEXT" ]; then
  jq -n --arg ctx "$CONTEXT" '{
    "hookSpecificOutput": {
      "hookEventName": "UserPromptSubmit",
      "additionalContext": ("Task status:" + $ctx)
    }
  }'
  exit 0
fi

exit 0