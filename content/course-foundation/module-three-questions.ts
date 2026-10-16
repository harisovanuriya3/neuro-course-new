import type { Language } from '../course';
import type { QuestionsLesson } from '../study';
import { getSectionTitle } from '../sections';

// Module 3 authored review: Ganong 23e ch.4 (PDF 92–94);
// Guyton & Hall 13e ch.5 (PDF 78–79); Ghai 8e (PDF 250–251).
type Item = { prompt: string; explanation: string; target: 'theory' | 'practice' | 'cases' | 'interactive' };
const data: Record<Language, Item[]> = {
 RU: [
  {prompt:'Сравните место возникновения потенциала действия у спинального мотонейрона и кожного псевдоуниполярного чувствительного нейрона. Почему сома чувствительного нейрона не лежит на основном пути проведения?',
   explanation:'У типичного мотонейрона импульс инициируется в начальном сегменте аксона после интеграции входов. У кожного чувствительного нейрона возбуждение может возникать в первом возбудимом перехвате периферического отростка; сома спинномозгового узла расположена сбоку от основного проводящего пути. Это не универсальное описание всех рецепторных окончаний.',target:'theory'},
  {prompt:'При неизменной пресинаптической стимуляции внеклеточный глутамат исчезает медленнее. Как отличить ослабление захвата астроцитами от усиленного выделения медиатора?',
   explanation:'Астроциты участвуют в удалении глутамата. Сравните независимую оценку выделения с кинетикой исчезновения одинаковой экспериментально внесённой порции глутамата. Медленный клиренс при неизменном выделении поддерживает нарушение захвата; удлинённый постсинаптический ответ сам по себе не различает эти причины.',target:'cases'},
  {prompt:'Почему повышение внеклеточного K⁺ может сначала деполяризовать нейрон, но при длительном воздействии снизить способность генерировать импульсы?',
   explanation:'Повышение K⁺ снаружи делает его равновесный потенциал менее отрицательным и обычно деполяризует мембрану. Достаточно сильная и длительная деполяризация инактивирует часть потенциал-зависимых Na⁺-каналов, уменьшая доступность каналов для нового импульса. Итог зависит от концентрации, длительности и типа клетки; деполяризация не всегда означает рост частоты разрядов.',target:'theory'},
  {prompt:'После пересечения периферического аксона его дистальный участок постепенно дегенерирует, хотя тело нейрона может оставаться живым. Объясните механизм и направление нормального аксонального транспорта.',
   explanation:'Большая часть белков и мембранных компонентов аксона синтезируется в теле нейрона и доставляется к окончаниям антероградным транспортом по микротрубочкам (преимущественно с участием кинезинов). После пересечения дистальный участок теряет связь с сомой и её снабжением, поэтому развивается валлеровская дегенерация. Это не означает мгновенного исчезновения электрической возбудимости после повреждения; скорость изменений зависит от условий. Ретроградный транспорт направлен к соме и связан, в частности, с передачей сигналов о состоянии аксона.',target:'practice'}
 ],
 EN: [
  {prompt:'Compare the action-potential initiation sites of a spinal motor neuron and a cutaneous pseudounipolar sensory neuron. Why is the sensory neuron's soma off the main conduction path?',
   explanation:'A typical spinal motor neuron initiates spikes at the axon initial segment after integrating inputs. In cutaneous sensory neurons, spikes may arise at the first excitable node of the peripheral process; the dorsal root ganglion soma lies off the main conduction path. Not every sensory receptor ending operates identically.',target:'theory'},
  {prompt:'With presynaptic stimulation held constant, extracellular glutamate decays more slowly. How would you distinguish reduced astrocytic uptake from increased release?',
   explanation:'Astrocytes contribute to glutamate clearance. Compare an independent measure of transmitter release with the decay of an equal experimentally delivered glutamate pulse. Slower clearance with unchanged release supports impaired uptake; a prolonged postsynaptic response alone cannot distinguish these explanations.',target:'cases'},
  {prompt:'Why can increased extracellular K⁺ initially depolarize a neuron but eventually reduce spike generation if the elevation persists?',
   explanation:'Higher extracellular K⁺ makes the K⁺ equilibrium potential less negative and usually depolarizes the membrane. Strong sustained depolarization inactivates some voltage-gated Na⁺ channels, reducing channel availability for another spike. Effects depend on concentration, duration and cell type; depolarization does not invariably increase firing.',target:'theory'},
  {prompt:'After a peripheral axon is transected, its distal segment gradually degenerates even if the neuronal cell body survives. Explain the mechanism and the direction of normal axonal transport.',
   explanation:'Most axonal proteins and membrane components are made in the soma and delivered toward terminals by anterograde microtubule-based transport (primarily kinesin motors). Transection separates the distal axon from this supply, leading to Wallerian degeneration. Electrical excitability need not disappear immediately after injury; the time course varies. Retrograde transport runs toward the soma and also carries signals about the axon's condition.',target:'practice'}
 ],
 KZ: [
  {prompt:'Жұлын мотонейроны мен терінің псевдоуниполярлы сезгіш нейронында әрекет потенциалы қай жерде басталатынын салыстырыңыз. Неліктен сезгіш нейронның сомасы негізгі өткізу жолынан тыс орналасқан?',
   explanation:'Әдеттегі жұлын мотонейронында импульс кірістер біріктірілгеннен кейін аксонның бастапқы сегментінде пайда болады. Тері сезгіш нейронында импульс шеткі өсіндінің алғашқы қозғыш Ранвье түйінінде басталуы мүмкін; жұлын түйінінің сомасы негізгі өткізу жолының жанында орналасады. Барлық сезгіш ұштар бірдей жұмыс істемейді.',target:'theory'},
  {prompt:'Пресинапстық стимуляция өзгермегенде жасушадан тыс глутамат баяу азаяды. Астроциттердің сіңіруі азайғанын медиатордың көп бөлінуінен қалай ажыратуға болады?',
   explanation:'Астроциттер глутаматты әкетуге қатысады. Медиатор бөлінуін тәуелсіз өлшеп, сырттан енгізілген бірдей глутамат мөлшерінің жойылу қисығын салыстырыңыз. Бөліну өзгермей клиренс баяуласа, сіңіру бұзылған болуы ықтимал; постсинапстық жауаптың ұзақтығы жалғыз өзі екі тетікті ажыратпайды.',target:'cases'},
  {prompt:'Неліктен жасушадан тыс K⁺ жоғарылағанда нейрон алдымен деполяризацияланып, ұзақ әсерден кейін импульс түзу қабілеті төмендеуі мүмкін?',
   explanation:'Сыртқы K⁺ көбеюі оның тепе-теңдік потенциалын азырақ теріс етіп, мембрананы әдетте деполяризациялайды. Күшті әрі ұзақ деполяризация кернеуге тәуелді Na⁺ арналарының бір бөлігін инактивтендіріп, келесі импульске қолжетімділігін азайтады. Нәтиже концентрацияға, уақытқа және жасуша түріне тәуелді; деполяризация әрдайым разрядты күшейтпейді.',target:'theory'},
  {prompt:'Шеткі аксон кесілгеннен кейін нейрон денесі тірі қалса да, оның дисталдық бөлігі біртіндеп дегенерацияға ұшырайды. Себебін және қалыпты аксондық тасымалдың бағыттарын түсіндіріңіз.',
   explanation:'Аксон ақуыздары мен мембрана құрамбөліктерінің басым бөлігі нейрон сомасында түзіліп, микротүтікшелер бойымен антероградтық тасымал арқылы ұштарына жеткізіледі (көбіне кинезиндер қатысады). Аксон кесілгенде дисталдық бөлік сомамен және осы жабдықтау жолымен байланысын жоғалтады, сондықтан валлерлік дегенерация дамиды. Электрлік қозғыштық зақымданған сәтте бірден жойылуы міндетті емес; өзгеріс уақыты жағдайға тәуелді. Ретроградтық тасымал сомаға қарай жүріп, аксон күйі туралы сигналдарды да жеткізеді.',target:'practice'}
 ]
};
export function createModuleThreeQuestions(language: Language): QuestionsLesson {
 const items=data[language];
 if(items.length!==4) throw new Error('Module 3 questions must have four reviewed items');
 return {
  kind:'questions',
  title:getSectionTitle('questions',language),
  introduction:language==='RU'?'Сначала ответьте самостоятельно, затем откройте физиологический разбор.':language==='EN'?'Answer independently before revealing the physiological explanation.':'Алдымен өз бетіңізше жауап беріңіз, кейін физиологиялық талдауды ашыңыз.',
  questions:items.map((item,index)=>({
   id:'module-3-reviewed-question-'+(index+1),
   prompt:item.prompt,explanation:item.explanation,target:{section:item.target}
  }))
 };
}
