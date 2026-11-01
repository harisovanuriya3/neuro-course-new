import type {Language} from "../course";
const stations=[
  {
    "title": [
      "Лаборатория 1. Монтаж ЭЭГ и источники артефактов",
      "Laboratory 1. EEG montage and artifacts",
      "1-зертхана. ЭЭГ монтажы және артефактілер"
    ],
    "description": [
      "Сравните международную схему 10–20 с расположением электродов на анатомическом изображении головы. Выделите фронтальные, центральные, теменные и затылочные отведения. Объясните, почему изменение референтного электрода меняет вид кривой, но не обязательно физиологический источник. Для учебного набора данных отметьте моргание, движения и мышечную активность; запишите признаки, по которым их отличают от корковой активности.",
      "Compare the international 10–20 map with scalp anatomy. Identify frontal, central, parietal and occipital leads. Explain why changing reference electrodes alters a waveform without necessarily changing its physiological source. Mark blinking, movement and muscle activity in a teaching trace and document criteria separating these from cortical activity.",
      "10–20 халықаралық сызбасын бастың анатомиялық көрінісімен салыстырыңыз. Маңдай, орталық, төбе және шүйде электродтарын анықтаңыз. Референтті электрод өзгергенде қисықтың неге өзгеретінін, бірақ физиологиялық көздің міндетті түрде өзгермейтінін түсіндіріңіз. Оқу жазбасында көз жыпылықтауын, қозғалысты және бұлшықет белсенділігін белгілеңіз."
    ],
    "answer": [
      "Контроль: глазные артефакты обычно имеют выраженное фронтальное распределение и связь с ЭОГ; мышечные артефакты часто содержат высокочастотную активность. Форма и распределение сами по себе не доказывают источник без сопутствующих каналов.",
      "Control: ocular artifacts often show frontal predominance and EOG correlation; muscle artifacts commonly contain high-frequency activity. Waveform and topography alone do not prove origin without auxiliary channels.",
      "Бақылау: көз артефактілері көбіне маңдай аймағында басым және ЭОГ-мен байланысты; бұлшықет артефактілерінде жоғары жиілікті белсенділік жиі кездеседі. Қосымша арналарсыз толқын түрі мен таралуы көзді дәлелдемейді."
    ]
  },
  {
    "title": [
      "Лаборатория 2. Усреднение вызванных потенциалов",
      "Laboratory 2. Evoked-potential averaging",
      "2-зертхана. Шақырылған потенциалдарды орташалау"
    ],
    "description": [
      "Используйте виртуальную лабораторию усреднения модуля 2. Сравните 10, 25, 50 и 100 эпох при одинаковой амплитуде ответа и случайном шуме. В идеальной модели отношение сигнал/шум растёт приблизительно как квадратный корень числа независимых проб. Отдельно добавьте стимул-синхронное моргание: объясните, почему усреднение не устраняет такой артефакт. Укажите число проб, латентность, амплитуду, базовую линию и критерии отбраковки.",
      "Use module 2's evoked-potential averaging lab. Compare 10, 25, 50 and 100 epochs with fixed response amplitude and independent noise. Under ideal assumptions signal-to-noise ratio improves approximately with the square root of trial count. Add a stimulus-locked blink and explain why averaging retains it. Report trials, latency, amplitude, baseline and rejection criteria.",
      "2-модульдің шақырылған потенциалдарды орташалау зертханасын қолданыңыз. Жауап амплитудасы тұрақты және шу тәуелсіз болғанда 10, 25, 50 және 100 дәуірді салыстырыңыз. Идеал жағдайда сигнал/шу қатынасы сынақ санының квадрат түбіріне жуық жақсарады. Стимулмен байланысқан көз жыпылықтауын қосып, оның неге сақталатынын түсіндіріңіз."
    ],
    "answer": [
      "При увеличении числа независимых проб с 25 до 100 ожидаемое улучшение отношения сигнал/шум составляет примерно 2 раза; систематический синхронный артефакт не исчезает. Это учебная идеализация, а не универсальный закон для любого шума.",
      "Increasing independent trials from 25 to 100 gives an expected twofold signal-to-noise improvement; a systematic time-locked artifact remains. This is an idealized model, not a universal law for all noise.",
      "Тәуелсіз сынақтар санын 25-тен 100-ге өсіргенде сигнал/шу қатынасы шамамен екі есе жақсарады; жүйелі синхронды артефакт сақталады. Бұл барлық шуға бірдей қолданылатын заң емес, идеалданған модель."
    ]
  },
  {
    "title": [
      "Лаборатория 3. Сопоставление ЭЭГ, ЭМГ и МРТ",
      "Laboratory 3. Comparing EEG, EMG and MRI",
      "3-зертхана. ЭЭГ, ЭМГ және МРТ салыстыру"
    ],
    "description": [
      "Три клинических вопроса: (1) есть ли эпилептиформная активность при подозрении на приступ; (2) где находится структурное поражение после внезапного очагового дефицита; (3) есть ли периферическое нарушение проведения при слабости кисти. Для каждого выберите первичный метод, измеряемую величину, ограничение и дополнительную проверку. Не подменяйте клиническую неотложную оценку учебной симуляцией.",
      "Three questions: (1) is epileptiform activity present in suspected seizures; (2) where is a structural lesion in sudden focal deficit; (3) is peripheral conduction impaired in hand weakness? For each choose a relevant method, measured quantity, limitation and follow-up. A teaching simulation must not delay urgent clinical assessment.",
      "Үш сұрақ: (1) ұстама күдігінде эпилептиформдық белсенділік бар ма; (2) кенет ошақты тапшылықта құрылымдық зақым қайда; (3) қол әлсіздігінде шеткі өткізгіштік бұзылған ба? Әрқайсысына әдісті, өлшенетін шаманы, шектеуді және қосымша тексеруді таңдаңыз."
    ],
    "answer": [
      "ЭЭГ оценивает электрическую активность, МРТ — структуру (фМРТ — косвенный BOLD-сигнал), исследования проводимости и ЭМГ — периферическую нервно-мышечную систему. Нормальная межприступная ЭЭГ не исключает эпилепсию.",
      "EEG measures electrical activity; MRI assesses anatomy (fMRI measures indirect BOLD contrast); conduction studies and EMG assess peripheral neuromuscular function. A normal interictal EEG does not rule out epilepsy.",
      "ЭЭГ электр белсенділігін, МРТ құрылымды (фМРТ жанама BOLD-сигналды), ал нерв өткізгіштігі мен ЭМГ шеткі жүйке-бұлшықет қызметін бағалайды. Ұстамалар арасындағы қалыпты ЭЭГ эпилепсияны жоққа шығармайды."
    ]
  }
] as const;
export function moduleTwoPracticalStations(language:Language){const i=language==="RU"?0:language==="EN"?1:2;return stations.map(station=>({title:station.title[i],blocks:[{type:"paragraph" as const,text:station.description[i]},{type:"response" as const,label:language==="RU"?"Ваш протокол и вывод":language==="EN"?"Your protocol and conclusion":"Хаттамаңыз және қорытындыңыз"},{type:"answer" as const,items:[station.answer[i]]}]}));}
