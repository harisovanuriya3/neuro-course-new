import type { Language } from "../course";
import type { ReadingLesson } from "../study";
import { getSectionTitle } from "../sections";

// Module 11 clinical bridge: upper vs lower motor-neuron patterns and time course.
// Sources actually read in the user's Library: Guyton & Hall 13e,
// chapter 56, PDF 677–679 / printed 709–711; Ganong 23e,
// chapter 16, PDF 253–256 / printed 241–244; C. L. Ghai 8e,
// PDF 317–319 / printed 295–297. Original educational synthesis.
// No self-examination, treatment, or diagnosis from a single sign.
type Copy = { intro: string; titles: readonly [string,string,string,string,string]; paragraphs: readonly [string,string,string,string,string] };
const data: Record<Language, Copy> = {
 RU: {
  intro: "Клинический мост: сопоставьте уровень поражения двигательной системы, механизм слабости, рефлекторные признаки и время после повреждения. Это учебная модель, а не алгоритм самостоятельной диагностики.",
  titles: [
   "Учебный случай: слабость и изменение рефлексов",
   "Почему поражение выше перекрёста влияет на противоположную сторону",
   "Чем отличается поражение нижнего мотонейрона",
   "Почему время после повреждения меняет рефлекторную картину",
   "Границы вывода и безопасная клиническая оценка"
  ],
  paragraphs: [
   "Через несколько недель после документированного очагового повреждения левой задней ножки внутренней капсулы у пациента сохраняются слабость и замедление тонких движений правой кисти и ноги. Врач отмечает усиление некоторых сухожильных рефлексов справа, повышенное сопротивление быстрому пассивному растяжению и разгибательный подошвенный ответ справа. Какие данные согласуются с нарушением нисходящего двигательного контроля, а почему эти признаки нельзя однозначно приписать поражению только кортикоспинального тракта?",
   "Большинство кортикоспинальных волокон пересекает среднюю линию в каудальной части продолговатого мозга. Поэтому поражение слева выше пирамидного перекрёста может ослаблять произвольные движения преимущественно справа. Повреждение нисходящих сетей меняет управление спинальными интернейронами и мотонейронами; позднее возможны усиление рефлексов и спастичность. Эти проявления не доказывают, что поражён исключительно кортикоспинальный тракт: важны также ретикулоспинальные влияния и другие связи.",
   "При поражении нижнего мотонейрона или периферического двигательного звена слабость чаще сопровождается снижением тонуса, атрофией, иногда фасцикуляциями и ослаблением рефлекса, если повреждена его эфферентная дуга. При поражении чувствительного афферента рефлекс также может уменьшиться без первичного повреждения мотонейрона. Сухожильный удар растягивает мышцу и возбуждает мышечные веретёна; Ia-афферент активирует α-мотонейрон через моносинаптическое центральное звено. Нельзя приписывать этот ответ непосредственной стимуляции рецептора сухожилия.",
   "В первые часы или дни после острого тяжёлого повреждения центральных нисходящих путей слабость и сниженный тонус могут сочетаться с ослабленными рефлексами; после травматического перерыва спинного мозга возможен спинальный шок. По мере восстановления возбудимости спинальных цепей могут появляться гиперрефлексия и спастичность. Поэтому формула «центральное поражение всегда сразу даёт высокие рефлексы» неверна. Сравнивайте время появления признаков, уровень повреждения и сохранность периферической рефлекторной дуги.",
   "Этот набор признаков поддерживает гипотезу поражения центрального двигательного контроля, но сам по себе не устанавливает этиологию, точный объём очага или сохранность каждого нисходящего пути. Нужны данные анамнеза, осмотра специалистом, чувствительности, распределения слабости и при показаниях нейровизуализации и электрофизиологии. Сила, спастичность, координация и рефлексы — разные измерения функции. Студенты разбирают предоставленные данные, а не вызывают патологические ответы и не обследуют пациентов без клинического руководства."
  ]
 },
 EN: {
  intro: "Clinical bridge: relate motor-system lesion level to weakness, reflex findings and time since injury. This is an educational comparison, not a self-diagnosis algorithm.",
  titles: [
   "Teaching case: weakness and altered reflexes",
   "Why a lesion above the decussation affects the opposite side",
   "How a lower motor-neuron lesion differs",
   "Why the time course changes the reflex pattern",
   "Limits of inference and safe clinical assessment"
  ],
  paragraphs: [
   "Several weeks after a documented focal lesion of the left posterior limb of the internal capsule, a patient has weakness and slowed skilled movements of the right hand and leg. A clinician notes brisker tendon reflexes on the right, increased resistance to rapid passive stretch and a right extensor plantar response. Which observations support impaired descending motor control, and why can these signs not be attributed specifically to the corticospinal tract alone?",
   "Most corticospinal fibers cross in the caudal medulla. A lesion on the left above the pyramidal decussation can therefore impair voluntary movement predominantly on the right. Damage to descending networks alters modulation of spinal interneurons and motor neurons; hyperreflexia and spasticity may develop later. These signs do not prove exclusive corticospinal tract injury: reticulospinal influences and other connections also contribute.",
   "Lower motor-neuron or peripheral motor-pathway damage more often causes weakness with reduced tone, atrophy, sometimes fasciculations and a reduced reflex when its efferent arc is affected. A sensory afferent lesion can also diminish the reflex without directly damaging the motor neuron. A tendon tap stretches the muscle and excites muscle spindles; Ia afferents activate alpha motor neurons through a monosynaptic central link. The response is not produced by direct stimulation of a tendon receptor.",
   "During the first hours or days after severe acute central motor injury, weakness and reduced tone may coexist with depressed reflexes; spinal shock may follow traumatic cord transection. As spinal-circuit excitability changes, hyperreflexia and spasticity may emerge. Thus 'a central lesion always produces brisk reflexes immediately' is false. Compare time since injury, lesion level and integrity of the peripheral reflex arc.",
   "The pattern supports a central motor-control disturbance but cannot independently establish cause, exact lesion extent or the status of every descending tract. Interpretation requires history, clinician examination, sensory findings, weakness distribution and, when indicated, neuroimaging or electrophysiology. Strength, spasticity, coordination and reflexes are distinct functional observations. Students interpret supplied findings rather than provoking pathological responses or examining patients without clinical supervision."
  ]
 },
 KZ: {
  intro: "Клиникалық байланыс: қозғалыс жүйесіндегі зақым деңгейін әлсіздікпен, рефлекс белгілерімен және зақымнан кейінгі уақытпен салыстырыңыз. Бұл өздігінен диагноз қою алгоритмі емес, оқу үлгісі.",
  titles: [
   "Оқу жағдайы: әлсіздік пен рефлекстердің өзгеруі",
   "Неліктен айқасудан жоғары зақым қарсы жаққа әсер етеді",
   "Төменгі мотонейрон зақымының айырмашылығы",
   "Зақымнан кейінгі уақыт рефлекстерді қалай өзгертеді",
   "Қорытынды шегі және қауіпсіз клиникалық бағалау"
  ],
  paragraphs: [
   "Сол жақ ішкі капсуланың артқы аяқшасында ошақты зақым тіркелгеннен бірнеше апта өткен соң науқастың оң қолы мен аяғында әлсіздік және дәл қимылдардың баяулауы сақталған. Дәрігер оң жақта кейбір сіңір рефлекстерінің күшейгенін, бұлшықетті тез пассивті созуға қарсылықтың артқанын және табан рефлексінің экстензорлық жауабын (бас бармақтың жоғары жазылуын) байқады. Қандай белгілер төмендеуші қозғалтқыш бақылаудың бұзылуын қолдайды, және неліктен бұл белгілерді тек кортикоспиналдық жолдың зақымына ғана телуге болмайды?",
   "Кортикоспиналдық талшықтардың көбі сопақша мидың каудалдық бөлігінде айқасады. Сондықтан пирамидалық айқасудан жоғары сол жақтағы зақым ерікті қозғалыстарды көбіне оң жақта әлсіретуі мүмкін. Төмендеуші желілердің зақымы жұлын интернейрондары мен мотонейрондарының реттелуін өзгертеді; кейін гиперрефлексия және спастикалық жоғары тонус дамуы мүмкін. Бұл белгілер тек кортикоспиналдық жолдың зақымын дәлелдемейді: ретикулоспиналдық әсерлер мен өзге байланыстар да қатысады.",
   "Төменгі мотонейрон немесе шеткі қозғалтқыш жол зақымданса, әлсіздік көбіне тонустың төмендеуімен, атрофиямен, кейде фасцикуляциялармен және рефлекстің эфференттік доғасы бұзылғанда оның әлсіреуімен қатар жүреді. Сезімтал афференттің зақымы да мотонейронның тікелей зақымынсыз рефлексті төмендетуі мүмкін. Сіңірді ұрғанда бұлшықет созылып, бұлшықет ұршықтары қозады; Ia-афферент α-мотонейронды орталықтағы моносинапстық буын арқылы белсендіреді. Бұл жауап сіңір рецепторын тікелей қоздырудан туындамайды.",
   "Орталық қозғалтқыш жолдар жедел әрі ауыр зақымданған алғашқы сағаттарда немесе күндерде әлсіздік пен тонустың төмендеуі рефлекстердің бәсеңдеуімен қатар болуы мүмкін; жұлынның жарақаттық толық үзілуінен кейін жұлындық шок дамуы ықтимал. Жұлын желілерінің қозғыштығы өзгерген сайын гиперрефлексия мен спастикалық жоғары тонус пайда болуы мүмкін. Сондықтан «орталық зақым әрқашан бірден рефлекстерді күшейтеді» деу қате. Зақымнан кейінгі уақытты, деңгейін және шеткі рефлекс доғасының сақталуын салыстыру қажет.",
   "Бұл белгілер орталық қозғалтқыш бақылаудың бұзылуы мүмкін екенін көрсетеді, бірақ зақымның себебін, нақты көлемін немесе барлық төмендеуші жолдардың күйін жеке өздері анықтамайды. Анамнез, маманның тексеруі, сезімталдық, әлсіздіктің таралуы және қажет болғанда нейровизуализация мен электрофизиология деректері керек. Күш, спастикалық тонус, үйлесім және рефлекстер — қызметтің бөлек көрсеткіштері. Студенттер берілген деректерді талдайды, өз бетінше патологиялық жауап шақырмайды және клиникалық жетекшісіз науқасты тексермейді."
  ]
 }
};

export function createModuleElevenClinical(language: Language): ReadingLesson {
 const copy=data[language];
 const destinations = [
  ["cases","theory"],
  ["theory","practice"],
  ["practice","theory"],
  ["one-minute","pretest"],
  ["tests","questions"]
 ] as const;
 return {
  kind: "clinical",
  title: getSectionTitle("clinical",language),
  introduction: copy.intro,
  cards: copy.titles.map((title,index)=>({
   id: "module-11-clinical-"+(index+1),
   title,
   paragraphs: [copy.paragraphs[index]],
   links: destinations[index].map(section=>({section}))
  }))
 };
}
