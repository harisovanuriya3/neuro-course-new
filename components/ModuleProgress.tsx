"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { modules, type Language } from "../content/course";
import { readCourseProgress, recordVisit, type CourseProgressData } from "../lib/courseProgress";
import styles from "./VirtualPatient.module.css";

type Level="review"|"forming"|"mastered"|"none";
const C={
 RU:{title:"Прогресс: что уже получается",scope:"Обзор 25 модулей",visited:"Посещено модулей",criteria:"Что студент уже умеет",module:"Модуль",sections:"Открыто разделов",start:"Открыть модуль",saved:"Данные сохраняются локально в этом браузере. Входной блиц — диагностический и не влияет на уровень освоения.",none:"Нет данных",review:"Требует повторения",forming:"Формируется",mastered:"Освоено",concept:"Понимает основные понятия",mechanism:"Может объяснить, как это работает",interpret:"Может применить знание к задаче",transfer:"Может применить знание в новой ситуации",justification:"Может объяснить, почему сделал такой вывод",clinical:"Понимает клиническую ситуацию и выбирает решение",correction:"Замечает и исправляет свои ошибки",assessment:"Результат обучения",exam:"Экзаменационный результат учитывается отдельно.",teacher:"Что студент уже умеет",next:"Рекомендация",strong:"Студент готов переходить к следующему модулю.",mid:"Закрепить критерии со статусом «Формируется» и повторить слабые задания.",low:"Сначала повторить критерии со статусом «Требует повторения», затем снова выполнить тесты и кейсы.",evidence:"Уровень по проверенным ответам: тесты, задания с автоматической проверкой в кейсах и виртуальный пациент. Выполнение практики, ответы на открытые вопросы и схемы показываются отдельно и не подтверждают правильность знаний.",completed:"выполнено",graded:"верно",scopeNote:"Предварительный показатель: суммарное число верных ответов / суммарное число проверенных заданий; это не оценка преподавателя и не доказательство владения всеми темами.",work:"Что уже выполнено",practice:"Практика",questions:"Контрольные вопросы",patient:"Виртуальный пациент",tests:"Тесты",cases:"Кейсы",sketch:"Нарисованная схема",builder:"Собранный путь"},
 EN:{title:"Progress: what is going well",scope:"25-module overview",visited:"Modules visited",criteria:"What the student can do",module:"Module",sections:"Sections opened",start:"Open module",saved:"Data is stored locally in this browser. The entry quiz is diagnostic and does not affect mastery.",none:"No data",review:"Needs review",forming:"Developing",mastered:"Mastered",concept:"Understands the key concepts",mechanism:"Can explain how it works",interpret:"Can use the knowledge in a task",transfer:"Can use the knowledge in a new situation",justification:"Can explain why the conclusion was made",clinical:"Understands a clinical situation and chooses a response",correction:"Notices and corrects mistakes",assessment:"Learning result",exam:"Exam results are reported separately.",teacher:"What the student can do",next:"Recommendation",strong:"The student is ready to move to the next module.",mid:"Consolidate criteria marked Developing and retry weak tasks.",low:"Review criteria marked Needs review, then repeat tests and cases.",evidence:"The score uses checked answers from tests, automatically checked case items and the virtual patient. Practice completion, open responses and diagrams are shown separately and do not establish correctness.",completed:"completed",graded:"correct",scopeNote:"Provisional indicator: total correct answers / total checked items. This is not a teacher assessment or proof of mastery of every topic.",work:"Completed learning work",practice:"Practice",questions:"Review questions",patient:"Virtual patient",tests:"Tests",cases:"Cases",sketch:"Student diagram",builder:"Built pathway"},
 KZ:{title:"Прогресс: не меңгерілді",scope:"25 модуль бойынша шолу",visited:"Қаралған модульдер",criteria:"Студент нені істей алады",module:"Модуль",sections:"Ашылған бөлімдер",start:"Модульді ашу",saved:"Деректер осы браузерде сақталады. Кіріспе блиц қорытынды бағалауға кірмейді.",none:"Әзірге дерек жоқ",review:"Қайталау қажет",forming:"Қалыптасуда",mastered:"Меңгерілді",concept:"Негізгі ұғымдарды түсінеді",mechanism:"Қалай жұмыс істейтінін түсіндіре алады",interpret:"Білімді тапсырмада қолдана алады",transfer:"Білімді жаңа жағдайда қолдана алады",justification:"Неліктен осындай қорытынды жасағанын түсіндіре алады",clinical:"Клиникалық жағдайды түсініп, шешім таңдай алады",correction:"Өз қатесін байқап, түзете алады",assessment:"Оқу нәтижесі",exam:"Емтихан нәтижесі бөлек көрсетіледі.",teacher:"Студент не істей алады",next:"Келесі қадам",strong:"Келесі модульге өтуге болады.",mid:"«Қалыптасуда» тұрған дағдыларды бекітіп, әлсіз тапсырмаларды қайталаңыз.",low:"Алдымен «Қайталау қажет» дағдыларды қайталап, содан кейін тесттер мен кейстерді қайта орындаңыз.",evidence:"Көрсеткіш тесттердегі, автоматты тексерілетін кейс тапсырмаларындағы және виртуалды пациенттегі дұрыс жауаптарға сүйенеді. Практиканы орындау, ашық жауаптар мен сызбалар бөлек көрсетіледі және білімнің дұрыстығын растамайды.",completed:"орындалды",graded:"дұрыс",scopeNote:"Алдын ала көрсеткіш: барлық дұрыс жауаптар саны / барлық тексерілген тапсырмалар саны. Бұл оқытушы бағасы да, барлық тақырыпты меңгерудің дәлелі де емес.",work:"Орындалған оқу жұмысы",practice:"Практика",questions:"Өзін-өзі тексеру сұрақтары",patient:"Виртуалды пациент",tests:"Тесттер",cases:"Жағдайлар",sketch:"Салынған сызба",builder:"Құрастырылған жол"}
} as const;
// Module 6: prompts for reflection, NOT evidence of automatically assessed mastery.
// Physiological anchors: Ganong 23e ch. 6, PDF pp. 132–134;
// Guyton & Hall 13e ch. 46, PDF pp. 559–560.
// Ghai 8e expt. 4-9 (PDF pp. 353–354) concerns a peripheral preparation,
// not central EPSP/IPSP summation.
const moduleSixReview={
 RU:{title:"Самопроверка: возбуждение и торможение",note:"Объясните ответы своими словами и сравните с теорией. Эти вопросы не оцениваются автоматически и не повышают показатель освоения.",items:[
  {section:"theory",question:"Два ВПСП приходят от одного входа с коротким интервалом, а затем одновременно от двух разных синапсов. В каком случае суммация временная, а в каком — пространственная? Почему место и время важны?",link:"Повторить механизм"},
  {section:"interactive",question:"В условной модели Vm = −65 мВ и E(Cl) ≈ −65 мВ. Почему увеличение Cl⁻-проводимости может уменьшить совпадающий ВПСП без заметной гиперполяризации? Какие параметры следует изменить в опыте?",link:"Проверить в лаборатории"},
  {section:"cases",question:"При одинаковом стимуле уменьшился постсинаптический ответ. Какие дополнительные измерения отличат снижение пресинаптического выделения медиатора от увеличения постсинаптической проводимости?",link:"Разобрать случаи"}]},
 EN:{title:"Self-check: excitation and inhibition",note:"Explain your reasoning and compare it with the theory. These prompts are not automatically graded and do not raise your mastery indicator.",items:[
  {section:"theory",question:"Two EPSPs arrive in rapid succession from one input; then two EPSPs arrive together from different synapses. Which is temporal versus spatial summation, and why do timing and location matter?",link:"Review the mechanism"},
  {section:"interactive",question:"In a hypothetical model, Vm = −65 mV and E(Cl) ≈ −65 mV. Why can increased Cl⁻ conductance attenuate a coincident EPSP without obvious hyperpolarization? Which parameters would you vary?",link:"Explore in the lab"},
  {section:"cases",question:"The postsynaptic response falls despite identical stimulation. What additional measurements would distinguish reduced presynaptic transmitter release from increased postsynaptic conductance?",link:"Analyze the cases"}]},
 KZ:{title:"Өзіндік тексеру: қозу және тежелу",note:"Жауапты өз сөзіңізбен түсіндіріп, теориямен салыстырыңыз. Бұл сұрақтар автоматты түрде бағаланбайды және меңгеру көрсеткішін арттырмайды.",items:[
  {section:"theory",question:"Бір кірістен екі ҚПСП қысқа аралықпен, ал екі бөлек синапстан екі ҚПСП бір мезгілде келді. Қайсысы уақыттық, қайсысы кеңістіктік суммация? Уақыт пен орналасу неліктен маңызды?",link:"Механизмді қайталау"},
  {section:"interactive",question:"Шартты модельде Vm = −65 мВ және E(Cl) ≈ −65 мВ. Cl⁻ өткізгіштігі артқанда айқын гиперполяризациясыз қатар келген ҚПСП неліктен әлсіреуі мүмкін? Қандай параметрлерді өзгертіп тексересіз?",link:"Зертханада тексеру"},
  {section:"cases",question:"Тітіркендіру бірдей болса да, постсинапстық жауап азайды. Пресинапстық медиатор бөлінуінің азаюын постсинапстық өткізгіштіктің артуынан ажырату үшін қандай қосымша өлшеулер керек?",link:"Жағдайларды талдау"}]}
} as const;
// Module 7: formative reflection on the stretch reflex; NEVER scored as evidence of mastery.
// Checked against Guyton & Hall 13e ch. 55 (Library PDF pp. 666–667),
// Ganong 23e ch. 9 (Library PDF pp. 169–170), and
// C. L. Ghai Practical Physiology 8e (Library PDF pp. 317–318).
const moduleSevenReview={
 RU:{title:"Самопроверка: рефлекторная дуга и коленный рефлекс",note:"Объясните каждый механизм, затем сравните с теорией, моделью и клиническим разбором. Ответы здесь не проверяются автоматически и не изменяют показатель освоения.",items:[
  {section:"theory",question:"После удара по связке надколенника что именно растягивается и какой рецептор запускает коленный рефлекс? Проследите путь Ia → альфа-мотонейрон → четырёхглавая мышца; отделите прямой моносинаптический путь от реципрокного торможения через интернейрон. Где действуют глутамат и ацетилхолин?",link:"Проверить рефлекторную дугу"},
  {section:"interactive",question:"При одинаковой конечной длине мышцы сравните быстрый и медленный этапы растяжения. Как отличаются динамический ответ Ia и статические сигналы Ia/II? Почему гамма-мотонейроны поддерживают чувствительность мышечного веретена при сокращении мышцы, а Ib-афференты сухожильного органа Гольджи не являются основным входом коленного рефлекса?",link:"Сопоставить с интерактивной моделью"},
  {section:"cases",question:"Слабый коленный рефлекс стал заметнее после расслабления и приёма Ендрассика. Какие условия осмотра следует стандартизировать и какие дополнительные неврологические признаки проверить? Почему нельзя по одному слабому рефлексу или изменению после подкрепления установить диагноз и точный уровень поражения?",link:"Разобрать клиническую ситуацию"}]},
 EN:{title:"Self-check: reflex arc and knee jerk",note:"Explain each mechanism, then compare with the theory, model and clinical cases. These responses are not automatically graded and do not change your mastery score.",items:[
  {section:"theory",question:"After a tap on the patellar ligament, what is stretched and which receptor initiates the knee jerk? Trace Ia afferent → alpha motor neuron → quadriceps; distinguish the direct monosynaptic branch from reciprocal inhibition through an interneuron. Where do glutamate and acetylcholine act?",link:"Review the reflex arc"},
  {section:"interactive",question:"With the same final muscle length, compare rapid and slow stretch. How do the dynamic Ia response and static Ia/II signals differ? Why does gamma motor drive help preserve spindle sensitivity during contraction, and why are Golgi tendon organ Ib afferents not the primary input to the knee jerk?",link:"Compare with the interactive model"},
  {section:"cases",question:"A weak knee jerk becomes more visible after relaxation and the Jendrassik maneuver. Which examination conditions must be standardized and what other neurological findings should be assessed? Why can neither a single weak reflex nor its change with reinforcement establish a diagnosis or precisely localize a lesion?",link:"Analyze the clinical case"}]},
 KZ:{title:"Өзіндік тексеру: рефлекстік доға және тізе рефлексі",note:"Әр механизмді түсіндіріп, жауабыңызды теориямен, модельмен және клиникалық талдаумен салыстырыңыз. Бұл жауаптар автоматты түрде бағаланбайды және меңгеру көрсеткішін өзгертпейді.",items:[
  {section:"theory",question:"Тізе тостағаншасының байламын соққанда нақты не созылады және тізе рефлексін қай рецептор бастайды? Ia-афферент → альфа-мотонейрон → санның төртбасты бұлшықеті жолын сипаттаңыз; тікелей моносинапстық тармақты аралық нейрон арқылы жүретін реципроктық тежелуден ажыратыңыз. Глутамат пен ацетилхолин қай жерде әсер етеді?",link:"Рефлекстік доғаны қайталау"},
  {section:"interactive",question:"Бұлшықеттің соңғы ұзындығы бірдей болғанда жылдам және баяу созылуды салыстырыңыз. Ia талшығының динамикалық жауабы мен Ia/II талшықтарының статикалық сигналдары қалай ерекшеленеді? Жиырылу кезінде гамма-мотонейрондар бұлшықет ұршығының сезімталдығын неге сақтайды және Гольджи сіңір мүшесінің Ib-афференттері тізе рефлексінің негізгі кірісі неге емес?",link:"Интерактивті модельмен салыстыру"},
  {section:"cases",question:"Босаңсығаннан және Ендрассик әдісінен кейін әлсіз тізе рефлексі айқынырақ байқалды. Қараудың қандай жағдайларын бірдей ұстау және қандай қосымша неврологиялық белгілерді тексеру қажет? Неліктен бір әлсіз рефлекс немесе оның күшейтуден кейінгі өзгерісі диагнозды не зақымның нақты деңгейін анықтамайды?",link:"Клиникалық жағдайды талдау"}]}
} as const;

