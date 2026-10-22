import type { Language } from "../course";
import type { PracticeLesson } from "../types";

// Module 6 practice, independently authored in RU/EN/KZ.
// Physiology: Ganong 23e ch. 6 (PDF pp. 132–134);
// Guyton & Hall 13e ch. 46 (PDF pp. 562–565).
// Ghai 8e experiment 4-9 (PDF pp. 353–354) is a peripheral
// nerve–muscle preparation, not a recording of central synaptic integration.
// Numerical examples below are deliberately simplified thought experiments.
type Copy = {
  titles: [string, string, string, string, string];
  prompts: [string, string, string, string];
  answers: [string[], string[], string[], string[]];
  response: string;
  criteria: [string, string, string, string, string];
};
const copy: Record<Language, Copy> = {
  RU: {
    titles: ["1. Два вида суммации", "2. Шунтирование при неизменном потенциале покоя",
      "3. Деполяризация без обязательного возбуждения", "4. Где возникает торможение?", "Самопроверка"],
    prompts: [
      "Два одинаковых возбуждающих входа вызывают небольшие ВПСП. В опыте А один и тот же синапс активируется повторно до затухания первого ВПСП. В опыте Б одновременно активируются два разных возбуждающих синапса. Назовите вид суммации в каждом опыте. Почему ни один из них сам по себе не доказывает возникновение потенциала действия?",
      "В упрощённой модели мембраны инъецируют постоянный ток 0,1 нА. До открытия дополнительной проводимости входное сопротивление равно 100 МОм, после — 50 МОм. Без пробного тока исходный Vm близок к потенциалу реверсии открывшейся Cl⁻-проводимости, поэтому открытие каналов почти не сдвигает потенциал покоя; во время пробного тока измеряют отдельное отклонение ΔV. Рассчитайте стационарное отклонение напряжения ΔV = I × R в обоих состояниях. Почему уменьшение ΔV может отражать торможение без гиперполяризации? Не переносите численный результат напрямую на дендритный ВПСП.",
      "В мысленном опыте Vm = −65 мВ, а потенциал реверсии тормозной Cl⁻-проводимости E(Cl) = −60 мВ. Предскажите начальное направление изменения Vm при открытии этих каналов. Можно ли только по направлению изменения Vm заключить, что нейрон обязательно чаще разряжается? Укажите роль увеличенной проводимости, времени и расположения возбуждающего входа.",
      "В модели А активация GABA_B-рецепторов на пресинаптическом окончании уменьшает вход Ca²⁺ и вероятность выделения медиатора. В модели Б активация постсинаптических GABA_B-рецепторов увеличивает K⁺-проводимость клетки-мишени. Для каждой модели укажите изменённое звено и ожидаемый эффект. Почему уменьшение одного зарегистрированного постсинаптического ответа без дополнительных измерений не позволяет выбрать А или Б?"
    ],
    answers: [
      ["А — временная суммация: второй ВПСП накладывается на ещё не затухший первый. Б — пространственная: объединяются входы разных синапсов.",
       "Амплитуда у начального сегмента аксона зависит от затухания, расположения, тормозных входов и времени. Даже сумма нескольких ВПСП не гарантирует достижения порога и ПД."],
      ["До: 0,1 нА × 100 МОм = 10 мВ; после: 0,1 нА × 50 МОм = 5 мВ. Это закон Ома для условной пассивной мембраны при одинаковом введённом токе.",
       "Cl⁻-проводимость увеличивает суммарную проводимость и уменьшает входное сопротивление: одинаковый ток вызывает меньший сдвиг Vm. Шунтирование может уменьшить влияние совпадающего возбуждающего входа без заметной гиперполяризации. Реальный синапс требует учёта реверсии, геометрии и времени."],
      ["Так как E(Cl) положительнее исходного Vm, открытие Cl⁻-проводимости первоначально сдвигает Vm к −60 мВ, то есть деполяризует.",
       "Деполяризация сама по себе не доказывает возбуждения: повышенная проводимость может шунтировать ВПСП. Итоговая вероятность ПД зависит от величины, времени и места входов и от потенциала в начальном сегменте аксона."],
      ["А — пресинаптический механизм: меньший Ca²⁺-вход снижает вероятность выделения медиатора и обычно ослабляет ответ клетки-мишени.",
       "Б — постсинаптический механизм: повышение K⁺-проводимости обычно смещает Vm к E(K) и снижает возбудимость. Для различения нужны независимая оценка выделения медиатора и постсинаптической проводимости; одна амплитуда ответа неоднозначна."]
    ],
    response: "Ваш прогноз и физиологическое объяснение",
    criteria: ["Различаю временную и пространственную суммацию.",
      "Не приравниваю ВПСП к обязательному потенциалу действия.",
      "Объясняю шунтирование через проводимость, а не только через гиперполяризацию.",
      "Различаю пресинаптическое и постсинаптическое торможение.",
      "Отделяю учебную модель от прямого клинического измерения."]
  },
  EN: {
    titles: ["1. Two kinds of summation", "2. Shunting without a resting-voltage shift",
      "3. Depolarization need not mean excitation", "4. Where does inhibition occur?", "Self-check"],
    prompts: [
      "Two identical excitatory inputs produce small EPSPs. In experiment A the same synapse is activated again before the first EPSP decays. In experiment B two distinct excitatory synapses are activated together. Identify each kind of summation. Why does neither observation alone establish that an action potential occurred?",
      "In a simplified membrane model a constant current of 0.1 nA is injected. Input resistance is initially 100 MΩ and falls to 50 MΩ after an additional conductance opens. Without the test current, baseline Vm is near the reversal potential of the newly opened Cl⁻ conductance, so opening the channels barely changes resting Vm; during the test current, a separate deflection ΔV is measured. Calculate steady voltage deflection ΔV = I × R in each state. Why can the reduced deflection indicate inhibition without hyperpolarization? Do not apply this numerical result directly to a dendritic EPSP.",
      "In a thought experiment Vm = −65 mV and the reversal potential of an inhibitory Cl⁻ conductance is E(Cl) = −60 mV. Predict the initial direction of Vm change when the channels open. Does the direction alone prove that the neuron must fire more often? Explain how increased conductance, timing and location of excitatory inputs matter.",
      "In model A presynaptic GABA_B receptor activation reduces Ca²⁺ entry and transmitter-release probability. In model B postsynaptic GABA_B receptor activation increases K⁺ conductance in the target cell. Identify the affected step and predicted effect in each model. Why can a smaller recorded postsynaptic response alone not distinguish A from B?"
    ],
    answers: [
      ["A is temporal summation: the second EPSP overlaps a previous EPSP that has not decayed. B is spatial summation: inputs from separate synapses combine.",
       "Voltage at the axon initial segment depends on electrotonic attenuation, location, inhibitory inputs and timing. Summed EPSPs do not necessarily reach spike threshold."],
      ["Before: 0.1 nA × 100 MΩ = 10 mV; after: 0.1 nA × 50 MΩ = 5 mV. This is Ohm's law for an idealized passive membrane at fixed injected current.",
       "Increased Cl⁻ conductance lowers input resistance, so the same current produces a smaller voltage deflection. A coincident excitatory input may be shunted without appreciable hyperpolarization. Real synapses require reversal-potential, geometry and timing information."],
      ["Because E(Cl) is more positive than baseline Vm, opening the conductance initially drives Vm toward −60 mV: a depolarization.",
       "Depolarization alone does not establish excitation: increased conductance may shunt EPSPs. Spike probability depends on input magnitude, timing and location and on voltage near the axon initial segment."],
      ["A is presynaptic: less Ca²⁺ entry lowers release probability and usually reduces the target-cell response.",
       "B is postsynaptic: increased K⁺ conductance usually drives Vm toward E(K) and reduces excitability. Independent measures of release and postsynaptic conductance are needed; response amplitude alone is ambiguous."]
    ],
    response: "Your prediction and physiological reasoning",
    criteria: ["Distinguished temporal from spatial summation.",
      "Did not equate an EPSP with a guaranteed action potential.",
      "Explained shunting through conductance, not just hyperpolarization.",
      "Distinguished presynaptic from postsynaptic inhibition.",
      "Separated teaching-model predictions from clinical measurements."]
  },
  KZ: {
    titles: ["1. Суммацияның екі түрі", "2. Тыныштық потенциалы өзгермей болатын шунттау",
      "3. Деполяризация міндетті түрде қозуды білдірмейді", "4. Тежелу қай жерде жүреді?", "Өзіндік тексеру"],
    prompts: [
      "Екі бірдей қоздырушы кіріс шағын қоздырушы постсинапстық потенциал (ҚПСП) туғызады. А тәжірибесінде бір синапс алғашқы ҚПСП басылмай тұрып қайта белсенеді. Б тәжірибесінде екі бөлек қоздырушы синапс бір уақытта белсенеді. Әр тәжірибедегі суммация түрін атаңыз. Неліктен олардың ешқайсысы өздігінен әрекет потенциалы туғанын дәлелдемейді?",
      "Мембрананың жеңілдетілген моделіне тұрақты 0,1 нА ток беріледі. Бастапқы кіріс кедергісі 100 МОм, қосымша өткізгіштік ашылған соң 50 МОм болады. Сынақ тогы берілмегенде бастапқы Vm ашылған Cl⁻-өткізгіштігінің реверсия потенциалына жақын, сондықтан арналардың ашылуы тыныштық потенциалын шамалы өзгертеді; сынақ тогы кезінде бөлек ΔV ауытқуы өлшенеді. Әр күйдегі тұрақты кернеу ауытқуын ΔV = I × R бойынша есептеңіз. Неліктен ΔV азаюы гиперполяризациясыз тежелуді көрсетуі мүмкін? Бұл сандық нәтижені дендриттегі ҚПСП-ға тікелей көшірмеңіз.",
      "Ойша тәжірибеде Vm = −65 мВ, ал тежеуші Cl⁻-өткізгіштігінің реверсия потенциалы E(Cl) = −60 мВ. Арналар ашылғанда Vm алғаш қай бағытта өзгереді? Тек осы бағытқа қарап нейрон міндетті түрде жиірек разряд береді деуге бола ма? Өткізгіштіктің артуы, қоздырушы кірістің уақыты мен орналасуы неге маңызды?",
      "А моделінде аксон ұшындағы пресинапстық GABA_B-рецепторларының белсенуі Ca²⁺ енуін және медиатор бөліну ықтималдығын төмендетеді. Б моделінде постсинапстық GABA_B-рецепторлары нысана жасушада K⁺ өткізгіштігін арттырады. Әр модельде қай буын өзгеретінін және күтілетін әсерді атаңыз. Неліктен тек бір постсинапстық жауаптың кішіреюі А мен Б-ны ажыратпайды?"
    ],
    answers: [
      ["А — уақыттық суммация: екінші ҚПСП алдыңғысы басылмай тұрып қосылады. Б — кеңістіктік суммация: әртүрлі синапстардың кірістері бірігеді.",
       "Аксонның бастапқы сегментіндегі кернеу сигналдың бәсеңдеуіне, кіріс орнына, тежегіш әсерлерге және уақытқа тәуелді. Бірнеше ҚПСП қосылса да, әрекет потенциалының табалдырығына міндетті түрде жетпейді."],
      ["Бұрын: 0,1 нА × 100 МОм = 10 мВ; кейін: 0,1 нА × 50 МОм = 5 мВ. Бұл тұрақты енгізілген ток үшін пассивті мембрананың шартты Ом заңы есебі.",
       "Cl⁻ өткізгіштігі артқанда кіріс кедергісі азаяды, сондықтан бірдей ток Vm-ді азырақ өзгертеді. Бір мезгілдегі қоздырушы кіріс айқын гиперполяризациясыз шунтталуы мүмкін. Нақты синапс үшін реверсия потенциалын, жасуша геометриясын және уақытты ескеру қажет."],
      ["E(Cl) бастапқы Vm-нен оңырақ болғандықтан, арналардың ашылуы Vm-ді алғаш −60 мВ-ке қарай ығыстырады, яғни деполяризациялайды.",
       "Деполяризацияның өзі қозуды дәлелдемейді: өткізгіштіктің артуы ҚПСП-ны шунттай алады. Әрекет потенциалының ықтималдығы кірістің шамасына, уақытына, орнына және аксонның бастапқы сегментіндегі потенциалға тәуелді."],
      ["А — пресинапстық тетік: Ca²⁺ енуі азайғанда медиатор бөліну ықтималдығы төмендеп, нысана жасушаның жауабы әдетте әлсірейді.",
       "Б — постсинапстық тетік: K⁺ өткізгіштігінің артуы Vm-ді әдетте E(K)-ге жақындатып, қозғыштықты азайтады. Медиатор бөлінуін және постсинапстық өткізгіштікті тәуелсіз өлшеу керек; жауап амплитудасы ғана жеткіліксіз."]
    ],
    response: "Болжамыңыз бен физиологиялық түсіндірмеңіз",
    criteria: ["Уақыттық және кеңістіктік суммацияны ажыраттым.",
      "ҚПСП міндетті түрде әрекет потенциалын туғызбайтынын түсіндім.",
      "Шунттауды тек гиперполяризациямен емес, өткізгіштікпен түсіндірдім.",
      "Пресинапстық және постсинапстық тежелуді ажыраттым.",
      "Оқу моделін нақты клиникалық өлшеммен шатастырмадым."]
  }
};

export function createModuleSixPractice(language: Language, base: PracticeLesson): PracticeLesson {
  const c = copy[language];
  return {
    ...base,
    sections: [
      ...c.prompts.map((prompt, i) => ({
        title: c.titles[i],
        blocks: [
          { type: "paragraph" as const, text: prompt },
          { type: "response" as const, label: c.response },
          { type: "answer" as const, items: c.answers[i] }
        ]
      })),
      { title: c.titles[4], blocks: [{ type: "checklist" as const, items: c.criteria }] }
    ]
  };
}
