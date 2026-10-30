import type { Language } from "../course";
import type { BranchingTest, QuestionNode } from "../tests";
import { module5CaseSeeds } from "./module5-cases";

const promptIntro = {
 RU: "Какой механизм лучше всего объясняет наблюдение? ",
 EN: "Which mechanism best explains the observation? ",
 KZ: "Бақылауды қай тетік ең жақсы түсіндіреді? "
};
const feedbackIntro = {
 RU: "Физиологическое объяснение: ",
 EN: "Physiological explanation: ",
 KZ: "Физиологиялық түсіндірме: "
};
const incorrect = {
 RU: "Не подходит к данным: ",
 EN: "This does not account for the data: ",
 KZ: "Деректерге сәйкес келмейді: "
};
export function withModule5Questions(base: BranchingTest, l: Language): BranchingTest {
 const items = module5CaseSeeds;
 const nodes = { ...base.nodes };
 const competencies = { ...base.competencies };
 const mainIds: string[] = [];
 for (let i=0; i<items.length; i++) {
  const current=items[i];
  const wrongIndices=[(i+3)%items.length,(i+8)%items.length,(i+13)%items.length];
  const candidates=[i,...wrongIndices];
  const options=candidates.map((index,j)=>({id:String(j),text:items[index].title[l]}));
  const offset=(i*3+1)%4;
  const displayed=[...options.slice(offset),...options.slice(0,offset)];
  const id="module5:main:"+i;
  const competency="mechanism-"+(i+1);
  competencies[competency]={...base.competencies.mechanism,title:current.title[l]};
  mainIds.push(id);
  const notes=wrongIndices.map(index=>incorrect[l]+items[index].title[l]+". "+items[index].explanation[l]).join("\n");
  nodes[id]={
   id,type:"question",level:"main",competency,
   prompt:promptIntro[l]+current.situation[l],
   options:displayed,correctAnswer:"0",
   explanation:feedbackIntro[l]+current.explanation[l]+"\n"+notes,
   onCorrect:i===items.length-1?"end":"module5:main:"+(i+1),
   onIncorrect:i===items.length-1?"end":"module5:main:"+(i+1)
  } satisfies QuestionNode;
 }
 return {...base,start:mainIds[0],mainIds,competencies,nodes};
}
