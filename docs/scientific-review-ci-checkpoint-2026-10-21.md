# CI evidence checkpoint — 2026-10-21

The earlier progress journal contains outdated statements that no Node, TypeScript or build checks were run. On 2026-10-21, GitHub Actions run **39575497032** for commit **de3939bd7842bc0064ba7691c19e932218df6882** finished **success**. Job **119139925676** completed checkout, dependency install, course/science audits, TypeScript and an isolated `next build` (34/34 static pages). This was a review-branch CI build, **not a Vercel preview or production deployment**.

Verified from the job log: `validate-references.cjs` passed across 25 modules × 3 languages (483 internal navigation/resource blocks, 75 external-source blocks); source-contract tests for module 5 theory, glossary, practice, cases, tests and media passed. This does **not** prove native-language equivalence, scientific correctness of all distractors, browser accessibility or all 425 sections. The CI run did **not** execute the existing `scripts/check-module-five-virtual-patient.cjs`, which is absent from `audit:science`.

A separate targeted module 5 virtual-patient review is recorded in `docs/module-five-virtual-patient-audit-2026-10-21.md`. Its mentor/question duplication is still uncorrected. The audit journal `docs/scientific-review-progress-2026-10-13.md` needs to incorporate these two checkpoints when updating existing files is available.

The new documentation commit(s) postdate the successful CI SHA and have **not** been certified by that run. No merge to main, no preview and no production publication.
