import type { Language } from "../course";
import type { BranchingTest, QuestionNode, TestOption } from "../tests";

// Authored module 4 formative questions: Nernst/GHK, Na+ gating, extracellular
// potassium, sustained depolarization, and limits of a two-ion simulator.
// Scientific basis: Guyton & Hall 13e ch. 5 (PDF 69–74);
// Ganong 23e ch. 4 (PDF 96–99); Ghai Practical Physiology 8e chart 5-5.
// Model inputs: 37 °C, K(i)=140, K(o)=4→8, Na(i)=12, Na(o)=145 mM,
// P(K)=1, P(Na)=0.04. No inference about an individual patient's Vm.
type Skill = "concept" | "mechanism" | "application" | "transfer" | "justification";
type Copy = {
 prompts: [string,string,string];
 options: [string,string,string,string]; // correct answer is the first; stable ID "a"
 explanation: string;
 hints: [string,string];
};
const authored: Record<Language, Record<Skill, Copy>> = {
 RU: {
  concept: {
   prompts: [
    "В модели известны концентрации Na⁺ и K⁺ по обе стороны мембраны. Чем различаются результаты уравнений Нернста и Гольдмана?",
    "При неизменных концентрациях ионов Vm отличается от E(K). Какое различие двух уравнений объясняет это?",
    "Студент рассчитал E(K) и назвал его точным потенциалом покоя любой клетки. Как корректно различить E(K) и Vm?"
   ],
   options: [
    "Нернст даёт равновесный потенциал одного иона; Гольдман оценивает Vm с учётом нескольких ионов и их проницаемостей.",
    "Нернст учитывает сразу Na⁺ и K⁺, а Гольдман рассчитывает потенциал только для K⁺.",
    "Оба уравнения всегда дают одинаковое значение, даже если мембрана частично проницаема для Na⁺.",
    "Гольдман рассчитывает Vm только по скорости работы Na⁺/K⁺-насоса без ионных градиентов."
   ],
   explanation: "E(K) — равновесный потенциал K⁺, а Vm зависит также от других проницаемых ионов. Двухионная модель Гольдмана включает Na⁺ и K⁺, но опускает Cl⁻ и прямой электрогенный вклад насоса.",
   hints: [
    "Уравнение Нернста относится к одному иону. Проверьте, учитывает ли Vm в этой модели небольшую проницаемость для Na⁺.",
    "E(K) не обязательно равно Vm: сравните числитель и знаменатель двухионной формулы Гольдмана."
   ]
  },
  mechanism: {
   prompts: [
    "Что непосредственно вызывает быстрый регенеративный подъём потенциала действия после достижения порога в аксоне?",
    "Деполяризация достигает порога, а скорость её нарастания резко увеличивается. Какой каналовый механизм создаёт положительную обратную связь?",
    "При одинаковых исходных условиях возник восходящий фронт распространяющегося импульса. Какое быстрое изменение проводимости его объясняет?"
   ],
   options: [
    "Открытие потенциал-зависимых Na⁺-каналов и входящий Na⁺-ток усиливают деполяризацию.",
    "Запаздывающее открытие K⁺-каналов вызывает входящий K⁺-ток и ускоряет деполяризацию.",
    "Инактивация Na⁺-каналов сама создаёт входящий Na⁺-ток, усиливающий подъём.",
    "Na⁺/K⁺-АТФаза за миллисекунды создаёт восходящий фронт каждого импульса."
   ],
   explanation: "Положительная обратная связь возникает при активации потенциал-зависимых Na⁺-каналов. Позднее инактивация Na⁺-каналов и рост K⁺-проводимости помогают реполяризации; насос поддерживает градиенты на более длительном масштабе времени.",
   hints: [
    "Отделите быстрый входящий Na⁺-ток от более позднего выходящего K⁺-тока.",
    "Ищите механизм положительной обратной связи: небольшая деполяризация открывает дополнительные Na⁺-каналы."
   ]
  },
  application: {
   prompts: [
    "При 37 °C в двухионной модели K⁺ снаружи повышают с 4 до 8 мМ, K⁺ внутри 140 мМ, Na⁺ 145/12 мМ и P(Na)/P(K)=0,04 неизменны. Как изменятся E(K) и Vm?",
    "Лаборатория: K⁺ снаружи 4→8 мМ при фиксированных 37 °C, K⁺ внутри 140 мМ, Na⁺ снаружи/внутри 145/12 мМ и P(K):P(Na)=1:0,04. Какие два расчётных сдвига верны?",
    "Сравните две записи учебной модели: [K⁺]o=4 и 8 мМ, прочие параметры как в теории (37 °C, K(i)=140, Na(o/i)=145/12, P(K)=1, P(Na)=0,04). Какие E(K) и Vm получатся?"
   ],
   options: [
    "E(K): −95,0→−76,5 мВ; Vm: −71,2→−62,0 мВ. Оба становятся менее отрицательными.",
    "E(K): −95,0→−76,5 мВ; Vm: −71,2→−80,0 мВ. Vm становится более отрицательным.",
    "E(K): −95,0→−113,5 мВ; Vm: −71,2→−62,0 мВ. Только E(K) гиперполяризуется.",
    "E(K) и Vm обязательно совпадают при −76,5 мВ после увеличения K⁺ независимо от Na⁺."
   ],
   explanation: "При 37 °C RT/F≈26,73 мВ. E(K)=(RT/F)ln(Ko/Ki); Vm=(RT/F)ln((Ko+0,04Nao)/(Ki+0,04Nai)). При Ko=4: −95,0 и −71,2 мВ; при Ko=8: −76,5 и −62,0 мВ. Это расчёт, а не измерение потенциала пациента.",
   hints: [
    "При росте Ko отношение Ko/Ki увеличивается, поэтому E(K) становится менее отрицательным.",
    "Подставьте 4 и 8 мМ отдельно в числитель двухионной формулы; не меняйте концентрации Na⁺ и проницаемости."
   ]
  },
  transfer: {
   prompts: [
    "После продолжительного повышения внеклеточного K⁺ мембрана устойчиво деполяризована, а пробный стимул вызывает меньше импульсов. Какое объяснение допустимо?",
    "Краткая умеренная деполяризация облегчала ответ, но после сильной длительной деполяризации импульс не возник. Как объяснить изменение?",
    "Студент утверждает, что менее отрицательный Vm при длительной гиперкалиемии всегда означает большую возбудимость. Какой механизм опровергает универсальность вывода?"
   ],
   options: [
    "Сильная устойчивая деполяризация может инактивировать часть Na⁺-каналов и уменьшить способность запускать импульсы.",
    "Любая деполяризация независимо от длительности обязательно увеличивает частоту и надёжность импульсов.",
    "Длительная деполяризация доказывает полную остановку Na⁺/K⁺-насоса как единственную причину отсутствия импульса.",
    "Фиксированная форма импульса на рисунке симулятора доказывает, что реальный аксон сохраняет нормальное проведение."
   ],
   explanation: "Эффект зависит от амплитуды, длительности и типа клетки. Умеренная деполяризация может приближать Vm к порогу, но выраженная устойчивая деполяризация уменьшает доступность Na⁺-каналов; по одному Vm нельзя определить возбудимость или поставить диагноз.",
   hints: [
    "Различайте приближение к порогу и доступность Na⁺-каналов после длительной деполяризации.",
    "Для следующего импульса нужны доступные потенциал-зависимые Na⁺-каналы; проверьте их инактивацию."
   ]
  },
  justification: {
   prompts: [
    "В симуляторе повышение K⁺ меняет расчётный Vm, но форма нарисованного импульса не меняется. Какой вывод об ограничениях модели верен?",
    "Учебная программа вычислила Vm=−62 мВ и показала условный импульс. Что можно заключить о пациенте с повышенным K⁺?",
    "Двухионная формула предсказывает деполяризацию, а независимая анимация показывает одинаковый пик. Почему это не подтверждает нормальную возбудимость?"
   ],
   options: [
    "Формула описывает только заданные градиенты и проницаемости; независимая условная кривая не моделирует кинетику каналов, блок проведения или диагноз.",
    "Раз импульс нарисован, у пациента доказана нормальная возбудимость независимо от реального состояния Na⁺-каналов.",
    "Совпадение формы кривой означает, что Cl⁻, насос и все тканевые различия автоматически включены в формулу.",
    "Расчёт Vm однозначно определяет частоту импульсов и тяжесть гиперкалиемии без клинических данных."
   ],
   explanation: "Двухионная формула опускает Cl⁻ и прямой ток насоса. Условная кривая не связана с кинетикой Na⁺-каналов; для реальной возбудимости и клинического риска нужны дополнительные измерения и оценка пациента.",
   hints: [
    "Проверьте, какие переменные действительно вычисляются, а какие заданы для рисунка заранее.",
    "Разделите вывод о направлении Vm в модели и недоказанные выводы о проведении, ЭКГ или диагнозе."
   ]
  }
 },
 EN: {
  concept: {
   prompts: [
    "The concentrations of Na⁺ and K⁺ on both sides of a membrane are known. How do the Nernst and Goldman equations differ?",
    "With ion concentrations fixed, Vm differs from E(K). Which distinction between the equations explains this?",
    "A student calculates E(K) and calls it the exact resting voltage of every cell. How should E(K) and Vm be distinguished?"
   ],
   options: [
    "Nernst gives one ion's equilibrium potential; Goldman estimates Vm from several permeant ions and their relative permeabilities.",
    "Nernst includes Na⁺ and K⁺ together, while Goldman calculates only the K⁺ equilibrium potential.",
    "Both equations must give identical voltages even when the membrane is partly permeable to Na⁺.",
    "Goldman calculates Vm from Na⁺/K⁺-pump rate alone, without concentration gradients."
   ],
   explanation: "E(K) is the equilibrium potential for K⁺, while Vm also depends on other permeant ions. The two-ion Goldman model includes Na⁺ and K⁺ but omits Cl⁻ and the pump's direct electrogenic contribution.",
   hints: [
    "Nernst concerns a single ion. Check whether the model Vm also includes a small Na⁺ permeability.",
    "E(K) need not equal Vm: compare the numerator and denominator in the two-ion Goldman equation."
   ]
  },
  mechanism: {
   prompts: [
    "What directly causes the rapid regenerative upstroke of an axonal action potential after threshold is reached?",
    "Depolarization reaches threshold and its rate of rise sharply increases. Which channel process creates positive feedback?",
    "Under unchanged baseline conditions, a propagating spike begins its rising phase. Which rapid conductance change explains it?"
   ],
   options: [
    "Voltage-gated Na⁺ channels open and inward Na⁺ current amplifies depolarization.",
    "Delayed K⁺ channels open and inward K⁺ current accelerates depolarization.",
    "Na⁺-channel inactivation itself creates the inward Na⁺ current driving the upstroke.",
    "Na⁺/K⁺-ATPase produces the rising phase of each spike within milliseconds."
   ],
   explanation: "Activation of voltage-gated Na⁺ channels produces positive feedback. Na⁺-channel inactivation and increased K⁺ conductance subsequently contribute to repolarization; the pump sustains gradients on a longer timescale.",
   hints: [
    "Distinguish the fast inward Na⁺ current from the later outward K⁺ current.",
    "Identify positive feedback: initial depolarization opens additional Na⁺ channels."
   ]
  },
  application: {
   prompts: [
    "At 37 °C, extracellular K⁺ rises from 4 to 8 mM in a two-ion model with K(i)=140, Na(o/i)=145/12 mM and P(Na)/P(K)=0.04 unchanged. What happens to E(K) and Vm?",
    "Lab settings: K(o) 4→8 mM at 37 °C, K(i)=140, Na(o/i)=145/12 mM, P(K):P(Na)=1:0.04. Which pair of calculated shifts is correct?",
    "Compare two model trials with K(o)=4 and 8 mM and all other parameters fixed (37 °C, K(i)=140, Na(o/i)=145/12, P(K)=1, P(Na)=0.04). What are E(K) and Vm?"
   ],
   options: [
    "E(K): −95.0→−76.5 mV; Vm: −71.2→−62.0 mV. Both become less negative.",
    "E(K): −95.0→−76.5 mV; Vm: −71.2→−80.0 mV. Vm becomes more negative.",
    "E(K): −95.0→−113.5 mV; Vm: −71.2→−62.0 mV. Only E(K) hyperpolarizes.",
    "E(K) and Vm must both equal −76.5 mV after the K⁺ rise, regardless of Na⁺ permeability."
   ],
   explanation: "At 37 °C, RT/F≈26.73 mV. E(K)=(RT/F)ln(Ko/Ki); Vm=(RT/F)ln((Ko+0.04Nao)/(Ki+0.04Nai)). At Ko=4: −95.0 and −71.2 mV; at Ko=8: −76.5 and −62.0 mV. These are calculations, not a patient's measured Vm.",
   hints: [
    "As Ko rises, Ko/Ki increases and E(K) becomes less negative.",
    "Insert 4 and 8 mM separately into the two-ion formula numerator; hold Na⁺ concentrations and permeabilities fixed."
   ]
  },
  transfer: {
   prompts: [
    "After a prolonged extracellular K⁺ increase, the membrane is persistently depolarized and a test stimulus evokes fewer spikes. Which explanation is justified?",
    "Brief modest depolarization facilitated firing, but after strong sustained depolarization a spike could not be evoked. Why?",
    "A student says that a less negative Vm during sustained hyperkalemia always means greater excitability. Which mechanism challenges this claim?"
   ],
   options: [
    "Strong sustained depolarization can inactivate some Na⁺ channels and reduce the ability to initiate spikes.",
    "Every depolarization necessarily increases spike frequency and reliability regardless of its duration.",
    "Sustained depolarization proves that complete Na⁺/K⁺-pump arrest is the sole reason a spike fails.",
    "An unchanged illustrative spike trace proves that a real axon still conducts normally."
   ],
   explanation: "Effects depend on magnitude, duration and cell type. Modest depolarization may bring Vm closer to threshold, but marked sustained depolarization reduces Na⁺-channel availability; Vm alone does not establish excitability or diagnosis.",
   hints: [
    "Distinguish approaching threshold from Na⁺-channel availability after sustained depolarization.",
    "The next spike needs available voltage-gated Na⁺ channels; consider their inactivation."
   ]
  },
  justification: {
   prompts: [
    "In the simulator, raising K⁺ changes calculated Vm but leaves the drawn spike shape unchanged. What is the valid limitation?",
    "A teaching program calculates Vm=−62 mV and displays a schematic spike. What can be inferred about a patient with high K⁺?",
    "A two-ion formula predicts depolarization while an independent animation shows the same spike peak. Why does this not establish normal excitability?"
   ],
   options: [
    "The formula describes stipulated gradients and permeabilities; the separate trace does not model channel kinetics, conduction block or diagnosis.",
    "Because a spike is drawn, the patient's excitability is proven normal regardless of actual Na⁺-channel availability.",
    "The unchanged trace means Cl⁻, pump current and all tissue differences are automatically included in the equation.",
    "Calculated Vm uniquely determines spike frequency and hyperkalemia severity without clinical observations."
   ],
   explanation: "The two-ion equation omits Cl⁻ and direct pump current. The illustrative trace is not coupled to Na⁺-channel kinetics; physiological excitability and clinical risk require further measurements and patient assessment.",
   hints: [
    "Identify which variables the model actually computes and which are predetermined for display.",
    "Separate a predicted Vm direction from unproven conclusions about conduction, ECG or diagnosis."
   ]
  }
 },
 KZ: {
  concept: {
   prompts: [
    "Мембрананың екі жағындағы Na⁺ және K⁺ концентрациялары белгілі. Нернст пен Гольдман теңдеулерінің нәтижелері қалай ерекшеленеді?",
    "Ион концентрациялары тұрақты болғанда Vm пен E(K) әртүрлі. Екі теңдеудің қандай айырмашылығы мұны түсіндіреді?",
    "Студент E(K)-ті есептеп, оны кез келген жасушаның нақты тыныштық потенциалы деді. E(K) пен Vm-ді қалай ажырату керек?"
   ],
   options: [
    "Нернст бір ионның тепе-теңдік потенциалын береді; Гольдман бірнеше ион мен олардың салыстырмалы өткізгіштігін ескеріп Vm-ді бағалайды.",
    "Нернст Na⁺ пен K⁺-ті бірге ескереді, ал Гольдман тек K⁺-тің тепе-теңдік потенциалын есептейді.",
    "Мембрана Na⁺-ке аздап өткізгіш болса да, екі теңдеу әрқашан бірдей нәтиже береді.",
    "Гольдман Vm-ді иондық градиентсіз, тек Na⁺/K⁺-сорғысының жылдамдығымен есептейді."
   ],
   explanation: "E(K) — K⁺-тің тепе-теңдік потенциалы, ал Vm басқа өтетін иондарға да тәуелді. Екі ионды Гольдман моделі Na⁺ пен K⁺-ті қамтиды, бірақ Cl⁻ пен сорғының тікелей электрогендік үлесін ескермейді.",
   hints: [
    "Нернст бір ионға арналған. Vm есебінде Na⁺-ке аздаған өткізгіштік бар-жоғын тексеріңіз.",
    "E(K) міндетті түрде Vm-ге тең емес: екі ионды Гольдман теңдеуінің алымы мен бөлімін салыстырыңыз."
   ]
  },
  mechanism: {
   prompts: [
    "Аксонда табалдырыққа жеткеннен кейін әрекет потенциалының тез көтерілуін тікелей қандай тетік туғызады?",
    "Деполяризация табалдырыққа жеткенде оның көтерілуі күрт жылдамдайды. Қай арналық тетік оң кері байланысты жасайды?",
    "Бастапқы жағдайлар өзгермегенде таралатын импульстің көтерілу фазасы басталды. Өткізгіштіктің қандай тез өзгерісі оны түсіндіреді?"
   ],
   options: [
    "Кернеуге тәуелді Na⁺ арналары ашылып, ішке бағытталған Na⁺ тогы деполяризацияны күшейтеді.",
    "Кеш ашылатын K⁺ арналары ішке бағытталған K⁺ тогын туғызып, деполяризацияны жылдамдатады.",
    "Na⁺ арналарының инактивациясы көтерілуді қамтамасыз ететін ішке бағытталған Na⁺ тогын тудырады.",
    "Na⁺/K⁺-АТФаза әр импульстің көтерілу фазасын миллисекундтарда өзі жасайды."
   ],
   explanation: "Кернеуге тәуелді Na⁺ арналарының белсенуі оң кері байланысты тудырады. Кейін Na⁺ арналарының инактивациясы және K⁺ өткізгіштігінің артуы реполяризацияға көмектеседі; сорғы градиенттерді ұзақ уақыт ауқымында сақтайды.",
   hints: [
    "Тез ішке бағытталған Na⁺ тогын кейінгі сыртқа бағытталған K⁺ тогынан ажыратыңыз.",
    "Оң кері байланысқа назар аударыңыз: бастапқы деполяризация қосымша Na⁺ арналарын ашады."
   ]
  },
  application: {
   prompts: [
    "37 °C-та екі ионды модельде сыртқы K⁺ 4-тен 8 мМ-ге өседі, K(i)=140, Na(o/i)=145/12 мМ және P(Na)/P(K)=0,04 өзгермейді. E(K) пен Vm қалай өзгереді?",
    "Зертхана: сыртқы K⁺ 4→8 мМ, 37 °C, K(i)=140, Na(o/i)=145/12 мМ, P(K):P(Na)=1:0,04. Есептелген екі ығысу қайсы?",
    "K(o)=4 және 8 мМ болған екі модельдік тәжірибені салыстырыңыз; қалғаны тұрақты (37 °C, K(i)=140, Na(o/i)=145/12, P(K)=1, P(Na)=0,04). E(K) пен Vm қандай?"
   ],
   options: [
    "E(K): −95,0→−76,5 мВ; Vm: −71,2→−62,0 мВ. Екеуі де азырақ теріс болады.",
    "E(K): −95,0→−76,5 мВ; Vm: −71,2→−80,0 мВ. Vm терісірек болады.",
    "E(K): −95,0→−113,5 мВ; Vm: −71,2→−62,0 мВ. Тек E(K) гиперполяризацияланады.",
    "K⁺ өскеннен кейін Na⁺ өткізгіштігіне қарамастан E(K) пен Vm міндетті түрде −76,5 мВ-ке тең."
   ],
   explanation: "37 °C-та RT/F≈26,73 мВ. E(K)=(RT/F)ln(Ko/Ki); Vm=(RT/F)ln((Ko+0,04Nao)/(Ki+0,04Nai)). Ko=4 кезінде −95,0 және −71,2 мВ; Ko=8 кезінде −76,5 және −62,0 мВ. Бұл есептік мәндер, пациенттің Vm өлшемі емес.",
   hints: [
    "Ko артқанда Ko/Ki қатынасы өседі, сондықтан E(K) азырақ теріс болады.",
    "Екі ионды формула алымына 4 және 8 мМ-ді бөлек қойыңыз; Na⁺ концентрациялары мен өткізгіштіктерді өзгертпеңіз."
   ]
  },
  transfer: {
   prompts: [
    "Сыртқы K⁺ ұзақ жоғарылаған соң мембрана тұрақты деполяризацияланып, сынақ стимулы азырақ импульс тудырды. Қай түсіндіру негізді?",
    "Қысқа орташа деполяризация импульсті жеңілдетті, бірақ күшті ұзақ деполяризациядан кейін импульс тумады. Неліктен?",
    "Студент ұзақ гиперкалиемия кезіндегі азырақ теріс Vm әрқашан жоғары қозғыштықты білдіреді деді. Қандай тетік бұл пікірді шектейді?"
   ],
   options: [
    "Күшті тұрақты деполяризация Na⁺ арналарының бір бөлігін инактивациялап, импульс бастау қабілетін төмендетуі мүмкін.",
    "Кез келген деполяризация ұзақтығына қарамастан импульс жиілігі мен сенімділігін міндетті түрде арттырады.",
    "Ұзақ деполяризация импульс болмауының жалғыз себебі Na⁺/K⁺-сорғысының толық тоқтауы екенін дәлелдейді.",
    "Симулятордағы өзгермейтін шартты импульс нақты аксонда өткізудің қалыпты екенін дәлелдейді."
   ],
   explanation: "Әсері деполяризация шамасына, ұзақтығына және жасуша түріне тәуелді. Орташа деполяризация Vm-ді табалдырыққа жақындата алады, ал айқын тұрақты деполяризация Na⁺ арналарының қолжетімділігін азайтады; тек Vm арқылы қозғыштық не диагноз анықталмайды.",
   hints: [
    "Табалдырыққа жақындауды ұзақ деполяризациядан кейінгі Na⁺ арналарының қолжетімділігінен ажыратыңыз.",
    "Келесі импульске белсендіруге болатын Na⁺ арналары қажет; олардың инактивациясын ескеріңіз."
   ]
  },
  justification: {
   prompts: [
    "Симуляторда K⁺ артқанда есептелген Vm өзгереді, бірақ сызылған импульс пішіні өзгермейді. Модельдің қандай шектеуі дұрыс?",
    "Оқу бағдарламасы Vm=−62 мВ деп есептеп, шартты импульсті көрсетті. K⁺ жоғары пациент туралы қандай қорытынды жасауға болады?",
    "Екі ионды формула деполяризацияны болжайды, ал бөлек анимацияда импульс шыңы бірдей. Неге бұл қалыпты қозғыштықты дәлелдемейді?"
   ],
   options: [
    "Формула берілген градиенттер мен өткізгіштіктерді сипаттайды; бөлек қисық арна кинетикасын, өткізу блогын не диагнозды модельдемейді.",
    "Импульс сызылғандықтан, нақты Na⁺ арналарының күйіне қарамастан пациенттің қозғыштығы қалыпты екені дәлелденеді.",
    "Қисықтың өзгермеуі Cl⁻, сорғы тогы және тіндердің барлық айырмашылығы формулаға енгізілгенін білдіреді.",
    "Есептелген Vm клиникалық деректерсіз импульс жиілігі мен гиперкалиемия ауырлығын бірмәнді анықтайды."
   ],
   explanation: "Екі ионды теңдеу Cl⁻ пен сорғының тікелей тогын ескермейді. Шартты қисық Na⁺ арналарының кинетикасымен байланыспайды; нақты қозғыштық пен клиникалық қауіпті бағалау үшін қосымша өлшеулер және пациентті тексеру қажет.",
   hints: [
    "Модель нақты қандай айнымалыларды есептейтінін, ал қайсысы сурет үшін алдын ала берілгенін анықтаңыз.",
    "Vm бағыты туралы болжамды өткізу, ЭКГ не диагноз жөніндегі дәлелденбеген қорытындылардан ажыратыңыз."
   ]
  }
 }
};

