import { fireEvent, render } from '@testing-library/react';
import { noop } from '../../../../shared';
import { ThemeProvider } from '../../../ui';
import { Header } from './header.component';

describe('Header', () => {
  it('propagates search query to input element', () => {
    const { getByDisplayValue } = render(
      <Header
        searchQuery="test"
        setSearchQuery={noop}
        scrollElementRef={{ current: null }}
      />
    );
    expect(getByDisplayValue('test')).toBeInTheDocument();
  });

  it('scrolls to top on click', () => {
    const element = document.createElement('div');
    element.scrollTo = jest.fn();

    const { getByTestId } = render(
      <>
        <Header
          searchQuery="test"
          setSearchQuery={noop}
          scrollElementRef={{ current: element }}
        />
      </>
    );
    expect(element.scrollTo).not.toHaveBeenCalled();

    fireEvent.click(getByTestId('header-main'));

    expect(element.scrollTo).toHaveBeenCalledTimes(1);
  });

  it('does not scroll to top on clicking input and theme switcher', () => {
    const element = document.createElement('div');
    element.scrollTo = jest.fn();

    const { getByTestId } = render(
      <ThemeProvider>
        <Header
          searchQuery="test"
          setSearchQuery={noop}
          scrollElementRef={{ current: element }}
        />
      </ThemeProvider>
    );

    fireEvent.click(getByTestId('input-main'));
    fireEvent.click(getByTestId('themeSwitcher-main'));

    expect(element.scrollTo).not.toHaveBeenCalled();
  });
});
