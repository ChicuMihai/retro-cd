import React from "react";
import Box from "@material-ui/core/Box";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { isLoaded, useFirebase, isEmpty } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";

const RegisterPage = () => {
  const firebase = useFirebase();
  const auth = useSelector(state => state.firebase.auth);
  const history = useHistory();
  if (isLoaded(auth) && !isEmpty(auth)) history.push("/");
  const { errors, handleSubmit, register } = useForm();

  const onSubmit = ({ email, password, username }) => {
    firebase
      .createUser({ email, password }, { email, username })
      .then(() => {
        history.push("/");
      })
      .catch(err => console.log(err));
  };
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
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
            <TextField
              name="username"
              label="Nume Utilizator"
              type="text"
              fullWidth
              inputRef={register({
                required: true
              })}
              helperText={errors?.username?.message}
              error={!!errors.username}
            />
          </Box>
          <Box>
            <Button type="submit" color="primary" variant="contained">
              Inregistreazate
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default RegisterPage;
