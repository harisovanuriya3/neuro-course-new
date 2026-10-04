import type { Language } from "./course";
export type { Language } from "./course";
export type { Section } from "./sections";

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "subheading"; text: string }
  | { type: "callout"; title: string; text: string };

export type Lesson = {
  title: string;
  sections: { id?: string; title: string; blocks: ContentBlock[] }[];
  outcomes: { title: string; introduction: string; items: string[] };
  terms: { title: string; items: string[] };
};

export type PracticeBlock = ContentBlock
  | { type: "answer"; items: string[] }
  | { type: "response"; label: string }
  | { type: "sequence"; steps: string[] }
  | { type: "table"; headers: [string, string, string]; rows: [string, string, string][] }
  | { type: "checklist"; items: string[] }
  | { type: "classification"; groups: [string, string]; items: { label: string; group: 0 | 1 }[]; reasonLabels: [string, string]; answer: string[] }
  | {
      type: "ai-audit";
      instructions: string;
      cases: {
        claims: { text: string; isError: boolean; explanation: string }[];
        source: { label: string; href: string };
        theoryAnchor: string;
      }[];
      labels: {
        aiAnswer: string; prediction: string; trust: string; trustHint: string;
        lock: string; identify: string; rationale: string; check: string;
        missing: string; result: string; found: string; missed: string;
        markedCorrect: string; correct: string; retry: string; theory: string;
        modelAnswer: string; nextCase: string; source: string;
      };
    };

export type PracticeLesson = {
  kind: "practice";
  title: string;
  moduleTitle: string;
  ui: {
    showAnswer: string;
    check: string;
    reset: string;
    undo: string;
    correct: string;
    incorrect: string;
    incomplete: string;
    available: string;
    selected: string;
    empty: string;
    input: string;
    theory: string;
    localNote: string;
  };
  sections: { title: string; blocks: PracticeBlock[] }[];
};

// Existing theory data stays unchanged; its discriminator is added at registration.
export type SectionLesson =
  | (Lesson & { kind: "theory" })
  | PracticeLesson
  | import("./interactive").InteractiveLesson
  | import("./media").MediaLesson
  | import("./cases").CasesLesson
  | import("./tests").BranchingTest
  | import("./study").StudyLesson;

// Only implemented renderers belong here. Adding a kind requires an explicit
// branch in SectionContent; unfilled sections remain absent from the registry.
export type LocalizedLesson = Record<Language, SectionLesson>;
