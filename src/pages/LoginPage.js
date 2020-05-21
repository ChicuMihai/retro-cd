import React from "react";

import { useSelector } from "react-redux";
import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import Box from "@material-ui/core/Box";
import { TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import Loader from "../components/common/Loader";
import { Redirect } from "react-router";
import Button from "@material-ui/core/Button";

function LoginPage() {
  const firebase = useFirebase();
  const auth = useSelector(state => state.firebase.auth);

  const { errors, handleSubmit, register } = useForm();
  if (!isLoaded(auth)) return <Loader />;
  if (!isEmpty(auth)) return <Redirect to="/" />;
  const onSubmit = async data => {
    return await firebase.login({ ...data });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: "500px", marginBottom: "50px" }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Box mb="20px">
            <TextField
              name="email"
              label="Email"
              fullWidth
              inputRef={register({
                required: true
              })}
              helperText={errors?.email?.message}
              error={!!errors.email}
            />
            <TextField
              name="password"
              label="Parola"
              type="password"
              fullWidth
              inputRef={register({
                required: true
              })}
              helperText={errors?.password?.message}
              error={!!errors.password}
            />
          </Box>
          <Box>
            <Button type="submit" color="primary" variant="contained">
              Log In
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}

export default LoginPage;
