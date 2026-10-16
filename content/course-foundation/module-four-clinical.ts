import type { Language } from "../course";
import type { ReadingLesson } from "../study";
import { getSectionTitle } from "../sections";

// Module 4 clinical bridge: a controlled two-ion teaching calculation, not a
// patient-specific prediction. Basis: Guyton & Hall 13e ch. 5; Ganong 23e
// ch. 1 (electrochemical gradients); Ghai Practical Physiology 8e chart 5-5.
type Card = { title: string; paragraph: string; link: "theory" | "interactive" | "cases" | "practice" };
type Copy = { introduction: string; cards: [Card, Card, Card, Card, Card] };
const copy: Record<Language, Copy> = {
  RU: {
    introduction: "Клинический мост: повышение калия крови и мембранный потенциал. Сначала рассчитайте учебную модель, затем отделите её выводы от клинической оценки пациента.",
    cards: [
      { title: "1. Ситуация и исходные данные", paragraph: "У пациента выявлено значительное повышение калия крови. Для разбора механизма используйте отдельную модель мембраны при 37 °C: [K⁺] внутри 140 мМ, снаружи сначала 4, затем 8 мМ; [Na⁺] снаружи 145, внутри 12 мМ; P(K)=1, P(Na)=0,04. Это параметры учебной модели, а не измеренный потенциал клетки пациента.", link: "theory" },
      { title: "2. Расчёт: что изменилось?", paragraph: "По Нернсту E(K) изменяется приблизительно от −95,0 до −76,5 мВ. В двухионном приближении Гольдмана Vm изменяется от −71,2 до −62,0 мВ: деполяризация примерно на 9,1 мВ. Сравнивайте одинаковые температуру, внутриклеточные концентрации и проницаемости.", link: "interactive" },
      { title: "3. Объясните возможную слабость", paragraph: "Рост внеклеточного K⁺ уменьшает калиевый градиент и делает потенциал покоя менее отрицательным. Умеренная деполяризация иногда облегчает достижение порога, но длительная выраженная деполяризация может инактивировать часть потенциал-зависимых Na⁺-каналов и нарушить генерацию распространяющихся импульсов. Следовательно, деполяризация не означает неизбежного повышения возбудимости.", link: "theory" },
      { title: "4. Как отличить механизм от ошибки измерения?", paragraph: "Назовите, какие дополнительные клинические данные необходимы: повторная оценка калия с учётом возможного гемолиза пробы, ЭКГ, состояние почек, лекарства и симптомы. Вычисление Vm не заменяет оценку риска у пациента; выраженная гиперкалиемия требует безотлагательной клинической оценки.", link: "cases" },
      { title: "5. Граница физиологического вывода", paragraph: "Модель не учитывает Cl⁻, электрогенный вклад Na⁺/K⁺-АТФазы, реальные различия между тканями и кинетику каналов. Она показывает направление изменения Vm при заданных условиях, но не рассчитывает вероятность импульса, силу мышц, ЭКГ или диагноз. Сформулируйте один вывод, который модель подтверждает, и один, который не подтверждает.", link: "practice" },
    ],
  },
  EN: {
    introduction: "Clinical bridge: elevated blood potassium and membrane potential. Calculate a teaching model first, then distinguish its predictions from assessment of a patient.",
    cards: [
      { title: "1. Case and given values", paragraph: "A patient has markedly elevated blood potassium. To examine the mechanism, use a separate membrane model at 37 °C: intracellular [K⁺] 140 mM, extracellular [K⁺] initially 4 and then 8 mM; extracellular [Na⁺] 145 and intracellular [Na⁺] 12 mM; P(K)=1, P(Na)=0.04. These are teaching-model inputs, not a measured membrane potential in this patient.", link: "theory" },
      { title: "2. Calculate the change", paragraph: "The Nernst E(K) changes from approximately −95.0 to −76.5 mV. In the two-ion Goldman approximation, Vm changes from −71.2 to −62.0 mV, a depolarization of about 9.1 mV. Keep temperature, intracellular concentrations and permeabilities fixed when comparing the conditions.", link: "interactive" },
      { title: "3. Explain possible weakness", paragraph: "Raising extracellular K⁺ reduces the potassium gradient and makes resting Vm less negative. Modest depolarization may sometimes facilitate reaching threshold, whereas marked sustained depolarization can inactivate voltage-gated Na⁺ channels and impair propagated spikes. Depolarization therefore does not invariably increase excitability.", link: "theory" },
      { title: "4. Distinguish mechanism from measurement error", paragraph: "Identify additional clinical information needed: reassessment of potassium with possible sample hemolysis in mind, ECG, kidney function, medications and symptoms. Calculated Vm cannot replace risk assessment; marked hyperkalemia warrants urgent clinical evaluation.", link: "cases" },
      { title: "5. Limits of inference", paragraph: "This model omits Cl⁻, the direct electrogenic Na⁺/K⁺-ATPase contribution, tissue differences and channel kinetics. It predicts the direction of Vm change under stated assumptions, but not spike probability, muscle strength, ECG findings or diagnosis. State one supported and one unsupported conclusion.", link: "practice" },
    ],
  },
  KZ: {
    introduction: "Клиникалық байланыс: қандағы калийдің жоғарылауы және мембраналық потенциал. Алдымен оқу моделін есептеп, оның нәтижесін пациентті клиникалық бағалаудан ажыратыңыз.",
    cards: [
      { title: "1. Жағдай және бастапқы деректер", paragraph: "Пациенттің қанында калий деңгейі айқын жоғарылаған. Тетікті талдау үшін 37 °C-тағы жеке мембрана моделін қолданыңыз: жасуша ішіндегі [K⁺] 140 мМ, сыртындағы [K⁺] алдымен 4, кейін 8 мМ; сыртқы [Na⁺] 145, ішкі [Na⁺] 12 мМ; P(K)=1, P(Na)=0,04. Бұлар пациент жасушасында өлшенген потенциал емес, оқу моделінің параметрлері.", link: "theory" },
      { title: "2. Өзгерісті есептеңіз", paragraph: "Нернст бойынша E(K) шамамен −95,0 мВ-тан −76,5 мВ-қа өзгереді. Гольдманның екі ионды жуықтауында Vm −71,2 мВ-тан −62,0 мВ-қа өзгереді: деполяризация шамамен 9,1 мВ. Салыстыру кезінде температураны, жасушаішілік концентрациялар мен өткізгіштіктерді тұрақты ұстаңыз.", link: "interactive" },
      { title: "3. Ықтимал әлсіздікті түсіндіріңіз", paragraph: "Жасушадан тыс K⁺ көбеюі калий градиентін азайтып, тыныштық Vm мәнін азырақ теріс етеді. Орташа деполяризация кейде табалдырыққа жетуді жеңілдетеді, ал айқын әрі ұзақ деполяризация кернеуге тәуелді Na⁺ арналарының бір бөлігін инактивациялап, таралатын импульстердің түзілуін бұзуы мүмкін. Демек, деполяризация қозғыштықты міндетті түрде арттырмайды.", link: "theory" },
      { title: "4. Тетікті өлшеу қатесінен ажыратыңыз", paragraph: "Қандай қосымша клиникалық деректер қажет екенін атаңыз: үлгінің гемолизін ескере отырып калийді қайта бағалау, ЭКГ, бүйрек қызметі, қабылданатын дәрілер және симптомдар. Есептелген Vm пациенттің қаупін бағалауды алмастырмайды; айқын гиперкалиемия шұғыл клиникалық бағалауды қажет етеді.", link: "cases" },
      { title: "5. Қорытындының шегі", paragraph: "Бұл модель Cl⁻ иондарын, Na⁺/K⁺-АТФазаның тікелей электрогендік үлесін, тіндер арасындағы айырмашылықтарды және арналар кинетикасын ескермейді. Ол берілген жағдайларда Vm өзгерісінің бағытын көрсетеді, бірақ импульс ықтималдығын, бұлшықет күшін, ЭКГ өзгерістерін немесе диагнозды есептемейді. Модель қолдайтын бір қорытындыны және қолдамайтын бір қорытындыны атаңыз.", link: "practice" },
    ],
  },
};

export function createModuleFourClinical(language: Language): ReadingLesson {
  const c = copy[language];
  return {
    kind: "clinical",
    title: getSectionTitle("clinical", language),
    introduction: c.introduction,
    cards: c.cards.map((card, index) => ({
      id: "module-4-clinical-" + (index + 1),
      title: card.title,
      paragraphs: [card.paragraph],
      links: [{ section: card.link }],
    })),
  };
}
