import { useContext } from 'react';

import { CartContext } from './cart-context';

import Cart from './components/cart/cart';
import Navigation from './components/navigation/navigation';
import Storefront from './components/storefront/storefront';
import ProductDetailModal from './components/product-detail-modal/product-detail-modal';

import './App.css';

const App = () => {
  const { isOpen } = useContext(CartContext);
  // If we create modalContext, we can import it here to use the modalContext for the site.

  return (
    <div className="App">
      <ProductDetailModal />
      <Navigation />
      {isOpen ? <Cart /> : null}
      <Storefront />
    </div>
  );
};

export default App;
