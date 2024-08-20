import './css/Detail.css'
import { useContext, useState } from 'react'
import { useEffect } from 'react'
import axios from '../helper/axios'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import Alert from '../component/alert/Alert'
import ErrorAlert from '../component/alert/ErrorAlert'

export default function Detail() {
    let [detail,setDetail] = useState('')
    const [showAlert, setShowAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const {updateCartCount} = useContext(AuthContext)
    let{id} = useParams()
    useEffect(()=>{
        let fetchDetail = async()=>{
            let res = await axios.get('/product/detail/'+id)          
            setDetail(res.data);
            
        }
        fetchDetail()
    },[id]) 

    const handleAddToCart = async (productId) => {
        try {
          // Assuming you have user authentication and JWT tokens in cookies
          const res = await axios.post('/cart/add-to-cart', { productId, quantity: 1 }); // Adjust the quantity as needed
          updateCartCount()
          // alert('Product added to cart!');
          setShowAlert(true); 
          // Optionally update cart state or refresh cart data
        } catch (error) {
          setShowErrorAlert(true);
        }
      }
    
      const handleCloseAlert = () => {
        setShowAlert(false); // Close the alert
    };
    return (
        <>
               <div className='detail'>
                        <div className='detail-img'>
                            <img src={import.meta.env.VITE_BACKEND_URL_ACCESS+detail.image} alt="" />
                        </div>
                        <div className="info">
                            {/* detail.category ? detail.category.name : 'Category' 
                            checks if detail.category is defined. If it is, it renders detail.
                            category.name. If not, it renders a fallback text (e.g., 'Category'). */}
                            <p className='bradcrumb'>Shop <i className="fa-solid fa-greater-than"></i> {detail.category ? detail.category.name : 'Category'}  <i className="fa-solid fa-greater-than"></i> {detail.name}</p>
                            <h3 className='fw-bold'>{detail.name}</h3>
                            <div><span className='text-decoration-line-through' style={{ color: 'rgb(128, 128, 128)' }}>{detail.old_price}</span>
                            <span className='fw-bold'>${detail.new_price}</span></div>
                            <p style={{ color: 'rgb(128, 128, 128)' }} className='short-desc'>{detail.short_desc}</p>
                            <div>
                                <button onClick={()=>handleAddToCart(detail._id)}><i className='fa fa-shopping-cart'></i></button>
                                {/* <button><i className='fa fa-heart'></i></button> */}
                            </div>
                            <hr />
                            <p style={{ color: 'rgb(128, 128, 128)', fontSize: '18px' }}>Categories : <span>{detail.category ? detail.category.name : 'Category'} </span></p>
                        </div>
                    </div>

                    <div className="detail-desc">
                        <h3 className='fw-bold'>Description</h3>
                        <p>{detail.long_desc}</p>
                    </div>

                    {showAlert && (
                        <Alert message="Product added to cart!" onClose={handleCloseAlert} />
                    )}

                    {showErrorAlert && (
                        <ErrorAlert message = "Please login first"/>
                    )}
        </>
    )
}
