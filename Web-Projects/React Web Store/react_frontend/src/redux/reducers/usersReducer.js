const usersReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_USER":
      return [action.payload];

    case "GET_USERS":
      return [...action.payload];

    case "CLEAR_USERS":
      return [];

    case "UPDATE_USER":
      return [
        ...state.filter((val) => val.id !== action.payload.id),
        action.payload,
      ];

    case "REMOVE_USER":
      return [...state.filter((val) => val.id !== action.payload.id)];

    default:
      return state;
  }
};

export default usersReducer;
