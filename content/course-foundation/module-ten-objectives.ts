import type { Language } from "../course";
import { getSectionTitle } from "../sections";
import type { ObjectivesLesson } from "../study";

// Module 10: medulla, pons, midbrain and distributed brainstem circuits.
// Cross-checked with Guyton & Hall 13e, ch. 59, printed pp. 751–752
// (Library PDF 718–719); Ganong 23e, ch. 15, printed p. 231
// (PDF 243); Ghai Practical Physiology 8e, printed pp. 279–280
// (PDF 301–302). The Ghai clinical reflex descriptions are not
// instructions for students to stimulate another person's cornea.
type Goal = readonly [title: string, description: string];
type FiveGoals = readonly [Goal, Goal, Goal, Goal, Goal];

const goals: Record<Language, FiveGoals> = {
  RU: [
    ["Локализовать функции отделов ствола мозга",
      "На схеме различить продолговатый мозг, мост и средний мозг; отметить проводящие пути, ядра черепных нервов и распределённые сети. Объяснить, почему нарушение одной функции не локализует поражение в единственном ядре."],
    ["Проследить две рефлекторные дуги черепных нервов",
      "Для зрачкового светового рефлекса проследить сетчатку → II нерв → претектальную область → двусторонние ядра Эдингера—Вестфаля → III нерв → ресничный узел → сфинктер зрачка; для корнеального — V1 (афферент) → стволовые связи → VII (эфферент). Различить прямой и содружественный ответы; не проводить болезненных проб."],
    ["Различить восходящие и нисходящие стволовые влияния",
      "Объяснить вклад восходящих ретикулярных и таламо-корковых связей в поддержание бодрствования, а нисходящих ретикулоспинальных путей — в регуляцию позы и рефлекторной возбудимости; не считать ретикулярную формацию единым центром сознания."],
    ["Объяснить распределённую вегетативную регуляцию",
      "Сопоставить участие продолговатого мозга и моста в дыхательном ритме, сердечно-сосудистых рефлексах и их взаимодействие с хеморецепторами, корой и гипоталамусом; не сводить вдох и выдох к одному изолированному «переключателю»."],
    ["Интерпретировать клинические признаки без чрезмерной локализации",
      "По сочетанию глазодвигательных, бульбарных, чувствительных и двигательных симптомов предложить вероятный уровень поражения ствола и альтернативы; учитывать лекарства, метаболические причины и состояние пациента. Отдельный рефлекс или снижение бодрствования не доказывает диагноз."]
  ],
  EN: [
    ["Localize functions across brainstem levels",
      "On a diagram distinguish medulla, pons and midbrain; identify long tracts, cranial-nerve nuclei and distributed networks. Explain why impairment of one function cannot by itself localize a lesion to a single nucleus."],
    ["Trace two cranial-nerve reflex circuits",
      "For the pupillary light reflex trace retina → CN II → pretectal region → bilateral Edinger–Westphal nuclei → CN III → ciliary ganglion → pupillary sphincter; for the corneal reflex trace V1 afferents → brainstem connections → CN VII efferents. Distinguish direct and consensual responses; do not perform painful tests."],
    ["Distinguish ascending from descending brainstem influences",
      "Explain how ascending reticular and thalamocortical pathways support arousal, whereas descending reticulospinal pathways influence posture and spinal reflex excitability; do not describe the reticular formation as a single center of consciousness."],
    ["Explain distributed autonomic control",
      "Compare medullary and pontine contributions to respiratory rhythm and cardiovascular reflexes, and their interactions with chemoreceptors, cortex and hypothalamus; avoid describing inspiration and expiration as controlled by one isolated switching center."],
    ["Interpret clinical signs without over-localization",
      "Use combinations of ocular motor, bulbar, sensory and motor signs to propose a likely brainstem level and alternative explanations; consider medication, metabolic disturbances and clinical context. One reflex or reduced arousal alone cannot establish a diagnosis."]
  ],
  KZ: [
    ["Ми бағаны бөлімдерінің қызметін оқшаулау",
      "Сызбада сопақша миды, көпірді және ортаңғы миды ажыратып, өткізгіш жолдарды, бассүйек жүйкелерінің ядроларын және таралған нейрондық желілерді көрсету. Бір функцияның бұзылысы зақымды жалғыз ядроға дәл орналастырмайтынын түсіндіру."],
    ["Бассүйек жүйкелерінің екі рефлекс доғасын талдау",
      "Қарашықтың жарық рефлексі үшін торқабық → II жүйке → претекталдық аймақ → екі жақтағы Эдингер—Вестфаль ядролары → III жүйке → кірпікшелі түйін → қарашық сфинктері жолын; қасаң қабық рефлексі үшін V1 афференті → ми бағаны байланыстары → VII эфференті жолын көрсету. Тікелей және келісілген жауапты ажырату; ауырсындыратын сынама жасамау."],
    ["Жоғарылайтын және төмендейтін әсерлерді ажырату",
      "Жоғарылайтын ретикулярлық және таламус-қыртыстық байланыстардың сергектікті сақтаудағы, ал төмендейтін ретикулоспиналдық жолдардың дене қалпы мен жұлын рефлекстерінің қозғыштығын реттеудегі рөлін түсіндіру; ретикулярлық формацияны сананың жалғыз орталығы деп атамау."],
    ["Вегетативтік реттелудің таралған желілерін түсіндіру",
      "Сопақша ми мен көпірдің тыныс ырғағына және жүрек-қантамыр рефлекстеріне қатысуын, олардың хеморецепторлармен, қыртыспен және гипоталамуспен байланысын салыстыру; дем алу мен дем шығаруды жалғыз оқшауланған «ауыстырғыш орталыққа» телімеу."],
    ["Клиникалық белгілерді шектен тыс оқшаулаусыз түсіндіру",
      "Көз қозғалысы, бульбарлық, сезімталдық және қозғалтқыш белгілердің жиынтығы бойынша ми бағаны зақымының ықтимал деңгейін және балама түсіндірмелерді ұсыну; дәрілерді, зат алмасу бұзылыстарын және науқастың жағдайын ескеру. Бір рефлекс немесе сергектіктің төмендеуі диагнозды дәлелдемейді."]
  ]
};

export function createModuleTenObjectives(language: Language): ObjectivesLesson {
  return {
    kind: "objectives",
    title: getSectionTitle("objectives", language),
    introduction: language === "RU" ? "После изучения модуля студент сможет:"
      : language === "EN" ? "After completing this module, the student will be able to:"
      : "Модульді аяқтағаннан кейін студент:",
    outcomes: goals[language].map(([title, description], index) => ({
      id: "module-10-objective-" + (index + 1), title, description,
    })),
    navigation: {
      title: language === "RU" ? "Перейти к изучению модуля"
        : language === "EN" ? "Continue learning" : "Модульді оқуға өту",
      pathwayLabel: language === "RU" ? "Рекомендуемый маршрут"
        : language === "EN" ? "Recommended pathway" : "Ұсынылатын оқу бағыты",
      links: [
        { section: "theory" }, { section: "pretest" }, { section: "interactive" },
        { section: "practice" }, { section: "cases" },
      ],
    },
  };
}
