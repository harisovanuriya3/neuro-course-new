import type { Language } from "../types";
import type { PretestLesson } from "../study";
const questions = [
  {
    "key": "vasopressin",
    "prompt": [
      "Где синтезируется вазопрессин, поступающий в нейрогипофиз?",
      "Where is vasopressin released from the posterior pituitary synthesized?",
      "Нейрогипофизден бөлінетін вазопрессин қайда түзіледі?"
    ],
    "options": [
      [
        "В аденогипофизе",
        "In the anterior pituitary",
        "Аденогипофизде"
      ],
      [
        "В магноцеллюлярных нейронах гипоталамуса",
        "In hypothalamic magnocellular neurons",
        "Гипоталамустың ірі жасушалы нейрондарында"
      ],
      [
        "В коре надпочечников",
        "In the adrenal cortex",
        "Бүйрекүсті безінің қыртысында"
      ],
      [
        "В почках",
        "In the kidneys",
        "Бүйректе"
      ]
    ],
    "answer": "b",
    "why": [
      "Вазопрессин синтезируется главным образом в супраоптическом и паравентрикулярном ядрах и высвобождается из нейрогипофиза.",
      "Vasopressin is mainly synthesized in the supraoptic and paraventricular nuclei and released from the posterior pituitary.",
      "Вазопрессин негізінен супраоптикалық және паравентрикулярлық ядроларда түзіліп, нейрогипофизден бөлінеді."
    ]
  },
  {
    "key": "fever",
    "prompt": [
      "Что принципиально отличает лихорадку от гипертермии?",
      "What principally distinguishes fever from hyperthermia?",
      "Қызбаны гипертермиядан ең алдымен не ажыратады?"
    ],
    "options": [
      [
        "Повышение регулируемой температурной установки при лихорадке",
        "A raised thermoregulatory set point in fever",
        "Қызба кезінде реттелетін температура деңгейінің жоғарылауы"
      ],
      [
        "Потоотделение только при лихорадке",
        "Sweating occurs only in fever",
        "Терлеу тек қызбада болады"
      ],
      [
        "Повышение кортизола только при гипертермии",
        "Cortisol rises only in hyperthermia",
        "Кортизол тек гипертермияда жоғарылайды"
      ],
      [
        "Отсутствие сосудистых реакций при гипертермии",
        "No vascular responses in hyperthermia",
        "Гипертермияда тамырлық жауаптар болмайды"
      ]
    ],
    "answer": "a",
    "why": [
      "При лихорадке медиаторы, включая PGE2, повышают регулируемую установку; гипертермия может возникать без этого.",
      "In fever, mediators including PGE2 raise the regulated set point; hyperthermia can occur without this change.",
      "Қызба кезінде PGE2 сияқты медиаторлар реттелетін деңгейді жоғарылатады; гипертермия онсыз да болуы мүмкін."
    ]
  },
  {
    "key": "water",
    "prompt": [
      "Что обычно происходит при росте эффективной осмоляльности плазмы у здорового человека?",
      "What usually happens when effective plasma osmolality rises in a healthy person?",
      "Дені сау адамда плазманың тиімді осмолялдығы артқанда әдетте не болады?"
    ],
    "options": [
      [
        "Снижаются жажда и вазопрессин",
        "Thirst and vasopressin decrease",
        "Шөлдеу мен вазопрессин азаяды"
      ],
      [
        "Повышается секреция пролактина как основной ответ",
        "Prolactin becomes the main response",
        "Негізгі жауап ретінде пролактин артады"
      ],
      [
        "Усиливаются жажда и секреция вазопрессина",
        "Thirst and vasopressin secretion increase",
        "Шөлдеу мен вазопрессин бөлінуі күшейеді"
      ],
      [
        "Полностью прекращается реабсорбция воды",
        "Water reabsorption stops completely",
        "Судың кері сіңірілуі толық тоқтайды"
      ]
    ],
    "answer": "c",
    "why": [
      "Осморецепторные сети стимулируют жажду и вазопрессин; почки удерживают больше воды при сохранной функции.",
      "Osmoreceptor networks stimulate thirst and vasopressin; functioning kidneys retain more water.",
      "Осморецепторлық желілер шөлдеу мен вазопрессинді арттырады; бүйрек су ұсталуын күшейтеді."
    ]
  },
  {
    "key": "circadian",
    "prompt": [
      "Какое ядро является основным циркадным синхронизатором?",
      "Which nucleus is the principal circadian pacemaker?",
      "Қай ядро негізгі циркадтық синхронизатор болып саналады?"
    ],
    "options": [
      [
        "Красное ядро",
        "Red nucleus",
        "Қызыл ядро"
      ],
      [
        "Хвостатое ядро",
        "Caudate nucleus",
        "Құйрықты ядро"
      ],
      [
        "Зубчатое ядро",
        "Dentate nucleus",
        "Тісті ядро"
      ],
      [
        "Супрахиазматическое ядро",
        "Suprachiasmatic nucleus",
        "Супрахиазматикалық ядро"
      ]
    ],
    "answer": "d",
    "why": [
      "Супрахиазматическое ядро получает световую информацию от сетчатки и координирует суточные ритмы.",
      "The suprachiasmatic nucleus receives retinal light input and coordinates daily rhythms.",
      "Супрахиазматикалық ядро торқабықтан жарық сигналдарын алып, тәуліктік ырғақтарды үйлестіреді."
    ]
  }
];
export function createModuleFifteenPretest(language: Language, moduleTitle: string, title: string): PretestLesson {
 const index = language === "RU" ? 0 : language === "EN" ? 1 : 2;
 return {kind:"pretest",title,introduction:[ "Проверьте исходные знания о гомеостазе и гипоталамусе.", "Check your starting knowledge of homeostasis and the hypothalamus.", "Гомеостаз бен гипоталамус туралы бастапқы біліміңізді тексеріңіз." ][index],questions:questions.map(q=>({id:"module-15-"+q.key,topic:moduleTitle,prompt:q.prompt[index],options:q.options.map((o,i)=>({id:(["a","b","c","d"] as const)[i],text:o[index]})),correctAnswer:q.answer as "a"|"b"|"c"|"d",explanation:q.why[index],target:{section:"theory" as const}}))};
}
