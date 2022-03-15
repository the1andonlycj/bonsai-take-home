import { useContext } from 'react';

import { CartContext } from './cart-context';

import Cart from './components/cart/cart';
import Navigation from './components/navigation/navigation';
import Storefront from './components/storefront/storefront';

import './App.css';

const App = () => {
  const { isOpen } = useContext(CartContext);

  return (
    <div className="App">
      <Navigation />
      {isOpen ? <Cart /> : null}
      <Storefront />
    </div>
  );
};

export default App;
