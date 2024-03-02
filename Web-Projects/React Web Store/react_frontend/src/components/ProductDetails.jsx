import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  addCartItem,
  incrementCartItem,
} from "../redux/actionCreators/cartActions.js";
import { deleteProduct } from "../redux/actionCreators/productsActions.js";

const handleDelete = (dispatch, productId, navigate) => () => {
  dispatch(deleteProduct(productId));
  navigate("/products");
};

const handleAddToCart = (dispatch, productId, product, cart) => () => {
  const productInCart = cart.find((val) => val.product.id === productId);

  if (productInCart) {
    dispatch(incrementCartItem(productId));
  } else {
    dispatch(addCartItem({ product, quantity: 1 }));
  }
};

const handleModify = (navigate, productId) => () => {
  navigate(`/products/${productId}/modify`);
};

export const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const product = useSelector((state) =>
    state.products.find((product) => product.id === productId)
  );
  const cart = useSelector((state) => state.cart);
  const role = useSelector((state) => state.auth).role;
  const isAdmin = role && role === "admin";

  return (
    <div data-testid="inspect-container">
      <h3 data-testid="name-value">{product.name}</h3>
      <div data-testid="description-value">{product.description}</div>
      <div data-testid="price-value">Price: {product.price}</div>
      {isAdmin ? (
        <div>
          <button
            onClick={handleDelete(dispatch, productId, navigate)}
            data-testid="delete"
          >
            Delete
          </button>
          <button
            onClick={handleModify(navigate, productId)}
            data-testid="modify"
          >
            Modify
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart(dispatch, productId, product, cart)}
          data-testid="add"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};
