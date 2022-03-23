import { FC, ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';
import { UpdateCart, RemoveItemFromCart } from '../../redux/actions/cartActions';

import './cart-item.styles.css';

interface ICartItemProps {
  name: string,
  imageSrc: string,
  quantityAvailable: number,
  quantityDesired: string,
  price: number,
  id: string,
}

interface IPropsDropDown {
  id: string,
  label: string,
  value: string,
  options: string[],
  onChange: (a: any) => void
}

const CartItem: FC<ICartItemProps> = ({ name, imageSrc, quantityAvailable, quantityDesired, price, id}): ReactElement => {
  const [selectedQuantity, setSelectedQuantity] = useState(quantityDesired)
  const dispatch = useDispatch();
  const removeProduct = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(RemoveItemFromCart(e.target?.id))
  }
  
  const setQuantity = (e: any) => {
    setSelectedQuantity(e.target.value)
    dispatch(UpdateCart({id:e.target.id, quantity:e.target.value}))
    
  }
  
  // Dropdown Number List:
  const quantityOptions = [ ...Array(quantityAvailable).keys() ].map( i => i+1);
  const Dropdown = ({ id, label, value, options, onChange }: IPropsDropDown) => {
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
        <span> Unit Price: ${price?.toFixed(2)} </span>
        <span> Quantity: {quantityDesired} </span>
        <span>Total Price: ${(price * Number(quantityDesired))?.toFixed(2) }</span> 
        <Dropdown id={id} label="Quantity" value={selectedQuantity} options={quantityOptions} onChange={setQuantity} />
        <button className="remove-button" id={id} onClick={removeProduct}>Remove?</button>
      </div>
    </div>
  );
};

export default CartItem;
