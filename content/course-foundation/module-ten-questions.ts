import type { Language } from "../course";
import { getSectionTitle } from "../sections";
import type { QuestionsLesson } from "../study";

// Module 10: original mechanism-based reflection questions for brainstem physiology.
// Cross-checked with Guyton & Hall 13e PDF 217–218, 718–719;
// Ganong 23e PDF 249–250, 579; C. L. Ghai 8e PDF 301–303.
// These vignettes teach mechanisms, not stand-alone clinical diagnosis.
// Corneal testing must be performed only by a trained clinician.
type Question = {prompt:string; explanation:string; section:"theory"|"clinical"|"cases"|"interactive"};
const authored: Record<Language, Question[]> = {
  "RU": [
    {
      "prompt": "При освещении правого глаза оба зрачка сужаются, а при освещении левого ни один не реагирует. Какое звено вероятнее нарушено и почему нельзя сразу утверждать, что повреждён левый III нерв?",
      "explanation": "Если правый световой стимул вызывает прямое и содружественное сужение, эфферентные пути обоих зрачков функционально сохранны для этой пробы. Отсутствие обеих реакций при стимуляции левого глаза указывает прежде всего на дефект левого афферентного звена (сетчатка или II нерв). Возможны также технические ошибки освещения и заболевания сетчатки; окончательная локализация требует дополнительного обследования.",
      "section": "clinical"
    },
    {
      "prompt": "В модели давление в сонной пазухе внезапно возрастает, но сократимость миокарда не меняется непосредственно. Проследите путь до изменения частоты сердечных сокращений и сосудистого тонуса.",
      "explanation": "Растяжение каротидных барорецепторов повышает частоту импульсов по нерву Геринга и IX нерву к ядру одиночного пути (NTS). NTS активирует CVLM, которая тормозит RVLM через ГАМК-ергические связи, снижая симпатическую активность; одновременно усиливается кардиовагусный выход. Обычно ЧСС и сосудистое сопротивление уменьшаются, противодействуя повышению давления. Это кратковременная обратная связь, а не доказательство единственного места поражения.",
      "section": "interactive"
    },
    {
      "prompt": "После стволового поражения пациент не реагирует на обращение, хотя ранний слуховой вызванный потенциал регистрируется. Можно ли назвать пациента сознательным на основании этого сигнала?",
      "explanation": "Нет. Ранний слуховой вызванный ответ свидетельствует лишь о проведении части акустического сигнала через соответствующие структуры и зависит от качества регистрации. Бодрствование поддерживается распределёнными стволовыми, таламическими, гипоталамическими и корковыми сетями; сознание нельзя оценить по одному раннему компоненту. Необходимы клинический осмотр, оценка лекарственных и метаболических факторов и дополнительные исследования.",
      "section": "theory"
    },
    {
      "prompt": "У пациента справа нарушены болевая чувствительность лица, глотание и координация, а слева снижена болевая чувствительность тела. Почему это сочетание указывает на латеральные отделы продолговатого мозга, но не доказывает единственный сосудистый механизм?",
      "explanation": "Сочетание ипсилатеральных признаков со стороны лица и черепных нервов с контралатеральным снижением боли и температуры тела совместимо с поражением латеральной продолговатой области: спинномозгового ядра/пути V, спиноталамического тракта, нижней мозжечковой ножки и двойного ядра. Такой паттерн известен при латеральном медуллярном синдроме, но сосудистая территория вариабельна, а точную причину устанавливают по клинике и нейровизуализации.",
      "section": "cases"
    },
    {
      "prompt": "При касании правой роговицы отсутствует моргание обоих глаз, а при стимуляции левой оба глаза моргают. Какие звенья следует сравнить и почему нельзя самостоятельно проводить болезненную пробу?",
      "explanation": "При сохранном двустороннем моргании на стимуляцию левой роговицы эфферентные VII нервы и круговые мышцы глаз способны работать. Отсутствие обоих ответов при правой стимуляции согласуется с дефектом правого афферентного V1-звена или местным поражением роговицы. Рефлекс полисинаптический; один результат не устанавливает окончательный диагноз. Контакт с роговицей может травмировать её, поэтому такую пробу выполняет только обученный специалист.",
      "section": "clinical"
    }
  ],
  "EN": [
    {
      "prompt": "Light in the right eye constricts both pupils, but light in the left eye constricts neither. Which link is most likely impaired, and why does this not by itself prove a left third-nerve lesion?",
      "explanation": "The right-eye stimulus evokes both direct and consensual constriction, indicating that both pupillary efferent pathways can operate in this test. Failure of both responses when the left eye is stimulated points first to a left afferent problem in the retina or optic nerve (II), rather than a left III efferent deficit. Illumination errors and retinal disorders remain possible; further examination is required before definitive localization.",
      "section": "clinical"
    },
    {
      "prompt": "In a model, carotid sinus pressure suddenly rises without a direct change in myocardial contractility. Trace the pathway to heart rate and vascular tone.",
      "explanation": "Greater carotid baroreceptor stretch increases firing through Hering's nerve and cranial nerve IX to the nucleus tractus solitarius (NTS). NTS excites CVLM, which inhibits RVLM through GABAergic signaling, reducing sympathetic outflow; cardiac vagal drive also rises. Heart rate and vascular resistance generally decrease, opposing the initial pressure rise. This is rapid negative feedback, not proof of one unique lesion site.",
      "section": "interactive"
    },
    {
      "prompt": "A patient with a brainstem lesion does not respond to speech, although an early auditory evoked potential can be recorded. Does that signal establish intact consciousness?",
      "explanation": "No. An early auditory evoked response supports transmission through some auditory pathways and depends on recording quality; it cannot establish consciousness. Arousal depends on distributed brainstem, thalamic, hypothalamic and cortical networks. Clinical examination, medication and metabolic assessment, and other investigations are needed. A preserved early sensory response should never be equated with preserved awareness.",
      "section": "theory"
    },
    {
      "prompt": "A patient has right-sided facial pain-temperature loss, dysphagia and ataxia, together with left-sided body pain-temperature loss. Why does this suggest lateral medullary involvement without proving a unique vascular cause?",
      "explanation": "Ipsilateral cranial-nerve and facial findings together with contralateral body pain-temperature loss are compatible with lateral medullary involvement of the spinal trigeminal system, spinothalamic tract, inferior cerebellar connections and nucleus ambiguus. This is a characteristic lateral medullary pattern, but arterial territories vary and the cause cannot be determined from the symptom pattern alone. Clinical and imaging evidence are necessary.",
      "section": "cases"
    },
    {
      "prompt": "Touching the right cornea produces no blink on either side, whereas left corneal stimulation produces bilateral blinking. Which reflex links should be compared, and why is unsupervised testing unsafe?",
      "explanation": "Bilateral blinking with left corneal stimulation shows that both facial-nerve (VII) efferent limbs and orbicularis oculi muscles can respond. The absent bilateral response to right stimulation suggests a right ophthalmic trigeminal (V1) afferent problem or local corneal disease. The circuit is polysynaptic and this pattern is not a definitive diagnosis. Corneal contact can cause injury; only trained clinicians should perform the test.",
      "section": "clinical"
    }
  ],
  "KZ": [
    {
      "prompt": "Оң көзге жарық түсіргенде екі қарашық та тарылады, ал сол көзді жарықтандырғанда екеуі де жауап бермейді. Қай буынның бұзылысы ықтимал және бұл неліктен сол III жүйкенің зақымын бірден дәлелдемейді?",
      "explanation": "Оң көзге түскен жарық тікелей және қосалқы жауапты туғызса, екі қарашықтың эфференттік жолдары осы сынақта жұмыс істей алады. Сол көзді жарықтандырғанда екі жауаптың да болмауы ең алдымен сол жақтағы афференттік буынның — торқабықтың немесе II көру жүйкесінің — бұзылысын көрсетеді. Жарықтандыру қатесі мен торқабық аурулары да ықтимал; нақты локализация үшін қосымша тексеру қажет.",
      "section": "clinical"
    },
    {
      "prompt": "Үлгіде ұйқы артериясы синусының қысымы кенет жоғарылады, бірақ миокард жиырылғыштығына тікелей әсер болған жоқ. Жүрек соғу жиілігі мен тамыр тонусының өзгеру жолын түсіндіріңіз.",
      "explanation": "Каротидтік барорецепторлардың созылуы Геринг жүйкесі мен IX жүйке арқылы жеке жол ядросына (NTS) келетін импульстерді жиілетеді. NTS CVLM-ді белсендіреді, ал ол ГАМҚ-ергиялық байланыстар арқылы RVLM-ді тежеп, симпатикалық шығуды азайтады; жүрекке вагустық ықпал күшейеді. Әдетте жүрек соғу жиілігі мен тамырлық кедергі төмендеп, қысымның өсуіне қарсы әсер етеді. Бұл қысқа мерзімді кері байланыс, бір ошақты дәлелдеу емес.",
      "section": "interactive"
    },
    {
      "prompt": "Ми бағаны зақымданған науқас сөзге жауап бермейді, бірақ ерте есту шақырылған потенциалы тіркеледі. Осы сигнал сананың сақталғанын дәлелдей ме?",
      "explanation": "Жоқ. Ерте есту шақырылған жауабы есту жолдарының белгілі бір бөліктерінде сигнал өткізілетінін ғана көрсетеді және жазба сапасына тәуелді. Сергектік ми бағанының, таламустың, гипоталамустың және қыртыстың таралған желілеріне байланысты. Бір сенсорлық компонент сананың сақталғанын дәлелдемейді. Клиникалық тексеру, дәрілер мен метаболизмдік факторларды бағалау және қосымша зерттеулер қажет.",
      "section": "theory"
    },
    {
      "prompt": "Науқаста оң жақ беттегі ауырсыну мен температура сезімі төмендеген, жұтыну бұзылған және атаксия бар, ал дененің сол жағында ауырсыну сезімі азайған. Бұл неліктен сопақша мидың латералдық аймағын меңзейді, бірақ нақты бір тамырды дәлелдемейді?",
      "explanation": "Бет пен бассүйек жүйкелеріне тән ошақ жағындағы белгілердің денедегі қарсы жақ ауырсыну-температура бұзылысымен қатар жүруі сопақша мидың латералдық аймағындағы V жүйкенің жұлындық жүйесін, спиноталамустық жолды, мишықпен байланыстарды және қос ядроны қамтитын зақыммен үйлеседі. Бұл латералдық медуллярлық синдромға тән, бірақ қан тамырларының таралуы әртүрлі. Себепті клиникалық және бейнелеу зерттеулерімен анықтайды.",
      "section": "cases"
    },
    {
      "prompt": "Оң қасаң қабықты тітіркендіргенде екі көз де жыпылықтамайды, ал сол қасаң қабықты тітіркендіргенде екеуі де жыпылықтайды. Қай рефлекс буындарын салыстыру керек және сынақты өз бетімен жасау неліктен қауіпті?",
      "explanation": "Сол қасаң қабыққа жауап ретінде екіжақты жыпылықтау VII бет жүйкелерінің эфференттік буындары мен көздің айналма бұлшықеттері жұмыс істей алатынын көрсетеді. Оң жақты тітіркендіргенде екі жауаптың болмауы оң V1 афферентінің бұзылысымен немесе қасаң қабықтың жергілікті ауруымен үйлеседі. Рефлекс полисинапстық, бір белгі нақты диагноз емес. Қасаң қабыққа тию жарақаттауы мүмкін, сондықтан сынақты тек арнайы дайындалған маман жүргізеді.",
      "section": "clinical"
    }
  ]
};
export function createModuleTenQuestions(language:Language): QuestionsLesson {
  return {
    kind:"questions",
    title:getSectionTitle("questions",language),
    introduction:language==="RU"
      ?"Пять вопросов о рефлексах и сетях ствола мозга. Сначала объясните механизм, затем сравните ответ с разбором и обозначьте границы клинического вывода."
      :language==="EN"
        ?"Five brainstem physiology questions. Explain each mechanism before revealing the feedback, then state what the observation cannot establish clinically."
        :"Ми бағанының рефлекстері мен желілері туралы бес сұрақ. Алдымен тетікті түсіндіріп, кейін талдаумен салыстырыңыз және клиникалық қорытындының шегін көрсетіңіз.",
    questions:authored[language].map(({prompt,explanation,section},index)=>({
      id:"module-10-question-"+(index+1),prompt,explanation,target:{section}
    }))
  };
}
