import type { FunctionComponent } from 'react';
import type { ListingsItem } from '../../services/listingsNetwork.service';
import { ITEMS_PER_PAGE } from '../../services/listingsNetwork.service';
import type { GridCellProps } from '../../../ui';
import { ListingsLoadingCard } from './listingsLoadingCard.component';
import { ListingsItemCard } from './listingsItemCard.component';

interface ListingsCardProps extends GridCellProps {
  items: ListingsItem[];
  fetchingFinished: boolean;
  page: number;
  goToPage: (page: number) => void;
}

/**
 * Listings item cell in the grid.
 * It can be either {@link ListingsLoadingCard} or {@link ListingsItemCard}.
 *
 * @param itemIndex Item index
 * @param items Listings items
 * @param fetchingFinished Whether fetching items is finished
 * @param page Page
 * @param goToPage Go to page
 * @param size Size of the card
 */
export const ListingsCard: FunctionComponent<ListingsCardProps> = ({
  itemIndex,
  items,
  fetchingFinished,
  page,
  goToPage,
  size,
}) => {
  // Requested item index is out of scope (taking items + loading cards into account)
  if (itemIndex >= items.length + ITEMS_PER_PAGE) {
    return null;
  }

  const item = items[itemIndex];

  // No fetched item found for the requested item index
  // - Render loading card for in progress fetching
  // - No card after fetching is finished
  if (!item) {
    return !fetchingFinished ? (
      <ListingsLoadingCard
        itemIndex={itemIndex}
        page={page}
        goToPage={goToPage}
      />
    ) : null;
  }

  // Item found
  return <ListingsItemCard item={item} size={size} />;
};
