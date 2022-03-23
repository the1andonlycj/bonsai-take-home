import { useDispatch, useSelector } from 'react-redux';
import { ICartItem } from '../../redux/constants/product-types';
import CartItem from '../cart-item/cart-item';
import { RootStore } from '../../redux/store';
import { ToggleCart } from '../../redux/actions/cartActions';

import './cart.styles.css';

const Cart = () => {
  const isCartOpen = useSelector((state: RootStore) => state.cart.isCartOpen);
  const dispatch = useDispatch();
  const _toggleCart = () => {
    dispatch(ToggleCart(!isCartOpen))
  }
  const cartProducts = useSelector((state: RootStore) => state.cart.cart);
  return (
    <div className="cart-modal">
      <div className="cart-container">
        <button className="close-button" onClick={_toggleCart}>
          →
        </button>
        <div className="cart-items-container">
          {/* This length check is not saving us from a deleted product listing because it's trying to map over them no matter what.*/}
          {Object.keys(cartProducts).length > 0 && (
            Object.keys(cartProducts).map((item, index: number) => (
              <CartItem 
                name={cartProducts[item].name}
                imageSrc={cartProducts[item].image}
                quantityAvailable={cartProducts[item].quantityAvailable}
                price={cartProducts[item].price}
                id={cartProducts[item].id}
                chosenType={cartProducts[item].chosenType}
                chosenValue={cartProducts[item].chosenValue}
                key={index}
                quantityDesired={cartProducts[item].quantityDesired}
              />
            ))
          )}
          
        </div>
        <div className="total-container">
          {/* <span>Total: ${totalPrice}</span> */}
        </div>
      </div>
    </div>
  );
};

export default Cart;
