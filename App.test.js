import React from "react";
import { render, screen } from "@testing-library/react-native";
import App from "./App";

jest.mock("redux", () => ({
  applyMiddleware: jest.fn(),
  compose: jest.fn(),
  legacy_createStore: jest.fn(),
}));

jest.mock("react-redux", () => ({
  Provider: ({ children }) => <div>{children}</div>,
}));

// jest.mock("redux-thunk", () => () => {});
jest.mock("./src/reducers", () => ({}));

jest.mock("@react-navigation/native", () => ({
  NavigationContainer: ({ children }) => (
    <div>NavigationContainer{children}</div>
  ),
}));

jest.mock("./src/navigation/LoginNavigator", () => ({
  ConnectedLoginNavigator: () => "ConnectedLoginNavigator",
}));

jest.mock("expo-status-bar", () => ({
  StatusBar: () => <div>StatusBar</div>,
}));

jest.mock("react-native-toast-message", () => () => <text>Toast</text>);

describe("App", () => {
  it("renders correctly", () => {
    const { getByText } = render(<App />);
    screen.debug();
    // expect(getByText("StatusBar")).toBeInTheDocument();
  });
});
