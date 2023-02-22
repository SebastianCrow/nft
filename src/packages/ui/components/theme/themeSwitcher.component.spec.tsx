import { render } from '@testing-library/react';
import { ThemeSwitcher } from './themeSwitcher.component';
import { useTheme } from './themeProvider';
import { Theme } from './themeStorage';

jest.mock('./themeProvider', () => ({
  useTheme: jest.fn(),
}));

describe('ThemeSwitcher', () => {
  it.each([
    [Theme.Dark, 'themeSwitcher-icon-dark'],
    [Theme.Light, 'themeSwitcher-icon-light'],
  ])('displays correct icons [theme = %s, icon = %s]', (theme, testId) => {
    (useTheme as jest.Mock).mockReturnValue({
      theme,
      switchTheme: jest.fn(),
    });

    const { getByTestId } = render(<ThemeSwitcher />);
    expect(getByTestId(testId)).toBeInTheDocument();
  });
});
