import { useEffect, useState } from 'react'
import './css/Profile.css'
import axios from '../helper/axios'

export default function Profile() {
  const [active,setActive] = useState('detail')
  const [userData,setUserData] = useState({})
  const [checkout,setCheckout] = useState([])

  useEffect(()=>{
    let fetchUser = async()=>{
      let res = await axios.get('/user/me')   
      setUserData(res.data)
    }
    fetchUser()
  },[])

  useEffect(()=>{
    let fetchCheckout = async()=>{
      let res = await axios.get('/checkout/history')
      setCheckout(res.data)    
    }
    fetchCheckout()
  },[])

  
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
                      <button>
                        <i className='fa-solid fa-pen'></i>
                      </button>
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
                          <p style={{ color: '#a0a0a0' }}>Checkout Date - {new Date(item.createdAt).toLocaleDateString()}</p>
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
