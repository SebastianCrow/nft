import { render } from '@testing-library/react';
import * as ThemeProvider from './themeProvider';
import { Theme } from './themeStorage';
import { ThemeWrapper } from './themeWrapper.component';

describe('ThemeWrapper', () => {
  it.each([[Theme.Dark], [Theme.Light]])(
    'applies correct class [theme = %s]',
    (theme) => {
      jest.spyOn(ThemeProvider, 'useTheme').mockReturnValue({
        theme,
        switchTheme: jest.fn(),
      });

      const { container, getByText } = render(
        <ThemeWrapper>
          <div>Test1</div>
        </ThemeWrapper>
      );

      expect(container.getElementsByClassName(theme)).toHaveLength(1);
      expect(container.getElementsByClassName(theme)[0]).toBeInTheDocument();

      expect(getByText('Test1')).toBeInTheDocument();
    }
  );
});
