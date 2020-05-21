import React, { Suspense } from "react";
import { Provider } from "react-redux";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/storage";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import configureStore from "./store";
import { firebase as fbConfig, rrfConfig } from "./config";
import "./App.css";
import Routes from "./Routes";
import Notification from "./components/common/Notification/Notification";
const initialState = window && window.__INITIAL_STATE__;
firebase.initializeApp(fbConfig);
firebase.firestore();
const store = configureStore(initialState);
export default function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider
        firebase={firebase}
        config={rrfConfig}
        dispatch={store.dispatch}
        createFirestoreInstance={createFirestoreInstance}
      >
        <Suspense fallback={<div>Loading</div>}>
          <Routes />
          <Notification />
        </Suspense>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}
