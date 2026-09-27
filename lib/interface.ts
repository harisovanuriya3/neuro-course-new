import type { Language } from "../content/course";

export function normalizeLanguage(value?: string | string[] | null): Language {
  const code = Array.isArray(value) ? value[0] : value;
  return code === "EN" || code === "KZ" ? code : "RU";
}

export const htmlLanguage = { RU: "ru", EN: "en", KZ: "kk" } as const;
export const interfaceText = {
  RU: { language: "Язык", navigation: "Навигация по курсу", author: "Автор", authorName: "Нурия Мансуровна Харисова" },
  EN: { language: "Language", navigation: "Course navigation", author: "Author", authorName: "Nuriya Mansurovna Kharissova" },
  KZ: { language: "Тіл", navigation: "Курс бойынша навигация", author: "Автор", authorName: "Нурия Мансуровна Харисова" },
};
