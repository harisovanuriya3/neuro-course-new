import type { Language } from '../course';
import type { QuestionsLesson } from '../study';
import { getSectionTitle } from '../sections';

// Authored module 4 review: Guyton & Hall 13e, ch. 5 (PDF 68–76);
// Ganong 23e, ch. 4 (PDF 96–99); Ghai 8e chart 5-5 (PDF 379–380).
// Vm numbers are for the module's illustrative two-ion Goldman model.
type Item = { prompt: string; explanation: string; target: 'theory' | 'clinical' | 'interactive' };
const data: Record<Language, Item[]> = {
  RU: [
    { prompt: "При 37 °C наружный K⁺ увеличили с 4 до 8 мМ, сохранив внутренний K⁺ 140 мМ и другие параметры двухионной модели. Как изменятся E(K) и Vm и почему они не равны?", explanation: "E(K) становится менее отрицательным: приблизительно −95,0 → −76,5 мВ. В двухионной модели Vm меняется примерно с −71,2 до −62,0 мВ. Vm не равен E(K), потому что в расчёте учитывается также небольшая проницаемость для Na⁺; Cl⁻ и прямой ток насоса в этой модели опущены.", target: "interactive" },
    { prompt: "В отдельном аксоне увеличили силу стимула выше порога, сохранив условия регистрации. Почему высота одного потенциала действия не увеличивается пропорционально стимулу?", explanation: "Потенциал действия регенеративен: после достижения порога положительная обратная связь через потенциал-зависимые Na⁺-каналы запускает импульс почти постоянной амплитуды при одинаковых условиях. В опыте с одним аксоном более сильный надпороговый стимул не увеличивает амплитуду отдельного импульса при одинаковых исходных условиях. Увеличение суммарной амплитуды при стимуляции нервного ствола связано, в частности, с рекрутированием дополнительных волокон; частота разрядов при длительном воздействии — отдельный показатель.", target: "theory" },
    { prompt: "Почему кратковременная деполяризация может облегчить достижение порога, а сильная длительная деполяризация — затруднить возникновение нового импульса?", explanation: "Небольшая краткая деполяризация приближает Vm к порогу. При достаточно сильной и длительной деполяризации возрастает доля инактивированных потенциал-зависимых Na⁺-каналов, что уменьшает доступность каналов для следующего импульса. Итог зависит от амплитуды, длительности и типа клетки; по одному значению Vm блок проведения не диагностируют.", target: "clinical" },
    { prompt: "В учебном симуляторе при повышении наружного K⁺ меняется рассчитанный Vm, но форма нарисованного импульса остаётся прежней. Можно ли по такой кривой заключить, что у пациента сохранилась нормальная возбудимость?", explanation: "Нет. Кривая импульса и расчёт Vm в этом симуляторе независимы; порог и рефрактерность заданы условными правилами, а не кинетикой каналов. Для оценки реальной возбудимости нужны отдельные физиологические измерения и клинический контекст; демонстрация формулы не подтверждает нормальную проводимость или гиперкалиемию.", target: "interactive" },
  ],
  EN: [
    { prompt: "At 37 °C, extracellular K⁺ rises from 4 to 8 mM while intracellular K⁺ remains 140 mM and all other two-ion model parameters are fixed. How do E(K) and Vm change, and why are they different?", explanation: "E(K) becomes less negative, approximately −95.0 → −76.5 mV. The two-ion model predicts Vm of approximately −71.2 → −62.0 mV. Vm differs from E(K) because the calculation also includes a small Na⁺ permeability; Cl⁻ and the pump's direct electrogenic current are omitted from this model.", target: "interactive" },
    { prompt: "A single axon receives a stronger stimulus after threshold has already been reached, with recording conditions held constant. Why does the height of one action potential not increase in proportion to stimulus strength?", explanation: "An action potential is regenerative: above threshold, positive feedback through voltage-gated Na⁺ channels produces a spike of approximately constant amplitude under the same conditions. In the single-axon experiment, a stronger suprathreshold stimulus does not enlarge the individual spike under comparable starting conditions. A larger compound response to nerve-trunk stimulation can instead reflect recruitment of additional axons; firing rate during sustained stimulation is a separate measure.", target: "theory" },
    { prompt: "Why may a brief depolarization facilitate threshold crossing, while strong sustained depolarization makes another spike harder to generate?", explanation: "A small brief depolarization brings Vm closer to threshold. Sufficiently strong sustained depolarization increases the fraction of inactivated voltage-gated Na⁺ channels and reduces their availability for another spike. The outcome depends on magnitude, duration and cell type; a single Vm value cannot diagnose conduction block.", target: "clinical" },
    { prompt: "The teaching simulator changes calculated Vm when extracellular K⁺ changes, but the drawn spike trace stays unchanged. Does this prove that a patient's excitability is normal?", explanation: "No. In this simulator the spike trace and Vm calculation are independent; threshold and refractoriness follow arbitrary teaching rules rather than channel kinetics. Actual excitability requires separate physiological measurements and clinical context; a formula demonstration cannot establish normal conduction or diagnose hyperkalemia.", target: "interactive" },
  ],
  KZ: [
    { prompt: "37 °C-та жасушадан тыс K⁺ мөлшері 4-тен 8 мМ-ге артты, ал жасуша ішіндегі K⁺ 140 мМ және екі ионды модельдің басқа параметрлері өзгермеді. E(K) мен Vm қалай өзгереді және неліктен олар тең емес?", explanation: "E(K) азырақ теріс болады: шамамен −95,0 → −76,5 мВ. Екі ионды модельде Vm шамамен −71,2 → −62,0 мВ-ке өзгереді. Vm мен E(K) тең емес, себебі есепте Na⁺ үшін аздаған өткізгіштік те ескеріледі; Cl⁻ пен сорғының тікелей электрогендік тогы бұл модельге кірмейді.", target: "interactive" },
    { prompt: "Жеке аксонға табалдырықтан жоғары күштірек стимул берілді, тіркеу жағдайлары өзгермеді. Неліктен бір әрекет потенциалының амплитудасы стимул күшімен бірге өспейді?", explanation: "Әрекет потенциалы регенеративті: табалдырықтан асқанда кернеуге тәуелді Na⁺ арналарының оң кері байланысы бірдей жағдайда шамамен тұрақты амплитудалы импульс тудырады. Бір аксонмен жүргізілген тәжірибеде бастапқы жағдайлар бірдей болса, күштірек табалдырықтан жоғары стимул жеке импульстің амплитудасын арттырмайды. Жүйке бағанын тітіркендіргендегі жиынтық жауаптың ұлғаюы қосымша аксондардың іске қосылуымен байланысты болуы мүмкін; ұзақ әсер кезіндегі разряд жиілігі — бөлек көрсеткіш.", target: "theory" },
    { prompt: "Неліктен қысқа деполяризация табалдырыққа жетуді жеңілдетуі мүмкін, ал күшті әрі ұзақ деполяризация жаңа импульстің пайда болуын қиындатады?", explanation: "Шағын әрі қысқа деполяризация Vm-ді табалдырыққа жақындатады. Жеткілікті күшті және ұзақ деполяризация кернеуге тәуелді Na⁺ арналарының инактивтенген үлесін арттырып, олардың келесі импульске қолжетімділігін азайтады. Нәтиже өзгеріс шамасына, ұзақтығына және жасуша түріне тәуелді; тек бір Vm мәнімен өткізу блогын анықтауға болмайды.", target: "clinical" },
    { prompt: "Оқу симуляторында сыртқы K⁺ өзгергенде есептелген Vm өзгереді, бірақ салынған импульс қисығы сол күйінде қалады. Бұл пациенттің қозғыштығы қалыпты екенін дәлелдей ме?", explanation: "Жоқ. Бұл симуляторда импульс қисығы мен Vm есебі бір-бірінен тәуелсіз; табалдырық пен рефрактерлік арна кинетикасымен емес, шартты оқу ережелерімен анықталады. Нақты қозғыштықты бағалау үшін бөлек физиологиялық өлшеулер мен клиникалық деректер қажет; формула қалыпты өткізуді де, гиперкалиемия диагнозын да дәлелдемейді.", target: "interactive" },
  ],
};

export function createModuleFourQuestions(language: Language): QuestionsLesson {
  return {
    kind: 'questions',
    title: getSectionTitle('questions', language),
    introduction: language === 'RU'
      ? 'Четыре предметных вопроса: сначала сформулируйте свой прогноз, затем откройте разбор.'
      : language === 'EN'
        ? 'Four physiology questions: make your prediction before revealing the explanation.'
        : 'Физиология бойынша төрт сұрақ: алдымен болжам жасаңыз, содан кейін түсіндірмені ашыңыз.',
    questions: data[language].map((item, index) => ({
      id: 'module-4-review-' + (index + 1),
      prompt: item.prompt,
      explanation: item.explanation,
      target: { section: item.target },
    })),
  };
}
