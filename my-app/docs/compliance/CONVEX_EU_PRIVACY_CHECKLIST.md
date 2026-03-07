# Convex EU Privacy Checklist

Last updated: March 7, 2026

This document is the operational checklist for moving the current stack closer to a defensible EU privacy posture.

## What is already implemented in this repo

- Guest-to-user claim flow for quiz leads and reports using `guestSessionId`
- Granular cookie preferences for `analytics`, `marketing`, and `custom`
- Analytics tags loaded only after consent
- Google Consent Mode signals prepared in the frontend analytics layer
- Admin access gated in app and Convex modules
- Public privacy and accessibility pages linked from the footer
- A project-specific cutover runbook exists in `docs/compliance/CONVEX_EU_CUTOVER_RUNBOOK.md`

## What moving Convex to the EU does

Moving Convex from a US region to an EU region reduces transfer scope for application data stored in Convex.

It does **not** by itself make the whole stack compliant. These vendors still need separate review:

- Clerk: auth and user management
- Google Analytics / GTM: analytics and consent mode
- Microsoft Clarity: behavior analytics
- Meta Pixel / LinkedIn Insight Tag: marketing tracking
- Any custom scripts added via `NEXT_PUBLIC_CUSTOM_ANALYTICS_SCRIPTS`

## Current blocker

`convex/auth.config.ts` requires `CLERK_JWT_ISSUER_DOMAIN`, and `pnpm exec convex codegen` will keep failing until that env is set on the Convex deployment.

## Migration plan for Convex EU

1. Confirm EU region availability for your Convex plan and target deployment.
2. Decide whether Convex supports in-place region migration for your deployment. If not, create a new EU deployment and migrate data into it.
3. Export or back up the current US deployment before any cutover.
4. Create the EU deployment and configure the same auth provider domain.
5. Recreate all required deployment env vars:
   - `CLERK_JWT_ISSUER_DOMAIN`
   - `ADMIN_EMAILS`
   - `RESEND_API_KEY`
   - `CLOUDINARY_*`
   - any other production secrets already used in Convex
6. Point frontend envs to the new deployment:
   - `CONVEX_URL`
   - `NEXT_PUBLIC_CONVEX_URL`
7. Run:

```bash
pnpm exec convex codegen
pnpm exec tsc --noEmit
pnpm build
```

8. Smoke test:
   - guest quiz completion
   - report delivery link
   - sign-up with email link or Google
   - guest record claim after auth
   - admin login with allowlisted email only
9. After cutover, keep the old deployment read-only until data parity is confirmed.

## Vendor checklist

## Convex

- Confirm EU hosting/region and the exact deployment that will store production personal data
- Review MSA, privacy terms, DPA path, and subprocessors
- Document retention and deletion process for leads, scorecards, and CRM records

## Clerk

- Review Clerk privacy policy, DPA, subprocessors, and current hosting posture
- Decide whether the production instance must live in an EU region
- Enable only the sign-in methods actually needed for the project: email link and Google
- Disable Clerk telemetry in production unless you explicitly want it
- If legal acceptance is required at account creation, enable it in Clerk dashboard configuration

## Google Analytics / GTM

- Keep tags behind consent
- Use Consent Mode consistently
- Set event retention to the minimum business-acceptable window
- Disable extra Google features that are not necessary for this project
- Reflect the exact setup in privacy and cookie documentation

## Microsoft Clarity

- Keep Clarity behind analytics consent
- Review Microsoft privacy terms and data handling
- If combined with Google Consent Mode, verify the final behavior in production

## Meta Pixel / LinkedIn Insight Tag

- Keep both behind marketing consent
- Enable only if there is a concrete paid acquisition use case
- Review vendor terms, transfer mechanisms, and retention before activation
- If not actively used, leave their env vars unset

## Custom analytics scripts

- Treat every custom script as a separate vendor review
- Document owner, purpose, data categories, legal basis, and retention
- Do not load custom scripts from unknown or unversioned URLs

## Evidence pack to keep

- Approved vendor list
- DPA / contractual references
- Subprocessor list snapshots
- Record of processing activities
- Current privacy and cookie policy versions
- Accessibility audit results
- Screenshots of consent banner and preferences center

## Recommended go-live definition

Only call the stack "EU privacy ready" when all items below are true:

- Convex production data is stored in an EU region
- Clerk region/residency decision is documented
- `CLERK_JWT_ISSUER_DOMAIN` is set and Convex auth codegen passes
- Only needed analytics vendors are enabled
- Consent text matches real production vendors
- Retention settings are documented
- DSR process exists for access, deletion, and correction requests
- Accessibility audit has been run on core public pages and the funnel

## Source links

- Convex EU hosting announcement: [news.convex.dev/we-finally-got-our-eu-visa](https://news.convex.dev/we-finally-got-our-eu-visa/)
- Convex legal terms: [convex.dev/legal/msa](https://www.convex.dev/legal/msa)
- Convex privacy: [convex.dev/legal/privacy](https://www.convex.dev/legal/privacy)
- Clerk GDPR notice: [clerk.com/legal/gdpr](https://clerk.com/legal/gdpr)
- Clerk DPA: [clerk.com/data-processing-agreement](https://clerk.com/data-processing-agreement)
- Clerk privacy policy: [clerk.com/legal/privacy](https://clerk.com/legal/privacy)
- Clerk subprocessors: [clerk.com/legal/subprocessors](https://clerk.com/legal/subprocessors)
- Clerk telemetry opt-out: [clerk.com/legal/telemetry](https://clerk.com/legal/telemetry)
- Google consent mode: [support.google.com/tagmanager/answer/13802165](https://support.google.com/tagmanager/answer/13802165)
- Google Analytics data retention: [support.google.com/analytics/answer/7667196](https://support.google.com/analytics/answer/7667196)
- Microsoft Clarity consent mode: [learn.microsoft.com/en-us/clarity/setup-and-installation/consent-mode](https://learn.microsoft.com/en-us/clarity/setup-and-installation/consent-mode)
- Microsoft Clarity GDPR FAQ: [learn.microsoft.com/en-us/clarity/faq](https://learn.microsoft.com/en-us/clarity/faq)
- LinkedIn Insight Tag overview: [business.linkedin.com/marketing-solutions/insight-tag](https://business.linkedin.com/marketing-solutions/insight-tag)
