import React from "react";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { removeProductCart } from "./store/actions";

const CartItem = ({ prodData }) => {
  const prodQuant = useSelector(({ cart }) => cart.quantity);
  const dispatch = useDispatch();
  const removeProd = id => {
    dispatch(removeProductCart(id));
  };
  return (
    <Grid container>
      <Grid item xs={5}>
        {prodData.name}
      </Grid>
      <Grid item xs={5}>
        {prodQuant[prodData.id]}
      </Grid>
      <Grid item xs={2}>
        <DeleteIcon onClick={() => removeProd(prodData.id)} />
      </Grid>
    </Grid>
  );
};

export default CartItem;
