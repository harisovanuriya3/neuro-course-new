import type { Language } from "./course";
type Item={prompt:string;correct:string;wrong:[string,string,string];explanation:string};
const items:Record<Language,Item[]>={
RU:[
{prompt:"При касании горячей поверхности рука отдёргивается до осознанного восприятия боли. Какая последовательность объясняет ответ?",correct:"Афферентный сигнал поступает в спинальные цепи, которые активируют эфферентные мотонейроны.",wrong:["Сначала кора принимает сознательное решение, затем активируются рецепторы.","Скелетная мышца самостоятельно определяет температуру.","Эфферентные волокна передают сигнал от кожи к спинному мозгу."],explanation:"Защитный сгибательный рефлекс может запускаться спинальными цепями до осознанного восприятия боли."},
{prompt:"После повреждения чувствительного нерва защитный рефлекс ослаб, хотя мышца и двигательный нерв сохранны. Почему?",correct:"Недостаточный афферентный вход не активирует соответствующие спинальные рефлекторные цепи.",wrong:["Чувствительные нервы не участвуют в рефлексах.","Сохранная мышца гарантирует сохранность любого рефлекса.","Чувствительный нерв в норме передаёт команду к мышце."],explanation:"Для рефлекторного ответа нужны рецепторный вход, центральная интеграция и эфферентный выход."}
],
EN:[
{prompt:"A hand withdraws from a hot surface before pain is consciously perceived. Which sequence explains the response?",correct:"Afferent input reaches spinal circuits that activate efferent motor neurons.",wrong:["The cortex first makes a conscious decision, then receptors are activated.","Skeletal muscle independently detects the temperature.","Efferent fibers carry signals from skin to the spinal cord."],explanation:"Spinal withdrawal circuits can generate a protective response before conscious pain perception."},
{prompt:"After sensory-nerve damage, a protective reflex weakens although the muscle and motor nerve are intact. Why?",correct:"Insufficient afferent input fails to activate the relevant spinal reflex circuits.",wrong:["Sensory nerves do not participate in reflexes.","An intact muscle guarantees every reflex remains normal.","A sensory nerve normally carries motor commands to muscle."],explanation:"Reflexes require receptor input, central integration and efferent output."}
],
KZ:[
{prompt:"Ыстық бетке тигенде қол ауырсынуды саналы сезінгенге дейін тартылады. Бұл жауапты қандай реттілік түсіндіреді?",correct:"Афференттік сигнал жұлын тізбектеріне жетіп, эфференттік мотонейрондарды белсендіреді.",wrong:["Алдымен қыртыс саналы шешім қабылдайды, содан кейін рецепторлар белсендіріледі.","Қаңқа бұлшықеті температураны өздігінен анықтайды.","Эфференттік талшықтар сигналды теріден жұлынға жеткізеді."],explanation:"Жұлындағы қорғаныш рефлекс тізбектері ауырсынуды саналы қабылдауға дейін жауап тудыруы мүмкін."},
{prompt:"Сезімтал жүйке зақымданғаннан кейін бұлшықет пен қозғалтқыш жүйке сақталса да қорғаныш рефлексі әлсіреді. Неліктен?",correct:"Афференттік кіріс жеткіліксіз болғандықтан тиісті жұлын рефлекс тізбектері белсенбейді.",wrong:["Сезімтал жүйкелер рефлекстерге қатыспайды.","Бұлшықет сақталса, кез келген рефлекс міндетті түрде сақталады.","Сезімтал жүйке қалыптыда бұлшықетке қозғалыс бұйрығын жеткізеді."],explanation:"Рефлекске рецепторлық кіріс, орталық интеграция және эфференттік шығыс қажет."}
]
};
export const firstModuleReviewed=(lang:Language):Item[]=>items[lang];
