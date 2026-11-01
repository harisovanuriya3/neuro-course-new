import type {Language} from "../course";
import type {PretestLesson} from "../study";
import type {BranchingTest} from "../tests";
import {createModuleTwentyVisualPretest} from "./module-twenty-visual-pretest";

export function extendModuleTwentyPretest(language:Language,base:PretestLesson):PretestLesson{
 const added=createModuleTwentyVisualPretest(language,base.title,base.questions[0]?.topic??"").questions;
 return {...base,questions:[...base.questions,...added]};
}

export function extendModuleTwentyFinalTest(language:Language,base:BranchingTest):BranchingTest{
 const questions=createModuleTwentyVisualPretest(language,base.title,base.moduleTitle).questions;
 const nodes:BranchingTest["nodes"]={...base.nodes};
 const competencies={...base.competencies};
 const ids=questions.map((_,index)=>"visual:main:"+(index+1));
 questions.forEach((question,index)=>{
  const id=ids[index];
  const competency="visual:competency:"+(index+1);
  competencies[competency]={title:question.prompt,theoryTarget:{moduleId:20,anchor:"mechanism"}};
  nodes[id]={id,type:"question",level:"main",competency,prompt:question.prompt,options:question.options,correctAnswer:question.correctAnswer,explanation:question.explanation,onCorrect:ids[index+1]??"end",onIncorrect:ids[index+1]??"end"};
 });
 const previous=nodes[base.mainIds[base.mainIds.length-1]];
 if(previous?.type==="question"&&ids.length){nodes[base.mainIds[base.mainIds.length - 1]] = { ...previous, onCorrect: ids[0], onIncorrect: ids[0] };}
 return {...base,nodes,competencies,mainIds:[...base.mainIds,...ids]};
}
