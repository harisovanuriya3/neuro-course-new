import type {Language} from "../course";
import type {BranchingTest} from "../tests";
import {createModuleTwentyOnePretest} from "./module-twenty-one-pretest";
export function extendModuleTwentyOneFinalTest(language:Language,base:BranchingTest):BranchingTest{
 const questions=createModuleTwentyOnePretest(language,base.title,base.moduleTitle).questions;
 const nodes:BranchingTest["nodes"]={...base.nodes};
 const competencies={...base.competencies};
 const ids=questions.map((_,i)=>"special-senses:main:"+(i+1));
 questions.forEach((q,i)=>{const id=ids[i],competency="special-senses:competency:"+(i+1);competencies[competency]={title:q.prompt,theoryTarget:{moduleId:21,anchor:"mechanism"}};nodes[id]={id,type:"question",level:"main",competency,prompt:q.prompt,options:q.options,correctAnswer:q.correctAnswer,explanation:q.explanation,onCorrect:ids[i+1]??"end",onIncorrect:ids[i+1]??"end"};});
 const previous=nodes[base.mainIds[base.mainIds.length-1]];
 if(previous?.type==="question"){previous.onCorrect=ids[0];previous.onIncorrect=ids[0];}
 return {...base,nodes,competencies,mainIds:[...base.mainIds,...ids]};
}
