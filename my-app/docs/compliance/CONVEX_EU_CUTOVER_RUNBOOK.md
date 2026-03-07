# Convex EU Cutover Runbook

Last updated: March 7, 2026

This runbook is the step-by-step procedure to move production from the current US Convex deployment to a new EU Convex deployment with the lowest practical risk.

It is written for this project:

- frontend: Next.js app on Vercel
- backend: Convex Cloud
- auth: Clerk
- analytics: GA4, GTM, Clarity, Meta Pixel, LinkedIn Insight Tag, optional custom scripts

## Goal

After the cutover:

- frontend traffic uses the new EU Convex deployment
- Clerk auth still works in Convex functions
- existing data is present in the EU deployment
- guest-to-user claim flow still works
- admin access remains limited to allowlisted admins

## Important constraints

- Treat this as a migration to a **new EU deployment**, not an in-place tweak
- Do not cut over until backup export is completed
- Do not delete the current US deployment on the same day as the switch

## Inputs you need before starting

- Convex dashboard access
- the current US production deployment URL
- a new EU Convex deployment URL
- a Convex deploy key for the new EU production deployment
- Clerk dashboard access
- Vercel project access
- a test admin email that is already allowlisted
- a non-admin test email

## Environment inventory

## Convex deployment envs

Set these on the new EU Convex deployment before production traffic is switched:

- `CLERK_JWT_ISSUER_DOMAIN`
- `ADMIN_EMAILS`
- `ADMIN_NOTIFICATION_EMAIL` if used
- `RESEND_API_KEY` if email sending is enabled
- `EMAIL_FROM` if email sending is enabled
- any other secret already used in the current deployment

## Frontend envs

These must point to the new EU deployment at cutover time:

- `NEXT_PUBLIC_CONVEX_URL`
- `CONVEX_URL` if your build/deploy platform uses it
- `NEXT_PUBLIC_SITE_URL` if it differs by environment
- only the analytics IDs you actually intend to keep enabled

Optional privacy-hardening envs:

- `NEXT_PUBLIC_CLERK_TELEMETRY_DISABLED=1`

## Pre-flight checklist

1. Merge or pause ongoing backend schema changes.
2. Confirm the project builds locally:

```bash
cd my-app
pnpm install
pnpm exec tsc --noEmit
```

3. Confirm the current production env values are inventoried.
4. Announce a short content freeze for new leads during the actual cutover window.

## Step 1: Record the current production state

Capture these values in a temporary migration note:

- current US Convex deployment URL
- current production site URL
- current Clerk instance domain
- current allowlisted admin emails
- current analytics vendors actually enabled in production

Also capture counts from the current admin area if possible:

- number of leads
- number of CRM contacts
- number of quiz submissions

This gives you a simple parity check after import.

## Step 2: Export a backup from the US Convex deployment

Use the Convex dashboard export flow or the official import/export tooling for the current production deployment.

Keep the export artifact in a temporary secure location outside the repo.

Recommended naming:

- `convex-us-prod-YYYY-MM-DD-HHMM.zip`

Do not continue until the export has completed successfully.

## Step 3: Create the new EU Convex deployment

Create a new production deployment in an EU region from the Convex dashboard.

Recommended notes to keep:

- project name
- deployment name
- region
- deployment URL
- deploy key creation timestamp

Generate a deploy key for the new EU production deployment and keep it outside the repo.

## Step 4: Set required env vars on the EU deployment

Set the auth and mail envs before deploying code.

Example:

```bash
npx convex env set CLERK_JWT_ISSUER_DOMAIN https://your-instance.clerk.accounts.dev
npx convex env set ADMIN_EMAILS admin@example.com
npx convex env set RESEND_API_KEY re_xxx
npx convex env set EMAIL_FROM info@example.com
```

Then verify the final state:

```bash
npx convex env list
```

For this project, `CLERK_JWT_ISSUER_DOMAIN` is mandatory. Without it:

- Convex auth will not initialize correctly
- `pnpm exec convex codegen` will not complete against that deployment

