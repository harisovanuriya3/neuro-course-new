import type { Language } from '../course';
import type { BranchingTest, QuestionNode } from '../tests';

// Physiology-anchored module 3 formative questions.
// The shared branching/remediation graph is retained, but its generic
// neuron→myelin prompts and implausible distractors are replaced.
type Item = {
  prompt: string;
  correct: string;
  wrong: [string, string, string];
  explanation: string;
};
type Domain = 'concept' | 'mechanism' | 'application' | 'transfer' | 'justification';
const items: Record<Language, Record<Domain, Item>> = {
  RU: {
    concept: {
      prompt: 'В препарате белого вещества головного мозга обнаружены миелинизированные аксоны. Какая клетка формирует их миелин в ЦНС?',
      correct: 'Олигодендроцит; одна клетка может миелинизировать участки нескольких аксонов.',
      wrong: ['Шванновская клетка; она образует миелин в ЦНС и ПНС одинаковым способом.', 'Астроцит; его главная роль — наматывать мембрану вокруг аксонов.', 'Микроглия; она изолирует аксоны после завершения иммунного ответа.'],
      explanation: 'Миелин ЦНС формируют олигодендроциты, миелин ПНС — шванновские клетки. Астроциты поддерживают микросреду, а микроглия участвует в иммунной защите.'
    },
    mechanism: {
      prompt: 'У миелинизированного аксона повреждены несколько межузловых участков миелина, но аксон не разорван. Какой эффект наиболее обоснован?',
      correct: 'Увеличиваются утечка тока и ёмкостная нагрузка; проведение может замедлиться или блокироваться.',
      wrong: ['Мембрана полностью перестаёт пропускать ионы, поэтому проведение обязательно ускорится.', 'Потенциал действия переходит исключительно на дендриты, не затрагивая проведение по аксону.', 'Скорость обязательно сохраняется: миелин не влияет на распределение электрического тока.'],
      explanation: 'Миелин повышает сопротивление и снижает ёмкость межузловой мембраны; демиелинизация нарушает сальтаторное проведение. Блок возможен, но не неизбежен.'
    },
    application: {
      prompt: 'Латентность М-ответа при стимуляции одного нерва дистально — 3,0 мс, проксимально — 8,0 мс. Расстояние между точками — 25 см. Какова сегментная моторная скорость?',
      correct: '50 м/с: 0,25 м делят на разность латентностей 0,005 с.',
      wrong: ['83 м/с: 0,25 м делят на дистальную латентность 0,003 с.', '31 м/с: 0,25 м делят на проксимальную латентность 0,008 с.', '20 м/с: разность латентностей 0,005 с умножают на расстояние.'],
      explanation: 'При двухточечной стимуляции скорость равна расстоянию между точками, делённому на разность латентностей начала М-ответов. Общие дистальные задержки сокращаются.'
    },
    transfer: {
      prompt: 'Астроциты хуже удаляют внеклеточный K⁺, и концентрация K⁺ вокруг нейронов устойчиво возрастает. Какой эффект возможен при длительной выраженной деполяризации?',
      correct: 'Инактивация части потенциал-зависимых Na⁺-каналов и снижение способности генерировать импульсы.',
      wrong: ['Полное исчезновение градиента Ca²⁺ во всех синапсах при любом небольшом повышении K⁺.', 'Обязательная гиперполяризация мембраны с постоянным повышением порога возбуждения.', 'Превращение всех олигодендроцитов в шванновские клетки для восстановления проводимости.'],
      explanation: 'Повышение внеклеточного K⁺ обычно деполяризует мембрану; при стойкой выраженной деполяризации доступность Na⁺-каналов может снизиться. Эффект зависит от степени и длительности изменения.'
    },
    justification: {
      prompt: 'При холодной кисти скорость моторного проведения снижена; после согревания показатель нормализовался. Какой вывод допустим?',
      correct: 'Температура существенно влияла на измерение; исходное замедление само по себе не доказывает демиелинизацию.',
      wrong: ['Нормализация доказывает отсутствие любой периферической нейропатии независимо от других данных.', 'Однократное замедление доказывает разрушение миелина даже при нормализации после согревания.', 'Температура не влияет на скорость, поэтому изменение объясняется только нервно-мышечным синапсом.'],
      explanation: 'Температура влияет на проведение. Интерпретация требует контроля температуры, лабораторных норм, формы и амплитуды М-ответа, клинических данных.'
    }
  },
  EN: {
    concept: {
      prompt: 'Myelinated axons are identified in cerebral white matter. Which cell forms their myelin in the CNS?',
      correct: 'An oligodendrocyte; one cell can myelinate segments of several axons.',
      wrong: ['A Schwann cell; it myelinates CNS and PNS axons in the same way.', 'An astrocyte; its primary function is wrapping axons in membrane.', 'A microglial cell; it insulates axons after completing immune surveillance.'],
      explanation: 'Oligodendrocytes form CNS myelin, whereas Schwann cells form PNS myelin. Astrocytes maintain the environment and microglia provide immune surveillance.'
    },
    mechanism: {
      prompt: 'Several internodes of a myelinated axon lose myelin, but the axon remains anatomically continuous. What outcome is most defensible?',
      correct: 'Increased current leakage and capacitive load may slow conduction or cause conduction block.',
      wrong: ['The membrane becomes completely impermeable to ions, so conduction must accelerate.', 'Action potentials shift exclusively to dendrites and no longer propagate in the axon.', 'Velocity must remain constant because myelin does not affect current distribution.'],
      explanation: 'Myelin raises internodal resistance and lowers capacitance. Demyelination disrupts saltatory propagation; conduction block is possible, not inevitable.'
    },
    application: {
      prompt: 'Distal motor CMAP onset latency is 3.0 ms and proximal onset latency is 8.0 ms along the same nerve. Stimulation sites are 25 cm apart. What is segmental velocity?',
      correct: '50 m/s: divide 0.25 m by the 0.005 s difference between onset latencies.',
      wrong: ['83 m/s: divide 0.25 m by the 0.003 s distal latency.', '31 m/s: divide 0.25 m by the 0.008 s proximal latency.', '20 m/s: multiply the 0.005 s latency difference by distance.'],
      explanation: 'For two-site motor stimulation, divide the inter-site distance by the difference between CMAP onset latencies; shared distal delays cancel.'
    },
    transfer: {
      prompt: 'Astrocytic extracellular K⁺ uptake is impaired and K⁺ around neurons remains elevated. What can occur during sustained marked depolarization?',
      correct: 'Inactivation of some voltage-gated Na⁺ channels and reduced ability to generate action potentials.',
      wrong: ['Complete loss of Ca²⁺ gradients in every synapse after any slight rise in extracellular K⁺.', 'Obligatory membrane hyperpolarization with a persistently higher firing threshold.', 'Conversion of all oligodendrocytes into Schwann cells to restore conduction.'],
      explanation: 'Elevated extracellular K⁺ generally depolarizes membranes; sustained marked depolarization can reduce Na⁺ channel availability. Magnitude and duration matter.'
    },
    justification: {
      prompt: 'Motor nerve conduction is slow in a cold hand but normalizes after warming. Which inference is justified?',
      correct: 'Temperature materially affected the result; initial slowing alone does not prove demyelination.',
      wrong: ['Normalization rules out any peripheral neuropathy regardless of other findings.', 'One slow value proves myelin loss even if warming restores normal conduction.', 'Temperature cannot affect conduction, so only the neuromuscular junction explains the change.'],
      explanation: 'Conduction is temperature dependent. Interpret results with controlled temperature, laboratory reference values, CMAP amplitude and waveform, and clinical context.'
    }
  },
  KZ: {
    concept: {
      prompt: 'Мидың ақ затында миелинді аксондар анықталды. ОЖЖ-де олардың миелинін қандай жасуша түзеді?',
      correct: 'Олигодендроцит; бір жасуша бірнеше аксонның бөліктерін миелиндей алады.',
      wrong: ['Шванн жасушасы; ол ОЖЖ мен ШЖЖ аксондарын бірдей миелиндейді.', 'Астроцит; оның негізгі қызметі аксонды мембранамен орау.', 'Микроглия; ол иммундық жауаптан кейін аксондарды оқшаулайды.'],
      explanation: 'ОЖЖ миелинін олигодендроциттер, ал ШЖЖ миелинін Шванн жасушалары түзеді. Астроциттер микрортаны қолдайды, микроглия иммундық қорғанысқа қатысады.'
    },
    mechanism: {
      prompt: 'Миелинді аксонның бірнеше түйінаралық бөлігінде миелин зақымданды, бірақ аксон тұтас қалды. Қандай нәтиже негіздірек?',
      correct: 'Токтың ағып кетуі мен сыйымдылық жүктемесі артып, өткізу баяулауы немесе бөгелуі мүмкін.',
      wrong: ['Мембрана иондарды мүлде өткізбей қалады, сондықтан өткізу міндетті түрде жылдамдайды.', 'Әрекет потенциалдары тек дендриттерге ауысып, аксонмен таралмайды.', 'Миелин токтың таралуына әсер етпейтіндіктен, жылдамдық өзгермейді.'],
      explanation: 'Миелин түйінаралық кедергіні арттырып, сыйымдылықты төмендетеді. Демиелиндену секірмелі өткізуді бұзады; өткізу блогы болуы мүмкін, бірақ міндетті емес.'
    },
    application: {
      prompt: 'Бір жүйкенің дисталдық М-жауап латенттілігі 3,0 мс, проксималдық латенттілігі 8,0 мс. Стимуляция нүктелерінің арасы 25 см. Сегменттік жылдамдық қандай?',
      correct: '50 м/с: 0,25 м-ді латенттіліктер айырмасы 0,005 с-қа бөледі.',
      wrong: ['83 м/с: 0,25 м-ді дисталдық латенттілік 0,003 с-қа бөледі.', '31 м/с: 0,25 м-ді проксималдық латенттілік 0,008 с-қа бөледі.', '20 м/с: латенттіліктер айырмасы 0,005 с-ты қашықтыққа көбейтеді.'],
      explanation: 'Екі нүктеден моторлық стимуляция жасағанда жылдамдық — нүктелер арақашықтығының М-жауап басталу латенттіліктері айырмасына қатынасы; ортақ дисталдық кідірістер қысқарады.'
    },
    transfer: {
      prompt: 'Астроциттердің жасушадан тыс K⁺ сіңіруі нашарлап, нейрондар маңындағы K⁺ ұзақ уақыт жоғары қалды. Айқын тұрақты деполяризацияда не болуы мүмкін?',
      correct: 'Кернеуге тәуелді Na⁺ арналарының бір бөлігі инактивацияланып, әрекет потенциалын түзу қабілеті төмендейді.',
      wrong: ['K⁺ аздап артса да барлық синапстарда Ca²⁺ градиенті толық жоғалады.', 'Мембрана міндетті түрде гиперполяризацияланып, қозу табалдырығы үнемі жоғарылайды.', 'Өткізуді қалпына келтіру үшін барлық олигодендроциттер Шванн жасушаларына айналады.'],
      explanation: 'Жасушадан тыс K⁺ жоғарылауы әдетте деполяризация тудырады; айқын әрі ұзақ деполяризация Na⁺ арналарының қолжетімділігін төмендетуі мүмкін. Әсер шамасы мен ұзақтығына тәуелді.'
    },
    justification: {
      prompt: 'Суық қолда моторлық өткізу баяулаған, жылытқаннан кейін қалыпқа келген. Қандай қорытынды негізді?',
      correct: 'Температура өлшемге елеулі әсер еткен; бастапқы баяулау өздігінен демиелинденуді дәлелдемейді.',
      wrong: ['Қалыпқа келу басқа деректерге қарамай кез келген шеткі нейропатияны жоққа шығарады.', 'Жылытқаннан кейін қалпына келсе де бір реттік баяулау миелин жоғалуын дәлелдейді.', 'Температура өткізуге әсер етпейді, сондықтан өзгеріс тек жүйке-бұлшықет синапсынан болады.'],
      explanation: 'Өткізу температураға тәуелді. Нәтижені бақыланған температура, зертханалық нормалар, М-жауаптың амплитудасы мен пішіні және клиникалық деректермен түсіндіру қажет.'
    }
  }
};

export function createModuleThreeTests(language: Language, base: BranchingTest): BranchingTest {
  const authored = items[language];
  const nodes: BranchingTest['nodes'] = Object.fromEntries(
    Object.entries(base.nodes).map(([id, node]) => {
      if (node.type !== 'question') return [id, node];
      const item = authored[node.competency as Domain];
      if (!item) throw new Error('Unexpected module 3 test competency: ' + node.competency);
      const offset = node.level === 'main' ? 0 : node.level === 'corrective' ? 1 : 2;
      const options: QuestionNode['options'] = [
        { id: 'a', text: item.correct },
        { id: 'b', text: item.wrong[0] },
        { id: 'c', text: item.wrong[1] },
        { id: 'd', text: item.wrong[2] }
      ];
      return [id, {
        ...node,
        prompt: item.prompt,
        options: [...options.slice(offset), ...options.slice(0, offset)],
        correctAnswer: 'a',
        explanation: item.explanation
      }];
    })
  );
  return { ...base, nodes };
}
