
import { useContext, useEffect, useState } from 'react'
import './css/updateProfile.css'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function UpdateProfile() {
    const { user, dispatch } = useContext(AuthContext);
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Fetch user data on mount
    // d mhr useEffect use tr ka refresh lote yin data tway ma pyout ag
    useEffect(() => {
        if (user?.user) {
            setFullName(user.user.fullname || '');
            setEmail(user.user.email || '');
            setAddress(user.user.address || '');
            setPhone(user.user.phone || '');
        }
    }, [user]);

    const updateHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (fullname === '' || email === '' || address === '' || phone === '') {
            setShowError(true);
            setError("Please fill all details");
            setLoading(false);
        } else {
            try {
                const res = await axios.patch('/user/update/' + user.user._id, { fullname, email, address, phone }, { withCredentials: true });
                if (res.status === 200) {
                    console.log('Update success');
                    dispatch({ type: 'UPDATE_USER', payload: res.data.updateUser });
                    setLoading(false);
                    navigate('/profile');
                }
            } catch (error) {
                console.error('Error updating profile:', error);
                setError('Failed to update profile');
                setShowError(true);
                setLoading(false);
            }
        }
    };
  return (
    <div className='shadow-box'>
      <h1 className=' mt-5 text-center fw-bold'>Update Profile</h1>
      {!!showError && (
        <div className={`show-alert alert alert-danger alert-dismissible fade show transition-transform ${showError ? 'show' : ''}`} role="alert">
          <div>
            <strong>Oops! </strong> 
            {error}
          </div>
          <span aria-hidden="true" className=' close' onClick={() => setShowError(false)}>
            <i className='fa fa-times'></i>
          </span>
        </div>
      )}
      <div className="login">
        <form onSubmit={updateHandler}>
            <input type="email" disabled value={email}  onChange={(e) => setEmail(e.target.value)} />
          <input type="text" value={fullname} onChange={(e) => setFullName(e.target.value)} />
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}/>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}/>
          <button type='submit'>
          {
              loading && <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            }
            Update
          </button>
        </form>
      </div>
    </div>
  )
}
