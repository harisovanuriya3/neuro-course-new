# Module 4 / notes — targeted audit, 18 October 2026

This entry supplements `docs/scientific-review-progress-2026-10-13.md`. Appending to the large original journal was attempted but the GitHub write action was blocked.

## Verified scope

Read actual source files: `components/NotesContent.tsx`, `lib/moduleNotes.ts`, `content/sections.ts`, `scripts/check-module-three-notes.cjs`, `content/course-foundation/module-four-theory.ts`, `module-four-clinical.ts`, `module-four-glossary.ts`, `content/index.ts`, `package.json`, `vercel.json`.

Read actual Library textbook pages: Guyton & Hall 13th edition, PDF pp. 69–71 (Nernst/Goldman and resting potential); Ganong 23rd edition, PDF pp. 96–99 (ionic currents, action potentials and refractoriness); C. L. Ghai 8th edition, PDF pp. 379–381 (membrane recording and action potentials).

## Confirmed problem and change

Module 4 notes had only a generic note field, unlike the subject-specific module 3 notes. Added three reflection prompts in RU, EN and KZ: effect of extracellular K⁺ 4 to 8 mM on E(K) and two-ion Vm with fixed parameters; Na⁺-channel inactivation during sustained depolarization; why an unchanged illustrative spike trace cannot establish patient excitability. Notes are explicitly not graded. Change: `5e506bae`.

Added regression assertions to the existing `scripts/check-module-three-notes.cjs`, already invoked by `npm run audit:science`: `c1e5ac4f` and `ef4047f7`. After committing, 17 of 17 targeted source-text conditions passed in a JavaScript isolate, including all three languages, storage-failure handling and the disabled Vercel preview flag. This is **not** an executed Node regression suite.

## Outstanding verification

Container `git ls-remote` failed because github.com could not be resolved. Consequently `npm run audit:course`, `npx tsc --noEmit`, `npm run build`, browser, mobile and speech-input tests were not run. GitHub API found no PR-triggered workflow runs for `ef4047f7`; that endpoint does not prove absence of other CI. Native/subject expert review of KZ is pending. The 425-section audit is **not complete**. Do not merge to main or deploy; preview remains disabled.
