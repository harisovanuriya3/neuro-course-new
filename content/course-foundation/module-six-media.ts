import type { Language } from "../course";
import type { MediaLesson } from "../media";

// Module 6 only. Schematic values agree with IntegrationExperimentLab.tsx:
// baseline −70 mV; each simultaneous EPSP +6 mV; illustrative IPSP −4.5 mV;
// illustrative threshold −55 mV. NOT a physiological voltage recording.
// Reviewed against Ganong 23e, PDF pp. 132–133; Guyton & Hall 13e,
// PDF pp. 564–565. Ghai 8e, PDF pp. 353–354 describes a peripheral
// nerve–muscle experiment, not a measurement of central EPSP/IPSP integration.
type Copy={
 title:string;introduction:string;preview:string;
 transcript:[string,string,string,string];
 prompt:string;explanation:string;
 options:[string,string,string,string];
 feedback:[string,string,string,string];
};
const copy:Record<Language,Copy>={
 RU:{
  title:"Интеграция ВПСП и торможения: четыре шага",
  introduction:"Пошаговая учебная модель совпадающих по времени постсинаптических входов. Числа и порог условны; диаграмма не является записью нейрона, моделью проводимостей или доказательством возникновения потенциала действия.",
  preview:"До каждого шага предскажите изменение условной оценки Vm. Сравните 2 и 3 одновременных ВПСП, затем добавьте один гиперполяризующий вход. В реальной клетке важны расположение синапсов, проводимости и время.",
  transcript:[
   "1. Исходное состояние: условный Vm = −70 мВ, порог −55 мВ. Это заданные числа модели, а не универсальные физиологические нормы.",
   "2. Два совпадающих ВПСП по +6 мВ: −70 + 12 = −58 мВ, ниже условного порога. Пространственная суммация зависит также от расположения и электротонического распространения.",
   "3. Три совпадающих ВПСП: −70 + 18 = −52 мВ, выше условного порога. Только в рамках линейного расчёта прогнозируется достижение порога; форма и запуск реального ПД не рассчитываются.",
   "4. При добавлении условного гиперполяризующего ТПСП −4,5 мВ: −70 + 18 − 4,5 = −56,5 мВ, ниже порога. Это не модель шунтирования: открытие тормозных каналов может ослаблять ВПСП и без заметной гиперполяризации."
  ],
  prompt:"В линейной модели Vm исходно −70 мВ. Одновременно приходят три ВПСП по +6 мВ и один условный гиперполяризующий ТПСП −4,5 мВ. Какой вывод корректен?",
  explanation:"−70 + 3 × 6 − 4,5 = −56,5 мВ: условный порог −55 мВ не достигнут. Это арифметический результат учебной модели, а не запись мембранного потенциала и не доказательство отсутствия разряда в реальном нейроне. Шунтирующее торможение здесь не вычисляется.",
  options:[
   "−52 мВ, порог достигнут: тормозный вход не влияет на сумму.",
   "−56,5 мВ, ниже условного порога; результат относится только к этой модели.",
   "−58 мВ: третий возбуждающий вход обязательно полностью исчезает.",
   "−74,5 мВ: три ВПСП не суммируются при наличии торможения."
  ],
  feedback:[
   "Это результат без тормозного входа. В заданной модели нужно вычесть ещё 4,5 мВ.",
   "Верно: три условных ВПСП суммируются, затем учитывается заданный тормозный вклад. Реальный разряд этим расчётом не диагностируется.",
   "Нет: при трёх одновременных ВПСП в этой модели учитываются все три входа.",
   "Нет: в заданной модели торможение не обнуляет все возбуждающие вклады."
  ]
 },
 EN:{
  title:"EPSP integration and inhibition: four steps",
  introduction:"A stepped teaching model of simultaneous postsynaptic inputs. Values and threshold are illustrative; the diagram is not a neuronal recording, a conductance model, or proof that a spike occurred.",
  preview:"Before each step, predict the change in the illustrative Vm estimate. Compare two and three simultaneous EPSPs, then add one hyperpolarizing input. Real cells also depend on synapse location, conductance and timing.",
  transcript:[
   "1. Baseline: illustrative Vm = −70 mV, threshold −55 mV. These are assigned model values, not universal physiological norms.",
   "2. Two coincident +6-mV EPSPs: −70 + 12 = −58 mV, below the illustrative threshold. Spatial summation also depends on location and electrotonic spread.",
   "3. Three coincident EPSPs: −70 + 18 = −52 mV, above the illustrative threshold. Threshold crossing is predicted only by the linear arithmetic; actual spike initiation and waveform are not computed.",
   "4. Add an illustrative −4.5-mV hyperpolarizing IPSP: −70 + 18 − 4.5 = −56.5 mV, below threshold. This does not model shunting: inhibitory conductance can attenuate EPSPs without appreciable hyperpolarization."
  ],
  prompt:"In a linear model, baseline Vm is −70 mV. Three +6-mV EPSPs and one illustrative −4.5-mV hyperpolarizing IPSP arrive together. Which conclusion is justified?",
  explanation:"−70 + 3 × 6 − 4.5 = −56.5 mV, below the illustrative −55-mV threshold. This is arithmetic in a teaching model, not a membrane recording or evidence that a real neuron cannot fire. Shunting inhibition is not calculated.",
  options:[
   "−52 mV and threshold crossed: the inhibitory input cannot affect the sum.",
   "−56.5 mV, below the illustrative threshold; this conclusion applies only to the model.",
   "−58 mV because the third excitatory input necessarily vanishes.",
   "−74.5 mV because the presence of inhibition cancels all three EPSPs."
  ],
  feedback:[
   "That omits the specified inhibitory contribution of −4.5 mV.",
   "Correct: sum the three illustrative EPSPs, then apply the assigned inhibitory term. This does not diagnose real neuronal firing.",
   "No: all three coincident EPSPs are included in this model.",
   "No: the assigned inhibitory input does not erase all excitatory terms."
  ]
 },
 KZ:{
  title:"ҚПСП интеграциясы және тежелу: төрт қадам",
  introduction:"Бір мезгілде келетін постсинапстық кірістердің қадамдық оқу моделі. Сандар мен табалдырық шартты; сызба нейроннан алынған жазба да, өткізгіштіктер моделі де, әрекет потенциалының туғанына дәлел де емес.",
  preview:"Әр қадам алдында Vm-нің шартты бағасы қалай өзгеретінін болжаңыз. Екі және үш бір мезгілдегі ҚПСП-ны салыстырып, кейін бір гиперполяризациялаушы кірісті қосыңыз. Нақты жасушада синапстардың орны, өткізгіштік және уақыт маңызды.",
  transcript:[
   "1. Бастапқы күй: шартты Vm = −70 мВ, табалдырық −55 мВ. Бұлар модельге берілген мәндер, әмбебап физиологиялық норма емес.",
   "2. Бір мезгілдегі екі ҚПСП (+6 мВ-тан): −70 + 12 = −58 мВ, шартты табалдырықтан төмен. Кеңістіктік суммация синапстардың орнына және электротондық таралуға да тәуелді.",
   "3. Бір мезгілдегі үш ҚПСП: −70 + 18 = −52 мВ, шартты табалдырықтан жоғары. Табалдырыққа жету тек сызықтық есепте болжанады; нақты әрекет потенциалының басталуы мен пішіні есептелмейді.",
   "4. Шартты −4,5 мВ гиперполяризациялаушы ТПСП қосылса: −70 + 18 − 4,5 = −56,5 мВ, табалдырықтан төмен. Бұл шунттауды модельдемейді: тежеуші өткізгіштік айқын гиперполяризациясыз да ҚПСП-ны әлсірете алады."
  ],
  prompt:"Сызықтық модельде бастапқы Vm = −70 мВ. Бір мезгілде +6 мВ-тық үш ҚПСП және шартты −4,5 мВ-тық бір гиперполяризациялаушы ТПСП келеді. Қай қорытынды негізді?",
  explanation:"−70 + 3 × 6 − 4,5 = −56,5 мВ: шартты −55 мВ табалдырыққа жетпейді. Бұл оқу моделінің арифметикалық нәтижесі, мембранадан алынған жазба да, нақты нейрон разряды болмайтынының дәлелі де емес. Шунттаушы тежелу есептелмейді.",
  options:[
   "−52 мВ, табалдырыққа жетті: тежеуші кіріс қосындыға әсер етпейді.",
   "−56,5 мВ, шартты табалдырықтан төмен; қорытынды тек осы модельге қатысты.",
   "−58 мВ: үшінші қоздырушы кіріс міндетті түрде толық жоғалады.",
   "−74,5 мВ: тежелу болғанда үш ҚПСП мүлде қосылмайды."
  ],
  feedback:[
   "Бұл нәтиже шартты −4,5 мВ тежеуші үлесті ескермейді.",
   "Дұрыс: үш шартты ҚПСП қосылып, содан кейін берілген тежеуші үлес ескеріледі. Нақты нейрон разрядын бұл есеппен анықтау мүмкін емес.",
   "Жоқ: бұл модельде бір мезгілдегі үш ҚПСП-ның барлығы есептеледі.",
   "Жоқ: берілген тежеуші кіріс барлық қоздырушы үлесті жоймайды."
  ]
 }
};

export function createModuleSixMedia(language:Language,base:MediaLesson):MediaLesson {
 const c=copy[language];
 const block=base.blocks[0];
 if(!block)throw new Error("Module 6 media base block missing");
 return {...base,introduction:c.introduction,blocks:[{
  ...block,id:"module-6-epsp-ipsp-sequence",title:c.title,preview:c.preview,
  transcript:c.transcript,theoryAnchor:"summation-mechanisms",animation:"foundation",
  question:{
   prompt:c.prompt,correctAnswer:"b",explanation:c.explanation,
   options:c.options.map((text,i)=>({
    id:["a","b","c","d"][i],text,feedback:c.feedback[i]
   }))
  }
 }]};
}
