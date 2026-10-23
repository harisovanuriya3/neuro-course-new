import type { Language } from "../course";
import type { VirtualPatientScenario } from "../virtual-patients";

// Module 6 is a COMPUTER TEACHING MODEL, not a clinical encounter.
// Numerical stages reproduce IntegrationExperimentLab's illustrative linear
// rule: Vm = -70 + 6 mV per coincident EPSP - 4.5 mV per inhibitory input;
// for temporal summation, prior EPSPs decay with tau = 18 ms.
// Shunting is NOT simulated by that laboratory and is discussed separately.
// Ganong 23e PDF 132–134; Guyton & Hall 13e PDF 563–565.
// Ghai 8e PDF 353–354 concerns a peripheral nerve–muscle preparation.
type Step = readonly [
  title: string, situation: string, newData: string, task: string,
  correct: string, wrongA: string, wrongB: string, explanation: string
];
type SixSteps = readonly [Step, Step, Step, Step, Step, Step];
const steps: Record<Language, SixSteps> = {
  RU: [
    ["1. Пространственная суммация",
     "В компьютерной модели два одинаковых возбуждающих входа активируются одновременно.",
     "Исходный Vm = −70 мВ; каждый условный ВПСП добавляет 6 мВ; порог модели = −55 мВ. Два входа дают −58 мВ, три — −52 мВ.",
     "Какой вывод верен при этих фиксированных параметрах?",
     "Два входа остаются подпороговыми, а три достигают условного порога.",
     "Два входа обязательно вызывают потенциал действия, поскольку оба возбуждающие.",
     "Три входа остаются подпороговыми: амплитуды ВПСП не суммируются.",
     "При совпадении во времени два условных ВПСП дают −58 мВ, три — −52 мВ. Это сравнение порога в линейной модели, а не регистрация ПД."],
    ["2. Временная суммация",
     "Три возбуждающих импульса приходят в один вход с различными интервалами.",
     "Модель: 6 мВ на вход, постоянная затухания 18 мс, без тормозных входов. При интервале 8 мс пик около −57,7 мВ; при 1 мс около −53,0 мВ.",
     "Как изменение интервала влияет на прогноз достижения порога −55 мВ?",
     "Сокращение интервала усиливает перекрытие ВПСП; 1 мс даёт надпороговую оценку, 8 мс — подпороговую.",
     "Увеличение интервала до 8 мс всегда усиливает суммацию.",
     "Интервал не влияет на сумму, поскольку число стимулов не меняется.",
     "Временная суммация зависит от остаточного ВПСП к приходу следующего сигнала. Числа условные и не описывают реальную форму ПД."],
    ["3. Условный тормозный вход",
     "Три совпадающих возбуждающих входа сравнивают с тем же опытом после добавления одного тормозного.",
     "Без торможения модель даёт −52 мВ; один условный тормозный вход вычитает 4,5 мВ и даёт −56,5 мВ.",
     "Что можно утверждать о пороге модели?",
     "При одном тормозном входе оценка становится подпороговой; это не расчёт шунтирования.",
     "Тормозный вход всегда увеличивает число разрядов.",
     "В модели тормозный вход не меняет Vm и потому не может изменить прогноз.",
     "Здесь торможение задано фиксированным вычитанием напряжения. Реальные тормозные синапсы меняют проводимость; шунтирование этим алгоритмом не вычисляется."],
    ["4. Шунтирование: отдельный мысленный опыт",
     "Рассматривают реальный принцип постсинаптического торможения, который линейная лаборатория не моделирует.",
     "В мысленном опыте Vm ≈ E(Cl) = −65 мВ; открытие Cl⁻-каналов повышает мембранную проводимость.",
     "Может ли торможение быть эффективным без заметной гиперполяризации?",
     "Да: входное сопротивление снижается, поэтому совпадающий возбуждающий ток даёт меньший ВПСП.",
     "Нет: торможение возможно только при значительной гиперполяризации.",
     "Да: открытие Cl⁻-каналов обязательно вызывает большой потенциал действия.",
     "При Vm около E(Cl) изменение напряжения может быть малым, но увеличение проводимости шунтирует возбуждающий ток. Это не результат численного симулятора."],
    ["5. Где действует торможение?",
     "В опыте уменьшился постсинаптический ответ; место действия тормозного механизма не измерено.",
     "Известна только амплитуда суммарного ответа. Нет отдельных измерений входа Ca²⁺ в окончание, выделения медиатора и проводимости клетки-мишени.",
     "Как отличить пре- и постсинаптическое торможение?",
     "Нужны дополнительные раздельные измерения высвобождения медиатора и постсинаптической проводимости.",
     "Любое снижение ответа доказывает отсутствие ГАМК в синапсе.",
     "По одной амплитуде можно безошибочно определить пресинаптический GABA_B-рецептор.",
     "Пресинаптическое торможение может уменьшать вход Ca²⁺ и высвобождение медиатора; постсинаптическое изменяет проводимость клетки. Одна амплитуда не локализует механизм."],
    ["6. Граница физиологического вывода",
     "Сравнили численный симулятор с объяснением синаптического торможения.",
     "В модели нет дендритной геометрии, изменения проводимости, каналов ПД или клинических измерений. Письменный ответ студента не оценивается автоматически.",
     "Как сформулировать корректный итог?",
     "Модель показывает зависимость условного порога от числа и времени входов; не диагностирует человека и не измеряет силу конкретного тормозного синапса.",
     "Результат модели доказывает наличие у человека дефицита ГАМК.",
     "Числовой порог −55 мВ универсален для всех нейронов и пациентов.",
     "Порог, ВПСП и тормозные сдвиги заданы условно. Сверяйте физиологический механизм с теорией; для клинического вывода нужны независимые данные."]
  ],
  EN: [
    ["1. Spatial summation",
     "Two equal excitatory inputs are activated simultaneously in a computer model.",
     "Baseline Vm = −70 mV; each illustrative EPSP adds 6 mV; model threshold = −55 mV. Two inputs give −58 mV; three give −52 mV.",
     "Which inference follows under these fixed assumptions?",
     "Two inputs remain below threshold, whereas three reach the illustrative threshold.",
     "Two inputs must cause a spike simply because both are excitatory.",
     "Three inputs remain below threshold because EPSPs never summate.",
     "With coincident inputs, two 6-mV EPSPs yield −58 mV and three yield −52 mV. This is a linear threshold estimate, not an action-potential recording."],
    ["2. Temporal summation",
     "Three excitatory signals arrive at the same input with different intervals.",
     "Model: 6 mV per input, decay time constant 18 ms, no inhibition. The peak is about −57.7 mV at 8 ms and −53.0 mV at 1 ms.",
     "How does shortening the interval affect the −55 mV threshold prediction?",
     "Closer inputs overlap more; 1 ms produces a suprathreshold estimate, 8 ms a subthreshold one.",
     "Increasing the interval to 8 ms always strengthens summation.",
     "Timing cannot matter because the number of stimuli is unchanged.",
     "Temporal summation depends on how much of the earlier EPSP remains when the next input arrives. The numbers are illustrative, not a spike waveform."],
    ["3. Illustrative inhibitory input",
     "Three coincident excitatory inputs are compared before and after adding one inhibitory input.",
     "Without inhibition the model gives −52 mV; one inhibitory input subtracts 4.5 mV, giving −56.5 mV.",
     "What is supported about the model threshold?",
     "One inhibitory input makes the estimate subthreshold; this is not a shunting calculation.",
     "An inhibitory input always increases the number of spikes.",
     "The model's inhibitory input leaves Vm unchanged and cannot affect the prediction.",
     "The algorithm represents inhibition as a fixed voltage subtraction. Real inhibitory synapses alter conductance; this simulator does not calculate shunting."],
    ["4. Shunting: separate thought experiment",
     "Consider postsynaptic inhibition that the linear laboratory does not simulate.",
     "In this thought experiment Vm ≈ E(Cl) = −65 mV; opening Cl⁻ channels increases membrane conductance.",
     "Can inhibition occur without substantial hyperpolarization?",
     "Yes: lower input resistance reduces the EPSP caused by a coincident excitatory current.",
     "No: inhibition requires a large hyperpolarization.",
     "Yes: opening Cl⁻ channels necessarily produces a large action potential.",
     "Near E(Cl), the voltage shift may be small, while increased conductance shunts excitation. This is not a numerical simulator result."],
    ["5. Where does inhibition act?",
     "A postsynaptic response is smaller, but the inhibitory site was not measured.",
     "Only compound response amplitude is available; terminal Ca²⁺ entry, transmitter release and target-cell conductance were not separately measured.",
     "How could presynaptic and postsynaptic inhibition be distinguished?",
     "Obtain separate evidence about transmitter release and postsynaptic membrane conductance.",
     "Any smaller response proves that synaptic GABA is absent.",
     "Response amplitude alone precisely identifies a presynaptic GABA_B receptor.",
     "Presynaptic inhibition may reduce terminal Ca²⁺ entry and transmitter release; postsynaptic inhibition changes target-cell conductance. Amplitude alone cannot localize the mechanism."],
    ["6. Limits of inference",
     "Compare the numerical teaching model with synaptic physiology.",
     "The model lacks dendritic geometry, conductance changes, spike channels and clinical measurements. Student free text is not automatically graded.",
     "Which conclusion is justified?",
     "The model illustrates effects of input number and timing on an assumed threshold; it neither diagnoses a person nor measures an individual inhibitory synapse.",
     "The model proves GABA deficiency in a human patient.",
     "The −55 mV threshold applies universally to all neurons and patients.",
     "Threshold, EPSPs and inhibitory shifts are illustrative inputs. Use the theory to check the mechanism; clinical inference needs independent evidence."]
  ],
  KZ: [
    ["1. Кеңістіктік суммация",
     "Компьютерлік модельде екі бірдей қоздырушы кіріс бір мезгілде белсендіріледі.",
     "Бастапқы Vm = −70 мВ; әр шартты ҚПСП 6 мВ қосады; модель табалдырығы = −55 мВ. Екі кіріс −58 мВ, үшеуі −52 мВ береді.",
     "Осы тұрақты параметрлерде қандай қорытынды дұрыс?",
     "Екі кіріс табалдырықтан төмен, ал үш кіріс шартты табалдырыққа жетеді.",
     "Екі кіріс те қоздырушы болғандықтан, міндетті түрде әрекет потенциалын тудырады.",
     "Үш кіріс табалдырықтан төмен қалады, өйткені ҚПСП ешқашан қосылмайды.",
     "Бір мезгілде келген екі ҚПСП −58 мВ, үшеуі −52 мВ береді. Бұл сызықтық модельдің бағасы, нақты әрекет потенциалының жазбасы емес."],
    ["2. Уақыттық суммация",
     "Бір кіріске үш қоздырушы сигнал әртүрлі аралықпен келеді.",
     "Модельде әр кіріс 6 мВ, бәсеңдеу тұрақтысы 18 мс, тежелу жоқ. 8 мс аралықта шың шамамен −57,7 мВ, 1 мс аралықта −53,0 мВ.",
     "Аралық қысқарса, −55 мВ табалдырығына жету болжамы қалай өзгереді?",
     "Кірістер жақындағанда ҚПСП көбірек қабаттасады: 1 мс — табалдырықтан жоғары, 8 мс — төмен.",
     "Аралықты 8 мс-қа ұзарту әрдайым суммацияны күшейтеді.",
     "Стимул саны өзгермесе, уақыт аралығы нәтиже үшін маңызды емес.",
     "Уақыттық суммация келесі сигнал келгенде алдыңғы ҚПСП-ның қаншасы сақталғанына тәуелді. Сандар шартты, әрекет потенциалының пішінін көрсетпейді."],
    ["3. Шартты тежеуші кіріс",
     "Бір мезгілде келген үш қоздырушы кірісті бір тежеуші кіріс қосылған жағдаймен салыстырады.",
     "Тежелусіз модель −52 мВ береді; бір тежеуші кіріс 4,5 мВ азайтып, −56,5 мВ береді.",
     "Модель табалдырығы туралы не айтуға болады?",
     "Бір тежеуші кіріс нәтижені табалдырықтан төмен түсіреді; бұл шунттауды есептеу емес.",
     "Тежеуші кіріс әрдайым разряд санын арттырады.",
     "Модельде тежеуші кіріс Vm-ге әсер етпейді және болжамды өзгертпейді.",
     "Алгоритм тежелуді кернеуден тұрақты шаманы азайту түрінде береді. Нақты тежеуші синапстар өткізгіштікті өзгертеді; шунттау мұнда есептелмейді."],
    ["4. Шунттау: жеке ойша тәжірибе",
     "Сызықтық зертхана модельдемейтін постсинапстық тежелу тетігін қарастырыңыз.",
     "Ойша тәжірибеде Vm ≈ E(Cl) = −65 мВ; Cl⁻ арналары ашылғанда мембрана өткізгіштігі артады.",
     "Айқын гиперполяризациясыз тежелу мүмкін бе?",
     "Иә: кіріс кедергісі төмендеп, қатар келген қоздырушы ток тудыратын ҚПСП азаяды.",
     "Жоқ: тежелу үшін міндетті түрде үлкен гиперполяризация қажет.",
     "Иә: Cl⁻ арналары ашылса, міндетті түрде үлкен әрекет потенциалы пайда болады.",
     "Vm мен E(Cl) жақын болса, кернеу аз өзгеруі мүмкін, бірақ өткізгіштіктің артуы қозуды шунттайды. Бұл сандық симулятордың нәтижесі емес."],
    ["5. Тежелу қай жерде жүреді?",
     "Постсинапстық жауап азайған, бірақ тежелудің нақты орны өлшенбеген.",
     "Тек жиынтық жауап амплитудасы белгілі; аксон ұшына Ca²⁺ енуі, медиатор бөлінуі және нысана жасуша өткізгіштігі бөлек өлшенбеген.",
     "Пресинапстық және постсинапстық тежелуді қалай ажыратуға болады?",
     "Медиатор бөлінуі мен постсинапстық мембрана өткізгіштігі туралы бөлек деректер қажет.",
     "Жауаптың кез келген азаюы синапста ГАМҚ жоқ екенін дәлелдейді.",
     "Тек амплитуда бойынша пресинапстық GABA_B-рецепторын дәл анықтауға болады.",
     "Пресинапстық тежелу Ca²⁺ енуін және медиатор бөлінуін азайтуы мүмкін; постсинапстық тежелу нысана мембрана өткізгіштігін өзгертеді. Бір амплитуда тетікті локализацияламайды."],
    ["6. Қорытындының шегі",
     "Сандық оқу моделін синапстық физиологиямен салыстырыңыз.",
     "Модельде дендрит геометриясы, өткізгіштік өзгерістері, әрекет потенциалы арналары және клиникалық өлшемдер жоқ. Студенттің жазбаша жауабы автоматты бағаланбайды.",
     "Қандай қорытынды негізді?",
     "Модель кірістер саны мен уақыттың шартты табалдырыққа әсерін көрсетеді; адамға диагноз қоймайды және жеке тежеуші синапсты өлшемейді.",
     "Модель адамда ГАМҚ жетіспеушілігін дәлелдейді.",
     "−55 мВ табалдырығы барлық нейрон мен пациент үшін әмбебап.",
     "Табалдырық, ҚПСП және тежеуші ығысулар шартты. Тетікті теориямен салыстырыңыз; клиникалық қорытындыға тәуелсіз деректер керек."]
  ]
};

