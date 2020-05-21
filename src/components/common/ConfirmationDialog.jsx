import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const ConfirmationDialog = ({
  title,
  body,
  open,
  acceptAction,
  rejectAction
}) => {
  return (
    <Dialog open={open} onBackdropClick={rejectAction}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {body}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={rejectAction} color="primary">
          Nu
        </Button>
        <Button onClick={acceptAction} color="primary" autoFocus>
          Da
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