// Module 8: ungraded pathway localization reflection, not evidence of mastery.
// Guyton & Hall 13e PDF 584–585; Ganong 23e PDF 185–186;
// C. L. Ghai Practical Physiology 8e PDF 324–325.
const moduleEightReview={
 RU:{title:"Самопроверка: восходящие пути и локализация",note:"Сопоставьте ответы с теорией и клиническими задачами. Эти открытые вопросы не оцениваются автоматически и не увеличивают показатель освоения.",items:[
  {section:"theory",question:"Сравните путь вибрации и сознательной проприоцепции с путём боли и температуры от левой ноги: где расположены тела первых нейронов, где происходят переключения и на каком уровне аксоны перекрещиваются? Почему задние столбы и антеролатеральная система дают разные стороны выпадения при очаге в спинном мозге?",link:"Повторить перекрёсты и реле"},
  {section:"interactive",question:"В качественной схеме проследите левый задний столб до тонкого ядра и медиальной петли, а правосторонний болевой сигнал — через задний рог и переднюю белую спайку. Какие стороны и уровни нужно отметить, чтобы не принять условную анимацию за реальную запись проводимости?",link:"Сопоставить пути на схеме"},
  {section:"cases",question:"При частичном левостороннем поражении около спинномозгового сегмента T10 снижены вибрация слева и боль/температура справа ниже очага. Почему начало болевого дефицита может быть смещено на несколько сегментов? Почему T10 сегмент не равен T10 позвонку и почему один синдром не устанавливает причину?",link:"Разобрать клиническую локализацию"}]},
 EN:{title:"Self-check: ascending pathways and localization",note:"Compare your answers with theory and clinical cases. These open prompts are not automatically graded and do not raise the mastery indicator.",items:[
  {section:"theory",question:"Compare the pathway for vibration and conscious proprioception with pain and temperature from the left leg: where are first-order cell bodies, relays and decussations? Why can a spinal cord lesion produce sensory losses on different sides for dorsal columns versus the anterolateral system?",link:"Review crossing and relay levels"},
  {section:"interactive",question:"In the qualitative diagram, trace the left dorsal column through the gracile nucleus and medial lemniscus, and right-sided pain input through the dorsal horn and anterior white commissure. Which sides and levels must be labelled so that the teaching animation is not mistaken for a physiological recording?",link:"Compare pathways in the diagram"},
  {section:"cases",question:"With a partial left-sided lesion near spinal cord segment T10, vibration is reduced on the left and pain/temperature on the right below the lesion. Why can pain loss begin a few segments lower? Why is cord segment T10 not vertebra T10, and why does the pattern alone not establish the cause?",link:"Analyze clinical localization"}]},
 KZ:{title:"Өзіндік тексеру: жоғарылаушы жолдар және зақым орнын анықтау",note:"Жауаптарды теориямен және клиникалық жағдайлармен салыстырыңыз. Бұл ашық сұрақтар автоматты түрде бағаланбайды және меңгеру көрсеткішін арттырмайды.",items:[
  {section:"theory",question:"Сол аяқтан келетін діріл мен саналы проприоцепция жолын ауырсыну және температура жолымен салыстырыңыз: бірінші нейрондардың денелері, ауысу орындары және айқасу деңгейлері қайда? Неліктен жұлын зақымында артқы баған мен антеролатералдық жүйе әртүрлі жақтағы сезімталдық бұзылысын береді?",link:"Айқасу мен ауысу деңгейлерін қайталау"},
  {section:"interactive",question:"Сапалық сызбада сол жақ артқы баған жолын нәзік ядро мен медиалдық ілмекке дейін, ал оң жақтағы ауырсыну сигналын артқы мүйіз және алдыңғы ақ комиссура арқылы қадағалаңыз. Оқу анимациясын нақты физиологиялық жазбамен шатастырмау үшін қай жақтар мен деңгейлерді көрсету керек?",link:"Сызбадағы жолдарды салыстыру"},
  {section:"cases",question:"Жұлынның T10 сегменті маңындағы сол жақты жартылай зақымында ошақтан төмен сол жақта діріл, оң жақта ауырсыну мен температура сезімі төмендеген. Неліктен ауырсыну сезімінің бұзылуы бірнеше сегмент төмен басталуы мүмкін? Неліктен жұлынның T10 сегменті T10 омыртқасына тең емес және бұл үлгі зақымның себебін дәлелдемейді?",link:"Клиникалық локализацияны талдау"}]}
} as const;

