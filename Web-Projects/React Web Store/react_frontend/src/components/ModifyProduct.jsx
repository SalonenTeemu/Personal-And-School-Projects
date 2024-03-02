import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateProduct } from "../redux/actionCreators/productsActions.js";

const handleSubmit =
  (dispatch, productId, nameNew, priceNew, descriptionNew, navigate) => (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        id: productId,
        name: nameNew,
        price: priceNew,
        description: descriptionNew,
      })
    );
    navigate(-1);
  };

const handleCancel = (navigate) => (e) => {
  e.preventDefault();
  navigate(-1);
};

const handleSetName = (setName) => (e) => {
  setName(e.target.value);
};

const handleSetPrice = (setPrice) => (e) => {
  setPrice(e.target.value);
};

const handleSetDescription = (setDescription) => (e) => {
  setDescription(e.target.value);
};

export const ModifyProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const product = useSelector((state) =>
    state.products.find((product) => product.id === productId)
  );
  const { name, price, description } = product;

  const [nameNew, setName] = useState(name);
  const [priceNew, setPrice] = useState(price);
  const [descriptionNew, setDescription] = useState(description);

  return (
    <div data-testid="form-container">
      Modify product
      <form
        onSubmit={handleSubmit(
          dispatch,
          productId,
          nameNew,
          priceNew,
          descriptionNew,
          navigate
        )}
      >
        <div data-testid="id-value">ID: {productId}</div>
        <input
          type="text"
          placeholder="Name"
          value={nameNew}
          onChange={handleSetName(setName)}
          data-testid="name-input"
        />
        <textarea
          placeholder="Description"
          value={descriptionNew}
          onChange={handleSetDescription(setDescription)}
          data-testid="description-input"
        />
        <input
          type="number"
          placeholder="Price"
          value={priceNew}
          onChange={handleSetPrice(setPrice)}
          data-testid="price-input"
        />
        <button type="submit" data-testid="submit">
          Submit
        </button>
        <button onClick={handleCancel(navigate)} data-testid="cancel">
          Cancel
        </button>
      </form>
    </div>
  );
};
