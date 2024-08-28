import { Link } from 'react-router-dom'
import './Alert.css'

export default function ErrorAlert({ message }) {
  const scrollClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <div className="alert-overlay">
            <div className="alert-box">
                <p>{message}</p>
                <Link onClick={scrollClick} to={'/login'}>Login</Link>
            </div>
        </div>
  )
}
