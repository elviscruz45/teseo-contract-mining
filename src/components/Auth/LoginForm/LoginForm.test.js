import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { ConnectedLoginForm } from "./LoginForm";
import { legacy_createStore as createStore } from "redux";
import { store } from "../../../../App";
jest.mock("expo-image-picker", () => ({
  launchImageLibraryAsync: jest.fn(() =>
    Promise.resolve({ canceled: false, assets: [{ uri: "test-uri" }] })
  ),
}));
jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
}));
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  updateProfile: jest.fn(),
}));
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));
jest.mock("firebase/analytics", () => ({
  getAnalytics: jest.fn(),
}));
jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
}));
jest.mock("@react-navigation/bottom-tabs", () => ({
  createBottomTabNavigator: jest.fn(),
}));
jest.mock("@react-navigation/native-stack", () => ({
  createNativeStackNavigator: jest.fn(),
}));
jest.mock("victory-native", () => ({
  VictoryPie: jest.fn(() => null), // Mocked component returns null
  VictoryLabel: jest.fn(() => null), // Mocked component returns null
}));
jest.mock("firebase/storage", () => ({
  getStorage: jest.fn(),
  ref: jest.fn(),
  uploadBytes: jest.fn(() =>
    Promise.resolve({ metadata: { fullPath: "test-path" } })
  ),
  getDownloadURL: jest.fn(() => Promise.resolve("test-url")),
}));

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(() => ({ navigate: jest.fn() })),
}));
describe("LoginForm", () => {
  const onCloseMock = jest.fn();

  it("renders correctly", async () => {
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

    const mockStore = createStore(mockReducer, {
      // Set initial state here
    });

    const { getByPlaceholderText, getByText, getByTestId } = render(
      <Provider store={store}>
        <ConnectedLoginForm />
      </Provider>
    );

    // Test input fields
    const emailInput = getByPlaceholderText("Correo electronico");
    const passwordInput = getByPlaceholderText("Contraseña");
    const submitButton = getByTestId("submitButton");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password");

    expect(emailInput.props.value).toBe("test@example.com");
    expect(passwordInput.props.value).toBe("password");

    // Test button
    const loginButton = getByText("Iniciar sesión");
    fireEvent.press(loginButton);

    // Wait for async actions to complete
    await act(async () => {
      fireEvent.press(submitButton);
    });
  });
});
