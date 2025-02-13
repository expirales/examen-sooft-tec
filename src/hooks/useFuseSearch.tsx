import { useMemo } from 'react'
import Fuse, { IFuseOptions, FuseOptionKey } from 'fuse.js'

type UseFuseSearchProps<T> = {
  data: T[]
  keys: Array<keyof T>
  query: string
  options?: IFuseOptions<T>
}

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
