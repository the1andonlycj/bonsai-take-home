import { DispatchTypes, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_ERROR, SELECTED_OPTION, REMOVE_SELECTED_PRODUCT, TOGGLE_CART, TOGGLE_MODAL, ADD_TO_CART } from "../constants/action-types";
import { IProduct, Option, ICartItem } from "../constants/product-types";

interface IInitialState {
  products?: IProduct[];
  isLoading: boolean;
  isModalOpen: boolean;
  isCartOpen: boolean;
  selectedProduct: IProduct;
  selectedOption: Option;
  cart: ICartItem[];
}

const initialState: IInitialState = {
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
    isDiscontinued: false
  },
  selectedOption: {
    value: '', 
    type: ''
  },
  // Why is this initialization of cart not showing up???
  cart: []
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
    case ADD_TO_CART: 
      return {...state, cart: [...state.cart, payload]}
    default:
      return state;
  }
};


