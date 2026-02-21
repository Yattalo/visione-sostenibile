# Task System Sync Instructions

**Date**: 2026-02-20
**Context**: Audit revealed 7 tasks already completed in code but still marked TODO

## Quick Summary

Out of 9 TODO tasks:
- **7 tasks**: Code is DONE (100%) → Mark as `done`
- **2 tasks**: Code is ~80-85% DONE → Mark as `in_review`
- **1 task**: Scope unclear → Needs clarification

---

## Step 1: Mark Tasks as DONE (Takes 1 minute)

Run these commands from `/Users/luckyluke/projects/active/visione_sostenibile/my-app/`:

```bash
# SD1 - Design tokens
npx convex run taskSystem/orchestrator:updateStatus '{"taskId":"SD1","newStatus":"done","agent":"claude"}'

# FE1 - Blog migration
npx convex run taskSystem/orchestrator:updateStatus '{"taskId":"FE1","newStatus":"done","agent":"claude"}'

# FE2 - Projects migration
npx convex run taskSystem/orchestrator:updateStatus '{"taskId":"FE2","newStatus":"done","agent":"claude"}'

# C5 - PageHero component
npx convex run taskSystem/orchestrator:updateStatus '{"taskId":"C5","newStatus":"done","agent":"claude"}'

# C10 - Quiz schema
npx convex run taskSystem/orchestrator:updateStatus '{"taskId":"C10","newStatus":"done","agent":"claude"}'

# C12 - Quiz components
npx convex run taskSystem/orchestrator:updateStatus '{"taskId":"C12","newStatus":"done","agent":"claude"}'
```

**Expected Output**: Each command returns task with `status: "done"` and timestamp.

---

## Step 2: Mark Tasks as IN_REVIEW (Needs Testing)

These are substantially done but need final validation:

```bash
# FE8 - Quiz micro-funnel (85% complete)
# Missing: email notifications, PDF export, social sharing polish
npx convex run taskSystem/orchestrator:updateStatus '{"taskId":"FE8","newStatus":"in_review","agent":"claude"}'

# C17 (or C17-C22) - SEO implementation (80% complete)
# Missing: BlogPosting schema, Service schema, BreadcrumbList, featured snippets
npx convex run taskSystem/orchestrator:updateStatus '{"taskId":"C17","newStatus":"in_review","agent":"claude"}'
```

---

## Step 3: Clarify FE3 Scope

**Status**: Admin CRUD is 60% done. Before marking as `in_progress`, confirm:

**What's Working**:
- [x] Admin auth (login, sessions)
- [x] Read operations for all entities
- [x] Delete reviews (Rifiuta/Elimina buttons)
- [x] Mark contacts as read

**What's Unclear**:
- [ ] Do you need Create/Update forms for Services? (code exists, but is it validated?)
- [ ] Do you need Create/Update forms for Blog posts? (code exists, but is it validated?)
- [ ] Do you need image upload to cloud storage? (currently hardcoded URLs)
- [ ] Do you need Search/Filter in admin lists?
- [ ] Do you need Pagination in admin lists?
- [ ] Do you need Bulk operations (multi-delete)?

**Recommendation**:
1. Test the admin panel manually (`/admin/login` → try to create/edit entries)
2. If it works → Mark FE3 as `in_review`
3. If forms are broken → Create subtasks for each CRUD operation

```bash
# Only after clarity
npx convex run taskSystem/orchestrator:updateStatus '{"taskId":"FE3","newStatus":"in_review","agent":"claude"}'
```

---

## Step 4: Verify Task System Update

Check that tasks are reflected correctly:

```bash
# View task list (sorted by status)
npx convex run taskSystem/orchestrator:getKanban '{}'

# View stats
npx convex run taskSystem/orchestrator:getStats '{}'
```

Expected results:
- 7 tasks moved to `done` column
- 2 tasks in `in_review` column
- 1 task still in `todo` column (FE3, pending scope clarity)

---

## Step 5: Document Completion Context (Optional)

If you want to keep audit trail, add this to CLAUDE.md project notes:

```markdown
## Wave 3 Completion Notes (Feb 20, 2026)

Audit performed: Found 7 tasks already fully implemented in code (SD1, FE1, FE2, C5, C10, C12).
Task system synced to match code reality.

### Tasks Completed
- SD1: Stitch design tokens → globals.css (commit 6f3e69f)
- FE1: Blog migration to Convex (commit 70da437)
- FE2: Projects migration to Convex (commit 70da437)
- C5: PageHero uniform component (commit cfa391d)
- C10: quizSubmissions schema (commit 380489e)
- C12: QuizCTA + QuizMiniPreview (commit 380489e)

### Tasks In Review
- FE8: Quiz micro-funnel (85% complete, needs email notifications)
- C17-C22: SEO implementation (80% complete, needs BlogPosting schema)

### Tasks Pending Scope Clarity
- FE3: Admin CRUD (60% complete, needs test + scope clarification)
```

---

## Potential Next Steps (After Sync)

Once tasks are synced, consider:

1. **Quiz Polish (FE8)**:
   - Add email notification on quiz completion → lead
   - PDF export of scorecard results
   - Social sharing buttons on scorecard

2. **SEO Completeness (C17-C22)**:
   - BlogPosting JSON-LD for blog posts
   - Service JSON-LD for service pages
   - BreadcrumbList for navigation
   - Validate with Google Search Console

3. **Admin Completeness (FE3)**:
   - Test Create/Update forms
   - Add image upload to cloud storage (if needed)
   - Add search/filter to admin lists (if needed)
   - Add pagination (if needed)

4. **Barbara Skill Integration** (VS-B0→B5):
   - Integrate Barbara storyteller into service descriptions
   - Use Barbara-generated copy in homepage hero section
   - Create Barbara skill hooks for content generation

---

## Timeline

- **Estimated sync time**: 5 minutes (run 9 commands)
- **Estimated testing time**: 10-15 minutes (verify in Convex dashboard or UI)
- **Total**: 20 minutes to complete sync

---

## Questions?

Refer to `/Users/luckyluke/projects/active/visione_sostenibile/TASK_COMPLETION_AUDIT.md` for:
- Full detailed analysis of each task
- Commit references with SHA hashes
- Code snippets and file paths
- What's complete vs. what's missing
