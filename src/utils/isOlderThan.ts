import { differenceInMilliseconds } from "date-fns";

export const isOlderThan = (date: string, olderThan: number = 30) =>
  differenceInMilliseconds(new Date(), new Date(date)) > olderThan * 24 * 60 * 60 * 1000