"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Language } from "../content/course";
import { emptyPatientProgress, readPatientProgress, savePatientProgress, type PatientProgress } from "../lib/virtualPatientProgress";
import styles from "./VirtualPatient.module.css";
import VoiceTextarea from "./VoiceTextarea";
import {recordOutcome} from "../lib/courseProgress";

const diagnosisCopy = {
  RU: { label: "Ваше предварительное предположение", compare: "Сравнить с вариантами", note: "Сначала напишите своими словами, что вы думаете и почему. Затем сравните с вариантами и разбором." },
  EN: { label: "Your provisional idea", compare: "Compare with options", note: "First write what you think and why, in your own words. Then compare with the options and explanation." },
  KZ: { label: "Сіздің алдын ала ойыңыз", compare: "Нұсқалармен салыстыру", note: "Алдымен не ойлайтыныңызды және неліктен екенін өз сөзіңізбен жазыңыз. Кейін нұсқалармен және талдаумен салыстырыңыз." },
} as const;


type ReasoningLevel = "supported" | "partial" | "contradicted" | "uncertain";
const teacherBranches = {
 RU:{history:["Хорошее начало. Теперь уточните распределение симптомов по пальцам.","Вы выяснили время появления симптомов. Сопоставьте ночное усиление с возможным уровнем компрессии.","Отсутствие боли в шее уменьшает поддержку шейной гипотезы, но само по себе её не исключает.","Снижение ловкости — функционально важная находка. Теперь проверьте двигательную функцию тенара."],examGood:"Вы выбрали исследование, которое проверяет локализацию. Сначала сравните I–III пальцы с V пальцем, затем оцените тенар.",examWrong:"Этот выбор не проверяет вашу нейроанатомическую гипотезу. Вернитесь к территории чувствительности и двигательной функции.",diagnosisGood:"Локализация и ключевые признаки согласованы. Сформулируйте, какие данные всё ещё нужны для клинического подтверждения.",diagnosisPartial:"Название диагноза похоже на рабочую гипотезу, но преподавателю важно увидеть ход рассуждения: нерв, уровень поражения и два поддерживающих признака.",diagnosisWrong:"Не спешите менять весь диагноз. Сначала найдите конкретный признак, который противоречит выбранной локализации."},
 EN:{history:["Good start. Now clarify the sensory distribution across the fingers.","You established the timing. Relate nocturnal worsening to a possible compression level.","Absence of neck pain weakens a cervical hypothesis but does not exclude it by itself.","Reduced dexterity is functionally important. Now test thenar motor function."],examGood:"This examination tests localization. Compare digits I–III with digit V, then assess the thenar muscles.",examWrong:"This choice does not test your neuroanatomical hypothesis. Return to sensory territory and motor function.",diagnosisGood:"Your localization and key findings are coherent. State what would still be needed for clinical confirmation.",diagnosisPartial:"The diagnostic label may fit, but show your reasoning: nerve, lesion level, and two supporting findings.",diagnosisWrong:"Do not replace the whole diagnosis yet. First identify the finding that contradicts your chosen localization."},
 KZ:{history:["Жақсы бастама. Енді симптомдардың саусақтар бойынша таралуын нақтылаңыз.","Симптомдардың уақытын анықтадыңыз. Түнгі күшеюді ықтимал қысылу деңгейімен байланыстырыңыз.","Мойын ауыруының болмауы мойындық гипотезаны әлсіретеді, бірақ оны толық жоққа шығармайды.","Ептіліктің төмендеуі маңызды. Енді тенардың қозғалтқыш қызметін тексеріңіз."],examGood:"Бұл тексеру локализацияны бағалайды. I–III саусақтарды V саусақпен салыстырып, кейін тенарды тексеріңіз.",examWrong:"Бұл таңдау нейроанатомиялық гипотезаны тексермейді. Сезімталдық аймағы мен қозғалтқыш қызметіне оралыңыз.",diagnosisGood:"Локализация мен негізгі белгілер үйлеседі. Клиникалық растауға тағы қандай дерек керек екенін айтыңыз.",diagnosisPartial:"Диагноз атауы сәйкес болуы мүмкін, бірақ ойлау жолын көрсетіңіз: жүйке, зақым деңгейі және екі дәлел.",diagnosisWrong:"Диагнозды бірден ауыстырмаңыз. Алдымен таңдаған локализацияға қайшы келетін белгіні табыңыз."}
} as const;
const dialogueCopy = {
 RU:{label:"Что вы хотите спросить у пациента?",send:"Спросить",student:"Студент",patient:"Пациент",teacher:"Наставник",known:"Что уже известно",retry:"Повторить ошибочные решения",theory:"Повторить теорию",summary:"Итог по случаю",voiceTeacher:"Озвучить комментарий наставника",handMap:"Карта чувствительности",unknown:"Я не совсем понял вопрос. Уточните, что именно вы хотите узнать.",supported:"Вывод согласуется с уже собранными данными. Какой следующий признак поможет его проверить?",partial:"В выводе есть верная часть, но данных пока недостаточно. Что ещё нужно уточнить?",contradicted:"Этот вывод не совпадает с частью собранных данных. Найдите признак, который ему противоречит.",uncertain:"Это пока гипотеза. Сформулируйте, каким наблюдением вы могли бы её проверить.",diagGood:"Диагноз и обоснование согласуются с локализацией и симптомами.",diagPartial:"Диагноз возможен, но обоснование неполное. Добавьте локализацию и ключевой признак.",diagWrong:"Диагноз противоречит собранным данным. Сопоставьте зоны срединного и локтевого нервов."},
 EN:{label:"What would you like to ask the patient?",send:"Ask",student:"Student",patient:"Patient",teacher:"Mentor",known:"What we know so far",retry:"Retry incorrect decisions",theory:"Review theory",summary:"Case summary",voiceTeacher:"Speak mentor feedback",handMap:"Sensory map",unknown:"I did not quite understand. Please clarify what you want to know.",supported:"Your inference fits the data collected so far. Which finding would test it next?",partial:"Part of the inference is reasonable, but the evidence is incomplete. What else should you clarify?",contradicted:"This inference conflicts with part of the collected data. Identify the finding that contradicts it.",uncertain:"Treat this as a hypothesis for now. What observation could test it?",diagGood:"The diagnosis and reasoning fit the localization and symptom pattern.",diagPartial:"The diagnosis may fit, but the reasoning is incomplete. Add the localization and a key finding.",diagWrong:"The diagnosis conflicts with the collected findings. Compare median and ulnar nerve territories."},
 KZ:{label:"Пациенттен не сұрағыңыз келеді?",send:"Сұрау",student:"Студент",patient:"Пациент",teacher:"Тәлімгер",known:"Қазір не белгілі",retry:"Қате шешімдерді қайталау",theory:"Теорияны қайталау",summary:"Жағдай қорытындысы",voiceTeacher:"Тәлімгер пікірін дыбыстау",handMap:"Сезімталдық картасы",unknown:"Сұрақты толық түсінбедім. Нені білгіңіз келетінін нақтылаңыз.",supported:"Қорытынды жиналған деректерге сәйкес. Оны келесі қандай белгімен тексеруге болады?",partial:"Қорытындының бір бөлігі дұрыс, бірақ дерек жеткіліксіз. Тағы нені нақтылау керек?",contradicted:"Бұл қорытынды жиналған деректердің бір бөлігіне қайшы. Қай белгі қайшы екенін табыңыз.",uncertain:"Әзірге бұл гипотеза. Оны қандай бақылаумен тексеруге болады?",diagGood:"Диагноз бен негіздеме локализация және симптомдармен сәйкес.",diagPartial:"Диагноз мүмкін, бірақ негіздеме толық емес. Локализация мен негізгі белгіні қосыңыз.",diagWrong:"Диагноз жиналған деректерге қайшы. Ортаңғы және шынтақ жүйке аймақтарын салыстырыңыз."}
} as const;

