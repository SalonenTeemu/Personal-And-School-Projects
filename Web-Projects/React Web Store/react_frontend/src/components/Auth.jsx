import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export const Auth = ({ authRoles }) => {
  const role = useSelector((state) => state.auth).role;
  const [isAuthrorized, setAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!role || (role === "guest" && !authRoles.includes("guest"))) {
      setAuthorized(false);
      navigate("/login");
    } else if (role && !authRoles.includes(role)) {
      setAuthorized(false);
      navigate("/");
    } else if (role && authRoles.includes(role)) {
      setAuthorized(true);
    }
  }, [role, authRoles, navigate]);

  if (isAuthrorized) {
    return <Outlet />;
  }

  return null;
};
