import type { Language } from "./course";
import { getVirtualPatientScenario } from "./virtual-patients";
import { moduleThreeWrongChoices } from "./module-three-virtual-patient-choices";
import { reviewModuleFourVirtualPatient } from "./course-foundation/module-four-virtual-patient-review";
import { reviewModuleFiveVirtualPatient } from "./course-foundation/module-five-virtual-patient-review";
import { reviewModuleSixVirtualPatient } from "./course-foundation/module-six-virtual-patient-review";
import { reviewModuleSevenVirtualPatient } from "./course-foundation/module-seven-virtual-patient-review";
import { reviewModuleEightVirtualPatient } from "./course-foundation/module-eight-virtual-patient-review";

// Review layer for module 3 only. Other module scenarios are unchanged.
// Ganong 23e, chapter 4: astrocytic K+ buffering, CNS myelin and microglia.
const prompts: Record<Language, string[]> = {
 RU: [
  "После стимуляции временно повысился внеклеточный K⁺. Как проверить динамику ответа?",
  "При равной стимуляции ослаблен захват K⁺ астроцитами. Что сравнить?",
  "Повышенный K⁺ деполяризует мембрану. Как объяснить изменение возбудимости?",
  "Как изолировать роль астроцитарного захвата K⁺ в компьютерном опыте?",
  "Как отделить первичный дефект нейрона от изменения глиальной среды?",
  "Как корректно распределить функции астроцитов, олигодендроцитов и микроглии?"
 ],
 EN: [
  "Extracellular K⁺ rose transiently after stimulation. How should its response be tested?",
  "Astrocytic K⁺ uptake is reduced under matched stimulation. What should be compared?",
  "Elevated K⁺ depolarizes the membrane. How should excitability changes be explained?",
  "How can astrocytic K⁺ uptake be isolated in this computer experiment?",
  "How can an intrinsic neuronal defect be distinguished from a glial-environment effect?",
  "How should the roles of astrocytes, oligodendrocytes and microglia be distinguished?"
 ],
 KZ: [
  "Стимуляциядан кейін жасушадан тыс K⁺ уақытша артты. Жауап динамикасын қалай тексеруге болады?",
  "Бірдей стимуляция кезінде астроциттердің K⁺ қармауы төмендеді. Нені салыстыру керек?",
  "K⁺ жоғарылауы мембрананы деполяризациялайды. Қозғыштық өзгерісін қалай түсіндіруге болады?",
  "Компьютерлік тәжірибеде астроциттердің K⁺ қармауының рөлін қалай оқшаулау керек?",
  "Нейронның бастапқы ақауын глиялық орта әсерінен қалай ажыратуға болады?",
  "Астроциттер, олигодендроциттер және микроглия қызметтерін қалай ажыратуға болады?"
 ]
};
// Six experimentally meaningful choices. The base scenario used broad, often
// tautological decisions; keep the reviewed wording aligned with each stage's task.
// These are actions in a computer teaching model, not measurements on a patient.
const moduleThreeCorrectChoices: Record<Language, [string,string,string,string,string,string]> = {
 RU: [
  "Измерить внеклеточный K⁺ до стимуляции и в нескольких точках времени после одинаковых серий стимулов",
  "Сравнить кривые восстановления внеклеточного K⁺ при нормальном и ослабленном астроцитарном захвате, не меняя стимул",
  "Сопоставить мембранный потенциал и частоту разрядов с K⁺, учитывая возможную инактивацию Na⁺-каналов",
  "Менять только астроцитарный захват K⁺, удерживая стимуляцию, температуру и свойства нейрона постоянными",
  "Проверить эффект при неизменных свойствах нейрона и признать, что модель не исключает другие причины",
  "Разделить функции: астроциты регулируют K⁺, олигодендроциты образуют миелин ЦНС, микроглия обеспечивает иммунный надзор"
 ],
 EN: [
  "Measure extracellular K⁺ before and at several time points after identical stimulus trains",
  "Compare extracellular K⁺ recovery curves with normal versus reduced astrocytic uptake under matched stimulation",
  "Compare membrane potential and firing rate with K⁺ changes, allowing for possible Na⁺-channel inactivation",
  "Change only astrocytic K⁺ uptake while holding stimulation, temperature and neuronal properties constant",
  "Test the effect with neuronal properties fixed and acknowledge that the model cannot exclude other causes",
  "Distinguish roles: astrocytes regulate K⁺, oligodendrocytes form CNS myelin, and microglia provide immune surveillance"
 ],
 KZ: [
  "Бірдей стимулдар сериясына дейін және одан кейін бірнеше уақыт нүктесінде жасушадан тыс K⁺ деңгейін өлшеу",
  "Стимуляцияны өзгертпей, астроциттік K⁺ қармауы қалыпты және төмен жағдайлардағы K⁺ қалпына келу қисықтарын салыстыру",
  "Na⁺ арналарының ықтимал инактивациясын ескеріп, мембраналық потенциал мен разряд жиілігін K⁺ өзгерісімен салыстыру",
  "Стимуляцияны, температураны және нейрон қасиеттерін тұрақты ұстап, тек астроциттік K⁺ қармауын өзгерту",
  "Нейрон қасиеттерін өзгертпей әсерді тексеру және модель басқа себептерді жоққа шығармайтынын мойындау",
  "Қызметтерді ажырату: астроциттер K⁺ реттейді, олигодендроциттер ОЖЖ миелинін түзеді, микроглия иммундық қадағалайды"
 ]
};
const appropriate: Record<Language,string> = {
 RU:"Выбор соответствует задаче данного этапа. Следующие данные заданы учебной моделью заранее и не вызваны нажатием кнопки.",
 EN:"This choice addresses the stage question. The next data are predefined in the teaching model, not caused by pressing the button.",
 KZ:"Бұл таңдау кезеңнің сұрағына сәйкес. Келесі деректер оқу моделінде алдын ала берілген, батырманы басу оларды тудырмайды."
};

