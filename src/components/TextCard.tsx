import './TextCard.scss'

type TextCardProps = {
  id: number
  text: string
  onHandleRemoveText?: (id: number) => void
}
export default function TextCard({ id, text, onHandleRemoveText }: TextCardProps) {
  return (
    <article key={id} className="cnt-text-card" data-testid="text-card">
      <p>{text}</p>
      <button
        className="btn-delete"
        onClick={() => onHandleRemoveText && onHandleRemoveText(id)}
        aria-label="Delete"
      >
        Delete
      </button>
    </article>
  )
}
