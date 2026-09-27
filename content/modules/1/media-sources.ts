import type { Language } from "../../course";
import type { MediaSource } from "../../media";

export type MediaId = "organization" | "pathway" | "synapse" | "integration";

// Add verified real assets here, separately for each language. No placeholder URLs.
export const mediaSources: Record<Language, Partial<Record<MediaId, MediaSource>>> = {
  RU: {}, EN: {}, KZ: {},
};
