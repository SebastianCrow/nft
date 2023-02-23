import type { FunctionComponent } from 'react';
import type { ListingsItem } from '../../services/listingsNetwork.service';
import type { GridCellProps } from '../../../ui';
import { Card } from '../../../ui';
import { ReactComponent as LogoSolana } from '../../../../resources/logo-solana.svg';

interface ListingsItemCardProps {
  item: ListingsItem;
  size: GridCellProps['size'];
}

/**
 * Card for the listings item
 *
 * @param name Item name
 * @param price Item price
 * @param img Item image's url
 * @param width Card width. Propagated to <img /> element
 */
export const ListingsItemCard: FunctionComponent<ListingsItemCardProps> = ({
  item: {
    name,
    price,
    extra: { img },
  },
  size: { width },
}) => {
  return (
    <Card
      key={name}
      titleLeft={<div className="truncate">{name}</div>}
      titleRight={
        <div className="flex items-center space-x-1.5">
          <LogoSolana width={13} />
          <div>{price}</div>
        </div>
      }
    >
      <img src={img} alt={`Image for ${name}`} width={width} height={width} />
    </Card>
  );
};
