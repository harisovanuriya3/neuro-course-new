import type {Language} from "../course";
const stations=[
  {
    "title": [
      "Практикум 1. Квантовое высвобождение медиатора",
      "Practical 1. Quantal transmitter release",
      "1-практикум. Медиатордың кванттық бөлінуі"
    ],
    "task": [
      "В модели химического синапса сравните миниатюрные постсинаптические ответы с вызванными. Объясните, как число функциональных мест высвобождения, вероятность выброса и квантовый размер влияют на средний ответ. Предложите контроль при изменении внеклеточного Ca²⁺ и отдельно укажите, почему средняя амплитуда не доказывает механизм.",
      "Compare miniature and evoked postsynaptic responses in a chemical synapse model. Explain contributions of functional release sites, release probability and quantal size. Propose controls when extracellular Ca²⁺ changes and explain why mean amplitude alone cannot identify the mechanism.",
      "Химиялық синапс моделінде миниатюралық және шақырылған постсинапстық жауаптарды салыстырыңыз. Босату орындары, бөліну ықтималдығы және квант мөлшерінің орташа жауапқа әсерін түсіндіріңіз. Сыртқы Ca²⁺ өзгергенде бақылау ұсыныңыз."
    ],
    "answer": [
      "В простой модели средний ответ зависит от n, p и q, но допущения независимости и постоянства квантов должны быть проверены. Миниатюрные ответы помогают оценивать квантовый размер.",
      "In a simplified model mean response depends on n, p and q, but independence and fixed quantal size are assumptions. Miniature responses help estimate quantal size.",
      "Қарапайым модельде орташа жауап n, p және q шамаларына тәуелді, бірақ тәуелсіздік пен квант тұрақтылығы болжамдарын тексеру керек."
    ]
  },
  {
    "title": [
      "Практикум 2. Парная стимуляция и пластичность",
      "Practical 2. Paired-pulse plasticity",
      "2-практикум. Қос стимул және пластикалылық"
    ],
    "task": [
      "Первый ВПСП равен 2 мВ, второй при интервале 50 мс — 3 мВ. Рассчитайте отношение второй амплитуды к первой, предложите пресинаптическую и постсинаптическую гипотезы. Объясните, почему один коэффициент не подтверждает механизм. Сравните результаты при изменении интервала и внеклеточного кальция.",
      "The first EPSP is 2 mV and the second at a 50-ms interval is 3 mV. Calculate the second-to-first amplitude ratio, propose presynaptic and postsynaptic explanations and explain why one ratio is not mechanistic proof. Compare intervals and extracellular calcium conditions.",
      "Бірінші ҚПСП 2 мВ, 50 мс кейінгі екінші жауап 3 мВ. Екінші/бірінші қатынасын есептеп, пресинапстық және постсинапстық болжамдар ұсыныңыз. Бір коэффициент механизмді дәлелдемейтінін түсіндіріңіз."
    ],
    "answer": [
      "Отношение равно 1,5. Возможна фасилитация, но для локализации механизма необходимы дополнительные измерения и контроль.",
      "The ratio is 1.5. Facilitation is possible, but mechanism localization requires additional measurements and controls.",
      "Қатынас 1,5. Фасилитация болуы мүмкін, бірақ механизмді анықтауға қосымша өлшеулер қажет."
    ]
  },
  {
    "title": [
      "Практикум 3. Ионотропные и метаботропные рецепторы",
      "Practical 3. Ionotropic and metabotropic receptors",
      "3-практикум. Ионотроптық және метаботроптық рецепторлар"
    ],
    "task": [
      "Сравните быстрый ток через лиганд-управляемый ионный канал с медленной реакцией через G-белок и внутриклеточные каскады. Для каждого определите ожидаемую задержку, длительность и возможность усиления сигнала. Объясните, почему тип медиатора сам по себе не определяет знак ответа.",
      "Compare a rapid ligand-gated ion-channel current with slower G-protein-mediated signaling. Predict latency, duration and amplification. Explain why transmitter identity alone does not determine response polarity.",
      "Лигандпен ашылатын ион арнасының жылдам тогын G-ақуыз арқылы баяу сигналмен салыстырыңыз. Кідіріс, ұзақтық және күшейтуді болжаңыз. Медиатор атауы жауап таңбасын жалғыз анықтамайтынын түсіндіріңіз."
    ],
    "answer": [
      "Ионотропные рецепторы непосредственно меняют ионную проводимость; метаботропные действуют через сигнальные каскады. Эффект определяется рецептором и ионными градиентами.",
      "Ionotropic receptors directly change ionic conductance; metabotropic receptors signal through intracellular pathways. Effect depends on receptor and ionic gradients.",
      "Ионотроптық рецепторлар өткізгіштікті тікелей, метаботроптық рецепторлар жасушаішілік жолдар арқылы өзгертеді."
    ]
  },
  {
    "title": [
      "Практикум 4. Пресинаптическое и постсинаптическое нарушение",
      "Practical 4. Pre- versus postsynaptic dysfunction",
      "4-практикум. Пре- және постсинапстық бұзылыс"
    ],
    "task": [
      "Сравните два учебных случая утомляемой мышечной слабости: снижение числа доступных постсинаптических ацетилхолиновых рецепторов и снижение пресинаптического высвобождения медиатора. Укажите ожидаемые физиологические различия, ограничения повторной стимуляции и необходимые клинические исследования. Не ставьте диагноз по одному признаку.",
      "Compare fatigable weakness from reduced postsynaptic acetylcholine receptor availability with impaired presynaptic transmitter release. Describe physiological differences, limitations of repetitive stimulation and appropriate clinical tests. Avoid diagnosis from one sign.",
      "Постсинапстық ацетилхолин рецепторларының азаюы мен пресинапстық медиатор бөлінуінің төмендеуін салыстырыңыз. Физиологиялық айырмашылықтарды, қайталама стимул шектеулерін және клиникалық зерттеулерді атаңыз."
    ],
    "answer": [
      "Оба механизма снижают надёжность нервно-мышечной передачи, но локализация дефекта различна. Электрофизиология интерпретируется вместе с клиникой и дополнительными исследованиями.",
      "Both mechanisms impair neuromuscular transmission reliability but affect different sites. Electrodiagnostic results require clinical correlation.",
      "Екі механизм де жүйке-бұлшықет берілуін әлсіретеді, бірақ ақау орны әртүрлі; электродиагностика клиникамен бірге бағаланады."
    ]
  }
] as const;
export function moduleFivePracticalStations(language:Language){const i=language==="RU"?0:language==="EN"?1:2;return stations.map(s=>({title:s.title[i],blocks:[{type:"paragraph" as const,text:s.task[i]},{type:"response" as const,label:language==="RU"?"Ваш протокол и интерпретация":language==="EN"?"Your protocol and interpretation":"Хаттамаңыз және түсіндіруіңіз"},{type:"answer" as const,items:[s.answer[i]]}]}));}
