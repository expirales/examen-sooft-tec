import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ListGrid from './ListGrid'
import 'intersection-observer'
describe('ListGrid', () => {
  const mockItems = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`)
  const renderItem = (item: string) => <div>{item}</div>

  test('renders ListGrid component with initial items', () => {
    render(<ListGrid items={mockItems} renderItem={renderItem} />)
    expect(screen.getByTestId('list-grid')).toBeInTheDocument()
    mockItems.slice(0, 10).forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument()
    })
  })

  test('renders Load More button', () => {
    render(<ListGrid items={mockItems} renderItem={renderItem} />)
    expect(screen.getByText('Load More')).toBeInTheDocument()
  })

  test('disables Load More button when all items are loaded', () => {
    render(<ListGrid items={mockItems.slice(0, 10)} renderItem={renderItem} />)
    expect(screen.getByText('Load More')).toBeDisabled()
  })

  test('renders all items when isFiltered is true', () => {
    render(<ListGrid items={mockItems} renderItem={renderItem} isFiltered />)
    mockItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument()
    })
  })

  test('applies correct grid layout settings', () => {
    render(
      <ListGrid
        items={mockItems}
        renderItem={renderItem}
        gridLayoutSettings={{ columns: 3, rows: 5 }}
      />
    )
    const listGrid = screen.getByTestId('list-grid')
    expect(listGrid).toHaveClass('row-5')
    expect(listGrid).toHaveClass('column-3')
  })
})
