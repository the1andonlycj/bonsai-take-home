import { useContext } from 'react';

import Cart from './components/cart/cart';
import Navigation from './components/navigation/navigation';
import Storefront from './components/storefront/storefront';
import ProductDetailModal from './components/product-detail-modal/product-detail-modal';

import './App.css';

const App = () => {
  
  return (
    <div className="App">
      <Navigation />
      <Cart />
      <Storefront />
    </div>
  );
};

export default App;
