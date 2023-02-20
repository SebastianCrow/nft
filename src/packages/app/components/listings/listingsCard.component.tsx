import {
  ITEMS_PER_PAGE,
  ListingsItem,
} from '../../services/listingsNetwork.service';
import { FunctionComponent } from 'react';
import { ListingsLoadingCard } from './listingsLoadingCard.component';
import { ListingsItemCard } from './listingsItemCard.component';
import { GridCellProps } from '../../../ui';

interface ListingsCardProps extends GridCellProps {
  items: ListingsItem[];
  fetchingFinished: boolean;
  page: number;
  goToPage: (page: number) => void;
}

export const ListingsCard: FunctionComponent<ListingsCardProps> = ({
  itemIndex,
  items,
  fetchingFinished,
  page,
  goToPage,
}) => {
  if (itemIndex >= items.length + ITEMS_PER_PAGE) {
    return null;
  }

  const item = items[itemIndex];

  if (!item) {
    return !fetchingFinished ? (
      <ListingsLoadingCard
        itemIndex={itemIndex}
        page={page}
        goToPage={goToPage}
      />
    ) : null;
  }

  return <ListingsItemCard item={item} />;
};
