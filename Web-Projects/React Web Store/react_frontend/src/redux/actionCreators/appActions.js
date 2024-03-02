import { initAuth } from "./authActions.js";
import { initCart } from "./cartActions.js";

export const initApp = () => {
  return (dispatch) => {
    dispatch(initCart());
    dispatch(initAuth());
  };
};
