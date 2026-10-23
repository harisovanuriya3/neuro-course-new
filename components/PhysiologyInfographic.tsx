import Link from "next/link";
import type { Language } from "../content/course";
import { physiologicalRelations } from "../content/physiological-relations";

const wording = {
  RU: { title: "Физиологическая инфографика: от изменения к результату", cause: "Изменяемый фактор", mechanism: "Механизм", effect: "Функциональный результат", caution: "Это модель причинной связи, а не автоматический клинический диагноз. Оцените условия и альтернативные объяснения.", practice: "Проверить механизм на практике", cases: "Разобрать клиническую ситуацию", tests: "Проверить понимание", question: "Какой результат вы ожидаете при изменении первого фактора и чем проверите свой прогноз?" },
  EN: { title: "Physiology infographic: from change to outcome", cause: "Modified factor", mechanism: "Mechanism", effect: "Functional outcome", caution: "This is a model of a causal relationship, not an automatic clinical diagnosis. Consider conditions and alternative explanations.", practice: "Explore in practice", cases: "Analyze a clinical case", tests: "Test your understanding", question: "What outcome do you predict when the first factor changes, and how would you test it?" },
  KZ: { title: "Физиологиялық инфографика: өзгерістен нәтижеге", cause: "Өзгертілетін фактор", mechanism: "Механизм", effect: "Функциялық нәтиже", caution: "Бұл себеп-салдарлық байланыстың моделі, дайын клиникалық диагноз емес. Жағдайлар мен балама түсіндірмелерді ескеріңіз.", practice: "Тәжірибеде тексеру", cases: "Клиникалық жағдайды талдау", tests: "Түсінуді тексеру", question: "Алғашқы фактор өзгергенде қандай нәтиже болжап, оны қалай тексересіз?" }
} as const;

export default function PhysiologyInfographic({moduleId,language}:{moduleId:number;language:Language}) {
  const relation = physiologicalRelations[moduleId]?.[language];
  if (!relation) return null;
  const t = wording[language];
  const nodes = [
    {label:t.cause,detail:relation.cause},
    {label:t.mechanism,detail:relation.mechanism},
    {label:t.effect,detail:relation.effect}
  ];
  return <figure aria-label={t.title} style={{margin:"24px 0",padding:"clamp(16px,3vw,26px)",border:"1px solid #b9d4df",borderRadius:18,background:"#f6fbfd"}}>
    <figcaption style={{fontSize:"1.2rem",fontWeight:750,marginBottom:12}}>{t.title}</figcaption>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,215px),1fr))",gap:12,alignItems:"stretch"}}>
      {nodes.map((node,index)=><div key={index} style={{padding:16,background:"#fff",border:"1px solid #cedfe8",borderTop:"4px solid "+(["#2475a0","#5b6aa7","#287d73"][index]),borderRadius:12,minWidth:0}}>
        <div style={{fontSize:13,fontWeight:750,color:"#305f79",marginBottom:8}}>{index+1}. {node.label}</div>
        <p style={{lineHeight:1.65,margin:0,overflowWrap:"anywhere"}}>{node.detail}</p>
      </div>)}
    </div>
    <p style={{margin:"14px 0 8px",fontWeight:650}}>{t.question}</p>
    <p style={{fontSize:14,color:"#465965",lineHeight:1.6}}>{t.caution}</p>
    <nav style={{display:"flex",gap:16,flexWrap:"wrap"}} aria-label={t.title}>
      <Link href={`/modules/${moduleId}/practice?lang=${language}`}>{t.practice}</Link>
      <Link href={`/modules/${moduleId}/cases?lang=${language}`}>{t.cases}</Link>
      <Link href={`/modules/${moduleId}/tests?lang=${language}`}>{t.tests}</Link>
    </nav>
  </figure>;
}
