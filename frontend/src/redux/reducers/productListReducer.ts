import { ProductDispatchTypes, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_ERROR, SELECTED_PRODUCT, REMOVE_SELECTED_PRODUCT, TOGGLE_CART } from "../constants/action-types";
import { IProduct, Variant, SelectableOptions, Option, IModalContext, ProductList } from "../constants/product-types";

interface IInitialState {
  products?: ProductList
}

const initialState: IInitialState = {
  // Is unknown used correctly here?
  products: [] as unknown as ProductList
}

export const productListReducer = (state: IInitialState = initialState, {type, payload} : any) : IInitialState => {
  switch (type) {
    case GET_PRODUCTS_SUCCESS:
      return {...state, products: payload}; 
    default:
      return state;
  }
};

