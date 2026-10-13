import type { Language } from '../course';
import type { ReadingLesson } from '../study';
import { getSectionTitle } from '../sections';
const text: Record<Language,[string,string,string]> = {
 RU:['Случай: латентность при стимуляции срединного нерва у запястья 5,8 мс, у локтя 9,8 мс; расстояние 24 см.','Рассчитайте скорость проведения по предплечью и объясните, почему дистальная латентность включает и нервно-мышечную передачу.','Разность 4,0 мс; скорость 60 м/с. Одно измерение не доказывает демиелинизацию: нужны сравнительные исследования и осмотр.'],
 EN:['Case: median nerve motor onset latency is 5.8 ms at the wrist and 9.8 ms at the elbow; distance 24 cm.','Calculate forearm conduction velocity. Explain why distal latency also includes neuromuscular transmission.','Difference 4.0 ms; velocity 60 m/s. One measure does not prove demyelination: comparative studies and examination are needed.'],
 KZ:['Жағдай: ортаңғы жүйкенің білезіктегі латенттілігі 5,8 мс, шынтақта 9,8 мс; арасы 24 см.','Білек сегментіндегі өткізу жылдамдығын есептеңіз. Дисталдық латенттілікке жүйке-бұлшықет берілісі де кіретінін түсіндіріңіз.','Айырмасы 4,0 мс; жылдамдық 60 м/с. Бір өлшем демиелинденуді дәлелдемейді: салыстырмалы зерттеу мен қарау қажет.']
};
export function createModuleThreeClinical(l:Language):ReadingLesson {
 const t=text[l];
 return {kind:'clinical',title:getSectionTitle('clinical',l),introduction:l==='RU'?'Клинический мост: анализ измерения.':l==='EN'?'Clinical bridge: analyze the measurement.':'Клиникалық байланыс: өлшеуді талдау.',cards:t.map((p,i)=>({id:'m3-clinical-'+i,title:(l==='RU'?['Ситуация','Задание','Разбор']:l==='EN'?['Case','Task','Explanation']:['Жағдай','Тапсырма','Түсіндіру'])[i],paragraphs:[p],links:[{section:i===0?'theory':i===1?'practice':'cases'}]}))};
}
