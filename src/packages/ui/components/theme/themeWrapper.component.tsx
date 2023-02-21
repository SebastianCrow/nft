import type { FunctionComponent, PropsWithChildren } from 'react';
import { classes } from '../../../../shared';
import { useTheme } from './themeProvider';

export const ThemeWrapper: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const { theme } = useTheme();
  return <div className={classes('h-full', theme)}>{children}</div>;
};
