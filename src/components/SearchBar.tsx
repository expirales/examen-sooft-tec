import './SearchBar.scss'
import { ChangeEvent, useState } from 'react'
import { useFuseSearch } from '../hooks/useFuseSearch'
import { useItems } from '../contexts/itemsContext'

export default function SearchBar() {
  const { filterItem, filterAllItems, items, cleanFilterItems, isFiltered } = useItems()
  const [query, setQuery] = useState('')
  const [isShowSuggestions, setIsShowSuggestions] = useState(0)

  const filteredItems = useFuseSearch({
    data: items,
    keys: ['text', 'id'],
    query,
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    if (value.length >= 3) {
      setIsShowSuggestions(filteredItems.length)
    } else {
      setIsShowSuggestions(0)
    }
  }

  const handleFilterItem = (id: number) => {
    filterItem(id)
    setIsShowSuggestions(0)
  }

  const handleFilterAllItems = () => {
    const ids = filteredItems.map((item) => item.id)
    filterAllItems(ids)
    setIsShowSuggestions(0)
  }
  const handleCleanFilters = () => {
    setQuery('')
    if (isFiltered) {
      cleanFilterItems()
    }
    setIsShowSuggestions(0)
  }

  return (
    <div className="cnt-search-bar" data-testid="search-bar">
      <div className="cnt-input">
        <input
          id="search-input"
          className="search-input"
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for a phrase..."
          aria-label="Search for a phrase"
          aria-describedby="search-input-description"
        />
        {(isFiltered || query) && (
          <button onClick={handleCleanFilters} aria-label="Clear search and filters" role="button">
            ✕
          </button>
        )}
      </div>
      {isShowSuggestions > 0 && (
        <>
          <ul className="cnt-suggestions" role="listbox" aria-label="Search suggestions">
            {filteredItems.map((item) => (
              <li
                key={item.id}
                role="option"
                aria-selected="false"
                onClick={() => handleFilterItem(item.id)}
              >
                {item.text}
              </li>
            ))}
            <div className="cnt-buttons">
              <button
                role="button"
                className="btn-results"
                onClick={handleFilterAllItems}
                aria-label={`See all ${filteredItems.length} results`}
              >
                See {filteredItems.length} results
              </button>
              <button
                role="button"
                className="btn-close"
                onClick={() => setIsShowSuggestions(0)}
                aria-label="Close suggestions"
              >
                Close
              </button>
            </div>
          </ul>
        </>
      )}
    </div>
  )
}
