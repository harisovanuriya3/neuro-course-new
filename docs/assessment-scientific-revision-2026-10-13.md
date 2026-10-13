# Scientific assessment revision — working protocol

Date: 2026-10-13
Scope: 25 modules, RU/EN/KZ. This is a review plan, not a claim that questions have been validated.

## Confirmed baseline
- Based on branch `refactor/module-2-evidence-based` at `786458de53366a46ea3890dc0a0c53c1a191a622`.
- `content/exam-bank.ts` contains reusable generic stems, including “Что здесь происходит с точки зрения физиологии?” and “Как лучше рассуждать в этой ситуации?”.
- `scripts/check-tests.cjs` tests module 1 branching behavior; it does not certify scientific accuracy across all modules.
- `scripts/validate-references.cjs` checks navigation/source URL consistency for 25 modules × 3 languages; it does not verify source authority or evidence.

## Acceptance criteria for each revised task
1. Start with a concrete, unambiguous question linked to one measurable learning outcome.
2. Use scientifically coherent, sufficient experimental or clinical observations.
3. Demand an explicit cause → mechanism → predicted result inference.
4. MCQ: exactly one defensible answer, comparable plausible distractors, no giveaway by length.
5. Explain the correct answer and the specific misconception in each distractor.
6. Distinguish observations, hypotheses and conclusions; do not infer a diagnosis from insufficient evidence.
7. Link claims to verified textbook/review/guideline sources, with bibliographic metadata and relevant section; do not invent citations.
8. Ensure RU/EN/KZ preserve scientific meaning, numerical values and terminology.
9. Compare against module tests and other exam questions for duplicates.
10. Require human subject-matter review before labeling as scientifically approved.

## First target
Audit `content/exam-bank.ts` and replace generic template-generated items with authored, topic-specific vignettes and rationales in small, testable batches. Preserve existing student progress/data contracts and question IDs where possible. Do not merge into `main` until build, navigation, three-language checks and human content review are complete.

## Status
Protocol committed; question replacements, scientific validation, test execution, and Vercel publication remain pending.
