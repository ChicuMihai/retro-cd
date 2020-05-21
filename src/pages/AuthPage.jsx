import React from "react";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import GoogleButton from "react-google-button";
import { useFirebase } from "react-redux-firebase";

const AuthPage = () => {
  const firebase = useFirebase();
  function loginWithGoogle() {
    return firebase.login({
      provider: "google",
      type: "redirect"
    });
  }
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box pr="150px">
          <Typography>Inregistrare</Typography>
          <RegisterPage />
        </Box>
        <Box>
          <Typography>Logare</Typography>
          <LoginPage />
        </Box>
      </Box>
      <GoogleButton
        label="Inregistreazate cu Google"
        onClick={loginWithGoogle}
      />
    </Box>
  );
};

export default AuthPage;
