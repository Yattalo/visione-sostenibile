import { defineConfig } from "@yattalo/task-system-core";

export default defineConfig({
  projectName: "visione-sostenibile",
  projectId: "visione-sostenibile",
  tableName: "agentTasks",

  agents: {
    claude: { label: "Claude Code", icon: "C", color: "#35401E" },
    gemini: { label: "Gemini CLI", icon: "G", color: "#8C8354" },
    codex: { label: "Codex", icon: "X", color: "#733E20" },
  },

  categories: [
      "backend",
      "frontend",
      "uiux",
      "devops",
      "review",
      "testing",
      "documentation"
  ],

  phases: [
    { id: "foundation", label: "Foundation", wave: 1 },
    { id: "core", label: "Core Build", wave: 2 },
    { id: "features", label: "Features", wave: 3 },
    { id: "polish", label: "Polish & Review", wave: 4 },
    { id: "deploy", label: "Deploy", wave: 5 },
  ],

  taskIdPattern: "[CGX]\d{1,3}",

  extensions: {
      "commitTracking": true,
      "scopeCreepDetection": true,
      "reviewFindings": true,
      "confidenceTracking": false,
      "evidenceTracker": false,
      "handoffLog": false,
      "checkpointLog": false,
      "agentOps": true
  },

  dashboard: {
      "pollingInterval": 5000,
      "theme": "dark"
  },

  agentOps: {
      "pollInterval": 30000,
      "maxConcurrentRuns": 3,
      "maxRunsPerDay": 100,
      "defaultTimeoutMinutes": 30,
      "protectedBranches": [
          "main",
          "master"
      ],
      "agentCommands": {
          "claude": "claude",
          "gemini": "gemini",
          "codex": "codex"
      }
  },
});
