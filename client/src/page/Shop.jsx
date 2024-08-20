import { useEffect, useState } from 'react'
import Product from '../component/product/Product'
import './css/Shop.css'
import axios from '../helper/axios'

export default function Shop() {
  let [category, setCategory] = useState([]);
  let [selectedCategory, setSelectedCategory] = useState(null); // State to track selected category

  useEffect(() => {
    let fetchCategory = async () => {
      let res = await axios.get('/category');
      setCategory(res.data);
    }
    fetchCategory();
  }, []);

  return (
    <>
      <div className="filter">
        <button onClick={() => setSelectedCategory(null)}>All Products</button>
        {
          !!category.length && (
            category.map((item) => {
              return (
                <button 
                  key={item._id} 
                  onClick={() => setSelectedCategory(item._id)} 
                >
                  {item.name}
                </button>
              )
            })
          )
        }
      </div>

      <div className="latest-each-product">
        <Product categoryId={selectedCategory} />
      </div>
    </>
  )
}
