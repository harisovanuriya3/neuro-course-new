// Module 10: explicitly illustrative input-to-ascending-drive model.
// The output is a dimensionless teaching index, NOT EEG, RAS activity,
// cortical activation, wakefulness, or a validated clinical scale.
// Sources: Guyton & Hall 13e pp. 751–753 (PDF 718–720);
// Ganong 23e p. 231 (PDF 243).
export type RelayCondition = "usual" | "attenuated";
export type Trend = "lower" | "same" | "higher";

export function modelAscendingDrive(input: number, relay: RelayCondition): number {
  const safeInput = Number.isFinite(input) ? Math.max(0, Math.min(100, input)) : 0;
  const gain = relay === "attenuated" ? 0.35 : 1;
  return Math.round(10 + 0.6 * safeInput * gain);
}

export function compareAscendingDrive(input: number, relay: RelayCondition): {
  baseline: number; observed: number; trend: Trend;
} {
  const baseline = modelAscendingDrive(50, relay);
  const observed = modelAscendingDrive(input, relay);
  const trend: Trend = observed < baseline ? "lower" : observed > baseline ? "higher" : "same";
  return { baseline, observed, trend };
}