/**
 * Module 9: ungraded reflection on segmental spinal circuitry.
 * Library cross-check: Ganong 23e PDF 169–170, Guyton & Hall 13e PDF 670–671,
 * C. L. Ghai Practical Physiology 8e PDF 317–319.
 * These questions cannot be counted as automatically checked mastery evidence.
 */
const moduleNineReview={
 RU:{title:"Самопроверка: спинальные цепи и границы клинического вывода",note:"Ответьте своими словами, затем сверьте механизмы с теорией, лабораторией и кейсами. Открытые ответы не проверяются автоматически и не повышают показатель освоения.",items:[
  {section:"theory",question:"При ударе по связке надколенника что растягивается: сухожильный орган Гольджи или мышечные веретёна четырёхглавой мышцы? Проследите прямой Ia→α-мотонейронный путь и отдельную ветвь через тормозный интернейрон антагониста. Почему защитное отдёргивание нельзя назвать тем же моносинаптическим рефлексом?",link:"Сверить два рефлекторных механизма"},
  {section:"interactive",question:"В учебной модели сохраните одинаковый условный Ia-вход и сравните ответ антагониста при включённом и выключенном тормозном интернейроне. Почему направление изменения объяснимо схемой, а численные проценты не являются измеренной ЭМГ, силой мышцы или частотой разрядов? Какие влияния модель не учитывает?",link:"Проверить условия модели"},
  {section:"cases",question:"После тяжёлой травмы спинного мозга сухожильные рефлексы сначала ослаблены, а спустя время часть из них усиливается без восстановления произвольных движений. Чем спинальный шок отличается от нейрогенного гемодинамического шока? Почему возвращение рефлекса не доказывает восстановление нисходящих путей и что нужно оценить дополнительно?",link:"Разобрать временную динамику"}]},
 EN:{title:"Self-check: spinal circuits and limits of clinical inference",note:"Explain in your own words, then compare with theory, laboratory and cases. These open responses are not automatically graded and do not raise the mastery indicator.",items:[
  {section:"theory",question:"When the patellar ligament is tapped, is the primary receptor a Golgi tendon organ or the quadriceps muscle spindle? Trace the direct Ia→α-motor neuron pathway and the separate inhibitory interneuron branch to the antagonist. Why is protective withdrawal not the same monosynaptic reflex?",link:"Compare the two reflex mechanisms"},
  {section:"interactive",question:"In the teaching model, keep the illustrative Ia input constant and compare antagonist output with its inhibitory interneuron enabled and disabled. Why does the circuit predict the direction of change, while the percentages are not recorded EMG, muscle force or firing rate? Which physiological influences are omitted?",link:"Check the model assumptions"},
  {section:"cases",question:"After severe spinal cord injury, tendon reflexes are initially depressed and some later become brisker without recovery of voluntary movement. How does spinal shock differ from hemodynamic neurogenic shock? Why does return of a segmental reflex not establish restoration of descending pathways, and what additional findings matter?",link:"Review the time course"}]},
 KZ:{title:"Өзіндік тексеру: жұлын тізбектері және клиникалық қорытынды шектері",note:"Жауапты өз сөзіңізбен түсіндіріп, теориямен, зертханамен және жағдайлармен салыстырыңыз. Ашық жауаптар автоматты түрде бағаланбайды және меңгеру көрсеткішін арттырмайды.",items:[
  {section:"theory",question:"Тізе тостағаншасының байламын соққанда негізгі рецептор Гольджи сіңір мүшесі ме, әлде санның төртбасты бұлшықетінің ұршығы ма? Тікелей Ia→α-мотонейрон жолын және антагонисті тежейтін интернейрон арқылы өтетін бөлек тармақты сипаттаңыз. Қорғаныштық тартып алу неге дәл осындай моносинапстық рефлекс емес?",link:"Екі рефлекс механизмін салыстыру"},
  {section:"interactive",question:"Оқу моделінде шартты Ia кірісін бірдей ұстап, тежеуші интернейрон қосылған және өшірілген кездегі антагонист жауабын салыстырыңыз. Неліктен сызба өзгеріс бағытын түсіндіреді, бірақ пайыздар нақты ЭМГ, бұлшықет күші немесе импульс жиілігінің өлшемі емес? Қандай физиологиялық ықпалдар ескерілмеген?",link:"Модельдің шарттарын тексеру"},
  {section:"cases",question:"Жұлын ауыр зақымданғаннан кейін сіңір рефлекстері бастапқыда бәсеңдеп, кейін кейбірі күшейді, бірақ ерікті қимылдар қалпына келмеді. Жұлындық шок гемодинамикалық нейрогендік шоктан несімен ерекшеленеді? Неліктен сегменттік рефлекстің оралуы төмендеуші жолдардың қалпына келгенін дәлелдемейді және тағы нені бағалау керек?",link:"Уақытқа байланысты өзгерісті талдау"}]}
} as const;

