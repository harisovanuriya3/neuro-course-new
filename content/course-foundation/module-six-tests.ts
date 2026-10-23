import type { Language } from "../course";
import type { BranchingTest, QuestionNode } from "../tests";

// Five authored main questions for module 6. Corrective/basic questions still
// come from the shared test builder and require a separate content audit.
// References checked: Ganong 23e PDF 132–134; Guyton & Hall 13e PDF 563–565.
// Ghai 8e PDF 353–354 describes a peripheral preparation, not CNS inhibition.
type Text = Record<Language, string>;
const t=(RU:string,EN:string,KZ:string):Text=>({RU,EN,KZ});
type Item={prompt:Text; options:[Text,Text,Text,Text]; explanation:Text};
const authored: Record<string,Item>={
 "concept:main":{
  prompt:t(
   "В модели нейрона Vm и ECl равны −70 мВ. При возбуждающем входе открывают дополнительные Cl⁻-каналы; средний Vm почти не меняется, но ВПСП уменьшается. Как это объяснить?",
   "In a neuron model, Vm and ECl are both −70 mV. Opening additional Cl⁻ channels during an excitatory input barely shifts mean Vm, but the EPSP becomes smaller. Why?",
   "Нейрон моделінде Vm мен ECl −70 мВ-қа тең. Қоздырушы кіріс кезінде қосымша Cl⁻ арналары ашылғанда орташа Vm өзгермейді деуге болады, бірақ ҚПСП кішірейеді. Неліктен?"
  ),
  options:[
   t("Повышенная Cl⁻-проводимость уменьшает входное сопротивление и шунтирует возбуждающий ток.","Increased Cl⁻ conductance lowers input resistance and shunts the excitatory current.","Cl⁻ өткізгіштігінің артуы кіріс кедергісін азайтып, қоздырушы токты шунттайды."),
   t("Торможение невозможно без выраженной гиперполяризации.","Inhibition is impossible without marked hyperpolarization.","Айқын гиперполяризация болмаса, тежелу мүмкін емес."),
   t("Любое открытие Cl⁻-каналов обязательно вызывает потенциал действия.","Opening Cl⁻ channels always triggers an action potential.","Cl⁻ арналары ашылған сайын міндетті түрде әрекет потенциалы туады."),
   t("При Vm = ECl возбуждающие токи не могут возникать.","Excitatory currents cannot occur when Vm equals ECl.","Vm = ECl болғанда қоздырушы токтар мүлде пайда болмайды.")
  ],
  explanation:t("При Vm≈ECl ток через Cl⁻-каналы может почти не менять Vm, но дополнительная проводимость уменьшает сопротивление и амплитуду одновременного ВПСП. Это шунтирующее торможение, а не доказательство отсутствия торможения.","Near Vm≈ECl, Cl⁻ current may barely shift Vm, while the added conductance reduces resistance and the concurrent EPSP. This is shunting inhibition, not absence of inhibition.","Vm≈ECl кезінде Cl⁻ тогы Vm-ді шамалы өзгертеді, алайда қосымша өткізгіштік кедергіні және қатар туған ҚПСП амплитудасын азайтады. Бұл — шунттаушы тежелу.")
 },
 "mechanism:main":{
  prompt:t(
   "Два одинаковых подпороговых ВПСП вызваны в одном синапсе с интервалом 10 мс или 100 мс при постоянных остальных условиях. Постсинаптический потенциал затухает за десятки миллисекунд. Какое сравнение обоснованно?",
   "Two identical subthreshold EPSPs arise at one synapse 10 ms or 100 ms apart, with all other conditions fixed. The postsynaptic potential decays over tens of milliseconds. Which comparison is justified?",
   "Бір синапста бірдей екі табалдырықасты ҚПСП 10 мс не 100 мс аралықпен пайда болады; басқа жағдайлар өзгермейді. Постсинапстық потенциал ондаған миллисекундта бәсеңдейді. Қай салыстыру дұрыс?"
  ),
  options:[
   t("При 10 мс временная суммация обычно сильнее, но достижение порога зависит от остальных входов.","Temporal summation is usually greater at 10 ms, but reaching threshold depends on other inputs.","10 мс аралықта уақыттық суммация әдетте күштірек, бірақ табалдырыққа жету басқа кірістерге де тәуелді."),
   t("При 100 мс суммация всегда сильнее из-за полного восстановления мембраны.","Summation is always stronger at 100 ms because the membrane has fully recovered.","Мембрана толық қалпына келетіндіктен, 100 мс аралықта суммация әрқашан күштірек."),
   t("Любые два ВПСП неизбежно вызывают потенциал действия.","Any two EPSPs inevitably trigger an action potential.","Кез келген екі ҚПСП міндетті түрде әрекет потенциалын тудырады."),
   t("Интервал между входами не влияет на суммарную деполяризацию.","The interval between inputs has no effect on net depolarization.","Кірістер арасындағы уақыт жиынтық деполяризацияға әсер етпейді.")
  ],
  explanation:t("Второй ВПСП суммируется с остатком первого, если первый ещё не затух. Поэтому короткий интервал усиливает временную суммацию; сам по себе он не гарантирует разряд.","The second EPSP adds to the residual first EPSP if it has not decayed. A shorter interval promotes temporal summation but does not guarantee firing.","Екінші ҚПСП бірінші потенциал толық бәсеңдемесе, оның қалдығымен қосылады. Қысқа аралық уақыттық суммацияны күшейтеді, бірақ разрядқа кепіл емес.")
 },
 "application:main":{
  prompt:t(
   "В опыте активация аксо-аксонного входа уменьшила Ca²⁺-сигнал в возбуждающем пресинаптическом окончании и амплитуду ВПСП. Ответ на прямое нанесение агониста постсинаптических рецепторов не изменился. Какой вывод лучше поддержан?",
   "Activating an axo-axonic input reduces the Ca²⁺ signal in an excitatory presynaptic terminal and the EPSP amplitude. The response to direct application of a postsynaptic receptor agonist is unchanged. Which conclusion is best supported?",
   "Аксо-аксондық кіріс белсенгенде қоздырушы пресинапстық ұштағы Ca²⁺ сигналы мен ҚПСП амплитудасы азайды. Постсинапстық рецептор агонисін тікелей бергендегі жауап өзгермеді. Қай қорытынды негіздірек?"
  ),
  options:[
   t("Данные согласуются со снижением пресинаптического высвобождения медиатора, но не определяют единственный молекулярный путь.","The data support reduced presynaptic transmitter release, but do not identify a unique molecular pathway.","Деректер пресинапстық медиатор бөлінуінің азаюымен үйлеседі, бірақ жалғыз молекулалық жолды анықтамайды."),
   t("Доказано полное разрушение постсинаптических рецепторов.","The postsynaptic receptors have been completely destroyed.","Постсинапстық рецепторлар толық бұзылғаны дәлелденді."),
   t("Обязательно исчезла проводимость всего аксона.","Conduction along the entire axon must have failed.","Бүкіл аксон бойымен өткізу міндетті түрде жойылды."),
   t("По одному ВПСП доказано отсутствие ГАМК во всём мозге.","A single EPSP proves that GABA is absent throughout the brain.","Бір ҚПСП мида ГАМҚ мүлде жоқ екенін дәлелдейді.")
  ],
  explanation:t("Снижение Ca²⁺-сигнала в окончании и ВПСП при сохранной реакции на прямой агонист поддерживает пресинаптический вклад. Для доказательства конкретного рецептора нужны отдельные вмешательства.","Reduced terminal Ca²⁺ and EPSP with a preserved direct agonist response support a presynaptic contribution. Specific receptor mechanisms require separate interventions.","Ұштағы Ca²⁺ сигналы мен ҚПСП азайып, тікелей агонистке жауап сақталуы пресинапстық тетікті қолдайды. Нақты рецепторды анықтау үшін бөлек тәжірибе керек.")
 },
 "transfer:main":{
  prompt:t(
   "При стандартном растяжении мышцы активируются Ia-афференты. В упрощённой сегментарной схеме одновременно регистрируют ВПСП у мотонейрона растянутой мышцы и ТПСП у мотонейрона антагониста. Какая цепь лучше объясняет результат?",
   "Standardized muscle stretch activates Ia afferents. In a simplified segmental circuit, an EPSP appears in the stretched muscle's motor neuron and an IPSP in its antagonist's motor neuron. Which circuit best explains this?",
   "Стандартталған бұлшықет созылуы Ia-афференттерді белсендіреді. Қарапайым сегменттік сызбада созылған бұлшықет мотонейронында ҚПСП, антагонист мотонейронында ТПСП тіркеледі. Мұны қай тізбек түсіндіреді?"
  ),
  options:[
   t("Ia-афферент возбуждает мотонейрон агониста и через тормозный интернейрон подавляет мотонейрон антагониста.","The Ia afferent excites the agonist motor neuron and inhibits the antagonist motor neuron through an inhibitory interneuron.","Ia-афферент агонист мотонейронын қоздырады және тежеуші интернейрон арқылы антагонист мотонейронын тежейді."),
   t("Ia-афферент напрямую возбуждает оба мотонейрона без интернейронов.","The Ia afferent directly excites both motor neurons without interneurons.","Ia-афферент екі мотонейронды да интернейронсыз тікелей қоздырады."),
   t("Антагонист подавляется только из-за прекращения кровотока.","The antagonist is inhibited solely because its blood flow stops.","Антагонист тек қан ағымы тоқтағандықтан тежеледі."),
   t("Рефлекс растяжения требует сознательного решения коры при каждом стимуле.","The stretch reflex requires a conscious cortical decision for each stimulus.","Созылу рефлексі әр тітіркендіргіште қыртыстың саналы шешімін талап етеді.")
  ],
  explanation:t("Ia-афференты моносинаптически возбуждают гомонимные мотонейроны и через сегментарный тормозный интернейрон могут подавлять антагониста. Это модель реципрокного торможения, не универсальный исход всех движений.","Ia afferents excite homonymous motor neurons monosynaptically and can inhibit antagonists via a segmental inhibitory interneuron. This models reciprocal inhibition, not every movement.","Ia-афференттер аттас мотонейрондарды моносинапстық қоздырып, сегменттік тежеуші интернейрон арқылы антагонистерді тежеуі мүмкін. Бұл — реципрокты тежелудің үлгісі.")
 },
 "justification:main":{
  prompt:t(
   "Через три месяца после инсульта у пациента слабость ноги, оживлённый коленный рефлекс и сопротивление быстрому пассивному растяжению. Какое заключение соответствует данным и их ограничениям?",
   "Three months after a stroke, a patient has leg weakness, a brisk knee reflex and resistance to rapid passive stretch. Which conclusion fits the findings and their limitations?",
   "Инсульттен үш ай өткен соң науқастың аяғы әлсіз, тізе рефлексі күшейген және жылдам пассивті созуға қарсылық бар. Қай қорытынды деректер мен олардың шектеулеріне сай?"
  ),
  options:[
   t("Возможен синдром верхнего мотонейрона с изменённым нисходящим контролем; один рефлекс не определяет медиатор и не исключает контрактуру.","An upper motor neuron syndrome with altered descending control is plausible; one reflex cannot identify a transmitter or exclude contracture.","Төмендеуші реттелуі өзгерген жоғарғы мотонейрон синдромы ықтимал; бір рефлекс медиаторды анықтамайды және контрактураны жоққа шығармайды."),
   t("Оживлённый рефлекс доказывает полное отсутствие ГАМК во всех спинальных синапсах.","The brisk reflex proves complete absence of GABA from all spinal synapses.","Күшейген рефлекс барлық жұлын синапстарында ГАМҚ толық жоғалғанын дәлелдейді."),
   t("Сопротивление растяжению всегда объясняется только контрактурой и не может иметь рефлекторного компонента.","Stretch resistance is always due only to contracture and cannot have a reflex component.","Созылуға қарсылық әрқашан тек контрактурадан болады, рефлекстік құрамдасы болмайды."),
   t("Коленный рефлекс сам по себе указывает на повреждение одного определённого интернейрона.","The knee reflex alone identifies damage to one specific interneuron.","Тізе рефлексінің өзі бір нақты интернейронның зақымын көрсетеді.")
  ],
  explanation:t("Гиперрефлексия и зависимый от скорости компонент сопротивления согласуются с нарушением нисходящей регуляции, но не являются прямым измерением ГАМК или отдельного синапса. Проверяют также механическую жёсткость и контрактуру.","Hyperreflexia and velocity-dependent resistance can reflect altered descending modulation, but do not directly measure GABA or a specific synapse. Mechanical stiffness and contracture also require assessment.","Гиперрефлексия мен жылдамдыққа тәуелді қарсылық төмендеуші реттелудің өзгеруімен үйлеседі, бірақ ГАМҚ-ны не нақты синапсты тікелей өлшемейді. Механикалық қаттылық пен контрактура да тексеріледі.")
 }
};
const ids=["concept:main","mechanism:main","application:main","transfer:main","justification:main"] as const;
export function createModuleSixTests(language:Language,moduleTitle:string,base:BranchingTest):BranchingTest{
 const nodes:BranchingTest["nodes"]={...base.nodes};
 for(const id of ids){
  const original=nodes[id];
  if(!original || original.type!=="question") throw new Error("Missing module 6 test node: "+id);
  const q=authored[id];
  const options=original.options.map(option=>({
   ...option,
   text:q.options[["a","b","c","d"].indexOf(option.id)]?.[language] ?? option.text
  }));
  if(options.length!==4 || new Set(options.map(option=>option.text)).size!==4) throw new Error("Invalid module 6 test options: "+id);
  const reviewed:QuestionNode={...original,prompt:q.prompt[language],options,correctAnswer:"a",explanation:q.explanation[language]};
  nodes[id]=reviewed;
 }
 return {...base,moduleTitle,nodes};
}
