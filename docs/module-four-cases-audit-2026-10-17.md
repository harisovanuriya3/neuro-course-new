# Module 4 cases — partial review (2026-10-17)

Read the module 4 topic, authored theory/practice/summary, generic case factory, case types, registry, and membrane lab. Compared mechanisms with Library Guyton & Hall 13e (PDF 70–75), Ganong 23e (PDF 19–20, 96–99), and C. L. Ghai 8e (PDF 250, 379–380).

The generic second case lacks a concrete physiological observation and its feedback does not resolve the mechanism. A two-case RU/EN/KZ replacement was committed as `content/course-foundation/module-four-cases.ts` (`7c8dedaf`): single-axon all-or-none versus compound nerve recruitment; and sustained potassium depolarization versus sodium-channel availability. Source read confirms three locale entries and stable case IDs.

**Not integrated:** the live registry `content/index.ts` still uses generic cases. Attempts to edit the registry and add a test were rejected by the GitHub write tool. This is a draft, not a fixed live route. Package and lockfile now both request TypeScript 6.0.3, but successful CI for that revision is not established. Local clone still fails due DNS. No Node, TypeScript, Next build, browser, mobile, or speech verification was performed.

Next: connect case builder in `content/index.ts` for RU/EN/KZ, add a regression test, run CI and browser review. All 425 sections remain uncertified end-to-end. Main and Vercel deployments were not touched; branch preview remains disabled.
