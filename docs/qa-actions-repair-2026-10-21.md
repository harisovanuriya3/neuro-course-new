# Scientific and course QA repair — 21 October 2026

Scope: `refactor/evidence-based-assessment-audit`, starting at `f4bdbbac575f9d2f9b1dfcf17025dd82495126a0`. No merge, deployment or changes to main.

## Failure 491 and references

Confirmed GitHub run 39509325822 (#491), push of 178dd9ebbd055fb19fb9c6b8ab11aa980b2265e3: course verification failed, TypeScript/build skipped. Reproduced the exact ERR_ASSERTION locally.

Origin: content/course-foundation/module-four-references.ts, Ganong related-material target. The identifier `interactive` is valid and the page explicitly renders MembraneElectrophysiologyLab, with localized language passed through. However, getLesson(4, 'interactive', language) returns undefined: component-backed laboratories are not reading lessons. The reference validator requires a reading-lesson destination. Corrected this bibliographic related-reading assignment to the actual membrane `theory` lesson in all three languages. Laboratory navigation remains available. No invented lessons, validator changes, removed assertions or relaxed requirements.

Unchanged validate-references.cjs passes 25 modules × RU/EN/KZ: 483 internal blocks, 75 external-source blocks, destination/anchor and label/href uniqueness checks. No analogous failing reference targets remain. Route contracts confirm 17 section identifiers, explicit interactive routes and service routes. Production HTTP requests succeeded for all 1,275 module/section/language combinations; HTTP success does not demonstrate interaction correctness.

Bibliographic validation is structural: URL syntax, source labels, related targets and existing edition/page contracts. It does not independently authenticate all edition/page claims or prove external link availability/full-text access.

## Assessment repetitions

The old long-string detector reports generic instructions repeatedly (and can include code fragments because it scans source with a regex). In assessment.ts, generic post-answer advice displaced actual topic feedback. Question explanations now use the existing localized mechanism/interpretation for that topic. First remediation distinguishes five skills: concepts, mechanism, evidence/application, changed conditions/transfer, and justification/limits. Second remediation supplies the topic mechanism. Keys, option shuffling and branching remain intact. Added runtime data/engine regression over 24 foundation factories × three languages.

Repeated corrective/basic questions are intentional retries within a competency; retained rather than cosmetically reworded. This work does not establish absence of semantic duplicates across the entire authored assessment/exam bank. Generic term-pair transfer scenarios and distractor quality in remaining foundation modules still need substantive expert review; no unverified new physiology was invented to manufacture uniqueness.

## Further defects exposed after the first failure

- Updated module 3/4 virtual-model source contracts for the existing module 5 model guard, preserving portrait suppression, fixed-data visualization, scoring disclosure and model-specific feedback requirements.
- Updated notes source assertion for actual whitespace; storage failure behavior remains covered by runtime tests.
- Fixed a missing parenthesis in module 5 theory registration assertions; all locale registration assertions now execute.
- Restored RU/EN/KZ module 3 media disclaimer: sizes and curves are illustrative, not measurements or a cellular calculation.

## Workflow frequency

Recent runs #483–492 have distinct pushed commits, including documentation/checkpoint commits. #492 also has run_attempt=2 (a rerun). Current repository workflows contain no auto-commit, write token, workflow_run, schedule or pull_request trigger. No evidence of a self-triggering loop in repository configuration; external automation/account activity cannot be excluded from these files alone.

Added branch-scoped concurrency with cancel-in-progress, retaining push checks and manual dispatch. Documentation-only pushes (docs/**, root Markdown, git-status.txt) no longer spend a full QA run. Mixed code/documentation pushes still run. No PR trigger added, avoiding push+PR duplication. Manual dispatch remains available for documentation review. contents:read remains unchanged.

## Validation

- npm ci: passed.
- node scripts/validate-references.cjs: passed unchanged.
- npm run audit:course (including audit:science): passed.
- All 53 non-browser scripts: passed, including branching-test engine, content, lab, assessment and reference contracts.
- npx tsc --noEmit: passed.
- npm run build: passed (34 routes).
- Production HTTP smoke: 1,275/1,275 module × section × language pages returned 200 without Next 404 fallback.
- Browser scripts requiring Chrome/CDP :9223: unavailable here; Chrome is not installed. Initial attempts without CDP failed with ECONNREFUSED and are not counted as passes. No claim of visual, speech, keyboard or interaction E2E verification.

Local runtime: Node 24.19.0; workflow requests Node 22. GitHub execution must confirm runner parity. Successful code checks are not scientific certification.

## Expert review remaining

A physiologist should verify source-to-claim correspondence and exact editions/pages across all 25 modules, numerical assumptions/model limits, ambiguous transfer scenarios, competing diagnoses/distractors, answer equivalence, and meaningful semantic overlap. Native KZ/EN reviewers should check physiological terminology and translation equivalence. Browser review should confirm target rendering, laboratory behavior, assessment feedback timing, accessibility, audio and mobile layout.
