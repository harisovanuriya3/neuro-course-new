import type { Section } from "./sections";
import type { QuestionCopy } from "./tests";

export type StudyLink = { section: Section; anchor?: string };
export type StudyCard = { id: string; title: string; paragraphs: string[]; links: StudyLink[] };
export type ReadingLesson = {
  kind: "objectives" | "one-minute" | "clinical" | "references";
  title: string;
  introduction: string;
  cards: StudyCard[];
  sources?: { title: string; href: string; description: string; links: StudyLink[] }[];
};
export type PretestLesson = {
  kind: "pretest";
  title: string;
  introduction: string;
  questions: (QuestionCopy & { id: string; topic: string; target: StudyLink })[];
};
export type QuestionsLesson = {
  kind: "questions";
  title: string;
  introduction: string;
  questions: { id: string; prompt: string; explanation: string; target: StudyLink }[];
};
export type GlossaryLesson = {
  kind: "glossary";
  title: string;
  introduction: string;
  terms: { id: string; term: string; definition: string; target: StudyLink }[];
};
export type StudyLesson = ReadingLesson | PretestLesson | QuestionsLesson | GlossaryLesson;
