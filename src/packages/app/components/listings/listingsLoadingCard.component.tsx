import type { FunctionComponent } from 'react';
import { useMemo } from 'react';
import { Card } from '../../../ui';
import { ITEMS_PER_PAGE } from '../../services/listingsNetwork.service';
import { useOnNextPageUpdate } from '../../hooks/useOnNextPageUpdate';

interface ListingsLoadingCardProps {
  itemIndex: number;
  page: number;
  goToPage: (page: number) => void;
}

export const ListingsLoadingCard: FunctionComponent<
  ListingsLoadingCardProps
> = ({ itemIndex, page, goToPage }) => {
  const itemPage = useMemo(
    () => Math.floor(itemIndex / ITEMS_PER_PAGE) + 1,
    [itemIndex]
  );

  useOnNextPageUpdate({
    prevPage: page,
    page: itemPage,
    onPageUpdate: goToPage,
  });

  return <Card />;
};
