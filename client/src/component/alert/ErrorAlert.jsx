import { Link } from 'react-router-dom'
import './Alert.css'

export default function ErrorAlert({ message }) {
  return (
    <div className="alert-overlay">
            <div className="alert-box">
                <p>{message}</p>
                <Link to={'/login'}>Login</Link>
            </div>
        </div>
  )
}
