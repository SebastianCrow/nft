export type Optional<T> = T | undefined;

export const noop = () => void undefined;

/**
 * Ensure that {@param val} is defined. Throw otherwise.
 */
export const ensureDefined = <T>(val: T | undefined | null): T => {
  if (val === undefined || val === null) {
    throw new Error('Value needs to be defined');
  }
  return val;
};
