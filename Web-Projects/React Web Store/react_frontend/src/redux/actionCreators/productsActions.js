import { createNotification } from "./notificationsActions";
import { stateTypes } from "../../tests/constants/components.js";

const url = "http://localhost:3001/api/";

export const productMsg = {
  loaded: "Product(s) loaded.",
  added: "Product added.",
  updated: "Product updated.",
  deleted: "Product deleted.",
};

export const getProduct = (productId) => {
  return async (dispatch) => {
    dispatch(createNotification(stateTypes.product, "Loading...", "loading"));
    const response = await fetch(`${url}products/${productId}`, {
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
            stateTypes.product,
            Object.values(data.error)[0],
            "error"
          )
        );
      }
      return dispatch(
        createNotification(stateTypes.product, data.error, "error")
      );
    }

    dispatch({
      type: "GET_PRODUCT",
      payload: data,
    });
    dispatch(
      createNotification(stateTypes.product, productMsg.loaded, "success")
    );
  };
};

export const getProducts = () => {
  return async (dispatch) => {
    dispatch(createNotification(stateTypes.product, "Loading...", "loading"));
    const response = await fetch(`${url}products`, {
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
            stateTypes.product,
            Object.values(data.error)[0],
            "error"
          )
        );
      }
      return dispatch(
        createNotification(stateTypes.product, data.error, "error")
      );
    }

    dispatch({
      type: "GET_PRODUCTS",
      payload: data,
    });
    dispatch(
      createNotification(stateTypes.product, productMsg.loaded, "success")
    );
  };
};

export const addProduct = (productToAdd) => {
  return async (dispatch) => {
    dispatch(createNotification(stateTypes.product, "Loading...", "loading"));
    const response = await fetch(`${url}products`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(productToAdd),
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
            stateTypes.product,
            Object.values(data.error)[0],
            "error"
          )
        );
      }

      return dispatch(
        createNotification(stateTypes.product, data.error, "error")
      );
    }

    dispatch({
      type: "ADD_PRODUCT",
      payload: data,
    });

    dispatch(
      createNotification(stateTypes.product, productMsg.added, "success")
    );
  };
};

export const updateProduct = (productToUpdate) => {
  return async (dispatch) => {
    dispatch(createNotification(stateTypes.product, "Loading...", "loading"));
    const response = await fetch(`${url}products/${productToUpdate.id}`, {
      credentials: "include",
      method: "PUT",
      body: JSON.stringify(productToUpdate),
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
            stateTypes.product,
            Object.values(data.error)[0],
            "error"
          )
        );
      }

      return dispatch(
        createNotification(stateTypes.product, data.error, "error")
      );
    }

    dispatch({
      type: "UPDATE_PRODUCT",
      payload: data,
    });

    dispatch(
      createNotification(stateTypes.product, productMsg.updated, "success")
    );
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    dispatch(createNotification(stateTypes.product, "Loading...", "loading"));
    const response = await fetch(`${url}products/${productId}`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    });
    const data = await response.json();

    if (!response.ok) {
      if (typeof data.error === "object") {
        return dispatch(
          createNotification(
            stateTypes.product,
            Object.values(data.error)[0],
            "error"
          )
        );
      }

      return dispatch(
        createNotification(stateTypes.product, data.error, "error")
      );
    }

    dispatch({
      type: "DELETE_PRODUCT",
      payload: data,
    });

    dispatch(
      createNotification(stateTypes.product, productMsg.deleted, "success")
    );
  };
};
