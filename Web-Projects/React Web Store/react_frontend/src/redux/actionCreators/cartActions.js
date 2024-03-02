import { createNotification } from "./notificationsActions";
import { stateTypes } from "../../tests/constants/components.js";

const cartMsg = {
  add: "New cart item added.",
  update: "Cart item amount updated.",
};

export const initCart = () => {
  const cartLocal = localStorage.getItem("cart");

  if (cartLocal) {
    return {
      type: "INIT_CART",
      payload: JSON.parse(cartLocal),
    };
  }

  return { type: "INIT_CART" };
};

export const addCartItem = (product) => {
  return (dispatch) => {
    const cartLocal = localStorage.getItem("cart");

    if (!cartLocal) {
      localStorage.setItem("cart", JSON.stringify([product]));
    } else {
      const cart = JSON.parse(cartLocal);
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    dispatch({
      type: "ADD_CART_ITEM",
      payload: product,
    });
    dispatch(createNotification(stateTypes.cart, cartMsg.add, "success"));
  };
};

export const removeCartItem = (product) => {
  const cartLocal = localStorage.getItem("cart");

  if (cartLocal) {
    const cart = JSON.parse(cartLocal);
    const newCart = cart.filter((item) => item.product.id !== product.id);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  return {
    type: "REMOVE_CART_ITEM",
    payload: product,
  };
};

export const incrementCartItem = (productId) => {
  return (dispatch) => {
    const cartLocal = localStorage.getItem("cart");

    if (cartLocal) {
      const cart = JSON.parse(cartLocal);
      const newCart = cart.map((item) => {
        if (item.product.id === productId) {
          item.amount += 1;
        }

        return item;
      });
      localStorage.setItem("cart", JSON.stringify(newCart));
    }

    dispatch({
      type: "UPDATE_CART_ITEM_AMOUNT",
      payload: { productId, amount: 1 },
    });

    dispatch(createNotification(stateTypes.cart, cartMsg.update, "success"));
  };
};

export const decrementCartItem = (productId) => {
  return (dispatch) => {
    const cartLocal = localStorage.getItem("cart");

    if (cartLocal) {
      const cart = JSON.parse(cartLocal);
      const newCart = cart.map((item) => {
        if (item.product.id === productId) {
          item.amount -= 1;
        }

        return item;
      });
      localStorage.setItem("cart", JSON.stringify(newCart));
    }

    dispatch({
      type: "UPDATE_CART_ITEM_AMOUNT",
      payload: { productId, amount: -1 },
    });
    dispatch(createNotification(stateTypes.cart, cartMsg.update, "success"));
  };
};

export const emptyCart = () => {
  localStorage.removeItem("cart");
  return { type: "EMPTY_CART" };
};
