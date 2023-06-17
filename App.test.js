import React from "react";
import { Provider } from "react-redux";
import { render } from "react-native-testing-library";
import configureStore from "redux-mock-store";
import App from "./App";

jest.mock("./__mocks__/NativeAnimatedHelper", () => {
  return {
    __esModule: true,
    default: {},
  };
});

describe("App", () => {
  const mockStore = configureStore([]);
  const initialState = {}; // Add any initial state required for your tests
  const store = mockStore(initialState);

  it("renders the ConnectedLoginNavigator component", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const connectedLoginNavigator = getByTestId("connected-login-navigator");
    expect(connectedLoginNavigator).toBeDefined();
  });
});
