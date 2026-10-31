import type {Language} from "../course";
const stations=[
  {
    "title": [
      "Лаборатория 1. Нернст: расчёт и интерпретация",
      "Lab 1. Nernst calculation and interpretation",
      "1-зертхана. Нернст: есептеу және түсіндіру"
    ],
    "task": [
      "При 37 °C вычислите E_K для [K⁺]внутр=140 ммоль/л и [K⁺]снаружи=4, затем 8 ммоль/л по E_K=61,5 log10(Kout/Kin) мВ. Объясните знак, изменение движущей силы и почему результат не равен измеренному потенциалу покоя. Составьте таблицу исходных данных, единиц и допущений.",
      "At 37 °C calculate E_K for intracellular K⁺=140 mmol/L and extracellular K⁺=4 then 8 mmol/L using E_K=61.5 log10(Kout/Kin) mV. Explain the sign, change in driving force and why this is not the measured resting potential. Tabulate data, units and assumptions.",
      "37 °C-та ішкі K⁺=140 ммоль/л, сыртқы K⁺=4 және 8 ммоль/л үшін E_K=61,5 log10(Kout/Kin) мВ есептеңіз. Таңбасын, қозғаушы күшті және неге бұл өлшенген тыныштық потенциалы емес екенін түсіндіріңіз."
    ],
    "answer": [
      "E_K приблизительно −95 мВ и −76 мВ. Увеличение наружного K⁺ делает E_K менее отрицательным; мембранный потенциал зависит также от проницаемости Na⁺, Cl⁻ и других токов.",
      "E_K is approximately −95 mV and −76 mV. Increasing extracellular K⁺ makes E_K less negative; resting voltage also depends on Na⁺, Cl⁻ and other conductances.",
      "E_K шамамен −95 мВ және −76 мВ. Сыртқы K⁺ артқанда E_K азырақ теріс болады; тыныштық кернеуі басқа иондарға да тәуелді."
    ]
  },
  {
    "title": [
      "Лаборатория 2. Current clamp и потенциал действия",
      "Lab 2. Current clamp and action potential",
      "2-зертхана. Current clamp және әрекет потенциалы"
    ],
    "task": [
      "Сравните ответы мембраны на слабый и надпороговый деполяризующий ток при current clamp. Определите латентность, пороговые условия, амплитуду и скорость нарастания. Объясните роль быстрой активации и инактивации Na⁺-каналов и задержанной K⁺-проводимости. Не отождествляйте порог с неизменным напряжением.",
      "Compare membrane responses to subthreshold and suprathreshold injected currents under current clamp. Identify latency, threshold conditions, amplitude and upstroke. Explain rapid Na⁺ channel activation/inactivation and delayed K⁺ conductance. Do not treat threshold as a universal fixed voltage.",
      "Current clamp кезінде табалдырықасты және табалдырықтан жоғары токқа мембрана жауабын салыстырыңыз. Латенттілікті, табалдырықты, амплитуданы және көтерілуін анықтаңыз. Na⁺ арнасының белсенуі мен инактивациясын, кешігіп K⁺ өткізгіштігін түсіндіріңіз."
    ],
    "answer": [
      "Подпороговый ответ градуален; потенциал действия регенеративен. Его форма зависит от доступности Na⁺-каналов, K⁺-токов, температуры и исходного состояния мембраны.",
      "A subthreshold response is graded, whereas an action potential is regenerative. Shape depends on Na⁺ availability, K⁺ currents, temperature and baseline state.",
      "Табалдырықасты жауап градуалды, әрекет потенциалы регенеративті. Пішіні Na⁺ арналарына, K⁺ токтарына, температураға және бастапқы күйге тәуелді."
    ]
  },
  {
    "title": [
      "Лаборатория 3. Парные стимулы и рефрактерность",
      "Lab 3. Paired pulses and refractoriness",
      "3-зертхана. Қос импульс және рефрактерлік"
    ],
    "task": [
      "В модели подайте два одинаковых стимула с интервалами 1, 2, 5 и 10 мс. Сравните вероятность второго ответа при одинаковой температуре и исходном потенциале. Различите абсолютный и относительный рефрактерные периоды. Укажите, почему точные интервалы зависят от типа клетки и условий эксперимента.",
      "In a model apply two identical stimuli separated by 1, 2, 5 and 10 ms. Compare the second response at fixed temperature and baseline voltage. Distinguish absolute and relative refractory periods. Explain why exact intervals depend on cell type and conditions.",
      "Модельде аралығы 1, 2, 5 және 10 мс болатын екі бірдей стимул беріңіз. Температура мен бастапқы кернеуді тұрақты ұстап, екінші жауапты салыстырыңыз. Абсолютті және салыстырмалы рефрактерлікті ажыратыңыз."
    ],
    "answer": [
      "Абсолютная рефрактерность преимущественно связана с инактивацией Na⁺-каналов; относительная — с их неполным восстановлением и повышенной K⁺-проводимостью. Универсальной границы в миллисекундах нет.",
      "Absolute refractoriness largely reflects Na⁺ channel inactivation; relative refractoriness involves incomplete recovery and elevated K⁺ conductance. No single millisecond cutoff applies universally.",
      "Абсолютті рефрактерлік көбіне Na⁺ арналарының инактивациясымен, салыстырмалысы толық қалпына келмеуі және K⁺ өткізгіштігімен байланысты."
    ]
  },
  {
    "title": [
      "Лаборатория 4. Миелин и кабельные свойства",
      "Lab 4. Myelin and cable properties",
      "4-зертхана. Миелин және кабельдік қасиеттер"
    ],
    "task": [
      "Сопоставьте миелинизированный и демиелинизированный аксоны одинаковой длины. Объясните сопротивление и ёмкость интернодальной мембраны, узловую регенерацию потенциала действия и возможность блока проведения. Сравните влияние диаметра и температуры, укажите, почему сальтаторное проведение не является буквальным «прыжком» ионов.",
      "Compare equally long myelinated and demyelinated axons. Explain internodal membrane resistance/capacitance, nodal action potential regeneration and possible conduction block. Compare diameter and temperature effects; saltatory conduction is not a literal jump of ions.",
      "Ұзындығы бірдей миелинді және демиелинденген аксондарды салыстырыңыз. Түйінаралық кедергі мен сыйымдылықты, түйіндегі әрекет потенциалының қайта түзілуін және блок мүмкіндігін түсіндіріңіз."
    ],
    "answer": [
      "Миелин уменьшает утечку тока и эффективную ёмкость интернодов, ускоряя проведение. Демиелинизация может приводить к замедлению, дисперсии и блоку, но результат зависит от степени повреждения.",
      "Myelin reduces internodal current leak and effective capacitance, supporting faster conduction. Demyelination can cause slowing, dispersion or block depending on severity.",
      "Миелин түйінаралық токтың ағуын және тиімді сыйымдылықты азайтады; демиелинизация баяулау, дисперсия не блок тудыруы мүмкін."
    ]
  },
  {
    "title": [
      "Лаборатория 5. Клинический разбор гиперкалиемии",
      "Lab 5. Clinical interpretation of hyperkalemia",
      "5-зертхана. Гиперкалиемияны клиникалық түсіндіру"
    ],
    "task": [
      "У пациента с лабораторно подтверждённым повышением K⁺ возникла мышечная слабость. Постройте цепь: изменение E_K → мембранная деполяризация → изменение доступности Na⁺-каналов → возможное нарушение возбуждения. Назовите альтернативные причины слабости и объясните, почему выраженная гиперкалиемия требует срочной медицинской оценки и контроля ЭКГ, а учебная модель не определяет лечение.",
      "A patient with confirmed elevated K⁺ develops muscle weakness. Trace E_K shift → depolarization → Na⁺ channel availability → possible excitability failure. Identify alternative causes and explain why significant hyperkalemia requires urgent medical evaluation and ECG monitoring; a teaching model does not prescribe treatment.",
      "Қанда K⁺ жоғарылаған науқаста бұлшықет әлсіздігі дамыды. E_K өзгеруі → деполяризация → Na⁺ арнасының қолжетімділігі → қозудың бұзылуы тізбегін түсіндіріңіз. Балама себептерді атаңыз; ауыр гиперкалиемия шұғыл бағалауды талап етеді."
    ],
    "answer": [
      "Гиперкалиемия может сначала менять возбудимость, а при выраженной длительной деполяризации способствовать инактивации Na⁺-каналов. Тяжесть нельзя установить по одному симптому; необходима клиническая оценка.",
      "Hyperkalemia alters excitability and marked sustained depolarization can inactivate Na⁺ channels. One symptom does not determine severity; clinical assessment is required.",
      "Гиперкалиемия қозғыштықты өзгертіп, ұзақ күшті деполяризация Na⁺ арналарының инактивациясын күшейтуі мүмкін; ауырлық бір симптоммен анықталмайды."
    ]
  }
] as const;
export function moduleFourPracticalStations(language:Language){const i=language==="RU"?0:language==="EN"?1:2;return stations.map(s=>({title:s.title[i],blocks:[{type:"paragraph" as const,text:s.task[i]},{type:"response" as const,label:language==="RU"?"Ваш протокол, расчёты и заключение":language==="EN"?"Your protocol, calculations and interpretation":"Хаттамаңыз, есептер және қорытынды"},{type:"answer" as const,items:[s.answer[i]]}]}));}
