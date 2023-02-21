export enum Theme {
  Dark = 'dark',
  Light = 'light',
}

const THEME_STORAGE_KEY = 'theme';

const DEFAULT_THEME = Theme.Dark;

export const getStorageTheme = (): Theme =>
  (localStorage.getItem(THEME_STORAGE_KEY) as Theme) ?? DEFAULT_THEME;

export const setStorageTheme = (theme: Theme) =>
  void localStorage.setItem(THEME_STORAGE_KEY, theme);
