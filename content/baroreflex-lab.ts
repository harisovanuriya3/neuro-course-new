import type { Language } from "./course";

export type Direction = "up" | "down" | "same";
export type BaroreflexModeId = "normal" | "weak-reflex" | "low-sympathetic" | "hypovolemia";
export type BaroreflexPoint = { time: number; hr: number; sbp: number; dbp: number };
export type BaroreflexMode = { id: BaroreflexModeId; label: Record<Language,string>; baseline: BaroreflexPoint; expected: Record<"hr"|"sbp"|"dbp",Direction>; series: BaroreflexPoint[] };
const label=(RU:string,EN:string,KZ:string):Record<Language,string>=>({RU,EN,KZ});
export const baroreflexTimes=[0,5,15,30,60,120] as const;
export const baroreflexModes:BaroreflexMode[]=[
 {id:"normal",label:label("Нормальная барорефлекторная реакция","Normal baroreflex response","Қалыпты барорефлекстік жауап"),baseline:{time:0,hr:68,sbp:118,dbp:74},expected:{hr:"up",sbp:"down",dbp:"down"},series:[{time:0,hr:68,sbp:118,dbp:74},{time:5,hr:82,sbp:104,dbp:70},{time:15,hr:88,sbp:108,dbp:72},{time:30,hr:82,sbp:114,dbp:74},{time:60,hr:75,sbp:117,dbp:75},{time:120,hr:70,sbp:118,dbp:74}]},
 {id:"weak-reflex",label:label("Ослабленный барорефлекс","Weakened baroreflex","Әлсіреген барорефлекс"),baseline:{time:0,hr:70,sbp:120,dbp:76},expected:{hr:"up",sbp:"down",dbp:"down"},series:[{time:0,hr:70,sbp:120,dbp:76},{time:5,hr:75,sbp:96,dbp:64},{time:15,hr:78,sbp:98,dbp:65},{time:30,hr:76,sbp:101,dbp:67},{time:60,hr:73,sbp:105,dbp:69},{time:120,hr:71,sbp:108,dbp:70}]},
 {id:"low-sympathetic",label:label("Сниженная симпатическая реакция","Reduced sympathetic response","Симпатикалық жауаптың төмендеуі"),baseline:{time:0,hr:66,sbp:116,dbp:72},expected:{hr:"up",sbp:"down",dbp:"down"},series:[{time:0,hr:66,sbp:116,dbp:72},{time:5,hr:72,sbp:98,dbp:63},{time:15,hr:74,sbp:100,dbp:64},{time:30,hr:72,sbp:103,dbp:66},{time:60,hr:69,sbp:107,dbp:68},{time:120,hr:67,sbp:110,dbp:69}]},
 {id:"hypovolemia",label:label("Выраженная гиповолемия — учебная модель","Marked hypovolemia — teaching model","Айқын гиповолемия — оқу моделі"),baseline:{time:0,hr:82,sbp:106,dbp:68},expected:{hr:"up",sbp:"down",dbp:"down"},series:[{time:0,hr:82,sbp:106,dbp:68},{time:5,hr:102,sbp:82,dbp:52},{time:15,hr:108,sbp:84,dbp:54},{time:30,hr:106,sbp:87,dbp:56},{time:60,hr:101,sbp:90,dbp:58},{time:120,hr:96,sbp:94,dbp:60}]},
];
export const baroreflexMechanism=[
 label("Переход в положение стоя","Transition to standing","Тік қалыпқа ауысу"),
 label("Депонирование крови в ногах → снижение венозного возврата и ударного объёма","Leg venous pooling → reduced venous return and stroke volume","Аяқтарда қанның іркілуі → веналық қайту мен соққы көлемінің төмендеуі"),
 label("Кратковременное снижение АД → уменьшение растяжения барорецепторов","Transient BP fall → reduced baroreceptor stretch","АҚ-ның қысқа төмендеуі → барорецепторлар созылуының азаюы"),
 label("Рост симпатического и снижение парасимпатического влияния","Increased sympathetic and reduced parasympathetic drive","Симпатикалық ықпалдың артуы және парасимпатикалық ықпалдың төмендеуі"),
 label("Рост ЧСС, сократимости и вазоконстрикция","Increased heart rate, contractility and vasoconstriction","ЖЖЖ мен жиырылғыштықтың артуы және вазоконстрикция"),
 label("Артериальное давление возвращается к устойчивому диапазону","Arterial pressure returns toward a stable range","Артериялық қысым тұрақты аралыққа қайтады"),
];
