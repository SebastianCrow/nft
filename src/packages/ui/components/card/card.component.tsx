import { FunctionComponent, PropsWithChildren, ReactNode } from 'react';
import { classes } from '../../../../shared';

interface CardProps {
  titleLeft?: ReactNode;
  titleRight?: ReactNode;
}

export const Card: FunctionComponent<PropsWithChildren<CardProps>> = ({
  titleLeft,
  titleRight,
  children,
}) => {
  const Loader = (className: string) => (
    <div
      className={classes(
        'py-3 rounded-lg animate-pulse',
        'transition-colors',
        'bg-loader dark:bg-dark-loader',
        className
      )}
    />
  );

  return (
    <div
      className={classes(
        'rounded-xl overflow-hidden',
        'transition-colors',
        'border dark:border-dark'
      )}
    >
      <div className="relative aspect-square">
        <div className="absolute inset-0 z-10">{children}</div>
        <div
          className={classes(
            'absolute inset-0 z-0 animate-pulse',
            'transition-colors',
            'bg-loader dark:bg-dark-loader'
          )}
        />
      </div>
      <div
        className={classes(
          'flex items-center justify-between p-4 space-x-4 font-semibold',
          'transition-colors',
          'text dark:text-dark'
        )}
      >
        {titleLeft ?? Loader('px-12')}
        {titleRight ?? Loader('px-6')}
      </div>
    </div>
  );
};
