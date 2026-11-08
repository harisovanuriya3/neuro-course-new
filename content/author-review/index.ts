import type { Language, SectionLesson } from '../types';
import { module1Glossary } from './module-1-glossary';
import { module1Pretest } from './module-1-pretest';
import { module13Pretest } from './module-13-pretest';
import { module1Questions } from './module-1-questions';

// Additions are authored once per concept, with explicit equivalent localized copies.
// Existing items are retained; this adapter does not change theory, routes or labs.
export function extendAuthorContent(moduleId: number, language: Language, lesson: SectionLesson | undefined): SectionLesson | undefined {
  if (!lesson) return lesson;
  if (lesson.kind === 'pretest' && (moduleId === 1 || moduleId === 13)) {
    const bank = moduleId === 1 ? module1Pretest : module13Pretest;
    const added = bank.map((translations, index) => {
      const item = translations[language];
      // Rotate the key deterministically so the added bank has balanced answer positions.
      const position = index % 4;
      const answers = [...item.options];
      const correct = answers.shift()!;
      answers.splice(position, 0, correct);
      return {
        id: `author-${moduleId}-pretest-${index + 1}`,
        topic: item.prompt,
        prompt: item.prompt,
        options: answers.map((text, i) => ({id: ['a','b','c','d'][i], text})),
        correctAnswer: ['a','b','c','d'][position],
        explanation: item.explanation,
        target: { section: 'theory' as const },
      };
    });
    return {...lesson, questions: [...lesson.questions, ...added]};
  }
  if (lesson.kind === 'questions' && moduleId === 1) {
    return {...lesson, questions: [...lesson.questions, ...module1Questions.map((translations, index) => ({
      id: `author-1-review-${index + 1}`,
      ...translations[language],
      target: {section: 'theory' as const},
    }))]};
  }
  if (lesson.kind === 'glossary' && moduleId === 1) {
    return {...lesson, terms: [...lesson.terms, ...module1Glossary.map((translations, index) => ({
      id: `author-1-term-${index + 1}`,
      ...translations[language],
      target: {section: 'theory' as const},
    }))]};
  }
  return lesson;
}
