/** @format
 * Student instructions:
 * Use the given template with props to create a AuthUser component similar to the AuthUser component in the Vue exercise. Instead of using a template, use JSX.
 *
 * isLoggedIn is a prop boolean that indicates if the user is logged in or not.
 * onLogin is a prop function that will be called when the form is submitted and user is in "login" view. It should be called with the username and password as arguments.
 * onRegister is a prop function that will be called when the form is submitted and user is in the "register" view. It should be called with the username and password as arguments.
 * onLogout is a prop function that will be called when the logout link is clicked. It should be called with no arguments.
 *
 * REMEMBER: use the same ids, classes and attributes as in the Vue exercise in the same places to pass the tests.
 */

import { useState } from "react";

export const AuthUser = ({ isLoggedIn, onLogin, onRegister, onLogout }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);

  const toggleRegister = () => {
    setIsRegistering(true);
    setIsLoggingIn(false);
  };

  const toggleLogin = () => {
    setIsRegistering(false);
    setIsLoggingIn(true);
  };

  const submitForm = (event) => {
    event.preventDefault();
    if (isLoggingIn) {
      onLogin(username, password);
    } else {
      onRegister(username, password);
    }
    setUsername("");
    setPassword("");
  };

  const logoutUser = () => {
    onLogout();
  };

  return (
    <div>
      {/* Form for login/register */}
      {(!isLoggedIn && isLoggingIn) || (!isLoggedIn && isRegistering) ? (
        <form className="auth-form" id="auth-form" onSubmit={submitForm}>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            name="auth-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="auth-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-auth">
            {isLoggingIn ? "Login" : "Register"}
          </button>
        </form>
      ) : null}

      {/* Links to toggle between login/register and logout */}
      {!isLoggedIn && !isRegistering ? (
        <a href="#" className="link" onClick={toggleRegister}>
          Go to register
        </a>
      ) : null}
      {!isLoggedIn && isRegistering ? (
        <a href="#" className="link" onClick={toggleLogin}>
          Go to login
        </a>
      ) : null}
      {isLoggedIn ? (
        <a href="#" className="link" onClick={logoutUser}>
          Logout
        </a>
      ) : null}
    </div>
  );
};
