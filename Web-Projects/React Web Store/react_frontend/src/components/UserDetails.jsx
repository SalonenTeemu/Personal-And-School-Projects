import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { removeUser } from "../redux/actionCreators/usersActions.js";

const handleDelete = (dispatch, userId, navigate) => (e) => {
  e.preventDefault();
  dispatch(removeUser(userId));
  navigate(-1);
};

export const UserDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const user = useSelector((state) =>
    state.users.find((user) => user.id === userId)
  );
  const authUser = useSelector((state) => state.auth);

  if (!user) {
    return <div>No user found</div>;
  }

  return (
    <div data-testid="inspect-container">
      <div data-testid="name-value">Name: {user.name}</div>
      <div data-testid="role-value">Role: {user.role}</div>
      <div data-testid="email-value">Email: {user.email}</div>
      {!authUser ||
        (authUser.id !== user.id && (
          <>
            <Link to={`/users/${user.id}/modify`} data-testid="modify">
              Modify
            </Link>
            <button
              onClick={handleDelete(dispatch, user.id, navigate)}
              data-testid="delete"
            >
              Delete
            </button>
          </>
        ))}
    </div>
  );
};
