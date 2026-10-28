import type { Language } from "../course";
import { getSectionTitle } from "../sections";
import type { ObjectivesLesson } from "../study";

// Module 14: thalamus and thalamocortical systems.
// Read directly in the user's Library: Guyton & Hall 13e, ch. 48,
// printed pp. 609–613 (PDF pp. 584–588); Ganong 23e, ch. 15,
// printed pp. 229–231 (PDF pp. 241–243); Ghai Practical Physiology 8e,
// Clinical Examination, printed pp. 301–303 (PDF pp. 323–325).
// Outcomes describe circuits and limits of inference, not a diagnostic test.
type Goal = readonly [title: string, description: string];
type FiveGoals = readonly [Goal, Goal, Goal, Goal, Goal];

const goals: Record<Language, FiveGoals> = {
  RU: [
    ["Сопоставить ядра таламуса с их входами и корковыми проекциями",
      "На схеме различить VPL (соматосенсорные сигналы тела), VPM (лица), латеральное коленчатое тело (зрение), медиальное коленчатое тело (слух), VA/VL (двигательные контуры), передние и интраламинарные ядра. Объяснить, почему не все ядра выполняют одну и ту же функцию."],
    ["Объяснить селективную передачу и корково-таламическую обратную связь",
      "Проследить возбуждающие таламокортикальные проекции и обратные кортикоталамические входы; отличить ГАМК-ергическое торможение ретикулярного ядра таламуса от возбуждающего выхода большинства релейных нейронов. Не представлять таламус пассивным переключателем или единственным источником сознания."],
    ["Разграничить сенсорные, моторные и связанные с состоянием функции",
      "Сравнить пути соматосенсорной, зрительной и слуховой информации с таламическими звеньями контуров базальных ганглиев и мозжечка. Отметить, что обоняние достигает первичной обонятельной коры без обязательного первичного таламического переключения, но далее взаимодействует с таламическими сетями; не считать все сигналы одинаковыми."],
    ["Сформулировать проверяемый прогноз без выдуманных измерений",
      "Для одной сенсорной задачи при неизменных интенсивности стимула и условиях ответа сравнить два состояния внимания или сенсорного контекста. Выбрать точность обнаружения либо время реакции, предсказать возможное направление изменения и объяснить, почему поведенческий результат не доказывает активность отдельного таламического ядра."],
    ["Интерпретировать нарушения чувствительности с ограничением локализации",
      "В учебном описании сопоставить изменения осязания, положения сустава и двухточечной дискриминации с периферическим входом, проводящими путями, таламусом и корой. Объяснить, что один результат пробы не локализует поражение и не подтверждает диагноз; при внезапном очаговом дефиците необходима срочная медицинская оценка."]
  ],
  EN: [
    ["Map thalamic nuclei to their inputs and cortical projections",
      "On a diagram distinguish VPL (somatosensory signals from the body), VPM (face), lateral geniculate nucleus (vision), medial geniculate nucleus (hearing), VA/VL (motor loops), anterior and intralaminar nuclei. Explain why these nuclei do not all perform the same function."],
    ["Explain selective relay and corticothalamic feedback",
      "Trace excitatory thalamocortical projections and returning corticothalamic inputs; distinguish GABAergic inhibition from the thalamic reticular nucleus from the excitatory output of most relay neurons. Do not describe the thalamus as a passive switch or the sole source of consciousness."],
    ["Distinguish sensory, motor and state-dependent functions",
      "Compare somatosensory, visual and auditory pathways with thalamic components of basal-ganglia and cerebellar loops. Note that olfaction reaches primary olfactory cortex without an obligatory first thalamic relay but subsequently interacts with thalamic networks; do not treat every signal as equivalent."],
    ["Make a testable prediction without inventing physiological measurements",
      "For one sensory task, hold stimulus intensity and response demands constant while comparing two attentional states or sensory contexts. Choose detection accuracy or reaction time, predict a possible direction of change and explain why behavior alone does not establish activity in a particular thalamic nucleus."],
    ["Interpret sensory findings within limits of lesion localization",
      "In a teaching vignette compare changes in touch, joint-position sense and two-point discrimination with peripheral input, ascending pathways, thalamus and cortex. Explain why a single test cannot localize a lesion or confirm a diagnosis; sudden focal deficits require urgent medical assessment."]
  ],
  KZ: [
    ["Таламус ядроларын кірістерімен және қыртыстық проекцияларымен сәйкестендіру",
      "Сызбада VPL (денеден келетін соматосенсорлық сигналдар), VPM (беттен келетін сигналдар), латералды тізелі денені (көру), медиалды тізелі денені (есту), VA/VL (қозғалыс контурлары), алдыңғы және интраламинарлық ядроларды ажырату. Барлық ядролар бірдей қызмет атқармайтынын түсіндіру."],
    ["Таңдамалы өткізуді және қыртыс-таламус кері байланысын түсіндіру",
      "Қоздырушы таламокортикалық проекциялар мен қыртыстан таламусқа қайтатын кірістерді көрсету; таламустың ретикулярлық ядросының ГАМҚ-ергиялық тежелуін релейлік нейрондардың көпшілігінің қоздырушы шығысынан ажырату. Таламусты енжар ауыстырғыш немесе сананың жалғыз көзі деп сипаттамау."],
    ["Сенсорлық, моторлық және күйге тәуелді қызметтерді ажырату",
      "Соматосенсорлық, көру және есту жолдарын базальды ганглийлер мен мишық контурларының таламустық буындарымен салыстыру. Иіс сезу ақпараты алғашқы иіс сезу қыртысына міндетті бастапқы таламустық ауысусыз жететінін, бірақ кейін таламустық желілермен байланысатынын ескеру; барлық сигналды бірдей деп қарастырмау."],
    ["Физиологиялық өлшемдерді ойдан қоспай тексерілетін болжам жасау",
      "Бір сенсорлық тапсырмада стимул қарқындылығы мен жауап талаптарын тұрақты ұстап, зейіннің екі күйін немесе сенсорлық контексті салыстыру. Анықтау дәлдігін не реакция уақытын таңдап, ықтимал өзгеріс бағытын болжау; мінез-құлық нәтижесі жеке таламус ядросының белсенділігін дәлелдемейтінін түсіндіру."],
    ["Сезімталдық бұзылысын ошақты анықтау шегін ескеріп түсіндіру",
      "Оқу жағдайында жанасу, буын қалпын сезіну және екі нүктені ажырату өзгерістерін шеткі кіріс, жоғарылаушы жолдар, таламус және қыртыспен салыстыру. Бір сынама зақым ошағын дәл анықтамайтынын және диагнозды растамайтынын түсіндіру; кенеттен пайда болған ошақты тапшылық шұғыл медициналық бағалауды қажет етеді."]
  ]
};

export function createModuleFourteenObjectives(language: Language): ObjectivesLesson {
  return {
    kind: "objectives",
    title: getSectionTitle("objectives", language),
    introduction: language === "RU" ? "После изучения модуля студент сможет:"
      : language === "EN" ? "After completing this module, the student will be able to:"
      : "Модульді аяқтағаннан кейін студент:",
    outcomes: goals[language].map(([title, description], index) => ({
      id: "module-14-objective-" + (index + 1), title, description,
    })),
    navigation: {
      title: language === "RU" ? "Перейти к изучению модуля"
        : language === "EN" ? "Continue learning" : "Модульді оқуға өту",
      pathwayLabel: language === "RU" ? "Рекомендуемый маршрут"
        : language === "EN" ? "Recommended pathway" : "Ұсынылатын оқу бағыты",
      links: [
        { section: "pretest" }, { section: "theory" }, { section: "interactive" },
        { section: "practice" }, { section: "cases" },
      ],
    },
  };
}
