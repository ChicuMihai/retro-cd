import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ShoppingCart from "../common/cart/index";
import { makeStyles } from "@material-ui/core/styles";
import { useFirebase } from "react-redux-firebase";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";
import ConfirmationDialog from "../common/ConfirmationDialog";

export default function NavBar() {
  const firebase = useFirebase();
  const [isConfirmationOpen, setConfirmation] = useState(false);
  const isUserAuthenticated = useSelector(
    ({ firebase: { auth } }) => !!auth && !!auth.uid
  );
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
  return (
    <AppBar position="fixed">
      <Toolbar className={classes.root} variant="dense">
        <Button component={RouterLink} to="/" className={classes.link}>
          Retro Disks
        </Button>
        {isUserAuthenticated ? (
          <>
            <div className={classes.root}>
              <ShoppingCart />
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
                onClick={() => setConfirmation(true)}
                component="a"
                className={classes.link}
              >
                Log Out
              </Button>
            </div>
          </>
        ) : (
          <Button component={RouterLink} to={"/login"} className={classes.link}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
