import type { Optional } from './typescript.util';

/**
 * Join given {@param classes} omitting empty and undefined ones.
 */
export const classes = (...classes: Optional<string>[]): string =>
  classes.filter(Boolean).join(' ');
