export const showNotification = (type, message) => {
  return {
    type: "SHOW_NOTIFICATION",
    payload: { notificationType: type, message: message }
  };
};