const labels: Record<Language, { patient: string; profile: string; opening: string; note: string; correct: string; revise: string; summary: string }> = {
 RU: {patient:"Учебная компьютерная модель (не пациент)",profile:"Студент анализирует интеграцию сигналов в условном нейроне.",opening:"Шесть опытов: сначала прогноз, затем сравнение механизма и ограничений модели.",note:"Все числовые значения иллюстративны; реальные измерения и диагностика не выполняются.",correct:"Прогноз согласуется с моделью.",revise:"Этот выбор не соответствует условиям модели.",summary:"Интеграция зависит от числа, времени и расположения входов и мембранной проводимости. Линейная модель не вычисляет шунтирование и не устанавливает диагноз."},
 EN: {patient:"Computer teaching model (not a patient)",profile:"A student examines input integration in an illustrative neuron.",opening:"Six tasks: predict first, then examine the mechanism and its limits.",note:"All numerical values are illustrative; there are no patient measurements or diagnoses.",correct:"This choice agrees with the model.",revise:"This choice does not follow from the model.",summary:"Integration depends on input number, timing, location and conductance. The linear model does not calculate shunting or establish a diagnosis."},
 KZ: {patient:"Компьютерлік оқу моделі (пациент емес)",profile:"Студент шартты нейрондағы сигналдар интеграциясын талдайды.",opening:"Алты тапсырма: алдымен болжам, кейін тетік пен модель шегін салыстыру.",note:"Барлық сандар шартты; пациент өлшемдері мен диагноздар жоқ.",correct:"Бұл таңдау модельге сәйкес.",revise:"Бұл таңдау модель шарттарына сәйкес емес.",summary:"Интеграция кірістер санына, уақытына, орнына және мембрана өткізгіштігіне тәуелді. Сызықтық модель шунттауды есептемейді және диагноз қоймайды."}
};

export function reviewModuleSixVirtualPatient(base: VirtualPatientScenario, language: Language): VirtualPatientScenario {
 if(base.moduleId!==6 || base.stages.length!==6) throw new Error("Module 6 requires six teaching-model stages");
 const locale=labels[language];
 return {
  ...base,
  patient:locale.patient,
  profile:locale.profile,
  opening:locale.opening,
  syntheticNote:locale.note,
  mechanismSummary:locale.summary,
  stages:base.stages.map((stage,index)=>{
   const [title,situation,newData,task,correct,wrongA,wrongB,explanation]=steps[language][index];
   let wrongIndex=0;
   return {
    ...stage,title,situation,newData,task,
    mentorPrompt:explanation,mechanism:explanation,
    options:stage.options.map((option,position)=>{
     const isCorrect=position===stage.correctOption;
     const choice=isCorrect?correct:[wrongA,wrongB][wrongIndex++];
     return {...option,text:choice,
      response:isCorrect?locale.correct:locale.revise,
      feedback:explanation};
    }) as typeof stage.options
   };
  })
 };
}
