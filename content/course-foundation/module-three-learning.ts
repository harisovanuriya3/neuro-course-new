import type { Language } from '../course';
import { getSectionTitle } from '../sections';
import type { ObjectivesLesson, ReadingLesson } from '../study';

// Authored, assessable outcomes and factual recap for module 3.
// Scientific basis: Ganong 23e, chapter 4; Guyton & Hall 13e, chapter 5;
// C. L. Ghai 8e, nerve conduction studies (pp. 226–228).
type LearningItem = { title: string; description: string };
type SummaryItem = { title: string; text: string };

export const moduleThreeObjectives: Record<Language, LearningItem[]> = {
  RU: [
    { title: '1. Обозначить функциональные зоны нейрона', description: 'На схеме обозначить дендриты, сому, участок генерации потенциала действия, аксон и окончания; объяснить, почему у некоторых чувствительных нейронов место генерации импульса отличается от типичной схемы мотонейрона.' },
    { title: '2. Сопоставить функции глиальных клеток', description: 'Сравнить астроциты, микроглию, олигодендроциты и шванновские клетки; указать, какие клетки поддерживают внеклеточный K⁺ и какие формируют миелин в ЦНС и ПНС.' },
    { title: '3. Объяснить сальтаторное проведение', description: 'Показать роль миелина и перехватов Ранвье в распространении потенциала действия и объяснить, почему демиелинизация может замедлять проведение или приводить к его блоку.' },
    { title: '4. Предсказать результат эксперимента', description: 'При неизменных длине пути и температуре предсказать, как изменение диаметра и миелинизации влияет на скорость проведения; отличить качественный прогноз от точного измерения.' },
    { title: '5. Интерпретировать клинические данные', description: 'По увеличенной латентности или сниженной скорости проведения предложить возможный механизм и назвать дополнительное исследование; не устанавливать по одному показателю диагноз и точное место поражения.' },
  ],
  EN: [
    { title: '1. Identify functional zones of a neuron', description: 'Label dendrites, soma, the action-potential initiation site, axon, and terminals; explain why the initiation site in some sensory neurons differs from the typical motor-neuron diagram.' },
    { title: '2. Compare glial cell functions', description: 'Distinguish astrocytes, microglia, oligodendrocytes, and Schwann cells; identify which cells help regulate extracellular K⁺ and which produce myelin in the CNS and PNS.' },
    { title: '3. Explain saltatory conduction', description: 'Describe the roles of myelin and nodes of Ranvier in action-potential propagation and explain why demyelination may slow conduction or cause conduction block.' },
    { title: '4. Predict an experimental result', description: 'With distance and temperature held constant, predict how changes in axonal diameter and myelination affect conduction velocity; distinguish a qualitative prediction from a measured value.' },
    { title: '5. Interpret clinical evidence', description: 'Given prolonged latency or reduced conduction velocity, suggest a possible mechanism and an additional test; do not diagnose a specific disorder or lesion site from one value alone.' },
  ],
  KZ: [
    { title: '1. Нейронның функциялық аймақтарын белгілеу', description: 'Сызбада дендриттерді, соманы, әрекет потенциалы басталатын аймақты, аксонды және оның ұштарын белгілеу; кейбір сезгіш нейрондарда импульс басталатын орынның әдеттегі мотонейрон сызбасынан неліктен өзгеше екенін түсіндіру.' },
    { title: '2. Глия жасушаларының қызметтерін салыстыру', description: 'Астроциттерді, микроглияны, олигодендроциттерді және Шванн жасушаларын ажырату; жасушадан тыс K⁺ деңгейін реттеуге қатысатын және ОЖЖ мен ШЖЖ-де миелин түзетін жасушаларды атау.' },
    { title: '3. Секірмелі өткізуді түсіндіру', description: 'Миелин мен Ранвье түйіндерінің әрекет потенциалының таралуындағы рөлін түсіндіру; демиелиндену өткізуді неліктен баяулатуы немесе толық бөгеп қалуы мүмкін екенін негіздеу.' },
    { title: '4. Тәжірибе нәтижесін болжау', description: 'Өткізу жолының ұзындығы мен температура тұрақты болғанда аксон диаметрі мен миелиндену дәрежесінің өткізу жылдамдығына әсерін болжау; сапалық болжамды нақты өлшеуден ажырату.' },
    { title: '5. Клиникалық деректерді түсіндіру', description: 'Латентті кезең ұзарғанда немесе өткізу жылдамдығы төмендегенде ықтимал тетікті және қосымша зерттеуді ұсыну; бір көрсеткішпен нақты диагноз не зақым орнын анықтамау.' },
  ],
};

