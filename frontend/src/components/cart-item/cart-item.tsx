import { FC, ReactElement } from 'react';

import './cart-item.styles.css';

// Cart needs all of this information, but it also needs to display the options that were chosen. 
// Cart must be sent: name, image, quantity, price, selectedOptions.


export interface ICartItem {
  name: string;
  imageSrc: string;
  quantity: number;
  price: number;
}

interface ICartItemProps {
  cartItem: ICartItem;
}

const CartItem: FC<ICartItemProps> = ({ cartItem }): ReactElement => {
  const { name, imageSrc, quantity, price } = cartItem;
  return (
    <div className="cart-item-container">
      <img src={imageSrc} />
      <div className="cart-item-details">
        <span>{name} </span>
        <span> Quantity: {quantity} </span>
        <span> price: ${price.toFixed(2)} </span>
      </div>
    </div>
  );
};

export default CartItem;
