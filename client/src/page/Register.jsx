import { Link, useNavigate } from 'react-router-dom'
import './css/LogReg.css'
import { useState } from 'react'
import axios from '../helper/axios'
import { useEffect } from 'react';

export default function Register() {
  let [fullname, setFullname] = useState('');
  let [email, setEmail] = useState('');
  let [address, setAddress] = useState('');
  let [phone, setPhone] = useState('');
  let [password, setPassword] = useState('');
  let [cpassword, setCpassword] = useState('');
  let [error, setError] = useState(null);
  let [showError, setShowError] = useState(false);
  let [loading,setLoading] = useState(false)
  let navigate = useNavigate();

  const RegisterSubmit = async (e) => {
    try {
      setLoading(true)
      e.preventDefault();
      let data = { fullname, email, address, phone, password };
      if (password !== cpassword) {
        setError('Password does not match');
        setShowError(true);
        return;
      }
      let register = await axios.post('/user/create/', data, { withCredentials: true });
      
      if (register.status === 200) {
        navigate('/login');
      }
      setLoading(false)
    } catch (e) {
      const errorMessage = e.response?.data?.error || 'An unexpected error occurred';
      setError(errorMessage);
      setShowError(true);
      setLoading(false)
    } finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
      }, 5000); // Auto close after 3 seconds

      return () => clearTimeout(timer); // Cleanup the timer on component unmount or when showError changes
    }
  }, [showError]);

  return (
    <div className="shadow-box">
      <h1 className=' mt-5 text-center fw-bold'>REGISTER</h1>
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
        <form onSubmit={RegisterSubmit}>
          <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} placeholder='Full Name' required />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email@example.com' required />
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Address' required />
          <input type="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Phone Number - (000) 00000' required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
          <input type="password" value={cpassword} onChange={(e) => setCpassword(e.target.value)} placeholder='Confirm Password' required />
          <button type='submit'>
            {
              loading && <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            }
          Register
        </button>
          <span> Are you already registered? <Link to={'/login'}>Login</Link></span>
        </form>
      </div>
    </div>
  );
}
