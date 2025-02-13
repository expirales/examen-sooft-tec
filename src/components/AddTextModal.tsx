import './AddTextModal.scss'
import { randomId } from '../utils/randomId'
import { ChangeEvent, useState } from 'react'

type AddTextModalProps<T extends { text: string; id: number }> = {
  onHandleClose: () => void
  onHandleSubmit: (item: T) => void
}

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
          <button className="btn-close" onClick={onHandleClose}>
            Close
          </button>
          <button className="btn-save" onClick={handleSave} disabled={isEmptyText}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
