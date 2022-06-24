import debounce from 'lodash.debounce';
import { useEffect, useMemo } from 'react';

export default function useDebounceSearch(search: Function) {
  const debouncedResults = useMemo(() => debounce(search, 500), [search]);

  useEffect(() => () => {
    debouncedResults.cancel();
  });

  return debouncedResults;
}
