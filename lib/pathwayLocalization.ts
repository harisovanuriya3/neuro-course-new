// Pure teaching model for unilateral lesions of the named tracts within the spinal cord.
// Not valid for supramedullary lesions, partial syndromes, or precise dermatome mapping.
export type Pathway = "dorsal" | "spinothalamic" | "corticospinal";
export type LesionSide = "left" | "right";

export function predictSpinalTractDeficit(path: Pathway, lesionSide: LesionSide) {
  const expectedSide: LesionSide =
    path === "spinothalamic" ? (lesionSide === "left" ? "right" : "left") : lesionSide;
  const crossingSite = path === "spinothalamic" ? "spinal" : "medulla";
  const direction = path === "corticospinal" ? "descending" : "ascending";
  return { expectedSide, crossingSite, direction } as const;
}
