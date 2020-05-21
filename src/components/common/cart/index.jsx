import React, { useState } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useSelector } from "react-redux";
import PopMenu from "./popover";
import Box from "@material-ui/core/Box";
import Badge from "@material-ui/core/Badge";
const ShoppingCart = () => {
  const prodQuant = useSelector(({ cart }) => cart.quantity);
  const totalProducts =
    Object.values(prodQuant).length > 0
      ? Object.values(prodQuant).reduce((a, b) => a + b)
      : 0;
  const [anchor, setAnchor] = useState(null);
  const handleClick = (event) => {
    setAnchor(anchor ? null : event.currentTarget);
  };
  const isOpen = Boolean(anchor);
  return (
    <Box justifyContent="center" alignItems="center" display="flex">
      <Badge badgeContent={totalProducts} color="secondary">
        <ShoppingCartIcon onClick={handleClick} />
      </Badge>
      <PopMenu isOpen={isOpen} anchor={anchor} />
    </Box>
  );
};
export default ShoppingCart;
