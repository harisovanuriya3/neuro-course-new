import type { Language, Lesson } from "../../types";

const data: Record<Language, Lesson> = {
RU: {
 title:"2. История изучения и методы исследования",
 sections:[
  {id:"history",title:"От эксперимента к регистрации функций",blocks:[
   {type:"paragraph",text:"Развитие нейрофизиологии шло от наблюдения и вмешательств — раздражения, разрушения, экстирпации и функциональной блокады — к неинвазивной регистрации активности нервной системы. Исторический метод ценен не сам по себе: студент должен понимать, какой вопрос он позволял проверить и какие ограничения имел."},
   {type:"callout",title:"Принцип выбора метода",text:"Сначала формулируют физиологический вопрос, затем выбирают измеряемый сигнал. Ни один метод не показывает одновременно электрическую активность, анатомию, причинность и поведение."}]},
  {id:"eeg",title:"Электроэнцефалография (ЭЭГ)",blocks:[
   {type:"paragraph",text:"ЭЭГ регистрирует разности потенциалов на коже головы, возникающие главным образом вследствие синхронной постсинаптической активности больших популяций корковых нейронов. Сигнал зависит от функционального состояния, расположения электродов, референса и артефактов."},
   {type:"list",items:["Высокое временное разрешение позволяет отслеживать быстрые изменения активности.","Альфа-, бета-, тета- и дельта-диапазоны описывают частотные компоненты записи, но отдельный ритм нельзя автоматически превращать в диагноз.","Движения глаз, мышечная активность, плохой контакт электродов и сетевые помехи могут имитировать изменения ЭЭГ."]}]},
  {id:"evoked",title:"Вызванные потенциалы",blocks:[
   {type:"paragraph",text:"Вызванный потенциал — электрический ответ нервной системы, временно связанный с контролируемым зрительным, слуховым или соматосенсорным стимулом. Повторные ответы усредняют, чтобы выделить стимул-связанный компонент из фоновой ЭЭГ."},
   {type:"callout",title:"Сравните с ЭЭГ",text:"Спонтанная ЭЭГ описывает текущую электрическую активность; вызванный потенциал отвечает на более узкий вопрос — как система реагирует на определённый стимул и с какой латентностью."}]},
  {id:"stereotaxis",title:"Стереотаксический подход и методы вмешательства",blocks:[
   {type:"paragraph",text:"Стереотаксический подход использует систему пространственных координат для точного доступа к заданной структуре. В экспериментальной физиологии раздражение, локальное выключение или повреждение помогали проверять причинную роль структур, однако интерпретация зависит от точности вмешательства и сетевых эффектов."}]},
  {id:"reg",title:"Реоэнцефалография: что именно измеряется",blocks:[
   {type:"paragraph",text:"При изучении реоэнцефалографии и анализе реограммы важно отделять электрический импеданс тканей и его пульсовые изменения от прямого измерения мозгового кровотока; выводы метода следует формулировать осторожно."}]},
  {id:"choice",title:"Как сопоставлять методы",blocks:[
   {type:"list",items:["ЭЭГ: когда меняется электрическая активность?","Вызванные потенциалы: как система отвечает на контролируемый стимул?","Структурная визуализация: как выглядит анатомия?","Стереотаксическое вмешательство: как проверяется причинная роль конкретной области?","Любой метод: какие артефакты, альтернативные объяснения и границы вывода?"]},
   {type:"callout",title:"Клиническое мышление",text:"Нормальная или изменённая запись — это наблюдение. Диагностическая интерпретация требует клинического контекста и не должна строиться по одному признаку."}]}
 ],
 outcomes:{title:"После модуля студент сможет",introduction:"Не перечислить методы, а выбрать и обосновать метод под физиологический вопрос.",items:["Сравнить ЭЭГ и вызванные потенциалы.","Объяснить назначение стереотаксического метода.","Распознать типичные источники артефактов ЭЭГ.","Разделить измеряемый сигнал и клиническую интерпретацию.","Назвать ограничение вывода для каждого метода."]},
 terms:{title:"Ключевые термины",items:["ЭЭГ","вызванный потенциал","латентность","амплитуда","артефакт","монтаж электродов","стереотаксис","реоэнцефалография"]}
},
EN: {
 title:"2. History and methods of neurophysiological investigation",
 sections:[
  {id:"history",title:"From intervention to functional recording",blocks:[{type:"paragraph",text:"Neurophysiology developed from observation, stimulation, lesions, extirpation and functional blockade toward non-invasive recording. The key question is not merely what a method is called, but what physiological question it can test and what it cannot establish."},{type:"callout",title:"Method-selection rule",text:"Define the physiological question first, then select the signal to measure. No single method simultaneously provides electrical activity, anatomy, causality and behavior."}]},
  {id:"eeg",title:"Electroencephalography (EEG)",blocks:[{type:"paragraph",text:"EEG records scalp potential differences generated largely by synchronized postsynaptic activity in populations of cortical neurons. The signal depends on functional state, electrode placement, reference and artifacts."},{type:"list",items:["High temporal resolution captures rapid changes.","Alpha, beta, theta and delta describe frequency components; a rhythm alone is not a diagnosis.","Eye movement, muscle activity, poor electrode contact and electrical interference can contaminate the record."]}]},
  {id:"evoked",title:"Evoked potentials",blocks:[{type:"paragraph",text:"An evoked potential is an electrical response time-locked to a controlled visual, auditory or somatosensory stimulus. Repeated responses are averaged to separate stimulus-related activity from background EEG."},{type:"callout",title:"Compare with EEG",text:"Spontaneous EEG describes ongoing activity; an evoked potential asks how the system responds to a defined stimulus and with what latency."}]},
  {id:"stereotaxis",title:"Stereotaxis and intervention methods",blocks:[{type:"paragraph",text:"Stereotaxis uses spatial coordinates for precise access to a target. Stimulation, reversible inactivation and lesions can test causal contributions, but interpretation depends on targeting accuracy and network effects."}]},
  {id:"reg",title:"Rheoencephalography: measured signal",blocks:[{type:"paragraph",text:"When studying rheoencephalography and interpreting a rheogram, distinguish pulsatile tissue-impedance changes from a direct measurement of cerebral blood flow and state conclusions cautiously."}]},
  {id:"choice",title:"Matching method to question",blocks:[{type:"list",items:["EEG: when does electrical activity change?","Evoked potentials: how does the system respond to a controlled stimulus?","Structural imaging: what is the anatomy?","Stereotactic intervention: what causal role does a target region have?","Every method: what artifacts and alternative explanations remain?"]}]}
 ],
 outcomes:{title:"Learning outcomes",introduction:"Select and justify a method rather than merely list methods.",items:["Compare EEG with evoked potentials.","Explain the purpose of stereotaxis.","Recognize common EEG artifacts.","Separate measurement from clinical interpretation.","State a limit of inference for each method."]},
 terms:{title:"Key terms",items:["EEG","evoked potential","latency","amplitude","artifact","electrode montage","stereotaxis","rheoencephalography"]}
},
KZ: {
 title:"2. Нейрофизиологияны зерттеу тарихы мен әдістері",
 sections:[
  {id:"history",title:"Эксперименттен функцияны тіркеуге дейін",blocks:[{type:"paragraph",text:"Нейрофизиология бақылау, тітіркендіру, зақымдау, экстирпация және функционалдық блокададан инвазивті емес тіркеу әдістеріне дейін дамыды. Негізгі міндет — әдістің атауын білу емес, оның қандай физиологиялық сұраққа жауап беретінін және қандай қорытынды жасауға болмайтынын түсіну."},{type:"callout",title:"Әдісті таңдау қағидасы",text:"Алдымен физиологиялық сұрақты анықтаңыз, содан кейін өлшенетін сигналды таңдаңыз. Бір әдіс электр белсенділігін, анатомияны, себептілікті және мінез-құлықты бір уақытта толық көрсетпейді."}]},
  {id:"eeg",title:"Электроэнцефалография (ЭЭГ)",blocks:[{type:"paragraph",text:"ЭЭГ бас терісіндегі потенциалдар айырмасын тіркейді; сигналға қыртыс нейрондары популяцияларының синхронды постсинапстық белсенділігі елеулі үлес қосады. Жазба функционалдық күйге, электродтардың орналасуына, референске және артефактілерге тәуелді."},{type:"list",items:["Жоғары уақыттық ажыратымдылық жылдам өзгерістерді көрсетеді.","Альфа, бета, тета және дельта — жиілік компоненттері; бір ырғақ өздігінен диагноз емес.","Көз қозғалысы, бұлшықет белсенділігі және электрод контактісінің нашарлығы артефакт туғызады."]}]},
  {id:"evoked",title:"Шақырылған потенциалдар",blocks:[{type:"paragraph",text:"Шақырылған потенциал — бақыланатын көру, есту немесе соматосенсорлық стимулмен уақыт бойынша байланысқан электрлік жауап. Қайталанған жауаптарды орташалау стимулға байланысты компонентті фондық ЭЭГ-ден бөлуге көмектеседі."}]},
  {id:"stereotaxis",title:"Стереотаксис және араласу әдістері",blocks:[{type:"paragraph",text:"Стереотаксис нысана құрылымға дәл жету үшін кеңістіктік координаттарды қолданады. Тітіркендіру, уақытша ажырату және зақымдау себептік рөлді тексеруге көмектеседі, бірақ қорытынды нысананың дәлдігі мен желілік әсерлерге тәуелді."}]},
  {id:"reg",title:"Реоэнцефалография",blocks:[{type:"paragraph",text:"Реоэнцефалографияны оқып, реограмманы талдағанда тіндердің электрлік импедансының пульстік өзгерістерін ми қан ағымын тікелей өлшеуден ажырату және қорытындыны сақтықпен тұжырымдау маңызды."}]},
  {id:"choice",title:"Әдісті сұрақпен сәйкестендіру",blocks:[{type:"list",items:["ЭЭГ: электр белсенділігі қашан өзгереді?","Шақырылған потенциал: бақыланатын стимулға жауап қандай?","Құрылымдық бейнелеу: анатомия қандай?","Стереотаксиялық араласу: аймақтың себептік рөлі қандай?","Әр әдісте қандай артефакт пен балама түсіндіру қалады?"]}]}
 ],
 outcomes:{title:"Оқу нәтижелері",introduction:"Әдістерді жай атау емес, физиологиялық сұраққа сай таңдап негіздеу.",items:["ЭЭГ мен шақырылған потенциалдарды салыстыру.","Стереотаксистің мақсатын түсіндіру.","ЭЭГ артефактілерін тану.","Өлшеуді клиникалық түсіндіруден ажырату.","Әр әдістің қорытынды шектеуін көрсету."]},
 terms:{title:"Негізгі терминдер",items:["ЭЭГ","шақырылған потенциал","латенттілік","амплитуда","артефакт","электрод монтажы","стереотаксис","реоэнцефалография"]}
}};
export default data;
