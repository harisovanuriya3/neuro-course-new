# Device and branch consolidation inventory — 2026-10-23

## Source of truth
GitHub main HEAD at inventory: df8a106a4dee924d2be7561aa19c832c54834323.
This integration branch starts from main; no divergent code has been merged.

## Existing remote branches
- main — current published-path work, including module 2 evoked averaging lab and RU/EN/KZ theory.
- fix/course-expert-review — behind main by 11, 0 ahead: already incorporated.
- fix/objectives-theory-media — behind main by 10, 0 ahead: already incorporated.
- refactor/evidence-based-assessment-audit — diverged, 672 ahead / 12 behind relative to main; 230 changed paths (71 content, 29 components, 59 scripts, 64 docs, plus other files). Requires selective evidence-based reconciliation, not blind merge.
- refactor/module-2-evidence-based — diverged, 1 ahead / 12 behind, 10 changed files. Compare with current module 2 before porting.
- complete-virtual-patient — diverged, 3 ahead / 769 behind, two changed VirtualPatient files. Historic September 30 changes.
- virtual-patient-dialogue-v2 — diverged, 10 ahead / 768 behind, two changed VirtualPatient files. Historic September 30 changes.

## Local PC (from VS Code screenshot)
Folder C:\Users\akimzhanovan\Desktop\neuro-course-new-latest, branch main, HEAD 59cbd70, behind today's remote main. Untracked: lib/studyTimer.ts, lib/unifiedPatientState.ts, scripts/check-study-tools.cjs (at least). Do not reset, clean, pull --rebase or merge until local modifications and untracked files are backed up.

## Limitations
This inventory cannot see unpublished files stored only on work PC, home PC, or phone. It cannot infer a particular file's source device from a Git commit. The generated RU/EN/KZ infographic PNGs are not yet present in GitHub.

## Safe consolidation order
1. Snapshot each device: zip the working folder including untracked files; do not include secrets or node_modules in a shared archive.
2. Run git fetch origin and git status --porcelain=v1, record git rev-parse HEAD and git remote -v on each PC.
3. Preserve differences from each machine on separate branches, without replacing main.
4. Review audit branch changes by content, components, scripts and build gates; selectively integrate after testing.
5. Compare module-2 exemplar and virtual-patient branches independently.
6. Validate RU/EN/KZ, 25 modules x 17 sections, tests and accessibility, run npm run audit:course, npm run build, and verify deployment before merging.
