import type { Language } from '../course';
import type { CasesLesson } from '../cases';

// Targeted correction to module 3's authored scenarios. The shared case
// generator compares glossary terms ("neuron" → "myelin") even when the
// scenario concerns astrocytic glutamate uptake, a different mechanism.
// Keep the staged cases and feedback, but ask questions grounded in data.
// Scientific basis: Ganong 23e, chapter 4 (astrocytes and neural signaling);
// Guyton & Hall 13e, chapter 5 (saltatory conduction).
const prompts: Record<Language, { myelin: string; uptake: string }> = {
  RU: {
    myelin: 'Почему анатомическая сохранность аксона не гарантирует нормальное проведение при утрате миелина? Укажите роль межузловой утечки тока.',
    uptake: 'Если пресинаптическое выделение не изменилось, как снижение захвата глутамата астроцитами повлияет на спад его внеклеточной концентрации после стимула?',
  },
  EN: {
    myelin: 'Why can propagation fail despite an anatomically intact axon after myelin loss? Explain internodal current leakage.',
    uptake: 'With presynaptic release unchanged, how does reduced astrocytic glutamate uptake affect the decay of extracellular glutamate after a stimulus?',
  },
  KZ: {
    myelin: 'Миелин жоғалғанда аксон анатомиялық бүтін болса да өткізу неге бұзылуы мүмкін? Түйінаралық токтың ағып кету рөлін түсіндіріңіз.',
    uptake: 'Пресинапстық бөліну өзгермесе, астроциттердің глутаматты сіңіруі азайғанда стимулдан кейін жасушадан тыс глутамат концентрациясының төмендеуі қалай өзгереді?',
  },
};

export function createModuleThreeCases(language: Language, base: CasesLesson): CasesLesson {
  if (base.cases.length !== 2 ||
      base.cases[0].id !== 'm3-localization' ||
      base.cases[1].id !== 'm3-discrimination' ||
      base.cases[0].stages[0]?.questions.length !== 2 ||
      base.cases[1].stages[0]?.questions.length !== 1) {
    throw new Error('Module 3 case structure changed: review authored questions');
  }
  const p = prompts[language];
  return {
    ...base,
    cases: base.cases.map((entry, index) => ({
      ...entry,
      stages: entry.stages.map((stage, stageIndex) => ({
        ...stage,
        questions: stage.questions.map((question, questionIndex) => {
          if (index === 0 && stageIndex === 0 && questionIndex === 1) return p.myelin;
          if (index === 1 && stageIndex === 0 && questionIndex === 0) return p.uptake;
          return question;
        }),
      })),
    })),
  };
}
