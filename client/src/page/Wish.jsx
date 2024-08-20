import './css/Wish.css'
import Product from '../assets/p-1.webp'
import { Link } from 'react-router-dom'

export default function Wish() {
  return (
    <>
      <h1 className=' my-5 text-center fw-bold'>Wishlist</h1>
      <div className="cart-list">
            <table className="table cus-table">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col" className='mob-mode'>Product</th>
                  <th scope="col" className='mob-mode'>Price</th>
                  <th scope="col"></th>

                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='wish-del'><button>X</button></td>
                  <th scope="row"><img src={Product} alt="Product"/></th>
                  <td className='mob-mode'>Esprit Ruffle Shirt</td>
                  <td>$30</td>
                  <td  className='wish-btn'>
                    <button className='btn-1'>Add to Cart</button>
                    <Link to={'/detail'} className='btn-2'>Detail</Link>
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
    </>
  )
}
