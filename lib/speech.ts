import type { Language } from "../content/course";

export const speechLocales: Record<Language, string> = { RU: "ru-RU", EN: "en-US", KZ: "kk-KZ" };
export type VoiceInfo = { lang: string; name: string; voiceURI: string; default: boolean };
const normalize = (locale: string) => locale.toLowerCase().replace(/_/g, "-");
export function languageVoices<T extends VoiceInfo>(voices: T[], language: Language): T[] {
  const locale = normalize(speechLocales[language]);
  const code = locale.split("-")[0];
  const score = (voice: T) => (normalize(voice.lang) === locale ? 10 : 0)
    + (/neural|natural/i.test(voice.name) ? 4 : 0)
    + (language === "RU" && /google.*рус|google.*russian/i.test(voice.name) ? 3 : 0);
  return voices.filter(voice => normalize(voice.lang).split("-")[0] === code)
    .sort((a, b) => score(b) - score(a));
}
export function speechChunks(texts: string[], limit = 320): string[] {
  const chunks: string[] = [];
  for (const text of texts) {
    let remaining = text.replace(/\s+/g, " ").trim();
    while (remaining.length > limit) {
      const sentenceEnd = Math.max(remaining.lastIndexOf(". ", limit), remaining.lastIndexOf("? ", limit), remaining.lastIndexOf("! ", limit), remaining.lastIndexOf("; ", limit));
      const space = remaining.lastIndexOf(" ", limit);
      const cut = sentenceEnd > limit / 2 ? sentenceEnd + 1 : space > 0 ? space : limit;
      chunks.push(remaining.slice(0, cut).trim());
      remaining = remaining.slice(cut).trim();
    }
    if (remaining) chunks.push(remaining);
  }
  return chunks;
}

// Read only visible lesson text. Hidden solutions and closed details stay hidden.
export function visiblePageText(root: HTMLElement): string[] {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const lines: string[] = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const text = node.textContent?.replace(/\s+/g, " ").trim();
    if (!text) continue;
    let element = node.parentElement;
    let visible = true;
    while (element) {
      const tag = element.tagName;
      if (element.hidden || element.getAttribute("aria-hidden") === "true" || element.hasAttribute("data-no-narration")
        || ["SCRIPT", "STYLE", "TEXTAREA", "SELECT", "OPTION", "BUTTON", "SVG", "NAV"].includes(tag)) { visible = false; break; }
      if (tag === "DETAILS" && !(element as HTMLDetailsElement).open && !node.parentElement?.closest("summary")) { visible = false; break; }
      const style = getComputedStyle(element);
      if (style.display === "none" || style.visibility === "hidden" || style.visibility === "collapse") { visible = false; break; }
      if (element === root) break;
      element = element.parentElement;
    }
    if (visible) lines.push(text);
  }
  return lines;
}
