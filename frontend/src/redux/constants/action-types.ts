import { IProduct, Variant, SelectableOptions, Option, IModalContext, ProductList } from "./product-types"

export const SET_PRODUCTS = "SET_PRODUCTS";
export const SELECTED_PRODUCT = "SELECTED_PRODUCT";
export const REMOVE_SELECTED_PRODUCT = "REMOVE_SELECTED_PRODUCT";
export const TOGGLE_CART = "TOGGLE_CART";

interface SetProducts {
  type: typeof SET_PRODUCTS,
  payload: ProductList
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