import React from "react";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CartItem from "./CartItem";
import Button from "@material-ui/core/Button";
import { sendOrder } from "./store/actions";
const PopMenu = ({ isOpen, anchor }) => {
  const products = useSelector(({ cart }) => cart.products);
  const dispatch = useDispatch();
  const handleClick = () => dispatch(sendOrder());

  return (
    <Popper open={isOpen} placement="bottom-end" anchorEl={anchor}>
      <Paper
        style={{
          marginTop: "30px",
          border: "1px solid #3f51b5",
          maxWidth: "300px",
          display: "flex",
          padding: "5px",
          justifyContent: "center"
        }}
      >
        {products.length > 0 ? (
          <Grid container>
            <Grid item xs={5}>
              <Typography>{"Nume Produs"}</Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography>{"Cantitate Produs"}</Typography>
            </Grid>
            {products.map(prodData => (
              <CartItem prodData={prodData} key={prodData.id} />
            ))}
            <Grid item container justify="flex-start"></Grid>
            <Grid item xs={12} container justify="flex-end">
              <Button color="primary" disableElevation onClick={handleClick}>
                {"Trimite comanda"}
              </Button>
            </Grid>
          </Grid>
        ) : (
          "Cosul este gol"
        )}
      </Paper>
    </Popper>
  );
};
export default PopMenu;
