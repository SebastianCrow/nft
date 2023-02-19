import { FunctionComponent, useEffect, useState } from 'react';
import { FixedSizeGrid } from 'react-window';
import { Card, Input } from '../../../ui';
import { useFetchListings } from '../../hooks/useFetchListings';
import { classes, usePrevious } from '../../../../shared';
import { useFilterListings } from '../../hooks/useFilterListings';

export const Listings: FunctionComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isFetching, hasNextPage, fetchNextPage } = useFetchListings();

  const filteredItems = useFilterListings({
    items: data?.pages.flatMap((page) => page) ?? [], // TODO: flat map
    searchQuery,
  });

  const [page, setPage] = useState(1);
  const prevPage = usePrevious(page);
  useEffect(() => {
    if (!prevPage || page > prevPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, page, prevPage]);

  const COLUMNS = 3;

  const Cell = ({ rowIndex, columnIndex, style }: any) => {
    const index = rowIndex * COLUMNS + columnIndex;
    const item = filteredItems[index];

    if (index >= filteredItems.length + 20) {
      return null;
    }

    const nextPage = Math.floor(index / 20) + 1;
    if (nextPage > page) {
      setPage(nextPage);
    }

    if (!item && hasNextPage !== false) {
      return (
        <div style={style}>
          <Card key={`loader-${rowIndex}-${columnIndex}`} loader>
            <div
              className={classes(
                'absolute inset-0 z-10 bg-red-500',
                isFetching ? 'hidden' : undefined
              )}
            />
          </Card>
        </div>
      );
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
      <div style={style}>
        <Card key={name} titleLeft={name} titleRight={price} loader>
          <img
            src={img}
            alt={`Image for ${name}`}
            className="absolute inset-0 z-10"
          />
        </Card>
      </div>
    );
  };

  const WINDOW_WIDTH = 832;
  const WINDOW_HEIGHT = 888;

  return (
    <div className="space-y-4">
      <div className="flex justify-center items-center">
        <Input
          value={searchQuery}
          onValueChange={setSearchQuery}
          placeholder="Search NFT name"
        />
      </div>
      <FixedSizeGrid
        columnCount={COLUMNS}
        columnWidth={Math.floor(WINDOW_WIDTH / COLUMNS)}
        width={WINDOW_WIDTH}
        rowCount={Math.ceil(
          (filteredItems.length + (hasNextPage !== false ? 20 : 0)) / COLUMNS
        )}
        rowHeight={Math.floor(WINDOW_WIDTH / COLUMNS) + 56}
        height={WINDOW_HEIGHT}
      >
        {Cell}
      </FixedSizeGrid>
    </div>
  );
};
