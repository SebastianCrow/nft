import { FunctionComponent } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { Theme, useTheme } from './themeProvider';
import { classes } from '../../../../shared';

export const ThemeSwitcher: FunctionComponent = () => {
  const { theme, switchTheme } = useTheme();
  return (
    <div
      onClick={switchTheme}
      className={classes(
        'cursor-pointer',
        'transition-colors',
        'text dark:text-dark',
        'hover:text-secondary dark:hover:text-dark-secondary'
      )}
    >
      {theme === Theme.Dark ? <MoonIcon width={24} /> : <SunIcon width={28} />}
    </div>
  );
};
