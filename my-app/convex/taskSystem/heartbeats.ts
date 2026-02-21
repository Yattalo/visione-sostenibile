// Dashboard: heartbeats module — returns empty
import { query } from "../_generated/server";

export const listHeartbeats = query({
  handler: async () => [],
});
