import axios from "../../../helper/axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"


export default function CategoryAddEdit() {
    let {id} = useParams()
    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [name,setName] = useState('')
    const navigate = useNavigate();

    useEffect(()=>{
        let fetchCate = async()=>{
            if(id){
                let res = await axios.get('/category/detail/'+id)
                setName(res.data.name)
            }
        }
        fetchCate()
    },[id])


    let submitHandler = async(e) =>{
        e.preventDefault();
        setLoading(true);

        if(!name){
            setShowError(true);
            setError('Please fill category');
            setLoading(false);
            return;
        }
        let data = {name}

        let res;
        if(id){
            res = await axios.patch('/category/update/'+id,data)
        }else{
            res = await axios.post('/category/create',data)
        }

        
        if(res.status === 200){
            setLoading(false);
            setError(null);
            setShowError(false);
            navigate('/admin');
        }
    }

  return (
    <div className='shadow-box'>
      <h1 className=' mt-5 text-center fw-bold'>{id ? 'Edit' : 'Add New'} Category</h1>
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
        <form onSubmit={submitHandler}>
            <input type="text" placeholder="Enter New Category" value={name} onChange={(e)=>setName(e.target.value)}/>
            <button type='submit'>
            {
                loading && <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
                </div>
                }
                {id ? "Update " : "Add "}
            </button>
        </form>
      </div>
    </div>
  )
}
