import type { Language } from "./course";
import { getVirtualPatientScenario } from "./virtual-patients";
import { moduleThreeWrongChoices } from "./module-three-virtual-patient-choices";

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
const correction: Record<Language,string> = {
 RU:"Этот выбор не проверяет вопрос данного этапа. Далее показаны заранее заданные данные учебной модели, а не результат выбранного действия.",
 EN:"This choice does not test the stage question. The next data are predetermined by the teaching model, not caused by the selected action.",
 KZ:"Бұл таңдау осы кезеңнің сұрағын тексермейді. Келесі деректер таңдалған әрекеттен туындамайды, оқу моделінде алдын ала берілген."
};
export function getReviewedVirtualPatientScenario(moduleId:number, language:Language) {
 const base=getVirtualPatientScenario(moduleId,language);
 if(moduleId!==3 || !base) return base;
 if(base.stages.length!==6 || moduleThreeWrongChoices[language].length!==6 || prompts[language].length!==6)
   throw new Error("Module 3 virtual-model stages must remain six");
 return {...base,stages:base.stages.map((stage,index)=>({
   ...stage,
   task:prompts[language][index],
   options:stage.options.map(option=>{
     const decision=option.id.split("-decision-")[1];
     if(decision!=="2" && decision!=="3") return option;
     return {...option,text:moduleThreeWrongChoices[language][index][Number(decision)-2],response:correction[language]};
   }) as typeof stage.options
 }))};
}
