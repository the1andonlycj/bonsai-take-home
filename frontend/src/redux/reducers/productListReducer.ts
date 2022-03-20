import { ProductDispatchTypes, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_ERROR, SELECTED_PRODUCT, REMOVE_SELECTED_PRODUCT, TOGGLE_CART, TOGGLE_MODAL } from "../constants/action-types";
import { IProduct } from "../constants/product-types";

interface IInitialState {
  products?: IProduct[];
  isLoading: boolean;
  isModalOpen: boolean;
  isCartOpen: boolean;
  selectedProduct: IProduct;
}

const initialState: IInitialState = {
  // Is unknown used correctly here?
  products: [],
  isLoading: true,
  isModalOpen: false,
  isCartOpen: false,
  selectedProduct: {
    name: '', 
    id: '', 
    description: '', 
    defaultImage: '', 
    variants: []
  }
  
}

export const productListReducer = (state: IInitialState = initialState, {type, payload} : any) : IInitialState => {
  switch (type) {
    case GET_PRODUCTS_SUCCESS:
      return {...state, products: payload, isLoading: false}; 
    case TOGGLE_MODAL:
      return {...state, isModalOpen: !state.isModalOpen, selectedProduct: payload}
    case TOGGLE_CART:
      return {...state, isCartOpen: !state.isCartOpen, }
    default:
      return state;
  }
};


