# Cases

`ru.ts`, `kz.ts`, and `en.ts` contain equivalent localized cases and UI text.
The reusable schema is in `content/cases.ts`; rendering and state live in
`components/CasesContent.tsx` and `components/cases/CaseCard.tsx`.

To add a future module, create its three `CasesLesson` exports and register them
under `cases` in `content/index.ts`. Case IDs must be unique within a lesson;
each case needs at least one stage. Sequence steps are stored in correct order
but displayed in a stable mixed order. Choice options include their own feedback.

Written responses unlock the next stage and explanation but are never graded.
A complete sequence or selected choice must be checked before its explanation
can be opened; an incorrect attempt also unlocks it for self-study. Completion
is an explicit student action after opening the explanation. Editing a response
invalidates that case's review and completion. Reloading or changing language
resets local state; no student response is sent to a server or stored persistently.

Verification: `node node_modules/typescript/bin/tsc --noEmit --incremental false`.
Browser checks: `node scripts/check-cases.cjs` with the app on port 3000 and
a dedicated headless Chrome instance exposing the debugging port 9223.
