import type { Language, Lesson } from "../types";

// Module 15: hypothalamic integration and homeostasis.
// Directly checked against Guyton & Hall 13e PDF pp. 721–724 (printed 754–757);
// Ganong 23e PDF pp. 285–292 (printed 273–280);
// C. L. Ghai Practical Physiology 8e PDF pp. 262–265 (printed 240–243).
// Ghai addresses peripheral autonomic tests, not direct recordings of hypothalamic nuclei.
// Original explanatory prose; no textbook figures or extended excerpts reproduced.
type Text = Record<Language, string>;
type Section = { id: string; head: Text; paragraphs: [Text, Text] };
const sections: Section[] = [
  {
    "id": "hypothalamus-pituitary-pathways",
    "head": {
      "RU": "Гипоталамус и гипофиз: два разных пути управления",
      "EN": "Hypothalamus and pituitary: two distinct control routes",
      "KZ": "Гипоталамус пен гипофиз: реттеудің екі бөлек жолы"
    },
    "paragraphs": [
      {
        "RU": "Гипоталамус связывает нервную, эндокринную и вегетативную регуляцию. Крупноклеточные нейроны супраоптического и паравентрикулярного ядер синтезируют вазопрессин и окситоцин; их аксоны проходят по гипоталамо-гипофизарному тракту к нейрогипофизу, где гормоны высвобождаются в системный кровоток. Задняя доля служит местом хранения и выделения этих гормонов, но не основным местом их синтеза.",
        "EN": "The hypothalamus integrates neural, endocrine and autonomic regulation. Magnocellular neurons of the supraoptic and paraventricular nuclei synthesize vasopressin and oxytocin; their axons descend in the hypothalamo-hypophysial tract to the posterior pituitary, where the hormones enter systemic blood. The posterior lobe stores and releases these hormones but is not their principal site of synthesis.",
        "KZ": "Гипоталамус жүйкелік, эндокриндік және вегетативтік реттелуді біріктіреді. Супраоптикалық және паравентрикулярлық ядролардың ірі жасушалы нейрондары вазопрессин мен окситоцинді синтездейді. Олардың аксондары гипоталамус-гипофиз жолымен нейрогипофизге жетеді, сол жерде гормондар жалпы қанайналымға бөлінеді. Артқы бөлік гормондарды сақтап, бөледі, бірақ олардың негізгі синтез орны емес."
      },
      {
        "RU": "Аденогипофиз регулируется преимущественно другим путём: мелкоклеточные нейроны выделяют рилизинг- и ингибирующие факторы в первичную капиллярную сеть срединного возвышения; по портальным сосудам они достигают передней доли и изменяют секрецию её клеток. Поэтому нельзя рисовать один и тот же аксональный путь для обоих отделов гипофиза. При чтении схемы укажите место синтеза, путь доставки и место действия каждого сигнала.",
        "EN": "The anterior pituitary is regulated chiefly by a different route: parvocellular neurons release hypophysiotropic factors into the primary capillary plexus of the median eminence; portal vessels carry them to the anterior lobe to modify glandular secretion. Do not draw one identical axonal route for both pituitary lobes. For each signal, identify its site of synthesis, transport route and site of action.",
        "KZ": "Аденогипофиз көбіне басқа жолмен реттеледі: ұсақ жасушалы нейрондар рилизинг және тежегіш факторларды ортаңғы дөңестің бастапқы капилляр торына бөледі; олар қақпалық тамырлармен алдыңғы бөлікке жетіп, без жасушаларының секрециясын өзгертеді. Гипофиздің екі бөлігіне бірдей аксондық жолды көрсету дұрыс емес. Әр сигналдың синтез орнын, жеткізілу жолын және әсер ететін орнын анықтаңыз."
      }
    ]
  },
  {
    "id": "osmotic-and-volume-thirst",
    "head": {
      "RU": "Жажда: осмотический и объёмный сигналы",
      "EN": "Thirst: osmotic and volume-related signals",
      "KZ": "Шөлдеу: осмостық және көлемдік сигналдар"
    },
    "paragraphs": [
      {
        "RU": "Повышение эффективной осмоляльности плазмы активирует осмочувствительные сети переднего гипоталамуса и околожелудочковых органов, в том числе сосудистого органа терминальной пластинки. Это способствует жажде и секреции вазопрессина. Важно отличать эффективные осмотические стимулы от простой суммы всех растворённых частиц: не каждое изменение измеренной осмоляльности одинаково изменяет движение воды через клеточные мембраны.",
        "EN": "Increased effective plasma osmolality activates osmosensitive networks in the anterior hypothalamus and circumventricular structures, including the organum vasculosum of the lamina terminalis. This promotes thirst and vasopressin release. Effective osmotic stimuli should not be confused with the total number of dissolved particles: not every change in measured osmolality shifts water across cell membranes equally.",
        "KZ": "Плазманың тиімді осмолялдығы артқанда алдыңғы гипоталамус пен қарыншамаңы құрылымдарының, соның ішінде соңғы пластинканың тамырлы органының осмосезімтал желілері белсендіріледі. Бұл шөлдеуді және вазопрессин бөлінуін күшейтеді. Тиімді осмостық әсерді еріген бөлшектердің жалпы санымен шатастырмаңыз: өлшенген осмолялдықтың әр өзгерісі жасуша мембранасы арқылы су қозғалысына бірдей ықпал етпейді."
      },
      {
        "RU": "Тиімді айналымдағы көлем азайса, жажда может усиливаться даже при неизменной осмоляльности: участвуют барорецепторные сигналы и ренин–ангиотензиновая система; ангиотензин II действует, в частности, через субфорникальный орган. Осмотический и гемодинамический пути взаимодействуют, но не тождественны. Жажда — поведенческий выход, а вазопрессин — гормональный; сила каждого ответа зависит от контекста и обратной связи.",
        "EN": "When effective circulating volume falls, thirst can rise even without a change in osmolality. Baroreceptor pathways and the renin–angiotensin system contribute; angiotensin II acts in part through the subfornical organ. Osmotic and haemodynamic pathways interact but are not identical. Thirst is a behavioural output and vasopressin a hormonal output; the magnitude of each depends on context and feedback.",
        "KZ": "Тиімді айналымдағы қан көлемі азайса, осмолялдық өзгермесе де шөлдеу күшеюі мүмкін. Бұған барорецепторлық сигналдар мен ренин–ангиотензин жүйесі қатысады; ангиотензин II, соның ішінде, субфорникалық орган арқылы әсер етеді. Осмостық және гемодинамикалық жолдар өзара байланысқанымен, бірдей емес. Шөлдеу — мінез-құлықтық, ал вазопрессин — гормондық жауап; олардың күші жағдай мен кері байланысқа тәуелді."
      }
    ]
  },
  {
    "id": "vasopressin-kidney-feedback",
    "head": {
      "RU": "Вазопрессин, почка и отрицательная обратная связь",
      "EN": "Vasopressin, kidney and negative feedback",
      "KZ": "Вазопрессин, бүйрек және теріс кері байланыс"
    },
    "paragraphs": [
      {
        "RU": "Вазопрессин выделяется из окончаний гипоталамических нейронов в нейрогипофизе. В почках он связывается преимущественно с V2-рецепторами главных клеток собирательных трубочек, активирует сигнальный путь Gs–цАМФ и способствует включению аквапорина-2 в апикальную мембрану. При сохранённом осмотическом градиенте мозгового вещества это повышает реабсорбцию воды, уменьшает её потерю с мочой и помогает снизить повышенную осмоляльность плазмы.",
        "EN": "Vasopressin is released from hypothalamic neuronal terminals in the posterior pituitary. In the kidney it acts mainly at V2 receptors on collecting-duct principal cells, activates Gs–cAMP signalling and promotes aquaporin-2 insertion into the apical membrane. With an intact medullary osmotic gradient, water reabsorption rises, urinary water loss falls and elevated plasma osmolality tends to decrease.",
        "KZ": "Вазопрессин гипоталамус нейрондарының ұштарынан нейрогипофизде бөлінеді. Бүйректе ол жинағыш түтікшелердің негізгі жасушаларындағы V2-рецепторларға әсер етіп, Gs–цАМФ сигналдық жолын белсендіреді және аквапорин-2 арналарының апикалдық мембранаға енгізілуін күшейтеді. Бүйрек милы қабатының осмостық градиенті сақталса, су қайта сіңірілуі артып, несеппен су жоғалту азаяды және жоғарылаған плазма осмолялдығы төмендеуге бейім болады."
      },
      {
        "RU": "Это регулирующая петля, а не гарантия фиксированного объёма мочи: результат зависит от функции почек, доставки растворённых веществ, состояния собирательных трубочек и доступности воды. Полиурия может иметь центральные, почечные и осмотические причины. По одному значению диуреза нельзя установить поражение гипоталамуса или самостоятельно назначать водную нагрузку, ограничение воды либо гормональный препарат.",
        "EN": "This is a feedback loop, not a promise of a fixed urine volume: the outcome depends on renal function, solute delivery, collecting-duct responsiveness and water availability. Polyuria may have central, renal or osmotic causes. Urine volume alone cannot localise a hypothalamic lesion or justify unsupervised water loading, water deprivation or hormone treatment.",
        "KZ": "Бұл кері байланыс жүйесі несеп көлемін тұрақты санға бекітпейді: нәтиже бүйрек қызметіне, еріген заттардың жеткізілуіне, жинағыш түтікшелердің жауабына және судың қолжетімділігіне тәуелді. Полиурияның орталық, бүйректік немесе осмостық себептері болуы мүмкін. Тек диурезге қарап гипоталамус зақымын анықтауға, өз бетімен су жүктемесін, сусыздандыру сынамасын немесе гормондық емді ұсынуға болмайды."
      }
    ]
  },
  {
    "id": "temperature-circadian-feeding",
    "head": {
      "RU": "Температура, циркадные ритмы и питание: распределённые контуры",
      "EN": "Temperature, circadian rhythms and feeding: distributed circuits",
      "KZ": "Температура, тәуліктік ырғақ және қоректену: таралған тізбектер"
    },
    "paragraphs": [
      {
        "RU": "Преоптическая область переднего гипоталамуса интегрирует тепловые сигналы и участвует в запуске механизмов теплоотдачи; другие гипоталамические и стволовые цепи участвуют в теплопродукции и защите от холода. Кожная температура, температура внутренних тканей и поведение влияют на ответ. Схема «один центр нагрева — один центр охлаждения» полезна лишь как грубое приближение и не заменяет описания рецепторов, эффекторных путей и обратной связи.",
        "EN": "The preoptic region of the anterior hypothalamus integrates thermal inputs and helps recruit heat-loss responses; other hypothalamic and brainstem circuits contribute to heat production and cold defence. Skin temperature, deep-body temperature and behaviour influence the outcome. A single 'heating centre' opposed to a single 'cooling centre' is only a rough teaching shortcut, not a substitute for receptors, effector pathways and feedback.",
        "KZ": "Алдыңғы гипоталамустың преоптикалық аймағы жылулық сигналдарды біріктіріп, жылу беруді арттыратын жауаптарға қатысады; басқа гипоталамустық және ми бағаны тізбектері жылу өндіру мен суықтан қорғануға қатысады. Жауапқа тері, ішкі тіндер температурасы және мінез-құлық әсер етеді. «Бір жылыту орталығы — бір салқындату орталығы» сызбасы тек қарапайым түсіндірме, ол рецепторларды, эффекторлық жолдарды және кері байланысты алмастырмайды."
      },
      {
        "RU": "Супрахиазматическое ядро получает информацию об освещённости по ретиногипоталамическому пути и синхронизирует циркадные ритмы; оно не является единственным генератором всех суточных колебаний. Регуляция аппетита включает дугообразное, паравентрикулярное и другие ядра, а также гормональные сигналы и связи с корой и стволом. Изолированная модель «центра голода» и «центра насыщения» не отражает сетевую физиологию.",
        "EN": "The suprachiasmatic nucleus receives light-related input through the retinohypothalamic tract and synchronises circadian timing; it is not the sole generator of every daily rhythm. Feeding control involves arcuate, paraventricular and other nuclei, peripheral hormonal signals and cortical and brainstem connections. A single hunger centre opposed to a single satiety centre does not capture this network physiology.",
        "KZ": "Супрахиазматикалық ядро жарық туралы ақпаратты торлы қабық–гипоталамус жолымен алып, тәуліктік ырғақтарды сәйкестендіреді; ол барлық тәуліктік өзгерістердің жалғыз генераторы емес. Тәбетті реттеуге доғалық, паравентрикулярлық және басқа ядролар, шеткі гормондық сигналдар, қыртыс пен ми бағанымен байланыстар қатысады. «Бір аштық орталығы — бір тоқтық орталығы» моделі бұл желілік физиологияны толық сипаттамайды."
      }
    ]
  },
  {
    "id": "hypothalamic-clinical-inference",
    "head": {
      "RU": "Учебный эксперимент и границы клинического вывода",
      "EN": "Teaching experiments and limits of clinical inference",
      "KZ": "Оқу тәжірибесі және клиникалық қорытындының шегі"
    },
    "paragraphs": [
      {
        "RU": "Для безопасного мысленного эксперимента сравните два независимых условия при сохранённой функции почек: А — рост эффективной осмоляльности без существенной потери объёма; Б — снижение эффективного объёма при прежней осмоляльности. Для каждого укажите входной сигнал, возможные изменения жажды и вазопрессина, эффект на почку и направление обратной связи. Не утверждайте, что величина ответа одинакова или что одна переменная доказывает диагноз.",
        "EN": "For a safe thought experiment, compare two independent conditions with preserved kidney function: A, increased effective osmolality without substantial volume loss; B, reduced effective circulating volume with unchanged osmolality. For each, identify the input, possible changes in thirst and vasopressin, renal effect and feedback direction. Do not assume identical response sizes or infer a diagnosis from one variable.",
        "KZ": "Қауіпсіз ойша тәжірибеде бүйрек қызметі сақталған екі бөлек жағдайды салыстырыңыз: А — көлем айтарлықтай азаймай, тиімді осмолялдықтың артуы; Б — осмолялдық өзгермей, тиімді айналым көлемінің кемуі. Әр жағдайда кіріс сигналын, шөлдеу мен вазопрессиннің ықтимал өзгерісін, бүйректегі әсерін және кері байланыс бағытын көрсетіңіз. Жауап шамасы бірдей немесе бір көрсеткіш диагнозды дәлелдейді деп тұжырымдамаңыз."
      },
      {
        "RU": "Вегетативные пробы с частотой сердечных сокращений, артериальным давлением или кожным ответом отражают суммарную работу периферических рецепторов, стволовых центров и надсегментарной регуляции. Они не записывают активность конкретного ядра гипоталамуса. Для клинической локализации нужны контекст и независимые данные; провокационные пробы и ограничение воды не являются самостоятельными учебными опытами.",
        "EN": "Autonomic tests involving heart rate, blood pressure or skin responses reflect integrated peripheral, brainstem and suprasegmental mechanisms. They do not record the activity of a particular hypothalamic nucleus. Clinical localisation requires context and independent evidence; provocative testing and water deprivation are not unsupervised classroom experiments.",
        "KZ": "Жүрек соғу жиілігін, артериялық қысымды немесе тері жауабын бағалайтын вегетативтік сынамалар шеткі рецепторлар, ми бағаны орталықтары және жоғары деңгейлі реттеудің жиынтық әсерін көрсетеді. Олар гипоталамустың нақты бір ядросының белсенділігін тікелей тіркемейді. Клиникалық оқшаулау үшін қосымша деректер қажет; арандатушы сынамалар мен суды шектеу өз бетімен жасалатын оқу тәжірибесіне жатпайды."
      }
    ]
  }
];

export function createModuleFifteenTheory(
  language: Language,
  base: Lesson & { kind: "theory" }
): Lesson & { kind: "theory" } {
  return {
    ...base,
    sections: [
      ...base.sections,
      ...sections.map(section => ({
        id: section.id,
        title: section.head[language],
        blocks: section.paragraphs.map(paragraph => ({
          type: "paragraph" as const,
          text: paragraph[language]
        }))
      }))
    ]
  };
}
