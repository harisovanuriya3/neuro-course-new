import type { Language } from "../course";
import type { PracticeLesson } from "../types";

// Module 9: spinal reflex circuits, descending control, and interpretation.
// Sources checked in Library: Ganong 23e PDF 169–171, 261–262;
// Guyton & Hall 13e PDF 667–669, 671–673;
// C. L. Ghai Practical Physiology 8e PDF 313–315.
// Classroom cases are simplified; do not use them to diagnose a patient.
type Text = Record<Language, string>;
const t = (RU: string, EN: string, KZ: string): Text => ({ RU, EN, KZ });
type Task = {
  id: string;
  title: Text;
  prompt: Text;
  answers: [Text, Text];
};
const tasks: readonly Task[] = [
  {
    id: "stretch-reflex-arc",
    title: t("1. Разберите коленный рефлекс по звеньям",
      "1. Trace the knee-jerk reflex arc",
      "1. Тізе рефлексі доғасының буындарын талдаңыз"),
    prompt: t(
      "Постройте схему: краткое растяжение четырёхглавой мышцы → рецептор → афферент → спинальный синапс → эфферент → ответ. Отдельно обозначьте путь к антагонисту и роль γ-мотонейрона. Какие звенья действительно моносинаптические? Чем сухожильный орган Гольджи отличается от мышечного веретена?",
      "Draw the sequence: brief quadriceps stretch → receptor → afferent → spinal synapse → efferent → response. Add the separate pathway to the antagonist and the role of the γ-motor neuron. Which component is truly monosynaptic? How does the Golgi tendon organ differ from a muscle spindle?",
      "Тізбекті құрыңыз: төртбасты бұлшықеттің қысқа созылуы → рецептор → афферент → жұлындағы синапс → эфферент → жауап. Антагонистке баратын жеке тармақты және γ-мотонейронның рөлін көрсетіңіз. Қай буын шынымен моносинапстық? Гольджи сіңір органы бұлшықет ұршығынан несімен ерекшеленеді?"
    ),
    answers: [
      t(
        "Рецептор — мышечное веретено; Ia-афферент входит через задний корешок и непосредственно возбуждает α-мотонейрон четырёхглавой мышцы в переднем роге. Аксон α-мотонейрона выходит через передний корешок; мышца сокращается. Моносинаптическим называют именно центральное Ia→α-звено, а не всю систему регуляции.",
        "The receptor is the muscle spindle. A group Ia afferent enters via the dorsal root and directly excites a quadriceps α-motor neuron in the ventral horn. Its axon exits through the ventral root and the muscle contracts. The monosynaptic designation applies to the central Ia→α connection, not to the entire control system.",
        "Рецептор — бұлшықет ұршығы. Ia-афферент артқы түбіршек арқылы еніп, алдыңғы мүйіздегі төртбасты бұлшықеттің α-мотонейронын тікелей қоздырады. Оның аксоны алдыңғы түбіршек арқылы шығады, бұлшықет жиырылады. Моносинапстық деген атау бүкіл реттеу жүйесіне емес, орталықтағы Ia→α байланысына қатысты."
      ),
      t(
        "Коллатераль Ia-афферента может активировать тормозный интернейрон для антагониста: эта ветвь полисинаптическая. γ-мотонейрон иннервирует интрафузальные волокна и регулирует чувствительность веретена, но не является Ia-афферентом. Орган Гольджи преимущественно сообщает о мышечном напряжении через Ib-афференты; обычный коленный рефлекс запускается веретеном, а не органом Гольджи.",
        "An Ia collateral may activate an inhibitory interneuron targeting the antagonist; that branch is polysynaptic. A γ-motor neuron supplies intrafusal fibers and adjusts spindle sensitivity, but is not an Ia afferent. Golgi tendon organs chiefly signal muscle tension through Ib afferents; the ordinary knee jerk is initiated by the spindle, not the Golgi tendon organ.",
        "Ia-афференттің тармағы антагонистке әсер ететін тежегіш интернейронды белсендіре алады; бұл тармақ полисинапстық. γ-мотонейрон интрафузалдық талшықтарды жүйкелендіріп, ұршық сезімталдығын реттейді, бірақ Ia-афферент емес. Гольджи сіңір органы бұлшықет кернеуін көбіне Ib-афференттер арқылы хабарлайды; кәдімгі тізе рефлексін Гольджи органы емес, ұршық бастайды."
      )
    ]
  },
  {
    id: "controlled-predictions",
    title: t("2. Предскажите изменения при двух разных нарушениях",
      "2. Predict effects of two different disruptions",
      "2. Екі түрлі бұзылыстың әсерін болжаңыз"),
    prompt: t(
      "Сравните две условные модели при одинаковом кратком растяжении четырёхглавой мышцы: А — выключен Ia-афферент данного веретена; Б — Ia→α-дуга сохранна, но изменён нисходящий контроль. Для каждой укажите ожидаемое направление коленного ответа и что нельзя установить без дополнительных данных. Объясните, почему модель Б не гарантирует гиперрефлексию сразу после острой травмы.",
      "Compare two teaching models under the same brief quadriceps stretch: A, the spindle's Ia afferent is interrupted; B, the Ia→α arc remains intact but descending control is altered. Predict the direction of the knee-jerk response in each and identify what cannot be inferred without more information. Why does model B not guarantee immediate hyperreflexia after acute injury?",
      "Төртбасты бұлшықетті бірдей қысқа созғанда екі оқу моделін салыстырыңыз: А — ұршықтың Ia-афференті үзілген; Б — Ia→α доғасы сақталған, бірақ төмендеуші бақылау өзгерген. Әр жағдайда тізе рефлексінің ықтимал бағытын және қосымша дерексіз нені анықтау мүмкін еместігін көрсетіңіз. Неліктен Б моделінде жедел жарақаттан соң гиперрефлексия бірден міндетті емес?"
    ),
    answers: [
      t(
        "А: при устранении необходимого Ia-входа соответствующий моносинаптический компонент резко ослабнет или исчезнет. Это не доказывает повреждения α-мотонейрона или всех остальных спинальных цепей. В реальном обследовании слабый ответ также может быть связан с мышцей, эфферентом, нервно-мышечной передачей или техникой исследования.",
        "A: removing the essential Ia input markedly reduces or abolishes the corresponding monosynaptic component. This does not prove α-motor-neuron damage or destruction of all other spinal circuits. Clinically, a weak response may also reflect the muscle, efferent limb, neuromuscular transmission, or examination technique.",
        "А: қажетті Ia-кірісті алып тастау тиісті моносинапстық бөлікті айқын әлсіретеді немесе жояды. Бұл α-мотонейронның не барлық басқа жұлын тізбектерінің зақымын дәлелдемейді. Клиникада әлсіз жауап бұлшықетке, эфференттік буынға, жүйке-бұлшықет берілуіне немесе тексеру тәсіліне де байланысты болуы мүмкін."
      ),
      t(
        "Б: изменение нисходящего влияния может усилить или ослабить возбудимость дуги; знак эффекта зависит от путей, времени и состояния сегментарных сетей. При острой тяжёлой травме спинальный шок нередко сопровождается ранней гипо-/арефлексией, а усиление отдельных рефлексов возможно позже. Не приравнивайте возвращение рефлекса к восстановлению произвольных движений.",
        "B: altered descending input can increase or decrease arc excitability; direction depends on the pathways involved, time course, and segmental network state. Acute severe injury can initially produce spinal shock with hypo-/areflexia; some reflexes may become exaggerated later. Reflex return is not evidence of recovered voluntary movement.",
        "Б: төмендеуші әсердің өзгеруі доғаның қозғыштығын арттыруы да, төмендетуі де мүмкін; нәтиже жолдарға, уақытқа және сегменттік желінің күйіне тәуелді. Ауыр жедел жарақаттан кейін жұлындық шок бастапқы гипо-/арефлексиямен өтуі мүмкін; кейбір рефлекстер кейін күшеюі ықтимал. Рефлекстің қайта пайда болуын ерікті қозғалыстың қалпына келуімен теңестірмеңіз."
      )
    ]
  },
  {
    id: "shock-time-course",
    title: t("3. Объясните динамику после травмы спинного мозга",
      "3. Explain the time course after spinal cord injury",
      "3. Жұлын жарақатынан кейінгі уақыттық өзгерістерді түсіндіріңіз"),
    prompt: t(
      "Учебная ситуация: вскоре после тяжёлой травмы ниже очага снижены тонус и сухожильные рефлексы; при последующих осмотрах часть рефлексов возвращается, но произвольная сила не восстановилась. Объясните эти наблюдения без фиксированных сроков. Затем сравните спинальный шок с нейрогенным: какой термин описывает рефлексы, а какой — сердечно-сосудистую регуляцию?",
      "Teaching case: shortly after severe injury, tone and tendon reflexes below the lesion are depressed; later, some reflexes return but voluntary strength has not recovered. Explain the pattern without assuming fixed recovery times. Distinguish spinal shock (reflex function) from neurogenic shock (cardiovascular regulation).",
      "Оқу жағдайы: ауыр жарақаттан кейін көп ұзамай ошақтан төмен тонус пен сіңір рефлекстері бәсеңдеген; кейін кейбір рефлекстер қайта пайда болғанымен, ерікті бұлшықет күші қалпына келмеген. Қатаң мерзім көрсетпей түсіндіріңіз. Жұлындық шокты (рефлекстер) нейрогендік шоктан (жүрек-қантамыр реттелуі) ажыратыңыз."
    ),
    answers: [
      t(
        "В остром периоде внезапная потеря нисходящих влияний может резко снижать возбудимость сохранных сегментарных цепей. Их последующая активность изменяется со временем; сроки и степень возвращения рефлексов индивидуальны. Наличие рефлекса означает сохранение определённых элементов дуги, но не доказывает сохранность длинных проводящих путей или произвольного контроля.",
        "Abrupt loss of descending influences can markedly depress excitability in surviving segmental circuits. Their activity may change over time; timing and degree of reflex recovery vary. A returning reflex indicates activity of elements of its arc but does not establish intact long tracts or voluntary control.",
        "Төмендеуші әсерлердің кенет жоғалуы сақталған сегменттік тізбектердің қозғыштығын айқын бәсеңдетуі мүмкін. Олардың белсенділігі уақыт өте өзгеріп, рефлекстердің қайту мерзімі мен дәрежесі әр адамда әртүрлі болады. Рефлекстің қайтуы доғаның кейбір буындарының қызметін көрсетеді, бірақ ұзын өткізгіш жолдар мен ерікті басқарудың сақталғанын дәлелдемейді."
      ),
      t(
        "Спинальный шок — прежде всего раннее угнетение рефлекторной активности ниже поражения. Нейрогенный шок — гемодинамическое состояние при утрате симпатической регуляции после некоторых повреждений, возможны гипотензия и брадикардия; он требует неотложной клинической оценки. Эти состояния могут сосуществовать, но не являются синонимами.",
        "Spinal shock primarily describes early depression of reflex activity below a lesion. Neurogenic shock is a hemodynamic state caused by loss of sympathetic regulation after certain injuries, potentially producing hypotension and bradycardia; it needs urgent clinical assessment. The two may coexist but are not synonyms.",
        "Жұлындық шок — ең алдымен ошақтан төмен рефлекстік белсенділіктің бастапқы бәсеңдеуі. Нейрогендік шок — кейбір жарақаттардан кейін симпатикалық реттелу жоғалуынан болатын гемодинамикалық жағдай; гипотензия мен брадикардия болуы мүмкін, шұғыл клиникалық бағалау қажет. Екеуі қатар кездесуі мүмкін, бірақ бір ұғым емес."
      )
    ]
  },
  {
    id: "reflex-localization",
    title: t("4. Локализуйте осторожно: два рефлекса и дополнительные данные",
      "4. Localize cautiously: two reflexes and additional findings",
      "4. Абайлап локализациялаңыз: екі рефлекс және қосымша белгілер"),
    prompt: t(
      "Укажите основные сегменты и периферические нервы коленного и ахиллова рефлексов. Если один рефлекс слабее с одной стороны, перечислите минимум три альтернативных уровня нарушения и два дополнительных наблюдения, необходимых для локализации. Объясните, почему рефлекс нельзя считать самостоятельным диагнозом. Не предлагайте болезненные провокационные пробы.",
      "Name the principal spinal segments and peripheral nerves for the patellar and Achilles reflexes. If one response is weaker on one side, list at least three alternative sites of dysfunction and two additional findings needed for localization. Explain why a reflex finding alone is not a diagnosis. Do not suggest painful provocative testing.",
      "Тізе және ахилл рефлекстерінің негізгі сегменттері мен шеткі нервтерін атаңыз. Бір жақтағы жауап әлсіз болса, бұзылыстың кемінде үш ықтимал деңгейін және локализацияға қажет екі қосымша белгіні көрсетіңіз. Неліктен бір рефлекс дербес диагноз болмайды? Ауырсындыратын сынамалар ұсынбаңыз."
    ),
    answers: [
      t(
        "Коленный рефлекс: бедренный нерв, L2–L4 (особенно L3–L4). Ахиллов: большеберцовый нерв, S1–S2 (особенно S1). Возможные причины ослабления включают афферент/корешок, мотонейрон или периферический нерв, нервно-мышечную передачу, мышцу, а также недостаточное расслабление или техническую вариацию. Эти уровни нельзя различить по одному ответу.",
        "Patellar: femoral nerve, L2–L4 (especially L3–L4). Achilles: tibial nerve, S1–S2 (especially S1). A weak response may reflect an afferent/root lesion, motor neuron or peripheral nerve, neuromuscular transmission, muscle, or inadequate relaxation and technical variability. One response cannot distinguish these sites.",
        "Тізе рефлексі: сан нерві, L2–L4 (әсіресе L3–L4). Ахилл рефлексі: асықты жілік нерві, S1–S2 (әсіресе S1). Әлсіз жауап афферент/түбіршекке, мотонейронға не шеткі нервке, жүйке-бұлшықет берілуіне, бұлшықетке, сондай-ақ жеткіліксіз босаңсуға немесе тексеру айырмашылығына байланысты болуы мүмкін. Бір жауаппен бұларды ажыратуға болмайды."
      ),
      t(
        "Сравните обе стороны, силу и распределение слабости, чувствительность, мышечный тонус, другие рефлексы и время появления симптомов; при показаниях нужны дополнительные исследования. Новая слабость с нарушением мочеиспускания или чувствительности в промежности требует срочной медицинской оценки, а не самостоятельного учебного опыта.",
        "Compare sides, distribution of weakness, sensory modalities, tone, other reflexes, and timing; further assessment may be indicated. New weakness with urinary dysfunction or saddle sensory loss needs urgent medical evaluation, not a student experiment.",
        "Екі жақты, әлсіздіктің таралуын, сезімталдық түрлерін, тонусты, басқа рефлекстерді және белгілердің басталу уақытын салыстырыңыз; қажет болса қосымша тексеру керек. Зәр шығарудың бұзылуымен немесе шат аймағындағы сезімталдықтың төмендеуімен қатар жаңа әлсіздік пайда болса, оқу тәжірибесі емес, шұғыл медициналық бағалау қажет."
      )
    ]
  }
];
const responseLabel: Text = t(
  "Сначала запишите собственный прогноз, механизм и ограничения вывода",
  "First record your own prediction, mechanism, and limits of inference",
  "Алдымен өз болжамыңызды, тетікті және қорытындының шектерін жазыңыз"
);
const criteria: Record<Language, string[]> = {
  RU: [
    "Различаю Ia-афферент, α-эфферент, γ-регуляцию веретена и Ib-афферент органа Гольджи.",
    "Отделяю моносинаптическое Ia→α-звено от полисинаптического торможения антагониста.",
    "Не предсказываю одинаковый знак изменения рефлекса при любом поражении нисходящих путей.",
    "Различаю спинальный и нейрогенный шок и не приравниваю рефлекс к произвольному движению.",
    "Указываю L2–L4 и S1–S2 и обосновываю необходимость дополнительных клинических данных."
  ],
  EN: [
    "I distinguish Ia sensory input, α motor output, γ spindle regulation, and Ib tendon-organ input.",
    "I distinguish the monosynaptic Ia→α component from polysynaptic antagonist inhibition.",
    "I do not assume the same direction of reflex change for every descending-pathway lesion.",
    "I distinguish spinal from neurogenic shock and reflex return from voluntary movement.",
    "I identify L2–L4 and S1–S2 and explain why additional clinical evidence is necessary."
  ],
  KZ: [
    "Ia сезімтал кірісін, α-қозғалтқыш шығысын, γ-ұршық реттелуін және Ib сіңір органы кірісін ажыратамын.",
    "Моносинапстық Ia→α бөлігін антагонистің полисинапстық тежелуінен ажыратамын.",
    "Төмендеуші жолдардың кез келген зақымында рефлекс міндетті түрде бір бағытта өзгереді деп есептемеймін.",
    "Жұлындық және нейрогендік шокты, рефлекстің қайтуы мен ерікті қозғалысты ажыратамын.",
    "L2–L4 және S1–S2 деңгейлерін көрсетіп, қосымша клиникалық деректердің қажеттілігін түсіндіремін."
  ]
};
const selfCheckTitle: Text = t("Самопроверка механизма и клинических ограничений",
  "Self-check: mechanisms and clinical limits",
  "Өзін-өзі тексеру: тетіктер мен клиникалық шектеулер");

export function createModuleNinePractice(language: Language, base: PracticeLesson): PracticeLesson {
  return {
    ...base,
    sections: [
      ...tasks.map(task => ({
        title: task.title[language],
        blocks: [
          { type: "paragraph" as const, text: task.prompt[language] },
          { type: "response" as const, label: responseLabel[language] },
          { type: "answer" as const, items: task.answers.map(answer => answer[language]) }
        ]
      })),
      {
        title: selfCheckTitle[language],
        blocks: [{ type: "checklist" as const, items: criteria[language] }]
      }
    ]
  };
}
