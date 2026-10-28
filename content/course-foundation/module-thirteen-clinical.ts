import type { Language } from "../course";
import type { ReadingLesson } from "../study";
import { getSectionTitle } from "../sections";

// Module 13 clinical bridge; original teaching cases grounded in Library:
// Guyton & Hall 13e ch. 57, printed pp. 721–729 (PDF 688–696);
// Ganong 23e ch. 16, printed pp. 254–259 (PDF 266–271);
// C. L. Ghai Practical Physiology 8e, printed pp. 290–291 (PDF 312–313).
// Romberg is not a specific cerebellar test; no single sign proves localization.
type Copy = { intro: string; titles: string[]; paragraphs: string[] };
const data: Record<Language, Copy> = {
  "RU": {
    "intro": "Клиническая связь с физиологией мозжечка: сопоставьте точность, силу, чувствительность, равновесие и движения глаз. Учебные ситуации показывают возможные механизмы, но не устанавливают диагноз по одному признаку.",
    "titles": [
      "Дисметрия при сохранной мышечной силе",
      "Проба Ромберга и роль проприоцепции",
      "Неустойчивая походка и осевая координация",
      "Глазодвигательные нарушения и вестибулоцеребеллум",
      "Внезапная атаксия: границы учебного вывода"
    ],
    "paragraphs": [
      "Учебная ситуация: при пальценосовой пробе человек промахивается мимо цели и заметно корректирует траекторию; при движении к цели усиливается колебание руки. При отдельной оценке сила мышц близка к нормальной. Дисметрия и интенционный тремор согласуются с нарушением координации, в которой участвуют мозжечковые контуры, но не доказывают изолированное поражение мозжечка. Какие данные о чувствительности, зрении, лекарствах и других неврологических признаках нужны, чтобы отличить неточность движения от пареза или сенсорного нарушения?",
      "Учебная ситуация: при стоянии со сведёнными стопами человек относительно устойчив с открытыми глазами, но заметно теряет устойчивость после их закрытия. Это типичный повод проверить проприоцепцию и сенсорные пути, а не считать положительную пробу Ромберга специфическим доказательством поражения мозжечка. При мозжечковой атаксии неустойчивость нередко присутствует уже с открытыми глазами. Проба зависит также от вестибулярной функции, зрения и безопасности положения; необходимо сравнить несколько признаков, не делать вывод по одной пробе.",
      "Учебная ситуация: человек идёт с широко расставленными ногами и испытывает трудности при повороте; при проверке координации рук отклонения менее заметны. Червь и связанные с ним вестибулярно-ретикулярные сети участвуют в поддержании позы и координации осевых мышц, поэтому такой рисунок может соответствовать преимущественно осевой атаксии. Но похожая походка бывает при вестибулярных, сенсорных и иных расстройствах. Сравните ходьбу, положение стоя, движения конечностей, силу и чувствительность; не определяйте точный очаг по походке.",
      "Учебная ситуация: при слежении за движущейся целью наблюдаются прерывистые корректирующие движения глаз, а при переводе взгляда — возможное превышение цели саккады. Клочково-узелковая доля и её вестибулярные связи участвуют в равновесии и глазодвигательной адаптации; другие мозжечковые зоны также участвуют в настройке саккад. Нистагм и неточные саккады не специфичны для одной доли или одного диагноза: учитывайте вестибулярные, стволовые, лекарственные и офтальмологические причины.",
      "Внезапно возникшая новая атаксия, особенно с выраженным головокружением, невозможностью самостоятельно стоять, двоением, нарушением речи, слабостью или сильной головной болью, требует срочной медицинской оценки, поскольку среди возможных причин есть поражения задней черепной ямки и инсульт. Учебные пробы не исключают опасную патологию, а отсутствие явного пареза не делает ситуацию безопасной. Студент должен описать наблюдения и необходимость помощи, но не ставить диагноз и не назначать лечение по одной схеме."
    ]
  },
  "EN": {
    "intro": "Clinical bridge to cerebellar physiology: compare accuracy, strength, sensation, balance and eye movements. These teaching scenarios illustrate possible mechanisms; no single sign establishes a diagnosis.",
    "titles": [
      "Dysmetria despite relatively preserved strength",
      "Romberg testing and proprioceptive input",
      "Unsteady gait and axial coordination",
      "Eye-movement findings and the vestibulocerebellum",
      "Sudden ataxia: limits of a teaching inference"
    ],
    "paragraphs": [
      "Teaching scenario: during a finger-to-nose task, a person overshoots the target and makes repeated corrections; oscillation becomes more evident near the target. Separate strength testing shows relatively preserved force. Dysmetria and intention tremor are consistent with impaired coordination involving cerebellar circuits, but do not prove an isolated cerebellar lesion. What findings about sensation, vision, medication and other neurological signs would help distinguish inaccuracy from weakness or sensory impairment?",
      "Teaching scenario: a person standing with feet together remains relatively steady with eyes open but becomes markedly less stable when the eyes close. This pattern calls for assessment of proprioception and sensory pathways; a positive Romberg sign is not a specific test for cerebellar damage. Cerebellar ataxia often causes instability even with eyes open. Vestibular function, vision and safe positioning also matter. Interpret several findings together rather than localizing disease from this single test.",
      "Teaching scenario: a person walks with a broad base and struggles when turning, while upper-limb coordination is less obviously affected. The vermis and its vestibulo-reticular connections contribute to posture and axial muscle coordination, so this pattern may fit predominantly truncal ataxia. Similar gait changes also occur with vestibular, sensory and other disorders. Compare gait, standing balance, limb coordination, strength and sensation; gait appearance alone cannot pinpoint a lesion.",
      "Teaching scenario: tracking a moving target is interrupted by corrective eye movements, and gaze shifts may overshoot their target. The flocculonodular lobe and vestibular connections contribute to balance and ocular adaptation; other cerebellar regions help calibrate saccades. Nystagmus or inaccurate saccades do not identify a single lobe or diagnosis. Vestibular, brainstem, medication-related and ophthalmic explanations must also be considered.",
      "New sudden-onset ataxia, particularly with severe dizziness, inability to stand, double vision, speech disturbance, weakness or severe headache, requires urgent medical assessment. Posterior fossa disease and stroke are among the potential causes. A bedside coordination test cannot exclude a dangerous condition, and absence of obvious paresis does not establish safety. Students should describe the observations and need for urgent assessment, not diagnose or prescribe treatment from one diagram."
    ]
  },
  "KZ": {
    "intro": "Мишық физиологиясының клиникамен байланысы: қимыл дәлдігін, бұлшықет күшін, сезімталдықты, тепе-теңдікті және көз қозғалысын салыстырыңыз. Бұл оқу жағдайлары ықтимал механизмдерді түсіндіреді, бірақ бір белгі диагнозды анықтамайды.",
    "titles": [
      "Бұлшықет күші сақталғанда байқалатын дисметрия",
      "Ромберг сынамасы және проприоцепция",
      "Тұрақсыз жүріс және тұлға қимылының үйлесімі",
      "Көз қозғалысы және вестибулоцеребеллум",
      "Кенет басталған атаксия: оқу қорытындысының шегі"
    ],
    "paragraphs": [
      "Оқу жағдайы: саусақ-мұрын сынамасында адам нысанадан асып кетіп, қолының бағытын қайта-қайта түзетеді; нысанаға жақындағанда тербеліс күшейеді. Бұлшықет күшін бөлек тексергенде айқын әлсіздік байқалмайды. Дисметрия мен интенциялық тремор мишық контурлары қатысатын үйлесім бұзылысымен сәйкес келуі мүмкін, бірақ мишықтың оқшау зақымын дәлелдемейді. Қимыл дәлсіздігін парезден немесе сезімталдық бұзылысынан ажырату үшін көру, сезімталдық, дәрілер және басқа неврологиялық белгілер туралы не білу керек?",
      "Оқу жағдайы: аяқтарын біріктіріп тұрған адам көзін ашқанда салыстырмалы тұрақты, ал көзін жұмғанда тепе-теңдігін айқын жоғалтады. Бұл проприоцепция мен сезімталдық жолдарын тексеруге негіз болады; оң Ромберг белгісі мишық зақымының арнайы дәлелі емес. Мишықтық атаксия кезінде көз ашық тұрғанда да тұрақсыздық болуы мүмкін. Вестибулярлық қызмет, көру және тексерудің қауіпсіздігі де маңызды. Бір сынамамен зақым орнын анықтамай, бірнеше белгіні салыстырыңыз.",
      "Оқу жағдайы: адам аяқтарын алшақ қойып жүреді және бұрылғанда қиналады, ал қол қимылының үйлесіміндегі ауытқулар онша айқын емес. Мишық құртшасы мен оған байланысты вестибулярлық-ретикулярлық желілер дене қалпы мен тұлға бұлшықеттерінің үйлесіміне қатысады; мұндай көрініс көбіне тұлғалық атаксияға сәйкес келуі мүмкін. Алайда осындай жүріс вестибулярлық, сезімталдық және басқа бұзылыстарда да кездеседі. Жүрісті, тұруды, аяқ-қол қимылын, күш пен сезімталдықты салыстырыңыз; жүріске қарап нақты ошақты белгілемеңіз.",
      "Оқу жағдайы: қозғалып тұрған нысананы көзбен қадағалау кезінде түзетуші үзік көз қимылдары байқалады, ал көзқарасты тез ауыстырғанда саккада нысанадан асып кетуі мүмкін. Үлпекше-түйіншек бөлігі мен вестибулярлық байланыстар тепе-теңдікке және көз қимылдарының бейімделуіне қатысады; мишықтың басқа аймақтары да саккадалардың дәлдігін реттейді. Нистагм немесе дәл емес саккадалар бір бөліктің зақымын не нақты диагнозды көрсетпейді; вестибулярлық, ми бағаны, дәрілік және көз ауруларына байланысты себептерді де ескеріңіз.",
      "Жаңа атаксия кенеттен басталса, әсіресе қатты бас айналумен, өздігінен тұра алмаумен, қосарланып көрумен, сөйлеу бұзылысымен, әлсіздікпен немесе қатты бас ауруымен қатар жүрсе, шұғыл медициналық бағалау қажет. Ықтимал себептердің арасында артқы бассүйек шұңқырының зақымдары мен инсульт бар. Үйлесімділік сынамасы қауіпті патологияны жоққа шығармайды, ал айқын парездің болмауы қауіпсіздікті дәлелдемейді. Студент бақылауларды және шұғыл көмек қажеттігін сипаттайды, бірақ бір сызбаға сүйеніп диагноз қоймайды немесе ем тағайындамайды."
    ]
  }
};

export function createModuleThirteenClinical(language: Language): ReadingLesson {
  const copy = data[language];
  const destinations = [
    ["practice", "theory"],
    ["theory", "cases"],
    ["practice", "theory"],
    ["interactive", "theory"],
    ["cases", "references"],
  ] as const;
  return {
    kind: "clinical",
    title: getSectionTitle("clinical", language),
    introduction: copy.intro,
    cards: copy.titles.map((title, index) => ({
      id: "module-13-clinical-" + (index + 1),
      title,
      paragraphs: [copy.paragraphs[index]],
      links: destinations[index].map(section => ({ section })),
    })),
  };
}
