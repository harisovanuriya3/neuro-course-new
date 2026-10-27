import type { Language } from "../course";
import type { PretestLesson } from "../study";

// Module 12: basal ganglia, ungraded diagnostic pretest.
// Read against Guyton & Hall 13e, ch. 57, printed pp. 730–735 (Library PDF 697–702);
// Ganong 23e, ch. 16, printed pp. 250–253 (Library PDF 262–265);
// C. L. Ghai Practical Physiology 8e, printed pp. 285–287 (Library PDF 307–309).
// Direct/indirect pathway predictions are conditional teaching models, not diagnoses.
type Choice = "a" | "b" | "c" | "d";
type Item = {
  prompt: string;
  options: [string, string, string, string];
  answer: Choice;
  explanation: string;
};
type Locale = { intro: string; questions: [Item, Item, Item] };

const localized: Record<Language, Locale> = {
  RU: {
    intro: "Три диагностических вопроса по прямому и непрямому путям базальных ганглиев, дофаминовой модуляции и двигательным признакам. Это предварительная самопроверка, а не итоговый экзамен. Вопросы используют упрощённую каноническую модель; по одному признаку нельзя ставить диагноз.",
    questions: [
      {
        prompt: "В условной модели избирательно усиливают активность стриарных нейронов прямого пути, проецирующихся на GPi/SNr. Остальные входы фиксированы. Как изменится таламическое звено согласно канонической схеме?",
        options: [
          "GPi/SNr сильнее тормозят таламус, потому что стриарные проекции прямого пути возбуждают выходные ядра.",
          "Стриарное ГАМК-ергическое торможение GPi/SNr усиливается; их тоническое торможение таламуса ослабевает, облегчая выбранное действие.",
          "Прямой путь обходит выходные ядра и непосредственно активирует спинальные мотонейроны без участия таламуса.",
          "Таламус полностью выключается, потому что все связи стриатума с бледным шаром являются возбуждающими."
        ],
        answer: "b",
        explanation: "В канонической схеме нейроны прямого пути стриатума тормозят выходные ядра GPi/SNr с помощью ГАМК. Поскольку GPi/SNr обычно тонически тормозят таламические мишени, снижение их активности может растормозить таламокорковую передачу и облегчить выбранную программу. Это условный прогноз для указанной популяции, а не универсальное правило для всех движений: реальные прямой, непрямой и гиперпрямой пути действуют совместно."
      },
      {
        prompt: "В учебной модели уменьшают дофаминергический вход от компактной части чёрной субстанции (SNc) к стриатуму. Какой прогноз соответствует типичным эффектам D1- и D2-рецепторов в канонической схеме?",
        options: [
          "Снижение дофамина одинаково возбуждает все стриарные нейроны и поэтому всегда ускоряет начало движения.",
          "Дофамин действует только на мышечные волокна, поэтому изменение SNc не может влиять на корково-подкорковые петли.",
          "Уменьшение дофамина обязательно вызывает изолированную слабость мышцы при нормальной скорости выбора действия.",
          "Ослабляется D1-зависимое облегчение прямого пути и снимается часть D2-зависимого подавления непрямого пути; возможно усиление тормозного выхода GPi/SNr."
        ],
        answer: "d",
        explanation: "Дофаминергические нейроны SNc модулируют стриатум. В упрощённой модели дофамин облегчает активность D1-популяции прямого пути и подавляет D2-популяцию непрямого пути. При уменьшении дофамина баланс может сместиться к более сильному тормозному выходу GPi/SNr на таламические мишени, затрудняя запуск или масштабирование действия. Это не точное предсказание отдельного симптома и не доказательство диагноза; реальные сети содержат дополнительные связи."
      },
      {
        prompt: "В двух учебных наблюдениях: A — действие начинается медленнее, но максимальная сила сокращения сохранена; B — движение начинается вовремя, однако рука регулярно промахивается мимо цели. Какое сравнение наиболее обосновано?",
        options: [
          "A иллюстрирует брадикинезию/затруднение запуска, совместимые с нарушением двигательных контуров базальных ганглиев; B — дисметрию, чаще связанную с мозжечковыми сетями.",
          "A обязательно означает повреждение нижнего мотонейрона, а B — недостаток дофамина в каждой мышце конечности.",
          "Оба наблюдения доказывают одну и ту же локализацию в GPi, поскольку все двигательные ошибки происходят в бледном шаре.",
          "B показывает полное отсутствие сенсорной информации, а A доказывает невозможность мышечного сокращения из-за разрыва аксона."
        ],
        answer: "a",
        explanation: "Замедление начала или выполнения действия при сохранной максимальной силе следует отличать от первичной мышечной слабости. Брадикинезия может сопровождать дисфункцию базально-ганглионарных контуров. Промахивание мимо цели (дисметрия) указывает на нарушение точности и коррекции движения, часто с участием мозжечка. Ни одно наблюдение само по себе не устанавливает анатомический очаг или клинический диагноз."
      }
    ]
  },
  EN: {
    intro: "Three ungraded diagnostic questions on direct and indirect basal-ganglia pathways, dopamine modulation, and motor signs. This is an initial self-check, not a final examination. Predictions use a simplified canonical circuit model; a single sign cannot establish a clinical diagnosis.",
    questions: [
      {
        prompt: "In a schematic model, activity is selectively increased in direct-pathway striatal neurons projecting to GPi/SNr. Other inputs remain fixed. What happens to the thalamic component in the canonical circuit?",
        options: [
          "GPi/SNr inhibit the thalamus more strongly because direct-pathway striatal projections excite the output nuclei.",
          "Striatal GABAergic inhibition of GPi/SNr increases; their tonic inhibition of the thalamus decreases, facilitating a selected action.",
          "The direct pathway bypasses output nuclei and directly excites spinal motor neurons without any thalamic contribution.",
          "The thalamus is completely silenced because every connection between striatum and globus pallidus is excitatory."
        ],
        answer: "b",
        explanation: "In the canonical circuit, direct-pathway striatal neurons inhibit GPi/SNr output nuclei via GABA. Because GPi/SNr normally exert tonic inhibition on thalamic targets, reducing their activity can disinhibit thalamocortical transmission and facilitate a selected action. This prediction is conditional on the specified population, not a universal rule for movement: direct, indirect, and hyperdirect pathways interact in real networks."
      },
      {
        prompt: "In a teaching model, dopaminergic input from the substantia nigra pars compacta (SNc) to the striatum is reduced. Which prediction fits the typical D1- and D2-receptor effects in the canonical model?",
        options: [
          "Less dopamine excites all striatal neurons equally and therefore always accelerates movement initiation.",
          "Dopamine acts only on muscle fibers, so changing SNc activity cannot influence cortico-subcortical loops.",
          "Reduced dopamine necessarily causes isolated muscle weakness while action-selection speed remains normal.",
          "D1-mediated facilitation of the direct pathway falls and D2-mediated suppression of the indirect pathway is reduced; GPi/SNr inhibitory output may increase."
        ],
        answer: "d",
        explanation: "SNc dopaminergic neurons modulate the striatum. In the simplified model, dopamine facilitates D1 direct-pathway neurons and suppresses D2 indirect-pathway neurons. With less dopamine, the balance may shift toward stronger inhibitory GPi/SNr output to thalamic targets, making action initiation or scaling more difficult. This does not predict one specific symptom or prove a diagnosis; real networks have additional connections."
      },
      {
        prompt: "Two teaching observations are compared: A — an action starts more slowly, but maximum contraction strength is preserved; B — movement starts on time, but the hand repeatedly overshoots its target. Which comparison is best supported?",
        options: [
          "A illustrates bradykinesia or initiation difficulty compatible with altered basal-ganglia motor circuits; B illustrates dysmetria, more often linked to cerebellar networks.",
          "A necessarily indicates a lower motor neuron lesion, while B indicates dopamine deficiency in each limb muscle.",
          "Both observations prove the same lesion in GPi because all motor errors arise exclusively in the globus pallidus.",
          "B demonstrates complete absence of sensory information, while A proves that axonal disruption prevents any muscle contraction."
        ],
        answer: "a",
        explanation: "Slower action initiation or execution with preserved maximum strength should be distinguished from primary muscle weakness. Bradykinesia can accompany basal-ganglia circuit dysfunction. Overshooting a target (dysmetria) reflects impaired movement accuracy and correction, often involving the cerebellum. Neither observation by itself localizes a lesion or establishes a clinical diagnosis."
      }
    ]
  },
  KZ: {
    intro: "Базальды ганглийлердің тікелей және жанама жолдары, дофаминдік реттелуі және қозғалыс белгілері туралы бағаланбайтын үш диагностикалық сұрақ. Бұл қорытынды емтихан емес, бастапқы өзіндік тексеру. Болжамдар жеңілдетілген канондық модельге негізделеді; бір белгімен клиникалық диагноз қоюға болмайды.",
    questions: [
      {
        prompt: "Шартты модельде GPi/SNr-ге проекцияланатын стриатумның тікелей жол нейрондарының белсенділігі таңдамалы түрде күшейтіледі. Басқа кірістер тұрақты. Канондық сызба бойынша таламусқа әсері қандай болады?",
        options: [
          "GPi/SNr таламусты күштірек тежейді, өйткені тікелей жолдың стриатумдық проекциялары шығыс ядроларын қоздырады.",
          "Стриатумнан GPi/SNr-ге ГАМҚ-ергиялық тежелу күшейеді; олардың таламусқа тұрақты тежеуші әсері азайып, таңдалған әрекет жеңілдеуі мүмкін.",
          "Тікелей жол шығыс ядроларын айналып өтіп, таламуссыз жұлын мотонейрондарын тікелей қоздырады.",
          "Стриатум мен бозғылт шар арасындағы барлық байланыстар қоздырушы болғандықтан, таламус толығымен өшеді."
        ],
        answer: "b",
        explanation: "Канондық сызбада стриатумның тікелей жол нейрондары GPi/SNr шығыс ядроларын ГАМҚ арқылы тежейді. GPi/SNr қалыпты жағдайда таламустық нысаналарды тұрақты тежейтіндіктен, олардың белсенділігі азайса, таламус-қыртыс арқылы сигнал өткізу тежелуден босап, таңдалған әрекет жеңілдеуі мүмкін. Бұл тек көрсетілген нейрондар тобына қатысты шартты болжам; нақты желіде тікелей, жанама және гипертікелей жолдар өзара әрекеттеседі."
      },
      {
        prompt: "Оқу моделінде қара субстанцияның ықшам бөлігінен (SNc) стриатумға баратын дофаминдік кіріс азайтылады. Канондық модельдегі D1 және D2 рецепторларының әдеттегі әсерлеріне қандай болжам сәйкес келеді?",
        options: [
          "Дофамин азайғанда стриатумның барлық нейрондары бірдей қозып, қозғалыстың басталуы міндетті түрде жылдамдайды.",
          "Дофамин тек бұлшықет талшықтарына әсер етеді, сондықтан SNc өзгерісі қыртыс-қыртысасты контурларына әсер ете алмайды.",
          "Дофамин азайса, әрекетті таңдау жылдамдығы сақталып, міндетті түрде тек бұлшықет әлсіздігі пайда болады.",
          "Тікелей жолдың D1-тәуелді жеңілдеуі әлсірейді, ал жанама жолдың D2-тәуелді тежелуі азаяды; GPi/SNr-дің тежеуші шығысы күшеюі мүмкін."
        ],
        answer: "d",
        explanation: "SNc-нің дофаминдік нейрондары стриатум қызметін реттейді. Жеңілдетілген модельде дофамин D1-рецепторлары бар тікелей жол нейрондарын белсендіруге, ал D2-рецепторлары бар жанама жол нейрондарын тежеуге ықпал етеді. Дофамин азайғанда GPi/SNr-дің таламусқа тежеуші әсері артып, әрекетті бастау не оның ауқымын реттеу қиындауы мүмкін. Бұл жеке симптомды дәл болжай алмайды және диагнозды дәлелдемейді; нақты желіде қосымша байланыстар бар."
      },
      {
        prompt: "Екі оқу бақылауы салыстырылады: A — әрекет баяу басталады, бірақ бұлшықеттің ең жоғары күші сақталған; B — қозғалыс уақытында басталады, алайда қол нысанадан қайта-қайта асып кетеді. Қандай салыстыру негіздірек?",
        options: [
          "A — базальды ганглийлердің қозғалыс контурлары бұзылғанда байқалуы мүмкін брадикинезия не бастаудың қиындауы; B — көбіне мишық желілерімен байланысты дисметрия.",
          "A міндетті түрде төменгі мотонейронның зақымын, ал B аяқ-қолдың әр бұлшықетіндегі дофамин тапшылығын көрсетеді.",
          "Екі бақылау да GPi-дегі бір ошақты дәлелдейді, өйткені қозғалыстың барлық қателері тек бозғылт шарда пайда болады.",
          "B сенсорлық ақпараттың толық жоғалғанын, ал A аксон үзілгендіктен бұлшықет мүлде жиырыла алмайтынын дәлелдейді."
        ],
        answer: "a",
        explanation: "Ең жоғары күш сақталғанымен әрекеттің баяу басталуын не орындалуын бастапқы бұлшықет әлсіздігінен ажырату керек. Брадикинезия базальды ганглийлер контурларының бұзылуымен қатар жүруі мүмкін. Нысанадан асып кету (дисметрия) қозғалыс дәлдігі мен түзетілуінің бұзылуын көрсетеді және көбіне мишықпен байланысты. Бір ғана бақылау зақым ошағын да, клиникалық диагнозды да анықтамайды."
      }
    ]
  }
};

export function createModuleTwelvePretest(language: Language, moduleTitle: string, title: string): PretestLesson {
  const data = localized[language];
  return {
    kind: "pretest",
    title,
    introduction: data.intro,
    questions: data.questions.map((item, index) => ({
      id: ["module-12-pretest-direct", "module-12-pretest-dopamine", "module-12-pretest-signs"][index],
      topic: moduleTitle,
      prompt: item.prompt,
      options: item.options.map((text, i) => ({ id: (["a", "b", "c", "d"] as const)[i], text })),
      correctAnswer: item.answer,
      explanation: item.explanation,
      target: { section: "theory" as const }
    }))
  };
}
