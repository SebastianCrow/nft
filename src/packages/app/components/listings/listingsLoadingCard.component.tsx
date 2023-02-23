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

/**
 * Loading card for items not fetched yet
 *
 * @param itemIndex Item index
 * @param page Page
 * @param goToPage Called when a card from the next page is rendered (in the virtualized grid)
 */
export const ListingsLoadingCard: FunctionComponent<
  ListingsLoadingCardProps
> = ({ itemIndex, page, goToPage }) => {
  const itemPage = useMemo(
    () => Math.floor(itemIndex / ITEMS_PER_PAGE) + 1,
    [itemIndex]
  );

  // Fetch new items when the card from next page is rendered in the virtualized grid
  useOnNextPageUpdate({
    prevPage: page,
    page: itemPage,
    onPageUpdate: goToPage,
  });

  return <Card />;
};
