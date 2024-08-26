import { Link, useNavigate } from 'react-router-dom'
import './css/LogReg.css'
import axios from '../helper/axios'
import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Login() {
  let [email,setEmail] = useState('')
  let [password,setPassword] = useState('')
  let [error, setError] = useState(null);
  let [showError, setShowError] = useState(false);
  let navigate = useNavigate()
  let [loading,setLoading] = useState(false)
  let {dispatch} = useContext(AuthContext)

  const LoginSubmit = async(e) =>{
    try {
      setLoading(true)
      e.preventDefault()
      let data = {email,password}
      let login = await axios.post('/user/login/',data,{withCredentials:true})
      if(login.status == 200){
        const cartRes = await axios.get('/cart/count');
        dispatch({
          type:'LOGIN',
          payload:{user : login.data.user, cartCount : cartRes.data.count}
        })
        navigate('/shop') 
      }
      setLoading(false)
    } catch (e) {
      const errorMessage = e.response?.data?.error || 'An unexpected error occurred';
      setError(errorMessage);
      setShowError(true);
      setLoading(false)
    }
  }



  return (
    <div className='shadow-box'>
      <h1 className=' mt-5 text-center fw-bold'>LOGIN</h1>
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
        <form onSubmit={LoginSubmit}>
          <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='example@domain.com'/>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='********' />
          <button type='submit'>
          {
              loading && <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            }
            Login
          </button>
          <span><Link>forget password?</Link></span>
          <span> Do you have an account? <Link to={'/register'}>Register</Link></span>
        </form>
      </div>
    </div>
  )
}
 