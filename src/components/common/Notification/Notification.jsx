import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
const Notification = () => {
  const notification = useSelector(state => state.notification);
  const errors = useSelector(state => state.firebase.errors);
  const dispatch = useDispatch();
  const { isOpen, notificationMessage, notificationType } = notification;
  const handleClose = () => dispatch({ type: "CLOSE_NOTIFICATION" });
  const snackBarColors = {
    error: "red",
    success: "green"
  };

  useEffect(() => {
    if (errors.length > 0)
      errors.map(err => {
        if (err !== null && err.message !== null && err.message !== undefined)
          dispatch({
            type: "SHOW_NOTIFICATION",
            payload: {
              message: err?.message,
              notificationType: "error"
            }
          });
      });
  }, [errors]);
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <SnackbarContent
        message={notificationMessage}
        style={{
          backgroundColor: snackBarColors[notificationType]
        }}
      />
    </Snackbar>
  );
};

export default Notification;
