import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateUser } from "../redux/actionCreators/usersActions.js";

const handleSubmit = (dispatch, id, newRole, navigate) => (e) => {
  e.preventDefault();
  dispatch(updateUser({ id, role: newRole }));
  navigate(-1);
};

const handleCancel = (navigate) => (e) => {
  e.preventDefault();
  navigate(-1);
};

const handleSetNewRole = (setNewRole) => (e) => {
  setNewRole(e.target.value);
};

export const ModifyUser = () => {
  const { userId } = useParams();
  const user = useSelector((state) =>
    state.users.find((user) => user.id === userId)
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [newRole, setNewRole] = useState(user ? user.role : "");

  if (!user) {
    return <div>No user found</div>;
  }

  return (
    <div data-testid="form-container">
      <form onSubmit={handleSubmit(dispatch, user.id, newRole, navigate)}>
        <div data-testid="name-value">Name: {user.name}</div>
        <select
          value={newRole}
          onChange={handleSetNewRole(setNewRole)}
          data-testid="role-select"
        >
          <option value="customer">customer</option>
          <option value="admin">admin</option>
        </select>
        <button
          type="submit"
          disabled={newRole === user.role}
          data-testid="submit"
        >
          Submit
        </button>
        <button onClick={handleCancel(navigate)} data-testid="cancel">
          Cancel
        </button>
      </form>
    </div>
  );
};
