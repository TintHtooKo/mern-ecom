import './css/Cart.css';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../helper/axios';
import { AuthContext } from '../context/AuthContext';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const {updateCartCount} = useContext(AuthContext)

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await axios.get('/cart/view-cart'); // Update the API call if needed
        if (res.data.product) {
          setCartItems(res.data.product);
          calculateTotal(res.data.product);
        } else {
          setCartItems([]); // Set to empty array if no items found
        }
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
        setCartItems([]); // Set to empty array in case of error
      }
    };

    fetchCartItems();
  }, []);

  const updateQuantityInDB = async (productId, quantity) => {
    try {
      await axios.post('/cart/update-cart-quantity', { productId, quantity });
      updateCartCount()
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };
    


  const increment = (productId) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.item._id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      calculateTotal(updatedItems);
      return updatedItems;
    });
    updateQuantityInDB(productId, cartItems.find(item => item.item._id === productId).quantity + 1);
  };
  
  const decrement = (productId) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.item._id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      calculateTotal(updatedItems);
      return updatedItems;
    });
    updateQuantityInDB(productId, cartItems.find(item => item.item._id === productId).quantity - 1);
  };
  

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.quantity * item.item.new_price, 0);
    setTotalPrice(total);
  };

  const handleRemove = async (productId) => {
    try {
      // Send a request to the backend to remove the item
      const response = await axios.post('/cart/remove-cart', { productId });
      
      if (response.status === 200) {
        // Update the cart items state after successful removal
        const updatedCartItems = cartItems.filter((item) => item.item._id !== productId);
        setCartItems(updatedCartItems);
        // Recalculate the total after removal
        calculateTotal(updatedCartItems);
        // Update cart count if needed
        updateCartCount();
      }
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  const handleScroll = () =>{
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }
  
  

  return (
    <>
      <h1 className='my-5 text-center fw-bold'>Shopping Cart</h1>
      <div className='cart'>
        <div className="cart-list">
          <table className="table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col" className='mob-mode'>Product</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {!!cartItems.length > 0 ? (
                cartItems.map((item) => ( 
                  <tr key={item.item._id}>
                    <th scope="row">
                      <img src={import.meta.env.VITE_BACKEND_URL_ACCESS + item.item.image} alt={item.item.name} />
                    </th>
                    <td className='mob-mode'>{item.item.name}</td>
                    <td>${item.item.new_price}</td>
                    <td>
                      <div className="quantity-container">
                        <button className="quantity-btn-m" onClick={() => decrement(item.item._id)}>-</button>
                        <input type="number" value={item.quantity} readOnly placeholder="Qty" />
                        <button className="quantity-btn-p" onClick={() => increment(item.item._id)}>+</button>
                      </div>
                    </td>
                    <td>${item.quantity * item.item.new_price}</td>
                    <td className='cart-detail'>
                      <Link to={`/detail/${item.item._id}`}>Detail</Link>
                    </td>
                    <td className='remove'>
                      <button onClick={() => handleRemove(item.item._id)}>X</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">Your cart is empty <Link className='goshop' to={'/shop'}>Continue Shopping</Link></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="total">
          <h4>Cart Total</h4>
          <span>Subtotal - ${totalPrice}</span>
          <div>
            <input type="text" placeholder="Enter coupon code" />
            <button>Apply</button>
          </div>
          <span>Total - ${totalPrice}</span>

          {/* cartItem နဲ့ totalPrice ကို checkout page ထဲ ခေါ်ဖို့ */}
          <Link to="/checkout" onClick={handleScroll} state={{ cartItems, totalPrice }}>Checkout</Link>
        </div>
      </div>
    </>
  );
}
