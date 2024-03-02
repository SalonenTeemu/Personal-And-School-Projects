import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { initApp } from "./redux/actionCreators/appActions.js";
import { Navbar } from "./components/Navbar.jsx";
import { Notifications } from "./components/Notifications.jsx";
import { Home } from "./components/Home.jsx";
import { Auth } from "./components/Auth.jsx";
import { Products } from "./components/Products.jsx";
import { ProductDetails } from "./components/ProductDetails.jsx";
import { ModifyProduct } from "./components/ModifyProduct.jsx";
import { Cart } from "./components/Cart.jsx";
import { Orders } from "./components/Orders.jsx";
import { OrderDetails } from "./components/OrderDetails.jsx";
import { Register } from "./components/Register.jsx";
import { Login } from "./components/Login.jsx";
import { Users } from "./components/Users.jsx";
import { UserDetails } from "./components/UserDetails.jsx";
import { ModifyUser } from "./components/ModifyUser.jsx";
import { NotFound } from "./components/NotFound.jsx";
import defaultStyles from "./styles.js";

const allAuthRoles = ["admin", "customer", "guest"];
const guestCustomerAuthRoles = ["guest", "customer"];
const adminCustomerAuthRoles = ["admin", "customer"];
const guestAuthRoles = ["guest"];
const adminAuthRoles = ["admin"];

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initApp());
  }, [dispatch]);

  return (
    <div data-testid="app-container">
      <style>{defaultStyles}</style>
      <Navbar />
      <hr />
      <Notifications />
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* All */}
        <Route path="" element={<Auth authRoles={allAuthRoles} />}>
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
        </Route>

        {/* Guest & Customer */}
        <Route path="" element={<Auth authRoles={guestCustomerAuthRoles} />}>
          <Route path="/cart" element={<Cart />} />
        </Route>

        {/* Admin & Customer */}
        <Route path="" element={<Auth authRoles={adminCustomerAuthRoles} />}>
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:orderId" element={<OrderDetails />} />
        </Route>

        {/* Guest */}
        <Route path="" element={<Auth authRoles={guestAuthRoles} />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Only admin */}
        <Route path="" element={<Auth authRoles={adminAuthRoles} />}>
          <Route path="/users" element={<Users />} />
          <Route path="/users/:userId" element={<UserDetails />} />
          <Route path="/users/:userId/modify" element={<ModifyUser />} />
          <Route
            path="/products/:productId/modify"
            element={<ModifyProduct />}
          />
        </Route>

        {/* Not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
