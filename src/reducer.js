import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import productReducer from "./pages/Products/store/reducer";
import cartReducer from "./components/common/cart/store/reducer";
import notificationReducer from "./components/common/Notification/store/reducer";
const rootReducer = combineReducers({
  product: productReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  cart: cartReducer,
  notification: notificationReducer
});

export default rootReducer;
