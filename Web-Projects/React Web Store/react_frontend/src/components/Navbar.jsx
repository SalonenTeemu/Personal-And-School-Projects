import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../redux/actionCreators/authActions.js";

const AllLinks = {
  admin: ["Orders", "Users"],
  customer: ["Orders", "Cart"],
  guest: ["Cart", "Login", "Register"],
};

const logOutClick = (dispatch) => (e) => {
  e.preventDefault();
  dispatch(logOut());
};

export const Navbar = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth).role;
  const [links, setLinks] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const createLinks = (list) => {
    return list.map((val) => {
      const lowerVal = val.toLowerCase();
      return (
        <Link
          to={`/${lowerVal}`}
          key={`${lowerVal}-link`}
          data-testid={`${lowerVal}-link`}
        >
          {val}
        </Link>
      );
    });
  };

  useEffect(() => {
    const roleLinks = AllLinks[role] || AllLinks["guest"];
    setLinks(createLinks(roleLinks));
    setLoggedIn(role && (role === "customer" || role === "admin"));
  }, [role]);

  return (
    <div data-testid="navbar-container">
      <Link to="/" data-testid="home-link">
        Home
      </Link>
      <Link to="/products" data-testid="products-link">
        Products
      </Link>

      {links}

      {isLoggedIn && (
        <Link data-testid="logout" onClick={logOutClick(dispatch)}>
          Logout
        </Link>
      )}
      <div data-testid="profile-container">
        <div data-testid="role-value">Role: {role}</div>
      </div>
    </div>
  );
};
