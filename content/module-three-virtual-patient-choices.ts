import type { Language } from "./course";

// Deliberately incorrect alternatives, unlike correct actions borrowed from later stages.
// Scientific basis: Ganong 23e, chapter 4 (glial K+ homeostasis).
export const moduleThreeWrongChoices: Record<Language, [string,string][]> = {
 RU: [
  ["Считать единичное повышение K⁺ диагнозом","Измерять только число стимулов, не измеряя K⁺"],
  ["Менять стимуляцию и приписывать эффект только глии","Сравнивать миелин, но не нейронный ответ"],
  ["Считать, что K⁺ всегда усиливает разряды","Не учитывать ионную среду при оценке возбудимости"],
  ["Одновременно менять температуру, стимул и захват K⁺","Не использовать контрольную модель"],
  ["Считать первичный дефект нейрона доказанным","Считать компьютерную модель диагнозом пациента"],
  ["Приписать миелинизацию ЦНС астроцитам","Приписать удаление K⁺ исключительно микроглии"]
 ],
 EN: [
  ["Treat one K⁺ rise as a diagnosis","Count stimuli without measuring K⁺"],
  ["Change stimulation and attribute all effects to glia","Compare myelin but not neuronal responses"],
  ["Assume elevated K⁺ always increases firing","Ignore the ionic environment when assessing excitability"],
  ["Change temperature, stimulation and K⁺ uptake together","Omit the control model"],
  ["Claim an intrinsic neuronal defect is proven","Treat a computer model as a patient diagnosis"],
  ["Assign CNS myelination to astrocytes","Assign K⁺ clearance exclusively to microglia"]
 ],
 KZ: [
  ["K⁺ бір рет жоғарылауын диагноз деп санау","K⁺ өлшемей, тек стимул санын есептеу"],
  ["Стимуляцияны өзгертіп, бүкіл әсерді глияға телу","Нейрон жауабын емес, тек миелинді салыстыру"],
  ["K⁺ жоғарылауы разрядтарды әрдайым жиілетеді деу","Қозғыштықты бағалағанда иондық ортаны ескермеу"],
  ["Температураны, стимулды және K⁺ қармауын бірге өзгерту","Бақылау моделін қолданбау"],
  ["Нейронның бастапқы ақауы дәлелденді деу","Компьютерлік модельді пациент диагнозы деп санау"],
  ["ОЖЖ миелинін астроциттер түзеді деу","K⁺ әкетуді тек микроглия атқарады деу"]
 ]
};
