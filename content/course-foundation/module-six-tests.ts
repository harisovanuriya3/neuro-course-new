import type { Language } from "../course";
import type { BranchingTest, QuestionNode } from "../tests";

// Five authored main, five corrective and five basic questions for module 6.
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

/**
 * Independent corrective questions: a wrong main answer is followed by a
 * different physiological experiment, not a repetition of the same stem.
 * Keep the existing branch targets, question IDs and stable option IDs.
 */
const corrective: Record<string,Item>={
 "concept:corrective":{
  prompt:t(
   "В нейроне при включении тормозного синапса мембрана слегка деполяризуется, но вероятность потенциала действия уменьшается. Какой вывод верен?",
   "Activating an inhibitory synapse slightly depolarizes a neuron, yet the probability of an action potential falls. Which conclusion is correct?",
   "Нейронда тежеуші синапс белсенгенде мембрана аздап деполяризацияланады, бірақ әрекет потенциалының пайда болу ықтималдығы төмендейді. Қай тұжырым дұрыс?"
  ),
  options:[
   t("Знак изменения Vm сам по себе не определяет эффект: увеличение тормозной проводимости может шунтировать возбуждающий ток.","The sign of the Vm change alone does not define the effect: increased inhibitory conductance can shunt excitatory current.","Vm өзгерісінің бағыты әсерді өздігінен анықтамайды: тежеуші өткізгіштіктің артуы қоздырушы токты шунттауы мүмкін."),
   t("Любая деполяризация обязательно повышает частоту разрядов.","Any depolarization necessarily increases firing rate.","Кез келген деполяризация разряд жиілігін міндетті түрде арттырады."),
   t("Если Vm растёт, тормозная проводимость не может увеличиваться.","Inhibitory conductance cannot increase if Vm becomes less negative.","Vm теріс мәні азайса, тежеуші өткізгіштік арта алмайды."),
   t("Снижение вероятности разряда доказывает отсутствие возбуждающих синапсов.","Reduced firing probability proves that excitatory synapses are absent.","Разряд ықтималдығының төмендеуі қоздырушы синапстардың жоқ екенін дәлелдейді.")
  ],
  explanation:t(
   "Торможение оценивают по влиянию на вероятность разряда, а не только по знаку изменения Vm. При росте проводимости уменьшается входное сопротивление; даже деполяризующий тормозный вход может шунтировать ВПСП. Результат зависит от Eрев, положения синапса и времени входов.",
   "Inhibition is judged by its effect on firing probability, not merely the sign of Vm. Greater conductance lowers input resistance; even a depolarizing inhibitory input can shunt an EPSP. The result depends on reversal potential, synapse location and input timing.",
   "Тежелуді тек Vm өзгерісінің таңбасымен емес, разряд ықтималдығына әсерімен бағалайды. Өткізгіштік артқанда кіріс кедергісі азаяды; деполяризациялайтын тежеуші кіріс те ҚПСП-ны шунттауы мүмкін. Нәтиже реверсиялық потенциалға, синапс орнына және кірістер уақытына тәуелді."
  )
 },
 "mechanism:corrective":{
  prompt:t(
   "Два пространственно раздельных возбуждающих синапса активированы одновременно. По отдельности каждый создаёт подпороговый ВПСП. Какой механизм может усилить деполяризацию начального сегмента аксона?",
   "Two spatially separate excitatory synapses are activated simultaneously. Each produces a subthreshold EPSP alone. What mechanism can increase depolarization at the axon initial segment?",
   "Кеңістікте бөлек орналасқан екі қоздырушы синапс бір мезгілде белсенеді. Әрқайсысы жеке табалдырықасты ҚПСП туғызады. Аксонның бастапқы сегментіндегі деполяризацияны не күшейтуі мүмкін?"
  ),
  options:[
   t("Пространственная суммация распространяющихся к начальному сегменту постсинаптических потенциалов.","Spatial summation of postsynaptic potentials spreading toward the axon initial segment.","Аксонның бастапқы сегментіне таралатын постсинапстық потенциалдардың кеңістіктік суммациясы."),
   t("Полная блокада всех возбуждающих рецепторов.","Complete blockade of all excitatory receptors.","Барлық қоздырушы рецепторлардың толық бөгелуі."),
   t("Обязательная генерация отдельного потенциала действия в каждом синапсе.","Mandatory generation of a separate action potential at each synapse.","Әр синапста міндетті түрде жеке әрекет потенциалының пайда болуы."),
   t("Отсутствие электротонического распространения от дендритов к соме.","Absence of electrotonic spread from dendrites to the soma.","Дендриттерден сомаға электротондық таралудың болмауы.")
  ],
  explanation:t(
   "Одновременные ВПСП из разных участков могут пространственно суммироваться при распространении к зоне инициации разряда. Достижение порога не гарантировано: важны затухание, расположение синапсов и одновременные тормозные входы.",
   "Simultaneous EPSPs from different sites may sum spatially as they spread toward the spike-initiation zone. Threshold is not guaranteed: attenuation, synapse location and concurrent inhibition matter.",
   "Әртүрлі аймақтардан келген бір мезгілдегі ҚПСП-лар разряд басталатын аймаққа таралу барысында кеңістікте қосылуы мүмкін. Табалдырыққа жету міндетті емес: бәсеңдеу, синапстар орны және қатар жүретін тежелу маңызды."
  )
 },
 "application:corrective":{
  prompt:t(
   "В постсинаптическом нейроне открылись дополнительные K⁺-каналы. При Vm = −65 мВ и EK = −90 мВ какой непосредственный эффект наиболее вероятен?",
   "Additional postsynaptic K⁺ channels open. With Vm = −65 mV and EK = −90 mV, which immediate effect is most likely?",
   "Постсинапстық нейронда қосымша K⁺ арналары ашылды. Vm = −65 мВ, EK = −90 мВ болса, ең ықтимал тікелей әсер қандай?"
  ),
  options:[
   t("Выход K⁺ и сдвиг Vm к EK с гиперполяризацией и снижением возбудимости.","K⁺ efflux drives Vm toward EK, hyperpolarizing the cell and reducing excitability.","K⁺ сыртқа шығып, Vm EK мәніне жақындайды; гиперполяризация болып, қозғыштық төмендейді."),
   t("Вход K⁺ и обязательное достижение порога потенциала действия.","K⁺ influx necessarily brings the neuron to action-potential threshold.","K⁺ ішке кіріп, нейрон міндетті түрде әрекет потенциалының табалдырығына жетеді."),
   t("Усиление пресинаптического высвобождения доказано без измерения окончания.","Increased presynaptic release is proved without measuring the terminal.","Ұшты өлшемей-ақ пресинапстық медиатор бөлінуінің артуы дәлелденеді."),
   t("K⁺-проводимость не влияет на Vm при любой разности Vm и EK.","K⁺ conductance never affects Vm regardless of the difference between Vm and EK.","Vm мен EK айырмасы қандай болса да, K⁺ өткізгіштігі Vm-ге әсер етпейді.")
  ],
  explanation:t(
   "При Vm выше EK увеличение постсинаптической K⁺-проводимости вызывает преимущественно выход K⁺ и приближение Vm к более отрицательному EK. Это постсинаптический механизм; по нему нельзя заключить, что изменилось пресинаптическое выделение медиатора.",
   "When Vm is more positive than EK, increasing postsynaptic K⁺ conductance favors K⁺ efflux and drives Vm toward the more negative EK. This is postsynaptic; it does not establish a change in presynaptic transmitter release.",
   "Vm EK-тен оң болғанда постсинапстық K⁺ өткізгіштігінің артуы K⁺ иондарының сыртқа шығуын күшейтіп, Vm-ді терісірек EK мәніне жақындатады. Бұл постсинапстық тетік; ол пресинапстық медиатор бөлінуінің өзгергенін дәлелдемейді."
  )
 },
 "transfer:corrective":{
  prompt:t(
   "Аксонная коллатераль активного спинального α-мотонейрона возбуждает клетку Реншоу. После этого разряд того же мотонейрона ослабевает. Какая цепь наиболее вероятна?",
   "An axon collateral of an active spinal alpha motor neuron excites a Renshaw cell. Firing of the same motor neuron then declines. Which circuit is most likely?",
   "Белсенді жұлындық α-мотонейронның аксон коллатералы Реншоу жасушасын қоздырады. Одан кейін сол мотонейронның разряды әлсірейді. Қай тізбек ықтимал?"
  ),
  options:[
   t("Рекуррентное торможение: коллатераль мотонейрона → тормозный интернейрон Реншоу → мотонейрон.","Recurrent inhibition: motor-neuron collateral → inhibitory Renshaw interneuron → motor neuron.","Қайтымды тежелу: мотонейрон коллатералы → тежеуші Реншоу интернейроны → мотонейрон."),
   t("Моносинаптическое возбуждение антагониста без интернейрона.","Monosynaptic excitation of the antagonist without an interneuron.","Антагонистің интернейронсыз моносинапстық қозуы."),
   t("Прямое прекращение проведения в каждом периферическом нервном волокне.","Direct failure of conduction in every peripheral nerve fiber.","Әрбір шеткі жүйке талшығында өткізудің тікелей тоқтауы."),
   t("Обязательное выключение коры больших полушарий.","Necessary shutdown of the cerebral cortex.","Үлкен ми сыңарлары қыртысының міндетті түрде өшуі.")
  ],
  explanation:t(
   "Клетка Реншоу получает возбуждающую коллатераль от мотонейрона и обеспечивает отрицательную обратную связь через тормозные синапсы. Это рекуррентное торможение, отличное от Ia-зависимого реципрокного торможения антагониста.",
   "A Renshaw cell receives an excitatory motor-neuron collateral and supplies inhibitory negative feedback. This recurrent inhibition differs from Ia-mediated reciprocal inhibition of the antagonist.",
   "Реншоу жасушасы мотонейроннан қоздырушы коллатераль алып, тежеуші синапстар арқылы теріс кері байланыс жасайды. Бұл антагонистің Ia-афферентке тәуелді реципрокты тежелуінен бөлек қайтымды тежелу."
  )
 },
 "justification:corrective":{
  prompt:t(
   "У пациента сопротивление пассивному растяжению выше при быстром движении, а при медленном ниже; во время быстрого растяжения появляется растяжение-зависимая ЭМГ-активность. Какой вывод наиболее обоснован?",
   "A patient's resistance to passive stretch is greater at high speed than at low speed, and stretch-related EMG activity appears during fast stretch. Which conclusion is best supported?",
   "Науқаста пассивті созуға қарсылық жылдам қозғалыста жоғары, баяу қозғалыста төмен; жылдам созғанда созылуға байланысты ЭМГ белсенділігі пайда болады. Қай қорытынды негіздірек?"
  ),
  options:[
   t("Данные поддерживают рефлекторный, зависящий от скорости компонент; сопутствующую механическую жёсткость надо оценивать отдельно.","The data support a velocity-dependent reflex component; coexisting mechanical stiffness needs separate assessment.","Деректер жылдамдыққа тәуелді рефлекстік құрамдасты қолдайды; қатар жүретін механикалық қаттылық бөлек бағалануы керек."),
   t("Доказано, что все сопротивление вызвано только укорочением сухожилия.","All resistance is proved to result solely from tendon shortening.","Барлық қарсылық тек сіңірдің қысқаруынан туатыны дәлелденді."),
   t("ЭМГ прямо измеряет концентрацию ГАМК в синаптической щели.","EMG directly measures GABA concentration in the synaptic cleft.","ЭМГ синапстық саңылаудағы ГАМҚ концентрациясын тікелей өлшейді."),
   t("Зависимость от скорости исключает участие спинальных рефлексов.","Velocity dependence rules out spinal reflex contributions.","Жылдамдыққа тәуелділік жұлын рефлекстерінің қатысуын жоққа шығарады.")
  ],
  explanation:t(
   "Зависимость сопротивления от скорости вместе с вызванной растяжением ЭМГ согласуется с нейрогенным рефлекторным вкладом. По этим данным нельзя определить конкретный медиатор или исключить фиксированные изменения мышц и сухожилий.",
   "Velocity dependence plus stretch-evoked EMG supports a neural reflex contribution. These observations neither identify a particular transmitter nor exclude fixed muscle or tendon changes.",
   "Қарсылықтың жылдамдыққа тәуелділігі және созылудан туындаған ЭМГ нейрогендік рефлекстік үлесті қолдайды. Бұл деректер нақты медиаторды анықтамайды әрі бұлшықет пен сіңірдің тұрақты өзгерістерін жоққа шығармайды."
  )
 }
};


