import type { BranchingTest, QuestionCopy, TestUI, TestNode } from "../../../tests";

// A single topology for all languages. Future modules can provide their own graph.
export const topics = [
  { id: "organization", anchor: "nervous-system" },
  { id: "cns-pns", anchor: "cns-pns" },
  { id: "afferent", anchor: "cns-pns" },
  { id: "efferent", anchor: "cns-pns" },
  { id: "effector", anchor: "cns-pns" },
  { id: "excitation", anchor: "principles" },
  { id: "synapse", anchor: "principles" },
  { id: "integration", anchor: "principles" },
  { id: "feedback", anchor: "cns-pns" },
  { id: "regulation", anchor: "functions" },
] as const;

export type TopicId = (typeof topics)[number]["id"];
export type TopicCopy = {
  title: string;
  main: QuestionCopy;
  corrective: QuestionCopy;
  basic: QuestionCopy;
  review: string;
  detailedReview: string;
};
export type ModuleTestCopy = {
  title: string; moduleTitle: string; ui: TestUI;
  topics: Record<TopicId, TopicCopy>;
};

// Explicit answer IDs keep correctness independent of option position and translation.
export function question(prompt: string, options: [string, string, string, string], correctAnswer: "a" | "b" | "c" | "d", explanation: string): QuestionCopy {
  return { prompt, options: options.map((text, index) => ({ id: "abcd"[index], text })), correctAnswer, explanation };
}

export function createModule1Test(copy: ModuleTestCopy): BranchingTest {
  const nodes: Record<string, TestNode> = {};
  const competencies: BranchingTest["competencies"] = {};
  const mainIds = topics.map(({ id }) => `${id}:main`);
  topics.forEach(({ id, anchor }, index) => {
    const topic = copy.topics[id];
    const theoryTarget = { moduleId: 1, anchor };
    competencies[id] = { title: topic.title, theoryTarget };
    const next = mainIds[index + 1] ?? "end";
    for (const level of ["main", "corrective", "basic"] as const) {
      const nodeId = `${id}:${level}`;
      nodes[nodeId] = {
        ...topic[level], id: nodeId, type: "question", level, competency: id,
        onCorrect: next,
        onIncorrect: level === "basic" ? next : `${id}:review-${level === "main" ? 1 : 2}`,
      };
    }
    for (const depth of [1, 2] as const) {
      const nodeId = `${id}:review-${depth}`;
      nodes[nodeId] = {
        id: nodeId, type: "remediation", competency: id, depth, theoryTarget,
        text: depth === 1 ? topic.review : topic.detailedReview,
        next: `${id}:${depth === 1 ? "corrective" : "basic"}`,
      };
    }
  });
  return { kind: "tests", title: copy.title, moduleTitle: copy.moduleTitle, ui: copy.ui, start: mainIds[0], mainIds, competencies, nodes };
}
