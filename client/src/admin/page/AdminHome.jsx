import { useState } from 'react';
import AdminNav from '../component/AdminNav/AdminNav';
import CategoryList from '../component/categoryList/CategoryList';
import CheckoutList from '../component/checkoutList/CheckoutList';
import ProductList from '../component/productList/ProductList';
import UserList from '../component/userList/UserList';
import './css/AdminHome.css';

export default function AdminHome() {
  const [activeComponent, setActiveComponent] = useState('');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'UserList':
        return <UserList />;
      case 'ProductList':
        return <ProductList />;
      case 'CategoryList':
        return <CategoryList />;
      case 'CheckoutList':
        return <CheckoutList />;
      default:
        return <UserList />;
    }
  };

  return (
    <div className='d-flex flex-column align-items-start justify-content-between mt-5 ad-home'>
      <div >
        <AdminNav setActiveComponent={setActiveComponent} />
      </div>
      <div className='w-75 ms-5'>
        {renderComponent()}
      </div>
    </div>
  );
}
