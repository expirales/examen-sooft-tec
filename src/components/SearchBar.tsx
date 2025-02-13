import './SearchBar.scss'
import { ChangeEvent, useState } from 'react'
import { useFuseSearch } from '../hooks/useFuseSearch'
import { useItems } from '../contexts/itemsContext'

/**
 * SearchBar component provides a search input field with suggestions and filtering capabilities.
 * It allows users to search for items, filter them based on the search query, and clear the search and filters.
 *
 * @component
 * @example
 * return (
 *   <SearchBar />
 * )
 *
 * @returns {JSX.Element} The rendered SearchBar component.
 *
 * @function
 * @name SearchBar
 *
 * @description
 * This component uses the `useItems` hook to manage the state and actions related to items.
 * It also uses the `useFuseSearch` hook to perform the search and filter the items based on the query.
 *
 * @hook
 * @name useItems
 * @description Custom hook to manage items and their filtering state.
 *
 * @hook
 * @name useFuseSearch
 * @description Custom hook to perform search using Fuse.js.
 *
 * @state {string} query - The current search query.
 * @state {number} isShowSuggestions - The number of suggestions to show.
 *
 * @param {ChangeEvent<HTMLInputElement>} e - The change event from the search input.
 *
 * @method
 * @name handleChange
 * @description Handles the change event of the search input, updates the query state, and manages the visibility of suggestions.
 *
 * @method
 * @name handleFilterItem
 * @description Filters a single item based on its ID and hides the suggestions.
 * @param {number} id - The ID of the item to filter.
 *
 * @method
 * @name handleFilterAllItems
 * @description Filters all items based on the current search query and hides the suggestions.
 *
 * @method
 * @name handleCleanFilters
 * @description Clears the search query and filters, and hides the suggestions.
 *
 * @returns {JSX.Element} The rendered SearchBar component.
 */
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
                disabled={filteredItems.length === 0}
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
