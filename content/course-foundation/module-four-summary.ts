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
      explanation: 'Уравнение Нернста определяет равновесный потенциал одного иона, а уравнение Гольдмана учитывает проницаемости нескольких ионов. При 37 °C, концентрациях снаружи/внутри K⁺ 4/140 мМ и Na⁺ 145/12 мМ, P(K):P(Na)=1:0,04 двухионная модель даёт E(K) ≈ −95,0 мВ, E(Na) ≈ +66,6 мВ, Vm ≈ −71,2 мВ. Cl⁻ и прямой вклад насоса не учтены; это не универсальные нормы.' },
    { title: '3. Возникновение и завершение импульса',
      explanation: 'При достижении порога быстро открываются потенциал-зависимые Na⁺-каналы, вызывая регенеративную деполяризацию. Инактивация Na⁺-каналов и запаздывающее увеличение K⁺-проводимости обеспечивают реполяризацию.' },
    { title: '4. «Всё или ничего» и рефрактерность',
      explanation: 'В отдельном аксоне подпороговый стимул даёт локальный ответ, а надпороговый запускает полноценный импульс; при неизменных условиях его амплитуда не растёт с силой надпорогового стимула. Абсолютная рефрактерность связана главным образом с инактивацией Na⁺-каналов; относительная — с неполным восстановлением каналов и сохраняющейся K⁺-проводимостью.' },
    { title: '5. Что не доказывает симуляция',
      explanation: 'Лаборатория отдельно рассчитывает Vm и рисует условную кривую импульса. Её фиксированные пороги и форма сигнала не моделируют кинетику каналов, блок проведения или клиническую гиперкалиемию; по ним нельзя ставить диагноз.' },
  ],
  EN: [
    { title: '1. Resting voltage: gradients and permeability',
      explanation: 'At rest, the membrane is usually much more permeable to K⁺ than Na⁺. Na⁺/K⁺-ATPase maintains ion gradients and makes a small direct electrogenic contribution; it does not rapidly repolarize each spike.' },
    { title: '2. Nernst: one ion; Goldman: several ions',
      explanation: 'The Nernst equation gives the equilibrium potential of one ion; Goldman accounts for the permeabilities of several ions. At 37 °C, with outside/inside concentrations K⁺ 4/140 mM, Na⁺ 145/12 mM and P(K):P(Na)=1:0.04, the two-ion model gives E(K) ≈ −95.0 mV, E(Na) ≈ +66.6 mV and Vm ≈ −71.2 mV. Cl⁻ and the pump’s direct contribution are omitted; these are not universal normal values.' },
    { title: '3. How a spike starts and ends',
      explanation: 'At threshold, voltage-gated Na⁺ channels open rapidly, producing regenerative depolarization. Na⁺-channel inactivation and a delayed rise in K⁺ conductance drive repolarization.' },
    { title: '4. All-or-none firing and refractoriness',
      explanation: 'In a single axon, a subthreshold stimulus produces a local response, while a suprathreshold stimulus elicits a full spike; with conditions held constant, a stronger suprathreshold stimulus does not increase that spike’s amplitude. Absolute refractoriness mainly reflects Na⁺-channel inactivation; relative refractoriness involves incomplete recovery and persistent K⁺ conductance.' },
    { title: '5. What the simulation cannot establish',
      explanation: 'The laboratory computes Vm separately from its illustrative spike trace. Its fixed thresholds and waveform do not model channel kinetics, conduction block or clinical hyperkalemia; they cannot establish a diagnosis.' },
  ],
  KZ: [
    { title: '1. Тыныштық потенциалы: градиент пен өткізгіштік',
      explanation: 'Тыныштықта мембрана Na⁺-ке қарағанда K⁺-ке әдетте әлдеқайда өткізгіш. Na⁺/K⁺-АТФаза иондық градиенттерді сақтап, аздаған тікелей электрогендік үлес қосады; әр импульстің жылдам реполяризациясын өзі тудырмайды.' },
    { title: '2. Нернст — бір ион; Гольдман — бірнеше ион',
      explanation: 'Нернст теңдеуі бір ионның тепе-теңдік потенциалын, ал Гольдман теңдеуі бірнеше ионның салыстырмалы өткізгіштігін ескереді. 37 °C-та, K⁺ сыртта/іште 4/140 мМ, Na⁺ 145/12 мМ және P(K):P(Na)=1:0,04 болғанда екі ионды модель E(K) ≈ −95,0 мВ, E(Na) ≈ +66,6 мВ, Vm ≈ −71,2 мВ береді. Cl⁻ пен сорғының тікелей үлесі ескерілмейді; бұлар барлық нейронға ортақ норма емес.' },
    { title: '3. Импульстің басталуы мен аяқталуы',
      explanation: 'Табалдырыққа жеткенде потенциалға тәуелді Na⁺ арналары жылдам ашылып, регенеративті деполяризация туғызады. Na⁺ арналарының инактивациясы мен K⁺ өткізгіштігінің кешігіп артуы реполяризацияға әкеледі.' },
    { title: '4. «Бәрі немесе ештеңе» және рефрактерлік',
      explanation: 'Жеке аксонда табалдырықтан төмен стимул жергілікті жауап, ал табалдырықтан жоғары стимул толық импульс туғызады; жағдайлар өзгермесе, табалдырықтан жоғары стимулды күшейту сол импульстің амплитудасын арттырмайды. Абсолютті рефрактерлік негізінен Na⁺ арналарының инактивациясына, салыстырмалы рефрактерлік олардың толық қалпына келмеуі мен сақталған K⁺ өткізгіштігіне байланысты.' },
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
    ['Нернст и Гольдман','Вычислить E(K), E(Na) и двухионный Vm при заданных концентрациях, проницаемостях и 37 °C; отличить расчётную модель от универсальной нормы.'],
    ['Контролируемый прогноз','При фиксированных прочих параметрах сравнить внешние 4 и 8 мМ K⁺, записать E(K), Vm и обосновать направление изменения.'],
    ['Импульс и рефрактерность','Связать активацию и инактивацию Na⁺-каналов и рост K⁺-проводимости с фазами импульса и двумя рефрактерными периодами.'],
    ['Границы вывода','Объяснить, почему условная кривая импульса не вычисляет реальную возбудимость и не подтверждает диагноз при гиперкалиемии.'],
  ],
  EN: [
    ['Resting potential','Explain Na⁺ and K⁺ gradients, dominant resting K⁺ permeability, and the role of Na⁺/K⁺-ATPase in maintaining gradients.'],
    ['Nernst and Goldman','Calculate E(K), E(Na) and two-ion Vm from given concentrations and permeabilities at 37 °C; distinguish model values from universal norms.'],
    ['Controlled prediction','Compare extracellular K⁺ of 4 and 8 mM with other inputs fixed; record E(K), Vm and explain the direction of change.'],
    ['Spikes and refractoriness','Link Na⁺-channel activation and inactivation and increased K⁺ conductance to spike phases and both refractory periods.'],
    ['Limits of inference','Explain why an illustrative spike trace cannot predict real excitability or diagnose hyperkalemia.'],
  ],
  KZ: [
    ['Тыныштық потенциалы','Na⁺ және K⁺ градиенттерін, тыныштықтағы K⁺ өткізгіштігінің басымдығын және Na⁺/K⁺-АТФазаның градиенттерді сақтау рөлін түсіндіру.'],
    ['Нернст пен Гольдман','Берілген концентрациялар мен өткізгіштіктер бойынша 37 °C-та E(K), E(Na) және екі ионды Vm мәндерін есептеу; модель мәндерін жалпы норма деп қабылдамау.'],
    ['Бақыланатын болжам','Басқа параметрлер тұрақты кезде сыртқы K⁺-тің 4 және 8 мМ мәндерін салыстырып, E(K), Vm жазу және өзгеріс бағытын негіздеу.'],
    ['Импульс пен рефрактерлік','Na⁺ арналарының белсенуі мен инактивациясын, K⁺ өткізгіштігінің артуын импульс фазаларымен және рефрактерлік кезеңдермен байланыстыру.'],
    ['Қорытындының шегі','Шартты импульс қисығы нақты қозғыштықты болжай алмайтынын және гиперкалиемия диагнозын анықтамайтынын түсіндіру.'],
  ],
};

export function createModuleFourObjectives(language: Language): ObjectivesLesson {
  if (objectiveItems[language].length !== 5) throw Error('Module 4 requires five objectives');
  return {
    kind: 'objectives',
    title: getSectionTitle('objectives', language),
    introduction: language === 'RU' ? 'После изучения модуля студент сможет:'
      : language === 'EN' ? 'After completing this module, the student will be able to:'
      : 'Модульді аяқтағаннан кейін студент:',
    outcomes: objectiveItems[language].map(([title,description],index) => ({
      id: 'module-4-objective-' + (index + 1), title, description,
    })),
    navigation: {
      title: language === 'RU' ? 'Перейти к изучению модуля'
        : language === 'EN' ? 'Continue learning' : 'Модульді оқуға өту',
      pathwayLabel: language === 'RU' ? 'Рекомендуемый маршрут'
        : language === 'EN' ? 'Recommended pathway' : 'Ұсынылатын оқу бағыты',
      links: [{section:'theory'},{section:'practice'},{section:'cases'},
        {section:'interactive'},{section:'virtual-patient'}],
    },
  };
}
