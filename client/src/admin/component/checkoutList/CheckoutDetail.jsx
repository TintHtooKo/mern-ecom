import { useEffect, useState } from 'react'
import './CheckoutDetail.css'
import { useParams } from 'react-router-dom'
import axios from '../../../helper/axios'
import { Link } from 'react-router-dom'

export default function CheckoutDetail() {
    let [product,setProduct] = useState('')
    let {id} = useParams()
    useEffect(()=>{
       let fetchData = async()=>{
           if(id){
               let res = await axios.get('/checkout/detail/'+id)    
               setProduct(res.data)
           }
       }  
       fetchData()
    },[id])

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
      <h2 className='fw-bold mb-5 text-center'>Checkout Detail</h2>
      <div className='checkdetail'>
        <div className='c-detail'>
            <h2 className="fw-bold">User Details</h2>
            <p>Name : {product.fullname}</p>
            <p>Email : {product.email}</p>
            <p>Phone : {product.phone}</p>
            <p>Address : {product.address}</p>
            <hr style={{ color: 'rgb(206, 206, 206)' }} />
                            <div className='action-checkout'>
                                <p style={{ color: '#a0a0a0' }}>Checkout Date - {formatDate(product.createdAt)}</p>
                                <div className=' d-flex gap-4'>
                                    <p style={{ color: '#a0a0a0' }}>({product.action?.name})</p>
                                    <Link to={'/checkout-action/' + product._id}><i className='fa-solid fa-pen-to-square'></i></Link>
                                </div> 
                                <p className='fw-bold fs-5'>Total: ${product.totalPrice}</p>
                            </div>
        </div>

        <div className='c-product'>
            <h2 className=" fw-bold">Purchased Products</h2>
        <div>
            {
                product.cartItems && product.cartItems.length > 0 ? (
                    product.cartItems.map((cart) => (
                        <div key={cart._id} className="profile-checkout w-75">
                            <div className='product-checkout mb-3'>
                                <img
                                    src={import.meta.env.VITE_BACKEND_URL_ACCESS + cart.image}
                                    style={{ width: '50px' }}
                                    alt="Product"
                                />
                                <p>Qty: {cart.quantity}</p>
                                <p>Price: ${cart.price * cart.quantity}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{ color: '#a0a0a0' }} className='my-5 '>There are no purchased products</p>
                )
            }
        </div>
    </div>

      </div>
    </div>
  )
}
