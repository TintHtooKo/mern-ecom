import { useContext, useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './css/Profile.css'
import axios from '../helper/axios'
import { AuthContext } from '../context/AuthContext'

export default function Profile() {
  let {user} = useContext(AuthContext)
  const [active,setActive] = useState('detail')
  const [checkout,setCheckout] = useState([])
  let navigate = useNavigate()
  let userData = user?.user;
  
  useEffect(()=>{
    let fetchCheckout = async()=>{
      let res = await axios.get('/checkout/history')
      setCheckout(res.data)    
    }
    fetchCheckout()
  },[])

  let updateClick = async() =>{
    if (userData && userData._id) {
      navigate(`/update/profile/${userData._id}`);
      console.log("User ID:", userData._id);
    } else {
      console.log("User ID is not available.");
    }    
  }

  function formatDate(createdAt) {
    const date = new Date(createdAt);
    const now = new Date();
    
    // Calculate the difference in days
    const diffInTime = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));
    
    if (diffInDays === 0) {
        return 'Today';
    } else if (diffInDays === 1) {
        return 'Yesterday';
    } else if (diffInDays <= 4) {
        return `${diffInDays} days ago`;
    } else {
        return date.toLocaleDateString();
    }
}

  
  return (
    <div>
      <h1 className=" ms-4 mb-5 fw-bold mt-5">User Profile</h1>
      <div className=" mt-5 mx-3">
        <div className="person">
          <div className='p-btn'>
            <button onClick={() => setActive('detail')} className={active === 'detail' ? 'active-btn' : ''}>Personal Data</button>
            <button onClick={() => setActive('purchased')} className={active === 'purchased' ? 'active-btn' : ''}>Purchased Items</button>
          </div>
 
          <div className='p-data'>
            {
              active === 'detail' && (
                <div className='p-detail'>
                  <h2 className='fw-bold'>{userData.fullname}{"'"}s Data</h2>
                  <small>Don{"'"}t worry. Your data is safe with us. And only you can see it.</small>
                  <div className=' mt-4'>
                    <div className='p-edit'>
                      <div></div>
                      <div>
                      <Link onClick={updateClick}>
                        <i className='fa-solid fa-pen'></i>
                      </Link>
                      </div>
                    </div>
                    <div>
                      <h5>Full Name - {userData.fullname} </h5>
                      <h5>Email - {userData.email}</h5>
                      <h5>Phone - {userData.phone}</h5>
                      <h5>Address - {userData.address}</h5>
                    </div>
                  </div>
                </div>
              )
            }

            {
              active === 'purchased' && (
                <div>
                  <h2 className='fw-bold'>Checkout Products</h2>
                  <small>Don{"'"}t worry. Your data is safe with us. And only you can see it.</small>
                  {
                    checkout.length > 0 ? (
                      checkout.map((item) => (
                        <div key={item._id} className="profile-checkout mt-5 w-75">
                        {
                          item.cartItems.map((cart)=>(
                            <div key={cart._id} className='product-checkout mb-3'>
                            <img
                                src={import.meta.env.VITE_BACKEND_URL_ACCESS + cart.image}
                                style={{ width: '50px' }}
                                alt="Product"
                            />
                            <p>Qty: {cart.quantity}</p>
                            <p>Price: ${cart.price * cart.quantity}</p>
                            </div>
                          ))
                        }
  
                        <hr style={{ color: 'rgb(206, 206, 206)' }} />
  
                        <div className='action-checkout'>
                          <p style={{ color: '#a0a0a0' }}>Checkout Date - {formatDate(item.createdAt)}  </p>
                          <p style={{ color: '#a0a0a0' }}>({item.action.name})</p>
                          <p className='fw-bold fs-5'>Total: ${item.totalPrice}</p>
                        </div>
                        </div>
                      ))
                    ) : (
                      <p style={{ color: '#a0a0a0' }} className='my-5 '>There is no purchased products</p>
                    )
                  }
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
} 