/**
 * Module 10: ungraded reflection on brainstem mechanisms, not a clinical
 * examination or evidence of automatically assessed mastery.
 * Checked against Library PDFs: Guyton & Hall 13e pp. 718–719;
 * Ganong 23e pp. 249–250, 579;
 * C. L. Ghai Practical Physiology 8e pp. 301–302, 256–257.
 */
const moduleTenReview={
 RU:{title:"Самопроверка: рефлексы и сети ствола мозга",note:"Сначала объясните механизм своими словами, затем сопоставьте ответ с теорией, клиническим разбором и моделью. Эти открытые ответы не проверяются автоматически, не повышают показатель освоения и не служат клиническим диагнозом. Не проверяйте корнеальный рефлекс самостоятельно.",items:[
  {section:"theory",question:"Сравните две дуги: свет → сетчатка → II нерв → претектальная область → двусторонние ядра Эдингера—Вестфаля → III нерв → ресничный узел → сфинктер зрачка; прикосновение к роговице → V1 → стволовые интернейроны → VII нерв → круговая мышца глаза. Какие ответы прямые и содружественные? Почему сохранность одного рефлекса не доказывает целостность всего ствола и наличие сознания?",link:"Сопоставить рефлекторные дуги"},
  {section:"interactive",question:"В учебной модели входящий сенсорный сигнал изменяет условный индекс восходящей связи. Что можно заключить о направлении изменения только внутри этой модели? Почему условный индекс нельзя считать реальной ЭЭГ, измеренной активностью ретикулярной формации или количественным показателем сознания? Назовите роль таламо-корковых и гипоталамических сетей.",link:"Проверить допущения модели"},
  {section:"media",question:"Ранний слуховой вызванный потенциал регистрируют после повторных звуковых стимулов с усреднением малых ответов. Какой ограниченный вывод позволяет сохранная ранняя волна о проведении по части слухового пути? Почему она не доказывает осознанное восприятие, а её отсутствие без контроля слуха, стимула и помех не устанавливает конкретный очаг?",link:"Повторить ограничения КСВП"}]},
 EN:{title:"Self-check: brainstem reflexes and distributed networks",note:"Explain the mechanism first, then compare with theory, the clinical discussion and the model. These open responses are not automatically graded, do not raise the mastery score and are not a clinical diagnosis. Do not test the corneal reflex yourself.",items:[
  {section:"theory",question:"Compare the arcs: light → retina → CN II → pretectal area → bilateral Edinger–Westphal nuclei → CN III → ciliary ganglion → pupillary sphincter; corneal contact → V1 → brainstem interneurons → CN VII → orbicularis oculi. Which responses are direct and consensual? Why does a preserved reflex prove neither integrity of the whole brainstem nor conscious awareness?",link:"Compare the reflex arcs"},
  {section:"interactive",question:"In the teaching model, sensory input changes an arbitrary ascending-relay index. What directional conclusion is justified within this model only? Why is the index neither recorded EEG, measured reticular-formation activity nor a numerical measure of consciousness? Explain the contribution of thalamocortical and hypothalamic networks.",link:"Examine model assumptions"},
  {section:"media",question:"An early brainstem auditory evoked potential is recorded after repeated clicks by averaging small responses. What limited conclusion does a preserved early wave support about conduction along part of the auditory pathway? Why does it not establish awareness, and why cannot an absent response localize a lesion without checking hearing, stimulus delivery and recording artifacts?",link:"Review BAEP limitations"}]},
 KZ:{title:"Өзіндік тексеру: ми бағанының рефлекстері мен желілері",note:"Алдымен механизмді өз сөзіңізбен түсіндіріп, содан кейін теориямен, клиникалық талдаумен және модельмен салыстырыңыз. Ашық жауаптар автоматты түрде бағаланбайды, меңгеру көрсеткішін арттырмайды және клиникалық диагноз емес. Қасаң қабық рефлексін өз бетіңізше тексермеңіз.",items:[
  {section:"theory",question:"Екі доғаны салыстырыңыз: жарық → торқабық → II жүйке → претекталдық аймақ → екі жақтағы Эдингер—Вестфаль ядролары → III жүйке → кірпікшелі түйін → қарашық сфинктері; қасаң қабыққа жанасу → V1 → ми бағанының интернейрондары → VII жүйке → көздің айналма бұлшықеті. Тікелей және екінші көздегі (жанама) жауаптардың айырмасы қандай? Бір рефлекстің сақталуы неліктен бүкіл ми бағанының бүтіндігін немесе саналы қабылдауды дәлелдемейді?",link:"Рефлекс доғаларын салыстыру"},
  {section:"interactive",question:"Оқу моделінде сенсорлық кіріс жоғарылаушы байланыстың шартты индексін өзгертеді. Өзгеріс бағыты туралы тек осы модель аясында қандай қорытынды жасауға болады? Неліктен индекс нақты ЭЭГ де, ретикулярлық формация белсенділігінің өлшемі де, сана деңгейінің сандық көрсеткіші де емес? Таламус-қыртыстық және гипоталамустық желілердің рөлін түсіндіріңіз.",link:"Модельдің жорамалдарын тексеру"},
  {section:"media",question:"Ми бағанының ерте есту шақырылған потенциалы қайталанған дыбыс стимулдарынан кейін шағын жауаптарды орташа есептеу арқылы тіркеледі. Ерте толқынның сақталуы есту жолының бір бөлігіндегі өткізгіштік туралы қандай шектеулі қорытындыға мүмкіндік береді? Неліктен бұл саналы қабылдауды дәлелдемейді, ал жауаптың болмауы естуді, стимулды және жазба артефактілерін тексермей нақты ошақты көрсетпейді?",link:"Есту потенциалдарының шектеулерін қайталау"}]}
} as const;


