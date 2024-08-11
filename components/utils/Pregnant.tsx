export const PregnantWeekCalculator = (startDate: string) => {
  const start: Date = new Date(startDate);
  const now: Date = new Date();
  const diffTime: number = Math.abs(now.getTime() - start.getTime());
  const diffWeeks: number = Math.floor(diffTime / (7 * 24 * 60 * 60 * 1000));

  return diffWeeks;
};
