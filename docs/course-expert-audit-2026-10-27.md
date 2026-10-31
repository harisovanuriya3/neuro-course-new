# Scientific, pedagogical, visual, linguistic, accessibility and technical audit — 31 October 2026

**Scope:** neurophysiology textbook, 25 modules, 13 authored lesson sections plus auxiliary routes, RU/EN/KZ. The automated audit covers all 75 module-language pairs. **This is not a claim that every localized page, question, illustration and interaction has been independently certified by a human subject-matter expert.**

## Verified current state

| Dimension | Verified result | Evidence / implementation | Remaining limitation |
| --- | --- | --- | --- |
| Route and language coverage | All 75 module-language pairs contain the complete authored lesson route set; no RU/EN/KZ count mismatch was detected. | `npm run audit:course` and `scripts/audit-full-course.cjs`. | Manual linguistic editing by native scientific editors is still required, especially for idiomatic KZ terminology. |
| Situational problems | Every module-language pair now has at least 20 distinct case prompts. The audit reports 0 pairs below target. | Eighteen mechanism/evidence frames were added to foundation modules and localized in RU/EN/KZ; module 1 retains its authored cases. | The expanded frames are structured, topic-specific learning cases, not a substitute for independent clinical review. Review plausibility, data sufficiency and scope of inference module by module. |
| Main tests | Every module-language pair now has at least 20 distinct main questions. The audit reports 0 pairs below target. | Foundation modules received distinct mechanism competencies; module 1 received ten additional localized questions. Test-graph validation checks reachability and unique main competencies. | A human examiner must still review distractor plausibility, difficulty balance, factual nuance and translation quality. Quantity is not proof of assessment validity. |
| Test behavior | Correctness is tied to option IDs, answer positions vary, scores are capped at 0–100, and final submission locks into a result view with analysis. | Existing engine checks plus course audit. | Perform user testing for accidental cueing, keyboard operation, persistence and repeated attempts. |
| Practice and laboratory | Module 1 has a 13-step practice progression and drawing synthesis; specialized interactive/laboratory routes exist for modules 2–25 and pass structural validation. | `validate-interactive.cjs`, `validate-practical-stations.cjs`, and activity-clarity checks. | Structural presence does not prove physiological fidelity or instructional value. Each control/output relationship and every reset/submit path needs hands-on review. |
| Virtual patients | 25 virtual patients have authored decision sets; each enforces six stages with three choices per stage. | Course audit assertions. | Clinical realism, diagnostic ambiguity, safety language and feedback should be reviewed by a clinician/physiologist. |
| Visual coverage | 52 unique curated visual files are registered across 25 modules; duplicate filenames are rejected. Visuals are surfaced in theory, practice and the resources library with backlinks. | `AnatomyReference.tsx`, `AdvancedAnatomyReference.tsx`, and `check-resource-library.cjs`. | Some laboratory interfaces still contain simplified code-drawn schemes. Real photographs cannot replace explanatory diagrams in every context; each schematic must now be judged for anatomical accuracy and visual quality. |
| Primitive/duplicated visuals | The two primitive module 1 nervous-system diagrams identified in review were removed; a repeated peripheral-nerve image was also removed. | Module 1 animation/interactive cleanup and resource-library checks. | Manually inspect every page at mobile, tablet and desktop widths for visual repetition, cropping, tiny labels and low-value decoration. |
| Media attribution | Curated material includes licensed Wikimedia/OpenStax anatomy, histology and imaging. | Resource metadata and source links. | Complete a file-by-file copyright/license/attribution check before public release; do not assume that a reachable URL grants reuse rights. |
| Neurophysiology accuracy | The module 8 tract work distinguishes corticobulbar projections from spinal termination and retains route/crossing/laterality annotations. | Existing tract-specific content and prior pathway review. | A physiologist must verify every mechanism, tract, crossing, laterality statement and clinical interpretation across all modules. |
| Accessibility and mobile UX | Responsive structures and localized labels exist; automated build succeeds. | Technical Build Check run 212. | Required: keyboard-only traversal, visible focus, screen-reader names/descriptions, contrast, reduced-motion behavior, touch target sizing and screenshots on representative phones. |
| Engineering | Full audit, TypeScript check and production build pass on the review branch. | Technical Build Check run 212, commit `b42ac2ad5639c866adeccba8a99ff9cb3342f6c1`. | Dependency audit reports known high/critical packages and requires a separate compatibility/security remediation pass. A passing build is not pedagogical certification. |
| Progress and privacy | Existing student progress is local-browser based. | Current implementation; no student records changed in this work. | Multi-device accounts, teacher dashboards and secure server-side storage are not proven implemented. |

## Coverage figures

- 25 modules × 3 languages = 75 audited module-language pairs.
- 75/75 contain complete authored lesson routes.
- 75/75 contain at least 20 distinct situational cases.
- 75/75 contain at least 20 distinct main test questions.
- 25/25 virtual patients contain six decision stages with three choices at each stage.
- 52 unique curated visual files are registered; duplicate filenames fail the audit.
- RU/EN/KZ route-count mismatches: 0.

These are source-derived coverage figures. They do not establish that every item is medically correct, equally difficult, visually excellent or professionally translated.

## Qualitative release blockers

1. Conduct a physiology expert review of theory statements, causal chains, expected laboratory outputs, cases, test keys and feedback for all 25 modules.
2. Conduct a clinical review of virtual patients and any lesion-to-deficit inference; lesion side alone must not be presented as a diagnosis.
3. Review every third-party visual for exact reuse permission, attribution text, source stability, caption accuracy and educational relevance.
4. Replace or redesign remaining low-quality laboratory schemes where they do not materially teach a mechanism. Retain precise explanatory diagrams when photography would be less informative.
5. Perform professional RU/EN/KZ editing for terminology consistency and natural phrasing.
6. Complete mobile/tablet/desktop visual QA, keyboard and screen-reader testing, interaction reset/submit testing, video playback checks and progress-persistence checks.
7. Address dependency vulnerabilities through a controlled upgrade and regression test; do not apply a forced upgrade blindly.
8. Obtain explicit reviewer approval before merging or publishing the review branch.

## Reproduction

- `npm run audit:course` — complete structural, content, route, interaction, visual-library and review checks.
- `npm run audit:full` — 75-pair coverage report for routes, cases, tests and visuals.
- `npm run check:review` — structural course/test/assessment checks.
- `npx tsc --noEmit` — TypeScript validation.
- `npm run build` — Next.js production compilation.

## Reference basis retained from pathway review

- OpenStax, *Anatomy and Physiology*, Central Processing: https://openstax.org/books/anatomy-and-physiology/pages/14-2-central-processing
- NCBI Bookshelf, *Neuroanatomy, Brainstem*: https://www.ncbi.nlm.nih.gov/books/NBK544297/
- NCBI Bookshelf, *Neuroanatomy, Corticobulbar Tract*: https://www.ncbi.nlm.nih.gov/books/NBK555891/
- Didkov, *Cross-section through the spinal cord*, Wikimedia Commons, CC BY-SA 4.0: https://commons.wikimedia.org/wiki/File:Cross-section_through_the_spinal_cord.jpg

**Editorial verdict:** the review branch now meets the defined structural 20-case/20-test coverage target in all 25 modules and all three languages and passes the technical build. It is suitable for supervised review, but it is **not yet honestly describable as fully expert-certified or ready for unreviewed public academic release** until the qualitative blockers above are closed.
