
import { GET_PRODUCTS_SUCCESS, SELECTED_OPTIONS, TOGGLE_MODAL } from "../constants/action-types";
import { IProduct } from "../constants/product-types";

interface IInitialState {
  products?: IProduct[];
  isLoading: boolean;
  isModalOpen: boolean;
  selectedProduct: IProduct;
  selectedOptions: any;
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
  selectedOptions: {},
}

export const productListReducer = (state: IInitialState = initialState, {type, payload} : any) : IInitialState => {
  switch (type) {
    case GET_PRODUCTS_SUCCESS:
      return {...state, products: payload, isLoading: false}; 
    case TOGGLE_MODAL:
      return {...state, isModalOpen: !state.isModalOpen, selectedProduct: payload, selectedOptions: {}}
    case SELECTED_OPTIONS: 
    const updatedSelectedOptions = {...state.selectedOptions}
    updatedSelectedOptions[payload.type] = payload.value
      return {...state, selectedOptions: updatedSelectedOptions}
    default:
      return state;
  }
};


