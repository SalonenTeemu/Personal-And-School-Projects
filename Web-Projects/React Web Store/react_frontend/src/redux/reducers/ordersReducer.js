const ordersReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ORDER":
      return [action.payload];

    case "GET_ORDERS":
      return [...action.payload];

    case "CLEAR_ORDERS":
      return [];

    case "ADD_ORDER":
      return [...state, action.payload];

    default:
      return state;
  }
};

export default ordersReducer;