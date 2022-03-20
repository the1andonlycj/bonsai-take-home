import { Dispatch } from "redux";
import { ProductDispatchTypes, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_ERROR, SELECTED_PRODUCT, REMOVE_SELECTED_PRODUCT, TOGGLE_CART } from "../constants/action-types"

export const GetProducts = () => async (dispatch: Dispatch<ProductDispatchTypes>) => {
  console.log("I'm TRYING MY BEST")
  return await fetch("http://localhost:8000/products", {
    method: "GET",
    headers: { "Content-Type": "application/json" }, 
  }).then((results) => {
    
    return results.json()
  }).then((res) => {
    dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: res.products
    });
  }).catch((err) => {
    
    console.log("fetch err", err)
    dispatch({
      type: GET_PRODUCTS_ERROR,
      payload: err
    })
  })
}  


// export const setProducts = (products) => {
//   return {
//     type: ActionTypes.SET_PRODUCTS,
//     payload: products,
//   };
// };

// export const selectedProduct = (product) => {
//   return {
//     type: ActionTypes.SELECTED_PRODUCT,
//     payload: product,
//   };
// };

// Edit for remove:
// export const setPRoducts = (products) => {
//   return {
//     type: ActionTypes.SET_PRODUCTS,
//     payload: products,
//   };
// };