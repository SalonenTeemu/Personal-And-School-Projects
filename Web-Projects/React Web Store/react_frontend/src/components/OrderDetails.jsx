import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOrders } from "../redux/actionCreators/ordersActions";

export const OrderDetails = () => {
  const { orderId } = useParams();
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const order = orders.find((order) => order.id === orderId);

  if (!order) {
    return <div>No order found</div>;
  }

  const { items } = order;

  return (
    <div data-testid="inspect-container">
      {items.map(({ product, quantity }) => (
        <li key={product.id} data-testid={`list-item-${product.id}-container`}>
          <h3 data-testid="name-value">{product.name}</h3>
          <p data-testid="quantity-value">Quantity: {quantity}</p>
        </li>
      ))}
    </div>
  );
};