/** Third-stage remediation uses simpler, independent physiological observations. */
const basic:Record<string,Item>={
 "concept:basic":{
  prompt:t(
   "В двух опытах Vm покоя и возбуждающий стимул одинаковы. Во втором ВПСП меньше, а входное сопротивление нейрона снизилось. Какое объяснение лучше?",
   "Two trials use the same resting Vm and excitatory stimulus. In the second, the EPSP and measured input resistance are lower. Which explanation fits best?",
   "Екі тәжірибеде тыныштық Vm мен қоздырушы стимул бірдей. Екіншісінде ҚПСП мен кіріс кедергісі төмен. Қай түсіндірме дұрыс?"
  ),
  options:[
   t("Дополнительная мембранная проводимость шунтирует возбуждающий ток, даже если Vm покоя почти не изменился.","Extra membrane conductance shunts excitatory current even if resting Vm barely changes.","Қосымша мембраналық өткізгіштік тыныштық Vm өзгермесе де қоздырушы токты шунттайды."),
   t("Меньший ВПСП доказывает, что возбуждающий стимул вообще не достиг нейрона.","A smaller EPSP proves that the excitatory stimulus never reached the neuron.","ҚПСП азаюы қоздырушы стимул нейронға мүлде жетпегенін дәлелдейді."),
   t("При открытии дополнительных мембранных каналов входное сопротивление обязательно возрастает.","Opening additional membrane channels must increase the neuron's input resistance.","Қосымша мембраналық арналар ашылғанда нейронның кіріс кедергісі міндетті түрде артады."),
   t("Без выраженной гиперполяризации постсинаптическое торможение невозможно.","Postsynaptic inhibition cannot occur without substantial hyperpolarization.","Айқын гиперполяризация болмаса, постсинапстық тежелу мүмкін емес.")
  ],
  explanation:t(
   "При одинаковом токе снижение входного сопротивления уменьшает изменение напряжения. Дополнительная проводимость, например Cl⁻ при Vm≈ECl, ослабляет ВПСП без заметной гиперполяризации. По одному сопротивлению нельзя установить тип канала.",
   "With equal current, lower input resistance produces a smaller voltage change. Added conductance, for example Cl⁻ near ECl, can reduce an EPSP without hyperpolarization. Resistance alone does not identify the channel.",
   "Ток бірдей болса, кіріс кедергісінің төмендеуі кернеу өзгерісін азайтады. Мысалы, Vm≈ECl кезінде Cl⁻ өткізгіштігі ҚПСП-ны гиперполяризациясыз әлсіретеді. Тек кедергі бойынша арна түрін анықтауға болмайды."
  )
 },
 "mechanism:basic":{
  prompt:t(
   "Один ВПСП затухает примерно за 30 мс. Второй такой же ВПСП возникает до полного затухания первого. Какой результат возможен?",
   "One EPSP decays over about 30 ms. A second identical EPSP arrives before the first has completely decayed. What can happen?",
   "Бір ҚПСП шамамен 30 мс ішінде бәсеңдейді. Екінші бірдей ҚПСП біріншісі толық бәсеңдемей тұрып келеді. Не болуы мүмкін?"
  ),
  options:[
   t("Второй ВПСП суммируется с остатком первого, но достижение порога потенциала действия не гарантировано.","The second EPSP adds to the residual first EPSP, but reaching action-potential threshold is not guaranteed.","Екінші ҚПСП біріншісінің қалдығына қосылады, бірақ әрекет потенциалының табалдырығына жету міндетті емес."),
   t("Первый ВПСП немедленно исчезает при поступлении второго возбуждающего стимула.","The first EPSP instantly disappears whenever a second excitatory input arrives.","Екінші қоздырушы кіріс келгенде бірінші ҚПСП бірден толық жоғалады."),
   t("Любые два подпороговых ВПСП обязательно вызывают потенциал действия.","Any two subthreshold EPSPs necessarily trigger an action potential.","Кез келген екі табалдырықасты ҚПСП міндетті түрде әрекет потенциалын тудырады."),
   t("Суммация возможна только в пространстве и никогда не зависит от времени.","Summation is possible only across space and never depends on input timing.","Суммация тек кеңістікте болады және кірістер уақытына мүлде тәуелді емес.")
  ],
  explanation:t(
   "Пока первый ВПСП сохраняется, второй может добавиться к его остаточной деполяризации: это временная суммация. Порог не гарантирован; важны постоянная времени мембраны, затухание и одновременное торможение.",
   "While the first EPSP persists, the second may add to its residual depolarization: temporal summation. Threshold is not guaranteed; membrane time constant, attenuation and concurrent inhibition matter.",
   "Бірінші ҚПСП сақталғанда, екіншісі қалдық деполяризацияға қосылуы мүмкін: бұл уақыттық суммация. Табалдырық міндетті емес; мембрананың уақыт тұрақтысы, бәсеңдеу және қатар жүретін тежелу маңызды."
  )
 },
 "application:basic":{
  prompt:t(
   "Аксон проводит потенциал действия нормально, но в его пресинаптическом окончании частично блокированы потенциал-зависимые Ca²⁺-каналы. Что ожидается?",
   "An axon conducts action potentials normally, but some voltage-gated Ca²⁺ channels in its presynaptic terminal are blocked. What is expected?",
   "Аксон әрекет потенциалын қалыпты өткізеді, бірақ пресинапстық ұшындағы кернеуге тәуелді Ca²⁺ арналары ішінара бөгелген. Не күтіледі?"
  ),
  options:[
   t("Вход Ca²⁺ и вероятность экзоцитоза обычно уменьшаются, поэтому средний постсинаптический ответ может ослабнуть.","Ca²⁺ entry and vesicle-release probability generally fall, so the mean postsynaptic response may decrease.","Ca²⁺ енуі мен везикула бөлінуінің ықтималдығы әдетте азаяды, сондықтан орташа постсинапстық жауап әлсіреуі мүмкін."),
   t("Блокада пресинаптических Ca²⁺-каналов обязательно усиливает выброс медиатора.","Blocking presynaptic Ca²⁺ channels necessarily increases transmitter release.","Пресинапстық Ca²⁺ арналарын бөгеу медиатор бөлінуін міндетті түрде күшейтеді."),
   t("Химическая синаптическая передача не зависит от везикул и внутриклеточного Ca²⁺.","Chemical synaptic transmission never depends on vesicles or intracellular Ca²⁺.","Химиялық синапстық берілу везикулаларға да, жасушаішілік Ca²⁺-ке де тәуелді емес."),
   t("Нормальный аксонный потенциал действия исключает любое изменение выделения медиатора.","A normal axonal action potential rules out any change in transmitter release.","Аксондағы қалыпты әрекет потенциалы медиатор бөлінуінің кез келген өзгерісін жоққа шығарады.")
  ],
  explanation:t(
   "Поступление Ca²⁺ в окончание запускает слияние синаптических везикул. Частичная блокада каналов обычно снижает вероятность квантового выделения медиатора, но не доказывает полного прекращения передачи.",
   "Ca²⁺ entry into the terminal triggers synaptic-vesicle fusion. Partial channel blockade generally reduces quantal release probability but does not prove that transmission stops completely.",
   "Ұшқа Ca²⁺ енуі синапстық везикулалардың қосылуын іске қосады. Арналардың ішінара бөгелуі медиатор кванттарының бөліну ықтималдығын әдетте азайтады, бірақ берілудің толық тоқтағанын дәлелдемейді."
  )
 },
 "transfer:basic":{
  prompt:t(
   "При растяжении мышцы Ia-возбуждение её мотонейрона сохраняется, но тормозный интернейрон к мотонейрону антагониста выключен. Что изменится в модели?",
   "During muscle stretch, Ia excitation of the stretched muscle's motor neuron remains intact, but the inhibitory interneuron to the antagonist is silenced. What changes?",
   "Бұлшықет созылғанда оның мотонейронына Ia-қозу сақталады, бірақ антагонист мотонейронына баратын тежеуші интернейрон өшірілген. Не өзгереді?"
  ),
  options:[
   t("Реципрокное торможение антагониста ослабнет, хотя прямое Ia-возбуждение агониста может сохраниться.","Reciprocal inhibition of the antagonist weakens, while direct Ia excitation of the agonist may remain.","Антагонистің реципрокты тежелуі әлсірейді, ал агонистің тікелей Ia-қозуы сақталуы мүмкін."),
   t("Все потенциалы действия Ia-афферента обязательно исчезнут на всём его протяжении.","All action potentials in the Ia afferent necessarily disappear along its entire length.","Ia-афферент бойындағы барлық әрекет потенциалдары міндетті түрде жоғалады."),
   t("Антагонист полностью парализуется из-за гибели всех его мотонейронов.","The antagonist becomes completely paralyzed because all its motor neurons die.","Антагонист барлық мотонейрондары жойылғандықтан толық салданады."),
   t("Тормозный интернейрон не способен влиять на спинальные мотонейроны антагониста.","An inhibitory interneuron cannot influence spinal motor neurons of the antagonist.","Тежеуші интернейрон антагонистің жұлын мотонейрондарына әсер ете алмайды.")
  ],
  explanation:t(
   "В упрощённой рефлекторной цепи Ia-афферент прямо возбуждает мотонейрон растянутой мышцы и через отдельный тормозный интернейрон подавляет антагониста. Блокада второй ветви не обязана выключать первую.",
   "In the simplified reflex circuit, the Ia afferent directly excites the stretched muscle's motor neuron and inhibits the antagonist through a separate interneuron. Blocking the latter branch need not disable the former.",
   "Қарапайым рефлекстік тізбекте Ia-афферент созылған бұлшықет мотонейронын тікелей қоздырады және бөлек интернейрон арқылы антагонисті тежейді. Екінші тармақты бөгеу біріншісін міндетті түрде өшірмейді."
  )
 },
 "justification:basic":{
  prompt:t(
   "После инсульта при медленном и быстром пассивном растяжении мышцы сопротивление одинаково высокое, а связанной с растяжением ЭМГ не зарегистрировано. Какой вывод осторожнее?",
   "After a stroke, resistance to slow and fast passive stretch is similarly high, and no stretch-related EMG is recorded. Which conclusion is more cautious?",
   "Инсульттен кейін баяу және жылдам пассивті созуға қарсылық бірдей жоғары, ал созылуға байланысты ЭМГ тіркелмеген. Қай қорытынды сақтыққа сай?"
  ),
  options:[
   t("Нужно оценить механическую жёсткость и контрактуру; данные не доказывают активный рефлекторный компонент.","Mechanical stiffness and contracture need assessment; the observations do not prove an active reflex component.","Механикалық қаттылық пен контрактураны бағалау қажет; деректер белсенді рефлекстік үлесті дәлелдемейді."),
   t("Сам факт инсульта доказывает, что всё сопротивление вызвано исключительно рефлексом.","The history of stroke alone proves that all resistance is caused exclusively by a reflex.","Инсульттің өзі барлық қарсылық тек рефлекстен болатынын дәлелдейді."),
   t("Отсутствие ЭМГ означает, что мышцы и сухожилия не могут создавать пассивную силу.","Absent EMG means that muscles and tendons cannot generate any passive force.","ЭМГ болмауы бұлшықет пен сіңірдің пассивті күш тудыра алмайтынын білдіреді."),
   t("Высокое сопротивление прямо измеряет концентрацию ГАМК в спинальных синапсах.","High resistance directly measures GABA concentration in spinal synapses.","Жоғары қарсылық жұлын синапстарындағы ГАМҚ концентрациясын тікелей өлшейді.")
  ],
  explanation:t(
   "Отсутствие скоростной зависимости и зарегистрированной ЭМГ делает необходимой проверку пассивных тканей. Это не доказывает отсутствие всех нервных механизмов: чувствительность ЭМГ и условия измерения ограничивают вывод.",
   "Absent velocity dependence and recorded EMG warrant assessment of passive tissues. They do not exclude every neural mechanism because EMG sensitivity and measurement conditions limit the inference.",
   "Жылдамдыққа тәуелділік пен тіркелген ЭМГ болмауы пассивті тіндерді бағалауды қажет етеді. Бұл барлық жүйкелік тетікті жоққа шығармайды: ЭМГ сезімталдығы мен өлшеу жағдайлары қорытындыны шектейді."
  )
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
 for(const id of ["concept:corrective","mechanism:corrective","application:corrective","transfer:corrective","justification:corrective"]){
  const original=nodes[id];
  if(!original || original.type!=="question" || original.level!=="corrective") throw new Error("Missing module 6 corrective node: "+id);
  const q=corrective[id];
  const options=original.options.map(option=>({
   ...option,
   text:q.options[["a","b","c","d"].indexOf(option.id)]?.[language] ?? option.text
  }));
  if(options.length!==4 || new Set(options.map(option=>option.text)).size!==4) throw new Error("Invalid module 6 corrective options: "+id);
  nodes[id]={...original,prompt:q.prompt[language],options,correctAnswer:"a",explanation:q.explanation[language]};
 }
 for(const id of ["concept:basic","mechanism:basic","application:basic","transfer:basic","justification:basic"]){
  const original=nodes[id];
  if(!original || original.type!=="question" || original.level!=="basic") throw new Error("Missing module 6 basic node: "+id);
  const q=basic[id];
  const options=original.options.map(option=>({
   ...option,
   text:q.options[["a","b","c","d"].indexOf(option.id)]?.[language] ?? option.text
  }));
  if(options.length!==4 || new Set(options.map(option=>option.text)).size!==4) throw new Error("Invalid module 6 basic options: "+id);
  nodes[id]={...original,prompt:q.prompt[language],options,correctAnswer:"a",explanation:q.explanation[language]};
 }
 return {...base,moduleTitle,nodes};
}