export const moduleThreeSummary: Record<Language, SummaryItem[]> = {
  RU: [
    { title: '1. Нейрон: приём → генерация → проведение → передача', text: 'Дендриты и сома обычно принимают сигналы; потенциал действия часто возникает в начальном сегменте аксона, но у части чувствительных нейронов — в другой возбудимой зоне. Окончания передают сигнал клетке-мишени.' },
    { title: '2. Глия — активный участник сигнализации', text: 'Астроциты регулируют внеклеточную среду, в том числе K⁺ и медиаторы; микроглия участвует в иммунном надзоре и ответе на повреждение.' },
    { title: '3. Миелин различается по месту образования', text: 'В ЦНС миелин образуют олигодендроциты, в ПНС — шванновские клетки. Миелин уменьшает утечку тока и ёмкостную нагрузку мембраны, облегчая быстрое проведение между перехватами Ранвье.' },
    { title: '4. Демиелинизация меняет проведение', text: 'Утрата миелина может замедлять распространение импульса и снижать надёжность проведения вплоть до блока, даже если аксон анатомически непрерывен.' },
    { title: '5. Скорость — не диагноз', text: 'Скорость проведения зависит от диаметра, миелинизации и температуры. Изменение латентности или скорости требует сопоставления с методикой, другими показателями и клиническими данными.' },
  ],
  EN: [
    { title: '1. Neuron: input → initiation → conduction → output', text: 'Dendrites and soma usually receive input; spikes often begin in the axon initial segment, but some sensory neurons initiate spikes at a different excitable site. Terminals communicate with target cells.' },
    { title: '2. Glia actively support signaling', text: 'Astrocytes regulate the extracellular milieu, including K⁺ and neurotransmitters; microglia contribute to immune surveillance and responses to injury.' },
    { title: '3. Myelin has distinct cellular origins', text: 'Oligodendrocytes produce CNS myelin; Schwann cells produce PNS myelin. Myelin reduces current leakage and membrane capacitance, enabling rapid propagation between nodes of Ranvier.' },
    { title: '4. Demyelination changes conduction', text: 'Myelin loss can slow impulses and reduce conduction reliability, potentially causing block even when the axon remains anatomically continuous.' },
    { title: '5. Conduction velocity is not a diagnosis', text: 'Velocity depends on axonal diameter, myelination, and temperature. Altered latency or velocity must be interpreted alongside technique, other measurements, and clinical findings.' },
  ],
  KZ: [
    { title: '1. Нейрон: қабылдау → басталу → өткізу → беру', text: 'Дендриттер мен сома әдетте кіріс сигналдарды қабылдайды; әрекет потенциалы көбіне аксонның бастапқы сегментінде, ал кейбір сезгіш нейрондарда басқа қозғыш аймақта басталады. Аксон ұштары сигналды нысана жасушаға береді.' },
    { title: '2. Глия сигнал беруге белсенді қатысады', text: 'Астроциттер жасушадан тыс ортаны, соның ішінде K⁺ пен нейромедиаторлар деңгейін реттейді; микроглия иммундық қадағалау мен зақымға жауап беруге қатысады.' },
    { title: '3. Миелинді әртүрлі жасушалар түзеді', text: 'ОЖЖ-де миелинді олигодендроциттер, ШЖЖ-де Шванн жасушалары түзеді. Миелин токтың ағып кетуін және мембрана сыйымдылығын азайтып, Ранвье түйіндері арасындағы жылдам өткізуді қамтамасыз етеді.' },
    { title: '4. Демиелиндену өткізуді өзгертеді', text: 'Миелин жоғалғанда аксон бүтін болса да импульс баяулап, өткізу сенімділігі төмендеуі немесе толық блок пайда болуы мүмкін.' },
    { title: '5. Өткізу жылдамдығы диагноз емес', text: 'Өткізу жылдамдығы аксон диаметріне, миелинденуге және температураға тәуелді. Латентті кезең мен жылдамдық өзгерістерін зерттеу әдісімен, басқа көрсеткіштермен және клиникалық деректермен бірге бағалау қажет.' },
  ],
};

export function createModuleThreeObjectives(language: Language): ObjectivesLesson {
  return {
    kind: 'objectives',
    title: getSectionTitle('objectives', language),
    introduction: language === 'RU' ? 'После изучения модуля студент сможет:' : language === 'EN' ? 'After completing this module, the student will be able to:' : 'Модульді аяқтағаннан кейін студент:',
    outcomes: moduleThreeObjectives[language].map((item, index) => ({
      id: 'module-3-objective-' + (index + 1),
      title: item.title,
      description: item.description,
    })),
    navigation: {
      title: language === 'RU' ? 'Перейти к изучению модуля' : language === 'EN' ? 'Continue learning' : 'Модульді оқуға өту',
      pathwayLabel: language === 'RU' ? 'Рекомендуемый маршрут' : language === 'EN' ? 'Recommended pathway' : 'Ұсынылатын оқу бағыты',
      links: [{ section: 'theory' }, { section: 'practice' }, { section: 'cases' }, { section: 'interactive' }, { section: 'virtual-patient' }],
    },
  };
}

export function createModuleThreeSummary(language: Language): ReadingLesson {
  return {
    kind: 'one-minute',
    title: getSectionTitle('one-minute', language),
    introduction: language === 'RU' ? 'Пять ключевых выводов о нейроне, глии и проведении импульса.' : language === 'EN' ? 'Five essential takeaways about neurons, glia and impulse conduction.' : 'Нейрон, глия және импульс өткізу туралы бес негізгі қорытынды.',
    cards: moduleThreeSummary[language].map((item, index) => ({
      id: 'module-3-one-minute-' + (index + 1),
      title: item.title,
      paragraphs: [item.text],
      links: [{ section: 'theory' }],
    })),
  };
}
