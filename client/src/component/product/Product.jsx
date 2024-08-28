import './Product.css'
import {  NavLink } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import axios from '../../helper/axios'
import { AuthContext } from '../../context/AuthContext'
import Alert from '../alert/Alert'
import ErrorAlert from '../alert/ErrorAlert'


export default function Product({ categoryId }) {
  const [showAlert, setShowAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  let [product,setProduct] = useState([])
  const {updateCartCount} = useContext(AuthContext)

  useEffect(() => {
    let fetchProduct = async () => {
      let url = '/product';
      if (categoryId) {
        url += `?category=${categoryId}`; // Add category filter to the API request
      }
      let res = await axios.get(url);
      setProduct(res.data);
    }
    fetchProduct();
  }, [categoryId]); // Re-run effect when categoryId changes

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

  const scrollClick = () =>{
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

  const handleCloseAlert = () => {
    setShowAlert(false); // Close the alert
};
  

  return (
    <div className='product-container'>
      {
       !!product.length && (
        product.map((item)=>{
          return(
            <div className='product' key={item._id}>
              <div className='product-img'><img src={import.meta.env.VITE_BACKEND_URL_ACCESS+item.image} alt="" /></div>
              <div className='product-info'>
                  <p>{item.name}</p>
                  <p><span className="text-decoration-line-through mx-2">{item.old_price}</span><span>{item.new_price}$</span></p>
              </div>
              <div className='butt'>
                  <button onClick={() => handleAddToCart(item._id)}><i className='fa fa-shopping-cart'></i></button>
                  {/* <button><i className='fa fa-heart'></i></button> */}
                  <NavLink onClick={scrollClick} to={`/detail/${item._id}`}><i className='fa fa-eye'></i></NavLink>
              </div>
          </div>
          )
        })
       )
      }
      {showAlert && (
                <Alert message="Product added to cart!" onClose={handleCloseAlert} />
            )}

      {showErrorAlert && (
        <ErrorAlert message = "Please login first"/>
      )}
    </div>
  )
}
