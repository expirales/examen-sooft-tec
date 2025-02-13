import './HomePage.scss'
import SearchBar from '../components/SearchBar'
import ListGrid from '../components/ListGrid'
import TextCard from '../components/TextCard'
import AddTextModal from '../components/AddTextModal'
import { Text } from '../types/global'
import { useState } from 'react'
import { useItems } from '../contexts/itemsContext'

export default function HomePage() {
  const { items, addItem, removeItem, isFiltered, totalItems } = useItems()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="cnt-home-page" role="main">
      <h1>Challenge</h1>
      <div className="cnt-header">
        <SearchBar />
        <button
          className="btn-add"
          onClick={() => setIsModalOpen(true)}
          aria-label="Add new text"
          role="button"
        >
          + Add
        </button>
      </div>
      <div className="cnt-total-records">
        <span>
          Total records: <b>{totalItems}</b>
        </span>
        {isFiltered && (
          <p role="status" aria-live="polite">
            Matches found ({items.length})
          </p>
        )}
      </div>
      <ListGrid
        items={items}
        renderItem={({ id, text }: Text) => (
          <TextCard id={id} text={text} onHandleRemoveText={removeItem} />
        )}
        isFiltered={isFiltered}
        gridLayoutSettings={{
          columns: 5,
          rows: 5,
        }}
      />
      {isModalOpen && (
        <AddTextModal onHandleClose={() => setIsModalOpen(false)} onHandleSubmit={addItem} />
      )}
    </div>
  )
}
