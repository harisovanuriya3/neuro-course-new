import type { Language } from '../course';
import type { SectionLesson } from '../types';

// Verified against Guyton & Hall 13e ch. 5 (PDF 68–76),
// Ganong 23e ch. 4 (PDF 96–100), Ghai 8e chart 5-5 (PDF 379–381).
type TheoryLesson = Extract<SectionLesson, { kind: 'theory' }>;
type Copy = { title: string; paragraphs: [string, string] };
const localized: Record<Language, [Copy, Copy]> = {
 RU: [
  { title: 'Нернст и Гольдман: проверяем числа',
    paragraphs: [
      'Уравнение Нернста рассчитывает равновесный потенциал отдельного иона. Потенциал покоя зависит от градиентов и относительной проницаемости нескольких ионов: поэтому Vm не обязательно совпадает с E(K). Na⁺/K⁺-АТФаза поддерживает градиенты, но не вызывает быструю реполяризацию каждого импульса.',
      'При исходных параметрах лаборатории (37 °C; K⁺ снаружи/внутри 4/140 мМ; Na⁺ 145/12 мМ; P(K)=1, P(Na)=0,04) E(K) ≈ −95,0 мВ, E(Na) ≈ +66,6 мВ и Vm ≈ −71,2 мВ. Это расчёт двухионной модели без Cl⁻ и прямого электрогенного вклада насоса, а не универсальная норма для всех нейронов.'
    ] },
  { title: 'Границы закона «всё или ничего» и лабораторной модели',
    paragraphs: [
      'Подпороговый стимул может дать локальный градуальный ответ без распространяющегося импульса. В отдельном аксоне потенциал действия после достижения порога регенеративен: усиление надпорогового стимула само по себе не увеличивает амплитуду каждого импульса. Абсолютная рефрактерность главным образом связана с инактивацией Na⁺-каналов, относительная — с их неполным восстановлением и сохраняющейся K⁺-проводимостью. При длительном стимуле частота разрядов может отражать интенсивность воздействия; при стимуляции нервного ствола дополнительным механизмом служит рекрутирование волокон. Это не изменение амплитуды импульса одного аксона.',
      'В лаборатории расчёт Vm и условная кривая потенциала действия — разные части модели. Кривая остаётся −70 → +30 мВ при изменении ионных концентраций; решение об импульсе задаётся условными порогами стимула и интервала, а не кинетикой Na⁺-каналов. По этому опыту нельзя предсказать реальную возбудимость при гиперкалиемии или поставить диагноз.'
    ] }
 ],
 EN: [
  { title: 'Nernst and Goldman: check the numbers',
    paragraphs: [
      'The Nernst equation gives the equilibrium potential for a single ion. Resting Vm depends on several ion gradients and relative permeabilities, so Vm need not equal E(K). Na⁺/K⁺-ATPase maintains the gradients but does not produce the rapid repolarization of each spike.',
      'At laboratory defaults (37 °C; K⁺ outside/inside 4/140 mM; Na⁺ 145/12 mM; P(K)=1, P(Na)=0.04), E(K) ≈ −95.0 mV, E(Na) ≈ +66.6 mV and Vm ≈ −71.2 mV. These are two-ion model outputs that omit Cl⁻ and the direct electrogenic pump contribution, not universal neuronal normal values.'
    ] },
  { title: 'Limits of all-or-none behavior and of the laboratory',
    paragraphs: [
      'A subthreshold stimulus may evoke a graded local response without a propagated spike. In a single axon, an action potential is regenerative once threshold is reached; stronger suprathreshold stimulation does not itself increase the amplitude of each spike. Absolute refractoriness mainly reflects Na⁺-channel inactivation, while relative refractoriness reflects incomplete Na⁺-channel recovery and persisting K⁺ conductance. During sustained stimulation, firing rate may encode intensity; stimulating a nerve trunk can additionally recruit more fibers. Neither mechanism increases the amplitude of one axon's spike.',
      'The calculated Vm and the illustrative action-potential trace are separate parts of the laboratory. The trace remains −70 → +30 mV when ion concentrations change; spike occurrence follows arbitrary teaching thresholds for stimulus strength and interval, not Na⁺-channel kinetics. This experiment cannot predict actual excitability in hyperkalemia or establish a diagnosis.'
    ] }
 ],
 KZ: [
  { title: 'Нернст пен Гольдман: есептелген мәндерді салыстыру',
    paragraphs: [
      'Нернст теңдеуі бір ионның тепе-теңдік потенциалын есептейді. Тыныштық Vm бірнеше ионның градиенттері мен салыстырмалы өткізгіштігіне тәуелді, сондықтан ол E(K) мәніне міндетті түрде тең емес. Na⁺/K⁺-АТФаза градиенттерді сақтайды, бірақ әр импульстің жылдам реполяризациясын тудырмайды.',
      'Зертхананың бастапқы параметрлерінде (37 °C; K⁺ сыртта/іште 4/140 мМ; Na⁺ 145/12 мМ; P(K)=1, P(Na)=0,04) E(K) ≈ −95,0 мВ, E(Na) ≈ +66,6 мВ және Vm ≈ −71,2 мВ. Бұл Cl⁻ пен сорғының тікелей электрогендік үлесін ескермейтін екі ионды модельдің нәтижелері; барлық нейронға ортақ норма емес.'
    ] },
  { title: '«Бәрі немесе ештеңе» заңы мен зертхана моделінің шектеулері',
    paragraphs: [
      'Табалдырықтан төмен стимул таралатын импульссіз жергілікті градуалды жауап туғызуы мүмкін. Жеке аксонда табалдырыққа жеткенде әрекет потенциалы регенеративті болады; табалдырықтан жоғары стимулды күшейту жеке импульстің амплитудасын арттырмайды. Абсолютті рефрактерлік көбіне Na⁺ арналарының инактивациясымен, салыстырмалы кезең олардың толық қалпына келмеуі және K⁺ өткізгіштігінің сақталуымен байланысты. Ұзақ тітіркендіруде разряд жиілігі әсер қарқындылығын көрсетуі мүмкін, ал жүйке бағанын тітіркендіргенде қосымша талшықтар да іске қосылады. Бұл жеке аксон импульсінің амплитудасын арттырмайды.',
      'Зертханадағы есептелген Vm мен шартты әрекет потенциалы қисығы — модельдің екі бөлек бөлігі. Ион концентрациялары өзгерсе де қисық −70 → +30 мВ күйінде қалады; импульс нәтижесі Na⁺ арналарының кинетикасымен емес, стимул күші мен аралықтың шартты табалдырықтарымен анықталады. Бұл тәжірибеден гиперкалиемиядағы нақты қозғыштықты немесе диагнозды анықтауға болмайды.'
    ] }
 ]
};
export function createModuleFourTheory(language: Language, base: TheoryLesson): TheoryLesson {
 const sections = localized[language].map((entry, index) => ({
  id: index === 0 ? 'module-four-nernst-goldman' : 'module-four-model-limits',
  title: entry.title,
  blocks: entry.paragraphs.map(text => ({ type: 'paragraph' as const, text }))
 }));
 return { ...base, sections: [...base.sections, ...sections] };
}
