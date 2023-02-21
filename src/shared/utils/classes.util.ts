import type { Optional } from './typescript.util';

export const classes = (...classes: Optional<string>[]): string =>
  classes.filter(Boolean).join(' ');