/**
 * Module 11: ungraded formative reflection on distributed motor control.
 * Physiological anchors: Guyton & Hall 13e ch. 56 (Library PDF 677–679);
 * Ganong 23e ch. 16 (Library PDF 253–256);
 * C. L. Ghai Practical Physiology 8e (Library PDF 317–319).
 * No auto-scoring of free-text reasoning; no clinical diagnosis.
 */
const moduleElevenReview={
 RU:{title:"Самопроверка: управление движением и обратная связь",note:"Объясните механизм своими словами и сопоставьте ответ с теорией и клиническими задачами. Эти открытые ответы не проверяются автоматически, не повышают показатель освоения и не заменяют неврологическое обследование.",items:[
  {section:"theory",question:"Проследите путь произвольной команды: ассоциативные и премоторные области → моторная кора → внутренняя капсула → пирамиды продолговатого мозга → преимущественно перекрещённый латеральный кортикоспинальный путь → спинальные интернейроны и α-мотонейроны. Почему базальные ганглии и мозжечок участвуют в подготовке и коррекции, но не являются прямым конечным выходом к скелетной мышце?",link:"Сверить нисходящие пути"},
  {section:"interactive",question:"В учебной схеме сравните заранее подготовленную команду и её коррекцию после неожиданного смещения цели. Какие сигналы от зрения и проприорецепторов могут уточнять действие и почему коррекция не происходит без задержки? Укажите, что пошаговая схема не измеряет скорость проведения, мышечную силу или состояние конкретного пациента.",link:"Проверить ограничения схемы"},
  {section:"cases",question:"У человека сохранена грубая сила, но затруднена последовательность целенаправленного действия; в другой ситуации наблюдаются дисметрия и нарушение точности. Почему эти наблюдения требуют разных гипотез и дополнительного осмотра? При ударе по сухожилию какой рецептор запускает рефлекс растяжения — мышечное веретено или сухожильный орган Гольджи? Почему один рефлекс не устанавливает точную локализацию поражения?",link:"Разобрать клинические ограничения"}]},
 EN:{title:"Self-check: motor control and feedback",note:"Explain the mechanism in your own words and compare your answer with the theory and clinical cases. These open responses are not automatically graded, do not raise the mastery indicator, and cannot replace a neurological examination.",items:[
  {section:"theory",question:"Trace a voluntary command: association and premotor regions → motor cortex → internal capsule → medullary pyramids → predominantly crossed lateral corticospinal tract → spinal interneurons and alpha motor neurons. Why do the basal ganglia and cerebellum contribute to planning and adjustment without being the direct final output to skeletal muscle?",link:"Review descending pathways"},
  {section:"interactive",question:"In the teaching diagram, compare a prepared motor command with correction after an unexpected shift of the target. How can visual and proprioceptive signals modify performance, and why is sensory correction not instantaneous? Explain why the step-by-step diagram does not measure conduction velocity, muscle force, or an individual patient's condition.",link:"Check the diagram's limitations"},
  {section:"cases",question:"One person retains gross strength but struggles to sequence a purposeful action; another shows dysmetria and poor targeting. Why do these findings require different hypotheses and further examination? When a tendon is tapped, does the stretch reflex start in a muscle spindle or a Golgi tendon organ? Why can a single reflex not precisely localize a lesion?",link:"Review clinical limitations"}]},
 KZ:{title:"Өзіндік тексеру: қозғалысты басқару және кері байланыс",note:"Механизмді өз сөзіңізбен түсіндіріп, жауабыңызды теориямен және клиникалық тапсырмалармен салыстырыңыз. Ашық жауаптар автоматты түрде бағаланбайды, меңгеру көрсеткішін арттырмайды және неврологиялық тексеруді алмастырмайды.",items:[
  {section:"theory",question:"Ерікті қозғалыс командасының жолын көрсетіңіз: ассоциативтік және премоторлық аймақтар → моторлық қыртыс → ішкі капсула → сопақша мидың пирамидалары → негізінен айқасатын латералдық кортикоспиналдық жол → жұлын интернейрондары мен α-мотонейрондар. Неліктен базальды ганглийлер мен мишық жоспарлау және түзетуге қатысқанымен, қаңқа бұлшықетіне тікелей соңғы шығыс болмайды?",link:"Төмендеуші жолдарды қайталау"},
  {section:"interactive",question:"Оқу сызбасында алдын ала дайындалған қозғалыс командасын нысана күтпеген жерден жылжығанда жасалатын түзетумен салыстырыңыз. Көру және проприоцептивтік сигналдар қозғалысты қалай өзгерте алады, ал түзету неліктен кідіріссіз жүрмейді? Кезеңдік сызба өткізгіштік жылдамдығын, бұлшықет күшін немесе нақты пациенттің жағдайын өлшемейтінін түсіндіріңіз.",link:"Сызбаның шектеулерін тексеру"},
  {section:"cases",question:"Бір адамда жалпы бұлшықет күші сақталғанымен, мақсатты әрекеттердің ретін орындау қиындаған; басқа жағдайда дисметрия мен дәлдіктің төмендеуі байқалады. Неліктен бұл белгілер әртүрлі болжамдарды және қосымша тексеруді қажет етеді? Сіңірді соққылағанда созылу рефлексін қай рецептор бастайды: бұлшықет ұршығы ма, әлде Гольджидің сіңірлік органы ма? Неліктен бір рефлекс зақымның нақты орнын анықтамайды?",link:"Клиникалық шектеулерді талдау"}]}
} as const;

