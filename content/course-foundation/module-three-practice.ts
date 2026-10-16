import type { Language } from '../course';
import type { PracticeLesson } from '../types';

// Authored practice for module 3. Do not infer a causal relation from two
// glossary terms ("neuron" and "myelin"); test concrete mechanisms instead.
// References checked: Ganong 23e, chapter 4; Guyton & Hall 13e, chapter 5;
// C. L. Ghai 8e, Nerve Conduction Studies (median motor nerve).
type Copy = {
  anatomyTitle: string; anatomyIntro: string;
  tableHeaders: [string,string,string]; tableRows: [string,string,string][];
  mechanismTitle: string; mechanismIntro: string;
  mechanismHeaders: [string,string,string]; mechanismRows: [string,string,string][];
  calculationTitle: string; calculationPrompt: string; calculationLabel: string;
  calculationAnswers: string[];
  experimentTitle: string; experimentPrompt: string;
  experimentInput: string; experimentOutput: string; experimentCaveat: string;
  interpretationTitle: string; interpretationPrompt: string;
  interpretationLabel: string; interpretationAnswers: string[];
  criteriaTitle: string; criteria: string[];
};
const copy: Record<Language, Copy> = {
  RU: {
    anatomyTitle: '1. Функции клеток нервной ткани',
    anatomyIntro: 'Сначала самостоятельно назовите роль и механизм каждой клетки, затем сравните с таблицей. Различайте клетки ЦНС и ПНС; микроглия не образует миелин.',
    tableHeaders: ['Клетка','Где действует и что делает','Физиологический механизм'],
    tableRows: [
      ['Астроцит','ЦНС: поддержание микросреды нейронов и синапсов','Поглощение избытка внеклеточного K⁺ и медиаторов; участие в поддержке синапсов'],
      ['Олигодендроцит','ЦНС: формирование миелина на участках нескольких аксонов','Миелин снижает ёмкость и утечку тока через межузловую мембрану'],
      ['Шванновская клетка','ПНС: образование одного миелинового межузлового сегмента клетки','Изоляция аксона между перехватами Ранвье ускоряет проведение'],
      ['Микроглия','ЦНС: иммунный надзор и ответ на повреждение','Распознавание повреждения и удаление клеточного детрита'],
    ],
    mechanismTitle: '2. Два разных механизма нарушения сигнала',
    mechanismIntro: 'До просмотра таблицы объясните отдельно последствия демиелинизации и недостаточного удаления внеклеточного K⁺. Затем сверьте два механизма: это разные процессы, а степень изменения скорости не фиксирована.',
    mechanismHeaders: ['Изменение','Ожидаемый механизм','Что ограничивает вывод'],
    mechanismRows: [
      ['Утрата миелина','Утечка тока и увеличение эффективной ёмкостной нагрузки снижают надёжность проведения; возможен блок','Степень замедления зависит от поражённого участка, температуры и состояния аксона'],
      ['Накопление внеклеточного K⁺','Обычно деполяризует мембрану; стойкая деполяризация может инактивировать Na⁺-каналы','Эффект зависит от концентрации, длительности, локализации и состояния каналов'],
    ],
    calculationTitle: '3. Скорость моторного проведения: что измеряется?',
    calculationPrompt: 'При исследовании одного моторного нерва латентность начала М-ответа при дистальной стимуляции равна 3,2 мс, при проксимальной — 7,2 мс. Расстояние между точками стимуляции вдоль нерва — 20 см. Вычислите скорость на этом сегменте в м/с и объясните, почему нельзя делить 20 см на дистальную латентность.',
    calculationLabel: 'Расчёт, единицы измерения и объяснение',
    calculationAnswers: [
      'Δt = 7,2 − 3,2 = 4,0 мс; v = 0,20 м / 0,004 с = 50 м/с.',
      'При двухточечной стимуляции разность латентностей исключает общие дистальные задержки: терминальное проведение, нервно-мышечную передачу и активацию мышцы.',
      'Число 50 м/с само по себе не устанавливает диагноз: необходимы температура, возрастные и лабораторные нормативы, форма/амплитуда ответа и клинический контекст.',
    ],
    experimentTitle: '4. Контролируемый эксперимент с нервным волокном',
    experimentPrompt: 'В лаборатории выберите один тип волокна. Сначала фиксируйте длину и температуру, изменяя только диаметр; затем верните исходные условия и изменяйте только миелинизацию. До запуска предскажите направление изменения скорости. Численные значения симулятора — учебная модель, а не индивидуальное клиническое измерение.',
    experimentInput: 'Какая одна переменная меняется на каждом шаге?',
    experimentOutput: 'Какое направление изменения скорости ожидается и почему?',
    experimentCaveat: 'Как температура, утрата проводимости или пределы модели могут изменить интерпретацию?',
    interpretationTitle: '5. Различить физиологический эффект и артефакт',
    interpretationPrompt: 'У одного пациента скорость проведения по сегменту нерва снижена при холодной конечности и нормализуется после согревания. У другого снижение сохраняется при контролируемой температуре. Что можно и чего нельзя заключить?',
    interpretationLabel: 'Сравните два наблюдения и предложите следующий шаг',
    interpretationAnswers: [
      'Нормализация после согревания указывает на существенное влияние температуры и не позволяет на основании исходного числа диагностировать демиелинизацию.',
      'Стойкое снижение при контролируемой температуре требует полноценного исследования: нескольких сегментов, амплитуд/формы ответов и клинического осмотра.',
      'По одной скорости нельзя без дополнительных данных отличить все варианты аксонального повреждения, демиелинизации и технических факторов.',
    ],
    criteriaTitle: 'Самопроверка',
    criteria: ['Я различил функции четырёх типов глии.', 'Я объяснил утечку тока при демиелинизации и отдельный эффект внеклеточного K⁺.', 'Я рассчитал скорость по разности двух латентностей с переводом единиц.', 'Я указал контроль температуры и границы диагностического вывода.'],
  },
  EN: {
    anatomyTitle: '1. Functional roles of neural cells',
    anatomyIntro: "First predict each cell's location, role and mechanism, then compare your answer with the table. Distinguish CNS from PNS glia; microglia do not produce myelin.",
    tableHeaders: ['Cell','Location and role','Physiological mechanism'],
    tableRows: [
      ['Astrocyte','CNS: maintains the neuronal and synaptic environment','Buffers extracellular K⁺ and clears transmitters; supports synaptic function'],
      ['Oligodendrocyte','CNS: myelinates segments of multiple axons','Myelin reduces internodal capacitance and transmembrane current leakage'],
      ['Schwann cell','PNS: makes one myelin internode per myelinating cell','Insulates axons between nodes of Ranvier, supporting rapid conduction'],
      ['Microglia','CNS: immune surveillance and response to injury','Recognizes injury and clears cellular debris'],
    ],
    mechanismTitle: '2. Two distinct causes of impaired signaling',
    mechanismIntro: 'Before reading the table, predict the effects of demyelination and impaired extracellular K⁺ clearance separately. Compare your predictions with the two distinct mechanisms; slowing has no fixed magnitude.',
    mechanismHeaders: ['Change','Expected mechanism','Limit on interpretation'],
    mechanismRows: [
      ['Myelin loss','Increased current leakage and effective capacitive load impair propagation and may cause block','The extent depends on lesion distribution, temperature and axonal integrity'],
      ['Extracellular K⁺ accumulation','Usually depolarizes the membrane; sustained depolarization may inactivate Na⁺ channels','Depends on concentration, duration, location and channel state'],
    ],
    calculationTitle: '3. Motor conduction velocity: what is measured?',
    calculationPrompt: 'During testing of the same motor nerve, distal CMAP onset latency is 3.2 ms and proximal onset latency is 7.2 ms. Distance between stimulation sites along the nerve is 20 cm. Calculate segmental velocity in m/s and explain why 20 cm must not be divided by distal latency.',
    calculationLabel: 'Calculation, units and explanation',
    calculationAnswers: [
      'Δt = 7.2 − 3.2 = 4.0 ms; v = 0.20 m / 0.004 s = 50 m/s.',
      'The two-site latency difference removes delays common to both recordings: distal terminal conduction, neuromuscular transmission and muscle activation.',
      'A value of 50 m/s alone is not a diagnosis; consider temperature, age- and laboratory-specific reference values, waveform/amplitude and clinical context.',
    ],
    experimentTitle: '4. Controlled nerve-fiber experiment',
    experimentPrompt: 'In the laboratory, choose one fiber type. Hold path length and temperature fixed while changing only diameter. Restore baseline and then change only myelination. Predict the direction of the velocity change before running each trial. Simulator numbers are illustrative, not patient-specific clinical measurements.',
    experimentInput: 'Which single variable changes in each trial?',
    experimentOutput: 'Which direction of velocity change do you predict, and why?',
    experimentCaveat: 'How might temperature, conduction failure or model limitations affect your interpretation?',
    interpretationTitle: '5. Distinguish physiology from confounding',
    interpretationPrompt: 'One patient has slowed segmental conduction in a cold limb, which normalizes after warming. Another remains slow at a controlled temperature. What can and cannot be concluded?',
    interpretationLabel: 'Compare both findings and propose a next step',
    interpretationAnswers: [
      'Normalization after warming indicates an important temperature effect; the initial value alone cannot establish demyelination.',
      'Persistent slowing at controlled temperature warrants a fuller study of several segments, response amplitude/waveform and clinical examination.',
      'Velocity alone cannot distinguish all causes of axonal injury, demyelination and technical confounding without other evidence.',
    ],
    criteriaTitle: 'Self-check',
    criteria: ['I distinguished the four glial cell types.', 'I explained current leakage after demyelination and the separate effect of extracellular K⁺.', 'I calculated velocity from two onset latencies with correct units.', 'I accounted for temperature and diagnostic limitations.'],
  },
  KZ: {
    anatomyTitle: '1. Жүйке тіні жасушаларының қызметі',
    anatomyIntro: 'Алдымен әр жасушаның орналасуын, қызметі мен тетігін өзіңіз болжаңыз, содан кейін кестемен салыстырыңыз. ОЖЖ мен ШЖЖ глиясын ажыратыңыз; микроглия миелин түзбейді.',
    tableHeaders: ['Жасуша','Орналасуы және қызметі','Физиологиялық тетік'],
    tableRows: [
      ['Астроцит','ОЖЖ: нейрон мен синапс айналасындағы ортаны реттейді','Жасушадан тыс K⁺ пен медиаторларды сіңіреді, синапстарды қолдайды'],
      ['Олигодендроцит','ОЖЖ: бірнеше аксонның сегменттерін миелиндейді','Миелин мембрана сыйымдылығын және түйінаралық токтың ағып кетуін азайтады'],
      ['Шванн жасушасы','ШЖЖ: бір жасуша бір миелинді түйінаралық сегмент түзеді','Ранвье түйіндерінің арасында аксонды оқшаулап, жылдам өткізуді қолдайды'],
      ['Микроглия','ОЖЖ: иммундық қадағалау және зақымға жауап','Зақымды танып, жасушалық қалдықтарды жояды'],
    ],
    mechanismTitle: '2. Сигнал бұзылуының екі түрлі тетігі',
    mechanismIntro: 'Кестені оқымас бұрын демиелиндену мен жасушадан тыс K⁺ шығарылуының жеткіліксіздігін жеке түсіндіріңіз. Содан кейін екі түрлі тетікті салыстырыңыз; жылдамдық өзгерісінің шамасы тұрақты емес.',
    mechanismHeaders: ['Өзгеріс','Күтілетін тетік','Қорытындының шектеуі'],
    mechanismRows: [
      ['Миелиннің жоғалуы','Токтың ағып кетуі мен сыйымдылық жүктемесі артады; өткізу сенімділігі төмендеп, блок болуы мүмкін','Әсері зақым орнына, температураға және аксонның сақталуына тәуелді'],
      ['Жасушадан тыс K⁺ жиналуы','Әдетте мембрананы деполяризациялайды; ұзақ деполяризация Na⁺ арналарын инактивациялауы мүмкін','Концентрацияға, ұзақтығына, орналасуына және арналардың күйіне тәуелді'],
    ],
    calculationTitle: '3. Моторлық өткізу жылдамдығы: не өлшенеді?',
    calculationPrompt: 'Бір моторлық жүйкені тексергенде дисталдық стимуляциядағы М-жауаптың басталу латенттілігі 3,2 мс, проксималдықта 7,2 мс. Екі стимуляция нүктесінің жүйке бойындағы арасы 20 см. Сегменттік жылдамдықты м/с-пен есептеңіз және неліктен 20 см-ді дисталдық латенттілікке бөлуге болмайтынын түсіндіріңіз.',
    calculationLabel: 'Есептеу, өлшем бірліктері және түсіндірме',
    calculationAnswers: [
      'Δt = 7,2 − 3,2 = 4,0 мс; v = 0,20 м / 0,004 с = 50 м/с.',
      'Екі нүктедегі латенттілік айырмасы екі жауапқа ортақ кідірістерді алып тастайды: дисталдық ұштық өткізу, жүйке-бұлшықет берілісі және бұлшықеттің белсенуі.',
      '50 м/с жеке өзі диагноз емес: температураны, жас пен зертхана нормаларын, жауап амплитудасы мен пішінін және клиникалық көріністі ескеру қажет.',
    ],
    experimentTitle: '4. Жүйке талшығына бақыланатын тәжірибе',
    experimentPrompt: 'Зертханада бір талшық түрін таңдаңыз. Жол ұзындығы мен температураны тұрақты ұстап, тек диаметрді өзгертіңіз. Бастапқы күйге қайтып, тек миелинденуді өзгертіңіз. Әр сынаққа дейін жылдамдық өзгерісінің бағытын болжаңыз. Симулятор сандары — клиникалық өлшем емес, оқу моделі.',
    experimentInput: 'Әр сынақта қандай бір ғана айнымалы өзгереді?',
    experimentOutput: 'Өткізу жылдамдығы қай бағытта өзгереді және неге?',
    experimentCaveat: 'Температура, өткізу блогы және модель шектеулері түсіндіруге қалай әсер етеді?',
    interpretationTitle: '5. Физиологиялық әсер мен шатастырушы факторды ажырату',
    interpretationPrompt: 'Бір пациентте суық аяқ-қолда сегменттік өткізу баяулап, жылытқаннан кейін қалпына келеді. Екінші пациентте температура бақыланса да баяулау сақталады. Нені қорытындылауға болады және нені болмайды?',
    interpretationLabel: 'Екі бақылауды салыстырып, келесі қадамды ұсыныңыз',
    interpretationAnswers: [
      'Жылытудан кейін қалпына келу температураның маңызды әсерін көрсетеді; бастапқы санның өзі демиелинденуді дәлелдемейді.',
      'Бақыланатын температурада баяулау сақталса, бірнеше сегментті, жауап амплитудасы мен пішінін және клиникалық белгілерді қосымша зерттеу қажет.',
      'Бір жылдамдық көрсеткіші басқа деректерсіз аксон зақымын, демиелинденуді және техникалық факторларды толық ажыратпайды.',
    ],
    criteriaTitle: 'Өзіндік тексеру',
    criteria: ['Глияның төрт түрінің қызметін ажыраттым.', 'Демиелинденудегі ток ағып кетуін және жасушадан тыс K⁺ әсерін бөлек түсіндірдім.', 'Екі латенттіліктің айырмасымен жылдамдықты дұрыс есептедім.', 'Температураны және диагноз қою шектеулерін ескердім.'],
  },
};

