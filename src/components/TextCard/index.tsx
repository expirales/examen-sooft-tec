import './TextCard.scss'
type TextCardProps = {
  id: number
  text: string
  onHandleRemoveText?: (id: number) => void
}
/**
 * TextCard component renders a card with text and a delete button.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {number} props.id - The unique identifier for the text card.
 * @param {string} props.text - The text content to be displayed in the card.
 * @param {function} [props.onHandleRemoveText] - Optional callback function to handle the removal of the text card.
 * @returns {JSX.Element} The rendered TextCard component.
 */
export default function TextCard({ id, text, onHandleRemoveText }: TextCardProps) {
  return (
    <article key={id} className="cnt-text-card" data-testid="text-card">
      <div className="cnt-title">
        <h6 className="id"># {id}</h6>
        <button
          title="Delete"
          className="btn-delete"
          onClick={() => onHandleRemoveText && onHandleRemoveText(id)}
          aria-label="Delete"
          role="button"
        >
          Delete
        </button>
      </div>
      <p>{text}</p>
    </article>
  )
}
