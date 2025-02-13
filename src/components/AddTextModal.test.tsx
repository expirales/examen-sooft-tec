import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import AddTextModal from './AddTextModal'
import { randomId } from '../utils/randomId'

jest.mock('../utils/randomId')

describe('AddTextModal', () => {
  const onHandleClose = jest.fn()
  const onHandleSubmit = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders AddTextModal component', () => {
    render(
      <AddTextModal onHandleClose={onHandleClose} onHandleSubmit={onHandleSubmit} isOpen={true} />
    )
    expect(screen.getByText('Add new phrase')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Write something here...')).toBeInTheDocument()
    expect(screen.getByText('Close')).toBeInTheDocument()
    expect(screen.getByText('Save')).toBeInTheDocument()
  })

  test('calls onHandleClose when Close button is clicked', () => {
    render(
      <AddTextModal onHandleClose={onHandleClose} onHandleSubmit={onHandleSubmit} isOpen={true} />
    )
    fireEvent.click(screen.getByText('Close'))
    expect(onHandleClose).toHaveBeenCalledTimes(1)
  })

  test('disables Save button when textarea is empty', () => {
    render(
      <AddTextModal onHandleClose={onHandleClose} onHandleSubmit={onHandleSubmit} isOpen={true} />
    )
    expect(screen.getByText('Save')).toBeDisabled()
  })

  test('enables Save button when textarea is not empty', () => {
    render(
      <AddTextModal onHandleClose={onHandleClose} onHandleSubmit={onHandleSubmit} isOpen={true} />
    )
    fireEvent.change(screen.getByPlaceholderText('Write something here...'), {
      target: { value: 'Test text' },
    })
    expect(screen.getByText('Save')).toBeEnabled()
  })

  test('calls onHandleSubmit with correct data when Save button is clicked', () => {
    const mockId = '12345'
    ;(randomId as jest.Mock).mockReturnValue(mockId)
    render(
      <AddTextModal onHandleClose={onHandleClose} onHandleSubmit={onHandleSubmit} isOpen={true} />
    )
    fireEvent.change(screen.getByPlaceholderText('Write something here...'), {
      target: { value: 'Test text' },
    })
    fireEvent.click(screen.getByText('Save'))
    expect(onHandleSubmit).toHaveBeenCalledWith({ text: 'Test text', id: mockId })
    expect(onHandleClose).toHaveBeenCalledTimes(1)
  })
  test('clears textarea after Save button is clicked', () => {
    render(
      <AddTextModal onHandleClose={onHandleClose} onHandleSubmit={onHandleSubmit} isOpen={true} />
    )
    fireEvent.change(screen.getByPlaceholderText('Write something here...'), {
      target: { value: 'Test text' },
    })
    fireEvent.click(screen.getByText('Save'))
    expect(screen.getByPlaceholderText('Write something here...')).toHaveValue('')
  })

  test('does not call onHandleSubmit if textarea is empty', () => {
    render(
      <AddTextModal onHandleClose={onHandleClose} onHandleSubmit={onHandleSubmit} isOpen={true} />
    )
    fireEvent.click(screen.getByText('Save'))
    expect(onHandleSubmit).not.toHaveBeenCalled()
  })

  test('does not call onHandleClose if textarea is empty and Save button is clicked', () => {
    render(
      <AddTextModal onHandleClose={onHandleClose} onHandleSubmit={onHandleSubmit} isOpen={true} />
    )
    fireEvent.click(screen.getByText('Save'))
    expect(onHandleClose).not.toHaveBeenCalled()
  })
})
