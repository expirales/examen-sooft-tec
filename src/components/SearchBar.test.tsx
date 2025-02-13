import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import SearchBar from './SearchBar'
import { useItems } from '../contexts/itemsContext'
import { useFuseSearch } from '../hooks/useFuseSearch'

jest.mock('../contexts/itemsContext')
jest.mock('../hooks/useFuseSearch')

describe('SearchBar', () => {
  const mockFilterItem = jest.fn()
  const mockFilterAllItems = jest.fn()
  const mockCleanFilterItems = jest.fn()
  const mockItems = [
    { id: 1, text: 'Sample text 1' },
    { id: 2, text: 'Sample text 2' },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useItems as jest.Mock).mockReturnValue({
      filterItem: mockFilterItem,
      filterAllItems: mockFilterAllItems,
      items: mockItems,
      cleanFilterItems: mockCleanFilterItems,
      isFiltered: false,
    })
    ;(useFuseSearch as jest.Mock).mockReturnValue(mockItems)
  })

  test('renders SearchBar component', () => {
    render(<SearchBar />)
    expect(screen.getByPlaceholderText('Search for a phrase...')).toBeInTheDocument()
  })

  test('updates query state on input change', () => {
    render(<SearchBar />)
    const input = screen.getByPlaceholderText('Search for a phrase...')
    fireEvent.change(input, { target: { value: 'Sample' } })
    expect(input).toHaveValue('Sample')
  })

  test('shows suggestions when query length is >= 3', () => {
    render(<SearchBar />)
    const input = screen.getByPlaceholderText('Search for a phrase...')
    fireEvent.change(input, { target: { value: 'Sam' } })
    expect(screen.getByText('Sample text 1')).toBeInTheDocument()
    expect(screen.getByText('Sample text 2')).toBeInTheDocument()
  })

  test('calls filterItem with correct id when suggestion is clicked', () => {
    render(<SearchBar />)
    const input = screen.getByPlaceholderText('Search for a phrase...')
    fireEvent.change(input, { target: { value: 'Sam' } })
    fireEvent.click(screen.getByText('Sample text 1'))
    expect(mockFilterItem).toHaveBeenCalledWith(1)
  })

  test('calls filterAllItems with correct ids when "See results" button is clicked', () => {
    render(<SearchBar />)
    const input = screen.getByPlaceholderText('Search for a phrase...')
    fireEvent.change(input, { target: { value: 'Sam' } })
    fireEvent.click(screen.getByText('See 2 results'))
    expect(mockFilterAllItems).toHaveBeenCalledWith([1, 2])
  })

  test('calls cleanFilterItems when clean button is clicked', () => {
    ;(useItems as jest.Mock).mockReturnValue({
      filterItem: mockFilterItem,
      filterAllItems: mockFilterAllItems,
      items: mockItems,
      cleanFilterItems: mockCleanFilterItems,
      isFiltered: true,
    })
    render(<SearchBar />)
    const input = screen.getByPlaceholderText('Search for a phrase...')
    fireEvent.change(input, { target: { value: 'Sam' } })
    fireEvent.click(screen.getByText('✕'))
    expect(mockCleanFilterItems).toHaveBeenCalled()
  })
})
