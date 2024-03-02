import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNotification } from "../redux/actionCreators/notificationsActions.js";
import { addOrder } from "../redux/actionCreators/ordersActions.js";
import CartItem from "./CartItem.jsx";
import { stateTypes } from "../tests/constants/components.js";

const orderClick = (auth, cart, dispatch, navigate) => (e) => {
  e.preventDefault();

  if (!auth || !auth.role || auth.role === "guest") {
    dispatch(
      createNotification(stateTypes.auth, "Authentication required", "error")
    );
    navigate("/login");
  } else {
    const order = {
      customerId: auth.id,
      items: cart.map((val) => {
        delete val.product.image;
        delete val.amount;
        return val;
      }),
    };

    dispatch(addOrder(order));
  }
};

export const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  const handleClick = orderClick(auth, cart, dispatch, navigate);

  const cartItems = cart.map((val) => <CartItem item={val} key={val.id} />);

  return (
    <div data-testid="main-container">
      {cartItems.length === 0 ? (
        <div data-testid="empty-container">No items in the cart</div>
      ) : (
        <div>
          {cartItems}
          <button data-testid="submit" onClick={handleClick}>
            Make Order
          </button>
        </div>
      )}
    </div>
  );
};
