import { FunctionComponent, useEffect, useMemo, useRef, useState } from 'react';
import { Card, Grid, GridCellProps } from '../../../ui';
import { ITEMS_PER_PAGE, useFetchListings } from '../../hooks/useFetchListings';
import { usePrevious } from '../../../../shared';
import { Header } from '../header/header.component';
import { ReactComponent as LogoSolana } from '../../../../resources/logo-solana.svg';

export const Listings: FunctionComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data, hasNextPage, fetchNextPage } = useFetchListings({
    searchQuery,
  });

  const items = useMemo(() => {
    return data?.pages.flatMap((page) => (page as any).items) ?? []; // TODO: flat map, casting
  }, [data?.pages]);

  const [page, setPage] = useState(1);
  const prevPage = usePrevious(page);
  useEffect(() => {
    if (!prevPage || page > prevPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, page, prevPage]);

  const prevSearchQuery = usePrevious(searchQuery);
  useEffect(() => {
    if (prevSearchQuery !== searchQuery) {
      setPage(1);
    }
  }, [prevSearchQuery, searchQuery]);

  const gridElementRef = useRef<HTMLElement>(null);

  const ListingsCell = ({
    rowIndex,
    columnIndex,
    itemIndex,
  }: GridCellProps) => {
    const item = items[itemIndex];

    if (itemIndex >= items.length + ITEMS_PER_PAGE) {
      return null;
    }

    if (!item && hasNextPage !== false) {
      const nextPage = Math.floor(itemIndex / ITEMS_PER_PAGE) + 1;
      if (nextPage > page) {
        setPage(nextPage);
      }

      return <Card key={`loader-${rowIndex}-${columnIndex}`} />;
    }

    if (!item) {
      return null;
    }

    const {
      name,
      price,
      extra: { img },
    } = item;

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

  return (
    <div className="h-full bg">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        scrollElementRef={gridElementRef}
      />
      <Grid
        itemsCount={items.length + (hasNextPage !== false ? ITEMS_PER_PAGE : 0)}
        gridElementRef={gridElementRef}
      >
        {ListingsCell}
      </Grid>
    </div>
  );
};
