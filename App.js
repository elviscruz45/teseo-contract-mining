import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import { LogBox } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import { rootReducers } from "./src/reducers";
import { AppNavigation } from "./src/navigation/AppNavigation";
LogBox.ignoreAllLogs();

const composedEnhancers = compose(applyMiddleware(reduxThunk));
const store = createStore(rootReducers, {}, composedEnhancers);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </Provider>
  );
}
