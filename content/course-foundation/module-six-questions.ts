import type { Language } from "../course";
import { getSectionTitle } from "../sections";
import type { QuestionsLesson } from "../study";

// Module 6: independent mechanism questions (not generic study instructions).
// Sources: Ganong 23e, ch. 6 (Library PDF pp. 132–134);
// Guyton & Hall 13e, ch. 55 (PDF pp. 667–668).
// Ghai 8e, expt. 4-9 (PDF pp. 353–354) demonstrates an isolated
// nerve-muscle preparation, not a direct measure of CNS inhibition.
type Entry = { prompt: string; explanation: string; section: "theory" | "clinical" | "practice" | "cases" };
const questions: Record<Language, readonly [Entry, Entry, Entry, Entry, Entry]> = {
  RU: [
    { prompt: "В одном нейроне возникают два ВПСП: второй начинается до затухания первого. Почему суммарная деполяризация может быть больше, чем при одиночном входе, и гарантирует ли она потенциал действия?",
      explanation: "Это временная суммация градуированных потенциалов. Результат зависит от интервала, мембранной постоянной времени, расположения синапса и проводимости. Разряд возможен лишь при достаточной деполяризации области инициации ПД; суммация сама по себе его не гарантирует.", section: "theory" },
    { prompt: "У нейрона Vm = −65 мВ, а потенциал реверсии Cl⁻ примерно −65 мВ. Открываются Cl⁻-проводящие каналы одновременно с возбуждающим входом. Почему ВПСП может уменьшиться без заметной гиперполяризации?",
      explanation: "При Vm около ECl ток через эти каналы при исходном потенциале мал, поэтому Vm может почти не измениться. Но общая проводимость растёт, входное сопротивление падает и возбуждающий ток вызывает меньшую деполяризацию: шунтирующее торможение. Значения −65 мВ — условие задачи, а не универсальная норма.", section: "theory" },
    { prompt: "После воздействия на аксонное окончание амплитуда вызванного ВПСП уменьшилась. Можно ли только по этой амплитуде доказать пресинаптическое торможение? Что дополнительно измерить?",
      explanation: "Нет. Уменьшение может отражать снижение выделения медиатора, изменение постсинаптических рецепторов, входного сопротивления или электротонического распространения. Сопоставьте параметры высвобождения медиатора и пресинаптического Ca²⁺-сигнала с постсинаптической проводимостью и местом регистрации; один ВПСП не локализует механизм.", section: "practice" },
    { prompt: "В упрощённой схеме спинального рефлекса растяжение мышцы вызывает её сокращение и снижение активности антагониста. Через какие синаптические звенья проходят два эффекта и почему это не один и тот же прямой путь?",
      explanation: "Ia-афференты мышечного веретена возбуждают α-мотонейроны растянутой мышцы; торможение α-мотонейронов антагониста опосредовано тормозным интернейроном. Поэтому реципрокное торможение включает дополнительное синаптическое переключение, а не прямой тормозный контакт Ia-афферента с антагонистом.", section: "cases" },
    { prompt: "Через несколько месяцев после инсульта у пациента оживлён коленный рефлекс и повышено сопротивление быстрому пассивному растяжению. Можно ли по этому заключить, что ГАМК полностью отсутствует в спинном мозге?",
      explanation: "Нет. Признаки согласуются с изменением возбудимости рефлекторных цепей и нисходящей регуляции при синдроме верхнего мотонейрона, но не определяют отдельный медиатор или синапс. Сравните ответы на медленное и быстрое растяжение, рефлексы, силу и объём пассивных движений; механическая контрактура также влияет на сопротивление.", section: "clinical" }
  ],
  EN: [
    { prompt: "Two EPSPs arise in a neuron, with the second beginning before the first has decayed. Why can the combined depolarization exceed either response alone, and does this guarantee an action potential?",
      explanation: "This is temporal summation of graded potentials. The outcome depends on interval, membrane time constant, synapse location and conductance. Firing requires sufficient depolarization at the spike-initiation region; summation alone does not guarantee a spike.", section: "theory" },
    { prompt: "A neuron has Vm = −65 mV and a Cl⁻ reversal potential near −65 mV. Cl⁻-conducting channels open during an excitatory input. Why might the EPSP shrink without appreciable hyperpolarization?",
      explanation: "When Vm is close to ECl, baseline current through the channels is small, so Vm may change little. Yet total conductance rises, input resistance falls, and the excitatory current produces a smaller depolarization: shunting inhibition. The −65 mV values are illustrative conditions, not universal normal values.", section: "theory" },
    { prompt: "A manipulation at an axon terminal reduces the evoked EPSP amplitude. Does this amplitude alone establish presynaptic inhibition? What additional measurements would distinguish mechanisms?",
      explanation: "No. The decrease might reflect reduced transmitter release, altered postsynaptic receptors, input resistance or electrotonic spread. Compare transmitter-release measures and presynaptic Ca²⁺ signals with postsynaptic conductance and recording location; a single EPSP does not localize the mechanism.", section: "practice" },
    { prompt: "In a simplified spinal stretch-reflex circuit, stretching a muscle elicits its contraction and reduces antagonist activity. Which synaptic pathways produce these two effects, and why are they not the same direct pathway?",
      explanation: "Muscle-spindle Ia afferents excite α-motor neurons of the stretched muscle; inhibition of antagonist α-motor neurons is mediated by an inhibitory interneuron. Reciprocal inhibition therefore involves an additional synaptic relay rather than direct inhibitory Ia contact onto the antagonist.", section: "cases" },
    { prompt: "Months after a stroke, a patient has a brisk knee jerk and increased resistance to rapid passive stretch. Do these findings prove that GABA is entirely absent from the spinal cord?",
      explanation: "No. They are compatible with altered reflex-circuit excitability and descending modulation in an upper motor neuron syndrome, but do not identify a single transmitter or synapse. Compare responses to slow and fast stretch, reflexes, strength and passive range of motion; mechanical contracture can also increase resistance.", section: "clinical" }
  ],
  KZ: [
    { prompt: "Нейронда екі қоздырушы постсинапстық потенциал (ҚПСП) пайда болады: екіншісі біріншісі бәсеңдемей тұрып басталады. Неліктен жиынтық деполяризация әрқайсысынан үлкен болуы мүмкін және бұл әрекет потенциалына кепіл ме?",
      explanation: "Бұл — шамасы өзгеретін потенциалдардың уақыттық суммациясы. Нәтиже аралыққа, мембрананың уақыт тұрақтысына, синапс орнына және өткізгіштікке тәуелді. Әрекет потенциалы басталатын аймақта табалдырыққа жету қажет; суммацияның өзі разрядқа кепіл болмайды.", section: "theory" },
    { prompt: "Нейронда Vm = −65 мВ, ал Cl⁻ реверсия потенциалы шамамен −65 мВ. Қоздырушы кіріспен қатар Cl⁻ өткізетін арналар ашылады. Неліктен айқын гиперполяризациясыз ҚПСП азаюы мүмкін?",
      explanation: "Vm мен Cl⁻ реверсия потенциалы жақын болса, бастапқы Cl⁻ тогы аз, сондықтан Vm шамалы өзгереді. Алайда жалпы өткізгіштік артып, кіріс кедергісі төмендейді де, қоздырушы токтың деполяризациялық әсері әлсірейді: бұл шунттаушы тежелу. −65 мВ — есептің шартты мәні, әмбебап норма емес.", section: "theory" },
    { prompt: "Аксон ұшына әсер еткеннен кейін туындаған ҚПСП амплитудасы азайды. Осы амплитуда ғана пресинапстық тежелуді дәлелдей ме? Қандай қосымша өлшеулер керек?",
      explanation: "Жоқ. Өзгеріс медиатор бөлінуінің азаюынан, постсинапстық рецепторлардан, кіріс кедергісінен немесе электротондық таралудан болуы мүмкін. Медиатор бөлінуі мен пресинапстық Ca²⁺ сигналын постсинапстық өткізгіштік және тіркеу орнымен салыстыру керек; бір ҚПСП механизмнің орнын анықтамайды.", section: "practice" },
    { prompt: "Жұлынның созылу рефлексінің қарапайым үлгісінде бұлшықет созылғанда жиырылады, ал антагонистің белсенділігі төмендейді. Екі әсер қандай синапстық тізбектер арқылы жүреді және неге олар бірдей тікелей жол емес?",
      explanation: "Бұлшықет ұршығының Ia-афференттері созылған бұлшықеттің α-мотонейрондарын қоздырады; антагонистің α-мотонейрондары тежегіш интернейрон арқылы тежеледі. Демек, реципрокты тежелуде қосымша синапстық ауысу бар, Ia-афферент антагонисті тікелей тежемейді.", section: "cases" },
    { prompt: "Инсульттен бірнеше ай өткен соң тізе рефлексі күшейіп, бұлшықетті жылдам пассивті созғанда қарсылық артты. Бұл жұлында ГАМҚ мүлде жоқ екенін дәлелдей ме?",
      explanation: "Жоқ. Белгілер жоғарғы мотонейрон синдромындағы рефлекстік тізбектер қозғыштығы мен төмендеуші реттелудің өзгеруіне сәйкес келеді, бірақ бір медиаторды не синапсты анықтамайды. Баяу және жылдам созылуды, рефлекстерді, күшті және пассивті қозғалыс көлемін салыстырыңыз; механикалық контрактура да қарсылықты арттыруы мүмкін.", section: "clinical" }
  ]
};

export function createModuleSixQuestions(language: Language): QuestionsLesson {
  return {
    kind: "questions",
    title: getSectionTitle("questions", language),
    introduction: language === "RU" ? "Пять вопросов с объяснениями: механизм, прогноз и границы вывода."
      : language === "EN" ? "Five mechanism questions with reasoning and limits of inference."
      : "Механизм, болжам және қорытынды шегі бойынша түсіндірмесі бар бес сұрақ.",
    questions: questions[language].map(({prompt, explanation, section}, index) => ({
      id: "module-6-question-" + (index + 1),
      prompt, explanation, target: {section}
    }))
  };
}
