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
  const labs: Record<Language, { eeg: string; sechenov: string; eegBody: string; sechenovBody: string }> = {
    RU: { eeg: "Виртуальная лаборатория ЭЭГ — глаза, умственная деятельность, сон и артефакты", sechenov: "Опыт Сеченова — центральное торможение рефлекса у лягушки", eegBody: "ЭЭГ EEG электроэнцефалография виртуальная лаборатория открытые закрытые глаза умственная нагрузка сон N2 N3 артефакты", sechenovBody: "Сеченов опыт лягушка центральное торможение рефлекс виртуальная лаборатория" },
    EN: { eeg: "EEG virtual laboratory — eyes, mental task, sleep and artifacts", sechenov: "Sechenov frog experiment — central reflex inhibition", eegBody: "EEG electroencephalography virtual laboratory eyes open closed mental arithmetic sleep N2 N3 artifacts", sechenovBody: "Sechenov frog experiment central inhibition reflex virtual laboratory" },
    KZ: { eeg: "ЭЭГ виртуалды зертханасы — көз, ой жүктемесі, ұйқы және артефактілер", sechenov: "Сеченов тәжірибесі — бақадағы рефлекстің орталық тежелуі", eegBody: "ЭЭГ EEG электроэнцефалография виртуалды зертхана көз ашық жабық ой жүктемесі ұйқы артефакт", sechenovBody: "Сеченов тәжірибесі бақа орталық тежелу рефлекс виртуалды зертхана" }
  };
  const lab = labs[language];
  const addLab = (title: string, moduleId: number, body: string) => {
    const href = `/modules/${moduleId}/interactive?lang=${language}`;
    entries.unshift({ title, moduleTitle: modules[language][moduleId - 1], href, body, excerpt: body, titleKey: normalizeSearch(title), bodyKey: normalizeSearch(body) });
  };
  addLab(lab.eeg, 2, lab.eegBody);
  addLab(lab.sechenov, 7, lab.sechenovBody);
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
