export const shuffle = (str: string): string =>
  str
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

export const shuffleNumbers = (num: number): number => {
  const digits = String(num)
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return Number(digits);
};
