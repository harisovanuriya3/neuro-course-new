import type {Language} from "../course";
const stations=[
  {
    "title": [
      "Практикум 1. Морфология нейрона и направление сигнала",
      "Practical 1. Neuron morphology and signal direction",
      "1-практикум. Нейрон морфологиясы және сигнал бағыты"
    ],
    "task": [
      "На анатомическом изображении нейрона найдите дендриты, сому, начальный сегмент аксона, аксон и окончания. Сопоставьте структуры с получением синаптических сигналов, интеграцией, генерацией потенциала действия и выделением медиатора. Объясните, почему дендриты могут быть электрически активными и почему морфологическое изображение не доказывает скорость проведения.",
      "Identify dendrites, soma, axon initial segment, axon and terminals in a neuron image. Match them to synaptic input, integration, spike initiation and transmitter release. Explain why dendrites may be electrically active and why morphology alone does not establish conduction velocity.",
      "Нейрон суретінен дендриттерді, соманы, аксонның бастапқы сегментін, аксонды және ұштарын табыңыз. Оларды синапстық кіріс, интеграция, әрекет потенциалы және медиатор бөлінуімен сәйкестендіріңіз. Дендриттердің электрлік белсенді болуы мүмкін екенін және морфология өткізгіштік жылдамдығын дәлелдемейтінін түсіндіріңіз."
    ],
    "answer": [
      "Функция зависит от распределения каналов и синапсов. Потенциал действия часто возникает в начальном сегменте, но морфология не заменяет электрофизиологию.",
      "Function depends on channel and synapse distribution. Spikes often begin at the initial segment, but morphology cannot replace electrophysiology.",
      "Қызмет арналар мен синапстардың таралуына тәуелді. Импульс көбіне бастапқы сегментте пайда болады, бірақ морфология электрофизиологияны алмастырмайды."
    ]
  },
  {
    "title": [
      "Практикум 2. Миелин и скорость проведения",
      "Practical 2. Myelin and conduction",
      "2-практикум. Миелин және өткізу"
    ],
    "task": [
      "Сравните два учебных аксона одинаковой длины: миелинизированный и демиелинизированный. Предскажите изменение задержки, возможный блок проведения и влияние температуры. Отделите увеличение сопротивления мембраны от снижения её эффективной ёмкости. Не называйте сальтаторное проведение буквальным прыжком заряда.",
      "Compare equally long myelinated and demyelinated teaching axons. Predict changes in latency, possible conduction block and temperature effects. Distinguish increased membrane resistance from reduced effective capacitance. Saltatory conduction is not a literal jump of charge.",
      "Ұзындығы бірдей миелинді және демиелинденген аксондарды салыстырыңыз. Кідіріс, өткізудің блокталуы және температура әсерін болжаңыз. Мембрана кедергісінің артуын тиімді сыйымдылықтың азаюынан ажыратыңыз. Сальтаторлық өткізу зарядтың сөзбе-сөз секіруі емес."
    ],
    "answer": [
      "Миелин быстрым проведением способствует за счёт электрической изоляции интернодов; демиелинизация может замедлять проведение и вызывать блок.",
      "Myelin electrically insulates internodes, enabling fast conduction; demyelination may slow conduction or cause block.",
      "Миелин түйінаралық бөліктерді электрлік оқшаулап, өткізуді жылдамдатады; демиелинизация баяулау мен блокқа әкелуі мүмкін."
    ]
  },
  {
    "title": [
      "Практикум 3. Астроциты и внеклеточный калий",
      "Practical 3. Astrocytes and extracellular potassium",
      "3-практикум. Астроциттер және жасушадан тыс калий"
    ],
    "task": [
      "В мысленном эксперименте активность нейронной сети увеличила внеклеточную концентрацию K⁺. Объясните роль астроцитов в буферизации и пространственном перераспределении калия, влияние на равновесный потенциал и возбудимость. Укажите, какие параметры надо контролировать, чтобы отличить изменения нейронных каналов от нарушений глиальной регуляции.",
      "In a thought experiment, increased network activity raises extracellular K⁺. Explain astrocytic buffering and spatial redistribution, effects on equilibrium potential and excitability. Specify controls distinguishing neuronal channel changes from impaired glial regulation.",
      "Ойша тәжірибеде желі белсенділігі жасушадан тыс K⁺ мөлшерін арттырды. Астроциттердің калийді буферлеуі мен кеңістіктік қайта таратуын, тепе-теңдік потенциалы мен қозғыштыққа әсерін түсіндіріңіз. Нейрон арнасының өзгерісін глия реттелуінен ажырататын бақылауларды атаңыз."
    ],
    "answer": [
      "Повышение внеклеточного K⁺ обычно делает калиевый равновесный потенциал менее отрицательным; итоговая возбудимость зависит от масштаба и длительности изменения.",
      "Higher extracellular K⁺ generally makes the potassium equilibrium potential less negative; the net excitability effect depends on magnitude and duration.",
      "Жасушадан тыс K⁺ артуы калийдің тепе-теңдік потенциалын әдетте азырақ теріс етеді; қозғыштық әсері өзгеріс шамасы мен ұзақтығына тәуелді."
    ]
  }
] as const;
export function moduleThreePracticalStations(language:Language){const i=language==="RU"?0:language==="EN"?1:2;return stations.map(s=>({title:s.title[i],blocks:[{type:"paragraph" as const,text:s.task[i]},{type:"response" as const,label:language==="RU"?"Ваше объяснение и наблюдения":language==="EN"?"Your reasoning and observations":"Түсіндіруіңіз және бақылауларыңыз"},{type:"answer" as const,items:[s.answer[i]]}]}));}
