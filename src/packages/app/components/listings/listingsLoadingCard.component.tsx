import { Card } from '../../../ui';
import { ITEMS_PER_PAGE } from '../../services/listingsNetwork.service';
import { FunctionComponent, useEffect } from 'react';

interface ListingsLoadingCardProps {
  itemIndex: number;
  page: number;
  goToPage: (page: number) => void;
}

export const ListingsLoadingCard: FunctionComponent<
  ListingsLoadingCardProps
> = ({ itemIndex, page, goToPage }) => {
  useEffect(() => {
    const nextPage = Math.floor(itemIndex / ITEMS_PER_PAGE) + 1;
    if (nextPage > page) {
      goToPage(nextPage);
    }
  }, [goToPage, itemIndex, page]);

  return <Card />;
};
