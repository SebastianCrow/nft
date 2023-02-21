import type { FunctionComponent, PropsWithChildren } from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { usePrevious } from '../../../../shared';
import { Theme, getStorageTheme, setStorageTheme } from './themeStorage';

interface ThemeState {
  theme: Theme;
  switchTheme: () => void;
}

const ThemeContext = createContext<ThemeState>({
  theme: getStorageTheme(),
  switchTheme: () => {
    throw new Error('Theme context not initialized');
  },
});

export const ThemeProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [theme, setTheme] = useState(getStorageTheme());

  const prevTheme = usePrevious(theme);
  useEffect(() => {
    // Theme changed by the user
    if (prevTheme && prevTheme !== theme) {
      setStorageTheme(theme);
    }
  }, [prevTheme, theme]);

  const switchTheme = useCallback(() => {
    setTheme((prevTheme) =>
      prevTheme === Theme.Dark ? Theme.Light : Theme.Dark
    );
  }, []);

  const value = useMemo(
    () => ({
      theme,
      switchTheme,
    }),
    [switchTheme, theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeState => {
  return useContext(ThemeContext);
};
