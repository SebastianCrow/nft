import {
  FunctionComponent,
  useEffect,
  useState,
  RefObject,
  useMemo,
} from 'react';
import { Grid, Input } from '../../../ui';
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
      new Array(1).fill({
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

  return (
    <div className="space-y-4">
      <div className="flex justify-center items-center">
        <Input
          value={searchQuery}
          onValueChange={setSearchQuery}
          placeholder="Search NFT name"
        />
      </div>
      <Grid>
        {filteredItems.map(({ name, price, extra: { img } }) => (
          <div key={name} className="rounded-xl overflow-hidden border">
            <div className="relative aspect-square">
              <img
                src={img}
                alt={`Image for ${name}`}
                className="absolute inset-0 z-10"
              />
              <div className="absolute inset-0 z-0 animate-pulse bg-slate-200" />
            </div>
            <div className="flex justify-between p-4">
              <div>{name}</div>
              <div>{price}</div>
            </div>
          </div>
        ))}
        {listEndRefs.map((ref, index) => {
          console.log('sleposeb', index);
          return (
            <div
              key={index}
              className={classes(
                'rounded-xl overflow-hidden border',
                hasNextPage === false ? 'hidden' : undefined
              )}
            >
              <div className="relative aspect-square">
                <div
                  ref={ref}
                  className={classes(
                    'absolute inset-0 z-10 bg-red-500', // TODO: bg
                    isFetching ? 'hidden' : undefined
                  )}
                />
                <div className="absolute inset-0 z-0 animate-pulse bg-slate-200" />
              </div>
              <div className="flex justify-between p-4">
                <div>NameA</div>
                <div>PriceA</div>
              </div>
            </div>
          );
        })}
      </Grid>
    </div>
  );
};
