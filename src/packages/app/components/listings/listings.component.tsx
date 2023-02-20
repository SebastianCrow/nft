import { FunctionComponent, useEffect, useMemo, useRef, useState } from 'react';
import { FixedSizeGrid } from 'react-window';
import { Card } from '../../../ui';
import { ITEMS_PER_PAGE, useFetchListings } from '../../hooks/useFetchListings';
import { usePrevious } from '../../../../shared';
import { useFilterListings } from '../../hooks/useFilterListings';
import { useResizeObserver } from '../../../../shared/hooks/useResizeObserver';
import { Header } from '../header/header.component';
import { ReactComponent as LogoSolana } from '../../../../resources/logo-solana.svg';

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

  const { data, hasNextPage, fetchNextPage } = useFetchListings({
    searchQuery,
  });

  const filteredItems = useFilterListings({
    items: data?.pages.flatMap((page) => (page as any).items) ?? [], // TODO: flat map, casting
    searchQuery,
  });

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

  const gridContainerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLElement>(null);

  const gridSize = useResizeObserver({ ref: gridContainerRef });
  const { width, height } = gridSize ?? { width: 0, height: 0 };

  const WIDTH_MULTIPLIER = 256;

  const computedWidth = Math.min(width, 7 * WIDTH_MULTIPLIER);

  const columnCount = useMemo(() => {
    if (computedWidth >= 6 * WIDTH_MULTIPLIER) {
      return 6;
    } else if (computedWidth >= 5 * WIDTH_MULTIPLIER) {
      return 5;
    } else if (computedWidth >= 4 * WIDTH_MULTIPLIER) {
      return 4;
    } else if (computedWidth >= 3 * WIDTH_MULTIPLIER) {
      return 3;
    } else {
      return 2;
    }
  }, [computedWidth]);

  const ITEMS_TOTAL_WIDTH = computedWidth - ITEM_SPACING_PX;
  const ITEM_WIDTH = Math.floor(ITEMS_TOTAL_WIDTH / columnCount);
  const ITEM_HEIGHT = ITEM_WIDTH + 56;

  const Cell = ({ rowIndex, columnIndex, style }: any) => {
    const index = rowIndex * columnCount + columnIndex;
    const item = filteredItems[index];

    if (index >= filteredItems.length + ITEMS_PER_PAGE) {
      return null;
    }

    if (!item && hasNextPage !== false) {
      const nextPage = Math.floor(index / ITEMS_PER_PAGE) + 1;
      if (nextPage > page) {
        setPage(nextPage);
      }

      return (
        <div style={getItemCellStyle(style)}>
          <Card key={`loader-${rowIndex}-${columnIndex}`} />
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
      </div>
    );
  };

  return (
    <div className="h-full bg">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        scrollElementRef={gridRef}
      />
      <div className="h-full flex justify-center" ref={gridContainerRef}>
        <FixedSizeGrid
          columnCount={columnCount}
          columnWidth={ITEM_WIDTH}
          width={computedWidth}
          rowCount={Math.ceil(
            (filteredItems.length +
              (hasNextPage !== false ? ITEMS_PER_PAGE : 0)) /
              columnCount
          )}
          rowHeight={ITEM_HEIGHT}
          height={height}
          outerRef={gridRef}
        >
          {Cell}
        </FixedSizeGrid>
      </div>
    </div>
  );
};
