import { useEffect, useRef, useState, useCallback } from 'react'
import { cssClassNames } from '../utils/cssClassNames'
import './ListGrid.scss'

type ListGridProps<T> = {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  gridLayoutSettings?: {
    columns: number
    rows: number
  }
  isFiltered?: boolean
}

const MAX_ITEMS = 10

export default function ListGrid<T>({
  items = [],
  renderItem,
  gridLayoutSettings,
  isFiltered = false,
}: ListGridProps<T>) {
  const loaderRef = useRef<HTMLButtonElement | null>(null)
  const [page, setPage] = useState(0)
  const [displayedItems, setDisplayedItems] = useState<T[]>([])
  const { columns = 1, rows = 10 } = gridLayoutSettings || {}

  const loadMoreItems = useCallback(() => {
    const nextPage = page + 1
    const newItems = items.slice(nextPage * MAX_ITEMS, (nextPage + 1) * MAX_ITEMS)

    if (newItems.length > 0) {
      setDisplayedItems((prevItems) => [...prevItems, ...newItems])
      setPage(nextPage)
    }
  }, [items, page])

  useEffect(() => {
    if (isFiltered) {
      setDisplayedItems(items)
    } else {
      setDisplayedItems(items.slice(0, MAX_ITEMS))
      setPage(0)
    }
  }, [isFiltered, items])

  useEffect(() => {
    if (!loaderRef.current) return

    if (!isFiltered) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMoreItems()
          }
        },
        { rootMargin: '100px' }
      )

      observer.observe(loaderRef.current)

      return () => observer.disconnect()
    }
  }, [isFiltered, loadMoreItems])

  return (
    <section
      className={cssClassNames('cnt-list-grid', {
        [`row-${rows}`]: rows >= 1 && rows <= 10,
        [`column-${columns}`]: columns >= 1 && columns <= 10,
      })}
      data-testid="list-grid"
    >
      {displayedItems.map((item, index) => (
        <div key={index}>{renderItem(item)}</div>
      ))}
      <button
        ref={loaderRef}
        disabled={displayedItems.length === items.length}
        aria-label="Load More"
      >
        Load More
      </button>
    </section>
  )
}
