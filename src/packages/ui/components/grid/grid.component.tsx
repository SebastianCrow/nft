import { FunctionComponent, PropsWithChildren } from 'react';
import { classes } from '../../../../shared';

export const Grid: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className={classes(
        'grid gap-4',
        'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
      )}
    >
      {children}
    </div>
  );
};
