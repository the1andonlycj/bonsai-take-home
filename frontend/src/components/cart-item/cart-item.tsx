import { FC, ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ICartItem } from '../../redux/constants/product-types';
import { RootStore } from '../../redux/store';
import { ResetCart } from '../../redux/actions/productActions';
import './cart-item.styles.css';

// Cart needs all of this information, but it also needs to display the options that were chosen. 
// Cart must be sent: name, image, quantity, price, selectedOptions.


interface ICartItemProps {
  cartItem: ICartItem;
}

const CartItem: FC<ICartItemProps> = ({ name, imageSrc, quantityAvailable, quantityDesired, price, id}): ReactElement => {
  const cartProducts = useSelector((state: RootStore) => state.productsList.cart);
  const [selectedQuantity, setSelectedQuantity] = useState(quantityDesired)
  const dispatch = useDispatch();
  // console.log("CART ITEM IS TRYING.", name, imageSrc, quantityAvailable, price, id, key)
  const removeProduct = (e: React.MouseEvent<HTMLElement>) => {
    // This almost removes the product we're trying to get rid of, but fails because it's still trying to access the attributes of the item. Maybe a useEffect will solve the issue?
    for (let i = cartProducts.length - 1; i >= 0; --i) {
      if (cartProducts[i].id === e.target.id) {
        console.log("FOUND THE MATCH")
          cartProducts.splice(i,1);
      }
      console.log("CARTPRODS", cartProducts)
      dispatch(ResetCart(cartProducts))
    }
  }

  
  const setQuantity = (e: any) => {
    setSelectedQuantity(e.target.value)
    for (let i = cartProducts.length - 1; i >= 0; --i) {
      if (cartProducts[i].id === e.target.id) {
        cartProducts[i].quantityDesired = Number(e.target.value)
      }
      dispatch(ResetCart(cartProducts))
    }

  }
  
  // Dropdown Number List:
  const quantityOptions = [ ...Array(quantityAvailable).keys() ].map( i => i+1);
  const Dropdown = ({ label, value, options, onChange }: IPropsDropDown) => {
    return (
      <label>
        {label}
        <select id={id} value={value} onChange={onChange}>
          {options.map((option: number, index: number) => (
            <option  key={index} value={option}>{option}</option>
          ))}
        </select>
      </label>
    );
  };

  return (
    <div className="cart-item-container" >
      <img src={imageSrc} />
      <div className="cart-item-details">
        <span>{name} </span>
        <span> Unit Price: ${price.toFixed(2)} </span>
        {/* Quantity is going to become a dropdown where the person can select as many of the product as there are available, essentially a map through the numbers 1- {quantityAvailable}. */}
        <span> Quantity: {quantityDesired} </span>
        <span>Total Price: ${(price * quantityDesired).toFixed(2) }</span> 
        <Dropdown id={id} label="Quantity" value={selectedQuantity} options={quantityOptions} onChange={setQuantity} />
        <button className="remove-button" id={id} onClick={removeProduct}>Remove?</button>
      </div>
    </div>
  );
};

export default CartItem;
