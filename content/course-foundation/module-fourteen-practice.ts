import type { Language } from "../course";
import type { PracticeLesson } from "../types";

// Module 14: original, self-assessed thalamic physiology practice.
// Evidence reviewed in Library: Guyton & Hall 13e PDF pp. 584–586;
// Ganong 23e PDF pp. 241–243; C. L. Ghai 8e PDF pp. 323–325.
// Written responses are NOT graded for scientific correctness by the app.
type Text = Record<Language, string>;
const t = (RU: string, EN: string, KZ: string): Text => ({ RU, EN, KZ });
type Task = { id: string; title: Text; prompt: Text; answers: [Text, Text] };

const tasks: readonly Task[] = [
  {
    id: "vpl-vpm-relay",
    title: t("1. Сенсорные ядра: тело и лицо", "1. Sensory relay: body and face", "1. Сенсорлық реле: дене мен бет"),
    prompt: t(
      "Составьте таблицу «источник сигнала — ядро таламуса — корковая область» отдельно для вибрации в левой кисти и прикосновения к левой щеке. Укажите, почему VPL и VPM нельзя поменять местами и какие дополнительные данные нужны, прежде чем локализовать поражение по жалобе на онемение.",
      "Construct a table of signal origin, thalamic nucleus and cortical target for vibration at the left hand and touch at the left cheek. Explain why VPL and VPM are not interchangeable and what additional evidence is needed before localizing a lesion from numbness alone.",
      "Сол қолдағы діріл мен сол жақ беттегі жанасу үшін «сигнал көзі — таламус ядросы — қыртыс аймағы» кестесін құрыңыз. VPL мен VPM неліктен бірін-бірі алмастырмайтынын және ұю сезіміне қарап зақым орнын анықтау үшін тағы қандай дерек қажет екенін түсіндіріңіз."
    ),
    answers: [
      t(
        "От тела соматосенсорная информация идёт преимущественно к VPL, от лица по тройничным путям — к VPM; оба реле связаны с соматосенсорной корой, где сохраняется пространственная организация. Для левой стороны тела и лица важны правосторонние центральные проекции после соответствующих перекрёстов; ход отдельных лицевых путей сложнее простой схемы.",
        "Somatosensory signals from the body relay mainly through VPL; trigeminal signals from the face mainly through VPM. Both project to somatosensory cortex with spatial organization. Contralateral central representations matter for left-sided input after the relevant crossings, although individual facial pathways are more complex than a simple diagram.",
        "Денеден келетін соматосенсорлық ақпарат көбіне VPL-ге, ал беттен үшкіл жүйке жолдары арқылы келетін ақпарат VPM-ге беріледі. Екі реле де кеңістіктік ұйымдасуы бар соматосенсорлық қыртыспен байланысады. Сол жақтан келген сигналдар тиісті айқасулардан кейін негізінен қарсы жақта бейнеленеді; бет жолдары қарапайым сызбадан күрделірек."
      ),
      t(
        "Онемение само по себе не доказывает таламический очаг. Сравните лицо, руку и ногу, отдельные модальности, силу и другие неврологические признаки; возможны периферический, стволовой, таламический и корковый уровни нарушения.",
        "Numbness alone does not prove a thalamic lesion. Compare face, arm and leg, separate modalities, strength and associated neurological signs; peripheral, brainstem, thalamic and cortical sites remain possible.",
        "Ұю сезімі өздігінен таламус зақымын дәлелдемейді. Бет, қол және аяқтағы сезімталдық түрлерін, күшті және қосымша неврологиялық белгілерді салыстырыңыз; бұзылыс шеткі, ми бағаны, таламус немесе қыртыс деңгейінде болуы мүмкін."
      )
    ]
  },
  {
    id: "crossing-pathways",
    title: t("2. Где перекрещиваются два пути?", "2. Where do the two pathways cross?", "2. Екі жол қай жерде айқасады?"),
    prompt: t(
      "На схеме сравните задние канатики — медиальную петлю и переднебоковую систему: модальности, первое переключение, перекрёст и путь к таламусу. Предскажите, какие различия по стороне и модальности возможны при одностороннем повреждении спинного мозга; укажите, почему нельзя выводить точную границу выпадения без осмотра.",
      "Diagram the dorsal-column–medial-lemniscal and anterolateral systems: modalities, first relay, decussation and thalamic destination. Predict possible differences in side and modality after a unilateral spinal cord lesion; explain why an exact sensory level cannot be deduced without examination.",
      "Артқы баған — медиалдық ілмек және алдыңғы-бүйірлік жүйелерді сызбада салыстырыңыз: сезім түрі, алғашқы синапс, айқасу және таламусқа жету жолы. Жұлынның бір жақты зақымында сезім түрі мен жағына қарай қандай айырмашылық болуы мүмкін екенін болжаңыз; нақты шекараны тексерусіз анықтауға болмайтынын түсіндіріңіз."
    ),
    answers: [
      t(
        "Вибрация, тонкое осязание и осознанная проприоцепция преимущественно идут по задним канатикам и перекрещиваются после переключения в продолговатом мозге. Боль и температура преимущественно идут по переднебоковой системе и переходят на противоположную сторону в спинном мозге после переключения в заднем роге.",
        "Vibration, discriminative touch and conscious proprioception mainly use dorsal columns, crossing after a relay in the medulla. Pain and temperature mainly use the anterolateral pathway, crossing within the spinal cord after dorsal-horn processing.",
        "Діріл, нәзік жанасу және саналы проприоцепция көбіне артқы бағанмен өтіп, сопақша мидағы синапстан кейін айқасады. Ауырсыну мен температура негізінен алдыңғы-бүйірлік жүйемен өтіп, жұлынның артқы мүйізіндегі өңдеуден кейін айқасады."
      ),
      t(
        "При одностороннем поражении спинного мозга возможны ипсилатеральное нарушение вибрации/положения ниже очага и контралатеральное нарушение боли/температуры, начинающееся не обязательно на том же сегменте. Это учебный прогноз, а не диагноз: перекрытие путей и клинические детали требуют отдельной оценки.",
        "A unilateral cord lesion can impair vibration/position ipsilaterally below the lesion and pain/temperature contralaterally, not necessarily starting at the identical segment. This is a teaching prediction, not a diagnosis: pathway overlap and clinical details require assessment.",
        "Жұлынның бір жақты зақымында ошақтан төмен діріл мен қалып сезімі зақым жағында, ал ауырсыну мен температура қарсы жақта бұзылуы мүмкін; өзгеріс міндетті түрде бір сегменттен басталмайды. Бұл диагноз емес, оқу болжамы: жолдардың қабаттасуы мен клиникалық ерекшеліктер қосымша бағалауды қажет етеді."
      )
    ]
  },
  {
    id: "attention-detection",
    title: t("3. Внимание и обнаружение сигнала", "3. Attention and signal detection", "3. Зейін және сигналды анықтау"),
    prompt: t(
      "Спроектируйте безопасный опыт: обнаружение слабого, но безвредного тактильного стимула при двух условиях внимания. Сохраняйте интенсивность, длительность, число попыток и правила ответа. Предусмотрите попытки без стимула. Какие показатели и смешивающие факторы запишете? Можно ли по изменению точности утверждать, что активность конкретного ядра таламуса изменилась?",
      "Design a safe weak-but-harmless tactile-detection task under two attention conditions. Keep intensity, duration, trial count and response rules matched, and include no-stimulus catch trials. What measures and confounders will you record? Does changed accuracy prove altered activity in one specific thalamic nucleus?",
      "Зейіннің екі жағдайында әлсіз, бірақ қауіпсіз жанасу стимулын анықтайтын тәжірибе құрыңыз. Қарқындылықты, ұзақтықты, сынақ санын және жауап ережесін бірдей ұстаңыз; стимул берілмейтін сынақтарды қосыңыз. Қандай көрсеткіштер мен ықпал етуші факторларды жазасыз? Дәлдіктің өзгеруі нақты таламус ядросының белсенділігі өзгергенін дәлелдей ме?"
    ),
    answers: [
      t(
        "Сравните долю правильных обнаружений и ложных тревог, при необходимости — время реакции; не смешивайте точность с критерием ответа. Учитывайте обучение, утомление, мотивацию, ожидания и случайные колебания. Сначала запишите прогноз, затем реальные результаты без вымышленных чисел.",
        "Compare hit rates and false-alarm rates, optionally reaction time; do not confuse sensitivity with response criterion. Account for practice, fatigue, motivation, expectations and chance variation. Record predictions before actual results and do not invent numbers.",
        "Дұрыс анықтау мен жалған дабыл жиілігін, қажет болса жауап уақытын салыстырыңыз; сезімталдықты жауап беру өлшемімен шатастырмаңыз. Үйренуді, шаршауды, ынтаны, күтуді және кездейсоқ өзгерісті ескеріңіз. Алдымен болжамды, кейін нақты нәтижені жазыңыз; сандарды ойдан қоспаңыз."
      ),
      t(
        "Таламокортикальные сети участвуют в передаче и модуляции сигналов, но поведенческое различие не является прямым измерением нейронов VPL или ретикулярного ядра. Для вывода о конкретной цепи нужны независимые нейрофизиологические данные.",
        "Thalamocortical networks participate in relay and modulation, but a behavioural difference is not a direct recording from VPL or the reticular nucleus. A claim about a particular circuit requires independent physiological evidence.",
        "Таламус-қыртыс желілері сигналды беруге және модуляциялауға қатысады, бірақ мінез-құлықтағы айырмашылық VPL не ретикулярлық ядро нейрондарының тікелей жазбасы емес. Нақты тізбек туралы қорытындыға тәуелсіз физиологиялық дерек қажет."
      )
    ]
  },
  {
    id: "reticular-gating",
    title: t("4. Возбуждение и торможение таламических сетей", "4. Excitation and inhibition in thalamic networks", "4. Таламус желілеріндегі қозу мен тежелу"),
    prompt: t(
      "Нарисуйте три звена: сенсорный релейный нейрон таламуса, корковый нейрон и нейрон ретикулярного ядра таламуса. Обозначьте глутаматергические и ГАМК-ергические связи, направление обратной связи и ожидаемый эффект торможения. Объясните, почему простая стрелка «ГАМК = выключение всех ощущений» неверна.",
      "Draw three components: a thalamic sensory relay neuron, a cortical neuron and a thalamic reticular nucleus neuron. Label glutamatergic and GABAergic connections, feedback direction and possible inhibitory effects. Explain why the shortcut 'GABA switches off all sensation' is incorrect.",
      "Үш буынды салыңыз: таламустың сенсорлық реле нейроны, қыртыс нейроны және таламустың ретикулярлық ядро нейроны. Глутаматергиялық және ГАМҚ-ергиялық байланыстарды, кері байланыстың бағытын және тежелудің ықтимал әсерін белгілеңіз. «ГАМҚ барлық сезімді өшіреді» деген қарапайым тұжырым неліктен қате?"
    ),
    answers: [
      t(
        "Большинство таламокортикальных релейных нейронов передают возбуждающий глутаматергический сигнал. Нейроны ретикулярного ядра преимущественно ГАМК-ергические, тормозят другие таламические нейроны и не посылают обычных аксонных проекций в кору. Корково-таламическая обратная связь может менять режим передачи.",
        "Most thalamocortical relay neurons provide excitatory glutamatergic output. Reticular nucleus neurons are predominantly GABAergic, inhibit other thalamic neurons and do not send the usual axonal projections to cortex. Corticothalamic feedback can alter relay dynamics.",
        "Таламус-қыртыс реле нейрондарының көбі қоздырушы глутаматергиялық сигнал береді. Ретикулярлық ядро нейрондары негізінен ГАМҚ-ергиялық, басқа таламус нейрондарын тежейді және қыртысқа әдеттегі аксондық проекция жібермейді. Қыртыстан таламусқа кері байланыс берілу режимін өзгерте алады."
      ),
      t(
        "Торможение изменяет вероятность и временную структуру разрядов в конкретной сети; оно не означает глобальную потерю сознания или всех ощущений. Механизм зависит от входов, состояния сети и контекста. Одна учебная схема не доказывает механизм конкретного пациента.",
        "Inhibition changes firing probability and timing in particular circuits; it does not imply global loss of consciousness or all sensation. Effects depend on input and network state. A teaching diagram does not establish an individual patient's mechanism.",
        "Тежелу белгілі желідегі импульстердің ықтималдығы мен уақыттық құрылымын өзгертеді; ол барлық сезімнің не сананың түгел жоғалуын білдірмейді. Әсер кіріске және желі күйіне тәуелді. Оқу сызбасы нақты науқастағы тетікті дәлелдемейді."
      )
    ]
  },
  {
    id: "geniculate-and-olfaction",
    title: t("5. Специальные чувства и обонятельное исключение", "5. Special senses and the olfactory exception", "5. Арнайы сезімдер және иіс сезу ерекшелігі"),
    prompt: t(
      "Для зрения и слуха укажите соответствующее коленчатое тело и первичную корковую область. Затем сравните ранний путь обонятельной информации. Почему фраза «все ощущения обязательно сначала проходят через таламус» неточна? Укажите пределы этой учебной схемы.",
      "Match vision and hearing to their respective geniculate nuclei and primary cortical areas. Then contrast the early olfactory pathway. Why is 'all senses must first pass through the thalamus' inaccurate? State the limits of this simplified map.",
      "Көру мен есту үшін тиісті тізелі денені және бастапқы қыртыс аймағын атаңыз. Содан кейін иіс сезу ақпаратының бастапқы жолын салыстырыңыз. «Барлық сезім алдымен міндетті түрде таламустан өтеді» деген тұжырым неліктен дәл емес? Сызбаның шектеуін көрсетіңіз."
    ),
    answers: [
      t(
        "Латеральное коленчатое тело — ключевое зрительное реле к первичной зрительной коре затылочной доли; медиальное коленчатое тело участвует в слуховом пути к слуховой коре височной доли. Эти ядра нельзя путать с VPL/VPM, которые связаны прежде всего с соматосенсорной информацией.",
        "The lateral geniculate nucleus is a major visual relay to primary occipital visual cortex; the medial geniculate nucleus participates in auditory relay to temporal auditory cortex. Neither should be confused with the somatosensory VPL/VPM.",
        "Латералдық тізелі дене көру сигналын шүйде бөлігіндегі бастапқы көру қыртысына өткізетін негізгі реле; медиалдық тізелі дене есту сигналын самайдағы есту қыртысына беруге қатысады. Бұларды соматосенсорлық VPL/VPM ядроларымен шатастыруға болмайды."
      ),
      t(
        "Обонятельный путь достигает первичных обонятельных корковых областей без обязательного первоначального таламического переключения; таламические связи участвуют в дальнейшей обработке. Это не означает, что таламус вообще не связан с обонянием.",
        "Olfactory input can reach primary olfactory cortical regions without an obligatory initial thalamic relay; thalamic pathways participate in later processing. This does not mean that olfaction has no thalamic connections.",
        "Иіс сезу ақпараты бастапқы иіс сезу қыртысына міндетті алғашқы таламустық релесіз жете алады; кейінгі өңдеуге таламус жолдары қатысады. Бұл иіс сезудің таламуспен мүлде байланысы жоқ деген сөз емес."
      )
    ]
  }
];

