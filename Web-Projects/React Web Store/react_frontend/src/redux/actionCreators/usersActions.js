import { createNotification } from "./notificationsActions.js";
import { stateTypes } from "../../tests/constants/components.js";

const url = "http://localhost:3001/api/";

const userMsg = {
  gotUser: "Single user received",
  gotUsers: "Users received",
  updateUser: "User updated.",
  delete: "User deleted successfully",
};

export const getUser = (userId) => {
  return async (dispatch) => {
    dispatch(createNotification(stateTypes.user, "Loading...", "loading"));
    const response = await fetch(`${url}users/${userId}`, {
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
            stateTypes.user,
            Object.values(data.error)[0],
            "error"
          )
        );
      }

      return dispatch(createNotification(stateTypes.user, data.error, "error"));
    }

    dispatch({
      type: "GET_USER",
      payload: data,
    });
    dispatch(createNotification(stateTypes.user, userMsg.gotUser, "success"));
  };
};

export const getUsers = () => {
  return async (dispatch) => {
    dispatch(createNotification(stateTypes.user, "Loading...", "loading"));
    const response = await fetch(`${url}users`, {
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
            stateTypes.user,
            Object.values(data.error)[0],
            "error"
          )
        );
      }
      return dispatch(createNotification(stateTypes.user, data.error, "error"));
    }

    dispatch({
      type: "GET_USERS",
      payload: data,
    });
    dispatch(createNotification(stateTypes.user, userMsg.gotUsers, "success"));
  };
};

export const updateUser = (updatedUser) => {
  return async (dispatch) => {
    dispatch(createNotification(stateTypes.user, "Loading...", "loading"));
    const response = await fetch(`${url}users/${updatedUser.id}`, {
      credentials: "include",
      method: "PUT",
      body: JSON.stringify(updatedUser),
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
            stateTypes.user,
            Object.values(data.error)[0],
            "error"
          )
        );
      }

      return dispatch(createNotification(stateTypes.user, data.error, "error"));
    } else {
      dispatch({
        type: "UPDATE_USER",
        payload: data,
      });

      dispatch(
        createNotification(stateTypes.user, userMsg.updateUser, "success")
      );
    }
  };
};

export const removeUser = (userId) => {
  return async (dispatch) => {
    dispatch(createNotification(stateTypes.user, "Loading...", "loading"));
    const response = await fetch(`${url}users/${userId}`, {
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
            stateTypes.user,
            Object.values(data.error)[0],
            "error"
          )
        );
      }
      return dispatch(createNotification(stateTypes.user, data.error, "error"));
    }

    dispatch({
      type: "REMOVE_USER",
      payload: data,
    });

    dispatch(createNotification(stateTypes.user, userMsg.delete, "success"));
  };
};
