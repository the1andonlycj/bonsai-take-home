import { useDispatch } from "react-redux";
import { ToggleCart } from "../../redux/actions/cartActions";
import "./navigation.styles.css";

const Navigation = () => {
  const dispatch = useDispatch();
  const _toggleCart = () => {
    // This is sending in "false"; cart still opens. Refactor function.
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
