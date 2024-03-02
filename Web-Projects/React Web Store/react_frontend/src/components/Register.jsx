import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../redux/actionCreators/authActions.js";

const handleSubmit = (dispatch, formData) => (e) => {
  e.preventDefault();
  dispatch(register(formData));
};

const handleChange = (setState) => (e) => {
  setState(e.target.value);
};

export const Register = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  return (
    <div data-testid="form-container">
      <form
        onSubmit={handleSubmit(dispatch, {
          name,
          email,
          password,
          passwordConfirmation,
        })}
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={handleChange(setName)}
          data-testid="name-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChange(setEmail)}
          data-testid="email-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleChange(setPassword)}
          data-testid="password-input"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={passwordConfirmation}
          onChange={handleChange(setPasswordConfirmation)}
          data-testid="passwordConfirmation-input"
        />
        <button type="submit" data-testid="submit">
          Register
        </button>
      </form>
    </div>
  );
};
