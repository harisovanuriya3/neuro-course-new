import type { Language } from "../course";
import type { PretestLesson } from "../study";

// Module 6: formative diagnostic questions on integration, not a scored exam.
// Ganong 23e, chapter 6 (PDF pp. 132–133): EPSP/IPSP, temporal and spatial summation,
// chloride reversal potential, and axon initial-segment spike initiation.
// Guyton & Hall 13e, chapter 46 (PDF pp. 559–560): receptor-dependent ion conductances.
// Ghai 8e (PDF pp. 353–354) describes an isolated nerve-muscle experiment;
// it does not directly measure central neuronal summation or shunting inhibition.
type Item = {
  prompt: string;
  options: [string, string, string, string];
  correctAnswer: "a" | "b" | "c" | "d";
  explanation: string;
};
type Copy = { introduction: string; questions: [Item, Item] };
const localized: Record<Language, Copy> = {
  RU: {
    introduction: "Два вопроса для самопроверки перед изучением возбуждения и торможения. Это диагностика понимания, а не экзамен: после выбора прочитайте объяснение.",
    questions: [
      {
        prompt: "Один и тот же возбуждающий вход активируют дважды с коротким интервалом: второй ВПСП начинается до затухания первого. При прочих равных суммарная деполяризация становится больше. Как называется механизм?",
        options: [
          "Пространственная суммация входов от разных синапсов.",
          "Рефрактерность аксона, при которой второй импульс обязательно исчезает.",
          "Временная суммация перекрывающихся ВПСП одного входа.",
          "Превращение каждого ВПСП в потенциал действия независимо от порога.",
        ],
        correctAnswer: "c",
        explanation: "Это временная суммация: второй ВПСП накладывается на остаточную деполяризацию от первого. Пространственная суммация относится к одновременным входам из разных мест. Суммарный ответ может приблизить начальный сегмент аксона к порогу, но не гарантирует разряд.",
      },
      {
        prompt: "Тормозный синапс увеличивает Cl⁻-проводимость мембраны. Потенциал равновесия Cl⁻ близок к исходному мембранному потенциалу, поэтому заметной гиперполяризации нет. Почему одновременный ВПСП всё же может стать меньше?",
        options: [
          "Любое открытие Cl⁻-каналов автоматически прекращает проведение ПД по пресинаптическому аксону.",
          "Возросшая мембранная проводимость шунтирует возбуждающий ток и уменьшает локальную деполяризацию.",
          "Отсутствие гиперполяризации доказывает отсутствие торможения.",
          "Cl⁻-каналы напрямую разрушают молекулы возбуждающего медиатора в синаптической щели.",
        ],
        correctAnswer: "b",
        explanation: "Когда мембранный потенциал близок к ECl, открытие Cl⁻-каналов может почти не изменить напряжение покоя, но снизить входное сопротивление. Тогда тот же возбуждающий ток создаёт меньшую деполяризацию — шунтирующее торможение. Направление и величина Cl⁻-тока зависят от электрохимического градиента.",
      },
    ],
  },
  EN: {
    introduction: "Two diagnostic questions before studying excitation and inhibition. This is formative self-checking, not an examination: read the explanation after choosing.",
    questions: [
      {
        prompt: "The same excitatory input is activated twice at a short interval: the second EPSP starts before the first has decayed. Under otherwise matched conditions, the combined depolarization increases. What mechanism is this?",
        options: [
          "Spatial summation of inputs from different synapses.",
          "Axonal refractoriness, which necessarily abolishes the second impulse.",
          "Temporal summation of overlapping EPSPs from one input.",
          "Conversion of every EPSP into an action potential regardless of threshold.",
        ],
        correctAnswer: "c",
        explanation: "This is temporal summation: the second EPSP overlaps the residual depolarization from the first. Spatial summation combines inputs from different locations. The combined voltage can bring the axon initial segment closer to threshold but does not guarantee a spike.",
      },
      {
        prompt: "An inhibitory synapse increases membrane Cl⁻ conductance. The Cl⁻ equilibrium potential is near the resting membrane potential, so little hyperpolarization is visible. Why might a simultaneous EPSP still become smaller?",
        options: [
          "Opening any Cl⁻ channel automatically blocks spikes in the presynaptic axon.",
          "The increased membrane conductance shunts excitatory current, reducing local depolarization.",
          "The absence of hyperpolarization proves that no inhibition occurs.",
          "Cl⁻ channels directly destroy excitatory neurotransmitter molecules in the synaptic cleft.",
        ],
        correctAnswer: "b",
        explanation: "Near ECl, opening Cl⁻ channels may barely change resting voltage but can lower input resistance. The same excitatory current then produces less depolarization: shunting inhibition. The direction and magnitude of Cl⁻ current depend on its electrochemical gradient.",
      },
    ],
  },
  KZ: {
    introduction: "Қозу мен тежелуді оқымас бұрын екі диагностикалық сұраққа жауап беріңіз. Бұл емтихан емес: таңдаудан кейін түсіндірмені оқыңыз.",
    questions: [
      {
        prompt: "Бір қоздырушы кіріс қысқа аралықпен екі рет белсендіріледі: екінші қоздырушы постсинапстық потенциал (ҚПСП) біріншісі басылмай тұрып басталады. Басқа шарттар бірдей болғанда жиынтық деполяризация ұлғаяды. Бұл қандай механизм?",
        options: [
          "Әртүрлі синапстардан келген кірістердің кеңістіктік қосылуы.",
          "Екінші импульсті міндетті түрде жоятын аксон рефрактерлігі.",
          "Бір кірістен пайда болған ҚПСП-лардың уақыт бойынша қосылуы.",
          "Табалдырыққа тәуелсіз әр ҚПСП-ның әрекет потенциалына айналуы.",
        ],
        correctAnswer: "c",
        explanation: "Бұл — уақыттық қосылу: екінші ҚПСП біріншісінен қалған деполяризациямен қабаттасады. Кеңістіктік қосылу әртүрлі орындардан келген кірістерге тән. Жиынтық жауап аксонның бастапқы сегментін табалдырыққа жақындатуы мүмкін, бірақ импульстің пайда болуына кепілдік бермейді.",
      },
      {
        prompt: "Тежеуші синапс мембрананың Cl⁻ өткізгіштігін арттырады. Cl⁻ тепе-теңдік потенциалы тыныштық потенциалына жақын болғандықтан айқын гиперполяризация байқалмайды. Неліктен қатар келген ҚПСП бәрібір кішіреюі мүмкін?",
        options: [
          "Кез келген Cl⁻ арнасының ашылуы пресинапстық аксондағы импульсті міндетті түрде тоқтатады.",
          "Мембрана өткізгіштігінің артуы қоздырушы токты шунттап, жергілікті деполяризацияны азайтады.",
          "Гиперполяризация болмаса, тежелу де болмайды.",
          "Cl⁻ арналары синапстық саңылаудағы қоздырушы медиатор молекулаларын тікелей ыдыратады.",
        ],
        correctAnswer: "b",
        explanation: "Мембраналық потенциал ECl-ге жақын кезде Cl⁻ арналарының ашылуы тыныштық кернеуін аз өзгертіп, кіріс кедергісін төмендетуі мүмкін. Сонда сол бір қоздырушы ток әлсіздеу деполяризация тудырады: бұл шунттаушы тежелу. Cl⁻ тогының бағыты мен шамасы электрохимиялық градиентке тәуелді.",
      },
    ],
  },
};

export function createModuleSixPretest(
  language: Language,
  moduleTitle: string,
  title: string,
): PretestLesson {
  const copy = localized[language];
  return {
    kind: "pretest",
    title,
    introduction: copy.introduction,
    questions: copy.questions.map((item, index) => ({
      id: index === 0 ? "module-6-pretest-temporal" : "module-6-pretest-shunting",
      topic: moduleTitle,
      prompt: item.prompt,
      options: item.options.map((option, optionIndex) => ({
        id: ["a", "b", "c", "d"][optionIndex],
        text: option,
      })),
      correctAnswer: item.correctAnswer,
      explanation: item.explanation,
      target: { section: "theory" as const },
    })),
  };
}
