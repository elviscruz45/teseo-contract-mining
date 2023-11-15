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
import { LoginNavigator } from "./src/navigation/LoginNavigator";
import { StatusBar } from "expo-status-bar";

LogBox.ignoreAllLogs();

const composedEnhancers = compose(applyMiddleware(reduxThunk));
const store = createStore(rootReducers, {}, composedEnhancers);
export default function App() {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor="white" />
      <NavigationContainer>
        <ConnectedLoginNavigator />
      </NavigationContainer>
    </Provider>
  );
}
