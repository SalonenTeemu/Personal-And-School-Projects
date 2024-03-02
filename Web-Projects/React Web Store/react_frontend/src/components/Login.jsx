import { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../redux/actionCreators/authActions.js";

const handleSubmit =
  (dispatch, email, password, setEmail, setPassword) => (e) => {
    e.preventDefault();
    dispatch(logIn({ email, password }));
    setEmail("");
    setPassword("");
  };

const handleEmailChange = (setEmail) => (e) => {
  setEmail(e.target.value);
};

const handlePasswordChange = (setPassword) => (e) => {
  setPassword(e.target.value);
};

export const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div data-testid="main-container">
      <div data-testid="form-container">
        <form
          onSubmit={handleSubmit(
            dispatch,
            email,
            password,
            setEmail,
            setPassword
          )}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange(setEmail)}
            data-testid="email-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange(setPassword)}
            data-testid="password-input"
          />
          <button type="submit" data-testid="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
