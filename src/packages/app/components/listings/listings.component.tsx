import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { FixedSizeGrid } from 'react-window';
import { Card, Input } from '../../../ui';
import { useFetchListings } from '../../hooks/useFetchListings';
import { classes, usePrevious } from '../../../../shared';
import { useFilterListings } from '../../hooks/useFilterListings';
import { useResizeObserver } from '../../../../shared/hooks/useResizeObserver';

const HEADER_HEIGHT_PX = 64; // TODO: Dynamic

const ITEM_SPACING_PX = 16;

const getItemCellStyle = (style: any) => ({
  // TODO: Casting
  ...style,
  left: style.left + ITEM_SPACING_PX,
  top: style.top + ITEM_SPACING_PX + HEADER_HEIGHT_PX,
  width: style.width - ITEM_SPACING_PX,
  height: style.height - ITEM_SPACING_PX,
});

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

  const COLUMNS = 3; // TODO: Responsive

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
        <div style={getItemCellStyle(style)}>
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
      <div style={getItemCellStyle(style)}>
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

  const gridRef = useRef<HTMLDivElement>(null);

  const gridSize = useResizeObserver({ ref: gridRef });
  const { width, height } = gridSize ?? { width: 0, height: 0 };

  console.log('sleposeb', width, height);

  const ITEMS_TOTAL_WIDTH = width - ITEM_SPACING_PX;
  const ITEM_WIDTH = Math.floor(ITEMS_TOTAL_WIDTH / COLUMNS);
  const ITEM_HEIGHT = ITEM_WIDTH + 56;

  return (
    <div className="h-full">
      <div className="flex justify-center items-center absolute top-0 left-0 right-0 z-10 p-2 bg-red-500">
        <Input
          value={searchQuery}
          onValueChange={setSearchQuery}
          placeholder="Search NFT name"
        />
      </div>
      <div ref={gridRef} className="h-full">
        <FixedSizeGrid
          columnCount={COLUMNS}
          columnWidth={ITEM_WIDTH}
          width={width}
          rowCount={Math.ceil(
            (filteredItems.length + (hasNextPage !== false ? 20 : 0)) / COLUMNS
          )}
          rowHeight={ITEM_HEIGHT}
          height={height}
        >
          {Cell}
        </FixedSizeGrid>
      </div>
    </div>
  );
};
