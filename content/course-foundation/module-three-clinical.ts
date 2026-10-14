import type { Language } from '../course';
import type { ReadingLesson } from '../study';
import { getSectionTitle } from '../sections';
const text: Record<Language,[string,string,string]> = {
 RU:['Случай: латентность при стимуляции срединного нерва у запястья 5,8 мс, у локтя 9,8 мс; расстояние 24 см.','Рассчитайте скорость проведения по предплечью и объясните, почему дистальная латентность включает и нервно-мышечную передачу.','Разность латентностей 9,8 − 5,8 = 4,0 мс; скорость 0,24 м / 0,004 с = 60 м/с. Вычитание исключает общую дистальную задержку, включая нервно-мышечную передачу и мышечную активацию. Одна скорость не устанавливает демиелинизацию: оцените температуру, другие сегменты, форму М-ответа и клинические данные.'],
 EN:['Case: median nerve motor onset latency is 5.8 ms at the wrist and 9.8 ms at the elbow; distance 24 cm.','Calculate forearm conduction velocity. Explain why distal latency also includes neuromuscular transmission.','Latency difference 9.8 − 5.8 = 4.0 ms; velocity 0.24 m / 0.004 s = 60 m/s. Subtracting latencies removes shared distal delays, including neuromuscular transmission and muscle activation. One velocity does not establish demyelination: assess temperature, other segments, CMAP waveform and clinical findings.'],
 KZ:['Жағдай: ортаңғы жүйкенің білезіктегі латенттілігі 5,8 мс, шынтақта 9,8 мс; арасы 24 см.','Білек сегментіндегі өткізу жылдамдығын есептеңіз. Дисталдық латенттілікке жүйке-бұлшықет берілісі де кіретінін түсіндіріңіз.','Латенттіліктер айырмасы 9,8 − 5,8 = 4,0 мс; жылдамдық 0,24 м / 0,004 с = 60 м/с. Латенттіліктерді азайту жүйке-бұлшықет берілісі мен бұлшықет белсенуін қамтитын ортақ дисталдық кідірісті жояды. Бір жылдамдық демиелинденуді дәлелдемейді: температураны, басқа сегменттерді, М-жауап пішінін және клиникалық деректерді бағалаңыз.']
};
export function createModuleThreeClinical(l:Language):ReadingLesson {
 const t=text[l];
 return {kind:'clinical',title:getSectionTitle('clinical',l),introduction:l==='RU'?'Клинический мост: анализ измерения.':l==='EN'?'Clinical bridge: analyze the measurement.':'Клиникалық байланыс: өлшеуді талдау.',cards:t.map((p,i)=>({id:'m3-clinical-'+i,title:(l==='RU'?['Ситуация','Задание','Разбор']:l==='EN'?['Case','Task','Explanation']:['Жағдай','Тапсырма','Түсіндіру'])[i],paragraphs:[p],links:[{section:i===0?'theory':i===1?'practice':'cases'}]}))};
}
