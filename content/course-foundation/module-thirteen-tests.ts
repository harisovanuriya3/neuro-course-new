import type { Language } from "../course";
import type { BranchingTest } from "../tests";

// Module 13: cerebellar motor coordination. Source cross-check:
// Guyton & Hall 13e, ch. 57, printed pp. 723–725;
// Ganong 23e, ch. 16, printed pp. 256–258;
// C. L. Ghai Practical Physiology 8e, printed pp. 287–290.
// Each simplified inference assumes the stated conditions; no bedside sign alone diagnoses a lesion.
type L = Record<Language, string>;
const t = (RU: string, EN: string, KZ: string): L => ({ RU, EN, KZ });
type Item = { prompts: [L, L, L]; choices: [L, L, L, L]; explanation: L };
const items: Item[] = [
  {
    prompts: [
      t("Какая пара связей лучше описывает входы в глубокие ядра мозжечка?", "Which pair of connections best describes input to the deep cerebellar nuclei?", "Мишықтың терең ядроларына келетін кірістерді қай байланыстар дұрыс сипаттайды?"),
      t("На схеме клетки Пуркинье обозначены как возбуждающий выход. Как уточнить их действие?", "A diagram labels Purkinje cells as excitatory output. How should their action be described?", "Сызбада Пуркинье жасушалары қоздырушы шығыс деп белгіленген. Олардың әсерін қалай нақтылау керек?"),
      t("В учебной модели изменили активность Пуркинье при неизменных афферентных коллатералях. Как рассуждать о выходе ядра?", "Purkinje activity changes while afferent collaterals are fixed. How should deep nuclear output be interpreted?", "Афференттік тармақтар өзгермей, Пуркинье белсенділігі өзгерді. Терең ядро шығысын қалай түсіндіреміз?")
    ],
    choices: [
      t("Афферентные коллатерали возбуждают ядра, а клетки Пуркинье тормозят их через ГАМК; итог зависит от обоих входов.", "Afferent collaterals excite deep nuclei and Purkinje cells inhibit them through GABA; both inputs shape output.", "Афференттік тармақтар терең ядроларды қоздырады, ал Пуркинье жасушалары ГАМҚ арқылы тежейді; нәтиже екі кіріске де тәуелді."),
      t("Клетки Пуркинье возбуждают глубокие ядра глутаматом, а афферентные коллатерали преимущественно тормозят их.", "Purkinje cells excite deep nuclei with glutamate, whereas afferent collaterals mainly inhibit the nuclei.", "Пуркинье жасушалары терең ядроларды глутаматпен қоздырады, ал афференттік тармақтар негізінен тежейді."),
      t("Глубокие ядра получают только торможение от коры мозжечка и не имеют прямых возбуждающих афферентных входов.", "Deep nuclei receive only cerebellar cortical inhibition and have no direct excitatory afferent inputs.", "Терең ядролар тек мишық қыртысынан тежелу алады және тікелей қоздырушы афференттік кірістері болмайды."),
      t("Пуркинье непосредственно управляют мышцей через периферический аксон, поэтому активность глубоких ядер несущественна.", "Purkinje cells directly control muscle through a peripheral axon, so deep nuclear activity is irrelevant.", "Пуркинье жасушалары бұлшықетті шеткі аксон арқылы тікелей басқарады, сондықтан терең ядролар белсенділігі маңызды емес.")
    ],
    explanation: t("Клетки Пуркинье — ГАМК-ергический выход коры мозжечка. Мшистые и лазающие афференты дают возбуждающие коллатерали глубоким ядрам. При фиксированных прочих входах усиление торможения обычно уменьшает выход ядра; это не прямое измерение мышечной силы.", "Purkinje cells are GABAergic output neurons of cerebellar cortex. Mossy and climbing afferents provide excitatory collaterals to deep nuclei. With other inputs fixed, greater inhibition tends to reduce nuclear output; this is not a direct measurement of muscle force.", "Пуркинье жасушалары мишық қыртысының ГАМҚ-ергиялық шығыс нейрондары. Мүкті және өрмелеуші афференттер терең ядроларға қоздырушы тармақтар береді. Өзге кірістер тұрақты болса, тежелудің күшеюі ядро шығысын әдетте азайтады; бұл бұлшықет күшін тікелей өлшеу емес.")
  },
  {
    prompts: [
      t("Если зрение ограничено, но проприоцепция сохранена, что можно предсказать о коррекции движения?", "When vision is restricted but proprioception remains, what is a justified prediction about movement correction?", "Көру ақпараты шектеліп, проприоцепция сақталғанда қимылды түзету туралы қандай болжам негізді?"),
      t("Зрительную обратную связь убрали во время достижения цели. Какой источник информации остаётся доступным?", "Visual feedback is removed during reaching. Which information source can still contribute?", "Нысанаға қол созғанда көру кері байланысы алынды. Қандай ақпарат көзі әлі қатыса алады?"),
      t("Студент обещает нулевую ошибку после выключения зрения. Как оценить такой прогноз?", "A learner predicts zero error after vision is removed. How should this prediction be evaluated?", "Студент көруді алып тастағанда қате нөл болады дейді. Бұл болжамды қалай бағалаймыз?")
    ],
    choices: [
      t("Проприоцепция и предварительная моторная команда сохраняют вклад; точность зависит от задачи, поэтому абсолютный прогноз неверен.", "Proprioception and feedforward commands still contribute; accuracy depends on the task, so an absolute prediction is unjustified.", "Проприоцепция мен алдын ала моторлық команда әсер ете береді; дәлдік тапсырмаға тәуелді, сондықтан абсолютті болжам негізсіз."),
      t("Исчезновение зрения одновременно устраняет все сигналы мышечных веретён, поэтому любое движение немедленно прекращается.", "Removing vision also abolishes all muscle-spindle signals, so every movement immediately stops.", "Көруді алып тастау бұлшықет ұршықтарының барлық сигналдарын жояды, сондықтан кез келген қимыл бірден тоқтайды."),
      t("Мозжечок полностью заменяет все сенсорные входы, поэтому конечная ошибка обязательно становится нулевой.", "The cerebellum fully replaces every sensory input, so endpoint error must always become exactly zero.", "Мишық барлық сенсорлық кірістерді толық алмастырады, сондықтан соңғы қате міндетті түрде нөлге тең болады."),
      t("При отсутствии зрения двигательная команда исходит только из мозжечка, а другие двигательные системы перестают участвовать.", "Without vision the motor command originates only in the cerebellum, and other motor systems have no role.", "Көру болмаса, моторлық команда тек мишықтан пайда болады, ал басқа қозғалтқыш жүйелер қатыспайды.")
    ],
    explanation: t("Зрительная обратная связь — не единственный источник коррекции: проприоцептивные сигналы и опережающее управление сохраняются. Изменение ошибки зависит от задачи, времени и оставшихся сигналов. Учебная модель не измеряет напрямую нейронные разряды.", "Visual feedback is not the sole basis for correction: proprioceptive signals and feedforward control remain. Changes in error depend on task demands, timing and remaining signals. A teaching model does not directly measure neuronal discharge.", "Көру кері байланысы түзетудің жалғыз көзі емес: проприоцепциялық сигналдар мен алдын ала басқару сақталады. Қатенің өзгеруі тапсырмаға, уақытқа және қалған сигналдарға тәуелді. Оқу моделі нейрон разрядтарын тікелей өлшемейді.")
  },
  {
    prompts: [
      t("При пальценосовой пробе наблюдаются промахивание и нарастающее дрожание у цели при сохранной силе. Как это описать?", "During finger-to-nose testing, overshoot and increasing oscillation near the target occur with preserved strength. How are they described?", "«Саусақ — мұрын» сынамасында күш сақталып, нысанадан асып кету мен жақындаған сайын тербеліс байқалады. Мұны қалай сипаттаймыз?"),
      t("У пациента сила сохранена, но быстрые чередующиеся движения неритмичны. Какой признак проверяют отдельно?", "Strength is preserved but rapid alternating movements are irregular. Which sign is assessed separately?", "Күш сақталған, бірақ жылдам кезектесетін қимылдар ырғақсыз. Қай белгіні бөлек бағалаймыз?"),
      t("При нарушении точности движения как отличить координационную ошибку от пареза?", "When movement accuracy is impaired, how can a coordination error be distinguished from paresis?", "Қимыл дәлдігі бұзылғанда үйлесім қатесін парезден қалай ажыратамыз?")
    ],
    choices: [
      t("Дисметрия и интенционный тремор относятся к координации; мышечную силу и чувствительность оценивают отдельно.", "Dysmetria and intention tremor concern coordination; muscle strength and sensory function are assessed separately.", "Дисметрия мен интенциялық тремор үйлесімге қатысты; бұлшықет күші мен сезімталдық бөлек бағаланады."),
      t("Промахивание всегда означает снижение максимальной мышечной силы, даже если сопротивление при осмотре нормальное.", "Overshoot always means reduced maximal muscle force, even when resistance testing is normal.", "Нысанадан асып кету қарсыласуға тексеру қалыпты болса да ең жоғары бұлшықет күшінің азайғанын білдіреді."),
      t("Интенционный тремор является исключительно тремором покоя и не зависит от приближения к цели.", "Intention tremor is exclusively a resting tremor and does not change as the target is approached.", "Интенциялық тремор тек тыныштық треморы болып, нысанаға жақындауға байланысты өзгермейді."),
      t("Один эпизод дисметрии однозначно устанавливает точный очаг поражения без осмотра чувствительности и зрения.", "One episode of dysmetria precisely localizes a lesion without examination of sensation or vision.", "Дисметрияның бір көрінісі сезімталдық пен көруді тексермей-ақ зақым орнын нақты анықтайды.")
    ],
    explanation: t("Дисметрия означает ошибку амплитуды или конечной точки, интенционный тремор усиливается при приближении к цели, а дисдиадохокинез характеризует трудности быстрых чередующихся движений. Сила, зрение и проприоцепция проверяются отдельно; одиночная проба не устанавливает диагноз.", "Dysmetria is an amplitude or endpoint error, intention tremor grows near a target, and dysdiadochokinesia impairs rapid alternating movements. Strength, vision and proprioception must be assessed separately; a single bedside test does not establish a diagnosis.", "Дисметрия — амплитуда немесе соңғы нүкте қатесі; интенциялық тремор нысанаға жақындағанда күшейеді, ал дисдиадохокинез жылдам кезектесетін қимылдарды қиындатады. Күш, көру және проприоцепция бөлек бағаланады; бір сынама диагноз қоймайды.")
  },
  {
    prompts: [
      t("После повторений ошибка движения уменьшается, а при смене условия возникает последействие. Какое объяснение подходит?", "Error falls with repeated trials and an aftereffect appears when conditions change. Which explanation fits?", "Қайталаудан кейін қимыл қатесі азайып, жағдай өзгергенде кейінгі әсер байқалады. Қандай түсіндіру негізді?"),
      t("Студент связывает улучшение только с ростом мышечной силы. Какое другое объяснение следует проверить?", "A learner attributes improvement solely to increased muscle strength. Which alternative should be tested?", "Студент жақсаруды тек бұлшықет күшінің артуымен түсіндіреді. Қандай баламаны тексеру керек?"),
      t("Можно ли по одному поведенческому последействию определить активность конкретной клетки Пуркинье?", "Can one behavioural aftereffect reveal the activity of a particular Purkinje cell?", "Бір мінез-құлықтық кейінгі әсер арқылы нақты Пуркинье жасушасының белсенділігін анықтауға бола ма?")
    ],
    choices: [
      t("Последействие совместимо с сенсомоторной адаптацией, но требует контроля стратегии, практики и условий; активность отдельных нейронов не измерена.", "An aftereffect is compatible with sensorimotor adaptation, but strategy, practice and task conditions must be controlled; individual neurons were not recorded.", "Кейінгі әсер сенсомоторлық бейімделуге сәйкес келуі мүмкін, бірақ стратегия, жаттығу және тапсырма шарттары бақылануы тиіс; жеке нейрондар жазылмаған."),
      t("Любое улучшение после повторений доказывает увеличение силы мышцы и исключает участие мозжечковых контуров.", "Every improvement after repetition proves increased muscle strength and excludes cerebellar circuits.", "Қайталаудан кейінгі кез келген жақсару бұлшықет күшінің артқанын дәлелдеп, мишық контурларын жоққа шығарады."),
      t("Последействие само по себе показывает точную частоту разрядов конкретной клетки Пуркинье без нейрофизиологической записи.", "An aftereffect by itself reveals the exact firing rate of one Purkinje cell without electrophysiological recording.", "Кейінгі әсер электрофизиологиялық жазбасыз нақты Пуркинье жасушасының разряд жиілігін көрсетеді."),
      t("Сенсомоторная адаптация обязательно устраняет любую ошибку во всех будущих задачах и не зависит от контекста.", "Sensorimotor adaptation necessarily removes all errors in every future task regardless of context.", "Сенсомоторлық бейімделу контекстке қарамастан болашақтағы барлық тапсырма қатесін міндетті түрде жояды.")
    ],
    explanation: t("Уменьшение ошибки и последействие согласуются с адаптацией внутреннего предсказания, однако могут зависеть от сознательной стратегии, практики и контекста. Для проверки нужна контрольная задача и повторное измерение. Поведение не является прямой записью активности клетки Пуркинье.", "Error reduction and aftereffects are consistent with adaptation of predictive control, but may depend on conscious strategy, practice and context. Control trials and repeated measures help distinguish mechanisms. Behaviour is not a direct recording of Purkinje-cell activity.", "Қатенің азаюы мен кейінгі әсер болжамдық басқарудың бейімделуімен үйлеседі, бірақ саналы стратегияға, жаттығуға және контекстке тәуелді болуы мүмкін. Тетіктерді ажырату үшін бақылау сынамасы мен қайталама өлшеу қажет. Мінез-құлық Пуркинье жасушасының тікелей жазбасы емес.")
  },
  {
    prompts: [
      t("При закрывании глаз стояние резко ухудшается. Какой вывод о пробе Ромберга наиболее обоснован?", "Standing worsens markedly with eyes closed. Which conclusion about Romberg testing is most justified?", "Көзді жұмғанда тұру күрт нашарлайды. Ромберг сынамасы туралы қай қорытынды негіздірек?"),
      t("У пациента широкая походка и нистагм. Как обосновать дальнейшее обследование?", "A patient has a broad-based gait and nystagmus. How should further assessment be justified?", "Науқаста кең негізді жүріс пен нистагм бар. Қосымша тексеруді қалай негіздейміз?"),
      t("При внезапной атаксии студент предлагает поставить диагноз только по одной пробе. Какой подход корректнее?", "For sudden ataxia a learner proposes diagnosis from a single test. Which approach is safer and more defensible?", "Кенет атаксияда студент бір сынама бойынша диагноз ұсынады. Қандай тәсіл дұрысырақ?")
    ],
    choices: [
      t("Ромберг выявляет зависимость устойчивости от сенсорных входов, но не специфичен для мозжечка; внезапные симптомы требуют срочной клинической оценки.", "Romberg testing probes sensory dependence of balance, not a cerebellum-specific lesion; sudden symptoms require urgent clinical assessment.", "Ромберг сынамасы тепе-теңдіктің сенсорлық кірістерге тәуелділігін көрсетеді, бірақ мишыққа тән жеке белгі емес; кенет симптомдар шұғыл клиникалық бағалауды қажет етеді."),
      t("Положительная проба Ромберга однозначно подтверждает изолированное поражение полушария мозжечка без других данных.", "A positive Romberg sign uniquely confirms an isolated cerebellar hemispheric lesion without other evidence.", "Оң Ромберг белгісі басқа дерексіз мишық сыңарының жеке зақымын нақты дәлелдейді."),
      t("Нистагм и широкая походка всегда означают только нарушение мышечной силы, поэтому оценка глаз и вестибулярной системы не нужна.", "Nystagmus and broad-based gait always reflect only reduced muscle strength, so ocular and vestibular assessment is unnecessary.", "Нистагм мен кең негізді жүріс тек бұлшықет әлсіздігін білдіреді, сондықтан көз бен вестибулярлық жүйені бағалау қажет емес."),
      t("Внезапное нарушение координации безопасно трактовать как учебную адаптацию без проверки начала симптомов и сопутствующих признаков.", "Sudden incoordination can safely be treated as motor adaptation without checking onset and associated signs.", "Кенет үйлесім бұзылуын басталу уақыты мен қатар белгілерді тексермей, моторлық бейімделу деп қарастыру қауіпсіз.")
    ],
    explanation: t("Проба Ромберга оценивает вклад зрительной и проприоцептивной информации в равновесие и не является специфической мозжечковой пробой. Атаксия, нистагм и другие признаки требуют дифференциальной оценки; внезапное появление нарушений координации — повод для срочной клинической оценки.", "Romberg testing evaluates the sensory contribution to standing balance and is not specific for cerebellar dysfunction. Ataxia, nystagmus and associated findings require differential assessment; sudden new incoordination warrants urgent clinical evaluation.", "Ромберг сынамасы тұру тепе-теңдігіне көру мен проприоцепцияның үлесін бағалайды және мишық бұзылысына тән жеке сынама емес. Атаксия, нистагм және қосымша белгілер ажыратылып бағаланады; кенет пайда болған үйлесім бұзылысы шұғыл клиникалық тексеруді талап етеді.")
  }
];
const names = ["concept", "mechanism", "application", "transfer", "justification"] as const;
export function adaptModuleThirteenTest(base: BranchingTest, lang: Language): BranchingTest {
  const nodes = { ...base.nodes };
  names.forEach((name, i) => {
    const item = items[i];
    (["main", "corrective", "basic"] as const).forEach((level, j) => {
      const key = name + ":" + level;
      const old = nodes[key];
      if (!old || old.type !== "question") throw new Error("Missing question " + key);
      const choices = item.choices.map((choice, n) => ({ id: "abcd"[n], text: choice[lang] }));
      const shift = (i + j + 1) % 4;
      nodes[key] = { ...old, prompt: item.prompts[j][lang],
        options: [...choices.slice(shift), ...choices.slice(0, shift)],
        correctAnswer: "a", explanation: item.explanation[lang] };
    });
    (["review-1", "review-2"] as const).forEach(suffix => {
      const key = name + ":" + suffix;
      const old = nodes[key];
      if (!old || old.type !== "remediation") throw new Error("Missing remediation " + key);
      nodes[key] = { ...old, text: item.explanation[lang],
        theoryTarget: { moduleId: 13, anchor: suffix === "review-1" ? "mechanism" : "interpretation" } };
    });
  });
  return { ...base, nodes };
}
