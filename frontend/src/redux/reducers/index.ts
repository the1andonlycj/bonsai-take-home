import { combineReducers } from "redux";
import { productListReducer } from "./productListReducer";
import { cartReducer } from "./cartReducer";

const reducers = combineReducers({
  productsList: productListReducer,
  cart: cartReducer
})

export default reducers;