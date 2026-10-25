// Deliberately illustrative model of the segmental stretch-reflex circuit.
// Not a calibrated EMG, firing-rate, muscle-force, or clinical diagnostic model.
// References: Ganong 23e ch. 9; Guyton & Hall 13e ch. 55; Ghai 8e reflex examination.
export type SpinalReflexInput = {
  stretch: number;
  reciprocalInhibition: boolean;
};
export type SpinalReflexOutput = {
  iaDrive: number;
  agonist: number;
  antagonist: number;
  antagonistWithoutInhibition: number;
  antagonistWithInhibition: number;
};
const clamp = (value: number, lower: number, upper: number): number =>
  Number.isFinite(value) ? Math.max(lower, Math.min(upper, value)) : lower;

export function simulateSpinalReflex(input: SpinalReflexInput): SpinalReflexOutput {
  // The 0–100 dial is an abstract spindle-input stimulus, not measured length.
  const iaDrive = Math.round(clamp(input.stretch, 0, 100));
  const agonist = Math.min(100, 20 + Math.round(iaDrive * 0.8));
  // The Ia collateral recruits an inhibitory interneuron for the antagonist.
  // These coefficients only make the direction of the effect visible.
  const antagonistWithoutInhibition = 45;
  const antagonistWithInhibition = Math.max(5, 45 - Math.round(iaDrive * 0.35));
  return {
    iaDrive,
    agonist,
    antagonist: input.reciprocalInhibition ? antagonistWithInhibition : antagonistWithoutInhibition,
    antagonistWithoutInhibition,
    antagonistWithInhibition,
  };
}

export function expectedAntagonistChange(stretch: number): "decrease" | "unchanged" {
  const result = simulateSpinalReflex({ stretch, reciprocalInhibition: true });
  return result.antagonistWithInhibition < result.antagonistWithoutInhibition
    ? "decrease"
    : "unchanged";
}
