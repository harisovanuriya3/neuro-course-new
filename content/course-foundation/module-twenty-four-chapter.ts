import type {Language} from "../course";
// Authored supplementary teaching material. Existing module 24 sections remain unchanged.
const entries = [
  {
    "id": "sleep-architecture",
    "title": [
      "Архитектура сна и полисомнографические критерии",
      "Sleep architecture and polysomnographic criteria",
      "Ұйқы құрылымы және полисомнографиялық өлшемдер"
    ],
    "text": [
      "Сон человека организован в чередующиеся эпизоды NREM и REM. При стандартном стадировании N1 характеризуется переходом от бодрствования к сну и снижением затылочного альфа-ритма; N2 распознают, в частности, по сонным веретёнам и K-комплексам; N3 — по преобладанию высокоамплитудной медленноволновой активности в заданных критериях эпохи записи. REM-сон отличается быстрыми движениями глаз, низким подбородочным мышечным тонусом и преимущественно низкоамплитудной смешанной ЭЭГ-активностью. Архитектура меняется в течение ночи: глубокий NREM обычно представлен больше в первой её части, а эпизоды REM удлиняются ближе к утру. Эти закономерности вариабельны и зависят от возраста, предшествующего бодрствования, лекарств и заболеваний. Для объективной оценки используют одновременно ЭЭГ, электроокулограмму и подбородочную ЭМГ; только по поведению или одной ЭЭГ-кривой нельзя надёжно установить все стадии.",
      "Human sleep consists of alternating NREM and REM episodes. Under standard scoring, N1 represents the transition from wakefulness and attenuation of posterior alpha activity; N2 is identified in part by sleep spindles and K complexes; N3 requires specified amounts of high-amplitude slow-wave activity within an epoch. REM sleep features rapid eye movements, low chin muscle tone and predominantly low-amplitude mixed-frequency EEG activity. Architecture changes overnight: deep NREM is often more prominent early, while REM periods tend to lengthen toward morning. These patterns vary with age, prior wakefulness, medications and illness. Objective scoring combines EEG, electrooculography and chin electromyography; behavior or one EEG trace alone cannot reliably distinguish every stage.",
      "Адам ұйқысы NREM және REM кезеңдерінің алмасуынан тұрады. N1 сергектіктен ұйқыға өтумен және артқы альфа-ырғақтың әлсіреуімен сипатталады; N2 кезінде ұйқы ұршықтары мен K-кешендері байқалады; N3 үшін жазба дәуіріндегі жоғары амплитудалы баяу толқын белсенділігінің белгілі мөлшері қажет. REM кезінде көздің жылдам қозғалыстары, иек бұлшықет тонусының төмендеуі және аралас жиілікті ЭЭГ белсенділігі болады. Түннің алғашқы бөлігінде терең NREM жиірек, ал таңға қарай REM эпизодтары ұзарады. Бұл заңдылық жасқа, алдыңғы сергектікке, дәрілерге және ауруларға тәуелді. Кезеңдерді анықтау үшін ЭЭГ, электроокулограмма және иек ЭМГ-сы бірге қолданылады."
    ]
  },
  {
    "id": "sleep-homeostasis",
    "title": [
      "Двухпроцессная модель регуляции сна",
      "Two-process model of sleep regulation",
      "Ұйқы реттелуінің екі үдерісті моделі"
    ],
    "text": [
      "Двухпроцессная модель различает гомеостатический процесс S и циркадный процесс C. Давление сна возрастает во время бодрствования и снижается во сне; циркадный сигнал меняет вероятность засыпания и уровень бодрости в зависимости от биологического времени. Медленноволновая активность NREM является одним из физиологических индикаторов гомеостатической потребности во сне, но не тождественна ей. Аденозиновая сигнализация участвует в регуляции сонливости, однако сон не сводится к накоплению одного вещества. Кофеин блокирует аденозиновые рецепторы и временно ослабляет субъективную сонливость, не устраняя потребность в восстановлении. Поэтому после ночной смены человек может испытывать выраженную сонливость даже в привычные дневные часы, а после длительного бодрствования — заснуть несмотря на циркадное стимулирование бодрости. При разборе эксперимента отдельно фиксируют время суток, длительность предшествующего бодрствования, освещение и приём стимуляторов.",
      "The two-process model distinguishes homeostatic process S from circadian process C. Sleep pressure rises during wakefulness and dissipates during sleep; circadian output changes sleep propensity and alertness according to biological time. NREM slow-wave activity is a physiological marker of homeostatic sleep need but is not identical to the need itself. Adenosine signaling contributes to sleepiness, yet sleep cannot be reduced to accumulation of a single chemical. Caffeine antagonizes adenosine receptors and temporarily reduces perceived sleepiness without removing recovery requirements. After a night shift, marked sleepiness may occur during usual daytime hours, whereas prolonged wakefulness can promote sleep despite circadian wake drive. Experiments should record time of day, prior wake duration, light exposure and stimulant intake separately.",
      "Екі үдерісті модель гомеостатикалық S үдерісін және циркадтық C үдерісін ажыратады. Сергектік кезінде ұйқы қысымы артып, ұйқыда төмендейді; циркадтық сигнал биологиялық уақытқа сай ұйықтау ықтималдығы мен сергектікті өзгертеді. NREM-нің баяу толқынды белсенділігі ұйқы қажеттілігінің көрсеткіштерінің бірі, бірақ оған толық тең емес. Аденозин ұйқышылдықты реттеуге қатысады, алайда ұйқы бір ғана заттың жиналуына тәуелді емес. Кофеин аденозин рецепторларын бөгеп, ұйқышылдықты уақытша азайтады, бірақ қалпына келу қажеттілігін жоймайды. Тәжірибеде тәулік уақытын, алдыңғы сергектік ұзақтығын, жарықты және стимуляторларды бөлек тіркеу қажет."
    ]
  },
  {
    "id": "rem-mechanisms",
    "title": [
      "REM-сон: стволовые механизмы и мышечная атония",
      "REM sleep: brainstem mechanisms and muscle atonia",
      "REM-ұйқы: ми бағаны механизмдері және бұлшықет атониясы"
    ],
    "text": [
      "REM-сон сопровождается активностью распределённых стволовых и переднемозговых сетей. Нейроны понтинных и медуллярных областей участвуют в переключении состояния и в нисходящем торможении спинальных мотонейронов. В результате подавляется большинство произвольных скелетных движений, хотя дыхательная мускулатура и отдельные короткие подёргивания сохраняются. Утрата нормальной REM-атонии может проявляться двигательным разыгрыванием сновидений и требует клинического разграничения с другими ночными двигательными феноменами. Содержание сновидений нельзя непосредственно прочитать по ЭЭГ, а REM-сон не является единственной стадией, в которой возможны сновидения. При анализе лабораторной записи следует различать движение глаз, тонус подбородочной ЭМГ, электрическую активность коры и видеонаблюдение.",
      "REM sleep involves distributed brainstem and forebrain networks. Pontine and medullary circuits contribute to state switching and descending inhibition of spinal motor neurons. Most voluntary skeletal movement is therefore suppressed, although respiratory muscle activity and brief twitches remain. Loss of normal REM atonia can present as dream-enactment behavior and requires clinical differentiation from other nocturnal movements. Dream content cannot be read directly from an EEG, and dreams are not exclusive to REM sleep. Laboratory interpretation should distinguish eye movements, chin EMG tone, cortical activity and synchronized video observations.",
      "REM-ұйқыға ми бағаны мен алдыңғы мидың таралған желілері қатысады. Көпір мен сопақша ми тізбектері күйдің ауысуына және жұлын мотонейрондарының төмендеуші тежелуіне әсер етеді. Сондықтан ерікті қаңқа қозғалыстарының көбі басылады, бірақ тыныс бұлшықеттерінің жұмысы және қысқа тартылулар сақталады. REM-атонияның жоғалуы түсті қимылмен көрсетуге әкелуі мүмкін, оны басқа түнгі қозғалыстардан ажырату қажет. Түс мазмұнын ЭЭГ-ден тікелей оқу мүмкін емес және түстер тек REM-де ғана болмайды. Зертханада көз қозғалысын, иек ЭМГ тонусын, қыртыс белсенділігін және бейнені бөлек талдау керек."
    ]
  },
  {
    "id": "clinical-sleep",
    "title": [
      "Клинический разбор: сонливость, апноэ и нарколепсия",
      "Clinical reasoning: sleepiness, apnea and narcolepsy",
      "Клиникалық талдау: ұйқышылдық, апноэ және нарколепсия"
    ],
    "text": [
      "Пациент жалуется на дневную сонливость. Первым этапом уточняют длительность и регулярность сна, сменный график, лекарства, употребление алкоголя, храп и остановки дыхания со слов близких. При подозрении на обструктивное апноэ сна исследуют дыхательные события во время сна; индекс апноэ–гипопноэ интерпретируют с учётом симптомов, возраста и методики регистрации. При внезапных эпизодах засыпания с катаплексией рассматривают нарколепсию первого типа, связанную с дефицитом орексиновой передачи, но диагноз не устанавливают по одному симптому. Депрессия, недостаточная продолжительность сна, циркадные нарушения и побочные эффекты препаратов могут давать похожие жалобы. Учебная задача должна требовать дифференциального анализа и выбора подтверждающих исследований, а не угадывания диагноза по одному признаку.",
      "A patient presents with daytime sleepiness. Begin with sleep duration and regularity, shift schedule, medication and alcohol use, snoring and witnessed breathing pauses. Suspected obstructive sleep apnea is assessed by sleep respiratory-event recording; the apnea–hypopnea index requires interpretation alongside symptoms, age and measurement method. Sudden sleep episodes with cataplexy raise consideration of narcolepsy type 1, associated with deficient orexin signaling, but a single symptom is not diagnostic. Depression, insufficient sleep, circadian disorders and medication adverse effects may cause similar complaints. A teaching case should require differential reasoning and appropriate confirmatory investigations rather than diagnosis from one clue.",
      "Науқас күндізгі ұйқышылдыққа шағымданады. Алдымен ұйқы ұзақтығы мен тұрақтылығын, ауысымдық жұмысын, дәрілер мен алкогольді, қорыл мен тыныстың тоқтауын анықтайды. Обструктивті ұйқы апноэсына күмән болса, ұйқы кезіндегі тыныс оқиғаларын зерттейді; апноэ–гипопноэ индексін симптомдармен, жаспен және әдіспен бірге бағалайды. Катаплексиямен қатар кенет ұйықтау бірінші типті нарколепсияны қарастыруға негіз береді, бірақ бір белгі диагноз қоймайды. Депрессия, ұйқы жетіспеуі, циркадтық бұзылыс және дәрі әсерлері ұқсас шағым туғызуы мүмкін. Оқу жағдайы бір белгімен диагнозды болжауды емес, дифференциалдық талдауды талап етеді."
    ]
  }
] as const;
export function moduleTwentyFourChapter(language:Language){const i=language==="RU"?0:language==="EN"?1:2;return entries.map(e=>({id:e.id,title:e.title[i],blocks:[{type:"paragraph" as const,text:e.text[i]}]}));}
