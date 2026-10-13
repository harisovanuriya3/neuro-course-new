export type SpinalLevel = "C5" | "T10" | "L2";
export function pathwayResult(path: "dorsal" | "spinothalamic" | "corticospinal", side: "left" | "right", level: SpinalLevel) {
  const opposite = side === "left" ? "right" : "left";
  return {
    deficitSide: path === "spinothalamic" ? opposite : side,
    crossing: path === "spinothalamic" ? "spinal" : "medulla",
    descending: path === "corticospinal",
    lesionY: { C5: 230, T10: 300, L2: 360 }[level],
  } as const;
}
