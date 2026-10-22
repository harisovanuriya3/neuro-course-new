import type { Language, Lesson } from "../types";

// Module 6; Ganong 23e ch.6, Guyton & Hall 13e ch.46.
// Ghai 8e expt.4-9 does not directly record CNS summation.
const notes={
 RU:[
  ["Временная и пространственная суммация","Временная суммация возникает, если новый ВПСП приходит до затухания предыдущего. Пространственная объединяет входы разных синапсов. Их эффект зависит от времени, расположения и мембранной проводимости, а не от простого подсчёта возбуждающих и тормозных сигналов."],
  ["Шунтирующее торможение и порог","Когда Vm близок к E(Cl), открытие Cl⁻-каналов может почти не менять напряжение, но снижает входное сопротивление и ослабляет ВПСП. При другом E(Cl) возможна деполяризация. У многих нейронов ПД запускается в начальном сегменте аксона; одного измерения Vm на соме недостаточно для точного прогноза."],
  ["Пресинаптическое и постсинаптическое торможение","Постсинаптическое торможение изменяет проводимость и интеграцию сигналов в мембране клетки-мишени: открытие каналов, связанных с GABA_A- или глициновыми рецепторами, может вызывать гиперполяризацию или шунтирование в зависимости от потенциала реверсии и исходного Vm. Пресинаптическое торможение действует на окончание аксона до выделения медиатора; например, активация пресинаптических GABA_B-рецепторов может уменьшать вход Ca²⁺ и вероятность выделения медиатора. Это не тождественно постсинаптическому ТПСП. Одной амплитуды ответа без данных о месте записи и стимуляции недостаточно, чтобы уверенно различить эти механизмы."]
 ],
 EN:[
  ["Temporal and spatial summation","Temporal summation occurs when a new EPSP arrives before the previous one decays. Spatial summation combines inputs from different synapses. Effects depend on timing, position and membrane conductance, not simply counting excitatory and inhibitory inputs."],
  ["Shunting inhibition and threshold","When Vm is near E(Cl), opening Cl⁻ channels may cause little voltage change but lower input resistance and attenuate an EPSP. At another E(Cl), depolarization is possible. Many neurons initiate spikes at the axon initial segment; somatic Vm alone cannot precisely predict firing."],
  ["Presynaptic versus postsynaptic inhibition","Postsynaptic inhibition changes conductance and integration in the target-cell membrane: opening channels associated with GABA_A or glycine receptors can cause hyperpolarization or shunting, depending on reversal potential and baseline Vm. Presynaptic inhibition acts on an axon terminal before transmitter release; for example, activation of presynaptic GABA_B receptors can reduce Ca²⁺ entry and transmitter-release probability. This is not the same as a postsynaptic IPSP. Response amplitude alone, without recording-site and stimulation information, cannot reliably distinguish these mechanisms."]
 ],
 KZ:[
  ["Уақыттық және кеңістіктік суммация","Уақыттық суммация жаңа ҚПСП алдыңғысы өшпей келгенде пайда болады. Кеңістіктік суммация әртүрлі синапстардан келген кірістерді біріктіреді. Әсер уақытқа, орналасуға және мембраналық өткізгіштікке тәуелді; қоздырушы және тежеуші сигналдарды жай санау жеткіліксіз."],
  ["Шунттаушы тежелу және табалдырық","Vm E(Cl)-ге жақын болса, Cl⁻ арналары ашылғанда кернеу аз өзгеруі мүмкін, бірақ кіріс кедергісі төмендеп, ҚПСП әлсірейді. Басқа E(Cl) кезінде деполяризация болуы мүмкін. Көптеген нейрондарда ӘП аксонның бастапқы сегментінде басталады; сомадағы Vm ғана разрядты дәл болжауға жеткіліксіз."],
  ["Пресинапстық және постсинапстық тежелу","Постсинапстық тежелу нысана жасуша мембранасының өткізгіштігі мен сигналдарды біріктіруін өзгертеді: GABA_A немесе глицин рецепторларына байланысты арналардың ашылуы реверсия потенциалы мен бастапқы Vm-ге қарай гиперполяризацияны немесе шунттауды туғызуы мүмкін. Пресинапстық тежелу медиатор бөлінгенге дейін аксон ұшына әсер етеді; мысалы, пресинапстық GABA_B-рецепторларының белсенуі Ca²⁺ енуін және медиатор бөліну ықтималдығын төмендетуі мүмкін. Бұл постсинапстық тежегіш потенциалмен бірдей емес. Тіркеу орны мен тітіркендіру туралы дерексіз жауап амплитудасы ғана осы механизмдерді сенімді ажыратуға жеткіліксіз."]
 ]
} as const;
export function createModuleSixTheory(language:Language,base:Lesson & {kind:"theory"}):Lesson & {kind:"theory"} {
 return {...base,sections:[...base.sections,...notes[language].map(([title,text],i)=>({
  id:["summation-mechanisms","shunting-and-threshold","presynaptic-vs-postsynaptic-inhibition"][i],
  title,blocks:[{type:"paragraph" as const,text}]
 }))]};
}
