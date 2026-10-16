import type { Language } from '../course';
import type { PracticeLesson } from '../types';

// Module 4 practice: compare actual laboratory controls with physiological mechanisms.
// Checked against Guyton & Hall 13e ch. 5 (PDF pp. 68–74),
// Ganong 23e ch. 4 (PDF pp. 95–99), Ghai Practical Physiology 8e
// chart 5-5 (PDF pp. 379–381). The simulator is NOT a clinical model.
type Copy = {
  gradientTitle: string; gradientPrompt: string; gradientAnswer: string[];
  refractoryTitle: string; refractoryPrompt: string; refractoryAnswer: string[];
  interpretationTitle: string; interpretationPrompt: string; interpretationAnswer: string[];
  response: string; criteriaTitle: string; criteria: string[];
};
const copy: Record<Language, Copy> = {
  RU: {
    gradientTitle: '1. Ионный градиент: прогноз и проверка',
    gradientPrompt: 'Откройте интерактивную лабораторию модуля 4. При 37 °C, [K⁺] внутри 140 мМ, [Na⁺] снаружи/внутри 145/12 мМ, P(K)=1 и P(Na)=0,04 сравните [K⁺] снаружи 4 и 8 мМ. Сначала предскажите направление изменения E(K) и Vm, затем запишите оба набора показаний. Не меняйте остальные параметры.',
    gradientAnswer: [
      'При 4 мМ: E(K) ≈ −95,0 мВ, Vm ≈ −71,2 мВ. При 8 мМ: E(K) ≈ −76,5 мВ, Vm ≈ −62,0 мВ. Оба значения становятся менее отрицательными.',
      'Vm рассчитан по двухионному приближению Гольдмана; оно не учитывает Cl⁻ и прямой электрогенный вклад насоса. Числа нельзя переносить на каждого пациента.',
    ],
    refractoryTitle: '2. Возникновение импульса и рефрактерность',
    refractoryPrompt: 'Верните [K⁺] снаружи к 4 мМ. Во второй части лаборатории задайте силу стимула 12 и сравните интервалы 5 и 3 мс после предыдущего импульса. Перед каждым запуском выберите прогноз. Объясните, как инактивация Na⁺-каналов связана с абсолютной рефрактерностью, а их восстановление и K⁺-проводимость — с относительной. Почему результат симулятора нельзя считать измерением состояния каналов?',
    refractoryAnswer: [
      'По условным правилам симулятора при 5 мс стимул 12 вызывает импульс, а при 3 мс тот же стимул недостаточен (эффективная сила 12 × 0,55 = 6,6 при условном пороге 10).',
      'В реальном аксоне абсолютная рефрактерность связана прежде всего с инактивацией Na⁺-каналов; в относительный период часть каналов уже восстановилась, но возбудимость может оставаться сниженной. Численные интервалы модели не являются универсальными физиологическими константами.',
    ],
    interpretationTitle: '3. Что показывает опыт, а чего не доказывает?',
    interpretationPrompt: 'Наблюдение А: при повышении наружного K⁺ с 4 до 8 мМ расчётный Vm изменился с −71,2 до −62,0 мВ. Наблюдение Б: при силе стимула 12 и интервале 3 мс модель не создала импульс. Какое наблюдение проверяет двухионную формулу, а какое определяется условным правилом рефрактерности? Можно ли по ним доказать блок проведения или диагностировать гиперкалиемию?',
    interpretationAnswer: [
      'А проверяет расчёт зависимости Vm от концентраций и проницаемостей; Б — только заранее заданное правило порога и интервала. В модели эти два механизма вычисляются независимо.',
      'Ни блок проведения, ни клиническая гиперкалиемия не подтверждаются такой схемой: отсутствуют кинетика Na⁺-каналов, измерения проводимости и данные пациента.',
    ],
    response: 'Ваш прогноз, расчёт и физиологическое объяснение',
    criteriaTitle: 'Самопроверка (не автоматическая оценка)',
    criteria: ['Сравнил E(K) и Vm при двух концентрациях K⁺, не меняя другие параметры.', 'Отделил расчёт потенциала покоя от условной генерации импульса.', 'Объяснил роль Na⁺-каналов в рефрактерности.', 'Указал границы модели и не сделал клинический вывод по симуляции.'],
  },
  EN: {
    gradientTitle: '1. Ion gradient: predict and verify',
    gradientPrompt: 'Open the module 4 interactive lab. At 37 °C, intracellular [K⁺] 140 mM, extracellular/intracellular [Na⁺] 145/12 mM, P(K)=1 and P(Na)=0.04, compare extracellular [K⁺] of 4 and 8 mM. Predict the direction of change in E(K) and Vm before recording both sets of values. Hold other parameters constant.',
    gradientAnswer: [
      'At 4 mM: E(K) ≈ −95.0 mV, Vm ≈ −71.2 mV. At 8 mM: E(K) ≈ −76.5 mV, Vm ≈ −62.0 mV. Both values become less negative.',
      'Vm uses a two-ion Goldman approximation without Cl⁻ or the pump’s direct electrogenic contribution. These values are not universal patient measurements.',
    ],
    refractoryTitle: '2. Spike generation and refractoriness',
    refractoryPrompt: 'Restore extracellular [K⁺] to 4 mM. In Part 2 set stimulus strength to 12 and compare intervals of 5 and 3 ms after the previous spike. Predict the outcome before each run. Explain how Na⁺-channel inactivation causes absolute refractoriness and how channel recovery and K⁺ conductance affect relative refractoriness. Why is this simulator not a channel-kinetics measurement?',
    refractoryAnswer: [
      'Under the simulator’s arbitrary rules, strength 12 produces a spike at 5 ms but not at 3 ms (effective strength 12 × 0.55 = 6.6 versus an arbitrary threshold of 10).',
      'In an actual axon, absolute refractoriness mainly reflects Na⁺-channel inactivation. Some channels recover during relative refractoriness, while excitability may remain reduced. The model’s time cutoffs are not universal physiological constants.',
    ],
    interpretationTitle: '3. What does the experiment demonstrate?',
    interpretationPrompt: 'Observation A: increasing extracellular K⁺ from 4 to 8 mM changes calculated Vm from −71.2 to −62.0 mV. Observation B: with stimulus strength 12 and a 3 ms interval, the model produces no spike. Which observation tests the two-ion equation, and which follows an arbitrary refractory rule? Do these results prove conduction block or diagnose hyperkalemia?',
    interpretationAnswer: [
      'A tests the calculated dependence of Vm on ion gradients and permeabilities; B follows a preset stimulus/interval rule. These are independent calculations in this model.',
      'Neither conduction block nor clinical hyperkalemia can be established: the model lacks Na⁺-channel kinetics, conduction measurements and patient data.',
    ],
    response: 'Your prediction, calculation and physiological explanation',
    criteriaTitle: 'Self-check (not automated grading)',
    criteria: ['Compared E(K) and Vm while holding other variables fixed.', 'Distinguished resting-voltage calculation from schematic spike generation.', 'Explained Na⁺-channel inactivation and refractory recovery.', 'Stated model limitations without claiming a clinical diagnosis.'],
  },
  KZ: {
    gradientTitle: '1. Иондық градиент: болжау және тексеру',
    gradientPrompt: '4-модульдің интерактивті зертханасын ашыңыз. 37 °C температурада, жасуша ішіндегі [K⁺] 140 мМ, сыртқы/ішкі [Na⁺] 145/12 мМ, P(K)=1 және P(Na)=0,04 болғанда сыртқы [K⁺] 4 және 8 мМ мәндерін салыстырыңыз. Алдымен E(K) мен Vm өзгерісінің бағытын болжаңыз, содан кейін екі нәтижені жазыңыз. Басқа параметрлерді өзгертпеңіз.',
    gradientAnswer: [
      '4 мМ кезінде: E(K) ≈ −95,0 мВ, Vm ≈ −71,2 мВ. 8 мМ кезінде: E(K) ≈ −76,5 мВ, Vm ≈ −62,0 мВ. Екі мән де азырақ теріс болады.',
      'Vm Cl⁻ пен сорғының тікелей электрогендік үлесін ескермейтін екі ионды Гольдман жуықтауымен есептеледі. Бұл мәндер әр пациентке ортақ өлшем емес.',
    ],
    refractoryTitle: '2. Импульс пайда болуы және рефрактерлік',
    refractoryPrompt: 'Сыртқы [K⁺] мәнін 4 мМ-ге қайтарыңыз. Зертхананың екінші бөлігінде стимул күшін 12 етіп, алдыңғы импульстен кейінгі 5 және 3 мс аралықтарды салыстырыңыз. Әр іске қосу алдында нәтижені болжаңыз. Na⁺ арналарының инактивациясы абсолютті рефрактерлікке, ал олардың қалпына келуі мен K⁺ өткізгіштігі салыстырмалы рефрактерлікке қалай әсер ететінін түсіндіріңіз. Неліктен бұл симулятор арналардың кинетикасын өлшемейді?',
    refractoryAnswer: [
      'Симулятордың шартты ережесіне сәйкес, 5 мс кезінде стимул күші 12 импульс туғызады, ал 3 мс кезінде жеткіліксіз (тиімді күш 12 × 0,55 = 6,6; шартты табалдырық 10).',
      'Нақты аксонда абсолютті рефрактерлік негізінен Na⁺ арналарының инактивациясымен байланысты. Салыстырмалы кезеңде арналардың бір бөлігі қалпына келеді, бірақ қозғыштық төмен болып қалуы мүмкін. Модельдегі уақыт шектері әмбебап физиологиялық тұрақтылар емес.',
    ],
    interpretationTitle: '3. Тәжірибе нені көрсетеді?',
    interpretationPrompt: 'А бақылауы: сыртқы K⁺ 4-тен 8 мМ-ге артқанда есептелген Vm −71,2-ден −62,0 мВ-ке өзгерді. Б бақылауы: стимул күші 12 және аралық 3 мс болғанда модель импульс тудырмады. Қай бақылау екі ионды теңдеуді, қайсысы рефрактерліктің шартты ережесін тексереді? Осыдан өткізудің блокталуын немесе гиперкалиемия диагнозын дәлелдеуге бола ма?',
    interpretationAnswer: [
      'А бақылауы Vm-ның иондық градиенттер мен өткізгіштікке тәуелді есебін тексереді; Б бақылауы алдын ала берілген стимул/аралық ережесіне сүйенеді. Бұл модельде екі есеп бір-бірінен тәуелсіз.',
      'Өткізудің блокталуын да, клиникалық гиперкалиемияны да анықтау мүмкін емес: Na⁺ арналарының кинетикасы, өткізу өлшемдері және пациент деректері жоқ.',
    ],
    response: 'Болжамыңыз, есебіңіз және физиологиялық түсіндірмеңіз',
    criteriaTitle: 'Өзіндік тексеру (автоматты баға емес)',
    criteria: ['Басқа параметрлерді тұрақты ұстап, екі K⁺ концентрациясындағы E(K) мен Vm-ды салыстырдым.', 'Тыныштық потенциалының есебін шартты импульс генерациясынан ажыраттым.', 'Na⁺ арналарының инактивациясы мен қалпына келуін түсіндірдім.', 'Модель шектеулерін көрсетіп, клиникалық диагноз қоймадым.'],
  },
};

export function createModuleFourPractice(language: Language, base: PracticeLesson): PracticeLesson {
  const c = copy[language];
  return { ...base, sections: [
    { title: c.gradientTitle, blocks: [
      { type: 'paragraph', text: c.gradientPrompt },
      { type: 'response', label: c.response },
      { type: 'answer', items: c.gradientAnswer },
    ] },
    { title: c.refractoryTitle, blocks: [
      { type: 'paragraph', text: c.refractoryPrompt },
      { type: 'response', label: c.response },
      { type: 'answer', items: c.refractoryAnswer },
    ] },
    { title: c.interpretationTitle, blocks: [
      { type: 'paragraph', text: c.interpretationPrompt },
      { type: 'response', label: c.response },
      { type: 'answer', items: c.interpretationAnswer },
    ] },
    { title: c.criteriaTitle, blocks: [{ type: 'checklist', items: c.criteria }] },
  ] };
}
