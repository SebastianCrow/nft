// TODO: https://stackoverflow.com/a/4912796
export const truncatePositive = (num: number, places: number) => {
  const multiplier = Math.pow(10, places);
  return Math.floor(num * multiplier) / multiplier;
};
