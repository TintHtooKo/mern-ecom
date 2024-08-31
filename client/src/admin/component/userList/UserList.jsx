import { useEffect, useState } from 'react'
import './UserList.css'
import { Link } from 'react-router-dom'
import axios from '../../../helper/axios'

export default function UserList() {
  const [users, setUsers] = useState([])

  useEffect(()=>{
    let fetchUsers = async()=>{
      let res = await axios.get('/user')
      setUsers(res.data);
    }
    fetchUsers()
  },[])

  let deleteHandler = async(id)=>{
    await axios.delete('/user/delete/'+id)
    console.log('delete success');
    
    let res = await axios.get('/user')
    setUsers(res.data)
  }

  return (
    <div>
      <h3 className=' fw-bold mb-5'>User List</h3>
      <Link className='plus' to={'/adduser'}><i className='fa-solid fa-plus'></i></Link> Add User
      <div className="table-responsive mt-5">
        <table className="table">
          <thead>
            <tr className='font'>
              <th scope="col">#</th>
              <th scope="col">Fullname</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Role</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user,index)=>(
                <tr key={user._id} className='font'>
                  <th scope="row">{index+1}</th>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>
                  <td>{user.role.name}</td>
                  <td className=' d-flex gap-3 ad-btn'>
                    <Link to={'/adduser/'+user._id}><i className='fa-solid fa-pen'></i></Link>
                    <button onClick={()=>deleteHandler(user._id)}><i className='fa-solid fa-trash text-white'></i></button>
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
