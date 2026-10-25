import type { Language } from "../course";
import { getSectionTitle } from "../sections";
import type { QuestionsLesson } from "../study";

// Module 9: five clinically anchored, mechanism-based reflection questions.
// Source comparison: Ganong 23e ch. 9 (PDF 169–172), Guyton & Hall 13e
// ch. 55 (PDF 667–670), C. L. Ghai Practical Physiology 8e (PDF 315–318).
// These are educational interpretations, not stand-alone diagnostic criteria.
const questions: Record<Language, {prompt:string; explanation:string; section:"theory"|"clinical"|"cases"|"interactive"}[]> = {
  "RU": [
    {
      "prompt": "При изолированном повреждении заднего корешка L3–L4 у пациента снижен коленный рефлекс, но моторные аксоны бедренного нерва сохранны. Какое звено дуги пострадало и почему отсутствие ответа не доказывает гибель α-мотонейронов?",
      "explanation": "Сигнал растяжения четырёхглавой мышцы поступает от мышечных веретён по Ia-афферентам через задний корешок. Его потеря уменьшает возбуждение α-мотонейронов даже при сохранном переднем корешке и мышце. Сходное снижение рефлекса возможно при повреждении периферического нерва, мотонейрона, нервно-мышечного соединения или мышцы; необходимы сравнение сторон, силы и чувствительности.",
      "section": "theory"
    },
    {
      "prompt": "При постукивании по связке надколенника сокращается четырёхглавая мышца, а её антагонист может расслабляться. Почему неправильно называть всю эту реакцию одной моносинаптической цепью и какую роль играет γ-мотонейрон?",
      "explanation": "Ia-афферент от веретена непосредственно возбуждает α-мотонейрон растянутой мышцы: это моносинаптический компонент. Торможение антагониста проходит через дополнительный тормозный интернейрон и является полисинаптическим. γ-мотонейрон иннервирует интрафузальные волокна и меняет чувствительность веретена; он не заменяет сенсорный Ia-вход. Ib-афферент органа Гольджи сигнализирует о напряжении, а не непосредственно запускает обычный коленный рефлекс.",
      "section": "theory"
    },
    {
      "prompt": "После повреждения нисходящих двигательных путей коленный рефлекс стал оживлённым. Можно ли по этому признаку доказать повреждение конкретного корешка или полную утрату торможения? Какие наблюдения нужны?",
      "explanation": "Оживление сухожильного рефлекса совместимо с изменением нисходящей модуляции возбудимости сегментарных цепей, но не устанавливает единственный очаг и не означает исчезновение всех тормозных интернейронов. Сопоставьте мышечную силу, тонус, распределение чувствительных нарушений, другие рефлексы, патологические стопные знаки и временную динамику. Корешковое повреждение чаще снижает соответствующий ответ, но смешанные поражения возможны.",
      "section": "clinical"
    },
    {
      "prompt": "В первые часы после тяжёлой травмы спинного мозга ниже уровня поражения отсутствуют сухожильные рефлексы; через некоторое время некоторые ответы возвращаются. Что объясняет эту динамику и доказывает ли она восстановление произвольных движений?",
      "explanation": "Острое прекращение нисходящих влияний может вызвать спинальный шок с временным угнетением сегментарных рефлексов и тонуса. Их возвращение зависит от времени и состояния сохранившихся спинальных сетей; иногда позднее возникает гиперрефлексия. Это не доказывает восстановления длинных нисходящих путей или произвольного движения. Спинальный шок следует отличать от нейрогенного шока с нарушением симпатического сосудистого контроля и гипотензией.",
      "section": "cases"
    },
    {
      "prompt": "В схематической модели раздражение кожных ноцицепторов вызывает сгибание стимулированной конечности, а при более выраженном ответе — разгибание противоположной. Чем эти цепи отличаются от коленного рефлекса и обязателен ли перекрёстный ответ?",
      "explanation": "Защитное отдёргивание организуют полисинаптические интернейронные сети, которые возбуждают сгибатели и тормозят соответствующие разгибатели; в подходящих условиях межсегментарные связи обеспечивают перекрёстное разгибание для опоры. Оно не является обязательным при каждом стимуле и не должно предлагаться как болезненная проба на студенте. В отличие от этого, основной Ia→α-компонент коленного рефлекса моносинаптический.",
      "section": "interactive"
    }
  ],
  "EN": [
    {
      "prompt": "A selective L3–L4 dorsal-root lesion reduces the patellar reflex while femoral motor axons remain intact. Which link in the arc is disrupted, and why does an absent response not prove α-motor-neuron loss?",
      "explanation": "Stretch information from quadriceps muscle spindles travels in group Ia afferents through the dorsal root. Losing this input reduces excitation of α-motor neurons even when the ventral root and muscle remain intact. A similar reduction can result from peripheral nerve, motor-neuron, neuromuscular-junction or muscle disease; compare sides, strength and sensation before localizing.",
      "section": "theory"
    },
    {
      "prompt": "Tapping the patellar tendon contracts quadriceps while its antagonist may relax. Why is it incorrect to call the entire response one monosynaptic circuit, and what does a γ-motor neuron do?",
      "explanation": "A spindle Ia afferent directly excites an α-motor neuron of the stretched muscle: that component is monosynaptic. Antagonist inhibition requires an additional inhibitory interneuron and is polysynaptic. A γ-motor neuron supplies intrafusal fibers and adjusts spindle sensitivity; it does not replace sensory Ia input. Golgi tendon organ Ib afferents signal tension rather than directly triggering the usual knee jerk.",
      "section": "theory"
    },
    {
      "prompt": "After a descending motor-pathway lesion, the knee jerk becomes brisk. Does that single sign prove a particular root lesion or complete loss of inhibition? What else should be assessed?",
      "explanation": "A brisk tendon reflex can reflect altered descending modulation of spinal circuit excitability, but it neither identifies one lesion site nor implies loss of all inhibitory interneurons. Compare strength, tone, distribution of sensory loss, other reflexes, plantar responses and time course. A root lesion more often depresses the corresponding reflex, although combined lesions can occur.",
      "section": "clinical"
    },
    {
      "prompt": "In the first hours after severe spinal cord injury, tendon reflexes below the lesion are absent; some responses later return. What explains the change, and does it prove voluntary movement has recovered?",
      "explanation": "Abrupt interruption of descending influence can produce spinal shock with transient suppression of segmental reflexes and tone. Reflexes may reappear as surviving spinal circuits change over time, sometimes becoming exaggerated later. Their return does not prove restoration of long descending pathways or voluntary control. Distinguish spinal shock from neurogenic shock involving sympathetic cardiovascular failure and hypotension.",
      "section": "cases"
    },
    {
      "prompt": "In a schematic model, cutaneous nociceptor activation flexes the stimulated limb and, with a stronger response, extends the opposite limb. How does this differ from the knee jerk, and is crossed extension obligatory?",
      "explanation": "Flexor withdrawal relies on polysynaptic interneuronal circuits that excite flexors and inhibit appropriate extensors; under suitable conditions, intersegmental pathways can also support crossed extension. Crossed extension is not inevitable with every stimulus and should not be elicited as a painful classroom test. In contrast, the principal spindle Ia-to-α-motor-neuron component of the knee jerk is monosynaptic.",
      "section": "interactive"
    }
  ],
  "KZ": [
    {
      "prompt": "L3–L4 деңгейіндегі артқы түбіршек оқшау зақымдалып, сан нервінің қозғалтқыш аксондары сақталса да, тізе рефлексі әлсіреді. Доғаның қай буыны бұзылды және жауаптың болмауы α-мотонейрондардың жойылғанын неге дәлелдемейді?",
      "explanation": "Төртбасты бұлшықет ұршықтарынан созылу ақпараты Ia-афференттермен артқы түбіршек арқылы өтеді. Осы кіріс жоғалса, алдыңғы түбіршек пен бұлшықет сақталғанның өзінде α-мотонейрондардың қозуы азаяды. Ұқсас әлсіреу шеткі нерв, мотонейрон, жүйке-бұлшықет түйіспесі немесе бұлшықет зақымында да болады; локализация алдында екі жақты, күшті және сезімталдықты салыстыру қажет.",
      "section": "theory"
    },
    {
      "prompt": "Тізе тобығының сіңірін соққанда төртбасты бұлшықет жиырылып, оның антагонисі босаңсуы мүмкін. Неліктен бүкіл жауапты бір моносинапстық тізбек деуге болмайды және γ-мотонейрон не істейді?",
      "explanation": "Ұршықтан келетін Ia-афферент созылған бұлшықеттің α-мотонейронын тікелей қоздырады: бұл — моносинапстық бөлік. Антагонистің тежелуі қосымша тежегіш интернейрон арқылы өтеді, сондықтан полисинапстық. γ-мотонейрон интрафузалдық талшықтарды жүйкелендіріп, ұршық сезімталдығын реттейді; ол сезімтал Ia-кірісті алмастырмайды. Гольджи сіңір органының Ib-афференттері кернеу туралы хабарлайды, кәдімгі тізе рефлексін тікелей бастамайды.",
      "section": "theory"
    },
    {
      "prompt": "Төмендеуші қозғалтқыш жол зақымынан кейін тізе рефлексі күшейді. Осы белгі бір түбіршектің зақымын немесе барлық тежелудің жоғалуын дәлелдей ме? Нені қосымша бағалау керек?",
      "explanation": "Сіңір рефлексінің күшеюі жұлын тізбектерінің қозғыштығын төмендеуші реттеудің өзгеруімен үйлеседі, бірақ жалғыз ошақты анықтамайды және барлық тежегіш интернейрондардың жойылғанын білдірмейді. Бұлшықет күшін, тонусты, сезімталдық бұзылыстарының таралуын, басқа рефлекстерді, табан белгілерін және уақыт бойынша өзгерісті салыстырыңыз. Түбіршек зақымы тиісті рефлексті жиі әлсіретеді, бірақ аралас зақым да кездеседі.",
      "section": "clinical"
    },
    {
      "prompt": "Жұлынның ауыр жарақатынан кейінгі алғашқы сағаттарда ошақтан төмен сіңір рефлекстері жоқ, кейін кейбірі қайта пайда болды. Бұл өзгеріс қалай түсіндіріледі және ерікті қозғалыс қалпына келгенін дәлелдей ме?",
      "explanation": "Төмендеуші ықпалдардың кенет үзілуі сегменттік рефлекстер мен тонустың уақытша бәсеңдеуімен жүретін жұлындық шокқа әкелуі мүмкін. Сақталған жұлын тізбектерінің белсенділігі уақыт өте өзгеріп, рефлекстер қайта пайда болады, кейде кейін күшейеді. Бұл ұзын төмендеуші жолдардың немесе ерікті қозғалыстың қалпына келгенін дәлелдемейді. Жұлындық шокты симпатикалық жүрек-қантамыр реттелуі бұзылып, гипотензия туындайтын нейрогендік шоктан ажыратыңыз.",
      "section": "cases"
    },
    {
      "prompt": "Схемалық модельде терідегі ноцицепторлардың белсенуі тітіркенген аяқты бүгіп, күштірек жауапта қарсы аяқты жазады. Бұл тізбек тізе рефлексінен несімен өзгеше және айқаспалы жазылу міндетті ме?",
      "explanation": "Қорғаныштық тартып алу рефлексі бүгкіштерді қоздырып, тиісті жазғыштарды тежейтін полисинапстық интернейрондық тізбектерге сүйенеді. Тиісті жағдайда сегментаралық байланыстар қарсы аяқтың жазылуын қамтамасыз ете алады. Айқаспалы жазылу әр стимулда міндетті емес; оны студентте ауырсындыратын сынама ретінде жүргізуге болмайды. Ал тізе рефлексінің негізгі ұршық Ia→α-мотонейрон бөлігі моносинапстық.",
      "section": "interactive"
    }
  ]
};

export function createModuleNineQuestions(language: Language): QuestionsLesson {
  return {
    kind: "questions",
    title: getSectionTitle("questions", language),
    introduction: language === "RU"
      ? "Пять вопросов о рефлекторных цепях спинного мозга. Сначала объясните механизм самостоятельно, затем откройте разбор и назовите пределы клинического вывода."
      : language === "EN"
        ? "Five questions on spinal reflex circuits. Explain the mechanism before revealing the answer, then identify limits of clinical inference."
        : "Жұлынның рефлекстік тізбектері туралы бес сұрақ. Алдымен тетікті өзіңіз түсіндіріп, кейін талдауды оқып, клиникалық қорытындының шегін атаңыз.",
    questions: questions[language].map(({prompt,explanation,section}, index) => ({
      id: "module-9-question-" + (index+1), prompt, explanation, target: {section}
    }))
  };
}
