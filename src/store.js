import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";
import { getFirebase } from "react-redux-firebase";
export default function configureStore(initialState, history) {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk.withExtraArgument({ getFirebase })),
      typeof window === "object" &&
        typeof window.devToolsExtension !== "undefined"
        ? () => window.__REDUX_DEVTOOLS_EXTENSION__
        : (f) => f
    )
  );
  return store;
}
