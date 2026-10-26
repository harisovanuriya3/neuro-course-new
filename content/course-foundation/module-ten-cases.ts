import type { Language } from "../course";
import type { CasesLesson } from "../cases";

// Module 10: brainstem physiology; independently reasoned teaching cases.
// Source checks: Guyton & Hall 13e PDF 217–218 (baroreceptors/NTS), 718–720
// (ascending activating systems); Ganong 23e PDF 243–244 (RAS), 579 (NTS,
// CVLM, RVLM); C. L. Ghai Practical Physiology 8e PDF 301–303 (CN II/III,
// corneal reflex). Illustrative cases are not diagnostic protocols.
type CaseCopy = {
  title: string;
  situation: string;
  questions: [string, string, string];
  explanation: [string, string];
};
type Copy = { introduction: string; cases: [CaseCopy, CaseCopy, CaseCopy] };
const data: Record<Language, Copy> = {
  RU: {
    introduction: "Три самостоятельные задачи по физиологии ствола мозга. Сначала сопоставьте наблюдения, затем восстановите цепь и назовите альтернативу. Условные случаи не заменяют клиническое обследование. Не проводите корнеальных проб и не вызывайте болезненные реакции самостоятельно.",
    cases: [
      {
        title: "1. Прямая и содружественная реакция зрачков",
        situation: "Учебная модель: оба зрачка одинакового диаметра в покое, движения глаз сохранены. Когда врач направляет свет в правый глаз, ни правый, ни левый зрачок заметно не суживается. При освещении левого глаза сужаются оба зрачка. Нет сведений о лекарственных каплях или повреждении радужки. Студент утверждает, что отсутствие реакции правого зрачка обязательно доказывает повреждение правого III нерва.",
        questions: [
          "Какая комбинация прямого и содружественного ответа при двух направлениях света является решающим наблюдением?",
          "Проследите путь сетчатка → II → претектальная область → оба ядра Эдингера—Вестфаля → III → ресничный узел → сфинктер зрачка и предположите нарушенное звено.",
          "Почему эти данные не позволяют назвать точный уровень поражения II нерва и какие условия или дополнительные признаки могут изменить вывод?"
        ],
        explanation: [
          "Освещение правого глаза не запускает сужение ни одного зрачка, а освещение левого вызывает оба ответа. В условной модели это поддерживает нарушение правого афферентного звена II нерва или его входа в претектальную цепь. Сохранное сужение правого зрачка при освещении левого глаза показывает, что правый эфферентный парасимпатический путь III нерва, ресничный узел и сфинктер способны обеспечить ответ. Содружественная реакция возникает благодаря двусторонним претектальным связям.",
          "Это задача на функциональную дугу, а не доказательство конкретного диагноза: оптические среды, сетчатка, фармакологическое влияние, предшествующая операция, уровень повреждения зрительного пути и условия освещения требуют отдельной оценки. При изолированном правом эфферентном дефекте III нерва правый зрачок обычно не сужался бы при освещении любого глаза. У живого пациента вывод уточняет специалист; учащиеся не проводят инвазивных проб."
        ]
      },
      {
        title: "2. Быстрая барорефлекторная обратная связь",
        situation: "В безопасной расчётной модели артериальное давление на несколько секунд повышается со 100 до 125 мм рт. ст. без изменения состава крови. Условный регистратор показывает рост импульсации от каротидного синуса и дуги аорты. Студент предсказывает усиление симпатического сосудосуживающего выхода, потому что давление уже высокое. Требуется объяснить направление кратковременного компенсаторного ответа, а не поставить диагноз.",
        questions: [
          "Какие механорецепторы регистрируют растяжение и по каким черепным нервам афферентные сигналы приходят к ядру одиночного пути (NTS)?",
          "Постройте цепь NTS → CVLM → торможение RVLM и параллельное усиление сердечного вагусного влияния; предскажите изменения частоты сердца и симпатического сосудистого тонуса.",
          "Почему реальная частота сердца не обязана точно повторять прогноз модели и чем барорефлекс отличается от долговременной почечной регуляции давления?"
        ],
        explanation: [
          "При быстром повышении давления растяжение каротидного синуса и дуги аорты обычно увеличивает частоту импульсации барорецепторов. Сигналы идут преимущественно по IX нерву от каротидного синуса и по X от дуги аорты в NTS продолговатого мозга. NTS возбуждает CVLM; тормозные нейроны CVLM снижают активность RVLM и симпатический выход к сосудам. Одновременно усиливается парасимпатическое влияние на сердце. Ожидаются тенденции к снижению частоты сердца и сосудистого сопротивления, противодействующие исходному подъёму давления.",
          "Модель изолирует быструю отрицательную обратную связь. Реальный ответ зависит от исходного автономного тонуса, дыхания, лекарств, активности и времени наблюдения; барорефлекс адаптируется и не объясняет единолично длительную регуляцию давления. Поэтому одиночное измерение пульса не локализует повреждение NTS, IX или X. При внезапных симптомах у пациента необходима клиническая оценка, а не экспериментальное повышение давления."
        ]
      },
      {
        title: "3. Сенсорный ответ и уровень бодрствования",
        situation: "В теоретическом наблюдении у пациента регистрируется ранний корковый вызванный ответ на звук, однако в другое время при неизменном стимуле заметно снижены спонтанная реактивность и способность поддерживать бодрствование. Неизвестны сведения о сне, седативных препаратах, обменных нарушениях и распространённых поражениях мозга. Студент заключает, что наличие раннего вызванного ответа доказывает сохранность всех стволовых систем активации и нормальное сознание.",
        questions: [
          "Чем относительно специфическая сенсорная передача отличается от распределённых восходящих систем регуляции бодрствования?",
          "Как стволовые, таламические, гипоталамические и корковые связи могут изменять реактивность при сохранении части раннего сенсорного ответа?",
          "Какие альтернативные объяснения и клинические данные необходимо проверить, прежде чем обсуждать локализацию, и почему учебный индекс активации не является шкалой сознания?"
        ],
        explanation: [
          "Ранний сенсорный ответ отражает проведение и обработку некоторой части сигнала, но сам по себе не измеряет способность поддерживать сознание. Восходящие активирующие влияния связаны с неоднородными нейронными группами ствола, таламическими и другими подкорковыми путями и корой. Изменение их взаимодействия может сопровождаться снижением бодрствования, даже если отдельные компоненты сенсорного пути функционируют. Ретикулярная формация не является одним однородным «центром сознания».",
          "По одному вызванному ответу нельзя ни доказать нормальное сознание, ни локализовать повреждение в ретикулярной формации. Сон, седативные вещества, метаболические причины, судорожная активность и диффузные поражения требуют дифференциальной оценки. Условный безразмерный индекс в интерактиве модуля 10 не является ЭЭГ, количеством активных нейронов, клинической шкалой или прогнозом исхода. Изменение сознания у пациента требует срочного профессионального обследования."
        ]
      }
    ]
  },
  EN: {
    introduction: "Three independent brainstem-physiology cases. Compare the observations, reconstruct the causal pathway, then consider alternatives. These hypothetical cases are not diagnostic protocols. Do not perform corneal testing or provoke painful responses yourself.",
    cases: [
      {
        title: "1. Direct and consensual pupillary responses",
        situation: "Teaching model: both pupils are equal at rest and eye movements are preserved. When a clinician illuminates the right eye, neither pupil constricts appreciably. When the left eye is illuminated, both pupils constrict. No history of eye drops or iris injury is supplied. A student claims that the absent right-pupil response necessarily proves damage to the right oculomotor nerve (CN III).",
        questions: [
          "Which pattern of direct and consensual responses during illumination of each eye is the decisive finding?",
          "Trace retina → CN II → pretectal region → both Edinger–Westphal nuclei → CN III → ciliary ganglion → pupillary sphincter and identify the likely affected limb.",
          "Why can these findings not determine the precise site of an optic-pathway lesion, and which confounders or additional signs could change the inference?"
        ],
        explanation: [
          "Right-eye illumination fails to trigger either pupil, whereas left-eye illumination triggers both. In this stipulated model the pattern favors impairment of the right afferent CN II pathway or its input into the pretectal circuit. Right-pupil constriction when the left eye is illuminated demonstrates that the right parasympathetic CN III efferent limb, ciliary ganglion and sphincter can generate a response. Bilateral pretectal projections account for the consensual constriction.",
          "This is localization of a functional reflex limb, not proof of a diagnosis. Ocular media, retina, medications, prior surgery, the level of optic-pathway damage and illumination conditions require separate assessment. In an isolated right CN III efferent lesion, the right pupil would generally fail to constrict regardless of which eye was illuminated. A trained clinician must evaluate the actual patient; learners should not attempt invasive examination."
        ]
      },
      {
        title: "2. Rapid baroreflex negative feedback",
        situation: "In a safe numerical thought experiment, arterial pressure briefly rises from 100 to 125 mmHg without a change in blood chemistry. A hypothetical recorder shows increased firing from carotid-sinus and aortic-arch afferents. A student predicts greater sympathetic vasoconstrictor output because pressure is already high. Explain the expected direction of the short-term compensatory response rather than making a clinical diagnosis.",
        questions: [
          "Which stretch-sensitive receptors respond, and through which cranial nerves do carotid and aortic signals reach the nucleus tractus solitarius (NTS)?",
          "Trace NTS → CVLM → inhibition of RVLM and the parallel increase in cardiac vagal influence; predict the direction of heart-rate and sympathetic vascular-tone changes.",
          "Why might an actual heart-rate measurement differ from the isolated prediction, and how does rapid baroreflex control differ from long-term renal pressure regulation?"
        ],
        explanation: [
          "A rapid pressure rise normally increases stretch and baroreceptor firing in the carotid sinus and aortic arch. Carotid signals reach the medullary NTS mainly through CN IX and aortic signals through CN X. NTS excites the caudal ventrolateral medulla (CVLM); inhibitory CVLM neurons suppress the rostral ventrolateral medulla (RVLM), reducing sympathetic vasoconstrictor outflow. Cardiac parasympathetic influence also increases. The expected trends are lower heart rate and vascular resistance, opposing the initial rise in pressure.",
          "The thought experiment isolates fast negative feedback. Actual responses depend on baseline autonomic tone, respiration, medications, activity and timing; the baroreflex adapts and is not the sole long-term pressure controller. A single pulse measurement cannot localize an injury to NTS, CN IX or CN X. New symptoms in a patient call for clinical assessment, not experimental elevation of blood pressure."
        ]
      },
      {
        title: "3. Sensory evoked response versus arousal",
        situation: "In a hypothetical observation, an early cortical auditory evoked response is detectable, yet at another time the same stimulus is accompanied by markedly reduced spontaneous responsiveness and ability to sustain wakefulness. Sleep state, sedative exposure, metabolic disturbance and diffuse brain disease have not been assessed. A student concludes that the early evoked response proves all brainstem activating systems and consciousness are normal.",
        questions: [
          "How does relatively modality-specific sensory transmission differ from the distributed ascending systems that regulate wakefulness?",
          "How could interactions among brainstem, thalamic, hypothalamic and cortical circuits change responsiveness while some early sensory responses remain detectable?",
          "Which alternative explanations and clinical observations are needed before localization, and why is the teaching activation index not a consciousness scale?"
        ],
        explanation: [
          "An early evoked response indicates transmission and processing of some sensory information; it does not itself measure sustained conscious awareness. Ascending activating influences involve heterogeneous brainstem cell groups and connections with thalamic, other subcortical and cortical networks. Their altered interaction can accompany reduced arousal while components of a specific sensory pathway still function. The reticular formation is not one uniform 'consciousness center'.",
          "An evoked response alone neither establishes normal consciousness nor localizes a lesion to the reticular formation. Sleep, sedatives, metabolic disturbances, seizures and diffuse lesions are alternative considerations. The dimensionless teaching index in module 10 is not an EEG, a neuron-count measure, a clinical scale or an outcome predictor. Altered consciousness in a patient warrants urgent professional evaluation."
        ]
      }
    ]
  },
  KZ: {
    introduction: "Ми бағанының физиологиясы бойынша үш дербес жағдай. Әуелі бақылауларды салыстырыңыз, содан кейін себептік тізбекті құрып, балама түсіндірмені қарастырыңыз. Бұл оқу жағдайлары диагноз қоюға арналмаған. Қасаң қабықты өздігінен тексермеңіз және ауырсындыратын сынама жасамаңыз.",
    cases: [
      {
        title: "1. Қарашықтың тікелей және келісілген жауаптары",
        situation: "Оқу үлгісі: тыныштықта екі қарашықтың өлшемі бірдей, көз қозғалыстары сақталған. Дәрігер оң көзге жарық түсіргенде екі қарашық та айқын тарылмайды. Сол көзге жарық түсіргенде екі қарашық та тарылады. Көз тамшылары немесе нұрлы қабық жарақаты туралы мәлімет жоқ. Студент оң қарашықтың жауап бермеуі міндетті түрде оң жақ III жүйкенің зақымын дәлелдейді деп тұжырымдайды.",
        questions: [
          "Әр көзді бөлек жарықтандырғанда тікелей және келісілген жауаптардың қай үлгісі негізгі дәлел болады?",
          "Торқабық → II жүйке → претекталдық аймақ → екі Эдингер—Вестфаль ядросы → III жүйке → кірпікшелі түйін → қарашық сфинктері жолын сипаттап, ықтимал бұзылған буынды атаңыз.",
          "Неліктен бұл деректер көру жолының нақты зақым деңгейін анықтамайды және қандай қосымша белгілер не жағдайлар қорытындыны өзгертуі мүмкін?"
        ],
        explanation: [
          "Оң көзді жарықтандырғанда екі қарашық та тарылмайды, ал сол көзді жарықтандырғанда екеуі де тарылады. Берілген үлгіде бұл оң жақ II жүйкенің афференттік жолы немесе оның претекталдық тізбекке кірісі бұзылғанын қолдайды. Сол көзді жарықтандырғанда оң қарашықтың тарылуы оң жақ III жүйкенің парасимпатикалық эфференттік буыны, кірпікшелі түйін және сфинктер жауап бере алатынын көрсетеді. Екі жақты претекталдық байланыстар келісілген жауапты қамтамасыз етеді.",
          "Бұл нақты диагноз емес, рефлекс доғасының функционалдық талдауы. Көздің оптикалық орталары, торқабық, дәрілік әсерлер, бұрынғы операциялар, көру жолының зақым деңгейі және жарықтандыру жағдайы бөлек бағалануы тиіс. Оң жақ III жүйкенің оқшау эфференттік зақымында қай көз жарықтандырылса да оң қарашық әдетте тарылмайды. Науқасты тек даярланған маман тексереді."
        ]
      },
      {
        title: "2. Барорефлекстің жылдам теріс кері байланысы",
        situation: "Қауіпсіз есептік ойша тәжірибеде артериялық қысым қан құрамын өзгертпей бірнеше секундқа 100-ден 125 мм сын. бағ. дейін көтеріледі. Шартты тіркеу құрылғысы ұйқы артериясы синусы мен қолқа доғасынан келетін импульсацияның артқанын көрсетеді. Студент қысым жоғары болғандықтан симпатикалық тамыр тарылтқыш әсер де күшейеді деп болжайды. Диагноз емес, қысқа мерзімді өтемдік жауаптың бағытын түсіндіріңіз.",
        questions: [
          "Қандай созылуға сезімтал рецепторлар белсенеді және ұйқы артериясы мен қолқадан сигналдар жалғыз жол ядросына (NTS) қай бассүйек жүйкелері арқылы келеді?",
          "NTS → CVLM → RVLM тежелуі тізбегін және жүрекке вагустық ықпалдың қатар күшеюін көрсетіп, жүрек жиілігі мен симпатикалық тамыр тонусының өзгеріс бағытын болжаңыз.",
          "Неліктен нақты жүрек жиілігі оқшауланған үлгідегі болжамға дәл сәйкес келмеуі мүмкін және барорефлекс бүйректік ұзақ мерзімді реттелуден несімен ерекшеленеді?"
        ],
        explanation: [
          "Қысым тез көтерілгенде ұйқы артериясы синусы мен қолқа доғасының созылуы барорецептор импульсациясын әдетте арттырады. Ұйқы артериясынан сигналдар негізінен IX, ал қолқадан X жүйке арқылы сопақша мидағы NTS-ке жетеді. NTS каудалдық вентролатералдық сопақша миды (CVLM) белсендіреді; оның тежегіш нейрондары ростралдық вентролатералдық аймақтың (RVLM) белсенділігін төмендетіп, тамырларға симпатикалық әсерді азайтады. Жүрекке парасимпатикалық ықпал да күшейеді. Күтілетін бағыт — жүрек жиілігі мен тамыр кедергісінің төмендеуі.",
          "Бұл ойша үлгі жылдам теріс кері байланысты оқшаулайды. Нақты жауап бастапқы вегетативтік тонусқа, тыныс алуға, дәрілерге, белсенділікке және бақылау уақытына тәуелді. Барорефлекс бейімделеді және ұзақ мерзімді қысым реттелуін жалғыз өзі түсіндірмейді. Бір ғана пульс көрсеткіші NTS, IX немесе X жүйкенің зақымын дәлелдемейді. Науқаста жаңа белгілер болса, қысымды тәжірибе үшін көтермей, клиникалық тексеру қажет."
        ]
      },
      {
        title: "3. Сенсорлық шақырылған жауап пен сергектік",
        situation: "Теориялық бақылауда дыбысқа ерте қыртыстық шақырылған жауап тіркеледі, бірақ басқа уақытта дәл сол стимулға қарамастан өздігінен жауап беру және сергектікті сақтау қабілеті айқын төмендейді. Ұйқы күйі, тыныштандырғыш дәрілер, зат алмасу бұзылыстары және мидың жайылған зақымы әлі бағаланбаған. Студент ерте шақырылған жауаптың болуы ми бағанының барлық белсендіруші жүйелері мен сананың қалыпты екенін дәлелдейді дейді.",
        questions: [
          "Сезім түріне салыстырмалы тән өткізгіш жолдар сергектікті реттейтін таралған жоғарылаушы жүйелерден қалай ерекшеленеді?",
          "Ми бағаны, таламус, гипоталамус және қыртыс тізбектерінің өзара ықпалы кейбір ерте сенсорлық жауаптар сақталғанда реактивтілікті қалай өзгертуі мүмкін?",
          "Зақым орнын болжаудан бұрын қандай балама себептер мен клиникалық деректер қажет және неге оқу индексі сананы бағалау шкаласы емес?"
        ],
        explanation: [
          "Ерте шақырылған жауап сенсорлық ақпараттың бір бөлігінің берілуі мен өңделуін көрсетеді, бірақ саналы сергектікті ұзақ сақтауды тікелей өлшемейді. Жоғарылаушы белсендіруші ықпалдарға ми бағанының әртекті нейрондық топтары және олардың таламустық, басқа қыртысасты әрі қыртыстық желілермен байланыстары қатысады. Бұл жүйелердің өзара әрекеті өзгергенде сенсорлық жолдың кейбір бөліктері жұмыс істесе де сергектік төмендеуі мүмкін. Ретикулярлық формация біртекті «сана орталығы» емес.",
          "Бір ғана шақырылған жауап қалыпты сананы дәлелдемейді және зақымды ретикулярлық формацияға нақты орналастырмайды. Ұйқы, седативтік заттар, метаболизм бұзылыстары, құрысулар және мидың жайылған зақымдары ескерілуі тиіс. 10-модульдегі шартты өлшемсіз индекс ЭЭГ де, белсенді нейрондар саны да, клиникалық шкала да, болжам құралы да емес. Науқастың санасы өзгерсе, шұғыл кәсіби бағалау қажет."
        ]
      }
    ]
  }
};

export function createModuleTenCases(language: Language, moduleTitle: string, ui: CasesLesson["ui"]): CasesLesson {
  const copy = data[language];
  const stageNames = language === "RU"
    ? ["Выделите ключевые данные", "Объясните физиологическую цепь", "Проверьте альтернативы"]
    : language === "EN"
      ? ["Identify key findings", "Explain the physiological pathway", "Consider alternatives"]
      : ["Негізгі деректерді анықтаңыз", "Физиологиялық тізбекті түсіндіріңіз", "Баламаларды тексеріңіз"];
  return {
    kind: "cases",
    title: language === "RU" ? "Ситуационные задачи" : language === "EN" ? "Case Problems" : "Ситуациялық тапсырмалар",
    moduleTitle,
    introduction: copy.introduction,
    ui,
    cases: copy.cases.map((item, i) => ({
      id: "m10-brainstem-case-" + (i + 1),
      title: item.title,
      situation: item.situation,
      stages: item.questions.map((question, j) => ({ title: stageNames[j], questions: [question] })),
      explanation: [...item.explanation]
    }))
  };
}
