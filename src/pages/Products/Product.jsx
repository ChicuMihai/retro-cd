import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { addProductCart } from "../../components/common/cart/store/actions";
import { useDispatch } from "react-redux";
import {
  deleteProduct,
  openEditProductDetails,
  viewProductDetails
} from "./store/actions";
import { getButtonType } from "../utils";
const useStyles = makeStyles({
  root: {
    width: 300,
    minHeight: 400,
    marginRight: "10px",
    marginBottom: "30px",
    display: "flex",
    flexFlow: "row wrap",
    wordBreak: "break-all"
  },
  buttons: {
    alignSelf: "flex-end"
  }
});
export const Product = ({ authType, ...props }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(addProductCart(props));
  };
  const viewDetails = () => {
    dispatch(viewProductDetails(props));
  };
  const editProduct = () => {
    dispatch(openEditProductDetails(props));
  };
  const deleteProductHandler = () => {
    dispatch(deleteProduct(props.id));
  };

  return (
    <Card className={classes.root} raised>
      <CardActionArea onClick={viewDetails}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="250"
          image={`${props.images.map(({ downloadURL }) => downloadURL)}`}
          title="prodThumbnail"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography variant="h4" color="textSecondary" component="h3">
            {props.price} lei
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.buttons}>
        {getButtonType({
          ...authType,
          addToCart,
          viewDetails,
          editProduct,
          deleteProductHandler
        })}
      </CardActions>
    </Card>
  );
};
export default Product;
