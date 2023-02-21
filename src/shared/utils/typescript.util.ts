export type Optional<T> = T | undefined;

export const ensureDefined = <T>(val: T | undefined | null): T => {
  if (val === undefined || val === null) {
    throw new Error('Value needs to be defined');
  }
  return val;
};
