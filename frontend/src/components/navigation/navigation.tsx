import { useDispatch } from "react-redux";
import { ToggleCart } from "../../redux/actions/productActions";
import "./navigation.styles.css";

const Navigation = () => {
  const dispatch = useDispatch();
  const _toggleCart = () => {
    dispatch(ToggleCart())
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
