import type { Language } from '../course';
import { getSectionTitle } from '../sections';
import type { ObjectivesLesson, ReadingLesson } from '../study';

// Module 4: independently authored outcomes and factual one-minute recap.
// Source review: Guyton & Hall 13e, ch. 5 (PDF pp. 68–74),
// Ganong 23e, ch. 4 (PDF pp. 95–99), Ghai 8e, chart 5-5 (PDF pp. 379–381).
// Numerical values refer ONLY to the explicitly described two-ion laboratory model.
type LearningItem = { title: string; description: string };
type SummaryItem = { title: string; text: string };

export const moduleFourObjectives: Record<Language, LearningItem[]> = {
  "RU": [
    {
      "title": "1. Рассчитать и сопоставить ионные потенциалы",
      "description": "По заданным концентрациям K⁺ и Na⁺, температуре и относительным проницаемостям рассчитать E(K), E(Na) и Vm; объяснить, почему потенциал покоя не обязан совпадать с E(K)."
    },
    {
      "title": "2. Объяснить фазы потенциала действия",
      "description": "Связать восходящую фазу с открытием потенциал-зависимых Na⁺-каналов, а реполяризацию — с их инактивацией и повышением K⁺-проводимости; не приписывать быстрый спад Na⁺/K⁺-АТФазе."
    },
    {
      "title": "3. Различить локальный ответ и импульс",
      "description": "Отличить градуальный подпороговый ответ от регенеративного потенциала действия отдельного аксона и объяснить, почему усиление надпорогового стимула не увеличивает амплитуду одного импульса."
    },
    {
      "title": "4. Сопоставить рефрактерные периоды",
      "description": "Объяснить абсолютную рефрактерность инактивацией Na⁺-каналов, а относительную — их неполным восстановлением и сохраняющейся K⁺-проводимостью; отличить эти механизмы от условных временных порогов симулятора."
    },
    {
      "title": "5. Предсказать результат и указать ограничения",
      "description": "При увеличении наружного K⁺ с 4 до 8 мМ и фиксированных остальных параметрах предсказать изменение E(K) и Vm, сверить расчёт и объяснить, почему модель не устанавливает возбудимость реального пациента или диагноз."
    }
  ],
  "EN": [
    {
      "title": "1. Calculate and compare ionic potentials",
      "description": "Given K⁺ and Na⁺ concentrations, temperature and relative permeabilities, calculate E(K), E(Na) and Vm; explain why resting voltage need not equal E(K)."
    },
    {
      "title": "2. Explain action-potential phases",
      "description": "Relate the upstroke to voltage-gated Na⁺-channel activation and repolarization to Na⁺-channel inactivation and increased K⁺ conductance; do not attribute rapid repolarization to Na⁺/K⁺-ATPase."
    },
    {
      "title": "3. Distinguish local responses from spikes",
      "description": "Distinguish a graded subthreshold response from a regenerative action potential in a single axon and explain why stronger suprathreshold stimulation does not increase the amplitude of one spike."
    },
    {
      "title": "4. Compare refractory periods",
      "description": "Explain absolute refractoriness through Na⁺-channel inactivation and relative refractoriness through incomplete channel recovery and persistent K⁺ conductance; distinguish these mechanisms from the simulator's arbitrary timing cutoffs."
    },
    {
      "title": "5. Predict outcomes and state limitations",
      "description": "With all other parameters fixed, predict how increasing extracellular K⁺ from 4 to 8 mM changes E(K) and Vm, check the calculation, and explain why the model cannot establish a real patient's excitability or diagnosis."
    }
  ],
  "KZ": [
    {
      "title": "1. Иондық потенциалдарды есептеу және салыстыру",
      "description": "K⁺ пен Na⁺ концентрациялары, температура және салыстырмалы өткізгіштік берілгенде E(K), E(Na) және Vm мәндерін есептеп, тыныштық потенциалы неліктен E(K)-ге міндетті түрде тең болмайтынын түсіндіру."
    },
    {
      "title": "2. Әрекет потенциалының фазаларын түсіндіру",
      "description": "Көтерілу фазасын кернеуге тәуелді Na⁺ арналарының белсенуімен, ал реполяризацияны олардың инактивациясымен және K⁺ өткізгіштігінің артуымен байланыстыру; жылдам реполяризацияны Na⁺/K⁺-АТФазаға телімеу."
    },
    {
      "title": "3. Жергілікті жауап пен импульсті ажырату",
      "description": "Табалдырықтан төмен градуалды жауапты жеке аксондағы регенеративті әрекет потенциалынан ажырату және табалдырықтан жоғары стимул күшейгенде бір импульстің амплитудасы неліктен артпайтынын түсіндіру."
    },
    {
      "title": "4. Рефрактерлік кезеңдерді салыстыру",
      "description": "Абсолютті рефрактерлікті Na⁺ арналарының инактивациясымен, ал салыстырмалы кезеңді олардың толық қалпына келмеуімен және K⁺ өткізгіштігінің сақталуымен түсіндіру; бұл тетіктерді симулятордың шартты уақыт шектерінен ажырату."
    },
    {
      "title": "5. Нәтижені болжау және модель шегін көрсету",
      "description": "Қалған параметрлер тұрақты болғанда сыртқы K⁺ 4-тен 8 мМ-ге артса, E(K) пен Vm қалай өзгеретінін болжау, есеппен тексеру және модель нақты пациенттің қозғыштығын не диагнозын анықтамайтынын түсіндіру."
    }
  ]
};

