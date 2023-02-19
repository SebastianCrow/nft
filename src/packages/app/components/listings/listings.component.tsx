import {
  FunctionComponent,
  useEffect,
  useState,
  RefObject,
  useMemo,
} from 'react';
import { FixedSizeGrid } from 'react-window';
import { Card, Input } from '../../../ui';
import { useFetchListings } from '../../hooks/useFetchListings';
import { classes, useIntersectionObserver } from '../../../../shared';
import { useFilterListings } from '../../hooks/useFilterListings';

export const Listings: FunctionComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isFetching, hasNextPage, fetchNextPage } = useFetchListings();

  const filteredItems = useFilterListings({
    items: data?.pages.flatMap((page) => page) ?? [], // TODO: flat map
    searchQuery,
  });

  const listEndRefs: RefObject<HTMLDivElement>[] = useMemo(
    () =>
      new Array(20).fill({
        // TODO
        current: null,
      }),
    []
  );

  const listEnd = useIntersectionObserver({
    refs: listEndRefs,
  });

  useEffect(() => {
    if (!isFetching && listEnd) {
      fetchNextPage();
    }
  }, [fetchNextPage, isFetching, listEnd]);

  const Cell = ({ columnIndex, rowIndex, style }: any) => (
    <div style={style}>
      Item {rowIndex},{columnIndex}
    </div>
  );

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
        columnCount={1000}
        columnWidth={100}
        height={150}
        rowCount={1000}
        rowHeight={35}
        width={300}
      >
        {Cell}
      </FixedSizeGrid>
      {/*<Grid>*/}
      {/*  {filteredItems.map(({ name, price, extra: { img } }) => (*/}
      {/*    <Card key={name} titleLeft={name} titleRight={price} loader>*/}
      {/*      <img*/}
      {/*        src={img}*/}
      {/*        alt={`Image for ${name}`}*/}
      {/*        className="absolute inset-0 z-10"*/}
      {/*      />*/}
      {/*    </Card>*/}
      {/*  ))}*/}
      {/*  {hasNextPage !== false &&*/}
      {/*    listEndRefs.map((ref, index) => (*/}
      {/*      <Card key={index} loader>*/}
      {/*        {index === 0 && ( // TODO*/}
      {/*          <div*/}
      {/*            ref={ref}*/}
      {/*            className={classes(*/}
      {/*              'absolute inset-0 z-10',*/}
      {/*              isFetching ? 'hidden' : undefined*/}
      {/*            )}*/}
      {/*          />*/}
      {/*        )}*/}
      {/*      </Card>*/}
      {/*    ))}*/}
      {/*</Grid>*/}
    </div>
  );
};
