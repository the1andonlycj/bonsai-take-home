import { Dispatch } from "redux";
import { DispatchTypes, TOGGLE_CART, ADD_TO_CART, UPDATE_CART } from "../constants/action-types";
import { ICartItem } from "../constants/cart-types";

export const ToggleCart = (payload: boolean) => (dispatch: Dispatch<DispatchTypes>) => {
  dispatch({
    type: TOGGLE_CART,
    payload: payload
  });
}

export const AddToCart = (product: ICartItem) => (dispatch: Dispatch<DispatchTypes>) => {
  console.log("PRODUCT GOING INTO CART:", product)
  dispatch({
    type: ADD_TO_CART,
    payload: product
  });
}

export const UpdateCart = (cartItems: ICartItem[]) => (dispatch: Dispatch<DispatchTypes>) => {
  console.log("PRODUCTS GOING BACK INTO CART AFTER REMOVAL:", cartItems)
  dispatch({
    type: UPDATE_CART,
    payload: cartItems
  });
}