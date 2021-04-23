import { intervalToDuration } from "date-fns";

export function secondsToTime(durationInSeconds: number) {
  const { hours, minutes, seconds } = intervalToDuration({
    start: 0,
    end: durationInSeconds * 1000,
  });
  return [hours, minutes, seconds]
    .map((unit) => String(unit).padStart(2, "0"))
    .join(":");
}
