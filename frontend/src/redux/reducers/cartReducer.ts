// import { createContext, useState, FC } from "react";

// interface ICartContext {
//   isCartOpen: boolean;
//   setIsCartOpen: (isCartOpen: boolean) => void;
// }

// // Why does setIsOpen show null here but void above? Just inconsistent?
// export const CartContext = createContext<ICartContext>({
//   isCartOpen: false,
//   setIsCartOpen: () => null,
// });

// export const CartProvider: FC = ({ children }) => {
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const value = { isCartOpen, setIsCartOpen };

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };

import { ActionTypes } from "../constants/action-types";

const initialState = {
  isOpen: false,
}

export const cartReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.TOGGLE_CART:
      return {...state, isOpen: payload}; 
    default:
      return state;
  }
};
