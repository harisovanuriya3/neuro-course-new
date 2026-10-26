// Module 11: a bounded, deterministic TEACHING MODEL, not patient physiology.
// "Drive" is the target movement index; feedback is an illustrative quality index.
// A fixed disturbance affects execution. Feedback compensates part, never all, of it.
// Coefficients (0.30, 0.80) are didactic choices, not physiological constants.
// Background: Ganong 23e, chapter 16; Guyton & Hall 13e, chapter 56.
export type MotorFeedbackTrend = "lower" | "same" | "higher";
const bounded = (value: number): number =>
  Number.isFinite(value) ? Math.max(0, Math.min(100, Math.round(value))) : 0;

export function simulateMotorControl(drive: number, sensory: number) {
  const target = bounded(drive);
  const feedbackQuality = bounded(sensory);
  const disturbance = Math.round(target * 0.30);
  const compensation = Math.round(disturbance * feedbackQuality * 0.80 / 100);
  const output = target - disturbance + compensation;
  const error = Math.abs(target - output);
  return { target, feedbackQuality, disturbance, compensation, output, error };
}

export function compareMotorFeedback(drive: number, sensory: number) {
  const baseline = simulateMotorControl(drive, 0);
  const observed = simulateMotorControl(drive, sensory);
  const trend: MotorFeedbackTrend =
    observed.error < baseline.error ? "lower" :
    observed.error > baseline.error ? "higher" : "same";
  return { baseline, observed, trend };
}
