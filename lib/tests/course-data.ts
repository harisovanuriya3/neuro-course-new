import { modules as courseModules, type Language } from "../../content/course";

export type Lang = Language;

/**
 * Compatibility layer for legacy test helpers.
 * The canonical module structure lives in content/course.ts.
 * Do not duplicate module titles or module count here.
 */
export const modules: Record<Lang, string[]> = courseModules;

export const MODULE_COUNT = courseModules.RU.length;

export function getModuleTitle(
  moduleNumber: number,
  lang: Lang
): string | undefined {
  if (!isValidModuleNumber(moduleNumber)) return undefined;
  return modules[lang][moduleNumber - 1];
}

export function isValidModuleNumber(
  moduleNumber: number
): boolean {
  return (
    Number.isInteger(moduleNumber) &&
    moduleNumber >= 1 &&
    moduleNumber <= MODULE_COUNT
  );
}

export function normalizeLang(
  lang?: string | string[] | null
): Lang {
  if (lang === "KZ") return "KZ";
  if (lang === "EN") return "EN";
  return "RU";
}
