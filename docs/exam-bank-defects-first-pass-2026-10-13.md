# Exam bank: confirmed scientific and logical defects (first pass)

Reviewed: `content/exam-bank.ts` and `content/course-foundation/assessment.ts` in the assessment audit branch, 2026-10-13.

## Critical — generated questions
The bank loops `for(let n=0;n<40;n++)` for every topic, reusing only four prompt patterns, rotating generic stems and four correct-answer/explanation patterns. These are variants of templates, **not forty independently authored and scientifically reviewed questions** per module. Do not describe their quantity as validated question-bank depth.

## Critical — answer validity
The generic generator draws wrong answers from unrelated term definitions and canned meta-reasoning statements. Such distractors can be trivially rejected by topic mismatch, length or wording; some generated correct answers are first sentences of general mechanisms, without proving that they uniquely answer the vignette. Each item needs manual mechanism-based distractors and independent key review.

## Critical — causal sequencing
The fallback sequence generator uses generic labels “Initial physiological change” → topic term A → topic term B → “Functional result” and assigns `correctOrder: ["stimulus","a","b","response"]` for every topic. A topic's first two terms are **not necessarily causally ordered**, so the fixed key may be scientifically invalid. Replace these with authored, topic-specific steps and a checked causal explanation.

## High — missing item-specific sources
The generator attaches `topic.mechanism` or `topic.interpretation` as explanation. The examined `ExamBankQuestion` type does not include a source/citation field. Reference URL validation elsewhere does not establish evidence for each exam answer.

## High — translation equivalence
The Russian first question can use `RU_CORE[topic.id]`, while EN/KZ fall back to generic generation. These are not necessarily equivalent assessments. The same learning outcome, data, key and mechanism should be translated across RU/EN/KZ.

## Revision strategy
1. Freeze the current bank as legacy until reviewed; do not silently replace question IDs or students' stored results.
2. Start with authored EEG artifact, demyelination, membrane potential and synaptic Ca²⁺ items.
3. Record per item: module, outcome, RU/EN/KZ prompt, key, plausible distractors, causal rationale, source chapter/page or section, and reviewer status.
4. Replace template-generated items and fallback sequence items only after test coverage and expert sign-off.
5. Verify against the user's Guyton & Hall, Ganong, and Ghai books; do not reproduce copyrighted passages.

This document is a **code-level defect audit**, not proof that all questions have been individually checked or fixed.
