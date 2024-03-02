import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import cartReducer from "./reducers/cartReducer";
import productsReducer from "./reducers/productsReducer";
import authReducer from "./reducers/authReducer";
import ordersReducer from "./reducers/ordersReducer";
import usersReducer from "./reducers/usersReducer";
import notificationsReducer from "./reducers/notificationsReducer";

// Redux-devtools extension library
import { composeWithDevTools } from "@redux-devtools/extension";

export const reducers = combineReducers({
  cart: cartReducer,
  products: productsReducer,
  auth: authReducer,
  orders: ordersReducer,
  users: usersReducer,
  notifications: notificationsReducer,
});

export default legacy_createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);
