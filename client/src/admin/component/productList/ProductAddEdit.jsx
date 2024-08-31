import { useEffect, useState } from 'react';
import './ProductAddEdit.css'
import axios from '../../../helper/axios'
import { useNavigate, useParams } from 'react-router-dom';

export default function ProductAddEdit() {
    let [showError, setShowError] = useState(false);
    let [error,setError] = useState(null);
    let [loading,setLoading] = useState(false);
    let [category,setCategory] = useState([])
    let [name,setName] = useState('')
    let [oldPrice,setOldPrice] = useState('')
    let [newPrice,setNewPrice] = useState('')
    let [shortDesc,setShortDesc] = useState('')
    let [longDesc,setLongDesc] = useState('')
    let [addCategory,setAddCategory] = useState('')
    let [file,setFile] = useState('')
    let navigate = useNavigate();
    let {id} = useParams()
    let [preview,setPreview] = useState('')

    useEffect(()=>{
        let fetchCate = async()=>{
            let res = await axios.get('/category')
            setCategory(res.data);
        }
        fetchCate()
    },[])

    useEffect(()=>{
        let fetchProduct = async()=>{
            if(id){
                let res = await axios.get('/product/detail/'+id)
                setName(res.data.name || '')
                setOldPrice(res.data.old_price || '')
                setNewPrice(res.data.new_price || '')
                setShortDesc(res.data.short_desc || '')
                setLongDesc(res.data.long_desc || '')
                setAddCategory(res.data.category._id || '')
                setPreview(import.meta.env.VITE_BACKEND_URL_ACCESS + res.data.image || '')               
            }
        }   
        fetchProduct()
    },[id])

    let upload = (e) =>{
        let file = e.target.files[0]
        setFile(file);

        //file upload yin form htae mhr preview pya ag
        let fileReader = new FileReader;
        fileReader.onload = (e) =>{
            setPreview(e.target.result);
        }

        //readAsDataURL khaw htr mha a paw ka fileReader run
        fileReader.readAsDataURL(file);
    }

    let AddProductHandler = async (e) => {
        e.preventDefault();
    
        try {
            if (!name || !newPrice || !shortDesc || !longDesc || !addCategory || (!file && !preview)) {
                setShowError(true);
                setError('Please fill in required fields');
                return;
            }
            setLoading(true);
    
            let data = { name, old_price: oldPrice, new_price: newPrice, short_desc: shortDesc, long_desc: longDesc, category: addCategory };
            let res;
    
            if (id) {
                res = await axios.patch('/product/update/' + id, data);
            } else {
                res = await axios.post('/product/create', data);
            }
    
            if (res.status === 200 && file) {
                let formData = new FormData();
                formData.set('image', file);
    
                const productId = res.data._id || id; // Use existing ID or newly created ID
                let uploadRes = await axios.post('/product/upload/' + productId, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
    
                console.log(uploadRes);
            }
    
            if (res.status === 200) {
                console.log(res.data);
                setLoading(false);
                navigate('/admin');
            }
    
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };
    


  return (
    <div className='shadow-box'>
      <h1 className=' mt-5 text-center fw-bold'>{id ? 'Edit' : 'Add New'} Products</h1>
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
        <form onSubmit={AddProductHandler}>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Product Name'/>
            <input type="text" value={oldPrice} onChange={(e)=>setOldPrice(e.target.value)} placeholder='Enter Product Old Price if discount'/>
            <input type="text" value={newPrice} onChange={(e)=>setNewPrice(e.target.value)} placeholder='Enter Product New Price'/>
            <input type="text" value={shortDesc} onChange={(e)=>setShortDesc(e.target.value)} placeholder='Enter Short Desc'/> 
            <textarea value={longDesc} onChange={(e)=>setLongDesc(e.target.value)} placeholder='Enter Long Desc'> </textarea>
            <select value={addCategory} onChange={(e)=>setAddCategory(e.target.value)} className=' form-control w-75'>
                <option value="">choose category</option>
            {
                category.map((cate)=>{
                    return <option key={cate._id} value={cate._id}>{cate.name}</option>
                })
            }
            </select>
            <input type="file" onChange={upload} className='file'/>
            {preview && <img src={preview} className='w-50' alt="" />}
            <button type='submit'>
            {
                loading && <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
                </div>
                }
                {id ? 'Edit Product' : 'Add Product'}
            </button>
        </form>
      </div>
    </div>
  )
}
