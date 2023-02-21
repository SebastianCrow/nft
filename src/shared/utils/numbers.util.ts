/**
 * Truncate (without rounding) decimal numbers in {@param num} to the given {@param places}.
 * Note: It works only for positive numbers (https://stackoverflow.com/a/4912796).
 */
export const truncatePositive = (num: number, places: number): number => {
  if (num < 0) {
    throw new Error(
      'Function `truncatePositive` works only for positive numbers'
    );
  }
  if (places < 0) {
    throw new Error('`places` cannot be a negative value');
  }

  const multiplier = Math.pow(10, places);
  return Math.floor(num * multiplier) / multiplier;
};
