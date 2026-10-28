import type { Language } from "./course";
import type { VirtualPatientStage } from "./virtual-patients";

// Reviewed teaching scenario, not a diagnosis or a physiological simulation.
// Evidence: Guyton & Hall 13e, ch 57 (PDF 690-692);
// Ganong 23e, ch 16 (PDF 268-270);
// C. L. Ghai Practical Physiology 8e (PDF 309-313).
type L = Record<Language, string>;
const l = (RU: string, EN: string, KZ: string): L => ({ RU, EN, KZ });
type Step = {
  title: L; situation: L; task: L; evidence: L; mechanism: L;
  choices: [L, L, L]; feedback: [L, L, L];
};
const steps: Step[] = [
  {
    title: l("Начало и безопасность", "Onset and safety", "Басталуы және қауіпсіздік"),
    situation: l("Мужчина 44 лет сообщает о неточных движениях правой руки в течение шести недель. Это синтетический учебный случай; причина пока неизвестна.", "A 44-year-old man reports inaccurate right-hand movements over six weeks. This is a synthetic case; the cause is unknown.", "44 жастағы ер адам алты апта бойы оң қолының қимылдары дәл емес екенін айтады. Бұл оқу жағдайы; себебі әзірге белгісіз."),
    task: l("Что следует уточнить до локализации нарушения?", "What must be clarified before localization?", "Бұзылысты локализациялаудан бұрын нені нақтылау қажет?"),
    evidence: l("Начало постепенное, без внезапного ухудшения, новой сильной головной боли или острой слабости. Новые острые симптомы потребовали бы немедленной медицинской оценки.", "Onset was gradual, without sudden deterioration, new severe headache or acute weakness. New acute symptoms would require immediate medical assessment.", "Басталуы біртіндеп болған, кенет нашарлау, жаңа қатты бас ауруы немесе жедел әлсіздік жоқ. Жаңа жедел белгілер шұғыл медициналық бағалауды қажет етеді."),
    mechanism: l("Время появления симптомов и опасные признаки определяют срочность обследования, но сами по себе не устанавливают анатомическую причину.", "Time course and red flags guide urgency but do not establish an anatomical cause.", "Белгілердің басталу уақыты мен қауіпті белгілер тексерудің шұғылдығын анықтайды, бірақ анатомиялық себепті өздігінен дәлелдемейді."),
    choices: [
      l("Уточнить время начала, динамику и внезапные неврологические симптомы", "Clarify onset, progression and sudden neurological symptoms", "Басталу уақытын, динамикасын және кенет неврологиялық белгілерді нақтылау"),
      l("Сразу установить диагноз поражения мозжечка по жалобе", "Diagnose a cerebellar lesion from the complaint alone", "Тек шағым бойынша мишық зақымын бірден анықтау"),
      l("Не спрашивать о времени начала, поскольку важна только координация", "Ignore onset because only coordination matters", "Тек үйлесім маңызды деп, басталу уақытын сұрамау")
    ],
    feedback: [
      l("Верно: временной профиль и острые опасные признаки проверяют до физиологической локализации.", "Correct: establish time course and acute warning signs before physiological localization.", "Дұрыс: физиологиялық локализацияға дейін уақыт ағымы мен жедел қауіпті белгілерді анықтайды."),
      l("Недостаточно: неточность движения не указывает на единственную причину.", "Not justified: inaccurate movement has more than one possible cause.", "Негізсіз: қимыл дәлсіздігінің бірнеше себебі болуы мүмкін."),
      l("Неверно: внезапное начало атаксии может означать неотложное состояние.", "Incorrect: sudden-onset ataxia can indicate an emergency.", "Қате: кенет басталған атаксия шұғыл жағдайдың белгісі болуы мүмкін.")
    ]
  },
  {
    title: l("Сила и чувствительность", "Strength and sensation", "Күш пен сезімталдық"),
    situation: l("Теперь нужно отделить нарушение координации от пареза и потери чувствительности.", "Next, distinguish incoordination from paresis and sensory loss.", "Енді үйлесім бұзылысын парезден және сезімталдық жоғалуынан ажырату қажет."),
    task: l("Какая пара исследований наиболее информативна?", "Which paired examination is most informative?", "Қай екі тексеруді қатар жүргізген тиімді?"),
    evidence: l("Сила при сопротивлении сохранена с обеих сторон; суставно-мышечное чувство в пальцах сохранено. Движение правой руки остаётся неточным.", "Strength against resistance is preserved bilaterally; joint-position sense in the fingers is intact. Right-arm reaching remains inaccurate.", "Екі жақта да кедергіге қарсы бұлшықет күші сақталған; саусақтардың буын-қалпын сезуі сақталған. Оң қолдың нысанаға қозғалысы дәл емес."),
    mechanism: l("Сохранная сила не исключает мозжечковую дисфункцию; оценка проприоцепции помогает отличить сенсорный вклад в атаксию.", "Preserved power does not exclude cerebellar dysfunction; proprioception testing helps assess a sensory contribution to ataxia.", "Бұлшықет күшінің сақталуы мишық қызметінің бұзылуын жоққа шығармайды; проприоцепцияны тексеру атаксиядағы сенсорлық үлесті бағалауға көмектеседі."),
    choices: [
      l("Проверить силу против сопротивления и чувство положения суставов", "Test resisted strength and joint-position sense", "Кедергіге қарсы күшті және буын қалпын сезуді тексеру"),
      l("Считать любую неточность движения доказательством слабости", "Treat any inaccurate movement as proof of weakness", "Қимылдың кез келген дәлсіздігін әлсіздіктің дәлелі санау"),
      l("Оценить только сухожильные рефлексы и не исследовать чувствительность", "Test tendon reflexes alone and omit sensation", "Тек сіңір рефлекстерін тексеріп, сезімталдықты зерттемеу")
    ],
    feedback: [
      l("Верно: сила и проприоцепция проверяются отдельно от координации.", "Correct: strength and proprioception must be tested separately from coordination.", "Дұрыс: күш пен проприоцепция үйлесімнен бөлек тексеріледі."),
      l("Неверно: дисметрия возможна без выраженного пареза.", "Incorrect: dysmetria can occur without marked paresis.", "Қате: айқын парезсіз де дисметрия болуы мүмкін."),
      l("Недостаточно: рефлексы не заменяют оценку проприоцепции.", "Insufficient: reflexes do not replace proprioceptive examination.", "Жеткіліксіз: рефлекстер проприоцепцияны бағалаудың орнын баспайды.")
    ]
  },
  {
    title: l("Проба на координацию", "Coordination testing", "Үйлесімділікті тексеру"),
    situation: l("Сила и чувство положения сохранены, но при целенаправленном движении правая рука отклоняется от цели.", "Strength and position sense are intact, but the right hand deviates during targeted reaching.", "Күш пен қалып сезімі сақталған, бірақ мақсатты қимыл кезінде оң қол нысанадан ауытқиды."),
    task: l("Как лучше описать и проверить наблюдение?", "How should this finding be tested and described?", "Бұл белгіні қалай тексеріп, сипаттаған дұрыс?"),
    evidence: l("При пальценосовой пробе справа возникает перелёт мимо цели и дрожание, усиливающееся при приближении к ней; слева выполнение точнее.", "Right finger-to-nose testing shows overshoot and tremor increasing near the target; left-sided performance is more accurate.", "Оң жақ пальценос сынамасында нысанадан асып кету және оған жақындағанда күшейетін діріл байқалады; сол жақта қимыл дәлірек."),
    mechanism: l("Дисметрия и интенционный тремор совместимы с нарушением мозжечковой координации, но не определяют причину или очаг без дополнительных данных.", "Dysmetria and intention tremor are compatible with impaired cerebellar coordination, but do not identify the cause or lesion by themselves.", "Дисметрия мен интенциялық тремор мишық үйлесімінің бұзылуына сәйкес келеді, бірақ қосымша дерексіз себеп пен ошақты анықтамайды."),
    choices: [
      l("Сравнить пальценосовую пробу справа и слева, отметить дисметрию", "Compare bilateral finger-to-nose performance and note dysmetria", "Екі жақтың пальценос сынамасын салыстырып, дисметрияны белгілеу"),
      l("Считать тремор при приближении к цели доказательством болезни Паркинсона", "Treat target-approach tremor as proof of Parkinson disease", "Нысанаға жақындағандағы дірілді Паркинсон ауруының дәлелі санау"),
      l("Не сравнивать стороны и не учитывать скорость выполнения", "Avoid side comparison and ignore movement speed", "Екі жақты салыстырмай, қимыл жылдамдығын ескермеу")
    ],
    feedback: [
      l("Верно: сравнение сторон и целенаправленная проба уточняют феномен дисметрии.", "Correct: bilateral targeted testing characterizes dysmetria.", "Дұрыс: екі жақты мақсатты сынама дисметрияны сипаттайды."),
      l("Неверно: интенционный тремор не является специфическим доказательством болезни Паркинсона.", "Incorrect: intention tremor does not establish Parkinson disease.", "Қате: интенциялық тремор Паркинсон ауруын дәлелдемейді."),
      l("Недостаточно: сравнение сторон и условий необходимо для интерпретации.", "Insufficient: comparison across sides and conditions matters.", "Жеткіліксіз: жақтар мен жағдайларды салыстыру маңызды.")
    ]
  },
  {
    title: l("Ромберг и сенсорная атаксия", "Romberg and sensory ataxia", "Ромберг және сенсорлық атаксия"),
    situation: l("При стоянии пациент неустойчив даже с открытыми глазами. Нужно проверить роль зрительной компенсации и проприоцепции, обеспечив страховку от падения.", "The patient is unsteady even with eyes open. Visual compensation and proprioception need assessment with fall precautions.", "Пациент көзі ашық тұрғанда да теңселеді. Құлаудан сақтандырып, көру компенсациясы мен проприоцепцияны бағалау қажет."),
    task: l("Как правильно интерпретировать пробу Ромберга?", "How should the Romberg test be interpreted?", "Ромберг сынамасын қалай дұрыс түсіндіруге болады?"),
    evidence: l("При безопасном осмотре неустойчивость есть с открытыми и закрытыми глазами; резкого ухудшения только при закрывании глаз нет.", "During a guarded examination, instability occurs with eyes open and closed, without a marked deterioration only on eye closure.", "Қауіпсіз тексеруде көз ашық та, жұмулы да тұрақсыздық бар; тек көз жұмғанда күрт нашарлау жоқ."),
    mechanism: l("Положительный Ромберг с выраженным ухудшением при закрытии глаз типичнее для сенсорной атаксии. Неустойчивость при обоих условиях может сопровождать мозжечковые нарушения; проба не является специфическим тестом мозжечка.", "Marked worsening on eye closure favors sensory ataxia. Instability in both conditions may accompany cerebellar dysfunction; Romberg is not a cerebellum-specific test.", "Көз жұмғанда айқын нашарлау сенсорлық атаксияға тәнірек. Екі жағдайда да тұрақсыздық мишық бұзылысымен қатар жүруі мүмкін; Ромберг мишыққа арнайы сынама емес."),
    choices: [
      l("Сравнить устойчивость с открытыми и закрытыми глазами, оценив безопасность", "Compare eyes-open and eyes-closed stability with fall precautions", "Құлаудан сақтандырып, көз ашық және жұмулы кездегі тұрақтылықты салыстыру"),
      l("Считать любой положительный Ромберг специфическим доказательством поражения мозжечка", "Treat any positive Romberg as specific proof of cerebellar damage", "Кез келген оң Ромбергті мишық зақымының арнайы дәлелі санау"),
      l("Попросить пациента стоять без страховки несмотря на риск падения", "Ask the patient to stand unsupported despite fall risk", "Құлау қаупіне қарамастан пациентті сүйемелдеусіз тұрғызу")
    ],
    feedback: [
      l("Верно: оценивают вклад зрения и проприоцепции, не приписывая Ромбергу специфичность для мозжечка.", "Correct: assess vision and proprioception without treating Romberg as cerebellum-specific.", "Дұрыс: Ромбергті мишыққа арнайы деп санамай, көру мен проприоцепция үлесін бағалайды."),
      l("Неверно: выраженное ухудшение при закрытии глаз прежде всего требует оценки сенсорной атаксии.", "Incorrect: worsening on eye closure especially calls for evaluation of sensory ataxia.", "Қате: көз жұмғанда айқын нашарлау сенсорлық атаксияны бағалауды қажет етеді."),
      l("Небезопасно: необходимо предотвращать падение.", "Unsafe: the examiner must prevent a fall.", "Қауіпті: құлаудың алдын алу қажет.")
    ]
  },
  {
    title: l("Походка и глазодвигательные признаки", "Gait and ocular signs", "Жүріс пен көз қимылы белгілері"),
    situation: l("Наряду с дисметрией появились жалобы на шаткость при ходьбе. Не следует ограничивать оценку одной рукой.", "Gait unsteadiness accompanies dysmetria; assessment should not be limited to one hand.", "Дисметриямен бірге жүргенде теңселу байқалады; бағалауды бір қолмен шектеуге болмайды."),
    task: l("Какая дополнительная оценка соответствует наблюдаемым функциям?", "Which additional examination fits these functions?", "Осы қызметтерге қандай қосымша тексеру сәйкес келеді?"),
    evidence: l("Отмечена широкая база ходьбы; при осмотре взора обнаружен нистагм. Эти признаки требуют оценки мозжечковых, вестибулярных и других причин.", "A broad-based gait and gaze-evoked nystagmus are observed. Cerebellar, vestibular and other causes must be considered.", "Кең тіректі жүріс пен көзқарасқа байланысты нистагм байқалады. Мишықтық, вестибулярлық және басқа себептерді қарастыру қажет."),
    mechanism: l("Червь и вестибулоцеребеллум участвуют в постуральном контроле и согласовании движений глаз, но походка и нистагм сами по себе не устанавливают точную локализацию.", "Vermis and vestibulocerebellum contribute to posture and eye movement control, but gait and nystagmus alone do not establish exact localization.", "Мишық құртшасы мен вестибулоцеребеллум дене қалпы мен көз қимылын реттеуге қатысады, бірақ жүріс пен нистагм нақты локализацияны өздігінен дәлелдемейді."),
    choices: [
      l("Оценить походку с поддержкой и движения глаз, сопоставить с остальными признаками", "Assess supported gait and eye movements alongside other findings", "Қолдаумен жүрісті және көз қимылдарын бағалап, өзге белгілермен салыстыру"),
      l("По одному нистагму объявить точный очаг в мозжечке", "Declare an exact cerebellar lesion from nystagmus alone", "Тек нистагмға қарап мишықтағы нақты ошақты белгілеу"),
      l("Не исследовать походку, потому что сила руки сохранена", "Skip gait assessment because arm strength is intact", "Қол күші сақталғандықтан жүрісті тексермеу")
    ],
    feedback: [
      l("Верно: постуральные и глазодвигательные данные дополняют оценку координации.", "Correct: gait and ocular findings complement coordination testing.", "Дұрыс: жүріс пен көз қимылы белгілері үйлесімділікті бағалауды толықтырады."),
      l("Неверно: нистагм встречается при разных центральных и периферических состояниях.", "Incorrect: nystagmus has multiple central and peripheral causes.", "Қате: нистагмның орталық және шеткері себептері әртүрлі."),
      l("Недостаточно: сохранная сила не исключает нарушение равновесия.", "Insufficient: intact strength does not exclude balance dysfunction.", "Жеткіліксіз: күштің сақталуы тепе-теңдік бұзылуын жоққа шығармайды.")
    ]
  },
  {
    title: l("Синтез и ограничения", "Synthesis and limitations", "Қорытынды және шектеулер"),
    situation: l("Собраны сведения о постепенном начале, сохранной силе и проприоцепции, дисметрии, широкой походке и нистагме. Причина и структурный очаг не установлены.", "Gradual onset, preserved strength and proprioception, dysmetria, broad-based gait and nystagmus are documented. Etiology and structural lesion are not established.", "Біртіндеп басталу, күш пен проприоцепцияның сақталуы, дисметрия, кең тіректі жүріс және нистагм тіркелді. Себеп пен құрылымдық ошақ анықталмаған."),
    task: l("Какой итог соответствует данным и границам физиологического вывода?", "Which conclusion respects the evidence and its limitations?", "Қай қорытынды деректерге және физиологиялық тұжырым шегіне сәйкес келеді?"),
    evidence: l("Феноменология совместима с мозжечковой дисфункцией, но не доказывает её единственную причину. Требуются очная неврологическая оценка и исследования по показаниям; внезапная атаксия — повод для экстренной помощи.", "The findings are compatible with cerebellar dysfunction but do not prove a unique cause. Clinical neurological assessment and indicated investigations are needed; sudden ataxia warrants emergency evaluation.", "Белгілер мишық қызметінің бұзылуына сәйкес келуі мүмкін, бірақ жалғыз себепті дәлелдемейді. Неврологиялық тексеру және көрсетілім бойынша зерттеулер қажет; кенет атаксия шұғыл көмекті талап етеді."),
    mechanism: l("Мозжечковые сети интегрируют моторные и сенсорные сигналы для точности и времени движения; клинические признаки не позволяют напрямую измерить активность клеток Пуркинье или глубоких ядер.", "Cerebellar networks integrate motor and sensory signals for movement accuracy and timing; clinical signs do not directly measure Purkinje-cell or deep-nucleus activity.", "Мишық желілері қимыл дәлдігі мен уақытын реттеу үшін моторлық және сенсорлық сигналдарды біріктіреді; клиникалық белгілер Пуркинье жасушалары мен терең ядролар белсенділігін тікелей өлшемейді."),
    choices: [
      l("Описать вероятный мозжечковый синдром, альтернативы и необходимость дальнейшей оценки", "Describe a possible cerebellar syndrome, alternatives and further assessment", "Ықтимал мишықтық синдромды, баламаларды және қосымша бағалау қажеттілігін сипаттау"),
      l("Утверждать доказанное поражение клеток Пуркинье по пальценосовой пробе", "Claim proven Purkinje-cell damage from finger-to-nose testing", "Пальценос сынамасымен Пуркинье жасушаларының зақымын дәлелденді деу"),
      l("Завершить случай без оценки причин и срочности новых симптомов", "Close the case without considering causes or urgency of new symptoms", "Себептерді және жаңа белгілердің шұғылдығын бағаламай істі аяқтау")
    ],
    feedback: [
      l("Верно: синдромное описание не заменяет этиологическую диагностику.", "Correct: syndrome description is not an etiological diagnosis.", "Дұрыс: синдромды сипаттау этиологиялық диагнозды алмастырмайды."),
      l("Неверно: поведенческая проба не измеряет конкретные клетки.", "Incorrect: a behavioral test cannot measure specific cells.", "Қате: мінез-құлық сынамасы нақты жасушаларды өлшемейді."),
      l("Неверно: прогрессирование и новые острые признаки требуют клинической оценки.", "Incorrect: progression and new acute signs require clinical assessment.", "Қате: үдеу мен жаңа жедел белгілер клиникалық бағалауды қажет етеді.")
    ]
  }
];

export function createModuleThirteenPatientStages(language: Language): VirtualPatientStage[] {
  return steps.map((step, index) => {
    const correctOption = index % 3;
    const order = correctOption === 0 ? [0, 1, 2] : correctOption === 1 ? [1, 0, 2] : [1, 2, 0];
    return {
      id: `vp-13-stage-${index + 1}`,
      title: step.title[language],
      situation: step.situation[language],
      mentorPrompt: step.task[language],
      task: step.task[language],
      newData: step.evidence[language],
      mechanism: step.mechanism[language],
      options: order.map((originalIndex, displayedIndex) => ({
        id: `vp-13-stage-${index + 1}-decision-${displayedIndex + 1}`,
        text: step.choices[originalIndex][language],
        response: step.evidence[language],
        feedback: step.feedback[originalIndex][language],
      })) as VirtualPatientStage["options"],
      correctOption,
    };
  });
}
