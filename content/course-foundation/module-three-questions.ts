import type { Language } from '../course';
import type { QuestionsLesson } from '../study';
import { getSectionTitle } from '../sections';

// Module 3 authored review: Ganong 23e ch.4 (PDF 92–94);
// Guyton & Hall 13e ch.5 (PDF 78–79); Ghai 8e (PDF 250–251).
type Item = { prompt: string; explanation: string; target: 'theory' | 'practice' | 'cases' | 'interactive' };
const data: Record<Language, Item[]> = {
 RU: [
  {prompt:'Почему у псевдоуниполярного кожного чувствительного нейрона потенциал действия не обязательно возникает в соме, как можно ошибочно заключить по схеме мотонейрона?',
   explanation:'У типичного мотонейрона импульс инициируется в начальном сегменте аксона после интеграции входов. У кожного чувствительного нейрона возбуждение может возникать в первом возбудимом перехвате периферического отростка; сома спинномозгового узла расположена сбоку от основного проводящего пути. Это не универсальное описание всех рецепторных окончаний.',target:'theory'},
  {prompt:'При неизменной пресинаптической стимуляции внеклеточный глутамат исчезает медленнее. Как отличить ослабление захвата астроцитами от усиленного выделения медиатора?',
   explanation:'Астроциты участвуют в удалении глутамата. Сравните независимую оценку выделения с кинетикой исчезновения одинаковой экспериментально внесённой порции глутамата. Медленный клиренс при неизменном выделении поддерживает нарушение захвата; удлинённый постсинаптический ответ сам по себе не различает эти причины.',target:'cases'},
  {prompt:'Почему повышение внеклеточного K⁺ может сначала деполяризовать нейрон, но при длительном воздействии снизить способность генерировать импульсы?',
   explanation:'Повышение K⁺ снаружи делает его равновесный потенциал менее отрицательным и обычно деполяризует мембрану. Достаточно сильная и длительная деполяризация инактивирует часть потенциал-зависимых Na⁺-каналов, уменьшая доступность каналов для нового импульса. Итог зависит от концентрации, длительности и типа клетки; деполяризация не всегда означает рост частоты разрядов.',target:'theory'},
  {prompt:'Почему скорость моторного проведения между двумя точками стимуляции рассчитывают по разности латентностей М-ответа, а не по одной дистальной латентности?',
   explanation:'Обе латентности содержат общие дистальные задержки: терминальное проведение, нервно-мышечную передачу и активацию мышцы. Разность приближённо отражает время проведения между точками; скорость равна расстоянию вдоль нерва, делённому на разность в секундах. Контролируйте температуру, измерение расстояния, амплитуду и форму М-ответа, нормативы и клинический контекст.',target:'practice'}
 ],
 EN: [
  {prompt:'Why does a cutaneous pseudounipolar sensory neuron not necessarily initiate action potentials in its soma, unlike the impression given by a simplified motor-neuron diagram?',
   explanation:'A typical spinal motor neuron initiates spikes at the axon initial segment after integrating inputs. In cutaneous sensory neurons, spikes may arise at the first excitable node of the peripheral process; the dorsal root ganglion soma lies off the main conduction path. Not every sensory receptor ending operates identically.',target:'theory'},
  {prompt:'With presynaptic stimulation held constant, extracellular glutamate decays more slowly. How would you distinguish reduced astrocytic uptake from increased release?',
   explanation:'Astrocytes contribute to glutamate clearance. Compare an independent measure of transmitter release with the decay of an equal experimentally delivered glutamate pulse. Slower clearance with unchanged release supports impaired uptake; a prolonged postsynaptic response alone cannot distinguish these explanations.',target:'cases'},
  {prompt:'Why can increased extracellular K⁺ initially depolarize a neuron but eventually reduce spike generation if the elevation persists?',
   explanation:'Higher extracellular K⁺ makes the K⁺ equilibrium potential less negative and usually depolarizes the membrane. Strong sustained depolarization inactivates some voltage-gated Na⁺ channels, reducing channel availability for another spike. Effects depend on concentration, duration and cell type; depolarization does not invariably increase firing.',target:'theory'},
  {prompt:'Why calculate segmental motor conduction velocity from the difference between two CMAP onset latencies rather than from distal latency alone?',
   explanation:'Both latencies include shared distal delays: terminal conduction, neuromuscular transmission and muscle activation. Their difference approximates conduction time between stimulation sites; divide distance along the nerve by this difference in seconds. Check temperature, distance measurement, CMAP waveform and amplitude, reference values and clinical context.',target:'practice'}
 ],
 KZ: [
  {prompt:'Неліктен терінің псевдоуниполярлы сезгіш нейронында әрекет потенциалы мотонейронның қарапайым сызбасындағыдай міндетті түрде сомада басталмайды?',
   explanation:'Әдеттегі жұлын мотонейронында импульс кірістер біріктірілгеннен кейін аксонның бастапқы сегментінде пайда болады. Тері сезгіш нейронында импульс шеткі өсіндінің алғашқы қозғыш Ранвье түйінінде басталуы мүмкін; жұлын түйінінің сомасы негізгі өткізу жолының жанында орналасады. Барлық сезгіш ұштар бірдей жұмыс істемейді.',target:'theory'},
  {prompt:'Пресинапстық стимуляция өзгермегенде жасушадан тыс глутамат баяу азаяды. Астроциттердің сіңіруі азайғанын медиатордың көп бөлінуінен қалай ажыратуға болады?',
   explanation:'Астроциттер глутаматты әкетуге қатысады. Медиатор бөлінуін тәуелсіз өлшеп, сырттан енгізілген бірдей глутамат мөлшерінің жойылу қисығын салыстырыңыз. Бөліну өзгермей клиренс баяуласа, сіңіру бұзылған болуы ықтимал; постсинапстық жауаптың ұзақтығы жалғыз өзі екі тетікті ажыратпайды.',target:'cases'},
  {prompt:'Неліктен жасушадан тыс K⁺ жоғарылағанда нейрон алдымен деполяризацияланып, ұзақ әсерден кейін импульс түзу қабілеті төмендеуі мүмкін?',
   explanation:'Сыртқы K⁺ көбеюі оның тепе-теңдік потенциалын азырақ теріс етіп, мембрананы әдетте деполяризациялайды. Күшті әрі ұзақ деполяризация кернеуге тәуелді Na⁺ арналарының бір бөлігін инактивтендіріп, келесі импульске қолжетімділігін азайтады. Нәтиже концентрацияға, уақытқа және жасуша түріне тәуелді; деполяризация әрдайым разрядты күшейтпейді.',target:'theory'},
  {prompt:'Неліктен моторлық жүйкенің сегменттік өткізу жылдамдығын бір дисталдық М-жауап латенттілігімен емес, екі латенттіліктің айырмасымен есептейді?',
   explanation:'Екі латенттілікте де ортақ дисталдық кідірістер: терминалдық өткізу, жүйке-бұлшықет берілісі және бұлшықет белсенуі бар. Айырмасы стимуляция нүктелерінің арасындағы өткізу уақытын жуықтайды; жүйке бойындағы арақашықтықты секундпен берілген айырмаға бөледі. Температураны, арақашықтықты, М-жауап пішіні мен амплитудасын, нормативтерді және клиникалық деректерді тексеріңіз.',target:'practice'}
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
