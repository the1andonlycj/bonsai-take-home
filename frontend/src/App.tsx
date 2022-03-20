import { useContext } from 'react';

import { CartContext } from './cart-context';
import { ModalContext } from './modal-context';

import Cart from './components/cart/cart';
import Navigation from './components/navigation/navigation';
import Storefront from './components/storefront/storefront';
import ProductDetailModal from './components/product-detail-modal/product-detail-modal';

import './App.css';

const App = () => {
  const { isCartOpen } = useContext(CartContext);
  const { isModalOpen } = useContext(ModalContext)
  
  return (
    <div className="App">
      <Navigation />
      {isCartOpen ? <Cart /> : null}
      {/* {isModalOpen ? <ProductDetailModal /> : null} */}
      <Storefront />
    </div>
  );
};

export default App;
