import { StatusBar } from "expo-status-bar";
import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import { rootReducers } from "./src/reducers";

import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { ConnectedLoginNavigator } from "./src/navigation/LoginNavigator";
// import logger from "redux-logger";

LogBox.ignoreAllLogs();

// let store;

// if (process.env.NODE_ENV === 'development') {
//   const middleware = applyMiddleware(logger);
//   store = createStore(rootReducers, {}, composedEnhancers);
// } else {
//   // For production or other environments, don't include logger
//   store = createStore(rootReducers, {}, composedEnhancers);
// }

// const composedEnhancers = compose(applyMiddleware(reduxThunk, logger));
// const store = createStore(rootReducers, {}, composedEnhancers);

const composedEnhancers = compose(applyMiddleware(reduxThunk));
const store = createStore(rootReducers, {}, composedEnhancers);

// //the corrected way
// const middlewares = [reduxThunk];
// const store = createStore(rootReducers, applyMiddleware(...middlewares));

export default function App() {
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
