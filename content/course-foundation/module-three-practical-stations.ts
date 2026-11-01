import type {Language} from "../course";
const stations=[
  {
    "title": [
      "Практикум 1. Морфология нейрона и направление сигнала",
      "Practical 1. Neuron morphology and signal direction",
      "1-практикум. Нейрон морфологиясы және сигнал бағыты"
    ],
    "task": [
      "На анатомическом изображении нейрона найдите дендриты, сому, начальный сегмент аксона, аксон и окончания. Сопоставьте структуры с получением синаптических сигналов, интеграцией, генерацией потенциала действия и выделением медиатора. Объясните, почему дендриты могут быть электрически активными и почему морфологическое изображение не доказывает скорость проведения.",
      "Identify dendrites, soma, axon initial segment, axon and terminals in a neuron image. Match them to synaptic input, integration, spike initiation and transmitter release. Explain why dendrites may be electrically active and why morphology alone does not establish conduction velocity.",
      "Нейрон суретінен дендриттерді, соманы, аксонның бастапқы сегментін, аксонды және ұштарын табыңыз. Оларды синапстық кіріс, интеграция, әрекет потенциалы және медиатор бөлінуімен сәйкестендіріңіз. Дендриттердің электрлік белсенді болуы мүмкін екенін және морфология өткізгіштік жылдамдығын дәлелдемейтінін түсіндіріңіз."
    ],
    "answer": [
      "Функция зависит от распределения каналов и синапсов. Потенциал действия часто возникает в начальном сегменте, но морфология не заменяет электрофизиологию.",
      "Function depends on channel and synapse distribution. Spikes often begin at the initial segment, but morphology cannot replace electrophysiology.",
      "Қызмет арналар мен синапстардың таралуына тәуелді. Импульс көбіне бастапқы сегментте пайда болады, бірақ морфология электрофизиологияны алмастырмайды."
    ]
  },
  {
    "title": [
      "Практикум 2. Миелин и скорость проведения",
      "Practical 2. Myelin and conduction",
      "2-практикум. Миелин және өткізу"
    ],
    "task": [
      "Сравните два учебных аксона одинаковой длины: миелинизированный и демиелинизированный. Предскажите изменение задержки, возможный блок проведения и влияние температуры. Отделите увеличение сопротивления мембраны от снижения её эффективной ёмкости. Не называйте сальтаторное проведение буквальным прыжком заряда.",
      "Compare equally long myelinated and demyelinated teaching axons. Predict changes in latency, possible conduction block and temperature effects. Distinguish increased membrane resistance from reduced effective capacitance. Saltatory conduction is not a literal jump of charge.",
      "Ұзындығы бірдей миелинді және демиелинденген аксондарды салыстырыңыз. Кідіріс, өткізудің блокталуы және температура әсерін болжаңыз. Мембрана кедергісінің артуын тиімді сыйымдылықтың азаюынан ажыратыңыз. Сальтаторлық өткізу зарядтың сөзбе-сөз секіруі емес."
    ],
    "answer": [
      "Миелин быстрым проведением способствует за счёт электрической изоляции интернодов; демиелинизация может замедлять проведение и вызывать блок.",
      "Myelin electrically insulates internodes, enabling fast conduction; demyelination may slow conduction or cause block.",
      "Миелин түйінаралық бөліктерді электрлік оқшаулап, өткізуді жылдамдатады; демиелинизация баяулау мен блокқа әкелуі мүмкін."
    ]
  },
  {
    "title": [
      "Практикум 3. Астроциты и внеклеточный калий",
      "Practical 3. Astrocytes and extracellular potassium",
      "3-практикум. Астроциттер және жасушадан тыс калий"
    ],
    "task": [
      "В мысленном эксперименте активность нейронной сети увеличила внеклеточную концентрацию K⁺. Объясните роль астроцитов в буферизации и пространственном перераспределении калия, влияние на равновесный потенциал и возбудимость. Укажите, какие параметры надо контролировать, чтобы отличить изменения нейронных каналов от нарушений глиальной регуляции.",
      "In a thought experiment, increased network activity raises extracellular K⁺. Explain astrocytic buffering and spatial redistribution, effects on equilibrium potential and excitability. Specify controls distinguishing neuronal channel changes from impaired glial regulation.",
      "Ойша тәжірибеде желі белсенділігі жасушадан тыс K⁺ мөлшерін арттырды. Астроциттердің калийді буферлеуі мен кеңістіктік қайта таратуын, тепе-теңдік потенциалы мен қозғыштыққа әсерін түсіндіріңіз. Нейрон арнасының өзгерісін глия реттелуінен ажырататын бақылауларды атаңыз."
    ],
    "answer": [
      "Повышение внеклеточного K⁺ обычно делает калиевый равновесный потенциал менее отрицательным; итоговая возбудимость зависит от масштаба и длительности изменения.",
      "Higher extracellular K⁺ generally makes the potassium equilibrium potential less negative; the net excitability effect depends on magnitude and duration.",
      "Жасушадан тыс K⁺ артуы калийдің тепе-теңдік потенциалын әдетте азырақ теріс етеді; қозғыштық әсері өзгеріс шамасы мен ұзақтығына тәуелді."
    ]
  }
,
  {"title":["Практикум 4. Уравнение Нернста и мембранный потенциал","Practical 4. Nernst equation and membrane voltage","4-практикум. Нернст теңдеуі және мембраналық потенциал"],"task":["Для иона K⁺ при 37 °C используйте приближение E_K≈61,5·log10([K⁺]наруж/[K⁺]внутр) мВ. Рассчитайте потенциал при 4 и 140 ммоль/л, затем при 8 и 140 ммоль/л. Объясните, почему увеличение наружного калия делает E_K менее отрицательным и почему мембранный потенциал не обязан совпадать с E_K. Контроль: температура, проницаемости других ионов и активность насосов.","For K⁺ at 37 °C use E_K≈61.5·log10([K⁺]out/[K⁺]in) mV. Calculate at 4/140 and 8/140 mmol/L. Explain why higher extracellular K⁺ makes E_K less negative and why resting voltage need not equal E_K. Control temperature, other ionic permeabilities and pump activity.","37 °C-та K⁺ үшін E_K≈61,5·log10([K⁺]сырт/[K⁺]іш) мВ жуықтауын қолданыңыз. 4/140 және 8/140 ммоль/л үшін есептеңіз. Сыртқы калий артқанда E_K неге азырақ теріс болатынын және тыныштық потенциалы неге оған дәл тең емес екенін түсіндіріңіз."],"answer":["При 4/140 E_K приблизительно −95 мВ, при 8/140 около −76 мВ. Это равновесные потенциалы калия, не прямые измерения мембранного потенциала.","At 4/140 E_K is about −95 mV and at 8/140 about −76 mV. These are potassium equilibrium potentials, not direct measurements of resting voltage.","4/140 кезінде E_K шамамен −95 мВ, 8/140 кезінде −76 мВ. Бұлар калийдің тепе-теңдік потенциалдары, тыныштық потенциалының тікелей өлшемі емес."]},
  {"title":["Практикум 5. Синаптическая суммация и торможение","Practical 5. Synaptic summation and inhibition","5-практикум. Синапстық қосылу және тежелу"],"task":["Сравните два подпороговых возбуждающих постсинаптических потенциала, приходящих одновременно на разные дендриты, с двумя сигналами в одном синапсе с небольшим временным интервалом. Объясните пространственную и временную суммацию, роль мембранной постоянной времени и шунтирующего торможения. Не складывайте амплитуды механически: нелинейность дендритов и положение синапсов изменяют результат.","Compare two subthreshold excitatory postsynaptic potentials arriving on separate dendrites simultaneously with two closely spaced inputs at one synapse. Explain spatial and temporal summation, membrane time constant and shunting inhibition. Do not assume linear amplitude addition: dendritic nonlinearities and synapse position matter.","Әртүрлі дендриттерге бір уақытта келген екі табалдырықасты қоздырғыш потенциалды бір синапста қысқа аралықпен келген екі сигналмен салыстырыңыз. Кеңістіктік және уақыттық қосылуды, мембрана уақыт тұрақтысын және шунттаушы тежелуді түсіндіріңіз. Амплитудаларды жай қоспаңыз: дендрит пен синапс орны маңызды."],"answer":["Пространственная суммация объединяет разные входы, временная — близкие по времени. Торможение может уменьшать входное сопротивление и ослаблять возбуждающий ответ.","Spatial summation combines separate inputs; temporal summation combines nearby events. Inhibition may lower input resistance and attenuate excitation.","Кеңістіктік қосылу әртүрлі кірістерді, уақыттық қосылу жақын оқиғаларды біріктіреді. Тежелу кіріс кедергісін азайтып, қозуды әлсіретуі мүмкін."]},
  {"title":["Практикум 6. Клиническая локализация демиелинизации","Practical 6. Localizing demyelination clinically","6-практикум. Демиелинизацияны клиникалық локализациялау"],"task":["Сравните две учебные ситуации: у пациента А болезненное снижение зрения одного глаза и нарушение цветоощущения; у пациента Б симметричная дистальная слабость, снижение сухожильных рефлексов и замедление периферической нервной проводимости. Определите возможные центральную и периферическую локализации, предложите альтернативные причины и подходящие исследования. Не устанавливайте конкретный диагноз только по описанию.","Compare two teaching cases: patient A has painful monocular visual loss and reduced color perception; patient B has symmetric distal weakness, reduced tendon reflexes and slow peripheral nerve conduction. Propose central versus peripheral sites, alternatives and appropriate investigations. Do not diagnose a specific disorder from the description alone.","Екі оқу жағдайын салыстырыңыз: А науқасында бір көздің ауырсынумен көруі және түсті ажыратуы төмендеген; Б науқасында симметриялы дисталдық әлсіздік, рефлекстер төмендеуі және шеткі нерв өткізгіштігінің баяулауы бар. Орталық және шеткі локализацияны, балама себептерді және зерттеулерді ұсыныңыз."],"answer":["Первый случай допускает поражение зрительного нерва и требует офтальмологической и неврологической оценки; второй поддерживает периферический процесс. Эти признаки неспецифичны и требуют подтверждения.","The first suggests possible optic nerve involvement and warrants ophthalmic and neurological evaluation; the second supports a peripheral process. Both require confirmation.","Бірінші жағдай көру нервінің ықтимал зақымын, екіншісі шеткі үдерісті қолдайды; екеуі де қосымша тексеруді қажет етеді."]}
] as const;
export function moduleThreePracticalStations(language:Language){const i=language==="RU"?0:language==="EN"?1:2;return stations.map(s=>({title:s.title[i],blocks:[{type:"paragraph" as const,text:s.task[i]},{type:"response" as const,label:language==="RU"?"Ваше объяснение и наблюдения":language==="EN"?"Your reasoning and observations":"Түсіндіруіңіз және бақылауларыңыз"},{type:"answer" as const,items:[s.answer[i]]}]}));}
