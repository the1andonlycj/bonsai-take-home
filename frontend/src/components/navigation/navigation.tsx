import { useContext } from "react";

import { CartContext } from "../../cart-context";

import "./navigation.styles.css";

const Navigation = () => {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <nav className="navigation-bar">
      <div className="cart-icon" onClick={toggleCart}>
        Cart
      </div>
    </nav>
  );
};

export default Navigation;
