import type { Language } from "../types";
import type { MediaLesson } from "../media";

// Qualitative reflex-circuit comparison; no latencies or amplitudes are inferred.
// Guyton & Hall 13e, ch. 55 (Library PDF 670–671);
// Ganong 23e, ch. 9 (Library PDF 169–170, 175);
// C. L. Ghai Practical Physiology 8e (Library PDF 318).
const copy = {
 RU: {
  title:"Коленный рефлекс и защитное отдёргивание: сравните цепи",
  introduction:"Сравните два спинальных рефлекса по рецептору, афференту, числу центральных синапсов и двигательному ответу. Это качественная учебная схема, не запись ЭМГ и не измерение латентности.",
  preview:"Сначала выберите рефлекс растяжения, затем отдёргивание. На каждом этапе предскажите, какие нейроны участвуют и какой мышечный ответ ожидается.",
  transcript:[
   "Коленный рефлекс: удар по связке надколенника растягивает четырёхглавую мышцу и её мышечные веретёна. Ia-афференты входят через задний корешок.",
   "Моносинаптический компонент: Ia-афферент непосредственно возбуждает α-мотонейрон четырёхглавой мышцы. Параллельная ветвь Ia-входа действует через тормозный интернейрон на антагонисты; этот путь уже не моносинаптический.",
   "Защитное отдёргивание: ноцицептивные кожные афференты активируют полисинаптические, нередко многосегментарные цепи, которые возбуждают сгибатели и тормозят соответствующие разгибатели.",
   "При подходящих условиях может возникнуть перекрёстное разгибание противоположной ноги для опоры. Оно не является обязательным ответом на любой слабый стимул.",
   "Нисходящие пути регулируют возбудимость обеих цепей. Изменение рефлекса само по себе не указывает на единственный уровень повреждения; клинический вывод требует других данных."
  ],
  prompt:"При сохранённой прямой Ia-связи с α-мотонейронами четырёхглавой мышцы нарушена функция Ia-тормозного интернейрона. Что наиболее вероятно?",
  options:[
   "Исчезает чувствительность мышечного веретена, поскольку Ia-волокно становится γ-мотонейроном.",
   "Ослабевает реципрокное торможение антагониста, хотя прямое Ia-возбуждение четырёхглавой мышцы может сохраняться.",
   "Коленный рефлекс превращается в обязательный перекрёстный разгибательный рефлекс.",
   "Нарушается исключительно болевая чувствительность без изменения мышечной координации."
  ],
  feedback:[
   "Ia — чувствительный афферент мышечного веретена; γ-мотонейрон — отдельный эфферент.",
   "Верно: тормозный интернейрон относится к дополнительной ветви Ia-цепи, а не к прямому моносинаптическому звену.",
   "Перекрёстное разгибание относится к другой, полисинаптической защитной цепи.",
   "Ia-интернейронная ветвь участвует в координации антагонистов."
  ],
  explanation:"Ia-афферент имеет прямой возбуждающий контакт с α-мотонейронами мышцы-агониста и отдельную ветвь к тормозному интернейрону антагониста. Эти ветви различаются по числу центральных синапсов."
 },
 EN: {
  title:"Knee jerk versus withdrawal: compare the circuits",
  introduction:"Compare two spinal reflexes by receptor, afferent, central synapses and motor output. This is a qualitative teaching diagram, not an EMG trace or a latency measurement.",
  preview:"Select stretch reflex, then withdrawal. At each stage predict which neurons are involved and which muscles respond.",
  transcript:[
   "Knee jerk: tapping the patellar tendon stretches the quadriceps and its muscle spindles. Ia afferents enter through the dorsal root.",
   "Monosynaptic component: an Ia afferent directly excites quadriceps α-motor neurons. A collateral Ia pathway inhibits antagonists through an inhibitory interneuron; this branch is not monosynaptic.",
   "Protective withdrawal: cutaneous nociceptive afferents activate polysynaptic, often multisegmental circuits that excite flexors and inhibit relevant extensors.",
   "Under suitable conditions, crossed extension of the opposite leg can help support posture. It is not obligatory with every weak stimulus.",
   "Descending pathways modulate excitability in both circuits. A reflex change alone does not localize a lesion uniquely; clinical interpretation requires additional evidence."
  ],
  prompt:"The direct Ia connection to quadriceps α-motor neurons is intact, but an Ia inhibitory interneuron is impaired. Which outcome is most likely?",
  options:[
   "Muscle spindle sensation disappears because the Ia fiber becomes a γ-motor neuron.",
   "Reciprocal inhibition of the antagonist is reduced, while direct Ia excitation of quadriceps can persist.",
   "The knee jerk necessarily becomes a crossed extensor reflex.",
   "Only pain sensation is affected, without any change in muscle coordination."
  ],
  feedback:[
   "Ia is a spindle sensory afferent; γ-motor neurons are separate efferents.",
   "Correct: the inhibitory interneuron is on an additional Ia branch, not the direct monosynaptic connection.",
   "Crossed extension belongs to a distinct polysynaptic protective circuit.",
   "The Ia interneuron branch contributes to antagonist coordination."
  ],
  explanation:"Ia afferents directly excite agonist α-motor neurons and have a separate branch recruiting an inhibitory interneuron for the antagonist. These branches differ in central synapse count."
 },
 KZ: {
  title:"Тізе рефлексі мен қорғаныштық тартып алуды салыстыру",
  introduction:"Екі жұлын рефлексін рецепторы, афференті, орталық синапстары және қозғалтқыш жауабы бойынша салыстырыңыз. Бұл сапалық оқу сызбасы, ЭМГ жазбасы немесе латенттілікті өлшеу емес.",
  preview:"Алдымен созылу рефлексін, содан кейін тартып алуды таңдаңыз. Әр кезеңде қатысатын нейрондар мен бұлшықет жауабын болжаңыз.",
  transcript:[
   "Тізе рефлексі: тізе тобығының сіңірін соққанда төртбасты бұлшықет пен оның ұршықтары созылады. Ia-афференттер артқы түбір арқылы кіреді.",
   "Моносинапстық бөлік: Ia-афферент төртбасты бұлшықеттің α-мотонейрондарын тікелей қоздырады. Ia-талшығының жанама тармағы антагонистерді тежегіш интернейрон арқылы тежейді; бұл тармақ моносинапстық емес.",
   "Қорғаныштық тартып алу: терідегі ноцицептивтік афференттер бүккіштерді қоздырып, тиісті жазғыштарды тежейтін полисинапстық, жиі бірнеше сегментті қамтитын тізбектерді белсендіреді.",
   "Қолайлы жағдайда тіректі сақтау үшін қарсы аяқтың айқаспалы жазылуы пайда болуы мүмкін. Бұл әрбір әлсіз тітіркендіргіште міндетті емес.",
   "Төмендеуші жолдар екі тізбектің қозғыштығын өзгертеді. Рефлекс өзгерісі зақым деңгейін өздігінен дәл анықтамайды; клиникалық түсіндіруге қосымша деректер қажет."
  ],
  prompt:"Төртбасты бұлшықеттің α-мотонейрондарымен тікелей Ia-байланыс сақталған, бірақ Ia-тежегіш интернейрон қызметі бұзылған. Не күтіледі?",
  options:[
   "Ia-талшығы γ-мотонейронға айналғандықтан бұлшықет ұршығының сезімталдығы жойылады.",
   "Антагонистің реципроктық тежелуі әлсірейді, ал төртбасты бұлшықеттің тікелей Ia-қозуы сақталуы мүмкін.",
   "Тізе рефлексі міндетті түрде айқаспалы жазылу рефлексіне айналады.",
   "Бұлшықет үйлесімі өзгермей, тек ауырсыну сезімі бұзылады."
  ],
  feedback:[
   "Ia — бұлшықет ұршығының сезімтал афференті; γ-мотонейрон — бөлек эфферент.",
   "Дұрыс: тежегіш интернейрон тікелей моносинапстық байланыста емес, Ia-тармағының қосымша жолында орналасады.",
   "Айқаспалы жазылу басқа полисинапстық қорғаныш тізбегіне жатады.",
   "Ia-интернейрондық тармақ антагонист бұлшықеттердің үйлесіміне қатысады."
  ],
  explanation:"Ia-афферент агонистің α-мотонейрондарын тікелей қоздырады және антагонистің тежегіш интернейронын белсендіретін бөлек тармағы бар. Бұл тармақтардың орталық синапс саны әртүрлі."
 }
} as const;

export function createModuleNineMedia(language: Language, base: MediaLesson): MediaLesson {
 const c=copy[language];
 const block=base.blocks[0];
 if(!block) throw new Error("Module 9 media base block missing");
 return {...base,introduction:c.introduction,blocks:[{
  ...block,id:"module-9-spinal-reflex-comparison",title:c.title,
  preview:c.preview,transcript:[...c.transcript],
  theoryAnchor:"spinal-stretch-withdrawal-and-reciprocal-circuits",
  animation:"foundation",
  question:{
   prompt:c.prompt,correctAnswer:"b",explanation:c.explanation,
   options:c.options.map((text,i)=>({id:["a","b","c","d"][i],text,feedback:c.feedback[i]}))
  }
 }]};
}