function classifyQuestion(q:string, language:Language){
 const v=q.toLowerCase();
 const groups=language==="RU"?[/пал|мизин|больш|указат|средн/,/ноч|когда|сон|время/,/ше[яи]|шей/,/слаб|держ|предмет|роня/]:
 language==="KZ"?[/саусақ|шынашақ|бармақ|сұқ|ортаңғы/,/түн|қашан|ұйқы|уақыт/,/мойын/,/әлсіз|ұста|зат/]:
 [/finger|thumb|index|middle|little|pinky/,/night|when|sleep|time/,/neck|cervical/,/weak|hold|grip|drop|object/];
 return groups.findIndex(x=>x.test(v));
}
function classifyStatement(q:string, language:Language):ReasoningLevel{
 const v=q.toLowerCase();
 const median=language==="RU"?/средин|карпал|запяст/:language==="KZ"?/ортаңғы жүйке|карпал/:/median|carpal/;
 const ulnar=language==="RU"?/локтев/:language==="KZ"?/шынтақ жүйке/:/ulnar/;
 const evidence=language==="RU"?/пал|ноч|онем/:language==="KZ"?/саусақ|түн|ұю/:/finger|night|numb/;
 if(ulnar.test(v)) return "contradicted";
 if(median.test(v)&&evidence.test(v)) return "supported";
 if(median.test(v)) return "partial";
 return "uncertain";
}

