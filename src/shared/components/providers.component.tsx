import type { FunctionComponent, ReactElement, ReactNode } from 'react';
import { cloneElement } from 'react';

const child = (children: ReactNode, component: ReactElement): ReactElement =>
  cloneElement(component, {}, children);

interface ProvidersProps {
  providers: ReactElement[];
  children: ReactElement;
}

/**
 * Use composition to join given {@param providers} so they can wrap {@param children} avoiding an infamous React Context Hell
 */
export const Providers: FunctionComponent<ProvidersProps> = ({
  providers,
  children,
}): ReactElement => {
  return providers.reduceRight(child, children);
};
