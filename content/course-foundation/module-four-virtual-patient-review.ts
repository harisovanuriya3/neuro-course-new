import type { Language } from "../course";
import type { VirtualPatientScenario, VirtualPatientStage } from "../virtual-patients";

// Module 4 is a COMPUTER MODEL, not a human membrane recording.
// Scientific basis: Guyton & Hall 13e ch. 5; Ganong 23e ch. 4;
// C. L. Ghai Practical Physiology 8e chart 5-5.
// Calculated voltages are model outputs; the spike trace and stage observations
// are illustrative and are NOT recomputed from selected answers.
type L = Record<Language, string>;
const l = (RU: string, EN: string, KZ: string): L => ({ RU, EN, KZ });
type Stage = {
  situation: L; data: L; task: L; correct: L; wrong: [L, L]; explanation: L;
};
const stages: [Stage, Stage, Stage, Stage, Stage, Stage] = [
  {
    situation: l("Компьютерный расчёт потенциала покоя при фиксированных параметрах.",
      "Computer calculation of resting voltage with fixed parameters.",
      "Параметрлері тұрақты болғандағы тыныштық потенциалының компьютерлік есебі."),
    data: l("37 °C; K⁺ снаружи/внутри 4/140 мМ; Na⁺ 145/12 мМ; P(K):P(Na)=1:0,04.",
      "37 °C; K⁺ outside/inside 4/140 mM; Na⁺ 145/12 mM; P(K):P(Na)=1:0.04.",
      "37 °C; K⁺ сыртта/іште 4/140 мМ; Na⁺ 145/12 мМ; P(K):P(Na)=1:0,04."),
    task: l("Как корректно сопоставить E(K) и Vm?",
      "How should E(K) and Vm be compared?",
      "E(K) мен Vm мәндерін қалай дұрыс салыстыру керек?"),
    correct: l("Рассчитать E(K) по Нернсту, Vm по двухионному Гольдману и указать, что это разные величины.",
      "Calculate E(K) by Nernst and Vm by the two-ion Goldman equation; distinguish the two quantities.",
      "E(K)-ні Нернстпен, Vm-ді екі ионды Гольдман теңдеуімен есептеп, олардың әртүрлі шама екенін көрсету."),
    wrong: [
      l("Принять Vm равным E(K), поскольку Na⁺ не влияет на мембрану в покое.",
        "Set Vm equal to E(K), because Na⁺ makes no contribution at rest.",
        "Na⁺ тыныштықта әсер етпейді деп, Vm мәнін E(K)-ге теңестіру."),
      l("Принять −70 мВ за измеренный потенциал клетки добровольца.",
        "Treat −70 mV as a directly measured potential in a volunteer.",
        "−70 мВ мәнін еріктінің жасушасында тікелей өлшенген потенциал деп қабылдау.")
    ],
    explanation: l("При этих параметрах E(K) ≈ −95,0 мВ, Vm ≈ −71,2 мВ: небольшой вклад Na⁺ делает Vm менее отрицательным. Это расчёт, не измерение у человека.",
      "With these inputs E(K) ≈ −95.0 mV and Vm ≈ −71.2 mV: the small Na⁺ contribution makes Vm less negative. This is a calculation, not a human recording.",
      "Бұл параметрлерде E(K) ≈ −95,0 мВ, Vm ≈ −71,2 мВ: Na⁺ үлесі Vm-ді азырақ теріс етеді. Бұл адамдағы өлшеу емес, есеп.")
  },
  {
    situation: l("Изменён один параметр двухионной модели.",
      "One parameter of the two-ion model is changed.",
      "Екі ионды модельдің бір параметрі өзгертілді."),
    data: l("Наружный K⁺ повышен с 4 до 8 мМ; все остальные параметры неизменны.",
      "Extracellular K⁺ rises from 4 to 8 mM; all other inputs are fixed.",
      "Сыртқы K⁺ 4-тен 8 мМ-ге артты; басқа параметрлер тұрақты."),
    task: l("Что можно заключить о Vm и реальной возбудимости?",
      "What can be concluded about Vm and real excitability?",
      "Vm және нақты қозғыштық туралы қандай қорытынды жасауға болады?"),
    correct: l("Vm станет менее отрицательным; по одному расчёту нельзя установить реальную возбудимость.",
      "Vm becomes less negative; this calculation alone cannot establish real excitability.",
      "Vm азырақ теріс болады; тек осы есеппен нақты қозғыштықты анықтау мүмкін емес."),
    wrong: [
      l("Vm станет более отрицательным, потому что наружный K⁺ усиливает его выход.",
        "Vm becomes more negative because extracellular K⁺ drives greater K⁺ efflux.",
        "Сыртқы K⁺ калийдің сыртқа шығуын күшейтеді, сондықтан Vm терісірек болады."),
      l("Деполяризация обязательно повысит возбудимость, независимо от длительности.",
        "Depolarization necessarily raises excitability regardless of duration.",
        "Деполяризация ұзақтығына қарамастан қозғыштықты міндетті түрде арттырады.")
    ],
    explanation: l("E(K) ≈ −95,0 → −76,5 мВ; Vm ≈ −71,2 → −62,0 мВ. Длительная деполяризация может инактивировать Na⁺-каналы; модель не вычисляет эту кинетику.",
      "E(K) ≈ −95.0 → −76.5 mV; Vm ≈ −71.2 → −62.0 mV. Sustained depolarization can inactivate Na⁺ channels; this model does not calculate that kinetics.",
      "E(K) ≈ −95,0 → −76,5 мВ; Vm ≈ −71,2 → −62,0 мВ. Ұзақ деполяризация Na⁺ арналарын инактивациялауы мүмкін; модель бұл кинетиканы есептемейді.")
  },
  {
    situation: l("Сравниваются ответы отдельного аксона на стимулы разной силы.",
      "Responses of a single axon to different stimulus strengths are compared.",
      "Жеке аксонның әртүрлі күшті стимулдарға жауабы салыстырылады."),
    data: l("Подпороговый стимул вызывает локальное изменение Vm; надпороговый — импульс.",
      "A subthreshold stimulus produces a local Vm change; a suprathreshold stimulus elicits a spike.",
      "Табалдырықтан төмен стимул Vm-нің жергілікті өзгерісін, ал жоғары стимул импульс туғызады."),
    task: l("Как изменится высота отдельного импульса при усилении надпорогового стимула?",
      "How does a single spike's amplitude respond to a stronger suprathreshold stimulus?",
      "Табалдырықтан жоғары стимул күшейсе, жеке импульстің амплитудасы қалай өзгереді?"),
    correct: l("При одинаковых исходных условиях высота отдельного импульса существенно не растёт: действует принцип «всё или ничего».",
      "With the same initial conditions, single-spike amplitude does not substantially rise: firing is all-or-none.",
      "Бастапқы жағдайлар бірдей болса, жеке импульстің амплитудасы елеулі артпайды: «бәрі немесе ештеңе» қағидасы орындалады."),
    wrong: [
      l("Амплитуда каждого импульса растёт пропорционально силе стимула.",
        "Each spike's amplitude grows in proportion to stimulus strength.",
        "Әр импульстің амплитудасы стимул күшіне тура пропорционал өседі."),
      l("Подпороговый стимул вообще не меняет Vm.",
        "A subthreshold stimulus produces no Vm change at all.",
        "Табалдырықтан төмен стимул Vm-ді мүлде өзгертпейді.")
    ],
    explanation: l("Подпороговые ответы градуальны, а надпороговый импульс регенеративен. Это относится к отдельному аксону при сопоставимых условиях, а не к суммарному ответу нерва.",
      "Subthreshold responses are graded, whereas a suprathreshold spike is regenerative. This concerns a single axon under comparable conditions, not a compound nerve response.",
      "Табалдырықтан төмен жауаптар градуалды, ал жоғары импульс регенеративті. Бұл жүйкенің жиынтық жауабына емес, бірдей жағдайдағы жеке аксонға қатысты.")
  },
  {
    situation: l("Объясняются восходящая и нисходящая фазы импульса.",
      "The rising and falling phases of a spike are interpreted.",
      "Импульстің көтерілу және төмендеу фазалары талданады."),
    data: l("На условной кривой сначала быстрая деполяризация, затем реполяризация.",
      "The illustrative trace shows rapid depolarization followed by repolarization.",
      "Шартты қисықта алдымен жылдам деполяризация, кейін реполяризация көрінеді."),
    task: l("Какая последовательность изменений проводимости объясняет фазы?",
      "Which conductance sequence explains these phases?",
      "Бұл фазаларды өткізгіштіктің қандай өзгерістер тізбегі түсіндіреді?"),
    correct: l("Активация Na⁺-каналов вызывает подъём; их инактивация и запаздывающая K⁺-проводимость обеспечивают спад.",
      "Na⁺-channel activation drives the upstroke; Na⁺ inactivation and delayed K⁺ conductance drive the fall.",
      "Na⁺ арналарының белсенуі көтерілуге, олардың инактивациясы мен кешіккен K⁺ өткізгіштігі төмендеуге әкеледі."),
    wrong: [
      l("Быструю реполяризацию каждого импульса непосредственно создаёт Na⁺/K⁺-АТФаза.",
        "Na⁺/K⁺-ATPase directly produces the rapid repolarization of each spike.",
        "Әр импульстің жылдам реполяризациясын тікелей Na⁺/K⁺-АТФаза туғызады."),
      l("Открытие K⁺-каналов создаёт быстрый восходящий фронт, а Na⁺-каналы — нисходящий.",
        "K⁺-channel opening produces the rapid upstroke and Na⁺ channels the downstroke.",
        "K⁺ арналарының ашылуы жылдам көтерілу, ал Na⁺ арналары төмендеу фазасын туғызады.")
    ],
    explanation: l("Na⁺/K⁺-АТФаза поддерживает градиенты; быстрые фазы импульса определяются потенциал-зависимыми Na⁺- и K⁺-каналами.",
      "Na⁺/K⁺-ATPase maintains ion gradients; voltage-gated Na⁺ and K⁺ channels shape the fast spike phases.",
      "Na⁺/K⁺-АТФаза иондық градиенттерді сақтайды; импульстің жылдам фазаларын кернеуге тәуелді Na⁺ және K⁺ арналары анықтайды.")
  },
  {
    situation: l("Два стимула подаются с разными интервалами.",
      "Two stimuli are applied at different intervals.",
      "Екі стимул әртүрлі аралықпен беріледі."),
    data: l("В учебной анимации заданы условные интервалы; кинетика каналов не моделируется.",
      "The teaching animation uses arbitrary intervals and does not model channel kinetics.",
      "Оқу анимациясында шартты аралықтар берілген; арналар кинетикасы модельденбейді."),
    task: l("Почему второй импульс может отсутствовать или требовать большего стимула?",
      "Why may the second spike fail or require a stronger stimulus?",
      "Неліктен екінші импульс болмауы немесе күштірек стимулды қажет етуі мүмкін?"),
    correct: l("При абсолютной рефрактерности Na⁺-каналы недоступны; при относительной часть восстанавливается, но K⁺-проводимость ещё повышена.",
      "During absolute refractoriness Na⁺ channels are unavailable; during relative refractoriness some recover while K⁺ conductance remains elevated.",
      "Абсолютті рефрактерлікте Na⁺ арналары қолжетімсіз; салыстырмалы кезеңде бір бөлігі қалпына келеді, бірақ K⁺ өткізгіштігі әлі жоғары."),
    wrong: [
      l("Любой достаточно сильный стимул преодолевает абсолютную рефрактерность.",
        "Any sufficiently strong stimulus overcomes absolute refractoriness.",
        "Жеткілікті күшті кез келген стимул абсолютті рефрактерлікті жеңеді."),
      l("У всех нейронов абсолютная рефрактерность строго 2 мс, а относительная строго 5 мс.",
        "Every neuron has exactly 2 ms absolute and 5 ms relative refractoriness.",
        "Барлық нейронда абсолютті кезең дәл 2 мс, салыстырмалы кезең дәл 5 мс.")
    ],
    explanation: l("Рефрактерность зависит от состояния каналов и типа клетки. Время в учебной анимации не является универсальной физиологической нормой.",
      "Refractoriness depends on channel availability and cell type. The animation's timing is not a universal physiological norm.",
      "Рефрактерлік арналардың күйі мен жасуша түріне тәуелді. Анимациядағы уақыт әмбебап физиологиялық норма емес.")
  },
  {
    situation: l("Сопоставляются одиночный аксон, длительное воздействие и стимуляция целого нерва.",
      "Single-axon firing, sustained input and whole-nerve stimulation are compared.",
      "Жеке аксон, ұзақ әсер және тұтас жүйкені тітіркендіру салыстырылады."),
    data: l("Амплитуда одного импульса постоянна при сопоставимых условиях; частота и число активных волокон могут различаться.",
      "Single-spike amplitude is stable under comparable conditions; firing rate and recruited fiber count may differ.",
      "Бірдей жағдайда жеке импульс амплитудасы тұрақты; разряд жиілігі мен іске қосылған талшық саны өзгеруі мүмкін."),
    task: l("Каким образом нервная система может отражать интенсивность стимула?",
      "How may stimulus intensity be represented in neural activity?",
      "Стимул қарқындылығы жүйке белсенділігінде қалай берілуі мүмкін?"),
    correct: l("При длительном воздействии может меняться частота разрядов; в нервном стволе — число рекрутированных волокон, но не высота импульса одного аксона.",
      "Sustained input may change firing rate and nerve-trunk stimulation may recruit fibers, without increasing one axon's spike amplitude.",
      "Ұзақ әсерде разряд жиілігі, жүйке бағанында іске қосылған талшықтар саны өзгеруі мүмкін, бірақ бір аксон импульсінің амплитудасы өспейді."),
    wrong: [
      l("Интенсивность всегда кодируется увеличением высоты одного потенциала действия.",
        "Intensity is always encoded by increasing one action potential's amplitude.",
        "Қарқындылық әрқашан бір әрекет потенциалы амплитудасының өсуімен беріледі."),
      l("Частота разрядов и рекрутирование не имеют отношения к кодированию интенсивности.",
        "Firing rate and fiber recruitment have no role in encoding intensity.",
        "Разряд жиілігі мен талшықтарды іске қосу қарқындылықты кодтауға қатыспайды.")
    ],
    explanation: l("Различайте одиночный импульс, частоту серии и суммарный потенциал нерва. Не все нейроны кодируют интенсивность одинаково; компьютерная модель не измеряет человека.",
      "Distinguish a single spike, train frequency and compound nerve response. Not all neurons encode intensity identically; this computer model does not measure a person.",
      "Жеке импульсті, серия жиілігін және жүйкенің жиынтық жауабын ажыратыңыз. Барлық нейрон қарқындылықты бірдей кодтамайды; модель адамды өлшемейді.")
  }
];

