import type { Language } from "../course";
import type { MediaLesson } from "../media";

// Module 7 only. This is a teaching sequence, not EMG, a clinical recording,
// a numerical model of reflex latency, or a video of a patient.
// Reviewed with Guyton & Hall 13e ch. 55 (Library PDF pp. 666–668),
// Ganong 23e ch. 9 (PDF pp. 169–171), and Ghai 8e (PDF pp. 317–319).
type Copy = {
  title: string;
  introduction: string;
  preview: string;
  transcript: [string, string, string, string, string];
  prompt: string;
  explanation: string;
  options: [string, string, string, string];
  feedback: [string, string, string, string];
};
const copy: Record<Language, Copy> = {
  RU: {
    title: "Коленный рефлекс: от мышечного веретена к сокращению",
    introduction: "Пошаговая физиологическая схема коленного рефлекса. Это качественная учебная визуализация, а не видеозапись пациента, ЭМГ или расчёт латентности. Для оценки рефлекса у пациента сравнивают обе стороны при одинаковом положении и расслаблении мышц.",
    preview: "Перед каждым шагом предскажите, какое звено активируется следующим: растяжение четырёхглавой мышцы → Ia-афферент → α-мотонейрон → сокращение. Отдельно объясните, почему торможение антагониста не является частью прямой моносинаптической связи.",
    transcript: [
      "1. Короткий удар по связке надколенника вызывает быстрое растяжение четырёхглавой мышцы и её мышечных веретён. Рецептором рефлекса является мышечное веретено, а не сухожильный орган Гольджи.",
      "2. Первичные окончания веретена повышают частоту импульсов в афферентных волокнах группы Ia. Они входят в спинной мозг через задний корешок; основная сегментарная дуга коленного рефлекса проходит через L2–L4, с ведущим вкладом L3–L4.",
      "3. Коллатераль Ia-афферента непосредственно возбуждает α-мотонейрон четырёхглавой мышцы в переднем роге; центральная возбуждающая передача преимущественно глутаматергическая. Это моносинаптическое звено рефлекса растяжения.",
      "4. Аксон α-мотонейрона проводит импульс к экстрафузальным мышечным волокнам, а ацетилхолин в нервно-мышечном соединении запускает их возбуждение и сокращение. Возникает разгибательное движение в колене.",
      "5. Параллельная ветвь Ia-афферента через тормозный интернейрон снижает активность мотонейронов мышц-антагонистов. Это реципрокное торможение — полисинаптическая ветвь, а не дополнительный синапс в прямой Ia→α-дуге. По одному слабому ответу нельзя установить точную локализацию поражения."
    ],
    prompt: "При ударе по связке надколенника возник коленный рефлекс. Какое утверждение правильно различает прямое возбуждение и реципрокное торможение?",
    explanation: "Мышечное веретено реагирует на кратковременное растяжение. Ia-афферент непосредственно, через глутаматергический синапс, возбуждает α-мотонейрон четырёхглавой мышцы; параллельное торможение антагониста опосредовано интернейроном. Ацетилхолин действует в нервно-мышечном соединении, а не является передатчиком прямого центрального Ia-синапса.",
    options: [
      "Сухожильный орган Гольджи возбуждает α-мотонейрон напрямую, а Ia-афферент активирует только антагонист.",
      "Ia-афферент непосредственно возбуждает α-мотонейрон четырёхглавой мышцы; торможение антагониста проходит через интернейрон.",
      "Прямой Ia→α-синапс является холинергическим, а возбуждение мышцы осуществляется глутаматом.",
      "Коленный рефлекс требует обязательного переключения всех сигналов через кору больших полушарий."
    ],
    feedback: [
      "В данном рефлексе растяжение регистрирует мышечное веретено; орган Гольджи прежде всего сигнализирует о напряжении.",
      "Верно: прямое Ia→α-возбуждение моносинаптическое, а реципрокное торможение включает интернейрон.",
      "Перепутаны передатчики: центральный Ia→α-синапс глутаматергический, нервно-мышечная передача холинергическая.",
      "Спинальная дуга может осуществить ответ без обязательного участия коры; нисходящие влияния способны менять его выраженность."
    ]
  },
  EN: {
    title: "Patellar reflex: from muscle spindle to contraction",
    introduction: "A stepwise physiological schematic of the patellar reflex, not patient footage, EMG or a numerical reflex-latency model. Clinical interpretation requires bilateral comparison under standardized positioning and muscle relaxation.",
    preview: "Predict each next link: quadriceps stretch → Ia afferent → α-motor neuron → contraction. Explain separately why antagonist inhibition is not part of the direct monosynaptic connection.",
    transcript: [
      "1. A brief tap on the patellar ligament rapidly stretches the quadriceps and its muscle spindles. The stretch-reflex receptor is the muscle spindle, not the Golgi tendon organ.",
      "2. Spindle primary endings increase firing in group Ia afferents. They enter the spinal cord through the dorsal root. The patellar reflex arc involves L2–L4, with prominent L3–L4 contributions.",
      "3. A branch of the Ia afferent directly excites a quadriceps α-motor neuron in the ventral horn; the central excitatory synapse is primarily glutamatergic. This is the monosynaptic stretch-reflex pathway.",
      "4. The α-motor axon reaches extrafusal muscle fibers. Acetylcholine at the neuromuscular junction initiates muscle excitation and contraction, producing knee extension.",
      "5. A parallel Ia collateral recruits an inhibitory interneuron that reduces antagonist motor-neuron activity. This reciprocal inhibition is a polysynaptic branch, not another synapse in the direct Ia→α pathway. A reduced knee jerk alone cannot localize a lesion."
    ],
    prompt: "During the patellar reflex, which statement correctly distinguishes direct excitation from reciprocal inhibition?",
    explanation: "Rapid stretch activates muscle spindles. Ia afferents directly excite quadriceps α-motor neurons through a glutamatergic synapse, while antagonist inhibition is mediated by an interneuron. Acetylcholine acts at the neuromuscular junction, not at the direct central Ia synapse.",
    options: [
      "The Golgi tendon organ directly excites the α-motor neuron while Ia afferents activate only the antagonist.",
      "Ia afferents directly excite quadriceps α-motor neurons; antagonist inhibition uses an interneuron.",
      "The direct Ia→α synapse uses acetylcholine, while the neuromuscular junction uses glutamate.",
      "The knee jerk requires every signal to relay through the cerebral cortex."
    ],
    feedback: [
      "The muscle spindle senses stretch in this reflex; Golgi tendon organs primarily signal tension.",
      "Correct: the direct Ia→α excitation is monosynaptic; reciprocal inhibition requires an interneuron.",
      "The transmitters are reversed: the central Ia→α synapse is glutamatergic and neuromuscular transmission is cholinergic.",
      "The spinal arc can produce the reflex without an obligatory cortical relay; descending inputs can modulate its gain."
    ]
  },
  KZ: {
    title: "Тізе рефлексі: бұлшықет ұршығынан жиырылуға дейін",
    introduction: "Тізе рефлексінің кезеңдік физиологиялық сызбасы. Бұл науқастың бейнежазбасы, ЭМГ немесе рефлекс латенттілігінің сандық моделі емес. Клиникалық бағалауда екі жақты бірдей қалыпта және бұлшықеттер босаңсыған кезде салыстырады.",
    preview: "Келесі буынды алдын ала болжаңыз: төртбасты бұлшықеттің созылуы → Ia-афферент → α-мотонейрон → жиырылу. Антагонистің тежелуі неліктен тікелей моносинапстық байланыстың бөлігі емес екенін түсіндіріңіз.",
    transcript: [
      "1. Тізе тобығының байламын қысқа соққылау санның төртбасты бұлшықетін және оның бұлшықет ұршықтарын тез созады. Бұл рефлекстің рецепторы — бұлшықет ұршығы, Гольджи сіңір мүшесі емес.",
      "2. Ұршықтың біріншілік ұштары Ia тобының афференттік талшықтарында импульстер жиілігін арттырады. Олар жұлынға артқы түбір арқылы енеді. Тізе рефлексінің доғасы L2–L4 сегменттерімен байланысты, L3–L4 үлесі басым.",
      "3. Ia-афференттің тармағы жұлынның алдыңғы мүйізіндегі төртбасты бұлшықет α-мотонейронын тікелей қоздырады; орталықтағы қоздырушы синапс негізінен глутаматергиялық. Бұл — созылу рефлексінің моносинапстық жолы.",
      "4. α-мотонейрон аксоны экстрафузальды бұлшықет талшықтарына импульс жеткізеді. Жүйке-бұлшықет түйіскен жерінде ацетилхолин қозу мен жиырылуды бастайды, нәтижесінде тізе буыны жазылады.",
      "5. Ia-афференттің қатар жүретін тармағы тежеуші интернейрон арқылы антагонист бұлшықеттердің мотонейрон белсенділігін төмендетеді. Бұл реципроктық тежелу — полисинапстық тармақ, тікелей Ia→α доғасындағы қосымша синапс емес. Тізе рефлексінің әлсіздігі ғана зақым орнын дәл анықтамайды."
    ],
    prompt: "Тізе рефлексінде тікелей қозу мен реципроктық тежелуді дұрыс ажырататын тұжырым қайсы?",
    explanation: "Жылдам созылу бұлшықет ұршығын белсендіреді. Ia-афферент төртбасты бұлшықеттің α-мотонейронын глутаматергиялық синапс арқылы тікелей қоздырады, ал антагонистің тежелуі интернейрон арқылы жүреді. Ацетилхолин орталықтағы тікелей Ia-синапста емес, жүйке-бұлшықет түйіскен жерінде әсер етеді.",
    options: [
      "Гольджи сіңір мүшесі α-мотонейронды тікелей қоздырады, ал Ia-афферент тек антагонисті белсендіреді.",
      "Ia-афферент төртбасты бұлшықеттің α-мотонейронын тікелей қоздырады; антагонистің тежелуі интернейрон арқылы жүреді.",
      "Тікелей Ia→α синапсы ацетилхолин қолданады, ал жүйке-бұлшықет түйіскен жері глутамат қолданады.",
      "Тізе рефлексінің барлық сигналдары міндетті түрде үлкен ми сыңарларының қыртысы арқылы өтеді."
    ],
    feedback: [
      "Бұл рефлексте созылуды бұлшықет ұршығы сезеді; Гольджи сіңір мүшесі көбіне кернеуді хабарлайды.",
      "Дұрыс: тікелей Ia→α қозуы моносинапстық, ал реципроктық тежелуге интернейрон қажет.",
      "Медиаторлар ауыстырылған: орталықтағы Ia→α синапсы глутаматергиялық, ал жүйке-бұлшықет берілісі холинергиялық.",
      "Жұлындық доға қыртыс арқылы міндетті ауыспай-ақ жауап береді; төмендеуші ықпалдар рефлекстің айқындылығын өзгерте алады."
    ]
  }
};

export function createModuleSevenMedia(language: Language, base: MediaLesson): MediaLesson {
  const c = copy[language];
  const block = base.blocks[0];
  if (!block) throw new Error("Module 7 media base block missing");
  return {
    ...base,
    introduction: c.introduction,
    blocks: [{
      ...block,
      id: "module-7-patellar-reflex-sequence",
      title: c.title,
      preview: c.preview,
      transcript: c.transcript,
      theoryAnchor: "reflex-arc-path",
      animation: "foundation",
      question: {
        prompt: c.prompt,
        correctAnswer: "b",
        explanation: c.explanation,
        options: c.options.map((text, i) => ({
          id: ["a", "b", "c", "d"][i],
          text,
          feedback: c.feedback[i]
        }))
      }
    }]
  };
}
