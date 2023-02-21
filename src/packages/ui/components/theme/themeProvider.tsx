import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

export enum Theme {
  Dark = 'dark',
  Light = 'light',
}

interface ThemeState {
  theme: Theme;
  switchTheme: () => void;
}

const DEFAULT_THEME = Theme.Dark;

const ThemeContext = createContext<ThemeState>({
  theme: DEFAULT_THEME,
  switchTheme: () => {
    throw new Error('Theme context not initialized');
  },
});

export const ThemeProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [theme, setTheme] = useState(DEFAULT_THEME);

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
