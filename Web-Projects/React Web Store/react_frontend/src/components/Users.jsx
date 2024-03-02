import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, removeUser } from "../redux/actionCreators/usersActions.js";

const handleDelete = (dispatch, userId) => {
  return (e) => {
    e.preventDefault();
    dispatch(removeUser(userId));
  };
};

const renderUsers = (users, authUser, dispatch) => {
  if (users.length === 0) {
    return <div data-testid="empty-container">No users exist</div>;
  } else {
    return (
      <>
        {users.map((user) => (
          <div key={user.id} data-testid={`list-item-${user.id}-container`}>
            <div data-testid="name-value">Name: {user.name}</div>
            <div data-testid="role-value">Role: {user.role}</div>
            <Link
              to={`/users/${user.id}`}
              data-testid={`inspect-${user.id}-link`}
            >
              Inspect User
            </Link>
            {!authUser ||
              (authUser.id !== user.id && (
                <>
                  <Link to={`/users/${user.id}/modify`} data-testid="modify">
                    Modify
                  </Link>
                  <button
                    onClick={handleDelete(dispatch, user.id)}
                    data-testid="delete"
                  >
                    Delete
                  </button>
                </>
              ))}
            <hr />
          </div>
        ))}
      </>
    );
  }
};

export const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const authUser = useSelector((state) => state.auth);

  useEffect(() => {
    if (!users || users.length === 0) {
      dispatch(getUsers());
    }
  });

  return (
    <div data-testid="main-container">
      {renderUsers(users, authUser, dispatch)}
    </div>
  );
};