const response = t("Запишите прогноз, путь и ограничения вывода", "Write your prediction, pathway and limits of inference", "Болжамды, жолды және қорытынды шегін жазыңыз");
const gradingNote = t(
  "Текстовый ответ не проверяется автоматически на физиологическую правильность. Сопоставьте его с объяснением и при необходимости обсудите с преподавателем.",
  "The app does not automatically judge physiological correctness of written answers. Compare your reasoning with the explanation and consult a teacher if needed.",
  "Қосымша жазбаша жауаптың физиологиялық дұрыстығын автоматты бағаламайды. Жауабыңызды түсіндірмемен салыстырып, қажет болса оқытушымен талқылаңыз."
);
const criteria: Record<Language, string[]> = {
  RU: [
    "Различаю VPL (тело), VPM (лицо) и коленчатые ядра зрения и слуха.",
    "Правильно указываю уровни перекрёста заднеканатиковой и переднебоковой систем.",
    "Разделяю прогноз, наблюдение, ложную тревогу и возможные смешивающие факторы.",
    "Объясняю роль глутаматергических реле и ГАМК-ергического ретикулярного ядра без упрощения «всё выключается».",
    "Не называю учебную схему, один симптом или поведенческий результат доказательством очага либо записи нейронов."
  ],
  EN: [
    "I distinguish VPL (body), VPM (face), and visual versus auditory geniculate relays.",
    "I identify the different crossing levels of dorsal-column and anterolateral pathways.",
    "I distinguish prediction, observation, false alarms and confounding factors.",
    "I explain glutamatergic relays and GABAergic reticular inhibition without claiming global shutdown.",
    "I do not equate a teaching model, one symptom or behaviour with lesion proof or neuronal recording."
  ],
  KZ: [
    "VPL (дене), VPM (бет), көру және есту тізелі ядроларын ажыратамын.",
    "Артқы баған мен алдыңғы-бүйірлік жолдардың айқасу деңгейлерін дұрыс көрсетемін.",
    "Болжамды, бақылауды, жалған дабылды және ықпал етуші факторларды ажыратамын.",
    "Глутаматергиялық реле мен ГАМҚ-ергиялық ретикулярлық тежелуді «бәрі өшеді» деп түсіндірмеймін.",
    "Оқу моделін, бір белгіні немесе мінез-құлық нәтижесін зақым дәлелі не нейрон жазбасы деп қабылдамаймын."
  ]
};

export function createModuleFourteenPractice(language: Language, base: PracticeLesson): PracticeLesson {
  return {
    ...base,
    sections: [
      ...tasks.map(task => ({
        title: task.title[language],
        blocks: [
          { type: "paragraph" as const, text: task.prompt[language] + " " + gradingNote[language] },
          { type: "response" as const, label: response[language] },
          { type: "answer" as const, items: task.answers.map(item => item[language]) }
        ]
      })),
      {
        title: t("Самопроверка без автоматической оценки", "Self-check without automatic grading", "Автоматты бағалаусыз өзін-өзі тексеру")[language],
        blocks: [{ type: "checklist" as const, items: criteria[language] }]
      }
    ]
  };
}
