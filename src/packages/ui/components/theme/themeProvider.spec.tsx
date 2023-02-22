import { fireEvent, render } from '@testing-library/react';
import type { FunctionComponent } from 'react';
import { ThemeProvider, useTheme } from './themeProvider';
import { Theme } from './themeStorage';
import * as ThemeStorage from './themeStorage';

describe('ThemeProvider', () => {
  const SWITCH_THEME_ID = 'testTheme-switch';

  const TestTheme: FunctionComponent = () => {
    const { theme, switchTheme } = useTheme();
    return (
      <div>
        <div>{theme}</div>
        <button onClick={switchTheme} data-testid={SWITCH_THEME_ID} />
      </div>
    );
  };

  beforeEach(() => {
    // Start with light theme in storage
    jest
      .spyOn(ThemeStorage, 'getStorageTheme')
      .mockReturnValueOnce(Theme.Light);
  });

  it('returns theme from storage', () => {
    const { getByText } = render(
      <ThemeProvider>
        <TestTheme />
      </ThemeProvider>
    );
    expect(getByText(Theme.Light)).toBeInTheDocument();
  });

  it('switches theme', () => {
    const { getByText, getByTestId } = render(
      <ThemeProvider>
        <TestTheme />
      </ThemeProvider>
    );
    expect(getByText(Theme.Light)).toBeInTheDocument();

    fireEvent.click(getByTestId(SWITCH_THEME_ID));

    expect(getByText(Theme.Dark)).toBeInTheDocument();
  });

  it('saves user switched theme to storage', () => {
    const setStorageThemeSpy = jest.spyOn(ThemeStorage, 'setStorageTheme');

    const { getByTestId } = render(
      <ThemeProvider>
        <TestTheme />
      </ThemeProvider>
    );
    expect(setStorageThemeSpy).not.toHaveBeenCalled();

    fireEvent.click(getByTestId(SWITCH_THEME_ID));

    expect(setStorageThemeSpy).toHaveBeenCalledTimes(1);
    expect(setStorageThemeSpy).toHaveBeenCalledWith(Theme.Dark);
  });
});
