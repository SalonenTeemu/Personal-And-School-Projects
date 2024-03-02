const cartReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_CART":
      if (action.payload) {
        return [...action.payload];
      }

      return state;

    case "ADD_CART_ITEM":
      return [...state, action.payload];

    case "REMOVE_CART_ITEM":
      return [...state.filter((val) => val.product.id !== action.payload.id)];

    case "UPDATE_CART_ITEM_AMOUNT":
      return [
        ...state.map((val) => {
          if (val.product.id === action.payload.productId) {
            val.quantity += action.payload.amount;
          }

          return val;
        }),
      ];

    case "EMPTY_CART":
      return [];

    default:
      return state;
  }
};

export default cartReducer;
