const initialState = {
  productDetails:{},
  isModalOpen:false,
  isEdit:false,
  isProductFormOpen:false,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PRODUCT_ADD_SUCCESS":
      return { ...state, isProductFormOpen: false };
    case "OPEN_PRODUCT_DETAILS":
      return {...state,productDetails: {...action.payload},isModalOpen: true}
    case "CLOSE_PRODUCT_DETAILS":
      return {...state,productDetails: initialState.productDetails,isModalOpen: false}
    case "OPEN_PRODUCT_FORM":
      return {...state,isProductFormOpen: true}
    case "CLOSE_PRODUCT_FORM":
      return {...state,productDetails:initialState.productDetails,isProductFormOpen: false}
    case "EDIT_PRODUCT":
      return {...state,productDetails: {...action.payload},isEdit:true,isProductFormOpen: true}
    case "PRODUCT_EDIT_SUCCESS":
      return {...state,productDetails: initialState.productDetails,isProductFormOpen: false,isEdit:false}
    default:
      return state;
  }
};
export default productReducer;
