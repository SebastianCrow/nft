import { render } from '@testing-library/react';
import { Card } from './card.component';

describe('Card', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <Card titleLeft={<div>TitleLeft</div>} titleRight={<div>TitleRight</div>}>
        <div>Child1</div>
      </Card>
    );

    expect(getByText('TitleLeft')).toBeInTheDocument();
    expect(getByText('TitleRight')).toBeInTheDocument();
    expect(getByText('Child1')).toBeInTheDocument();
  });

  it('renders loaders', () => {
    const { queryByTestId, rerender } = render(<Card />);

    expect(queryByTestId('loader-main')).toBeInTheDocument();
    expect(queryByTestId('loader-title-left')).toBeInTheDocument();
    expect(queryByTestId('loader-title-right')).toBeInTheDocument();

    rerender(
      <Card titleLeft={<div>TitleLeft</div>} titleRight={<div>TitleRight</div>}>
        <div>Child1</div>
      </Card>
    );

    expect(queryByTestId('loader-main')).toBeInTheDocument();
    expect(queryByTestId('loader-title-left')).not.toBeInTheDocument();
    expect(queryByTestId('loader-title-right')).not.toBeInTheDocument();

    rerender(
      <Card
        titleLeft={<div>TitleLeft</div>}
        titleRight={<div>TitleRight</div>}
        mainLoader={false}
      >
        <div>Child1</div>
      </Card>
    );

    expect(queryByTestId('loader-main')).not.toBeInTheDocument();
    expect(queryByTestId('loader-title-left')).not.toBeInTheDocument();
    expect(queryByTestId('loader-title-right')).not.toBeInTheDocument();
  });
});
