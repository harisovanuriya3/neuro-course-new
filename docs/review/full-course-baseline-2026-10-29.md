# Expert audit: baseline coverage (2026-10-29)

Scope: latest production source `main` at `4fc1c242dacc9cb216fd9b5485bdbfba4dd548fb`, copied into `review/full-course-qa-20261029`.

## Verified from source inspection
- `components/TeacherVideoGallery.tsx` has teacher-video entries for modules **1, 2, 3, 5, 6, 7, 9** (7/25). The other 18 modules are not mapped in **this gallery**. This does not establish absence of other videos in `MediaContent` or elsewhere.
- The gallery lists 16 clip references, including a reused `clip-08.mp4`. It checks files using HTTP HEAD at runtime. File existence, playback, licensing and pedagogical suitability still need separate verification.
- `components/VirtualPatientVisual.tsx` has a visual configuration for **all 25 modules**, but it renders programmatic SVG diagrams, not verified anatomical photos. Do not report the image requirement as completed.
- `content/virtual-patients.ts` defines structured patient scenarios and stages. The number, uniqueness and scientific correctness of scenarios must be checked by running the code.
- `components/ExamCenter.tsx` supports multiple task formats, but this does **not** prove the exam bank is complete.
- `content/course-foundation/assessment.ts` builds branching tests using five main competency nodes, with extra module-specific questions for modules 4 and 5. Counting source occurrences is not a valid substitute for evaluating the runtime-generated lesson. In particular, the 20-tests/20-cases requirement remains **unverified**.

## Protected assets
Preserve the existing EEG demonstration with a woman and its eyes-open/eyes-closed and other state changes; verify the exact file paths and behaviors before changing the EEG laboratory. Preserve existing video clips, patient visuals, exam bank and translations. Do not silently replace them with placeholders.

## Acceptance criteria before public release
1. For every module 1–25 and language RU/EN/KZ, verify 20 distinct case tasks and 20 distinct four-option single-best-answer questions, each with medically accurate feedback. Record actual counts, not assumptions.
2. Verify the source, license, availability and medical correctness of each real anatomical image/video; do not describe synthetic diagrams as real photos.
3. Each virtual laboratory must let learners manipulate relevant physiological conditions and interpret a dynamic response, rather than only animate a decorative figure.
4. Check patient scenarios for branching, clinical plausibility, safety and six-stage completion.
5. Check exam randomization, scoring, unanswered-item handling, submission locking, explanation and accessibility.
6. Run type checks, course audits, production build, browser/mobile and keyboard/voice tests.
7. Deploy production **once**, only after the above checks pass, and verify the production URL. Keep main unchanged until that gate.

## Current release decision
**NOT READY.** This document records a baseline audit, not completion of the 425-section scientific review.