export function createModuleThreePractice(language: Language, base: PracticeLesson): PracticeLesson {
  const c=copy[language];
  return {
    ...base,
    sections: [
      {title:c.anatomyTitle,blocks:[
        {type:'paragraph',text:c.anatomyIntro},
        {type:'response',label:language==='RU'?'Назовите функции четырёх типов глии до просмотра таблицы':language==='EN'?'Describe the four glial cell types before consulting the table':'Кестеге қарамай глияның төрт түрінің қызметін сипаттаңыз'},
        {type:'table',headers:c.tableHeaders,rows:c.tableRows},
      ]},
      {title:c.mechanismTitle,blocks:[
        {type:'paragraph',text:c.mechanismIntro},
        {type:'response',label:c.mechanismTitle},
        {type:'table',headers:c.mechanismHeaders,rows:c.mechanismRows},
      ]},
      {title:c.calculationTitle,blocks:[
        {type:'paragraph',text:c.calculationPrompt},
        {type:'response',label:c.calculationLabel},
        {type:'answer',items:c.calculationAnswers},
      ]},
      {title:c.experimentTitle,blocks:[
        {type:'paragraph',text:c.experimentPrompt},
        {type:'response',label:c.experimentInput},
        {type:'response',label:c.experimentOutput},
        {type:'response',label:c.experimentCaveat},
      ]},
      {title:c.interpretationTitle,blocks:[
        {type:'paragraph',text:c.interpretationPrompt},
        {type:'response',label:c.interpretationLabel},
        {type:'answer',items:c.interpretationAnswers},
      ]},
      {title:c.criteriaTitle,blocks:[{type:'checklist',items:c.criteria}]},
    ],
  };
}