const text = {
  RU: {
    title: "Виртуальный пациент: онемение кисти",
    intro: "Учебный случай. Сначала расспросите пациента, затем выберите нужную проверку и сформулируйте рабочее предположение. На каждом шаге можно исправить решение.",
    image: "Постановочная учебная иллюстрация, созданная ИИ; это не фотография реального пациента.",
    situation: "Пациент сообщает: «У меня периодически немеет кисть». Других сведений пока нет.",
    questions: ["Какие именно пальцы немеют?", "Когда чаще возникает онемение?", "Беспокоит ли боль в шее?", "Стало ли труднее удерживать предметы?"],
    replies: ["Чаще большой, указательный и средний. Мизинец обычно не немеет.", "Обычно ночью; иногда просыпаюсь от онемения.", "Нет, боли в шее не замечал.", "Иногда мелкие предметы стало труднее удерживать."],
    tasks: ["Задайте вопросы пациенту", "Какое обследование поможет проверить предположение?", "Какой предварительный диагноз лучше объясняет данные?"],
    options: [[], ["Оценить чувствительность каждого пальца и силу мышц основания большого пальца", "Проверить только зрачковые реакции", "Отказаться от исследования чувствительности"], ["Невропатия срединного нерва в запястном канале (синдром запястного канала)", "Изолированная невропатия локтевого нерва", "Диагноз уже достоверно подтверждён одним описанием жалоб"]],
    optionFeedback: [[], ["Это наиболее информативный выбор: он проверяет распределение чувствительности и функцию мышц, связанных со срединным нервом.", "Зрачковые реакции относятся к другой функциональной системе и не объясняют локальное онемение кисти.", "Без исследования чувствительности теряются ключевые данные для нейроанатомической локализации."], ["Этот вариант лучше всего согласуется с онемением большого, указательного и среднего пальцев и ночным усилением симптомов.", "При изолированной невропатии локтевого нерва чаще ожидаются симптомы в мизинце и локтевой половине безымянного пальца.", "Описание симптомов формирует рабочую гипотезу, но само по себе не подтверждает диагноз: нужны осмотр и, при показаниях, дополнительные исследования."]],
    feedback: ["Распределение онемения по пальцам и ночное появление симптомов помогают выбрать направление обследования. Это сведения из учебного сценария, а не готовый диагноз.", "Осмотр и проверка чувствительности каждого пальца помогают сопоставить жалобы с зоной срединного нерва. В этом сценарии чувствительность большого, указательного и среднего пальцев снижена, мизинца сохранена. Одна находка не заменяет полноценную оценку.", "Лучшее предварительное предположение — синдром запястного канала: характерное распределение и ночные симптомы согласуются со сдавлением срединного нерва. Подтверждение требует клинической оценки; по одному сценарию нельзя установить степень поражения или назначить лечение."],
    examTitle: "Результаты интерактивного осмотра", examFindings: ["Большой палец: чувствительность снижена", "Указательный палец: чувствительность снижена", "Средний палец: чувствительность снижена", "Мизинец: чувствительность сохранена", "Тенар: сила слегка снижена"], localization: "Картина соответствует территории срединного нерва.", voicePatient: "Озвучить ответ пациента",
    stage: "Этап", ask: "Можно спросить своими словами или выбрать готовый вопрос", asked: "Ответ пациента", hint: "Чтобы идти дальше, сначала выясните, какие пальцы немеют и когда это происходит.", choice: "Выберите следующий шаг", correct: "Подходит", revise: "Стоит пересмотреть", next: "Дальше", previous: "Назад", result: "Посмотреть итог", explanation: "Почему так", finished: "Сценарий завершён", independent: "Верно с первой попытки", saved: "Результат сохраняется в этом браузере.", progress: "Мой прогресс", reset: "Начать заново", sources: "Учебные источники",
  },
  EN: {
    title: "Virtual patient: hand numbness",
    intro: "A teaching case. First ask the patient questions, then choose a useful examination and make a working hypothesis. You can revise your choices at each step.",
    image: "Staged AI-generated teaching illustration; this is not a photograph of a real patient.",
    situation: "The patient says: “My hand sometimes goes numb.” No other details are available yet.",
    questions: ["Which fingers go numb?", "When does the numbness occur most often?", "Do you have neck pain?", "Has it become harder to hold objects?"],
    replies: ["Mostly the thumb, index and middle finger. Usually not the little finger.", "Usually at night; sometimes it wakes me up.", "No, I have not noticed neck pain.", "Sometimes small objects have become harder to hold."],
    tasks: ["Ask the patient questions", "Which examination would help assess your hypothesis?", "Which provisional diagnosis best explains the findings?"],
    options: [[], ["Check sensation in each finger and strength at the base of the thumb", "Check only pupillary reactions", "Do not examine sensation"], ["Median neuropathy at the wrist (carpal tunnel syndrome)", "Isolated ulnar neuropathy", "The diagnosis is already proven by the symptom description alone"]],
    optionFeedback: [[], ["This is the most informative choice: it tests sensory distribution and muscle function related to the median nerve.", "Pupillary reactions assess a different functional system and do not explain focal hand numbness.", "Skipping sensory examination removes key information needed for neuroanatomical localization."], ["This option best matches numbness in the thumb, index and middle fingers with nocturnal worsening.", "Isolated ulnar neuropathy more often affects the little finger and the ulnar half of the ring finger.", "Symptoms generate a working hypothesis but do not prove a diagnosis; examination and, when indicated, further testing are required."]],
    feedback: ["The affected fingers and nocturnal pattern guide the examination. These are details of a teaching scenario, not a diagnosis by themselves.", "Examination of individual fingers helps match symptoms to the median nerve territory. In this scenario, sensation is reduced in the thumb, index and middle fingers but preserved in the little finger. One finding does not replace a full clinical evaluation.", "The best provisional diagnosis is carpal tunnel syndrome: the distribution and nocturnal symptoms fit median nerve compression. Confirmation needs clinical evaluation; this scenario cannot establish severity or determine treatment."],
    examTitle: "Interactive examination findings", examFindings: ["Thumb: reduced sensation", "Index finger: reduced sensation", "Middle finger: reduced sensation", "Little finger: sensation preserved", "Thenar muscles: mildly reduced strength"], localization: "The pattern corresponds to the median nerve territory.", voicePatient: "Speak patient response",
    stage: "Stage", ask: "Select a question to hear the answer", asked: "Patient's answer", hint: "Ask which fingers are affected and when symptoms appear before continuing.", choice: "Choose a decision", correct: "Well-supported choice", revise: "Reconsider your decision", next: "Next stage", previous: "Previous stage", result: "View result", explanation: "Explanation", finished: "Scenario completed", independent: "Correct on the first attempt", saved: "The result is saved in this browser.", progress: "My progress", reset: "Start again", sources: "Learning sources",
  },
  KZ: {
    title: "Виртуалды пациент: қолдың ұюы",
    intro: "Оқу үшін құрастырылған жағдай. Пациентке сұрақ қойыңыз, тексеруді таңдаңыз және алдын ала диагноз жасаңыз. Жауаптарды түзете аласыз.",
    image: "ЖИ жасаған қойылымдық оқу иллюстрациясы; бұл нақты пациенттің фотосы емес.",
    situation: "Пациент: «Қолым кейде ұйып қалады», – дейді. Әзірге басқа дерек жоқ.",
    questions: ["Қай саусақтар ұйиды?", "Ұю көбіне қашан пайда болады?", "Мойыныңыз ауыра ма?", "Заттарды ұстау қиындады ма?"],
    replies: ["Көбіне бас бармақ, сұқ және ортаңғы саусақ. Шынашақ әдетте ұйымаған.", "Көбіне түнде; кейде ұйқымнан оянамын.", "Жоқ, мойын ауырғанын байқамадым.", "Кейде кішкентай заттарды ұстау қиындайды."],
    tasks: ["Пациентке сұрақ қойыңыз", "Болжамыңызды тексеруге қандай зерттеу көмектеседі?", "Қандай алдын ала диагноз деректерді жақсырақ түсіндіреді?"],
    options: [[], ["Әр саусақтың сезімталдығын және бас бармақ түбіндегі бұлшықет күшін тексеру", "Тек қарашық реакциясын тексеру", "Сезімталдықты тексермеу"], ["Білезік деңгейіндегі ортаңғы жүйке невропатиясы (карпальды туннель синдромы)", "Оқшауланған шынтақ жүйкесінің невропатиясы", "Диагноз тек шағым бойынша толық дәлелденген"]],
    optionFeedback: [[], ["Бұл ең ақпаратты таңдау: ол сезімталдықтың таралуын және ортаңғы жүйкеге байланысты бұлшықет қызметін тексереді.", "Қарашық реакциялары басқа функционалдық жүйені бағалайды және қолдың жергілікті ұюын түсіндірмейді.", "Сезімталдықты тексермеу нейроанатомиялық локализация үшін маңызды деректерден айырады."], ["Бұл нұсқа бас бармақ, сұқ және ортаңғы саусақтардың ұюына және түнгі симптомдарға ең жақсы сәйкес келеді.", "Оқшауланған шынтақ жүйкесі невропатиясында шынашақ пен аты жоқ саусақтың шынтақ жақ жартысында симптомдар жиірек күтіледі.", "Симптомдар жұмыс гипотезасын қалыптастырады, бірақ диагнозды өздігінен дәлелдемейді; тексеру және қажет болса қосымша зерттеулер керек."]],
    feedback: ["Қай саусақтың ұюы және симптомдардың түнде пайда болуы зерттеу бағытын таңдауға көмектеседі. Бұл мәліметтердің өзі диагноз емес.", "Саусақтардың сезімталдығын тексеру шағымды ортаңғы жүйкенің аймағымен салыстыруға көмектеседі. Осы оқу жағдайында бас бармақтың, сұқ және ортаңғы саусақтардың сезімталдығы төмен, ал шынашақтікі сақталған. Бір белгі толық бағалауды алмастырмайды.", "Ең орынды алдын ала диагноз — карпальды туннель синдромы: саусақтардағы таралуы және түнгі симптомдар ортаңғы жүйкенің қысылуына сәйкес келеді. Растау үшін клиникалық бағалау қажет; жағдай зақым дәрежесін немесе емді анықтамайды."],
    examTitle: "Интерактивті тексеру нәтижелері", examFindings: ["Бас бармақ: сезімталдық төмендеген", "Сұқ саусақ: сезімталдық төмендеген", "Ортаңғы саусақ: сезімталдық төмендеген", "Шынашақ: сезімталдық сақталған", "Тенар: күш аздап төмендеген"], localization: "Көрініс ортаңғы жүйке аймағына сәйкес келеді.", voicePatient: "Пациент жауабын дыбыстау",
    stage: "Кезең", ask: "Жауапты есту үшін сұрақты таңдаңыз", asked: "Пациенттің жауабы", hint: "Әрі қарай өту үшін қай саусақтар ұятынын және симптомдар қашан болатынын біліңіз.", choice: "Шешімді таңдаңыз", correct: "Негізді таңдау", revise: "Шешімді қайта қараңыз", next: "Келесі кезең", previous: "Алдыңғы кезең", result: "Нәтижені көру", explanation: "Талдау", finished: "Сценарий аяқталды", independent: "Бірінші әрекеттен дұрыс", saved: "Нәтиже осы браузерде сақталады.", progress: "Менің үлгерімім", reset: "Қайта бастау", sources: "Оқу дереккөздері",
  },
} as const;

