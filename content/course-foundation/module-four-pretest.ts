import type { Language } from "../course";
import type { PretestLesson } from "../study";

// Module 4 diagnostic questions: Guyton & Hall 13e, chapter 5,
// PDF pp. 68–74; Ganong 23e, chapter 4, PDF pp. 95–99;
// C. L. Ghai Practical Physiology 8e, chart 5-5, PDF pp. 379–381.
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
        prompt: "На пике потенциала действия и в начале реполяризации даже очень сильный повторный стимул не вызывает нового распространяющегося импульса. Какова основная причина абсолютной рефрактерности?",
        options: [
          "Продолжающийся выход K⁺ вызывает следовую гиперполяризацию, хотя Na⁺-каналы уже восстановили доступность.",
          "Na⁺/K⁺-АТФаза не успевает восстановить якобы большие потери Na⁺ и K⁺ после первого импульса.",
          "Порог возбуждения повышается, хотя все потенциал-зависимые Na⁺-каналы остаются доступными для открытия.",
          "Многие потенциал-зависимые Na⁺-каналы инактивированы и ещё не восстановились при реполяризации.",
        ],
        correctAnswer: "d",
        explanation: "В абсолютный рефрактерный период достаточная доля потенциал-зависимых Na⁺-каналов инактивирована, поэтому новый распространяющийся импульс невозможен даже при сильном стимуле. По мере реполяризации Na⁺-каналы восстанавливают доступность; в относительный период более сильный стимул уже может вызвать ответ, хотя сохраняющаяся K⁺-проводимость этому препятствует. Следовая гиперполяризация и повышение порога сами по себе не объясняют абсолютную рефрактерность, а перемещение ионов при одном импульсе слишком мало для истощения градиентов.",
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
        prompt: "At the peak of an action potential and during early repolarization, even a very strong second stimulus fails to evoke another propagated spike. What primarily causes this absolute refractoriness?",
        options: [
          "Continued K⁺ efflux produces after-hyperpolarization even though Na⁺ channels have already recovered their availability.",
          "The Na⁺/K⁺-ATPase cannot restore supposedly large Na⁺ and K⁺ losses after the first spike.",
          "The excitation threshold rises even though all voltage-gated Na⁺ channels remain available to open.",
          "Many voltage-gated Na⁺ channels remain inactivated until they recover during repolarization.",
        ],
        correctAnswer: "d",
        explanation: "During the absolute refractory period, enough voltage-gated Na⁺ channels are inactivated to prevent another propagated spike, even with a strong stimulus. Repolarization restores channel availability; in the relative refractory period a stronger stimulus can evoke a spike despite persistent K⁺ conductance. After-hyperpolarization and a raised threshold alone do not explain absolute refractoriness, and the ion movements in a single spike are too small to deplete the gradients.",
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
        prompt: "Әрекет потенциалының шыңында және реполяризацияның бастапқы кезеңінде екінші, тіпті өте күшті тітіркендіргіш те жаңа таралатын импульс туғызбайды. Осы абсолютті рефрактерліктің негізгі себебі қандай?",
        options: [
          "Na⁺ арналары қайта ашылуға дайын болса да, K⁺ иондарының сыртқа ағуы жалғасып, кейінгі гиперполяризация туғызады.",
          "Бірінші импульстен кейін Na⁺/K⁺-АТФаза Na⁺ пен K⁺ иондарының шамадан тыс көп жоғалуын қалпына келтіріп үлгермейді.",
          "Барлық кернеуге тәуелді Na⁺ арналары ашылуға дайын болғанымен, қозу табалдырығы жоғарылайды.",
          "Кернеуге тәуелді Na⁺ арналарының көбі инактивацияланып, реполяризация кезінде әлі қалпына келмеген.",
        ],
        correctAnswer: "d",
        explanation: "Абсолютті рефрактерлік кезеңде кернеуге тәуелді Na⁺ арналарының жеткілікті бөлігі инактивацияланғандықтан, тіпті күшті тітіркендіргіш те жаңа таралатын импульс туғыза алмайды. Реполяризация кезінде Na⁺ арналарының қолжетімділігі қалпына келеді; салыстырмалы кезеңде K⁺ өткізгіштігі әлі жоғары болса да, күштірек тітіркендіргіш жауап тудыруы мүмкін. Кейінгі гиперполяризация мен табалдырықтың жоғарылауы өздігінен абсолютті рефрактерлікті түсіндірмейді; бір импульс кезіндегі иондардың орын ауыстыруы градиенттерді тауысып жіберуге тым аз.",
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
