import { validEmailRegex } from "../../tests/constants/components.js";
import { stateTypes } from "../../tests/constants/components.js";
import { createNotification } from "./notificationsActions.js";

const url = "http://localhost:3001/api/";

export const invalidAuth = {
  name: "Name too short",
  email: "Invalid email",
  password: "Password too short",
  passwordMismatch: "Password missmatch",
};

export const validAuth = {
  welcome: function (name) {
    return `Welcome to my store, ${name}!`;
  },
  welcomeBack: "Welcome back!",
};

export const initAuth = () => {
  return async (dispatch) => {
    //dispatch(createNotification(stateTypes.auth, "Loading...", "loading"));
    const response = await fetch(`${url}check-status`, {
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
            stateTypes.auth,
            Object.values(data.error)[0],
            "error"
          )
        );
      }
      return dispatch(createNotification(stateTypes.auth, data.error, "error"));
    }

    if (!data.user) {
      dispatch({
        type: "INIT_AUTH",
      });
    } else {
      dispatch({
        type: "INIT_AUTH",
        payload: data.user,
      });
    }
  };
};

export const logIn = (logInCreds) => {
  return async (dispatch) => {
    if (!RegExp(validEmailRegex).test(logInCreds.email)) {
      return dispatch(
        createNotification(stateTypes.auth, invalidAuth.email, "error")
      );
    }

    if (logInCreds.password.length < 10) {
      return dispatch(
        createNotification(stateTypes.auth, invalidAuth.password, "error")
      );
    }
    dispatch(createNotification(stateTypes.auth, "Loading...", "loading"));

    const response = await fetch(`${url}login`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(logInCreds),
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
            stateTypes.auth,
            Object.values(data.error)[0],
            "error"
          )
        );
      }

      return dispatch(createNotification(stateTypes.auth, data.error, "error"));
    }

    dispatch({
      type: "INIT_AUTH",
      payload: data.user,
    });

    dispatch(
      createNotification(stateTypes.auth, validAuth.welcomeBack, "success")
    );
  };
};

export const logOut = () => {
  return async (dispatch) => {
    dispatch(createNotification(stateTypes.auth, "Loading...", "loading"));
    const response = await fetch(`${url}logout`, {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });
    const data = await response.json();

    if (!response.ok) {
      return;
    }

    dispatch({ type: "REMOVE_AUTH" });
    dispatch({ type: "CLEAR_ORDERS" });
    dispatch({ type: "CLEAR_USERS" });
    dispatch(createNotification(stateTypes.auth, data.message, "success"));
  };
};

export const register = (registerCreds) => {
  return async (dispatch) => {
    if (registerCreds.name && registerCreds.name.length < 3) {
      return dispatch(
        createNotification(stateTypes.auth, invalidAuth.name, "error")
      );
    }

    if (!RegExp(validEmailRegex).test(registerCreds.email)) {
      return dispatch(
        createNotification(stateTypes.auth, invalidAuth.email, "error")
      );
    }

    if (registerCreds.password.length < 10) {
      return dispatch(
        createNotification(stateTypes.auth, invalidAuth.password, "error")
      );
    }

    if (registerCreds.password !== registerCreds.passwordConfirmation) {
      return dispatch(
        createNotification(
          stateTypes.auth,
          invalidAuth.passwordMismatch,
          "error"
        )
      );
    }

    dispatch(createNotification(stateTypes.auth, "Loading...", "loading"));

    const response = await fetch(`${url}register`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(registerCreds),
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
            stateTypes.auth,
            Object.values(data.error)[0],
            "error"
          )
        );
      }

      return dispatch(createNotification(stateTypes.auth, data.error, "error"));
    }

    dispatch({
      type: "INIT_AUTH",
      payload: data.user,
    });

    return dispatch(
      createNotification(
        stateTypes.auth,
        validAuth.welcome(data.user.name),
        "success"
      )
    );
  };
};
