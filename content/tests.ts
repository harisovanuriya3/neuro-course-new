export type TheoryTarget = { moduleId: number; anchor: string };
export type TestOption = { id: string; text: string };
export type QuestionCopy = {
  prompt: string;
  options: TestOption[];
  correctAnswer: string;
  explanation: string;
};
export type QuestionNode = QuestionCopy & {
  id: string;
  type: "question";
  level: "main" | "corrective" | "basic";
  competency: string;
  onCorrect: string;
  onIncorrect: string;
};
export type RemediationNode = {
  id: string;
  type: "remediation";
  competency: string;
  depth: 1 | 2;
  text: string;
  theoryTarget: TheoryTarget;
  next: string;
};
export type TestNode = QuestionNode | RemediationNode;
export type TestUI = {
  introduction: string; languageWarning: string; localNote: string;
  mainProgress: string; additional: string; basic: string; competency: string;
  check: string; select: string; correct: string; reviewNeeded: string;
  continue: string; finish: string; review: string; detailedReview: string;
  openTheory: string; newTab: string; reviewed: string; unresolvedFeedback: string;
  route: string; mainQuestion: string; extraQuestion: string; theoryVisit: string;
  immediate: string; recovered: string; needsReview: string;
  complete: string; firstAttempt: string; mastery: string; recoveredCount: string;
  extraCount: string; remediationCount: string; weakTopics: string;
  noWeakTopics: string; repeatTheory: string; restart: string; resultNote: string;
};
export type BranchingTest = {
  kind: "tests";
  title: string;
  moduleTitle: string;
  ui: TestUI;
  start: string;
  mainIds: string[];
  competencies: Record<string, { title: string; theoryTarget: TheoryTarget }>;
  nodes: Record<string, TestNode>;
};
