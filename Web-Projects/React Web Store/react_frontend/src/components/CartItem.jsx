import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  decrementCartItem,
  incrementCartItem,
  removeCartItem,
} from "../redux/actionCreators/cartActions.js";

const decrementQuantity = (dispatch, product, quantity) => (e) => {
  e.preventDefault();

  if (quantity > 1) {
    dispatch(decrementCartItem(product.id));
  } else {
    dispatch(removeCartItem(product));
  }
};

const incrementQuantity = (dispatch, productId) => (e) => {
  e.preventDefault();
  dispatch(incrementCartItem(productId));
};

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { product, quantity } = item;

  return (
    <div
      data-testid={`list-item-${product.id}-container`}
      key={`cart-item-${product.id}`}
    >
      <Link to={`/products/${product.id}`} data-testid={`name-value`}>
        {product.name}
      </Link>
      <p data-testid={`price-value`}>{product.price}</p>
      <p data-testid={`quantity-value`}>quantity: {quantity}</p>
      <button
        data-testid={`reduce`}
        onClick={decrementQuantity(dispatch, product, quantity)}
      >
        Reduce
      </button>
      <button
        data-testid={`add`}
        onClick={incrementQuantity(dispatch, product.id)}
      >
        Add
      </button>
      <hr />
    </div>
  );
};

export default CartItem;
