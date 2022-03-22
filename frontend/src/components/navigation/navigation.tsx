import { useDispatch } from "react-redux";
import { ToggleCart } from "../../redux/actions/productActions";
import "./navigation.styles.css";

const Navigation = () => {
  const dispatch = useDispatch();
  const _toggleCart = () => {
    // This just wants parameters passed in.
    dispatch(ToggleCart(false))
  }



  return (
    <nav className="navigation-bar">
      <div className="cart-icon" onClick={_toggleCart}>
        Cart
      </div>
    </nav>
  );
};

export default Navigation;
