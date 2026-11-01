import type { Language } from "../course";
import type { BranchingTest, QuestionNode } from "../tests";
import { createModuleSixteenPretest } from "./module-sixteen-pretest";
import { extendModuleSixteenQuestionBank } from "./module-sixteen-expanded-questions";

// Append authored subject-specific questions after the foundation's evidence-method questions.
export function extendModuleSixteenFinalTest(language:Language,base:BranchingTest):BranchingTest {
 const bank=extendModuleSixteenQuestionBank(language,createModuleSixteenPretest(language,base.moduleTitle,base.title)).questions;
 const nodes:BranchingTest["nodes"]={...base.nodes};
 const competencies={...base.competencies};
 const ids=bank.map((_,i)=>"limbic:main:"+(i+1));
 for(let i=0;i<bank.length;i++){
  const q=bank[i],id=ids[i],competency="limbic:concept:"+(i+1);
  competencies[competency]={title:q.prompt,theoryTarget:{moduleId:16,anchor:"mechanism"}};
  const next=ids[i+1]??"end";
  nodes[id]={id,type:"question",level:"main",competency,prompt:q.prompt,options:q.options,correctAnswer:q.correctAnswer,explanation:q.explanation,onCorrect:next,onIncorrect:next};
 }
 const last=base.mainIds[base.mainIds.length-1];
 const previous=nodes[last];
 if(previous?.type==="question" && ids.length){
  nodes[base.mainIds[base.mainIds.length - 1]] = { ...previous, onCorrect: ids[0], onIncorrect: ids[0] };
 }
 return {...base,mainIds:[...base.mainIds,...ids],competencies,nodes};
}
