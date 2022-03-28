import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../cart-item/cart-item';
import { RootStore } from '../../redux/store';
import { ToggleCart, UpdateTotal } from '../../redux/actions/cartActions';
import { useEffect } from 'react';

import './cart.styles.css';

const Cart = () => {
  const isCartOpen = useSelector((state: RootStore) => state.cart.isCartOpen);
  const allCartProducts = useSelector((state: RootStore) => state.cart.cart);
  const cartTotal = useSelector((state: RootStore) => state.cart.cartTotal)
  
  const dispatch = useDispatch();
  const _toggleCart = () => {
    dispatch(ToggleCart(!isCartOpen))
  }


  useEffect(() => {
    let totalPrice = 0;
    allCartProducts.map((individualProuct)=> {
      totalPrice = totalPrice + (individualProuct.price * individualProuct.quantityDesired)
    })
    dispatch(UpdateTotal(totalPrice))
    // This needs to update any time the quantity of a product is changed or an item is added/removed. It is already listening for new items added to cart. It auto updates after removal if modal is open and closed.
  }, [allCartProducts])
  

  const cartProducts = useSelector((state: RootStore) => state.cart.cart);
  return (
    <div className="cart-modal">
      <div className="cart-container">
        <button className="close-button" onClick={_toggleCart}>
          →
        </button>
        <div className="cart-items-container">
          {Object.keys(cartProducts).length > 0 && (
            Object.keys(cartProducts).map((item, index: number) => (
              // The options here need to be mapped within the cart item... that means cartItem needs an update if not a child.
              <CartItem 
                name={cartProducts[item].name}
                imageSrc={cartProducts[item].image}
                quantityAvailable={cartProducts[item].quantityAvailable}
                price={cartProducts[item].price}
                id={cartProducts[item].id}
                chosenOptions={cartProducts[item].chosenOptions}
                key={index}
                quantityDesired={cartProducts[item].quantityDesired}
              />
            ))
          )}
          
        </div>
        <div className="total-container">
          <span>Total: ${cartTotal}</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
