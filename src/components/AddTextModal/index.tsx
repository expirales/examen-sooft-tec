import './AddTextModal.scss'
import { randomId } from '../../utils/randomId'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { cssClassNames } from '../../utils/cssClassNames'

type AddTextModalProps<T extends { text: string; id: number }> = {
  onHandleClose: () => void
  onHandleSubmit: (item: T) => void
  isOpen: boolean
}

/**
 * A modal component for adding new text items.
 *
 * @template T - The type of the item to be added, which extends an object with `text` and `id` properties.
 *
 * @param {Object} props - The properties object.
 * @param {() => void} props.onHandleClose - Function to handle closing the modal.
 * @param {(item: T) => void} props.onHandleSubmit - Function to handle submitting the new item.
 * @param {Boolean} props.isOpen - is open or not.
 *
 * @returns {JSX.Element} The rendered AddTextModal component.
 */
const TEXT_MIN_LENGTH = 3
const TEXT_MAX_LENGTH = 120
export default function AddTextModal<T extends { text: string; id: number }>({
  onHandleClose,
  onHandleSubmit,
  isOpen,
}: AddTextModalProps<T>) {
  const [text, setText] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const availableTextChars = useRef(TEXT_MAX_LENGTH)
  const isEmptyText = text.trim() === ''
  const isTextMinLengthOk = text.length >= TEXT_MIN_LENGTH
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = truncateText(e.target.value, TEXT_MAX_LENGTH)
    setText(newText)
    availableTextChars.current = TEXT_MAX_LENGTH - newText.length
  }

  const handleSave = () => {
    if (isEmptyText) return
    onHandleSubmit({ text, id: randomId() } as unknown as T)
    setText('')
    onHandleClose()
  }

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])
  return (
    <div className="cnt-text-modal" data-testid="text-modal">
      <div className="content">
        <h2>Add new phrase</h2>
        <textarea
          value={text}
          onChange={handleInputChange}
          placeholder="Write something here..."
          ref={inputRef}
        />
        <span className="characters-available">
          (<b>{availableTextChars.current})</b> characters available.
        </span>
        <ul className="text-requirements">
          <li
            className={cssClassNames('requirement', {
              required: !isEmptyText,
            })}
          >
            <sup>*</sup>The text is required{' '}
            {!isEmptyText ? <b className="check">✓</b> : <b className="error">×</b>}
          </li>
          <li
            className={cssClassNames('requirement', {
              ['min-length-ok']: isTextMinLengthOk && !isEmptyText,
            })}
          >
            <sup>*</sup>The text must contain at least 3 characters.{' '}
            {isTextMinLengthOk && !isEmptyText ? (
              <b className="check">✓</b>
            ) : (
              <b className="error">×</b>
            )}
          </li>
        </ul>
        <div className="cnt-buttons">
          <button
            className="btn-close"
            onClick={onHandleClose}
            role="button"
            aria-label="Close"
            title="Close"
          >
            Close
          </button>
          <button
            title="Save"
            className="btn-save"
            onClick={handleSave}
            disabled={isEmptyText || text.length <= 2}
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

function truncateText(text: string, maxChars: number): string {
  return text.length > maxChars ? text.substring(0, maxChars) : text
}
