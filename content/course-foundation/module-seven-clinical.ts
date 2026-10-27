import type { Language } from "../course";
import type { ReadingLesson } from "../study";
import { getSectionTitle } from "../sections";

// Module 7, clinical application of the muscle stretch reflex.
// Sources checked against Library originals: Ganong 23e ch. 9, PDF pp. 169–170;
// Guyton & Hall 13e ch. 55, PDF pp. 666–668;
// C. L. Ghai Practical Physiology 8e, PDF pp. 317–319.
// An isolated reflex finding cannot diagnose or localize a lesion.
const data: Record<Language, {
  intro: string;
  titles: [string, string, string, string, string];
  paragraphs: [string, string, string, string, string];
}> = {
  RU: {
    intro: "Клинический мост: коленный рефлекс, контроль условий исследования и пределы вывода.",
    titles: ["Наблюдение", "Рецептор и основная дуга", "Реципрокное торможение — отдельная ветвь", "Проверка альтернатив", "Что можно заключить"],
    paragraphs: [
      "У студента 21 года при первом исследовании коленный рефлекс справа едва заметен: он напрягает мышцы бедра и удерживает голень. Слева ответ отчётлив. После одинакового положения обеих ног, расслабления и приёма Ендрассика разгибание в колене становится заметным с обеих сторон. Выраженной асимметрии силы и чувствительности при кратком осмотре не выявлено. Почему первый результат нельзя сразу назвать поражением нерва?",
      "Удар по связке надколенника быстро растягивает четырёхглавую мышцу и её мышечные веретёна, а не сухожильные органы Гольджи. Афференты Ia идут через бедренный нерв, спинномозговой узел и задний корешок к альфа-мотонейронам преимущественно сегментов L2–L4 (особенно L3–L4). Основная возбуждающая связь моносинаптическая; эфферентный сигнал возвращается по бедренному нерву к четырёхглавой мышце, вызывая разгибание колена.",
      "Ответвление Ia-афферента может возбуждать тормозный интернейрон, уменьшающий активность альфа-мотонейронов мышц-антагонистов. Это реципрокное торможение с дополнительным синапсом; оно не превращает основную Ia→альфа-мотонейронную ветвь в полисинаптическую. Величина наблюдаемого движения также зависит от состояния мышцы и нисходящих влияний.",
      "Повторите исследование при одинаковой позе, расслаблении и сопоставимом ударе, сравните обе стороны; при слабом ответе примените приём Ендрассика. Уточните силу разгибания колена, чувствительность, другие рефлексы и симптомы. Если слабость рефлекса стойкая, рассмотрите афферентный путь, сегментарные связи, мотонейрон, бедренный нерв, нервно-мышечную передачу и саму мышцу; одно наблюдение не различает эти причины.",
      "В данном примере изменение ответа после стандартизации условий и подкрепления совместимо с влиянием условий исследования и возбудимости рефлекторной сети; по одному повторному наблюдению нельзя установить вклад каждого фактора. Это не доказывает ни отсутствие заболевания, ни конкретный диагноз. Нельзя считать приём Ендрассика специфическим тестом целостности бедренного нерва или локализовать поражение по одному коленному рефлексу."
    ]
  },
  EN: {
    intro: "Clinical bridge: knee jerk, standardized examination and limits of inference.",
    titles: ["Observation", "Receptor and principal arc", "Reciprocal inhibition is a separate branch", "Check competing explanations", "What can be concluded"],
    paragraphs: [
      "At an initial examination, a 21-year-old student's right knee jerk is barely visible while the student tenses the thigh and holds the lower leg; the left response is clear. With both legs positioned similarly, the muscles relaxed, and the Jendrassik maneuver, knee extension becomes visible on both sides. No marked asymmetry in strength or sensation is found on brief examination. Why does the first finding not establish a nerve lesion?",
      "A tap on the patellar ligament rapidly stretches the quadriceps and its muscle spindles, not Golgi tendon organs. Group Ia afferents travel via the femoral nerve, dorsal root ganglion and dorsal root to alpha motor neurons mainly at L2–L4 (especially L3–L4). The principal excitatory connection is monosynaptic; efferent impulses return through the femoral nerve to the quadriceps, producing knee extension.",
      "An Ia afferent collateral can excite an inhibitory interneuron, reducing alpha motor neuron activity in antagonist muscles. This reciprocal inhibition has an additional synapse; it does not make the principal Ia-to-alpha-motor-neuron branch polysynaptic. Visible movement also depends on muscle state and descending influences.",
      "Repeat the test with comparable posture, relaxation and tap, comparing both sides; use the Jendrassik maneuver when the response is weak. Examine knee extension strength, sensation, other reflexes and symptoms. If hyporeflexia persists, consider the sensory limb, segmental synapses, motor neuron, femoral nerve, neuromuscular transmission and muscle; the isolated finding does not distinguish among them.",
      "In this example, the change after standardizing conditions and reinforcement is consistent with effects of examination conditions and circuit excitability; a single repeat test cannot isolate the contribution of each factor. It proves neither absence of disease nor a particular diagnosis. The Jendrassik maneuver is not a specific test of femoral nerve integrity, and a single knee jerk cannot localize a lesion."
    ]
  },
  KZ: {
    intro: "Клиникалық байланыс: тізе рефлексі, тексеру жағдайларын біріздендіру және қорытындының шектері.",
    titles: ["Алғашқы бақылау", "Рецептор және негізгі доға", "Реципроктық тежелу — бөлек тармақ", "Балама түсіндірмелерді тексеру", "Қандай қорытынды жасауға болады"],
    paragraphs: [
      "21 жастағы студенттің алғашқы тексеруінде оң жақ тізе рефлексі әрең байқалады: ол сан бұлшықеттерін керіп, сирағын ұстап тұрады. Сол жақтағы жауап анық. Екі аяқты бірдей орналастырып, бұлшықеттерді босаңсытқаннан және Ендрассик тәсілін қолданғаннан кейін екі жақта да тізенің жазылуы байқалады. Қысқаша тексеруде күш пен сезімталдықтың айқын асимметриясы анықталмады. Неліктен алғашқы нәтиже жүйке зақымын дәлелдемейді?",
      "Тізе тостағаншасының байламын соғу төртбасты бұлшықетті және оның бұлшықет ұршықтарын тез созады; Гольджи сіңір органдары негізгі рецептор емес. Ia-афференттер сан жүйкесі, жұлын түйіні және артқы түбір арқылы көбіне L2–L4 (әсіресе L3–L4) сегменттеріндегі альфа-мотонейрондарға жетеді. Негізгі қоздырғыш байланыс моносинапстық; эфференттік импульстер сан жүйкесімен төртбасты бұлшықетке оралып, тізені жазады.",
      "Ia-афференттің тармағы тежегіш интернейронды қоздырып, антагонист бұлшықеттердің альфа-мотонейрондарының белсенділігін азайта алады. Бұл реципроктық тежелу қосымша синапсты қамтиды; ол негізгі Ia→альфа-мотонейрон тармағын полисинапстық етпейді. Көрінетін қозғалыс бұлшықет күйіне және төмендеуші ықпалдарға да тәуелді.",
      "Екі жақты салыстырып, аяқтардың қалпын, босаңсуын және соққыны бірдей етіп қайта тексеріңіз; әлсіз жауапта Ендрассик тәсілін қолданыңыз. Тізені жазу күшін, сезімталдықты, басқа рефлекстерді және симптомдарды бағалаңыз. Рефлекс тұрақты әлсіз болса, сезімтал жолды, сегменттік синапстарды, мотонейронды, сан жүйкесін, жүйке-бұлшықет берілуін және бұлшықетті қарастырыңыз; бір белгі оларды ажыратпайды.",
      "Бұл мысалда тексеру жағдайларын біріздендіріп, рефлексті күшейткеннен кейін жауаптың өзгеруі тексеру жағдайлары мен рефлекстік тізбектің қозғыштығы ықпал етуі мүмкін екенін көрсетеді; бір қайталама тексеру әр фактордың үлесін бөлек анықтамайды. Бұл аурудың жоқтығын да, нақты диагнозды да дәлелдемейді. Ендрассик тәсілі сан жүйкесінің бүтіндігін арнайы тексермейді; жалғыз тізе рефлексі зақым орнын анықтауға жеткіліксіз."
    ]
  }
};

export function createModuleSevenClinical(language: Language): ReadingLesson {
  const copy = data[language];
  const links = [
    ["cases", "theory"],
    ["theory", "interactive"],
    ["theory", "practice"],
    ["practice", "cases"],
    ["tests", "questions"]
  ] as const;
  return {
    kind: "clinical",
    title: getSectionTitle("clinical", language),
    introduction: copy.intro,
    cards: copy.titles.map((title, i) => ({
      id: "module-7-clinical-" + (i + 1),
      title,
      paragraphs: [copy.paragraphs[i]],
      links: links[i].map(section => ({ section }))
    }))
  };
}
