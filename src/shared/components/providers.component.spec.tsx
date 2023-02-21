import { render } from '@testing-library/react';
import { Providers } from './providers.component';

describe('Providers', () => {
  it('renders providers and children', () => {
    const { getByTestId } = render(
      <Providers
        providers={[
          <div key="provider1" data-testid="provider1" />,
          <div key="provider2" data-testid="provider2" />,
          <div key="provider3" data-testid="provider3" />,
        ]}
      >
        <div data-testid="child1">
          <div data-testid="child2" />
        </div>
      </Providers>
    );

    const provider1 = getByTestId('provider1');
    const provider2 = getByTestId('provider2');
    const provider3 = getByTestId('provider3');

    const child1 = getByTestId('child1');
    const child2 = getByTestId('child2');

    expect(provider1).toBeInTheDocument();
    expect(provider1).toContainElement(provider2);
    expect(provider2).toContainElement(provider3);
    expect(provider3).toContainElement(child1);
    expect(child1).toContainElement(child2);
  });
});
