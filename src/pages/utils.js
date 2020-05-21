import { isEmpty, useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import React from "react";

const mergeLists = (ordered, storeAs, limit) => {
  let nextPage = false;
  let list = Object.entries(ordered).filter(([key, value]) => {
    return key.includes(storeAs);
  });
  list = list.map((item, index) => {
    if (item[1].length - 1 === limit) {
      if (list.length - 1 === index) {
        nextPage = true;
      }
      return item[1].slice(0, -1);
    }
    return item[1];
  });
  return [list.flat(), nextPage];
};

export const usePagination = ({ limit, startAfter }) => {
  const storeAs = "products";
  const key = `${storeAs}/${startAfter || 0}`;
  useFirestoreConnect({
    collection: "products",
    limit: limit + 1,
    orderBy: [["name", "desc"]],
    where:
    startAfter
  });

  return useSelector(({ firestore: { status, ordered, errors } }) => {
    const loading =
      status.requesting[key] === undefined ||
      Object.entries(status.requesting).some(
        ([key, value]) => key.includes(storeAs) && value
      );
    const error = Object.entries(errors).find(
      ([key, value]) => key.includes(storeAs) && !!value
    );
    const [list, nextPage] = mergeLists(ordered, storeAs, limit);
    return {
      loading,
      error,
      data: list,
      nextPage
    };
  });
};

export const getButtonType = ({ isAdmin, auth,editProduct,deleteProductHandler,addToCart,viewDetails }) => {
  if (isAdmin)
    return (
      <>
        <Button size="small" color="primary" onClick={editProduct}>
          Editeaza
        </Button>
        <Button size="small" color="primary" onClick={deleteProductHandler}>
          Sterge
        </Button>
      </>
    );
  if (isEmpty(auth)) {
    return (
      <Button size="small" color="primary" onClick={viewDetails}>
        Vezi Detalii
      </Button>
    );
  }
  else if(!isEmpty(auth))
    return (
      <>
        <Button size="small" color="primary" onClick={addToCart}>
          Adauga in Cos
        </Button>
        <Button size="small" color="primary" onClick={viewDetails}>
          Vezi Detalii
        </Button>
      </>
  )
  else return null
};