export function createModuleFourTest(language: Language, base: BranchingTest): BranchingTest {
 const nodes: BranchingTest["nodes"] = { ...base.nodes };
 const skills: Skill[] = ["concept","mechanism","application","transfer","justification"];
 const levels: QuestionNode["level"][] = ["main","corrective","basic"];
 for (const [i, skill] of skills.entries()) {
  const data = authored[language][skill];
  for (const [j, level] of levels.entries()) {
   const key = skill + ":" + level;
   const old = nodes[key];
   if (!old || old.type !== "question") throw new Error("Missing module 4 question node " + key);
   const options: TestOption[] = data.options.map((value,k) => ({ id: "abcd"[k], text: value }));
   const offset = (i + j + 4) % options.length;
   nodes[key] = {
    ...old,
    prompt: data.prompts[j],
    options: [...options.slice(offset), ...options.slice(0,offset)],
    correctAnswer: "a",
    explanation: data.explanation
   };
  }
  for (const [j, depth] of [1,2].entries()) {
   const key = skill + ":review-" + depth;
   const old = nodes[key];
   if (!old || old.type !== "remediation") throw new Error("Missing module 4 remediation " + key);
   nodes[key] = { ...old, text: data.hints[j] };
  }
 }
 return { ...base, nodes };
}