export default function VirtualPatient({ language }: { language: Language }) {
  const [progress, setProgress] = useState<PatientProgress>(emptyPatientProgress);
  const [ready, setReady] = useState(false);
  const [stage, setStage] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [dialogue, setDialogue] = useState<Array<{ question: string; reply: string; feedback?: string }>>([]);
  const [diagnosisAssessment, setDiagnosisAssessment] = useState<"good" | "partial" | "review" | null>(null);
  useEffect(() => { setProgress(readPatientProgress()); setReady(true); }, []);
  const c = text[language];
  const d = dialogueCopy[language];
  const answered = progress.answers.filter(value => value !== null).length;
  useEffect(() => {
    if (!ready || answered !== 6) return;
    const correct = progress.firstTryCorrect.filter(Boolean).length;
    recordOutcome(1, "virtual-patient", correct, 6);
    recordOutcome(1, "criterion:clinical:virtual-patient", correct, 6);
  }, [ready, answered, progress.firstTryCorrect]);
  const selected = progress.answers[stage];
  const firstIncomplete = progress.answers.findIndex(value => value === null);
  const unlockedStage = firstIncomplete < 0 ? 5 : Math.min(5, firstIncomplete);
  const stages = language === "RU" ? ["Анамнез","Осмотр","Локализация","Обследование","Диагноз","Итог"] : language === "KZ" ? ["Анамнез","Тексеру","Локализация","Зерттеу","Диагноз","Қорытынды"] : ["History","Exam","Localization","Investigation","Diagnosis","Summary"];
  const branchOptions = language === "RU" ? [[],["Исследовать чувствительность I–V пальцев","Проверить только зрачки","Сразу перейти к диагнозу"],["Срединный нерв на уровне запястья","Локтевой нерв в области локтя","Шейный корешок без дальнейшей проверки"],["ЭНМГ/исследование проводимости при необходимости подтверждения","МРТ головного мозга как первый тест","Никаких исследований никогда не требуется"],["Синдром запястного канала","Изолированная локтевая невропатия","Диагноз доказан только жалобами"],["Сопоставить анамнез, осмотр, локализацию и ограничения гипотезы","Запомнить только название диагноза","Игнорировать противоречащие признаки"]] : language === "KZ" ? [[],["I–V саусақтардың сезімталдығын тексеру","Тек қарашықтарды тексеру","Бірден диагнозға өту"],["Білек деңгейіндегі ортаңғы жүйке","Шынтақ аймағындағы шынтақ жүйкесі","Қосымша тексерусіз мойын түбірі"],["Қажет болса ЭНМГ/өткізгіштікті зерттеу","Алғашқы тест ретінде ми МРТ","Зерттеу ешқашан қажет емес"],["Карпальды туннель синдромы","Оқшауланған шынтақ невропатиясы","Диагноз тек шағыммен дәлелденген"],["Анамнез, тексеру, локализация және гипотеза шектеулерін біріктіру","Тек диагноз атауын жаттау","Қайшы белгілерді елемеу"]] : [[],["Test sensation in digits I–V","Check pupils only","Jump directly to diagnosis"],["Median nerve at the wrist","Ulnar nerve at the elbow","Cervical root without further testing"],["Nerve-conduction study/EMG if confirmation is needed","Brain MRI as the first test","No investigation is ever needed"],["Carpal tunnel syndrome","Isolated ulnar neuropathy","Symptoms alone prove the diagnosis"],["Integrate history, exam, localization, and uncertainty","Memorize only the label","Ignore conflicting findings"]];
  function update(value: PatientProgress) { setProgress(value); savePatientProgress(value); }
  function ask(index: number) {
    if (progress.asked.includes(index)) return;
    const asked = [...progress.asked, index];
    const complete = asked.includes(0) && asked.includes(1);
    update({ ...progress, asked, answers: progress.answers.map((answer, i) => i === 0 && complete ? 0 : answer), firstTryCorrect: progress.firstTryCorrect.map((correct, i) => i === 0 && progress.asked.length === 0 ? index === 0 || index === 1 : correct) });
  }
  function submitQuestion() {
    const clean = questionText.trim();
    if (!clean) return;
    const index = classifyQuestion(clean, language);
    const looksLikeStatement = /(^|\\s)(думаю|считаю|полагаю|это|диагноз|because|think|diagnosis|болуы|деп ойлаймын)(\\s|$)/i.test(clean);
    const reasoning = looksLikeStatement ? classifyStatement(clean, language) : null;
    const reply = index >= 0 ? c.replies[index] : reasoning ? d[reasoning] : d.unknown;
    setDialogue(items => [...items, { question: clean, reply, feedback: reasoning ? d[reasoning] : undefined }]);
    setQuestionText("");
    if (index >= 0) ask(index);
    speakPatient(reply);
  }
  function evaluateDiagnosis() {
    const level = classifyStatement(progress.diagnosisText, language);
    const result = level === "supported" ? "good" : level === "partial" ? "partial" : "review";
    setDiagnosisAssessment(result);
    setShowOptions(true);
  }
  function select(index: number) {
    update({ ...progress, answers: progress.answers.map((answer, i) => i === stage ? index : answer), firstTryCorrect: progress.firstTryCorrect.map((correct, i) => i === stage && progress.answers[i] === null ? index === 0 : correct) });
  }
  const [masterVolume, setMasterVolume] = useState(1);
  const [patientVolume, setPatientVolume] = useState(1);
  const [teacherVolume, setTeacherVolume] = useState(1);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem("neuro-course:voice-mixer");
    if (raw) { try { const v = JSON.parse(raw); setMasterVolume(v.master ?? 1); setPatientVolume(v.patient ?? 1); setTeacherVolume(v.teacher ?? 1); } catch {} }
  }, []);
  function saveMixer(master:number, patient:number, teacher:number) {
    setMasterVolume(master); setPatientVolume(patient); setTeacherVolume(teacher);
    if (typeof window !== "undefined") window.localStorage.setItem("neuro-course:voice-mixer", JSON.stringify({master,patient,teacher}));
  }
  function speakTeacher(reply: string) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(reply);
    utterance.lang = language === "RU" ? "ru-RU" : language === "KZ" ? "kk-KZ" : "en-US";
    utterance.rate = 0.86;
    utterance.pitch = 0.92;
    utterance.volume = Math.min(1, masterVolume * teacherVolume);
    window.speechSynthesis.speak(utterance);
  }
  function speakPatient(reply: string) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(reply);
    utterance.lang = language === "RU" ? "ru-RU" : language === "KZ" ? "kk-KZ" : "en-US";
    utterance.volume = Math.min(1, masterVolume * patientVolume);
    window.speechSynthesis.speak(utterance);
  }
  function reset() { if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel(); const cleared = emptyPatientProgress(); update(cleared); setStage(0); setShowOptions(false); setQuestionText(""); setDialogue([]); setDiagnosisAssessment(null); }
  const tb = teacherBranches[language];
  const lastAsked = progress.asked.length ? progress.asked[progress.asked.length - 1] : -1;
  const teacherNow = stage === 0
    ? (lastAsked >= 0 ? tb.history[lastAsked] : c.hint)
    : stage === 1
      ? (selected === null ? c.tasks[1] : selected === 0 ? tb.examGood : tb.examWrong)
      : stage < 4 ? (selected === null ? (language === "RU" ? "Выберите действие и объясните, проверяет ли оно вашу текущую гипотезу." : language === "KZ" ? "Әрекетті таңдап, оның гипотезаңызды тексеретінін түсіндіріңіз." : "Choose an action and explain whether it tests your current hypothesis.") : selected === 0 ? tb.examGood : tb.examWrong)
      : diagnosisAssessment === "good" ? tb.diagnosisGood
        : diagnosisAssessment === "partial" ? tb.diagnosisPartial
        : diagnosisAssessment === "review" ? tb.diagnosisWrong
        : diagnosisCopy[language].note;
  return <article className={styles.patient}>
    <h1>{c.title}</h1><p>{c.intro}</p>
    <details className={styles.voiceMixer}>
      <summary>🔊 {language === "RU" ? "Микшер голосов" : language === "KZ" ? "Дауыс микшері" : "Voice mixer"}</summary>
      <div className={styles.mixerGrid}>
        <label><span>{language === "RU" ? "Общая громкость" : language === "KZ" ? "Жалпы дыбыс" : "Master volume"}: {Math.round(masterVolume*100)}%</span><input type="range" min="0" max="1" step="0.05" value={masterVolume} onChange={e=>saveMixer(Number(e.target.value),patientVolume,teacherVolume)} /></label>
        <label><span>{d.patient}: {Math.round(patientVolume*100)}%</span><input type="range" min="0" max="1" step="0.05" value={patientVolume} onChange={e=>saveMixer(masterVolume,Number(e.target.value),teacherVolume)} /></label>
        <label><span>{d.teacher}: {Math.round(teacherVolume*100)}%</span><input type="range" min="0" max="1" step="0.05" value={teacherVolume} onChange={e=>saveMixer(masterVolume,patientVolume,Number(e.target.value))} /></label>
      </div>
      <p className={styles.mixerNote}>{language === "RU" ? "По умолчанию все каналы 100%. Итоговая громкость также зависит от системной громкости устройства и браузера." : language === "KZ" ? "Әдепкіде барлық арна 100%. Соңғы дыбыс құрылғы мен браузер дыбысына да байланысты." : "All channels default to 100%. Final loudness also depends on device and browser volume."}</p>
    </details>
    <div className={styles.clinicalDesk}>
      <figure className={`${styles.photo} ${styles.patientPanel} ${styles[`photoStage${stage}`]}`}>
        <div className={styles.stageBadge}>{c.stage} {stage + 1}</div>
        <Image src="/images/module1/virtual-patient-clinic.png" width={1536} height={1024} sizes="(max-width: 700px) 100vw, 340px" alt={language === "RU" ? "Пациентка в неврологическом кабинете" : language === "KZ" ? "Неврологиялық кабинеттегі пациент" : "Patient in a neurology examination room"} />
        <figcaption>{c.image}</figcaption>
      </figure>
      <div className={`${styles.work} ${styles.studentPanel}`}>
        <p className={styles.situation}>{c.situation}</p>
        <nav className={styles.stageNav} aria-label={c.stage}>{stages.map((name,i)=>{const locked=!ready||i>unlockedStage;return <button key={name} type="button" className={i===stage?styles.activeStage:undefined} data-locked={locked||undefined} aria-disabled={locked} title={locked?(language==="RU"?"Сначала завершите предыдущий этап":language==="KZ"?"Алдымен алдыңғы кезеңді аяқтаңыз":"Complete the previous stage first"):undefined} onClick={()=>{if(!locked)setStage(i)}}><span>{i+1}</span><b>{name}</b>{locked&&<i aria-hidden="true">🔒</i>}</button>})}</nav><p className={styles.stageHelp}>{language==="RU"?"Этапы открываются по порядку. Завершите текущий этап, чтобы открыть следующий.":language==="KZ"?"Кезеңдер ретімен ашылады. Келесі кезеңді ашу үшін ағымдағы кезеңді аяқтаңыз.":"Stages open in order. Complete the current stage to unlock the next one."}</p>
        <p className={styles.counter}>{c.stage} {stage + 1} / 6 · {answered} / 6</p>
        <progress value={answered} max={6} aria-label={c.stage} />
        <h2>{stage===0?c.tasks[0]:stages[stage]}</h2>
        {stage === 4 && <div>
          <VoiceTextarea language={language} label={diagnosisCopy[language].label} rows={4} maxLength={5000} value={progress.diagnosisText} disabled={!ready} onValue={text => update({ ...progress, diagnosisText: text })} />
          <p>{diagnosisCopy[language].note}</p>
          {!showOptions && selected === null && <button type="button" disabled={!progress.diagnosisText.trim()} onClick={evaluateDiagnosis}>{diagnosisCopy[language].compare}</button>}
          {diagnosisAssessment && <div className={styles.teacherDecision} role="status"><strong>{d.teacher}:</strong><p>{teacherNow}</p><button type="button" onClick={() => speakTeacher(teacherNow)}>🔊 {d.voiceTeacher}</button></div>}
        </div>}
        {stage === 0 ? <div>
          <VoiceTextarea language={language} label={d.label} rows={2} maxLength={500} value={questionText} disabled={!ready} onValue={setQuestionText} />
          <button type="button" disabled={!questionText.trim()} onClick={submitQuestion}>{d.send}</button>
          {dialogue.length > 0 && <div className={styles.dialogue} aria-live="polite">{dialogue.map((turn,i)=><div key={i}><p><strong>{d.student}:</strong> {turn.question}</p><p><strong>{d.patient}:</strong> {turn.reply}</p>{turn.feedback && <div className={styles.teacherFeedback}><Image className={styles.teacherAvatarImage} src="/images/module1/virtual-mentor-clinic.png" width={96} height={96} alt=""/><div><p><strong>{d.teacher}:</strong> {turn.feedback}</p><button type="button" onClick={() => speakTeacher(turn.feedback!)}>🔊 {d.voiceTeacher}</button></div></div>}</div>)}</div>}

          {progress.asked.length > 0 && <aside className={styles.findings}><strong>{d.known}:</strong><ul>{progress.asked.map(i => <li key={i}>{c.replies[i]}</li>)}</ul></aside>}
          <p>{c.ask}</p>
          <div className={styles.questions}>{c.questions.map((question, i) => <div key={question}>
            <button type="button" disabled={!ready || progress.asked.includes(i)} onClick={() => ask(i)}>{question}</button>
            {progress.asked.includes(i) && <div><p><strong>{c.asked}:</strong> {c.replies[i]}</p><button type="button" onClick={() => speakPatient(c.replies[i])}>🔊 {c.voicePatient}</button></div>}
          </div>)}</div>
          {selected === null && <p>{c.hint}</p>}
        </div> : (stage !== 4 || showOptions || selected !== null) && <fieldset disabled={!ready}>
          <legend>{c.choice}</legend>
          {branchOptions[stage].map((option, index) => <label key={option} className={selected === index ? styles.selected : undefined}>
            <input type="radio" name={`patient-${stage}`} checked={selected === index} onChange={() => select(index)} /> {option}
          </label>)}
        </fieldset>}
        {stage >= 1 && stage <= 3 && selected === 0 && <section className={styles.examMap}><h3>{c.examTitle}</h3>
          <div className={styles.handVisual} aria-label={d.handMap}>
            <svg className={styles.handSvg} viewBox="0 0 300 360" role="img" aria-label={d.handMap}>
              <path className={styles.handBase} d="M92 330 C75 285 69 246 72 205 L67 123 C66 108 76 99 88 101 C99 103 103 112 104 124 L108 180 L113 67 C114 51 124 42 137 44 C149 46 154 56 153 70 L151 173 L160 48 C162 31 173 22 186 25 C199 28 203 39 201 54 L190 176 L205 73 C208 57 219 49 232 53 C244 57 247 68 244 82 L224 190 L238 126 C242 112 254 106 266 111 C277 116 279 128 274 141 L250 218 C243 244 235 278 224 330 Z"/>
              <path className={styles.medianZone} d="M109 181 L113 67 C114 51 124 42 137 44 C149 46 154 56 153 70 L151 173 L160 48 C162 31 173 22 186 25 C199 28 203 39 201 54 L190 176 L205 73 C208 57 219 49 232 53 C244 57 247 68 244 82 L224 190 C214 209 202 225 187 239 C164 260 137 263 111 245 Z"/>
              <path className={styles.thenarZone} d="M91 219 C101 191 125 180 145 193 C158 203 157 226 143 244 C127 264 105 266 91 250 Z"/>
              <path className={styles.carpalZone} d="M103 278 Q158 258 220 278 L216 302 Q160 286 99 302 Z"/>
              <text x="151" y="294" className={styles.svgLabel}>Median nerve / carpal tunnel</text>
              <circle className={styles.pulsePoint} cx="159" cy="288" r="8"/>
            </svg>
            <div className={styles.sensoryLegend}><span className={styles.affected}>I–III ↓</span><span className={styles.preserved}>V ✓</span></div>
          </div>
          <div className={styles.findingGrid}>{c.examFindings.map((finding, index) => <div key={finding} className={index === 3 ? styles.preserved : styles.affected}>{finding}</div>)}</div><p><strong>{c.localization}</strong></p></section>}
        {selected !== null && <div className={styles.feedback} role="status" aria-live="polite">
          {stage > 0 && <strong>{selected === 0 ? c.correct : c.revise}</strong>}<div className={styles.inlineMentor}><strong>{d.teacher}:</strong> {teacherNow} <button type="button" onClick={() => speakTeacher(teacherNow)}>🔊</button></div>
          <h3>{c.explanation}</h3>{stage > 0 && stage < 3 && <p>{c.optionFeedback[stage][selected]}</p>}<p>{stage < 3 ? c.feedback[stage] : teacherNow}</p>
        </div>}
        <div className={styles.actions}>
          <button type="button" onClick={() => setStage(value => value - 1)} disabled={stage === 0}>{c.previous}</button>
          {stage < 5 ? <button type="button" onClick={() => setStage(value => value + 1)} disabled={selected === null}>{c.next}</button> : answered === 6 ? <Link href={`/modules/1/progress?lang=${language}`}>{c.result}</Link> : null}
        </div>
      </div>
      <aside className={styles.teacherPanel} aria-live="polite">
        <div className={styles.teacherVisual}><Image src="/images/module1/virtual-mentor-clinic.png" width={1456} height={1024} sizes="(max-width: 700px) 100vw, 290px" alt={language === "RU" ? "Виртуальный клинический преподаватель" : language === "KZ" ? "Виртуалды клиникалық оқытушы" : "Virtual clinical teacher"} /></div>
        <div className={styles.teacherIdentity}><strong>{d.teacher}</strong><span>{language === "RU" ? "Клинический наставник" : language === "KZ" ? "Клиникалық тәлімгер" : "Clinical mentor"}</span></div>
        <div className={styles.teacherBubble}><p>{teacherNow}</p></div>
        <button type="button" className={styles.mentorVoice} onClick={() => speakTeacher(teacherNow)}>🔊 {d.voiceTeacher}</button>
        <div className={styles.branchTrail}><strong>{language === "RU" ? "Текущая ветвь" : language === "KZ" ? "Ағымдағы тармақ" : "Current branch"}</strong>
          <span className={stage === 0 ? styles.activeBranch : ""}>{language === "RU" ? "Анамнез" : language === "KZ" ? "Анамнез" : "History"}</span>
          <span className={stage === 1 ? styles.activeBranch : ""}>{language === "RU" ? "Локализация и осмотр" : language === "KZ" ? "Локализация және тексеру" : "Localization & exam"}</span>
          <span className={stage >= 2 ? styles.activeBranch : ""}>{language === "RU" ? "Локализация → обследование → диагноз → итог" : language === "KZ" ? "Диагностикалық пайым" : "Diagnostic reasoning"}</span>
        </div>
      </aside>
    </div>
    {answered === 6 && <section role="status" className={styles.finished}><h3>{d.summary}</h3><p>{diagnosisAssessment === "good" ? d.diagGood : diagnosisAssessment === "partial" ? d.diagPartial : d.diagWrong}</p><button type="button" onClick={() => speakTeacher(diagnosisAssessment === "good" ? d.diagGood : diagnosisAssessment === "partial" ? d.diagPartial : d.diagWrong)}>🔊 {d.voiceTeacher}</button><p>{c.independent}: {progress.firstTryCorrect.filter(Boolean).length} / 6. {c.saved}</p><div className={styles.actions}><button type="button" onClick={() => { const wrong = progress.firstTryCorrect.map((v,i)=>v?null:i).filter(v=>v!==null) as number[]; const cleared = emptyPatientProgress(); update({...cleared, asked: wrong.includes(0)?[]:progress.asked}); setStage(wrong[0] ?? 0); setShowOptions(false); setDiagnosisAssessment(null); }}>{d.retry}</button><Link href={`/modules/1/theory?lang=${language}`}>{d.theory}</Link><Link href={`/modules/1/progress?lang=${language}`}>{c.progress}</Link></div></section>}
    <button type="button" className={styles.reset} onClick={reset}>{c.reset}</button>
    <p className={styles.sources}>{c.sources}: <a href="https://www.niams.nih.gov/health-topics/carpal-tunnel-syndrome" target="_blank" rel="noopener noreferrer">NIAMS</a> · <a href="https://orthoinfo.aaos.org/globalassets/pdfs/plain-language-summary_carpal-tunnel-syndrome-2024.pdf" target="_blank" rel="noopener noreferrer">AAOS</a></p>
  </article>;
}
