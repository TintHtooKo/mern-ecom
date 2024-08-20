import { useContext, useEffect, useState } from 'react';
import './css/Checkout.css';
import { useLocation } from 'react-router-dom';
import axios from '../helper/axios';
import Success from '../component/alert/Success';
import { AuthContext } from '../context/AuthContext';

export default function Checkout() {
    const {dispatch} = useContext(AuthContext)

    // cartItems and totalPrice ကို cart ထဲက u သုံးလိူ့
    const location = useLocation();
    const { cartItems, totalPrice } = location.state || { cartItems: [], totalPrice: 0 };

    const [payment, setPayment] = useState([]);
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [selectedPayment, setSelectedPayment] = useState('');
    const [alert, setAlert] = useState(false);

    useEffect(() => {
        const fetchPayment = async () => {
            try {
                let res = await axios.get('/payment');
                setPayment(res.data);
            } catch (err) {
                console.error("Error fetching payment methods:", err);
            }
        };
        fetchPayment();
    }, []);

    const checkoutSubmit = async (e) => {
        e.preventDefault();


        // Validate that a payment method is selected
        if (!selectedPayment) {
            console.log('Please select a payment method.');
            return;
        }

        // Validate other form fields if necessary
        if (!fullname || !email || !address || !phone) {
            console.log('Please fill in all the required fields.');
            return;
        }

        try {
            // Constructing the cart items to have the correct format
            const formattedCartItems = cartItems.map(item => ({
                item: item._id // Assuming each cart item has an `_id` field
            }));

            const data = {
                fullname,
                email,
                address,
                phone,
                payment: selectedPayment,
                cartItems: formattedCartItems, // Pass the formatted cart items
                totalPrice
            };

            let res = await axios.post('/checkout/create', data);

            if (res.status === 200) {
                setFullname('');
                setEmail('');
                setAddress('');
                setPhone('');
                setSelectedPayment('');
                setAlert(true);
                dispatch({ type: "UPDATE_CART_COUNT", payload: 0 });
            }
        } catch (error) {
            console.error("Checkout error:", error.response.data);
        }
    };

    return (
        <>
            <h1 className="text-center my-5 fw-bold">Checkout</h1>
            <div className="checkout">
                <form onSubmit={checkoutSubmit}>
                    <div className="left-c">
                        <h3 className='mb-5 fw-bold'>Customer Details</h3>
                        <div>
                            <input
                                type="text"
                                value={fullname}
                                required
                                onChange={(e) => setFullname(e.target.value)}
                                placeholder="Full Name"
                            />
                            <input
                                type="email"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='email@example.com'
                            />
                        </div>
                        <div>
                            <textarea
                                type="text"
                                value={address}
                                required
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Address"
                            />
                            <input
                                type="phone"
                                value={phone}
                                required
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder='(000)-00000'
                            />
                        </div>
                        <div className=' flex-column'>
                            <label>Payment Method</label>
                            <select
                                value={selectedPayment}
                                onChange={(e) => setSelectedPayment(e.target.value)}
                                required
                            >
                                <option value="" >Select Payment</option> {/* Default empty option */}
                                {payment.map((item) => (
                                    <option key={item._id} value={item._id}>
                                        {item.payment}
                                    </option>
                                ))}
                            </select>
                            <small style={{ color: '#acacac' }}>Credit card, debit card, Visa card, and online payment options will be available soon.</small>
                        </div>
                        <button type='submit'>Checkout</button>
                    </div>
                    <div className="right-c">
                        <h3 className='mb-5 fw-bold'>Product List</h3>
                        <div className="product-list">
                            {cartItems.map((item, index) => (
                                <div key={index} className='mb-2'>
                                    <img
                                        src={import.meta.env.VITE_BACKEND_URL_ACCESS + item.item.image}
                                        style={{ width: '50px' }}
                                        alt="Product"
                                    />
                                    <p>Qty: {item.quantity}</p>
                                    <p>Price: ${item.quantity * item.item.new_price}</p>
                                </div>
                            ))}
                            <hr style={{ color: 'rgb(206, 206, 206)' }} />
                        </div>
                        <p className='fw-bold fs-5'>Total: ${totalPrice}</p>
                    </div>
                </form>
            </div>
            {alert && <Success message={'Checkout Successfully'} />}
        </>
    );
}
