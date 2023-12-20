import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { GeneralForms } from "./GeneralForms";
import { store } from "../../../../../App";
import { Provider } from "react-redux";

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
describe("GeneralForms", () => {
  const formikMock = {
    values: {},
    errors: {},
    touched: {},
    handleChange: jest.fn(),
    handleBlur: jest.fn(),
    handleSubmit: jest.fn(),
  };
  it("renders correctly", () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <GeneralForms formik={formikMock} />
      </Provider>
    );

    expect(getByPlaceholderText("Visibilidad del evento")).toBeTruthy();
    expect(getByPlaceholderText("Etapa del Evento")).toBeTruthy();
    expect(getByPlaceholderText("Adjuntar PDF")).toBeTruthy();
  });

  it("calls pickDocument when PDF input is pressed", () => {
    const formikMock = {
      values: {},
      errors: {},
      touched: {},
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      handleSubmit: jest.fn(),
    };
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <GeneralForms formik={formikMock} />
      </Provider>
    );
    const pdfInput = getByPlaceholderText("Adjuntar PDF");

    fireEvent.press(pdfInput);

    // Add your assertions here
  });

  it("calls selectComponent when right icons are pressed", () => {
    const formikMock = {
      values: {},
      errors: {},
      touched: {},
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      handleSubmit: jest.fn(),
    };
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <GeneralForms formik={formikMock} />
      </Provider>
    );
    // const visibilityInput = getByPlaceholderText("Visibilidad del evento");
    // const etapaInput = getByPlaceholderText("Etapa del Evento");

    // fireEvent.press(visibilityInput.getByTestId("right-icon"));
    // fireEvent.press(etapaInput.getByTestId("right-icon"));

    // Add your assertions here
  });

  //   Add more test cases for other functionality
});