function level(correct:number,total:number):Level{if(!total)return"none";const p=correct/total;return p>=.8?"mastered":p>=.5?"forming":"review"}
export default function ModuleProgress({language,moduleId}:{language:Language;moduleId:number}){
 const [data,setData]=useState<CourseProgressData|null>(null);
 useEffect(()=>{recordVisit(moduleId,"progress");setData(readCourseProgress())},[moduleId]);
 const c=C[language], outcomes=data?.outcomes??{};
 const visitedSections=data?.visitedSections[moduleId]??[];
 const coreSections=["objectives","pretest","theory","one-minute","clinical","interactive","practice","cases","tests","questions","virtual-patient"] as const;
 const coreVisited=coreSections.filter(section=>visitedSections.includes(section)).length;
 const supportSections=["media","glossary","voice","progress","notes","references"] as const;
 const supportVisited=supportSections.filter(section=>visitedSections.includes(section)).length;
 const currentPercent=Math.round((coreVisited/coreSections.length)*100);
 const allModules=modules[language].map((title,index)=>{const id=index+1;const sections=data?.visitedSections[id]??[];const core=coreSections.filter(s=>sections.includes(s)).length;const o=data?.outcomes??{};const gradedKeys=[`${id}:tests`,`${id}:virtual-patient`,`${id}:criterion:clinical:cases`];const evidence=gradedKeys.map(key=>o[key]).filter((value):value is {correct:number;total:number}=>Boolean(value));const correct=evidence.reduce((s,v)=>s+v.correct,0),total=evidence.reduce((s,v)=>s+v.total,0);const mastery=total?Math.round(correct/total*100):0;return{id,title,core,completion:Math.round(core/coreSections.length*100),mastery,correct,total}});
 const courseCompletion=Math.round(allModules.reduce((s,m)=>s+m.completion,0)/allModules.length);
 const assessed=allModules.filter(m=>m.total>0);// Weight by checked items: averaging rounded per-module percentages gives a one-item quiz
 // the same influence as a much longer assessment and misstates the aggregate.
 const courseMastery=assessed.length?Math.round(assessed.reduce((s,m)=>s+m.correct,0)/assessed.reduce((s,m)=>s+m.total,0)*100):0;
 const needsAttention=allModules.filter(m=>m.total>0&&m.mastery<55).sort((a,b)=>a.mastery-b.mastery).slice(0,5);
 const test=outcomes[`${moduleId}:tests`], cases=outcomes[`${moduleId}:cases`], practice=outcomes[`${moduleId}:practice`], questions=outcomes[`${moduleId}:questions`], patient=outcomes[`${moduleId}:virtual-patient`], sketch=outcomes[`${moduleId}:criterion:application:sketch`], builder=outcomes[`${moduleId}:criterion:application:path-builder`];
 const combined=(items:({correct:number;total:number}|undefined)[])=>{const x=items.filter(Boolean) as {correct:number;total:number}[];return {correct:x.reduce((a,b)=>a+b.correct,0),total:x.reduce((a,b)=>a+b.total,0)}};
 // Case completion is an activity marker, not a checked answer. Never count it as mechanism mastery.
 const testEvidence=combined([test]);
 const criterion=(name:string)=>{
   const prefix=`${moduleId}:criterion:${name}`;
   const values=Object.entries(outcomes).filter(([key])=>(key===prefix||key.startsWith(prefix+":"))&&!key.endsWith(":sketch")&&!key.endsWith(":path-builder")&&!key.endsWith(":lab-reflection")&&!key.endsWith(":gradient-permeability")&&!key.endsWith(":ghk")&&!key.endsWith(":electrophysiology-prediction")).map(([,value])=>value);
   if(!values.length)return undefined;
   return {correct:values.reduce((sum,value)=>sum+value.correct,0),total:values.reduce((sum,value)=>sum+value.total,0)};
 };
 const rows:[string,Level][]=[
  [c.concept,level(criterion("concept")?.correct??0,criterion("concept")?.total??0)],
  [c.mechanism,level(criterion("mechanism")?.correct??testEvidence.correct,criterion("mechanism")?.total??testEvidence.total)],
  [c.interpret,level(criterion("application")?.correct??testEvidence.correct,criterion("application")?.total??testEvidence.total)],
  [c.transfer,level(criterion("transfer")?.correct??0,criterion("transfer")?.total??0)],
  [c.justification,level(criterion("justification")?.correct??0,criterion("justification")?.total??0)],
  [c.clinical,level(criterion("clinical")?.correct??0,criterion("clinical")?.total??0)],
  [c.correction,level(criterion("correction")?.correct??0,criterion("correction")?.total??0)]
 ];
 const label=(x:Level)=>x==="mastered"?c.mastered:x==="forming"?c.forming:x==="review"?c.review:c.none;
 const available=rows.filter(([,l])=>l!=="none");
 const masteredCount=available.filter(([,l])=>l==="mastered").length;
 const reviewCount=available.filter(([,l])=>l==="review").length;
 const overallPercent=available.length?Math.round((available.reduce((sum,[,l])=>sum+(l==="mastered"?1:l==="forming"?0.5:0),0)/available.length)*100):0;
 const recommendation=available.length===0?c.none:reviewCount>0?c.low:available.length<3?c.mid:masteredCount===available.length?c.strong:c.mid;
 return <section className={styles.patient}>
  <h1>{c.title}</h1><p>{c.scope}. {c.saved}</p>
  <div className={styles.summary}>
    <p>{c.visited}: <strong>{data?.visitedModules.length??0} / {modules[language].length}</strong></p>
    <progress aria-label={c.visited} value={data?.visitedModules.length??0} max={modules[language].length}/>
    <p>{language==="RU"?"Основной маршрут":language==="KZ"?"Негізгі маршрут":"Core learning path"}: <strong>{coreVisited}/{coreSections.length} · {currentPercent}%</strong></p>
    <progress aria-label="core module progress" value={coreVisited} max={coreSections.length}/>
    <p>{language==="RU"?"Дополнительные разделы":language==="KZ"?"Қосымша бөлімдер":"Additional sections"}: <strong>{supportVisited}/6</strong></p>
  </div>
  {moduleId===6 && <section aria-label={moduleSixReview[language].title} style={{margin:"18px 0",padding:"16px",border:"1px solid #b9d3e6",borderRadius:14,background:"#f8fcff"}}>
    <h2 style={{marginTop:0}}>{moduleSixReview[language].title}</h2>
    <p>{moduleSixReview[language].note}</p>
    <ol>{moduleSixReview[language].items.map(item=><li key={item.section} style={{marginBottom:12}}><p>{item.question}</p><Link href={`/modules/${moduleId}/${item.section}?lang=${language}`}>{item.link}</Link></li>)}</ol>
  </section>}
  {moduleId===7 && <section aria-label={moduleSevenReview[language].title} style={{margin:"18px 0",padding:"16px",border:"1px solid #b9d3e6",borderRadius:14,background:"#f8fcff"}}>
    <h2 style={{marginTop:0}}>{moduleSevenReview[language].title}</h2>
    <p>{moduleSevenReview[language].note}</p>
    <ol>{moduleSevenReview[language].items.map(item=><li key={item.section} style={{marginBottom:12}}><p>{item.question}</p><Link href={`/modules/${moduleId}/${item.section}?lang=${language}`}>{item.link}</Link></li>)}</ol>
  </section>}
  {moduleId===8 && <section aria-label={moduleEightReview[language].title} style={{margin:"18px 0",padding:"16px",border:"1px solid #b9d3e6",borderRadius:14,background:"#f8fcff"}}>
    <h2 style={{marginTop:0}}>{moduleEightReview[language].title}</h2>
    <p>{moduleEightReview[language].note}</p>
    <ol>{moduleEightReview[language].items.map(item=><li key={item.section} style={{marginBottom:12}}><p>{item.question}</p><Link href={`/modules/${moduleId}/${item.section}?lang=${language}`}>{item.link}</Link></li>)}</ol>
  </section>}
  {moduleId===9 && <section aria-label={moduleNineReview[language].title} style={{margin:"18px 0",padding:"16px",border:"1px solid #b9d3e6",borderRadius:14,background:"#f8fcff"}}>
    <h2 style={{marginTop:0}}>{moduleNineReview[language].title}</h2>
    <p>{moduleNineReview[language].note}</p>
    <ol>{moduleNineReview[language].items.map(item=><li key={item.section} style={{marginBottom:12}}><p>{item.question}</p><Link href={`/modules/${moduleId}/${item.section}?lang=${language}`}>{item.link}</Link></li>)}</ol>
  </section>}
  {moduleId===10 && <section aria-label={moduleTenReview[language].title} style={{margin:"18px 0",padding:"16px",border:"1px solid #b9d3e6",borderRadius:14,background:"#f8fcff"}}>
    <h2 style={{marginTop:0}}>{moduleTenReview[language].title}</h2>
    <p>{moduleTenReview[language].note}</p>
    <ol>{moduleTenReview[language].items.map(item=><li key={item.section} style={{marginBottom:12}}><p>{item.question}</p><Link href={`/modules/${moduleId}/${item.section}?lang=${language}`}>{item.link}</Link></li>)}</ol>
  </section>}
  {moduleId===11 && <section aria-label={moduleElevenReview[language].title} style={{margin:"18px 0",padding:"16px",border:"1px solid #b9d3e6",borderRadius:14,background:"#f8fcff"}}>
    <h2 style={{marginTop:0}}>{moduleElevenReview[language].title}</h2>
    <p>{moduleElevenReview[language].note}</p>
    <ol>{moduleElevenReview[language].items.map(item=><li key={item.section} style={{marginBottom:12}}><p>{item.question}</p><Link href={`/modules/${moduleId}/${item.section}?lang=${language}`}>{item.link}</Link></li>)}</ol>
  </section>}
  <section style={{margin:"18px 0",padding:"16px",border:"2px solid #b9d3e6",borderRadius:14,background:"#fff"}}>
    <h2 style={{marginTop:0}}>{language==="RU"?"Панель курса":language==="KZ"?"Курс панелі":"Course dashboard"}</h2>
    <p>{language==="RU"?"Завершение учебного маршрута":language==="KZ"?"Оқу маршрутының аяқталуы":"Learning-path completion"}: <strong>{courseCompletion}%</strong></p><progress value={courseCompletion} max={100} style={{width:"100%"}}/>
    <p>{language==="RU"?"Освоение по выполненным оцениваниям":language==="KZ"?"Орындалған бағалаулар бойынша меңгеру":"Mastery from completed assessments"}: <strong>{assessed.length?courseMastery+"%":c.none}</strong></p><progress value={courseMastery} max={100} style={{width:"100%"}} aria-label={language==="RU"?"Проверенные ответы":language==="KZ"?"Тексерілген жауаптар":"Checked answers"}/><p style={{fontSize:"13px",color:"#607b8d"}}>{c.scopeNote}</p>
    {needsAttention.length>0&&<><h3>{language==="RU"?"Приоритет повторения":language==="KZ"?"Қайталау басымдығы":"Review priority"}</h3><p>{needsAttention.map(m=>`${m.id}. ${m.title} — ${m.mastery}%`).join(" · ")}</p></>}
  </section>
  <h2>{c.assessment} · {c.module} {moduleId}</h2>
  <p>{c.exam}</p>
  <section style={{margin:"16px 0 20px",padding:"16px",border:"1px solid #d6e3eb",borderRadius:14,background:"#f8fcff"}}>
    <h3 style={{margin:"0 0 8px"}}>{c.teacher}</h3>
    <p style={{margin:"0 0 8px"}}><strong>{overallPercent}%</strong> · {available.length ? (reviewCount>0?c.review:available.length>=3&&masteredCount===available.length?c.mastered:c.forming) : c.none}</p>
    <progress value={overallPercent} max={100} aria-label={c.teacher} style={{width:"100%"}} />
    <p style={{margin:"10px 0 8px"}}><strong>{c.next}:</strong> {recommendation}</p>
    {available.length>0 && <div style={{display:"flex",gap:8,flexWrap:"wrap",margin:"10px 0"}}>
      {reviewCount>0 || available.length<3 || masteredCount<available.length ? <>
        <Link href={`/modules/${moduleId}/theory?lang=${language}`}>{language==="RU"?"Повторить теорию":language==="KZ"?"Теорияны қайталау":"Review theory"}</Link>
        <Link href={`/modules/${moduleId}/cases?lang=${language}`}>{language==="RU"?"Разобрать ситуации":language==="KZ"?"Жағдайларды талдау":"Review cases"}</Link>
        <Link href={`/modules/${moduleId}/tests?lang=${language}`}>{language==="RU"?"Повторить тест":language==="KZ"?"Тестті қайталау":"Retry test"}</Link>
      </> : moduleId < modules[language].length ? <Link href={`/modules/${moduleId+1}?lang=${language}`}>{language==="RU"?"Следующий модуль →":language==="KZ"?"Келесі модуль →":"Next module →"}</Link> : null}
    </div>}
    <p style={{margin:0,fontSize:"13px",color:"#607b8d"}}>{c.evidence}</p>
  </section>
  <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse"}}><tbody>{rows.map(([name,l])=><tr key={name}><th style={{textAlign:"left",padding:"10px",borderBottom:"1px solid #dce8ef"}}>{name}</th><td style={{padding:"10px",borderBottom:"1px solid #dce8ef",fontWeight:700}}>{label(l)}</td></tr>)}</tbody></table></div>
  <h3 style={{marginTop:22}}>{c.work}</h3>
  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:10}}>
    {[[c.practice,practice,true],[c.questions,questions,true],[c.tests,test,false],[c.cases,cases,true],[c.patient,patient,false],[c.sketch,sketch,true],[c.builder,builder,true]].map(([name,value,completion])=><div key={String(name)} style={{padding:"12px",border:"1px solid #dce8ef",borderRadius:10,background:"#fff"}}><strong>{String(name)}</strong><p style={{margin:"5px 0 0"}}>{value && typeof value==="object" ? `${value.correct}/${value.total} · ${Math.round(value.correct/value.total*100)}% · ${completion?c.completed:c.graded}` : c.none}</p></div>)}
  </div>
  <h2 style={{marginTop:28}}>{c.criteria}</h2>
  <div className={styles.courseModules}>{allModules.map(m=>{const count=data?.visitedSections[m.id]?.length??0;return <div key={m.id}><h3>{c.module} {m.id}: {m.title}</h3><p>{c.sections}: {count} · {language==="RU"?"маршрут":language==="KZ"?"маршрут":"path"} {m.completion}% · {language==="RU"?"освоение":language==="KZ"?"меңгеру":"mastery"} {m.total?m.mastery+"%":c.none}</p><progress value={m.completion} max={100} style={{width:"100%"}}/><br/><Link href={`/modules/${m.id}?lang=${language}`}>{c.start}</Link></div>})}</div>
 </section>
}