import type { Language } from "../course";
import { getSectionTitle } from "../sections";
import type { ReadingLesson } from "../study";

// Module 6 scientific recap. Ganong 23e, chapter 6 (PDF pp. 132–134);
// Guyton & Hall 13e, chapter 46 (PDF pp. 560, 564–565).
// Ghai 8e (PDF pp. 353–354) studies a peripheral nerve-muscle
// preparation, NOT direct central-neuron synaptic integration.
type Takeaway = { title: string; explanation: string };
const takeaways: Record<Language, [Takeaway, Takeaway, Takeaway, Takeaway, Takeaway]> = {
  RU: [
    { title: "ВПСП и порог", explanation: "Возбуждающий постсинаптический потенциал (ВПСП) — градуированное локальное изменение, а не потенциал действия. В типичном мотонейроне разряд начинается в начальном сегменте аксона при достижении порога; одиночный ВПСП не гарантирует импульс." },
    { title: "Два вида суммации", explanation: "Временная суммация возникает, когда повторный постсинаптический потенциал приходит до затухания предыдущего; пространственная — когда действуют входы разных синапсов. Результат зависит также от расстояния, времени и мембранной проводимости." },
    { title: "Торможение без гиперполяризации", explanation: "Если потенциал мембраны близок к потенциалу реверсии Cl⁻, открытие Cl⁻-проводимости может почти не менять напряжение покоя, но уменьшает входное сопротивление и ослабляет совпадающий ВПСП: это шунтирующее торможение. Направление Cl⁻-тока зависит от движущей силы." },
    { title: "Где действует торможение", explanation: "Постсинаптическое торможение меняет проводимость клетки-мишени. Пресинаптическое торможение действует на окончание аксона и может снижать вероятность выделения медиатора, например через уменьшение входа Ca²⁺. Эти механизмы нельзя отождествлять." },
    { title: "Границы интерпретации", explanation: "Амплитуда ответа, измеренная только на соме, не определяет однозначно разряд в начальном сегменте или место торможения. Для вывода нужны условия стимуляции, место регистрации, временной ход и, по возможности, данные о проводимости." },
  ],
  EN: [
    { title: "EPSP versus spike threshold", explanation: "An excitatory postsynaptic potential (EPSP) is a graded local response, not an action potential. In a typical motor neuron a spike begins at the axon initial segment when threshold is reached; one EPSP does not guarantee a spike." },
    { title: "Two forms of summation", explanation: "Temporal summation occurs when a new postsynaptic potential arrives before the preceding one decays; spatial summation combines inputs at different synapses. Timing, location and membrane conductance also affect the result." },
    { title: "Inhibition without hyperpolarization", explanation: "If membrane potential is near the Cl⁻ reversal potential, opening Cl⁻ conductance may barely change resting voltage yet reduce input resistance and attenuate a coincident EPSP: shunting inhibition. Cl⁻ current direction depends on its driving force." },
    { title: "Sites of inhibition", explanation: "Postsynaptic inhibition alters target-cell conductance. Presynaptic inhibition acts at an axon terminal and may lower transmitter-release probability, for example by reducing Ca²⁺ entry. These are distinct mechanisms." },
    { title: "Limits of inference", explanation: "A response amplitude recorded only at the soma does not uniquely establish spike initiation at the axon initial segment or the site of inhibition. Interpretation requires stimulus conditions, recording location, timing and, when available, conductance data." },
  ],
  KZ: [
    { title: "Қоздырушы постсинапстық потенциал және табалдырық", explanation: "Қоздырушы постсинапстық потенциал (ҚПСП) — жергілікті, шамасы өзгеретін жауап; ол әрекет потенциалы емес. Әдеттегі мотонейронда табалдырыққа жеткенде әрекет потенциалы аксонның бастапқы сегментінде басталады; бір ҚПСП разрядтың міндетті түрде туатынын білдірмейді." },
    { title: "Суммацияның екі түрі", explanation: "Уақыттық суммация келесі постсинапстық потенциал алдыңғысы өшпей тұрып пайда болғанда байқалады; кеңістіктік суммация әртүрлі синапстардан келген әсерлерді біріктіреді. Нәтиже уақытқа, орналасуға және мембраналық өткізгіштікке де тәуелді." },
    { title: "Гиперполяризациясыз тежелу", explanation: "Мембрана потенциалы Cl⁻ иондарының реверсия потенциалына жақын болса, Cl⁻ өткізгіштігінің артуы тыныштықтағы кернеуді аз өзгертіп, кіріс кедергісін төмендетуі және бір мезгілдегі ҚПСП-ны әлсіретуі мүмкін: бұл шунттаушы тежелу. Cl⁻ тогының бағыты иондық қозғаушы күшке тәуелді." },
    { title: "Тежелудің әсер ету орны", explanation: "Постсинапстық тежелу нысана жасушаның өткізгіштігін өзгертеді. Пресинапстық тежелу аксон ұшына әсер етіп, мысалы Ca²⁺ енуін азайту арқылы медиатордың бөліну ықтималдығын төмендетуі мүмкін. Бұл екі түрлі механизм." },
    { title: "Қорытындының шектеулері", explanation: "Тек сомада тіркелген жауап амплитудасы аксонның бастапқы сегментінде импульстің басталғанын немесе тежелу орнын бірмәнді көрсетпейді. Түсіндіру үшін тітіркендіру жағдайы, тіркеу орны, уақыттық өзгеріс және мүмкін болса мембраналық өткізгіштік деректері қажет." },
  ],
};

export function createModuleSixSummary(language: Language): ReadingLesson {
  return {
    kind: "one-minute",
    title: getSectionTitle("one-minute", language),
    introduction: language === "RU" ? "Пять ключевых физиологических выводов о возбуждении и торможении."
      : language === "EN" ? "Five key physiological takeaways about excitation and inhibition."
      : "Қозу мен тежелу туралы бес негізгі физиологиялық қорытынды.",
    cards: takeaways[language].map(({ title, explanation }, index) => ({
      id: "module-6-summary-" + (index + 1),
      title: (index + 1) + ". " + title,
      paragraphs: [explanation],
      links: [{ section: "theory" }, { section: "practice" }],
    })),
  };
}
