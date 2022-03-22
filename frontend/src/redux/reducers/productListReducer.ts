import { ProductDispatchTypes, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_ERROR, SELECTED_OPTION, REMOVE_SELECTED_PRODUCT, TOGGLE_CART, TOGGLE_MODAL } from "../constants/action-types";
import { IProduct, Option } from "../constants/product-types";

interface IInitialState {
  products?: IProduct[];
  isLoading: boolean;
  isModalOpen: boolean;
  isCartOpen: boolean;
  selectedProduct: IProduct;
  selectedOption: Option;
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
    variants: [],
  },
  selectedOption: {
    value: '', 
    type: ''
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
    case SELECTED_OPTION: 
      return {...state, selectedOption: payload}
    default:
      return state;
  }
};


