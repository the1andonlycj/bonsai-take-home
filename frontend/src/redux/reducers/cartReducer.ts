import { UPDATE_CART, TOGGLE_CART, ADD_TO_CART } from "../constants/action-types";
import { ICartItem } from "../constants/cart-types";

interface IInitialState {
  isCartOpen: boolean;
  cart: ICartItem[];
}

const initialState: IInitialState = {
  isCartOpen: false,
  cart: []
}

export const productListReducer = (state: IInitialState = initialState, {type, payload} : any) : IInitialState => {
  switch (type) {
    case TOGGLE_CART:
      return {...state, isCartOpen: !state.isCartOpen }
    case ADD_TO_CART: 
      return {...state, cart: [...state.cart, payload]}
    case UPDATE_CART:
      return {...state, cart: payload}
    default:
      return state;
  }
};


