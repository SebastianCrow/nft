import { act, fireEvent, render } from '@testing-library/react';
import { noop } from '../../../../shared';
import { Button } from './button.component';

describe('Button', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Button onClick={noop}>Test</Button>);
    expect(getByText('Test')).toBeInTheDocument();
  });

  it('calls action', () => {
    const onClick = jest.fn();
    const { getByText } = render(<Button onClick={onClick}>Test</Button>);

    act(() => {
      fireEvent.click(getByText('Test'));
    });

    expect(onClick).toHaveBeenCalled();
  });
});
