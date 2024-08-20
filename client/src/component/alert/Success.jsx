
import { Link } from 'react-router-dom';
import './Alert.css'; // Create a separate CSS file for styling

export default function Success({ message, onClose }) {
    const scrollClick = () =>{
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    return (
        <div className="alert-overlay">
            <div className="alert-box">
                <p>{message}</p>
                <Link to={'/shop'} onClick={scrollClick}>Continue Shopping</Link>
            </div>
        </div>
    );
}
 