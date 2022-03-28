
import { GET_PRODUCTS_SUCCESS, SELECTED_OPTIONS, TOGGLE_MODAL, SET_SELECTED_VARIANT } from "../constants/action-types";
import { IProduct } from "../constants/product-types";
import { IChosenOptions } from "../constants/cart-types"

interface IInitialState {
  products?: IProduct[];
  isLoading: boolean;
  isModalOpen: boolean;
  selectedProduct: IProduct;
  selectedOptions: IChosenOptions[];
  selectedVariantId: string;
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
  selectedOptions: [],
  selectedVariantId: ""
}

export const productListReducer = (state: IInitialState = initialState, {type, payload} : any) : IInitialState => {
  switch (type) {
    case GET_PRODUCTS_SUCCESS:
      return {...state, products: payload, isLoading: false}; 
    case TOGGLE_MODAL:
      return {...state, isModalOpen: !state.isModalOpen, selectedProduct: payload, selectedOptions: []}
    case SELECTED_OPTIONS: 
      const updatedSelectedOptions = {...state.selectedOptions}
      updatedSelectedOptions[payload.type] = payload.value
      return {...state, selectedOptions: updatedSelectedOptions}
    case SET_SELECTED_VARIANT:
      return {...state, selectedVariantId: payload}
    default:
      return state;
  }
};


