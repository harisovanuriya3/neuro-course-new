import type { Language } from "../course";
import type { BranchingTest } from "../tests";
import { createModuleSeventeenPretest } from "./module-seventeen-pretest";

export function extendModuleSeventeenFinalTest(language: Language, base: BranchingTest): BranchingTest {
  const questions = createModuleSeventeenPretest(language, base.title, base.moduleTitle).questions;
  const nodes: BranchingTest["nodes"] = { ...base.nodes };
  const competencies = { ...base.competencies };
  const ids = questions.map((question, index) => "memory:main:" + (index + 1));
  questions.forEach((question, index) => {
    const id = ids[index];
    const competency = "memory:competency:" + (index + 1);
    competencies[competency] = { title: question.prompt, theoryTarget: { moduleId: 17, anchor: "mechanism" } };
    nodes[id] = { id, type: "question", level: "main", competency, prompt: question.prompt, options: question.options, correctAnswer: question.correctAnswer, explanation: question.explanation, onCorrect: ids[index + 1] ?? "end", onIncorrect: ids[index + 1] ?? "end" };
  });
  const previous = nodes[base.mainIds[base.mainIds.length - 1]];
  if (previous?.type === "question") {
    nodes[base.mainIds[base.mainIds.length - 1]] = { ...previous, onCorrect: ids[0], onIncorrect: ids[0] };
  }
  return { ...base, nodes, competencies, mainIds: [...base.mainIds, ...ids] };
}
