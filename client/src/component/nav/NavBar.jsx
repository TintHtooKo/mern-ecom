import { Link, useNavigate } from 'react-router-dom'
import './NavBar.css'
import {  useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from '../../helper/axios';

export default function NavBar() {
    let {user,dispatch,cartCount} = useContext(AuthContext)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    let navigate = useNavigate()

     const logoutHandler = async()=>{
        try {
            let logout = await axios.post('/user/logout')
            if(logout.status == 200){
                dispatch({type : "LOGOUT"})
                navigate('/login')
            }
            setIsMobileMenuOpen(false);
        } catch (error) {
            console.log(error);
            
        }
     }



    const handleToggleMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleCloseMenu = () => {
        setIsMobileMenuOpen(false);
      };


  return (
    <div>
        <div className='top'>
            <p className=' mt-3'>Free shipping for standard order over $100</p>
            <ul className=' mt-2'>
                <li><Link>Help & FAQs</Link></li>
                {
                    !user ? (
                        <li><Link to='/login'>Login</Link></li>
                    ) : (
                        <li><button onClick={logoutHandler}>Logout</button></li>
                    )
                }
                    
                
            </ul>
        </div>
        <nav>
            <h1 onClick={handleCloseMenu} className='logo'><Link to={'/'}>Logo</Link></h1>
            <ul>
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/about'}>About</Link></li>
                <li><Link to={'/shop'}>Shop</Link></li>
                <li><Link to={'/contact'}>Contact</Link></li>
            </ul>
            <div className='right'>
                <div className='cart'>
                    <Link to={'/cart'}><i className="fa-solid fa-cart-shopping"></i></Link>
                    <p>{cartCount}</p>
                </div>
                {/* <div className='wish'>
                    <Link to={'/wish'}><i className="fa-solid fa-heart"></i></Link>
                    <p>0</p>
                </div> */}
                <i className="fa-solid fa-bars bar" onClick={handleToggleMenu}></i>
            </div>
        </nav>

        <div className={`mobile ${isMobileMenuOpen ? 'open' : ''}`}>
            <div className='mob-top'>
                <p className=' mt-3'>Free shipping for standard order over $100</p>
                <hr />
                <ul>
                    <li><Link onClick={handleCloseMenu}>Help & FAQs</Link></li>
                    {
                        !user ? (
                            <li><Link onClick={handleCloseMenu} to={'/login'}>Login</Link></li>
                        ) : (
                            <li><button onClick={logoutHandler}>Logout</button></li>
                        )
                    }
                </ul>
            </div>
            <ul className="mob-menu">
                <li><Link onClick={handleCloseMenu} to={'/'}>Home</Link></li>
                <li><Link onClick={handleCloseMenu} to={'/about'}>About</Link></li>
                <li><Link onClick={handleCloseMenu} to={'/shop'}>Shop</Link></li>
                <li><Link onClick={handleCloseMenu} to={'/contact'}>Contact</Link></li>
            </ul>
        </div>
    </div>
  )
}
