import type { Language } from "../course";
import type { ReadingLesson } from "../study";
import { getSectionTitle } from "../sections";

// Module 10: brainstem clinical bridge. An educational comparison of reflex arcs,
// not a diagnostic algorithm or an instruction to touch another person's cornea.
// Sources checked against Library copies:
// Ghai Practical Physiology 8e, PDF pp. 301–302, 314 (printed 279–280, 292);
// Ganong 23e, PDF pp. 210, 243 (printed 198, 231);
// Guyton & Hall 13e, PDF pp. 718–720 (printed 751–753).
type Copy = {
  introduction: string;
  titles: [string, string, string, string, string];
  paragraphs: [string, string, string, string, string];
};

const data: Record<Language, Copy> = {
  RU: {
    introduction: "Клинический мост: различите чувствительное и двигательное звенья корнеального рефлекса и не делайте вывод о локализации по одному симптому.",
    titles: [
      "Сравнение стимуляции справа и слева",
      "Афферентный и эфферентный пути",
      "Как отличить поражение VII нерва",
      "Сопоставление со зрачковым рефлексом",
      "Пределы локализации и безопасность"
    ],
    paragraphs: [
      "Учебный случай: при осмотре врач обнаружил, что лёгкое прикосновение к правой роговице не вызывает моргания ни справа, ни слева. При проверке левой роговицы оба глаза моргают. Оба зрачка сужаются при освещении каждого глаза; бодрствование сохранено. Какие данные указывают на нарушение входящего звена корнеального рефлекса справа, а какие не позволяют назвать точное место поражения?",
      "Афферентные сигналы от роговицы идут преимущественно через глазную ветвь тройничного нерва (V1) к чувствительным структурам ствола мозга. Интернейронные связи обеспечивают двустороннюю активацию лицевых двигательных ядер; эфферентные волокна VII нерва сокращают круговую мышцу глаза. Если при раздражении правой роговицы оба глаза не моргают, но при раздражении левой моргают оба, вероятнее нарушен правый афферентный путь, а не оба лицевых нерва.",
      "При изолированном правостороннем поражении эфферентного пути VII нерва правый глаз обычно не моргал бы при раздражении ни правой, ни левой роговицы, тогда как левый мог бы моргать при обеих пробах. В описанном случае правый глаз моргает при левосторонней пробе, что говорит о сохранности существенной части его эфферентной дуги. Это сравнение двух сторон информативнее, чем запись «корнеальный рефлекс отсутствует» без указания стороны раздражения и стороны ответа.",
      "Зрачковый световой рефлекс имеет другую дугу: сетчатка → зрительный нерв (II) → претектальная область среднего мозга → двусторонние парасимпатические ядра Эдингера—Вестфаля → глазодвигательный нерв (III) → ресничный узел → сфинктер зрачка. Сохранные прямой и содружественный ответы поддерживают сохранность исследованных компонентов этой дуги, но не доказывают целостность всего ствола мозга и не исключают поражение V1 или его стволовых связей.",
      "Описанная асимметрия позволяет предположить правосторонний дефект афферентной части корнеального рефлекса, но не отличает без дополнительных данных периферическое повреждение V1 от нарушения его центральных связей. Нужно учитывать чувствительность роговицы, состояние её поверхности, перенесённые операции, местные анестетики и другие неврологические признаки. Исследование роговицы проводит только подготовленный специалист; студент не должен касаться роговицы или вызывать болезненные реакции самостоятельно."
    ]
  },
  EN: {
    introduction: "Clinical bridge: distinguish the sensory and motor limbs of the corneal blink reflex without localizing a lesion from one sign alone.",
    titles: [
      "Compare right- and left-sided stimulation",
      "Afferent and efferent pathways",
      "How a facial-nerve lesion would differ",
      "Compare the pupillary light reflex",
      "Limits of localization and safety"
    ],
    paragraphs: [
      "Teaching case: during a clinician's examination, gentle contact with the right cornea produces no blink in either eye. When the left cornea is examined, both eyes blink. Both pupils constrict when either eye is illuminated, and the patient remains alert. Which observations suggest a disturbance of the right corneal afferent limb, and why is it not possible to specify the exact lesion site from these findings alone?",
      "Corneal sensory afferents travel mainly in the ophthalmic division of the trigeminal nerve (V1) to brainstem sensory pathways. Interneuronal connections recruit facial motor nuclei bilaterally; the efferent facial nerves (CN VII) activate orbicularis oculi. If stimulation of the right cornea fails to elicit either blink, but stimulation of the left cornea produces both blinks, impairment of the right afferent pathway is more likely than bilateral facial-nerve failure.",
      "With an isolated right-sided CN VII efferent lesion, the right eye would usually fail to blink after stimulation of either cornea, whereas the left eye could still blink to stimulation on either side. In the teaching case the right eye does blink when the left cornea is stimulated, supporting functional preservation of important components of the right efferent arc. Comparing stimulus side and response side is more informative than an unqualified note that the corneal reflex is absent.",
      "The pupillary light reflex uses a different circuit: retina → optic nerve (CN II) → midbrain pretectal region → bilateral Edinger–Westphal parasympathetic nuclei → oculomotor nerves (CN III) → ciliary ganglia → pupillary sphincters. Preserved direct and consensual constriction supports function of the tested components of that circuit, but does not prove that the entire brainstem is intact or exclude a V1 or central trigeminal pathway lesion.",
      "The pattern suggests a right-sided defect of the corneal afferent limb but cannot distinguish peripheral V1 injury from a central trigeminal pathway lesion without additional evidence. Corneal sensation, ocular surface disease, prior procedures, topical anesthetic exposure and other neurological findings must be considered. Corneal examination should be performed only by a trained clinician; students must not touch another person's cornea or attempt painful testing."
    ]
  },
  KZ: {
    introduction: "Клиникалық байланыс: қасаң қабықтың кірпік қағу рефлексіндегі сезімтал және қозғалтқыш буындарды ажыратып, бір белгіге қарап зақым орнын нақтыламаңыз.",
    titles: [
      "Оң және сол жақтағы сынаманы салыстыру",
      "Афференттік және эфференттік жолдар",
      "VII жүйкенің зақымы қалай ерекшеленеді",
      "Қарашықтың жарық рефлексімен салыстыру",
      "Локализацияның шегі және қауіпсіздік"
    ],
    paragraphs: [
      "Оқу жағдайы: дәрігер оң қасаң қабыққа абайлап тигенде екі көзде де кірпік қағу болмағанын байқады. Сол қасаң қабықты тексергенде екі көз де кірпік қақты. Әр көзге жеке жарық түсіргенде екі қарашық та тарылады, науқастың сергектігі сақталған. Қай белгі оң жақтағы қасаң қабық рефлексінің афференттік буыны бұзылуы мүмкін екенін көрсетеді және неліктен тек осы деректермен зақымның нақты орнын анықтауға болмайды?",
      "Қасаң қабықтан сезімтал сигналдар негізінен үшкіл жүйкенің көз тармағымен (V1) ми бағанының сезімтал жолдарына өтеді. Интернейрондық байланыстар екі жақтағы бет жүйкесінің қозғалтқыш ядроларын белсендіреді; VII жүйкенің эфференттік талшықтары көздің айналма бұлшықетін жиырады. Оң қасаң қабықты тітіркендіргенде екі көз де қақпаса, ал сол жақтан екі көз де жауап берсе, екі бет жүйкесінің бірдей зақымынан гөрі оң жақ афференттік жолдың бұзылуы ықтималырақ.",
      "Оң жақ VII жүйкенің оқшау эфференттік зақымында қай қасаң қабық тітіркендірілсе де оң көз әдетте кірпік қақпайды, ал сол көз екі жақтағы тітіркендіруге де жауап беруі мүмкін. Берілген жағдайда сол қасаң қабық тексерілгенде оң көз де кірпік қағады; бұл оң жақ эфференттік доғаның маңызды бөліктері сақталғанын қолдайды. Тітіркендірілген жақ пен жауап берген көзді бірге жазу «қасаң қабық рефлексі жоқ» деген жалпылама тұжырымнан пайдалырақ.",
      "Қарашықтың жарық рефлексі басқа доғамен іске асады: торқабық → көру жүйкесі (II) → ортаңғы мидың претекталдық аймағы → екі жақтағы Эдингер—Вестфаль парасимпатикалық ядролары → көзқимылдатқыш жүйке (III) → кірпікшелі түйін → қарашық сфинктері. Тікелей және келісілген тарылу осы доғаның тексерілген бөліктерінің жұмысын қолдайды, бірақ бүкіл ми бағаны сау екенін дәлелдемейді және V1 не оның орталық байланыстарының зақымын жоққа шығармайды.",
      "Бұл жауап үлгісі оң жақ қасаң қабық рефлексінің афференттік буыны бұзылуы мүмкін екенін көрсетеді, бірақ қосымша дерексіз V1 шеткі зақымын оның орталық үшкіл жүйке жолдарының зақымынан ажыратпайды. Қасаң қабық сезімталдығын, көз бетінің ауруларын, бұрынғы операцияларды, жергілікті анестетиктерді және өзге неврологиялық белгілерді ескеру қажет. Қасаң қабықты тек арнайы даярланған медицина қызметкері тексереді; студент өздігінен басқа адамның қасаң қабығына тимеуі және ауырсындыратын сынама жасамауы тиіс."
    ]
  }
};

export function createModuleTenClinical(language: Language): ReadingLesson {
  const copy = data[language];
  const destinations = [
    ["cases", "theory"],
    ["theory", "practice"],
    ["practice", "cases"],
    ["theory", "one-minute"],
    ["tests", "questions"]
  ] as const;
  return {
    kind: "clinical",
    title: getSectionTitle("clinical", language),
    introduction: copy.introduction,
    cards: copy.titles.map((title, index) => ({
      id: "module-10-clinical-" + (index + 1),
      title,
      paragraphs: [copy.paragraphs[index]],
      links: destinations[index].map(section => ({ section }))
    }))
  };
}
