import { ActionTypes } from "../constants/action-types";

interface IInitialState {

}

const initialState: IInitialState = {
  products: [],
}

export const productListReducer = (state: IInitialState = initialState, {type, payload} : any) : IInitialState => {
  switch (type) {
    case ActionTypes.SET_PRODUCTS:
      return {...state, products: payload}; 
    default:
      return state;
  }
};

