import type { Language } from '../course';
import { getSectionTitle } from '../sections';
import type { ObjectivesLesson, ReadingLesson } from '../study';

// Module 4: factual one-minute recap, not an ungraded instruction template.
// Cross-checked with Guyton & Hall 13e ch. 5 (PDF pp. 69–74),
// Ganong 23e ch. 4 (PDF pp. 96–99), and Ghai 8e chart 5-5 (PDF pp. 379–380).
type Point = { title: string; explanation: string };
type FivePoints = [Point, Point, Point, Point, Point];
const points: Record<Language, FivePoints> = {
  RU: [
    { title: '1. Потенциал покоя: градиенты и проницаемость',
      explanation: 'В покое мембрана обычно гораздо проницаемее для K⁺, чем для Na⁺. Na⁺/K⁺-АТФаза поддерживает ионные градиенты и даёт небольшой прямой электрогенный вклад; она не обеспечивает быструю реполяризацию каждого импульса.' },
    { title: '2. Нернст — один ион; Гольдман — несколько',
      explanation: 'Уравнение Нернста определяет равновесный потенциал одного иона. Потенциал мембраны зависит от нескольких градиентов и проницаемостей. В двухионной учебной модели при 37 °C: E(K) ≈ −95 мВ, Vm ≈ −71 мВ; это не универсальные нормы.' },
    { title: '3. Возникновение и завершение импульса',
      explanation: 'При достижении порога быстро открываются потенциал-зависимые Na⁺-каналы, вызывая регенеративную деполяризацию. Инактивация Na⁺-каналов и запаздывающее увеличение K⁺-проводимости обеспечивают реполяризацию.' },
    { title: '4. «Всё или ничего» и рефрактерность',
      explanation: 'В отдельном аксоне подпороговый стимул даёт локальный ответ, а надпороговый запускает полноценный импульс. Абсолютная рефрактерность связана главным образом с инактивацией Na⁺-каналов; относительная — с неполным восстановлением каналов и сохраняющейся K⁺-проводимостью.' },
    { title: '5. Что не доказывает симуляция',
      explanation: 'Лаборатория отдельно рассчитывает Vm и рисует условную кривую импульса. Её фиксированные пороги и форма сигнала не моделируют кинетику каналов, блок проведения или клиническую гиперкалиемию; по ним нельзя ставить диагноз.' },
  ],
  EN: [
    { title: '1. Resting voltage: gradients and permeability',
      explanation: 'At rest, the membrane is usually much more permeable to K⁺ than Na⁺. Na⁺/K⁺-ATPase maintains ion gradients and makes a small direct electrogenic contribution; it does not rapidly repolarize each spike.' },
    { title: '2. Nernst: one ion; Goldman: several ions',
      explanation: 'The Nernst equation gives the equilibrium potential of one ion. Membrane voltage depends on multiple gradients and permeabilities. In the two-ion teaching model at 37 °C, E(K) ≈ −95 mV and Vm ≈ −71 mV; these are not universal normal values.' },
    { title: '3. How a spike starts and ends',
      explanation: 'At threshold, voltage-gated Na⁺ channels open rapidly, producing regenerative depolarization. Na⁺-channel inactivation and a delayed rise in K⁺ conductance drive repolarization.' },
    { title: '4. All-or-none firing and refractoriness',
      explanation: 'In a single axon, a subthreshold stimulus produces a local response, while a suprathreshold stimulus elicits a full spike. Absolute refractoriness mainly reflects Na⁺-channel inactivation; relative refractoriness involves incomplete recovery and persistent K⁺ conductance.' },
    { title: '5. What the simulation cannot establish',
      explanation: 'The laboratory computes Vm separately from its illustrative spike trace. Its fixed thresholds and waveform do not model channel kinetics, conduction block or clinical hyperkalemia; they cannot establish a diagnosis.' },
  ],
  KZ: [
    { title: '1. Тыныштық потенциалы: градиент пен өткізгіштік',
      explanation: 'Тыныштықта мембрана Na⁺-ке қарағанда K⁺-ке әдетте әлдеқайда өткізгіш. Na⁺/K⁺-АТФаза иондық градиенттерді сақтап, аздаған тікелей электрогендік үлес қосады; әр импульстің жылдам реполяризациясын өзі тудырмайды.' },
    { title: '2. Нернст — бір ион; Гольдман — бірнеше ион',
      explanation: 'Нернст теңдеуі бір ионның тепе-теңдік потенциалын анықтайды. Мембраналық потенциал бірнеше градиент пен өткізгіштікке тәуелді. 37 °C-тағы екі ионды оқу моделінде E(K) ≈ −95 мВ, Vm ≈ −71 мВ; бұлар барлық нейронға ортақ қалыпты мәндер емес.' },
    { title: '3. Импульстің басталуы мен аяқталуы',
      explanation: 'Табалдырыққа жеткенде потенциалға тәуелді Na⁺ арналары жылдам ашылып, регенеративті деполяризация туғызады. Na⁺ арналарының инактивациясы мен K⁺ өткізгіштігінің кешігіп артуы реполяризацияға әкеледі.' },
    { title: '4. «Бәрі немесе ештеңе» және рефрактерлік',
      explanation: 'Жеке аксонда табалдырықтан төмен стимул жергілікті жауап, ал табалдырықтан жоғары стимул толық импульс туғызады. Абсолютті рефрактерлік негізінен Na⁺ арналарының инактивациясына, салыстырмалы рефрактерлік олардың толық қалпына келмеуі мен сақталған K⁺ өткізгіштігіне байланысты.' },
    { title: '5. Симуляция нені дәлелдемейді?',
      explanation: 'Зертхана Vm мәнін шартты импульс қисығынан бөлек есептейді. Оның тұрақты табалдырықтары мен сигнал пішіні арналардың кинетикасын, өткізу блогын немесе клиникалық гиперкалиемияны модельдемейді; олармен диагноз қоюға болмайды.' },
  ],
};

