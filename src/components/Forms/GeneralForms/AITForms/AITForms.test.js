import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { AITForms } from "./AITForms";
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
describe("AITForms", () => {
  it("renders correctly", () => {
    const formikMock = {
      values: { NombreServicio: "NumeroServicio" },
      errors: {},
      touched: {},
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      handleSubmit: jest.fn(),
    };

    const navigationMock = { navigate: jest.fn() };

    const { getByPlaceholderText } = render(<AITForms formik={formikMock} />);

    expect(getByPlaceholderText("Nombre del Servicio")).toBeTruthy();
    expect(getByPlaceholderText("Numero Servicio")).toBeTruthy();
    // Add more assertions for other input fields
  });

  it("calls selectComponent when right icon is pressed", () => {
    const formikMock = {
      values: { NombreServicio: "NumeroServicio" },
      errors: {},
      touched: {},
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      handleSubmit: jest.fn(),
    };

    const { getByTestId } = render(<AITForms formik={formikMock} />);
    const rightIcon = getByTestId("right-icon-AreaServicio");

    fireEvent.press(rightIcon);

    // Add assertions to check if the corresponding component is rendered
  });

  // Add more test cases for other functionality in AITForms component
});
