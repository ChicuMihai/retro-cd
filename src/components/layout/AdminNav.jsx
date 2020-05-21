import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useFirebase } from "react-redux-firebase";
import Box from "@material-ui/core/Box";
import { useDispatch } from "react-redux";
import { openProductForm } from "../../pages/Products/store/actions";
import ConfirmationDialog from "../common/ConfirmationDialog";

const AdminNav = () => {
  const useStyles = makeStyles({
    root: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    link: {
      color: "white"
    }
  });
  const classes = useStyles();
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const [isConfirmationOpen, setConfirmation] = useState(false);
  return (
    <AppBar position="fixed">
      <Toolbar className={classes.root} variant="dense">
        <Button component={RouterLink} to="/" className={classes.link}>
          Retro Disks
        </Button>
        <Box>
          {isConfirmationOpen && (
            <ConfirmationDialog
              open={isConfirmationOpen}
              acceptAction={() =>
                firebase.logout().then(() => setConfirmation(false))
              }
              body={"Sunteti sigur ca doriti sa iesiti din sistem?"}
              title={"Logout"}
              rejectAction={() => setConfirmation(false)}
            />
          )}
          <Button
            onClick={() => dispatch(openProductForm())}
            className={classes.link}
          >
            Adauga Produs
          </Button>
          <Button
            onClick={() => setConfirmation(true)}
            component="a"
            className={classes.link}
          >
            Log Out
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNav;
