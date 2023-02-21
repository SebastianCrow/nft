import type { FunctionComponent } from 'react';
import type { ListingsItem } from '../../services/listingsNetwork.service';
import { Card } from '../../../ui';
import { ReactComponent as LogoSolana } from '../../../../resources/logo-solana.svg';

interface ListingsItemCardProps {
  item: ListingsItem;
}

export const ListingsItemCard: FunctionComponent<ListingsItemCardProps> = ({
  item: {
    name,
    price,
    extra: { img },
  },
}) => {
  return (
    <Card
      key={name}
      titleLeft={<div className="truncate">{name}</div>}
      titleRight={
        <div className="flex items-center space-x-1.5">
          {/* TODO: SVG size? */}
          <LogoSolana width={14.83} height={12} />
          <div>{price}</div>
        </div>
      }
    >
      <img src={img} alt={`Image for ${name}`} />
    </Card>
  );
};
