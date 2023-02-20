import { FunctionComponent, PropsWithChildren, ReactNode } from 'react';
import { classes } from '../../../../shared';

interface CardProps {
  titleLeft?: string | number;
  titleRight?: string | number;
}

export const Card: FunctionComponent<PropsWithChildren<CardProps>> = ({
  titleLeft,
  titleRight,
  children,
}) => {
  const Loader = (className: string) => (
    <div
      className={classes('py-3 rounded-lg bg-loader animate-pulse', className)}
    />
  );

  return (
    <div className="rounded-xl overflow-hidden border">
      <div className="relative aspect-square">
        <div className="absolute inset-0 z-10">{children}</div>
        <div className="absolute inset-0 z-0 animate-pulse bg-loader" />
      </div>
      <div className="flex justify-between p-4 space-x-4 font-semibold text-secondary">
        {titleLeft ? (
          <div className="truncate">{titleLeft}</div>
        ) : (
          Loader('px-12')
        )}
        {titleRight ? <div>{titleRight}</div> : Loader('px-6')}
      </div>
    </div>
  );
};
