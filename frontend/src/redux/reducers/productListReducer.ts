import { DispatchTypes, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_ERROR, SELECTED_OPTION, REMOVE_SELECTED_PRODUCT, TOGGLE_CART, TOGGLE_MODAL, ADD_TO_CART } from "../constants/action-types";
import { IProduct, Option, ICartItem } from "../constants/product-types";

interface IInitialState {
  products?: IProduct[];
  isLoading: boolean;
  isModalOpen: boolean;
  selectedProduct: IProduct;
  selectedOption: Option;
}

const initialState: IInitialState = {
  products: [],
  isLoading: true,
  isModalOpen: false,
  selectedProduct: {
    name: '', 
    id: '', 
    description: '', 
    defaultImage: '', 
    variants: [],
    isDiscontinued: false
  },
  selectedOption: {
    value: '', 
    type: ''
  },
}

export const productListReducer = (state: IInitialState = initialState, {type, payload} : any) : IInitialState => {
  switch (type) {
    case GET_PRODUCTS_SUCCESS:
      return {...state, products: payload, isLoading: false}; 
    case TOGGLE_MODAL:
      return {...state, isModalOpen: !state.isModalOpen, selectedProduct: payload}
    case SELECTED_OPTION: 
      return {...state, selectedOption: payload}
    default:
      return state;
  }
};


