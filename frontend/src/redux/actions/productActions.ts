import { Dispatch } from "redux";
import { ProductDispatchTypes, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_ERROR, SELECTED_PRODUCT, REMOVE_SELECTED_PRODUCT, TOGGLE_CART, TOGGLE_MODAL, SELECTED_OPTION } from "../constants/action-types";
import { IProduct, Option, Variant } from "../constants/product-types";

export const GetProducts = () => async (dispatch: Dispatch<ProductDispatchTypes>) => {
  return await fetch("http://localhost:8000/products", {
    method: "GET",
    headers: { "Content-Type": "application/json" }, 
  }).then((results) => {
    return results.json()
  }).then((res) => {
    for(const prod of res.products) {
      const allOptions = prod.variants.map((variant: Variant) => {
        return variant.selectableOptions
      })
      const flattenedOptions = allOptions.reduce((accumulator: string[], value:string) => accumulator.concat(value), []);

      
      let typesObjectWithValues: object[] = {}

      for(let option of flattenedOptions) {
        typesObjectWithValues[option.type] = []
      }
      for(let option of flattenedOptions) {
        typesObjectWithValues[option.type].push(option.value)
      }
      
      // Write the groupedOptions to the object it came from: 
      prod["groupedOptions"] = typesObjectWithValues; 
    }
    // Dispatch all products: 
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

export const ToggleModal = (product: IProduct) => (dispatch: Dispatch<ProductDispatchTypes>) => {
  dispatch({
    type: TOGGLE_MODAL,
    payload: product
  });
}

export const ToggleCart = (product: IProduct) => (dispatch: Dispatch<ProductDispatchTypes>) => {
  dispatch({
    type: TOGGLE_CART,
    payload: product
  });
}

export const SelectedOption = (option: Option) => (dispatch: Dispatch<ProductDispatchTypes>) => {
  dispatch({
    type: SELECTED_OPTION,
    payload: option
  });
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