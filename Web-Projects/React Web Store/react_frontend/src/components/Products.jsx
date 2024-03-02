import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getProducts,
  deleteProduct,
} from "../redux/actionCreators/productsActions.js";
import { ProductAdder } from "./ProductAdder.jsx";
import {
  addCartItem,
  incrementCartItem,
} from "../redux/actionCreators/cartActions.js";

const openAdderClick = (setAdderOpen) => {
  return (e) => {
    e.preventDefault();
    setAdderOpen((prevOpen) => !prevOpen);
  };
};

const closeAdder = (setAdderOpen) => {
  return (e) => {
    e.preventDefault();
    setAdderOpen(false);
  };
};

const handleAddToCart = (dispatch, cart, product) => {
  return (e) => {
    e.preventDefault();
    const productInCart = cart.find((val) => val.product.id === product.id);

    if (productInCart) {
      dispatch(incrementCartItem(product.id));
    } else {
      dispatch(addCartItem({ product, quantity: 1 }));
    }
  };
};

const handleDelete = (dispatch, productId) => {
  return (e) => {
    e.preventDefault();
    dispatch(deleteProduct(productId));
  };
};

const renderProducts = (
  products,
  isAdmin,
  handleAddToCart,
  handleDelete,
  dispatch,
  cart
) => {
  if (products.length === 0) {
    return <div data-testid="empty-container">No products exist</div>;
  } else {
    return (
      <ul>
        {products.map((product) => (
          <div
            key={product.id}
            data-testid={`list-item-${product.id}-container`}
          >
            <div data-testid="name-value">{product.name}</div>
            <div data-testid="price-value">Price: {product.price}</div>
            <Link
              to={`/products/${product.id}`}
              data-testid={`inspect-${product.id}-link`}
            >
              Inspect Product
            </Link>
            {!isAdmin ? (
              <button
                onClick={handleAddToCart(dispatch, cart, product)}
                data-testid="add"
              >
                Add to Cart
              </button>
            ) : (
              <>
                <Link
                  to={`/products/${product.id}/modify`}
                  data-testid="modify"
                >
                  Modify
                </Link>
                <button
                  onClick={handleDelete(dispatch, product.id)}
                  data-testid="delete"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </ul>
    );
  }
};

export const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [adderOpen, setAdderOpen] = useState(false);
  const role = useSelector((state) => state.auth).role;
  const isAdmin = role && role === "admin";
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(getProducts());
    }
  }, [dispatch, products]);

  return (
    <div data-testid="main-container">
      {renderProducts(
        products,
        isAdmin,
        handleAddToCart,
        handleDelete,
        dispatch,
        cart
      )}
      {isAdmin && (
        <button data-testid="add" onClick={openAdderClick(setAdderOpen)}>
          {(adderOpen && "Close") || "Add New Product"}
        </button>
      )}
      {isAdmin && adderOpen && (
        <ProductAdder open={adderOpen} openHandler={closeAdder(setAdderOpen)} />
      )}
    </div>
  );
};
