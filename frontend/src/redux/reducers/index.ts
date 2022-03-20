import { combineReducers } from "redux";
import { productListReducer } from "./productListReducer";

const reducers = combineReducers({
  productsList: productListReducer,
})

export default reducers;