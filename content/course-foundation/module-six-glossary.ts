import type { Language } from "../types";
import type { GlossaryLesson } from "../study";

const definitions: Record<Language, [string, string]> = {
  RU: [
    "Суммация — объединение постсинаптических потенциалов во времени и пространстве; результат зависит от времени, силы и места входов.",
    "Шунтирующее торможение — увеличение проводимости мембраны, которое уменьшает ответ напряжения на возбуждающий ток без обязательной гиперполяризации.",
  ],
  EN: [
    "Summation integrates postsynaptic potentials across time and space; its effect depends on the timing, strength and location of inputs.",
    "Shunting inhibition increases membrane conductance, reducing the voltage response to an excitatory current without necessarily causing hyperpolarization.",
  ],
  KZ: [
    "Суммация — постсинапстық потенциалдардың уақыт пен кеңістікте бірігуі; нәтиже кірістердің уақытына, күшіне және орналасуына тәуелді.",
    "Шунттаушы тежелу — мембраналық өткізгіштіктің артуы; бұл айқын гиперполяризациясыз-ақ қоздырушы токқа кернеу жауабын азайтады.",
  ],
};

export function createModuleSixGlossary(language: Language, base: GlossaryLesson): GlossaryLesson {
  if (base.terms.length < 2) throw new Error("Module 6 glossary requires two terms");
  return {
    ...base,
    terms: base.terms.map((entry, index) =>
      index < 2 ? { ...entry, definition: definitions[language][index] } : entry
    ),
  };
}
