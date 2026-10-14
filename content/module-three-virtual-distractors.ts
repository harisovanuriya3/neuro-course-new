import type { Language } from './course';

// Six model stages, two physiologically incorrect alternatives each.
// The options must not be valid actions copied from other stages.
// Sources: Ganong 23e ch.4 (PDF 92-94); Guyton & Hall 13e ch.5 (PDF 78-79).
export const moduleThreeVirtualDistractors: Record<Language, [string,string][]> = {
 RU: [
  ['Оценить только частоту разрядов и назвать её скоростью захвата K⁺','Приписать подъём K⁺ гибели олигодендроцитов без контроля'],
  ['Сравнить разные серии стимулов и объяснить разницу только глией','Сравнить разные температуры и приписать разницу только захвату K⁺'],
  ['Считать, что деполяризация всегда увеличивает частоту разрядов','Считать снижение разрядов доказательством разрыва аксона'],
  ['Одновременно менять стимуляцию и захват K⁺','Принять концентрацию K⁺ за скорость проведения нерва'],
  ['Назвать астроциты единственным путём удаления K⁺','По одной модели доказать, что весь эффект вызван микроглией'],
  ['Приписать миелин ЦНС шванновским клеткам','Приписать миелин астроцитам, а захват K⁺ олигодендроцитам']
 ],
 EN: [
  ['Treat firing rate alone as a measure of K⁺ uptake','Attribute the K⁺ rise to oligodendrocyte death without a control'],
  ['Compare different stimulus trains and blame only glia','Compare different temperatures and blame only K⁺ uptake'],
  ['Assume depolarization always increases firing','Treat reduced firing as proof of axonal transection'],
  ['Change stimulation and K⁺ uptake simultaneously','Treat K⁺ concentration as nerve conduction velocity'],
  ['Claim astrocytes are the only K⁺ clearance route','Claim one model proves that microglia cause the whole effect'],
  ['Assign CNS myelin formation to Schwann cells','Assign myelin to astrocytes and K⁺ uptake to oligodendrocytes']
 ],
 KZ: [
  ['Разряд жиілігін K⁺ сіңіру жылдамдығы деп қабылдау','Бақылаусыз K⁺ жоғарылауын олигодендроцит өлімімен түсіндіру'],
  ['Әртүрлі стимулдарды салыстырып, айырманы тек глиямен түсіндіру','Әртүрлі температураны салыстырып, айырманы тек K⁺ сіңіруімен түсіндіру'],
  ['Деполяризация әрдайым разрядты жиілетеді деп есептеу','Разрядтың азаюын аксон үзілгенінің дәлелі деп санау'],
  ['Стимуляция мен K⁺ сіңіруін бір уақытта өзгерту','K⁺ концентрациясын жүйке өткізгіштігінің жылдамдығы деп қабылдау'],
  ['Астроциттерді K⁺ әкетудің жалғыз жолы деп есептеу','Бір модель микроглияның бүкіл әсерін дәлелдейді деп тұжырымдау'],
  ['ОЖЖ миелинін шванн жасушалары түзеді деп есептеу','Миелинді астроциттер, ал K⁺ сіңіруді олигодендроциттер атқарады деп есептеу']
 ]
};
