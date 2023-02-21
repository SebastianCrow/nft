import type { FunctionComponent, ReactElement } from 'react';
import { cloneElement } from 'react';

interface ProvidersProps {
  providers: ReactElement[];
  children: ReactElement;
}

export const Providers: FunctionComponent<ProvidersProps> = ({
  providers,
  children,
}): ReactElement => {
  const renderProvider = (
    renderedProviders: ReactElement[],
    renderedChildren: ReactElement
  ): ReactElement => {
    const [provider, ...restProviders] = renderedProviders;

    if (provider) {
      return cloneElement(
        provider,
        undefined,
        renderProvider(restProviders, renderedChildren)
      );
    }

    return renderedChildren;
  };

  return renderProvider(providers, children);
};
