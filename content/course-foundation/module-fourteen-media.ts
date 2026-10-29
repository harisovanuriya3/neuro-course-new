import type { Language } from "../course";
import type { MediaLesson } from "../media";

// Evidence reviewed against Library: Guyton & Hall 13e PDF 584–586,
// Ganong 23e PDF 241–243, C. L. Ghai 8e PDF 323–325.
// Original qualitative teaching material; not a recording, timed neural
// simulation, clinical localization test, or claim that every relay is obligatory.
type Copy = {
  title: string; introduction: string; preview: string;
  transcript: [string, string, string, string, string];
  prompt: string; explanation: string;
  options: [string, string, string, string];
  feedback: [string, string, string, string];
};
const copy: Record<Language, Copy> = {
  RU: {
    title: "Таламические реле: путь сигнала и тормозная регуляция",
    introduction: "Выберите сенсорный путь и проследите его основные переключения. Схема показывает типичные связи, а не измеренные потенциалы, точное время передачи или локализацию поражения у пациента.",
    preview: "Сравните телесную и лицевую чувствительность, зрение и слух. Затем включите тормозный контур ретикулярного ядра. До переключения предскажите ядро таламуса и корковую мишень.",
    transcript: [
      "Тонкое осязание и проприоцепция от тела поднимаются по задним канатикам, переключаются в ядрах продолговатого мозга, перекрещиваются и идут по медиальной петле преимущественно к VPL, затем к соматосенсорной коре.",
      "Болевые и температурные сигналы от тела обычно переключаются в заднем роге и перекрещиваются в спинном мозге. Переднебоковая система имеет несколько таламических и стволовых мишеней; её нельзя сводить только к VPL.",
      "Чувствительность лица передаётся по тройничным путям преимущественно к VPM, а затем к соматосенсорной коре. Уровень перекрёста зависит от конкретного пути и модальности.",
      "Зрительная информация переключается в латеральном коленчатом теле, слуховая — в медиальном коленчатом теле. Обоняние достигает первичной обонятельной коры без обязательного первого переключения в таламусе, хотя позднее таламические связи участвуют в обработке.",
      "Большинство таламокортикальных релейных нейронов возбуждающие, преимущественно глутаматергические. Нейроны ретикулярного ядра таламуса преимущественно ГАМК-ергические и тормозят другие таламические ядра; схема не предсказывает частоту разрядов или субъективное восприятие."
    ],
    prompt: "Какой вывод корректен для показанных таламических путей?",
    explanation: "VPL преимущественно передаёт соматосенсорную информацию от тела, VPM — от лица, латеральное коленчатое тело — зрительную, медиальное — слуховую. Ретикулярное ядро оказывает ГАМК-ергическое тормозное влияние. Для обоняния нет обязательного первого таламического реле.",
    options: [
      "VPL является главным таламическим реле слуха, а медиальное коленчатое тело передаёт чувствительность лица.",
      "VPL связан преимущественно с телом, VPM — с лицом, а ретикулярное ядро тормозит таламические реле.",
      "Все обонятельные сигналы обязаны сначала пройти через VPL до первичной обонятельной коры.",
      "Ретикулярное ядро таламуса посылает основные возбуждающие глутаматергические аксоны прямо в первичную соматосенсорную кору."
    ],
    feedback: [
      "Слуховое реле — медиальное коленчатое тело; VPL связан прежде всего с чувствительностью тела.",
      "Верно: названы два соматосенсорных реле и тормозный таламический контур.",
      "Первичная обонятельная кора получает сигналы без обязательного первого таламического переключения.",
      "Ретикулярное ядро преимущественно ГАМК-ергическое и регулирует другие таламические ядра, а не даёт обычную возбуждающую проекцию в кору."
    ]
  },
  EN: {
    title: "Thalamic relays: signal routes and inhibitory control",
    introduction: "Select a sensory pathway and trace its principal relays. The diagram shows typical connections, not measured potentials, precise transmission times or a patient-specific lesion location.",
    preview: "Compare body and facial sensation, vision and hearing, then inspect inhibition from the thalamic reticular nucleus. Predict the thalamic nucleus and cortical target before changing the route.",
    transcript: [
      "Fine touch and proprioception from the body ascend in the dorsal columns, synapse in medullary nuclei, decussate and travel in the medial lemniscus mainly to VPL, then to somatosensory cortex.",
      "Pain and temperature from the body generally synapse in the dorsal horn and cross in the spinal cord. The anterolateral system reaches several thalamic and brainstem targets; it should not be reduced to VPL alone.",
      "Facial sensation travels in trigeminal pathways mainly to VPM and then to somatosensory cortex. The level of crossing depends on the specific pathway and modality.",
      "Visual information relays through the lateral geniculate nucleus and auditory information through the medial geniculate nucleus. Olfaction reaches primary olfactory cortex without an obligatory initial thalamic relay, although later processing involves thalamic connections.",
      "Most thalamocortical relay neurons are excitatory, mainly glutamatergic. Thalamic reticular neurons are predominantly GABAergic and inhibit other thalamic nuclei; the diagram does not predict firing rates or subjective perception."
    ],
    prompt: "Which conclusion is supported by the pathways shown?",
    explanation: "VPL mainly relays body somatosensation, VPM facial somatosensation, the lateral geniculate nucleus vision, and the medial geniculate nucleus hearing. The reticular nucleus provides GABAergic inhibition. Olfaction lacks an obligatory initial thalamic relay.",
    options: [
      "VPL is the principal auditory relay, whereas the medial geniculate nucleus relays facial touch.",
      "VPL mainly handles body sensation, VPM facial sensation, and the reticular nucleus inhibits thalamic relays.",
      "All olfactory signals must first pass through VPL before reaching primary olfactory cortex.",
      "The reticular nucleus sends the principal excitatory glutamatergic axons directly to primary somatosensory cortex."
    ],
    feedback: [
      "The medial geniculate nucleus relays hearing; VPL mainly relays body somatosensation.",
      "Correct: the body and facial relays and the inhibitory thalamic circuit are distinguished.",
      "Primary olfactory cortex receives input without an obligatory initial thalamic relay.",
      "The reticular nucleus is predominantly GABAergic and regulates thalamic nuclei rather than supplying a conventional excitatory cortical projection."
    ]
  },
  KZ: {
    title: "Таламустық реле: сигнал жолдары және тежелу арқылы реттелу",
    introduction: "Сезімталдық жолын таңдап, оның негізгі ауысу орындарын бақылаңыз. Сызба типтік байланыстарды көрсетеді; ол өлшенген потенциалдарды, берілу уақытын немесе науқастағы зақым орнын анықтамайды.",
    preview: "Дене мен бет сезімталдығын, көру мен естуді салыстырыңыз. Содан кейін таламустың ретикулярлық ядросының тежегіш әсерін қараңыз. Жолды ауыстырмас бұрын ядро мен қыртыстық нысананы болжаңыз.",
    transcript: [
      "Денеден келетін нәзік жанасу мен проприоцепция сигналдары артқы бағандармен көтеріліп, сопақша ми ядроларында ауысады, айқасып, медиалдық ілмек арқылы негізінен VPL-ге, одан соматосенсорлық қыртысқа жетеді.",
      "Денеден келетін ауырсыну және температура сигналдары әдетте жұлынның артқы мүйізінде ауысып, жұлында айқасады. Алдыңғы-бүйірлік жүйенің таламус пен ми бағанында бірнеше нысанасы бар; оны тек VPL-мен шектеуге болмайды.",
      "Бет сезімталдығы үшкіл жүйке жолдарымен негізінен VPM-ге, одан соматосенсорлық қыртысқа барады. Айқасу деңгейі нақты жол мен сезімталдық түріне тәуелді.",
      "Көру сигналы латералдық тізелі денеде, есту сигналы медиалдық тізелі денеде ауысады. Иіс сезу сигналы бастапқы иіс сезу қыртысына таламуста міндетті алғашқы ауысусыз жетеді, бірақ кейінгі өңдеуге таламустық байланыстар қатысады.",
      "Таламус пен қыртысты байланыстыратын релейлік нейрондардың көбі қоздырушы, негізінен глутаматергиялық. Ретикулярлық ядро нейрондары көбіне ГАМҚ-ергиялық және басқа таламустық ядроларды тежейді; сызба импульс жиілігін немесе субъективті қабылдауды есептемейді."
    ],
    prompt: "Көрсетілген таламустық жолдарға қай қорытынды сәйкес келеді?",
    explanation: "VPL негізінен дененің, VPM беттің соматосенсорлық ақпаратын өткізеді; латералдық тізелі дене көруге, медиалдық тізелі дене естуге қатысады. Ретикулярлық ядро ГАМҚ-ергиялық тежелу тудырады. Иіс сезуде таламустың міндетті алғашқы релесі жоқ.",
    options: [
      "VPL естудің негізгі релесі, ал медиалдық тізелі дене бет жанасуын өткізеді.",
      "VPL көбіне дене, VPM бет сезімталдығын өткізеді, ал ретикулярлық ядро таламустық релені тежейді.",
      "Барлық иіс сигналдары бастапқы иіс сезу қыртысына жетпес бұрын міндетті түрде VPL арқылы өтеді.",
      "Ретикулярлық ядро бастапқы соматосенсорлық қыртысқа тікелей негізгі қоздырушы глутаматергиялық аксондарды жібереді."
    ],
    feedback: [
      "Есту сигналдары медиалдық тізелі дене арқылы, ал дене сезімталдығы негізінен VPL арқылы өтеді.",
      "Дұрыс: дене мен беттің релелері және таламустың тежеуші тізбегі ажыратылған.",
      "Бастапқы иіс сезу қыртысы сигналды таламустың міндетті алғашқы релесінсіз қабылдайды.",
      "Ретикулярлық ядро негізінен ГАМҚ-ергиялық; ол қыртысқа негізгі қоздырушы проекция жібермей, басқа таламустық ядроларды реттейді."
    ]
  }
};

export function createModuleFourteenMedia(language: Language, base: MediaLesson): MediaLesson {
  if (base.kind !== "media" || base.blocks.length !== 1) {
    throw new Error("Module 14 media base structure changed");
  }
  const c = copy[language];
  const block = base.blocks[0];
  const options = (["a", "b", "c", "d"] as const).map((id, index) => ({
    id, text: c.options[index], feedback: c.feedback[index]
  }));
  const offset = language === "RU" ? 0 : language === "EN" ? 1 : 2;
  return {
    ...base,
    introduction: c.introduction,
    blocks: [{
      ...block,
      id: "module-14-thalamic-relays",
      title: c.title,
      preview: c.preview,
      transcript: c.transcript,
      theoryAnchor: "thalamic-nuclear-map",
      animation: "foundation",
      question: {
        prompt: c.prompt,
        correctAnswer: "b",
        explanation: c.explanation,
        options: [...options.slice(offset), ...options.slice(0, offset)]
      }
    }]
  };
}