## Step 5: Point local CLI to the EU deployment and deploy code

Use the new EU deployment for the local Convex CLI session, then deploy the current codebase there.

Typical flow:

```bash
cd my-app
npx convex dev
```

Select the new EU deployment when prompted, then run:

```bash
pnpm exec convex codegen
pnpm exec tsc --noEmit
CONVEX_DEPLOY_KEY=your_eu_deploy_key npx convex deploy
```

If `codegen` fails here, stop and fix env/auth before importing data.

## Step 6: Import the production backup into the EU deployment

Run the import against the new EU production deployment.

Example:

```bash
CONVEX_DEPLOY_KEY=your_eu_deploy_key npx convex import ./backups/convex-us-prod-YYYY-MM-DD-HHMM.zip
```

If you need to retry into a non-empty deployment, use the official replacement/import guidance rather than manually deleting records.

After import:

- confirm document counts match your pre-flight note
- confirm any file storage assets included in the export are available

## Step 7: Smoke test the EU deployment before frontend cutover

Run these tests against a local or preview frontend pointed to the new EU deployment URL.

## Public and funnel

1. Open the home page.
2. Accept only the consent categories you want to test.
3. Complete the quiz as a guest.
4. Confirm lead/report creation completes without errors.
5. Confirm the report link opens.

## Auth and claim flow

1. From the guest session, sign up with email link or Google.
2. Confirm the profile icon appears.
3. Confirm the guest records are attached to the authenticated user.

## Admin

1. Sign in with an allowlisted admin email.
2. Open `/admin`.
3. Confirm admin pages load.
4. Sign out.
5. Sign in with a non-admin account.
6. Confirm `/admin` is blocked or redirected.

## Cookies and analytics

1. Open cookie preferences.
2. Reject all optional categories.
3. Confirm optional analytics scripts do not load.
4. Re-enable `analytics`.
5. Confirm GA4 and Clarity can load.
6. Re-enable `marketing` only if Meta/LinkedIn are truly needed.

## Step 8: Update the frontend to use the EU deployment

In Vercel production envs, replace the old Convex URL with the new EU deployment URL:

- `NEXT_PUBLIC_CONVEX_URL`
- `CONVEX_URL` if used in that environment

Then trigger a fresh production deployment of the frontend.

Do not reuse an old build that was compiled against the US URL.

## Step 9: Production cutover checks

Immediately after the frontend deploy:

1. Open the public site on the real production domain.
2. Confirm the app responds using the EU deployment URL.
3. Submit a new test lead.
4. Sign in with admin.
5. Confirm new data appears in the EU admin dataset.

Keep the old US deployment online but unused until all checks pass.

## Step 10: Rollback plan

If anything critical fails after cutover:

1. Revert Vercel envs back to the old US `NEXT_PUBLIC_CONVEX_URL`.
2. Redeploy the frontend immediately.
3. Stop further writes on the EU deployment until the issue is understood.
4. Keep the EU deployment intact for forensic comparison.

Rollback should be based on frontend env re-pointing first, not on rushed data surgery.

## Project-specific acceptance criteria

Do not mark the migration complete until all of these are true:

- `pnpm exec convex codegen` succeeds against the EU deployment
- `pnpm exec tsc --noEmit` succeeds
- guest quiz submissions work
- lead email/report flow works
- Clerk sign-up and sign-in work
- guest records are claimed after auth
- allowlisted admins can access `/admin`
- non-admin users cannot access `/admin`
- privacy/cookie controls still behave correctly

## Sources

- Convex deploy key docs: [docs.convex.dev/production/hosting/vercel](https://docs.convex.dev/production/hosting/vercel)
- Convex env vars: [docs.convex.dev/production/environment-variables](https://docs.convex.dev/production/environment-variables)
- Convex import/export: [docs.convex.dev/database/import-export](https://docs.convex.dev/database/import-export)
- Convex EU hosting announcement: [news.convex.dev/we-finally-got-our-eu-visa](https://news.convex.dev/we-finally-got-our-eu-visa/)
