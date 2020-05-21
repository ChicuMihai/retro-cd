const initialState = {
  products: [],
  quantity: {}
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ORDER_SUCCESS":
      return initialState;
    case "ADD_PRODUCT_CART":
      if (
        state.products.filter(el => el.id === action.payload.id).length >= 1
      ) {
        return {
          ...state,
          quantity: {
            ...state.quantity,
            [action.payload.id]: state.quantity[action.payload.id] + 1
          }
        };
      } else
        return {
          ...state,
          products: [...state.products, action.payload],
          quantity: { ...state.quantity, [action.payload.id]: 1 }
        };

    case "REMOVE_PRODUCT_CART":
      if (state.quantity.hasOwnProperty(action.payload)) {
        if (state.quantity[action.payload] - 1 !== 0) {
          return {
            ...state,
            quantity: {
              ...state.quantity,
              [action.payload]: state.quantity[action.payload] - 1
            }
          };
        } else {
          const { [action.payload]: omit, ...newQuant } = state.quantity;
          return {
            ...state,
            products: state.products.filter(i => i.id !== action.payload),
            quantity: newQuant
          };
        }
      } else return state;
    default:
      return state;
  }
};
export default cartReducer;
