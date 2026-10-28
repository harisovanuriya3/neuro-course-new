import type { Language } from "../course";
import type { PretestLesson } from "../study";

// Module 14, thalamus: diagnostic, ungraded, no clinical localization by one sign.
// Source checks: Guyton & Hall 13e, ch. 48, PDF 584–586;
// Ganong 23e, ch. 11, PDF 185–187, ch. 12 PDF 196;
// C. L. Ghai Practical Physiology 8e, PDF 323–325.
// Original wording; no textbook passages or figures copied.
type Choice = "a" | "b" | "c" | "d";
type Item = { prompt: string; options: [string, string, string, string]; answer: Choice; explanation: string };
type Locale = { intro: string; questions: [Item, Item, Item] };
const localized: Record<Language, Locale> = {
  "RU": {
    "intro": "Три диагностических вопроса о таламических сенсорных реле, кортикоталамической обратной связи и границах клинического вывода. Предтест не оценивается как итоговый экзамен. После выбора ответа разберите механизм; отдельный симптом или учебная схема не устанавливают локализацию поражения.",
    "questions": [
      {
        "prompt": "В учебной схеме сохранены периферические рецепторы и проводящие пути. Нужно сопоставить информацию о положении пальцев руки и о прикосновении к щеке с соответствующими таламическими реле. Какое соответствие наиболее точное?",
        "options": [
          "VPM принимает проприоцептивную информацию от руки, а VPL получает чувствительность лица по тройничному нерву.",
          "VPL преимущественно получает соматосенсорные сигналы от тела, а VPM — от лица; далее проекции идут к соматосенсорной коре.",
          "Латеральное коленчатое тело получает сигналы от кисти, а медиальное коленчатое тело — от щеки.",
          "Оба сигнала проходят только через интраламинарные ядра, не сохраняя различий по модальности и месту стимула."
        ],
        "answer": "b",
        "explanation": "Вентральное заднелатеральное ядро (VPL) — важное реле соматосенсорных путей тела; вентральное заднемедиальное ядро (VPM) участвует в передаче соматосенсорной информации лица. Соматотопия сохраняется в таламокортикальных проекциях. Это упрощённое соответствие не означает, что весь болевой опыт или вся сенсорная обработка ограничены двумя ядрами."
      },
      {
        "prompt": "Студент сравнивает основные пути зрения, слуха и обоняния до первичной корковой обработки. Какой вариант верно описывает роль коленчатых тел таламуса и важное исключение для обоняния?",
        "options": [
          "Латеральное коленчатое тело передаёт слуховые сигналы, а медиальное — зрительные; обоняние обязательно проходит через VPL.",
          "Зрительная и слуховая информация поступает в кору только через ретикулярное ядро таламуса; обоняние проходит через VPM.",
          "Медиальное коленчатое тело является основным реле зрения, а латеральное — равновесия; обоняние передаётся через мозжечок.",
          "Латеральное коленчатое тело связано со зрительным путём, медиальное — со слуховым; первичная обонятельная кора получает вход без обязательного первого таламического реле."
        ],
        "answer": "d",
        "explanation": "Основной ретиногеникулокортикальный путь проходит через латеральное коленчатое тело к зрительной коре; слуховые таламокортикальные проекции связаны с медиальным коленчатым телом. Обонятельная информация достигает первичной обонятельной коры без обязательного предварительного таламического переключения, но позднее взаимодействует с таламическими сетями. Не все зрительные сигналы проходят только через латеральное коленчатое тело: существуют и подкорковые ответвления."
      },
      {
        "prompt": "В модели таламокортикальной сети исследователь увеличивает активность ГАМК-ергических нейронов ретикулярного ядра таламуса, удерживая остальные входы постоянными. Какой вывод наиболее корректен, если поведенческие измерения ещё не проводились?",
        "options": [
          "Тормозное влияние на соответствующие таламические релейные нейроны может усилиться; точность восприятия и локализацию поражения по одной схеме предсказать нельзя.",
          "Ретикулярное ядро непосредственно возбуждает все нейроны коры глутаматом, поэтому обнаружение любого стимула обязательно улучшается.",
          "Увеличение активности ретикулярного ядра полностью выключает всю кору и доказывает потерю сознания независимо от других контуров.",
          "Любое изменение поведения доказывает изолированное поражение VPL, даже если не проверены рецепторы, проводящие пути и кора."
        ],
        "answer": "a",
        "explanation": "Нейроны ретикулярного ядра таламуса преимущественно ГАМК-ергические и оказывают тормозное влияние на таламические релейные клетки. Кортикоталамические и таламокортикальные связи образуют регулируемые петли, поэтому эффект зависит от конкретной сети и состояния. Схематическое усиление торможения не является прямым измерением восприятия, диагнозом, доказательством выключения сознания или указанием на единственный очаг."
      }
    ]
  },
  "EN": {
    "intro": "Three ungraded diagnostic questions about thalamic sensory relays, corticothalamic feedback, and limits of clinical inference. This pretest is not a final examination. Read the physiological explanation after choosing; a single sign or teaching diagram cannot establish lesion localization.",
    "questions": [
      {
        "prompt": "In a teaching diagram, peripheral receptors and ascending pathways are intact. You must match position information from the fingers and touch from the cheek to their major thalamic relays. Which mapping is best supported?",
        "options": [
          "VPM relays proprioception from the hand, whereas VPL receives facial sensation from trigeminal pathways.",
          "VPL mainly relays somatosensory signals from the body, whereas VPM relays those from the face; both project toward somatosensory cortex.",
          "The lateral geniculate nucleus receives hand sensation, while the medial geniculate nucleus receives sensation from the cheek.",
          "Both signals travel only through intralaminar nuclei without retaining information about stimulus modality or body location."
        ],
        "answer": "b",
        "explanation": "The ventral posterolateral nucleus (VPL) is an important relay for somatosensory pathways from the body; the ventral posteromedial nucleus (VPM) relays somatosensory input from the face. Somatotopic organization is retained in thalamocortical projections. This simplified map does not imply that the entirety of pain experience or sensory processing is confined to these two nuclei."
      },
      {
        "prompt": "A student compares the major visual, auditory, and olfactory routes before primary cortical processing. Which statement correctly identifies the geniculate relays and the important exception for olfaction?",
        "options": [
          "The lateral geniculate nucleus relays hearing and the medial geniculate nucleus relays vision; smell must first pass through VPL.",
          "Visual and auditory information reaches cortex only through the thalamic reticular nucleus, while smell travels through VPM.",
          "The medial geniculate nucleus is the main relay for vision and the lateral geniculate nucleus for balance; smell is routed through the cerebellum.",
          "The lateral geniculate nucleus participates in the visual pathway and the medial geniculate nucleus in the auditory pathway; primary olfactory cortex receives input without an obligatory initial thalamic relay."
        ],
        "answer": "d",
        "explanation": "The main retinogeniculate visual pathway reaches visual cortex via the lateral geniculate nucleus; auditory thalamocortical transmission involves the medial geniculate nucleus. Olfactory information can reach primary olfactory cortex without an obligatory preceding thalamic relay, although later olfactory processing interacts with thalamic networks. Not every retinal projection passes through the lateral geniculate nucleus: other subcortical routes exist."
      },
      {
        "prompt": "In a thalamocortical teaching model, the activity of GABAergic neurons in the thalamic reticular nucleus is increased while other inputs are held constant. What conclusion is justified before any behavioral measurements are made?",
        "options": [
          "Inhibitory influence on the corresponding thalamic relay neurons may increase; perception accuracy and lesion localization cannot be inferred from the diagram alone.",
          "The reticular nucleus directly excites every cortical neuron using glutamate, so detection of every stimulus necessarily improves.",
          "Increased reticular activity completely silences the cortex and proves loss of consciousness regardless of other networks.",
          "Any behavioral change proves an isolated VPL lesion even when receptors, ascending pathways, and cortex have not been assessed."
        ],
        "answer": "a",
        "explanation": "Thalamic reticular neurons are predominantly GABAergic and inhibit thalamic relay neurons. Corticothalamic and thalamocortical projections form regulated loops, so effects depend on the network and state. A schematic increase in inhibition is not a direct measurement of perception, a diagnosis, evidence of complete loss of consciousness, or proof of a single lesion site."
      }
    ]
  },
  "KZ": {
    "intro": "Таламустың сенсорлық релелік ядролары, қыртыс-таламус кері байланысы және клиникалық қорытынды шектері туралы бағаланбайтын үш диагностикалық сұрақ. Бұл қорытынды емтихан емес. Жауапты таңдағаннан кейін физиологиялық түсіндірмені оқыңыз: бір белгі немесе оқу сызбасы зақым ошағын дәл анықтамайды.",
    "questions": [
      {
        "prompt": "Оқу сызбасында шеткі рецепторлар мен жоғарылаушы жолдар сақталған. Қол саусақтарының қалпы туралы ақпаратты және ұрт терісіне жанасуды таламустың негізгі релелік ядроларымен сәйкестендіру қажет. Қай сәйкестік дұрыс?",
        "options": [
          "VPM қолдың проприоцепциясын, ал VPL үшкіл жүйке арқылы беттің сезімталдығын қабылдайды.",
          "VPL негізінен денеден келетін соматосенсорлық сигналдарды, ал VPM беттен келетін сигналдарды өткізеді; олар соматосенсорлық қыртысқа проекцияланады.",
          "Латералды тізелі дене қолдың сезімталдығын, ал медиалды тізелі дене ұрт терісінің сезімталдығын қабылдайды.",
          "Екі сигнал да модальдылық пен дене аймағының айырмашылығын сақтамай, тек интраламинарлық ядролар арқылы өтеді."
        ],
        "answer": "b",
        "explanation": "Таламустың вентралды артқы латералды ядросы (VPL) денеден келетін соматосенсорлық жолдар үшін маңызды релелік буын; вентралды артқы медиалды ядросы (VPM) беттен келетін ақпаратты өткізеді. Таламус-қыртыс проекцияларында соматотопиялық ұйымдасу сақталады. Бұл жеңілдетілген сәйкестік ауырсынудың бүкіл субъективті тәжірибесі немесе сенсорлық өңдеу тек осы екі ядромен шектеледі дегенді білдірмейді."
      },
      {
        "prompt": "Студент көру, есту және иіс сезу жолдарының бастапқы қыртыстық өңдеуге дейінгі негізгі бағыттарын салыстырады. Тізелі денелердің қызметі мен иіс сезудің маңызды ерекшелігін қай жауап дұрыс сипаттайды?",
        "options": [
          "Латералды тізелі дене есту сигналдарын, медиалды тізелі дене көру сигналдарын өткізеді; иіс сезу міндетті түрде VPL арқылы өтеді.",
          "Көру және есту ақпараты қыртысқа тек таламустың ретикулярлық ядросы арқылы жетеді; иіс сезу VPM арқылы өтеді.",
          "Медиалды тізелі дене көрудің, латералды тізелі дене тепе-теңдіктің негізгі релесі; иіс сезу мишық арқылы өтеді.",
          "Латералды тізелі дене көру жолымен, медиалды тізелі дене есту жолымен байланысты; алғашқы иіс сезу қыртысы ақпаратты міндетті бастапқы таламустық релесіз қабылдай алады."
        ],
        "answer": "d",
        "explanation": "Торқабықтан көру қыртысына баратын негізгі жол латералды тізелі дене арқылы өтеді; естудің таламус-қыртыс проекцияларына медиалды тізелі дене қатысады. Иіс сезу ақпараты алғашқы иіс сезу қыртысына міндетті алдын ала таламустық релесіз жетеді, бірақ кейін таламустық желілермен байланысады. Торқабықтан шығатын барлық проекция тек латералды тізелі денемен шектелмейді: басқа қыртысасты тармақтар да бар."
      },
      {
        "prompt": "Таламус-қыртыс оқу моделінде басқа кірістер тұрақты болғанда таламустың ретикулярлық ядросындағы ГАМҚ-ергиялық нейрондардың белсенділігі күшейтілді. Мінез-құлық көрсеткіштері өлшенбеген кезде қандай қорытынды негізді?",
        "options": [
          "Сәйкес таламустық релелік нейрондарға тежеуші әсер күшеюі мүмкін; тек сызба бойынша қабылдау дәлдігін немесе зақым ошағын анықтауға болмайды.",
          "Ретикулярлық ядро глутамат арқылы қыртыстың барлық нейрондарын тікелей қоздырады, сондықтан кез келген стимулды анықтау міндетті түрде жақсарады.",
          "Ретикулярлық ядро белсенділігінің артуы басқа желілерге тәуелсіз бүкіл қыртысты толық өшіріп, сананың жоғалуын дәлелдейді.",
          "Рецепторлар, жоғарылаушы жолдар мен қыртыс тексерілмесе де, мінез-құлықтағы кез келген өзгеріс VPL-дің жеке зақымын дәлелдейді."
        ],
        "answer": "a",
        "explanation": "Таламустың ретикулярлық ядросының нейрондары негізінен ГАМҚ-ергиялық болып, таламустық релелік нейрондарды тежейді. Қыртыс-таламус және таламус-қыртыс байланыстары реттелетін тұйық тізбектер түзеді, сондықтан әсері нақты желі мен күйге тәуелді. Сызбадағы тежелудің күшеюі қабылдауды тікелей өлшеу де, диагноз да, сананың толық жоғалуын немесе бір ғана зақым ошағын дәлелдеу де емес."
      }
    ]
  }
};

export function createModuleFourteenPretest(language: Language, moduleTitle: string, title: string): PretestLesson {
  const data = localized[language];
  return {
    kind: "pretest",
    title,
    introduction: data.intro,
    questions: data.questions.map((item, index) => ({
      id: ["module-14-pretest-vpl-vpm", "module-14-pretest-geniculate", "module-14-pretest-reticular"][index],
      topic: moduleTitle,
      prompt: item.prompt,
      options: item.options.map((text, i) => ({ id: (["a", "b", "c", "d"] as const)[i], text })),
      correctAnswer: item.answer,
      explanation: item.explanation,
      target: { section: "theory" as const }
    }))
  };
}