export const moduleFourSummary: Record<Language, SummaryItem[]> = {
  "RU": [
    {
      "title": "1. Потенциал покоя определяется несколькими ионами",
      "text": "Ионные градиенты и относительные проницаемости определяют Vm; вклад K⁺ часто преобладает. Na⁺/K⁺-АТФаза поддерживает градиенты и имеет электрогенный вклад, но не создаёт быстрый спад каждого импульса."
    },
    {
      "title": "2. Нернст и Гольдман отвечают на разные вопросы",
      "text": "При 37 °C, K⁺ 4/140 мМ, Na⁺ 145/12 мМ и P(K):P(Na)=1:0,04 двухионная модель даёт E(K) ≈ −95,0 мВ, E(Na) ≈ +66,6 мВ и Vm ≈ −71,2 мВ; Cl⁻ и прямой вклад насоса опущены."
    },
    {
      "title": "3. Импульс запускается регенеративно",
      "text": "Открытие потенциал-зависимых Na⁺-каналов вызывает быстрый подъём, их инактивация и повышение K⁺-проводимости обеспечивают реполяризацию. Подпороговые изменения градуальны; амплитуда импульса отдельного аксона не растёт с силой надпорогового стимула."
    },
    {
      "title": "4. Рефрактерность зависит от состояния каналов",
      "text": "В абсолютный период большинство необходимых Na⁺-каналов недоступно из-за инактивации; в относительный часть восстанавливается, но повышенная K⁺-проводимость может мешать возбуждению. Универсальных порогов 2 или 5 мс нет."
    },
    {
      "title": "5. Симуляция не заменяет физиологический эксперимент",
      "text": "При повышении наружного K⁺ с 4 до 8 мМ двухионный расчёт меняет E(K) примерно с −95,0 до −76,5 мВ и Vm с −71,2 до −62,0 мВ. Форма импульса в лаборатории не пересчитывается, а условный порог не доказывает возбудимость или диагноз."
    }
  ],
  "EN": [
    {
      "title": "1. Resting voltage depends on multiple ions",
      "text": "Ionic gradients and relative permeabilities determine Vm, often with a dominant K⁺ contribution. Na⁺/K⁺-ATPase sustains the gradients and contributes electrogenically, but does not generate each spike's rapid falling phase."
    },
    {
      "title": "2. Nernst and Goldman answer different questions",
      "text": "At 37 °C with K⁺ 4/140 mM, Na⁺ 145/12 mM and P(K):P(Na)=1:0.04, the two-ion model gives E(K) ≈ −95.0 mV, E(Na) ≈ +66.6 mV and Vm ≈ −71.2 mV; Cl⁻ and the pump's direct contribution are omitted."
    },
    {
      "title": "3. The spike is regenerative",
      "text": "Voltage-gated Na⁺-channel activation causes the rapid upstroke; channel inactivation and increased K⁺ conductance produce repolarization. Subthreshold changes are graded; spike amplitude in a single axon does not rise with suprathreshold stimulus strength."
    },
    {
      "title": "4. Refractoriness reflects channel availability",
      "text": "In the absolute period, enough Na⁺ channels are inactivated to prevent a second propagated spike; in the relative period, some recover while elevated K⁺ conductance can still impede excitation. There are no universal 2- or 5-ms cutoffs."
    },
    {
      "title": "5. The simulator is not a physiological measurement",
      "text": "Increasing extracellular K⁺ from 4 to 8 mM changes calculated E(K) from about −95.0 to −76.5 mV and Vm from −71.2 to −62.0 mV. The laboratory's spike trace is fixed and its threshold arbitrary, so neither excitability nor a diagnosis follows."
    }
  ],
  "KZ": [
    {
      "title": "1. Тыныштық потенциалы бірнеше ионға тәуелді",
      "text": "Vm иондық градиенттер мен салыстырмалы өткізгіштікке тәуелді, көбіне K⁺ үлесі басым. Na⁺/K⁺-АТФаза градиенттерді сақтайды және электрогендік үлес қосады, бірақ әр импульстің жылдам төмендеу фазасын тудырмайды."
    },
    {
      "title": "2. Нернст пен Гольдман әртүрлі шамаларды сипаттайды",
      "text": "37 °C-та K⁺ 4/140 мМ, Na⁺ 145/12 мМ және P(K):P(Na)=1:0,04 болғанда екі ионды модель E(K) ≈ −95,0 мВ, E(Na) ≈ +66,6 мВ, Vm ≈ −71,2 мВ береді; Cl⁻ пен сорғының тікелей үлесі ескерілмейді."
    },
    {
      "title": "3. Импульс регенеративті түрде пайда болады",
      "text": "Кернеуге тәуелді Na⁺ арналарының белсенуі жылдам көтерілу фазасын, ал олардың инактивациясы мен K⁺ өткізгіштігінің артуы реполяризацияны туғызады. Табалдырықтан төмен өзгерістер градуалды; жеке аксондағы импульс амплитудасы стимул күші артқанда ұлғаймайды."
    },
    {
      "title": "4. Рефрактерлік арналардың күйіне тәуелді",
      "text": "Абсолютті кезеңде Na⁺ арналарының жеткілікті бөлігі инактивацияланғандықтан жаңа импульс туындамайды; салыстырмалы кезеңде олардың бір бөлігі қалпына келеді, бірақ жоғары K⁺ өткізгіштігі қозуға кедергі болуы мүмкін. 2 не 5 мс әмбебап шек емес."
    },
    {
      "title": "5. Симуляция нақты физиологиялық өлшеу емес",
      "text": "Сыртқы K⁺ 4-тен 8 мМ-ге артқанда есептелген E(K) шамамен −95,0-ден −76,5 мВ-ке, Vm −71,2-ден −62,0 мВ-ке өзгереді. Зертханада импульс қисығы өзгермейді, ал шартты табалдырық нақты қозғыштықты немесе диагнозды анықтамайды."
    }
  ]
};

export function createModuleFourObjectives(language: Language): ObjectivesLesson {
  return {
    kind: 'objectives',
    title: getSectionTitle('objectives', language),
    introduction: language === 'RU' ? 'После изучения модуля студент сможет:' : language === 'EN' ? 'After completing this module, the student will be able to:' : 'Модульді аяқтағаннан кейін студент:',
    outcomes: moduleFourObjectives[language].map((item, index) => ({
      id: 'module-4-objective-' + (index + 1),
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

export function createModuleFourSummary(language: Language): ReadingLesson {
  return {
    kind: 'one-minute',
    title: getSectionTitle('one-minute', language),
    introduction: language === 'RU' ? 'Пять основных выводов о потенциале покоя, импульсе и рефрактерности.' : language === 'EN' ? 'Five key conclusions about resting potential, spikes and refractoriness.' : 'Тыныштық потенциалы, импульс және рефрактерлік туралы бес негізгі қорытынды.',
    cards: moduleFourSummary[language].map((item, index) => ({
      id: 'module-4-one-minute-' + (index + 1),
      title: item.title,
      paragraphs: [item.text],
      links: [{ section: 'theory' }],
    })),
  };
}
