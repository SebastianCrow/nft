import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import type { FunctionComponent } from 'react';
import { classes } from '../../../../shared';
import { Theme } from './themeStorage';
import { useTheme } from './themeProvider';

export const ThemeSwitcher: FunctionComponent = () => {
  const { theme, switchTheme } = useTheme();
  return (
    <div
      onClick={switchTheme}
      className={classes(
        'flex justify-center items-center w-12 h-12',
        'cursor-pointer',
        'transition-colors',
        'text dark:text-dark',
        'hover:text-secondary dark:hover:text-dark-secondary'
      )}
      data-testid="themeSwitcher-main"
    >
      {theme === Theme.Dark ? (
        <MoonIcon className="w-6" data-testid="themeSwitcher-icon-dark" />
      ) : (
        <SunIcon className="w-7" data-testid="themeSwitcher-icon-light" />
      )}
    </div>
  );
};
