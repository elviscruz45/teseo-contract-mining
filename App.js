import { StatusBar } from "expo-status-bar";
import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
console.log("InicioApp.before rootReducers");
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import { rootReducers } from "./src/reducers";
console.log("InicioApp.after rootReducers");

import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { ConnectedLoginNavigator } from "./src/navigation/LoginNavigator";
import logger from "redux-logger";

console.log("InicioApp.j");

LogBox.ignoreAllLogs();

const composedEnhancers = compose(applyMiddleware(reduxThunk, logger));
const store = createStore(rootReducers, {}, composedEnhancers);

// //the corrected way
// const middlewares = [reduxThunk];
// const store = createStore(rootReducers, applyMiddleware(...middlewares));

export default function App() {
  console.log("1-------App.js");
  // return null;
  return (
    <>
      <Provider store={store}>
        <StatusBar backgroundColor="white" />
        <NavigationContainer>
          <ConnectedLoginNavigator />
        </NavigationContainer>
      </Provider>
    </>
  );
}
