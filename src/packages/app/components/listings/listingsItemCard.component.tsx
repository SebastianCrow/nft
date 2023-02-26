import type { FunctionComponent } from 'react';
import type { GridItemCellProps } from '../../../ui';
import { Card } from '../../../ui';
import { ReactComponent as LogoSolana } from '../../../../resources/logo-solana.svg';
import type { ListingsItem } from '../../services/listingsNetwork.service';

/**
 * Card for the listings item
 *
 * @param title Item name
 * @param price Item price
 * @param img Item image's url
 */
export const ListingsItemCard: FunctionComponent<
  GridItemCellProps<ListingsItem>
> = ({ item: { title, price, img } }) => {
  return (
    <Card
      key={title}
      titleLeft={<div className="truncate">{title}</div>}
      titleRight={
        <div className="flex items-center space-x-1.5">
          <LogoSolana width={13} />
          <div>{price}</div>
        </div>
      }
    >
      <img
        src={img}
        alt={`Image for ${title}`}
        loading="lazy"
        className="h-full"
      />
    </Card>
  );
};
