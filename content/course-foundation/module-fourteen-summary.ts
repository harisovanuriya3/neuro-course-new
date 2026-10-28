import type { Language } from "../course";
import { getSectionTitle } from "../sections";
import type { ReadingLesson } from "../study";

// Module 14: authored thalamic one-minute summary, not a test or a diagnostic tool.
// Direct Library comparison: Guyton & Hall 13e PDF 584–586 (somatosensory relays);
// Ganong 23e PDF 241–243 (thalamic nuclei, inhibition and cortical inputs);
// C. L. Ghai Practical Physiology 8e PDF 323–325 (sensory pathways and examination).
// Original teaching language; no protected textbook passages or figures copied.
type Takeaway = { title: string; explanation: string };
type FiveTakeaways = readonly [Takeaway, Takeaway, Takeaway, Takeaway, Takeaway];
const takeaways: Record<Language, FiveTakeaways> = {
  "RU": [
    { "title": "Сенсорные ядра различаются по входам", "explanation": "VPL преимущественно передаёт соматосенсорные сигналы от тела, а VPM — от лица. Латеральное коленчатое тело участвует в зрительном пути, медиальное — в слуховом. Эти ядра не являются одним универсальным переключателем: важно назвать вход, выход и соответствующую корковую область." },
    { "title": "Перекрёст зависит от сенсорного пути", "explanation": "Тонкое осязание, вибрация и осознанная проприоцепция тела идут по задним канатикам до продолговатого мозга, затем после переключения перекрещиваются и поднимаются по медиальной петле к VPL. Боль и температура обычно переходят на противоположную сторону уже в спинном мозге. Уровень перекрёста влияет на ожидаемую сторону нарушений." },
    { "title": "Обоняние — важное исключение", "explanation": "Зрительные сигналы идут от сетчатки через латеральное коленчатое тело к V1, слуховые — после стволовых переключений через медиальное коленчатое тело к слуховой коре. Обонятельный путь достигает первичной обонятельной коры без обязательного первого таламического реле; однако последующие обонятельные связи могут включать таламус." },
    { "title": "Реле изменяется обратной связью и торможением", "explanation": "Большинство специфических таламокортикальных релейных нейронов используют глутамат; кортикоталамические проекции меняют обработку входа. Ретикулярное ядро таламуса преимущественно ГАМК-ергическое и тормозит другие таламические ядра. Его нельзя путать с ретикулярной формацией ствола; упрощённая схема не позволяет напрямую измерить сознание." },
    { "title": "Таламус участвует не только в ощущениях", "explanation": "VA/VL связаны с двигательными петлями базальных ганглиев, мозжечка и коры, а другие ядра — с лимбическими, ассоциативными сетями и бодрствованием. Одно нарушение двухточечной дискриминации или внимания не локализует очаг именно в таламусе: необходимы сопоставление модальностей, сторон, других симптомов и клинического контекста." }
  ],
  "EN": [
    { "title": "Sensory relay nuclei have different inputs", "explanation": "VPL predominantly relays somatosensory signals from the body, whereas VPM relays those from the face. The lateral geniculate nucleus participates in vision and the medial geniculate nucleus in hearing. These are not one universal switch: identify the incoming pathway, outgoing projection and relevant cortical area." },
    { "title": "The site of crossing depends on the pathway", "explanation": "Fine touch, vibration and conscious proprioception from the body ascend in dorsal columns to the medulla, then cross after synapsing and travel in the medial lemniscus towards VPL. Pain and temperature pathways usually cross within the spinal cord. The level of decussation helps predict which side may be affected by a lesion." },
    { "title": "Olfaction is an important exception", "explanation": "Visual information travels from retina through the lateral geniculate nucleus to V1; auditory information reaches auditory cortex through the medial geniculate after brainstem relays. Olfactory input reaches primary olfactory cortex without an obligatory initial thalamic relay, although later olfactory processing can involve thalamic connections." },
    { "title": "Feedback and inhibition shape thalamic relays", "explanation": "Most specific thalamocortical relay neurons use glutamate, while corticothalamic feedback shapes their processing of incoming signals. The thalamic reticular nucleus is predominantly GABAergic and inhibits other thalamic nuclei. It differs from the brainstem reticular formation; a simplified circuit cannot directly measure awareness or consciousness." },
    { "title": "Thalamic functions extend beyond sensation", "explanation": "VA/VL contribute to motor loops involving basal ganglia, cerebellum and cortex; other nuclei connect with limbic, associative and arousal networks. Impaired two-point discrimination or attention alone cannot localize a lesion specifically to the thalamus. Interpretation requires the sensory modalities, side, associated findings and clinical context." }
  ],
  "KZ": [
    { "title": "Сенсорлық релейлік ядролардың кірістері әртүрлі", "explanation": "VPL негізінен денеден келетін соматосенсорлық сигналдарды, ал VPM беттен келетін сигналдарды өткізеді. Латералдық тізелі дене көру жолына, медиалдық тізелі дене есту жолына қатысады. Бұлар бір ғана әмбебап ауыстырғыш емес: кіретін жолды, шығатын проекцияны және қыртыстағы нысананы бөлек атау керек." },
    { "title": "Айқасу деңгейі сенсорлық жолға байланысты", "explanation": "Денеден келетін нәзік жанасу, діріл және саналы проприоцепция сигналдары артқы бағандармен сопақша миға көтеріледі. Сол жерде ауысып, айқасқаннан кейін медиалдық ілмек арқылы VPL-ге жетеді. Ауырсыну мен температура жолдары әдетте жұлын деңгейінде айқасады. Айқасу орны зақымданған жаққа қатысты болжамды өзгертеді." },
    { "title": "Иіс сезу — маңызды ерекшелік", "explanation": "Көру сигналы торқабықтан латералдық тізелі дене арқылы V1 қыртысына өтеді; есту сигналы ми бағанындағы ауысулардан соң медиалдық тізелі дене арқылы есту қыртысына жетеді. Иіс сезу ақпараты бастапқы иіс қыртысына таламуста міндетті алғашқы ауысусыз барады, бірақ кейінгі өңдеуге таламустық байланыстар қатысуы мүмкін." },
    { "title": "Кері байланыс пен тежелу релені реттейді", "explanation": "Арнайы таламокортикалық релейлік нейрондардың көбі глутамат қолданады, ал қыртыс-таламус кері байланысы кіріс ақпараттың өңделуін өзгертеді. Таламустың ретикулярлық ядросы негізінен ГАМҚ-ергиялық және басқа таламустық ядроларды тежейді. Ол ми бағанының ретикулярлық формациясынан бөлек; қарапайым модель сананы тікелей өлшемейді." },
    { "title": "Таламус тек сезімталдықпен шектелмейді", "explanation": "VA/VL базальды ганглийлер, мишық және қыртыс қатысатын қозғалыс ілмектеріне кіреді; басқа ядролар лимбиялық, ассоциациялық және сергектік желілермен байланысады. Екі нүктені ажыратудың немесе зейіннің жеке бұзылысы зақымды дәл таламуста деп анықтамайды. Қорытынды үшін модальділік, жақ, қосымша белгілер және клиникалық жағдай бірге бағаланады." }
  ]
} as unknown as Record<Language, FiveTakeaways>;
const introductions: Record<Language, string> = {
  "RU": "Пять ключевых выводов о таламусе: сенсорные ядра, уровни перекрёста, обонятельное исключение, тормозная обратная связь и границы клинической локализации.",
  "EN": "Five essential thalamic takeaways: sensory relay nuclei, levels of decussation, the olfactory exception, feedback and inhibition, and limits of clinical localization.",
  "KZ": "Таламус туралы бес негізгі қорытынды: сенсорлық ядролар, айқасу деңгейлері, иіс сезудің ерекшелігі, кері байланыс пен тежелу және клиникалық локализацияның шектеулері."
};
export function createModuleFourteenSummary(language: Language): ReadingLesson {
  return {
    kind: "one-minute",
    title: getSectionTitle("one-minute", language),
    introduction: introductions[language],
    cards: takeaways[language].map(({ title, explanation }, index) => ({
      id: "module-14-summary-" + (index + 1),
      title: (index + 1) + ". " + title,
      paragraphs: [explanation],
      links: [{ section: "theory" }, { section: "clinical" }],
    })),
  };
}
