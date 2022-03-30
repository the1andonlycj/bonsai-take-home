import { ChangeEvent, FC, ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';
import { UpdateCart, RemoveItemFromCart } from '../../redux/actions/cartActions';
import { IChosenOptions, ICartItem } from '../../redux/constants/cart-types';


import './cart-item.styles.css';

interface IPropsDropDown {
  id: string,
  label: string,
  value: string,
  options: string[],
  onChange: (a: any) => void
}

const CartItem: FC<ICartItem> = ({ name, image, quantityAvailable, quantityDesired, price, id, chosenOptions}): ReactElement => {
  const [selectedQuantity, setSelectedQuantity] = useState(quantityDesired)
  const dispatch = useDispatch();
  const removeProduct = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(RemoveItemFromCart(e.target?.id))
  }
  
  const setQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedQuantity(e.target.value)
    dispatch(UpdateCart({id:e.target.id, quantityDesired: e.target.value}))
    
  }
  
  // Dropdown number list for quantity selection:
  const quantityOptions = [ ...Array(quantityAvailable).keys()].map( i => i+1);
  const Dropdown = ({ id, label, value, options, onChange }: IPropsDropDown) => {
    return (
      <label key={id}>
        {label}
        <select key={id} id={id} value={value} onChange={onChange}>
          {options.map((option: string, index: number) => (
            <option  key={index} value={option}>{option}</option>
          ))}
        </select>
      </label>
    );
  };

  return (
    <div className="cart-item-container" >
      <img src={image} />
      <div className="cart-item-details">
        <span>{name} </span>
        <span> Unit Price: ${price?.toFixed(2)} </span>
        {/* Map through the options that were chosen by the user here */}
        {chosenOptions?.map((option: IChosenOptions, index: number) => (
            <span  key={index}>{option.type}: {option.value}</span>
          ))}
        <span>Quantity Desired: {quantityDesired} </span>
        
        <span>Total For This Item: ${(price * Number(quantityDesired))?.toFixed(2) }</span> 
        <Dropdown id={id} label="Need more/Less? " value={selectedQuantity} options={quantityOptions} onChange={setQuantity} />
        <button className="remove-button" id={id} onClick={removeProduct}>Delete Item</button>
      </div>
    </div>
  );
};

export default CartItem;
