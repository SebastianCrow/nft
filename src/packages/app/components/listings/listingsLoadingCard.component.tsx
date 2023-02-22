import type { FunctionComponent } from 'react';
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
  useOnNextPageUpdate({
    prevPage: page,
    page: Math.floor(itemIndex / ITEMS_PER_PAGE) + 1,
    onPageUpdate: goToPage,
  });

  return <Card />;
};
