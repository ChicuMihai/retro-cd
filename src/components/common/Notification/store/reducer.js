const initialState = {
  isOpen: false,
  notificationType: null,
  notificationMessage: null
};
const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return {
        isOpen: true,
        notificationType: action.payload.notificationType,
        notificationMessage: action.payload.message
      };
    case "CLOSE_NOTIFICATION":
      return initialState;

    default:
      return state;
  }
};
export default notificationReducer;
