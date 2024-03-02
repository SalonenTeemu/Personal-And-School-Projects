import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/actionCreators/productsActions";

const addProductClickHandler =
  (dispatch, name, price, description, openHandler) => () => {
    dispatch(addProduct({ price, name, description }));
    openHandler();
  };

const handleNameChange = (setName) => (e) => {
  setName(e.target.value);
};

const handlePriceChange = (setPrice) => (e) => {
  setPrice(e.target.value);
};

const handleDescriptionChange = (setDescription) => (e) => {
  setDescription(e.target.value);
};

const handeSubmit = () => {
  return (e) => {
    e.preventDefault();
  };
};

const handleCancelClick = (openHandler) => () => {
  openHandler();
};

export const ProductAdder = ({ open, openHandler }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  if (!open) {
    return null;
  }

  return (
    <form data-testid="form-container" onSubmit={handeSubmit}>
      <label>
        Name:
        <input
          data-testid="name-input"
          type="text"
          required
          value={name}
          onChange={handleNameChange(setName)}
        />
      </label>
      <br />
      <label>
        Price:
        <input
          data-testid="price-input"
          type="number"
          required
          value={price}
          onChange={handlePriceChange(setPrice)}
        />
      </label>
      <br />
      <label>
        Description:
        <input
          data-testid="description-input"
          type="text"
          required
          value={description}
          onChange={handleDescriptionChange(setDescription)}
        />
      </label>
      <br />
      <button
        data-testid="submit"
        onClick={addProductClickHandler(
          dispatch,
          name,
          price,
          description,
          openHandler
        )}
      >
        Add product
      </button>
      <button data-testid="cancel" onClick={handleCancelClick(openHandler)}>
        Cancel
      </button>
    </form>
  );
};
