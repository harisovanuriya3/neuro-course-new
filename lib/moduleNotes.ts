import { isSection, type Section } from "../content/sections";

export const moduleNotesKey = "neuro-course:module-1:notes:v1";
export type ModuleNotes = { bookmarks: Section[]; notes: Partial<Record<Section, string>> };
export const emptyModuleNotes = (): ModuleNotes => ({ bookmarks: [], notes: {} });

export function readModuleNotes(): ModuleNotes {
  try {
    const raw = JSON.parse(localStorage.getItem(moduleNotesKey) || "null");
    if (!raw || typeof raw !== "object") return emptyModuleNotes();
    const bookmarks: Section[] = Array.isArray(raw.bookmarks) ? [...new Set<Section>(raw.bookmarks.filter((value: unknown): value is Section => typeof value === "string" && isSection(value)))] : [];
    const notes: ModuleNotes["notes"] = {};
    if (raw.notes && typeof raw.notes === "object") for (const [key, value] of Object.entries(raw.notes)) {
      if (isSection(key) && typeof value === "string") notes[key] = value.slice(0, 5000);
    }
    return { bookmarks, notes };
  } catch { return emptyModuleNotes(); }
}

export function saveModuleNotes(value: ModuleNotes): boolean {
  try { localStorage.setItem(moduleNotesKey, JSON.stringify(value)); return true; } catch { return false; }
}
