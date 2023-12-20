import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { AddDocsFormBare } from "./AddForms";
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
describe("AddDocsFormBare", () => {
  it("renders correctly", () => {
    const { getByPlaceholderText } = render(<AddDocsFormBare />);

    expect(getByPlaceholderText("Adjuntar PDF")).toBeTruthy();
    expect(getByPlaceholderText("Tipo de Archivo Adjunto")).toBeTruthy();
  });

  //   it("calls pickDocument when PDF input is pressed", () => {
  //     const { getByPlaceholderText } = render(<AddDocsFormBare />);
  //     const pdfInput = getByPlaceholderText("Adjuntar PDF");

  //     fireEvent.press(pdfInput.rightIcon);

  //     // Add your assertions here
  //   });

  //   it("calls selectComponent when Tipo de Archivo Adjunto input is pressed", () => {
  //     const { getByPlaceholderText } = render(<AddDocsFormBare />);
  //     const tipoArchivoInput = getByPlaceholderText("Tipo de Archivo Adjunto");

  //     fireEvent.press(tipoArchivoInput.rightIcon);

  //     // Add your assertions here
  //   });

  it("calls formik.handleSubmit when Agregar Documento button is pressed", () => {
    const { getByText } = render(<AddDocsFormBare />);
    const agregarDocumentoButton = getByText("Agregar Documento");

    fireEvent.press(agregarDocumentoButton);

    // Add your assertions here
  });
});
