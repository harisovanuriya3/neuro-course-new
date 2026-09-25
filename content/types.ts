export type Language = "RU" | "KZ" | "EN";
export type Section = "theory" | "practice" | "cases" | "tests" | "questions" | "media";

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "subheading"; text: string }
  | { type: "callout"; title: string; text: string };

export type Lesson = {
  title: string;
  sections: { title: string; blocks: ContentBlock[] }[];
  outcomes: { title: string; introduction: string; items: string[] };
  terms: { title: string; items: string[] };
};

export type PracticeBlock = ContentBlock
  | { type: "answer"; items: string[] }
  | { type: "response"; label: string }
  | { type: "sequence"; steps: string[] }
  | { type: "table"; headers: [string, string, string]; rows: [string, string, string][] }
  | { type: "checklist"; items: string[] };

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

export type LocalizedLesson = Record<Language, Lesson | PracticeLesson | import("./cases").CasesLesson>;
