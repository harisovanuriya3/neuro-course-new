import type { Language } from "../course";
import type { PretestLesson } from "../study";

// Module 15: hypothalamus. Original diagnostic questions; no textbook text copied.
// Guyton & Hall 13e, ch. 59, PDF 721–724: hypothalamic integration and water balance.
// Ganong 23e, ch. 18, PDF 285–289: pituitary connections and thirst mechanisms.
// C. L. Ghai Practical Physiology 8e, PDF 262–265: peripheral autonomic tests;
// such tests do not directly measure a hypothalamic nucleus.
type Choice = "a" | "b" | "c" | "d";
type Item = { prompt: string; options: [string, string, string, string]; answer: Choice; explanation: string };
type Locale = { intro: string; questions: [Item, Item, Item] };
const localized: Record<Language, Locale> = {
  "RU": {
    "intro": "Диагностическая самопроверка по физиологии гипоталамуса: нейрогипофиз и аденогипофиз, осмотическая и объёмная регуляция жажды, пределы интерпретации вегетативных проб. Три вопроса не формируют итоговую оценку; после выбора ответа прочитайте объяснение. Не проводите самостоятельно ограничение воды или провокационные клинические пробы.",
    "questions": [
      {
        "prompt": "На схеме показаны нейроны супраоптического и паравентрикулярного ядер гипоталамуса, срединное возвышение и две доли гипофиза. Какое описание путей передачи гормональных сигналов соответствует физиологии?",
        "options": [
          "Оба гормона задней доли синтезируются в аденогипофизе и поступают в гипоталамус по портальным сосудам.",
          "Вазопрессин образуется исключительно в почке, а нейрогипофиз регулирует его секрецию через рилизинг-гормоны.",
          "Вазопрессин и окситоцин синтезируются в гипоталамических нейронах и выделяются из окончаний в нейрогипофизе; рилизинг- и ингибирующие гормоны достигают аденогипофиза по портальной крови.",
          "Аденогипофиз получает основную регуляторную команду непосредственно по аксонам супраоптических нейронов, а нейрогипофиз — через портальные сосуды."
        ],
        "answer": "c",
        "explanation": "Крупноклеточные нейроны супраоптического и паравентрикулярного ядер синтезируют гормоны задней доли; аксоны идут к нейрогипофизу, где гормоны выделяются в кровоток. Передняя доля регулируется преимущественно гипоталамическими рилизинг- и ингибирующими гормонами через портальную систему. Нельзя отождествлять место синтеза гормона с местом его выделения."
      },
      {
        "prompt": "В двух независимых учебных моделях почки функционируют нормально. В модели А увеличена эффективная осмоляльность плазмы без значимой потери объёма. В модели Б уменьшен эффективный циркулирующий объём при прежней осмоляльности. Какой прогноз обоснован?",
        "options": [
          "В обеих моделях жажда и вазопрессин обязательно уменьшаются, поскольку их секреция зависит только от объёма плазмы.",
          "В модели А возможна осмотическая стимуляция жажды и вазопрессина; в модели Б объёмные сигналы через барорецепторные пути и ангиотензин II также способны усиливать эти ответы.",
          "В модели А жажда исчезает, если давление неизменно; в модели Б неизменная осмоляльность полностью исключает выделение вазопрессина.",
          "В обеих моделях одинаковая осмоляльность мочи доказывает изолированное поражение супраоптического ядра независимо от функции почек."
        ],
        "answer": "b",
        "explanation": "Эффективная осмоляльность активирует осмосенсорные цепи переднего гипоталамуса и околожелудочковых органов. Снижение эффективного объёма действует также через барорецепторные сигналы и ренин–ангиотензиновую систему. Жажда и выделение вазопрессина взаимосвязаны, но не идентичны; итог зависит от силы стимулов, функции почек и других факторов. Модель не устанавливает диагноз."
      },
      {
        "prompt": "На практическом занятии зарегистрированы изменение частоты сердечных сокращений и артериального давления при безопасной стандартной вегетативной пробе. Студент утверждает, что результат прямо измеряет активность конкретного ядра гипоталамуса. Как оценить это утверждение?",
        "options": [
          "Результат непосредственно показывает секрецию вазопрессина из супраоптического ядра и не зависит от периферических рефлексов.",
          "По изменению давления можно без других исследований установить точную локализацию любого поражения гипоталамуса.",
          "Одна проба всегда различает активность супрахиазматического и паравентрикулярного ядер без учёта сна и температуры.",
          "Проба отражает интегрированный сердечно-сосудистый автономный ответ; она не измеряет отдельное гипоталамическое ядро и сама по себе не определяет локализацию поражения."
        ],
        "answer": "d",
        "explanation": "Вегетативные пробы оценивают совокупный ответ барорефлекторных, стволовых, периферических и центральных механизмов. Гипоталамус участвует в интеграции, но ЧСС и давление не являются прямой записью его нейронов. Интерпретация требует клинического контекста и других данных; самостоятельные провокационные испытания не предлагаются."
      }
    ]
  },
  "EN": {
    "intro": "Ungraded diagnostic self-check on hypothalamic physiology: posterior versus anterior pituitary pathways, osmotic and volume-related drives to drink, and limits of autonomic testing. These three questions are not a final examination. Read the explanation after answering. Do not attempt unsupervised water restriction or provocative clinical tests.",
    "questions": [
      {
        "prompt": "A diagram shows neurons of the supraoptic and paraventricular hypothalamic nuclei, the median eminence, and both pituitary lobes. Which description correctly distinguishes the hormonal signaling pathways?",
        "options": [
          "Both posterior-pituitary hormones are synthesized in the anterior pituitary and carried to the hypothalamus in portal blood.",
          "Vasopressin is synthesized only in the kidney, while the posterior pituitary controls it through releasing hormones.",
          "Vasopressin and oxytocin are synthesized in hypothalamic neurons and released from terminals in the posterior pituitary; releasing and inhibiting hormones reach the anterior pituitary via portal blood.",
          "The anterior pituitary receives its principal regulatory signals directly along supraoptic axons, while the posterior pituitary is controlled through the portal vessels."
        ],
        "answer": "c",
        "explanation": "Magnocellular neurons of the supraoptic and paraventricular nuclei synthesize posterior-pituitary hormones. Their axons reach the neurohypophysis, where the hormones enter the circulation. The anterior pituitary is regulated mainly by hypothalamic releasing and inhibiting hormones delivered through the hypophysial portal system. The site of synthesis must not be confused with the site of release."
      },
      {
        "prompt": "Two independent teaching models assume normal renal function. Model A raises effective plasma osmolality without major volume loss. Model B reduces effective circulating volume while osmolality remains unchanged. Which prediction is physiologically justified?",
        "options": [
          "Both conditions necessarily suppress thirst and vasopressin because their regulation depends only on plasma volume.",
          "Model A may stimulate thirst and vasopressin through osmosensory pathways; in model B, volume-sensitive pathways and angiotensin II can also increase these responses.",
          "In model A thirst disappears if arterial pressure is unchanged; in model B stable osmolality completely prevents vasopressin secretion.",
          "Matching urine osmolality in both models proves an isolated supraoptic lesion regardless of renal function or other influences."
        ],
        "answer": "b",
        "explanation": "Effective osmolality influences anterior hypothalamic and circumventricular osmosensory circuits. Reduced effective circulating volume can influence thirst and vasopressin via baroreceptor-related signals and the renin–angiotensin system. Thirst and vasopressin release are related but distinct responses; their magnitudes depend on stimulus intensity, renal function and other conditions. Neither model establishes a diagnosis."
      },
      {
        "prompt": "During a supervised physiology class, heart rate and arterial pressure change during a standard safe autonomic function test. A student claims that this directly measures activity of one named hypothalamic nucleus. Which interpretation is defensible?",
        "options": [
          "The result directly quantifies vasopressin secretion by the supraoptic nucleus without involvement of peripheral reflex pathways.",
          "The blood-pressure change alone identifies the exact site of any hypothalamic lesion without further assessment.",
          "A single autonomic test always separates suprachiasmatic from paraventricular activity regardless of sleep state or temperature.",
          "The test measures an integrated cardiovascular autonomic response; it does not directly record a specific hypothalamic nucleus or localize a lesion on its own."
        ],
        "answer": "d",
        "explanation": "Autonomic cardiovascular tests reflect integrated baroreflex, brainstem, peripheral and central mechanisms. The hypothalamus contributes to integration, but heart rate and blood pressure are not direct recordings of its neurons. Interpretation requires clinical context and complementary evidence. Unsupervised provocative testing is not advised."
      }
    ]
  },
  "KZ": {
    "intro": "Гипоталамус физиологиясы бойынша бағаланбайтын бастапқы тексеру: нейрогипофиз бен аденогипофиздің реттелу жолдары, шөлдеудің осмостық және көлемдік себептері, вегетативтік сынамалардың қорытынды шектері. Үш сұрақ қорытынды емтихан емес. Жауаптан кейін түсіндірмені оқыңыз. Суды өз бетіңізше шектеу немесе қауіпті сынама жасау ұсынылмайды.",
    "questions": [
      {
        "prompt": "Сызбада гипоталамустың супраоптикалық және паравентрикулярлық ядролары, ортаңғы дөңес және гипофиздің екі бөлігі көрсетілген. Гормондық сигналдардың берілу жолдарын қай тұжырым дұрыс ажыратады?",
        "options": [
          "Артқы бөлік гормондарының екеуі де аденогипофизде түзіліп, гипоталамусқа қақпалық қанмен жеткізіледі.",
          "Вазопрессин тек бүйректе синтезделеді, ал нейрогипофиз оны либериндер арқылы реттейді.",
          "Вазопрессин мен окситоцин гипоталамус нейрондарында синтезделіп, нейрогипофиздегі аксон ұштарынан бөлінеді; либериндер мен тежегіш гормондар аденогипофизге қақпалық қанмен жетеді.",
          "Аденогипофиз негізгі реттеуші сигналды супраоптикалық нейрондардың аксондарынан тікелей алады, ал нейрогипофиз қақпалық тамырлар арқылы реттеледі."
        ],
        "answer": "c",
        "explanation": "Супраоптикалық және паравентрикулярлық ядролардың ірі нейросекреторлық жасушалары артқы бөлік гормондарын синтездейді. Олардың аксондары нейрогипофизге барып, гормондар сол жерде қанға бөлінеді. Аденогипофизді негізінен гипоталамустың қақпалық қан арқылы жеткізілетін либериндері мен тежегіш гормондары реттейді. Синтез орны мен бөліну орнын шатастырмау керек."
      },
      {
        "prompt": "Екі тәуелсіз оқу моделінде бүйрек қызметі қалыпты деп алынған. А моделінде көлем айтарлықтай азаймай, плазманың тиімді осмоляльдылығы жоғарылайды. Б моделінде осмоляльдылық өзгермей, тиімді айналым көлемі төмендейді. Қай болжам негізді?",
        "options": [
          "Екі жағдайда да шөлдеу мен вазопрессин міндетті түрде төмендейді, өйткені олар тек плазма көлеміне тәуелді.",
          "А моделінде осмосезгіш жолдар шөлдеу мен вазопрессин бөлінуін күшейтуі мүмкін; Б моделінде көлемдік сигналдар мен ангиотензин II де осы жауаптарды күшейте алады.",
          "А моделінде артериялық қысым өзгермесе шөлдеу жоғалады; Б моделінде осмоляльдылық тұрақты болса вазопрессин мүлде бөлінбейді.",
          "Екі модельдегі зәр осмоляльдылығы бірдей болса, бұл бүйрек қызметіне тәуелсіз супраоптикалық ядроның оқшау зақымын дәлелдейді."
        ],
        "answer": "b",
        "explanation": "Тиімді осмоляльдылық алдыңғы гипоталамус пен қарыншамаңы құрылымдарының осмосезгіш тізбектеріне әсер етеді. Тиімді айналым көлемінің кемуі барорецепторлық сигналдар және ренин–ангиотензин жүйесі арқылы шөлдеу мен вазопрессин бөлінуіне ықпал етеді. Екі жауап өзара байланысты, бірақ бірдей емес; нәтижеге әсердің күші, бүйрек қызметі және басқа жағдайлар ықпал етеді. Модель диагноз қоймайды."
      },
      {
        "prompt": "Физиология сабағында қауіпсіз стандартты вегетативтік сынама кезінде жүрек соғу жиілігі мен артериялық қысым өзгерді. Студент бұл нәтиже гипоталамустың белгілі бір ядросының белсенділігін тікелей өлшейді дейді. Қай түсіндіру дұрыс?",
        "options": [
          "Бұл нәтиже шеткі рефлекстерге тәуелсіз супраоптикалық ядроның вазопрессин бөлуін тікелей сандық өлшейді.",
          "Қысымның өзгеруі ғана гипоталамустың кез келген зақымының нақты орнын басқа зерттеусіз анықтайды.",
          "Бір ғана вегетативтік сынама ұйқы мен температураға тәуелсіз супрахиазматикалық және паравентрикулярлық ядроларды әрқашан ажыратады.",
          "Сынама жүрек-қантамыр жүйесінің біріктірілген вегетативтік жауабын көрсетеді; ол жеке гипоталамус ядросын тікелей тіркемейді және зақым ошағын өздігінен анықтамайды."
        ],
        "answer": "d",
        "explanation": "Вегетативтік жүрек-қантамыр сынамалары барорефлекстік, ми бағанының, шеткі және орталық тетіктердің жиынтық жауабын көрсетеді. Гипоталамус реттеуге қатысқанымен, жүрек соғу жиілігі мен қан қысымы оның нейрондарын тікелей тіркемейді. Қорытынды жасау үшін клиникалық жағдай мен қосымша деректер қажет; қауіпті сынаманы өз бетімен жүргізуге болмайды."
      }
    ]
  }
};

export function createModuleFifteenPretest(language: Language, moduleTitle: string, title: string): PretestLesson {
  const data = localized[language];
  return {
    kind: "pretest",
    title,
    introduction: data.intro,
    questions: data.questions.map((item, index) => ({
      id: ["module-15-pretest-pituitary", "module-15-pretest-osmolality-volume", "module-15-pretest-autonomic-limits"][index],
      topic: moduleTitle,
      prompt: item.prompt,
      options: item.options.map((text, i) => ({ id: (["a", "b", "c", "d"] as const)[i], text })),
      correctAnswer: item.answer,
      explanation: item.explanation,
      target: { section: "theory" as const }
    }))
  };
}
