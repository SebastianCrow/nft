import { fireEvent, render } from '@testing-library/react';
import { ensureDefined } from '../../../../shared';
import { MessagePanel } from './messagePanel.component';

describe('MessagePanel', () => {
  it('renders texts', () => {
    const { queryByText } = render(
      <MessagePanel title="Test Title" message="Test Message" />
    );
    expect(queryByText('Test Title')).toBeInTheDocument();
    expect(queryByText('Test Message')).toBeInTheDocument();
    expect(queryByText('Clear search')).not.toBeInTheDocument();
  });

  it('calls action', () => {
    const onAction = jest.fn();

    const { queryByText } = render(
      <MessagePanel
        title="Test Title"
        message="Test Message"
        onAction={onAction}
      />
    );
    expect(queryByText('Test Title')).toBeInTheDocument();
    expect(queryByText('Test Message')).toBeInTheDocument();

    expect(onAction).not.toHaveBeenCalled();

    const actionButton = ensureDefined(queryByText('Clear search'));
    expect(actionButton).toBeInTheDocument();
    fireEvent.click(actionButton);

    expect(onAction).toHaveBeenCalledTimes(1);
  });
});
