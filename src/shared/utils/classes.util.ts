// TODO: Optional type?
export const classes = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(' ');
