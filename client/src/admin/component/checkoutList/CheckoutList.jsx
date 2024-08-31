import { useEffect, useState } from 'react'
import './CheckoutList.css'
import { Link } from 'react-router-dom'
import axios from '../../../helper/axios'

export default function CheckoutList() {
  let [checkout,setCheckout] = useState([])

  useEffect(()=>{
    let fetchData = async()=>{
      let res = await axios.get('/checkout')
      setCheckout(res.data)
    }
    fetchData()
  })

  // show date in readable format
  function formatDate(createdAt) {
    const date = new Date(createdAt);
    const now = new Date();
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
      <h3 className=' fw-bold mb-5'>Checkout List</h3>
      <div className="table-responsive overflow-y-scroll mt-5" style={{maxHeight:'300px'}}>
        <table className="table">
          <thead>
            <tr className='font'>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Date</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
                {
                  checkout.length > 0 ? (
                    checkout.map((item,index)=>(
                      <tr key={item._id} className='font'>
                          <th scope="row">{index+1}</th>
                          <td>{item.fullname}</td>
                          <td>{item.email}</td>
                          <td>{formatDate(item.createdAt)}</td>
                          <td className='ad-btn'>
                            <Link to={`/checkout-detail/${item._id}`}><i className='fa-solid fa-eye  '></i></Link>
                          </td>
                          <td className='ad-btn'>
                            <button><i className='fa-solid fa-trash text-white'></i></button>
                          </td>
                        </tr>
                    ))
                  ) : (
                    <p>No checkout data</p>
                  )
                }      
          </tbody>
        </table>
      </div>
    </div>
  )
}
