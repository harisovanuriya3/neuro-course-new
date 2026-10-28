/**
 * Module 14: dimensionless, illustrative thalamocortical relay comparison.
 * This multiplication is an explicit teaching assumption, NOT a fitted
 * transfer function, a neuronal firing rate, a cortical EEG amplitude,
 * a diagnosis, or a quantitative model of sleep, attention or thalamic nuclei.
 */
export type ThalamusTrend = "lower" | "same" | "higher";
export type ThalamusTrial = {
  sensoryInput: number;
  gatingIndex: number;
  relayIndex: number;
  corticalIndex: number;
};
const bounded = (value: number) =>
  Number.isFinite(value) ? Math.max(0, Math.min(100, value)) : 0;

export function simulateThalamus(sensoryInput: number, gatingIndex: number): ThalamusTrial {
  const input = bounded(sensoryInput);
  const gate = bounded(gatingIndex);
  // Two transparent illustrative transformations; no spontaneous response at zero input.
  const relay = Math.round(input * gate / 100);
  return {
    sensoryInput: input,
    gatingIndex: gate,
    relayIndex: relay,
    corticalIndex: Math.round(relay * 0.9),
  };
}

export function compareThalamus(sensoryInput: number, gatingIndex: number) {
  const baseline = simulateThalamus(sensoryInput, 50);
  const observed = simulateThalamus(sensoryInput, gatingIndex);
  const trend: ThalamusTrend =
    observed.corticalIndex < baseline.corticalIndex ? "lower" :
    observed.corticalIndex > baseline.corticalIndex ? "higher" : "same";
  return { baseline, observed, trend };
}
