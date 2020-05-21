import { showNotification } from "../../Notification/store/actions";

export const addProductCart = product => {
  return {
    type: "ADD_PRODUCT_CART",
    payload: { ...product }
  };
};
export const removeProductCart = id => {
  return {
    type: "REMOVE_PRODUCT_CART",
    payload: id
  };
};
export const sendOrder = () => {
  return (dispatch, getStore, { getFirebase }) => {
    const prodData = getStore().cart.quantity;
    const firebase = getFirebase();
    const firestore = firebase.firestore();
    firestore
      .collection("orders")
      .add({
        email: firebase.auth().currentUser.email,
        orderInfo: { ...prodData }
      })
      .then(() => {
        dispatch({ type: "ORDER_SUCCESS" });
        dispatch(
          showNotification(
            "success",
            "Comanda dvs a fost expendiata cu sucess si este in curs de procesare"
          )
        );
      });
  };
};
