/**
 * Module 13: an explicitly illustrative, dimensionless teaching model.
 * This is not a fitted model of cerebellar physiology, a patient measurement,
 * a neural recording, or a diagnostic scale.
 */
export type CerebellumTrial = {
  initialError: number;
  feedbackQuality: number;
  correctionIndex: number;
  residualErrorIndex: number;
};
export type CerebellumTrend = "lower" | "same" | "higher";

const clampPercent = (value: number): number =>
  Number.isFinite(value) ? Math.max(0, Math.min(100, value)) : 0;

export function simulateCerebellum(initialError: number, feedbackQuality: number): CerebellumTrial {
  const error = clampPercent(initialError);
  const feedback = clampPercent(feedbackQuality);
  // A transparent, saturating teaching assumption, not an empirical transfer function.
  const gain = 0.8 * (1 - Math.exp(-2.2 * feedback / 100)) / (1 - Math.exp(-2.2));
  const correction = Math.min(error, Math.round(error * gain));
  return {
    initialError: error,
    feedbackQuality: feedback,
    correctionIndex: correction,
    residualErrorIndex: Math.max(0, error - correction),
  };
}

export function compareCerebellum(initialError: number, feedbackQuality: number) {
  const baseline = simulateCerebellum(initialError, 50);
  const observed = simulateCerebellum(initialError, feedbackQuality);
  const trend: CerebellumTrend =
    observed.residualErrorIndex < baseline.residualErrorIndex ? "lower" :
    observed.residualErrorIndex > baseline.residualErrorIndex ? "higher" : "same";
  return { baseline, observed, trend };
}
