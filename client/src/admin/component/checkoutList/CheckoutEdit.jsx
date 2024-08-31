import { useNavigate, useParams } from "react-router-dom"
import axios from "../../../helper/axios"
import { useEffect, useState } from "react"


export default function CheckoutEdit() {
    let [loading,setLoading] = useState(false)
    let [newAction,setNewAction] = useState('')
    let [action,setAction] = useState([])
    let {id} = useParams()
    let navigate = useNavigate()
    useEffect(()=>{
        let fetchAction = async() =>{
            let res = await axios.get('/action')
            setAction(res.data);          
        }
        fetchAction()
    },[])

    useEffect(()=>{
        let fetchData = async()=>{
            if(id){
                let res = await axios.get('/checkout/detail/'+id)
                setNewAction(res.data.action._id)
            }
        }
        fetchData()
    },[id])

    let submitHandler = async(e)=>{
        try {
            e.preventDefault()
            setLoading(true)
            let data = {action:newAction}
            let res = await axios.patch('/checkout/update/'+id,data)
            if(res.status == 200){
            setLoading(false)
            navigate('/admin')
            }
            
        } catch (error) {
            console.log(error.message);
            setLoading(false)
        }
    }
  return (
    <div className='shadow-box'>
      <h1 className=' mt-5 text-center fw-bold'>Action Edit</h1>
      <div className="login">
        <form onSubmit={submitHandler}>
            <select value={newAction} onChange={(e)=>{setNewAction(e.target.value)}}>
                <option value="">Select Action</option>
                {
                    action.map((item)=>{
                        return <option value={item._id} key={item._id}>{item.name}</option>
                    })
                }
            </select>
            <button type='submit'>
            {
                loading && <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
                </div>
                }
                Change
            </button>
        </form>
      </div>
    </div>
  )
}
