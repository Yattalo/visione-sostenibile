import { mutation } from "./_generated/server";

// Public upload URL generator for quiz photo uploads.
// No auth required — used by the quiz flow before lead submission.
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});