export function createModuleFourSummary(language: Language): ReadingLesson {
  return {
    kind: 'one-minute',
    title: getSectionTitle('one-minute', language),
    introduction: language === 'RU'
      ? 'Пять физиологических выводов о мембранном потенциале и потенциале действия.'
      : language === 'EN'
        ? 'Five physiological takeaways on membrane voltage and action potentials.'
        : 'Мембраналық потенциал мен әрекет потенциалы туралы бес физиологиялық қорытынды.',
    cards: points[language].map((point, index) => ({
      id: 'module-4-one-minute-' + (index + 1),
      title: point.title,
      paragraphs: [point.explanation],
      links: [{ section: 'theory' }, { section: 'interactive' }],
    })),
  };
}

// Measurable outcomes for module 4; avoids the generic, causally ambiguous
// instruction to change an "action potential" to change "refractoriness".
const objectiveItems: Record<Language, [string,string][]> = {
  RU: [
    ['Потенциал покоя','Объяснить градиенты Na⁺ и K⁺, преобладание проницаемости для K⁺ в покое и роль Na⁺/K⁺-АТФазы в поддержании градиентов.'],
    ['Нернст и Гольдман','Вычислить E(K) и двухионный Vm при заданных концентрациях и 37 °C; отличить расчётную модель от универсальной нормы.'],
    ['Контролируемый прогноз','При фиксированных прочих параметрах сравнить внешние 4 и 8 мМ K⁺, записать E(K), Vm и обосновать направление изменения.'],
    ['Импульс и рефрактерность','Связать активацию и инактивацию Na⁺-каналов и рост K⁺-проводимости с фазами импульса и двумя рефрактерными периодами.'],
    ['Границы вывода','Объяснить, почему условная кривая импульса не вычисляет реальную возбудимость и не подтверждает диагноз при гиперкалиемии.'],
  ],
  EN: [
    ['Resting potential','Explain Na⁺ and K⁺ gradients, dominant resting K⁺ permeability, and the role of Na⁺/K⁺-ATPase in maintaining gradients.'],
    ['Nernst and Goldman','Calculate E(K) and two-ion Vm from given concentrations at 37 °C; distinguish model values from universal norms.'],
    ['Controlled prediction','Compare extracellular K⁺ of 4 and 8 mM with other inputs fixed; record E(K), Vm and explain the direction of change.'],
    ['Spikes and refractoriness','Link Na⁺-channel activation and inactivation and increased K⁺ conductance to spike phases and both refractory periods.'],
    ['Limits of inference','Explain why an illustrative spike trace cannot predict real excitability or diagnose hyperkalemia.'],
  ],
  KZ: [
    ['Тыныштық потенциалы','Na⁺ және K⁺ градиенттерін, тыныштықтағы K⁺ өткізгіштігінің басымдығын және Na⁺/K⁺-АТФазаның градиенттерді сақтау рөлін түсіндіру.'],
    ['Нернст пен Гольдман','Берілген концентрациялар мен 37 °C-та E(K) және екі ионды Vm есептеу; модель мәндерін жалпы норма деп қабылдамау.'],
    ['Бақыланатын болжам','Басқа параметрлер тұрақты кезде сыртқы K⁺-тің 4 және 8 мМ мәндерін салыстырып, E(K), Vm жазу және өзгеріс бағытын негіздеу.'],
    ['Импульс пен рефрактерлік','Na⁺ арналарының белсенуі мен инактивациясын, K⁺ өткізгіштігінің артуын импульс фазаларымен және рефрактерлік кезеңдермен байланыстыру.'],
    ['Қорытындының шегі','Шартты импульс қисығы нақты қозғыштықты болжай алмайтынын және гиперкалиемия диагнозын анықтамайтынын түсіндіру.'],
  ],
};
