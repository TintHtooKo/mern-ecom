import { useEffect, useState } from 'react';
import './UserAddEdit.css'
import axios from '../../../helper/axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function UserAddEdit() {
    let [showError, setShowError] = useState(false);
    let [error, setError] = useState(null);
    let [loading,setLoading] = useState(false)
    let [fullname, setFullname] = useState('');
    let [email, setEmail] = useState('');
    let [phone, setPhone] = useState('');
    let [password, setPassword] = useState('');
    let [address, setAddress] = useState('');
    let [addRole,setAddRole] = useState('')
    let [role, setRole] = useState([]);
    let navigate = useNavigate();
    let {id} = useParams()

    useEffect(()=>{
        let fetchRole = async()=>{
            let res = await axios.get('/role')
            setRole(res.data);
            
        }
        fetchRole()
    },[])

    useEffect(()=>{
        let fetchUser = async()=>{
            if(id){
                let res = await axios.get('/user/detail/'+id)
                console.log(res);              
                setFullname(res.data.fullname)
                setEmail(res.data.email)
                setPhone(res.data.phone)
                setAddress(res.data.address)
                setAddRole(res.data.role._id)
            }
        }
        fetchUser()
    },[id]) 

    let AddUserHandler = async(e)=>{
        e.preventDefault()
        try {   
            if (!fullname || !email || !address || !phone) {
                setShowError(true);
                setError('Please fill in all the required fields.');
                return;
            }

            let dataAdd = {fullname,email,phone,password,address,role:addRole}
            let dataEdit = {fullname,email,phone,address,role:addRole}
            setLoading(true)

            let res;
            if(id){
                res = await axios.patch('/user/update/'+id,dataEdit)
            }else{
                res = await axios.post('/user/create',dataAdd)
            }
            if(res.status == 200){
                setShowError(false)
                setError(null)
                setLoading(false)
                navigate('/admin')
            }
    
        } catch (err) {
            console.log(err.message );
            
        }
    }


  return (
    <div className='shadow-box'>
      <h1 className=' mt-5 text-center fw-bold'>{id ? 'Edit' : 'Add New'} User</h1>
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
        <form onSubmit={AddUserHandler}>
            <input type="text" placeholder='Full Name' value={fullname} onChange={(e)=>setFullname(e.target.value)} />
            <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="text" placeholder='Phone' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
           {!id &&  <input type="text" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>}
            <input type="text" placeholder='Address' value={address} onChange={(e)=>setAddress(e.target.value)}/>
            <select value={addRole} onChange={(e)=>setAddRole(e.target.value)} className=' form-control w-75'>
                <option value="">choose role</option>
                {
                    role.map((r)=>{
                        return <option key={r._id} value={r._id}>{r.name}</option>
                    })
                }
            </select>
            <button type='submit'>
            {
                loading && <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
                </div>
                }
                {id ? "Update" : "Add User"}
            </button>
        </form>
      </div>
    </div>
  )
}
