import { modules, type Language } from "../content/course";
import { sections } from "../content/sections";
import { getLesson } from "../content";

export type SearchResult = { title: string; moduleTitle: string; href: string; excerpt: string };
type Entry = SearchResult & { titleKey: string; bodyKey: string; body: string };
const indexes = new Map<Language, Entry[]>();
export function normalizeSearch(value: string) {
  return value.normalize("NFKC").toLowerCase().replace(/ё/g, "е").replace(/\s+/g, " ").trim();
}
const ignored = new Set(["id", "href", "src", "kind", "type", "ui", "correctAnswer", "theoryAnchor", "theoryTarget"]);
function textOf(value: unknown): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(textOf).join(" ");
  if (value && typeof value === "object") return Object.entries(value).filter(([key]) => !ignored.has(key)).map(([, item]) => textOf(item)).join(" ");
  return "";
}
function getIndex(language: Language) {
  const cached = indexes.get(language);
  if (cached) return cached;
  const entries: Entry[] = [];
  modules[language].forEach((moduleTitle, index) => {
    const moduleId = index + 1;
    const add = (title: string, href: string, body: string) => {
      body = body.replace(/\s+/g, " ").trim();
      entries.push({ title, moduleTitle, href, body, excerpt: "", titleKey: normalizeSearch(title), bodyKey: normalizeSearch(body) });
    };
    add(moduleTitle, `/modules/${moduleId}?lang=${language}`, moduleTitle);
    for (const section of sections) {
      const lesson = getLesson(moduleId, section.slug, language);
      add(section.title[language], `/modules/${moduleId}/${section.slug}?lang=${language}`, `${moduleTitle} ${section.description[language]} ${textOf(lesson)}`);
    }
  });
  indexes.set(language, entries);
  return entries;
}
export function searchCourse(query: string, language: Language): SearchResult[] {
  const normalized = normalizeSearch(query).slice(0, 160);
  if (normalized.length < 2) return [];
  const tokens = [...new Set(normalized.split(" "))];
  return getIndex(language).map(entry => {
    const combined = `${entry.titleKey} ${entry.bodyKey}`;
    if (!tokens.every(token => combined.includes(token))) return { entry, score: 0 };
    const score = 1 + (entry.titleKey === normalized ? 100 : 0) + (entry.titleKey.includes(normalized) ? 40 : 0)
      + tokens.reduce((sum, token) => sum + (entry.titleKey.includes(token) ? 10 : 0), 0);
    return { entry, score };
  }).filter(item => item.score > 0).sort((a, b) => b.score - a.score || a.entry.href.localeCompare(b.entry.href, undefined, { numeric: true }))
    .slice(0, 40).map(({ entry }) => {
      const match = entry.bodyKey.indexOf(tokens.find(token => entry.bodyKey.includes(token)) ?? normalized);
      const start = Math.max(0, match - 65);
      return { title: entry.title, moduleTitle: entry.moduleTitle, href: entry.href,
        excerpt: `${start ? "…" : ""}${entry.body.slice(start, start + 240)}${entry.body.length > start + 240 ? "…" : ""}` };
    });
}
