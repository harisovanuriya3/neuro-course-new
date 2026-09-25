export type CaseStage = { title: string; data?: string; questions: string[] };

export type CaseExercise = {
  id: string;
  title: string;
  situation: string;
  stages: CaseStage[];
  interaction?:
    | { type: "sequence"; steps: string[] }
    | { type: "choice"; prompt: string; options: { text: string; correct: boolean; feedback: string }[] };
  explanation: string[];
  diagram?: string[];
};

export type CasesLesson = {
  kind: "cases";
  title: string;
  moduleTitle: string;
  introduction: string;
  ui: {
    progress: string; completed: string; navigation: string; case: string;
    situation: string; stage: string; answer: string; placeholder: string;
    note: string; next: string; show: string; hide: string; explanation: string;
    complete: string; done: string; check: string; reset: string; undo: string;
    available: string; selected: string; empty: string; correct: string;
    incorrect: string; incomplete: string; choose: string; gate: string;
    sequenceGate: string; choiceGate: string; diagram: string; sources: string;
  };
  cases: CaseExercise[];
  sources?: { title: string; href: string }[];
};
