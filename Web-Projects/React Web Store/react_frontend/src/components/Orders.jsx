import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../redux/actionCreators/ordersActions.js";

export const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  useEffect(() => {
    if (!orders || orders.length === 0) {
      dispatch(getOrders());
    }
  }, []);

  const renderOrders = () => {
    if (orders.length === 0) {
      return <div data-testid="empty-container">No orders exist</div>;
    } else {
      return (
        <div>
          {orders.map((order) => (
            <div key={order.id} data-testid={`list-item-${order.id}-container`}>
              <div data-testid="id-value">ID of the order: {order.id}</div>
              <Link
                to={`/orders/${order.id}`}
                data-testid={`inspect-${order.id}-link`}
              >
                Inspect Order
              </Link>
            </div>
          ))}
        </div>
      );
    }
  };

  return <div data-testid="main-container">{renderOrders()}</div>;
};
