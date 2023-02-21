import { FunctionComponent } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from './themeProvider';
import { Theme } from './themeStorage';
import { classes } from '../../../../shared';

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
    >
      {theme === Theme.Dark ? (
        <MoonIcon className="w-6" />
      ) : (
        <SunIcon className="w-7" />
      )}
    </div>
  );
};
