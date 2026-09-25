import type { BranchingTest } from "../../content/tests";

export type Attempt = { nodeId: string; competency: string; level: "main" | "corrective" | "basic"; answer: string; correct: boolean };
export type RouteEvent = { type: "answer"; attempt: Attempt } | { type: "review"; nodeId: string; competency: string; depth: 1 | 2 };
export type TestState = {
  current: string;
  phase: "question" | "feedback" | "remediation" | "results";
  selected: string | null;
  attempts: Attempt[];
  history: RouteEvent[];
};
export type TestAction = { type: "select"; answer: string } | { type: "check" } | { type: "continue" } | { type: "restart" };

export function initialState(test: BranchingTest): TestState {
  return { current: test.start, phase: test.nodes[test.start].type === "remediation" ? "remediation" : "question", selected: null, attempts: [], history: [] };
}

function enter(test: BranchingTest, state: TestState, target: string): TestState {
  if (target === "end") return { ...state, current: target, phase: "results", selected: null };
  const node = test.nodes[target];
  return {
    ...state, current: target, selected: null,
    phase: node.type === "remediation" ? "remediation" : "question",
    history: node.type === "remediation"
      ? [...state.history, { type: "review", nodeId: node.id, competency: node.competency, depth: node.depth }]
      : state.history,
  };
}

export function transition(test: BranchingTest, state: TestState, action: TestAction): TestState {
  if (action.type === "restart") return initialState(test);
  if (state.phase === "results") return state;
  const node = test.nodes[state.current];
  if (action.type === "select") {
    if (state.phase !== "question" || node.type !== "question" || !node.options.some((option) => option.id === action.answer)) return state;
    return { ...state, selected: action.answer };
  }
  if (action.type === "check") {
    if (state.phase !== "question" || node.type !== "question" || state.selected === null) return state;
    const attempt: Attempt = { nodeId: node.id, competency: node.competency, level: node.level, answer: state.selected, correct: state.selected === node.correctAnswer };
    const answered: TestState = { ...state, attempts: [...state.attempts, attempt], history: [...state.history, { type: "answer", attempt }], phase: "feedback" };
    // An error leads directly to remediation; no correct option is revealed.
    return !attempt.correct && test.nodes[node.onIncorrect]?.type === "remediation"
      ? enter(test, answered, node.onIncorrect) : answered;
  }
  if (action.type === "continue") {
    if (state.phase === "remediation" && node.type === "remediation") return enter(test, state, node.next);
    if (state.phase === "feedback" && node.type === "question") {
      const attempt = state.attempts[state.attempts.length - 1];
      return enter(test, state, attempt.correct ? node.onCorrect : node.onIncorrect);
    }
  }
  return state;
}

export function summarize(test: BranchingTest, state: TestState) {
  const mains = state.attempts.filter((attempt) => attempt.level === "main");
  const mastered = new Set(state.attempts.filter((attempt) => attempt.correct).map((attempt) => attempt.competency));
  const weak = [...new Set(state.attempts.filter((attempt) => !attempt.correct).map((attempt) => attempt.competency))];
  return {
    total: test.mainIds.length,
    mainAnswered: mains.length,
    firstCorrect: mains.filter((attempt) => attempt.correct).length,
    mastered: mastered.size,
    recovered: weak.filter((id) => mastered.has(id)).length,
    additional: state.attempts.length - mains.length,
    remediations: state.history.filter((event) => event.type === "review").length,
    weak,
    unresolved: weak.filter((id) => !mastered.has(id)),
  };
}

// Reject malformed graphs and cycles before they can trap a learner.
export function validateTest(test: BranchingTest): void {
  if (!test.mainIds.length || new Set(test.mainIds).size !== test.mainIds.length) throw Error("Invalid main route");
  const mainCompetencies = new Set<string>();
  test.mainIds.forEach((id) => {
    const node = test.nodes[id];
    if (!node || node.type !== "question" || node.level !== "main" || mainCompetencies.has(node.competency)) throw Error(`Invalid main question: ${id}`);
    mainCompetencies.add(node.competency);
  });
  const visited = new Set<string>();
  const visiting = new Set<string>();
  function visit(id: string) {
    if (id === "end") return;
    if (visiting.has(id)) throw Error(`Cycle at ${id}`);
    if (visited.has(id)) return;
    const node = test.nodes[id];
    if (!node || node.id !== id || !test.competencies[node.competency]) throw Error(`Invalid node: ${id}`);
    visiting.add(id);
    if (node.type === "question") {
      if (node.options.length < 2 || new Set(node.options.map((option) => option.id)).size !== node.options.length || !node.options.some((option) => option.id === node.correctAnswer)) throw Error(`Invalid options: ${id}`);
      visit(node.onCorrect); visit(node.onIncorrect);
    } else visit(node.next);
    visiting.delete(id);
    visited.add(id);
  }
  visit(test.start);
  if (visited.size !== Object.keys(test.nodes).length) throw Error("Unreachable nodes in test");
}