const correction: Record<Language,string> = {
 RU:"Этот выбор не проверяет вопрос данного этапа. Далее показаны заранее заданные данные учебной модели, а не результат выбранного действия.",
 EN:"This choice does not test the stage question. The next data are predetermined by the teaching model, not caused by the selected action.",
 KZ:"Бұл таңдау осы кезеңнің сұрағын тексермейді. Келесі деректер таңдалған әрекеттен туындамайды, оқу моделінде алдын ала берілген."
};
const labMentor: Record<Language,string[]> = {
 RU: [
  "Сравните K⁺ во времени при одинаковой стимуляции.",
  "Сопоставьте контроль и ослабленный захват K⁺ при равных условиях.",
  "Повышенный внеклеточный K⁺ обычно деполяризует мембрану; умеренное изменение может повысить возбудимость, но длительная сильная деполяризация инактивирует Na⁺-каналы и снижает способность генерировать импульсы.",
  "Меняйте только захват K⁺; температуру и стимул удерживайте постоянными.",
  "Результат модели поддерживает гипотезу, но не исключает другие механизмы.",
  "Астроциты регулируют K⁺, олигодендроциты образуют миелин ЦНС, микроглия участвует в иммунной защите."
 ],
 EN: [
  "Compare the K⁺ time course under matched stimulation.",
  "Compare control and reduced K⁺ uptake under identical conditions.",
  "Elevated extracellular K⁺ generally depolarizes neurons. A moderate increase may raise excitability, whereas strong sustained depolarization may inactivate voltage-gated Na⁺ channels and reduce the ability to fire. The result depends on concentration, duration and cell type.",
  "Change only K⁺ uptake; hold temperature and stimulation constant.",
  "The model supports a hypothesis but cannot exclude other mechanisms.",
  "Astrocytes regulate K⁺, oligodendrocytes form CNS myelin, and microglia provide immune defense."
 ],
 KZ: [
  "Стимуляция бірдей кезде K⁺ деңгейінің уақыттық өзгерісін салыстырыңыз.",
  "Бақылау мен K⁺ қармауы төмендеген жағдайды бірдей шарттарда салыстырыңыз.",
  "Жасушадан тыс K⁺ жоғарылауы нейрон мембранасын әдетте деполяризациялайды. Орташа өзгеріс қозғыштықты арттыруы мүмкін, ал күшті әрі ұзақ деполяризация кернеуге тәуелді Na⁺ арналарының бір бөлігін инактивациялап, импульс түзу қабілетін төмендетуі мүмкін. Нәтиже концентрацияға, әсер ұзақтығына және жасуша түріне тәуелді.",
  "Тек K⁺ қармауын өзгертіңіз; температура мен стимуляция тұрақты болсын.",
  "Модель гипотезаны қолдайды, бірақ өзге механизмдерді жоққа шығармайды.",
  "Астроциттер K⁺ реттейді, олигодендроциттер ОЖЖ миелинін түзеді, микроглия иммундық қорғауға қатысады."
 ]
};
export function getReviewedVirtualPatientScenario(moduleId:number, language:Language) {
 const base=getVirtualPatientScenario(moduleId,language);
 if(moduleId===4 && base) return reviewModuleFourVirtualPatient(base,language);
 if(moduleId===5 && base) return reviewModuleFiveVirtualPatient(base,language);
 if(moduleId===6 && base) return reviewModuleSixVirtualPatient(base,language);
 if(moduleId===7 && base) return reviewModuleSevenVirtualPatient(base,language);
 if(moduleId===8 && base) return reviewModuleEightVirtualPatient(base,language);
 if(moduleId!==3 || !base) return base;
 if(base.stages.length!==6 || moduleThreeWrongChoices[language].length!==6 || prompts[language].length!==6)
   throw new Error("Module 3 virtual-model stages must remain six");
 return {...base,stages:base.stages.map((stage,index)=>({
   ...stage,
   task:prompts[language][index],
   mentorPrompt:labMentor[language][index],
   mechanism:labMentor[language][index],
   // Strip patient-examination prefixes from a computer-model observation.
   newData:stage.newData.replace(/^[^:]+:\s*/, ""),
   options:stage.options.map(option=>{
     const decision=option.id.split("-decision-")[1];
     if(decision==="1") return {...option,text:moduleThreeCorrectChoices[language][index],response:appropriate[language],feedback:labMentor[language][index]};
     if(decision!=="2" && decision!=="3") return option;
     return {...option,text:moduleThreeWrongChoices[language][index][Number(decision)-2],response:correction[language],feedback:labMentor[language][index]};
   }) as typeof stage.options
 }))};
}
