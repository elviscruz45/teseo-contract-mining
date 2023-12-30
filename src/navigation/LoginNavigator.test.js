import React from "react";
import { render, screen } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { ConnectedLoginNavigator } from "./LoginNavigator";
import { legacy_createStore as createStore } from "redux";
import { store } from "../../App";

jest.mock("./AppNavigation", () => ({
  AppNavigation: () => <div data-testid="app-navigation">AppNavigation</div>,
}));

jest.mock("../screens/Auth/AuthScreen", () => ({
  AuthScreen: () => <div data-testid="auth-screen">AuthScreen</div>,
}));

describe("ConnectedLoginNavigator", () => {
  test("renders AppNavigation when firebase_user_uid is in state", () => {
    // Create a mock reducer that sets the email state when it receives the SET_EMAIL action
    const mockReducer = (state = {}, action) => {
      switch (action.type) {
        case "SET_EMAIL":
          return {
            ...state,
            profile: {
              ...state.profile,
              email: action.email,
            },
          };
        default:
          return state;
      }
    };

    // Create a mock store with the initial state
    const mockStore = createStore(mockReducer, {
      auth: {
        firebase_user_uid: "123",
      },
    });
    // Dispatch the SET_EMAIL action to set the email state to "test-email"
    mockStore.dispatch({ type: "SET_EMAIL", email: "test-email" });
    render(
      <Provider store={mockStore}>
        <ConnectedLoginNavigator />
      </Provider>
    );
  });
});
