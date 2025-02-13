import './AddTextModal.scss'
import { randomId } from '../utils/randomId'
import { ChangeEvent, useState } from 'react'

type AddTextModalProps<T extends { text: string; id: number }> = {
  onHandleClose: () => void
  onHandleSubmit: (item: T) => void
}

/**
 * A modal component for adding new text items.
 *
 * @template T - The type of the item to be added, which extends an object with `text` and `id` properties.
 *
 * @param {Object} props - The properties object.
 * @param {() => void} props.onHandleClose - Function to handle closing the modal.
 * @param {(item: T) => void} props.onHandleSubmit - Function to handle submitting the new item.
 *
 * @returns {JSX.Element} The rendered AddTextModal component.
 */
export default function AddTextModal<T extends { text: string; id: number }>({
  onHandleClose,
  onHandleSubmit,
}: AddTextModalProps<T>) {
  const [text, setText] = useState('')
  const isEmptyText = text.trim() === ''
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const handleSave = () => {
    if (isEmptyText) return
    onHandleSubmit({ text, id: randomId() } as unknown as T)
    setText('')
    onHandleClose()
  }

  return (
    <div className="cnt-text-modal" data-testid="text-modal">
      <div className="content">
        <h2>Add new phrase</h2>
        <textarea value={text} onChange={handleInputChange} placeholder="Write something here..." />
        <div className="cnt-buttons">
          <button className="btn-close" onClick={onHandleClose} role="button" aria-label="Close">
            Close
          </button>
          <button
            className="btn-save"
            onClick={handleSave}
            disabled={isEmptyText}
            role="button"
            aria-label="Save"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
