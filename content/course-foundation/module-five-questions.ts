import type { Language } from "../course";
import type { QuestionsLesson } from "../study";
import { getSectionTitle } from "../sections";

// Reviewed against Ganong 23e ch.6 (PDF 127–134), Guyton & Hall 13e
// ch.46 (PDF 556–563), and Ghai 8e expt.4-9 (PDF 353–354).
type T = Record<Language, string>;
const t=(RU:string,EN:string,KZ:string):T=>({RU,EN,KZ});
const data=[
 {id:"calcium",target:"interactive" as const,
  prompt:t(
   "Импульс дошёл до пресинаптического окончания, но вход Ca²⁺ заблокирован. Что изменится в вызванном выделении медиатора? Доказывает ли это блок проведения по аксону?",
   "A spike reaches a presynaptic terminal but Ca²⁺ entry is blocked. What happens to evoked transmitter release? Does this establish axonal conduction block?",
   "Импульс пресинапстық ұшқа жетті, бірақ Ca²⁺ енуі бөгелді. Шақырылған медиатор бөлінуі қалай өзгереді? Бұл аксон бойымен өткізудің бөгелгенін дәлелдей ме?"),
  explanation:t(
   "Ca²⁺ в активной зоне запускает слияние везикул; вызванное выделение уменьшается. Приход импульса и выделение медиатора — разные этапы. Спонтанные миниатюрные ответы могут сохраняться.",
   "Ca²⁺ at the active zone triggers vesicle fusion, so evoked release falls. Spike arrival and transmitter release are distinct steps. Spontaneous miniature events may persist.",
   "Белсенді аймақтағы Ca²⁺ көпіршіктердің қосылуын іске қосады, сондықтан шақырылған бөліну азаяды. Импульстің келуі мен медиатордың бөлінуі бөлек кезеңдер. Өздігінен туатын миниатюралық жауаптар сақталуы мүмкін.")},
 {id:"shunting",target:"theory" as const,
  prompt:t(
   "Cl⁻-каналы открылись при Vm, близком к E(Cl). Почему возбуждающий ответ может уменьшиться без заметной гиперполяризации?",
   "Cl⁻ channels open when Vm is near E(Cl). Why can an excitatory response become smaller without obvious hyperpolarization?",
   "Vm мәні E(Cl)-ге жақын кезде Cl⁻ арналары ашылды. Айқын гиперполяризациясыз қоздырушы жауап неліктен азаюы мүмкін?"),
  explanation:t(
   "Даже при малом чистом Cl⁻-токе открытые каналы повышают проводимость и шунтируют возбуждающий ток. Эффект зависит от E(Cl), расположения и времени действия синапсов; открытие Cl⁻-каналов не всегда гиперполяризует.",
   "Even with little net Cl⁻ current, open channels increase conductance and shunt excitatory current. The effect depends on E(Cl), location and timing; Cl⁻ channel opening need not hyperpolarize.",
   "Cl⁻ иондарының жиынтық тогы аз болса да, ашық арналар өткізгіштікті арттырып, қоздырушы токты шунттайды. Әсер E(Cl)-ге, орынға және уақытқа тәуелді; Cl⁻ арналары әрдайым гиперполяризация туғызбайды.")},
 {id:"nerve-muscle",target:"cases" as const,
  prompt:t(
   "В изолированном нервно-мышечном препарате мышца перестала сокращаться при стимуляции нерва, но отвечает на прямую стимуляцию. Что можно заключить и чего нельзя доказать?",
   "In an isolated nerve–muscle preparation, the muscle stops responding to nerve stimulation but still responds to direct stimulation. What does this show, and what does it not prove?",
   "Жүйке-бұлшықет препаратында жүйкені тітіркендіргенде бұлшықет жиырылмайды, бірақ бұлшықетті тікелей тітіркендіру жиырылу туғызады. Нені қорытындылауға болады, нені дәлелдей алмаймыз?"),
  explanation:t(
   "Нарушен путь непрямой активации; мышца сохраняет прямую возбудимость. Один опыт не различает блок проведения по нерву, нарушение выделения ацетилхолина и дефект нервно-мышечного соединения. Это не модель утомления человека.",
   "Indirect activation has failed while direct muscle excitability remains. One observation does not distinguish nerve conduction failure, impaired acetylcholine release or junctional dysfunction. It is not a model of human fatigue.",
   "Жанама белсендіру бұзылған, бірақ бұлшықет тікелей қозуға қабілетті. Бір бақылау жүйкедегі өткізудің, ацетилхолин бөлінуінің немесе түйіспе қызметінің бұзылуын ажыратпайды. Бұл адамдағы шаршаудың моделі емес.")}
 ,{id:"electrical-rectification",target:"theory" as const,
  prompt:t(
   "Два нейрона связаны щелевыми контактами: ток от одного вызывает быстрый ответ другого. Доказывает ли это выделение медиатора и обязательную двусторонность связи?",
   "Two neurons are coupled by gap junctions: current in one produces a rapid response in the other. Does this prove transmitter release or invariably bidirectional coupling?",
   "Екі нейрон саңылаулы түйіспелермен байланысқан: біріндегі ток екіншісінде жылдам жауап туғызады. Бұл медиатор бөлінгенін немесе байланыстың міндетті түрде екі бағытты екенін дәлелдей ме?"),
  explanation:t(
   "Нет. Электрический синапс проводит ионный ток через щелевые контакты без обязательного везикулярного выделения медиатора. Связь часто двусторонняя, но возможны выпрямляющие контакты; одного опыта в одном направлении недостаточно.",
   "No. Electrical coupling carries ionic current through gap junctions without requiring vesicular transmitter release. Coupling is often bidirectional, but rectifying junctions exist; a test in one direction cannot establish bidirectionality.",
   "Жоқ. Электрлік байланыста иондық ток саңылаулы түйіспелер арқылы өтеді, медиатордың везикуладан бөлінуі міндетті емес. Байланыс көбіне екі бағытты, бірақ түзеткіш түйіспелер де бар; бір бағыттағы тәжірибе екі бағыттылықты дәлелдемейді.")},
 {id:"metabotropic",target:"theory" as const,
  prompt:t(
   "Медиатор связывается с рецептором, запускает G-белковый путь и изменяет K⁺-проводимость клетки. Почему этот рецептор называют метаботропным, а не ионотропным?",
   "A transmitter activates a G-protein pathway that changes cellular K⁺ conductance. Why is the receptor metabotropic rather than ionotropic?",
   "Медиатор рецепторға байланысып, G-ақуыз жолын іске қосады да, жасушаның K⁺ өткізгіштігін өзгертеді. Неліктен бұл рецептор ионотроптық емес, метаботроптық?"),
  explanation:t(
   "Метаботропный рецептор передаёт сигнал через внутриклеточные посредники, которые затем регулируют ионные каналы или другие процессы. Ионотропный рецептор сам образует канал. Знак ответа нельзя определить только по скорости или названию медиатора.",
   "A metabotropic receptor signals through intracellular intermediates that subsequently regulate channels or other processes. An ionotropic receptor itself forms an ion channel. Response polarity cannot be inferred from speed or transmitter name alone.",
   "Метаботроптық рецептор сигналды жасушаішілік аралық тетіктер арқылы беріп, кейін иондық арналарды немесе өзге үдерістерді реттейді. Ионотроптық рецептордың өзі иондық арна түзеді. Жауап бағытын тек жылдамдығына не медиатор атауына қарап анықтауға болмайды.")}

] as const;
export function createModuleFiveQuestions(language:Language):QuestionsLesson{
 return {
  kind:"questions",title:getSectionTitle("questions",language),
  introduction:t("Сначала ответьте самостоятельно, затем сравните свой ответ с объяснением.","Answer first, then compare the explanation.","Алдымен өзіңіз жауап беріп, кейін түсіндірмені салыстырыңыз.")[language],
  questions:data.map(item=>({id:"module-5-review-"+item.id,prompt:item.prompt[language],
   explanation:item.explanation[language],target:{section:item.target}}))
 };
}
