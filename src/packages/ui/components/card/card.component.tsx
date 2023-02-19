import { FunctionComponent, PropsWithChildren, ReactNode } from 'react';
import { classes } from '../../../../shared';

interface CardProps {
  loader?: boolean;
  titleLeft?: ReactNode;
  titleRight?: ReactNode;
}

export const Card: FunctionComponent<PropsWithChildren<CardProps>> = ({
  loader,
  titleLeft,
  titleRight,
  children,
}) => {
  const Loader = (className: string) => (
    <div
      className={classes(
        'py-3 rounded-lg bg-slate-200 animate-pulse',
        className
      )}
    />
  );

  return (
    <div className="rounded-xl overflow-hidden border">
      <div className="relative aspect-square">
        {children}
        {loader && (
          <div className="absolute inset-0 z-0 animate-pulse bg-slate-200" />
        )}
      </div>
      <div className="flex justify-between p-4">
        <div>{titleLeft ?? Loader('px-12')}</div>
        <div>{titleRight ?? Loader('px-6')}</div>
      </div>
    </div>
  );
};
