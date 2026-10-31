# Module 2 — expert acceptance audit (2026-10-31)

Status: **NOT ACCEPTED**. This document is an evidence-based issue register, not a claim of complete medical peer review.

## Technical specialist
- GitHub Actions Technical Build Check for commit a43730c52a6cb7ea7a94d753b18414b44c2786f5 completed successfully: audit:course, TypeScript and production build.
- Existing scripts/check-module2-completeness.cjs verifies presence, minimum counts and shared RU/EN/KZ IDs, but does **not** independently verify clinical correctness, image availability or visual rendering.
- New module 2 lab stations are authored in content/course-foundation/module-two-practical-stations.ts and included in practice via content/course-foundation/index.ts.
- Required: verify external Wikimedia media fetches, responsive layout and accessibility in an actual browser; these have not been tested here.

## Medical educator
- Authored theory includes EEG biophysics, stimulus-locked averaging and choice of EEG/MRI/EMG. Existing course theory is retained.
- Existing case generator creates two general reasoning cases for module 2 and one EEG artifact case (m2-evoked-averaging). Three cases are far below the requested 20–30 distinct clinical/situational problems.
- The EEG artifact vignette correctly distinguishes a stimulus-locked blink from proof of cortical activity. This is one reviewed example, not a sign-off on every case or answer.
- Required: expand case bank with non-duplicative scenarios and full answer keys; inspect every test question and translation; include traceable textbook references.

## Student
- Three additional practice stations address EEG montage, evoked-potential averaging and diagnostic modality selection.
- Need progressive worked examples, clearly linked anatomical figures alongside the corresponding theory paragraphs, and actionable self-checks with feedback.
- Module-level anatomy/media links exist in SectionContent and resources page. Their real-world loading, relevance and readability require browser-based visual QA.

## Acceptance gates before moving to module 3
1. At least 20 substantively distinct clinical/situational cases per language, with verified physiological rationale.
2. Exam questions checked individually for one unambiguous key, distractor quality and RU/EN/KZ equivalence.
3. All anatomical and methodological figures verified for actual loading, caption, credit and placement both in theory and media library.
4. Manual mobile/desktop review and accessibility checks.
5. CI audit, TypeScript and production build pass on final revision.

Do not merge this draft PR or publish the incomplete module.
