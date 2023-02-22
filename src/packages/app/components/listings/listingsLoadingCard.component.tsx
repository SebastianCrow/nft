import type { FunctionComponent } from 'react';
import { Card } from '../../../ui';
import { ITEMS_PER_PAGE } from '../../services/listingsNetwork.service';
import { useFetchItemsOnPageChange } from '../../hooks/useFetchItemsOnPageChange';

interface ListingsLoadingCardProps {
  itemIndex: number;
  page: number;
  goToPage: (page: number) => void;
}

export const ListingsLoadingCard: FunctionComponent<
  ListingsLoadingCardProps
> = ({ itemIndex, page, goToPage }) => {
  useFetchItemsOnPageChange({
    prevPage: page,
    page: Math.floor(itemIndex / ITEMS_PER_PAGE) + 1,
    fetchNext: goToPage,
  });

  return <Card />;
};
