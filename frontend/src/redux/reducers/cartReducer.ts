import { UPDATE_CART, TOGGLE_CART, ADD_TO_CART, REMOVE_ITEM, UPDATE_TOTAL } from "../constants/action-types";
import { ICartItem } from "../constants/cart-types";

interface IInitialState {
  isCartOpen: boolean;
  cart: ICartItem[];
  cartTotal: number;
}

const initialState: IInitialState = {
  isCartOpen: false,
  cart: [],
  cartTotal: 0
}

export const cartReducer = (state: IInitialState = initialState, { type, payload }: any): IInitialState => {
  switch (type) {
    case TOGGLE_CART:
      return { ...state, isCartOpen: !state.isCartOpen }
    case ADD_TO_CART:
      return { ...state, cart: [...state.cart, payload] }
    case REMOVE_ITEM: {
      const updatedCart = [...state.cart]
      updatedCart.splice(state.cart.findIndex(item => item.id === payload), 1)
      return { ...state, cart: updatedCart }
    }
    case UPDATE_CART: {
      const itemIndex = state.cart.findIndex(item => item.id === payload.id)
      const updatedCart = [...state.cart]
      updatedCart[itemIndex].quantityDesired = Number(payload.quantityDesired)
      return { ...state, cart: updatedCart }
    }
    case UPDATE_TOTAL:
      return { ...state, cartTotal: payload }
    default:
      return state;
  }
};