export function reviewModuleFourVirtualPatient(base: VirtualPatientScenario, language: Language): VirtualPatientScenario {
  if (base.stages.length !== 6 || stages.length !== 6) throw Error("Module 4 requires six stages");
  const note = l(
    "Данные этого компьютерного опыта заданы заранее: выбор варианта не изменяет физическое состояние и не является обследованием пациента.",
    "The computer exercise uses predefined observations: choosing an option does not change a physical state or examine a patient.",
    "Бұл компьютерлік тәжірибенің деректері алдын ала берілген: жауап таңдау физикалық күйді өзгертпейді және пациентті тексеру емес."
  )[language];
  const summary = l(
    "Градиенты и относительная проницаемость задают расчётный Vm. Фазы импульса связаны с Na⁺- и K⁺-каналами; абсолютная и относительная рефрактерность отражают доступность каналов. Учебная кривая не предсказывает клиническую возбудимость.",
    "Gradients and relative permeability determine calculated Vm. Na⁺ and K⁺ channels shape the spike, and channel availability underlies refractory periods. The teaching trace cannot predict clinical excitability.",
    "Градиенттер мен салыстырмалы өткізгіштік есептелген Vm-ді анықтайды. Импульс фазалары Na⁺ және K⁺ арналарына, рефрактерлік олардың қолжетімділігіне тәуелді. Оқу қисығы клиникалық қозғыштықты болжамайды."
  )[language];
  return {
    ...base,
    patient: l("Мембрананың оқу моделі (пациент емес)", "Teaching membrane model (not a patient)", "Мембрананың оқу моделі (пациент емес)")[language],
    profile: l("Компьютерная модель при 37 °C", "Computer model at 37 °C", "37 °C-тағы компьютерлік модель")[language],
    opening: l("Расчёт Vm и условная кривая импульса не являются измерениями у человека.", "Calculated Vm and the illustrative spike trace are not human recordings.", "Есептелген Vm мен шартты импульс қисығы адамда өлшенген нәтиже емес.")[language],
    syntheticNote: note,
    mechanismSummary: summary,
    stages: base.stages.map((stage, index) => {
      const item = stages[index];
      const options = stage.options.map((option) => {
        const id = option.id.split("-decision-")[1];
        const decision = Number(id);
        if (![1, 2, 3].includes(decision)) throw Error("Invalid module 4 decision id");
        const text = decision === 1 ? item.correct[language] : item.wrong[decision - 2][language];
        const response = note;
        const feedback = item.explanation[language];
        return { ...option, text, response, feedback };
      }) as VirtualPatientStage["options"];
      if (!options[stage.correctOption].id.endsWith("-decision-1")) {
        throw Error("Module 4 answer key must match the correct decision");
      }
      return {
        ...stage,
        situation: item.situation[language],
        newData: item.data[language],
        task: item.task[language],
        mentorPrompt: item.explanation[language],
        mechanism: item.explanation[language],
        options
      };
    })
  };
}
