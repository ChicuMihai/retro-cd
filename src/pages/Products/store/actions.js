import { showNotification } from "../../../components/common/Notification/store/actions";

export const addProduct = product => {
  return async (dispatch, getStore, { getFirebase }) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();
    firestore
      .collection("products")
      .add({
        name: product.prodName,
        description: product.prodDescription,
        images: product.images,
        price: Number(product.prodPrice),
        purchaseDate: product.prodPurchaseDate,
        launchDate: product.prodLaunchDate,
        createdAt: new Date().getTime()
      })
      .then(() => {
        dispatch({ type: "PRODUCT_ADD_SUCCESS" });
        dispatch(
          showNotification("success", "Produsul a fost adaugat cu success")
        );
      })
      .catch(err => dispatch({ type: "PRODUCT_ADD_FAILED", payload: err }));
  };
};

export const editProductDetails = ({ productId, images, ...data }) => {
  return (dispatch, getStore, { getFirebase }) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();
    firestore
      .collection("products")
      .doc(productId)
      .update({
        name: data.prodName,
        description: data.prodDescription,
        price: Number(data.prodPrice),
        purchaseDate: data.prodPurchaseDate,
        launchDate: data.prodLaunchDate,
        images
      })
      .then(() => {
        dispatch({ type: "PRODUCT_EDIT_SUCCESS" });
        dispatch(
          showNotification("success", "Produsul a fost editat cu success")
        );
      })
      .catch(err => dispatch({ type: "PRODUCT_EDIT_FAILED", payload: err }));
  };
};

export const closeProductDetails = () => {
  return {
    type: "CLOSE_PRODUCT_DETAILS"
  };
};
export const viewProductDetails = product => {
  return {
    type: "OPEN_PRODUCT_DETAILS",
    payload: product
  };
};
export const openEditProductDetails = product => {
  return {
    type: "EDIT_PRODUCT",
    payload: product
  };
};
export const openProductForm = () => {
  return {
    type: "OPEN_PRODUCT_FORM"
  };
};
export const closeProductForm = () => {
  return {
    type: "CLOSE_PRODUCT_FORM"
  };
};

export const deleteProduct = productId => {
  return async (dispatch, getStore, { getFirebase }) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();
    const images = await firestore
      .collection("products")
      .doc(productId)
      .get()
      .then(res => res.data().images);
    return Promise.all([
      firestore
        .collection("products")
        .doc(productId)
        .delete(),
      Promise.all(
        images.map(img => firebase.deleteFile(`images/${img.imageName}`))
      )
    ])
      .then(() => {
        dispatch({ type: "PRODUCT_DELETE_SUCCESS" });
        dispatch(
          showNotification("success", "Produsul a fost sters cu success")
        );
      })
      .catch(() =>
        dispatch(showNotification("error", "Produsul nu a putut fi sters"))
      );
  };
};
