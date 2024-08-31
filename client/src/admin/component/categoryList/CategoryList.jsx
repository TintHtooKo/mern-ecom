import { useEffect, useState } from 'react'
import './CategoryList.css'
import { Link } from 'react-router-dom'
import axios from '../../../helper/axios'

export default function CategoryList() {
  let [category,setCategory] = useState([])

  useEffect(()=>{
    let fetchCategory = async()=>{
      let res = await axios.get('/category')
      setCategory(res.data);
    }
    fetchCategory()
  },[])

  let deleteHandler = async(id)=>{
    await axios.delete('/category/delete/'+id)
    console.log('delete success');
    
    let res = await axios.get('/category')
    setCategory(res.data);
  }
  return (
    <div>
      <h3 className=' fw-bold mb-5'>Category List</h3>
      <Link className='plus' to={'/addcategory'}><i className='fa-solid fa-plus'></i></Link> Add Category
      <div className="table-responsive overflow-y-scroll mt-5" style={{maxHeight:'300px'}}>
        <table className="table">
          <thead>
            <tr className='font'>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
              {
                category.map((c,index)=>(
                  <tr key={c._id} className='font'>
                        <th scope="row">{index+1}</th>
                        <td>{c.name}</td>
                        <td className='ad-btn'>
                          <Link to={`/addcategory/${c._id}`}><i className='fa-solid fa-pen'></i></Link>
                        </td>
                        <td className='ad-btn'>
                          <button onClick={()=>deleteHandler(c._id)}><i className='fa-solid fa-trash text-white'></i></button>
                        </td>
                      </tr>  
                ))
              }       
          </tbody>
        </table>
      </div>
    </div>
  )
}
