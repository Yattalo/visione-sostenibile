// Dashboard: memory module — returns empty
import { query } from "../_generated/server";

export const listMemory = query({
  args: {},
  handler: async () => [],
});
