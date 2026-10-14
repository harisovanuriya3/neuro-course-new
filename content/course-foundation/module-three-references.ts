import type { Language } from '../course';
import type { ReadingLesson } from '../study';

// Page locations verified against the user's Library PDFs:
// Guyton & Hall 13e: PDF 78-79 (printed 71-72).
// Ganong 23e: PDF 92-94 (printed 80-82).
// Ghai 8e: PDF 250-251 (printed 228-229).
const descriptions: Record<Language, [string,string,string]> = {
  RU: [
    'Глава 5, с. 71–72: миелин, перехваты Ранвье, сальтаторное проведение. PDF: с. 78–79.',
    'Глава 4, с. 80–82: нейроны, глия и демиелинизация. PDF: с. 92–94.',
    'С. 228–229: классы нервных волокон и расчёт моторной скорости по разности латентностей. PDF: с. 250–251.'
  ],
  EN: [
    'Chapter 5, pp. 71–72: myelin, nodes of Ranvier and saltatory conduction. PDF: pp. 78–79.',
    'Chapter 4, pp. 80–82: neurons, glia and demyelination. PDF: pp. 92–94.',
    'Pp. 228–229: nerve-fibre classes and motor conduction velocity from latency differences. PDF: pp. 250–251.'
  ],
  KZ: [
    '5-тарау, 71–72-беттер: миелин, Ранвье түйіндері және секірмелі өткізу. PDF: 78–79-беттер.',
    '4-тарау, 80–82-беттер: нейрондар, глия және демиелиндену. PDF: 92–94-беттер.',
    '228–229-беттер: жүйке талшықтарының түрлері және латенттілік айырмасынан моторлық өткізу жылдамдығын есептеу. PDF: 250–251-беттер.'
  ]
};

export function createModuleThreeReferences(language: Language, base: ReadingLesson): ReadingLesson {
  if (base.kind !== 'references' || !base.sources) throw new Error('Module 3 references base missing');
  const titles = ['Guyton & Hall', 'Ganong', 'C. L. Ghai'];
  const sources = titles.map((title, index) => {
    const source = base.sources!.find(item => item.title.includes(title));
    if (!source) throw new Error('Module 3 missing reference: ' + title);
    return { ...source, description: descriptions[language][index],
      links: [{ section: index === 2 ? 'clinical' as const : 'theory' as const }] };
  });
  return {
    ...base,
    introduction: language === 'RU'
      ? 'Три источника с проверенными главами и страницами. Внешние ссылки могут вести в каталоги, а не к полному тексту.'
      : language === 'EN'
        ? 'Three sources with verified chapters and pages. External links may lead to catalogues rather than full text.'
        : 'Тараулары мен беттері тексерілген үш дереккөз. Сыртқы сілтемелер толық мәтінге емес, каталогтарға апаруы мүмкін.',
    sources
  };
}
