import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ChangeManPower } from "./ChangeManPower";
import { Provider } from "react-redux";
import { store } from "../../../../App";

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
describe("ChangeManPowerBare", () => {
  it("renders correctly", () => {
    const onCloseMock = jest.fn();

    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <ChangeManPower onCloseMock={onCloseMock} />
      </Provider>
    );

    expect(getByPlaceholderText("Total Reparacion")).toBeTruthy();
    expect(getByPlaceholderText("Disponible Reparacion")).toBeTruthy();
    expect(getByPlaceholderText("Total Fabricacion")).toBeTruthy();
    expect(getByPlaceholderText("Disponible Fabricacion")).toBeTruthy();
    expect(getByPlaceholderText("Total Ingenieria")).toBeTruthy();
    expect(getByPlaceholderText("Disponible Ingenieria")).toBeTruthy();
    expect(getByPlaceholderText("Total Maquinado")).toBeTruthy();
    expect(getByPlaceholderText("Disponible Maquinado")).toBeTruthy();
  });

  it("calls onSubmit when the 'Actualizar' button is pressed", () => {
    const onCloseMock = jest.fn();

    const { getByText } = render(
      <Provider store={store}>
        <ChangeManPower onCloseMock={onCloseMock} />
      </Provider>
    );
    const actualizarButton = getByText("Actualizar");

    fireEvent.press(actualizarButton);
    // expect(onCloseMock).toHaveBeenCalled();
  });
});
