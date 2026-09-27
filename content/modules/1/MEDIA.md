# Module 1 media

Teaching text, text alternatives and self-check questions: `media.ts` (RU/EN/KZ).
Verified video assets: `media-sources.ts`. No video files or external URLs are currently supplied.

The `organization` block currently uses the local six-step learning animation
(`animation: "organization"` in `media.ts`). It takes precedence over video assets.
Its captions and controls are in `organization-animation.ts`; the React player is
`components/OrganizationAnimation.tsx`. It starts paused, advances every six seconds,
pauses on manual navigation or when the page becomes hidden, and stops after the
last step. Reduced motion disables moving arrows without disabling step playback.
If this block is later switched to a real video, remove its `animation` field and
provide verified source data below. The other three blocks keep their video setup.

To add a real video, set `mediaSources.RU.organization` (or EN/KZ and
`pathway`, `synapse`, `integration`) to a `MediaSource` object:

- `videoUrl`: direct playable video file URL, e.g. your actual MP4/WebM file
  under `public` or an authorised media server. Do not use a YouTube/watch URL.
- `poster`: optional URL of the actual poster image.
- `durationSeconds`: optional verified duration; loaded video metadata overrides it.
- `credit`: optional source/attribution text in the interface language.
- `captions`: optional array of `{ src, srcLang, label, kind, default }`.
  Use real WebVTT files, `srcLang: "ru" | "en" | "kk"`, and at most one default track.
  `kind` is `captions` (default) or `subtitles`.

Supply a source for each intended language; there is no silent fallback to a
different language. Prefer same-origin assets. Cross-origin caption files require
appropriate CORS delivery. Review `transcript` in `media.ts` against the final video
and keep its text alternative accurate. No component change is required.

Without `videoUrl`, a localized pending message replaces the player. Video load
errors show a localized fallback. Transcripts, theory links and questions remain
available in both cases. Playback uses native controls with no autoplay. No
animation or persistent progress storage is introduced.

Checks: `node node_modules/typescript/bin/tsc --noEmit --incremental false` and
`node scripts/check-media.cjs` (local server on :3000; dedicated Chrome CDP on :9223).
