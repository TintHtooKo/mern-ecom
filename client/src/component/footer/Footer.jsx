import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
    const scrollClick = () =>{
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  return (
    <div className='footer'>
        <div className='footer-container'>
            <div className='useful-link'>
                <ul>
                    <li><h3>Useful Link</h3></li>
                    <li><Link to={'/'} onClick={scrollClick}>Home</Link></li>
                    <li><Link to={'/about'} onClick={scrollClick}>About</Link></li>
                    <li><Link to={'/shop'} onClick={scrollClick}>Shop</Link></li>
                    {/* <li><Link to={'/blog'}>Blog</Link></li> */}
                    <li><Link to={'/contact'} onClick={scrollClick}>Contact</Link></li>
                </ul>
            </div>

            <div className="touch">
                <h4>Get In Touch</h4>
                <p>Any questions? Let us know in store at 8th floor, 379 Hudson St, New York, NY 10018 or call us on (+1) 96 716 6879</p>
                <div>
                    <Link><i className="fa-brands fa-facebook-f"></i></Link>
                    <Link><i className="fa-brands fa-instagram"></i></Link>
                    <Link><i className="fa-brands fa-x-twitter"></i></Link>
                </div>
            </div>

            <div className="sub">
                <h4>Newsletter</h4>
                <form action="">
                <input type="email" placeholder='email@example.com' /> <br />
                <button type='submit' className='mt-2'>Subscribe</button>
                </form>
            </div>
        </div>
        <p className='copyright'>Copyright ©2024 All rights reserved</p>
    </div>
  )
}
