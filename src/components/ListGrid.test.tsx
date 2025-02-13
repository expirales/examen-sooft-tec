import { render, screen } from '@testing-library/react'
import ListGrid from './ListGrid'
import '@testing-library/jest-dom'
import 'intersection-observer'

describe('ListGrid', () => {
  const items = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`)
  const renderItem = (item: string) => <div key={item}>{item}</div>

  test('renders initial items', () => {
    render(<ListGrid items={items} renderItem={renderItem} />)
    const displayedItems = screen.getAllByText(/Item \d+/)
    expect(displayedItems).toHaveLength(10)
  })

  test('disables load more button when all items are loaded', () => {
    render(<ListGrid items={items.slice(0, 10)} renderItem={renderItem} />)
    const loadMoreButton = screen.getByRole('button', { name: /Load More/i })
    expect(loadMoreButton).toBeDisabled()
  })

  test('renders all items when filtered', () => {
    render(<ListGrid items={items} renderItem={renderItem} isFiltered={true} />)
    const displayedItems = screen.getAllByText(/Item \d+/)
    expect(displayedItems).toHaveLength(20)
  })

  test('applies correct grid layout settings', () => {
    render(
      <ListGrid
        items={items}
        renderItem={renderItem}
        gridLayoutSettings={{ columns: 3, rows: 5 }}
      />
    )
    const grid = screen.getByTestId('list-grid')
    expect(grid).toHaveClass('column-3')
    expect(grid).toHaveClass('row-5')
  })
})
