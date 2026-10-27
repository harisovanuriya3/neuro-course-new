// Basal ganglia teaching model. Indices are dimensionless and coefficients illustrative.
// These equations are NOT dopamine concentrations, neuronal firing rates or clinical scores.
export type BasalGangliaTrend = "lower" | "same" | "higher";
export type BasalGangliaResult = {
  dopamine: number;
  directIndex: number;
  indirectIndex: number;
  thalamicFacilitationIndex: number;
};
const clamp = (value: number) => Number.isFinite(value) ? Math.max(0, Math.min(100, value)) : 0;
export function simulateBasalGanglia(dopamine: number): BasalGangliaResult {
  const d = clamp(dopamine);
  const directIndex = Math.round(35 + 0.5 * d);
  const indirectIndex = Math.round(85 - 0.5 * d);
  const thalamicFacilitationIndex = Math.round(clamp(50 + (55 * (directIndex - indirectIndex)) / 100));
  return { dopamine: d, directIndex, indirectIndex, thalamicFacilitationIndex };
}
export function compareBasalGanglia(dopamine: number) {
  const baseline = simulateBasalGanglia(50);
  const observed = simulateBasalGanglia(dopamine);
  const trend: BasalGangliaTrend =
    observed.thalamicFacilitationIndex < baseline.thalamicFacilitationIndex ? "lower" :
    observed.thalamicFacilitationIndex > baseline.thalamicFacilitationIndex ? "higher" : "same";
  return { baseline, observed, trend };
}
