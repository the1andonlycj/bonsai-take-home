import { Dispatch } from "redux";
import { ProductDispatchTypes, SET_PRODUCTS, SELECTED_PRODUCT, REMOVE_SELECTED_PRODUCT, TOGGLE_CART } from "../constants/action-types"

export const GetProducts = () => async (dispatch: Dispatch<ProductDispatchTypes>) => {
  return await fetch("http://localhost:8000/products", {
    method: "GET",
    headers: { "Content-Type": "application/json" }, 
  }).then((results) => {
    return results.json()
  }).then((res) => {
    dispatch({
      type: SET_PRODUCTS,
      payload: res.products
    });
  }).catch((err) => {
    // Install proper error handling for USER, not just admin!!!
    console.log("fetch err", err)
  })
}  


export const setProducts = (products) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: products,
  };
};

export const selectedProduct = (product) => {
  return {
    type: ActionTypes.SELECTED_PRODUCT,
    payload: product,
  };
};

// Edit for remove:
// export const setPRoducts = (products) => {
//   return {
//     type: ActionTypes.SET_PRODUCTS,
//     payload: products,
//   };
// };