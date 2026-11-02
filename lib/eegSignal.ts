export type EEGArtifact = "none" | "ocular" | "muscle" | "electrode" | "mains";
export type EEGState = "closed" | "open" | "arithmetic" | "n1" | "n2" | "n3" | "rem";
const gaussian = (time: number, centre: number, width: number) => Math.exp(-0.5 * ((time - centre) / width) ** 2);
// Deterministic teaching synthesis, not recorded EEG or a sleep-stage classifier.
// Six seconds at 256 samples/s. Amplitude is a scale coefficient in microvolts,
// not a promise that every transient has the same peak or peak-to-peak amplitude.
export function eegSignal(state: EEGState, frequency: number, amplitude: number, artifact: boolean | EEGArtifact) {
  return Array.from({ length: 1537 }, (_, index) => {
    const time = index / 256;
    const phase = 2 * Math.PI * frequency * time + .19 * Math.sin(2 * Math.PI * .43 * time);
    const mixed = .20 * Math.sin(2 * Math.PI * 3.7 * time + .8) + .13 * Math.sin(2 * Math.PI * 17.3 * time + 1.6) + .08 * Math.sin(2 * Math.PI * 27.1 * time);
    const envelope = .65 + .18 * Math.sin(2 * Math.PI * .61 * time) + .12 * Math.sin(2 * Math.PI * .23 * time);
    let voltage = amplitude * (envelope * Math.sin(phase) + mixed);
    if (state === "open" || state === "arithmetic" || state === "rem") voltage = amplitude * (.30 * Math.sin(phase) + mixed + .17 * Math.sin(2 * Math.PI * 9.3 * time));
    if (state === "n1") voltage = amplitude * (.55 * Math.sin(phase) + mixed) - amplitude * 1.1 * gaussian(time, 3.6, .09);
    if (state === "n2") {
      voltage = amplitude * (.3 * Math.sin(phase) + mixed);
      voltage += amplitude * 1.2 * gaussian(time, 1.55, .23) * Math.sin(2 * Math.PI * 13 * time);
      voltage += amplitude * (-2 * gaussian(time, 3.2, .12) + 1.4 * gaussian(time, 3.55, .21));
    }
    if (state === "n3") voltage = amplitude * (.8 * Math.sin(phase) + .15 * Math.sin(phase * 2 + .6) + .18 * Math.sin(2 * Math.PI * .73 * time));
    const kind: EEGArtifact = typeof artifact === "boolean" ? (artifact ? "ocular" : "none") : artifact;
    if (kind === "ocular") voltage += 100 * gaussian(time, 4.7, .16);
    if (kind === "muscle") voltage += 25 * gaussian(time, 4.8, .33) * (Math.sin(2 * Math.PI * 37 * time) + .5 * Math.sin(2 * Math.PI * 53 * time));
    if (kind === "electrode") voltage += 85 * gaussian(time, 4.6, .045) - 60 * gaussian(time, 4.78, .07) + 28 * gaussian(time, 5.0, .16);
    if (kind === "mains") voltage += 12 * Math.sin(2 * Math.PI * 50 * time);
    return { time, voltage };
  });
}
