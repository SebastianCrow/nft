import { FunctionComponent, PropsWithChildren } from 'react';
import { useTheme } from './themeProvider';
import { classes } from '../../../../shared';

export const ThemeWrapper: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const { theme } = useTheme();
  return <div className={classes('h-full', theme)}>{children}</div>;
};
