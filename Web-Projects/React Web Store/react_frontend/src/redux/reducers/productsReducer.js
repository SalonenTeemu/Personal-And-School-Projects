const productsReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_PRODUCT":
      return [action.payload];

    case "GET_PRODUCTS":
      return [...action.payload];

    case "ADD_PRODUCT":
      return [action.payload, ...state];

    case "UPDATE_PRODUCT":
      return [
        ...state.filter((val) => val.id !== action.payload.id),
        action.payload,
      ];

    case "DELETE_PRODUCT":
      return [...state.filter((val) => val.id !== action.payload.id)];

    default:
      return state;
  }
};

export default productsReducer;
