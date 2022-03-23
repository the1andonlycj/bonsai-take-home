import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const Store = createStore(
  reducers, 
  composeWithDevTools(applyMiddleware(thunk)),
);

export type RootStore = ReturnType<typeof reducers>

export default Store;