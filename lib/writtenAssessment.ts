import type { ExamQuestion } from "../components/ExamCenter";

export function words(text:string){return new Set(text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu," ").split(/\s+/).filter(w=>w.length>=5));}
export function gradeWritten(q:ExamQuestion,answer:string){
 const reference=words(q.options.find(o=>o.id===q.correctAnswer)?.text+" "+q.explanation);
 const student=words(answer);
 let hit=0; reference.forEach(w=>{if(student.has(w))hit++;});
 const coverage=reference.size?hit/reference.size:0;
 const physiologicalElement=coverage>=0.18;
 const causalDirection=/(потому|поэтому|привод|вызывает|вследствие|увелич|сниж|cause|because|therefore|leads|results|increase|decrease|себеп|сондықтан|әкел|арт|төмен)/i.test(answer);
 const mechanism=/(механизм|канал|рецептор|медиатор|потенциал|ион|интеграц|регуляц|mechanism|channel|receptor|transmitter|potential|ion|integration|regulation|механизм|арна|рецептор|медиатор|потенциал|ион|интеграц|реттел)/i.test(answer)||coverage>=0.32;
 const interpretation=/(результат|следств|итог|наблюд|ожида|функц|result|consequence|outcome|observ|expected|function|нәтиже|салдар|күтіл|қызмет)/i.test(answer)||coverage>=0.45;
 const points=(physiologicalElement?2:0)+(causalDirection?3:0)+(mechanism?3:0)+(interpretation?2:0);
 return {score:points*10,points,coverage,physiologicalElement,causalDirection,mechanism,interpretation};
}
