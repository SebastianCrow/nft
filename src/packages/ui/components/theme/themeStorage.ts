export enum Theme {
  Dark = 'dark',
  Light = 'light',
}

const THEME_STORAGE_KEY = 'theme';

const DEFAULT_THEME = Theme.Dark;

/**
 * Get user's theme from the local storage or return {@link Theme.Dark} by default
 */
export const getStorageTheme = (): Theme =>
  (localStorage.getItem(THEME_STORAGE_KEY) as Theme) ?? DEFAULT_THEME;

/**
 * Save {@param theme} to the local storage
 */
export const setStorageTheme = (theme: Theme) =>
  void localStorage.setItem(THEME_STORAGE_KEY, theme);
