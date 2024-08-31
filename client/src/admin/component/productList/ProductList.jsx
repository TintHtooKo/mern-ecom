import './ProductList.css'
import { Link } from 'react-router-dom' 
import { useEffect, useState } from 'react'
import axios from '../../../helper/axios'

export default function ProductList() {
  let [product,setProduct] = useState([])


  useEffect(()=>{
    let fetchData = async()=>{
      let res = await axios.get('/product')
        setProduct(res.data);
        
    }
    fetchData()
  },[])

  let DeleteProduct = async(id)=>{
    try {
        await axios.delete('/product/delete/'+id)
        console.log('delete success');
        let res = await axios.get('/product')
        setProduct(res.data);
        
    } catch (error) {
        console.log(error.message);
        
    }
}
  return (
    <div>
      <h3 className=' fw-bold mb-5'>Product Lists</h3>
      <Link className='plus' to={'/addproduct'}><i className='fa-solid fa-plus'></i></Link> Add New Product
      <div className="table-responsive mt-5 overflow-y-scroll" style={{maxHeight:'300px'}}>
        <table className="table">
          <thead>
            <tr className='font'>
              <th scope="col">#</th>
              <th scope="col"></th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
                {
                  product.map((item,index)=>{
                    return(
                      <tr key={item._id} className='font'>
                        <th scope="row">{index+1}</th>
                        <td><img src={import.meta.env.VITE_BACKEND_URL_ACCESS + item.image} alt="Product"/></td>
                        <td>{item.name}</td>
                        <td>$<span className=' text-decoration-line-through'>{item.old_price}</span>{' '}{item.new_price}</td>
                        <td className='ad-btn'>
                          <Link to={'/addproduct/'+item._id}><i className='fa-solid fa-pen'></i></Link>
                        </td>
                        <td className='ad-btn'>
                          <button onClick={()=>DeleteProduct(item._id)}><i className='fa-solid fa-trash text-white'></i></button>
                        </td>
                      </tr> 
                    )
                  })
                }             
          </tbody>
        </table>
      </div>
    </div>
  )
}
