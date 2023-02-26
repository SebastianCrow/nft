import type { FunctionComponent, PropsWithChildren, ReactElement } from 'react';
import { classes } from '../../../../shared';

const ROUNDED_CLASS = 'rounded-xl overflow-hidden';
const ROUNDED_TOP_CLASS = 'rounded-t-xl overflow-hidden';

interface CardLoaderProps {
  className: string;
  testId?: string;
}

const CardLoader: FunctionComponent<CardLoaderProps> = ({
  className,
  testId,
}) => (
  <div
    className={classes(
      'h-6 rounded-lg animate-pulse',
      'transition-colors',
      'bg-loader dark:bg-dark-loader',
      className
    )}
    data-testid={testId}
  />
);

interface CardProps {
  titleLeft?: ReactElement;
  titleRight?: ReactElement;
  mainLoader?: boolean;
}

/**
 * Card with a main area and optional titles below
 *
 * @param titleLeft Optional bottom-left title
 * @param titleRight Optional bottom-right title
 * @param mainLoader Enable/disable a loader for the main area
 * @param children Component located at the main area
 */
export const Card: FunctionComponent<PropsWithChildren<CardProps>> = ({
  titleLeft,
  titleRight,
  mainLoader = true,
  children,
}) => {
  return (
    <div
      className={classes(
        'transition-colors',
        'border dark:border-dark',
        ROUNDED_CLASS
      )}
    >
      <div className="relative aspect-square">
        <div className={classes('absolute inset-0 z-10', ROUNDED_TOP_CLASS)}>
          {children}
        </div>
        {mainLoader && (
          <div
            className={classes(
              'absolute inset-0 z-0 animate-pulse',
              'transition-colors',
              'bg-loader dark:bg-dark-loader',
              ROUNDED_TOP_CLASS
            )}
            data-testid="card-loader-main"
          />
        )}
      </div>
      <div
        className={classes(
          'flex items-center justify-between p-4 space-x-2 font-semibold',
          'transition-colors',
          'text dark:text-dark'
        )}
      >
        {titleLeft ?? (
          <CardLoader className="w-24" testId="card-loader-title-left" />
        )}
        {titleRight ?? (
          <CardLoader className="w-12" testId="card-loader-title-right" />
        )}
      </div>
    </div>
  );
};
