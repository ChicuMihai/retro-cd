import React, { useState } from "react";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import Loader from "../components/common/Loader";
import { useSelector } from "react-redux";
import Product from "./Products/Product";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ProductDetails from "./Products/ProductDetails";
import Container from "@material-ui/core/Container";
import { styled } from "@material-ui/core/styles";
import ProductForm from "./Products/ProductForm";
import { ButtonGroup as Group } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
const Home = () => {
  const [queryParams, setQueryParams] = useState(["createdAt"]);

  const products = useSelector(
    ({ firestore: { ordered } }) => ordered.products
  );
  const auth = useSelector(state => state.firebase.auth);
  const token = useSelector(state => state.firebase.profile.token);
  const isAdmin = token?.claims?.isAdmin;
  const isOpen = useSelector(state => state.product.isModalOpen);
  const isFormOpen = useSelector(state => state.product.isProductFormOpen);
  const productDetails = useSelector(state => state.product.productDetails);
  const isEdit = useSelector(state => state.product.isEdit);
  useFirestoreConnect([{ collection: "products", orderBy: queryParams }]);
  if (!isLoaded(products) && !isLoaded(auth)) return <Loader />;

  const ButtonGroup = styled(Group)({
    paddingBottom: "30px",
    marginLeft: "10px"
  });

  if (isEmpty(products))
    return (
      <>
        {isFormOpen && (
          <ProductForm
            isOpen={isFormOpen}
            product={productDetails}
            isEdit={isEdit}
          />
        )}
        <Typography>Nu sunt produse</Typography>
      </>
    );

  return (
    <Container maxWidth="xl">
      {"Sorteaza Dupa:"}
      <ButtonGroup>
        <Button onClick={() => setQueryParams(["price"])}>Pret</Button>
        <Button onClick={() => setQueryParams(["name"])}>Nume</Button>
      </ButtonGroup>
      <Grid container justify="center">
        {products?.map(prod => (
          <Product key={prod.id} {...prod} authType={{ auth, isAdmin }} />
        ))}
      </Grid>
      {isOpen && !isEdit && (
        <ProductDetails
          isOpen={isOpen}
          productDetails={productDetails}
          isAuthenticated={!isEmpty(auth)}
        />
      )}
      {isFormOpen && (
        <ProductForm
          isOpen={isFormOpen}
          product={productDetails}
          isEdit={isEdit}
        />
      )}
    </Container>
  );
};

export default Home;
