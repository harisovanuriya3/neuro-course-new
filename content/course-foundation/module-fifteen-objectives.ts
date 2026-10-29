import type { Language } from "../course";
import { getSectionTitle } from "../sections";
import type { ObjectivesLesson } from "../study";

// Module 15: hypothalamic homeostasis. Direct reading from the user's Library:
// Guyton & Hall, Textbook of Medical Physiology, 13e, chapter 59,
// printed pp. 754–757 (PDF pp. 721–724): temperature, thirst and water regulation.
// Ganong, Review of Medical Physiology, 23e, chapter 18,
// printed pp. 273–280 (PDF pp. 285–292): hypothalamic-pituitary connections,
// independent osmotic/volume drives to drink, AVP and temperature.
// C. L. Ghai, A Textbook of Practical Physiology, 8e,
// printed pp. 240–243 (PDF pp. 262–265): peripheral autonomic function tests.
// Ghai's tests are not direct tests of hypothalamic nuclei.
// Learning objectives are not a diagnostic or treatment protocol.
type Goal = readonly [title: string, description: string];
type FiveGoals = readonly [Goal, Goal, Goal, Goal, Goal];

const goals: Record<Language, FiveGoals> = {
  RU: [
    ["Проследить нервные и сосудистые связи гипоталамуса с гипофизом",
      "На схеме различить супраоптическое и паравентрикулярное ядра, аксоны к нейрогипофизу и портальную сосудистую систему аденогипофиза. Объяснить, что вазопрессин и окситоцин синтезируются в гипоталамических нейронах и выделяются из их окончаний в задней доле, а регуляция передней доли происходит преимущественно через рилизинг- и ингибирующие гормоны портальной крови."],
    ["Разделить осмотический и объёмный стимулы жажды",
      "При повышении эффективной осмоляльности объяснить роль осморецепторов переднего гипоталамуса и околожелудочковых органов; при снижении эффективного объёма циркуляции — участие барорецепторов и ангиотензина II. Сопоставить жажду как поведенческий ответ с выделением вазопрессина как гормональным ответом, не считать их полностью идентичными."],
    ["Объяснить сохранение воды почками через вазопрессин",
      "Проследить последовательность: осмотический или гемодинамический сигнал → гипоталамические нейроны → нейрогипофиз → вазопрессин в крови → V2-рецепторы собирательных трубочек и увеличение водной проницаемости. Указать, что результат зависит от функции почек и водного доступа, а изменение объёма мочи само по себе не локализует нарушение в гипоталамусе."],
    ["Сопоставить терморегуляцию, питание и суточные ритмы",
      "Объяснить роль преоптической области в интеграции температурных сигналов, супрахиазматического ядра в синхронизации циркадных ритмов и взаимодействующих гипоталамических контуров питания. Отличить регулируемые ответы от устаревшей схемы одного изолированного «центра голода» или «центра насыщения»."],
    ["Построить безопасный прогноз и указать границы вывода",
      "Для двух учебных ситуаций — гиперосмоляльности без выраженного снижения объёма и уменьшения эффективного объёма при неизменной осмоляльности — предсказать возможные изменения жажды и вазопрессина, обозначить исходные допущения и обратную связь. Объяснить, почему частота пульса, давление и вегетативные пробы не измеряют непосредственно активность гипоталамических ядер; не предлагать небезопасное ограничение воды или самостоятельные клинические пробы."]
  ],
  EN: [
    ["Trace the neural and vascular links between hypothalamus and pituitary",
      "On a diagram distinguish the supraoptic and paraventricular nuclei, axons to the neurohypophysis, and the hypophysial portal vessels supplying the anterior pituitary. Explain that vasopressin and oxytocin are synthesized in hypothalamic neurons and released from terminals in the posterior lobe, whereas anterior-pituitary regulation mainly uses releasing and inhibiting hormones delivered through portal blood."],
    ["Distinguish osmotic from volume-related drives to drink",
      "For increased effective plasma osmolality explain the contribution of anterior hypothalamic osmosensors and circumventricular organs; for reduced effective circulating volume discuss baroreceptor input and angiotensin II. Compare thirst as a behavioral response with vasopressin secretion as a hormonal response without assuming that the two are identical."],
    ["Explain renal water conservation through vasopressin",
      "Trace an osmotic or hemodynamic input through hypothalamic neurons, the neurohypophysis and circulating vasopressin to V2 receptors in collecting ducts and increased water permeability. State that the response also depends on kidney function and access to water; a change in urine volume alone cannot localize dysfunction to the hypothalamus."],
    ["Compare thermoregulation, feeding and circadian timing",
      "Explain the preoptic area's role in integrating thermal information, the suprachiasmatic nucleus in synchronizing circadian rhythms, and interacting hypothalamic networks that regulate feeding. Distinguish coordinated control circuits from an oversimplified picture of one isolated hunger center or one isolated satiety center."],
    ["Predict responses safely and explain limits of inference",
      "For two educational scenarios—increased effective osmolality without major volume loss, and reduced effective circulating volume with unchanged osmolality—predict plausible thirst and vasopressin responses while stating assumptions and negative feedback. Explain why heart rate, blood pressure and autonomic function tests do not directly measure individual hypothalamic nuclei; do not propose unsafe water restriction or unsupervised clinical tests."]
  ],
  KZ: [
    ["Гипоталамус пен гипофиздің жүйкелік және тамырлық байланыстарын көрсету",
      "Сызбада супраоптикалық және паравентрикулярлық ядроларды, нейрогипофизге баратын аксондарды және аденогипофиздің қақпалық қан тамырларын ажырату. Вазопрессин мен окситоцин гипоталамус нейрондарында синтезделіп, артқы бөліктегі аксон ұштарынан бөлінетінін; ал алдыңғы бөліктің реттелуі көбіне қақпалық қан арқылы келетін либериндер мен тежегіш гормондарға тәуелді екенін түсіндіру."],
    ["Шөлдеудің осмостық және көлемдік себептерін ажырату",
      "Плазманың тиімді осмоляльдылығы жоғарылағанда алдыңғы гипоталамустың осмосезгіш нейрондары мен қарыншамаңы мүшелерінің рөлін түсіндіру; айналымдағы тиімді қан көлемі азайғанда барорецепторлар мен ангиотензин II ықпалын сипаттау. Шөлдеуді мінез-құлық жауабы, ал вазопрессин бөлінуін гормондық жауап ретінде салыстыру; оларды толық бірдей деп қарастырмау."],
    ["Вазопрессиннің бүйректе суды сақтау әсерін түсіндіру",
      "Осмостық немесе гемодинамикалық сигналдан гипоталамус нейрондары, нейрогипофиз және қанға бөлінген вазопрессин арқылы жинағыш түтікшелердің V2-рецепторларына дейінгі тізбекті көрсету. Су өткізгіштігінің артуын түсіндіру; жауап бүйрек қызметіне және судың қолжетімділігіне тәуелді екенін, зәр көлемінің жеке өзгерісі гипоталамус зақымын дәлелдемейтінін айту."],
    ["Жылу реттелуін, қоректенуді және тәуліктік ырғақтарды салыстыру",
      "Температуралық ақпаратты біріктірудегі преоптикалық аймақтың, циркадтық ырғақты синхрондаудағы супрахиазматикалық ядроның және қоректенуді реттейтін өзара байланысқан гипоталамустық желілердің қызметін түсіндіру. Реттелу тетіктерін жеке ғана «аштық орталығы» немесе «тою орталығы» туралы тым қарапайым үлгіден ажырату."],
    ["Қауіпсіз болжам жасап, қорытындының шегін белгілеу",
      "Екі оқу жағдайында — айқын көлем жоғалтусыз тиімді осмоляльдылықтың артуы және осмоляльдылық өзгермей тиімді айналым көлемінің кемуі — шөлдеу мен вазопрессиннің ықтимал өзгерісін, бастапқы жорамалдар мен кері байланысты көрсету. Жүрек соғу жиілігі, қан қысымы және вегетативтік сынамалар гипоталамустың жеке ядроларын тікелей өлшемейтінін түсіндіру; қауіпті су шектеуін немесе өз бетінше клиникалық сынақ жасауды ұсынбау."]
  ]
};

export function createModuleFifteenObjectives(language: Language): ObjectivesLesson {
  return {
    kind: "objectives",
    title: getSectionTitle("objectives", language),
    introduction: language === "RU" ? "После изучения модуля студент сможет:"
      : language === "EN" ? "After completing this module, the student will be able to:"
      : "Модульді аяқтағаннан кейін студент:",
    outcomes: goals[language].map(([title, description], index) => ({
      id: "module-15-objective-" + (index + 1), title, description
    })),
    navigation: {
      title: language === "RU" ? "Перейти к изучению модуля"
        : language === "EN" ? "Continue learning" : "Модульді оқуға өту",
      pathwayLabel: language === "RU" ? "Рекомендуемый маршрут"
        : language === "EN" ? "Recommended pathway" : "Ұсынылатын оқу бағыты",
      links: [
        { section: "pretest" }, { section: "theory" }, { section: "interactive" },
        { section: "practice" }, { section: "cases" }
      ]
    }
  };
}
