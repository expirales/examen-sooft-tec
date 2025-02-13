import { useMemo } from 'react'
import Fuse, { IFuseOptions, FuseOptionKey } from 'fuse.js'

type UseFuseSearchProps<T> = {
  data: T[]
  keys: Array<keyof T>
  query: string
  options?: IFuseOptions<T>
}

/**
 * Custom hook to perform search using Fuse.js.
 *
 * @template T - The type of the items in the data array.
 * @param {UseFuseSearchProps<T>} props - The properties for the search.
 * @param {T[]} props.data - The array of data to search through.
 * @param {Array<FuseOptionKey<T>>} props.keys - The keys to search within each data item.
 * @param {string} props.query - The search query string.
 * @param {Fuse.IFuseOptions<T>} [props.options] - Additional Fuse.js options.
 * @returns {T[]} - The array of search results.
 *
 * @example
 * const data = [{ title: 'Old Man\'s War' }, { title: 'The Lock Artist' }];
 * const keys = ['title'];
 * const query = 'war';
 * const options = { threshold: 0.4 };
 * const results = useFuseSearch({ data, keys, query, options });
 * // results will contain items that match the query
 */
export function useFuseSearch<T>({ data, keys, query, options }: UseFuseSearchProps<T>): T[] {
  const fuse = useMemo(() => {
    return new Fuse(data, {
      keys: keys as Array<FuseOptionKey<T>>,
      threshold: 0.3, // match sensibility
      ...options,
    })
  }, [data, keys, options])

  const results = useMemo(() => {
    if (!query) return data
    return fuse.search(query).map((result) => result.item)
  }, [query, data, fuse])

  return results
}
