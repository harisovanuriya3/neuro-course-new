import type { Language } from "../course";
import type { PretestLesson } from "../study";

// Module 3 diagnostic items: assess neural-glial mechanisms rather than
// recognition of a long theory paragraph. Source checks:
// Ganong, Review of Medical Physiology, 23e, chapter 4 (PDF p. 92);
// Guyton & Hall, Textbook of Medical Physiology, 13e, chapter 5 (PDF p. 79).
type DiagnosticItem = {
  prompt: string;
  options: [string, string, string, string];
  correctAnswer: "a" | "b" | "c" | "d";
  explanation: string;
};
type Locale = {
  introduction: string;
  questions: [DiagnosticItem, DiagnosticItem];
};
const localized: Record<Language, Locale> = {
  RU: {
    introduction: "Два диагностических вопроса по нейроглии и проведению импульса. Они не оцениваются и помогают определить, что повторить.",
    questions: [
      {
        prompt: "Вокруг активно работающих нейронов кратковременно повышается внеклеточная концентрация K⁺. Какая функция глии наиболее непосредственно помогает ограничить это повышение?",
        options: [
          "Олигодендроциты формируют миелин аксонов ЦНС.",
          "Микроглия удаляет клеточный детрит.",
          "Астроциты захватывают и перераспределяют внеклеточный K⁺.",
          "Шванновские клетки миелинизируют аксоны ПНС.",
        ],
        correctAnswer: "c",
        explanation: "Астроциты участвуют в поглощении и пространственном перераспределении K⁺, помогая поддерживать внеклеточную ионную среду. Остальные варианты описывают реальные, но другие функции глии.",
      },
      {
        prompt: "После очаговой демиелинизации аксон остаётся непрерывным, но проведение замедляется. Какое изменение свойств межузловой мембраны лучше всего объясняет это?",
        options: [
          "Уменьшение ёмкости мембраны и утечки тока.",
          "Увеличение ёмкости мембраны и утечки тока.",
          "Увеличение числа синаптических везикул в терминали.",
          "Увеличение числа дендритных шипиков нейрона.",
        ],
        correctAnswer: "b",
        explanation: "Потеря миелина увеличивает ёмкость и утечку тока через межузловую мембрану. Меньше продольного тока достигает следующего узла Ранвье, поэтому проведение замедляется, а в тяжёлых случаях может блокироваться; это не означает обязательного разрыва аксона.",
      },
    ],
  },
  EN: {
    introduction: "Two ungraded diagnostic questions on glial function and impulse conduction. Use the feedback to decide what to review.",
    questions: [
      {
        prompt: "During neuronal activity, extracellular K⁺ rises transiently. Which glial function most directly helps limit this rise?",
        options: [
          "Oligodendrocytes form myelin around CNS axons.",
          "Microglia remove cellular debris.",
          "Astrocytes take up and redistribute extracellular K⁺.",
          "Schwann cells myelinate PNS axons.",
        ],
        correctAnswer: "c",
        explanation: "Astrocytic K⁺ uptake and redistribution help stabilize the extracellular ionic environment. The other options describe genuine but different glial functions.",
      },
      {
        prompt: "After focal demyelination, an axon remains continuous but conduction slows. Which change in the internodal membrane best explains this?",
        options: [
          "Reduced membrane capacitance and less current leakage.",
          "Increased membrane capacitance and more current leakage.",
          "An increased number of synaptic vesicles at the terminal.",
          "An increased number of dendritic spines on the neuron.",
        ],
        correctAnswer: "b",
        explanation: "Loss of myelin increases internodal capacitance and current leakage. Less longitudinal current reaches the next node of Ranvier, slowing conduction and sometimes causing block; axonal transection is not required.",
      },
    ],
  },
  KZ: {
    introduction: "Нейроглия қызметі мен импульс өткізу туралы бағаланбайтын екі диагностикалық сұрақ. Түсіндірмелер нені қайталау керегін анықтауға көмектеседі.",
    questions: [
      {
        prompt: "Нейрондар белсенді жұмыс істегенде жасушадан тыс K⁺ концентрациясы уақытша жоғарылайды. Бұл өсуді шектеуге глияның қай қызметі тікелей көмектеседі?",
        options: [
          "Олигодендроциттер ОЖЖ аксондарының миелинін түзеді.",
          "Микроглия жасушалық қалдықтарды жояды.",
          "Астроциттер жасушадан тыс K⁺ иондарын сіңіріп, қайта таратады.",
          "Шванн жасушалары ШЖЖ аксондарының миелинін түзеді.",
        ],
        correctAnswer: "c",
        explanation: "Астроциттер K⁺ иондарын сіңіріп, кеңістікте қайта тарату арқылы жасушадан тыс иондық ортаның тұрақтылығын сақтауға көмектеседі. Қалған нұсқалар глияның шынайы, бірақ басқа қызметтерін сипаттайды.",
      },
      {
        prompt: "Ошақты демиелинизациядан кейін аксон бүтін қалғанымен, импульс өткізу баяулайды. Түйінаралық мембрананың қай өзгерісі мұны жақсы түсіндіреді?",
        options: [
          "Мембрана сыйымдылығы мен токтың ағып кетуінің азаюы.",
          "Мембрана сыйымдылығы мен токтың ағып кетуінің артуы.",
          "Аксон ұшындағы синапстық көпіршіктер санының артуы.",
          "Нейрон дендриттеріндегі өсінділер санының артуы.",
        ],
        correctAnswer: "b",
        explanation: "Миелин жоғалғанда түйінаралық мембрананың сыйымдылығы мен токтың ағып кетуі артады. Келесі Ранвье түйініне жететін бойлық ток азайып, өткізу баяулайды, ал ауыр жағдайда бөгелуі мүмкін; аксон міндетті түрде үзілмейді.",
      },
    ],
  },
};

export function createModuleThreePretest(
  language: Language,
  moduleTitle: string,
  title: string,
): PretestLesson {
  const copy = localized[language];
  return {
    kind: "pretest",
    title,
    introduction: copy.introduction,
    questions: copy.questions.map((question, index) => ({
      id: index === 0 ? "module-3-pretest" : "module-3-pretest-transfer",
      topic: moduleTitle,
      prompt: question.prompt,
      options: question.options.map((option, optionIndex) => ({
        id: ["a", "b", "c", "d"][optionIndex],
        text: option,
      })),
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
      target: { section: "theory" as const },
    })),
  };
}
