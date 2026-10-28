import type { Language } from "../course";
import type { GlossaryLesson } from "../study";

// Module 13, cerebellar physiology: independently written RU/EN/KZ definitions.
// Reviewed against Guyton & Hall 13e ch. 57 (PDF 690–692), Ganong 23e ch. 16
// (PDF 268–270), and C. L. Ghai Practical Physiology 8e (PDF 309–313).
// Clinical signs alone cannot establish a lesion site or diagnosis.
const baseDefinitions: Record<Language, string>[] = [
  {
    "RU": "Дисметрия — ошибка масштаба целенаправленного движения: рука или нога не достигает цели либо проходит за неё. Она выявляется, например, в пальценосовой пробе; сама по себе не доказывает локализацию очага и должна оцениваться вместе с силой, чувствительностью и другими признаками.",
    "EN": "Dysmetria is an error in the amplitude of goal-directed movement: a limb undershoots or overshoots its target. It can be assessed in a finger-to-nose task; alone it neither establishes lesion location nor excludes weakness or sensory deficits, which require separate examination.",
    "KZ": "Дисметрия — мақсатқа бағытталған қимылдың ауқымы бұзылып, қол не аяқ нысанаға жетпей қалуы немесе одан асып кетуі. Оны саусақ-мұрын сынамасында бағалауға болады; бұл белгі өздігінен зақым орнын дәлелдемейді, күш пен сезімталдықты бөлек тексеру қажет."
  },
  {
    "RU": "Двигательное обучение — зависящее от опыта изменение выполнения движения, которое может проявляться более точным временем, меньшей ошибкой и адаптацией к новым условиям. Мозжечковые цепи участвуют в такой адаптации вместе с другими сетями; улучшение результата не измеряет напрямую активность клеток Пуркинье.",
    "EN": "Motor learning is an experience-dependent change in movement performance, such as improved timing, reduced error or adaptation to altered conditions. Cerebellar circuits contribute alongside other networks; improved task performance is not a direct measurement of Purkinje-cell firing or a unique cerebellar biomarker.",
    "KZ": "Қимылға үйрену — тәжірибеге тәуелді қимыл орындаудың өзгеруі: уақыттың дәлденуі, қатенің азаюы не жаңа жағдайға бейімделу. Бұл үдеріске мишық контурлары басқа желілермен бірге қатысады; тапсырма нәтижесінің жақсаруы Пуркинье жасушалары белсенділігін тікелей өлшемейді."
  }
];
const extra: { id: string; anchor: string; term: Record<Language,string>; definition: Record<Language,string> }[] = [
  {
    "id": "vestibulocerebellum",
    "anchor": "cerebellar-functional-divisions",
    "term": {
      "RU": "Вестибулоцеребеллум",
      "EN": "Vestibulocerebellum",
      "KZ": "Вестибулоцеребеллум"
    },
    "definition": {
      "RU": "Клочково-узелковая доля и связанные с ней вестибулярные цепи участвуют в поддержании равновесия и координации движений глаз. Нарушение может сопровождаться неустойчивостью и нистагмом, но эти признаки не являются специфичными только для поражения мозжечка.",
      "EN": "The flocculonodular lobe and related vestibular circuits help regulate balance and eye movements. Dysfunction may be associated with disequilibrium or nystagmus, but neither sign is specific to a cerebellar lesion without further neurological assessment.",
      "KZ": "Мишықтың үлпекше-түйіншік бөлігі мен оған байланысты вестибулярлық контурлар тепе-теңдік пен көз қозғалысын үйлестіруге қатысады. Қызметі бұзылса, тұрақсыздық не нистагм байқалуы мүмкін, бірақ бұл белгілер тек мишық зақымына ғана тән емес."
    }
  },
  {
    "id": "spinocerebellum",
    "anchor": "cerebellar-functional-divisions",
    "term": {
      "RU": "Спиноцеребеллум",
      "EN": "Spinocerebellum",
      "KZ": "Спиноцеребеллум"
    },
    "definition": {
      "RU": "Червь и промежуточные зоны мозжечка получают сведения о положении и движении тела и участвуют в коррекции позы и движений конечностей. Название отражает преобладающие связи, а не отдельный изолированный орган или единственный источник постурального контроля.",
      "EN": "The vermis and intermediate cerebellar zones receive body-state and movement information and contribute to posture and limb coordination. This functional label reflects predominant connections, not an isolated anatomical organ or the sole controller of posture.",
      "KZ": "Мишық құртшасы мен аралық аймақтары дене қалпы және қимылы туралы ақпарат алып, дене қалпын және аяқ-қол қозғалысын түзетуге қатысады. Бұл атау басым байланыстарды сипаттайды, жеке оқшауланған мүше не дене қалпын жалғыз реттеуші емес."
    }
  },
  {
    "id": "cerebrocerebellum",
    "anchor": "cerebellar-functional-divisions",
    "term": {
      "RU": "Цереброцеребеллум",
      "EN": "Cerebrocerebellum",
      "KZ": "Цереброцеребеллум"
    },
    "definition": {
      "RU": "Латеральные зоны полушарий мозжечка взаимодействуют с корой больших полушарий через мостовые и таламические связи, участвуя в планировании и согласовании сложных последовательностей движений. Они не формируют прямой нисходящий путь к скелетной мышце.",
      "EN": "The lateral cerebellar hemispheres interact with cerebral cortex through pontine and thalamic pathways and contribute to planning and coordination of skilled movement sequences. They do not provide a direct descending command to skeletal muscle.",
      "KZ": "Мишық сыңарларының латералдық аймақтары көпір және таламус жолдары арқылы үлкен ми қыртысымен әрекеттесіп, күрделі қимылдар тізбегін жоспарлау мен үйлестіруге қатысады. Олар қаңқа бұлшықетіне тікелей төмендеуші команда жібермейді."
    }
  },
  {
    "id": "purkinje",
    "anchor": "purkinje-deep-nuclei-microcircuit",
    "term": {
      "RU": "Клетка Пуркинье",
      "EN": "Purkinje cell",
      "KZ": "Пуркинье жасушасы"
    },
    "definition": {
      "RU": "Главный проекционный нейрон коры мозжечка. Его аксон выделяет ГАМК и оказывает тормозное действие на глубокие ядра мозжечка либо соответствующие вестибулярные ядра. Усиление активности клетки не следует автоматически трактовать как ускорение движения.",
      "EN": "The principal projection neuron of the cerebellar cortex. Its axon releases GABA and inhibits deep cerebellar nuclei or relevant vestibular nuclei. Increased Purkinje-cell firing cannot simply be equated with faster movement or with greater muscle force.",
      "KZ": "Мишық қыртысының негізгі проекциялық нейроны. Оның аксоны ГАМҚ бөліп, мишықтың терең ядроларын немесе тиісті вестибулярлық ядроларды тежейді. Пуркинье жасушасының белсенділігі артса, қимыл міндетті түрде жылдамдайды не бұлшықет күші өседі деуге болмайды."
    }
  },
  {
    "id": "mossy",
    "anchor": "purkinje-deep-nuclei-microcircuit",
    "term": {
      "RU": "Мшистое волокно",
      "EN": "Mossy fibre",
      "KZ": "Мүкті талшық"
    },
    "definition": {
      "RU": "Один из двух основных типов возбуждающих афферентов мозжечковой коры. Мшистые волокна возбуждают зернистые клетки, чьи параллельные волокна влияют на клетки Пуркинье; их коллатерали также возбуждают глубокие ядра. Это не прямой путь от рецептора к мышце.",
      "EN": "One of the two major excitatory afferent classes entering cerebellar cortex. Mossy fibres excite granule cells, whose parallel fibres influence Purkinje cells; mossy-fibre collaterals also excite deep nuclei. This is not a direct sensory-to-muscle pathway.",
      "KZ": "Мишық қыртысына келетін қоздырушы афференттердің екі негізгі түрінің бірі. Мүкті талшықтар түйіршікті жасушаларды қоздырады, олардың параллель талшықтары Пуркинье жасушаларына әсер етеді; тармақтары терең ядроларды да қоздырады. Бұл рецептордан бұлшықетке тікелей жол емес."
    }
  },
  {
    "id": "climbing",
    "anchor": "purkinje-deep-nuclei-microcircuit",
    "term": {
      "RU": "Лазающее волокно",
      "EN": "Climbing fibre",
      "KZ": "Өрмелеуші талшық"
    },
    "definition": {
      "RU": "Возбуждающий афферент мозжечка, берущий начало в нижнем оливном комплексе. Лазающие волокна образуют мощные синаптические контакты с клетками Пуркинье и дают коллатерали глубоким ядрам; они участвуют в сигналах ошибки и пластичности, но не кодируют единственный тип ошибки.",
      "EN": "An excitatory cerebellar afferent originating from the inferior olivary complex. Climbing fibres strongly excite Purkinje cells and give collaterals to deep nuclei. They participate in error-related signalling and plasticity but do not encode a single universal kind of error.",
      "KZ": "Төменгі олива кешенінен шығатын мишықтың қоздырушы афференті. Өрмелеуші талшықтар Пуркинье жасушаларымен күшті синапстық байланыс түзіп, терең ядроларға тармақ береді. Олар қателікке байланысты сигналдар мен пластикалылыққа қатысады, бірақ бір ғана қате түрін кодтамайды."
    }
  },
  {
    "id": "deep-nuclei",
    "anchor": "deep-nuclei-and-motor-output",
    "term": {
      "RU": "Глубокие ядра мозжечка",
      "EN": "Deep cerebellar nuclei",
      "KZ": "Мишықтың терең ядролары"
    },
    "definition": {
      "RU": "Зубчатое, вставочные (пробковидное и шаровидное) и ядро шатра объединяют возбуждающие афферентные коллатерали с тормозным входом клеток Пуркинье. Большинство основных выходов направлено к стволовым и таламическим сетям, а не непосредственно к нижним мотонейронам.",
      "EN": "The dentate, interposed (emboliform and globose) and fastigial nuclei integrate excitatory afferent collaterals with inhibitory Purkinje-cell input. Major outputs influence brainstem and thalamic networks rather than directly innervating lower motor neurons.",
      "KZ": "Тісті, аралық (тығынтәрізді және шар тәрізді) және шатыр ядролары афференттердің қоздырушы тармақтарын Пуркинье жасушаларының тежеуші кірісімен біріктіреді. Негізгі шығыстары төменгі мотонейрондарға тікелей емес, ми бағаны мен таламус желілеріне әсер етеді."
    }
  },
  {
    "id": "efference-copy",
    "anchor": "cerebellar-afferents-and-efference-copy",
    "term": {
      "RU": "Эфферентная копия",
      "EN": "Efference copy",
      "KZ": "Эфференттік көшірме"
    },
    "definition": {
      "RU": "Внутренняя информация о выданной двигательной команде, позволяющая сопоставлять ожидаемое действие с сенсорными последствиями. В мозжечок поступают как сведения о моторных командах, так и периферическая обратная связь; эфферентная копия не является отдельным измерением силы мышцы.",
      "EN": "An internal representation of a motor command that helps compare intended action with sensory consequences. Cerebellar circuits receive movement-command information as well as peripheral feedback; an efference copy is not a direct measurement of muscle strength.",
      "KZ": "Берілген қозғалтқыш команда туралы ішкі ақпарат; ол күтілетін қимылды сенсорлық нәтижемен салыстыруға көмектеседі. Мишық контурларына команда туралы мәлімет те, шеткі кері байланыс та келеді; эфференттік көшірме бұлшықет күшінің тікелей өлшемі емес."
    }
  },
  {
    "id": "intention-tremor",
    "anchor": "clinical-signs-and-evidence-limits",
    "term": {
      "RU": "Интенционный тремор",
      "EN": "Intention tremor",
      "KZ": "Интенциялық тремор"
    },
    "definition": {
      "RU": "Колебания конечности, заметные при выполнении целенаправленного движения и нередко усиливающиеся при приближении к цели. Могут сопровождать мозжечковую дисфункцию и дисметрию, но один признак не позволяет определить точную локализацию или причину заболевания.",
      "EN": "Oscillatory limb movement during a goal-directed action, often becoming more apparent near the target. It may accompany cerebellar dysfunction and dysmetria, but the sign alone cannot identify a precise lesion site or establish the underlying diagnosis.",
      "KZ": "Мақсатқа бағытталған қимыл кезінде байқалатын, нысанаға жақындағанда жиі күшейетін аяқ-қол тербелісі. Ол мишық қызметінің бұзылуы және дисметриямен қатар жүруі мүмкін, бірақ бір белгі зақым орнын немесе аурудың себебін нақты анықтамайды."
    }
  },
  {
    "id": "romberg",
    "anchor": "clinical-signs-and-evidence-limits",
    "term": {
      "RU": "Проба Ромберга",
      "EN": "Romberg test",
      "KZ": "Ромберг сынамасы"
    },
    "definition": {
      "RU": "Оценка устойчивости стоя при открытых и закрытых глазах, обычно при сомкнутых стопах и обеспечении безопасности. Существенное ухудшение при закрывании глаз указывает на зависимость от зрительного контроля и может поддерживать сенсорную атаксию; это не специфический тест поражения мозжечка.",
      "EN": "A standing-balance test comparing eyes open and closed, usually with feet together and appropriate fall precautions. Marked worsening after eye closure suggests reliance on visual compensation and can support sensory ataxia; it is not a specific test for cerebellar disease.",
      "KZ": "Көз ашық және жұмық кезде, әдетте табандарды жақын қойып, құлаудан сақтандыра отырып дене тұрақтылығын салыстыратын сынама. Көзді жұмғанда тұрақтылықтың айқын нашарлауы көру арқылы өтелуге тәуелділікті көрсетіп, сенсорлық атаксияны қолдауы мүмкін; бұл мишық зақымына тән арнайы сынама емес."
    }
  }
];
const introduction: Record<Language,string> = {
  "RU": "Сопоставляйте название, физиологический механизм и клиническое ограничение. Словарь различает возбуждение и торможение мозжечковых цепей, двигательное обучение и признаки координации; каждый термин ведёт к соответствующему разделу теории.",
  "EN": "Connect each term with its physiological mechanism and limits of clinical interpretation. Distinguish excitatory and inhibitory cerebellar pathways, motor learning and coordination signs; each entry links to the corresponding theory section.",
  "KZ": "Әр терминнің физиологиялық тетігін және клиникалық түсіндіру шегін ажыратыңыз. Мишық контурларындағы қозу мен тежелуді, қимылға үйренуді және үйлесім белгілерін салыстырыңыз; әр ұғым теорияның тиісті бөлігіне апарады."
};

export function createModuleThirteenGlossary(language: Language, base: GlossaryLesson): GlossaryLesson {
  if (base.kind !== "glossary" || base.terms.length !== 2) {
    throw new Error("Module 13 glossary requires two foundation terms");
  }
  return {
    ...base,
    introduction: introduction[language],
    terms: [
      ...base.terms.map((item, index) => ({
        ...item,
        definition: baseDefinitions[index][language],
        target: { section: "theory" as const, anchor: index === 0 ? "clinical-signs-and-evidence-limits" : "timing-adaptation-and-experiment" }
      })),
      ...extra.map(item => ({
        id: "module-13-glossary-" + item.id,
        term: item.term[language],
        definition: item.definition[language],
        target: { section: "theory" as const, anchor: item.anchor }
      }))
    ]
  };
}
