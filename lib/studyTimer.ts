export type TimerState = { version: 1; duration: number; remaining: number; deadline: number | null; finished: boolean };
export const TIMER_KEY = "neuro:study-timer:v1";
export function newTimer(minutes = 25): TimerState {
  const duration = Math.min(180, Math.max(1, minutes)) * 60000;
  return { version: 1, duration, remaining: duration, deadline: null, finished: false };
}
export function remainingTime(timer: TimerState, now: number) {
  return Math.max(0, timer.deadline === null ? timer.remaining : timer.deadline - now);
}
export function restoreTimer(raw: string | null): TimerState {
  try {
    const value = JSON.parse(raw ?? "null") as TimerState | null;
    if (value?.version === 1 && Number.isFinite(value.duration) && value.duration >= 60000 && value.duration <= 10800000
      && Number.isFinite(value.remaining) && value.remaining >= 0 && value.remaining <= value.duration
      && (value.deadline === null || (Number.isFinite(value.deadline) && value.deadline > 0)) && typeof value.finished === "boolean") return value;
  } catch { /* A damaged record must not prevent studying. */ }
  return newTimer();
}
