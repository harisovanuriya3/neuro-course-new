# Historical release audit — staging PR 40 (2026-11-01)

> **Historical snapshot.** The blockers below describe PR 40 at that point in time and are not the current release status. Subsequent PRs integrated the missing module 20 assessment routing, exam/media navigation, author-review corrections, specialized laboratories, and visual-attribution fixes. Consult the current `main` CI and comprehensive audit for present status.

## Verified automatically
- GitHub Actions run 41254578735: course audit PASS; TypeScript PASS; Next.js build PASS.
- Compared staging against main: 50 added files, 4 modified files, 0 removed files.
- The four modified files have additions only (521, 8, 3, 1 lines respectively); no removed lines.
- Staging is ahead of main with no behind commits at the comparison point.

## Confirmed outstanding publication blockers
- Module 20 visual pretest and final assessment helpers exist but are not yet connected in content/course-foundation/index.ts.
- PR #36 exam/media integration is not included in staging changes; verify exam/media navigation before release.
- Module 15 has additional theory and pretest plus lab, but the draft practical and final assessment expansion from PR #25 has not been integrated.
- Automated build checks do not prove clinical accuracy, duplicate-free questions, mobile rendering or actual browser interaction.
- Search is already implemented in StudyToolbar and lib/courseSearch; avoid duplicating it. Verify indexed content after connecting all lessons.
- Calendar stores data locally per browser and offers JSON export; no cross-device sync is claimed.

## Release decision
HOLD. Do not merge staging into main or deploy until the remaining content is integrated and interactive/visual QA is complete.
