export type UnifiedPatientState = { current: number; unlocked: number; selected: (number | null)[]; notes: string[] };
export function emptyUnifiedPatient(): UnifiedPatientState {
  return { current: 0, unlocked: 0, selected: Array(6).fill(null), notes: Array(6).fill("") };
}
export function restoreUnifiedPatient(raw: string | null): UnifiedPatientState {
  try {
    const parsed = JSON.parse(raw ?? "null");
    if (!parsed || !Array.isArray(parsed.selected) || !Array.isArray(parsed.notes)) return emptyUnifiedPatient();
    const selected = Array.from({ length: 6 }, (_, index) => Number.isInteger(parsed.selected[index]) && parsed.selected[index] >= 0 && parsed.selected[index] <= 2 ? parsed.selected[index] : null);
    const notes = Array.from({ length: 6 }, (_, index) => typeof parsed.notes[index] === "string" ? parsed.notes[index].slice(0, 5000) : "");
    let available = 0;
    while (available < 5 && selected[available] !== null && notes[available].trim().length >= 12) available++;
    const unlocked = Math.min(available, Number.isInteger(parsed.unlocked) ? Math.max(0, parsed.unlocked) : 0);
    const current = Math.min(unlocked, Number.isInteger(parsed.current) ? Math.max(0, parsed.current) : 0);
    return { current, unlocked, selected, notes };
  } catch { return emptyUnifiedPatient(); }
}
