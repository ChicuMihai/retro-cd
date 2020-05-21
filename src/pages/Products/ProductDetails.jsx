import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { useDispatch, useSelector } from "react-redux";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { closeProductDetails } from "./store/actions";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import {addProductCart} from "../../components/common/cart/store/actions";

const ProductDetails = ({ isOpen, productDetails, isAuthenticated }) => {
  const imageLength = productDetails?.images?.length;
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeProductDetails());
  };
  const [img, setImg] = useState(0);
  const showPrev = () => {
    if (img === imageLength - 1) setImg(0);
    else setImg(img + 1);
  };
  const showNext = () => {
    if (img === imageLength - 1) setImg(0);
    else setImg(img + 1);
  };
  const addToCart = () => {
    dispatch(addProductCart(productDetails));
  };
  const useStyle = makeStyles({
    image: {
      maxWidth: 800,
      maxHeight: 500,
      webkitOverflowScrolling: "touch"
    },
    buttonContainer: {
      marginTop: 10,
      display: "flex"
    },
    detailsContainer: {
      marginLeft: "auto",
      marginRight: "auto",
      textAlign: "center",
      marginTop: 20
    }
  });
  const classes = useStyle();
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="lg"
      scroll="paper"
    >
      <Box display="flex" justifyContent="center" flexDirection="column">
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h3">{productDetails.name}</Typography>
        </DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="center" alignItems="center">
            <a target="_blank">
              <img
                className={classes.image}
                src={
                  productDetails.images &&
                  productDetails.images[img].downloadURL
                }
              />
            </a>
          </Box>
          {imageLength > 1 && (
            <Box display="flex" justifyContent="center">
              <Button onClick={showPrev}>{"<"}</Button>
              <Button onClick={showNext}>{">"}</Button>
            </Box>
          )}
          <Box className={classes.detailsContainer}>
            <Typography>{productDetails.description}</Typography>
            <Box display="flex" justifyContent="flex-end">
              <Box display="flex" flexDirection="column" pr="10px">
                <Typography color="primary">{"Data lansarii"}</Typography>
                <Typography>{productDetails.launchDate}</Typography>
              </Box>
              <Box display="flex" flexDirection="column">
                <Typography color="primary">{"Data achizitionarii"}</Typography>
                <Typography>{productDetails.purchaseDate}</Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="flex-end">
              <Typography variant="h4" color="textSecondary" component="h3">
                {productDetails.price} lei
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions className={classes.buttonContainer}>
          {isAuthenticated && (
            <Button onClick={addToCart} color="primary" variant="text">
              Adauga in cos
            </Button>
          )}
          <Button onClick={handleClose} color="primary" autoFocus>
            Inchide
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ProductDetails;
