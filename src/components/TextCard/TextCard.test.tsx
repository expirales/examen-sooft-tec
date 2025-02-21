import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import TextCard from '.'

describe('TextCard', () => {
  const mockId = 12345
  const mockText = 'Sample text'
  const onHandleRemoveText = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders TextCard component with text', () => {
    render(<TextCard id={mockId} text={mockText} onHandleRemoveText={onHandleRemoveText} />)
    expect(screen.getByText(mockText)).toBeInTheDocument()
  })

  test('renders Delete button', () => {
    render(<TextCard id={mockId} text={mockText} onHandleRemoveText={onHandleRemoveText} />)
    expect(screen.getByText('Delete')).toBeInTheDocument()
  })

  test('calls onHandleRemoveText with correct id when Delete button is clicked', () => {
    render(<TextCard id={mockId} text={mockText} onHandleRemoveText={onHandleRemoveText} />)
    fireEvent.click(screen.getByText('Delete'))
    expect(onHandleRemoveText).toHaveBeenCalledTimes(1)
    expect(onHandleRemoveText).toHaveBeenCalledWith(mockId)
  })

  test('does not throw error if onHandleRemoveText is not provided', () => {
    render(<TextCard id={mockId} text={mockText} />)
    fireEvent.click(screen.getByText('Delete'))
    expect(screen.getByText('Delete')).toBeInTheDocument()
  })
})
