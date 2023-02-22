import { fireEvent, render } from '@testing-library/react';
import { noop } from '../../../../shared';
import { Input } from './input.component';

describe('Input', () => {
  it('renders value', () => {
    const { getByDisplayValue, rerender } = render(
      <Input value="Test1" onValueChange={noop} />
    );
    expect(getByDisplayValue('Test1')).toBeInTheDocument();

    rerender(<Input value="Test2" onValueChange={noop} />);
    expect(getByDisplayValue('Test2')).toBeInTheDocument();

    rerender(<Input value="Test3" onValueChange={noop} />);
    expect(getByDisplayValue('Test3')).toBeInTheDocument();
  });

  it('calls value handler', () => {
    const onValueChange = jest.fn();

    const { getByTestId } = render(
      <Input value="Test1" onValueChange={onValueChange} />
    );
    expect(onValueChange).not.toHaveBeenCalled();

    fireEvent.change(getByTestId('input'), { target: { value: 'Test2' } });
    expect(onValueChange).toHaveBeenCalledTimes(1);

    fireEvent.change(getByTestId('input'), { target: { value: 'Test3' } });
    expect(onValueChange).toHaveBeenCalledTimes(2);
  });

  it('clears value', () => {
    const onValueChange = jest.fn();

    const { getByTestId } = render(
      <Input value="Test1" onValueChange={onValueChange} />
    );
    expect(onValueChange).not.toHaveBeenCalled();

    fireEvent.click(getByTestId('input-icon-container'));
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith('');
  });

  it('displays correct icons', () => {
    const { queryByTestId, rerender } = render(
      <Input value="" onValueChange={noop} />
    );
    expect(queryByTestId('input-icon-search')).toBeInTheDocument();
    expect(queryByTestId('input-icon-clear')).not.toBeInTheDocument();

    rerender(<Input value="a" onValueChange={noop} />);
    expect(queryByTestId('input-icon-search')).not.toBeInTheDocument();
    expect(queryByTestId('input-icon-clear')).toBeInTheDocument();
  });
});
