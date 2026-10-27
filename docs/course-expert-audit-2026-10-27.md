# Scientific, pedagogical, linguistic, accessibility and technical audit — 27 October 2026

**Scope:** neurophysiology textbook, 25 modules, 17 section slots per module, RU/EN/KZ. Review of current source and deployment. **Not a certification that all 1,275 localized pages were manually visually inspected.**

## Findings and actions

| Dimension | Source-supported finding | Action in this change | Still open |
| --- | --- | --- | --- |
| Neurophysiology | Module 8 identifies 19 named ascending/descending systems, but some are heterogeneous projections; corticobulbar does not terminate in spinal cord. | Keep the corticobulbar exception and annotated tract-by-tract descriptions; distinguish photograph from educational diagrams. | Physiologist to verify every route, crossing, laterality and clinical interpretation across all modules. |
| Clinical interpretation | Lesion side alone does not diagnose a neurological condition. Some tract projections are bilateral; some have no isolated human syndrome. | Existing model marks ambiguous outcomes and now prioritizes evidence-based anatomical routes. | Validate lesion-level assumptions and deficits against textbooks and published neuroanatomy. |
| Teaching and examination | A standard foundation case lesson is generated from two scenarios (additional authored cases exist for selected modules). The standard test starts from five main question IDs; some modules add bespoke questions. This **does not meet** a verified 20 distinct cases and 20 distinct tests per module. | Add `npm run audit:coverage` reporting actual per-module and per-language counts and distinct case/test prompts. | Authored physiology-specific sets, clinical-vignette review, clear explanations and distractor audit to reach the target without template filling. |
| Visual design | The old module 8 three-tract laboratory repeated material next to the new nineteen-pathway laboratory. The same module infographic was injected into theory, practice and cases. | Collapse the old localization exercise; keep infographic in theory and scheme-builder in practice, preserving cases as case work. Replace one repeated overview photo with a licensed real spinal section in the optional atlas. | Check each page at desktop/tablet/mobile widths; correct unrelated module layouts. |
| RU / EN / KZ | Core lesson systems and laboratory labels have translations. | Coverage reporting across each locale. | Professional scientific language review of individual texts and glossary terms. |
| Student UX | Long pathway tables were replaced with sequential responsive cards; image views remain partly static. | Reduce duplicate surfaces and prioritize the 19-tract guided experiment. | Keyboard-only testing, focus order, screen-reader descriptions, small-screen screenshots, working reset/submit throughout all 25 modules. |
| Engineering | Current `main` deploys to Vercel; deployment READY was observed before this update. | Add a read-only quality audit and preserve existing EEG lab and restored images. | Build new commit, review CI, then test live routes; a successful build does not prove pedagogical correctness. |
| Progress/privacy | Student progress is stored in browser local storage in existing components. | No changes to student records. | Real teacher/student multi-device accounts and server-side secure storage are **not** proven implemented. |
| Media attribution | Historic course images and real microscopy coexist with pedagogical simplified drawings. | Histological cross-section linked to author and CC BY-SA 4.0 license; avoid implying individual tract boundaries are visible microscopically. | Clearance and attribution review for all third-party and user-uploaded images/videos. |

## Release criteria before claiming final academic acceptance

1. Every module-language pair has at least 20 genuinely different, physiologically correct graded test questions with four plausible choices, one correct answer, and specific feedback (remediation retries do not count as new questions).
2. Every module-language pair has at least 20 genuinely different clinical/problem scenarios with enough data to infer a mechanism and distinguish alternatives.
3. All 25 × 17 section routes load; labels, content and navigation remain functional in RU, EN and KZ.
4. Realistic figures show anatomy accurately, preserve licenses, and have readable captions, rather than vague duplicates; anatomical cross-sections and schematic tract positions are not conflated.
5. Interactive experiments change physiologically meaningful outputs, compare student hypotheses and explain results.
6. Check production at mobile/desktop sizes, keyboard use, video playback, controls, exam result persistence and Vercel build.

## Reproduction

- `npm run audit:coverage` — factual counts and file presence; warns if 20/20 target missing, **does not generate placeholder data**.
- `npm run check:review` — structural course/test/assessment checks.
- `npm run audit:course` — broader available validations (see package.json).
- `npm run build` — Next.js production compilation.

## Reference basis for pathway review

- OpenStax, *Anatomy and Physiology*, Central Processing: https://openstax.org/books/anatomy-and-physiology/pages/14-2-central-processing
- NCBI Bookshelf, *Neuroanatomy, Brainstem*: https://www.ncbi.nlm.nih.gov/books/NBK544297/
- NCBI Bookshelf, *Neuroanatomy, Corticobulbar Tract*: https://www.ncbi.nlm.nih.gov/books/NBK555891/
- Histological photo: Didkov, *Cross-section through the spinal cord*, Wikimedia Commons, CC BY-SA 4.0: https://commons.wikimedia.org/wiki/File:Cross-section_through_the_spinal_cord.jpg

**Editorial verdict:** publicly usable for supervised teaching and review; **not** verified academically complete or expert-certified throughout.
