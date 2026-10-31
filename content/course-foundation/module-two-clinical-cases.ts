import type {Language} from "../course";
const cases=[
  [
    "alpha-reactivity",
    "Реактивность альфа-ритма",
    "Alpha rhythm reactivity",
    "Альфа ырғақтың реактивтілігі",
    "У бодрствующего взрослого с закрытыми глазами в затылочных отведениях виден ритм 10 Гц, который ослабевает при открытии глаз. Что измерено и почему это не диагноз?",
    "An awake adult shows a 10-Hz occipital rhythm with eyes closed that attenuates when eyes open. What is measured and why is this not a diagnosis?",
    "Ояу ересек адамның көзі жабық кезде шүйде аймағында 10 Гц ырғақ байқалады, көз ашқанда әлсірейді. Не өлшенді және бұл неге диагноз емес?",
    "Это типичная реактивность заднего доминирующего альфа-ритма. Оценивают состояние бодрствования, артефакты и воспроизводимость; одна реакция не устанавливает болезнь.",
    "This is typical posterior dominant alpha reactivity. Arousal state, artifacts and reproducibility matter; this finding alone does not establish disease.",
    "Бұл артқы басым альфа ырғақтың қалыпты реактивтілігі болуы мүмкін. Сергектік күйін, артефакт пен қайталануды бағалайды; бір белгі ауруды дәлелдемейді."
  ],
  [
    "muscle-artifact",
    "ЭМГ-артефакт на ЭЭГ",
    "EMG contamination of EEG",
    "ЭЭГ-дегі ЭМГ артефактісі",
    "При напряжении жевательных мышц в височных каналах ЭЭГ появляются быстрые колебания. После расслабления они исчезают. Как проверить источник?",
    "Fast activity appears in temporal EEG channels during jaw clenching and disappears with relaxation. How can its origin be checked?",
    "Жақ бұлшықеттерін қысқанда самай ЭЭГ арналарында жылдам белсенділік пайда болып, босаңсығанда жоғалады. Көзін қалай тексереміз?",
    "Временная связь с сокращением и дополнительная ЭМГ поддерживают мышечное происхождение. Нельзя объявлять такую активность корковой без контроля.",
    "Temporal correlation with contraction and an EMG channel support muscle origin. Cortical interpretation requires controls.",
    "Жиырылумен уақыттық байланыс және қосымша ЭМГ бұлшықеттік көзді қолдайды. Бақылаусыз оны қыртыстық белсенділік деуге болмайды."
  ],
  [
    "reference-change",
    "Смена референтного электрода",
    "Changing the EEG reference",
    "ЭЭГ референтін өзгерту",
    "Один и тот же отрезок ЭЭГ выглядит иначе в двух монтажах. Исследователь утверждает, что мозговая активность изменилась. Верно ли это?",
    "The same EEG segment looks different under two reference montages. A researcher concludes that brain activity changed. Is that justified?",
    "Бір ЭЭГ үзіндісі екі референттік монтажда әртүрлі көрінеді. Зерттеуші ми белсенділігі өзгерді дейді. Бұл негізді ме?",
    "Нет. Разность потенциалов зависит от выбранной референции; сравнивают исходные данные, топографию и монтаж, прежде чем заключать об изменении источника.",
    "No. Voltage differences depend on reference selection; inspect the original data, topography and montage before inferring a source change.",
    "Жоқ. Потенциалдар айырмасы референтке тәуелді; көз өзгерді деуден бұрын бастапқы дерек пен монтажды салыстыру қажет."
  ],
  [
    "filter-distortion",
    "Фильтрация и искажение пика",
    "Filtering and peak distortion",
    "Сүзгілеу және шыңның бұрмалануы",
    "После агрессивной фильтрации амплитуда и латентность вызванного потенциала изменились. Можно ли напрямую сравнивать результат с записью до фильтрации?",
    "Aggressive filtering changes an evoked potential's amplitude and apparent latency. Can the result be directly compared with the unfiltered trace?",
    "Қатаң сүзгілеуден кейін шақырылған потенциалдың амплитудасы мен көрінетін латенттілігі өзгерді. Бұрынғы жазбамен тікелей салыстыруға бола ма?",
    "Фильтры могут менять форму и фазу сигнала. Нужно документировать частотные границы и тип фильтра и сравнивать записи при одинаковой обработке.",
    "Filters can alter waveform and phase. Record filter settings and compare signals processed consistently.",
    "Сүзгілер толқын пішіні мен фазасын өзгерте алады. Параметрлерді тіркеп, бірдей өңделген жазбаларды салыстыру қажет."
  ],
  [
    "trial-number",
    "Число проб и случайный шум",
    "Trial count and random noise",
    "Сынақ саны және кездейсоқ шу",
    "В двух сериях усредняют 25 и 100 независимых эпох с одинаковым ответом и случайным шумом. Как изменится ожидаемое отношение сигнал/шум в идеальной модели?",
    "Two averages use 25 and 100 independent epochs with identical responses and random noise. What is the expected idealized signal-to-noise improvement?",
    "Бірдей жауап пен кездейсоқ шу бар 25 және 100 тәуелсіз дәуір орташаланады. Идеал модельде сигнал/шу қатынасы қалай өзгереді?",
    "При независимом шуме улучшение пропорционально квадратному корню числа проб: переход 25→100 даёт примерно двукратное улучшение, но не устраняет синхронные артефакты.",
    "With independent noise, improvement scales with the square root of trial count: 25 to 100 yields approximately a twofold improvement, not removal of time-locked artifacts.",
    "Тәуелсіз шу кезінде жақсару сынақ санының квадрат түбіріне тәуелді: 25-тен 100-ге өту шамамен екі есе жақсартады, синхронды артефакт жойылмайды."
  ],
  [
    "eeg-vs-mri",
    "ЭЭГ и МРТ при очаговых симптомах",
    "EEG versus MRI for focal symptoms",
    "Ошақты белгілердегі ЭЭГ және МРТ",
    "У пациента внезапно возникла слабость правой руки и нарушение речи. Студент предлагает сначала учебную ЭЭГ вместо срочной оценки. В чём ошибка выбора метода?",
    "A patient suddenly develops right arm weakness and speech disturbance. A student suggests a teaching EEG before urgent assessment. What is wrong with this choice?",
    "Науқаста оң қол әлсіздігі мен сөйлеу бұзылысы кенет пайда болды. Студент шұғыл бағалаудың орнына оқу ЭЭГ-сін ұсынады. Қате неде?",
    "Внезапный очаговый дефицит требует неотложной оценки возможного инсульта и соответствующей нейровизуализации. ЭЭГ не заменяет эту диагностическую последовательность.",
    "Sudden focal deficit requires emergency stroke assessment and appropriate neuroimaging. EEG does not replace that pathway.",
    "Кенет ошақты тапшылық инсультке шұғыл бағалау мен тиісті нейровизуализацияны талап етеді. ЭЭГ оны алмастырмайды."
  ],
  [
    "normal-interictal",
    "Нормальная ЭЭГ между приступами",
    "Normal interictal EEG",
    "Ұстамалар арасындағы қалыпты ЭЭГ",
    "У пациента были повторные эпизоды потери контакта с окружающими. Межприступная ЭЭГ нормальна. Исключает ли это эпилепсию?",
    "A patient has recurrent episodes of impaired awareness, but the interictal EEG is normal. Does this exclude epilepsy?",
    "Науқаста сананың бұзылу эпизодтары қайталанады, ал ұстамалар арасындағы ЭЭГ қалыпты. Бұл эпилепсияны жоққа шығара ма?",
    "Нет. Межприступные эпилептиформные разряды могут отсутствовать в короткой записи. Диагноз требует анамнеза, описания событий и клинически обоснованного обследования.",
    "No. Epileptiform discharges may be absent in a brief interictal recording. Diagnosis relies on history, event characterization and appropriate evaluation.",
    "Жоқ. Қысқа ұстамалар арасындағы жазбада эпилептиформдық разряд болмауы мүмкін. Диагноз анамнез бен тиісті тексеруге сүйенеді."
  ],
  [
    "emg-vs-force",
    "ЭМГ не равна мышечной силе",
    "EMG is not muscle force",
    "ЭМГ бұлшықет күші емес",
    "Во время произвольного сокращения амплитуда поверхностной ЭМГ увеличилась, но измеренная сила почти не изменилась. Почему это не обязательно противоречие?",
    "Surface EMG amplitude increases during a contraction, but measured force changes little. Why is this not necessarily contradictory?",
    "Жиырылу кезінде беткей ЭМГ амплитудасы артты, бірақ өлшенген күш аз өзгерді. Неліктен бұл міндетті түрде қайшылық емес?",
    "ЭМГ измеряет электрическую активность двигательных единиц, а сила зависит также от механики мышцы, длины, скорости сокращения, утомления и методики измерения.",
    "EMG measures electrical motor-unit activity; force also depends on muscle mechanics, length, contraction velocity, fatigue and measurement technique.",
    "ЭМГ қозғалтқыш бірліктердің электрлік белсенділігін көрсетеді; күш бұлшықет механикасына, ұзындығына, жылдамдығына, шаршауға және өлшеуге де тәуелді."
  ]
] as const;
export function moduleTwoClinicalCases(language:Language){const i=language==="RU"?1:language==="EN"?2:3;const j=language==="RU"?4:language==="EN"?5:6;const k=language==="RU"?7:language==="EN"?8:9;return cases.map(c=>({id:"m2-curated-"+c[0],title:c[i],situation:c[j],stages:[{title:language==="RU"?"Физиологический анализ":language==="EN"?"Physiological reasoning":"Физиологиялық талдау",questions:[language==="RU"?"Какое наблюдение является ключевым и какой механизм его объясняет?":language==="EN"?"Which observation is key, and what mechanism explains it?":"Қай бақылау негізгі және оны қандай механизм түсіндіреді?",language==="RU"?"Какой контроль или дополнительное исследование проверит вывод?":language==="EN"?"Which control or additional investigation tests the inference?":"Қандай бақылау не қосымша зерттеу қорытындыны тексереді?"]}],explanation:[c[k],language==="RU"?"Оцените альтернативные причины и ограничения метода; не делайте клинический диагноз по одному признаку.":language==="EN"?"Consider alternative causes and method limitations; do not diagnose from one finding alone.":"Баламалы себептер мен әдіс шектеулерін бағалаңыз; бір белгімен диагноз қоймаңыз."]}));}
