
import './Alert.css'; // Create a separate CSS file for styling

export default function Alert({ message, onClose }) {
    return (
        <div className="alert-overlay">
            <div className="alert-box">
                <p>{message}</p>
                <button onClick={onClose}>OK</button>
            </div>
        </div>
    );
}
 