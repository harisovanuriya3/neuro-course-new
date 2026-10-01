import type { Language } from "./course";

export type MediaSource = {
  // Direct browser-playable video URL, not a YouTube/watch or embed page.
  videoUrl?: string;
  poster?: string;
  durationSeconds?: number;
  credit?: string;
  captions?: { src: string; srcLang: string; label: string; kind?: "captions" | "subtitles"; default?: boolean }[];
};
export type MediaBlock = {
  id: string; title: string; preview: string; transcript: string[];
  theoryAnchor: string; source?: MediaSource;
  animation?: "organization" | "foundation";
  question: {
    prompt: string; correctAnswer: string; explanation: string;
    options: { id: string; text: string; feedback: string }[];
  };
};
export type MediaLesson = {
  kind: "media"; title: string; introduction: string; language: Language;
  ui: {
    preview: string; pending: string; unavailable: string; alternative: string;
    duration: string; durationPending: string; language: string; languageName: string;
    credit: string; transcript: string; theory: string; question: string;
    check: string; retry: string; correct: string; incorrect: string; correctAnswer: string;
  };
  blocks: MediaBlock[];
};
