import type {Language} from "../course";
import type {BranchingTest} from "../tests";
import {createModuleTwentyThreePretest} from "./module-twenty-three-pretest";
export function extendModuleTwentyThreeFinalTest(language:Language,base:BranchingTest):BranchingTest{
 const questions=createModuleTwentyThreePretest(language,base.title,base.moduleTitle).questions;
 const nodes:BranchingTest["nodes"]={...base.nodes},competencies={...base.competencies};
 const ids=questions.map((_,i)=>"learning-memory:main:"+(i+1));
 questions.forEach((q,i)=>{const id=ids[i],competency="learning-memory:competency:"+(i+1);competencies[competency]={title:q.prompt,theoryTarget:{moduleId:23,anchor:"mechanism"}};nodes[id]={id,type:"question",level:"main",competency,prompt:q.prompt,options:q.options,correctAnswer:q.correctAnswer,explanation:q.explanation,onCorrect:ids[i+1]??"end",onIncorrect:ids[i+1]??"end"};});
 const previous=nodes[base.mainIds[base.mainIds.length-1]];
 if(previous?.type==="question"){previous.onCorrect=ids[0];previous.onIncorrect=ids[0];}
 return {...base,nodes,competencies,mainIds:[...base.mainIds,...ids]};
}
