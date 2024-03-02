import { emptyCart } from "./cartActions";
import { createNotification } from "./notificationsActions.js";
import { stateTypes } from "../../tests/constants/components.js";

const url = "http://localhost:3001/api/";

const orderMsg = {
  newOrder: "New order made.",
  loaded: "Order(s) loaded.",
};

export const getOrder = (orderId) => {
  return async (dispatch) => {
    dispatch(createNotification(stateTypes.order, "Loading...", "loading"));
    const response = await fetch(`${url}orders/${orderId}`, {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });
    const data = await response.json();

    if (!response.ok) {
      if (typeof data.error === "object") {
        return dispatch(
          createNotification(
            stateTypes.order,
            Object.values(data.error)[0],
            "error"
          )
        );
      }
      return dispatch(
        createNotification(stateTypes.order, data.error, "error")
      );
    }

    dispatch({
      type: "GET_ORDER",
      payload: data,
    });
    dispatch(createNotification(stateTypes.order, orderMsg.loaded, "success"));
  };
};

export const getOrders = () => {
  return async (dispatch) => {
    dispatch(createNotification(stateTypes.order, "Loading...", "loading"));
    const response = await fetch(`${url}orders`, {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });
    const data = await response.json();

    if (!response.ok) {
      if (typeof data.error === "object") {
        return dispatch(
          createNotification(
            stateTypes.order,
            Object.values(data.error)[0],
            "error"
          )
        );
      }
      return dispatch(
        createNotification(stateTypes.order, data.error, "error")
      );
    }

    dispatch({
      type: "GET_ORDERS",
      payload: data,
    });
    dispatch(createNotification(stateTypes.order, orderMsg.loaded, "success"));
  };
};

export const addOrder = (newOrder) => {
  return async (dispatch) => {
    dispatch(createNotification(stateTypes.order, "Loading...", "loading"));
    const response = await fetch(`${url}orders`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    });
    const data = await response.json();

    if (!response.ok) {
      if (typeof data.error === "object") {
        return dispatch(
          createNotification(
            stateTypes.order,
            Object.values(data.error)[0],
            "error"
          )
        );
      }
      return dispatch(
        createNotification(stateTypes.order, data.error, "error")
      );
    } else {
      dispatch(emptyCart());
      dispatch({
        type: "ADD_ORDER",
        payload: data,
      });
      dispatch(
        createNotification(stateTypes.order, orderMsg.newOrder, "success")
      );
    }
  };
};
