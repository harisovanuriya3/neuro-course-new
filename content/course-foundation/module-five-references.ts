import type { Language } from "../course";
import type { ReadingLesson } from "../study";
export function createModuleFiveReferences(language: Language, base: ReadingLesson): ReadingLesson { if (base.kind !== "references") throw new Error("Missing references"); return { ...base, introduction: language === "EN" ? "Synaptic transmission references." : base.introduction }; }
