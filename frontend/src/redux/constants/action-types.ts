import { IProduct, Option } from "./product-types";
import { ICartItem } from "./cart-types";

export const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
export const GET_PRODUCTS_ERROR = "GET_PRODUCTS_ERROR";
export const SELECTED_PRODUCT = "SELECTED_PRODUCT";
export const REMOVE_SELECTED_PRODUCT = "REMOVE_SELECTED_PRODUCT";
export const TOGGLE_CART = "TOGGLE_CART";
export const TOGGLE_MODAL = "TOGGLE_MODAL";
export const SELECTED_OPTIONS = "SELECTED_OPTIONS";
export const ADD_TO_CART = "ADD_TO_CART";
export const UPDATE_CART = "UPDATE_CART";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const UPDATE_TOTAL = "UPDATE_TOTAL";
export const SET_SELECTED_VARIANT = "SET_SELECTED_VARIANT";



interface GetProductsSuccess {
  type: typeof GET_PRODUCTS_SUCCESS,
  payload: IProduct[]
}

interface GetProductsError {
  type: typeof GET_PRODUCTS_ERROR,
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

interface SelectedOptions {
  type: typeof SELECTED_OPTIONS,
  payload: Option
}

interface AddToCart {
  type: typeof ADD_TO_CART,
  payload: ICartItem
}

interface UpdateCart {
  type: typeof UPDATE_CART,
  payload: object
}

interface RemoveItem {
  type: typeof REMOVE_ITEM,
  payload: string
}

interface SetSelectedVariant {
  type: typeof SET_SELECTED_VARIANT,
  payload: string
}

interface UpdateTotal {
  type: typeof UPDATE_TOTAL,
  payload: number
}

export type DispatchTypes = GetProductsSuccess | GetProductsError | SelectedProduct | RemoveSelectedProduct | ToggleCart | ToggleModal | SelectedOptions | AddToCart | UpdateCart | RemoveItem | SetSelectedVariant | UpdateTotal