import { secondsToTime } from "./secondsToTime";

export function secondsToHourMinute(durationInSeconds: number) {
  const minuteIndex = 3;
  return secondsToTime(durationInSeconds).slice(minuteIndex);
}
