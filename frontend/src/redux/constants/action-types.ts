import { IProduct, Variant, SelectableOptions, Option, IModalContext, ProductList } from "./product-types"

export const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
export const GET_PRODUCTS_ERROR = "GET_PRODUCTS_ERROR";
export const SELECTED_PRODUCT = "SELECTED_PRODUCT";
export const REMOVE_SELECTED_PRODUCT = "REMOVE_SELECTED_PRODUCT";
export const TOGGLE_CART = "TOGGLE_CART";


interface GetProductsSuccess {
  type: typeof GET_PRODUCTS_SUCCESS,
  payload: ProductList
}

interface GetProductsError {
  type: typeof GET_PRODUCTS_ERROR,
  // Payload for ERROR?
  // payload: 
}

interface SelectedProduct {
  type: typeof SELECTED_PRODUCT,
  // This may be simpler:
  payload: IProduct
}

interface RemoveSelectedProduct {
  type: typeof REMOVE_SELECTED_PRODUCT
  // This may be simpler:
  payload: IProduct
}

interface ToggleCart {
  type: typeof TOGGLE_CART
  // Something goes here.
}

export type ProductDispatchTypes = GetProductsSuccess | GetProductsError | SelectedProduct | RemoveSelectedProduct | ToggleCart