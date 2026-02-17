// ============================================================
// Task Definitions — edit this file to define your project tasks
// Run `npx @yattalo/task-system seed` to import them into Convex
// ============================================================

export interface TaskDefinition {
  taskId: string;
  agent: string;
  title: string;
  description: string;
  status: "backlog" | "todo" | "in_progress" | "blocked" | "review" | "done" | "archived";
  priority: "critical" | "high" | "medium" | "low";
  category: string;
  phaseId: string;
  wave: number;
  estimatedHours?: number;
  dependencies?: string[];
  tags?: string[];
  acceptanceCriteria?: string[];
  filesExpected?: string[];
}

export const TASK_DEFINITIONS: TaskDefinition[] = [
  // Example:
  // {
  //   taskId: "C1",
  //   agent: "claude",
  //   title: "Setup project foundation",
  //   description: "Initialize the project with base configuration",
  //   status: "todo",
  //   priority: "high",
  //   category: "backend",
  //   phaseId: "foundation",
  //   wave: 1,
  //   estimatedHours: 2,
  //   dependencies: [],
  //   tags: ["setup"],
  //   acceptanceCriteria: ["Project builds successfully", "Tests pass"],
  // },
];
