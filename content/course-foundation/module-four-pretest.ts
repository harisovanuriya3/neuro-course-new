import type { Language } from "../course";
import type { PretestLesson } from "../study";

// Module 4 diagnostic questions: Guyton & Hall 13e, chapter 5,
// PDF pp. 72–74; Ganong 23e, chapter 4, PDF pp. 98–99;
// C. L. Ghai Practical Physiology 8e, experiment 4-7, PDF p. 349.
// These are conceptual questions, not measurements or clinical diagnosis.
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
    introduction: "Два диагностических вопроса о потенциале действия и рефрактерности. Они не оцениваются; после ответа изучите физиологическое объяснение.",
    questions: [
      {
        prompt: "После достижения порога в аксоне начинается быстрая восходящая фаза потенциала действия. Какое изменение мембранной проводимости непосредственно вызывает эту фазу?",
        options: [
          "Ускорение работы Na⁺/K⁺-АТФазы, переносящей Na⁺ наружу.",
          "Быстрое открытие потенциал-зависимых Na⁺-каналов и вход Na⁺ в клетку.",
          "Запаздывающее открытие K⁺-каналов и выход K⁺ из клетки.",
          "Преимущественное открытие Cl⁻-каналов и вход Cl⁻ в клетку.",
        ],
        correctAnswer: "b",
        explanation: "Восходящая фаза обусловлена положительной обратной связью: деполяризация открывает потенциал-зависимые Na⁺-каналы, входящий Na⁺-ток усиливает деполяризацию. Запаздывающий выход K⁺ и инактивация Na⁺-каналов способствуют реполяризации. Na⁺/K⁺-АТФаза поддерживает градиенты на более длительном масштабе времени, но не создаёт быстрый подъём отдельного импульса.",
      },
      {
        prompt: "Сразу после начала потенциала действия второй, даже очень сильный стимул не вызывает нового распространяющегося импульса. Какова основная причина абсолютной рефрактерности?",
        options: [
          "Na⁺/K⁺-АТФаза временно полностью прекращает работу.",
          "Все K⁺-каналы закрываются необратимо.",
          "Внеклеточный Na⁺ полностью исчезает после первого импульса.",
          "Многие потенциал-зависимые Na⁺-каналы инактивированы и ещё не восстановились при реполяризации.",
        ],
        correctAnswer: "d",
        explanation: "В абсолютный рефрактерный период значительная доля Na⁺-каналов находится в инактивированном состоянии и не может повторно открыться. По мере реполяризации каналы восстанавливают доступность; в относительный период более сильный стимул уже может вызвать ответ, чему также препятствует сохраняющаяся K⁺-проводимость.",
      },
    ],
  },
  EN: {
    introduction: "Two ungraded diagnostic questions on action potentials and refractoriness. Read the physiological explanation after each answer.",
    questions: [
      {
        prompt: "After an axon reaches threshold, the rapid rising phase of an action potential begins. Which change in membrane conductance directly produces this phase?",
        options: [
          "Faster Na⁺/K⁺-ATPase activity transporting Na⁺ out of the cell.",
          "Rapid opening of voltage-gated Na⁺ channels and Na⁺ influx.",
          "Delayed opening of K⁺ channels and K⁺ efflux.",
          "Predominant opening of Cl⁻ channels and Cl⁻ influx.",
        ],
        correctAnswer: "b",
        explanation: "The rising phase depends on positive feedback: depolarization opens voltage-gated Na⁺ channels, and inward Na⁺ current causes further depolarization. Delayed K⁺ efflux and Na⁺-channel inactivation contribute to repolarization. The Na⁺/K⁺-ATPase maintains gradients over longer timescales; it does not generate the rapid upstroke of an individual spike.",
      },
      {
        prompt: "Immediately after an action potential begins, a second stimulus fails to evoke another propagated spike even when it is very strong. What primarily causes the absolute refractory period?",
        options: [
          "The Na⁺/K⁺-ATPase temporarily stops working completely.",
          "All K⁺ channels close irreversibly.",
          "Extracellular Na⁺ is entirely depleted by the first spike.",
          "Many voltage-gated Na⁺ channels remain inactivated until they recover during repolarization.",
        ],
        correctAnswer: "d",
        explanation: "During the absolute refractory period, a substantial fraction of Na⁺ channels is inactivated and cannot reopen. Repolarization restores channel availability; during the relative refractory period a stronger stimulus can elicit a spike, although persistent K⁺ conductance also opposes excitation.",
      },
    ],
  },
  KZ: {
    introduction: "Әрекет потенциалы мен рефрактерлік туралы бағаланбайтын екі диагностикалық сұрақ. Әр жауаптан кейін физиологиялық түсіндірмені оқыңыз.",
    questions: [
      {
        prompt: "Аксонда табалдырыққа жеткен соң әрекет потенциалының тез көтерілу фазасы басталады. Бұл фазаны мембрана өткізгіштігінің қандай өзгерісі тікелей туғызады?",
        options: [
          "Na⁺ иондарын жасушадан шығаратын Na⁺/K⁺-АТФазаның жұмысының жылдамдауы.",
          "Кернеуге тәуелді Na⁺ арналарының тез ашылып, Na⁺ иондарының жасушаға енуі.",
          "K⁺ арналарының кешігіп ашылып, K⁺ иондарының жасушадан шығуы.",
          "Cl⁻ арналарының басым ашылып, Cl⁻ иондарының жасушаға енуі.",
        ],
        correctAnswer: "b",
        explanation: "Көтерілу фазасы оң кері байланысқа негізделген: деполяризация кернеуге тәуелді Na⁺ арналарын ашады, ал Na⁺ иондарының ішке ағуы деполяризацияны күшейтеді. K⁺ иондарының кешігіп шығуы және Na⁺ арналарының инактивациясы реполяризацияға қатысады. Na⁺/K⁺-АТФаза иондық градиенттерді ұзақ уақыт бойы сақтайды, бірақ жеке импульстің тез көтерілуін тудырмайды.",
      },
      {
        prompt: "Әрекет потенциалы басталғаннан кейін бірден берілген екінші, тіпті өте күшті тітіркендіргіш те жаңа таралатын импульс туғызбайды. Абсолютті рефрактерлік кезеңнің негізгі себебі қандай?",
        options: [
          "Na⁺/K⁺-АТФаза уақытша толық тоқтайды.",
          "Барлық K⁺ арналары қайтымсыз жабылады.",
          "Алғашқы импульстен кейін жасушадан тыс Na⁺ түгел таусылады.",
          "Кернеуге тәуелді Na⁺ арналарының көбі инактивацияланып, реполяризация кезінде әлі қалпына келмеген.",
        ],
        correctAnswer: "d",
        explanation: "Абсолютті рефрактерлік кезеңде Na⁺ арналарының едәуір бөлігі инактивацияланған күйде болып, қайта ашыла алмайды. Реполяризация барысында арналардың қолжетімділігі қалпына келеді; салыстырмалы рефрактерлік кезеңде күштірек тітіркендіргіш импульс тудыруы мүмкін, бірақ сақталған K⁺ өткізгіштігі де қозуды қиындатады.",
      },
    ],
  },
};

export function createModuleFourPretest(
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
      id: index === 0 ? "module-4-pretest-upstroke" : "module-4-pretest-refractory",
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
