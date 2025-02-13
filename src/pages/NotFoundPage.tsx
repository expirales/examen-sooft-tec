import './NotFoundPage.scss'
import ReactIcon from '../assets/react.svg'
export default function NotFoundPage() {
  return (
    <div className="cnt-not-found-page">
      <img src={ReactIcon} alt="Icon" width={256} height={256} />
      <span>Not found!</span>
    </div>
  )
}
