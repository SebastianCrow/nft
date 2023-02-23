import type { FunctionComponent, PropsWithChildren } from 'react';
import { classes } from '../../../../shared';
import { useTheme } from './themeProvider';

/**
 * Wrap {@param children} with a {@link Theme}.
 * An appropriate class is applied to the parent element.
 */
export const ThemeWrapper: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const { theme } = useTheme();
  return <div className={classes('h-full', theme)}>{children}</div>;
};
