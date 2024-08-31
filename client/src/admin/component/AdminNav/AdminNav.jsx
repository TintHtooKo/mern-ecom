import { useState, useEffect } from 'react';
import './AdminNav.css';
export default function AdminNav({ setActiveComponent }) {
  const [isMobile, setIsMobile] = useState(false);
  const [activeButton, setActiveButton] = useState('UserList');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener('resize', handleResize);

    handleResize(); // Call initially

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = (componentName) => {
    setActiveComponent(componentName);
    setActiveButton(componentName);
  };

  return (
    <div className='ad-nav'>
      <button
        onClick={() => handleClick('UserList')}
        className={activeButton === 'UserList' ? 'active-btn' : ''}
      >
        {isMobile ? 'User' : 'User List'}
      </button>
      <button
        onClick={() => handleClick('ProductList')}
        className={activeButton === 'ProductList' ? 'active-btn' : ''}
      >
        {isMobile ? 'Product' : 'Product List'}
      </button>
      <button
        onClick={() => handleClick('CategoryList')}
        className={activeButton === 'CategoryList' ? 'active-btn' : ''}
      >
        {isMobile ? 'Category' : 'Category List'}
      </button>
      <button
        onClick={() => handleClick('CheckoutList')}
        className={activeButton === 'CheckoutList' ? 'active-btn' : ''}
      >
        {isMobile ? 'Checkout' : 'Checkout List'}
      </button>
    </div>
  );
}
