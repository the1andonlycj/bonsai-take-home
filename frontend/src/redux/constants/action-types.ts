import { IProduct, Option, ICartItem } from "./product-types"

export const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
export const GET_PRODUCTS_ERROR = "GET_PRODUCTS_ERROR";
export const SELECTED_PRODUCT = "SELECTED_PRODUCT";
export const REMOVE_SELECTED_PRODUCT = "REMOVE_SELECTED_PRODUCT";
export const TOGGLE_CART = "TOGGLE_CART";
export const TOGGLE_MODAL = "TOGGLE_MODAL";
export const SELECTED_OPTION = "SELECTED_OPTION";
export const ADD_TO_CART = "ADD_TO_CART";
export const UPDATE_CART = "UPDATE_CART";


interface GetProductsSuccess {
  type: typeof GET_PRODUCTS_SUCCESS,
  payload: IProduct[]
}

interface GetProductsError {
  type: typeof GET_PRODUCTS_ERROR,
  // Payload for ERROR?
  // payload: 
}

interface SelectedProduct {
  type: typeof SELECTED_PRODUCT,
  payload: IProduct
}

interface RemoveSelectedProduct {
  type: typeof REMOVE_SELECTED_PRODUCT
  payload: IProduct
}

interface ToggleCart {
  type: typeof TOGGLE_CART,
}

interface ToggleModal {
  type: typeof TOGGLE_MODAL,
}

interface SelectedOption {
  type: typeof SELECTED_OPTION,
  payload: Option
}

interface AddToCart {
  type: typeof ADD_TO_CART,
  payload: ICartItem
}

interface UpdateCart {
  type: typeof UPDATE_CART,
  payload: ICartItem[]
}

export type DispatchTypes = GetProductsSuccess | GetProductsError | SelectedProduct | RemoveSelectedProduct | ToggleCart | ToggleModal | SelectedOption | AddToCart | UpdateCart