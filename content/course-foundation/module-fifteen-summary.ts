import type { Language } from "../course";
import { getSectionTitle } from "../sections";
import type { ReadingLesson } from "../study";

// Module 15: authored five-point physiology summary, not a diagnostic protocol.
// Evidence checked in Library: Guyton & Hall 13e ch. 59 and ch. 74;
// Ganong 23e ch. 18 and ch. 39; Ghai Practical Physiology 8e autonomic testing.
// Ghai's peripheral tests cannot directly localize hypothalamic nuclei.
// Original explanatory language, without textbook figures or copied paragraphs.
type Takeaway = { title: string; explanation: string };
type FiveTakeaways = readonly [Takeaway, Takeaway, Takeaway, Takeaway, Takeaway];
const takeaways: Record<Language, FiveTakeaways> = {
  "RU": [
    {
      "title": "Гипофиз регулируется двумя путями",
      "explanation": "Супраоптическое и паравентрикулярное ядра синтезируют вазопрессин и окситоцин; аксоны крупных нейронов доставляют их к нейрогипофизу. Передняя доля регулируется преимущественно факторами, поступающими из срединного возвышения по портальным сосудам. Нельзя изображать обе связи как одинаковый аксональный путь."
    },
    {
      "title": "Жажда и вазопрессин имеют разные входы",
      "explanation": "Повышение эффективной осмоляльности активирует осмочувствительные сети, включая OVLT. Уменьшение эффективного циркулирующего объёма может усиливать жажду и вазопрессин через барорецепторы и ангиотензин II даже без роста осмоляльности. Поведенческий ответ питья и гормональное сохранение воды дополняют друг друга."
    },
    {
      "title": "Вазопрессин сохраняет воду через почки",
      "explanation": "Вазопрессин связывается с V2-рецепторами главных клеток собирательных трубочек и через Gs–цАМФ способствует вставке аквапорина-2 в апикальную мембрану. Проницаемость для воды возрастает, но итоговое концентрирование мочи также зависит от мозгового осмотического градиента и функции почек. Один диурез не локализует поражение гипоталамуса."
    },
    {
      "title": "Терморегуляция использует несколько эффекторов",
      "explanation": "Преоптическая область и связанные гипоталамические сети интегрируют центральные и периферические температурные сигналы. При перегревании возможны кожная вазодилатация и потоотделение; при охлаждении — вазоконстрикция и дрожь. Высокая влажность ограничивает испарение пота: высокая температура при нагрузке не равнозначна лихорадке со сдвигом установочной точки."
    },
    {
      "title": "Ритмы, питание и клинические выводы",
      "explanation": "Супрахиазматическое ядро синхронизирует суточные ритмы с освещённостью, а питание регулируют распределённые гипоталамические и вне-гипоталамические сети, а не один «центр голода». Пульс, давление и обычные вегетативные пробы оценивают периферический ответ, но не измеряют активность отдельного гипоталамического ядра."
    }
  ],
  "EN": [
    {
      "title": "Two distinct hypothalamic–pituitary routes",
      "explanation": "Supraoptic and paraventricular magnocellular neurons synthesize vasopressin and oxytocin, and their axons terminate in the posterior pituitary. The anterior pituitary is regulated mainly by factors reaching it from the median eminence through portal vessels. The two routes must not be drawn as identical axonal connections."
    },
    {
      "title": "Thirst and vasopressin respond to different inputs",
      "explanation": "Increased effective osmolality recruits osmosensitive networks, including the OVLT. Reduced effective circulating volume can stimulate thirst and vasopressin through baroreceptor signals and angiotensin II even without an osmolality rise. Drinking behavior and hormonal renal water conservation are complementary, not identical, outputs."
    },
    {
      "title": "Vasopressin conserves water through the kidney",
      "explanation": "Vasopressin activates V2 receptors on collecting-duct principal cells; Gs–cAMP signaling promotes insertion of aquaporin-2 into the apical membrane. Water permeability increases, but urine concentration also depends on the renal medullary osmotic gradient and kidney function. Urine output alone cannot localize a disorder to the hypothalamus."
    },
    {
      "title": "Thermoregulation recruits multiple effectors",
      "explanation": "The preoptic area and connected hypothalamic networks integrate central and peripheral thermal signals. Heat responses include cutaneous vasodilation and sweating; cold responses include vasoconstriction and shivering. High humidity limits sweat evaporation, so a rise in core temperature during exercise is not by itself evidence of fever with a raised set point."
    },
    {
      "title": "Circadian, feeding and clinical limits",
      "explanation": "The suprachiasmatic nucleus synchronizes daily rhythms with environmental light, while feeding depends on distributed hypothalamic and extra-hypothalamic circuits rather than a single hunger center. Pulse, blood pressure and routine autonomic tests describe peripheral responses, not direct activity measurements of an individual hypothalamic nucleus."
    }
  ],
  "KZ": [
    {
      "title": "Гипоталамус пен гипофизді екі бөлек жол байланыстырады",
      "explanation": "Супраоптикалық және паравентрикулярлық ядролардың ірі жасушалы нейрондары вазопрессин мен окситоцинді синтездейді; олардың аксондары нейрогипофизге жетеді. Аденогипофиз негізінен ортаңғы дөңестен қақпалық тамырлармен келетін реттеуші факторлар арқылы басқарылады. Екі байланысты бірдей аксондық жол деп көрсету дұрыс емес."
    },
    {
      "title": "Шөлдеу мен вазопрессин әртүрлі сигналдарға жауап береді",
      "explanation": "Тиімді осмоляльдылықтың артуы OVLT кіретін осмосезгіш желілерді белсендіреді. Тиімді айналымдағы қан көлемі азайса, осмоляльдылық өспесе де барорецепторлар мен ангиотензин II арқылы шөлдеу және вазопрессин бөлінуі күшеюі мүмкін. Су ішу әрекеті мен бүйректегі суды гормондық сақтау бірін-бірі толықтырады."
    },
    {
      "title": "Вазопрессин бүйректе суды сақтауға көмектеседі",
      "explanation": "Вазопрессин жинағыш түтікшелердің негізгі жасушаларындағы V2-рецепторларды белсендіреді; Gs–цАМФ жолы аквапорин-2-нің апикалдық мембранаға орналасуын күшейтеді. Су өткізгіштігі артады, бірақ зәрдің қоюлануы бүйрек ми затының осмостық градиентіне және бүйрек қызметіне де тәуелді. Диурездің жеке өзгерісі гипоталамус зақымын дәлелдемейді."
    },
    {
      "title": "Жылу реттелуінде бірнеше эффектор қатысады",
      "explanation": "Преоптикалық аймақ пен оған байланысқан гипоталамустық желілер орталық және шеткі температуралық сигналдарды біріктіреді. Ыстықта тері тамырлары кеңейіп, тер бөлінуі мүмкін; суықта тамырлар тарылып, қалтырау туындайды. Жоғары ылғалдылық тердің булануын шектейді, сондықтан жүктемеде ішкі температураның көтерілуі реттелетін деңгейі жоғарылаған қызбаны өздігінен дәлелдемейді."
    },
    {
      "title": "Тәуліктік ырғақ, қоректену және қорытынды шегі",
      "explanation": "Супрахиазматикалық ядро тәуліктік ырғақтарды жарықпен сәйкестендіреді; қоректенуді жалғыз «аштық орталығы» емес, өзара байланысқан гипоталамустық және басқа ми желілері реттейді. Пульс, қан қысымы және кәдімгі вегетативтік сынамалар шеткі жауапты көрсетеді, бірақ жеке гипоталамустық ядроның белсенділігін тікелей өлшемейді."
    }
  ]
};
const introductions: Record<Language, string> = {
  "RU": "Пять физиологических выводов о гипоталамусе: два пути к гипофизу, осмотические и объёмные сигналы, почечное действие вазопрессина, терморегуляция и границы функциональной локализации.",
  "EN": "Five physiological takeaways about the hypothalamus: two pituitary pathways, osmotic and volume signals, renal vasopressin action, thermoregulation, and limits of functional localization.",
  "KZ": "Гипоталамус туралы бес физиологиялық қорытынды: гипофизге баратын екі жол, осмостық және көлемдік сигналдар, вазопрессиннің бүйректегі әсері, жылу реттелуі және функцияны локализациялаудың шектері."
};
export function createModuleFifteenSummary(language: Language): ReadingLesson {
  return {
    kind: "one-minute",
    title: getSectionTitle("one-minute", language),
    introduction: introductions[language],
    cards: takeaways[language].map(({ title, explanation }, index) => ({
      id: "module-15-summary-" + (index + 1),
      title: (index + 1) + ". " + title,
      paragraphs: [explanation],
      links: [{ section: "theory" }, { section: "clinical" }],
    })),
  };
}
